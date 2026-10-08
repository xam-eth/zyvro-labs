# Launch Playbook — Website First, Then Google Play and Steam

The website is the first public venue for every Zyvro game. Stores follow. This playbook turns the platform rules and funnel research into gates, so a game moves forward only when it has earned the next step.

**How to read the facts here.** Items marked **(sourced)** come from the platform documentation or guides listed at the bottom, read on 3 October 2026. Items marked **(verify)** are not confirmed and must be checked in the live Steamworks or Play Console documentation before anyone relies on them. Platform rules change; re-read the sources before each launch.

## 1. Stage model

Every game sits in exactly one stage. The site's status label, call to action and store links follow the stage.

| Stage | Meaning | Site status | Primary call to action |
|---|---|---|---|
| S0 Prototype | Internal proof; not fun-tested or not stable | PROTOTYPE | "Follow development" (newsletter, Discord) |
| S1 Playable web alpha | Runs in a browser; known gaps documented | ALPHA | "Play in browser", feedback form, Discord |
| S2 Public beta / playtest | Stable core loop, measured balance, bug intake working | BETA or TESTING | "Play", "Join the playtest", wishlist link live |
| S3 Store pre-launch | Store pages live, trailer and capsule final, demo or beta available | COMING SOON | "Wishlist on Steam", "Pre-register on Google Play" |
| S4 Released | Live on a store | RELEASED | "Buy on Steam", "Get it on Google Play" |

Current placement is in `docs/GAME-REGISTRY.md`.

## 2. Gates to pass before any store submission

A game must pass all of these. Each gate has an owner (Claude prepares, the owner approves where noted).

1. **Playable and stable.** A full session runs without a crash on the target devices. Automated checks pass. Known issues are listed publicly.
2. **Content is rights-cleared.** Every asset has a recorded source and licence: models, textures, audio, fonts and generated imagery. Third-party packs keep their licence files. Where imagery or audio was AI-generated, record that and **(verify)** each store's current disclosure rules before submitting.
3. **Privacy and data.** A public privacy policy URL, a data inventory (what the game and server collect), and an account and data deletion page if accounts exist. Owner and legal sign-off on text.
4. **Payments policy.** A Google Play build must bill digital goods through Google Play Billing. Steam sales go through Steam. A web build can use another processor only where store rules allow it **(verify)**.
5. **Age rating and content descriptors** completed honestly for each store.
6. **Marketing assets final:** capsule or icon, hero art, 6 to 8 purposeful screenshots, trailer opening on real gameplay, short description, long description, tags or category.
7. **Website readiness:** the game page, press kit and newsletter capture are live and verified (see `docs/WEBSITE-AUDIT-AND-ROADMAP.md`).
8. **Support path:** a monitored email, a forum category, a Discord channel and a bug-report route.
9. **Owner approval** for the store listing text, price, regions and launch date.

## 3. Google Play

Facts **(sourced)**:

- A **personal** developer account created after 13 November 2023 must run **closed testing with at least 12 testers opted in, for 14 consecutive days**, before it can apply for production access. Google lowered the minimum from 20 to 12 testers on 11 December 2024. The 14-day clock starts when the 12th tester opts in.
- **Production** and **pre-registration** stay disabled until that requirement is met. After it, the account applies for production access and Google reviews the app, test data and store listing.
- **Pre-registration** campaigns last at most **90 days**; the app must launch to production after that.
- A valid, globally accessible **privacy policy URL** is required.
- Apps that let users create accounts must offer **account deletion** inside the app and through a **web resource**, and must disclose the delete-account URL in the **Data safety** form. Deleting must remove the associated data; freezing the account is not enough.
- Check the current **target API level** requirement in the Play Console before building the release bundle **(verify)**.

Practical sequence:

| When | Action |
|---|---|
| Now | Decide personal or organisation account (owner). Create the developer account. |
| Release candidate minus 4 to 5 weeks | Upload a test build to a closed testing track. Recruit 12 or more real testers from the newsletter and Discord and keep them active for the full 14 days. |
| Release candidate minus 2 weeks | Apply for production access. Complete the Data safety form, content rating and store listing. |
| After production access | Optionally open pre-registration (90-day maximum). |
| Launch | Staged rollout, monitor crash and ANR rates, answer reviews. |

Per-game notes: LAST NIGHT has `docs/PLAY-STORE.md`, `privacy.html` and `delete.html` in its repository and a documented rule that Play builds must use Google Play Billing, not Midtrans. CHAIN RIDER documents an Android build path in its Godot setup guide.

## 4. Steam

Facts **(sourced)**:

- **Steam Direct app fee: $100 per game.** It is recouped after the game reaches $1,000 in adjusted gross revenue from Steam sales and in-app purchases.
- A **"Coming Soon" page must be public for at least two weeks** before release.
- There is a **21-day wait** between paying the app fee and being able to release.
- Valve runs a **review of the build and store page**, typically one to five days.
- Wishlist behaviour from third-party guides: first-week conversion benchmarks of about 15% (under 5K wishlists), 20% (5K to 40K), 23% (40K to 100K) and 25% (100K+). About 7,000 wishlists is the threshold for Popular Upcoming. Enter Steam Next Fest with at least 2,000 wishlists, ideally more.
- Capsule art converts. Guides cite a **460×215 header capsule** and a **374×448 vertical capsule**; one guide lists a 467×181 header, which conflicts. Use the exact sizes in the Steamworks "Store Graphical Assets" documentation **(verify)**.

Practical sequence (guide-derived timeline, adjust to readiness):

| When before launch | Action |
|---|---|
| 6 to 12 months | Pay the app fee, complete the identity and tax review, publish the Coming Soon page, link it from the website game page. Start small festivals. |
| 3 to 4 months | Release a playable demo, collect feedback, ship updates. Publish the press kit. |
| 2 months | Final Next Fest entry (only with 2,000+ wishlists). Start creator outreach: mid-size creators in the same genre. |
| Final 4 weeks | Stack the beats close together: trailer, demo update, creator push, festival. Mail the newsletter and Discord. |
| Launch week | Push hardest on days 1 and 2; watch conversion; reply to reviews and forum threads. |

Steam is not currently planned for any Zyvro game in any repository. See the open decisions in `CLAUDE.md` §9.

## 5. The website's job at each step

| Step | Website responsibility |
|---|---|
| Announce | Game page with trailer and screenshots; newsletter capture; Discord invite; press kit |
| Pre-launch | Wishlist and pre-register buttons with the real store URLs; a devlog showing visible progress; demo or browser build; playtest signup |
| Launch | Hero switches to "Out now" with store badges; news post; press kit refreshed with review-code request route |
| Post-launch | Patch notes, forum category and FAQ, a "how to report a bug" page, regional store links |

Always keep the same game name, tagline and key art across the website, the store pages and social posts. Every Google search for a game's name should lead to a page the studio controls.

## 6. Pre-launch checklist (copy into the PR for each game)

- [ ] Stage and status label match `docs/GAME-REGISTRY.md`
- [ ] All progress metrics carry evidence from the repository
- [ ] Asset licences recorded; AI-generated assets disclosed where required
- [ ] Privacy policy, terms and deletion page live
- [ ] Trailer opens on real gameplay and is embedded without autoplay
- [ ] 6 to 8 screenshots, 1920×1080 minimum, no debug overlays or placeholder art
- [ ] Short description within 160 characters, long description written from the repo
- [ ] Press kit zip downloadable from the main navigation
- [ ] Newsletter capture verified with double opt-in
- [ ] Discord and forum category exist and are moderated
- [ ] Store pages created, reviewed by the owner
- [ ] Analytics events verified in the funnel
- [ ] Rollback plan and support contact published

## Sources

- Google Play pre-registration: https://support.google.com/googleplay/android-developer/answer/9859047
- Google Play testing requirements for new personal accounts: https://support.google.com/googleplay/android-developer/answer/14151465
- Google Play account deletion requirements: https://support.google.com/googleplay/android-developer/answer/13327111
- Google Play user data policy: https://support.google.com/googleplay/android-developer/answer/10144311
- 12 testers for 14 days explained: https://dev.to/nabeel_saleem_c2b8bc60839/google-play-12-testers-for-14-days-the-complete-guide-2026-5105
- Steamworks Coming Soon: https://partner.steamgames.com/doc/store/coming_soon
- Steamworks onboarding: https://partner.steamgames.com/doc/gettingstarted/onboarding
- Steam Direct fee and requirements: https://datahumble.com/blog/steam-direct-fee-requirements-roi-2026-guide
- Steam wishlist tactics and benchmarks: https://presskit.gg/field-guides/how-to-build-steam-wishlist
- Steam page conversion rules: https://gamedevproducer.com/posts/how-to-build-a-steam-page-that-converts/
- Steam page optimisation overview: https://altheragames.com/en/blog/steam-page-optimization
