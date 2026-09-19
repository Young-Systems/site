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
publishedAt: 2026-09-19
tags: [PowerShell, Automation]
draft: false
---
```

Drafts are excluded from the homepage, writing index, and production routes.

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

## Brand assets

The current header uses a text mark until final brand files are supplied. Reserved asset locations:

- `public/images/brand/banner-logo.png`
- `public/images/brand/square-logo.png`
- `public/images/profile/samuel-young.jpg`

After the images are added, update `src/components/Header.astro` and `src/pages/about.astro` to display them.
