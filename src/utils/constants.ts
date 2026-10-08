import { GameProject, LabExperiment, ArchiveEntry, CrewMember } from '../types';

export const SYSTEM_METADATA = {
  codename: "ZYVRO_OS_v2026.09",
  build: "2026.09.27-RELEASE",
  kernel: "Z-CORE.64x",
  status: "ONLINE",
  coordinates: "LAT: 37.7749° N // LON: 122.4194° W // ALT: 412M",
  originYear: "2026",
  securityTier: "TIER-0 ENCRYPTED",
  tagline: "WE BUILD GAMES, INTERACTIVE WORLDS, AND EXPERIMENTAL DIGITAL EXPERIENCES.",
};

export const GAME_PROJECTS: GameProject[] = [
  {
    id: "project-001",
    code: "PROJECT 001",
    title: "VALEN",
    codename: "PROJECT_VALEN",
    genre: "SURVIVAL / PSYCHOLOGICAL HORROR",
    tagline: "THE SANITY MESH IS DEGRADING. REBUILD THE PROTOCOL BEFORE DAWN.",
    brief: "A brutalist bio-mechanical horror experience where psychological stress physically distorts the architecture of the underground containment complex.",
    description: "VALEN drops players into Sub-Level 09 of the Valen Biomechatronic Containment Vault. As the automated oxygen scrubber decays, anomalous audio hallucinations materialize into physical kinetic threats. Built on proprietary Z-Engine spatial audio rendering, sound is both your primary navigation tool and your deadliest adversary.",
    status: "ACTIVE",
    build: "BUILD 0.8.4",
    engine: "UNREAL 5.5 // Z-CORE NEURAL",
    threatLevel: "CRITICAL",
    year: "2026",
    progress: {
      world: 82,
      characters: 100,
      combat: 64,
      audio: 95
    },
    features: [
      "Dynamic acoustic threat simulation (Raytraced binaural audio)",
      "Procedural bio-mechanical decay & structural morphology",
      "Zero-HUD immersive telemetry (Biometric wrist monitor & eye focus)",
      "Non-linear subterranean vault architecture"
    ],
    specs: {
      targetPlatforms: ["PC // STEAM", "PLAYSTATION 5", "XBOX SERIES X"],
      rendering: "Raytracing Lumen + DirectStorage 1.2",
      physics: "Custom PhysX Cloth & Bio-Viscosity",
      multiplayer: "Solo / Optional 2-Player Asymmetric Co-op"
    },
    images: {
      hero: "/assets/games/valen-hero.jpg",
      cover: "/assets/games/valen-concept-1.jpg",
      conceptArt: [
        "/assets/games/valen-concept-1.jpg",
        "/assets/games/valen-concept-2.jpg",
        "/assets/games/valen-hero.jpg"
      ]
    },
    loreQuote: "“In the dark, we realized the containment unit wasn't built to keep them inside. It was built to keep the universe from finding us.”"
  },
  {
    id: "project-002",
    code: "PROJECT 002",
    title: "EXO-CHRONO",
    codename: "TEMPORAL_BREACH",
    genre: "TEMPORAL TACTICAL EXTRACTION",
    tagline: "COLLAPSE THE TIMELINE. EXTRACT THE QUANTUM CORE. REWRITE REALITY.",
    brief: "High-velocity tactical shooter centered around localized time-dilation fields, gravity anomalies, and high-frequency military ballistic simulation.",
    description: "Set across the shattered orbital ring of Kepler-44, EXO-CHRONO challenges strike teams to breach unstable temporal fissures. Deploy temporal rewind beacons, freeze ballistic trajectories mid-flight, and engage rival extraction units across multi-dimensional combat corridors.",
    status: "TESTING",
    build: "BUILD 0.9.1",
    engine: "CUSTOM Z-ENGINE V3.2",
    threatLevel: "OMEGA",
    year: "2026",
    progress: {
      world: 91,
      characters: 88,
      combat: 94,
      audio: 90
    },
    features: [
      "Sub-millisecond Server Authoritative Rollback Time-Reversal",
      "High-velocity Ballistic Trajectory Physics with Vector Stasis",
      "Dynamic Multi-altitude Orbital Extraction Zones",
      "Full Customization Rig: Exoskeletons & Magnetic Rail Munitions"
    ],
    specs: {
      targetPlatforms: ["PC // STEAM", "EPIC GAMES"],
      rendering: "Vulkan 1.3 + Mesh Shader Pipeline",
      physics: "Custom Temporal Collision Matrix",
      multiplayer: "3v3v3 Tactical Extraction // Dedicated 128-tick"
    },
    images: {
      hero: "/assets/games/exo-chrono-hero.jpg",
      cover: "/assets/games/exo-chrono-concept-1.jpg",
      conceptArt: [
        "/assets/games/exo-chrono-concept-1.jpg",
        "/assets/games/exo-chrono-hero.jpg"
      ]
    },
    loreQuote: "“Time is not a straight arrow. Out here, it is a weapon. And whoever controls the frequency commands the battlefield.”"
  },
  {
    id: "project-003",
    code: "PROJECT 003",
    title: "NULL // SECTOR",
    codename: "DARK_SUBVERSION",
    genre: "CYBER-SUBVERSION TACTICAL RPG",
    tagline: "DISCONNECT FROM THE GRID. OVERRIDE THE AUTONOMOUS ENCLAVES.",
    brief: "A brutalist cyberpunk infiltration RPG focusing on deep terminal hacking, neural hardware augmentation, and corporate state sabotage.",
    description: "In the monolithic underground cities governed by autonomous algorithmic oligarchs, you operate as an untethered ghost agent. Subvert surveillance grids, breach encrypted defense hubs through interactive assembly code, and recruit rogue synthetics to ignite systemic collapse.",
    status: "ALPHA",
    build: "BUILD 0.4.7",
    engine: "Z-CORE ISOMETRIC ENGINE",
    threatLevel: "ALPHA",
    year: "2027",
    progress: {
      world: 68,
      characters: 75,
      combat: 50,
      audio: 60
    },
    features: [
      "Real-time In-game Hexadecimal & Logic Gate Terminal Hacking",
      "Dynamic Branching Faction Reputation System",
      "Modular Cyberware Augmentation with Thermal Overheat Penalties",
      "Atmospheric Dark Industrial Synth-Dark Ambient Soundscapes"
    ],
    specs: {
      targetPlatforms: ["PC // LINUX // MAC", "CONSOLE SYSTEMS"],
      rendering: "DirectX 12 Ultimate HDR",
      physics: "Destructible Grid Geometry",
      multiplayer: "Single Player Tactical Campaign"
    },
    images: {
      hero: "/assets/games/null-sector-hero.jpg",
      cover: "/assets/games/null-sector-concept-1.jpg",
      conceptArt: [
        "/assets/games/null-sector-concept-1.jpg",
        "/assets/games/null-sector-hero.jpg"
      ]
    },
    loreQuote: "“They locked our thoughts in silicon cages. We will burn their networks until only static remains.”"
  },
  {
    id: "project-004",
    code: "PROJECT 004",
    title: "AETHER VOYAGER",
    codename: "VOID_ANOMALY",
    genre: "HARD SCI-FI DEEP VOID SIMULATION",
    tagline: "CHART UNKNOWN ANOMALIES AT THE EVENT HORIZON OF THE VOID.",
    brief: "An uncompromising hard science-fiction exploration sim of anomalous astrophysical structures and derelict alien Megastructures.",
    description: "Command the research vessel *Vanguard-Z* through uncharted gravitationally unstable sectors. Conduct spectrometer scans, repair modular ship reactors during radioactive solar flurries, and decode cosmic radio bursts that hint at ancient extraterrestrial intelligence.",
    status: "CLASSIFIED",
    build: "BUILD 0.3.1-PROTOTYPE",
    engine: "Z-CORE ASTRONOMICAL PHYSX",
    threatLevel: "CRITICAL",
    year: "2027",
    progress: {
      world: 45,
      characters: 60,
      combat: 30,
      audio: 70
    },
    features: [
      "1:1 Scale Astrodynamics & Orbital Mechanics Calculations",
      "Atmospheric Re-entry Thermal & Structural Stress Simulation",
      "Spectrographic Alien Relic Decryption System",
      "Immersive Cockpit Telemetry with 40+ Interactive Physical Switch Rigs"
    ],
    specs: {
      targetPlatforms: ["PC EXCLUSIVE // VR SUPPORTED"],
      rendering: "Volumetric Nebula Raymarching",
      physics: "N-Body Orbital Gravitation Solver",
      multiplayer: "4-Crew Cooperative Operations"
    },
    images: {
      hero: "/assets/games/aether-voyager-hero.jpg",
      cover: "/assets/games/aether-voyager-concept-1.jpg",
      conceptArt: [
        "/assets/games/aether-voyager-concept-1.jpg",
        "/assets/games/aether-voyager-hero.jpg"
      ]
    },
    loreQuote: "“When you stare into the deep radio silence between stars, you aren't listening for sound. You are listening for consciousness.”"
  }
];

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
    title: "ARCHITECTING SUB-LEVEL 09: VALEN ACOUSTIC HORROR",
    category: "WORLD DESIGN",
    timestamp: "2026.08.14 — 03:42:19 UTC",
    build: "BUILD 0.7.2",
    author: "PLAYER_001 [DESIGN_ARCHITECT]",
    summary: "How we replaced conventional jump scares with raytraced spatial resonance and player-induced acoustic stress in project VALEN.",
    content: [
      "In early design phases of VALEN, we noticed that visual monster reveals lose 60% of their psychological dread after the third encounter. Fear thrives not in what is seen, but in what the player's brain must construct to explain what they hear.",
      "We engineered the Z-Acoustic pipeline: every surface in the bunker possesses real-world acoustic impedance. Metal grates echo footsteps into distant shafts, while porous biological mold muffles echoes unpredictably.",
      "The result: the bunker feels like a living, listening predator."
    ]
  },
  {
    id: "log-002",
    code: "LOG // 002",
    title: "SUB-FRAME TIME REVERSAL IN MULTIPLAYER: EXO-CHRONO",
    category: "COMBAT TEST",
    timestamp: "2026.07.29 — 19:15:02 UTC",
    build: "BUILD 0.8.9",
    author: "PLAYER_002 [COMBAT_LEAD]",
    summary: "Overcoming deterministic server rollback when players trigger localized temporal rewind grenades in 128-tick competitive matches.",
    content: [
      "Simulating time reversal for a single player in a singleplayer game is trivial. In a 9-player extraction zone, if Player A rewinds 4.0 seconds while Player B fires a railgun through the rewind path, traditional netcode explodes.",
      "We resolved this by partitioning space into localized 'temporal bubbles'. Only entities inside the bubble recalculate their transform history buffers, leaving the global tick rate unaffected.",
      "Combat test results show sub-2ms synchronization overhead across global server clusters."
    ]
  },
  {
    id: "log-003",
    code: "LOG // 003",
    title: "ABANDONED EXPERIMENT: THE PHANTOM REVENUE MATRIX",
    category: "CLASSIFIED",
    timestamp: "2026.05.11 — 22:04:44 UTC",
    build: "EXP_DEAD_SYS",
    author: "SYSTEM_CORE",
    summary: "Declassified post-mortem on why we purged conventional predatory monetization systems from our engine blueprints.",
    content: [
      "We conducted an internal simulation test: What if game mechanics are intentionally gated by friction to drive micro-transactions? The conclusion was unequivocal.",
      "Predatory design destroys gameplay rhythm, breaks player immersion, and turns creative worlds into bland financial spreadsheets.",
      "Mandate #01 codified: Zyvro Labs will only build games that respect the player's intelligence, time, and emotional investment. No battle passes, no fake timers."
    ],
    isClassified: true
  },
  {
    id: "log-004",
    code: "LOG // 004",
    title: "SYNTHESIZING THE ACID SOUNDSCAPE: AUDIO ENGINEERING",
    category: "AUDIO SYNTHESIS",
    timestamp: "2026.04.03 — 14:18:30 UTC",
    build: "AUDIO_RIG_V2",
    author: "PLAYER_004 [AUDIO_DIRECTOR]",
    summary: "Creating the signature ZYVRO audio identity: low-frequency industrial drones, mechanical contact mics, and granular bio-acoustic noise.",
    content: [
      "Standard EDM synth drops and orchestra horns don't fit dark industrial laboratories. We spent four weeks recording contact microphones attached to hydraulic presses, high-voltage transformers, and MRI chillers.",
      "By pitch-shifting industrial friction by -36 semitones and applying granular distortion, we developed the signature Zyvro hum."
    ]
  },
  {
    id: "log-005",
    code: "LOG // 005",
    title: "AUTONOMOUS ADVERSARIAL AGENTS: NEURAL ENEMY BEHAVIOR",
    category: "AI LOGIC",
    timestamp: "2026.02.18 — 09:30:11 UTC",
    build: "NEURAL_NET_0.3",
    author: "PLAYER_005 [AI_ENGINEER]",
    summary: "Replacing scripted state machines with utility-based neural models that hunt players using smell, sound trails, and predictive flank routes.",
    content: [
      "In traditional games, enemies wander pre-baked patrol paths. In VALEN and NULL//SECTOR, the AI builds an internal probability heatmap of where the player is likely hiding based on door activations, light switches, and spent shell casings.",
      "If you hide in a locker, the AI doesn't automatically know. But if you left a blood trail leading to that locker, its suspicion index spikes to 95%."
    ]
  }
];

export const CREW_MEMBERS: CrewMember[] = [
  {
    id: "crew-001",
    playerCode: "PLAYER_001",
    name: "KAELEN VEX",
    alias: "ARCHITECT // 001",
    role: "SYSTEM ARCHITECT & GAME DIRECTOR",
    department: "CORE DIRECTION // SYSTEMS",
    status: "ONLINE",
    stats: {
      design: 98,
      code: 88,
      art: 82,
      lore: 96
    },
    loadout: ["UNREAL ENGINE 5.5", "Z-CORE ARCHITECTURE", "SPATIAL MECHANICS", "NEURAL WORLD-BUILDING"],
    bio: "Ex-AAA technical director turned experimental game auteur. Obsessed with high-tension tactile immersion, brutalist world design, and boundary-pushing atmospheric mechanics.",
    avatar: "/assets/crew/player-001.jpg"
  },
  {
    id: "crew-002",
    playerCode: "PLAYER_002",
    name: "VALERIE CHEN",
    alias: "BALLISTIC // 002",
    role: "LEAD COMBAT & SYSTEMS DESIGNER",
    department: "GAMEPLAY // COMBAT DYNAMICS",
    status: "IN LAB",
    stats: {
      design: 95,
      code: 90,
      art: 68,
      lore: 74
    },
    loadout: ["PHYSICS SOLVERS", "SUB-FRAME ROLLBACK", "WEAPON BALLISTICS", "MECHATRONIC KINEMATICS"],
    bio: "Pioneered the localized time-dilation network architecture in EXO-CHRONO. Former competitive tactical shooter champion and mechanical engineer.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=90&auto=format&fit=crop"
  },
  {
    id: "crew-003",
    playerCode: "PLAYER_003",
    name: "RAVEN KORR",
    alias: "SHIFTER // 003",
    role: "PRINCIPAL TECHNICAL ARTIST & SHADER WITCH",
    department: "VISUAL TECH // RENDER ENGINES",
    status: "COMPILING",
    stats: {
      design: 80,
      code: 94,
      art: 98,
      lore: 78
    },
    loadout: ["HLSL / GLSL SHADERS", "VOLUMETRIC RAYMARCHING", "COMPUTE MESH PIPELINES", "DARK INDUSTRIAL LIGHTING"],
    bio: "Crafts custom compute shaders, procedural micro-geometry, and the signature toxic lime atmospheric illumination that defines Zyvro's visual identity.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=90&auto=format&fit=crop"
  },
  {
    id: "crew-004",
    playerCode: "PLAYER_004",
    name: "MORGAN VANCE",
    alias: "SYNTH // 004",
    role: "AUDIO DIRECTOR & ACOUSTIC SYNTHESIST",
    department: "SPATIAL AUDIO // FOLEY LAB",
    status: "ONLINE",
    stats: {
      design: 86,
      code: 75,
      art: 88,
      lore: 92
    },
    loadout: ["MODULAR SYNTHESIS RIG", "BINAURAL RAYTRACING", "HYDROPHONE / CONTACT MICS", "SUB-BASS HARMONICS"],
    bio: "Composer and acoustic researcher behind the harrowing sound design of VALEN. Specializes in psychoacoustic tension triggers and industrial sub-bass rumbles.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=90&auto=format&fit=crop"
  },
  {
    id: "crew-005",
    playerCode: "PLAYER_005",
    name: "DR. ASTRA NOVA",
    alias: "CYBERNET // 005",
    role: "AI ARCHITECT & PROCEDURAL ENGINEER",
    department: "NEURAL LOGIC // EXPERIMENTAL LAB",
    status: "DEEP DIVE",
    stats: {
      design: 78,
      code: 99,
      art: 72,
      lore: 89
    },
    loadout: ["REINFORCEMENT LEARNING", "PROCEDURAL TOPOLOGY", "GENETIC SENSORY SYSTEMS", "GPU COMPUTE SOLVERS"],
    bio: "Specializes in self-evolving artificial predators and procedural world generation algorithms in Zyvro Labs' R&D division.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=90&auto=format&fit=crop"
  }
];

export const ORIGIN_MANIFESTO = {
  entity: "ZYVRO LABS",
  type: "INDEPENDENT GAME STUDIO & EXPERIMENTAL DIGITAL WORLD",
  origin: "2026",
  status: "INDEPENDENT // SELF-SOVEREIGN // EXPERIMENTAL",
  focus: ["HIGH-TENSION MECHANICS", "ATMOSPHERIC WORLDS", "UNCOMPROMISING TECHNICAL UI", "HARD INDUSTRIAL AESTHETICS"],
  manifesto: [
    "We believe modern gaming has grown complacent: bloated corporate committees, recycled formulas, and hollow cinematic distractions.",
    "Zyvro Labs is a return to mechanical weight, sensory audacity, and pure digital craft.",
    "We do not build ordinary web portals. Every interface we construct, every engine we compile, and every world we release is designed to immerse you into a living simulation.",
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
      title: "TECHNICAL AUDACITY",
      desc: "We engineer custom pipelines, proprietary procedural algorithms, and reactive game systems that challenge hardware limits."
    }
  ]
};
