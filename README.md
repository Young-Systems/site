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

## Brand assets

The current header uses a text mark until final brand files are supplied. Reserved asset locations:

- `public/images/brand/banner-logo.png`
- `public/images/brand/square-logo.png`
- `public/images/profile/samuel-young.jpg`

After the images are added, update `src/components/Header.astro` and `src/pages/about.astro` to display them.
