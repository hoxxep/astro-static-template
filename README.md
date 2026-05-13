# astro-static-template

A small, opinionated starting point for a personal website. It's built with
[Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/),
ships as a static site, and is designed to be edited by chatting with an AI
coding agent — [Claude Code](https://claude.com/claude-code) or
[Codex](https://openai.com/codex) — by people who aren't full-time software
engineers.

What you get out of the box:

- A landing page (`src/pages/index.astro`) and an about page (`src/pages/about.astro`)
- A custom 404 page
- Light / dark / system theme toggle
- [Lucide](https://lucide.dev/icons) icons via [astro-icon](https://github.com/natemoo-re/astro-icon)
- Sensible meta tags, sitemap, and a dynamic robots.txt
- An internal broken-link checker that fails the build if you ship a typo'd link
- GitHub Actions workflows to type-check on every push and deploy to GitHub Pages on `master`
- Agent context in `CLAUDE.md` (and `AGENTS.md`, which symlinks to it) so both
  Claude Code and Codex understand the repo on first run

## Quick start

The whole point of this template is that you don't need to memorise any of
the steps below — the live homepage on your local copy walks you through
them, and your AI agent will do the actual work. The summary:

1. **Click "Use this template" → Create a new repository** on the GitHub repo
   page (or hit the direct link at `<repo>/generate`). This gives you a fresh
   repo under your account with a clean history — not a fork.
2. **Install Claude Code or Codex** — pick whichever you prefer; both read the
   instructions in this repo.
3. **Open the project folder in the agent** and tell it about yourself.
4. **Push to GitHub** and turn on GitHub Pages — your site is live.

If you'd rather see the full friendly walkthrough, clone the repo, run
`pnpm install && pnpm run dev`, and open <http://localhost:4321>. The
default homepage is the walkthrough.

## Commands

```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server at localhost:4321
pnpm run build        # Build production site to ./dist/
pnpm run preview      # Preview production build locally
pnpm run test         # Run astro check (type + content-schema checking)
```

Set `CHECK_EXTERNAL_LINKS=true` before `pnpm run build` to also validate that
external links resolve.

## Project layout

```
src/
  pages/        # One .astro (or .ts) file per route. /, /about/, /404, /robots.txt.
  layouts/      # <Layout> wraps every page with <head>, theme bootstrap, etc.
  components/   # Nav, Footer, DarkModeToggle. Add more here.
  global.css    # The full design system — colours, buttons, cards, shadows.
public/         # Static assets served verbatim (favicon, manifest, /og-image.png if you add one).
astro.config.ts # Site URL, integrations, build options.
CLAUDE.md       # Agent context. AGENTS.md symlinks to it so Codex finds it too.
```

## Design language

The look is intentionally simple: flat panels with a 4px offset shadow,
thin borders, and a single accent colour. There's a small set of utilities
in `global.css` — `.btn`, `.card`, `.tag`, `.shadow-flat*`, `.link-accent`,
`.popup` — that you can mix with Tailwind classes. Change the OKLCH values
under `:root` and `:root.dark` to recolour the whole site at once.

## License

MIT. Fork it, change it, share it — no attribution needed.
