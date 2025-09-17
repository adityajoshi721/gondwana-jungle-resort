import React from "react";

const ROOMS = [
  {
    title: "Forest Cottage",
    img: "https://images.unsplash.com/photo-1523419409543-71741b54c7a7?q=80&w=1600&auto=format&fit=crop",
    text: "Cozy, air-conditioned cottage with a private sit-out facing greenery.",
    price: "₹6,999 / night"
  },
  {
    title: "Family Villa",
    img: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?q=80&w=1600&auto=format&fit=crop",
    text: "Two-bedroom villa perfect for families or small groups.",
    price: "₹11,999 / night"
  },
  {
    title: "Machan Experience",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    text: "A curated night under the stars with guided nature walk.",
    price: "On request"
  }
];

export default function Rooms(){
  return (
    <div className="grid-3">
      {ROOMS.map((r, i) => (
        <article className="card" key={i}>
          <div className="card__media" style={{background:`url(${r.img}) center/cover no-repeat`}} />
          <div className="card__body">
            <div className="kicker">Stay</div>
            <h3 className="card__title">{r.title}</h3>
            <p className="card__text">{r.text}</p>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:12}}>
              <span style={{color:"var(--accent)"}}>{r.price}</span>
              <a className="cta" href="#contact">Book Enquiry</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
