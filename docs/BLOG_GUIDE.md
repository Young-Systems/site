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
publishedAt: 2026-09-20T09:00:00-04:00
tags: [Microsoft 365, Entra ID, PowerShell]
references:
  - label: "Get-M365TenantAssessment.ps1"
    type: Script
    url: "https://github.com/Young-Systems/example/blob/main/Get-M365TenantAssessment.ps1"
draft: false
---
```

- `category` creates the Writing page filter automatically.
- `tags` describe the technologies or subjects.
- `references` optionally links readers to scripts, repositories, documentation, or other source material.
- `draft: true` prevents the article and its URL from being published.
- Add `updatedAt: 2026-10-01T14:30:00-04:00` after a substantial revision.
- Use an explicit Eastern offset: `-04:00` during EDT and `-05:00` during EST. The site displays the appropriate `EDT` or `EST` abbreviation automatically.

## Add references

Add one or more references to the article frontmatter. The `type` is optional; `label` and a complete `url` are required.

```yaml
references:
  - label: "Get-M365TenantAssessment.ps1"
    type: Script
    url: "https://github.com/Young-Systems/example/blob/main/Get-M365TenantAssessment.ps1"
  - label: "Microsoft Graph documentation"
    type: Documentation
    url: "https://learn.microsoft.com/graph/"
```

When references are present, the site displays them in a dedicated block near the article metadata. Omit `references` when an article does not need them.

## Schedule an article

Add `publishAt` using an ISO 8601 timestamp with the Eastern offset:

```yaml
publishedAt: 2026-10-05T09:00:00-04:00
publishAt: 2026-10-05T09:00:00-04:00
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

Astro automatically creates section URLs from headings. The site also adds a clickable `#` beside each section heading. Clicking it jumps to that section and copies the full section URL to the clipboard.

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
