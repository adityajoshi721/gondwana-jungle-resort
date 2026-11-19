# Gondwana Jungle Resort

React + Vite website for Gondwana Jungle Resort near Tadoba. The page uses the resort's existing photography, video, review screenshots and contact details. The published starting room rate is ₹6,999 per room per night for two guests, including meals and taxes. Safari charges are separate. The resort confirms availability and current rates for each enquiry.

## Run locally

```bash
npm ci
npm run dev
```

Build with `npm run build`. The static output is in `dist/`.

## Enquiries and tracking

The homepage form and `/tadoba-stay.html` landing page open WhatsApp with a prepared message to +91 99211 50541. Visitors must press Send in WhatsApp to complete the enquiry. Both pages include a source label from `utm_campaign`, and push `whatsapp_open` events to `window.dataLayer`. The landing page also pushes `phone_click`. These events are only hooks until a tag manager or analytics tool is configured. Conversations and confirmed bookings must be recorded in the lead tracker by the resort team.

The landing page is a static, crawlable page for search ads and organic discovery. `robots.txt`, `sitemap.xml`, canonical tags, and Hotel structured data are included. The page does not accept payments or reserve inventory.

## Optional EmailJS delivery

To enable direct email delivery from the homepage form, create an [EmailJS](https://www.emailjs.com/) account and connect a service to the resort's verified inbox. Create a template using `{{from_name}}`, `{{reply_to}}`, `{{phone}}`, `{{dates}}`, `{{guests}}`, `{{message}}` and `{{to_email}}`. Set the template's recipient to the verified resort inbox and its reply-to to `{{reply_to}}`. Do not rely on a visitor-controlled recipient field to choose where enquiries go. The landing page continues to use WhatsApp.

Set the three values in `.env.example` as environment variables in your hosting provider, or copy that file to an untracked `.env.local` for local development:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

These are EmailJS browser identifiers, so Vite includes them in the public build. Never put a private email password or server API secret in a `VITE_` variable. EmailJS should have its domain allowlist and abuse protection configured. Test delivery after deployment with a real enquiry and check that the reply-to reaches the guest's address.

## Deploy

This repository is connected to the Gondwana Vercel project and its production domain. Vercel builds with `npm run build` and publishes `dist`. If EmailJS is enabled later, add the environment variables to the Vercel project and test a real delivery. No booking system or payment handling is included.

The existing WhatsApp, Instagram, YouTube and Google Maps links remain in the site. Update them if the resort's official profiles or phone number change.

## November 2026 refresh

The six client-supplied room photographs are in `public/media/room-1.webp` through `room-6.webp`, in original filename order (09.48.24, 09.48.28, 09.48.30, 09.48.31, 09.49.55, 09.49.57). Views 3 and 6 lead the rooms section; all six appear in the filterable gallery. No room category or occupancy is inferred from a photograph.

The supplied 09.52.29 video is `guest-visit.mp4`; 09.52.30 is `resort-tour.mp4`. Both preserve original audio and content, with compressed playback files and extracted poster images. Videos use controls and `preload="none"`. Earlier exterior, pool and dining imagery remains because the new delivery contains no replacement stills for those areas. Originals remain in the client ZIP.

The stay planner generates a WhatsApp enquiry with interest, group size and optional dates. It does not reserve anything, quote prices, store guest information or require a backend. WhatsApp opens for the visitor to review and send. EmailJS configuration remains as documented above; without it, the homepage form opens WhatsApp.

Validation: `node node_modules/vite/bin/vite.js build` and `node scripts/verify-refresh.mjs`. The latter checks server rendering and local media references, not browser interactions. Desktop/mobile visual review remains necessary: browser preview permission was declined during this refresh.

Suggested next differentiators (require resort input): a verified illustrated property map; a pre-arrival guide with confirmed access/gate information; professionally captioned room and resort films; and an accessible 360-degree room tour from a dedicated shoot. Do not publish timings, distances, policies or inclusions until the resort confirms them.

## Guestbook section

Guest feedback now appears immediately after the hero. It includes both available guest-feedback films (the supplied celebrity visit and existing VID-20250730-WA0003), all eight saved Google review screenshots with readable excerpts, and a link to the complete live Google collection. It is not an automatically synchronized feed of every Google review.

The static 4.7/5 rating comes from Google's indexed listing retrieved on 9 November 2026: https://www.google.co.in/travel/hotels/entity/CgoIjM_mg9emsux-EAE . The review count was removed because it changes. Refresh the rating manually against Google. Mrunmayee Deshpande's visit is attributed from the client's explicit confirmation and the supplied resort film's title; no formal endorsement or brand ambassadorship is claimed. No occupancy, growth or repeat-guest percentage has been invented.
