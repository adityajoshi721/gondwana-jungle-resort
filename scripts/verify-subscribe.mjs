import assert from 'node:assert/strict';
import subscribe from '../api/subscribe.js';
const old={...process.env};
function response(){return {statusCode:0,headers:{},status(n){this.statusCode=n;return this;},setHeader(k,v){this.headers[k]=v;return this;},json(v){this.body=v;return this;}}}
const originalFetch=global.fetch;
try {
 const base={method:'POST',headers:{origin:'https://gondwanajungleresorts.com'},body:{email:'Guest@example.com',phone:'+91 98765 43210',emailConsent:true,phoneConsent:false}};
 let res=response();await subscribe(base,res);assert.equal(res.statusCode,503);
 process.env.BREVO_API_KEY='test-only';process.env.BREVO_LIST_ID='12';process.env.BREVO_DOI_TEMPLATE_ID='34';
 let sent;global.fetch=async (url,options)=>{sent={url,options};return {ok:true,status:201}};
 res=response();await subscribe(base,res);assert.equal(res.statusCode,200);assert.equal(sent.url,'https://api.brevo.com/v3/contacts/doubleOptinConfirmation');
 let payload=JSON.parse(sent.options.body);assert.equal(payload.email,'guest@example.com');assert.equal(payload.attributes,undefined);assert.equal(payload.contactPixelTrackingConsent,false);
 res=response();await subscribe({...base,body:{...base.body,phoneConsent:true}},res);assert.equal(res.statusCode,200);payload=JSON.parse(sent.options.body);assert.equal(payload.attributes.SMS,'+919876543210');assert.equal(payload.attributes.SMS_CONSENT,true);
 res=response();await subscribe({...base,body:{...base.body,emailConsent:false}},res);assert.equal(res.statusCode,400);
 res=response();await subscribe({...base,headers:{origin:'https://example.com'}},res);assert.equal(res.statusCode,403);
 console.log('PASS: provider-off, confirmed consent, optional phone separation, validation and origin checks');
} finally {global.fetch=originalFetch;for(const k of ['BREVO_API_KEY','BREVO_LIST_ID','BREVO_DOI_TEMPLATE_ID']) {if(old[k]===undefined)delete process.env[k];else process.env[k]=old[k]}}

