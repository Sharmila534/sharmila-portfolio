import { defineConfig } from 'astro/config';

const configuredSite = process.env.PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = configuredSite
  ? new URL(configuredSite.includes('://') ? configuredSite : `https://${configuredSite}`).origin
  : 'https://sharmila534.github.io';
const base = process.env.GITHUB_ACTIONS === 'true' && !process.env.VERCEL ? '/portfolio/' : '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
