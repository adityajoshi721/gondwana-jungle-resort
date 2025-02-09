import { useState } from 'react'
import viteLogo from '/vite.svg'
import React, { useRef } from "react";
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Amenities from './components/Aminities'
import Reviews from './components/Reviews'
import BookNow from './components/BookNow'
import OurSocials from './components/OurSocials'
import Footer from './components/Footer'
import WhatsAppChat from './components/WhatsAppChat';
import Gallery from './components/Gallery';

function App() {
  // Creating Refs for Each Section
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const amenitiesRef = useRef(null);
  const reviewsRef = useRef(null);
  const bookNowRef = useRef(null);
  const socialsRef = useRef(null);

  return (
    <div>
      <Navbar 
        homeRef={homeRef} 
        aboutRef={aboutRef} 
        amenitiesRef={amenitiesRef} 
        reviewsRef={reviewsRef} 
        bookNowRef={bookNowRef} 
        socialsRef={socialsRef} 
      />

      <section ref={homeRef}><Hero /></section>
      <section ref={aboutRef}><AboutUs /></section>
      <section ref={amenitiesRef}><Amenities /></section>
      <section ref={reviewsRef}><Reviews /></section>
      <section ref={bookNowRef}><BookNow /></section>
      <section ref={socialsRef}><OurSocials /></section>
      <Gallery/>
      <WhatsAppChat/>
      
      <Footer />
    </div>
  );
}

export default App
