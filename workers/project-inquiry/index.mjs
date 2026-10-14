import { renderInquiryEmail } from './email.mjs';
const limits = {name:100,email:254,organization:150,organizationType:80,projectType:100,timeline:150,details:5000};
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s=>s.trim()).filter(Boolean);
    const headers = {'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'};
    if (allowed.includes(origin)) Object.assign(headers, {'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'});
    const reply = (status,message) => new Response(JSON.stringify({message}), {status,headers});
    if (!allowed.includes(origin)) return reply(403,'This site is not allowed to submit inquiries.');
    if (new URL(request.url).pathname !== '/inquiry') return reply(404,'Not found.');
    if (request.method === 'OPTIONS') return new Response(null,{status:204,headers});
    if (request.method !== 'POST') return reply(405,'Use POST.');
    if (env.ACCEPTING_PROJECTS !== 'true') return reply(503,'New project inquiries are currently closed.');
    if (!env.SMTP2GO_API_KEY || !env.TURNSTILE_SECRET_KEY || !env.FROM_EMAIL || !env.TO_EMAIL || !env.INQUIRY_RATE_LIMITER) return reply(503,'Please use the email link to contact me.');
    const ip = request.headers.get('CF-Connecting-IP');
    if (!ip) return reply(400,'Unable to verify request.');
    const rate = await env.INQUIRY_RATE_LIMITER.limit({key:ip});
    if (!rate.success) return reply(429,'Too many attempts. Please try again later.');
    if (!(request.headers.get('Content-Type') || '').startsWith('application/json')) return reply(415,'Expected JSON.');
    try {
      // Limit the actual streamed body, including requests without Content-Length.
      const reader = request.body?.getReader();
      if (!reader) return reply(400,'Missing inquiry.');
      let size=0; const chunks=[];
      while (true) { const {done,value}=await reader.read(); if(done)break; size+=value.length; if(size>24000){await reader.cancel();return reply(413,'Inquiry is too large.');} chunks.push(value); }
      const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
      const data=JSON.parse(new TextDecoder().decode(bytes));
      if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400,'Invalid inquiry.');
      if (data._gotcha) return reply(400,'Unable to accept this inquiry.');
      for(const [key,max] of Object.entries(limits)) {
        if(typeof data[key] !== 'string' || data[key].length>max) return reply(400,'Check the inquiry fields.');
        data[key]=data[key].trim();
      }
      if(!data.name || !data.organization || !data.organizationType || !data.projectType || data.details.length<20 || data.contactConsent!=='yes' || !/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(data.email)) return reply(400,'Complete the required fields with a valid email.');
      if(/[\r\n]/.test(data.projectType)) return reply(400,'Invalid project type.');
      const token=data['cf-turnstile-response'];
      if(typeof token!=='string' || !token || token.length>2048) return reply(400,'Complete the verification before sending.');
      const verify=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:ip}),signal:AbortSignal.timeout(10000)});
      if(!verify.ok) return reply(502,'Verification unavailable. Please try again later.');
      const result=await verify.json();
      if(!result.success || result.action!=='project-inquiry' || !allowed.some(url=>new URL(url).hostname===result.hostname)) return reply(400,'Verification expired or failed. Please try again.');
      const body=Object.keys(limits).map(key=>`${key}: ${data[key] || 'Not specified'}`).join('\n\n');
      const sent=await fetch('https://api.smtp2go.com/v3/email/send',{method:'POST',headers:{'Content-Type':'application/json','X-Smtp2go-Api-Key':env.SMTP2GO_API_KEY},body:JSON.stringify({sender:env.FROM_EMAIL,to:[env.TO_EMAIL],subject:`Website project inquiry: ${data.projectType}`,text_body:body,html_body:renderInquiryEmail(data),custom_headers:[{header:'Reply-To',value:data.email}]}),signal:AbortSignal.timeout(15000)});
      if(!sent.ok) return reply(502,'Unable to confirm delivery. Please contact me by email.');
      const receipt=await sent.json();
      if(receipt.data?.succeeded!==1 || receipt.data?.failed>0 || receipt.data?.error) return reply(502,'Unable to confirm delivery. Please contact me by email.');
      return reply(200,'Your inquiry was accepted for delivery. Thank you.');
    } catch { return reply(502,'Unable to process or confirm delivery. Please contact me by email.'); }
  }
};
