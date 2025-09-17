import React, { useState, useEffect } from "react";
import img01 from "../assets/pkg2.jpeg";
import img02 from "../assets/pkg1.jpeg";

const POSTS = [
  {
    title: "The Big Cat of Tadoba",
    img: img01,
    text:
      "Tadoba–Andhari Tiger Reserve is among India’s most reliable tiger landscapes. Dawn safaris trace sandy roads laced with pugmarks; listen for alarm calls from chital and langur—nature’s whispers that the striped ghost is near.",
    body: [
      "Set in Maharashtra’s Chandrapur district, Tadoba unites Tadoba National Park with the Andhari Wildlife Sanctuary to protect a mosaic of bamboo thickets, teak forest and perennial lakes. The reserve’s core spans ~625 km² with a ~1102 km² buffer that now hosts thriving wildlife corridors.",
      "Sightings peak in the warm months when big cats patrol shrinking waterholes. Moharli and Kolara are famous gateways; buffers like Alizanza and Madnapur can be equally rewarding thanks to restored habitat and steady prey recovery.",
      "Responsible viewing matters: maintain distance, keep voices low, and let your guide set the pace. A respectful pause can turn a dusty bend into a front-row seat as a tigress crosses, tail flicking gold in the slanting light.",
    ],
    facts: [
      "Core ~625.4 km²; Buffer ~1101.8 km² (NTCA brief).",
      "Multiple gates (Moharli/Kolara/Navegaon etc.); buffers often productive.",
      "Summer (Mar–May) concentrates wildlife at water sources; winter offers pleasant weather.",
    ],
  },
  {
    title: "Birdsong & Biodiversity",
    img: img02,
    text:
      "Tadoba is not just tigers. At first light, the forest wakes in stereo—drongos scold, parakeets chatter, and a paradise flycatcher ribbons through the understorey.",
    body: [
      "The reserve lists nearly 200 bird species across lake edges, bamboo groves and salai ridges. Watch raptors like the Crested Serpent-Eagle and Oriental Honey-buzzard circle thermals while bee-eaters stitch colour over meadows.",
      "Carry binoculars on every drive—your ‘tiger hour’ may become a lifer: Black-naped Blue Flycatcher in shade, Indian Pitta in leaf-litter, or racket-tailed drongo shadowing deer to hawk flushed insects.",
      "Between safaris, scan waterbodies for storks and kingfishers. At dusk, silence deepens, then a peacock calls—and somewhere in the bamboo, the forest exhales.",
    ],
    facts: [
      "Raptors: Crested Serpent-Eagle, Short-toed Snake-Eagle; songsters: Indian Paradise-Flycatcher, Black-naped Blue Flycatcher.",
      "Habitats: lakes (wetland birds), bamboo/teak (understorey passerines), open meadows (bee-eaters, larks).",
    ],
  },
];

export default function Articles() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openPost = (i) => {
    setActive(POSTS[i]);
    setOpen(true);
  };

  return (
    <section id="wildlife" className="section" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Tadoba Wildlife</h2>
          <p className="section__desc">
            Short reads to get you in safari mode — stripes, birds, and the magic in between.
          </p>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {POSTS.map((p, i) => (
            <article
              key={i}
              className="card"
              onClick={() => openPost(i)}
              role="button"
              aria-label={`Open article: ${p.title}`}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card__media"
                style={{ background: `url(${p.img}) center/cover no-repeat` }}
              />
              <div className="card__body">
                <div className="kicker">Article</div>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__text">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen Reader */}
      {open && active && (
        <div
          className="article-modal"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} (full article)`}
        >
          <style>{`
            .article-modal{
              position: fixed; inset: 0; z-index: 400;
              background: rgba(0,0,0,0.5);
              backdrop-filter: blur(6px);
              display: grid; place-items: center;
            }
            .article-panel{
              width: min(1000px, 94%);
              max-height: 90vh;
              background: linear-gradient(180deg, rgba(20,47,34,0.75), rgba(20,47,34,0.35));
              border: 1px solid var(--border);
              border-radius: 18px;
              box-shadow: var(--shadow);
              overflow: hidden;
              display: grid;
              grid-template-rows: 240px 1fr;
            }
            @media (max-width: 720px){
              .article-panel{ grid-template-rows: 200px 1fr; }
            }
            .article-hero{
              background: url(${active.img}) center/cover no-repeat;
              position: relative;
            }
            .article-hero::after{
              content:"";
              position:absolute; inset:0;
              background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45));
            }
            .article-body{
              overflow: auto;
              padding: 18px 18px 22px;
            }
            .article-title{
              font-size: clamp(22px, 3vw, 32px);
              margin: 0 0 8px;
            }
            .article-meta{
              color: var(--muted);
              font-size: 13px; margin-bottom: 12px;
            }
            .article-text{
              color: #cbe7d7;
              line-height: 1.7;
              margin: 10px 0;
            }
            .facts{
              margin-top: 12px; padding-left: 18px; color:#d8efe1;
            }
            .article-actions{
              display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:14px;
            }
            .close-btn{
              margin-left:auto;
              background: rgba(255,255,255,0.08);
              border:1px solid var(--border);
              color: var(--text);
              padding:8px 12px; border-radius:10px; cursor:pointer;
            }
            .close-btn:hover{ background: rgba(255,255,255,0.12); }
            .whatsapp-btn{
              display:inline-flex; align-items:center; gap:8px;
              background:linear-gradient(135deg, #25d366, #128c7e);
              color:#fff; font-weight:600;
              padding:10px 14px; border-radius:12px;
              text-decoration:none;
              box-shadow: var(--shadow);
            }
            .whatsapp-btn:hover{ filter:brightness(1.1); }
          `}</style>

          <div className="article-panel" onClick={(e) => e.stopPropagation()}>
            <div className="article-hero" />
            <div className="article-body">
              <div className="kicker">Tadoba • Field Notes</div>
              <h3 className="article-title">{active.title}</h3>
              <div className="article-meta">Gondwana Jungle Resort — Safari Journal</div>

              {active.body?.map((para, idx) => (
                <p key={idx} className="article-text">{para}</p>
              ))}

              {active.facts?.length ? (
                <>
                  <div className="kicker" style={{ marginTop: 10 }}>Quick Facts</div>
                  <ul className="facts">
                    {active.facts.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              <div className="article-actions">
                <button className="close-btn" onClick={() => setOpen(false)}>Close (Esc)</button>
                <a
                  className="whatsapp-btn"
                  href="https://wa.me/919921150541"
                  target="_blank"
                  rel="noreferrer"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
