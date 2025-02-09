import React from "react";
import "./Amenities.css";
import img1 from "../assets/aminity1.jpg";
import img2 from "../assets/aminity2.jpg";
import img3 from "../assets/aminity3.jpg";
import img4 from "../assets/aminity4.jpg";
import img5 from "../assets/aminity5.jpg";
import img6 from "../assets/aminity6.jpg";

const Amenities = () => {
  return (
    <section className="amenities">
      <h2 className="amenities-title">🏡 Amenities for a Perfect Stay – Comfort Meets Wilderness!</h2>

      {/* First Row of Images */}
      <div className="amenities-grid">
        <div className="amenity-item"><img src={img1} alt="Amenity 1" /><p>Swimming Pool</p></div>
        <div className="amenity-item"><img src={img2} alt="Amenity 2" /><p>Lawns</p></div>
        <div className="amenity-item"><img src={img3} alt="Amenity 3" /><p>Cozy Rooms</p></div>
      </div>

      {/* Text Section */}
      <div className="amenities-text">
        <p>
        Nestled in the heart of Tadoba National Park, our eco-friendly jungle resort offers the perfect fusion of luxury and nature. Experience the thrill of wildlife safaris, unwind in lush landscapes, and immerse yourself in the beauty of the Tadoba-Andhari Tiger Reserve. Whether you're an adventurer, a nature enthusiast, or seeking relaxation, we promise an unforgettable retreat.
        </p>
      </div>

      {/* Second Row of Images */}
      <div className="amenities-grid">
        <div className="amenity-item"><img src={img4} alt="Amenity 4" /><p>Dining Area</p></div>
        <div className="amenity-item"><img src={img5} alt="Amenity 5" /><p>Reception Area</p></div>
        <div className="amenity-item"><img src={img6} alt="Amenity 6" /><p>Amphitheatre</p></div>
      </div>
    </section>
  );
};

export default Amenities;
