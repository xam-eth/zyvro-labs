export type SystemSection = 
  | 'hub' 
  | 'projects' 
  | 'lab' 
  | 'archive' 
  | 'origin' 
  | 'crew' 
  | 'transmission';

export interface GameProject {
  id: string;
  code: string; // e.g. "PROJECT 001"
  title: string;
  codename: string;
  genre: string;
  tagline: string;
  brief: string;
  description: string;
  status: 'ACTIVE' | 'TESTING' | 'ALPHA' | 'CLASSIFIED';
  build: string;
  engine: string;
  threatLevel: 'OMEGA' | 'ALPHA' | 'CRITICAL' | 'STABLE';
  year: string;
  progress: {
    world: number;
    characters: number;
    combat: number;
    audio: number;
  };
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
  category: 'WORLD DESIGN' | 'AI LOGIC' | 'COMBAT TEST' | 'AUDIO SYNTHESIS' | 'CLASSIFIED';
  timestamp: string;
  build: string;
  author: string;
  summary: string;
  content: string[];
  isClassified?: boolean;
}

export interface CrewMember {
  id: string;
  playerCode: string; // e.g. "PLAYER_001"
  name: string;
  alias: string;
  role: string;
  department: string;
  status: 'ONLINE' | 'IN LAB' | 'COMPILING' | 'DEEP DIVE';
  stats: {
    design: number;
    code: number;
    art: number;
    lore: number;
  };
  loadout: string[];
  bio: string;
  avatar: string;
}

export interface TransmissionForm {
  from: string;
  callsign: string;
  frequency: string;
  purpose: 'BUSINESS' | 'COLLABORATION' | 'PRESS' | 'TALENT' | 'CLASSIFIED';
  message: string;
}

export interface SystemStats {
  coordinates: string;
  fps: number;
  latencyMs: number;
  systemLoad: number;
  memoryUsage: string;
  uptime: string;
  securityState: 'ENCRYPTED' | 'CLEAR' | 'ANOMALOUS';
}
