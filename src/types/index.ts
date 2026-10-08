export type SystemSection = 
  | 'hub' 
  | 'projects' 
  | 'lab' 
  | 'archive' 
  | 'origin' 
  | 'founder' 
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
  loreQuote: string;
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
