import React, { useState } from 'react';
import { ORIGIN_MANIFESTO, SYSTEM_METADATA } from '../utils/constants';
import { sound } from '../utils/soundManager';
import { ZyvroLogo, ZVColorMode } from './ZyvroLogo';
import { 
  Globe, 
  Terminal, 
  Code2, 
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  Copy,
  Check
} from 'lucide-react';

export const OriginSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manifesto' | 'brandkit'>('manifesto');
  const [previewColorMode, setPreviewColorMode] = useState<ZVColorMode>('full-color');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { label: 'DARK / VOID', hex: '#080808', rgb: '8, 8, 8', role: 'Primary Background' },
    { label: 'SURFACE INDUSTRIAL', hex: '#202020', rgb: '32, 32, 32', role: 'Containers & HUD Cards' },
    { label: 'TOXIC LIME', hex: '#D7FF3F', rgb: '215, 255, 63', role: 'Signature Neon Accent & Action V' },
    { label: 'TITANIUM SILVER', hex: '#E2E8F0', rgb: '226, 232, 240', role: 'Primary Typography & Metallic Z' },
  ];

  const handleCopy = (hex: string) => {
    sound.playClick();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      
      {/* Top Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <Globe className="w-3.5 h-3.5 text-[#D7FF3F]" />
            <span>ORIGIN SPECIFICATION &amp; PHILOSOPHY</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">IDENTITY ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            SYSTEM // ORIGIN
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 bg-[#101010] border border-[#262626] p-1">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('manifesto');
            }}
            className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all ${
              activeTab === 'manifesto'
                ? 'bg-[#D7FF3F] text-[#080808] font-bold shadow-[0_0_15px_rgba(215,255,63,0.3)]'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            MANIFESTO &amp; PILLARS
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('brandkit');
            }}
            className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all ${
              activeTab === 'brandkit'
                ? 'bg-[#D7FF3F] text-[#080808] font-bold shadow-[0_0_15px_rgba(215,255,63,0.3)]'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            MASTER BRANDKIT // ZV
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: MANIFESTO & PHILOSOPHY
      ========================================================================= */}
      {activeTab === 'manifesto' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
          
          {/* Left Column: Core System Identifier Specification (5 cols) */}
          <div className="lg:col-span-5 bg-[#0f0f0f] border border-[#262626] p-6 space-y-6 shadow-[0_0_35px_rgba(0,0,0,0.8)] relative">
            
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

            {/* System Spec Table */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#202020] pb-2">
                <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">ENTITY</span>
                <span className="text-sm font-bold font-display text-white">{ORIGIN_MANIFESTO.entity}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#202020] pb-2">
                <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">SLOGAN</span>
                <span className="text-xs font-mono text-[#D7FF3F] font-bold tracking-widest">PLAY BEYOND LIMITS</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#202020] pb-2">
                <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">TYPE</span>
                <span className="text-xs font-mono text-[#D7FF3F] font-bold">INDEPENDENT GAME STUDIO</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#202020] pb-2">
                <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">ORIGIN YEAR</span>
                <span className="text-xs font-mono text-white">{ORIGIN_MANIFESTO.origin}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#202020] pb-2">
                <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">STATUS</span>
                <span className="text-xs font-mono text-[#D7FF3F] font-bold">SOVEREIGN // ACTIVE</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase block">
                  CORE FOCUS DOMAINS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ORIGIN_MANIFESTO.focus.map((f, idx) => (
                    <span key={idx} className="px-2 py-1 bg-[#171717] border border-[#282828] text-[10px] font-mono text-[#D0D0D0]">
                      ◈ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bold Core Statement */}
            <div className="p-4 bg-[#141414] border-l-2 border-[#D7FF3F] space-y-2">
              <div className="text-xs font-mono text-[#A0A0A0] uppercase tracking-widest">DIRECTIVE // 01</div>
              <p className="text-sm md:text-base font-display font-bold text-white tracking-wide leading-snug">
                WE CRAFT HIGH-PERFORMANCE EXPERIENCES THAT PUSH BOUNDARIES AND REDEFINE WHAT'S POSSIBLE.
              </p>
            </div>

            {/* Technical Telemetry */}
            <div className="text-[10px] font-mono text-[#666666] space-y-1">
              <div>KERNEL: {SYSTEM_METADATA.kernel}</div>
              <div>COORDINATES: {SYSTEM_METADATA.coordinates}</div>
            </div>

          </div>

          {/* Right Column: Studio Manifesto & 3 Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Manifesto Box */}
            <div className="bg-[#0b0b0b] border border-[#202020] p-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#D7FF3F] tracking-widest uppercase">
                <Terminal className="w-4 h-4 text-[#D7FF3F]" />
                <span>THE ZYVRO MANIFESTO</span>
              </div>

              <div className="space-y-3 text-xs md:text-sm font-mono text-[#B0B0B0] leading-relaxed">
                {ORIGIN_MANIFESTO.manifesto.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* 3 Core Pillars */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#666666] uppercase tracking-widest">
                SYSTEM PILLARS // THREE TENETS
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ORIGIN_MANIFESTO.pillars.map((pillar) => (
                  <div 
                    key={pillar.code}
                    onMouseEnter={() => sound.playHover()}
                    className="p-4 bg-[#0e0e0e] border border-[#222222] hover:border-[#D7FF3F]/50 transition-colors space-y-2 group"
                  >
                    <div className="text-[10px] font-mono text-[#D7FF3F] font-bold">
                      TENET // {pillar.code}
                    </div>
                    <h3 className="text-xs font-bold font-display text-white uppercase group-hover:text-[#D7FF3F] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#888888] leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: OFFICIAL BRANDKIT // ZV MASTER SYSTEM
      ========================================================================= */}
      {activeTab === 'brandkit' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Master Identity Overview Card */}
          <div className="bg-[#0d0d0d] border border-[#262626] p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-[#D7FF3F] tracking-widest uppercase block mb-1">
                  OFFICIAL BRAND IDENTITY
                </span>
                <h2 className="text-2xl md:text-4xl font-black font-display text-white uppercase tracking-tight">
                  ZYVRO LABS // ZV MONOGRAM
                </h2>
                <p className="text-xs md:text-sm font-mono text-[#A0A0A0] max-w-2xl mt-2">
                  An interlocking fusion of heavy brushed titanium steel (Z) and energetic radiant toxic lime (V). Precision-engineered for high-velocity games, next-gen operating systems, and scalable cross-platform visual media.
                </p>
              </div>

              {/* Color Mode Interactive Switcher */}
              <div className="bg-[#141414] border border-[#292929] p-2 flex flex-wrap gap-2">
                <span className="text-[10px] font-mono text-[#666666] uppercase block w-full text-center">
                  VIEW MODE:
                </span>
                {(['full-color', 'toxic-lime', 'monochrome-white', 'monochrome-dark'] as ZVColorMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      sound.playClick();
                      setPreviewColorMode(mode);
                    }}
                    className={`px-2.5 py-1 text-[11px] font-mono uppercase transition-all ${
                      previewColorMode === mode
                        ? 'bg-[#D7FF3F] text-[#080808] font-bold'
                        : 'bg-[#1e1e1e] text-[#888888] hover:text-white'
                    }`}
                  >
                    {mode.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Showcase Grid (1:1 Symbol, Horizontal, Vertical, App Icon) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              
              {/* 1. Master Symbol 1:1 — NEW BRAND LOGO */}
              <div className={`p-6 border border-[#222222] flex flex-col items-center justify-between space-y-4 rounded transition-colors ${
                previewColorMode === 'monochrome-white' ? 'bg-[#18181b]' : previewColorMode === 'monochrome-dark' ? 'bg-[#f4f4f5]' : 'bg-[#121212]'
              }`}>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider">
                  01 // 1:1 MASTER SYMBOL
                </span>
                <div className="p-4 flex items-center justify-center">
                  <ZyvroLogo variant="symbol" colorMode={previewColorMode} size={84} />
                </div>
                <span className="text-[10px] font-mono text-[#A0A0A0]">ICON / AVATAR / FAVICON</span>
              </div>

              {/* 2. Horizontal Master Lockup — NEW BRAND LOGO */}
              <div className={`p-6 border border-[#222222] flex flex-col items-center justify-between space-y-4 rounded transition-colors ${
                previewColorMode === 'monochrome-white' ? 'bg-[#18181b]' : previewColorMode === 'monochrome-dark' ? 'bg-[#f4f4f5]' : 'bg-[#121212]'
              }`}>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider">
                  02 // HORIZONTAL LOCKUP
                </span>
                <div className="p-4 flex items-center justify-center">
                  <img 
                    src="/assets/brandkit/zyvro-zv-horizontal-lockup-new.png" 
                    alt="ZYVRO LABS Horizontal Lockup"
                    className="w-full max-w-xs object-contain pointer-events-none"
                    style={{ filter: previewColorMode === 'monochrome-dark' ? 'brightness(0.15) contrast(2) grayscale(1)' : previewColorMode === 'monochrome-white' ? 'brightness(2) contrast(1.5) grayscale(1)' : 'none' }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#A0A0A0]">WEB HUD / HEADER / SPONSOR</span>
              </div>

              {/* 3. Vertical Stacked Lockup */}
              <div className={`p-6 border border-[#222222] flex flex-col items-center justify-between space-y-4 rounded transition-colors ${
                previewColorMode === 'monochrome-white' ? 'bg-[#18181b]' : previewColorMode === 'monochrome-dark' ? 'bg-[#f4f4f5]' : 'bg-[#121212]'
              }`}>
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider">
                  03 // VERTICAL STACKED
                </span>
                <div className="p-2 flex items-center justify-center">
                  <ZyvroLogo variant="vertical" colorMode={previewColorMode} size={64} />
                </div>
                <span className="text-[10px] font-mono text-[#A0A0A0]">POSTER / GAME SPLASH / BOOT</span>
              </div>

              {/* 4. App Icon Squircle */}
              <div className="p-6 bg-[#121212] border border-[#222222] flex flex-col items-center justify-between space-y-4 rounded">
                <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider">
                  04 // APP STORE &amp; STEAM
                </span>
                <div className="w-20 h-20 rounded-2xl bg-[#080808] border-2 border-[#D7FF3F]/80 p-2 flex items-center justify-center shadow-[0_0_20px_rgba(215,255,63,0.3)]">
                  <img 
                    src="/assets/brandkit/zyvro-zv-symbol-lime-256px.png" 
                    alt="ZYVRO App Icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#A0A0A0]">IOS / ANDROID / STEAM LAUNCHER</span>
              </div>

            </div>

          </div>

          {/* Color Palette Hierarchy */}
          <div className="bg-[#0b0b0b] border border-[#202020] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#D7FF3F] uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D7FF3F]" />
                OFFICIAL COLOR SPECIFICATION
              </span>
              <span className="text-[10px] font-mono text-[#666666]">CLICK SWATCH TO COPY HEX</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {colors.map((c) => (
                <div 
                  key={c.hex}
                  onClick={() => handleCopy(c.hex)}
                  onMouseEnter={() => sound.playHover()}
                  className="p-4 bg-[#141414] border border-[#282828] hover:border-[#D7FF3F] transition-all cursor-pointer group space-y-3"
                >
                  <div 
                    className="h-16 w-full border border-black/30 flex items-center justify-center"
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedHex === c.hex && (
                      <span className="px-2 py-1 bg-black/80 text-[#D7FF3F] text-[10px] font-bold font-mono flex items-center gap-1">
                        <Check className="w-3 h-3" /> COPIED
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-white group-hover:text-[#D7FF3F] transition-colors">
                        {c.hex}
                      </span>
                      <Copy className="w-3.5 h-3.5 text-[#666666] group-hover:text-white" />
                    </div>
                    <span className="text-[11px] font-mono text-[#A0A0A0] block mt-0.5">{c.label}</span>
                    <span className="text-[9px] font-mono text-[#666666] block mt-1">RGB: {c.rgb}</span>
                    <span className="text-[9px] font-mono text-[#777777] block italic">{c.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Master 4K Assets & Vector Downloads Matrix */}
          <div className="bg-[#0b0b0b] border border-[#202020] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#202020] pb-3">
              <div>
                <span className="text-xs font-mono text-[#D7FF3F] uppercase tracking-widest flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D7FF3F]" />
                  4K MASTER RENDERS &amp; VECTOR ASSETS
                </span>
                <span className="text-[11px] font-mono text-[#666666]">
                  HIGH DENSITY PRODUCTION ASSETS (.JPG 4K, .PNG TRANSPARENT, .SVG VECTOR)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Asset 1: Brandkit Overview Board */}
              <div className="bg-[#121212] border border-[#252525] p-3 space-y-2 group">
                <div className="aspect-video w-full overflow-hidden bg-black relative">
                  <img 
                    src="/assets/brandkit/zyvro-zv-brandkit-overview.jpg" 
                    alt="Master Brandkit Presentation Board"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-[#D7FF3F] border border-[#D7FF3F]/40">
                    4K MASTER BOARD
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-white font-bold">BRAND IDENTITY BOARD</span>
                  <a 
                    href="/assets/brandkit/zyvro-zv-brandkit-overview.jpg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#D7FF3F] hover:underline"
                  >
                    VIEW 4K ↗
                  </a>
                </div>
              </div>

              {/* Asset 2: 1:1 Master Symbol — NEW BRAND */}
              <div className="bg-[#121212] border border-[#252525] p-3 space-y-2 group">
                <div className="aspect-square w-full overflow-hidden bg-black relative max-h-48 flex items-center justify-center">
                  <img 
                    src="/assets/brandkit/zyvro-zv-symbol-lime.png" 
                    alt="1:1 Master Symbol Lime"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-[#D7FF3F] border border-[#D7FF3F]/40">
                    1:1 LIME // 1254px
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-white font-bold">1:1 SYMBOL (LIME)</span>
                  <a 
                    href="/assets/brandkit/zyvro-zv-symbol-lime.png" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#D7FF3F] hover:underline"
                  >
                    VIEW ↗
                  </a>
                </div>
              </div>

              {/* Asset 3: Horizontal Lockup — NEW BRAND */}
              <div className="bg-[#121212] border border-[#252525] p-3 space-y-2 group">
                <div className="aspect-video w-full overflow-hidden bg-black relative flex items-center justify-center">
                  <img 
                    src="/assets/brandkit/zyvro-zv-horizontal-lockup-new.png" 
                    alt="Horizontal Lockup New"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-[#D7FF3F] border border-[#D7FF3F]/40">
                    HORIZONTAL LOCKUP
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-white font-bold">HORIZONTAL (NEW)</span>
                  <a 
                    href="/assets/brandkit/zyvro-zv-horizontal-lockup-new.png" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#D7FF3F] hover:underline"
                  >
                    VIEW ↗
                  </a>
                </div>
              </div>

              {/* Asset 4: 1:1 App Store / Steam Icon */}
              <div className="bg-[#121212] border border-[#252525] p-3 space-y-2 group">
                <div className="aspect-square w-full overflow-hidden bg-black relative max-h-48 flex items-center justify-center">
                  <img 
                    src="/assets/brandkit/zyvro-zv-app-icon-ios-android.jpg" 
                    alt="App Icon iOS Android"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-[#D7FF3F] border border-[#D7FF3F]/40">
                    APP &amp; STEAM ICON
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-white font-bold">APP LAUNCHER ICON</span>
                  <a 
                    href="/assets/brandkit/zyvro-zv-app-icon-ios-android.jpg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#D7FF3F] hover:underline"
                  >
                    VIEW ↗
                  </a>
                </div>
              </div>

              {/* Asset 5: Social Banner 16:9 */}
              <div className="bg-[#121212] border border-[#252525] p-3 space-y-2 group">
                <div className="aspect-video w-full overflow-hidden bg-black relative">
                  <img 
                    src="/assets/brandkit/zyvro-zv-social-banner-og.jpg" 
                    alt="Social Banner OG"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/80 text-[9px] font-mono text-[#D7FF3F] border border-[#D7FF3F]/40">
                    16:9 SOCIAL BANNER
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-white font-bold">STEAM / X BANNER</span>
                  <a 
                    href="/assets/brandkit/zyvro-zv-social-banner-og.jpg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#D7FF3F] hover:underline"
                  >
                    VIEW ↗
                  </a>
                </div>
              </div>

              {/* Asset 6: Scalable Vector SVG Package */}
              <div className="bg-[#121212] border border-[#252525] p-3 space-y-2 group flex flex-col justify-between">
                <div className="aspect-video w-full bg-[#171717] border border-dashed border-[#333333] flex flex-col items-center justify-center p-4">
                  <ZyvroLogo variant="horizontal" renderMode="vector" size={42} />
                  <span className="text-[10px] font-mono text-[#888888] mt-2">100% SCALABLE VECTOR (.SVG)</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-mono text-white font-bold">VECTOR SVG ASSET</span>
                  <a 
                    href="/assets/brandkit/zyvro-zv-symbol-lime-transparent.svg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[#D7FF3F] hover:underline"
                  >
                    SVG SOURCE ↗
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Construction & Safe Zone Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Safe Zone */}
            <div className="bg-[#0b0b0b] border border-[#202020] p-6 space-y-3">
              <span className="text-xs font-mono text-[#D7FF3F] uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D7FF3F]" />
                SAFE ZONE &amp; CLEAR SPACE
              </span>
              <p className="text-xs font-mono text-[#A0A0A0] leading-relaxed">
                Maintain a minimum clear space equal to <span className="text-white font-bold">1X the width of the central Z-diagonal bar</span> on all four quadrants of the logo. No typography, borders, or competing UI HUD elements may encroach inside this perimeter.
              </p>
              <div className="p-4 bg-[#121212] border border-dashed border-[#333333] flex items-center justify-center">
                <div className="p-4 border border-dashed border-[#D7FF3F]/50">
                  <img 
                    src="/assets/brandkit/zyvro-zv-symbol-lime-256px.png" 
                    alt="ZYVRO Safe Zone Demo"
                    className="w-14 h-14 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Slogan & Typography */}
            <div className="bg-[#0b0b0b] border border-[#202020] p-6 space-y-3">
              <span className="text-xs font-mono text-[#D7FF3F] uppercase tracking-widest flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#D7FF3F]" />
                TYPOGRAPHY &amp; SLOGAN HIERARCHY
              </span>
              <div className="space-y-3 text-xs font-mono">
                <div className="border-b border-[#1f1f1f] pb-2">
                  <span className="text-[#666666] block text-[10px]">BRAND SLOGAN</span>
                  <span className="text-base font-display font-black text-[#D7FF3F] tracking-widest">
                    PLAY BEYOND LIMITS
                  </span>
                </div>
                <div className="border-b border-[#1f1f1f] pb-2">
                  <span className="text-[#666666] block text-[10px]">PRIMARY DISPLAY TYPEFACE</span>
                  <span className="text-sm font-display font-bold text-white">
                    CHAKRA PETCH // SYNE BOLD
                  </span>
                </div>
                <div>
                  <span className="text-[#666666] block text-[10px]">TECHNICAL TELEMETRY TYPEFACE</span>
                  <span className="text-sm font-mono text-white">
                    JETBRAINS MONO // SHARE TECH MONO
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Bottom Technical Architecture Footer */}
      <div className="border-t border-[#202020] pt-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777777]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1 text-[#D7FF3F] font-bold"><Code2 className="w-4 h-4" /> ENGINE: Z-CORE 64-BIT</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1"><Layers className="w-4 h-4" /> BRAND ASSETS: SCALABLE VECTOR (.SVG / .PNG)</span>
        </div>
        <div>
          <span>ZYVRO LABS © 2026 // ALL RIGHTS RESERVED</span>
        </div>
      </div>

    </div>
  );
};
