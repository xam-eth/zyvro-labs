# ZYVRO LABS — Brand System & Game OS Interface

> **"ZYVRO LABS IS A DIGITAL WORLD."**  
> *Not a corporate brochure. A fully realized, immersive, hardware-accelerated Game Operating System.*

---

## ⚡ 20-Point Brand System Implementation Matrix

| # | Element | Zyvro Labs Implementation |
|---|---|---|
| **01** | **Core Concept** | Web interface operates as a live Game OS / Simulation world with boot protocol and immersive state loops. |
| **02** | **Brand Personality** | Mysterious, experimental, futuristic, confident, technical, and atmospheric. |
| **03** | **Visual Identity** | Dark Industrial Game OS (AAA HUD + Indie Experimental + Military Interface + Digital Lab). Zero generic RGB neon. |
| **04** | **Color System** | Base (`#080808`, `#101010`, `#171717`), Surface (`#202020`), Text (`#F2F2F2`), Signature Acid Lime (`#D7FF3F`). |
| **05** | **Typography** | Display: Geometric condensed futuristic (`Chakra Petch`, `Syne`). Technical: Precision monospace (`JetBrains Mono`). |
| **06** | **Logo Treatment** | System Identifier badge: `SYS // 001`, `ZYVRO® SYSTEM ONLINE`, reactive status indicators. |
| **07** | **UI Language** | `Main Hub`, `Projects`, `Origin`, `Crew`, `Archive`, `Transmission`, `Worlds`, `Lab`, `Initializing`, `Shutdown`. |
| **08** | **Navigation** | Vertical desktop HUD strip with `Z-Y-V-R-O` glyphs, status nodes, flyout tooltips, and mobile console drawer. |
| **09** | **Custom Cursor** | Precision targeting reticle with dynamic reactive states (`SELECT`, `INTERACT`, `SCANNING`, `ACTIVE`). |
| **10** | **Boot Screen** | Mandatory opening sequence: `[ PRESS START ]` -> synthesized audio chime -> dynamic diagnostic progress bars -> Main Hub. |
| **11** | **Main Hub** | Command Center with dynamic Hero World, interactive 3D particle matrix canvas, telemetry feeds, and quick portal jump. |
| **12** | **Game Library** | Game selection stage (NOT a card grid): 3D tilt deck, keyboard `←`/`→` controls, swipe gesture, threat gauge, build tags. |
| **13** | **Game Detail** | `INITIALIZING PROJECT 00X`, diagnostic progress bars (World 82%, Characters 100%, Combat 64%), 4K gallery, audio visualizer. |
| **14** | **Zyvro Lab** | 4 Live interactive canvas experiments: Bio-Neural Organism, Procedural 3D Terrain Matrix, Quantum Cipher, Gravity Singularities. |
| **15** | **Archive** | Lore & Dev Database with category filters (`WORLD DESIGN`, `AI LOGIC`, `COMBAT TEST`, `AUDIO SYNTHESIS`, `CLASSIFIED`). |
| **16** | **Origin** | `SYSTEM // ORIGIN` (About): Studio entity specs, Origin 2026, Core Focus, Studio Manifesto, 3 Core Pillars. |
| **17** | **Crew** | Operative selection interface: `PLAYER_001` to `PLAYER_005` with stat radars, loadouts, active statuses, and dossiers. |
| **18** | **Transmission** | Comms Terminal: FROM, CALLSIGN, PURPOSE (`[ BUSINESS ]`, `[ COLLABORATION ]`, `[ PRESS ]`, `[ TALENT ]`), typewriter audio feedback. |
| **19** | **Footer** | `END OF TRANSMISSION // ZYVRO LABS`, `● ONLINE`, Social channels, Build specs, and `[ RESTART SYSTEM ]` reboot button. |
| **20** | **Motion & Sound** | Procedural Web Audio API synthesizer (boot hum, UI clicks, hover blips, access granted chimes, radar scans, faults). |
| **2K/4K** | **Media Fidelity** | Ultra-high definition 4K/2K master visual renders, volumetric lighting, crisp vectors, and zero compression artifacts. |

---

## 🎮 Interactive Features & Hotkeys

- **`[ ENTER ]` or `[ SPACE ]`**: Start system on Boot Screen.
- **`[ ← ]` / `[ → ]` (or `[ A ]` / `[ D ]`)**: Cycle active project in Game Selection screen.
- **`[ ~ ]` or Console Button**: Open In-Game Terminal CLI prompt (`help`, `last-night`, `chain-rider`, `phagos`, `palm`, `lab`, `sound`, `scanlines`, `reboot`, `purge`).
- **Sound Toggle (HUD)**: Enable/disable the built-in procedural Web Audio synthesizer.
- **CRT Scanlines (HUD)**: Toggle retro high-frequency scanline matrix.
- **Interactive Prototypes (Zyvro Lab)**:
  - **Bio Creature**: Tracks mouse cursor, clicks spawn bio-luminescent stimulus ripples.
  - **Terrain Matrix**: Real-time sliders for elevation noise, frequency, and render mode.
  - **Cipher Decryptor**: Tune frequency slider to 1420.4 MHz to unlock classified studio lore.
  - **Singularity Chamber**: Click anywhere to spawn relativistic gravitational black holes.

---

## 🛠️ Tech Architecture

- **Engine**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Industrial Design System
- **Audio Engine**: Web Audio API Procedural Synthesizer (Zero network overhead)
- **Canvas Systems**: High-DPI hardware-accelerated 2D/3D procedural renderers
- **Iconography**: Lucide React System Identifiers

---

## 🕹️ Game Library — Source of Truth

The Game Library, Main Hub, Command Palette and Archive read from `src/utils/constants.ts`. Each project is a real game maintained in its own repository, and each build status below is read from that repository's README, roadmap or status documents.

| Slot | Title | Genre | Status / Build | Engine | Source |
|---|---|---|---|---|---|
| 001 | **LAST NIGHT** | 3/4 vampire survival horror | BETA // v1.0.0-beta.1 | Custom ES modules, Canvas 2D + Three.js GLB | [`Scary-Night`](https://github.com/xam-eth/Scary-Night/tree/arena/01a0cee1-scary-night) |
| 002 | **CHAIN RIDER** | Bullet-steering crowd shooter | TESTING // MVP v2 | Godot 4.3 + Three.js r128 web build | [`Chain-Rider`](https://github.com/xam-eth/Chain-Rider/tree/arena/01a0ee17-chain-shot-rider) |
| 003 | **PHAGOS: DERMAL RIFT** | Organic 2D exploration adventure | ALPHA // Dermal Rift slice | Godot 4.3 GDScript 2D | [`Phagosinec`](https://github.com/xam-eth/Phagosinec/tree/arena/01a0d899-phagos-space) |
| 004 | **PALM PLANTATION** | Plantation strategy / management | PROTOTYPE // 0.2 | Godot 4.3 + Three.js browser preview | [`Ground-to-Empire`](https://github.com/xam-eth/Ground-to-Empire/tree/arena/01a0f46d-palm-plantation) |

### Updating a game

1. Read the game repository's README and status documents on its newest branch. `main` only holds a stub README in these repositories, so check every branch.
2. Edit the matching entry in `GAME_PROJECTS`. Every `progress` metric carries an `evidence` string that must come from a number or a statement in that repository, never an estimate.
3. Put screenshots and key art in `public/assets/games/`, named `<game>-<subject>.jpg`. Capture them from the game itself.
4. Keep `links.branch` and `links.sourceUrl` pointing at the branch the data was read from.
5. Run `npm run build`, which type-checks first.

Game images were taken from the game repositories, except Palm Plantation, which has no screenshots in its repository, so its images are captures of its own browser preview.

---

## 📚 Studio knowledge base

- [`CLAUDE.md`](CLAUDE.md) — the admin and director handbook: rules, routines, open decisions.
- [`docs/COMPETITOR-RESEARCH.md`](docs/COMPETITOR-RESEARCH.md) — how leading game studio websites work, with sources.
- [`docs/WEBSITE-AUDIT-AND-ROADMAP.md`](docs/WEBSITE-AUDIT-AND-ROADMAP.md) — today's gaps and the phased plan to a professional launch site.
- [`docs/LAUNCH-PLAYBOOK.md`](docs/LAUNCH-PLAYBOOK.md) — Google Play and Steam requirements, gates and timelines.
- [`docs/GAME-REGISTRY.md`](docs/GAME-REGISTRY.md) — per-game readiness, blockers and next actions.
