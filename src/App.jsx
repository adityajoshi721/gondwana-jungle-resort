import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Contact from "./components/Contact.jsx";
import logo from "./assets/image.png";
import hero from "./assets/building2.jpg";
import aerial from "./assets/topView.jpg";
import roomDouble from "./assets/room4.webp";
import roomGroup from "./assets/Room3.jpg";
import pool from "./assets/IMG-20250816-WA0036.jpg";
import dining from "./assets/diningarea.webp";
import bazaar from "./assets/junglebazar.webp";
import guests from "./assets/about.jpg";
import film from "./assets/VID-20250730-WA0001.mp4";

const whatsapp = "https://wa.me/919921150541?text=Hello%20Gondwana%2C%20I%27d%20like%20to%20enquire%20about%20a%20stay.";
const maps = "https://www.google.com/maps/place/gondwana+jungle+resort/data=!4m2!3m1!1s0x3a2cb53cdc3cd7ab:0x7ed8c9357079a78c";
const gallery = [
  { src: aerial, alt: "Aerial view of the resort and its green grounds", label: "The grounds" },
  { src: pool, alt: "The swimming pool beside the trees", label: "Forest-view pool" },
  { src: roomDouble, alt: "A guest room at Gondwana", label: "The rooms" },
  { src: dining, alt: "Dining room at Gondwana", label: "Dining" },
  { src: bazaar, alt: "The Jungle Bazaar interior", label: "Jungle Bazaar" },
  { src: guests, alt: "Guests gathered outside Gondwana", label: "At Gondwana" },
];
const reviews = [
  { name: "Kunal", quote: "Special mention for the food that is made here, its simple homely food buffet but the flavour will blow your mind." },
  { name: "Karan Singh", quote: "Their kindness and attention to detail made my visit truly special and memorable." },
  { name: "Harshad Sonawane", quote: "This is a good place to stay while you are visiting Tadoba Tiger Reserve." },
];

function Brand() {
  return <a className="brand" href="#top" aria-label="Gondwana Jungle Resort, back to top">
    <span className="brand-mark"><img src={logo} alt="" /></span>
    <span className="brand-name">Gondwana <small>Jungle Resort · Tadoba</small></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["About", "#about"], ["Stay", "#stay"], ["Amenities", "#amenities"], ["Gallery", "#gallery"], ["Reviews", "#reviews"], ["Location", "#location"]];
  return <header className="site-header"><div className="container header-inner">
    <Brand />
    <nav className={`nav-links ${open ? "is-open" : ""}`} id="primary-nav" aria-label="Main navigation">
      {links.map(([name, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{name}</a>)}
      <a className="button button-small" href="#contact" onClick={() => setOpen(false)}>Enquire now <span aria-hidden="true">↗</span></a>
    </nav>
    <button className="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
      <span aria-hidden="true">{open ? "✕" : "☰"}</span>
    </button>
  </div></header>;
}

function Heading({ eyebrow, title, intro }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{intro && <p>{intro}</p>}</div>;
}

export default function App() {
  const [galleryIndex, setGalleryIndex] = useState(-1);
  return <>
    <a className="skip-link" href="#main">Skip to content</a><div id="top" /><Header />
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy"><span className="eyebrow">A quieter side of Tadoba</span>
          <h1 id="hero-title">The forest is calling. <em>Stay a little longer.</em></h1>
          <p>Settle into a warm, unhurried stay near Tadoba’s wilderness. Explore the reserve, share a meal, and come back to the calm of Gondwana.</p>
          <div className="hero-actions"><a className="button" href="#stay">Explore your stay <span aria-hidden="true">↗</span></a><a className="text-link" href="#contact">Plan an enquiry <span aria-hidden="true">→</span></a></div>
          <div className="hero-notes"><span>Near Tadoba</span><span>Safari assistance</span><span>Forest-view pool</span></div>
        </div>
        <div className="hero-visual"><img src={hero} alt="Gondwana Jungle Resort building framed by green trees" fetchPriority="high" /><div className="hero-caption"><span />Your base for the wild</div></div>
      </section>
      <section className="intro-band"><div className="container intro-band-inner"><span className="eyebrow">Welcome to Gondwana</span><p>Rooted in nature. Made for the moments between adventures.</p><a href="#about" aria-label="Read about Gondwana">↘</a></div></section>
      <section className="section container about-grid" id="about">
        <div className="about-image"><img src={aerial} alt="Aerial view of the resort, its lawns and surrounding trees" loading="lazy" /><span className="image-tag">The place we call home</span></div>
        <div className="about-copy"><Heading eyebrow="01 / About us" title="A stay that feels close to nature." />
          <p>Gondwana Jungle Resort is a family-run retreat near Tadoba, owned and managed by Vinayak and Anjali Joshi. Their passion for wildlife and hospitality shapes a welcoming place to rest before and after a day in the forest.</p>
          <p>Spend easy hours by the pool, gather over a meal, or ask the team for help planning your safari.</p>
          <a className="text-link" href="#amenities">Discover the resort <span aria-hidden="true">→</span></a>
        </div>
      </section>
      <section className="section section-sand" id="stay"><div className="container">
        <div className="section-top"><Heading eyebrow="02 / Rooms & packages" title="Room to slow down." intro="Explore real spaces at Gondwana. Ask us about room availability, group stays and current packages for your dates." /><a className="text-link desktop-only" href="#contact">Ask about a stay <span aria-hidden="true">→</span></a></div>
        <div className="room-grid">
          <article className="room-card"><img src={roomDouble} alt="Double-bed guest room with a warm wood floor" loading="lazy" /><div className="room-card-body"><span className="eyebrow">Stay at Gondwana</span><h3>Guest rooms</h3><p>Comfortable rooms for the pause between forest adventures.</p><a className="text-link" href="#contact">Enquire about rooms <span aria-hidden="true">→</span></a></div></article>
          <article className="room-card"><img src={roomGroup} alt="Spacious guest room with two beds" loading="lazy" /><div className="room-card-body"><span className="eyebrow">Travel together</span><h3>Group stays</h3><p>Travelling with family or friends? Ask us which rooms and arrangements suit your group.</p><a className="text-link" href="#contact">Enquire about groups <span aria-hidden="true">→</span></a></div></article>
        </div>
        <div className="package-note"><span className="package-icon" aria-hidden="true">✳</span><p><strong>Planning a stay and safari?</strong> Tell us your travel dates and group size. The team can share current packages and assist with safari planning.</p><a className="button button-light" href="#contact">Ask for details <span aria-hidden="true">↗</span></a></div>
      </div></section>
      <section className="section container" id="amenities"><div className="section-top"><Heading eyebrow="03 / Life at Gondwana" title="The good parts of staying in." intro="A little space for every kind of day, whether you are heading out at dawn or taking it slow." /></div>
        <div className="amenity-grid"><article className="amenity-feature"><img src={pool} alt="Pool with a view of the surrounding trees" loading="lazy" /><div><span className="eyebrow">Take a dip</span><h3>Forest-view pool</h3></div></article>
          <div className="amenity-list">{[
            ["Dining", "Gather for meals after a day exploring Tadoba."],
            ["Lawns & amphitheatre", "Open-air spaces to unwind together."],
            ["Safari assistance", "Ask the team for help planning your forest visit."],
            ["More to explore", "Discover the resort’s agro farm and conference space."],
          ].map(([name, description], index) => <div key={name}><span className="amenity-number">0{index + 1}</span><h3>{name}</h3><p>{description}</p></div>)}</div>
        </div>
      </section>
      <section className="section section-gallery" id="gallery"><div className="container"><div className="section-top"><Heading eyebrow="04 / Gallery" title="A glimpse of Gondwana." intro="A few moments from the resort, captured in the place itself." /><span className="gallery-hint">Select a photo to view it larger</span></div>
        <div className="gallery-grid">{gallery.map((item, index) => <button className="gallery-item" type="button" key={item.label} onClick={() => setGalleryIndex(index)} aria-label={`View photo: ${item.alt}`}><img src={item.src} alt="" loading="lazy" /><span>{item.label} <span aria-hidden="true">↗</span></span></button>)}</div>
      </div><Lightbox open={galleryIndex >= 0} close={() => setGalleryIndex(-1)} index={Math.max(galleryIndex, 0)} slides={gallery.map(({src, alt}) => ({src, alt}))} /></section>
      <section className="section container film-grid" id="video"><div className="film-copy"><Heading eyebrow="05 / Watch" title="See the place. Feel the pace." intro="Take a short look at Gondwana and the forest around it." /><a className="text-link" href="https://www.youtube.com/@vjtigerfilms6145" target="_blank" rel="noopener noreferrer">Watch on YouTube <span aria-hidden="true">↗</span></a></div><div className="film-frame"><video src={film} controls playsInline preload="metadata" aria-label="Video glimpse of Gondwana and Tadoba" /><span className="film-label">A glimpse of Gondwana</span></div></section>
      <section className="section section-sand" id="reviews"><div className="container"><div className="section-top"><Heading eyebrow="06 / Guest reviews" title="Words from our guests." intro="Read the experiences shared by visitors, with more reviews available on Google." /><a className="text-link desktop-only" href={maps} target="_blank" rel="noopener noreferrer">View on Google <span aria-hidden="true">↗</span></a></div>
        <div className="review-grid">{reviews.map(({name, quote}) => <figure className="review-card" key={name}><span className="review-stars" aria-label="Five out of five stars">★★★★★</span><blockquote>“{quote}”</blockquote><figcaption>{name}<small>Google review · excerpt from the resort's collection</small></figcaption></figure>)}</div><a className="text-link mobile-only" href={maps} target="_blank" rel="noopener noreferrer">More reviews on Google <span aria-hidden="true">↗</span></a>
      </div></section>
      <section className="section container location-grid" id="location"><div className="location-copy"><Heading eyebrow="07 / Find us" title="Your gateway to Tadoba." intro="Gondwana Jungle Resort, Madanapur, Chimur, Vihirgaon, Maharashtra 442903." /><a className="button" href={maps} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a></div><iframe title="Google Map showing Gondwana Jungle Resort near Tadoba" src="https://www.google.com/maps?q=Gondwana%20Jungle%20Resort%20Madanapur%20Maharashtra&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></section>
      <section className="section contact-section" id="contact"><div className="container contact-grid"><div><Heading eyebrow="08 / Get in touch" title="Let’s plan your time in the wild." intro="Tell us when you would like to visit and what you have in mind. We’ll help you take the next step." /><div className="contact-direct"><a href="tel:+919921150541">+91 99211 50541</a><a href="mailto:gondwana357@gmail.com">gondwana357@gmail.com</a><a href={whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a></div></div><Contact /></div></section>
    </main>
    <footer className="footer"><div className="container footer-main"><div><Brand /><p>Find your own rhythm near the forest.</p></div><div><h2>Explore</h2><a href="#about">About us</a><a href="#stay">Rooms & packages</a><a href="#gallery">Gallery</a><a href="#location">Location</a></div><div><h2>Connect</h2><a href="https://www.instagram.com/gondwana_tadoba/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.youtube.com/@vjtigerfilms6145" target="_blank" rel="noopener noreferrer">YouTube ↗</a><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Gondwana Jungle Resort</span><span>Made for the journey to Tadoba.</span></div></footer>
  </>;
}
