# CONTENT STRATEGY // THE RECEIPT DESK

> Knowledge base of the content director function for Zyvro Labs social.
> Every rule below is either measured (cited) or a house rule that follows from
> a measurement. When a rule and a number disagree, the number wins.
> Research cut: 26 Oct 2026.

## 0. The identity (why nobody mistakes our posts for anyone else's)

Zyvro Labs publishes **receipts**. One sentence of identity:

> *We do not announce. We produce evidence.*

House voice — applies to every channel, every pillar:

- Open with a **number or a confessed failure**, never with an adjective.
- Short declaratives. Em-dash receipts. No exclamation marks, no emojis,
  no hype words ("excited", "thrilled", "game-changing") — banned list.
- Every claim carries its evidence in the same breath; every gap is written
  as `UNVERIFIED:` **in the same font, same weight** as the wins. That ledger
  line is our signature — it is why the wins are believable.
- First person singular on owner channels ("I measured…"), first person
  plural on the brand channel ("the lab keeps…").
- Series tags in square caps so regulars recognise the format in-feed:
  `[RECEIPT]` progress proof · `[LAB NOTE]` engineering explainer ·
  `[OUTSIDE SIGNAL]` industry news with our stance ·
  `[HOT TAKE, COLD DATA]` opinion fenced by numbers ·
  `[LEDGER]` the unverified list itself · `[FRAME OF THE WEEK]` one visual, one story.
- Anti-generic checklist (the 2026 "low-credibility founder voice" tells):
  no balanced three-act "I was wrong until I learned" arc, no one-sentence-
  per-line scroll bait, no fake "What do you think?" closers, no hashtag
  stacks, no engagement-bait polls. A question only closes a post when we
  actually want the answer.

Channel personas:

| Channel | Persona | Register |
|---|---|---|
| LinkedIn (owner profile) | the engineer who keeps the ledger | first person, lesson-first, 900–1,300 chars, real closing question |
| X (owner) | same engineer, terser | receipts ≤280, dry humour allowed, open question when natural |
| X (@zyvrolabs brand) | the lab terminal | `LAB LOG // HEADLINE` + 2–4 evidence bullets + ledger line |

Personal profile, not company page: personal profiles earn ~5–8× the
engagement of company pages in 2026 — the owner voice carries LinkedIn.

## 1. Platform strategy (X and LinkedIn are different jobs)

### LinkedIn — dwell time, saves, substantive comments (Depth Score)
- Formats ranked 2026: document/PDF carousel ~6.6–7.0% engagement, multi-image
  ~6.8%, image+text ~3.2–6%, plain text ~2–4.3%. We ship **multi-image text
  posts** (2 frames) via the scheduler; carousels are a manual upgrade path.
- Long-form text 900–1,300 chars with short paragraphs; hook line 1 under
  ~90 chars so the "see more" cut (~140–210 chars) lands after the hook.
- **No external links in the body**: linked posts lose ~60% reach, and the
  first-comment link workaround is penalised since early 2026. CTA is a
  question or "DEV BLOG section on the site" without a URL.
- 2 posts/day: AM = story/lesson long-form; PM = data insight or ledger note.
- Narrow topic, depth over breadth: one spine — *evidence-driven web game
  engineering* — with the game as the running case study. Slow-build personal
  narrative woven in one anecdote at a time, never an autobio dump.

### X — receipts, replies, threads
- Text-only posts hold the highest median engagement (~3.56%); replies weigh
  ~150× a like; threads ~3× a standalone; since the March 2026 algorithm shift
  a single long-form post out-distributes a thread — so: **one-liners daily,
  one 5–8 tweet thread per week, occasional long-form LAB NOTE instead of a
  thread** (completion rate dies after tweet 8).
- Cadence 2–3 originals/day (2–3×/day ≈ 7× daily impressions vs once/day;
  skipping 3+ days costs 7–14 days of recovery). Owner 2–3/day, brand 2/day.
- Proof + POV compact posts with screenshots; multi-image 2–4 frames.
- Failure posts outperform success posts 3–5× — the ledger line doubles as
  our failure format. End with an open question where it is real: 2–3× replies.
- Replies/quote-posts on industry accounts are manual owner work (10–15/day
  is the growth channel); the scheduler only handles originals.

### Mix per channel per week (adapted build-in-public frame)
progress 40% · tech/LAB NOTE 20% · news/OUTSIDE SIGNAL 20% · POV 20%.
Build-in-public baseline: progress 35 / learnings 25 / metrics 20 /
engagement 15 / personal 5 — we fold metrics into progress receipts and
personal into POV, because our personal story *is* the evidence habit.
Rule from the field: build-in-public works when it creates **evidence, not
noise** — broadcasting a to-do list ("shipped dark mode") is the failure mode;
every post must carry a number, a frame, or a confession.

## 2. Media doctrine (every post carries media — no exceptions)

Media type follows the topic:

| Pillar | Media source | Where it lives |
|---|---|---|
| progress (`kind: progress`) | real frames of the current build: headless playtest + review-camera captures, 16:9 | `public/assets/games/live/exocomplict-live-*.jpg` |
| tech (`kind: tech`) | generated visual (diagram/plate in house style) or instrument frame (dashboard) | `public/assets/media/generated/*.jpg` |
| news (`kind: news`) | **SOURCE CAPTURE card**: article fetched, verbatim quotes rendered in house style, screenshotted at 16:9 by `@sparticuz/chromium` **in the agent sandbox** (`runner/sourcecard.mjs`, specs in `content/source-cards.json`) and committed | `public/assets/media/sources/*.jpg` |
| pov (`kind: pov`) | generated editorial visual in house style | `public/assets/media/generated/*.jpg` |

House visual style for generated assets: void `#05080c` ground, acid lime
`#D7FF3F` ink, amber `#ffb020` for the UNVERIFIED ledger, monospace ALL-CAPS
labels, industrial grid — the same language as the site.

Capture pipeline for game frames (progress), also sandbox-side: clone the
private game repo into an isolated dir, run its own `tools/web_qa.mjs`
(`@sparticuz/chromium` + puppeteer-core, software WebGL2) with `--play 30` and
`--tour` at 1280×720, convert chosen frames to JPEG q90. Re-capture whenever
the build moves — stale frames are a credibility breach.

Division of labour: **every browser, recording and rendering job lives in the
agent sandbox** (sparticuz chromium is the sandbox's browser). The owner
machine only pulls the repo and runs the Zernio CLI — it installs no chromium
and captures nothing. Push refuses to send any draft whose media is missing,
so a media-less post can never reach Zernio.

## 3. Cadence doctrine

- LinkedIn 2/day, X owner 2–3/day, X brand 2/day → 6–7 originals/day total,
  working days; weekends only for `[FRAME OF THE WEEK]` if a frame earns it.
- `npm run zernio:plan -- --from <monday> --days 5 --per-day 2` regenerates the
  week; pillar rotation guarantees no two consecutive posts on a channel share
  a pillar, and no source repeats an angle within 3 days.
- Threads are drafted in the calendar `thread` field (5–8 parts) and posted
  manually or chained; the scheduler sends the root post with media.

## 4. Hook library (house formulas, fill from evidence)

1. Number-first: "<big number> <unit>, and we still call it UNVERIFIED."
2. Confession: "We shipped <thing> wrong for <n> weeks. The fix was <n> lines."
3. Contrast: "<everyone's claim>. Ours: <measured number>."
4. Receipt: "Screenshot attached. No caption needed — the HUD says it."
5. Ledger: "Three things passed this week. Two didn't. All five are below."
6. Outside signal: "<industry event> happened. Here is what it changes for
   web games — and what it changes for us: <one line>."

## 5. Sources of truth cited in this doc

LinkedIn 2026: Depth Score & document formats ~6.6–7% (Dataslayer/Socialinsider
2026 analyses); links −60% reach + first-comment penalty (van der Blom 1.3M
post study, early-2026 update); personal vs company page 5–8×; anti-generic
voice tells; 900–1,300 char long-form with sub-90-char hook.
X 2026: text median 3.56% (45M-post analysis); replies ~150× likes; threads 3×,
5–8 optimal, completion decay after 8; Mar-2026 long-form-over-thread shift;
2–3/day ≈ 7× impressions, 3-day skip penalty; failure posts 3–5×; open
question 2–3× replies.
Build-in-public: evidence-not-noise rule; pillar mix 35/25/20/15/5.
Industry facts used in drafts (Oct 2026): WebGPU 85.72% global traffic &
WebGL2 96.44% (caniuse pull 2026-10-09); Godot web export WebGL2-only through
4.7/4.8-beta1 (15 Oct 2026); Unity 6.6 WebGPU out of experimental, off by
default; decompiled "vibe-coded" browser port wave + Xbox AI-port lab
(13 Oct 2026) + GTA V port takedown; GameMaker GMRT free commercial Jan 2027
(23 Oct 2026); RimWorld Unity→Waylith 2–4× (12 Oct 2026); Turing Complete 2.0
Godot→custom engine.
