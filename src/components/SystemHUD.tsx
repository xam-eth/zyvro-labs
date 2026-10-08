import React, { useState, useEffect } from 'react';
import { SystemSection } from '../types';
import { sound } from '../utils/soundManager';
import { ZyvroLogo } from './ZyvroLogo';
import { 
  Volume2, 
  VolumeX, 
  Tv, 
  Terminal, 
  Layers, 
  FlaskConical, 
  BookOpen, 
  Globe, 
  Users, 
  Radio, 
  Home
} from 'lucide-react';

interface SystemHUDProps {
  activeSection: SystemSection;
  onSelectSection: (section: SystemSection) => void;
  isScanlinesOn: boolean;
  onToggleScanlines: () => void;
  onOpenConsole: () => void;
  coordinates: string;
}

interface NavItem {
  id: SystemSection;
  label: string;
  gameTerm: string;
  glyph: string;
  icon: React.ReactNode;
}

export const SystemHUD: React.FC<SystemHUDProps> = ({
  activeSection,
  onSelectSection,
  isScanlinesOn,
  onToggleScanlines,
  onOpenConsole,
  coordinates
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [fps, setFps] = useState(60);
  const [timeString, setTimeString] = useState('');

  const navItems: NavItem[] = [
    { id: 'hub', label: 'MAIN HUB', gameTerm: 'COMMAND CENTER', glyph: '01', icon: <Home className="w-4 h-4" /> },
    { id: 'projects', label: 'PROJECTS', gameTerm: 'WORLDS // GAMES', glyph: '02', icon: <Layers className="w-4 h-4" /> },
    { id: 'lab', label: 'ZYVRO LAB', gameTerm: 'R&D PROTOTYPES', glyph: '03', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'archive', label: 'ARCHIVE', gameTerm: 'LORE DATABASE', glyph: '04', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'origin', label: 'ORIGIN', gameTerm: 'SYSTEM MANIFESTO', glyph: '05', icon: <Globe className="w-4 h-4" /> },
    { id: 'crew', label: 'CREW', gameTerm: 'PLAYER SELECT', glyph: '06', icon: <Users className="w-4 h-4" /> },
    { id: 'transmission', label: 'TRANSMISSION', gameTerm: 'COMMS TERMINAL', glyph: '07', icon: <Radio className="w-4 h-4" /> },
  ];

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleNavClick = (section: SystemSection) => {
    sound.playClick();
    onSelectSection(section);
  };

  // Live FPS & UTC Time tracking
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    const timeTimer = setInterval(() => {
      const d = new Date();
      setTimeString(d.toISOString().slice(11, 19) + ' UTC');
    }, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(timeTimer);
    };
  }, []);

  return (
    <>
      {/* ========================================================
          TOP TELEMETRY STATUS BAR (Global Game HUD Header)
      ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#080808]/90 border-b border-[#202020] backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-xs font-mono select-none">
        
        {/* Left: System Identifier & Official Master ZV Logo (Ultra-HD 4K Asset) */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleNavClick('hub')}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2.5 group focus:outline-none"
            data-cursor="interact"
            data-cursor-label="RETURN HUB"
          >
            <div className="flex items-center justify-center group-hover:scale-110 transition-transform">
              <ZyvroLogo variant="symbol" state="active" renderMode="ultra-hd" size={32} />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="font-display font-black text-white tracking-wider text-sm block leading-none group-hover:text-[#D7FF3F] transition-colors">
                  ZYVRO
                </span>
                <span className="text-[#D7FF3F] text-[10px] font-mono font-bold">LABS</span>
              </div>
              <span className="text-[8px] text-[#A0A0A0] tracking-widest block leading-tight font-mono mt-0.5">
                PLAY BEYOND LIMITS
              </span>
            </div>
          </button>

          <div className="hidden lg:flex items-center space-x-2 text-[10px] text-[#666666] border-l border-[#262626] pl-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF3F] animate-pulse" />
            <span className="text-[#A0A0A0]">{coordinates}</span>
          </div>
        </div>

        {/* Center: Active System Section indicator */}
        <div className="hidden md:flex items-center space-x-2 bg-[#101010] border border-[#262626] px-3 py-1">
          <span className="text-[#D7FF3F] text-[11px] font-bold">◈</span>
          <span className="text-white text-[11px] tracking-widest uppercase font-bold">
            {navItems.find(n => n.id === activeSection)?.gameTerm || activeSection}
          </span>
          <span className="text-[#666666] text-[10px]">
            [ {activeSection.toUpperCase()} ]
          </span>
        </div>

        {/* Right: Controls & Diagnostics */}
        <div className="flex items-center space-x-2 md:space-x-4">
          
          {/* UTC Clock */}
          <span className="hidden sm:inline-block text-[10px] text-[#A0A0A0] bg-[#121212] px-2 py-0.5 border border-[#202020]">
            {timeString || '12:00:00 UTC'}
          </span>

          {/* FPS Counter */}
          <div className="hidden sm:flex items-center space-x-1 text-[10px] text-[#A0A0A0]">
            <span className="text-[#666666]">FPS:</span>
            <span className={fps >= 55 ? "text-[#D7FF3F]" : "text-[#FFB800]"}>{fps}</span>
          </div>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label={isMuted ? "UNMUTE AUDIO" : "MUTE AUDIO"}
            aria-label="Toggle Sound"
            className={`p-1.5 border transition-all ${
              isMuted 
                ? 'border-[#292929] text-[#666666] hover:text-white' 
                : 'border-[#D7FF3F]/50 text-[#D7FF3F] bg-[#D7FF3F]/10 hover:bg-[#D7FF3F]/20 shadow-[0_0_8px_rgba(215,255,63,0.2)]'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Scanlines Overlay Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleScanlines();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="CRT SCANLINES"
            aria-label="Toggle Scanlines"
            className={`p-1.5 border transition-all ${
              isScanlinesOn 
                ? 'border-[#D7FF3F]/50 text-[#D7FF3F] bg-[#D7FF3F]/10 shadow-[0_0_8px_rgba(215,255,63,0.2)]' 
                : 'border-[#292929] text-[#666666] hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
          </button>

          {/* Command Terminal Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenConsole();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="OPEN TERMINAL [~]"
            className="flex items-center space-x-1.5 px-2 py-1 bg-[#171717] hover:bg-[#202020] border border-[#292929] text-[#A0A0A0] hover:text-[#D7FF3F] text-[10px] transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-bold">[ ~ ]</span>
          </button>

        </div>
      </header>

      {/* ========================================================
          DESKTOP VERTICAL HUD NAVIGATION STRIP (Game Menu Console)
      ======================================================== */}
      <aside 
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
        aria-label="System Navigation"
      >
        <div className="bg-[#0e0e0e]/95 border border-[#262626] p-1.5 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] relative">
          
          {/* Subtle Top & Bottom Glowing Accents */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D7FF3F]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D7FF3F]/50 to-transparent" />

          {/* Z Y V R O Vertical Lettermark Top Header */}
          <div className="flex flex-col items-center py-2 border-b border-[#202020] space-y-0.5">
            {'ZYVRO'.split('').map((char, index) => (
              <span 
                key={index} 
                className="font-display font-black text-[10px] leading-tight text-[#666666] hover:text-[#D7FF3F] transition-colors"
              >
                {char}
              </span>
            ))}
          </div>

          {/* Nav Items List */}
          <nav className="flex flex-col space-y-1 py-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="select"
                    data-cursor-label={item.label}
                    className={`w-9 h-9 flex items-center justify-center transition-all duration-200 relative ${
                      isActive
                        ? 'bg-[#D7FF3F] text-[#080808] font-bold shadow-[0_0_15px_rgba(215,255,63,0.4)]'
                        : 'text-[#888888] hover:text-white hover:bg-[#1a1a1a]'
                    }`}
                  >
                    {/* Active Indicator Pip */}
                    {isActive ? (
                      <span className="font-mono text-xs font-black">◈</span>
                    ) : (
                      <span className="font-mono text-xs group-hover:text-[#D7FF3F]">◇</span>
                    )}
                  </button>

                  {/* Flyout Hover Game HUD Label */}
                  <div className="absolute left-12 top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex items-center space-x-2 bg-[#121212]/95 border border-[#3F3F46] px-3 py-1.5 shadow-[0_0_20px_rgba(0,0,0,0.9)] whitespace-nowrap pointer-events-none z-50">
                    <span className="w-1.5 h-1.5 bg-[#D7FF3F]" />
                    <div className="text-left">
                      <div className="font-mono text-xs font-bold text-white tracking-widest">
                        {item.label}
                      </div>
                      <div className="font-mono text-[9px] text-[#A0A0A0] tracking-wider uppercase">
                        {item.gameTerm}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Bottom Settings Icon */}
          <div className="border-t border-[#202020] pt-2 flex justify-center">
            <button
              onClick={() => {
                sound.playClick();
                onOpenConsole();
              }}
              onMouseEnter={() => sound.playHover()}
              title="System Diagnostic Console"
              data-cursor="interact"
              data-cursor-label="SYS CONSOLE"
              className="w-9 h-9 flex items-center justify-center text-[#666666] hover:text-[#D7FF3F] hover:bg-[#171717] transition-colors"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>

      {/* ========================================================
          MOBILE BOTTOM HUD CONSOLE BAR (Mobile Quick Switcher)
      ======================================================== */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0a0a0a]/95 border-t border-[#262626] px-2 py-1.5 backdrop-blur-lg flex items-center justify-around"
        aria-label="Mobile Navigation"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded transition-all ${
                isActive 
                  ? 'text-[#D7FF3F]' 
                  : 'text-[#666666] hover:text-[#A0A0A0]'
              }`}
            >
              <div className={`p-1 ${isActive ? 'bg-[#D7FF3F]/15 border border-[#D7FF3F]/30 rounded' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[8px] font-mono tracking-tighter mt-0.5 uppercase font-medium">
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
