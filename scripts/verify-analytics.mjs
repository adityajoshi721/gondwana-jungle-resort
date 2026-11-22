import vm from 'node:vm';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const code=readFileSync('public/analytics.js','utf8');
function setup(id,choice) {
 const nodes=[],requests=[],listeners={};
 const el=()=>({className:'',hidden:false,setAttribute(){},addEventListener(n,fn){this[n]=fn;},querySelector(){return {focus(){}};},dataset:{}});
 const document={referrer:'https://chatgpt.com/path?secret=private',cookie:'',head:{append:x=>requests.push(x)},body:{append:x=>nodes.push(x)},createElement:el,addEventListener(n,f){listeners[n]=f;},querySelector(){return null;},querySelectorAll(){return [];}};
 const window={GONDWANA_GA_ID:id,addEventListener(){},dispatchEvent(){}};
 const context={window,document,location:{origin:'https://gondwanajungleresorts.com',hostname:'gondwanajungleresorts.com',pathname:'/',search:'?email=secret@example.com&utm_source=instagram'},localStorage:{getItem:()=>choice,setItem(k,v){choice=v;}},URL,URLSearchParams,Date,Set,WeakSet,queueMicrotask:f=>f(),Event:class{},IntersectionObserver:class{observe(){}unobserve(){}},MutationObserver:class{observe(){}}};
 vm.runInNewContext(code,context);
 return {window,nodes,requests};
}
let t=setup('','');assert.equal(t.nodes.length,0);assert.equal(t.requests.length,0);
t=setup('G-TEST123','');assert.equal(t.requests.length,0);t.window.gondwanaTrack('contact_click',{channel:'whatsapp'});assert.equal(t.window.dataLayer,undefined);
t.nodes[0].click({target:{dataset:{choice:'yes'}}});assert.equal(t.requests.length,1);
let config=t.window.dataLayer.find(x=>x[0]==='config')[2];assert.equal(config.page_location,'https://gondwanajungleresorts.com/');assert.equal(config.page_referrer,'https://chatgpt.com');assert.equal(config.campaign_source,'instagram');assert.equal(config.allow_google_signals,false);
t.window.gondwanaTrack('contact_click',{channel:'whatsapp',email:'private@example.com',section:'contact',url:'https://wa.me?text=secret'});
let event=t.window.dataLayer.at(-1);assert.equal(event[1],'contact_click');assert.equal(event[2].email,undefined);assert.equal(event[2].url,undefined);
let count=t.window.dataLayer.length;t.nodes[0].click({target:{dataset:{choice:'no'}}});t.window.gondwanaTrack('generate_lead');assert.equal(t.window.dataLayer.length,count);assert.equal(t.window['ga-disable-G-TEST123'],true);
t=setup('G-TEST123','yes');assert.equal(t.requests.length,1);
const html=readFileSync('dist/index.html','utf8');assert.ok(html.includes('id="reviews"'));assert.ok(html.includes('Madanapur'));assert.ok(!html.includes('/src/assets/'));
for(const m of html.matchAll(/(?:src|poster|data-src)="(\/(?:media|assets)\/[^"?]+)"/g)) assert.ok(existsSync('dist'+m[1]),m[1]);
assert.ok(readFileSync('dist/analytics-config.js','utf8').includes('""'));
console.log('PASS: disabled configuration, consent gating/withdrawal, single initialization, redaction, campaign/referrer sanitization, crawlable HTML and built media.');
