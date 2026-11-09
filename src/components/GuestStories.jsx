import React from 'react';
import guestStory from '../assets/VID-20250730-WA0003.mp4';
import review1 from '../assets/review1.png';
import review2 from '../assets/review2.png';
import review3 from '../assets/review3.png';
import review4 from '../assets/review4.png';
import review5 from '../assets/review5.png';
import review6 from '../assets/review6.png';
import review7 from '../assets/review7.png';
import review8 from '../assets/review8.png';
const reviews = [
  ['Kunal', 'This for sure is going to be my go to destination each time I visit tadoba.', review1],
  ['Karan Singh', 'Their kindness and attention to detail made my visit truly special and memorable.', review2],
  ['Harshad Sonawane', 'This is a good place to stay while you are visiting Tadoba Tiger Reserve.', review3],
  ['Parag Pandit', 'We stayed at the resort during last week for 3 nights. It was a nice experience.', review4],
  ['Shitanshu Upadhye', 'Gondawana Jungle Resort is nestled amidst lush bamboo plantations, this jungle premium resort offers a perfect blend of modern amenities and nature.', review5],
  ['Profeet Enterprises', 'Extremely warm and courteous staff..', review6],
  ['Hemal Zaveri', 'The resort exceeded my expectations with comfortable accommodations, and the food was superb', review7],
  ['Rohit Moharil', 'The owner couple is very friendly and courteous, they welcome us with smile.', review8],
];
export default function GuestStories({maps}) {
 return <section className="section guest-proof" id="reviews" aria-labelledby="guest-proof-title"><div className="container">
  <div className="proof-heading"><div><span className="eyebrow">The Gondwana guestbook</span><h2 id="guest-proof-title">Come for the wild.<br /><em>Remember the welcome.</em></h2></div><p>Heartfelt hospitality. Meals worth talking about. Stays that become stories. Discover Gondwana through the people who have experienced it.</p></div>
  <div className="proof-stats"><a href={maps} target="_blank" rel="noopener noreferrer"><strong>4.7<span>/5</span></strong><span>Google rating</span></a><a href={maps} target="_blank" rel="noopener noreferrer"><strong>235</strong><span>Google reviews</span></a><div className="proof-promise"><span className="eyebrow">In our guests’ words</span><p>“Will visit soon.”</p><span>Karan Singh · Google review</span></div></div>
  <p className="rating-source">Google listing snapshot retrieved 9 November 2026; rating and count may change. <a href="https://www.google.co.in/travel/hotels/entity/CgoIjM_mg9emsux-EAE" target="_blank" rel="noopener noreferrer">View source ↗</a></p>
  <div className="guest-films"><article className="celebrity-story"><video src="/media/guest-visit.mp4" poster="/media/guest-visit.webp" controls playsInline preload="none" aria-label="Mrunmayee Deshpande visit to Gondwana, resort-shared film" /><div><span className="eyebrow">A special moment in our guestbook</span><h3>Mrunmayee Deshpande<br /><em>at Gondwana.</em></h3><p>We were delighted to welcome Marathi actress Mrunmayee Deshpande to the property. Watch the visit in this film shared by the resort.</p><a className="text-link" href="#planner">Make your own Gondwana memories ↗</a></div></article>
  <article className="guest-film-card"><video src={guestStory} poster="/media/guest-story.webp" controls playsInline preload="none" aria-label="Guest feedback and safari experience film" /><div><span className="eyebrow">More guest experiences</span><h3>Hear it from our guests.</h3><p>A forest adventure, a warm welcome and a story to share. Watch the original guest-experience film.</p></div></article></div>
  <div className="guest-reviews-heading"><div><span className="eyebrow">Good stays. Lasting impressions.</span><h3>The words that mean the most.</h3></div><a className="button" href={maps} target="_blank" rel="noopener noreferrer">Read all reviews on Google ↗</a></div>
  <p className="review-collection-note">Eight reviews from the resort’s saved Google collection. Read the excerpts below or open each original screenshot.</p>
  <div className="guest-review-grid">{reviews.map(([name,quote,src]) => <figure className="guest-review" key={name}><div className="review-card-top"><span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span><span>Google</span></div><blockquote>“{quote}”</blockquote><figcaption>{name}<small>Google review · excerpt</small></figcaption><details><summary>View original review</summary><a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}'s review screenshot at full size`}><img src={src} alt={`Saved Google review by ${name}, rated five out of five`} loading="lazy" /></a></details></figure>)}</div>
  <div className="proof-cta"><p>Your next favourite memory could start here.</p><a className="text-link" href="#contact">Ask about your dates ↗</a></div>
 </div></section>;
}
