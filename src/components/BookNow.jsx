import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./BookNow.css";
import bookingImage from "../assets/booking-image.jpeg"; // Add an actual image

const BookNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    checkin: "",
    checkout: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = "your_service_id"; // Replace with EmailJS Service ID
    const templateID = "your_template_id"; // Replace with EmailJS Template ID
    const publicKey = "your_public_key"; // Replace with EmailJS Public Key

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setStatus("Your booking request has been sent successfully!");
        setFormData({
          name: "",
          contact: "",
          email: "",
          checkin: "",
          checkout: "",
        });
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setStatus("Failed to send booking request. Please try again.");
      });
  };

  return (
    // <section className="book-now">
      <div className="book-now-container">
        {/* Left: Image */}
        <div className="book-now-image">
          <img src={bookingImage} alt="Book Now" />
        </div>

        {/* Right: Form */}
        <div className="book-now-form">
          <h2>🛎️ Book Now – Your Dream Stay Awaits!</h2>
          <p>Fill in your details and we’ll get back to you with availability and pricing.
            <br />
            <b>Contact Us at +91 99211 50541</b>
          </p>
          <form onSubmit={sendEmail}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Check-in Date</label>
              <input type="date" name="checkin" value={formData.checkin} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Check-out Date</label>
              <input type="date" name="checkout" value={formData.checkout} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-btn">Submit Booking</button>

            {status && <p className="status-message">{status}</p>}
          </form>
        </div>
      </div>
    // </section>
  );
};

export default BookNow;
