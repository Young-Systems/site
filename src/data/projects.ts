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
    status: 'In development',
    featured: true,
  },
  {
    title: 'Segmented Proxmox Homelab',
    description: 'Multi-node virtualization environment with OPNsense routing, isolated service networks, centralized DNS, and secure remote access.',
    tags: ['Proxmox', 'OPNsense', 'VLANs', 'NetBird'],
    status: 'Operating',
    featured: true,
  },
  {
    title: 'Cloud Edge Services',
    description: 'Public-cloud ingress and identity layer that connects remote clients to private services without directly exposing the homelab.',
    tags: ['Traefik', 'Authentik', 'Docker', 'OCI'],
    status: 'Operating',
    featured: true,
  },
  {
    title: 'Infrastructure Update Automation',
    description: 'Ansible playbooks for repeatable maintenance across Linux virtual machines, containers, and Proxmox hosts.',
    tags: ['Ansible', 'Debian', 'Proxmox'],
    status: 'In development',
  },
  {
    title: 'Media Automation Platform',
    description: 'Containerized request, acquisition, organization, and playback pipeline with network isolation and shared storage.',
    tags: ['Docker Compose', 'Jellyfin', 'Linux'],
    status: 'Lab',
  },
  {
    title: 'Network Documentation Model',
    description: 'A lightweight source of truth for subnets, VLANs, endpoints, services, and dependencies.',
    tags: ['Documentation', 'IPAM', 'Architecture'],
    status: 'Design',
  },
];
