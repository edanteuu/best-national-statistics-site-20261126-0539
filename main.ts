// AngkaNusa — hand-in program (Node 22, standard library only).
//
// The site lives in app/ beside this file: plain static files a browser opens
// at app/index.html (ES modules, CSS, no build step), with all of its content
// held in its own files, so nothing it runs, styles or shows loads over the
// network. This program hands the site in: it copies app/ and screenshots/
// from beside this file into the output directory and writes
// output/dossier.json, the summary the judge reads (the screenshots, the
// first load's files and bytes, and the source), built with the vendored
// make.fun library in vendor/makefun-frontend.ts. Leave that vendored file
// exactly as the kit shipped it: the scorer rebuilds the dossier with its
// own copy and requires the two to match byte for byte.
//
// Run it outside the grader's container with MAKEFUN_OUTPUT_DIR standing in
// for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Serve the site locally for a look with `node serve.ts`, then open
// http://localhost:8080.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The directory this file sits in, and the directory the entry goes to.
const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The caps the sealed scorer enforces (from the kit's reference/gate.json):
// at most 4 screenshots, each at most 256 KiB; app/ at most 993 files and
// directories and 16 MiB in all; the whole of /output at most 1000 entries
// and 64 MiB, which app/, screenshots/ and dossier.json share — so the
// dossier is refused outright if app/ or screenshots/ is already past
// its limits, and only the text cap shapes the bytes it writes.
const dossierOptions = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

writeFileSync(join(outputDir, 'dossier.json'), buildDossier(outputDir, dossierOptions));
