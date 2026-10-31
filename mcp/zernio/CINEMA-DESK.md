# CINEMA DESK // cinematic transmissions with video-shotcraft

> Motion-picture arm of the Receipt Desk. Built on
> [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)
> (Apache-2.0): 124+ tuned shot recipe cards, a validated Remotion template and
> a sound-design library. We use its **autonomous free-creation pipeline** and
> re-skin every frame with the house tokens — the skill's own rule: inherit shot
> structure, motion grammar, rhythm and tuned parameters; fonts, palette and
> material must grow from the product.

## House tokens (the only skin allowed)

void `#05080c` · acid lime `#D7FF3F` · amber ledger `#ffb020` · ink `#e8ffe0` ·
dim `#8aa08a` · monospace ALL-CAPS · film grain 5% overlay + vignette on every
shot · 1280×720 @30fps (the same 16:9 as every capture).

## The W44 transmission (`public/assets/media/video/exocomplict-teaser-w44.mp4`)

Eight shots, 24 s, shot grammar lifted from the recipe cards with their tuned
parameters:

| # | Frames | Shot | Card grammar used |
|---|---|---|---|
| 1 | 0–165 | crane rise over the FIRST LIGHT gate | `crane-rise-reveal`: hold 24f + breath 1.5%, rise 102f bezier(0.2,0,0.25,1) scale 3→1, focus dim 62%→0 over 26f |
| 2 | 165–255 | terminal title material | typewriter + letterspace 18→6, amber cursor blink |
| 3 | 255–330 | crash zoom into the arena | `crash-zoom-punch`: pre-hold 30f, punch 6f zoom 2.6, rebound 5%, shake 14px·e^(−t/1.8), flash 8f exp decay, surround dim |
| 4 | 330–390 | whip pan arena → Frostline | speed-driven blur 26px·sin(πt), dual-layer translate |
| 5 | 390–480 | speed ramp walk → defense gate | slow 1→1.15 over 55f, snap 15f into the gate frame |
| 6 | 480–600 | ledger odometers | gauge ceremony: count-up bezier, 4f stagger, mechanical overshoot settle |
| 7 | 600–660 | amber ledger line | typewriter, amber = UNVERIFIED ink |
| 8 | 660–720 | grain dissolve wordmark | `grain-dissolve`: feTurbulence 0.9→1.3 + feDisplacementMap 0→52→0, seed=floor(t·46), crossfade at t 0.60–0.71, lock at 0.68–0.90, three-stage bloom |

Sound sentence (template audio, Apache-2.0): riser → impact → swoosh → snap →
sparkle → whoosh, nailed to the shot cuts at frames 0/291/336/455/492/658.

## Render pipeline (sandbox-side, like every other capture)

```bash
cd mcp/zernio/video
npm install                                  # remotion + @sparticuz/chromium
node -e "<extract al2023 libs into .cache>"  # same bootstrap as capture.mjs
LD_LIBRARY_PATH=$PWD/.cache/al2023-lib/lib:$LD_LIBRARY_PATH \
  npx remotion render ZyvroTeaser out/teaser.mp4 \
  --browser-executable=/tmp/chromium --concurrency=2
# per-shot QA stills, eyeball before shipping:
npx remotion still ZyvroTeaser out/qa/f520.png --frame=520 --browser-executable=/tmp/chromium
```

The sandbox's sparticuz chromium is Remotion's browser too — one browser for
game recording, source cards and cinema. Copy the finished cut to
`public/assets/media/video/` and reference it in `content/sources.json` with
`media.kind: "video"`; the runner presign-uploads `.mp4` as
`mediaItems[{type:"video"}]` plus a poster frame.

## Rules for the next transmission

- Real captures only as plate material — never hand-faked product UI
  (skill principle 1); the game frames ARE the textures.
- One motion technique stars per shot; after key info lands, the frame
  breathes (skill principle 4).
- Every cut keeps the ledger honest: if a number in the video is unverified on
  device, the amber line says so before the wordmark.
- QA stills archived under `out/qa/` (gitignored) per shot version; the
  shipped mp4 is the only artifact that enters Git.
