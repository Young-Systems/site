export interface Certification {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
}

// Add new certifications here. Put badge images in public/images/certifications/.
// credentialUrl should be the public verification link supplied by the issuer.
export const certifications: Certification[] = [
  {
    name: 'Microsoft 365 Administrator Expert',
    issuer: 'Microsoft',
    issued: 'September 2026',
    image: '/images/certifications/microsoft-365-administrator-expert.svg',
  },
  {
    name: 'Identity and Access Administrator Associate',
    issuer: 'Microsoft',
    issued: 'August 2026',
    image: '/images/certifications/identity-access-administrator.svg',
  },
  {
    name: 'Security+',
    issuer: 'CompTIA',
    issued: 'Current',
    image: '/images/certifications/security-plus.svg',
  },
  {
    name: 'Network+',
    issuer: 'CompTIA',
    issued: 'Current',
    image: '/images/certifications/network-plus.svg',
  },
  {
    name: 'A+',
    issuer: 'CompTIA',
    issued: 'Current',
    image: '/images/certifications/a-plus.svg',
  },
];
