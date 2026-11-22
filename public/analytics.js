/* Explicit event vocabulary. Never send input values, link queries or free text. */
(() => {
  const id = window.GONDWANA_GA_ID;
  if (!/^G-[A-Z0-9]+$/.test(id || '')) return;
  const key = 'gondwana-analytics-consent';
  let choice; try { choice = localStorage.getItem(key); } catch {}
  let enabled = false, started = false;
  const events = new Set(['section_view','scroll_depth','contact_click','form_start','form_attempt','form_error','generate_lead','planner_interest','gallery_open','gallery_filter','video_start','video_unmute','video_progress','faq_open']);
  const fields = new Set(['section','channel','form_id','interest','category','video_id','percent','method']);
  const track = (name, params = {}) => {
    if (!enabled || !events.has(name)) return;
    const clean = {};
    for (const [k,v] of Object.entries(params)) if (fields.has(k) && (typeof v === 'number' || /^[a-zA-Z0-9 _./–-]{1,80}$/.test(v))) clean[k] = v;
    window.gtag('event', name, clean);
  };
  window.gondwanaTrack = track;
  const referrer = () => { try { return new URL(document.referrer).origin; } catch { return ''; } };
  function start() {
    enabled = true; queueMicrotask(() => window.dispatchEvent(new Event('analytics-ready'))); window['ga-disable-' + id] = false;
    if (started) return; started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    const config = {send_page_view:true, page_location:location.origin + location.pathname, page_referrer:referrer(), allow_google_signals:false, allow_ad_personalization_signals:false};
    const query = new URLSearchParams(location.search);
    for (const [utm,field] of [['utm_source','campaign_source'],['utm_medium','campaign_medium'],['utm_campaign','campaign_name']]) {
      const value = query.get(utm); if (value && /^[a-zA-Z0-9_-]{1,60}$/.test(value)) config[field] = value;
    }
    window.gtag('config', id, config);
    const script = document.createElement('script'); script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id; document.head.append(script);
  }
  function decide(value) {
    try { localStorage.setItem(key,value); } catch {}
    panel.hidden = true;
    if (value === 'yes') start();
    else {
      enabled = false; window['ga-disable-' + id] = true;
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (!/^_ga(?:_|$)/.test(name)) continue;
        for (const domain of ['', location.hostname, '.' + location.hostname.replace(/^www\./,'')]) document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      }
    }
  }
  const panel = document.createElement('aside'); panel.className = 'analytics-choice'; panel.setAttribute('aria-label','Analytics preferences');
  panel.innerHTML = '<p>Help us improve your visit?</p><span>With your permission, Google Analytics measures visits and interactions. We do not send your enquiry details.</span><div><button type="button" data-choice="yes">Allow analytics</button><button type="button" data-choice="no">No thanks</button><a href="/privacy.html">Privacy details</a></div>';
  document.body.append(panel); panel.hidden = choice === 'yes' || choice === 'no';
  panel.addEventListener('click',e => { if (e.target.dataset.choice) decide(e.target.dataset.choice); });
  const settings = document.createElement('button'); settings.className = 'analytics-settings'; settings.textContent = 'Privacy choices'; settings.onclick = () => {panel.hidden = false;panel.querySelector('button').focus();}; document.body.append(settings);
  if (choice === 'yes') start();
  const seen = new Set();
  function once(k,event,props) { if (!enabled || seen.has(k)) return; seen.add(k); track(event,props); }
  const section = el => el.closest('section')?.id || (el.closest('header') ? 'header' : el.closest('footer') ? 'footer' : 'hero');
  document.addEventListener('click', e => {
    const el = e.target.closest('a,button,summary'); if (!el) return;
    const href = el.getAttribute('href') || ''; let channel;
    if (href.startsWith('https://wa.me/')) channel='whatsapp';
    else if(href.startsWith('tel:')) channel='phone';
    else if(href.startsWith('mailto:')) channel='email';
    else if(href.includes('google.com/maps')) channel=section(el)==='reviews'?'google_reviews':'maps';
    else if(href.includes('instagram.com')) channel='instagram';
    else if(href.includes('youtube.com')) channel='youtube';
    if(channel) track('contact_click',{channel,section:section(el)});
    if(el.matches('.gallery-item')) track('gallery_open',{section:'gallery'});
    if(el.closest('.gallery-filters')) track('gallery_filter',{category:el.textContent.trim()});
    if(el.closest('.interest-options')) track('planner_interest',{interest:el.textContent.trim()});
    if(el.tagName === 'SUMMARY') track('faq_open',{section:section(el)});
  });
  document.addEventListener('focusin',e => { const form=e.target.closest('form'); if(form) once('form-'+(form.id||'contact'),'form_start',{form_id:form.id||'contact'}); });
  document.addEventListener('invalid',e => {if(e.target.closest('form')) once('validation','form_error',{method:'validation'});},true);
  document.addEventListener('scroll',() => {
    const max=document.documentElement.scrollHeight-innerHeight;
    const percent=max>0?Math.round(scrollY/max*100):0;
    for(const n of [25,50,75,90]) if(percent>=n) once('scroll'+n,'scroll_depth',{percent:n});
  },{passive:true});
  const observer = new IntersectionObserver(entries => { for(const e of entries) if(e.isIntersecting) once('section'+e.target.id,'section_view',{section:e.target.id}); },{threshold:0.1});
  const observed = new WeakSet();
  const observeSections = () => document.querySelectorAll('main section[id]').forEach(el=>{if(!observed.has(el)){observed.add(el);observer.observe(el);}});
  observeSections();
  new MutationObserver(observeSections).observe(document.querySelector('main')?.parentNode || document.body,{childList:true,subtree:true});
  window.addEventListener('analytics-ready',()=>{document.querySelectorAll('main section[id]').forEach(el=>{observer.unobserve(el);observer.observe(el);});});
  const videoName = v => (v.getAttribute('data-src') || v.getAttribute('src') || '').split('/').pop()?.split('?')[0] || 'film';
  document.addEventListener('play',e=>{if(e.target.tagName==='VIDEO') once('video'+videoName(e.target),'video_start',{video_id:videoName(e.target),method:e.target.muted?'muted':'audible'});},true);
  document.addEventListener('volumechange',e=>{if(e.target.tagName==='VIDEO'&&!e.target.muted) once('unmute'+videoName(e.target),'video_unmute',{video_id:videoName(e.target)});},true);
  document.addEventListener('timeupdate',e=>{const v=e.target;if(v.tagName!=='VIDEO'||!v.duration)return;for(const n of [25,50,75,95])if(v.currentTime/v.duration*100>=n)once(videoName(v)+n,'video_progress',{video_id:videoName(v),percent:n});},true);
})();
