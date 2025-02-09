import React from "react";
import "./OurSocials.css";
import instaImage from "../assets/instagram.webp"
const OurSocials = () => {
  return (
    <section className="our-socials">
      <h2>📲 Our Socials – Stay Connected, Stay Inspired!</h2>

      {/* YouTube Section */}
      <div className="socials-container">
        <div className="youtube-section">
          <h3>Watch Our Latest Video</h3>
          <iframe 
            width="100%" 
            height="300" 
            src="https://www.youtube.com/embed/gjhyCUBagDE" 
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Instagram Section */}
        <div className="instagram-section">
          <h3>Follow Us on Instagram</h3>
          <div className="instagram-embed">
            <a href="https://www.instagram.com/gondwana_tadoba" target="_blank" rel="noopener noreferrer">
              <img src={instaImage} alt="Instagram Preview" />
            </a>
          </div>
          <p>Follow us on Instagram for the latest updates and stunning jungle views!</p>
        </div>
      </div>
    </section>
  );
};

export default OurSocials;
