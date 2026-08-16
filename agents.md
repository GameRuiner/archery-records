# Agent Onboarding — archery-records

This file captures project-specific quirks discovered while debugging the
language switcher and 404 page. Read this before touching CSS, i18n, or
the dev server config — several things here are **not** what they'd
normally look like in a stock Eleventy setup.

## Stack

- **Static site generator:** Eleventy (`@11ty/eleventy` v3), ESM
  (`"type": "module"` in `package.json`).
- **Config file:** `eleventy.config.js` (project root).
- **Content input dir:** `content/` → output `_site/`.
- **Templating:** Nunjucks (`.njk`).
- **i18n:** `EleventyI18nPlugin`. `defaultLanguage: "ua"`. Locales in use:
  `en`, `ua`, `pl`. Locale-specific data files live at
  `content/<lang>/<lang>.11tydata.js`.
- **Base layout chain:** `layouts/home.njk` extends `layouts/base.njk`.
  `layouts/base.njk` bundles/inlines CSS via `@11ty/eleventy-plugin-bundle`
  (`eleventyConfig.addBundle('css', {hoist: true})`).

## ⚠️ CSS: there is no build pipeline

`tailwindcss`, `postcss`, `postcss-import`, `autoprefixer`, and `cssnano`
are all listed in `package.json`, **but there is no `tailwind.config.js`,
no `postcss.config.js`, and no PostCSS/Tailwind step wired into
`eleventy.config.js`.** `eleventyConfig.addPassthroughCopy({"./public/":
"/"})` just copies `public/` to `_site/` byte-for-byte.

**Practical implication:** any class name that looks like a Tailwind
utility (`self-start`, `my-s`, `me-l`, `p-xs`, `relative`, `icon-center`,
etc.) in a template or component-scoped CSS file is very likely **not
actually defined anywhere** — it was written assuming a Tailwind build
that was never finished. Don't assume "it's Tailwind, it must work."
Grep `public/css/*.css` for the literal class before trusting it exists.

All CSS in this project is currently hand-written plain CSS using custom
properties, living in `public/css/*.css` (no source/`src` directory — what
you see in `public/css` **is** the source).

- Global tokens/resets: `public/css/index.css` (has the main `:root`
  block — colors, and now also `--space-*` spacing scale + a small set of
  hand-written utility classes we added: `.relative`, `.absolute`,
  `.self-start`, `.icon-center`, `.my-*`, `.mx-*`, `.ms-*`, `.me-*`,
  `.p-*`, `.button`).
- Dark mode: `@media (prefers-color-scheme: dark)` block inside the same
  `:root` in `index.css`. **When adding a new `--color-gray-*` or
  similar base token, always give it an explicit dark-mode value in this
  block too** — an omitted token silently keeps its light-mode value in
  dark mode, which caused a near-invisible-text bug on hover states
  (`--color-gray-20` wasn't overridden, so hover text ended up
  near-white-on-near-white in dark mode).
- Component-scoped CSS: `public/css/language.css` (language switcher),
  `public/css/breadcrumbs.css`, `public/css/categories.css`,
  `public/css/message-box.css`, `public/css/prism-diff.css`,
  `public/css/tables.css`.
- **Don't reuse a token for a job it wasn't designed for**, even if it
  happens to produce acceptable contrast in one theme. We found
  `--color-active` aliased to `--text-color-link` and `--color-dark`
  aliased to `--color-gray-90` — this "worked" in dark mode by luck but
  produced dark-text-on-dark-background in light mode. Fixed by giving
  the active/selected state its own dedicated tokens
  (`--color-active`, `--color-on-active`) with explicit light + dark
  values instead of borrowing unrelated ones.
- **Media query syntax:** watch for `@media screen(md) { }` in existing
  CSS — this is invalid syntax (not real Tailwind `@screen` syntax, not
  standard CSS). Replace with `@media (min-width: <value>) { }` if you
  find more of these.

## SVG icons

Icons injected via the `{% svg "..." %}` shortcode (see
`content/_config/shortcodes.js`) are typically **stroke-based**, e.g.:

```xml
<svg ... fill="none" stroke="var(--header-color-override, currentColor)" ...>
```

They already inherit color correctly via `currentColor` on `stroke` —
**do not** add `fill: currentColor` in CSS to "fix" icon coloring without
checking the source SVG first. Doing so overrode `fill="none"` on the
globe icon and turned an outline icon into a solid gray blob. Set `color`
on an ancestor element (e.g. the button) and let the SVG inherit it.

## Language switcher component

- Markup: WebC/Nunjucks partial rendering `<is-land on:idle>` +
  `data-lang-switcher` wrapper, `<button aria-expanded>` toggle, `<ul
  role="list">` of `<a role="option">` items.
- Styles: `public/css/language.css`.
- `.language-items` is `position: absolute` — it **requires** a
  `position: relative` ancestor (`[data-lang-switcher] { position:
  relative; }`) or it anchors to the viewport instead of the button.
  This broke silently for a while because it depended on an undefined
  `.relative` utility class (see CSS pipeline note above).
- Selected/active list item state uses dedicated `--color-active` /
  `--color-on-active` tokens (see dark-mode note above) — don't
  re-alias these to link-color or heading-color tokens.

## Dev server 404 handling

- Eleventy Dev Server (bundled with `@11ty/eleventy` v3) only serves a
  **single root** `_site/404.html` as its built-in fallback for
  unmatched routes — it does **not** inspect the URL path to pick a
  locale-specific 404.
- We added a root `content/404.md` (`permalink: /404.html`) as a
  baseline fallback, and a `setServerOptions({ onRequest: { "/*": ... }
  })` handler in `eleventy.config.js`, **gated to `process.env
  .ELEVENTY_RUN_MODE === "serve"`**, that:
  1. Skips interception if the request path maps to a real file in
     `_site/` (checked via `fs.promises.stat` before intercepting).
  2. Detects locale from the path prefix (`/en/`, `/ua/`, `/pl/`) via
     regex, falling back to `defaultLanguage` ("ua") if no prefix
     matches.
  3. Reads and returns the matching `_site/<locale>/404.html` (falling
     back to root `_site/404.html` if that's missing).
- **This handler only runs in local dev.** `onRequest` is a
  `eleventy-dev-server`-only API; it does not exist in the static
  output and has no effect on any real host. Locale-correct 404 behavior
  in **production** depends entirely on the host:
  - Netlify walks up the directory tree for the nearest `404.html`, so
    `/en/broken` → `/en/404.html` works automatically, no extra config.
  - GitHub Pages / some default static hosts only support a single root
    `404.html` — this is why the `content/404.md` root fallback must
    stay in place regardless of the dev-server fix.
  - **Confirm which host this project deploys to before assuming
    locale-native 404s work in production** — it wasn't confirmed as of
    this writing.
- Reminder: this code uses `fs` and `path` — make sure `import fs from
  "node:fs"` and `import path from "node:path"` are present at the top
  of `eleventy.config.js` (ESM project, no CommonJS `require`).

## General debugging pattern that worked here

Most of the visual bugs in this project traced back to the same root
cause: **class names and CSS custom properties referenced in templates
that were never actually defined anywhere in the codebase** (missing
Tailwind build, missing spacing scale, missing dark-mode overrides for
specific tokens). When something "doesn't look right" and the markup
looks reasonable, the fastest diagnosis is usually: grep for the
class/variable name across all CSS files and confirm it's defined *and*
has sane values in both light and dark mode — don't assume a
plausible-looking class name is backed by real CSS.