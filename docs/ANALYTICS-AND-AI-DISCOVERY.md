# Analytics and AI discovery — Gondwana

Prepared 22 November 2026. Collection is OFF until a GA4 measurement ID is supplied. This implementation cannot reconstruct historical visits. No analytics account, dashboard or revenue integration has been created.

## Activate GA4

1. Create a resort-owned Google Analytics property, using India reporting timezone and INR. Add a Web stream for https://gondwanajungleresorts.com.
2. Copy its public G-… measurement ID. In Vercel project gondwana-jungle-resort-v2 add VITE_GA_MEASUREMENT_ID for Production and redeploy. This is a build-time setting. Leave previews without an ID. Never put an API secret in this variable.
3. Turn OFF Enhanced Measurement initially. Our implementation provides pageview, outbound, form, scroll and HTML5 video events. Automatic tracking can duplicate them or collect unwanted URLs. Do not add another GA4/GTM tag.
4. Keep Google signals, ad personalization and user-provided data collection off. Choose event retention deliberately (e.g. 14 months if available). Review account access and the supplied privacy page with the resort owner.
5. Register event-scoped dimensions: section, channel, form_id, interest, category, video_id, method. Register percent as a custom metric if required. Registration is not retroactive.
6. Mark generate_lead as the primary key event. It fires only after EmailJS accepts a submission. The current WhatsApp fallback does NOT emit this event. Report contact_click separately as intent, never confirmed enquiries.
7. Link Search Console after verifying ownership. Existing verification markup does not prove the account is verified. Submit /sitemap.xml in Google Search Console and Bing Webmaster Tools.
8. Test in Realtime/DebugView: no Google analytics requests before consent; decline stays off; allow sends one pageview; interactions have expected parameters; withdrawal stops future collection. Inspect payloads for duplicates and personal information. Do not send fake enquiries to the resort.
9. Optionally connect BigQuery and a private Looker Studio dashboard after reviewing billing and retention. Neither is provisioned here. Do not expose analytics APIs or raw reports on the public site.

## Measurement definitions

GA4 estimates consented browser/device users, not every person. Consent refusals, blockers, cookie deletion, cross-device visits and bot filtering affect coverage. Use identical timezone, identity and filter settings across comparisons. Do not sum daily unique users to calculate monthly unique users. No fingerprinting or login identity stitching is installed.

| KPI | Definition | Interpretation |
|---|---|---|
| Total users | Distinct GA4 users in selected period | Reach; not verified individuals |
| DAU | Active users in last 24 hours | GA4 active-user definition, not all requests |
| WAU / MAU | Active users in trailing 7 / 30 days | Not calendar-week/month totals |
| DAU/MAU | DAU divided by MAU × 100 | Daily stickiness; travel is episodic, not a daily-use app |
| DAU/WAU, WAU/MAU | Same-window active-user ratios × 100 | Short/medium-term return frequency |
| New / returning | GA4 browser classifications | Returning browser does not mean repeat resort guest |
| Sessions/user | Sessions divided by users | Research frequency |
| Engagement rate | Engaged sessions divided by sessions | Use GA4 criteria consistently |
| Bounce rate | 1 minus engagement rate | Not simply exiting a one-page site |
| Engagement time | GA4 foreground engagement duration | Not total booking-consideration time |
| Section reach | Users with section_view divided by homepage users | Exposure, not proof of reading |
| Scroll reach | Users reaching each depth divided by page users | Affected by page length |
| Gallery engagement | Gallery-open users divided by gallery-exposed users | Interest in real property imagery |
| Planner adoption | Planner-interest users divided by planner-exposed users | Default untouched choice is not a click |
| Contact intent rate | Contact-click users divided by users | Separate WhatsApp, phone, email, maps and social |
| Form start rate | Form starters divided by contact-section users | Focus is not submission |
| Form attempt rate | Users attempting valid submission divided by starters | Excludes native-validation failures |
| Error rate | Users with form_error divided by starters | Separate validation and email-provider failures |
| Email success | Successful email-submit users divided by email-attempt users | Provider acceptance, not delivery or booking |
| Abandonment | Starters without later attempt in same session divided by starters | Ordered session funnel, not raw event subtraction |
| Video starts | Users starting each video | Includes autoplay; not deliberate interest |
| Video unmutes | Unmuting users divided by starters | Stronger intent signal |
| Video progress | Users reaching milestone divided by starters | Playback position; seeking can inflate; loops deduplicated |
| Channel conversion | Intent users or sessions divided by channel users or sessions | Keep denominator consistent |
| Cost per intent | Campaign spend divided by intent sessions | Requires cost data; not cost per actual enquiry |
| Qualified lead rate | Qualified leads divided by actual received enquiries | Requires offline lead log/CRM |
| Booking conversion | Confirmed bookings divided by qualified leads | Requires stable lead IDs and offline outcomes |
| Revenue, ROAS, CAC | Confirmed revenue; revenue/ad spend; spend/new customers | Not available from browser clicks |
| Search CTR | Search Console clicks divided by impressions | Search metrics, not GA4 events |
| AI referrals | Sessions with identifiable AI source/referrer | Lower bound; direct traffic is not necessarily AI |
| Core Web Vitals | p75 LCP, INP, CLS by device | Use Search Console/CrUX/PageSpeed; not instrumented here |

## Implemented event contract

Both homepage and /tadoba-stay.html share consent-gated collection. URLs exclude query strings/hashes; referrers are origins only. Controlled utm_source, utm_medium and utm_campaign tags are accepted. Use labels such as instagram/social/winter_tadoba, never personal information.

- page_view: once when GA4 initializes per document. GA4 supplies session/user/engagement events.
- section_view: once per identified section per document after consent, at 10% visibility. No dwell-time guarantee.
- scroll_depth: once at 25, 50, 75 and 90% per document.
- contact_click: outbound contact/social actions with channel and placement. Form WhatsApp handoffs use contact_form or landing_form.
- form_start: first field focus per form per document. form_attempt: valid submission after honeypot check. form_error: first native-validation error per document or provider failure. generate_lead: successful EmailJS response only.
- planner_interest, gallery_open, gallery_filter: intentional clicks; no dates, guest names or messages.
- video_start, video_unmute, video_progress: deduplicated per film/milestone/page. Starts distinguish muted/audible playback; milestones are 25/50/75/95%.
- faq_open: summary interactions including saved-review disclosures; clicks include closing, so interpret as disclosure interaction.

No session replay, keystroke capture, advertising pixels, precise location, customer identities, CRM imports, paid subscriptions or scheduled crawlers were added. Browser events are not proof of a WhatsApp message being sent, a call answered, room demand, occupancy or revenue.

## Dashboard specification

Use a private GA4/Looker Studio report with date comparison and filters for device, source/medium/campaign, landing page, new/returning and geography.

1. Executive: active users, sessions, contact-intent users, successful emails, intent rate, acquisition trend and coverage caveat. Offline enquiries/bookings belong in separate cards.
2. Acquisition: channels/campaigns, engaged sessions, landing pages, intent rates. Later compare qualified outcomes; cheap traffic alone is not success.
3. Funnel: landing → stay section → contact/planner → form_start → form_attempt → contact_click or generate_lead. Include a separate direct-WhatsApp path. Use ordered session-scoped steps, state open/closed funnel and time window.
4. Content: gallery/review reach, film starts/unmutes/progress, downstream contact intent. Exposure/conversion correlations are not proof of causal uplift.
5. Retention: acquisition-week cohorts with D1/D7/D30 return and 7/30-day contact intent. Exclude immature cohorts. Compare seasonally; WAU/MAU is often more useful than daily habit for travel.
6. Reliability: form errors, mobile/desktop conversion and external performance reports. Track consent acceptance separately only if a suitable non-identifying system is approved; this implementation does not measure non-consenting users.
7. Search/AI: non-brand search impressions/clicks, index status, attributable AI referral sessions and conversion; citation audit described below.

Establish a 30-day baseline before setting targets. Review weekly and monthly, with seasonal comparisons where available. Always display numerators and denominators for small samples. Investigate stable traffic with declining contact intent, growing validation errors, weak mobile conversion or high photo engagement without enquiry intent. Configure alerts in the provider after baseline; no automated alerts are installed.

## Search and generative-AI discovery

Existing canonical URLs, Hotel structured data, sitemap, robots.txt, verification markup and landing page are preserved. The build now renders homepage HTML so resort facts and links are available without executing JavaScript. Existing rating snapshots and rates must be maintained; schema must match visible content.

1. Verify Search Console and Bing ownership, submit sitemap, inspect both URLs, check canonical/noindex/firewall behavior. Crawl permission is not an indexing guarantee.
2. Maintain the Google Business Profile with exact name/address/phone, appropriate category, current media and authentic reviews. Keep official links consistent. Never buy reviews or fabricate demand.
3. Publish useful, verified topic pages: room layouts/occupancy, meal inclusions, pool rules, accessibility, policies, getting there and safari-planning FAQs. Obtain resort confirmation and official safari sources before adding times, distances or rules. Avoid duplicate keyword/location doorway pages.
4. Add approved captions/transcripts for videos and written descriptions of amenities. Celebrity visits must not be presented as formal endorsements without evidence.
5. Earn legitimate local/travel citations and partner coverage. Original local expertise and consistent factual information are more useful than generic travel filler.
6. OAI-SearchBot concerns OpenAI search crawling; GPTBot concerns model-training crawling. They are separate controls. Existing wildcard allow remains unchanged. Check verified bot IPs when diagnosing firewalls; user-agent names alone are not authentication. Allowing search bots cannot guarantee a ChatGPT citation or top placement.
7. Maintain a monthly manual panel of 15–20 realistic prompts across chosen AI apps: for example family stays near Tadoba with a pool, or Tadoba accommodation with meals. Record date, app/model, locale, prompt, citation links, whether Gondwana appears and factual accuracy. Repeat conditions and sample multiple responses. Mention share in this sample is not global ranking or market share. No AI-app scraping is installed.
8. There is no guaranteed first position in generative AI. Google says standard SEO remains relevant and no special AI schema is required. Treat llms.txt as optional, not a ranking shortcut.

## Sources and outstanding work

- [GA4 events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config)
- [GA4 stickiness](https://support.google.com/analytics/answer/12993725)
- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)

Owner actions remaining: create GA4 property, provide measurement ID, choose retention/privacy settings, validate real event receipt, and configure provider dashboards/key events. Account-level verification requires that property. Booking/revenue attribution and automated AI citation monitoring are separate future integrations.
