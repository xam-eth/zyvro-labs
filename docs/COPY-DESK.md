# Copy Desk — How Zyvro Labs Writes Headlines, Hooks and Build Updates

Status: active standard for the DEV BLOG section, home-page update cards and
every public claim on this site. Written 25 October 2026 after a desk review of
the most-cited practitioners in direct-response copywriting and game-devlog
writing. The rules below are the ones we can defend; the names are the ones
worth reading before you file a post.

---

## 1. The figures we study

| Practitioner | Why they are on the desk | What we took |
|---|---|---|
| **David Ogilvy** (*Ogilvy on Advertising*, *Confessions of an Advertising Man*) | The specific, understated detail beats the adjective. His Rolls-Royce headline works because the reader hears the electric clock and draws the conclusion themselves. | Headlines carry one concrete, checkable detail ("36,000 triangles", "116,282,422 bytes"), never "world-class" or "next-gen". Five times as many people read the headline as the body, so the headline must carry the promise. |
| **Eugene Schwartz** (*Breakthrough Advertising*, 1966) | Awareness levels: a reader who does not know the problem needs education first; a reader who knows it needs the pain amplified; a reader who knows solutions needs differentiation. | Every post opens by naming the state the reader is in (a painted lobby that lies, a download that hides) before selling anything. |
| **Michael Masterson / Mark Ford — the 4 U's** (via *The Copywriter's Handbook* canon) | Headline checklist: Useful, Urgent, Unique, Ultra-specific. | Used as a scoring gate, not a template. Urgency is never invented: our "urgent" is a real date and a real CI run, not a countdown. |
| **Dan Kennedy & Joe Sugarman — PAS** (Problem, Agitate, Solve) | The most reliable arc for a reader who already feels the problem. | Post openings: name the problem (a lobby that shows the wrong soldier), sharpen it (the player learns nothing on screen can be trusted), then the solution that shipped. |
| **E. St. Elmo Lewis — AIDA** (1898) | Attention, Interest, Desire, Action; still the skeleton of a cold-audience page. | The home-page update band: artwork for attention, hook for interest, evidence for desire, exactly one action. |
| **Joanna Wiebe / Copyhackers** | Modern conversion copywriting; headline research as voice-of-customer work, formulas as starting points rather than filler. | Hooks are written from the repository's own words (commit messages, decision docs), not from marketing vocabulary. |
| **Ann Handley** (*Everybody Writes*) | Plain spoken, reader-first prose; "no fluff" is a craft position, not a tone. | Sentences stay short. Jargon only when it is the true name of a thing. |
| **Simon Carless / GameDiscoverCo** | The hook is the differentiator that makes people care, and marketing is interconnected with development from day one; reveal only when you have something competitive to show. | One hook per post, stated in one sentence, and always something you can see in a frame capture. |
| **Devlog craft consensus** (indie devlog writing guides, r/gamedev practice) | Show, don't announce: screenshots and before/after beat prose; failures and reversals out-earn polish; one call to action per post; write for players, not only for other developers. | Every post ships frame captures, keeps its failures visible (two red CI runs are named in UPDATE // 002), and ends in a single action. |

---

## 2. House rules for a Zyvro build update

1. **One hook, one promise.** The `hook` field is a single sentence. If it needs
   two, the post is two posts.
2. **Ultra-specific or silent.** Numbers come from the repository: byte counts,
   test counts, CI run ids, triangle counts, hue percentages. No rounded-up
   marketing numbers, no "up to".
3. **The evidence table is mandatory.** Every post ends with
   `evidence[]`: label, value, and the branch/commit/CI run/document the value
   was read from. A claim without a row does not ship.
4. **The boundary is content.** What is UNVERIFIED is written in the same voice
   as what passed. Headless proof never gets promoted into device, performance
   or human-acceptance claims.
5. **PAS for the opening, FAB for the body, one CTA at the end.** Problem and
   agitation in the first section; features-advantages-benefits in the middle;
   exactly one action at the foot (open the project file or read the source
   branch). Never three buttons competing.
6. **Headline gate (4 U's).** Before filing, score the headline: is it Useful,
   Unique, Ultra-specific? Urgency must be real (a date, a run id) or omitted.
7. **No invented enemies, no fake countdowns, no exclamation marks.** The skin
   is industrial; the copy stays cold and exact. The drama comes from the
   evidence.
8. **Player-facing before developer-facing.** The first section of every post
   says what changed for the person holding the phone. Engine internals come
   after.
9. **Failures stay in.** A reversed decision or a red run that was fixed in
   public is a trust asset. Cut it and the post reads like an ad.
10. **The hook on a card is not the headline.** Compact cards show the hook;
    the reader view shows headline + deck + hook block. Three different jobs,
    three different texts.

---

## 3. Headline patterns that pass the gate (worked examples)

- *The specific, understated detail (Ogilvy):*
  "FOUR THEATRES, ONE 116 MB PROMISE: THE WEB BUILD NOW BOOTS HONEST"
- *The reversed expectation (PAS hook):*
  "THE HERO ON YOUR LOBBY SCREEN IS THE HERO IN YOUR MATCH — AND WE CAN PROVE IT"
- *The contract, not the mood (unique + ultra-specific):*
  "A PALETTE SMALL ENOUGH TO AUDIT: NINE HUES, ONE SCRIPT, ZERO DRIFT"

Rejected patterns: "EXCITING NEWS!!!", "The future of mobile shooters is here",
"Devlog #14", anything a competitor could paste under their own logo.

---

## 4. Where the rules live in code

- `src/utils/constants.ts` → `BLOG_POSTS`: `title` (headline), `deck`
  (standfirst), `hook` (one sentence), `sections`, `pullQuote`, `evidence`.
- `src/components/DevBlog.tsx`: feed cards show `hook`; reader shows headline,
  deck, hook block, evidence table, gallery, one CTA.
- `src/components/MainHub.tsx`: home update band reuses the same fields at
  compact scale; sector cards stay small on purpose — the wire is news, not a
  gallery.
