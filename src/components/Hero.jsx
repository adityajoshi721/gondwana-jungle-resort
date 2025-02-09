import React from "react";
import "./Hero.css";
import heroImage from "../assets/hero-image.jpg"; // Add an actual image in the assets folder

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay">
        <h1>Welcome to Gondwana Jungle Resorts</h1>
        <p>🌿 <b>Experience the Untamed Beauty of Tadoba – Where Wilderness Meets Comfort, and Every Moment Becomes a Cherished Memory. </b>✨</p>
        {/* sy</a> */}
      </div>
    </section>
  );
};

export default Hero;
