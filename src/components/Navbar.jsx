import React, { useEffect, useState } from "react";
import logoImg from "../assets/image.png"; // your logo image

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock/unlock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu if window is resized to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const handle = (e) => {
      if (e.matches) setOpen(false);
    };
    if (mq.addEventListener) mq.addEventListener("change", handle);
    else mq.addListener(handle); // Safari fallback
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handle);
      else mq.removeListener(handle);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="container inner">
        {/* Brand */}
        <a href="#" className="brand" onClick={closeMenu}>
          <span className="brand__logo">
            <img
              src={logoImg}
              alt="Gondwana Jungle Resort Logo"
              className="brand__logo-img"
            />
          </span>
          <span className="brand__text">Tadoba Tiger Safaris</span>
        </a>

        {/* Desktop links */}
        <div className="nav__links" aria-label="Primary">
          <a href="#rooms">Rooms</a>
          <a href="#amenities">Amenities</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#wildlife">Wildlife</a>
          <a href="#video">Video</a>
          <a href="#contact" className="cta">
            Enquire
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="nav__toggle"
          aria-expanded={open ? "true" : "false"}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__bar" />
          <span className="nav__bar" />
          <span className="nav__bar" />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        onClick={closeMenu}
      >
        <div
          className="mobile-menu__panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu__head">
            <span className="brand__logo">
              <img
                src={logoImg}
                alt="Gondwana Jungle Resort Logo"
                className="brand__logo-img"
              />
            </span>
            <span className="brand__text">Tadoba Tiger Safaris</span>
            <button
              className="nav__toggle nav__toggle--close"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              ✕
            </button>
          </div>
          <div className="mobile-menu__links">
            <a href="#rooms" onClick={closeMenu}>
              Rooms
            </a>
            <a href="#amenities" onClick={closeMenu}>
              Amenities
            </a>
            <a href="#gallery" onClick={closeMenu}>
              Gallery
            </a>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#wildlife" onClick={closeMenu}>
              Wildlife
            </a>
            <a href="#video" onClick={closeMenu}>
              Video
            </a>
            <a href="#contact" className="cta" onClick={closeMenu}>
              Enquire
            </a>
          </div>
        </div>
      </div>

      {/* Scoped CSS to fix logo image scaling */}
      <style>{`
        .brand__logo {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          overflow: hidden;
          display: grid;
          place-items: center;
          box-shadow: var(--shadow);
          background: linear-gradient(135deg, var(--accent-2), #2b8a3e);
        }
        .brand__logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* or 'cover' if you prefer cropped */
          display: block;
        }
      `}</style>
    </nav>
  );
}
