#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 * Reads the route table and GAME_PROJECTS from constants, writes public/sitemap.xml.
 * Run from the build script before `vite build`.
 */

import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://zyvrolabs.com';

// Static indexable routes (no NotFound, no game detail which is modal-only)
const staticRoutes = [
  '/',
  '/games',
  '/games/lab',
  '/games/archive',
  '/about',
  '/contact',
];

// Extract slugs from constants.ts
const constantsPath = resolve(__dirname, '../src/utils/constants.ts');
const constantsSrc = readFileSync(constantsPath, 'utf-8');
const slugRegex = /slug:\s*"([^"]+)"/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(constantsSrc)) !== null) {
  slugs.push(match[1]);
}

const gameRoutes = slugs.map(slug => `/games/${slug}`);

const allRoutes = [...staticRoutes, ...gameRoutes];

const today = new Date().toISOString().split('T')[0];

const urls = allRoutes.map(path => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`Sitemap generated: ${outPath} (${allRoutes.length} routes)`);