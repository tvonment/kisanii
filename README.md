# KISANII

Static artist website for Swiss singer-songwriter **Kisanii** — [kisanii.ch](https://kisanii.ch)

Built with **Astro 5**, **Tailwind CSS v4**, and **TypeScript**. Deployed to GitHub Pages via GitHub Actions.

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [Astro 5](https://astro.build) | Static site generator |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling (CSS-only config, no `tailwind.config.js`) |
| TypeScript | Type safety |
| GitHub Actions | CI + deployment |
| GitHub Pages | Hosting |
| Plausible | Privacy-friendly analytics (no cookies) |
| Mailchimp | Newsletter signup |

---

## Local development

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:4321/
npm run dev

# Type-check (Astro + TypeScript)
npm run check

# Lint (ESLint, zero warnings allowed)
npm run lint

# Format code
npm run format

# Format check (used in CI)
npm run format:check

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Project structure

```
src/
├── components/         # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── NewsCard.astro
│   ├── ConcertRow.astro
│   ├── SectionHeading.astro
│   └── VideoPlayer.astro
├── content/
│   ├── newsDE/         # German news markdown files
│   ├── newsEN/         # English news markdown files
│   └── config.ts       # Content collection schemas
├── data/
│   └── concerts.ts     # Concert data (TypeScript array)
├── i18n/
│   └── ui.ts           # All bilingual UI strings + helpers
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro     # German homepage (default)
│   ├── epk.astro       # EPK — noindex, not linked in nav
│   ├── news/[slug].astro
│   ├── 404.astro
│   └── en/             # English mirror of all pages
└── styles/
    └── global.css      # Tailwind v4 @theme tokens + utility classes

public/
├── video/
│   ├── epk.mp4         # Encoded EPK video (H.264)
│   ├── epk.webm        # Encoded EPK video (VP9)
│   └── epk.en.vtt      # English subtitles for EPK video
├── favicon.svg
└── robots.txt

scripts/
└── encode-video.sh     # ffmpeg recipe: MOV → MP4 + WebM

video/                  # Raw source video (gitignored)
```

---

## Languages

- **German** is the default language — routes at `/`
- **English** is at `/en/`
- All UI strings live in `src/i18n/ui.ts` — always update both `de` and `en` keys together

---

## Adding content

### News article

1. Create `src/content/newsDE/<slug>.md`:

```yaml
---
title: Titel des Artikels
date: 2025-06-01
summary: Kurze Zusammenfassung (wird auf der Karte angezeigt).
externalUrl: https://... # optional
---

Langer Text hier...
```

2. Create matching `src/content/newsEN/<slug>.md` with the same slug and English content.

### Concert

Edit `src/data/concerts.ts` and add an entry:

```ts
{
  title: 'Konzertname',
  date: '2025-09-15',       // YYYY-MM-DD string
  venue: 'Venue Name',
  city: 'Zurich',
  status: 'upcoming',       // or 'past'
  ticketUrl: 'https://...'  // optional
}
```

---

## EPK video

The raw source `video/Kisanii EPK final.mov` is gitignored.

To re-encode from source:

```bash
bash scripts/encode-video.sh
```

Outputs `public/video/epk.mp4` (H.264) and `public/video/epk.webm` (VP9).
Target: ≤ 25 MB per file (GitHub Pages limit).

To add/update English subtitles, edit `public/video/epk.en.vtt`.

---

## Deployment

Pushing to `main` automatically triggers the deploy workflow (`.github/workflows/deploy.yml`).

**Required GitHub setup (one-time):**
1. Settings → Pages → Build and deployment → Source → **GitHub Actions**

**To switch from `tvonment.github.io/kisanii` to the custom domain `kisanii.ch`:**
1. In `astro.config.mjs`: set `site: 'https://kisanii.ch'` and remove `base: '/kisanii'`
2. Rename `public/CNAME.disabled` → `public/CNAME`
3. Configure DNS: point `kisanii.ch` to GitHub Pages IPs (`185.199.108-111.153`)

---

## Design system

All design tokens are in `src/styles/global.css` under `@theme {}`. No `tailwind.config.js`.

| Token | Value | Use |
|-------|-------|-----|
| `--color-accent` | `#ea6632` | Primary accent / CTAs |
| `--color-bg` | `#0e0b0b` | Page background |
| `--color-surface` | `#1c1212` | Card / section background |
| `--color-fg` | `#f3ece7` | Body text |
| `--color-fg-muted` | `#9e7f7a` | Secondary text |

Utility classes: `.site-container`, `.section-gap`, `.card`, `.btn`, `.btn-accent`, `.btn-outline`
