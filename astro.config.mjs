import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import externalLinks from './src/plugins/external-links.mjs';

export default defineConfig({
  site: 'https://young-systems.com',
  markdown: { rehypePlugins: [[externalLinks, { origin: 'https://young-systems.com' }]] },
  integrations: [sitemap()],
  output: 'static',
});
