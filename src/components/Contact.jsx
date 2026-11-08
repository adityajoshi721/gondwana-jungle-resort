import { useState } from "react";
import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const emailReady = Boolean(serviceId && templateId && publicKey);
const inbox = "gondwana357@gmail.com";

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
      const subject = encodeURIComponent("Gondwana stay enquiry");
      const body = encodeURIComponent(`Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\nTravel dates: ${fields.dates || "Not specified"}\nGuests: ${fields.guests || "Not specified"}\n\nMessage:\n${fields.message}`);
      window.location.href = `mailto:${inbox}?subject=${subject}&body=${body}`;
      setStatus("Your email app should open with a prepared enquiry. Send the message there to complete it.");
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
        message: fields.message,
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
      <label>Email address <input name="email" type="email" autoComplete="email" required /></label>
    </div>
    <div className="form-row">
      <label>Phone / WhatsApp <input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Travel dates <input name="dates" type="text" placeholder="If known" /></label>
    </div>
    <label>Number of guests <input name="guests" type="number" min="1" placeholder="If known" /></label>
    <label>Your message <textarea name="message" rows="4" placeholder="Tell us what you are planning" required /></label>
    <div className="honeypot" aria-hidden="true"><label>Website <input name="website" tabIndex="-1" autoComplete="off" /></label></div>
    <button className="button" type="submit" disabled={sending}>{sending ? "Sending…" : emailReady ? "Send enquiry ↗" : "Prepare email ↗"}</button>
    {!emailReady && <p className="form-note">This opens your email app so you can send the prepared enquiry.</p>}
    <p className="form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
