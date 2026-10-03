# Game Registry — Readiness, Blockers and Next Actions

Last refreshed: 3 October 2026. Facts come from each repository's newest branch (README, status and roadmap documents, commit messages). Re-read the repositories before editing this file; `main` is a stub in all four, so always check every branch and compare commit dates.

Stage definitions (S0 to S4) are in `docs/LAUNCH-PLAYBOOK.md`.

| Slot | Game | Repository @ branch | Latest commit seen | Stage | Site status |
|---|---|---|---|---|---|
| 001 | LAST NIGHT | `xam-eth/Scary-Night` @ `arena/01a0cee1-scary-night` | 2 Oct 2026 | S2 public beta candidate | BETA |
| 002 | CHAIN RIDER | `xam-eth/Chain-Rider` @ `arena/01a0ee17-chain-shot-rider` | 2 Oct 2026 | S1 playable web alpha, moving to S2 | TESTING |
| 003 | PHAGOS: DERMAL RIFT | `xam-eth/Phagosinec` @ `arena/01a0d899-phagos-space` | 30 Sep 2026 | S1 (single slice only) | ALPHA |
| 004 | PALM PLANTATION | `xam-eth/Ground-to-Empire` @ `arena/01a0f46d-palm-plantation` | 2 Oct 2026 | S0 prototype | PROTOTYPE |

Note: Scary-Night has a second arena branch, `arena/01a0e66a-scary-night`, last committed 28 September 2026. It is older and is not the source for the listing.

---

## 001 · LAST NIGHT

**What it is.** A 3/4 vampire survival horror. One night lasts five minutes, from 00:00 to 05:00. Blood is health, doors are the defence, a tension director shapes pressure, five predators hunt through an 11-room mansion, and the latest build adds the siege (a crowd at the walls plus a smaller set of fully simulated besiegers).

**How it runs today.** Plain ES modules and canvas served as static files (`python3 -m http.server 8080`). Works on phones with a virtual stick. No build step. A Node server in `server/` handles the store routes (Midtrans), kept out of the static preview.

**Evidence.** The latest arena commit reports the harness at 273 PASS / 0 FAIL with `glbtest`, `clicktest`, `server/test` and `envqa` (40 checks) all green. The README documents the five predators and the objectives system.

**Store readiness.**
- Google Play is the documented target (`docs/PLAY-STORE.md`; store-facing `privacy.html` and `delete.html` exist in the repo).
- A Play build must bill digital goods through Google Play Billing, not Midtrans. The web beta uses a sandbox provider; no real money moves.
- Rewarded ads are off by default. A recent commit records that no billing-capable ad account existed behind the connected Meta token and that TikTok Ads was disconnected, so no paid campaign can run yet.
- A recent commit also records that no live public URL existed. That is the first thing this website can provide.
- Social: the commit history records the X account renamed to `@last_nighti` and a Facebook Page named "Last Night". Confirm handles with the owner before linking.

**Blockers and flags.**
1. Public hosted build and a canonical URL (owner decision on domain).
2. Real billing integration for Play (Google Play Billing) and the account type for Play (see closed-testing rule).
3. **Rights check:** the repo contains large GLB models (a 27.7 MB animated character and a western-gunslinger model). Their source and licence are not documented in the files read. Record provenance and licence before any store submission.
4. **AI disclosure check:** a commit message says room plates were generated. Verify each store's current rules on disclosing AI-generated content before submitting.
5. Steam: no plan is documented.

**Website call to action now.** "Play in browser" (once hosted), newsletter, Discord. Later: "Get it on Google Play".

**Next actions.** Host the static build under `/play/last-night` after owner approval; write the press kit from the 11 room plates and brand assets in `assets/brand`; start the Play closed-testing clock when a release candidate exists.

---

## 002 · CHAIN RIDER

**What it is.** A portrait 9:16, one-thumb crowd shooter. Tap to fire a chain shot, ride inside the bullet, drag to steer it through the crowd. Math gates, a 15-stage map, a three-from-eight card draft, five arena variants. Modelled on the Last War / Top War loop.

**How it runs today.** Three routes: (1) a single-file `chain-rider.html` (about 1.5 MB) that runs offline from a double-click; (2) the folder build via `python3 -m http.server 8000` (Three.js r128 vendored, no build step); (3) the Godot 4.3 project, which also exports Web and Android.

**Evidence.** Meta-layer test in a real DOM: 34 checks, 0 failed. Determinism passes across five variants for 7,200 ticks. Over 30 runs a skilled bot wins 22 and the random bot 1; the session median is 143 seconds against a 60 to 180 second target, with 25 of 30 inside the window.

**Store readiness.**
- Android is a documented target (portrait AAB, build under 100 MB, 60 FPS target on a Snapdragon 660-class device with 200 enemies). Those are **targets**; the README states that colour, lighting and feel cannot be proven without a GPU, and no on-device measurement is documented.
- No Steam plan is documented.

**Blockers and flags.**
1. Real-device performance and feel testing on target phones.
2. The Godot Web export needs cross-origin isolation headers (COOP/COEP) to render; the Three.js builds do not. Hosting must account for that if the Godot Web build is published.
3. The repository commits a 50 MB Godot Linux zip; remove it from version control so the repo stays light.
4. The 11 GLB models are generated by code (`tools/build_assets.py`), which simplifies licensing. Confirm the provenance of the audio and any other third-party material.

**Website call to action now.** "Play in browser" using the single-file or Three.js build, plus Discord.

**Next actions.** Host `chain-rider.html` under `/play/chain-rider`; produce a landscape trailer from the portrait gameplay (capture on a phone in portrait and place it on a branded landscape frame); test on three real Android devices and record frame times.

---

## 003 · PHAGOS: DERMAL RIFT

**What it is.** A native Godot 4.3 2D exploration adventure in an anatomical cutaway. The first slice is Dermal Rift: scout cell, six authored tissue layers, a living Echo, the Deep Cavity, a retracting membrane and a state-aware fascia valve. All changing tissue renders inside the Godot world, with no HUD overlay.

**How it runs today.** Godot Web export served by `./scripts/preview_web.sh` at `http://127.0.0.1:8008`, or the Godot project directly. Validation scripts: `tools/validate_arena_plan.py`, `tools/validate_godot_setup.py`, `tools/validate_expedition_build.py`.

**Evidence.** Roadmap: Milestone 0 is closed; Milestone 1 is in progress; Milestone 2 has a playable proof with hardening remaining. Milestones 3 to 8 (UI/UX, immune hero, dynamic organ runtime, more biomes, exploration loop, combat) are not started by design.

**Store readiness.** None documented. The game is a traversal slice, with no hero, combat or progression loop, so it is not a store product yet.

**Blockers and flags.**
1. The web export is served in the README by a project helper script (`scripts/preview_web.sh`). Confirm what headers a Godot Web build needs on the production host before publishing it.
2. The art is "hand-authored" per the README; confirm authorship and rights in writing.
3. The repository references a commercial game ("Pathogenic") as a benchmark only; keep marketing copy free of comparisons that imply affiliation.
4. The repository commits a 50 MB Godot Linux zip; remove it.

**Website call to action now.** "Follow development" and, when hosting is ready, "Try the Dermal Rift slice". Do not market it as a finished game.

**Next actions.** Publish the slice under `/play/phagos` only after confirming the export and headers; write a devlog on the route-safety rules (minimum width 260 px, one topology change at a time) because that is the most distinctive part of the design.

---

## 004 · PALM PLANTATION

**What it is.** A compact Godot 4 strategy and management vertical slice on a zoomable miniature plantation: camp, shelter, clear forest, 4×4 planting grid, growth, harvest, collection, sale and regrowth.

**How it runs today.** Open the folder in Godot 4.3 or newer, or run the separate Three.js browser preview with `python3 web-preview/serve.py --port 8000`. The browser preview is a different implementation from the Godot game and uses older prototype values; do not present it as the same build.

**Evidence.** Headless Godot 4.3 passes 109 core simulation, 65 crop-model and 110 structural assertions. The browser first cycle delivers 151 kg and sells for $151. Milestones M2 (first harvest) and M3 (crop model) remain open: native rendered output, physical touch input and device FPS are unverified.

**Store readiness.** Not release-ready by the repository's own status file: no save/load, no audio, no localisation, no visible-renderer acceptance, no device performance data. The crop model is a documented scenario, not agronomic advice, and the $1/kg price is an accounting demonstration.

**Blockers and flags.**
1. Visible-renderer, input and device-performance acceptance.
2. Qualified agronomic review of the crop model before any claim about farming reality.
3. Assets: Kenney CC0 packs with provenance files are recorded in the repo. Palm models are stylised and not botanically verified.
4. Screenshots on this site are captures of the browser preview because the repo contains none.

**Website call to action now.** "Try the browser preview" (clearly labelled prototype) and "Follow development".

**Next actions.** Capture proper screenshots from the native Godot build once a visible renderer is available; write a devlog on the evidence-first status audit.

---

## Refresh routine

1. For each repo, list branches and compare the latest commit dates. Use the newest relevant branch.
2. Re-read README, docs and status files plus the last 10 commit messages.
3. Update this registry, the entries in `src/utils/constants.ts` and the README table in one PR.
4. Move the game's stage only when its exit evidence exists, and say so in the PR.
