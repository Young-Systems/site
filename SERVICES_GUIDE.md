# Contract services

The `/services` page adds contract project offerings alongside the existing portfolio and articles.

## Turn availability off

Set `acceptingProjects: false` in `src/data/services.ts`, commit, and deploy. This removes the Services navigation link and home page callout and removes the inquiry form. Direct visits to `/services` show an unavailable message with portfolio links. Set it back to `true` and redeploy to reopen inquiries. This is an owner setting, not a visitor toggle.

## Inquiry delivery

Without a configured endpoint, the form prepares a message in the visitor's email application addressed to `samuel@young-systems.com`. The visitor must send that email. The page states this before submission and never claims the inquiry was delivered.

For direct form submissions, configure `PUBLIC_PROJECT_INQUIRY_ENDPOINT` with an HTTPS endpoint from your selected form provider. It must accept standard HTML form POSTs, deliver to your inbox, and provide its own success/error page. Enable spam filtering and rate limits at that provider; `_gotcha` is the form's honeypot field. Review its data retention and privacy settings before enabling it. An endpoint URL is public, so do not use a secret token here.

For the GitHub Pages workflow, add a repository variable named `PUBLIC_PROJECT_INQUIRY_ENDPOINT`. The build step passes it to Astro. Leaving the variable empty keeps the email draft method.

Closing the website form does not disable an external form provider endpoint. Disable that endpoint in the provider if you also want it closed independently.

## Edit offerings

Edit `services` in `src/data/services.ts`. Page copy and inquiry fields are in `src/pages/services.astro`; visual styling is under Contract project services in `src/styles/global.css`.

## Local review

Run `npm ci`, `npm run check`, and `npm run build`. Run `npm run dev` to review `/services` and the homepage. Test both availability settings before publishing.
