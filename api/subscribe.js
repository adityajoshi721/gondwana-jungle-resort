const json = (res, status, body) => res.status(status).setHeader('Cache-Control', 'no-store').json(body);

export default async function subscribe(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });
  const origin = req.headers.origin;
  if (origin && origin !== 'https://gondwanajungleresorts.com' && origin !== 'https://www.gondwanajungleresorts.com') {
    return json(res, 403, { error: 'Invalid origin.' });
  }
  const { BREVO_API_KEY: key, BREVO_LIST_ID: listId, BREVO_DOI_TEMPLATE_ID: templateId } = process.env;
  if (!key || !/^\d+$/.test(listId || '') || !/^\d+$/.test(templateId || '')) {
    return json(res, 503, { error: 'Updates signup is not available yet. Please try again later.' });
  }
  const body = req.body || {};
  if (body.website) return json(res, 200, { message: 'Please check your inbox for a confirmation email.' });
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || body.emailConsent !== true) {
    return json(res, 400, { error: 'Enter a valid email and agree to receive updates.' });
  }
  if (phone && !/^\+?[0-9 ()-]{7,22}$/.test(phone)) return json(res, 400, { error: 'Enter a valid phone number or leave it blank.' });
  if (body.phoneConsent === true && !phone) return json(res, 400, { error: 'Enter a phone number for phone updates.' });
  const attributes = {};
  if (phone && body.phoneConsent === true) attributes.SMS = phone.replace(/[^+\d]/g, '');
  if (phone && body.phoneConsent === true) attributes.SMS_CONSENT = true;
  const payload = {
    email,
    includeListIds: [Number(listId)],
    templateId: Number(templateId),
    redirectionUrl: 'https://gondwanajungleresorts.com/updates-confirmed.html',
    contactPixelTrackingConsent: false,
    ...(Object.keys(attributes).length ? { attributes } : {}),
  };
  try {
    const response = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return json(res, 502, { error: 'Signup could not be completed. Please try again later.' });
    return json(res, 200, { message: 'Please check your inbox and confirm your subscription.' });
  } catch {
    return json(res, 502, { error: 'Signup could not be completed. Please try again later.' });
  }
}
