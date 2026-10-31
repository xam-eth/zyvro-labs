import { GameProject, LabExperiment, ArchiveEntry, FounderProfile, SocialLink, BlogPost } from '../types';

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
  bio: "I'm a solo indie developer from Rantau, South Kalimantan, Indonesia. I work alone by choice and spend my time taking apart new AI tools and new tech, then turning what I learn into playable games.",
  workStyle: "Zyvro Labs is the home for my games. The ideas, game design and direction are mine; implementation is accelerated with AI coding agents. Every game is developed in public repositories, so the progress can be checked.",
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
    featured: true,
    code: "PROJECT 001",
    title: "LAST NIGHT",
    codename: "SCARY_NIGHT",
    genre: "3/4 VAMPIRE SURVIVAL HORROR",
    tagline: "SURVIVE UNTIL DAWN. YOU DO NOT HAVE TO KILL ANYTHING.",
    brief: "A 3/4 vampire survival horror about psychological tension, defensive decision-making, resource management and sound. One night lasts five minutes.",
    description: "You start at 00:00 and only have to still be alive at 05:00. You wake hungry, and the servant door is already shaking — bar it, or open it and feed. Blood is your health, doors are your life, and a tension director decides where the pressure comes from. Five predators hunt you through the mansion, and from the latest build the house is besieged: a crowd of cheap bodies mass at the walls and lean on the wood until it gives, while a smaller set of fully simulated besiegers finish the job.",
    status: "BETA",
    build: "v1.0.0-beta.1",
    engine: "CUSTOM ES MODULES // CANVAS 2D + THREE.JS GLB",
    threatLevel: "CRITICAL",
    year: "2026",
    progress: [
      {
        label: "CORE SYSTEMS",
        value: 100,
        evidence: "Tension director, mansion with collision and nav grid, blood economy, seeded night objectives, haunts layer and the Blood Market all ship in v1.0.0-beta.1."
      },
      {
        label: "THREAT ROSTER",
        value: 100,
        evidence: "5 of 5 predators implemented: Crawler, Hunter, Werewolf, Stalker and Ghoul, plus FRENZIED, MARKSMAN and ALPHA late-night variants."
      },
      {
        label: "AUTOMATED VERIFICATION",
        value: 100,
        evidence: "Latest arena commit reports harness 273 PASS / 0 FAIL, with glbtest, clicktest, server/test and envqa (40 checks) all green."
      },
      {
        label: "LIVE BILLING",
        value: 0,
        evidence: "The web beta runs the sandbox provider: nothing is charged. Real payments need Midtrans server keys, and a Google Play build must use Google Play Billing."
      }
    ],
    features: [
      "Tension director replaces random spawning: a pressure budget, moods that rise fast and decay slowly, and enforced quiet stretches",
      "Blood is health — it drains with time and sprinting, every claw swing and dash costs it, and enemies are the only sustainable food",
      "Five predators route on a walkability grid with BFS pathfinding, and give up after a long hunt with no contact",
      "The siege: the house is surrounded and you can count them, with a crowd for scale and a smaller fully simulated besieger set for the fight",
      "Three seeded objectives every night, paid in shards with partial credit even if you die at 4:58",
      "40+ sounds synthesised with the Web Audio API on three buses with limiter and reverb, and an animated GLB vampire loaded through a vendored Three.js GLTFLoader"
    ],
    specs: {
      targetPlatforms: ["WEB // STATIC HTTP", "MOBILE TOUCH // VIRTUAL STICK", "GOOGLE PLAY // PLANNED"],
      rendering: "2D canvas with half-res lightmap, particles and post, 11 photographed room plates, animated GLB player via vendored Three.js",
      physics: "Fixed-step loop, wall and furniture collision, BFS navigation grid, durability-based entrances",
      multiplayer: "Single player"
    },
    images: {
      hero: "/assets/games/last-night-hero.jpg",
      cover: "/assets/games/last-night-gatehouse.jpg",
      conceptArt: [
        "/assets/games/scenes/duskhold/00-ftue-00s.png",
        "/assets/games/scenes/duskhold/01-gallery-night.jpg",
        "/assets/games/scenes/duskhold/02-oratory-dawn.jpg",
        "/assets/games/scenes/duskhold/03-ftue-15s.png",
        "/assets/games/scenes/duskhold/04-ftue-30s.png"
      ]
    },
    loreQuote: "“You are not a soldier. You do not have to kill anything. Dawn is at 05:00 — spending the night fighting is a losing strategy; spending it surviving is the game.”",
    coreSell: [
      "You cannot win by fighting: five minutes of night, five predators, and evasion pays better than violence",
      "A tension director spends a pressure budget instead of rolling dice, so quiet stretches make the loud ones hurt",
      "Blood is your health and your currency — every swing costs it, and the hunted are the only sustainable food",
      "273 automated checks pass on the shipped beta branch, so the beta you play is the beta that was tested"
    ],
    links: {
      repository: "xam-eth/Scary-Night",
      branch: "arena/01a0cee1-scary-night",
      sourceUrl: "https://github.com/xam-eth/Scary-Night/tree/arena/01a0cee1-scary-night"
    }
  },
  {
    id: "project-002",
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
        "/assets/games/scenes/chain-rider/01-classic-pit.png",
        "/assets/games/scenes/chain-rider/02-twin-towers.png",
        "/assets/games/scenes/chain-rider/03-qa-gameplay.png",
        "/assets/games/scenes/chain-rider/04-gravity-chamber.png",
        "/assets/games/scenes/chain-rider/05-explosive-yard.png",
        "/assets/games/scenes/chain-rider/06-moving-maze.png"
      ]
    },
    loreQuote: "“Shoot one bullet, ride inside it, and bend it to slaughter hundreds of enemies.”",
    coreSell: [
      "One bullet you can ride: fire it, sit inside it, and drag it through the crowd with one thumb",
      "No physics engine, no desyncs: ricochet is solved analytically, so the same stage always plays out identically",
      "Sessions tuned to 60-180 seconds and measured with bot runs, not guessed in a design doc",
      "A 1.5 MB standalone HTML build that runs offline from a double-click"
    ],
    links: {
      repository: "xam-eth/Chain-Rider",
      branch: "arena/01a0ee17-chain-shot-rider",
      sourceUrl: "https://github.com/xam-eth/Chain-Rider/tree/arena/01a0ee17-chain-shot-rider"
    }
  },
  {
    id: "project-003",
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
        "/assets/games/scenes/phagos/01-dermal-rift-playfield.png",
        "/assets/games/scenes/phagos/02-skin-cross-section.png",
        "/assets/games/scenes/phagos/03-preview.png"
      ]
    },
    loreQuote: "“Each organ is a recognizable biome with its own material hierarchy, topology, rhythm, and traversal vocabulary.”",
    coreSell: [
      "Organs are biomes: the map itself breathes, contracts and reopens routes as tissue states change",
      "Route safety is data, not hope: minimum widths, anchor offsets and cooldowns validated by tooling",
      "Zero HUD overlay — every change you must read is drawn inside the world itself"
    ],
    links: {
      repository: "xam-eth/Phagosinec",
      branch: "arena/01a0d899-phagos-space",
      sourceUrl: "https://github.com/xam-eth/Phagosinec/tree/arena/01a0d899-phagos-space"
    }
  },
  {
    id: "project-004",
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
    coreSell: [
      "A whole plantation economy in one sitting: clear, plant, maintain, harvest, sell, regrow",
      "284 headless assertions guard the simulation, and the status file still refuses to call it finished",
      "Zoomable miniature diorama camera: drag, pinch and rotate over a tabletop you can read at a glance"
    ],
    links: {
      repository: "xam-eth/Ground-to-Empire",
      branch: "arena/01a0f46d-palm-plantation",
      sourceUrl: "https://github.com/xam-eth/Ground-to-Empire/tree/arena/01a0f46d-palm-plantation"
    }
  },
  {
    id: "project-005",
    featured: false,
    code: "PROJECT 005",
    title: "EXOCOMPLICT",
    codename: "NEON_FRONTIER",
    genre: "THIRD-PERSON SCI-FI ARENA SHOOTER",
    tagline: "ONE THUMB ON THE STICK, ONE ON THE TRIGGER. THE FRONTIER DOES THE REST.",
    brief: "A mobile-first third-person sci-fi arena shooter: joystick, look-drag and FIRE, three weapons that never overlap, and a connected frontier world you can walk before you ever defend it.",
    description: "EXOCOMPLICT — built in the studio's private repository, reported here in full — drops you into NEON FRONTIER, one connected 3D world with a hexagonal combat arena, a suspended reactor, command centre, lab, depot, landing pad and perimeter defences. You boot into safe Explore — no wave starts until you press START DEFENSE — then hold the line against Runner and Shooter waves with the Pulse Rifle, the slow-burning Nova Launcher and the chaining Arc Shooter, earning Battle Points to unlock the next gun. The game ships a no-install browser route: a committed WebAssembly + PCK payload that boots from a plain static server, fronted by a painted shell whose lobby renders the real hero rig in WebGL.",
    status: "TESTING",
    sourcePublic: false,
    build: "WEB PAYLOAD // PRIVATE CI GREEN · 2026.10.25",
    engine: "GODOT 4.7.2-STABLE // GDSCRIPT + WEBGL2 WASM",
    threatLevel: "OMEGA",
    year: "2026",
    progress: [
      {
        label: "ENGINE SMOKE SUITE",
        value: 100,
        evidence: "The shipped head passes the studio's private CI (static checks plus the engine smoke suite); the four-theatre integration line reports 28/28 import-OK Godot tests. Verified 25 Oct 2026; identifiers withheld because the repository is private."
      },
      {
        label: "BROWSER BOOT PROOF",
        value: 100,
        evidence: "Private CI boots the committed web payload in a real headless browser: four normal boots plus interrupted WASM/PCK recovery at 100 Mbps."
      },
      {
        label: "FRONT-END JOURNEY",
        value: 100,
        evidence: "BOOT > LOADING > CHAPTER > DASHBOARD > HERO > WORLD > PRELOAD > GAMEPLAY is implemented and walked by the journey smoke test, with the menu-layout test measuring every screen at four viewport sizes."
      },
      {
        label: "DEVICE & ANDROID QA",
        value: 0,
        evidence: "Android packaging, physical touch behaviour, mobile frame time and final visual acceptance are still UNVERIFIED per the repository's own evidence boundary; no APK result is claimed."
      }
    ],
    features: [
      "Safe Explore by default: no Wave Director starts until the player deliberately presses START DEFENSE after a visible preparation countdown",
      "Three weapons with genuinely different contracts: fast Pulse Rifle, slow area-damage Nova Launcher, limited-hop chaining Arc Shooter, all data-driven WeaponDefinition resources",
      "One connected frontier world assembled from reusable 3D components plus licensed CC0 kit props, with provenance files committed next to the assets",
      "Painted shell front end: poster loading composition, dashboard, hero roster and a theatre carousel that hands the screen to the engine",
      "The lobby hero is the match hero: hero.glb rendered live in a WebGL stage over a photographed empty bay, framed by the model's own bounding box",
      "No-install review path: committed WASM + PCK payload served by any static server, single-threaded export so no COOP/COEP headers are needed"
    ],
    specs: {
      targetPlatforms: ["ANDROID // PORTRAIT + LANDSCAPE TOUCH", "WEB // WASM + COMMITTED PCK", "DESKTOP // GODOT 4.7.2"],
      rendering: "Godot Compatibility (WebGL2) renderer on web, mobile renderer on Android; painted UI plates audited to a nine-hue palette",
      physics: "Component colliders over the blockout world, hitscan and projectile weapon contracts, no networking in MVP",
      multiplayer: "Single player (multiplayer deferred by written decision)"
    },
    images: {
      hero: "/assets/games/exocomplict-hero.jpg",
      cover: "/assets/games/exocomplict-cover.jpg",
      conceptArt: [
        "/assets/games/scenes/exocomplict/01-arena-vantage.png",
        "/assets/games/scenes/exocomplict/02-boss-vantage.png",
        "/assets/games/scenes/exocomplict/03-portrait-explore.png",
        "/assets/games/scenes/exocomplict/04-first-contact.png",
        "/assets/games/scenes/exocomplict/05-fire-held.png"
      ]
    },
    coreSell: [
      "Combat you can hold: left thumb moves, right thumb aims, one FIRE tile — measured touch hitboxes, not vibes",
      "The lobby shows the soldier you actually deploy: the real rigged hero.glb, rendered live, rifle socketed to R_Hand",
      "Nothing attacks you until you ask: safe Explore first, defense on demand, results that offer retry or wander",
      "Play it without installing anything: a committed WASM + PCK payload boots from a plain static server"
    ],
    loreQuote: "“No wave automatically starts when the game opens. The frontier waits until you decide it is a fight.”",
    links: {
      repository: "PRIVATE // WITHHELD BY OWNER",
      branch: "INTERNAL // NOT PUBLIC",
      sourceUrl: ""
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
    title: "THE TENSION DIRECTOR: WHY LAST NIGHT STOPPED RANDOM SPAWNING",
    category: "WORLD DESIGN",
    timestamp: "2026.10.02 — SOURCE: SCARY-NIGHT // ARENA/01A0CEE1",
    build: "v1.0.0-beta.1",
    author: LOG_AUTHOR,
    summary: "How a pressure budget, slow-decaying moods and enforced quiet stretches replaced random enemy spawns in the five-minute vampire night.",
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
    title: "FIVE PREDATORS: PATHFINDING, PATIENCE AND THE STALKER",
    category: "AI LOGIC",
    timestamp: "2026.10.02 — SOURCE: SCARY-NIGHT // ARENA/01A0CEE1",
    build: "v1.0.0-beta.1",
    author: LOG_AUTHOR,
    summary: "Why Last Night enemies route on a walkability grid, give up after a long hunt, and why one of them only moves when unseen.",
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

/**
 * Public development blog ("DEV BLOG"). Every post reports work that already
 * exists in a game repository; every number carries the branch, commit or CI
 * run it was read from. Headlines follow the studio copy desk rules: one hook,
 * one promise, ultra-specific detail, no invented urgency.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-001",
    code: "UPDATE // 001",
    projectId: "project-005",
    category: "BUILD UPDATE",
    title: "THE HERO ON YOUR LOBBY SCREEN IS THE HERO IN YOUR MATCH — AND WE CAN PROVE IT",
    deck: "EXOCOMPLICT replaced its painted lobby soldier with the rigged hero.glb rendered live in the browser: same socket, same rifle, same silhouette you deploy into the frontier.",
    hook: "A painted soldier that never changes is a lie the player catches on day two. Ours is the same 36,000-triangle GLB that takes the field.",
    date: "2026.10.25",
    readTime: "4 MIN READ",
    author: LOG_AUTHOR,
    heroImage: "/assets/games/exocomplict-hero.jpg",
    gallery: [
      { src: "/assets/games/scenes/exocomplict/04-first-contact.png", caption: "FIRST CONTACT — SAFE EXPLORE, RELIGHT PASS 10" },
      { src: "/assets/games/scenes/exocomplict/05-fire-held.png", caption: "FIRE HELD — PORTRAIT 390x844 TOUCH LAYOUT" },
      { src: "/assets/games/scenes/exocomplict/01-arena-vantage.png", caption: "ARENA VANTAGE — WORLD TOUR 2026.10.22" }
    ],
    tags: ["HERO RIG", "WEBGL LOBBY", "UI/UX", "GODOT 4.7.2"],
    sections: [
      {
        heading: "THE PROBLEM WITH A PRETTY LIE",
        body: [
          "The old hero screen was a generated illustration standing on a generated hangar. The art direction was approved, but as an answer it was wrong on every axis a lobby is asked about: it did not change when the livery changed, it did not change when the rig was re-exported, and the INFO tab listed clips — idle, aim, fire — that the picture could not play.",
          "Worst of all, it showed a different character than the one in the match. A lobby is a contract. When the soldier on the door is not the soldier in the game, the player learns on day two that nothing on the screen can be trusted."
        ]
      },
      {
        heading: "A PHOTOGRAPH OF AN EMPTY ROOM, AND A LIVE RIG ON TOP OF IT",
        body: [
          "What ships now is a division of labour. The bay is a photograph with nobody in it — the empty deploy pad, two beams, crates, haze — because a room does not animate and does not change when the player does. Over that pad sits a WebGL canvas that loads hero.glb and frames it by the model's own bounding box: boots on the bottom edge, helmet at 93 percent of the height, so a re-scaled export re-frames itself.",
          "The aim clip plays with the game's own rifle: the rig's socket hangs rifle.glb off R_Hand with the carry rotation and 0.4 model-unit scale the match uses. The celebration you see is the real weapon coming up, not a CSS zoom over a still. The roster card's face is baked from the same GLB by the studio's portrait tool with the stage's light rig, so the card and the stage cannot disagree about who you are looking at."
        ]
      },
      {
        heading: "THE STAGE RENTS THE GPU, IT DOES NOT OWN IT",
        body: [
          "The stage plays on entry, pauses on exit and disposes before the engine boots, because Deploy does not need two live WebGL contexts on a phone. Three.js is vendored and pinned inside the shell — 820 KB with an import map — so the lobby works offline and no CDN can change under a shipped build.",
          "And if the rig cannot be reached, the canvas stays empty and the reason is printed on the pad. A silently blank stage is the one outcome that is not allowed."
        ]
      }
    ],
    pullQuote: "A silently blank stage is the one outcome that is not allowed.",
    evidence: [
      { label: "CI ON SHIPPED HEAD", value: "PRIVATE CI · SUCCESS", source: "shipped head, verified 2026.10.25 — identifiers withheld" },
      { label: "LOBBY RIG", value: "36,000 TRIS, LIVE", source: "internal decision log, entries 40-41" },
      { label: "VENDORED THREE.JS", value: "820 KB PINNED", source: "vendored in-shell with an import map" },
      { label: "JOURNEY TESTS", value: "GREEN", source: "journey + menu-layout smoke tests (internal)" }
    ],
    sourceBranch: "INTERNAL // IDENTIFIERS WITHHELD",
    sourceUrl: ""
  },
  {
    id: "post-002",
    code: "UPDATE // 002",
    projectId: "project-005",
    category: "SYSTEMS",
    title: "FOUR THEATRES, ONE 116 MB PROMISE: THE WEB BUILD NOW BOOTS HONEST",
    deck: "Frostline Relay, Verdant Bloom, Emberfall Foundry and Vanguard Station open from a single committed payload — with the opening screen printing the exact byte count it still owes you.",
    hook: "Most web games hide their download behind a spinner. Ours prints 116,282,422 bytes on the door and refuses to open until the debt is paid.",
    date: "2026.10.25",
    readTime: "5 MIN READ",
    author: LOG_AUTHOR,
    heroImage: "/assets/games/exocomplict-cover.jpg",
    gallery: [
      { src: "/assets/games/scenes/exocomplict/02-boss-vantage.png", caption: "BOSS VANTAGE — WORLD TOUR 2026.10.22" },
      { src: "/assets/games/scenes/exocomplict/03-portrait-explore.png", caption: "PORTRAIT EXPLORE, FIRE HELD" },
      { src: "/assets/games/exocomplict-cover.jpg", caption: "WORLD PLATE — NEON FRONTIER, 0.0% OFF-PALETTE" }
    ],
    tags: ["WEB PAYLOAD", "CI EVIDENCE", "WORLD DESIGN", "BANDWIDTH"],
    sections: [
      {
        heading: "FOUR THEATRES, ONE DOOR",
        body: [
          "The registry and the shell now offer four theatres: Frostline Relay, Verdant Bloom, Emberfall Foundry and Vanguard Station. Neon is retired. No parallel world manager was introduced and no combat or progression system was replaced to get there — the worlds merged into the journey that already existed.",
          "The opening awaits Engine.init() plus preloadFile() for the complete WASM and four-world PCK before MASUK. DEPLOY then calls start() on the same instance with --main-pack: no hidden gameplay, no second PCK fetch, no quiet warm-up pretending to be a menu."
        ]
      },
      {
        heading: "THE DOWNLOAD IS THE PRODUCT'S FIRST BOSS",
        body: [
          "First load pulls a 39,514,754-byte WASM and a 76,767,668-byte PCK — 116,282,422 bytes combined, 873 files inside the pack. A plain python http.server compresses neither, so the opening screen shows the real combined byte total while it moves, keeps a watchdog alive when progress stalls, and offers Coba lagi with network-error detail when it fails.",
          "Interrupted-download recovery is a tested feature, not a hope: CI interrupts the WASM and the PCK mid-flight at 100 Mbps and asserts the build recovers. Two earlier runs on the way to this one failed loudly and were fixed the same day: one repaired the merged cover fixture, the next staged 117 byte-identical image references as 69 shared textures without touching a single buffer hash."
        ]
      },
      {
        heading: "THE BOUNDARY WE KEEP",
        body: [
          "Everything above is automated evidence: static checks, 28/28 import-OK Godot tests, export and payload audits, four normal browser boots, and strict selected-Vanguard gameplay in private CI.",
          "What remains UNKNOWN is written down with the same weight as what passed: Android packaging, physical touch behaviour, mobile frame time, a full human Endless Survival run, and final visual acceptance. Headless proof does not get promoted into device claims in this studio — not in the README, not in the blog, not in the pitch."
        ]
      }
    ],
    pullQuote: "Headless proof does not get promoted into device claims.",
    evidence: [
      { label: "GODOT TESTS", value: "28/28 IMPORT-OK", source: "private CI, 25 Oct 2026 — identifiers withheld" },
      { label: "OPENING DOWNLOAD", value: "116,282,422 BYTES", source: "internal world-opening integration report, §11" },
      { label: "TEXTURE DEDUPE", value: "117 REFS → 69 FILES", source: "payload audit, 25 Oct 2026" },
      { label: "RECOVERY DRILL", value: "100 MBPS INTERRUPTED", source: "private CI recovery drill, WASM + PCK cases" }
    ],
    sourceBranch: "INTERNAL // IDENTIFIERS WITHHELD",
    sourceUrl: ""
  },
  {
    id: "post-003",
    code: "UPDATE // 003",
    projectId: "project-005",
    category: "ART DIRECTION",
    title: "A PALETTE SMALL ENOUGH TO AUDIT: NINE HUES, ONE SCRIPT, ZERO DRIFT",
    deck: "EXOCOMPLICT's art direction is a contract written in hex values, and a deterministic build script fails any texture that drifts more than 8% outside it.",
    hook: "Concept art that introduces a new colour family is not \"more interesting\". In a combat HUD where hue is read faster than numbers, it is a bug.",
    date: "2026.10.24",
    readTime: "4 MIN READ",
    author: LOG_AUTHOR,
    heroImage: "/assets/games/exocomplict-dashboard.jpg",
    gallery: [
      { src: "/assets/games/exocomplict-dashboard.jpg", caption: "DASHBOARD PLATE — 0.2% OFF-PALETTE" },
      { src: "/assets/games/exocomplict-hero.jpg", caption: "LOADING KEYART POSTER — 0.0% OFF-PALETTE" },
      { src: "/assets/games/exocomplict-cover.jpg", caption: "WORLD PLATE — JPEG q90 PROGRESSIVE" }
    ],
    tags: ["PALETTE", "ART PIPELINE", "AUDIT", "TYPOGRAPHY"],
    sections: [
      {
        heading: "A PALETTE IS A CONTRACT, NOT A MOOD",
        body: [
          "The combat HUD is built from tokens the player must recognise faster than they can read a number: cyan for energy and data, amber for warning, green for health, red for damage, violet for ability charge only. Nine hue families, named in art vocabulary and mapped one-to-one onto code tokens.",
          "That is why the rule is brutal: no new hue families. Amber is a warning colour first and an accent second. Red and green never appear in decorative art at scale. And if a composition needs exactly one saturated colour, it is cyan — cyan is the brand."
        ]
      },
      {
        heading: "THE AUDIT IS A SCRIPT OR IT IS A WISH",
        body: [
          "The studio's art build script is deterministic: same inputs, byte-identical outputs, and it refuses to invent a file. It crops to the content box, keys the wordmark's painted backdrop to alpha over a 16-level ramp, resizes per asset class, then downsamples every output and buckets each pixel by HSV. Above 8% off-palette the build prints DRIFT; below it, ok. Nine of nine shipping textures pass.",
          "One window was widened by measurement, not by taste: the loading keyart carried 8.9% of its pixels in the 15-25 degree hue band — dark rust and warm dust on oxidised gunmetal — so the amber window moved from 25 to 15 degrees, and the measurement that justified it is recorded in the script. Nothing else was adjusted to make the number pass."
        ]
      },
      {
        heading: "WEIGHT IS A DESIGN DECISION",
        body: [
          "Opaque full-bleed backdrops ship as progressive JPEG at quality 90 because a 1920x1080 painting costs 2.8 MB as PNG and about 430 KB as JPEG. The wordmark, portraits and weapon plates stay PNG: crisp edges that must read at small sizes. The whole shipping inventory is 4.5 MB, with 16 MB of sources kept so the build stays reproducible.",
          "The audit is honest about its own blindness. It is HSV-only: it cannot see composition, legibility or silhouette. So the document carries the rules the script cannot check — one warm key and one cool fill, never a third source; darker corners than subject; and the silhouette test: if the hero does not read at 64 pixels tall, the art failed regardless of how good the render is."
        ]
      }
    ],
    pullQuote: "If a composition needs exactly one saturated colour, it is cyan.",
    evidence: [
      { label: "PALETTE AUDIT", value: "9/9 ON-PALETTE", source: "internal art build script --check, art-direction contract §7" },
      { label: "DRIFT THRESHOLD", value: "8% OFF-PALETTE", source: "internal art-direction contract §5" },
      { label: "KEYART WEIGHT", value: "2.8 MB → ~430 KB", source: "JPEG q90 progressive vs PNG, 1920x1080" },
      { label: "AMBER WINDOW", value: "25° → 15°, MEASURED", source: "8.9% pixels in 15-25° band on keyart" }
    ],
    sourceBranch: "INTERNAL // IDENTIFIERS WITHHELD",
    sourceUrl: ""
  }
];

/** Newest transmission for a project (BLOG_POSTS is ordered newest first). */
export function latestPostForProject(projectId: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.projectId === projectId);
}
