import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Rooms from "./components/Rooms.jsx";
import Gallery from "./components/Gallery.jsx";
import Amenities from "./components/Amenities.jsx";
import VideoSection from "./components/VideoSection.jsx";
import Articles from "./components/Articles.jsx";
import About from "./components/About.jsx";
import Reviews from "./components/Reviews.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App(){
  const [section, setSection] = useState("home");
  return (
    <>
      <Navbar onNavigate={setSection} />
      <main>
        <Hero />
        <VideoSection />
        {/* <div id="rooms" className="section container">
          <div className="section__head">
            <h2 className="section__title">Rooms & Packages</h2>
            <p className="section__desc">Curated stays that blend jungle calm with modern comfort. Simple pricing, flexible plans.</p>
          </div>
          <Rooms />
        </div> */}
        <Reviews />

        <div id="amenities" className="section container">
          <div className="section__head">
            <h2 className="section__title">Amenities</h2>
            <p className="section__desc">From a forest-view pool to farm-to-table dining, we make the wild feel wonderfully welcoming.</p>
          </div>
          <Amenities />
        </div>

        {/* <div id="gallery" className="section container">
          <div className="section__head">
            <h2 className="section__title">Gallery</h2>
            <p className="section__desc">A glimpse of dew-lit mornings, golden hours, and starry nights at Gondwana.</p>
          </div>
          <Gallery />
        </div> */}

        <div id="about" className="section container">
          <div className="section__head">
            <h2 className="section__title">About Us</h2>
            <p className="section__desc">Nestled near Tadoba, we are a family-run resort created by people who love the forest.</p>
          </div>
          <About />
        </div>

        <Articles />

        <div id="contact" className="section container">
          <div className="section__head">
            <h2 className="section__title">Enquiry</h2>
            <p className="section__desc">Ping us for dates, packages, or custom group bookings. We usually reply within a few hours.</p>
          </div>
          <Contact />
        </div>

      </main>
      <Footer />
    </>
  );
}
