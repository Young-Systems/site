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
    expires: 'September 2027',
    credentialId: 'ec9fac3c77d2de75',
    credentialUrl: 'https://learn.microsoft.com/en-us/users/cyber-syoung/credentials/ec9fac3c77d2de75',
    image: '/images/certifications/microsoft-365-administrator-expert.png',
  },
  {
    name: 'Identity and Access Administrator Associate',
    issuer: 'Microsoft',
    issued: 'August 2026',
    expires: 'August 2027',
    credentialId: 'b25fd3b1870b0668',
    credentialUrl: 'https://learn.microsoft.com/en-us/users/cyber-syoung/credentials/b25fd3b1870b0668',
    image: '/images/certifications/identity-access-administrator.png',
  },
  {
    name: 'Security+',
    issuer: 'CompTIA',
    issued: 'September 2023',
    expires: 'September 2029',
    credentialId: 'LZ0G5EPSF1QE1PG9',
    credentialUrl: 'https://cp.certmetrics.com/comptia/en/public/verify/credential/LZ0G5EPSF1QE1PG9',
    image: '/images/certifications/security-plus.png',
  },
  {
    name: 'Network+',
    issuer: 'CompTIA',
    issued: 'May 2024',
    expires: 'September 2029',
    credentialId: 'FGN5CYGTFF1QQQSJ',
    credentialUrl: 'https://cp.certmetrics.com/comptia/en/public/verify/credential/FGN5CYGTFF1QQQSJ',
    image: '/images/certifications/network-plus.png',
  },
  {
    name: 'A+',
    issuer: 'CompTIA',
    issued: 'March 2024',
    expires: 'September 2029',
    credentialId: 'R048K2ZZKEVEQ1GP',
    credentialUrl: 'https://cp.certmetrics.com/comptia/en/public/verify/credential/R048K2ZZKEVEQ1GP',
    image: '/images/certifications/a-plus.png',
  },
];
