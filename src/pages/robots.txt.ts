import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = () => {
  const configuredSite = import.meta.env.SITE;
  const normalizedSite = configuredSite ? new URL(configuredSite).origin : undefined;
  const sitemapLine = normalizedSite ? `Sitemap: ${normalizedSite}${import.meta.env.BASE_URL}sitemap.xml\n` : '';
  return new Response(`User-agent: *\nAllow: /\n${sitemapLine}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
