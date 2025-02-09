import React from "react";
import "./Gallery.css";

// Import Images
import img1 from "../assets/gallery1.jpg";
import img2 from "../assets/gallery2.jpg";
import img3 from "../assets/gallery3.jpg";
import img4 from "../assets/gallery4.jpg";
import img5 from "../assets/gallery5.jpg";
import img6 from "../assets/gallery6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

const Gallery = () => {
  return (
    <section className="gallery">
      <h2> ✨ Memories That Last a Lifetime! ✨</h2>
      <p>From majestic tiger sightings to starry night campfires, every moment at Gondwana Jungle Homes is designed to be cherished forever. Whether it's a romantic getaway, a family vacation, or an adventure trip, we ensure your stay is filled with comfort, joy, and the magic of nature.</p>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <a href={`#lightbox-${index}`} key={index} className="gallery-item">
            <img src={image} alt={`Gallery ${index + 1}`} />
          </a>
        ))}
      </div>

      {/* Lightbox Sections for Each Image */}
      {images.map((image, index) => (
        <div id={`lightbox-${index}`} className="lightbox-overlay" key={index}>
          <div className="lightbox-content">
            <a href="#" className="close-lightbox">×</a>
            <img src={image} alt={`Lightbox ${index + 1}`} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Gallery;
