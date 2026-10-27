#!/usr/bin/env node
/**
 * cadence.mjs — the always-in-dev content planner, v2 (strategy-driven).
 *
 * Implements mcp/zernio/CONTENT-STRATEGY.md:
 *  - pillar mix per channel: progress 40 / tech 20 / news 20 / pov 20
 *    (rotation sequence: progress, progress, tech, news, pov)
 *  - platform-differentiated bodies: LinkedIn lesson-first long-form with a
 *    real closing question and NO external links; X owner receipts <=280;
 *    X brand LAB LOG terminal entries
 *  - every draft carries a media plan (game frames / generated plates /
 *    source-article captures) — the push layer refuses media-less posts
 *  - 2-4 posts per day per channel, working days
 *
 *   node mcp/zernio/runner/cadence.mjs --from 2026-11-02 --days 5 --per-day 2
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ZERNIO = path.join(HERE, '..');
const CALENDAR = path.join(ZERNIO, 'content', 'calendar.json');
const SOURCES = path.join(ZERNIO, 'content', 'sources.json');
const CHANNELS = path.join(ZERNIO, 'channels.json');

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); return i === -1 ? d : argv[i + 1]; };
const has = (n) => argv.includes(n);
const fromArg = flag('--from', '');
const days = Number(flag('--days', '10'));
const perDay = Math.min(4, Math.max(1, Number(flag('--per-day', '2'))));
const weekends = has('--weekends');

const SLOT_HOURS = [1, 13, 7, 17];
const CHANNEL_OFFSET = { 'linkedin-private': 0, 'x-owner-private': 1, 'x-zyvrolabs': 2 };
const PILLAR_SEQ = ['progress', 'progress', 'tech', 'news', 'pov']; // 40/20/20/20
const SRC_NOTE = 'Source capture attached; the article lives at its own URL — we quote numbers, we do not chase clicks.';
const LEDGER = {
  progress: 'LEDGER: Android packaging, physical touch and mobile frame time stay UNVERIFIED this week — same font, same weight as the wins.',
  tech: 'LEDGER: device-side numbers for the ceiling renderer stay UNVERIFIED — same font, same weight as the wins.',
  news: 'LEDGER: nothing beyond what we quoted; their benchmarks are theirs, ours are ours, and ours are attached.',
  pov: 'LEDGER: the engagement delta itself stays a measurement, not a promise — we publish the list either way.'
};

const cal = JSON.parse(fs.readFileSync(CALENDAR, 'utf8'));
const sources = JSON.parse(fs.readFileSync(SOURCES, 'utf8'));
const channels = JSON.parse(fs.readFileSync(CHANNELS, 'utf8'));
const channelIds = (Array.isArray(channels) ? channels : channels.channels ?? []).map((c) => c.id);
// newest sources first: an always-in-dev game leads with its latest batch
const byKind = (k) => sources.filter((s) => (s.kind ?? 'progress') === k).sort((a, b) => b.id.localeCompare(a.id));

const start = fromArg ? new Date(`${fromArg}T00:00:00Z`) : new Date(Date.now() + 86400000);
const taken = new Set(cal.drafts.map((d) => `${d.channelId}|${d.publishAt}`));
const counters = new Map(); // channelId -> post index (pillar seq)
const kindCursor = new Map(); // kind -> rotation index
let seq = cal.drafts.filter((d) => d.id.startsWith('c-')).length;

const cut = (s, n) => (s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`);

function pickSource(pillar, chId) {
  const pool = byKind(pillar);
  if (pool.length === 0) return byKind('progress')[0];
  const key = `${pillar}|${chId}`;
  const base = kindCursor.get(key) ?? 0;
  kindCursor.set(key, base + 1);
  // offset by channel so the three channels never ride the same source on the same day
  const i = base + channelIds.indexOf(chId);
  return pool[i % pool.length];
}

function bodyFor(chId, s) {
  const [fA, fB, fC] = s.facts;
  if (chId === 'linkedin-private') {
    if ((s.kind ?? 'progress') === 'news') {
      return `${s.title}\n\n${s.hook}\n\n${fA}\n\n${fB}\n\n${fC}\n\n${s.take}\n\n${SRC_NOTE}\n\n${LEDGER[s.kind ?? 'progress']}\n\n${s.question}`;
    }
    return `${s.title}\n\n${s.hook}\n\n${fA}\n\n${fB}\n\n${fC}\n\n${s.visualNote}\n\n${s.take}\n\n${LEDGER[s.kind ?? 'progress']}\n\n${s.question}`;
  }
  if (chId === 'x-owner-private') {
    if ((s.kind ?? 'progress') === 'news') return cut(`${fA} Our take: ${s.take}`, 280);
    if ((s.kind ?? 'progress') === 'pov') return cut(`${s.take} ${s.question}`, 280);
    return cut(fA, 280);
  }
  // brand terminal voice
  let body = `LAB LOG // ${s.title}\n\n- ${fA}`;
  if (`${body}\n- ${fB}\n\nUNVERIFIED ITEMS LISTED IN THE SAME FONT.`.length <= 280) {
    body = `${body}\n- ${fB}`;
  }
  return `${body}\n\nUNVERIFIED ITEMS LISTED IN THE SAME FONT.`;
}

const added = [];
let dayIdx = 0;
let workingDays = 0;
while (workingDays < days && dayIdx < 400) {
  const day = new Date(start.getTime() + dayIdx * 86400000);
  dayIdx += 1;
  const dow = day.getUTCDay();
  if (!weekends && (dow === 0 || dow === 6)) continue;
  workingDays += 1;

  for (let slot = 0; slot < perDay; slot += 1) {
    for (const chId of channelIds) {
      const hour = (SLOT_HOURS[slot] ?? 1) + (CHANNEL_OFFSET[chId] ?? 0);
      const publishAt = new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), hour, 0, 0)).toISOString();
      if (taken.has(`${chId}|${publishAt}`)) continue;
      taken.add(`${chId}|${publishAt}`);

      const pi = counters.get(chId) ?? 0;
      counters.set(chId, pi + 1);
      const pillar = PILLAR_SEQ[(pi + slot) % PILLAR_SEQ.length];
      const s = pickSource(pillar, chId);
      seq += 1;
      const media = s.media ?? { kind: 'game', refs: s.images ?? [] };
      cal.drafts.push({
        id: `c-${String(seq).padStart(3, '0')}`,
        channelId: chId,
        sourceId: s.id,
        pillar,
        publishAt,
        status: 'DRAFT',
        hook: s.hook,
        body: bodyFor(chId, s),
        thread: [],
        imageRefs: media.refs ?? [],
        media,
        reviewNote: 'Cadence v2 draft; owner review required before push.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      added.push(cal.drafts[cal.drafts.length - 1]);
    }
  }
}

cal.drafts.sort((a, b) => a.publishAt.localeCompare(b.publishAt));
fs.writeFileSync(CALENDAR, JSON.stringify(cal, null, 2) + '\n');
const stats = {};
for (const d of added) {
  stats[d.channelId] = stats[d.channelId] ?? {};
  stats[d.channelId][d.pillar] = (stats[d.channelId][d.pillar] ?? 0) + 1;
}
const over = added.filter((d) => d.channelId !== 'linkedin-private' && d.body.length > 280);
console.log(`[cadence] +${added.length} drafts over ${workingDays} working days from ${added[0]?.publishAt?.slice(0, 10) ?? '-'}`);
for (const [ch, m] of Object.entries(stats)) console.log(`  ${ch}: ${JSON.stringify(m)}`);
console.log(`[cadence] over-280: ${over.length} · calendar total: ${cal.drafts.length}`);
