# Web3 Strategy — Funding, User Acquisition and the Path On-Chain

Written 4 October 2026. This plan is for the owner to decide on, not for Claude to execute. Everything here touches money, legal matters and public commitments, so under CLAUDE.md rule 5 it stays a proposal until the owner approves, and the token and legal parts need professional counsel. Facts are sourced at the end; figures from grant programs and on-chain studies change fast, so **verify each number against the program's own page before relying on it.**

## 0. The owner's framing, confirmed

The owner's instinct is correct and this plan is built on it:

> Build the games to full, stable versions **and** earn a real user base in Web2 first. Only then take them on-chain, and use Web3 (grants, token, on-chain economy) as the funding and growth layer, not as the product.

The research backs this exact order. The chains that give grants **evaluate traction, reputation and real users** before they fund (see §3). And airdrops given to an audience that does not exist yet simply attract extractors (see §4). So Web2 traction is not a detour before Web3 — it is the precondition that makes Web3 funding and user acquisition work at all.

## 1. Where Web3 fits in the horizons

This maps onto `docs/STRATEGY-LONG-TERM.md`. Web3 is deliberately late.

| Horizon | Web2 state | Web3 action |
|---|---|---|
| H0 Foundation | Site live, honest, measured | **Research and relationships only.** Watch Ronin/Arbitrum/Immutable programs. No wallet, no token, no promise. |
| H1 First audience | Flagship in beta, newsletter + Discord growing, retention measured | **Prepare the grant pitch** (traction is now real). Still no token. |
| H2 First launches | A game launched, real retention and revenue data | **Apply for an ecosystem grant** to fund on-chain development. Optional: a non-token on-chain feature (e.g. verifiable ownership of a cosmetic) as a pilot. |
| H3 Portfolio | Stable games, a real base, recurring revenue | **Consider a token / on-chain economy** only if a game's design genuinely needs it and legal clears it. Never before. |

**The gate, stated plainly:** no token, no airdrop and no public Web3 promise until at least one game is stable and has a measured, retained user base (the KPIs in `docs/STRATEGY-LONG-TERM.md` §7). Announcing a token early is the single most common way small studios attract farmers and regulatory attention at the same time.

## 2. Why Web3 funding is realistic when Web2 VC is not

The owner is right that Web2 investor money is hard for a pre-revenue indie studio. Web3 ecosystem grants are a different instrument:

- They are **grants, often milestone-based**, not equity rounds — you keep ownership.
- They are **actively trying to attract builders** to their chain, so the bar is "will you bring real users and on-chain activity," not "will you 10x our fund."
- They are **non-dilutive** and can be stacked with later revenue.

The catch, and it is the whole point: they fund **builders who demonstrably bring users**. That is why the Web2 base comes first. A grant application with real retention and a live player community is credible; one with four unreleased prototypes is not.

## 3. The grant funding path (primary: Ronin)

Ronin is the natural first target: it is a gaming-first chain (home of Axie), it is active in Indonesia and Southeast Asia, and it runs a current grants program with a gasless onboarding path that fits a mobile-first, non-crypto-native audience.

### Ronin Ecosystem Grants (as researched 4 Oct 2026 — verify on the program page)

- Total program around **$10M in RON**.
- **Builder Grants:** up to **$300,000 in RON** for development, integrations, smart-contract audits and deployment.
- **Waypoint Gas Grants:** up to **$20,000 in RON** to cover gas for onboarding users through Ronin's **Waypoint** social-login wallet (no seed phrase for the player — important for a mainstream audience).
- **Ronin Forge:** an accelerator for experimental game studios, **$50,000** grants plus resources and potential follow-on investment for projects showing traction.
- **Process:** no deadlines; applications reviewed every 3–4 weeks; milestone-based funding.
- **What they evaluate:** existing traction, project reputation, team execution, ability to bring new users and on-chain activity, and real utility. Every one of those is something the Web2 phase produces.

### Alternatives to keep warm (do not spread thin)

- **Arbitrum Gaming Catalyst Program:** a very large pool (around 200M ARB, ~$215M, over three years) for games on Arbitrum/Orbit/Stylus. Bigger fund, broader (not gaming-exclusive culture), EVM.
- **Immutable:** zkEVM stack, Passport wallet and developer tooling for games.

Recommendation: **target Ronin first** (best cultural and regional fit, gasless onboarding, Forge accelerator sized for exactly our stage), keep Arbitrum and Immutable as named alternatives, and do not apply to all three at once — a focused, credible application beats three generic ones.

### The pitch (structure Claude will draft when traction is real)

A grant pitch and an investor pitch share a spine. Claude can prepare the deck and the written application; the owner supplies the facts marked **(owner)** and approves before anything is sent.

1. **One-line hook.** What the studio is and why it matters, in a sentence.
2. **The studio (owner).** Real team, track record, location, why Indonesia/SEA is an edge.
3. **The games.** The portfolio, each with its honest status and *evidence* (test counts, balance data, milestones) — this evidence-first style is itself a differentiator.
4. **Traction (the core).** Players, retention (D1/D7/D30), wishlists, newsletter, Discord, creator coverage — real numbers from the Web2 phase. No traction, no pitch.
5. **Why this chain.** How we bring *new* users and on-chain activity to Ronin specifically (gasless Waypoint onboarding of a mainstream mobile audience), which is exactly what they fund.
6. **The on-chain plan.** What goes on-chain and why it genuinely helps players (verifiable ownership, interoperable cosmetics, player-run economy) — never "because tokens."
7. **Milestones and the ask.** Specific deliverables tied to grant tranches; the amount and what each tranche buys (audit, dev, onboarding gas).
8. **Fair-player commitment.** No pay-to-win, no predatory mechanics — the stance already in LAST NIGHT's design. This de-risks the studio in the grantor's eyes.
9. **Compliance.** How the token/airdrop question is handled under Indonesian law (§5), showing the grantor we are not a liability.

Deliverable when the gate is met: a `pitch/` folder with the deck (built with the slide tooling available in this session), the written grant application, and a data-room one-pager.

## 4. User acquisition: the strongest honest strategy

The owner asked for the strongest way to pull users — airdrop or anything. Here is the honest version, because a weak version wastes the one launch window.

### The airdrop reality (why a pure airdrop is a trap)

From on-chain research (verify, but the direction is consistent across sources):

- About **64% of airdrop recipients sell immediately** at the token event, and most stop using the protocol within months.
- Roughly **88% of airdropped tokens lose value within three months**.
- The audience an airdrop attracts is largely **mercenary**: Sybil farms and extractors. LayerZero removed **59%** of wallets from one distribution; Linea filtered around **800,000** wallets before an airdrop.

A pure "come for the airdrop" campaign therefore buys a spike of users who leave the moment they are paid, and it attracts bots that cost you real money. It also conflicts with the no-pay-to-win, fair-player brand.

### The strategy that actually works: earn the player in Web2, reward real play on-chain

Reframe the token/airdrop from *bait* to *retroactive recognition of genuine play*. The sequence:

1. **Acquire in Web2, free.** Browser-playable builds, the Founding Tester programme, short-form clips, creators, Discord — all in `docs/MARKETING-PLAN.md`. This builds a base of players who are there for the game.
2. **Points before any token.** Run a transparent, off-chain **play-and-contribution points** system (sessions, objectives, bug reports, tester badges, referrals of real players). No promise that points equal tokens. Points reward the behaviour you actually want and let you measure engagement.
3. **Gasless on-chain onboarding.** When a game goes on-chain, use Ronin **Waypoint** social login so a mainstream player gets a wallet without a seed phrase. The grant's Waypoint gas allowance can cover their gas. The player never feels "crypto friction."
4. **Retroactive, Sybil-resistant reward (if and when a token exists).** Reward *demonstrated genuine play*, weighted by real engagement, with Sybil filtering and caps — not "connect a wallet and claim." This is the opposite of a farmable airdrop: you are paying the players you already retained, which rewards loyalty instead of attracting extractors.
5. **Ownership and economy as the real draw.** The durable Web3 benefit to players is not a one-off airdrop; it is **true ownership** of items, **interoperability**, and a **fair, transparent economy** where value flows to players, not just the studio. Design the on-chain feature around that, consistent with the no-pay-to-win rule.

### Sybil resistance and fairness (non-negotiable if a token happens)

- Weight rewards by genuine in-game behaviour, not wallet count.
- Use on-chain analytics and clustering to filter farms; expect to remove a large share of applicants.
- Cap per-player rewards; vest over time so recipients have a reason to stay.
- Publish the rules before the snapshot. Transparency is both fairer and better PR.

### Benefit to the user, restated

A player's reasons to come and stay, in order: **the game is good and free to try → their feedback shapes it → they own what they earn → a fair economy shares value with them → recognition for early loyalty.** The airdrop, if it ever happens, is the last item, not the first.

## 5. Legal and regulatory (Indonesia) — do not skip

This is the part that sinks studios. As researched (verify with counsel):

- Regulatory authority over crypto assets moved from **Bappebti to OJK** (effective Jan 2025); OJK now oversees both trading and the *offering* of digital assets.
- Crypto is **legal to trade** as a regulated digital financial asset but **illegal as a means of payment** — the rupiah is the only legal tender. So in-game purchases for Indonesian players stay in rupiah/e-wallets; a token is an asset layer, not a payment rail.
- **Airdrops are not specifically regulated** yet and can be legal if they do not violate other rules — but "not specifically regulated" is not "safe," and an OJK framework for token offerings (ICO/ITO) was in draft (public consultation Sep 2025) with a compliance deadline around **1 July 2026**.

**Implications for the plan:**
1. No token, airdrop or token-like promise without Indonesian crypto counsel signing off first.
2. Keep Web2 payments entirely in rupiah/e-wallets and, for Play builds, Google Play Billing. The token never becomes a payment method.
3. Prefer a **grant-funded, no-token** on-chain pilot first (ownership of a cosmetic, verifiable items) so the studio gets on-chain credibility without the regulatory weight of a token.
4. A token is a Horizon-3 decision at the earliest, made with counsel, not a launch tactic.

## 6. Early access / beta now (what the owner raised)

The games are not finished, but they do not need to be to start. This is already the plan:

- **LAST NIGHT** can run a public **beta / Founding Tester** program now (it is at beta stage) — hosted web build + closed Play testing.
- **CHAIN RIDER** can run an **early-access** web build and an Android closed test for real-device data.
- **PHAGOS / PALM** stay **devlog + playable preview** ("try the prototype"), clearly labelled.

Early access does three things at once: it gives players something now, it generates the retention data a grant needs, and it builds the base that makes a future on-chain reward meaningful. It is the bridge between "still in dev" and "ready for Web3."

## 7. Risks specific to Web3

| Risk | Mitigation |
|---|---|
| Launching a token too early attracts farmers and regulators | Hard gate: no token until a game is stable with a retained base; counsel first |
| Airdrop drains cash to extractors | Retroactive, Sybil-resistant, play-weighted rewards; points before token; caps and vesting |
| Grant chases the studio off its roadmap | Only take a grant whose milestones match the roadmap we already have |
| Crypto friction scares a mainstream audience | Gasless social-login onboarding (Waypoint); the player need not know it is on-chain |
| Regulatory change in Indonesia | Counsel on retainer; token is an asset layer, never a payment method; keep rupiah rails |
| Brand damage ("another cash-grab Web3 game") | Lead with the game and fairness; Web3 is ownership and shared value, never pay-to-win |

## 8. Decisions this adds for the owner (append to CLAUDE.md §9 when answered)

1. **Chain target:** approve Ronin as the primary grant target, with Arbitrum/Immutable as alternatives.
2. **Sequencing gate:** confirm that no token/airdrop happens before a game is stable with a measured, retained user base.
3. **On-chain pilot:** allow a *no-token* on-chain ownership pilot at Horizon 2 to build credibility, or wait entirely.
4. **Legal:** agree to engage Indonesian crypto counsel before any token decision.
5. **Grant application timing:** apply only once the flagship's beta traction is real (Horizon 1→2).

## Sources

- Ronin Ecosystem Grants (Builder up to $300k, Waypoint gas up to $20k, Forge $50k, ~$10M, milestone-based): https://roninchain.com/grants-program, https://www.blockchaingamer.biz/news/36670/ronin-10-million-dollar-ecosystem-grants-program/, https://games.gg/news/sky-mavis-ronin-forge-program/
- Arbitrum Gaming Catalyst Program (~200M ARB / ~$215M): https://games.gg/news/arbitrum-gaming-catalyst-program/, https://www.theblock.co/post/282651/arbitrum-eyes-400-million-crypto-gaming-fund-with-proposal-to-dao
- Immutable gaming stack: https://www.blockchaingamer.biz/features/41347/top-50-blockchain-game-companies-2026/
- Airdrop failure and mercenary/Sybil data (64% sell at TGE, 88% lose value in 3 months, LayerZero 59%, Linea ~800k): https://hackernoon.com/88percent-of-airdrops-fail-and-nobody-in-web3-wants-to-admit-it, https://formo.so/blog/what-are-sybil-attacks-in-crypto-and-how-to-prevent-them, https://paragraph.com/@laurenmae/how-to-build-a-crypto-community-in-2026-that-isnt-just-airdrop-farmers
- Indonesia crypto regulation (Bappebti→OJK, trade legal / not payment, airdrop unregulated, ITO framework + July 2026 deadline): https://www.lightspark.com/knowledge/is-crypto-legal-in-indonesia, https://www.abnrlaw.com/news/at-long-last-indonesia-is-set-to-issue-a-landmark-crypto-offering-regime, https://cryptonews.com/news/indonesia-crypto-regulation-mica-deadline-july-2026/
