# Kisanii Website – Copilot Instructions

## Project overview
Static artist website for Swiss singer-songwriter **Kisanii** (kisanii.ch).
Built with **Astro 5**, **Tailwind CSS v4**, TypeScript.
Deployed on **GitHub Pages** via `main` branch push.

## Language
- German is the default language (routes at `/`)
- English is at `/en/`
- All UI strings live in `src/i18n/ui.ts` — always update both `de` and `en` keys together

## File map
| Path | Purpose |
|------|---------|
| `src/i18n/ui.ts` | All bilingual UI strings + helper functions |
| `src/data/concerts.ts` | Concert data (TypeScript array, no CMS) |
| `src/content/newsDE/` | German news markdown files |
| `src/content/newsEN/` | English news markdown files |
| `src/content/config.ts` | Content collection schemas |
| `src/styles/global.css` | Tailwind v4 `@theme` tokens + base styles |
| `src/layouts/BaseLayout.astro` | HTML shell, meta tags, Header + Footer |
| `src/components/` | Reusable Astro components |
| `src/pages/index.astro` | German homepage |
| `src/pages/en/index.astro` | English homepage |
| `src/pages/epk.astro` | EPK (noindex, bookers only) |
| `src/pages/en/epk.astro` | EPK English |
| `public/video/` | Compressed video files (NOT the raw MOV) |
| `scripts/encode-video.sh` | ffmpeg recipe for video compression |

## Content schemas

### News markdown frontmatter
```yaml
---
title: string         # required
date: YYYY-MM-DD      # required
summary: string       # required — shown on news cards
externalUrl: url      # optional — links to external media
---
```

### Concert entry (src/data/concerts.ts)
```ts
{
  title: string;
  date: Date;           // new Date('YYYY-MM-DD')
  venue: string;
  city: string;
  status: 'upcoming' | 'past';
  ticketUrl?: string;
}
```

## Design system
- Tailwind v4 — config is CSS-only (`@theme` in `global.css`), **no `tailwind.config.js`**
- Accent colour: `var(--color-accent)` = `#ea6632`
- Background: `var(--color-bg)` = `#0e0b0b`
- Use utility classes `.site-container`, `.section-gap`, `.btn`, `.btn-accent`, `.btn-outline`, `.card`

## Adding a news item
1. Create `src/content/newsDE/<slug>.md` with frontmatter above
2. Create matching `src/content/newsEN/<slug>.md` with English translation
3. Use the same `<slug>` for both files

## Adding a concert
Edit `src/data/concerts.ts` and add an entry to the `concerts` array.
Set `status: 'upcoming'` for future dates, `status: 'past'` for past ones.

## Video
The raw source is at `video/Kisanii EPK final.mov` (gitignored).
Run `bash scripts/encode-video.sh` to produce `public/video/epk.mp4` and `public/video/epk.webm`.
Target file size: ≤ 25 MB per file (GitHub Pages limit).

## Conventions
- Always run `npm run check && npm run lint` before committing
- Component props use TypeScript `interface Props { ... }`
- No `tailwind.config.js` — Tailwind v4 is configured via CSS only
- i18n: never hardcode DE/EN strings in components — use `t(lang, key)` from `src/i18n/ui.ts`
