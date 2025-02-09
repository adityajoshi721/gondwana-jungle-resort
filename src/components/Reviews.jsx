import React from "react";
import "./Reviews.css";
import review1 from "../assets/review1.png";
import review2 from "../assets/review2.png";
import review3 from "../assets/review3.png";
import review4 from "../assets/review4.png";
import review5 from "../assets/review5.png";
import review6 from "../assets/review6.png";
import review7 from "../assets/review7.png";
import review8 from "../assets/review8.png";

const reviewImages = [review1, review2, review3, review4, review5, review6, review7, review8];

const Reviews = () => {
  return (
    <section className="reviews">
      <h2 className="reviews-title">⭐ What Our Guests Say – Real Experiences, Real Joy!</h2>
      <div className="reviews-grid">
        {reviewImages.map((image, index) => (
          <div className="review-card" key={index}>
            <img src={image} alt={`Google Review ${index + 1}`} className="review-image" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
