import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.mjs';
const env={ALLOWED_ORIGINS:'https://young-systems.com',ACCEPTING_PROJECTS:'true',SMTP2GO_API_KEY:'test',TURNSTILE_SECRET_KEY:'test',FROM_EMAIL:'sender@example.com',TO_EMAIL:'owner@example.com',INQUIRY_RATE_LIMITER:{limit:async()=>({success:true})}};
const data={name:'Sam',email:'visitor@example.com',organization:'Example',organizationType:'MSP',projectType:'Migration',timeline:'',details:'We need help migrating our tenant.',contactConsent:'yes','cf-turnstile-response':'token'};
const request=(body=data,origin='https://young-systems.com')=>new Request('https://worker.example/inquiry',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.1'},body:JSON.stringify(body)});
test('rejects disallowed origins, closed inquiries, oversized bodies, invalid email and rate limits',async()=>{
assert.equal((await worker.fetch(request(data,'https://evil.example'),env)).status,403);
assert.equal((await worker.fetch(request(),{...env,ACCEPTING_PROJECTS:'false'})).status,503);
assert.equal((await worker.fetch(request({...data,details:'a'.repeat(25000)}),env)).status,413);
assert.equal((await worker.fetch(request({...data,email:'x\r\nBcc: bad@example.com'}),env)).status,400);
assert.equal((await worker.fetch(request(),{...env,INQUIRY_RATE_LIMITER:{limit:async()=>({success:false})}})).status,429);
});
test('verifies tokens before sending and fixes recipient and reply-to',async()=>{
const original=globalThis.fetch;let sent;
try{globalThis.fetch=async(url,opts)=>{if(url.includes('siteverify'))return Response.json({success:true,hostname:'young-systems.com',action:'project-inquiry'});sent=JSON.parse(opts.body);return Response.json({data:{succeeded:1,failed:0}});};
assert.equal((await worker.fetch(request(),env)).status,200);
assert.deepEqual(sent.to,['owner@example.com']);assert.equal(sent.sender,'sender@example.com');assert.equal(sent.custom_headers[0].value,'visitor@example.com');
globalThis.fetch=async()=>Response.json({success:false});assert.equal((await worker.fetch(request(),env)).status,400);
globalThis.fetch=async(url)=>url.includes('siteverify')?Response.json({success:true,hostname:'evil.example',action:'project-inquiry'}):assert.fail('Should not send');assert.equal((await worker.fetch(request(),env)).status,400);
globalThis.fetch=async(url)=>url.includes('siteverify')?Response.json({success:true,hostname:'young-systems.com',action:'project-inquiry'}):Response.json({data:{succeeded:0,failed:1}});assert.equal((await worker.fetch(request(),env)).status,502);
}finally{globalThis.fetch=original;}
});
