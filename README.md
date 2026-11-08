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
