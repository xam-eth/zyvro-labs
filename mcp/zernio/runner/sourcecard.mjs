#!/usr/bin/env node
/**
 * sourcecard.mjs — sandbox-side source capture for news posts (16:9).
 *
 * House doctrine: news posts carry a visual of the SOURCE. The agent sandbox
 * cannot open arbitrary news domains in a browser, so the pipeline is:
 *   1. the article text is fetched (fetch_page / search snapshots),
 *   2. a faithful SOURCE CAPTURE card is rendered in the house visual language
 *      (outlet, headline, date, verbatim quotes, URL),
 *   3. @sparticuz/chromium in THIS sandbox screenshots it at 1280x720,
 *   4. the JPEG is committed so the owner pulls media-ready posts.
 *
 *   node mcp/zernio/runner/sourcecard.mjs            # render every entry in
 *                                                    # content/source-cards.json
 *
 * Nothing here ever runs on the owner machine.
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(HERE, '..', '..', '..');
const TOOLS = path.join(HERE, 'tools');
const SPEC = path.join(HERE, '..', 'content', 'source-cards.json');

const req = createRequire(path.join(TOOLS, 'package.json'));
if (!fs.existsSync(path.join(TOOLS, 'node_modules', 'puppeteer-core'))) {
  fs.mkdirSync(TOOLS, { recursive: true });
  if (!fs.existsSync(path.join(TOOLS, 'package.json'))) fs.writeFileSync(path.join(TOOLS, 'package.json'), '{ "private": true }\n');
  console.log('[sourcecard] installing puppeteer-core + @sparticuz/chromium (sandbox side) ...');
  execFileSync('npm', ['install', '--prefix', TOOLS, '--no-audit', '--no-fund', 'puppeteer-core', '@sparticuz/chromium'], { stdio: 'inherit' });
}
const LIB_DIR = path.join(TOOLS, '.cache', 'al2023-lib', 'lib');
if (!fs.existsSync(path.join(LIB_DIR, 'libnss3.so'))) {
  const pkgRoot = path.dirname(req.resolve('@sparticuz/chromium'));
  const br = path.join(pkgRoot, '..', 'bin', 'al2023.tar.br');
  fs.mkdirSync(path.dirname(LIB_DIR), { recursive: true });
  const tar = path.join(TOOLS, '.cache', 'al2023.tar');
  fs.writeFileSync(tar, zlib.brotliDecompressSync(fs.readFileSync(br)));
  execFileSync('tar', ['-xf', tar, '-C', path.dirname(LIB_DIR)]);
  fs.unlinkSync(tar);
}
const puppeteer = req('puppeteer-core');
const chromiumMod = req('@sparticuz/chromium');
const chromium = chromiumMod.default ?? chromiumMod;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function cardHtml(c) {
  const quotes = (c.quotes ?? []).map((q) => `<div class="q">&ldquo;${esc(q)}&rdquo;</div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1280px; height:720px; background:#05080c; overflow:hidden; }
  body { font-family:'DejaVu Sans Mono',monospace; color:#e8ffe0; padding:56px 64px; display:flex; flex-direction:column; }
  .bar { display:flex; justify-content:space-between; color:#D7FF3F; font-size:20px; letter-spacing:2px; border-bottom:2px solid #D7FF3F; padding-bottom:14px; }
  .bar .r { color:#ffb020; }
  h1 { color:#D7FF3F; font-size:40px; line-height:1.15; letter-spacing:1px; margin:34px 0 10px; text-transform:uppercase; }
  .meta { color:#8aa08a; font-size:19px; letter-spacing:1px; margin-bottom:26px; }
  .q { color:#e8ffe0; font-size:23px; line-height:1.45; margin-bottom:20px; padding-left:22px; border-left:3px solid #D7FF3F; }
  .foot { margin-top:auto; display:flex; justify-content:space-between; color:#ffb020; font-size:17px; letter-spacing:1px; border-top:1px solid #243024; padding-top:14px; }
  </style></head><body>
  <div class="bar"><span>SOURCE CAPTURE // ${esc(c.outlet)}</span><span class="r">${esc(c.date)}</span></div>
  <h1>${esc(c.title)}</h1>
  <div class="meta">verbatim from ${esc(c.url)}</div>
  ${quotes}
  <div class="foot"><span>${esc(c.url)}</span><span>ZYVRO LABS SANDBOX // SPARTICUZ CHROMIUM // 16:9</span></div>
  </body></html>`;
}

const cards = JSON.parse(fs.readFileSync(SPEC, 'utf8'));
const browser = await puppeteer.launch({
  executablePath: await chromium.executablePath(),
  args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
  headless: true,
  protocolTimeout: 300000,
  defaultViewport: { width: 1280, height: 720 },
  env: { ...process.env, LD_LIBRARY_PATH: [LIB_DIR, process.env.LD_LIBRARY_PATH].filter(Boolean).join(':') }
});
for (const c of cards) {
  const htmlPath = path.join(TOOLS, '.cache', `card-${c.file.replace(/\W+/g, '-')}.html`);
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, cardHtml(c));
  const out = path.join(REPO_ROOT, 'public', c.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: out, type: 'jpeg', quality: 90 });
  await page.close();
  console.log(`[sourcecard] ${c.outlet} -> ${path.relative(REPO_ROOT, out)} (${fs.statSync(out).size} bytes)`);
}
await browser.close();
console.log('[sourcecard] done.');
