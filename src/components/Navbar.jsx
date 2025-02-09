import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = ({ homeRef, aboutRef, amenitiesRef, reviewsRef, bookNowRef, socialsRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to Smoothly Scroll to Sections
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // Close menu on mobile after clicking
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Gondwana Resorts" />
        <span>Gondwana Jungle Resorts</span>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <button onClick={() => scrollToSection(homeRef)}>Home</button>
        <button onClick={() => scrollToSection(aboutRef)}>About Us</button>
        <button onClick={() => scrollToSection(amenitiesRef)}>Amenities</button>
        <button onClick={() => scrollToSection(reviewsRef)}>Reviews</button>
        <button onClick={() => scrollToSection(bookNowRef)}>Book Now</button>
        <button onClick={() => scrollToSection(socialsRef)}>Our Socials</button>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
