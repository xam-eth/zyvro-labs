import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameProject } from '../types';
import { GAME_PROJECTS } from '../utils/constants';
import { sound } from '../utils/soundManager';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Cpu, 
  ShieldAlert, 
  HardDrive, 
  Sliders, 
  Eye
} from 'lucide-react';

interface GameLibraryProps {
  onSelectProject: (project: GameProject) => void;
}

export const GameLibrary: React.FC<GameLibraryProps> = ({ onSelectProject }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const currentProject = GAME_PROJECTS[activeIndex];

  const handleNext = useCallback(() => {
    sound.playHover();
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % GAME_PROJECTS.length);
      setIsAnimating(false);
    }, 150);
  }, []);

  const handlePrev = useCallback(() => {
    sound.playHover();
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + GAME_PROJECTS.length) % GAME_PROJECTS.length);
      setIsAnimating(false);
    }, 150);
  }, []);

  // Keyboard navigation listener (← and → arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handlePrev();
      } else if (e.key === 'Enter') {
        sound.playAccessGranted();
        onSelectProject(GAME_PROJECTS[activeIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handleNext, handlePrev, onSelectProject]);

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none"
    >
      
      {/* Top Header & Selector Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <span className="w-2 h-2 bg-[#D7FF3F] animate-pulse" />
            <span>GAME SELECTION TERMINAL</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">USE [ ← ] [ → ] KEYS</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            SELECT PROJECT
          </h1>
        </div>

        {/* Threat & Index Status Indicator */}
        <div className="flex items-center space-x-3 bg-[#121212] border border-[#292929] px-4 py-2">
          <div className="text-right">
            <div className="text-[10px] font-mono text-[#666666] uppercase">SLOT INDEX</div>
            <div className="text-sm font-mono font-bold text-[#D7FF3F]">
              0{activeIndex + 1} / 0{GAME_PROJECTS.length}
            </div>
          </div>
          <div className="w-[1px] h-6 bg-[#262626]" />
          <div className="text-right">
            <div className="text-[10px] font-mono text-[#666666] uppercase">THREAT LEVEL</div>
            <div className="text-sm font-mono font-bold text-[#FFB800]">
              {currentProject.threatLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Stage / Stage Select Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
        
        {/* Left Column: 4K Key Art Showcase (7 Columns) */}
        <div className="lg:col-span-7 relative group">
          
          <div className="relative border-2 border-[#262626] bg-[#0d0d0d] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            
            {/* Top Scanning Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[#D7FF3F] z-20 shadow-[0_0_15px_#D7FF3F]" />

            {/* Corner Tech Accents */}
            <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D7FF3F] z-20" />
            <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D7FF3F] z-20" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D7FF3F] z-20" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D7FF3F] z-20" />

            {/* 4K Game Artwork Image */}
            <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full bg-[#080808]">
              <img 
                src={currentProject.images.hero} 
                alt={currentProject.title}
                className={`w-full h-full object-cover object-center filter contrast-105 brightness-95 transition-all duration-500 ${
                  isAnimating ? 'opacity-30 scale-105 blur-sm' : 'opacity-100 scale-100 blur-0'
                }`}
              />

              {/* Watermark Code */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-2 bg-[#080808]/90 border border-[#262626] px-3 py-1 text-xs font-mono text-[#D7FF3F] font-bold backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-[#D7FF3F] animate-ping" />
                <span>SYS_ID: {currentProject.codename}</span>
              </div>

              {/* Inspect Button floating */}
              <button
                onClick={() => {
                  sound.playAccessGranted();
                  onSelectProject(currentProject);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="interact"
                data-cursor-label="INSPECT 4K"
                className="absolute top-4 right-4 z-10 p-2 bg-[#080808]/90 hover:bg-[#D7FF3F] hover:text-[#080808] border border-[#3F3F46] text-[#A0A0A0] transition-all flex items-center gap-1.5 text-xs font-mono font-bold backdrop-blur-md"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">DEEP INSPECT</span>
              </button>
            </div>

            {/* Bottom Progress Bars Preview */}
            <div className="p-4 bg-[#101010] border-t border-[#202020] grid grid-cols-3 gap-3 text-[11px] font-mono">
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1">
                  <span>WORLD ARCH</span>
                  <span className="text-[#D7FF3F] font-bold">{currentProject.progress.world}%</span>
                </div>
                <div className="w-full bg-[#1c1c1c] h-1">
                  <div className="bg-[#D7FF3F] h-full" style={{ width: `${currentProject.progress.world}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1">
                  <span>COMBAT RIG</span>
                  <span className="text-[#D7FF3F] font-bold">{currentProject.progress.combat}%</span>
                </div>
                <div className="w-full bg-[#1c1c1c] h-1">
                  <div className="bg-[#D7FF3F] h-full" style={{ width: `${currentProject.progress.combat}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1">
                  <span>AUDIO KERNEL</span>
                  <span className="text-[#D7FF3F] font-bold">{currentProject.progress.audio}%</span>
                </div>
                <div className="w-full bg-[#1c1c1c] h-1">
                  <div className="bg-[#D7FF3F] h-full" style={{ width: `${currentProject.progress.audio}%` }} />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Game Specifications & Launch Console (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Project Title Block */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#292929] text-[11px] font-mono text-[#D7FF3F] font-bold tracking-widest uppercase">
              <Cpu className="w-3.5 h-3.5" />
              <span>{currentProject.code} // {currentProject.build}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase leading-none">
              {currentProject.title}
            </h2>

            <p className="text-sm font-mono tracking-widest text-[#D7FF3F] uppercase font-bold">
              GENRE: {currentProject.genre}
            </p>

            <p className="text-xs md:text-sm text-[#A0A0A0] font-mono leading-relaxed pt-1">
              {currentProject.description}
            </p>
          </div>

          {/* Quick Technical Specs Matrix */}
          <div className="space-y-2 border-y border-[#202020] py-4 text-xs font-mono">
            <div className="flex items-center justify-between text-[#A0A0A0]">
              <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-[#D7FF3F]" /> ENGINE:</span>
              <span className="text-white font-bold">{currentProject.engine}</span>
            </div>
            <div className="flex items-center justify-between text-[#A0A0A0]">
              <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-[#D7FF3F]" /> PLATFORMS:</span>
              <span className="text-white font-bold">{currentProject.specs.targetPlatforms.join(" · ")}</span>
            </div>
            <div className="flex items-center justify-between text-[#A0A0A0]">
              <span className="flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5 text-[#FFB800]" /> MULTIPLAYER:</span>
              <span className="text-white">{currentProject.specs.multiplayer}</span>
            </div>
          </div>

          {/* Enter Project Action Button */}
          <div>
            <button
              onClick={() => {
                sound.playAccessGranted();
                onSelectProject(currentProject);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="interact"
              data-cursor-label="INITIALIZE"
              className="w-full group py-4 px-6 bg-[#D7FF3F] hover:bg-white text-[#080808] font-mono font-bold tracking-widest text-sm uppercase transition-all duration-200 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(215,255,63,0.35)]"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>[ ENTER WORLD // INITIALIZE ]</span>
            </button>
          </div>

          {/* Interactive Navigation Console: Previous / Next & Track Index */}
          <div className="flex items-center justify-between pt-2">
            
            <button
              onClick={handlePrev}
              onMouseEnter={() => sound.playHover()}
              data-cursor="interact"
              data-cursor-label="PREV PROJECT"
              className="px-4 py-2 bg-[#121212] hover:bg-[#1f1f1f] border border-[#292929] hover:border-[#D7FF3F] text-xs font-mono text-[#A0A0A0] hover:text-[#D7FF3F] flex items-center gap-2 transition-all uppercase tracking-wider"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← PREVIOUS</span>
            </button>

            {/* Quick Mini Slots Selector */}
            <div className="flex space-x-1.5">
              {GAME_PROJECTS.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    sound.playHover();
                    setActiveIndex(idx);
                  }}
                  data-cursor="select"
                  data-cursor-label={proj.title}
                  className={`px-2 py-1 text-[11px] font-mono border transition-all ${
                    idx === activeIndex
                      ? 'bg-[#D7FF3F] text-[#080808] border-[#D7FF3F] font-bold shadow-[0_0_8px_#D7FF3F]'
                      : 'bg-[#101010] text-[#666666] border-[#262626] hover:text-white'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              onMouseEnter={() => sound.playHover()}
              data-cursor="interact"
              data-cursor-label="NEXT PROJECT"
              className="px-4 py-2 bg-[#121212] hover:bg-[#1f1f1f] border border-[#292929] hover:border-[#D7FF3F] text-xs font-mono text-[#A0A0A0] hover:text-[#D7FF3F] flex items-center gap-2 transition-all uppercase tracking-wider"
            >
              <span>NEXT →</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

      {/* Bottom Hint */}
      <div className="mt-8 text-center text-xs font-mono text-[#555555] tracking-widest uppercase">
        ZYVRO LABS HARDWARE ACCELERATED CAROUSEL PIPELINE // READY FOR DISPATCH
      </div>

    </div>
  );
};
