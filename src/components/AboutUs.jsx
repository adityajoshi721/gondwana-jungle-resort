import React from "react";
import "./AboutUs.css";
import resortvideo from "../assets/resort-video.mp4"
const AboutUs = () => {
  return (
    <section className="about">
      <div className="about-content">
        <h2>🌿 About Us – Embracing Nature, Creating Memories!</h2>
        <p>
        At Gondwana Premium Jungle Homes, we seamlessly blend nature with cozy accommodations for a serene escape. Enjoy a swimming pool, jungle dining, and an amphitheater, all designed to provide tranquility with a premium experience.
        </p>
      </div>
      <div className="about-video">
        <video controls autoPlay muted loop>
          <source src={resortvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default AboutUs;
