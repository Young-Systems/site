import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://young-systems.com',
  integrations: [sitemap()],
  output: 'static',
});
