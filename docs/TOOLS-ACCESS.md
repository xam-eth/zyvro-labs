# Tools & Access I Need to Work at Maximum

Written 4 October 2026. This answers the owner's crucial question: **what access does the director need to operate the studio at full capacity.**

The honest headline: most of the *tools* are already connected in this session. What is missing is **accounts, credentials, destinations and approvals** that make those tools actually do something in the real world. A connected tool with no account behind it is a steering wheel with no car. This file separates the two so the owner can unblock the right things.

Nothing here is a request to act. Everything that spends money, posts in public, touches legal matters or creates store or chain accounts stays an **owner decision** (CLAUDE.md rule 5).

## Legend
- **HAVE** — connected and usable now.
- **CONNECTED, NOT USABLE** — the tool is present but has no account, credential or destination behind it, so it cannot produce a real result yet.
- **MISSING** — not available in this session at all.
- **OWNER-ONLY** — only a human can create or operate it; the owner either does the steps or grants me scoped access.

---

## 1. What I already have (and what it unblocks)

| Tool | State | What it lets me do |
|---|---|---|
| GitHub (MCP) | HAVE | Read all four game repos, open and maintain issues and PRs, review the site agent's work, drive the registry. This is the core of the director role and it works. |
| WebSearch / WebFetch | HAVE | Competitor, market, platform and grant research with sources. |
| Chromium + Playwright | HAVE | Real-browser verification and screenshots of the site and of the game web builds. |
| ImageMagick (CLI) | HAVE | Resize, crop and compose screenshots into key art and showcase images. |
| claude-code-remote (scheduling) | HAVE | Schedule my own check-ins to supervise the site agent without the owner reminding me. |

These are enough to **research, plan, write issues, review PRs and prepare assets**. They are not enough to **ship, host, publish, measure or transact**.

---

## 2. What would multiply my output the most (ranked)

These are ordered by how much they unblock, not by cost. Each line says the single thing the owner must provide.

### Tier 1 — unblocks the whole funnel (do these first)

| # | Need | State | Why it is the bottleneck | What the owner provides |
|---|---|---|---|---|
| 1 | **A live hosting target + domain** | Vercel CONNECTED, NOT USABLE | Nothing is deployed. No play link, no shareable page, no SEO, no analytics can exist without a URL. This blocks every marketing move (see `docs/MARKETING-PLAN.md` §2). | Confirm the canonical domain, authorise a Vercel project linked to this repo, point DNS. |
| 2 | **A Supabase project** | Supabase CONNECTED, NOT USABLE | Newsletter, playtest signup, contact storage, forum and analytics events all need a real backend with a database. No project = no owned audience capture. | Authorise creating (or point me at) a Supabase project; I design the schema with row-level security. |
| 3 | **Verified email mailboxes** | Gmail CONNECTED; mailboxes UNVERIFIED | `contact@`, `press@`, `hello@` must really exist and receive mail before I can put them on the site or pitch press. Right now `contact@zyvro.com` is unconfirmed (CLAUDE.md §7). | Confirm the domain's mailboxes exist; say which address is public. |
| 4 | **An analytics tool** | MISSING | I cannot measure the funnel (page → game → play → signup) without one. Flying blind is the opposite of "super max". | Choose a privacy-friendly analytics (e.g. Plausible or PostHog, both have free/cheap tiers) and connect it, or approve self-hosting on Supabase. |

### Tier 2 — unblocks launch and community

| # | Need | State | Why | Owner provides |
|---|---|---|---|---|
| 5 | **Google Play Console account** | OWNER-ONLY | Required to ship any mobile game and to run the 12-tester / 14-day closed test (`docs/LAUNCH-PLAYBOOK.md`). I cannot create or log into it. | Create the account (decide personal vs organisation), then either run the console steps I script, or add me as a limited user if that is possible. |
| 6 | **Steamworks account** | OWNER-ONLY | Needed for any Steam page; the $100 app fee and identity/tax review are the owner's. | Decide per game, pay the fee, complete identity; I prepare all store-page content. |
| 7 | **Discord server + bot token** | MISSING | The community anchor for testers and fans. A bot token lets me (or the site) automate roles, verification and announcements. | Create the server; create a bot and store its token in the host secret store. |
| 8 | **Forum platform** | MISSING | Searchable, indexable community memory (CLAUDE.md §9 decision 6). | Decide hosted (Discourse) vs custom-on-Supabase; if hosted, create the instance. |
| 9 | **Social accounts connected in Zernio with posting rights** | Zernio CONNECTED; accounts/approval UNCONFIRMED | To schedule and publish marketing. A repo note says the connected Meta token had no billing-capable ad account and TikTok Ads was disconnected. | Confirm which real accounts are linked; approve that I may draft, and that the owner approves each publish (rule 5). |

### Tier 3 — growth and media quality

| # | Need | State | Why | Owner provides |
|---|---|---|---|---|
| 10 | **Semrush is live** | HAVE | SEO and competitor keyword research — usable the moment a domain exists. | Nothing beyond the domain. |
| 11 | **Trailer / key-art production** | PARTIAL (ImageMagick + screenshots only) | Capsules and trailers are the single highest-converting assets. I can compose stills; I cannot edit video or commission art. | A small budget for a capsule ($150–500) and a trailer ($300+), or an approved AI media tool, per `docs/MARKETING-PLAN.md` §11. |
| 12 | **A secrets store** | HAVE (host env / `.env` gitignored) | So keys (bot token, API keys, later chain keys) never land in the repo (rule 6). | Confirm where secrets live on the host; add them there, not in chat. |
| 13 | **Project / task board** | PARTIAL (GitHub Issues) | GitHub Issues is enough to run delegation now. A GitHub Project would give a cross-repo board across all five repos. | Optional: enable a GitHub Project for the org. |

### Tier 4 — Web3, later only (gated behind "games stable + real user base")

Do **not** provision these until the sequencing gate in `docs/WEB3-STRATEGY.md` is met. Listed so the owner sees the full picture.

| # | Need | State | Why | Owner provides |
|---|---|---|---|---|
| 14 | **Chain grant application identity** | OWNER-ONLY | To apply to Ronin / Arbitrum / Immutable grant programs. Reputation and traction are evaluated, so this comes *after* a user base exists. | The studio's legal identity and the decision to apply; I prepare the application and pitch. |
| 15 | **A wallet + testnet access** | MISSING | For any on-chain integration, gasless onboarding tests, or contract deployment. | A dedicated project wallet in the secret store; never the owner's personal keys. |
| 16 | **Smart-contract audit budget** | OWNER-ONLY | No token or on-chain asset ships unaudited. | Budget, when the time comes. |
| 17 | **Legal counsel (Indonesia crypto)** | OWNER-ONLY | Token / airdrop touches OJK rules (see `docs/WEB3-STRATEGY.md` §5). Not optional. | Engage counsel before any token decision. |

---

## 3. The real multiplier: decisions, not tools

Even with every tool above, I am blocked by the open decisions in **CLAUDE.md §9**. The three that unlock the most:

1. **Domain + mailboxes** (unblocks Tier 1 entirely).
2. **Store plan per game** (unblocks Tier 2 and the launch playbook).
3. **Flagship choice** (focuses everything in the strategy and marketing plans).

A tool with no decision behind it sits idle. Answering those three is worth more than any new integration.

---

## 4. What I will NOT ask for

To keep trust and safety clear:

- I will never ask for the owner's personal wallet private keys or seed phrase. Any project wallet is dedicated and lives in the secret store.
- I will never ask for permission to post, email, spend or transact *without a specific draft in front of you* for that exact action.
- I will not create store, chain or social accounts myself; those are owner-only by design.

---

## 5. One-line summary for the owner

> The tools are mostly here. To work at maximum I need **a live site (domain + Vercel + Supabase + analytics)**, **verified mailboxes**, and **a community + social + store accounts you create**. Web3 tooling waits until the games are stable and have real players. The fastest unlock is answering the three decisions above.
