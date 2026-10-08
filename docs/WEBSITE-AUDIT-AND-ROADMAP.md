# Website Audit and Roadmap

Audit date: 3 October 2026, against the branch `ccr-98c61343-eawv5o`. The target standard is in `docs/COMPETITOR-RESEARCH.md` and the launch-ready checklist in `CLAUDE.md` §6.

Everything in the "Today" column was verified by reading the code or running the built site in Chromium. Anything not verified is marked.

## 1. Audit: today versus launch-ready

| Area | Today (verified) | Launch-ready standard | Gap |
|---|---|---|---|
| **URLs and routing** | One page. `SystemSection` state in `App.tsx` swaps sections; there are no routes. | Each section and game has a shareable, indexable URL. | **Critical.** Nothing can be linked, bookmarked or indexed individually. |
| **SEO head** | `index.html` has a title and a short description only. No canonical, Open Graph, Twitter card, `robots.txt`, `sitemap.xml` or structured data. | Per-route title, description, canonical, OG/Twitter image, `VideoGame` and `Organization` JSON-LD, sitemap. | **Critical.** Shared links show no preview. |
| **Rendering** | Client-side React only; content appears after JavaScript runs. | Pre-rendered or server-rendered HTML for every public route. | **High.** Crawler and link-preview risk. |
| **First screen** | A mandatory boot sequence ("PRESS START") runs before any content. | Games and a working call to action immediately; the boot sequence is optional. | **High.** Costs conversions and crawl access. |
| **Game pages** | A modal opened from the library. Has trailer-less gallery, specs, features, evidence and a repository link. | A page per game with trailer, 6 to 8 screenshots, short and long copy, platform badges and working store or play links. | **High.** No trailer, no store links, no play button. |
| **Wishlist / install CTA** | The "Wishlist & Request Access" button only shows a success message and sends nothing. | A real Steam wishlist link, Google Play link or pre-registration, and a stored newsletter signup. | **Critical.** A fake interaction. |
| **Contact** | `TransmissionTerminal` simulates sending with `setTimeout`. A `mailto:contact@zyvro.com` link exists; the mailbox is unverified. | A verified inbox shown as plain email, plus a form that really delivers. | **High.** |
| **Newsletter** | None. | Double opt-in list with unsubscribe and consent text. | **High.** |
| **Community** | Footer links go to the generic homepages of X, Discord, YouTube and GitHub. No forum. | Real Discord invite, real social handles, an official forum linked from every game page. | **Critical** for the stated brief. |
| **News / devlog** | `ARCHIVE_LOGS` is an in-page lore and dev log list (now seven entries, five grounded in repositories). No dates in a machine-readable form, no feed. | A dated news feed with RSS, fed by real milestones. | **Medium.** |
| **Press kit** | None. | `/press` in the main navigation, with factsheet, logos, key art, screenshots, trailer and a plain email. | **High.** |
| **Legal** | `privacy.html` and `delete.html` exist only inside the LAST NIGHT repository (seen on its 28 September branch; confirm on the newest); the site has no privacy policy, terms or cookie handling. | Privacy policy, terms, consent handling and a public account/data deletion page. | **High.** Google Play requires a privacy URL, and a deletion URL for apps with accounts. |
| **Accessibility** | The viewport tag sets `maximum-scale=1.0, user-scalable=no`, which blocks pinch zoom. A custom cursor and scanline overlay add visual noise. Contrast, keyboard use and focus states are not yet audited. | WCAG 2.2 AA: zoom allowed, 4.5:1 contrast, full keyboard path, focus rings, reduced-motion respected. | **High.** |
| **Performance** | Production bundle is about 322 kB JS (89 kB gzip). Fonts load from Google Fonts. Game images are JPEGs between 40 kB and 380 kB. No `srcset`, lazy loading or AVIF/WebP. Core Web Vitals not yet measured. | Green Core Web Vitals on a mid-range phone; self-hosted fonts; responsive images. | **Medium.** |
| **Analytics** | None. | Consent-based funnel analytics. | **High.** No way to know whether the funnel works. |
| **Mobile** | Layout adapts; not audited at 390 px for every section. | Full pass at 390 px and 1440 px. | **Medium.** |
| **Content integrity** | Crew, origin facts and two archive logs are not backed by any source. | Every claim traceable. | **Critical.** See `CLAUDE.md` §7. |
| **Hosting and domain** | Not deployed from this repo; no confirmed domain. | HTTPS on a canonical domain with preview deployments. | **Open decision.** |

### What already works and should be kept

- The Game OS identity is distinctive and consistent (colour system, typography, HUD, audio).
- The library, hub and command palette read from one data file and now show the four real games with evidence-based status.
- The Lab demos are real interactive canvases and make a good "try something now" hook for visitors.
- The evidence-per-metric approach on the game cards is a trust signal competitors do not offer.

## 2. Target information architecture

Top navigation (keep it to seven items or fewer; the Game OS rail remains as the signature layer, not the only navigation):

```text
Games ─ /games, /games/last-night, /games/chain-rider, /games/phagos, /games/palm-plantation
News ── /news, /news/<slug>, /news/rss.xml
Community ─ /community (Discord invite, rules), /forum, /forum/<category>/<thread>
Lab ─── /lab (existing experiments)
Press ─ /press, /press/<game> (zip downloads and factsheets)
About ─ /about (real team, studio story, contact, careers if any)
Support ─ /support (FAQ, bug reports, account/data deletion)
Footer ─ /privacy, /terms, /cookies, /delete-account, sitemap, social handles
```

Every page carries a sticky primary call to action appropriate to the game's stage: "Play in browser", "Wishlist on Steam", "Get it on Google Play", "Join the playtest" or "Follow development".

## 3. Phased roadmap

Each phase ends with a verified, deployable state. Do not start a phase until the previous exit gate is met, except where noted.

### Phase 0 — Truth and trust (days)
- Resolve every item in `CLAUDE.md` §7: replace or remove the crew roster, confirm or remove origin facts, drop unsupported archive logs, delete the fake wishlist and contact simulations, point social links at real handles.
- Remove `user-scalable=no`.
- **Exit gate:** a reader can verify every sentence on the site from a repository or from the owner.

### Phase 1 — Foundation (1 to 2 weeks)
- Add a router and pre-rendering so each route is real HTML. Add per-route head tags, `robots.txt`, `sitemap.xml` and JSON-LD.
- Make the boot screen skippable and remember the choice.
- Self-host fonts, convert images to AVIF/WebP with `srcset`, lazy-load below the fold.
- Deploy to Vercel on the confirmed domain with preview deployments.
- Add consent-based analytics with funnel events: `view_game`, `click_store`, `click_play`, `submit_newsletter`, `join_discord`, `open_press_kit`.
- **Exit gate:** Lighthouse performance and accessibility at 90+ on mobile for `/` and a game page; link previews render in a messenger and on social.

### Phase 2 — Conversion funnel (2 to 3 weeks)
- Build the game pages: trailer (embedded YouTube, no autoplay), 6 to 8 screenshots that each make a point, short and long descriptions written from the repo, platform badges and the real store or play link for each state of the game (see `docs/GAME-REGISTRY.md`).
- Browser-playable builds where the repositories already support it. LAST NIGHT is plain static ES modules and CHAIN RIDER ships a single-file `chain-rider.html`; PHAGOS has a Godot Web export; PALM PLANTATION has a browser preview. Host them under `/play/<game>` after the owner approves, with each game's own controls and status text.
- Newsletter with double opt-in, stored in Supabase, with consent text, unsubscribe and a confirmation email.
- Press kit: `/press` with factsheet, logos (transparent PNG and vector), key art, screenshots at least 1920×1080 with no watermark, trailer, zip downloads and a plain email.
- Real contact path: a verified mailbox plus a form that writes to a table and notifies the owner.
- **Exit gate:** a visitor can go from a search result to a wishlist or play action in three clicks, and every button does what it says.

### Phase 3 — Community (2 to 4 weeks, can start with Phase 2)
- Discord server with rules, channels per game, a verification step and a linked invite on every game page.
- Official forum at `/forum`. Two routes, owner to choose:
  - **Hosted forum software** (for example Discourse): fastest to a professional result, built-in moderation, search and email digests; costs a subscription and sits on a subdomain.
  - **Custom forum on Supabase:** full brand control and single sign-on with the site; costs engineering time and ongoing moderation tooling (reports, bans, rate limits, spam filtering, email notifications). Requires row-level security on every table, tested.
  Claude recommends hosted software first, to ship sooner and avoid owning a moderation system, then revisit.
- Community rules, code of conduct, fan creation policy and a moderation log.
- **Exit gate:** a new user can register, post, get a reply notification and report abuse, and a moderator can act on the report.

### Phase 4 — News and content engine (ongoing from Phase 2)
- `/news` with dated posts, RSS and a publishing checklist. Source topics from real repository activity, for example the LAST NIGHT siege system, CHAIN RIDER's measured balance results, PHAGOS's route-safety rules and PALM PLANTATION's evidence audit.
- Cadence the team can keep, minimum one post every two weeks. If that cannot be sustained, publish less, never show a stale feed.
- Social distribution through the Zernio tools with owner approval.

### Phase 5 — Store launch operations (per game, see `docs/LAUNCH-PLAYBOOK.md`)
- Steam "Coming Soon" page, Google Play closed testing and pre-registration, capsule art, trailer, demo, creator outreach and festival entries, all timed from each game's real readiness.

### Phase 6 — Growth and measurement (continuous)
- Weekly funnel review: sessions → game page views → store clicks → wishlists or installs → newsletter signups.
- SEO from Semrush research: target queries for each game's genre and name, track rankings, earn backlinks from press and creators.
- A/B test the hero and game-card copy only after the funnel has enough traffic to read the result.

## 4. Metrics

Targets use the benchmarks in `docs/COMPETITOR-RESEARCH.md`; they are guides, not promises.

| Metric | Why | Reference |
|---|---|---|
| Store-page-to-wishlist conversion | Quality of the Steam page | Below 10% is a problem, below 5% is critical |
| Website game-page → store-click rate | Quality of the site's own funnel | Measure first, set the target after 4 weeks of data |
| Newsletter conversion and open rate | Owned-audience health | Measure first |
| Wishlists before Next Fest | Eligibility for a useful festival run | At least 2,000 minimum, ideally 10,000 |
| Wishlists at launch | Launch viability | About 7,000 to qualify for Popular Upcoming |
| Median time to first meaningful content | Performance | Lighthouse mobile LCP in the green |
| Forum health | Community | Weekly active posters, median time to first reply, reports resolved |

## 5. Risks

| Risk | Mitigation |
|---|---|
| Showing unverified or invented content to the public | `CLAUDE.md` rule 2, Phase 0 exit gate |
| The Game OS theme hides the funnel | Conventional navigation shell, skippable boot, store buttons always visible |
| A forum without moderation turns toxic or fills with spam | Hosted forum first, written rules, named moderators, rate limits |
| Stale news feed signals an abandoned studio | Publish only what can be sustained |
| Privacy and children's-data exposure | Minimal data, consent, a deletion page, an age policy decided with legal advice |
| Store timelines slip | Start Play closed testing and the Steam page early (see the playbook) |
| Payments policy conflict | LAST NIGHT must use Google Play Billing for digital goods in a Play build |

## 6. Immediate next three actions

1. Owner answers the open decisions in `CLAUDE.md` §9, starting with domain, team and store plan.
2. Claude executes Phase 0 in one PR.
3. Claude opens the Phase 1 PR: routing, pre-rendering, head tags, skippable boot, accessibility fixes, self-hosted fonts.
