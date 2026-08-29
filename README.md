# Archery Records

A multilingual website for Ukrainian compound bow archery records, built with [Eleventy](https://www.11ty.dev/) v3. Showcases records for Kharkiv region, Ukraine, and the world across multiple categories and competition formats.

## Project Overview

This site tracks and displays compound bow archery records including:

- **Categories:** Men, Women, Mixed Teams, Cadets, Juniors, and Masters (50+)
- **Formats:** Indoor and outdoor competitions
- **Scopes:** Regional (Kharkiv), National (Ukraine), and World records
- **Languages:** Ukrainian, English, and Polish

Live site: [compound-records.com](https://compound-records.com/)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Development server with live reload:

```bash
npm start
```

The site will be available at `http://localhost:8080`

3. Production build:

```bash
npm run build
```

Output generated in `_site/` folder.

## Project Structure

```
content/              # Source content (templates & markdown)
  ├── en/            # English locale
  ├── ua/            # Ukrainian locale (default)
  └── pl/            # Polish locale
_data/                # Global data files & translations
_includes/
  ├── layouts/       # Base layout templates
  └── partials/      # Reusable components
public/               # Static assets (CSS, images, SVGs)
  └── css/           # Stylesheets (no build pipeline)
_site/                # Generated static output
```

## Features

- **Eleventy v3** — Zero-JavaScript static site generator with ESM support
- **Multilingual (i18n)** — Built-in support for 3 languages using `EleventyI18nPlugin`
- **Performance optimized** — Lighthouse 4/4 score
  - 0 Cumulative Layout Shift
  - 0ms Total Blocking Time
- **Image optimization** — Automatic WebP/AVIF conversion and lazy loading
- **Syntax highlighting** — Built-in code block styling
- **Navigation** — Content-driven menu generation
- **Accessibility** — Semantic HTML, ARIA roles, keyboard navigation
- **Responsive design** — Mobile-first CSS with custom properties
- **Dark mode** — CSS media query support with explicit token overrides

## NPM Scripts

- `npm start` — Build and serve with live reload (dev mode)
- `npm run build` — Production build to `_site/`
- `npm run debug` — Build with full Eleventy debugging
- `npm run debugstart` — Serve with debugging enabled
- `npm run benchmark` — Profile Eleventy build performance

## Configuration

- **Main config:** [eleventy.config.js](eleventy.config.js)
- **Site metadata:** [_data/metadata.js](_data/metadata.js)
- **Translations:** [_data/translations.js](_data/translations.js)
- **Localized data:** `content/<lang>/<lang>.11tydata.js`

### Development Notes

See [agents.md](agents.md) for known quirks and project-specific patterns, including:
- CSS pipeline (no Tailwind build — all CSS is hand-written)
- Language switcher component implementation
- Dev server 404 locale handling

## Deployment

This project is deployed as a static site on Cloudflare Pages / Workers-compatible hosting. The app already handles locale-aware routing and 404 fallbacks in the Eleventy server config for local preview, and the static output is designed to work with a Cloudflare static-hosting setup.

## Layout Structure

- `_includes/layouts/base.njk`: Top-level HTML structure
- `_includes/layouts/home.njk`: Home page template (wraps into `base.njk`)
- `_includes/layouts/record.njk`: Record page template

## Styling

The project uses hand-written CSS with CSS custom properties for theming:

- **Global styles:** `public/css/index.css` (contains `:root` with color tokens and spacing scale)
- **Dark mode:** Explicit dark-mode overrides in `@media (prefers-color-scheme: dark)`
- **Component styles:** Scoped CSS files for specific components (language switcher, breadcrumbs, tables, etc.)
- **Utilities:** Custom utility classes (`.relative`, `.absolute`, `.my-*`, `.mx-*`, etc.)

**Note:** There is no Tailwind CSS build pipeline. All utility-looking class names must be verified in the CSS files.

## License

MIT
