import React from "react";
import jungleVideo from "../assets/VID-20250816-WA0009.mp4"; // adjust path if needed

export default function VideoSection() {
  return (
    <section id="video" className="section" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Experience the Jungle</h2>
          <p className="section__desc">
            A short glimpse — the hush of the forest, the chatter of birds, and the thrill of the safari.
          </p>
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="card__body">
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <video
                src={jungleVideo}
                controls
                autoPlay
                muted
                loop
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                  borderRadius: 12,
                  objectFit: "cover"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
