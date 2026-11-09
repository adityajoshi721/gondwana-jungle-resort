# Gondwana Jungle Resort

React + Vite website for Gondwana Jungle Resort near Tadoba. The page uses the resort's existing photography, video, review screenshots and contact details. Room rates and packages are deliberately requested by enquiry rather than shown as fixed prices.

## Run locally

```bash
npm ci
npm run dev
```

Build with `npm run build`. The static output is in `dist/`.

## Email enquiries

The form works immediately as a prepared email opened in the visitor's email app. To enable direct delivery from the form, create an [EmailJS](https://www.emailjs.com/) account and connect a service to the resort's verified inbox. Create a template using `{{from_name}}`, `{{reply_to}}`, `{{phone}}`, `{{dates}}`, `{{guests}}`, `{{message}}` and `{{to_email}}`. Set the template's recipient to the verified resort inbox and its reply-to to `{{reply_to}}`. Do not rely on a visitor-controlled recipient field to choose where enquiries go.

Set the three values in `.env.example` as environment variables in your hosting provider, or copy that file to an untracked `.env.local` for local development:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

These are EmailJS browser identifiers, so Vite includes them in the public build. Never put a private email password or server API secret in a `VITE_` variable. EmailJS should have its domain allowlist and abuse protection configured. Test delivery after deployment with a real enquiry and check that the reply-to reaches the guest's address.

## Deploy

Import this repository into Vercel or Netlify as a Vite project. Use `npm run build` and publish `dist`. Add the EmailJS environment variables in that hosting project and redeploy. Point the resort domain to the hosting project only after reviewing the live preview and confirming the enquiry destination. No booking system or payment handling is included.

The existing WhatsApp, Instagram, YouTube and Google Maps links remain in the site. Update them if the resort's official profiles or phone number change.

## November 2026 refresh

The six client-supplied room photographs are in `public/media/room-1.webp` through `room-6.webp`, in original filename order (09.48.24, 09.48.28, 09.48.30, 09.48.31, 09.49.55, 09.49.57). Views 3 and 6 lead the rooms section; all six appear in the filterable gallery. No room category or occupancy is inferred from a photograph.

The supplied 09.52.29 video is `guest-visit.mp4`; 09.52.30 is `resort-tour.mp4`. Both preserve original audio and content, with compressed playback files and extracted poster images. Videos use controls and `preload="none"`. Earlier exterior, pool and dining imagery remains because the new delivery contains no replacement stills for those areas. Originals remain in the client ZIP.

The stay planner generates a WhatsApp enquiry with interest, group size and optional dates. It does not reserve anything, quote prices, store guest information or require a backend. WhatsApp opens for the visitor to review and send. EmailJS configuration remains as documented above; without it, the email form opens the visitor's email application.

Validation: `node node_modules/vite/bin/vite.js build` and `node scripts/verify-refresh.mjs`. The latter checks server rendering and local media references, not browser interactions. Desktop/mobile visual review remains necessary: browser preview permission was declined during this refresh.

Suggested next differentiators (require resort input): a verified illustrated property map; a pre-arrival guide with confirmed access/gate information; professionally captioned room and resort films; and an accessible 360-degree room tour from a dedicated shoot. Do not publish timings, distances, policies or inclusions until the resort confirms them.

## Guestbook section

Guest feedback now appears immediately after the hero. It includes both available guest-feedback films (the supplied celebrity visit and existing VID-20250730-WA0003), all eight saved Google review screenshots with readable excerpts, and a link to the complete live Google collection. It is not an automatically synchronized feed of every Google review.

The static 4.7/5 and 235 review figures come from Google's indexed listing retrieved on 9 November 2026: https://www.google.co.in/travel/hotels/entity/CgoIjM_mg9emsux-EAE . The visible source note makes clear that figures can change; refresh manually against Google. Mrunmayee Deshpande's visit is attributed from the client's explicit confirmation and the supplied resort film's title; no formal endorsement or brand ambassadorship is claimed. No occupancy, growth or repeat-guest percentage has been invented.
