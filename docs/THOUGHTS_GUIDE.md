# Quick Thoughts publishing guide

Quick Thoughts are short Markdown posts stored under `src/content/thoughts/`. They appear newest-first in a single feed on `/thoughts`, and the three newest entries appear in a compact homepage feed.

## Create a thought

Create a lowercase, hyphenated `.md` file:

```yaml
---
title: "Certifications are more useful as a roadmap than a credential"
publishedAt: 2026-09-22T09:00:00-04:00
tags: [Career, Certifications]
draft: false
---

Write the thought here. It can be a couple of sentences or several short paragraphs.
```

The site renders the complete thought directly in the `/thoughts` feed and automatically creates the shorter homepage excerpt from the Markdown body, so no description is required.

- `tags` are optional and appear on the full Thoughts page.
- `draft: true` hides the thought from both feeds.
- `publishAt` can schedule a thought using an ISO 8601 timestamp, just like an article.
- Use `-04:00` during EDT and `-05:00` during EST. The site displays the correct Eastern abbreviation automatically.

## Preview and publish

```bash
npm run dev
npm run check
npm run build
```

Commit and push the Markdown file when it is ready. GitHub Pages deploys changes from `main`.
