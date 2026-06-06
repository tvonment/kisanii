/**
 * Process raw camera images into web-optimised JPEGs.
 *
 * Input:    images-raw/<Category>/filename.jpg        (gitignored)
 * Web out:  src/assets/images/<category>/name.jpg     1800px q85 — Astro <Image />
 * Press out: public/press/name.jpg                    2400px q92 — downloadable hi-res
 *
 * Usage: node scripts/process-images.js
 */
import { readdir, mkdir } from 'node:fs/promises';
import { join, extname, basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR  = join(__dirname, '..', 'images-raw');
const OUTPUT_DIR = join(__dirname, '..', 'src', 'assets', 'images');
const PRESS_DIR  = join(__dirname, '..', 'public', 'press');

const WEB_WIDTH    = 1800;
const WEB_QUALITY  = 85;
const PRESS_WIDTH  = 2400;
const PRESS_QUALITY = 92;

/**
 * Explicit name overrides for pressefotos — maps original basename → output name.
 * Add entries here whenever a press photo is replaced or renamed.
 */
const PRESS_NAME_MAP = {
  '_NDB1783 Kopie': 'kisanii-portrait-1',
  '_NDB1913 Kopie': 'kisanii-portrait-moon',
  'Zuschnitt Kopie': 'kisanii-portrait-crop',
};

/** Lowercase, strip ©name, replace non-alphanumeric with hyphens. */
function sanitize(name) {
  return name
    .toLowerCase()
    .replace(/©[a-z]+/g, '')      // remove ©holdername but keep trailing numbers
    .replace(/[^a-z0-9-]/g, '-') // special chars → hyphen
    .replace(/-+/g, '-')          // collapse repeated hyphens
    .replace(/^-|-$/g, '');       // trim edges
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue; // skip .DS_Store etc.
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (['.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const files = await walk(INPUT_DIR);
console.log(`Found ${files.length} image(s)\n`);

let ok = 0;
let fail = 0;

for (const src of files) {
  const rel      = relative(INPUT_DIR, src);
  const parts    = rel.split('/');
  const category = sanitize(parts.length > 1 ? parts[0] : 'misc');
  const rawBase  = basename(src, extname(src));
  const isPress  = category === 'pressefotos';

  // Use explicit name map for press photos, auto-sanitize everything else
  const webName = (isPress && PRESS_NAME_MAP[rawBase])
    ? PRESS_NAME_MAP[rawBase] + '.jpg'
    : sanitize(rawBase) + '.jpg';

  // ── Web version (src/assets/images/) ────────────────────────────────────
  const webDir  = join(OUTPUT_DIR, category);
  await mkdir(webDir, { recursive: true });
  const webDest = join(webDir, webName);

  try {
    await sharp(src)
      .resize({ width: WEB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: WEB_QUALITY })
      .toFile(webDest);
    console.log(`  ✓  web   ${rel}  →  ${category}/${webName}`);
    ok++;
  } catch (err) {
    console.error(`  ✗  web   ${rel}: ${err.message}`);
    fail++;
  }

  // ── Press hi-res version (public/press/) — pressefotos only ─────────────
  if (isPress) {
    await mkdir(PRESS_DIR, { recursive: true });
    const pressDest = join(PRESS_DIR, webName);
    try {
      await sharp(src)
        .resize({ width: PRESS_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: PRESS_QUALITY })
        .toFile(pressDest);
      console.log(`  ✓  press ${rel}  →  press/${webName}`);
      ok++;
    } catch (err) {
      console.error(`  ✗  press ${rel}: ${err.message}`);
      fail++;
    }
  }
}

console.log(`\nDone — ${ok} processed, ${fail} failed.`);
console.log(`Web:   src/assets/images/`);
console.log(`Press: public/press/`);
