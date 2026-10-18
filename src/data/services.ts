import { isBusiness } from './site';

// Service visibility and inquiries follow the owner-controlled site mode.
export const servicesConfig = {
  acceptingProjects: isBusiness,
  email: 'samuel@young-systems.com',
  // Worker URL ending in /inquiry. Empty uses an email draft.
  inquiryEndpoint: import.meta.env.PUBLIC_PROJECT_INQUIRY_ENDPOINT || '',
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '',
};

export const services = [
  { title: 'Migrations', description: 'Move users, data, and infrastructure with a plan that accounts for the people using them.', deliverables: 'Microsoft 365 tenant, mailbox, SharePoint, and OneDrive migrations; discovery, staging, cutover, validation, and handoff.' },
  { title: 'Automation as a Service', description: 'Reduce repetitive administration with automation built around your operating processes.', deliverables: 'PowerShell and Microsoft Graph workflows, scheduled reporting, error handling, documentation, and scoped ongoing maintenance.' },
  { title: 'Cloud', description: 'Build and improve cloud environments that your team can confidently administer.', deliverables: 'Microsoft 365 configuration, cloud migration planning, hybrid infrastructure, permissions, and operational documentation.' },
  { title: 'Entra ID & identity security', description: 'Give the right people the right access and strengthen the controls around it.', deliverables: 'Conditional Access, MFA, role and privilege reviews, hybrid identity synchronization, and identity governance configuration.' },
  { title: 'IT systems administration', description: 'Hands-on engineering support for the systems your business and clients depend on.', deliverables: 'Windows Server, Active Directory, Group Policy, Exchange Online, SharePoint, Intune, and infrastructure administration.' },
  { title: 'Integrations & identity lifecycle', description: 'Connect systems so onboarding, changes, and offboarding follow a consistent process.', deliverables: 'Automated identity lifecycle workflows, API integrations, provisioning, deprovisioning, validation, and support documentation.' },
  { title: 'Autotask, Datto RMM & IT Glue', description: 'Make your MSP tooling work together and fit the way your team delivers service.', deliverables: 'Autotask workflow configuration, Datto RMM automation and scripts, IT Glue documentation, and integrations between operational tools.' },
  { title: 'Assessments & project planning', description: 'Turn an unclear infrastructure problem into an actionable project plan before making changes.', deliverables: 'Environment discovery, dependency mapping, configuration reviews, migration readiness, implementation plans, and handoff requirements.' },
];
