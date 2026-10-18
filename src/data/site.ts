// Owner-controlled deployment switch. Change to 'portfolio' and rebuild to stop promoting services.
// PUBLIC_SITE_MODE can override this for previews or deployment environments.
export type SiteMode = 'business' | 'portfolio';
const configuredMode = import.meta.env.PUBLIC_SITE_MODE || 'business';
if (!['business', 'portfolio'].includes(configuredMode)) {
  throw new Error('PUBLIC_SITE_MODE must be business or portfolio.');
}
export const siteMode = configuredMode as SiteMode;
export const isBusiness = siteMode === 'business';
export const siteDescription = isBusiness
  ? 'Young Systems provides migrations, automation, cloud, identity, systems administration, and integrations for MSPs and businesses.'
  : 'Systems engineering, Microsoft cloud, infrastructure, and practical automation by Samuel Young.';
