# Updates signup setup

The homepage has a separate email and optional phone signup. Stay enquiries do not enroll people. The signup endpoint returns an unavailable message until the provider is configured. No visitor address or number is stored by this repository or Google Analytics.

Use a resort-owned Brevo account. Create an email list for confirmed updates and a double opt-in confirmation template. Its confirmation link must use Brevo's `{{ params.DOIurl }}` value, which points to `/updates-confirmed.html`. Ensure marketing emails include Brevo's unsubscribe link and the resort's accurate sender details. Create a boolean contact attribute named `SMS_CONSENT` before accepting optional phone signups. The built-in `SMS` contact attribute stores a phone number only when the separate phone-updates checkbox is selected. Do not send phone or SMS campaigns until the resort has checked number verification, channel rules and required sender registration.

In the Vercel project's Production environment, set `BREVO_API_KEY` (secret/encrypted), `BREVO_LIST_ID` and `BREVO_DOI_TEMPLATE_ID`, then redeploy. These values must never be exposed as `VITE_` variables. With a valid configuration, the server calls Brevo's double-opt-in API. The visitor must confirm the email before entering the updates list. A 201 response means the confirmation workflow was accepted, not that the email was delivered or opened. The UI reports service errors without exposing provider details or the API key.

Before launch, submit a test address the resort controls, confirm it, check the list and optional `SMS_CONSENT` attribute, verify unsubscribe, and verify contact details are absent from GA4 and Vercel logs. Avoid using a real visitor's details for testing. Keep the list separate from operational enquiry contacts. Review the privacy page with the resort owner and legal adviser before sending campaigns.

[Brevo double-opt-in API](https://developers.brevo.com/reference/create-doi-contact)
