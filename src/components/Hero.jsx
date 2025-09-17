import React from "react";
import reelVideo from "../assets/VID-20250730-WA0001.mp4"; // Instagram reel style video

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero__card">
          <div className="kicker">Tadoba • Jungle Resort</div>
          <h1 className="h1">Wake up to birdsong, sleep to starlight.</h1>
          <p className="lede">
            Prime location near Tadoba National Park. Premium cottages, forest-view pool, lush lawns,
            amphitheatre, and a farm that grows our veggies.
          </p>
          <div className="badges">
            <span className="badge">Machan Stay</span>
            <span className="badge">Safari Assistance</span>
            <span className="badge">Family Friendly</span>
            <span className="badge">Group Packages</span>
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
            <a className="cta" href="#rooms">View Rooms</a>
            <a
              className="cta"
              href="#contact"
              style={{ background: "linear-gradient(135deg, var(--accent-2), #2b8a3e)" }}
            >
              Enquire
            </a>
          </div>
        </div>

        {/* Hero Video Div */}
        <div className="hero__video">
          <video
            src={reelVideo}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              objectFit: "cover",
              aspectRatio: "9 / 16", // Instagram reel dimension
            }}
          />
        </div>
      </div>
    </section>
  );
}
