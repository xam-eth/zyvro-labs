#!/usr/bin/env node
/**
 * zernio runner — the semi-automatic bridge between the repo draft calendar
 * and the owner's Zernio account.
 *
 *   node mcp/zernio/runner/zernio.mjs <command> [flags]
 *
 * Commands
 *   accounts   list connected Zernio accounts and the channel mapping
 *   connect    open the Zernio OAuth url for every channel that has no account
 *              yet (this is the browser "approve" step; Zernio handles callback)
 *   push       interactive: review each DRAFT/NEEDS_REVIEW draft, approve with
 *              y, then it is sent to Zernio scheduled at its publishAt time
 *   status     show the scheduled queue on Zernio for our profile
 *   sync       pull post states from Zernio; mark local drafts PUBLISHED
 *
 * Flags
 *   --week 2026-W44   only drafts of that ISO week (push)
 *   --dry-run         print the exact POST /v1/posts payloads, send nothing
 *   --auto            approve everything without prompting (CI/dry runs only)
 *   --update          instead of new posts, re-send (PUT) already scheduled
 *                     posts that have a zernioPostId — used to attach media or
 *                     refreshed copy to posts already sitting in Zernio
 *
 * Secrets: mcp/zernio/.env (gitignored). Nothing here is ever committed.
 * The runner holds no draft content of its own; the calendar in
 * mcp/zernio/content/calendar.json is the single source of truth.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const HERE = dirname(fileURLToPath(import.meta.url));
const ZERNIO_DIR = join(HERE, '..');
const REPO_ROOT = join(HERE, '..', '..', '..'); // runner -> mcp/zernio -> mcp -> repo root
const ENV_FILE = join(ZERNIO_DIR, '.env');
const MAPPING_FILE = join(ZERNIO_DIR, '.zernio-mapping.json');
const CALENDAR = join(ZERNIO_DIR, 'content', 'calendar.json');
const API = 'https://zernio.com/api/v1';

const CHANNEL_PLATFORM = {
  'linkedin-private': 'linkedin',
  'x-owner-private': 'twitter',
  'x-zyvrolabs': 'twitter'
};
const CHANNEL_ENV = {
  'linkedin-private': 'ZERNIO_CHANNEL_LINKEDIN_OWNER',
  'x-owner-private': 'ZERNIO_CHANNEL_X_OWNER',
  'x-zyvrolabs': 'ZERNIO_CHANNEL_X_ZYVROLABS'
};

function loadEnv() {
  const env = { ...process.env };
  if (existsSync(ENV_FILE)) {
    for (const line of readFileSync(ENV_FILE, 'utf-8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

const env = loadEnv();
const ARGS = process.argv.slice(2);
const command = ARGS[0];
const flag = (name) => ARGS.includes(`--${name}`);
const opt = (name) => {
  const i = ARGS.indexOf(`--${name}`);
  return i >= 0 ? ARGS[i + 1] : undefined;
};

function readJson(path, fallback) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return fallback;
  }
}

function saveCalendar(cal) {
  writeFileSync(CALENDAR, JSON.stringify(cal, null, 2) + '\n', 'utf-8');
}

function isoWeekLabel(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

async function api(path, options = {}) {
  const key = env.ZERNIO_API_KEY;
  if (!key) {
    console.error(`[zernio] no API key. Put ZERNIO_API_KEY into mcp/zernio/.env
(create one at https://zernio.com/dashboard/api-keys with read+write).
The key never leaves this machine; it is gitignored and never committed.`);
    process.exit(2);
  }
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(options.headers ?? {}) }
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error(`[zernio] ${options.method ?? 'GET'} ${path} -> ${res.status}`, JSON.stringify(body).slice(0, 400));
    process.exit(3);
  }
  return body;
}

async function profileId() {
  if (env.ZERNIO_PROFILE_ID) return env.ZERNIO_PROFILE_ID;
  const { profiles } = await api('/profiles');
  const def = profiles.find((p) => p.isDefault) ?? profiles[0];
  if (!def) {
    console.error('[zernio] no profile on this Zernio account; create one in the dashboard first.');
    process.exit(4);
  }
  return def._id;
}

function mappingFromEnv() {
  const saved = readJson(MAPPING_FILE, {});
  const map = {};
  for (const [channel, envName] of Object.entries(CHANNEL_ENV)) {
    map[channel] = env[envName] || saved[channel] || null;
  }
  return map;
}

async function resolveMapping(accounts) {
  const map = mappingFromEnv();
  const missing = Object.entries(map).filter(([, id]) => !id);
  if (missing.length === 0) return map;
  const byPlatform = {};
  for (const acc of accounts) (byPlatform[acc.platform] ??= []).push(acc);
  if (process.stdin.isTTY && !flag('auto')) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q) => new Promise((res) => rl.question(q, res));
    for (const [channel] of missing) {
      const platform = CHANNEL_PLATFORM[channel];
      const options = byPlatform[platform] ?? [];
      if (options.length === 0) {
        console.log(`[zernio] channel ${channel}: no ${platform} account connected yet — run: npm run zernio:connect`);
        continue;
      }
      console.log(`\n[zernio] pick the ${platform} account for channel "${channel}":`);
      options.forEach((acc, i) => console.log(`  ${i + 1}) ${acc.username ?? acc.displayName ?? acc._id} (${acc._id})`));
      const answer = parseInt(await ask('> '), 10);
      if (answer >= 1 && answer <= options.length) map[channel] = options[answer - 1]._id;
    }
    rl.close();
    writeFileSync(MAPPING_FILE, JSON.stringify(map, null, 2) + '\n', 'utf-8');
    console.log(`[zernio] mapping saved to mcp/zernio/.zernio-mapping.json (gitignored)`);
  } else {
    console.log('[zernio] channel account ids missing and no TTY: set ZERNIO_CHANNEL_* in mcp/zernio/.env or run interactively.');
  }
  return map;
}

/**
 * Visual media per post. Preferred path: upload the repo's own frame capture
 * through Zernio's presigned media endpoint so the post carries a hosted
 * publicUrl without needing the site to be deployed. Fallback: SITE_BASE_URL
 * direct link. Dry-run without a key: report what would be uploaded.
 */
async function uploadMedia(ref) {
  const filePath = join(REPO_ROOT, 'public', ref);
  if (!existsSync(filePath)) return null;
  const contentType = ref.endsWith('.png') ? 'image/png' : ref.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg';
  const raw = await api('/media/presign', {
    method: 'POST',
    body: JSON.stringify({ filename: ref.split('/').pop(), contentType })
  });
  const presign = raw?.data ?? raw ?? {};
  const uploadUrl = presign.uploadUrl ?? presign.upload_url ?? presign.url;
  const publicUrl = presign.publicUrl ?? presign.public_url ?? presign.publicURL;
  if (!uploadUrl || !publicUrl) {
    throw new Error(`presign response missing uploadUrl/publicUrl: ${JSON.stringify(raw).slice(0, 300)}`);
  }
  const put = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: readFileSync(filePath)
  });
  if (!put.ok) throw new Error(`media upload PUT failed for ${ref}: HTTP ${put.status}`);
  console.log(`[zernio] uploaded ${ref} -> ${publicUrl}`);
  return publicUrl;
}

async function mediaFor(draft, dry) {
  const plan = draft.media ?? { kind: 'game', refs: draft.imageRefs ?? [] };
  const refs = (plan.refs ?? []).slice(0, 2);
  if (refs.length === 0) {
    if (plan.kind === 'source') {
      throw new Error(`source capture missing for ${plan.captureUrl ?? 'news post'} — run: npm run zernio:capture -- --all`);
    }
    throw new Error(`draft ${draft.id} has no media refs — house rule: every post carries media`);
  }
  for (const ref of refs) {
    const abs = join(REPO_ROOT, 'public', ref);
    if (!existsSync(abs)) {
      throw new Error(`media file missing in repo: public${ref}${plan.kind === 'source' ? ` — agent must re-render the source card (url: ${plan.captureUrl ?? 'n/a'})` : ''}`);
    }
  }
  if (dry) {
    return refs.map((ref) => ({ type: ref.endsWith('.mp4') ? 'video' : 'image', url: `(presign-upload on run) public${ref}` }));
  }
  const items = [];
  for (const ref of refs) {
    try {
      const publicUrl = await uploadMedia(ref);
      if (publicUrl) items.push({ type: ref.endsWith('.mp4') ? 'video' : 'image', url: publicUrl });
    } catch (err) {
      const base = env.SITE_BASE_URL;
      if (base) {
        console.log(`[zernio] media upload failed for ${ref} (${err.message}); falling back to SITE_BASE_URL`);
        items.push({ type: 'image', url: `${base.replace(/\/$/, '')}${ref}` });
      } else {
        console.log(`[zernio] media upload failed for ${ref} (${err.message}); post goes without it`);
      }
    }
  }
  return items;
}

async function payloadFor(draft, accountId, profile, dry) {
  return {
    content: draft.body,
    scheduledFor: draft.publishAt,
    publishNow: false,
    isDraft: false,
    timezone: 'UTC',
    profileId: profile,
    platforms: [{ platform: CHANNEL_PLATFORM[draft.channelId], accountId }],
    mediaItems: await mediaFor(draft, dry),
    tags: ['zyvrolabs', draft.sourceId ?? 'devlog'],
    visibility: 'public'
  };
}

async function cmdAccounts() {
  const profile = await profileId();
  const { accounts } = await api(`/accounts?profileId=${profile}`);
  console.log(`[zernio] profile ${profile}`);
  for (const acc of accounts) {
    console.log(`  ${acc.platform.padEnd(9)} ${acc._id}  ${acc.username ?? acc.displayName ?? ''} ${acc.isActive ? '' : '(inactive)'}`);
  }
  const map = await resolveMapping(accounts);
  console.log('[zernio] channel mapping:');
  for (const [channel, id] of Object.entries(map)) console.log(`  ${channel.padEnd(18)} -> ${id ?? 'NOT CONNECTED'}`);
}

async function cmdConnect() {
  const profile = await profileId();
  const { accounts } = await api(`/accounts?profileId=${profile}`);
  const have = new Set(accounts.filter((a) => a.isActive).map((a) => a.platform));
  for (const [channel, platform] of Object.entries(CHANNEL_PLATFORM)) {
    if (have.has(platform)) {
      console.log(`[zernio] ${channel}: a ${platform} account is already connected`);
      continue;
    }
    const { authUrl } = await api(`/connect/${platform}?profileId=${profile}`);
    console.log(`\n[zernio] ${channel}: open this url and approve in the browser (Zernio handles the callback):`);
    console.log(`  ${authUrl}`);
  }
  console.log('\n[zernio] after approving, run: npm run zernio:accounts');
}

async function cmdPush() {
  const dry = flag('dry-run');
  const auto = flag('auto');
  const week = opt('week');
  const cal = readJson(CALENDAR, { drafts: [] });
  const updating = flag('update');
  let drafts = updating
    ? cal.drafts.filter((d) => d.status === 'SCHEDULED' && d.zernioPostId)
    : cal.drafts.filter((d) => d.status === 'DRAFT' || d.status === 'NEEDS_REVIEW');

  // Refresh fallback: if the local calendar lost its zernioPostIds (fresh clone /
  // hard reset), match pending drafts to scheduled posts that already live in
  // Zernio by source tag or body prefix, then adopt their ids so PUT can update
  // them instead of creating duplicates.
  if (updating && drafts.length === 0) {
    const pending = cal.drafts.filter((d) => d.status === 'DRAFT' || d.status === 'SCHEDULED');
    if (pending.length > 0) {
      const listed = await api(`/posts?profileId=${await profileId()}&status=scheduled&limit=200`);
      const remote = (listed.posts ?? listed.data ?? listed ?? []);
      let adopted = 0;
      for (const d of pending) {
        if (d.zernioPostId) continue;
        const hit = remote.find((r) => {
          const tags = r.tags ?? r.post?.tags ?? [];
          const content = r.content ?? r.post?.content ?? '';
          return tags.includes(d.sourceId) || (content && d.body && content.slice(0, 40) === d.body.slice(0, 40));
        });
        const rid = hit?._id ?? hit?.post?._id;
        if (rid) { d.zernioPostId = rid; d.status = 'SCHEDULED'; adopted += 1; }
      }
      if (adopted > 0) {
        fs.writeFileSync(CALENDAR, JSON.stringify(cal, null, 2) + '\n');
        console.log(`[zernio] adopted ${adopted} scheduled post id(s) from Zernio into the calendar`);
        drafts = cal.drafts.filter((d) => d.status === 'SCHEDULED' && d.zernioPostId);
      } else {
        console.log('[zernio] no matching scheduled posts found in Zernio; nothing to refresh');
      }
    }
  }
  if (week) drafts = drafts.filter((d) => isoWeekLabel(new Date(d.publishAt)) === week);
  drafts.sort((a, b) => a.publishAt.localeCompare(b.publishAt));
  if (drafts.length === 0) {
    console.log('[zernio] nothing waiting for review.');
    return;
  }
  const profile = dry && !env.ZERNIO_API_KEY ? 'PROFILE_ID (dry-run)' : await profileId();
  const accounts = dry && !env.ZERNIO_API_KEY ? { accounts: [] } : await api(`/accounts?profileId=${profile}`);
  const map = dry && !env.ZERNIO_API_KEY ? Object.fromEntries(Object.keys(CHANNEL_ENV).map((c) => [c, 'ACCOUNT_ID (dry-run)'])) : await resolveMapping(accounts.accounts);

  const rl = auto || !process.stdin.isTTY ? null : createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));
  let sent = 0;
  const skipped = [];
  for (const draft of drafts) {
    const accountId = map[draft.channelId];
    console.log(`\n=== ${draft.id} · ${draft.channelId} · ${draft.publishAt} · ${draft.status}`);
    console.log(`hook: ${draft.hook}`);
    console.log(draft.body);
    if (draft.thread?.length) console.log(`thread: ${draft.thread.length} parts (sent manually or later; Zernio post carries the body only)`);
    if (!accountId) {
      console.log('>> skipped: channel account not connected (npm run zernio:connect)');
      continue;
    }
    let payload;
    try {
      payload = await payloadFor(draft, accountId, profile, dry);
    } catch (err) {
      console.log(`>> HELD BACK (media rule): ${err.message}`);
      skipped.push(draft.id);
      continue;
    }
    if (!dry && payload.mediaItems.length === 0) {
      console.log('>> HELD BACK (house rule: every post carries media)');
      skipped.push(draft.id);
      continue;
    }
    if (dry) {
      console.log(`>> DRY-RUN payload ${updating && draft.zernioPostId ? `PUT /v1/posts/${draft.zernioPostId}` : 'POST /v1/posts'}:`);
      console.log(JSON.stringify(payload, null, 2));
      continue;
    }
    const answer = auto ? 'y' : await ask(updating && draft.zernioPostId ? '>> update this scheduled post on Zernio (media/content)? [y/N] ' : '>> approve and schedule on Zernio? [y/N] ');
    if (answer.trim().toLowerCase() !== 'y') {
      console.log('>> skipped by owner');
      continue;
    }
    if (updating && draft.zernioPostId) {
      await api(`/posts/${draft.zernioPostId}`, { method: 'PUT', body: JSON.stringify(payload) });
      draft.updatedAt = new Date().toISOString();
      sent += 1;
      console.log(`>> updated Zernio post ${draft.zernioPostId} (media attached)`);
      continue;
    }
    const created = await api('/posts', { method: 'POST', body: JSON.stringify(payload) });
    const postId = created.post?._id ?? created._id ?? null;
    draft.status = 'SCHEDULED';
    draft.reviewNote = `APPROVED: owner via zernio push ${new Date().toISOString()}`;
    draft.zernioPostId = postId;
    draft.updatedAt = new Date().toISOString();
    sent += 1;
    console.log(`>> scheduled on Zernio as ${postId} for ${draft.publishAt}`);
  }
  rl?.close();
  if (!dry) {
    saveCalendar(cal);
    console.log(`\n[zernio] ${sent} draft(s) handed to Zernio. Zernio posts them at their scheduled times; run npm run zernio:sync later to mirror status.`);
  } else {
    console.log('\n[zernio] dry-run finished; nothing was sent.');
  }
}

async function cmdMediaTest() {
  if (!env.ZERNIO_API_KEY) {
    console.log('[zernio] set ZERNIO_API_KEY in mcp/zernio/.env first (copy .env.example)');
    process.exit(2);
  }
  const probe = '/assets/games/live/exocomplict-live-hero-aim.jpg';
  const abs = join(REPO_ROOT, 'public', probe);
  if (!existsSync(abs)) { console.log(`[zernio] probe frame missing in repo: public${probe}`); process.exit(1); }
  const publicUrl = await uploadMedia(probe);
  console.log(`[zernio] media pipeline OK — public${probe} -> ${publicUrl}`);
}

async function cmdStatus() {
  const profile = await profileId();
  const listed = await api(`/posts?profileId=${profile}&status=scheduled&limit=50`);
  const posts = listed.posts ?? listed.data?.posts ?? [];
  console.log(`[zernio] scheduled queue (${posts.length}):`);
  for (const p of posts) {
    console.log(`  ${p.scheduledFor}  ${(p.platforms ?? []).map((x) => x.platform).join('+').padEnd(9)} ${String(p.content).slice(0, 70).replace(/\n/g, ' ')}`);
  }
}

async function cmdSync() {
  const cal = readJson(CALENDAR, { drafts: [] });
  let touched = 0;
  for (const draft of cal.drafts) {
    if (!draft.zernioPostId || draft.status === 'PUBLISHED') continue;
    const post = await api(`/posts/${draft.zernioPostId}`);
    const state = post.post?.status ?? post.status;
    if (state === 'published') {
      draft.status = 'PUBLISHED';
      draft.updatedAt = new Date().toISOString();
      touched += 1;
      console.log(`[zernio] ${draft.id} published on Zernio`);
    } else if (state === 'failed') {
      draft.status = 'NEEDS_REVIEW';
      draft.reviewNote = `Zernio reported FAILED; retry with POST /v1/posts/${draft.zernioPostId}/retry or reschedule`;
      touched += 1;
      console.log(`[zernio] ${draft.id} FAILED on Zernio — back to NEEDS_REVIEW`);
    }
  }
  if (touched) saveCalendar(cal);
  console.log(`[zernio] sync done, ${touched} draft(s) updated`);
}

switch (command) {
  case 'accounts': await cmdAccounts(); break;
  case 'connect': await cmdConnect(); break;
  case 'push': await cmdPush(); break;
  case 'status': await cmdStatus(); break;
  case 'sync': await cmdSync(); break;
  case 'media-test': await cmdMediaTest(); break;
  default:
    console.log(`zernio runner — commands: accounts | connect | push [--week W] [--dry-run] [--auto] [--update] | status | sync | media-test`);
}
