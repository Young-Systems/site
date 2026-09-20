# Young Systems

Source for [young-systems.com](https://young-systems.com), a technical portfolio and writing site built with Astro.

## Local development

```bash
npm install
npm run dev
```

Run `npm run build` before opening a pull request. The site deploys to GitHub Pages from `main` through `.github/workflows/deploy.yml`.

## Publishing a field note

Add a Markdown file to `src/content/blog/`. Required frontmatter:

```yaml
---
title: "Article title"
description: "A concise summary."
category: Microsoft
publishedAt: 2026-09-19
tags: [PowerShell, Automation]
draft: false
---
```

Drafts are excluded from the homepage, writing index, and production routes.

`category` controls the filter on the Writing page. Existing category names are generated automatically from published posts.

To schedule a post, add an ISO 8601 `publishAt` value in UTC:

```yaml
publishedAt: 2026-10-05
publishAt: 2026-10-05T14:00:00Z
```

The article remains excluded from the site until `publishAt`. GitHub checks hourly at 17 minutes past the hour, so scheduled publication can occur up to roughly one hour after the specified time. Keep `draft: false`; a draft is never published regardless of its scheduled time.

## Adding a certification

1. Save the badge image in `public/images/certifications/`.
2. Open `src/data/certifications.ts`.
3. Copy an existing certification entry and update its values.

```ts
{
  name: 'Certification name',
  issuer: 'Issuer',
  issued: 'September 2026',
  expires: 'September 2027', // Optional
  credentialId: 'ABC123',   // Optional
  credentialUrl: 'https://example.com/verify',
  image: '/images/certifications/badge.png',
},
```

The certification page is generated automatically from this list. Keep the newest credential first.

## Adding a project

Open `src/data/projects.ts`, copy an existing entry, and update its values:

```ts
{
  title: 'Project name',
  description: 'A short description of the project.',
  tags: ['PowerShell', 'Microsoft Graph'],
  status: 'In development',
  href: 'https://github.com/Young-Systems/project', // Optional
  featured: true, // Optional: also show it on the homepage
},
```

The Projects page follows the order of this list. Remove an entry to remove its card from the site.

## Brand assets

The current header uses a text mark until final brand files are supplied. Reserved asset locations:

- `public/images/brand/banner-logo.png`
- `public/images/brand/square-logo.png`
- `public/images/profile/samuel-young.jpg`

After the images are added, update `src/components/Header.astro` and `src/pages/about.astro` to display them.
