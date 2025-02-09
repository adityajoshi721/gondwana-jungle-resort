import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📞 9921150541 / 8652203337</p>
          <p>📧 <a href="mailto:gondwana357@gmail.com">gondwana357@gmail.com</a></p>
        </div>

        {/* Booking Links */}
        <div className="footer-section">
          <h3>Book Your Stay</h3>
          <ul>
            <li><a href="https://www.makemytrip.com/hotels/gondwana_jungle_resort-details-chimur.html" target="_blank" rel="noopener noreferrer">MakeMyTrip</a></li>
            <li><a href="https://www.tripadvisor.in/Hotel_Review-g10594632-d23966740-Reviews-Gondwana_Premium_Jungle_Homes-Chimur_Chandrapur_District_Maharashtra.html" target="_blank" rel="noopener noreferrer">TripAdvisor</a></li>
            <li><a href="https://www.easemytrip.com/hotels/gondwana-jungle-resort-5034756/" target="_blank" rel="noopener noreferrer">EaseMyTrip</a></li>
          </ul>
        </div>

        {/* Google Profile */}
        <div className="footer-section">
          <h3>Find Us on Google</h3>
          <a href="https://g.co/kgs/Z17DKkX" target="_blank" rel="noopener noreferrer">Google Profile</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2024 Gondwana Jungle Resort. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
