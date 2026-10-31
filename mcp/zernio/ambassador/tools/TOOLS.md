# Vega video toolchain — audit & decisions (W44, round 15)

Brief from the design manager: the first ambassador cut (caption slides over a still
portrait) was rejected. The replacement had to be **scene-per-scene** with a
**living character**, built with the right tools — internal or external open-source.
This file records what was evaluated, what was reachable, and what shipped.

## Reachability matrix (CI sandbox, 2026-10-27)

| Tool | Kind | Verdict in sandbox | Why |
|---|---|---|---|
| **Remotion photo-puppet rig** (internal) | deterministic compositing | ✅ SHIPPED | zero ML weights; mouth/eye state variants of the chosen portrait, switched by the VO RMS envelope (`video/src/vo-envelope.json`) |
| **Godot web build + @sparticuz/chromium** (internal) | in-engine scene capture | ✅ SHIPPED (plates) | real gameplay plates per scene; note: headless Chrome only damages the page on input, so the world renders on-demand — plates + directed camera moves, not raw video |
| **Remotion** (`mcp/zernio/video`) | compositor/renderer | ✅ SHIPPED | CPU render, sparticuz chromium as browser |
| **FaceFusion** (`lip_syncer`: edtalk_256 / wav2lip_96 / wav2lip_gan_96) | photoreal talking-head | ⚠️ runs, weights unreachable | CLI + CPU onnxruntime verified working; model weights auto-download from GitHub Releases (facefusion-assets) → redirect host blocked here |
| **wav2lip-onnx-HQ** (instant-high) | photoreal lip-sync | ❌ | checkpoint dir empty in git; links = Google Drive + GH Releases, both blocked |
| **SadTalker / LivePortrait / EchoMimic** | photoreal talking-head | ❌ | weights on HuggingFace → blocked; no pypi wheels with weights |
| **npm `wav2lip`** | wrapper | ❌ | 16 KB empty wrapper, no inference code |
| **CDP `Page.captureScreenshot` loop** | raw gameplay video | ❌ | ~15–45 s/frame in-world (software GL) — 1 frame per scene |
| **CDP `Page.startScreencast`** | raw gameplay video | ❌ | headless emits zero frames without surface commits |
| **In-page `canvas.captureStream` + MediaRecorder** | raw gameplay video | ⚠️ starved | produced 0–4 s fragments; encoder starves at on-demand render rate |
| **In-page rAF `toDataURL` capture** | gameplay frames | ✅ (plates) | 18–23 fps in-world @640×360 — but pixels only change on input events (on-demand render), so frames are stills in practice → used as scene plates |

Conclusion: **photoreal talking-head weights cannot enter the sandbox by any route**
(HF, GDrive, GH-release redirects all blocked). The living character is therefore built
deterministically (photo-puppet), and the photoreal upgrade is scripted for the owner
machine where the weights download normally.

## What shipped (sandbox-native, `VegaScenes`, 1245f @30, 1280×720)

1. **Scene-per-scene cut** — nine labelled scenes (`SCENE 01 // COLD OPEN` … `SCENE 09 // END CARD`),
   each with its own plate, directed camera move (push / pan / arc / hold), grade and VFX
   (muzzle flashes + shake on the confession beat, amber grade on the unverified beat).
2. **Living presenter** — Vega Arunika as a photo-puppet: base portrait + generated
   mouth-open / mouth-mid / blink variants (`ambassador/rig/`), masked to mouth/eye
   regions, switched by the VO envelope; jaw `scaleY` stretch, blinks on a schedule,
   breath + sway + nod micro-motion, holo comms frame, envelope waveform.
3. **Disclosure preserved** — `AI AMBASSADOR // VEGA ARUNIKA` chip on every frame,
   end card states “synthetic presenter, disclosed”.

## Photoreal upgrade path (owner machine)

```bash
bash mcp/zernio/ambassador/tools/vega-talk-local.sh
```

Produces `mcp/zernio/video/public/talk/vega-talk-photoreal.mp4` (FaceFusion `edtalk_256`,
30 fps, 1280×720). Then flip one line in `mcp/zernio/video/src/VegaScenes.tsx`:

```ts
export const PRESENTER_MODE: 'puppet' | 'photoreal' = 'photoreal';
```

and re-render — the A-roll sequences swap to `PhotorealPresenter` (OffthreadVideo of the
lip-synced plate) with the same fades and envelope-driven micro-motion. Fallback model if
`edtalk_256` is too slow on your CPU: `VEGA_LIP_SYNCER=wav2lip_gan_96 bash …`.

## Rig geometry (for future rig edits)

- Base portrait native 1776×2368; mouth centre (905, 805); eye band centre (934, 579).
- Variant alignment offsets (native px, from `rig/align.json`, phase-search on face box):
  open (−4, −8), mid (0, −4), blink (0, 0).
- Masks: mouth `radial-gradient(ellipse 64px 44px at 50.97% 34.0%, …)`,
  eyes `radial-gradient(ellipse 92px 36px at 52.6% 24.45%, …)` in plate-local %.
- Envelope: `video/src/vo-envelope.json`, 1219 samples @30 fps, field `open` 0..1.
