/**
 * zernio-drafts — local stdio MCP server for the Zyvro Labs content draft desk.
 *
 * It owns ONE thing: the draft calendar that lives in mcp/zernio/content/.
 * It never talks to LinkedIn, X or zernio.com — publishing is the job of the
 * hosted Zernio MCP (see mcp/zernio/README.md). That split is deliberate:
 * this server works offline, in sandboxes and in CI, and it cannot leak a
 * platform token because it never holds one.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(HERE, '..', '..', 'content');
const CALENDAR = join(CONTENT_DIR, 'calendar.json');
const CHANNELS = join(CONTENT_DIR, '..', 'channels.json');
const SOURCES = join(CONTENT_DIR, 'sources.json');
const EXPORTS = join(CONTENT_DIR, 'exports');

type DraftStatus = 'DRAFT' | 'NEEDS_REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'KILLED';

interface Draft {
  id: string;
  channelId: string;
  sourceId: string | null;
  publishAt: string; // ISO date-time, UTC
  status: DraftStatus;
  hook: string;
  body: string;
  thread: string[];
  tags: string[];
  imageRefs: string[];
  reviewNote: string;
  zernioPostId?: string | null;
  pillar?: string;
  media?: { kind: 'game' | 'generated' | 'source'; refs?: string[]; captureUrl?: string; captureFile?: string } | null;
  createdAt: string;
  updatedAt: string;
}

interface Calendar {
  meta: { owner: string; timezoneNote: string; seeded: string[] };
  drafts: Draft[];
}

function readJson<T>(path: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as T;
  } catch {
    return fallback;
  }
}

function writeCalendar(cal: Calendar): void {
  writeFileSync(CALENDAR, JSON.stringify(cal, null, 2) + '\n', 'utf-8');
}

function loadCalendar(): Calendar {
  return readJson<Calendar>(CALENDAR, { meta: { owner: 'ZYVRO LABS', timezoneNote: 'UTC', seeded: [] }, drafts: [] });
}

function isoWeekLabel(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function text(payload: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(payload, null, 2) }] };
}

const server = new McpServer({ name: 'zernio-drafts', version: '1.0.0' });

server.registerTool(
  'channels_list',
  {
    title: 'List content channels',
    description:
      'Lists the three Zyvro Labs content channels (owner LinkedIn private, owner X private, @zyvrolabs X brand) with their voice rules, cadence and publish policy. Read this before drafting anything.'
  },
  async () => text(readJson<unknown[]>(CHANNELS, []))
);

server.registerTool(
  'drafts_list',
  {
    title: 'List draft calendar',
    description: 'Lists content drafts, optionally filtered by channel id, status or ISO week (e.g. 2026-W44).',
    inputSchema: {
      channelId: z.string().optional().describe('Filter by channel id, e.g. x-zyvrolabs'),
      status: z.enum(['DRAFT', 'NEEDS_REVIEW', 'SCHEDULED', 'PUBLISHED', 'KILLED']).optional(),
      week: z.string().optional().describe('ISO week label like 2026-W44')
    }
  },
  async ({ channelId, status, week }) => {
    let drafts = loadCalendar().drafts;
    if (channelId) drafts = drafts.filter((d) => d.channelId === channelId);
    if (status) drafts = drafts.filter((d) => d.status === status);
    if (week) drafts = drafts.filter((d) => isoWeekLabel(new Date(d.publishAt)) === week);
    return text({ count: drafts.length, drafts });
  }
);

server.registerTool(
  'drafts_create',
  {
    title: 'Create a content draft',
    description:
      'Adds a draft to the calendar for one channel. Copy must follow docs/COPY-DESK.md: one hook, ultra-specific numbers, no exclamation marks. X bodies must stay under 280 characters unless a thread is supplied.',
    inputSchema: {
      channelId: z.string().describe('Channel id from channels_list'),
      publishAt: z.string().describe('ISO date-time in UTC, e.g. 2026-10-27T01:00:00Z'),
      hook: z.string().describe('One-sentence hook, per COPY-DESK rules'),
      body: z.string().describe('The post body'),
      thread: z.array(z.string()).optional().describe('Optional thread parts for X'),
      tags: z.array(z.string()).optional(),
      imageRefs: z.array(z.string()).optional().describe('Paths under /assets or frame capture names'),
      sourceId: z.string().optional().describe('Dev blog source id, e.g. post-002')
    }
  },
  async (input) => {
    const cal = loadCalendar();
    const channels = readJson<{ id: string }[]>(CHANNELS, []);
    if (!channels.some((c) => c.id === input.channelId)) {
      return text({ error: `unknown channel '${input.channelId}'; call channels_list first` });
    }
    const now = new Date().toISOString();
    const draft: Draft = {
      id: `d-${String(cal.drafts.length + 1).padStart(3, '0')}`,
      channelId: input.channelId,
      sourceId: input.sourceId ?? null,
      publishAt: input.publishAt,
      status: 'DRAFT',
      hook: input.hook,
      body: input.body,
      thread: input.thread ?? [],
      tags: input.tags ?? [],
      imageRefs: input.imageRefs ?? [],
      reviewNote: 'Owner review required before anything is scheduled or published.',
      createdAt: now,
      updatedAt: now
    };
    cal.drafts.push(draft);
    writeCalendar(cal);
    return text({ created: draft });
  }
);

server.registerTool(
  'drafts_set_status',
  {
    title: 'Move a draft through review',
    description:
      'Changes a draft status: DRAFT -> NEEDS_REVIEW -> SCHEDULED -> PUBLISHED, or KILLED. SCHEDULED and PUBLISHED require a reviewNote naming who approved it; nothing auto-publishes from this server.',
    inputSchema: {
      id: z.string(),
      status: z.enum(['DRAFT', 'NEEDS_REVIEW', 'SCHEDULED', 'PUBLISHED', 'KILLED']),
      reviewNote: z.string().optional()
    }
  },
  async ({ id, status, reviewNote }) => {
    const cal = loadCalendar();
    const draft = cal.drafts.find((d) => d.id === id);
    if (!draft) return text({ error: `no draft '${id}'` });
    const approvedBefore = draft.reviewNote.startsWith('APPROVED:');
    if ((status === 'SCHEDULED' || status === 'PUBLISHED') && !(reviewNote ?? '').trim() && !approvedBefore) {
      return text({ error: 'SCHEDULED/PUBLISHED requires a reviewNote on this call naming the approver, e.g. "APPROVED: <name>"' });
    }
    draft.status = status;
    if (reviewNote) draft.reviewNote = reviewNote;
    draft.updatedAt = new Date().toISOString();
    writeCalendar(cal);
    return text({ updated: draft });
  }
);

server.registerTool(
  'drafts_export_week',
  {
    title: 'Export a week as markdown',
    description:
      'Writes content/exports/<ISO-week>.md: the whole week per channel, ready for the owner to read in one pass or paste into the Zernio dashboard. Returns the file path and its content.',
    inputSchema: { week: z.string().optional().describe('ISO week label; defaults to the week of today (UTC)') }
  },
  async ({ week }) => {
    const label = week ?? isoWeekLabel(new Date());
    const cal = loadCalendar();
    const channels = readJson<{ id: string; label: string }[]>(CHANNELS, []);
    const rows = cal.drafts.filter((d) => isoWeekLabel(new Date(d.publishAt)) === label);
    const lines: string[] = [`# CONTENT WIRE // ${label}`, '', `Drafts: ${rows.length} · Owner review required before scheduling.`, ''];
    for (const channel of channels) {
      const mine = rows.filter((r) => r.channelId === channel.id);
      lines.push(`## ${channel.label ?? channel.id}`, '');
      if (mine.length === 0) lines.push('_no drafts this week_', '');
      for (const d of mine) {
        lines.push(`### ${d.publishAt} · ${d.status} · ${d.id}`, '', `**Hook:** ${d.hook}`, '', d.body, '');
        if ((d.thread ?? []).length) lines.push('**Thread:**', ...(d.thread ?? []).map((t, i) => `${i + 1}. ${t}`), '');
        if ((d.imageRefs ?? []).length) lines.push(`**Images:** ${(d.imageRefs ?? []).join(', ')}`, '');
        lines.push('---', '');
      }
    }
    mkdirSync(EXPORTS, { recursive: true });
    const out = join(EXPORTS, `${label}.md`);
    writeFileSync(out, lines.join('\n'), 'utf-8');
    return text({ path: out, markdown: lines.join('\n') });
  }
);

server.registerTool(
  'drafts_seed_from_sources',
  {
    title: 'Seed drafts from dev blog sources',
    description:
      'Repurposes each entry of content/sources.json (the DEV BLOG transmissions) into channel-appropriate drafts: LinkedIn lesson-first, owner X dry and numeric, brand X cold and evidence-first. Idempotent per source+channel.',
    inputSchema: { weekStart: z.string().optional().describe('ISO date of Monday 00:00 UTC for the target week; defaults to next Monday') }
  },
  async ({ weekStart }) => {
    const cal = loadCalendar();
    const sources = readJson<{ id: string; title: string; hook: string; facts: string[]; images: string[]; visualNote?: string }[]>(SOURCES, []);
    const monday = weekStart
      ? new Date(weekStart)
      : (() => {
          const d = new Date();
          const day = d.getUTCDay() || 7;
          d.setUTCDate(d.getUTCDate() + (8 - day));
          d.setUTCHours(0, 0, 0, 0);
          return d;
        })();
    const created: Draft[] = [];
    const plan: { channelId: string; dayOffset: number; hour: number; pick: (s: (typeof sources)[number]) => { hook: string; body: string; thread?: string[] } }[] = [
      {
        channelId: 'linkedin-private',
        dayOffset: 0,
        hour: 1,
        pick: (s) => ({
          hook: s.hook,
          body: `${s.title}\n\n${s.facts[0] ?? ''}\n\n${s.facts[1] ?? ''}\n\n${s.visualNote ?? ''}\n\nThe rule we keep: if it is not built and tested, it is not claimed — and what is still unverified gets written down with the same weight as what passed.\n\nFull update with the evidence table is on the Zyvro Labs site, DEV BLOG section.`
        })
      },
      {
        channelId: 'x-owner-private',
        dayOffset: 1,
        hour: 2,
        pick: (s) => ({
          hook: s.hook,
          body: s.facts[0] ?? s.hook,
          thread: [s.facts[1] ?? '', s.facts[2] ?? '', 'What stays UNKNOWN stays written down. That is the whole trick.']
        })
      },
      {
        channelId: 'x-zyvrolabs',
        dayOffset: 2,
        hour: 3,
        pick: (s) => ({
          hook: s.hook,
          // Brand X must fit 280 characters: one fact, one promise, frames attached.
          body: `${s.facts[0] ?? s.hook} Frames attached.`
        })
      }
    ];
    sources.forEach((source, sourceIndex) => {
      for (const step of plan) {
        const key = `${source.id}:${step.channelId}`;
        if (cal.meta.seeded.includes(key)) continue;
        // Spread the pool across the week: each source lands one day after the
        // previous one per channel, so no channel gets two drafts on one day.
        const when = new Date(monday.getTime() + (step.dayOffset + sourceIndex) * 86400000);
        when.setUTCHours(step.hour, 0, 0, 0);
        const made = step.pick(source);
        const now = new Date().toISOString();
        const draft: Draft = {
          id: `d-${String(cal.drafts.length + 1).padStart(3, '0')}`,
          channelId: step.channelId,
          sourceId: source.id,
          publishAt: when.toISOString(),
          status: 'DRAFT',
          hook: made.hook,
          body: made.body,
          thread: made.thread ?? [],
          tags: ['EXOCOMPLICT', 'DEVLOG'],
          imageRefs: source.images.slice(0, 2),
          reviewNote: 'Seeded from DEV BLOG source; owner review required.',
          createdAt: now,
          updatedAt: now
        };
        cal.drafts.push(draft);
        cal.meta.seeded.push(key);
        created.push(draft);
      }
    });
    writeCalendar(cal);
    return text({ created: created.length, drafts: created });
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
