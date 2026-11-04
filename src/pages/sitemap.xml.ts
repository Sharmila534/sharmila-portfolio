import type { APIRoute } from 'astro';

export const prerender = true;

const routes = [
  '/',
  '/resume/',
  '/projects/terraseg-ai/',
  '/projects/aquaguard-ai/',
  '/projects/hospital-management-system/',
  '/projects/ai-planning-search/'
];

export const GET: APIRoute = () => {
  const site = import.meta.env.SITE;
  const origin = site ? new URL(site).origin : undefined;
  const base = import.meta.env.BASE_URL;
  const urls = origin
    ? routes.map((route) => `  <url><loc>${new URL(`${base}${route.replace(/^\/+/, '')}`, origin).href}</loc></url>`).join('\n')
    : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
