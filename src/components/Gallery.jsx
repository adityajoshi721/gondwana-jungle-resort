import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const IMGS = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548095115-45697e51373f?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop"
];

export default function Gallery(){
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <>
      <div className="grid-3">
        {IMGS.map((src, i) => (
          <div key={i} className="card" onClick={() => { setIndex(i); setOpen(true); }} style={{cursor:"zoom-in"}}>
            <div className="card__media" style={{background:`url(${src}) center/cover no-repeat`}} />
            <div className="card__body">
              <div className="kicker">Gallery</div>
              <div className="card__title">Moment #{i+1}</div>
              <div className="card__text">Tap to open</div>
            </div>
          </div>
        ))}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} index={index} slides={IMGS.map(src => ({ src }))} />
    </>
  );
}
