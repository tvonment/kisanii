/**
 * Process raw camera images into web-optimised JPEGs.
 *
 * Input:  images-raw/<Category>/filename.jpg  (gitignored)
 * Output: src/assets/images/<category>/sanitised-name.jpg
 *
 * Usage: node scripts/process-images.js
 */
import { readdir, mkdir } from 'node:fs/promises';
import { join, extname, basename, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, '..', 'images-raw');
const OUTPUT_DIR = join(__dirname, '..', 'src', 'assets', 'images');
const MAX_WIDTH = 1800;
const JPEG_QUALITY = 85;

/** Lowercase, strip ©, replace non-alphanumeric with hyphens. */
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
console.log(`Found ${files.length} image(s) in images-raw/ → src/assets/images/\n`);

let ok = 0;
let fail = 0;

for (const src of files) {
  const rel = relative(INPUT_DIR, src);
  const parts = rel.split('/');
  const category = sanitize(parts.length > 1 ? parts[0] : 'misc');
  const name = sanitize(basename(src, extname(src))) + '.jpg';

  const outDir = join(OUTPUT_DIR, category);
  await mkdir(outDir, { recursive: true });
  const dest = join(outDir, name);

  try {
    await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY })
      .toFile(dest);
    console.log(`  ✓  ${rel}  →  ${category}/${name}`);
    ok++;
  } catch (err) {
    console.error(`  ✗  ${rel}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone — ${ok} processed, ${fail} failed.`);
console.log(`Output: src/assets/images/`);
