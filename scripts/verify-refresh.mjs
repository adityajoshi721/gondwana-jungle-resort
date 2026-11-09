import {createServer} from 'vite';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {existsSync, readdirSync, statSync} from 'node:fs';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try {
 const {default:App}=await server.ssrLoadModule('/src/App.jsx');
 const html=renderToString(React.createElement(App));
 for(const phrase of ['Close to the wild.','Discuss my stay on WhatsApp','room-1.webp','room-6.webp','guest-visit.mp4','resort-tour.mp4']) {
  if(!html.includes(phrase)) throw Error('Missing rendered content: '+phrase);
 }
 for(const src of [...html.matchAll(/(?:src|poster)="(\/media\/[^\"]+)"/g)].map(x=>x[1])) {
  if(!existsSync('public'+src)) throw Error('Missing media '+src);
 }
 const sections = [...html.matchAll(/<section[^>]*>/g)].map(match => match[0]);
 if (!sections[1]?.includes('id="reviews"')) throw Error('Guest stories must immediately follow the hero');
 if ((html.match(/View original review/g) || []).length !== 8) throw Error('Expected all eight saved reviews');
 if (!html.includes('Mrunmayee Deshpande') || !html.includes('235')) throw Error('Missing guest proof content');
 console.log('PASS: React page renders, planner and all new media references resolve.');
 console.log(readdirSync('public/media').map(n=>n+': '+Math.round(statSync('public/media/'+n).size/1024)+' KB').join('\n'));
} finally {await server.close();}
