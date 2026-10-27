export type SystemSection = 
  | 'hub' 
  | 'projects' 
  | 'lab' 
  | 'archive' 
  | 'origin' 
  | 'blog'
  | 'transmission';

export interface ProgressMetric {
  label: string;
  value: number; // 0-100, derived from the evidence string
  evidence: string;
}

export interface GameProject {
  id: string;
  featured: boolean; // the first release, shown as the hub hero
  code: string; // e.g. "PROJECT 001"
  title: string;
  codename: string;
  genre: string;
  tagline: string;
  brief: string;
  description: string;
  status: 'ACTIVE' | 'TESTING' | 'ALPHA' | 'BETA' | 'PROTOTYPE' | 'CLASSIFIED';
  build: string;
  engine: string;
  threatLevel: 'OMEGA' | 'ALPHA' | 'CRITICAL' | 'STABLE';
  year: string;
  progress: ProgressMetric[];
  features: string[];
  specs: {
    targetPlatforms: string[];
    rendering: string;
    physics: string;
    multiplayer: string;
  };
  images: {
    hero: string;
    cover: string;
    conceptArt: string[];
  };
  /** The commercial heart of the build: 3-4 short selling points, plain spoken,
   *  shown under the game detail and on the hub. Must be true and checkable. */
  coreSell: string[];
  loreQuote: string;
  /** False when the game repository is private: the site then hides every
   *  repository/branch locator and points readers at the DEV BLOG article
   *  instead. Set by the owner; never infer it. */
  sourcePublic?: boolean;
  links: {
    repository: string;
    branch: string;
    sourceUrl: string;
  };
}

export interface LabExperiment {
  id: string;
  code: string;
  title: string;
  category: 'BIO-NEURAL' | 'PROCEDURAL' | 'CRYPTOGRAPHIC' | 'PHYSICS';
  status: 'ACTIVE' | 'TESTING' | 'CLASSIFIED' | 'EXPERIMENTAL';
  description: string;
  version: string;
  interactiveType: 'creature' | 'terrain' | 'cipher' | 'gravity';
  metrics: { label: string; value: string }[];
}

export interface ArchiveEntry {
  id: string;
  code: string;
  title: string;
  category: 'WORLD DESIGN' | 'AI LOGIC' | 'COMBAT TEST';
  timestamp: string;
  build: string;
  author: string;
  summary: string;
  content: string[];
}

/** One entry of the public development blog (DEV BLOG section). */
export interface BlogSection {
  heading: string;
  body: string[];
}

export interface BlogEvidence {
  label: string;
  value: string;
  source: string; // branch / commit / CI run the number was read from
}

export interface BlogPost {
  id: string;
  code: string;              // e.g. "UPDATE // 001"
  projectId: string;         // id of the GAME_PROJECTS entry it reports on
  category: 'BUILD UPDATE' | 'ART DIRECTION' | 'SYSTEMS' | 'WORLD DESIGN';
  title: string;             // hook headline
  deck: string;              // standfirst under the headline
  hook: string;              // one-line hook used on compact cards
  date: string;              // "2026.10.25"
  readTime: string;          // "6 MIN READ"
  author: string;
  heroImage: string;
  gallery: { src: string; caption: string }[];
  tags: string[];
  sections: BlogSection[];
  pullQuote: string;
  evidence: BlogEvidence[];
  sourceBranch: string;
  sourceUrl: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface FounderProfile {
  name: string;         // real name, as used on the founder's public profiles
  role: string;         // e.g. "Founder · Game developer"
  location: string;     // real city or country
  photo: string;        // path under /assets/founder/ — a real photo of the founder
  bio: string;          // two or three true sentences, approved by the founder
  workStyle: string;    // how the work is actually done
  links: SocialLink[];  // verified profiles only
}

export interface TransmissionForm {
  from: string;
  callsign: string;
  purpose: 'BUSINESS' | 'PARTNERSHIP' | 'PRESS' | 'PLAYER FEEDBACK';
  message: string;
}

export interface SystemStats {
  fps: number;
  latencyMs: number;
  systemLoad: number;
  memoryUsage: string;
  uptime: string;
  securityState: 'ENCRYPTED' | 'CLEAR' | 'ANOMALOUS';
}
