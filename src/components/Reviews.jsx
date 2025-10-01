import React from "react";

// Review screenshots (keep as-is)
import review1 from "../assets/review1.png";
import review2 from "../assets/review2.png";
import review3 from "../assets/review3.png";
import review4 from "../assets/review4.png";
import review5 from "../assets/review5.png";
import review6 from "../assets/review6.png";
import review7 from "../assets/review7.png";
import review8 from "../assets/review8.png";

const reviewImages = [
  review1, review2, review3, review4,
  review5, review6, review7, review8
];

const Reviews = () => {
  return (
    <section className="reviews">
      <style>{`
        .reviews {
          padding: 64px 20px;
          background: linear-gradient(180deg, var(--bg-alt), var(--bg));
        }

        .reviews-head {
          max-width: 800px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .reviews-title {
          font-size: 1.9rem;
          margin-bottom: 12px;
          font-weight: 700;
          color: var(--accent); /* warm yellow highlight */
        }

        .reviews-subtitle {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.6;
        }

        .reviews-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 768px) {
          .reviews-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .reviews-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .review-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.45);
          border-color: var(--accent-2); /* leaf green border glow */
        }

        .review-image {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          background: var(--bg-alt);
        }
      `}</style>

      <div className="reviews-head">
        <h2 className="reviews-title">
          ⭐ Guest Reviews – 4.8★ Rated by 20,000+ Happy Visitors
        </h2>
        <p className="reviews-subtitle">
          Real stories from real guests who stayed at <strong>Gondwana Jungle Resort</strong>.  
          Their experiences speak for themselves!
        </p>
      </div>

      <div className="reviews-grid">
        {reviewImages.map((image, index) => (
          <div className="review-card" key={index}>
            <img
              src={image}
              alt={`Google Review ${index + 1}`}
              className="review-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
