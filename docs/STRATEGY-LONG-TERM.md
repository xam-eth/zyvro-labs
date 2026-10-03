# Long-Term Strategy — How Zyvro Competes and Benefits Players

Written 3 October 2026. This is a plan, not a forecast. It uses facts from the four game repositories and third-party market data (sources at the end). Third-party figures differ between publishers; wherever they do, the range is shown. Judgments that are Claude's own are labelled **(judgment)**; ideas that need testing are labelled **(hypothesis)**.

## 1. Where Zyvro stands

### Assets (verified in the repositories)

| Asset | Evidence |
|---|---|
| Four games at different stages, all playable in some form | LAST NIGHT beta, CHAIN RIDER MVP v2, PHAGOS Dermal Rift slice, PALM PLANTATION prototype 0.2 (`docs/GAME-REGISTRY.md`) |
| A culture of measurement | Bot-driven balance harnesses (CHAIN RIDER: 30 runs per configuration; LAST NIGHT: 273 checks passing), deterministic simulation, headless Godot suites (PALM PLANTATION: 284 assertions) |
| Zero-install play | LAST NIGHT is static ES modules; CHAIN RIDER ships a single 1.5 MB offline HTML file; PHAGOS and PALM have web builds or previews |
| Fair-monetisation instincts | LAST NIGHT's design notes state that everything in the store is also earnable with shards and that money buys relief and identity, never power |
| Visible Indonesian-market orientation **(judgment, inferred)** | LAST NIGHT prices in IDR through Midtrans; CHAIN RIDER's documentation is in Indonesian |
| A distinctive studio identity | The "Game OS" interface, brand kit and evidence-based game cards |

### Weaknesses (be honest)

| Weakness | Why it matters |
|---|---|
| No audience yet | No newsletter, no Discord linked, no forum, no creators, no wishlists; the funnel is unbuilt |
| Four games, four genres, four engines or stacks | Marketing and support effort splits four ways; no cross-promotion between audiences **(judgment)** |
| Team size and capacity unknown | A studio that cannot sustain a devlog, support and community will lose to one that can |
| No documented plan for Steam or release dates | Nothing for wishlists or festivals to aim at |
| Assets not fully rights-cleared | LAST NIGHT's GLB models and generated room plates need provenance and store-disclosure checks |
| Unmeasured performance on real phones | CHAIN RIDER's 60 FPS target is a target; PALM's native visuals and input are unverified |

## 2. The market Zyvro is entering

**Steam is saturated and winner-take-most.** Third-party trackers count about 19,600 to 20,300 Steam releases in 2025, up from about 18,500 in 2024. One analysis found only 608 games (2.99%) reached 1,000 reviews and that 66% earned under $1,000 in total. The five biggest indie releases of 2025 together earned over $500 million, roughly 3% of Steam's annual revenue. Median indie revenue estimates range from about $249 to $570 depending on the tracker. Reading: shipping is not enough, and the audience must exist before launch.

**Indonesia is a very large, mobile-first market.** Estimates put players at roughly 153 to 175 million. Revenue estimates vary widely, from about $0.56 billion (app-store only) to $4.28 billion (broad), with one Newzoo-class figure of about $1.9 billion for 2025 (mobile about $1.38 billion, PC about $270 million, console about $134 million). For payments, one report found about 39% of gaming payments go through e-wallets (GoPay, OVO, DANA, ShopeePay, LinkAja), 27% bank transfer, 17% cards and 11% cash, with carrier billing also common. Reading: a payments stack that supports local e-wallets and a mobile-first product are both essential for Indonesian players, and Google Play is the main storefront.

**Mobile retention is brutal.** A good result in 2026 is about 27% on day 1, 8 to 14% on day 7 and 3 to 7% on day 30. By genre the medians are: strategy about 25% / 8% / 3%, simulation about 30% / 9% / 3%, RPG about 31% / 10% / 3.5%, hyper-casual about 29% / 6% / 1.4%. Reading: a game must prove its loop with its own retention numbers before spending on acquisition.

**Short-form video and creators decide discovery.** For horror, creators and reactions drive attention; one source reports 13 billion-plus views for horror on YouTube Shorts and that variety streamers drive most horror viewership. Short-form guidance says authenticity beats polish (a bug clip with 400,000 views against a trailer with 4,000) and recommends three to five short videos a week. Paid ads are generally poor value for indie wishlists ($1 to $3 each).

## 3. Strategic thesis

> **Zyvro wins by being the studio players can trust and watch being built: playable instantly, fair with money, and honest about progress. It does this through one flagship at a time, with owned channels it controls, in a market it understands.**

Five moves follow from that.

### Move 1 — Focus: one flagship, one growth title, two incubators **(judgment)**

Scoring the games on facts from the repositories:

| Criterion | LAST NIGHT | CHAIN RIDER | PHAGOS | PALM PLANTATION |
|---|---|---|---|---|
| Readiness | Beta, 273 checks passing | MVP v2, 34 meta checks, balance measured | One slice, no hero or combat | Prototype, native visuals unverified |
| Playable with zero install | Yes (static host) | Yes (single HTML file) | Godot Web export | Browser preview (separate implementation) |
| Session length suits short clips | 5-minute nights | 1 to 3 minute runs | Exploration, slower | Management, slower |
| Genre fits creator and clip culture | Horror: strong creator pull (sourced) | Crowded mobile crowd-shooter space **(judgment)** | Niche | Niche |
| Monetisation clarity | Defined (shards plus store, Play Billing needed) | Not documented | None | None |
| Biggest risk | Rights and billing | Real-device performance | Scope | Verification gates |

Recommended roles:

- **Flagship: LAST NIGHT.** Furthest along, zero-install, short sessions that make clips, and a genre with proven creator pull. All early marketing weight goes here.
- **Growth title: CHAIN RIDER.** The mobile bet. It needs real-device performance data and retention analytics before any acquisition spend.
- **Incubators: PHAGOS and PALM PLANTATION.** Devlog-only until each reaches a documented gate. Their value now is craft credibility and a pipeline of future launches. Do not spend acquisition effort on them.

The owner may overrule this; if so, record the decision in `CLAUDE.md` §9.

### Move 2 — Build owned audience before spending anything

A studio that owns an email list, a Discord and a forum does not depend on any algorithm. Third-party data says Steam's wishlist thresholds (7,000 to qualify for Popular Upcoming, 2,000 minimum before Next Fest) are reached by audiences built months earlier. See `docs/MARKETING-PLAN.md` for the programme.

### Move 3 — Make "evidence" the brand

Competitors show trailers. Zyvro shows receipts: test results, balance runs, milestone counts, honest status labels ("this is a prototype"). That is already the culture in the repositories and on the game cards. Turn it into a public promise: every claim traceable, every status honest, every release note specific. This earns trust from both players and press, and it costs nothing but discipline.

### Move 4 — Fair, local, low-friction commerce **(judgment, grounded in the repos)**

- No pay-to-win. Everything purchasable should also be earnable by play, as LAST NIGHT already states.
- Prices in rupiah, e-wallet support (GoPay, OVO, DANA, ShopeePay, LinkAja), and, for Play builds, Google Play Billing as the store requires.
- Clear refunds, privacy and data-deletion pages (also a Play requirement).
- Free browser play as the front door; paid items are convenience and identity.

### Move 5 — Operate like a studio, not a project

A weekly rhythm (review the funnel, ship a devlog, triage feedback), a monthly director review (this document's KPIs), a quarterly strategy review. Teams own their games; the website, community and marketing stack are shared services. See §6.

## 4. Benefits to players (what Zyvro commits to)

Each item is something a player can check.

| Benefit | How it is delivered | How it is verified |
|---|---|---|
| **Play in seconds, free** | Browser builds, offline single-file option | Link to a playable build on every game page |
| **No pay-to-win** | Store sells relief and identity; every item earnable by play | Published item list with earn paths |
| **Honest status** | Alpha, beta and prototype labels, evidence on every game card | Evidence strings tied to repository facts |
| **A say in the game** | Playtests, feedback forms, a public roadmap, tester credits with consent | Public changelog names what feedback changed |
| **Fast, specific patch notes** | Devlog and release notes from real commits | News feed with dates |
| **Privacy and control** | Minimal data, consent, a deletion page | Public privacy policy and deletion route |
| **Works on modest phones** | Performance budgets and real-device testing for mobile titles | Published frame-time results (once measured) |
| **Local payment and language** | Rupiah, e-wallets, Indonesian and English copy | Checkout options listed publicly |
| **A real community** | Discord plus forum with written rules and named moderators | Rules and moderation log are public |

## 5. Roadmap by horizon

Months are counted from the day the owner approves this plan. Treat them as planning slots, not promises; each horizon ends on evidence, not on the calendar.

### Horizon 0 — Foundation (months 0 to 3)

- Website: remove fake interactions and unsourced content, then add routing and SEO, a skippable boot, accessibility fixes, press kit, newsletter, legal pages and analytics (`docs/WEBSITE-AUDIT-AND-ROADMAP.md`).
- Community: Discord live with rules; forum chosen and launched.
- Games: LAST NIGHT hosted publicly; CHAIN RIDER single-file build hosted; asset rights and AI-disclosure checks done.
- Measurement: funnel events and a weekly dashboard.
- **Exit evidence:** a visitor can find, play and subscribe to LAST NIGHT; the site passes the launch-ready checklist in `CLAUDE.md` §6.

### Horizon 1 — First audience and testers (months 3 to 9)

- LAST NIGHT: closed beta waves of 20 to 50 testers, then up to 200; short-form content three to five times a week; first creator seeding.
- Google Play: closed testing for 14 consecutive days with at least 12 real opted-in testers if the account is personal; fix issues.
- CHAIN RIDER: instrument day 1, day 7 and day 30 retention; test on real Android devices.
- Steam: decide the plan for LAST NIGHT; if yes, publish the Coming Soon page early.
- **Exit evidence:** a newsletter and Discord that grow without paid spend; beta retention and crash data; a decision on stores per game.

### Horizon 2 — First launches (months 9 to 18)

- LAST NIGHT store launch on the platforms decided in Horizon 1, with the trailer, capsule, press kit and festival beats stacked in a short window.
- CHAIN RIDER soft launch (one region) only after retention meets the benchmark for its genre; scale spend only on measured return.
- PHAGOS and PALM: reach their next documented milestones; open playtests if they pass their gates.
- **Exit evidence:** launch metrics against the benchmarks (store-page-to-wishlist conversion above 10%, day 1 retention near or above 27% for mobile); a post-mortem published.

### Horizon 3 — Portfolio and sustainability (months 18 to 36)

- Live operations for the launched titles: content cadence, seasonal events, community-made content where the design allows it.
- Reuse what works: shared tooling (the harness approach, the standalone build pipeline, the Game OS shell), shared community and cross-promotion between titles.
- Explore: console or Steam ports for the best performer; a creators programme; Indonesian partnerships (local crowdfunding platforms and indie communities exist).
- **Exit evidence:** recurring revenue covers the studio's running costs, or the plan is revised.

## 6. Operating rhythm and governance

| Cadence | Activity | Owner |
|---|---|---|
| Weekly | Funnel review; devlog or clip batch published; feedback triage; PR and issue review | Director (Claude) with team leads |
| Monthly | KPI review against §7; update `docs/GAME-REGISTRY.md`; content calendar | Director with owner |
| Quarterly | Strategy review: flagship and growth roles, store plan, budget | Owner decides |

Each game team owns its repository and roadmap. The website repository is a shared service: teams do not edit it directly; they ask for changes through issues, and the site agent implements them. Claude, as director, writes the issues, reviews the pull requests and keeps the registry current (`CLAUDE.md` §12).

## 7. KPIs and kill criteria

| KPI | Healthy | Act when |
|---|---|---|
| Store-page-to-wishlist conversion | Above 10%, trending to 15 to 25% | Below 10% (page problem), below 5% (critical) |
| Wishlists before launch | At least 7,000 | Under 2,000 before Next Fest: do not enter |
| Day 1 / day 7 / day 30 retention (mobile) | About 27% / 8 to 14% / 3 to 7% | Day 1 under 20% after 500 sessions: rework onboarding before any ad spend |
| Newsletter and Discord growth | Rising week over week without paid spend | Flat for six weeks: change the content, not the budget |
| Crash and ANR rate | Near zero on tested devices | Any regression blocks a release |
| Creator coverage | Mid-size creators (10K to 100K subscribers) in genre | No coverage after 30 targeted outreaches: revisit the pitch and clip quality |
| Forum health | Replies within a day, reports resolved | Unmoderated reports older than 48 hours: pause growth and fix moderation |

Stop and pivot rules: a game that fails its gate twice goes back to incubator status; marketing spend is never raised on a title that has not met its retention or conversion floor.

## 8. Budget principles **(judgment, with sourced anchors)**

1. Spend on the product first: a professional capsule (about $150 to $500 for a specialist) and a trailer (about $300 and up) before any advertising.
2. Treat paid ads as retargeting for warm audiences near launch, not as discovery ($1 to $3 per wishlist is poor value for most games).
3. Fixed store costs to plan for: Steam's $100 app fee per game (recoupable after $1,000 in sales) and Google Play's developer account fee (**verify** the current amount in the Play Console).
4. Keep four months of running costs in reserve before any launch.

## 9. Risks

| Risk | Mitigation |
|---|---|
| Never reaching an audience in a saturated market | Own the audience first; focus on one flagship; measure weekly |
| Team capacity runs out | Cadence the team can sustain; never promise a feed that will go stale |
| Rights or policy problem blocks a store | Provenance records and AI-disclosure checks before submission |
| Toxic or spam community | Rules, named moderators, rate limits, hosted forum software first |
| Payment policy conflict | Google Play Billing in Play builds; local e-wallets on web builds where allowed |
| Over-promising | Evidence on every claim; status labels reflect repository facts |

## 10. Decisions needed from the owner

1. Approve the flagship, growth and incubator roles in §3.
2. Confirm store plan per game (Play, Steam, web-only).
3. Confirm team size and the content cadence it can sustain.
4. Confirm the budget ceiling for capsule art, trailer and creator gifting.
5. Confirm the community stack (Discord plus forum) and who moderates.

## Sources

- Steam release counts, revenue concentration and median revenue: https://voxbooster.com/blog/indie-game-statistics-2026/, https://ziva.sh/blogs/indie-game-revenue, https://www.shanethegamer.com/research/indie-games-statistics/, https://www.notebookcheck.net/Indie-games-accounted-for-25-of-Steam-s-revenue-in-2025.1189429.0.html
- Indonesia gaming market size and players: https://digitalinasia.com/indonesia-gaming-market/, https://www.statista.com/outlook/amo/media/games/mobile-games/indonesia, https://www.kenresearch.com/industry-reports/indonesia-gaming-market
- Indonesia gaming payment mix: https://knowledge.antom.com/indonesia-gaming-payment-trends-report-mobile-only-nation-community-driven-play-and-a-new-generation-of-paying-gamers, https://xsolla.com/blog/monetize-indonesia-growing-gamer-base-with-localized-payment-options
- Mobile retention benchmarks: https://segwise.ai/blog/mobile-gaming-app-user-retention-strategies, https://business.mistplay.com/resources/mobile-game-retention-benchmarks, https://gamegrowthadvisor.com/blog/2026-03-17-mobile-game-retention-strategies-2026/
- Horror creators and virality: https://blog.gamesight.io/horror-gaming-creator-ecosystem/
- Short-form marketing: https://presskit.gg/field-guides/tiktok-indie-game-marketing, https://phantomcave.com/blog/market-indie-game-2026/
- Steam wishlist and page guidance: https://presskit.gg/field-guides/how-to-build-steam-wishlist, https://gamedevproducer.com/posts/how-to-build-a-steam-page-that-converts/
- Competitor sites: `docs/COMPETITOR-RESEARCH.md`
