# Projects and certifications guide

Projects and certifications are maintained through centralized data files. Pages and homepage cards are generated automatically.

## Add a project

Open `src/data/projects.ts` and add an entry to the `projects` list:

```ts
{
  title: 'Microsoft 365 Reporting Toolkit',
  description: 'PowerShell reporting and validation tools for Microsoft 365 environments.',
  tags: ['PowerShell', 'Microsoft Graph', 'Microsoft 365'],
  status: 'In development',
  href: 'https://github.com/Young-Systems/project', // Optional
  featured: true, // Optional
},
```

- List order controls the order on the Projects page.
- `featured: true` also places the project on the homepage.
- The homepage displays up to three featured projects.
- `href` makes the card clickable.
- Remove an entry to remove the project from the site.

Common status values include `Design`, `Lab`, `In development`, `Operating`, and `Complete`, but any short label is accepted.

## Add a certification

1. Download the official badge image.
2. Give it a lowercase, hyphenated filename such as `azure-administrator.png`.
3. Save it under `public/images/certifications/`.
4. Open `src/data/certifications.ts` and add an entry:

```ts
{
  name: 'Azure Administrator Associate',
  issuer: 'Microsoft',
  issued: 'October 2026',
  expires: 'October 2027',       // Optional
  credentialId: 'ABC123',       // Optional
  credentialUrl: 'https://learn.microsoft.com/credentials/example', // Optional
  image: '/images/certifications/azure-administrator.png',
},
```

- Keep the newest certification first.
- `credentialUrl` displays the **Show credential** button.
- `credentialId` is intended only for public verification IDs.
- Do not store account credentials, private keys, access tokens, or private certificate files in the repository.

## Validate and publish

```bash
npm run check
npm run build
git add .
git commit -m "Update projects and certifications"
git push
```

The GitHub Pages deployment begins automatically after the push.
