// Owner-controlled deployment switch. Change to 'portfolio' and rebuild to stop promoting services.
// PUBLIC_SITE_MODE can override this for previews or deployment environments.
export type SiteMode = 'business' | 'portfolio' | 'limited';
const configuredMode = import.meta.env.PUBLIC_SITE_MODE || 'limited';
if (!['business', 'portfolio', 'limited'].includes(configuredMode)) {
  throw new Error('PUBLIC_SITE_MODE must be business, portfolio, or limited.');
}
export const siteMode = configuredMode as SiteMode;
export const isLimitedAvailability = siteMode === 'limited';
export const isBusiness = siteMode !== 'portfolio';
export const availabilityMessage = 'Limited availability: primarily weekday evenings after work and weekends (Eastern Time). Project timelines and meeting windows are agreed in advance.';
export const siteDescription = isLimitedAvailability
  ? 'Young Systems provides scoped engineering services for MSPs and businesses, primarily on weekday evenings and weekends.'
  : isBusiness
  ? 'Young Systems provides migrations, automation, cloud, identity, systems administration, and integrations for MSPs and businesses.'
  : 'Systems engineering, Microsoft cloud, infrastructure, and practical automation by Samuel Young.';

export const socialLinks = {
  companyLinkedIn: 'https://linkedin.com/company/young-systems',
  personalLinkedIn: 'https://www.linkedin.com/in/cyber-syoung/',
};
