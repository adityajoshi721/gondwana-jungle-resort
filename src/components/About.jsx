import React from "react";
import aboutImage from "../assets/about.jpg"; // replace with your image

export default function About() {
  return (
    <div className="split about-section">
      {/* Left panel with text */}
      <div className="panel">
        <h3>Who We Are</h3>
        <p className="card__text" style={{ marginBottom: "1rem" }}>
          Gondwana Jungle Resort is proudly owned and managed by{" "}
          <strong>Mr. Vinayak Joshi</strong> and <strong>Mrs. Anjali Joshi</strong>, 
          blending a passion for wildlife with warm hospitality. 
          We’ve become a trusted destination for guests seeking both comfort and adventure near Tadoba.
        </p>

        {/* Highlight Stats */}
        <div className="stats-grid" style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
          {/* <div className="stat-card">
            <h2>5,000+</h2>
            <p>Guests hosted in just 2 years</p>
          </div> */}
          <div className="stat-card">
            <h2>85%+</h2>
            <p>Chance of tiger spotting on our recommended safaris</p>
          </div>
          <div className="stat-card">
            <h2>4.8★ </h2>
            <p>Average rating on Google & travel platforms</p>
          </div>
          <div className="stat-card">
            <h2>Daily</h2>
            <p>Guides with in-depth jungle experience</p>
          </div>
        </div>
      </div>

      {/* Right panel with image */}
      <div className="panel" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3>Location</h3>
        <p className="card__text">
          Situated near the gates of <strong>Tadoba National Park</strong>, 
          our resort offers prime access to Central India’s breathtaking tiger reserves. 
          We help plan every detail — gates, timings, transfers, and itineraries — 
          for a seamless safari experience.
        </p>
        <a
          className="cta"
          href="https://www.google.com/maps/place/gondwana+jungle+resort/data=!4m2!3m1!1s0x3a2cb53cdc3cd7ab:0x7ed8c9357079a78c?sa=X&ved=1t:242&ictx=111"
          target="_blank"
          rel="noreferrer"
        >
          Open in Google Maps
        </a>

        {/* Image placeholder */}
        <div style={{ marginTop: "1.5rem" }}>
          <img
            src={aboutImage}
            alt="Owners or Resort View"
            style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
