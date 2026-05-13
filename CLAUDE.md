# CLAUDE.md / AGENTS.md

This file is loaded by Claude Code (as `CLAUDE.md`) and Codex (as `AGENTS.md`,
which is a symlink to this file) on every run. It tells you (the agent) what
this repository is, who's likely editing it, and the conventions to follow.

## What this is

A small static-website template built with **Astro 6** and **Tailwind CSS v4**.
It's intended to be forked by individuals — often non-technical — who want a
personal site they can keep editing with Claude Code. There's no CMS, no
backend, no auth. Pages live in `src/pages/` as `.astro` files; you write
HTML/JSX with frontmatter and it builds to a static `dist/`.

## Who you're talking to

Assume the user is **not** a professional web developer. Prefer plain-English
explanations, default to obvious choices, and avoid throwing jargon at them
unless they ask. When they describe a change, **just make the change** rather
than asking five clarifying questions — they can iterate. If something is
ambiguous and the wrong call would mean rework, ask once, briefly.

## First-run job

When the user first opens this repo with an agent, they'll usually ask you
to "fill in the placeholders" or "set this up as my personal website".
That means:

1. **Grep the whole repo for `TODO`** — `grep -rn "TODO" .` (excluding
   `node_modules`, `.astro`, `dist`). Every line that needs personalising
   carries a `// TODO` (or `<!-- TODO -->`) comment explaining what it is.
   Walk through each one and replace it with what the user tells you. The
   usual hot-spots:
   - `astro.config.ts` — the `site:` URL.
   - `src/layouts/Layout.astro` — `SITE_NAME`, `SITE_DEFAULT_DESCRIPTION`,
     the og-image, and the base64-encoded email obfuscation.
   - `src/components/Nav.astro` — `SITE_NAME` (the site title shown in the header).
   - `src/components/Footer.astro` — `OWNER`.
   - `src/pages/index.astro` & `src/pages/about.astro` — both are template
     walkthrough pages and should be **rewritten** as the user's real
     landing + about pages, not just edited.
   - `src/pages/404.astro` — small terminal-style touches like `guest@mysite`.
   - `public/favicon.svg` — palette/glyph.
   - `public/manifest.json` — `short_name`, `name`, `description`, `theme_color`
     (JSON doesn't support comments, so these don't carry a `TODO` marker —
     just edit the values).
   - `public/og-image.png` — doesn't exist yet; add a 1200×630 PNG here for
     link previews on Twitter/Slack/Discord, or skip it.
2. **Once everything is replaced, update this very file.** Specifically:
   - Delete this "First-run job" section entirely so future runs don't
     repeat it.
   - Rewrite the "What this is" section above to describe the *user's*
     site (e.g. "Anna's personal blog — Astro, Tailwind, hosted on
     GitHub Pages at annawright.com") rather than the template.
   - Add anything project-specific the user wants you to remember: tone of
     voice, preferred colours, brand guidelines, off-limits topics, etc.
   - Remove the `AGENTS.md` ↔ `CLAUDE.md` symlink description if irrelevant
     — though keeping the symlink itself is harmless and lets both agents
     read this file.

After this first-run job is done, the repo is no longer a template. It's
just a website.

## Commands

```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server at localhost:4321
pnpm run build        # Build production site to ./dist/
pnpm run preview      # Preview production build locally
pnpm run test         # Run astro check (types + content schema) and then astro build with internal + external link checking. No unit tests.
```

## Architecture

### Routing

Every `.astro` (or `.ts`) file under `src/pages/` becomes a route. To add a
new page, drop a new file in there — e.g. `src/pages/projects.astro`
produces `/projects/` (note the trailing slash; see "Build details" below).
Subdirectories work too.

### Layout

`src/layouts/Layout.astro` wraps every page. It owns:

- All `<head>` tags (title, description, canonical, Open Graph, Twitter cards)
- The inline theme-bootstrap script that prevents a light-mode flash
- The mailto obfuscation block at the bottom

Pages opt in by importing it and passing `title` / `description` props.

### Components

`Nav`, `Footer`, and `DarkModeToggle` are the only built-in components.
They're deliberately small — copy/paste/edit rather than over-abstract.

### Styling

Tailwind v4 plus a handful of custom utilities in `src/global.css`:

- **CSS variables** under `:root` and `:root.dark` drive the whole palette.
  Edit the OKLCH values there to recolour everything at once.
- **`.btn`, `.card`, `.tag`, `.tag-soft`, `.link-accent`, `.popup`** —
  reusable component classes.
- **`shadow-flat`, `shadow-flat-strong`, `shadow-flat-sm`,
  `shadow-flat-sm-strong`** — Tailwind utilities (declared with `@utility`)
  for the signature flat offset shadow.

Use the custom classes for the "design-system" pieces (buttons, cards) and
plain Tailwind for everything else. Dark mode is toggled by a `.dark` class
on `<html>`; use the `dark:` variant for overrides.

### Icons

Icons come from [Lucide](https://lucide.dev/icons) via `astro-icon`:

```astro
import { Icon } from "astro-icon/components";
<Icon name="lucide:mail" class="w-4 h-4" />
```

Any name from the Lucide catalogue works. Tree-shaking is automatic — only
the icons you reference are bundled.

### Build details

- `output: "static"` — everything pre-renders to HTML at build time.
- `trailingSlash: "always"` — every internal link must end with a `/`. Pages
  ship as `about/index.html` (default `build.format: "directory"`), so this
  is the path of least resistance on every host.
- `build.inlineStylesheets: "always"` — all CSS is inlined into the HTML,
  saving a request on first load.
- `astro-broken-link-checker` runs during `astro build` and **fails the build**
  on broken internal links. `pnpm test` runs the build with
  `CHECK_EXTERNAL_LINKS=true` so external links are validated too — slower
  but catches dead third-party URLs before they ship.

### Path aliases

Configured in `tsconfig.json`:

- `@layouts/*` → `src/layouts/*`
- `@components/*` → `src/components/*`
- `@assets/*` → `src/assets/*`
- `@lib/*` → `src/lib/*` (utilities like `withBase()` — see Conventions below)

## Conventions

- **Internal links go through `withBase()` from `@lib/url`.** Write
  `href={withBase("/about/")}`, not `href="/about/"`. The helper prepends
  the configured Astro `base:` (so links stay correct both locally and when
  the site is deployed under a GitHub Pages subpath like
  `username.github.io/repo/`) and enforces the trailing slash. It also
  handles file paths (`/favicon.svg`) and fragments (`/about/#section`)
  correctly. The broken-link checker catches missing trailing slashes; the
  wrong-base case is silent until you deploy, so always route through the
  helper.
- **Run `pnpm test` after making changes.** It runs `astro check` plus a
  full build with internal + external link validation, so broken links and
  type errors get caught locally instead of in CI. Treat a clean run as
  part of "done" for any non-trivial edit.
- **Use the custom utilities (`.btn`, `.card`, etc.) for the design-system
  pieces** rather than re-implementing them from Tailwind primitives — that
  way the theme variables propagate.
- **Mailto links use the placeholder `href="mailto:me"`** which is rewritten
  client-side from the obfuscated values in `Layout.astro`. Edit the base64
  strings there to set the real address; don't put it in plain HTML or
  scrapers will grab it.
- **British English** in user-facing copy by default — but defer to the user
  if they want something else.
