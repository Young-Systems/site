// Change to false and redeploy to remove services promotion and close inquiries.
export const servicesConfig = {
  acceptingProjects: true,
  email: 'info@young-systems.com',
  // Worker URL ending in /inquiry. Empty uses an email draft.
  inquiryEndpoint: import.meta.env.PUBLIC_PROJECT_INQUIRY_ENDPOINT || '',
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '',
};

export const services = [
  { title: 'Microsoft 365 migrations', description: 'Project support for mailbox, SharePoint, OneDrive, and tenant migrations.', deliverables: 'Discovery, migration planning, staging, cutover support, and handoff documentation.' },
  { title: 'Automation as a Service', description: 'PowerShell and Microsoft Graph automation for repetitive administrative work.', deliverables: 'Workflow discovery, scripts, reporting, documentation, and scoped maintenance arrangements.' },
  { title: 'Microsoft tenant setup & management', description: 'Build, organize, or improve a Microsoft 365 environment around your business requirements.', deliverables: 'Exchange Online, SharePoint permissions, shared mailboxes, licensing review, and administrative processes.' },
  { title: 'Identity & endpoint projects', description: 'Hands-on support for Entra ID, hybrid identity, and Intune initiatives.', deliverables: 'Conditional Access, MFA, identity synchronization, device enrollment, and configuration documentation.' },
];
