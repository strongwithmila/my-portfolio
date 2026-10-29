/**
 * Builds a link to a page or file inside this site, so links keep working
 * when the site is published in a sub-folder (e.g. GitHub Pages).
 * Example: url('/privacy') → '/my-portfolio/privacy' on GitHub Pages, '/privacy' locally.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
