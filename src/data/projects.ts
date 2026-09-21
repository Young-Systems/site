export interface Project {
  title: string;
  description: string;
  tags: string[];
  status: string;
  href?: string;
  featured?: boolean;
}

// Add, remove, or reorder projects here. The Projects page uses the full list.
// Set featured to true to also display a project on the homepage.
export const projects: Project[] = [
  {
    title: 'Microsoft 365 Migration Toolkit',
    description: 'PowerShell-driven discovery, staging, validation, and remediation workflows for Microsoft 365 migration projects.',
    tags: ['PowerShell', 'Microsoft Graph', 'Exchange Online'],
    status: 'In progress',
    featured: true,
  },
  {
    title: 'Identity and Access Management Improvements',
    description: 'By utilizing Graph, I am able to build a custom report to export current user and group membership. With this data, I work with department heads to confirm usage and standardize access provisions.',
    tags: ['Microsoft 365', 'Microsoft Graph', 'Entra ID'],
    status: 'In progress',
    featured: true,
  },
  {
    title: 'Documentation Standardization',
    description: 'I am a part of an effort that would standardize documentation company-wide. This effort is in the early stages.',
    tags: ['Automation', 'Infrastructure', 'IT Glue'],
    status: 'In progress',
    featured: false,
  },
  {
    title: 'Microsoft Entra Test Tenant',
    description: 'Leveraging the free E5 trial plan for testing custom solutions and implementing best practices while studying Microsoft services.',
    tags: ['Microsoft 365', 'Microsoft Administration', 'Entra ID'],
    status: 'Operating',
    featured: true,
  },
  {
    title: 'Segmented Proxmox Homelab',
    description: 'Multi-node virtualization environment with OPNsense routing, isolated service networks, centralized DNS, and secure remote access.',
    tags: ['Proxmox', 'OPNsense', 'VLANs', 'NetBird'],
    status: 'Operating',
    featured: false,
  },
  {
    title: 'Cloud Edge Services',
    description: 'Public-cloud ingress and identity layer that connects remote clients to private services without directly exposing the homelab.',
    tags: ['Traefik', 'Authentik', 'Docker', 'OCI'],
    status: 'Operating',
    featured: false,
  },
  {
    title: 'Media Automation Platform',
    description: 'Containerized request, acquisition, organization, and playback pipeline with network isolation and shared storage.',
    tags: ['Docker Compose', 'Jellyfin', 'Linux'],
    status: 'Operating',
    featured: false,
  },
  {
    title: 'Network Documentation Model',
    description: 'A lightweight source of truth for subnets, VLANs, endpoints, services, and dependencies.',
    tags: ['Documentation', 'IPAM', 'Architecture'],
    status: 'Operating',
    featured: false,
  },
  {
    title: 'Implemented Azure Functions for Advanced Workflows',
    description: 'Leveraging Azure Function apps, I implemented more advanced workflows for AutoTask PSA, IT Glue, PagerDuty, and more.',
    tags: ['Automation', 'Infrastructure', 'Azure'],
    status: 'Operating',
    featured: false,
  },
  {
    title: 'Implemented Secret Management via IT Glue Flexible Assets',
    description: 'Utilizing IT Glue Flexible Assets, I implemented a secret management solution that included leveraging its API to retrieve secrets in a secure manner.',
    tags: ['Automation', 'Infrastructure', 'IT Glue'],
    status: 'Operating',
    featured: false,
  },
];
