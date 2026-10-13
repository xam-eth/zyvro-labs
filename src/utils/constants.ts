import { GameProject, LabExperiment, ArchiveEntry, FounderProfile, SocialLink } from '../types';

// Site build identifier, injected by vite.config.ts from package.json and the git commit.
export const SITE_BUILD = `${__SITE_VERSION__}+${__SITE_COMMIT__}`;

export const SYSTEM_METADATA = {
  codename: "ZYVRO_OS",
  build: SITE_BUILD,
  kernel: "Z-CORE.64x",
  status: "ONLINE",
  originYear: "2026",
  tagline: "WE BUILD GAMES, INTERACTIVE WORLDS, AND EXPERIMENTAL DIGITAL EXPERIENCES.",
};

/**
 * The real founder. Every field was supplied by the owner; nothing here is invented.
 * Set this to null to hide the Founder section, its navigation entry and its
 * console command everywhere on the site.
 */
export const FOUNDER: FounderProfile | null = {
  name: "Jamadianur",
  role: "Founder · Solo indie game developer",
  location: "Rantau, South Kalimantan, Indonesia",
  photo: "/assets/founder/jamadianur-portrait.jpg",
  bio: "Jamadianur is a solo indie developer from Rantau, South Kalimantan, Indonesia. He works alone by choice and spends his time taking apart new AI tools and new tech, then turning what he learns into playable games.",
  workStyle: "One person, by design. The ideas, game design and direction are his; implementation is accelerated with AI coding agents. Every game on this site is developed in public repositories, so the progress can be checked.",
  links: [{ label: "GITHUB", url: "https://github.com/xam-eth" }],
};

/**
 * The one verified contact mailbox on the owned domain (zyvrolabs.com),
 * confirmed active by the owner; the domain's MX records point to Hostinger.
 * Set to null to hide every email address and point visitors to GitHub instead.
 */
export const CONTACT_EMAIL: string | null = "zamady@zyvrolabs.com";

// Verified public destinations only. Add a row only when the account exists and is the project's own.
export const GITHUB_PROFILE_URL = "https://github.com/xam-eth";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GITHUB", url: GITHUB_PROFILE_URL },
  ...(CONTACT_EMAIL ? [{ label: "EMAIL", url: `mailto:${CONTACT_EMAIL}` }] : []),
];

// Author credited on development logs: the founder once named, otherwise the lab itself.
function creditName(founder: FounderProfile | null): string {
  return founder ? founder.name.toUpperCase() : "ZYVRO LABS";
}
export const LOG_AUTHOR: string = creditName(FOUNDER);

export const GAME_PROJECTS: GameProject[] = [
  {
    id: "project-001",
    slug: "duskhold",
    featured: true,
    code: "PROJECT 001",
    title: "DUSKHOLD",
    codename: "SCARY_NIGHT",
    genre: "GOTHIC SURVIVAL / BUILD-DEFEND",
    tagline: "HOLD UNTIL DAWN.",
    brief: "A gothic survival game about doors, dread, and the siege outside. Build by day, defend by night. Oil keeps the hearth fire lit \u2014 if it reaches zero, the fire goes out and the night is lost.",
    description: "DUSKHOLD is a 3D gothic survival game played in a besieged manor. By day, you gather oil and wood, build extractors, sawmills and shelters, upgrade the hearth and repair gates. By night, waves of enemies flow through the darkness toward the fire. Light slows them and reduces damage; a lit siege costs 50% door damage. If the hearth oil reaches zero at night, the fire goes out and the game is over. The default route is Survival M1 \u2014 three nights of escalating waves with a build-and-defend loop. The legacy hunt mode is still reachable via ?legacy=1.",
    status: "ALPHA",
    build: "SURVIVAL M1 // b648f64",
    engine: "CUSTOM ES MODULES // THREE.JS WEBGL + CANVAS 2D UI",
    threatLevel: "CRITICAL",
    year: "2026",
    progress: [
      {
        label: "SURVIVAL M1 LOOP",
        value: 60,
        evidence: "Three-night loop with day/night phases, reward, builder queue and save/checkpoint is implemented and passing harness tests. Acceptance for manual combat, readability on real devices and balance playtesting is still open (roadmap \u00a7Acceptance 1-4)."
      },
      {
        label: "UI & READABILITY",
        value: 50,
        evidence: "Icon-first HUD rebuilt; luma playfield 74.9/255 (12.8% near-black) vs baseline 1.4/255 (99.6%). Visual pass on real devices, state sweeps and overlap fixes still open (roadmap \u00a7Acceptance 5)."
      },
      {
        label: "DEVICE & PERFORMANCE",
        value: 0,
        evidence: "Frame time 66-90 enemies/night on low-end, DPR, hidden-tab resume, WebGL context loss and orientation decision are all unverified (roadmap \u00a7Acceptance 6)."
      },
      {
        label: "RELEASE BUNDLE",
        value: 0,
        evidence: "SHA-256 fingerprint signing, origin-trial token, Bubblewrap/AAB validation and Play Store packaging are all blocked on release configuration (roadmap \u00a7Acceptance 7)."
      }
    ],
    features: [
      "Build by day, defend by night: gather oil and wood, queue buildings, upgrade the hearth and repair gates before the next wave arrives",
      "Oil is life: the hearth fire is both a light source and a damage reducer; if oil reaches zero at night, the fire goes out and the game is over",
      "Light slows enemies and halves door damage but does not freeze them; a lit siege still costs 50% door durability",
      "Three nights of escalating waves (66/78/90 per night) with Breakers that target intact doors then the hearth, plus Individual hunters each night",
      "3D mansion with WebGL rendering, 11 authored rooms, BFS flow-field pathfinding and nav refresh when doors break",
      "Legacy hunt mode preserved at ?legacy=1 for QA and comparison; the old tension director and five-predator system are still accessible"
    ],
    specs: {
      targetPlatforms: ["WEB // STATIC HTTP", "MOBILE TOUCH // PORTRAIT", "GOOGLE PLAY // PLANNED"],
      rendering: "Three.js WebGL mansion with orthographic camera, Canvas 2D HUD/icon layer, authored room plates and GLB actors",
      physics: "Fixed-step loop, wall and door collision, BFS flow-field pathfinding, durability-based entrances with local nav refresh",
      multiplayer: "Single player"
    },
    images: {
      hero: "/assets/games/duskhold-hero.jpg",
      cover: "/assets/games/duskhold-cover.jpg",
      conceptArt: []
    },
    loreQuote: "“Fortify the manor. Hold through the night. Survive until dawn.”",
    links: {
      repository: "xam-eth/Scary-Night",
      branch: "arena/4e10f2ff-scary-night",
      sourceUrl: "https://github.com/xam-eth/Scary-Night/tree/arena/4e10f2ff-scary-night"
    }
  },
  {
    id: "project-002",
    slug: "chain-rider",
    featured: false,
    code: "PROJECT 002",
    title: "CHAIN RIDER",
    codename: "CHAIN_SHOT_RIDER",
    genre: "BULLET-STEERING CROWD SHOOTER",
    tagline: "SHOOT ONE BULLET. RIDE IT. STEER IT THROUGH HUNDREDS.",
    brief: "A portrait 9:16, one-thumb crowd shooter built around a rideable chain shot, math gates and analytic ricochet. Sessions last one to three minutes.",
    description: "Slide the squad to line up a math gate, tap to fire a chain shot, then ride inside the bullet and drag to bend it through the crowd. The loop is modelled on Last War / Top War: gates are passed by the squad and by bullets, auto-fire scales with squad size, and five pressure waves build to elites and a boss at the end of every stage. A 15-stage map, a draft of three cards from eight after each win, and five arena variants give the run its structure.",
    status: "TESTING",
    build: "MVP v2",
    engine: "GODOT 4.3 // THREE.JS r128 WEB BUILD",
    threatLevel: "OMEGA",
    year: "2026",
    progress: [
      {
        label: "AUTOMATED CHECKS",
        value: 100,
        evidence: "Meta-layer test in a real DOM: 34 checks, 0 failed. Determinism passes across 5 variants x 7200 ticks and draw() is clean over 600 executions."
      },
      {
        label: "SESSION-LENGTH TARGET",
        value: 83,
        evidence: "25 of 30 skilled-bot runs land inside the 60-180 s window, median 143 s, with 0 deadlocked runs."
      },
      {
        label: "SKILLED-BOT WIN RATE",
        value: 73,
        evidence: "22 of 30 runs won against 1 of 30 for the random bot: 70.6 vs 3.0 squad left, proving skill is rewarded."
      },
      {
        label: "ARENA VARIANTS",
        value: 100,
        evidence: "5 of 5 variants specified and simulated: Classic Pit, Twin Towers, Gravity Chamber, Explosive Yard and Moving Maze."
      }
    ],
    features: [
      "Rideable chain shot: tap to fire, drag to steer while riding, tap to brake",
      "Analytic ricochet with a swept-circle test and no physics engine — armoured enemies bounce the bullet, ordinary enemies are pierced",
      "Math gates passed by squad and bullets, auto-fire scaled by squad size, five pressure waves, elites and a boss per stage",
      "Deterministic fixed-step 60 Hz simulation: the same stage always plays out identically, with slow-mo changing how many ticks run rather than their size",
      "Single source of truth in Config/arena_config.json drives the Godot and web builds, so the two cannot drift apart",
      "Standalone chain-rider.html (about 1.5 MB) runs offline with 11 procedurally generated GLB models embedded"
    ],
    specs: {
      targetPlatforms: ["ANDROID // PORTRAIT 9:16", "WEB // STANDALONE HTML", "GODOT 4.3 // DESKTOP"],
      rendering: "Three.js r128 WebGL, perspective FOV 41 over a 20x40 arena, flat-shaded vertex-colour GLBs, Canvas 2D fallback",
      physics: "Analytic swept-circle ricochet, spatial-grid crowd separation, fixed-step 60 Hz",
      multiplayer: "Single player"
    },
    images: {
      hero: "/assets/games/chain-rider-showcase.jpg",
      cover: "/assets/games/chain-rider-hero.jpg",
      conceptArt: [
        "/assets/games/chain-rider-classic-pit.jpg",
        "/assets/games/chain-rider-twin-towers.jpg",
        "/assets/games/chain-rider-gameplay.jpg"
      ]
    },
    loreQuote: "“Shoot one bullet, ride inside it, and bend it to slaughter hundreds of enemies.”",
    links: {
      repository: "xam-eth/Chain-Rider",
      branch: "arena/01a0ee17-chain-shot-rider",
      sourceUrl: "https://github.com/xam-eth/Chain-Rider/tree/arena/01a0ee17-chain-shot-rider"
    }
  },
  {
    id: "project-003",
    slug: "phagos-dermal-rift",
    featured: false,
    code: "PROJECT 003",
    title: "PHAGOS: DERMAL RIFT",
    codename: "PHAGOS_SPACE",
    genre: "ORGANIC 2D EXPLORATION ADVENTURE",
    tagline: "READ THE TISSUE. THE ROUTE CHANGES WITH THE ORGAN.",
    brief: "A native Godot 4.3 2D exploration adventure set inside an anatomical cutaway, where organs are biomes and routes change with organ state.",
    description: "Dermal Rift is a hand-authored anatomical space, not a generated graph diagram: dermis, adipose tissue, muscle, fascia, membrane and lumen run left to right in one illustrated cutaway. Steer the scout cell to the living teal Echo in the lower loop, return to the amber Deep Cavity to wake it, then cross the retracting membrane to finish the route. Press R to request the next organ state and watch the fascia valve open and close the lower loop. All changing tissue is drawn inside the Godot world, with no HUD overlay.",
    status: "ALPHA",
    build: "DERMAL RIFT SLICE",
    engine: "GODOT 4.3 // GDSCRIPT 2D",
    threatLevel: "STABLE",
    year: "2026",
    progress: [
      {
        label: "ROADMAP MILESTONES",
        value: 11,
        evidence: "1 of 9 milestones closed (M0). M1 is in progress and M2 has a playable proof delivered with hardening remaining."
      },
      {
        label: "TISSUE LAYERS",
        value: 100,
        evidence: "6 of 6 layers authored in the playfield: dermis, adipose tissue, muscle, fascia, membrane and lumen."
      },
      {
        label: "TRAVERSAL LOOP",
        value: 100,
        evidence: "Explore, adapt, interact and exit loop is playable: Echo, Deep Cavity, membrane, with WASD/arrows, sprint and a valve that never seals the explorer in."
      },
      {
        label: "HERO & COMBAT",
        value: 0,
        evidence: "The immune hero (M4) and combat (M8) are deliberately not started: the roadmap proves traversal and route safety first."
      }
    ],
    features: [
      "Hand-authored anatomical cutaway playfield carrying six tissue layers from left to right",
      "Native CharacterBody2D scout cell with WASD/arrow movement, Shift sprint and collision against authored lumen boundaries",
      "Organ-state routes: R requests the next state, and the local fascia valve opens or closes the lower loop but will not close while the explorer is inside it",
      "Route safety as data: minimum traversable width 260 px, maximum anchor offset 72 px, one topology change at a time, at least 12 s between changes",
      "No HUD, map panel or browser overlay: all changing tissue is rendered inside the Godot world"
    ],
    specs: {
      targetPlatforms: ["WEB // GODOT 4.3 WEB EXPORT", "DESKTOP // GODOT 4.3"],
      rendering: "Authored layered 2D art composited in Godot, served as a direct Godot Web export over static HTTP",
      physics: "CharacterBody2D with StaticBody2D tissue boundaries and a state-aware valve",
      multiplayer: "Single player"
    },
    images: {
      hero: "/assets/games/phagos-hero.jpg",
      cover: "/assets/games/phagos-cross-section.jpg",
      conceptArt: [
        "/assets/games/phagos-layout-plan.jpg"
      ]
    },
    loreQuote: "“Each organ is a recognizable biome with its own material hierarchy, topology, rhythm, and traversal vocabulary.”",
    links: {
      repository: "xam-eth/Phagosinec",
      branch: "arena/01a0d899-phagos-space",
      sourceUrl: "https://github.com/xam-eth/Phagosinec/tree/arena/01a0d899-phagos-space"
    }
  },
  {
    id: "project-004",
    slug: "palm-plantation",
    featured: false,
    code: "PROJECT 004",
    title: "PALM PLANTATION",
    codename: "GROUND_TO_EMPIRE",
    genre: "PLANTATION STRATEGY / MANAGEMENT",
    tagline: "FROM A TEMPORARY CAMP TO THE FIRST HARVEST. CLEAR, PLANT, MAINTAIN, SELL.",
    brief: "A compact Godot 4 strategy and management vertical slice on an elevated, zoomable miniature plantation. Prototype 0.2, not release-ready.",
    description: "Build a starter shelter, clear forest, prepare a 4 x 4 planting grid, plant, accelerate growth, maintain the palms and harvest fruit bunches. A worker task queue walks each job out to the field, delivers fresh fruit bunches to the collection point, and the stored kilograms are sold for revenue. A native crop model drives seedling, young and mature stages, with health, pest pressure and fertilizer effects. A separate Three.js browser preview mirrors the loop with the same curated CC0 models.",
    status: "PROTOTYPE",
    build: "PROTOTYPE 0.2",
    engine: "GODOT 4.3 // MOBILE RENDERER + THREE.JS PREVIEW",
    threatLevel: "STABLE",
    year: "2026",
    progress: [
      {
        label: "NATIVE SIM TESTS",
        value: 100,
        evidence: "Headless Godot 4.3: 109 core simulation, 65 crop-model and 110 main-scene structural assertions all pass."
      },
      {
        label: "FIRST PLAYABLE LOOP",
        value: 100,
        evidence: "8 of 8 documented steps are playable, from shelter to regrowth. The browser first cycle delivers 151 kg and sells for 151 dollars."
      },
      {
        label: "ROADMAP MILESTONES",
        value: 0,
        evidence: "0 of 11 milestones closed. M2 is functionally implemented and M3 is in progress, but both acceptance gates remain open."
      },
      {
        label: "VISIBLE ACCEPTANCE",
        value: 0,
        evidence: "Native rendered output, physical touch input and device FPS are still UNVERIFIED, so the build is not release-ready."
      }
    ],
    features: [
      "Full loop: camp, starter shelter, clear forest, 4 x 4 planting grid, growth, harvest, collection point, sale at 1 dollar per kg, then regrowth",
      "Native crop model on a 30-day model month: fruit onset near 30 model months, first harvest window near 36, health, pest pressure and fertilizer effects",
      "Worker task queue with explicit type, target, duration, progress and lifecycle, delivering fruit right after each harvest",
      "Strategy camera: drag to pan, wheel or pinch to zoom, rotate with middle-mouse in Godot or Q/E in the browser",
      "Separate Three.js browser preview with no build step, loading the same CC0 Kenney palm, tractor, pickup and mill-yard models"
    ],
    specs: {
      targetPlatforms: ["GODOT 4.3+ // MOBILE RENDERER // LANDSCAPE", "BROWSER PREVIEW // WEBGL2"],
      rendering: "Godot Mobile renderer with MultiMesh forest batches and one directional shadow light, plus curated CC0 Kenney GLBs",
      physics: "Deterministic simulation layer kept separate from the view; vehicles and mill are static visual proxies, not simulated logistics",
      multiplayer: "Single player"
    },
    images: {
      hero: "/assets/games/palm-plantation-hero.jpg",
      cover: "/assets/games/palm-plantation-camp.jpg",
      conceptArt: [
        "/assets/games/palm-plantation-mill-yard.jpg"
      ]
    },
    loreQuote: "“Harvesting does not remove the palm. After a short recovery and accelerated regrowth cycle, it develops another bunch and can be harvested again.”",
    links: {
      repository: "xam-eth/Ground-to-Empire",
      branch: "arena/01a0f46d-palm-plantation",
      sourceUrl: "https://github.com/xam-eth/Ground-to-Empire/tree/arena/01a0f46d-palm-plantation"
    }
  }
];

// The first release leads the hub and the library carousel.
export const FEATURED_PROJECT_INDEX: number = Math.max(0, GAME_PROJECTS.findIndex((project) => project.featured));

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "exp-001",
    code: "EXP // 001",
    title: "BIO-NEURAL ENTITY SIMULATION",
    category: "BIO-NEURAL",
    status: "ACTIVE",
    version: "v1.4.2",
    description: "Real-time procedural neural entity that reacts to user cursor stimulus, generates dynamic bio-luminescent synaptic pulses, and adapts motility tentacles in 60FPS canvas space.",
    interactiveType: "creature",
    metrics: [
      { label: "SYNAPSE DENSITY", value: "1,024 NODES" },
      { label: "MOTILITY RESPONSIVENESS", value: "1.2ms" },
      { label: "ADAPTIVE BEHAVIOR", value: "AUTONOMOUS" }
    ]
  },
  {
    id: "exp-002",
    code: "EXP // 002",
    title: "PROCEDURAL TERRAIN & ELEVATION MATRIX",
    category: "PROCEDURAL",
    status: "TESTING",
    version: "v2.0.8",
    description: "Interactive real-time 3D heightfield mesh synthesizer. Adjust octave noise parameters, elevation bias, wireframe frequency, and scanline rendering.",
    interactiveType: "terrain",
    metrics: [
      { label: "POLYGON COUNT", value: "32,768 QUADS" },
      { label: "NOISE ALGORITHM", value: "SIMPLEX-3D" },
      { label: "RENDER MODE", value: "HUD WIREFRAME" }
    ]
  },
  {
    id: "exp-003",
    code: "EXP // 003",
    title: "QUANTUM CIPHER & SIGNAL SPECTRUM",
    category: "CRYPTOGRAPHIC",
    status: "CLASSIFIED",
    version: "v0.9.9",
    description: "Interactive decryption terminal for intercepted deep-space transmissions. Match frequency waveforms, unlock classified studio lore, and reconstruct corrupt logs.",
    interactiveType: "cipher",
    metrics: [
      { label: "ENCRYPTION CIPHER", value: "ZYVRO-256-HEX" },
      { label: "FREQUENCY BAND", value: "1420.405 MHz" },
      { label: "DECRYPTION RATE", value: "USER TUNED" }
    ]
  },
  {
    id: "exp-004",
    code: "EXP // 004",
    title: "GRAVITATIONAL SINGULARITY ACCELERATOR",
    category: "PHYSICS",
    status: "EXPERIMENTAL",
    version: "v3.1.0",
    description: "Interactive particle vortex simulation. Click and drag in the chamber to spawn gravitational singularities, warping 2,000 active mass particles with realistic N-body physics.",
    interactiveType: "gravity",
    metrics: [
      { label: "PARTICLE COUNT", value: "2,000 BODIES" },
      { label: "SOLVER", value: "VERLET VELOCITY" },
      { label: "SINGULARITY CAP", value: "4 EVENT HORIZONS" }
    ]
  }
];

export const ARCHIVE_LOGS: ArchiveEntry[] = [
  {
    id: "log-001",
    code: "LOG // 001",
    title: "THE TENSION DIRECTOR: WHY DUSKHOLD (FORMERLY LAST NIGHT) STOPPED RANDOM SPAWNING",
    category: "WORLD DESIGN",
    timestamp: "2026.10.02 — SOURCE: SCARY-NIGHT // ARENA/01A0CEE1",
    build: "v1.0.0-beta.1",
    author: LOG_AUTHOR,
    summary: "How a pressure budget, slow-decaying moods and enforced quiet stretches replaced random enemy spawns. Note: this system belongs to the legacy route, accessible at ?legacy=1.",
    content: [
      "Last Night owns a tension director instead of a spawner. It holds a pressure budget, composes waves from it, decides where things come from, and enforces quiet stretches, because pressure only reads as pressure when there is contrast.",
      "Mood raises instantly and decays slowly, so it never flaps. The camera follows the same discipline: shake happens on door breaks, hits, blood moon and the panic phase, never as decoration.",
      "The latest build adds the siege. Two populations on purpose: besiegers are the fight, with full AI and eight skinned bodies at a time, while the crowd is the scale, cheap bodies that mass at a few walls and lean on them until the wood gives. One shared maxAlive() keeps the crowd from quietly moving the ceiling.",
      "The curve is 1-3 enemies in the first minute, 5-8 by the second, 10-15 by midnight, 20+ by the fourth hour, then a final push with someone at every standing entrance at once."
    ]
  },
  {
    id: "log-002",
    code: "LOG // 002",
    title: "ANALYTIC RICOCHET: WHY CHAIN RIDER HAS NO PHYSICS ENGINE",
    category: "COMBAT TEST",
    timestamp: "2026.10.02 — SOURCE: CHAIN-RIDER // ARENA/01A0EE17",
    build: "MVP v2",
    author: LOG_AUTHOR,
    summary: "Swept-circle ricochet, a fixed 60 Hz clock and a measured balance pass: how the rideable chain shot stays deterministic across devices.",
    content: [
      "Ricochet is solved analytically with a swept-circle test, the root of a quadratic, rather than by a physics engine. That keeps replays identical across platforms and stops the bullet tunnelling at 150 percent speed.",
      "Ordinary enemies are pierced and armoured ones bounce the bullet. If every enemy bounced, all 15 bounces would be spent in 0.2 seconds inside a dense crowd and the player would lose control, so Brute and Shielder act as living bumpers.",
      "Balance is measured, not guessed. The simulation harness runs full bot sessions from the real gameplay code, and it found two defects invisible from reading the source: bullets that almost never bounced (0.10 bounces per bullet) and a determinism bug in the Splitter that a too-short test had missed.",
      "Current result over 30 runs: a skilled bot wins 22 times and the random bot once, with a median session of 143 seconds against a 60 to 180 second target."
    ]
  },
  {
    id: "log-005",
    code: "LOG // 005",
    title: "FIVE PREDATORS: PATHFINDING, PATIENCE AND THE STALKER (LEGACY ROUTE)",
    category: "AI LOGIC",
    timestamp: "2026.10.02 — SOURCE: SCARY-NIGHT // ARENA/01A0CEE1",
    build: "v1.0.0-beta.1",
    author: LOG_AUTHOR,
    summary: "Why DUSKHOLD (formerly Last Night) legacy enemies route on a walkability grid, give up after a long hunt, and why one of them only moves when unseen. These systems belong to the legacy route at ?legacy=1.",
    content: [
      "The mansion has interior walls and large grounds, so enemies route on a coarse walkability grid with BFS instead of steering straight at the player. They also give up: after a long hunt with no contact they leave, which rewards evasion over killing.",
      "Five predators share the house. Crawler, Hunter and Werewolf are joined in v1.0 by the Stalker, which moves only while unseen and never breaks a door, and the Ghoul, a thinner wolf that eats barricades.",
      "Late-night variants FRENZIED, MARKSMAN and ALPHA stop the last hour from repeating the first. A haunts layer adds whispers, watchers and fake knocks, but it never lies about damage."
    ]
  },
  {
    id: "log-006",
    code: "LOG // 006",
    title: "ROUTES AS DATA: THE DERMAL RIFT SAFETY ENVELOPE",
    category: "WORLD DESIGN",
    timestamp: "2026.09.30 — SOURCE: PHAGOSINEC // ARENA/01A0D899",
    build: "DERMAL RIFT SLICE",
    author: LOG_AUTHOR,
    summary: "How Phagos lets organs change the map without ever trapping the player: safety rules written as data and validated by tooling.",
    content: [
      "Each organ is a biome and its routes change with organ state: rest, contraction, surge, inflammation and recovery. The change must be learnable, so motion is authored organ behaviour, never particles, stains or random wobble.",
      "Safety rules are data, not assumptions: minimum traversable width 260 px, maximum moving-anchor offset 72 px, one topology change at a time, at least 12 seconds between changes, and the active player cell is never sealed.",
      "tools/validate_arena_plan.py verifies that every authored state still connects entry, deep cavity and organ gate. The first slice is hand-authored on purpose so the arena reads as a place rather than a graph diagram, and combat waits until traversal is proven."
    ]
  },
  {
    id: "log-007",
    code: "LOG // 007",
    title: "EVIDENCE OVER OPTIMISM: THE PALM PLANTATION STATUS AUDIT",
    category: "WORLD DESIGN",
    timestamp: "2026.10.02 — SOURCE: GROUND-TO-EMPIRE // ARENA/01A0F46D",
    build: "PROTOTYPE 0.2",
    author: LOG_AUTHOR,
    summary: "Why a plantation loop with 284 passing assertions is still not marked complete: every claim carries its evidence boundary.",
    content: [
      "Palm Plantation keeps a live status file where each feature is labelled implemented, partially implemented, placeholder or unverified. Headless Godot passes 109 core, 65 crop-model and 110 structural assertions, yet milestones M2 and M3 stay open because rendered output, physical input and device FPS have not been verified.",
      "The crop model is deliberately scenario-only: a 30-day model month, fruit onset near 30 model months, a first harvest window near 36, and a documented 180 kg per palm-year peak. None of it is presented as agronomic fact, and the 1 dollar per kg sale price is an accounting demonstration, not a market model.",
      "The browser preview is a separate Three.js implementation that loads the same CC0 models. Its fresh-state first cycle delivers 151 kg and sells for 151 dollars, and that evidence is reported separately from the native Godot results."
    ]
  }
];

export const ORIGIN_MANIFESTO = {
  entity: "ZYVRO LABS",
  type: "INDEPENDENT GAME LAB · ONE FOUNDER",
  origin: "2026",
  status: "INDEPENDENT // SELF-FUNDED // BUILDING IN THE OPEN",
  focus: ["HIGH-TENSION MECHANICS", "ATMOSPHERIC WORLDS", "UNCOMPROMISING TECHNICAL UI", "HARD INDUSTRIAL AESTHETICS"],
  manifesto: [
    "We believe modern gaming has grown complacent: bloated corporate committees, recycled formulas, and hollow cinematic distractions.",
    "Zyvro Labs is a return to mechanical weight, sensory audacity, and pure digital craft.",
    "Zyvro Labs is one founder building games in the open, with AI coding agents as the workforce and every claim traceable to source.",
    "No predatory gimmicks. No fluff. Only raw interactive atmosphere."
  ],
  pillars: [
    {
      code: "01",
      title: "ATMOSPHERIC SENSORY DREAD",
      desc: "Sound, lighting, and tactile feedback operate in complete harmonic synergy. The world pushes back on the player."
    },
    {
      code: "02",
      title: "TACTILE MECHANICAL DEPTH",
      desc: "Every button, weapon switch, and terminal prompt requires deliberate intention. Mechanics feel tangible, heavy, and consequential."
    },
    {
      code: "03",
      title: "EVIDENCE OVER HYPE",
      desc: "Every progress number on this site links to the repository it came from. If it is not built and tested, it is not claimed."
    }
  ]
};
