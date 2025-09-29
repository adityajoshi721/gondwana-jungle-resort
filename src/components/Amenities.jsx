import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Keep your existing paths (using a subset to reduce clutter)
import img01 from "../assets/topView.jpg";
import img02 from "../assets/swimmingpool.webp";
import img03 from "../assets/building2.jpg";
import img04 from "../assets/junglebazar.webp";
import img05 from "../assets/junglebazar1.webp";
import img06 from "../assets/Room1.jpg";
import img07 from "../assets/guest1.webp";
import img08 from "../assets/guest2.webp";
import img09 from "../assets/guest3.webp";
import img10 from "../assets/guest4.webp";
import img11 from "../assets/guest5.webp";
import img12 from "../assets/guest6.webp";
import img13 from "../assets/guest7.webp";
import img14 from "../assets/Room2.jpg";
import img15 from "../assets/guest2.webp";
import img16 from "../assets/guest2.webp";

const ALL_IMAGES = [
  img01, img02, img03, img04, img05, img06,
  img07, img08, img09, img10, img11, img12,
  img13, img14, img15, img16
];

// Use fewer images: 6 property + 6 guests (bigger, nicer)
const PROPERTY_IMAGES = ALL_IMAGES.slice(0, 6);
const GUEST_IMAGES    = ALL_IMAGES.slice(6, 12);

// Lightbox slides (single carousel for all displayed images, in order)
const SLIDES = [...PROPERTY_IMAGES, ...GUEST_IMAGES].map(src => ({ src }));

export default function Amenities() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const openLightbox = (index) => {
    setLbIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <style>{`
        .amenities {
          display: grid;
          gap: 40px; /* more breathing room */
        }
        .amenities .panel {
          background: var(--card, #fff);
          border: 1px solid var(--border, #eaeaea);
          border-radius: 16px;
          padding: 24px;
        }
        .section-title {
          margin: 0 0 6px 0;
        }
        .section-subtitle {
          color: var(--muted, #666);
          margin: 0 0 18px 0;
        }

        /* 2x3 on large, 2x2 on medium, 1x? on small */
        .gallery-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 720px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .gallery-item {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 4 / 3; /* wider tiles feel airier */
          background: #f5f5f5;
          cursor: pointer;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .gallery-item:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Middle text block spacing */
        .split-middle {
          display: grid;
          gap: 24px;
        }
        @media (min-width: 900px) {
          .split-middle {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }
      `}</style>

      <div className="amenities">
        {/* Grid 1: Property Photos (2x3) */}
        <div className="panel" style={{ gridColumn: "1 / -1" }}>
          <h3 className="section-title">Property Photos</h3>
          <p className="section-subtitle">Rooms, pool, lawns, and serene corners</p>
          <div className="gallery-grid">
            {PROPERTY_IMAGES.map((src, i) => (
              <div
                key={`prop-${i}`}
                className="gallery-item"
                onClick={() => openLightbox(i)} /* first 6 images start at index 0 */
                role="button"
                aria-label={`Open property photo ${i + 1}`}
              >
                <img src={src} alt={`Gondwana property photo ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Middle textual section */}
        <div className="split-middle">
          <div className="panel">
            <h3>Highlights</h3>
            <ul className="list" style={{ marginTop: 12 }}>
              <li>Forest-view swimming pool</li>
              <li>Lush lawns & amphitheatre</li>
              <li>Conference hall for offsites</li>
              <li>Agro farm — fresh veggies daily</li>
              <li>Guided safaris & nature walks</li>
            </ul>
          </div>

          <div className="panel">
            <h3>Dining</h3>
            <p className="card__text">
              Enjoy hearty Indian meals with local specials, fresh salads, and seasonal fruits from our farm.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <span className="badge">Veg & Non-veg</span>
              <span className="badge">Kid friendly</span>
              <span className="badge">Packed breakfast for safari</span>
            </div>
          </div>
        </div>

        {/* Grid 2: Happy Guests (2x3) */}
        <div className="panel" style={{ gridColumn: "1 / -1" }}>
          <h3 className="section-title">Happy Guests</h3>
          <p className="section-subtitle">Smiles, memories, and moments from Gondwana</p>
          <div className="gallery-grid">
            {GUEST_IMAGES.map((src, i) => {
              const startIndex = PROPERTY_IMAGES.length; // 6
              const slideIndex = startIndex + i;         // 6..11
              return (
                <div
                  key={`guest-${i}`}
                  className="gallery-item"
                  onClick={() => openLightbox(slideIndex)}
                  role="button"
                  aria-label={`Open guest photo ${i + 1}`}
                >
                  <img src={src} alt={`Gondwana guest photo ${i + 1}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Carousel */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lbIndex}
        slides={SLIDES}
        carousel={{ finite: false }}
        animation={{ swipe: 300, fade: 250 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
