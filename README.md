# The Digital Atelier

A static Astro portfolio for Sai Sharmila Kinjarapu. The warm ivory, blush, lavender, and plum visual identity is paired with cinematic editorial section transitions, layered project artwork, and readable, individually art-directed case studies.

## Project contents

- `src/pages/` contains the home, résumé, project case studies, sitemap, and robots routes.
- `src/components/` contains the Astro UI components.
- `src/data/portfolioData.ts` is the shared source for project, skills, certificate, and contact details.
- `public/images/atelier/` contains the six optimized WebP website visuals.
- `public/Sai_Sharmila_Kinjarapu_Resume.pdf` is the intentionally public résumé download.
- The root `details.docx` and `Sai_Sharmila_Kinjarapu_Resume_Master.pdf` are local source documents and are excluded by `.gitignore`.

## Technologies

- Astro 5 static output
- Semantic HTML and component-scoped CSS
- Lightweight scroll-triggered transitions with reduced-motion support
- WebP images with intrinsic dimensions to reduce layout shifts

## Local setup

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

Build and preview the production output locally:

```sh
npm run build
npm run preview
```

The static output is written to `dist/`. No server adapter or database is required.

For a custom canonical origin, pass the desired public origin at build time:

```powershell
$env:PUBLIC_SITE_URL = 'https://your-project.vercel.app'
npm run build
```

The default canonical origin is `https://sharmila534.github.io`. GitHub Actions builds use the `/portfolio/` repository base automatically. Vercel builds use the project production URL and serve from `/`.

## Deploy to Vercel through GitHub

Astro is configured for static output at the domain root. Vercel detects Astro automatically; use these settings if it asks:

- Framework preset: Astro
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root

Vercel describes Hobby as a free plan for personal projects, which fits this non-commercial portfolio. The build uses Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` when available. It can also use `PUBLIC_SITE_URL` as an explicit override. This supplies the canonical URL, social image URL, sitemap entries, and `robots.txt` sitemap line. No domain purchase, adapter, or paid service is needed. See the [Astro Vercel deployment guide](https://docs.astro.build/en/guides/deploy/vercel/), [Vercel Hobby plan](https://vercel.com/docs/plans/hobby), and [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).

### Initialize and push to GitHub

Run these from the project folder to use the existing public repository.

```powershell
Set-Location F:\portfolio
git init -b main
git status --short
git check-ignore -v details.docx Sai_Sharmila_Kinjarapu_Resume_Master.pdf
git add .
git status --short
git commit -m "Prepare Astro portfolio for deployment"
git remote add origin "https://github.com/Sharmila534/sharmila-portfolio.git"
git push -u origin main
```

Check the staged file list before committing. The résumé under `public/` is intentionally public; the root master PDF and `details.docx` must remain ignored.

### Connect GitHub to Vercel

1. Sign in to Vercel and import the GitHub repository.
2. Keep the Astro preset and the build settings listed above.
3. Deploy. Vercel creates preview deployments for non-production branches and a production deployment from the configured production branch.
4. Open the deployment URL and check the routes, résumé download, images, sitemap, and metadata.

## Content scope

TerraSeg is described as a research prototype. Its reported metrics are tied to the documented Bijie test snapshot, including the limitation that the test partition was consulted. AquaGuard is described as a prototype using supplied/demo inputs, without live sensor or external data connections. Project limitations appear in the portfolio and case studies.

## Publishing checklist

- [ ] Confirm `git status --short` does not list `details.docx` or the root master résumé PDF.
- [ ] Run `npm ci`, `npm run build`, and `npm run preview`.
- [ ] Confirm `public/Sai_Sharmila_Kinjarapu_Resume.pdf` is the correct public version.
- [ ] Push the intended branch and import the repository in Vercel.
- [ ] Confirm Vercel builds the Astro project to `dist/`.
- [ ] Test the public home page, all four project routes, résumé page and download, and an unknown route.
- [ ] Check the mobile menu, keyboard navigation, reduced-motion setting, image loading, external links, `/robots.txt`, and `/sitemap.xml` on the deployed URL.
- [ ] Confirm the public URL in canonical and social metadata matches the deployed production URL.
