// One-day news image entry (Node 22, standard library only).
//
// The entry is the image beside this file: a newspaper front page summing up
// the world's news of Thursday 19 November 2026. The program's only job is
// to copy that image to /output/entry.png, the single file the grader and
// the judge read. The image is drawn at build time (an HTML page rendered
// to PNG), never at run time, so the program needs no network and no tools.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('./entry.png', import.meta.url));
if (!existsSync(source)) {
  throw new Error(`entry.png not found beside main.ts: ${source}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const out = join(outDir, 'entry.png');
copyFileSync(source, out);
console.log(`wrote ${out} (${statSync(out).size} bytes)`);
