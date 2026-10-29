import { defineConfig } from 'astro/config';

// Set `site` to the real domain once it is known (used for canonical URL and social tags).
export default defineConfig({
  site: process.env.SITE_URL || undefined,
});
