# Meghan Gowda B Y — Data Analyst Portfolio

React, TypeScript, Vite, Tailwind CSS, GSAP/ScrollTrigger, and lucide-react.

## Local development

```sh
npm ci
npm run dev
```

Run `npm run build` to type-check and create the production site in `dist/`.

## Deployment

- **GitHub Pages:** the included workflow builds and publishes on pushes to `main`. Enable GitHub Pages with **GitHub Actions** as the deployment source.
- **Netlify:** `netlify.toml` configures `npm run build` and `dist`.
- **Vercel:** `vercel.json` configures the Vite build and `dist` output.

For a GitHub Pages project site, the workflow sets the repository subpath automatically. To build for a custom base path elsewhere, set `VITE_BASE_PATH` (for example, `/portfolio/`).

The original resume is served as a PDF from `public/resume/`; the portrait is in `public/images/`.
