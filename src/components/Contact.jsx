import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact(){
  const [status, setStatus] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Replace with your EmailJS values
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "your_service_id";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "your_template_id";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key";

    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setStatus("Thanks! We’ll get back shortly.");
    } catch (err) {
      console.error(err);
      setStatus("Could not send. Please try WhatsApp.");
    }
  };

  return (
    <form className="panel" onSubmit={onSubmit}>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
        <input required name="name" placeholder="Your Name" style={inputStyle} />
        <input required name="phone" placeholder="Phone / WhatsApp" style={inputStyle} />
      </div>
      <input required name="email" type="email" placeholder="Email" style={{...inputStyle, marginTop:12}} />
      <textarea required name="message" rows={5} placeholder="Tell us your dates, number of guests, and any requests" style={{...inputStyle, marginTop:12, resize:"vertical"}} />
      <div style={{display:"flex", gap:12, marginTop:12}}>
        <button className="cta" type="submit">Send Enquiry</button>
        <a className="cta" href="https://wa.me/919999999999" target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg, var(--accent-2), #2b8a3e)"}}>WhatsApp</a>
      </div>
      {status && <p style={{marginTop:10, color:"var(--muted)"}}>{status}</p>}
    </form>
  );
}

const inputStyle = {
  width:"100%", padding:"12px 14px", borderRadius:"12px",
  border:"1px solid var(--border)", background:"rgba(255,255,255,0.03)",
  color:"var(--text)", outline:"none"
};
