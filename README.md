# Young Systems

Source for [young-systems.com](https://young-systems.com), a business and technical portfolio site built with Astro.
## Business and Portfolio modes

Both modes use the same logo, dark blue theme, layout, article library, and certifications. Projects are available only in Portfolio mode; Business mode redirects `/projects` to `/services`.

The owner controls the deployment mode in `src/data/site.ts`: change the default from `business` to `portfolio`, then rebuild and deploy. Alternatively set `PUBLIC_SITE_MODE=portfolio` in the build environment (this overrides the file). Accepted values are `business` and `portfolio`; invalid values fail the build.

- **Business**: service-led homepage, eight service areas, MSP partnership messaging, business navigation and metadata, and project inquiry form. `/contact` redirects to `/services`.
- **Portfolio**: personal engineering homepage, projects and articles, personal About navigation and contact links. Service promotion and the inquiry form are omitted, including on direct visits to `/services`.

This is an owner configuration switch rather than a public visitor preference. Portfolio mode does not expose a button to switch back into advertising services. The existing `servicesConfig.acceptingProjects` now follows this mode automatically.

Preview either mode locally:

```sh
PUBLIC_SITE_MODE=business npm run dev
PUBLIC_SITE_MODE=portfolio npm run dev
```

Changes take effect after restarting the dev server or rebuilding the deployment. Keep any deployment environment override aligned with the desired mode. The inquiry Worker has its own configuration and lifecycle; switching the website to Portfolio removes the form but does not shut down a separately deployed Worker.
