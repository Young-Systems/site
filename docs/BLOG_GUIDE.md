# Blog publishing guide

Blog posts are Markdown files stored under `src/content/blog/`. Subfolders are supported, but become part of the public URL.

```text
src/content/blog/microsoft/entra-identity-notes.md
→ /blog/microsoft/entra-identity-notes/
```

## Create an article

Create a lowercase, hyphenated `.md` file and begin with this frontmatter:

```yaml
---
title: "Article title"
description: "A short summary shown on the Writing page."
category: Microsoft
publishedAt: 2026-09-20
tags: [Microsoft 365, Entra ID, PowerShell]
draft: false
---
```

- `category` creates the Writing page filter automatically.
- `tags` describe the technologies or subjects.
- `draft: true` prevents the article and its URL from being published.
- Add `updatedAt: 2026-10-01` after a substantial revision.

## Schedule an article

Add `publishAt` using an ISO 8601 UTC timestamp:

```yaml
publishedAt: 2026-10-05
publishAt: 2026-10-05T14:00:00Z
draft: false
```

The article remains excluded from the site, homepage, sitemap, and direct URL until the scheduled time. GitHub rebuilds hourly at 17 minutes past the hour, so publication may occur up to roughly one hour later.

## Common formatting

```markdown
## Main section

### Subsection

**Bold text** and *italic text*

[Descriptive link](https://example.com)

[Jump to troubleshooting](#troubleshooting)

- Unordered item
- Another item

1. First step
2. Second step

`Inline-Code`
```

Code block:

````markdown
```powershell
Connect-MgGraph -Scopes "User.Read.All"
Get-MgUser -All
```
````

Note with separate paragraphs:

```markdown
> **Note:** Important information belongs here.
>
> A second paragraph or [related link](https://example.com).
```

Table:

```markdown
| Service | Purpose | Status |
|---|---|---|
| Entra ID | Identity | Active |
| Exchange Online | Email | Active |
```

Image saved under `public/images/blog/`:

```markdown
![Descriptive alternative text](/images/blog/example.png)
```

Astro automatically creates section URLs from headings. The site also adds a clickable `#` beside each section heading.

## Publish changes

Preview and validate locally:

```bash
npm run dev
npm run check
npm run build
```

Publish:

```bash
git add .
git commit -m "Publish article title"
git push
```

The GitHub Pages workflow deploys changes from `main`.
