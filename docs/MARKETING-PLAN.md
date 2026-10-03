# Marketing Plan — Getting Zyvro Known by Gamers and Early Participants

Written 3 October 2026. Goal: build an audience of real players and a first wave of testers before any store launch, using channels Zyvro owns and low-cost channels that have evidence behind them. This plan covers the **flagship LAST NIGHT** in detail and gives lighter plans for the other three games, following the focus decision in `docs/STRATEGY-LONG-TERM.md` §3.

Sources are listed at the end. **(hypothesis)** marks ideas to test, **(verify)** marks facts to confirm before relying on them.

## 1. Principles

1. **The game is the marketing.** Short-form guidance reports a bug clip reaching 400,000 views while the trailer got 4,000. Make moments people want to clip, then clip them honestly.
2. **Own the audience first.** Email, Discord and forum are the only channels no algorithm can take away. Every post and clip points to one of them.
3. **One flagship at a time.** Concentrate effort on LAST NIGHT; the other three run on devlogs only.
4. **Stack the beats.** Trailer, demo or build update, creator push and any festival land within the same few days, not spread across months.
5. **Evidence is the brand.** Show tests, balance numbers and honest status labels. Never inflate a number, a status or a review.
6. **Free before paid.** Third-party data puts paid ads at about $1 to $3 per wishlist, poor value except for retargeting a warm audience near launch. Spend first on the capsule and the trailer.
7. **Be a good citizen in other people's communities.** Ask moderators, follow rules, give before asking.

## 2. Prerequisites — marketing does not start until these exist

Marketing sends people somewhere. If the destination is missing, the effort leaks.

| Needed | Why | Where tracked |
|---|---|---|
| A hosted, playable LAST NIGHT build at a stable URL | A commit in the LAST NIGHT repository records that no live public URL existed; this is the biggest single blocker | `docs/GAME-REGISTRY.md` |
| A game page with trailer or gameplay clip, 6 to 8 screenshots, short and long copy | The "store page is the marketing" principle applies to the website too | `docs/WEBSITE-AUDIT-AND-ROADMAP.md` Phase 2 |
| A newsletter that really stores and confirms signups | Owned channel | Roadmap Phase 2 |
| A Discord with rules, channels and a verification step | Where testers and fans gather | Roadmap Phase 3 |
| A press kit at `/press` with a plain email contact | Journalists and creators need assets in under a minute | Roadmap Phase 2 |
| Analytics events and UTM tags | Measure what works | §10 |
| Real social accounts confirmed by the owner | The repository history records an X account renamed `@last_nighti` and a Facebook Page named "Last Night"; confirm these and any others before linking | `CLAUDE.md` §7 |

## 3. Audiences **(all hypotheses to test)**

| Game | Primary audience | Where they are | What hooks them |
|---|---|---|---|
| LAST NIGHT | Horror and survival fans; viewers of horror streamers and reaction channels | YouTube Shorts, TikTok, Twitch variety streamers, Reddit horror and indie subs | A five-minute night, "you do not have to kill anything", the knock at the door, the siege at the walls, the last-minute dawn |
| CHAIN RIDER | Mobile casual and crowd-shooter players; short-session players | TikTok, YouTube Shorts, Android communities | Riding inside the bullet, ricochets through a hundred enemies, a run that fits one minute |
| PHAGOS | Players of atmospheric exploration and art-forward games | Reddit, itch.io, Bluesky, art-focused social | A living anatomical world and routes that follow organ state |
| PALM PLANTATION | Management and farming-sim fans | Reddit, YouTube long-form | A compact plantation loop; honest "prototype" framing |

Test each with small experiments (a week of clips, a Reddit post, a landing page variant) before committing more effort. Do not assume the audience; measure it.

## 4. The Founding Tester programme (early participants)

### Why testers first

Third-party guidance says to recruit **20 to 50 testers for the first wave and 50 to 200 per wave**, and that twenty engaged testers who write reproducible reports beat a hundred who do not. Testers also seed word of mouth and become the first creators and moderators.

For Google Play, a personal developer account created after 13 November 2023 must run closed testing with at least 12 opted-in testers for 14 consecutive days before production access (see `docs/LAUNCH-PLAYBOOK.md`). Real testers from this programme satisfy that requirement honestly. **Do not buy tester services or fake installs**: Google reviews the app, the test data and the listing before granting access, and fake engagement risks the account.

### What testers get (subject to each game team's approval)

- Early access to builds and patch notes before the public.
- A direct line to the developers in a private Discord channel.
- A "Founding Tester" Discord role and, **with the tester's consent only**, a name in the credits.
- A vote on one or two roadmap choices per wave.
- A cosmetic badge or identity item, never anything that affects power (consistent with the no-pay-to-win stance).
- Public acknowledgement of the fixes their reports caused.

### How they are recruited

Sources, in order of effort:

1. Website visitors: a clear "Join the playtest" button on the LAST NIGHT page that stores real signups (Roadmap Phase 2).
2. Newsletter and Discord members.
3. Reddit: `r/playmygame` and `r/testmygame`, plus genre subreddits. Post a clip or trailer, system requirements and what feedback is wanted. Read each subreddit's self-promotion rules first.
4. Other Discord servers in the genre, via a moderator, offering their members early access in exchange for a mention. In Indonesia, examples found in research are the Indie Games Group Indonesia Discord (about 8,600 members when searched) and the TikTok Gaming Indonesia Discord. Ask first; do not post uninvited.
5. Itch.io and Game Jolt: list the browser build and invite feedback there. Itch.io's browser embed is clean and its audience skews adult indie fans; Game Jolt skews younger and more community-driven.
6. Game jams: use a jam theme to produce a short, shareable build.

### How feedback is run

- A pinned form and a Discord channel per build, with a bug-report template (device, steps, expected, actual, screenshot or clip).
- Weekly triage; a public changelog entry naming what changed and thanking reporters.
- Waves sized to what the team can answer. Never open a wave larger than the triage capacity.
- Collect analytics events with consent (session length, night reached, cause of death, abandon point). These feed balance work and clip selection.

## 5. Channels and tactics

| Channel | Role | Tactics | Evidence |
|---|---|---|---|
| **Website** | Home base and conversion | Game pages, `/play`, newsletter, press kit, devlog | Competitor pattern: games first, press in nav |
| **Newsletter** | Owned retention | Double opt-in; monthly devlog digest and launch alerts | Several competitors skip it, leaving the channel open |
| **Discord** | Community and testing | Rules, channels per game, verification, weekly dev check-in | Primary pre-launch platform in third-party guidance |
| **Forum** | Searchable community memory | Per-game categories, FAQ, bug reports | Paradox treats forums as a main section |
| **TikTok, Reels, YouTube Shorts** | Discovery | 3 to 5 clips per week, cross-posted; bug and near-death clips; before-and-after devlog clips | Authenticity outperforms polish; consistency beats virality |
| **YouTube and Twitch creators** | Trust and reach | Target 1K to 50K subscriber creators in horror; offer early access and a dev interview rather than money | Mid-size creators in genre outperform mega-creators for wishlists |
| **Reddit** | Feedback and slow steady conversion | Devlog posts, playtest posts, honest AMAs | Slow but steady conversion |
| **Itch.io and Game Jolt** | Free web audience | Browser build, devlog, feedback | Both host HTML5 builds |
| **Press** | Credibility and links | Press kit, a single plain email, embargo-free news | Press kit to coverage to store page pipeline |
| **Festivals and events** | Spikes | Smaller festivals before Steam Next Fest; Next Fest only with 2,000+ wishlists | Next Fest amplifies existing momentum |
| **Steam and Google Play pages** | Final conversion | Coming Soon page early; capsule and trailer first | The store page is the marketing |

### Short-form content pillars for LAST NIGHT

Each week produce a batch of clips across these pillars and cross-post them:

1. **The knock.** The door scene and the choice to answer or ignore it. High curiosity, tied to the game's core moment.
2. **Close calls.** Surviving at 4:58, a barricade failing at the last second, the dawn timer.
3. **The siege.** The count of bodies at the walls, the final push. Spectacle and scale.
4. **How it works.** The tension director, the blood economy, how enemies give up. Teaches and builds credibility.
5. **Receipts.** Test numbers, a bug found by the harness, a before-and-after of a fix. Reinforces the evidence brand.
6. **Players.** Tester clips and reactions, with permission.

Format rules: show gameplay in the first second, no logo card, readable captions (many watch muted), vertical 9:16, 15 to 45 seconds, a single call to action pointing at the play link or Discord.

## 6. Twelve-week campaign for LAST NIGHT

Week numbers start the day the prerequisites in §2 are met. The calendar is a template of beats to hit, not a date forecast.

| Week | Focus | Deliverables |
|---|---|---|
| 1 | Foundation live | Play link public, newsletter and Discord open, press kit published, analytics verified |
| 2 | Seed the first 20 to 50 testers | Wave 1 invites from newsletter, Discord and two Reddit posts; private feedback channel |
| 3 | Start the clip engine | 3 to 5 clips; weekly devlog post; first itch.io listing |
| 4 | Wave 1 learnings | Fix top issues; public changelog thanking testers; second batch of clips from real tester footage |
| 5 | Creator outreach round 1 | 30 personalised messages to horror creators with 1K to 50K subscribers; early access and a dev interview offered |
| 6 | Wave 2 | Expand toward 100 testers if triage capacity allows; Indonesian-language clips and a post for local communities |
| 7 | Press and community | Press kit email to a short, relevant list; AMA or Q&A in Discord |
| 8 | Retention check | Review night-completion and return rates; adjust difficulty and onboarding before any new push |
| 9 | Creator outreach round 2 | Follow up with creators who engaged; send updated build notes |
| 10 | Prepare store assets | Capsule, trailer and screenshots finalised; Steam Coming Soon page and Play listing drafted for owner approval |
| 11 | Stack the beats | Trailer drop, build update, creator push and newsletter within the same few days |
| 12 | Review and decide | Report on KPIs; decide on stores, festival entries and the next horizon |

## 7. Creator programme

Targets: creators with 1,000 to 50,000 followers who recently covered horror or indie survival games, in English and Indonesian. Build a list from search and each platform's own discovery, record the date and title of the recent video you reference, and track every message and reply.

What to offer: early access, a short developer interview, behind-the-scenes assets, a spotlight in the newsletter. **Do not pay for undisclosed promotion. Any paid or gifted promotion must be disclosed by the creator under the platform's rules and local advertising law (verify the current requirements).**

Outreach message for LAST NIGHT (English). Send only when the play link exists, and personalise the first line with a real reference to the creator's recent video:

> Hi — I watched your recent horror video and liked how you read the room before opening each door. We make LAST NIGHT, a 3/4 vampire survival horror where one night lasts five minutes and you only have to still be alive at 05:00. You are not a soldier; blood is your health, doors are your life, something knocks, and the house is besieged. It plays free in the browser with no install, and it is in beta, so there are rough edges. Would you like early access to the latest build and a short chat with the developers? Play link and press kit: the website's play page and press page.

Same message in Indonesian:

> Halo — kami suka cara kamu membaca situasi sebelum membuka tiap pintu di video horor terbarumu. Kami membuat LAST NIGHT, game survival horror vampir 3/4 di mana satu malam berlangsung lima menit dan kamu hanya perlu bertahan hidup sampai pukul 05:00. Kamu bukan prajurit; darah adalah nyawa, pintu adalah pertahanan, ada yang mengetuk, dan rumah dikepung. Bisa dimainkan gratis di browser tanpa instal, dan masih beta jadi masih ada bagian yang kasar. Mau coba build terbaru lebih awal dan ngobrol singkat dengan developer? Link main dan press kit ada di halaman play dan press situs kami.

Measure: replies, videos published, views, link clicks by UTM, signups caused.

## 8. Community playbook

- **Rules before invites.** A short code of conduct, an age policy for a horror game (decide with the owner and legal advice), and named moderators.
- **Rhythm.** A weekly dev check-in, a monthly build or devlog, tester spotlights, clip of the week.
- **Respond fast.** Aim to answer the first reply within a day; use the forum for searchable answers and Discord for chat.
- **Local first.** Run Indonesian and English channels. Partner with Indonesian indie communities by asking their moderators; consider crowdfunding platforms such as Kreatora for later projects **(verify its current status)**.
- **Protect the space.** Rate limits, verification, a reporting route and a moderation log.

## 9. Lighter plans for the other games

| Game | Now | Trigger to do more |
|---|---|---|
| CHAIN RIDER | Publish the single-file build; post a weekly ricochet clip; recruit 20 to 50 Android testers for real-device data; instrument retention | Day 1 retention near or above 27% and stable frame times on three real devices |
| PHAGOS | A devlog on route-safety rules and the organ-state design; art posts on Bluesky and Reddit; no acquisition effort | A second biome or a hero reaches a documented milestone |
| PALM PLANTATION | A devlog on the evidence-first audit; browser preview shared in management-sim communities, clearly labelled prototype | Native visible-renderer acceptance passes (milestones M2 and M3) |

## 10. Measurement

### UTM scheme (use on every link outside the site)

`utm_source` = platform (`tiktok`, `youtube`, `reddit`, `discord`, `newsletter`, `itch`, `press`);
`utm_medium` = `organic`, `creator`, `referral`, `email`, `paid`;
`utm_campaign` = `lastnight-wave1`, `lastnight-launch`, etc.;
`utm_content` = the specific clip or post.

### Funnel events (with consent)

`view_game`, `click_play`, `start_session`, `reach_dawn`, `die_at_minute`, `submit_newsletter`, `join_discord`, `join_playtest`, `open_press_kit`, `click_store`.

### Weekly review questions

1. Which clip or post drove the most plays and signups, by UTM?
2. Where do players abandon the game (minute, cause)?
3. How many testers returned for a second session?
4. What did feedback change, and was it shipped and credited?
5. Is triage keeping up with reports?

### Targets (benchmarks, not promises)

Store-page-to-wishlist conversion above 10% once a Steam page exists; day 1 retention near or above 27% for mobile titles; 7,000 wishlists to qualify for Steam's Popular Upcoming list; at least 2,000 wishlists before entering Next Fest. Website and newsletter targets are set after four weeks of real data.

## 11. Budget tiers

| Tier | Spend | Content |
|---|---|---|
| Zero | No cash | Clips from real gameplay, Discord, Reddit posts, itch.io listing, newsletter, outreach with early access |
| Core | A few hundred dollars | A professional capsule (about $150 to $500 for a specialist) and a trailer (about $300 and up), per sourced guides |
| Boost | Small, only after proof | Paid promotion of clips that already perform organically, and retargeting of warm visitors near launch |

Paid advertising accounts: a repository commit records that the connected Meta token had no billing-capable ad account and TikTok Ads was disconnected, so no campaign can run until the owner connects and funds accounts. Never raise spend on a title that has not met its retention or conversion floor.

## 12. Ethics and compliance

- No fake reviews, bought followers, bought installs or undisclosed sponsored posts.
- Describe the game truthfully: label beta and prototype states, do not show footage from a different build.
- Disclose AI-generated material wherever a store or platform requires it (**verify** each store's current rules, because LAST NIGHT's room plates were generated).
- Respect privacy law and platform rules: consent for analytics and email, an unsubscribe in every email, a deletion route.
- Age-appropriate promotion for a horror title; follow each platform's rules on advertising mature content.
- Obtain permission before featuring any tester's name, voice or footage.

## 13. Who does what

| Task | Owner |
|---|---|
| Strategy, calendar, creator lists, outreach and post drafts, KPI reports | Claude (director) |
| Website changes in this repository | The site agent, through issues written by Claude |
| Game builds, feedback fixes, gameplay clips | Each game's team |
| Approving anything outward-facing (posting, emailing, spending, store listings) | The owner |
| Publishing posts | Draft with the Zernio tools; publish only after the owner approves |
| SEO and competitor research | Semrush tools, once the domain exists |

## Sources

- Playtester recruitment, wave sizes and channels: https://firstlook.gg/blog/how-to-find-more-playtesters/, https://betahub.io/resources/how-to-run-closed-beta-test-discord/, https://gtstu.com/2026/06/19/indie-game-community-building-before-launch/, https://dev.to/varukumarnr/how-to-find-playtesters-for-your-mobile-game-guide-2026-3257
- Short-form content and cadence: https://presskit.gg/field-guides/tiktok-indie-game-marketing, https://phantomcave.com/blog/market-indie-game-2026/, https://boomiestudio.com/blog/indie-game-marketing
- Horror creator ecosystem: https://blog.gamesight.io/horror-gaming-creator-ecosystem/
- Browser distribution platforms: https://dinogame.gg/blog/itch-io-vs-game-jolt/, https://appmus.com/vs/itch-io-vs-game-jolt
- Indonesian communities and tactics: https://discord.com/invite/indie-games-group-indonesia-930459320800399390, https://discord.com/invite/tiktok-gaming-id-844917914791706656, https://creativism.id/portfolio/studi-kasus-social-media-kreatora-game-indie/, https://games.gg/news/market-indie-game-no-budget/
- Steam wishlist, Next Fest and creators: https://presskit.gg/field-guides/how-to-build-steam-wishlist
- Capsule and trailer costs and rules: https://gamedevproducer.com/posts/how-to-build-a-steam-page-that-converts/
- Google Play testing requirements: https://support.google.com/googleplay/android-developer/answer/14151465
- Market data: `docs/STRATEGY-LONG-TERM.md`
