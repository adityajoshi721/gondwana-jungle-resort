import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container cols">
        <div>
          <div className="brand">
            <span className="brand__logo">GJ</span>
            <span className="brand__text">Tadoba Tiger Safaris</span>
          </div>
          <p className="small" style={{marginTop:8}}>Near Tadoba National Park • Maharashtra, India</p>
          <p className="small">© {new Date().getFullYear()} Tadoba Tiger Safaris. All rights reserved.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p className="small">+91 99211 50541</p>
          <p className="small">gondwana357@gmail.com</p>
        </div>
        <div>
          <h4>Social</h4>
          <p className="small"><a href="https://www.instagram.com/gondwana_tadoba/?hl=en" style={{color:"var(--muted)"}}>Instagram</a></p>
          <p className="small"><a href="https://www.youtube.com/@vjtigerfilms6145" style={{color:"var(--muted)"}}>YouTube</a></p>
        </div>
      </div>
    </footer>
  );
}
