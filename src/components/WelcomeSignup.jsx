import React, { useEffect, useRef } from 'react';
import { UpdatesForm } from './UpdatesSignup.jsx';

const storageKey = 'gondwana-welcome-signup-v1';
const reminderDelay = 30 * 24 * 60 * 60 * 1000;

export default function WelcomeSignup() {
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);
  const previousOverflow = useRef('');
  const subscriptionRequested = useRef(false);

  function remember(subscribed = false) {
    subscriptionRequested.current ||= subscribed;
    try { localStorage.setItem(storageKey, JSON.stringify({ until: subscriptionRequested.current ? null : Date.now() + reminderDelay, subscribed: subscriptionRequested.current })); } catch { /* Signup remains usable when storage is blocked. */ }
  }

  function close() {
    remember();
    dialogRef.current.close();
  }

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (saved?.subscribed || saved?.until > Date.now()) return;
    } catch { /* Show the invitation if no usable preference exists. */ }
    const timer = setTimeout(() => {
      previousFocus.current = document.activeElement;
      previousOverflow.current = document.body.style.overflow;
      dialogRef.current.showModal();
      document.body.style.overflow = 'hidden';
    }, 1000);
    return () => {
      clearTimeout(timer);
      if (dialogRef.current?.open) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  return <dialog ref={dialogRef} className="welcome-signup" aria-labelledby="welcome-signup-title" aria-describedby="welcome-signup-description"
    onCancel={() => remember()} onClose={() => {
      document.body.style.overflow = previousOverflow.current;
      previousFocus.current?.focus();
    }}>
    <button className="welcome-close" type="button" aria-label="Close updates popup" onClick={close} autoFocus>×</button>
    <div className="welcome-copy"><span className="eyebrow">Welcome to Gondwana</span>
      <h2 id="welcome-signup-title">Stay close to the wild.</h2>
      <p id="welcome-signup-description">Join our updates for resort news, forest stories and offers. Add your email and, if you wish, your phone number.</p>
    </div>
    <UpdatesForm onSubscribed={() => remember(true)} />
    <button className="welcome-later" type="button" onClick={close}>Continue exploring</button>
  </dialog>;
}
