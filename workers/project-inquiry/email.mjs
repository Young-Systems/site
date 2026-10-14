export const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

export function renderInquiryEmail(data) {
  const text = value => escapeHtml(value || 'Not specified');
  const rows = [['Name',data.name],['Email',data.email],['Organization',data.organization],['Organization type',data.organizationType],['Project type',data.projectType],['Target timeline',data.timeline]];
  const replyUrl = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: Project inquiry: ${data.projectType}`)}`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>New project inquiry</title></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;color:#24252b;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f3f4f6;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #dedee4;">
<tr><td style="padding:24px;background-color:#111216;border-top:5px solid #a63247;color:#ffffff;"><p style="margin:0 0 12px;font-size:12px;letter-spacing:2px;color:#efb1bb;">YOUNG SYSTEMS</p><h1 style="margin:0;font-size:26px;line-height:1.3;">New project inquiry</h1><p style="margin:12px 0 0;font-size:16px;line-height:1.5;overflow-wrap:anywhere;">${text(data.projectType)}</p></td></tr>
<tr><td style="padding:24px;"><h2 style="margin:0 0 16px;font-size:20px;line-height:1.4;overflow-wrap:anywhere;">${text(data.organization)}</h2>
<table width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;table-layout:fixed;border-collapse:collapse;">${rows.map(([label,value])=>`<tr><th scope="row" width="35%" align="left" valign="top" style="padding:12px 8px 12px 0;border-bottom:1px solid #e7e7ec;font-size:13px;line-height:1.5;color:#646672;font-weight:normal;">${label}</th><td valign="top" style="padding:12px 0;border-bottom:1px solid #e7e7ec;font-size:14px;line-height:1.5;overflow-wrap:anywhere;word-break:break-word;">${text(value)}</td></tr>`).join('')}</table>
<h2 style="margin:28px 0 12px;font-size:18px;">Project details</h2>
<div style="padding:16px;background-color:#f7f7f9;border-left:3px solid #a63247;font-size:14px;line-height:1.7;overflow-wrap:anywhere;word-break:break-word;">${text(data.details).replace(/\r\n|\r|\n/g,'<br />')}</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;"><tr><td bgcolor="#a63247" style="padding:14px 20px;"><a href="${escapeHtml(replyUrl)}" style="color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Reply to inquiry</a></td></tr></table>
<p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#646672;">You can also reply directly to this email. The visitor agreed to be contacted about this inquiry.</p></td></tr>
<tr><td style="padding:16px 24px;border-top:1px solid #e7e7ec;font-size:12px;line-height:1.5;color:#646672;">Submitted through the Young Systems project inquiry form.</td></tr>
</table></td></tr></table></body></html>`;
}
