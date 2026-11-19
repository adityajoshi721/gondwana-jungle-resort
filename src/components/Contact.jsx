import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailReady = Boolean(serviceId && templateId && publicKey);
const inbox = "gondwana357@gmail.com";

function enquirySource() {
  const params = new URLSearchParams(window.location.search);
  const campaign = (params.get("utm_campaign") || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48);
  return campaign ? `Website / ${campaign}` : "Website / homepage";
}

export default function Contact() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // Honeypot field for basic spam filtering.
    const fields = Object.fromEntries(data.entries());
    setStatus("");

    if (!emailReady) {
      const message = `Hello Gondwana, I would like to check room availability.\nName: ${fields.name}\nPhone: ${fields.phone}\nOrigin city: ${fields.city || "Not specified"}\nTravel dates: ${fields.dates || "Flexible"}\nGuests: ${fields.guests}\nMessage: ${fields.message || "Please share available options."}\nSource: ${enquirySource()}`;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "whatsapp_open", enquiry_source: enquirySource() });
      window.location.href = `https://wa.me/919921150541?text=${encodeURIComponent(message)}`;
      setStatus("WhatsApp is opening. Press Send there to complete your enquiry.");
      return;
    }

    setSending(true);
    try {
      await emailjs.send(serviceId, templateId, {
        from_name: fields.name,
        reply_to: fields.email,
        phone: fields.phone,
        dates: fields.dates || "Not specified",
        guests: fields.guests || "Not specified",
        message: `Origin city: ${fields.city || "Not specified"}\n${fields.message || "Please share available options."}`,
        to_email: inbox,
      }, { publicKey });
      form.reset();
      setStatus("Thank you. Your enquiry has been sent.");
    } catch {
      setStatus("The enquiry could not be sent. Please try WhatsApp, call us, or email us directly.");
    } finally {
      setSending(false);
    }
  }

  return <form className="enquiry-form" onSubmit={submit}>
    <h3>Send an enquiry</h3>
    <p>We’ll be in touch about your visit.</p>
    <div className="form-row">
      <label>Your name <input name="name" autoComplete="name" required /></label>
      <label>Email address {emailReady ? "" : "(optional)"}<input name="email" type="email" autoComplete="email" required={emailReady} /></label>
    </div>
    <div className="form-row">
      <label>Phone / WhatsApp <input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Travel dates <input name="dates" type="text" placeholder="If known" /></label>
    </div>
    <div className="form-row"><label>Number of guests <input name="guests" type="number" min="1" required /></label><label>Origin city <input name="city" autoComplete="address-level2" placeholder="Where will you travel from?" /></label></div>
    <label>Your message <textarea name="message" rows="4" placeholder="Tell us what you are planning" /></label>
    <div className="honeypot" aria-hidden="true"><label>Website <input name="website" tabIndex="-1" autoComplete="off" /></label></div>
    <button className="button" type="submit" disabled={sending}>{sending ? "Sending…" : emailReady ? "Send enquiry ↗" : "Continue to WhatsApp ↗"}</button>
    {!emailReady && <p className="form-note">WhatsApp opens with your details. Press Send there to reach the resort. No request is sent until you do.</p>}
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}

