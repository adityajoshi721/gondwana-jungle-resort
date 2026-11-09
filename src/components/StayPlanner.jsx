import React, { useState } from 'react';
const interests = ['Safari planning', 'A quiet escape', 'Family time', 'Photography'];
export default function StayPlanner() {
  const [interest, setInterest] = useState('Safari planning');
  const [guests, setGuests] = useState('2');
  const [dates, setDates] = useState('');
  const ideas = {
    'Safari planning': ['Start with your forest plans', 'Ask the team about safari assistance, then arrange your stay around your confirmed safari timings.'],
    'A quiet escape': ['Leave room for doing less', 'Make time for the forest-view pool, an unhurried meal and the resort’s open spaces.'],
    'Family time': ['Bring everyone together', 'Ask about room arrangements for your group, shared meals and time together on the lawns.'],
    'Photography': ['Make space for a different perspective', 'Explore the resort grounds with your camera and discuss your forest plans with the team.'],
  };
  const message = `Hello Gondwana! Please help me plan a stay.\nInterest: ${interest}\nGuests: ${guests}\nTravel dates: ${dates || 'Flexible / to be decided'}\nPlease share suitable room options, current packages and availability.`;
  return <section className="section planner-section" id="planner"><div className="container planner-grid">
    <div><span className="eyebrow">Your stay, your pace</span><h2>A little inspiration.<br /><em>A plan of your own.</em></h2><p>Tell us what brings you to Tadoba. Start a conversation with a stay shaped around you.</p><span className="planner-footnote">A personal enquiry. Availability and arrangements are confirmed by the resort.</span></div>
    <div className="planner-panel"><fieldset><legend>What are you looking forward to?</legend><div className="interest-options">{interests.map(item => <button type="button" key={item} aria-pressed={interest === item} onClick={() => setInterest(item)}>{item}</button>)}</div></fieldset>
      <div className="planner-fields"><label>Your group<select value={guests} onChange={e => setGuests(e.target.value)}>{['1','2','3–4','5–8','9 or more'].map(n => <option key={n}>{n}</option>)}</select></label><label>Travel dates<input value={dates} onChange={e => setDates(e.target.value)} placeholder="Dates or month, if known" maxLength={120} /></label></div>
      <div className="planner-suggestion" aria-live="polite"><span className="eyebrow">An idea for your stay</span><h3>{ideas[interest][0]}</h3><p>{ideas[interest][1]}</p></div>
      <a className="button" href={`https://wa.me/919921150541?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Discuss my stay on WhatsApp ↗</a>
    </div>
  </div></section>;
}
