import { defineConfig } from 'astro/config';

// SITE_URL: the site's domain (used for canonical URL and social tags).
// BASE_PATH: the sub-folder the site lives in, e.g. '/my-portfolio' on GitHub Pages.
// Both are set automatically by the GitHub Pages workflow; leave them empty locally.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
});
