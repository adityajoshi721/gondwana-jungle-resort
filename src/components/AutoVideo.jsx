import React, { useEffect, useRef, useState } from 'react';

// Only load a film when it reaches the viewport; keep sound under guest control.
export default function AutoVideo({src, ...props}) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const video = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(preference.matches); if (preference.matches) video.pause(); };
    update();
    preference.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true);
        if (!preference.matches) video.play().catch(() => {});
      } else video.pause();
    }, {threshold: 0.2});
    observer.observe(video);
    return () => { observer.disconnect(); preference.removeEventListener('change', update); };
  }, []);
  return <video {...props} ref={ref} data-src={src} src={loaded ? src : undefined} autoPlay={!reduced} muted loop controls playsInline preload="none" />;
}

