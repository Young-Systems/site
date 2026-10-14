# Contract services and SMTP2GO setup

Existing articles and portfolio pages remain intact. `/services` contains the new offerings and inquiry form.

## Availability

Set `acceptingProjects: false` in `src/data/services.ts` and redeploy the site to hide services promotion and remove the form. Contact stays in the navigation and leads to a simple email contact page at `/services` when availability is off. Resources and About Us remain the same in both states. Also set the Worker's `ACCEPTING_PROJECTS` variable to `false` and redeploy it to reject direct submissions. Both settings must be changed when closing inquiries.

## Configure SMTP2GO

1. Verify your sending domain or sender in SMTP2GO. The default sender and recipient are `samuel@young-systems.com`.
2. Create an API key under **Sending > API Keys**. This integration uses the HTTPS API, not an SMTP username/password.
3. Keep that key private. Enter it only using the Cloudflare secret prompt below.

## Configure Turnstile

Create a Managed Turnstile widget in Cloudflare for `young-systems.com` and `www.young-systems.com`. Save the public site key and private secret key separately. The Worker checks the token's hostname and the `project-inquiry` action.

## Deploy the Worker

From the repository root, with Node.js and npm installed:

```bash
cd workers/project-inquiry
npx wrangler login
npx wrangler deploy
npx wrangler secret put SMTP2GO_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Enter each private key when prompted. You can also enter them as **Secret** variables in the Worker's Cloudflare dashboard. Never commit them or create public build variables for them.

Review `wrangler.jsonc` before deploying: sender, recipient, allowed website origins, and availability. It includes a Cloudflare rate limit binding for five attempts per minute per IP. A workers.dev URL is sufficient; a custom domain is optional. The endpoint is `https://<your-worker-host>/inquiry`.

## Connect the static site

In GitHub **Settings > Secrets and variables > Actions > Variables**, add these repository variables:

| Variable | Value |
| --- | --- |
| `PUBLIC_PROJECT_INQUIRY_ENDPOINT` | Your HTTPS Worker URL ending in `/inquiry` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Your public Turnstile site key |

The deployment build passes both to Astro. Direct submissions require both values. With no endpoint set, the form retains its email draft fallback. The SMTP2GO and Turnstile private keys belong only in the Worker.

For local review, set the same public values in an uncommitted `.env` file. Add `http://localhost:4321` to the Worker's allowed origins and localhost to a separate development Turnstile widget if testing delivery locally. Remove temporary origins afterward.

## Verify delivery

Submit a sample inquiry from an allowed site. Verify the success message, email arrival, and Reply-To behavior. Test an expired challenge, missing fields, and the closed availability setting. The form preserves entered details on failure. SMTP2GO acceptance does not guarantee inbox placement; use SMTP2GO's delivery activity to investigate bounces. No automatic retries are made after ambiguous delivery failures.

The Worker validates and bounds fields, verifies Turnstile server-side, applies rate limits, and sends only to the configured owner address. It does not log inquiry contents or provider secrets. Inquiry contents pass through Cloudflare and SMTP2GO; manage retention in those services.

## Checks

```bash
node --test workers/project-inquiry/index.test.mjs
npm run check
npm run build
```

## References

- https://developers.smtp2go.com/reference/send-standard-email
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
