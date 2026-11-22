import React, { useState } from 'react';

export function UpdatesForm({ onSubscribed }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setBusy(true); setMessage('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: data.email, phone: data.phone, emailConsent: data.emailConsent === 'on', phoneConsent: data.phoneConsent === 'on', website: data.website }),
      });
      const result = await response.json();
      setMessage(result.message || result.error || 'Please try again later.');
      if (response.ok) { setSuccess(true); form.reset(); onSubscribed?.(); }
    } catch { setMessage('Please try again later.'); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="updates-form"><div className="form-row"><label>Email address <input name="email" type="email" autoComplete="email" required maxLength="254" /></label><label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="Include country code" /></label></div>
      <label className="updates-consent"><input type="checkbox" name="emailConsent" required /> I agree to receive Gondwana email updates and a confirmation email.</label>
      <label className="updates-consent"><input type="checkbox" name="phoneConsent" /> I also agree to occasional phone or text updates at the number provided.</label>
      <div className="honeypot" aria-hidden="true"><label>Website <input name="website" tabIndex="-1" autoComplete="off" /></label></div>
      <button className="button" type="submit" disabled={busy || success}>{busy ? 'Submitting…' : success ? 'Check your inbox' : 'Subscribe to updates ↗'}</button>
      <p className="updates-small">Your details are sent to our subscription provider only when you submit. Read our <a href="/privacy.html">privacy information</a>.</p><p role="status" aria-live="polite">{message}</p>
    </form>;
}

export default function UpdatesSignup() {
  return <section className="updates-section" id="updates"><div className="container updates-grid">
    <div><span className="eyebrow">The Gondwana letter</span><h2>A little of Tadoba, in your inbox.</h2><p>Receive occasional resort news, stories from the forest and verified offers. Subscribe only if you would like to hear from us.</p><p className="updates-small">Your stay enquiry does not subscribe you. You can unsubscribe from email updates at any time.</p></div>
    <UpdatesForm />
  </div></section>;
}
