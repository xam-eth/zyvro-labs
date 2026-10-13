#!/usr/bin/env node
/**
 * validate-blog.mjs
 * Validates every article in content/blog/ against the front-matter contract.
 * Exits non-zero with a message naming the file and the field on failure.
 * Run first in the build script: node scripts/validate-blog.mjs
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = resolve(__dirname, '../content/blog');

const VALID_STATUSES = ['draft', 'review', 'published'];
const VALID_TYPES = ['milestone', 'devlog', 'case-study', 'essay'];
const VALID_HERO_KINDS = ['key-art', 'gameplay', 'code', 'chart', 'ui'];

function fail(file, field, msg) {
  console.error(`FAIL: ${file} — ${field}: ${msg}`);
  process.exitCode = 1;
}

/** Minimal YAML front-matter parser (no dependency needed) */
function parseFrontMatter(src) {
  const match = src.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content: src.slice(src.indexOf('---', 4) + 4).trim() };
  const yaml = match[1];
  const data = {};
  let currentKey = null;
  let inArray = false;
  let arrayItems = [];

  for (const line of yaml.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Simple key: value
    const kvMatch = trimmed.match(/^(\w[\w-]*):\s*(.*)/);
    if (kvMatch && !inArray) {
      const [, key, value] = kvMatch;
      if (value === '' || value === undefined) {
        // Could be start of array or nested
        currentKey = key;
        inArray = false;
        continue;
      }
      data[key] = value.replace(/^["']|["']$/g, '');
      currentKey = key;
      continue;
    }

    // Array item
    if (trimmed.startsWith('- ')) {
      if (!inArray) {
        inArray = true;
        arrayItems = [];
      }
      arrayItems.push(trimmed.slice(2).replace(/^["']|["']$/g, ''));
      continue;
    }

    // End of array
    if (inArray && !trimmed.startsWith('- ')) {
      if (currentKey) data[currentKey] = arrayItems;
      inArray = false;
      arrayItems = [];
      // Re-parse current line
      const kv2 = trimmed.match(/^(\w[\w-]*):\s*(.*)/);
      if (kv2) {
        data[kv2[1]] = kv2[2].replace(/^["']|["']$/g, '');
        currentKey = kv2[1];
      }
    }
  }
  if (inArray && currentKey) data[currentKey] = arrayItems;

  const contentStart = src.indexOf('---', 4);
  const content = contentStart >= 0 ? src.slice(contentStart + 4).trim() : '';
  return { data, content };
}

function wordCount(text) {
  return text.replace(/[#*_`\[\]()]/g, '').split(/\s+/).filter(Boolean).length;
}

// Main
if (!existsSync(BLOG_DIR)) {
  console.log('No content/blog/ directory found. Skipping validation.');
  process.exit(0);
}

const entries = readdirSync(BLOG_DIR).filter(f => {
  const fp = resolve(BLOG_DIR, f);
  return statSync(fp).isDirectory();
});

if (entries.length === 0) {
  console.log('No articles in content/blog/. Validation passed (empty).');
  process.exit(0);
}

let articleCount = 0;
const slugsSeen = new Set();

for (const slug of entries) {
  const articlePath = resolve(BLOG_DIR, slug, 'index.md');
  if (!existsSync(articlePath)) {
    fail(slug, 'index.md', `Missing index.md in content/blog/${slug}/`);
    continue;
  }

  articleCount++;
  const src = readFileSync(articlePath, 'utf-8');
  const { data, content } = parseFrontMatter(src);
  const file = `content/blog/${slug}/index.md`;

  // Slug must match folder name
  if (data.slug && data.slug !== slug) {
    fail(file, 'slug', `Front-matter slug "${data.slug}" does not match folder name "${slug}"`);
  }
  if (slugsSeen.has(slug)) {
    fail(file, 'slug', `Duplicate slug "${slug}"`);
  }
  slugsSeen.add(slug);

  // Required fields
  const required = ['title', 'status'];
  for (const field of required) {
    if (!data[field]) fail(file, field, 'Missing required field');
  }

  // Title length
  if (data.title && data.title.length > 70) {
    fail(file, 'title', `Title is ${data.title.length} chars (max 70)`);
  }

  // seoTitle length
  if (data.seoTitle && data.seoTitle.length > 60) {
    fail(file, 'seoTitle', `seoTitle is ${data.seoTitle.length} chars (max 60)`);
  }

  // Description length
  if (data.description && data.description.length > 155) {
    fail(file, 'description', `Description is ${data.description.length} chars (max 155)`);
  }

  // Status
  if (data.status && !VALID_STATUSES.includes(data.status)) {
    fail(file, 'status', `Invalid status "${data.status}". Must be: ${VALID_STATUSES.join(', ')}`);
  }

  // Published must have date
  if (data.status === 'published' && !data.date) {
    fail(file, 'date', 'Published article must have a date');
  }

  // Type
  if (data.type && !VALID_TYPES.includes(data.type)) {
    fail(file, 'type', `Invalid type "${data.type}". Must be: ${VALID_TYPES.join(', ')}`);
  }

  // Hypothesis required for milestone and case-study
  if ((data.type === 'milestone' || data.type === 'case-study') && !data.hypothesis) {
    fail(file, 'hypothesis', `Required for type "${data.type}"`);
  }

  // Sources required for milestone and case-study
  if ((data.type === 'milestone' || data.type === 'case-study') && !data.sources) {
    fail(file, 'sources', `Required for type "${data.type}"`);
  }

  // Tags
  if (data.tags) {
    const tags = Array.isArray(data.tags) ? data.tags : [data.tags];
    if (tags.length < 1 || tags.length > 5) {
      fail(file, 'tags', `Must have 1-5 tags (found ${tags.length})`);
    }
  }

  // Hero image alt text
  if (data.heroImage && typeof data.heroImage === 'string') {
    // Simple check: if heroImage is specified, it should have alt
    // (Full object parsing would need more sophisticated YAML)
  }
}

console.log(`Validated ${articleCount} article(s). ${process.exitCode ? 'ERRORS FOUND.' : 'All OK.'}`);
process.exit(process.exitCode || 0);