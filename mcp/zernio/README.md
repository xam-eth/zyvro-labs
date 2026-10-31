# MCP // ZERNIO — the Zyvro Labs content wire

One folder, two layers, one rule: **drafts live in this repo, tokens never do.**

| Layer | What it is | Where it runs | Needs secrets? |
|---|---|---|---|
| `zernio-drafts` (local, stdio MCP) | The draft desk: channels, draft calendar, weekly export, seeding from the DEV BLOG. Built in `server/`. | Anywhere, offline — including this sandbox and CI | No |
| `runner/zernio.mjs` (CLI) | The semi-automatic bridge: connects accounts, reviews drafts one by one, sends approved ones to Zernio scheduled at their exact time. | The owner's machine (`npm run zernio:*`) | Yes: `ZERNIO_API_KEY` in `mcp/zernio/.env` |
| `zernio` (hosted MCP, optional) | Zernio's MCP endpoint `https://mcp.zernio.com/mcp` for agents that want the full 280+ tool surface (inbox, analytics, ads). | Any MCP client the owner connects | Yes: OAuth 2.1 PKCE sign-in, or bearer key |

Zernio REST facts the runner is built on (base `https://zernio.com/api/v1`,
Bearer API key): `GET /v1/accounts` lists connected accounts,
`GET /v1/connect/{platform}?profileId=` returns the browser approve url,
`POST /v1/posts` schedules with `scheduledFor` + `platforms[{platform,
accountId}]`, `GET /v1/posts/{id}` reports published/failed.

Zernio is a real hosted service (formerly Late): one account connects the
platforms, OAuth tokens stay on Zernio's side, and every API endpoint is also an
MCP tool. Docs: `https://docs.zernio.com/resources/mcp`, endpoint
`https://mcp.zernio.com/mcp`, API keys at `https://zernio.com/dashboard/api-keys`.

---

## Folder map

```
mcp/zernio/
  README.md                  this file
  channels.json              the three channels + voice rules + cadence + publish policy
  mcp.config.example.json    client config showing BOTH layers (copy what you need)
  .env.example               secret placeholders — copy to .env, never commit values
  server/                    zernio-drafts MCP server (TypeScript, stdio)
  runner/zernio.mjs          the semi-automatic CLI bridge to your Zernio account
  content/
    sources.json             DEV BLOG transmissions repurposed as content sources
    calendar.json            the draft calendar (the server's only store)
    exports/                 weekly markdown exports (committed, they are deliverables)
```

## Setup

1. **Build the local server** (once per clone):
   ```bash
   cd mcp/zernio/server && npm install && npm run build
   ```
2. **Register the servers in your MCP client.** The repo root already ships a
   `.mcp.json` with the local layer, so Claude Code / Cursor / any client that
   reads `.mcp.json` gets `zernio-drafts` immediately. To add publishing, copy
   the `zernio` entry from `mcp.config.example.json` into your client config
   (Claude Desktop: `claude_desktop_config.json`; Claude Code: `claude mcp add
   --transport http zernio https://mcp.zernio.com/mcp`).
3. **Authenticate to Zernio — on your machine, in a browser.**
   - Preferred: OAuth 2.1 + PKCE sign-in when the client first calls the
     endpoint. Tokens are short-lived, refresh automatically, and can be
     revoked per client from `zernio.com/dashboard`.
   - Headless alternative: create an API key at
     `https://zernio.com/dashboard/api-keys`, put it in `mcp/zernio/.env`
     (gitignored) or in your client/Vercel environment as `ZERNIO_API_KEY`.
   - Then connect the three accounts **inside Zernio**: owner LinkedIn,
     owner X, @zyvrolabs X. Record the resulting channel ids in your local
     `.env` only (`ZERNIO_CHANNEL_*`). Account handles are deliberately not
     written into this repository.
4. **Draft here, publish there.** Agents working in this repo (including the
   sandbox) plan content with `zernio-drafts`; the owner's connected client
   pushes approved drafts through the hosted Zernio tools.

## Sandbox limitation (read this before wondering why nothing posts)

This sandbox's outbound allowlist covers only package registries and GitHub.
`mcp.zernio.com`, `api.x.com` and `api.linkedin.com` are unreachable from here,
so inside the sandbox the wire is **draft-only by construction** — which is
also the safe default: every channel in `channels.json` has
`autoPublish: false`, and `drafts_set_status` refuses SCHEDULED/PUBLISHED
without a named approver in `reviewNote`.

## Strategy & voice (read this before writing anything)

`CONTENT-STRATEGY.md` is the content-director knowledge base: house identity
("we do not announce, we produce evidence"), channel personas, the 2026
platform measurements behind every rule (LinkedIn Depth Score & no-link rule,
X reply/thread weights, failure-post uplift), the pillar mix
(progress 40 / tech 20 / news 20 / pov 20), the media doctrine (game frames for
progress, generated plates for tech/POV, source-article screenshots for news),
cadence doctrine and the hook library. The cadence planner and the copy
templates implement it; humans enforce taste.

## The semi-automatic loop (how marketing actually runs here)

Nothing publishes itself. The loop has exactly two manual runs on your machine
and one approval click per draft:

1. **Ask the agent for content.** The agent drafts inside this setup
   (`drafts_seed_from_sources` / `drafts_create`), always from a DEV BLOG
   source, always per channel voice. Drafts land in `content/calendar.json`
   with status DRAFT.
2. **You pull the repo** (`git pull`) so the new drafts are on your machine.
3. **First time only — connect the accounts:**
   ```bash
   npm run zernio:accounts   # shows what is connected and the channel mapping
   npm run zernio:connect    # prints the Zernio approve-url per missing channel
   ```
   Open each url, approve LinkedIn / X in the browser; Zernio handles the
   callback and the account appears. `zernio:accounts` then lets you pick which
   connected account belongs to which channel (saved gitignored).
4. **Send the schedule:**
   ```bash
   npm run zernio:push            # interactive: each draft is shown, you type y
   npm run zernio:push --dry-run  # print exact POST /v1/posts payloads, send nothing
   npm run zernio:push --week 2026-W44
   ```
   Approved drafts are POSTed to `/v1/posts` with `scheduledFor` = their
   `publishAt`, and flip to SCHEDULED in the calendar with your approval named
   in `reviewNote` plus the Zernio post id.
5. **Zernio posts at the scheduled times.** Later, `npm run zernio:sync`
   mirrors published/failed back into the calendar; `npm run zernio:status`
   shows the live queue.
6. **New content?** Back to step 1: ask the agent, pull, `zernio:push` again.

Media: every post carries up to two visuals. The runner uploads the repo's own
frame captures through Zernio's presigned media endpoint
(`POST /v1/media/presign` -> PUT the bytes -> use the returned `publicUrl`), so
no site deployment is needed. `SITE_BASE_URL` in `.env` is only a fallback if an
upload fails. Posts already sitting in Zernio without media get it with
`npm run zernio:refresh` (re-PUTs the payload, media included; if a fresh clone
lost the local `zernioPostId`s, refresh adopts the scheduled post ids straight
from `GET /v1/posts?status=scheduled` by source tag / body prefix instead of
creating duplicates). X bodies are kept under 280 characters; threads stay in
the calendar for manual chaining.

## Cinema desk (video transmissions)

`CINEMA-DESK.md` documents the motion-picture arm: cinematic product/dev-process
videos built with the open-source video-shotcraft skill (Apache-2.0) on Remotion,
re-skinned with the house tokens and rendered sandbox-side with the same
sparticuz chromium that records the game. First cut:
`public/assets/media/video/exocomplict-teaser-w44.mp4` (24 s, eight shots,
ledger-amber ending), shipped as a `media.kind: "video"` source so push attaches
it as a video mediaItem plus poster frame.

## Live frame pipeline (where the visuals come from)

The game is in active development, so marketing visuals are real captures of
the current build, not concept art:

1. Clone the private game repo into an **isolated directory** (never inside
   this repo) and install its pinned tool deps (`@sparticuz/chromium` +
   `puppeteer-core`, the same way its own CI does).
2. Run its browser QA harness against the committed WASM preview:
   `node tools/web_qa.mjs --viewport 1280x720 --play 30` (scripted walk/aim/
   fire/reload pass) and `--tour` (review camera over all eight districts).
   Both run headless Chromium with software WebGL 2 at 16:9 (1280x720).
3. Convert the chosen frames to JPEG q90 and store them here under
   `public/assets/games/live/exocomplict-live-*.jpg` — real captures only,
   named `<game>-<subject>.jpg` per repo convention, no private locators.
4. News media: `runner/sourcecard.mjs` renders verbatim SOURCE CAPTURE cards
   from the fetched article (`content/source-cards.json`) and screenshots them
   with the same sandbox chromium at 16:9 into
   `public/assets/media/sources/*.jpg`.
5. Reference everything in `content/sources.json` (`media`) so every draft and
   push attaches it automatically. The owner machine installs no browser and
   captures nothing — it pulls media-ready drafts.

## Cadence: an always-in-dev game posts 2-4 times a day

`npm run zernio:plan -- --from 2026-10-27 --days 9 --per-day 2` appends working-
day drafts at 2-4 slots per channel per day, rotating sources and live frames so
consecutive posts never repeat an angle. Plan first, review the weekly export,
then `npm run zernio:push` — approval per draft stays mandatory.

## Security rules (non-negotiable)

- No platform token, Zernio API key, or account handle is ever committed,
  pasted in chat, or stored in `channels.json` / `calendar.json`.
- `.env` stays gitignored; `.env.example` carries placeholders only.
- The local server holds no network code at all — it cannot exfiltrate
  anything even if a prompt tried.
- Revocation path: kill the client grant in `zernio.com/dashboard`, or delete
  the API key; nothing in this repo keeps a copy.

## Runner command reference

| Command | What it does |
|---|---|
| `npm run zernio:accounts` | List connected Zernio accounts, build/confirm the channel mapping |
| `npm run zernio:connect` | Print the browser approve-url for every unconnected channel |
| `npm run zernio:push` | Interactive review + schedule approved drafts on Zernio |
| `npm run zernio:push:dry` | Same, but prints payloads and sends nothing |
| `npm run zernio:refresh` | Re-send already scheduled posts (PUT) to attach media or refreshed copy; adopts ids from Zernio if the local calendar lost them |
| `npm run zernio:plan` | Append the strategy-driven week: 2-4 posts/day/channel across pillars (`--from`, `--days`, `--per-day`) |
| `npm run zernio:capture` | (optional, sandbox/CI) live-page screenshot at 16:9 when a domain is reachable; news media normally comes from `sourcecard.mjs` |
| `npm run zernio:media-test` | Upload one frame through the presign pipeline and print the publicUrl |
| `npm run zernio:status` | The scheduled queue as Zernio sees it |
| `npm run zernio:sync` | Mirror published/failed states back into the calendar |

## zernio-drafts tool reference

| Tool | Purpose |
|---|---|
| `channels_list` | The three channels with voice rules, cadence, publish policy |
| `drafts_list` | Filter drafts by channel / status / ISO week |
| `drafts_create` | Add a draft (hook, body, thread, tags, images, source) |
| `drafts_set_status` | DRAFT → NEEDS_REVIEW → SCHEDULED → PUBLISHED, or KILLED; approvals need a name |
| `drafts_export_week` | Write `content/exports/<week>.md` and return it |
| `drafts_seed_from_sources` | Repurpose DEV BLOG sources into channel drafts |
