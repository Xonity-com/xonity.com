# xonity.com

Single-page marketing site for **Xonity** — websites, enterprise applications and
Adobe Experience Manager solutions.

Built as a client-rendered SPA: React 18 + TypeScript + Vite, client-side routing
via React Router, and a hand-written WebGL fragment shader for the background.
No UI framework, no animation library — the whole visual system is in
`src/styles/`.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production bundle into dist/
npm run preview    # serve the production build
npm run typecheck  # types only
```

Node 18+ required.

## Layout

```
.github/workflows/
  deploy.yml            Build + publish to GitHub Pages on push to main
scripts/
  spa-fallback.mjs      Post-build: dist/404.html + dist/.nojekyll
index.html              Document shell, fonts, meta/OG tags
src/
  main.tsx              Entry point, router + stylesheet imports
  App.tsx               App shell: background layers, nav, routes, footer
  pages/                One component per route (all lazy except Home)
  components/
    ShaderField.tsx     WebGL nebula background (raw GL, no three.js)
    Atmosphere.tsx      Grid, scanlines, film grain, vignette, cursor glow
    Console.tsx         Hero typewriter code panel
    Nav.tsx / Footer.tsx / Boot.tsx / Ui.tsx / Icons.tsx
  lib/
    content.ts          All site copy and data — edit here, not in the pages
    hooks.ts            Reveal-on-scroll, scroll progress, count-up, tilt
  styles/
    global.css          Design tokens, typography, layout primitives
    components.css      Nav, buttons, panels, footer, preloader, marquee
    pages.css           Hero, service cards, timeline, case studies, forms
```

### Editing content

Nearly all copy lives in `src/lib/content.ts`: services, case studies,
process steps, principles, stats, engagement models and contact details.
Pages read from it, so adding a case study is a single array entry.

### Design tokens

Colours, radii, spacing and easing curves are CSS custom properties at the top
of `src/styles/global.css`. Changing `--cyan`, `--violet` and `--magenta`
re-skins the entire site, including the gradient text, glows and the shader
(the shader's three colour stops in `ShaderField.tsx` mirror those values).

## Contact form

With `VITE_CONTACT_ENDPOINT` set (see `.env.example`), the form POSTs JSON to
that URL. Without it, the form validates client-side and then hands the message
to the visitor's mail client addressed to `hello@xonity.com` — so the site is
useful with no backend at all.

## Accessibility & motion

- Every animation is suppressed under `prefers-reduced-motion`, including the
  boot sequence, the typewriter and the shader (which renders one static frame).
- Skip link, focus-visible rings, labelled form fields, `aria-expanded` on the
  mobile menu, and semantic landmarks throughout.
- The background canvas and decorative overlays are `aria-hidden`.

## Deployment

`npm run build` emits a static site into `dist/`, then a `postbuild` step
(`scripts/spa-fallback.mjs`) writes `dist/404.html` — a copy of `index.html` —
and `dist/.nojekyll`.

### GitHub Pages (configured)

`.github/workflows/deploy.yml` builds and publishes on every push to `main`,
and can be run by hand from the Actions tab. One-time setup in the repo:

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

That is the whole setup. The workflow needs no `GITHUB_TOKEN` secret — it
authenticates with OIDC via the `id-token: write` permission.

**Base path.** Pages serves a project repo from `https://<owner>.github.io/<repo>/`,
so assets must be prefixed. The workflow works out the right prefix and passes
it to Vite as `VITE_BASE`:

| Situation | Base |
| --- | --- |
| Project repo (`Xonity-com/xonity.com`) | `/xonity.com/` |
| User/org repo (`<owner>/<owner>.github.io`) | `/` |
| `public/CNAME` present (custom domain) | `/` |

Vite exposes it as `import.meta.env.BASE_URL`, which `src/main.tsx` hands to
React Router as its `basename` — so in-app links carry the prefix
automatically, and nothing in the page code has to know about it.

**Deep links.** Pages has no rewrite rules: it answers an unknown path with
`404.html`. Because that file is a copy of the app, `/xonity.com/services`
loads, React Router reads the URL and renders the Services page. The HTTP
status is still 404, which browsers do not mind but crawlers do — the trade-off
of a client-rendered SPA on Pages.

### Moving to the xonity.com domain

1. `echo xonity.com > public/CNAME`
2. Point a `CNAME` DNS record at `xonity-com.github.io` (or the four A records
   for an apex domain, per GitHub's docs).
3. Push. The workflow sees `public/CNAME`, rebuilds with base `/`, and Pages
   picks the domain up from the file.

### Contact form in CI

Set an Actions **variable** named `CONTACT_ENDPOINT` (Settings → Secrets and
variables → Actions → Variables) and the deployed build will POST the form
there. Left unset, the form falls back to the visitor's mail client. It is a
variable rather than a secret because Vite inlines it into the client bundle,
where it is public either way.

### Other hosts

- **Netlify** — `public/_redirects` is already in place.
- **Vercel** — `vercel.json` is already in place.
- **nginx** — `try_files $uri $uri/ /index.html;`
- **Apache** — a `FallbackResource /index.html` directive.
