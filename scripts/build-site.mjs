import {build, createServer, loadEnv} from 'vite';
import {readFileSync, writeFileSync} from 'node:fs';
import React from 'react';
import {renderToString} from 'react-dom/server';
await build({build:{manifest:true}});
const env = {...loadEnv('production',process.cwd(),''),...process.env};
const id = env.VITE_GA_MEASUREMENT_ID || '';
if(id && !/^G-[A-Z0-9]+$/.test(id)) throw Error('Invalid GA4 measurement ID');
writeFileSync('dist/analytics-config.js',`window.GONDWANA_GA_ID = ${JSON.stringify(id)};\n`);
const server = await createServer({mode:'production',server:{middlewareMode:true},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
try {
 const {default:App} = await server.ssrLoadModule('/src/App.jsx');
 let markup = renderToString(React.createElement(App));
 const manifest = JSON.parse(readFileSync('dist/.vite/manifest.json','utf8'));
 for(const [source,asset] of Object.entries(manifest)) markup=markup.split('/'+source).join('/'+asset.file);
 if(markup.includes('/src/assets/')) throw Error('Unresolved prerendered image URL');
 const html=readFileSync('dist/index.html','utf8').replace('<div id="root"></div>',`<div id="root">${markup}</div>`);
 if(!html.includes('id="reviews"') || !html.includes('Madanapur')) throw Error('Missing crawlable resort content');
 writeFileSync('dist/index.html',html);
 console.log('Built crawlable homepage; GA4 '+(id?'configured':'disabled until a measurement ID is supplied'));
} finally {await server.close();}
