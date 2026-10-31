#!/usr/bin/env node
/**
 * capture.mjs — source-article screenshots for news posts (16:9).
 *
 * Optional live-page screenshotter (sandbox or CI, when a domain is
 * reachable). News media normally comes from sourcecard.mjs, which renders
 * verbatim SOURCE CAPTURE cards in the sandbox and needs no network:
 *
 *   npm run zernio:capture -- --all              # every pending source in the calendar
 *   npm run zernio:capture -- <url> --as sources/x.jpg
 *
 * Uses @sparticuz/chromium + puppeteer-core installed on demand into
 * mcp/zernio/runner/tools (gitignored). Viewport 1280x720 = 16:9, JPEG q90,
 * saved under public/assets/media/sources/.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { execSync, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(HERE, '..', '..', '..');
const TOOLS = path.join(HERE, 'tools');
const CALENDAR = path.join(HERE, '..', 'content', 'calendar.json');

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); return i === -1 ? d : argv[i + 1]; };
const has = (n) => argv.includes(n);

const jobs = [];
if (has('--all')) {
  const cal = JSON.parse(fs.readFileSync(CALENDAR, 'utf8'));
  const seen = new Set();
  for (const d of cal.drafts) {
    const m = d.media;
    if (m?.kind === 'source' && m.captureUrl && !seen.has(m.captureFile)) {
      seen.add(m.captureFile);
      const abs = path.join(REPO_ROOT, 'public', m.captureFile);
      if (!fs.existsSync(abs)) jobs.push({ url: m.captureUrl, out: abs });
    }
  }
} else if (argv[0] && argv[0].startsWith('http')) {
  const as = flag('--as', `sources/capture-${Date.now()}.jpg`);
  const rel = as.startsWith('public/') ? as : `public/assets/media/${as}`;
  jobs.push({ url: argv[0], out: path.join(REPO_ROOT, rel) });
} else {
  console.log('usage: zernio:capture -- --all | zernio:capture -- <url> --as sources/name.jpg');
  process.exit(2);
}

if (jobs.length === 0) { console.log('[capture] nothing pending — every source capture exists.'); process.exit(0); }

const req = createRequire(path.join(TOOLS, 'package.json'));
if (!fs.existsSync(path.join(TOOLS, 'node_modules', 'puppeteer-core'))) {
  fs.mkdirSync(TOOLS, { recursive: true });
  if (!fs.existsSync(path.join(TOOLS, 'package.json'))) fs.writeFileSync(path.join(TOOLS, 'package.json'), '{ "private": true }\n');
  console.log('[capture] installing puppeteer-core + @sparticuz/chromium into mcp/zernio/runner/tools ...');
  execSync(`npm install --prefix ${TOOLS} --no-audit --no-fund puppeteer-core @sparticuz/chromium`, { stdio: 'inherit' });
}
// Shared libs for the headless build (same trick as the game repo's QA harness):
// @sparticuz/chromium ships bin/al2023.tar.br; extract once into tools/.cache and
// feed it through LD_LIBRARY_PATH on any Linux, not just Amazon Linux 2023.
const LIB_DIR = path.join(TOOLS, '.cache', 'al2023-lib', 'lib');
if (!fs.existsSync(path.join(LIB_DIR, 'libnss3.so'))) {
  const pkgRoot = path.dirname(req.resolve('@sparticuz/chromium'));
  const br = path.join(pkgRoot, '..', 'bin', 'al2023.tar.br');
  fs.mkdirSync(path.dirname(LIB_DIR), { recursive: true });
  const tar = path.join(TOOLS, '.cache', 'al2023.tar');
  fs.writeFileSync(tar, zlib.brotliDecompressSync(fs.readFileSync(br)));
  execFileSync('tar', ['-xf', tar, '-C', path.dirname(LIB_DIR)]);
  fs.unlinkSync(tar);
  console.log('[capture] extracted shared libs into mcp/zernio/runner/tools/.cache');
}

const puppeteer = req('puppeteer-core');
const chromiumMod = req('@sparticuz/chromium');
const chromium = chromiumMod.default ?? chromiumMod;

const browser = await puppeteer.launch({
  args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
  executablePath: await chromium.executablePath(),
  headless: true,
  protocolTimeout: 300000,
  defaultViewport: { width: 1280, height: 720 },
  env: { ...process.env, LD_LIBRARY_PATH: [LIB_DIR, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') }
});
let failed = 0;
for (const j of jobs) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(j.url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1500));
    fs.mkdirSync(path.dirname(j.out), { recursive: true });
    await page.screenshot({ path: j.out, type: 'jpeg', quality: 90 });
    console.log(`[capture] ${j.url}\n          -> ${path.relative(REPO_ROOT, j.out)} (${fs.statSync(j.out).size} bytes)`);
  } catch (err) {
    failed += 1;
    console.log(`[capture] FAILED ${j.url}: ${err.message}`);
  }
  await page.close();
}
await browser.close();
console.log(failed ? `[capture] done with ${failed} failure(s).` : '[capture] done. Pending posts can now push with their source media.');
process.exit(failed ? 1 : 0);
