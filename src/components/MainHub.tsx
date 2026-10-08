import React, { useState, useEffect, useRef } from 'react';
import { GameProject, SystemSection } from '../types';
import { GAME_PROJECTS, SYSTEM_METADATA } from '../utils/constants';
import { sound } from '../utils/soundManager';
import { 
  Play, 
  ChevronRight, 
  Layers, 
  FlaskConical, 
  BookOpen, 
  ShieldAlert, 
  Cpu, 
  ExternalLink,
  ChevronLeft,
  Maximize2,
  Radio
} from 'lucide-react';

interface MainHubProps {
  onSelectProject: (project: GameProject) => void;
  onNavigate: (section: SystemSection) => void;
}

export const MainHub: React.FC<MainHubProps> = ({ onSelectProject, onNavigate }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeProject = GAME_PROJECTS[selectedIdx];

  const handleNextProject = () => {
    sound.playHover();
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIdx((prev) => (prev + 1) % GAME_PROJECTS.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrevProject = () => {
    sound.playHover();
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIdx((prev) => (prev - 1 + GAME_PROJECTS.length) % GAME_PROJECTS.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handleEnterWorld = () => {
    sound.playAccessGranted();
    onSelectProject(activeProject);
  };

  // Interactive 3D Particle Matrix Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const nodeCount = 40;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.15,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid
      ctx.strokeStyle = 'rgba(215, 255, 63, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node
        ctx.fillStyle = `rgba(215, 255, 63, ${node.alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(215, 255, 63, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Mouse gravity pull line
        const mouseDist = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (mouseDist < 160) {
          ctx.strokeStyle = `rgba(215, 255, 63, ${0.25 * (1 - mouseDist / 160)})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen pt-16 pb-24 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      
      {/* Background Interactive Particle Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      </div>

      {/* ========================================================
          HERO MAIN COMMAND HEADER
      ======================================================== */}
      <div className="relative z-10 pt-4 md:pt-6">
        
        {/* State Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#202020] pb-3 mb-4">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 bg-[#171717] border border-[#292929] text-[10px] font-mono tracking-widest text-[#D7FF3F] uppercase">
              COMMAND CENTER // ROOT_SYS
            </span>
            <span className="text-xs text-[#A0A0A0] font-mono hidden sm:inline">
              ZYVRO LABS DIGITAL WORLD
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-[#666666]">
            <span className="flex items-center gap-1.5 text-[#D7FF3F]">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>KERNEL: ACTIVE</span>
            </span>
            <span className="hidden md:inline">BUILD: {SYSTEM_METADATA.build}</span>
          </div>
        </div>

        {/* ========================================================
            4K HERO GAME ARTWORK VIEWPORT (100% CLEAN - NO TEXT OVERLAY ON IMAGE)
        ======================================================== */}
        <div className="relative border border-[#262626] bg-[#090909] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)]">
          
          {/* Top Edge Glowing Indicator */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent z-20" />

          {/* Precision Corner Calipers */}
          <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D7FF3F] z-20 pointer-events-none" />
          <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D7FF3F] z-20 pointer-events-none" />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D7FF3F] z-20 pointer-events-none" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D7FF3F] z-20 pointer-events-none" />

          {/* Top Subtle HUD Telemetry Bar Floating Over Upper Edge */}
          <div className="absolute top-4 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center space-x-2 bg-[#080808]/90 border border-[#262626] px-3 py-1 backdrop-blur-md">
              <span className="w-2 h-2 bg-[#D7FF3F] rounded-full animate-ping" />
              <span className="text-[11px] font-mono text-[#D7FF3F] font-bold tracking-widest">
                {activeProject.code}
              </span>
              <span className="text-[#555555]">|</span>
              <span className="text-white text-[10px] font-mono tracking-wider uppercase">
                {activeProject.genre}
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-[#080808]/90 border border-[#262626] px-3 py-1 backdrop-blur-md">
              <ShieldAlert className="w-3.5 h-3.5 text-[#FFB800]" />
              <span className="text-[10px] font-mono text-[#FFB800] tracking-widest font-bold">
                THREAT: {activeProject.threatLevel}
              </span>
              <span className="text-[#555555]">|</span>
              <span className="text-[#A0A0A0] text-[10px] font-mono">
                {activeProject.build}
              </span>
            </div>
          </div>

          {/* 4K Game Key Art Image (Clean display - Artwork Contains Its Own Title with Zero Clashing HTML Text) */}
          <div className="relative h-[360px] sm:h-[460px] md:h-[520px] lg:h-[580px] w-full overflow-hidden bg-[#050505]">
            <img 
              src={activeProject.images.hero} 
              alt={activeProject.title}
              className={`w-full h-full object-cover object-center filter contrast-105 transition-all duration-700 ${
                isTransitioning ? 'scale-105 opacity-20 blur-md' : 'scale-100 opacity-100 blur-0'
              }`}
            />

            {/* Quick Deep Inspect Button */}
            <button
              onClick={handleEnterWorld}
              onMouseEnter={() => sound.playHover()}
              data-cursor="interact"
              data-cursor-label="INSPECT 4K"
              className="absolute bottom-4 right-4 z-20 px-3 py-1.5 bg-[#080808]/90 hover:bg-[#D7FF3F] hover:text-[#080808] border border-[#333333] text-[#CCCCCC] text-[11px] font-mono transition-all flex items-center gap-1.5 backdrop-blur-md"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>INSPECT 4K MASTER</span>
            </button>
          </div>

          {/* ========================================================
              DEDICATED COMMAND BAR BELOW IMAGE (All Text/Controls Here)
          ======================================================== */}
          <div className="p-4 md:p-6 bg-[#0e0e0e] border-t border-[#222222] flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Left: Tactical Brief & Engine Architecture */}
            <div className="max-w-xl space-y-1 text-left w-full">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-[#D7FF3F] tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-[#D7FF3F]" />
                <span>DIRECTIVE BRIEFING // {activeProject.codename}</span>
                <span className="text-[#555555]">|</span>
                <span className="text-[#A0A0A0]">{activeProject.engine}</span>
              </div>
              <p className="text-xs md:text-sm font-mono text-[#CCCCCC] leading-relaxed line-clamp-2">
                {activeProject.tagline}
              </p>
            </div>

            {/* Right: Enter World Action & Sector Carousel Switcher */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
              
              {/* Primary Action */}
              <button
                onClick={handleEnterWorld}
                onMouseEnter={() => sound.playHover()}
                data-cursor="interact"
                data-cursor-label="ENTER WORLD"
                className="px-6 py-3 bg-[#D7FF3F] hover:bg-white text-[#080808] font-mono font-bold tracking-widest text-xs uppercase transition-all flex items-center gap-2.5 shadow-[0_0_20px_rgba(215,255,63,0.35)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>[ ENTER WORLD ]</span>
              </button>

              {/* Prev / Next Controls */}
              <div className="flex items-center space-x-1 border border-[#262626] bg-[#080808] p-1">
                <button
                  onClick={handlePrevProject}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="interact"
                  data-cursor-label="PREV"
                  className="p-2 hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#D7FF3F] transition-colors"
                  title="Previous World"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <span className="px-2 text-[10px] font-mono text-[#888888]">
                  0{selectedIdx + 1} / 0{GAME_PROJECTS.length}
                </span>

                <button
                  onClick={handleNextProject}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="interact"
                  data-cursor-label="NEXT"
                  className="p-2 hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#D7FF3F] transition-colors"
                  title="Next World"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          THREE KEY INTERACTIVE HUBS (Projects, Lab, Archive)
      ======================================================== */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        
        {/* Card 1: Projects / Worlds */}
        <div 
          onClick={() => {
            sound.playClick();
            onNavigate('projects');
          }}
          onMouseEnter={() => sound.playHover()}
          data-cursor="select"
          data-cursor-label="GAME SECTOR"
          className="group relative p-6 bg-[#101010] border border-[#202020] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(215,255,63,0.15)] flex flex-col justify-between"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D7FF3F] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#A0A0A0] tracking-widest uppercase">
                SECTOR // 01
              </span>
              <Layers className="w-5 h-5 text-[#D7FF3F] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold font-display text-white tracking-wider mb-2 group-hover:text-[#D7FF3F] transition-colors">
              PROJECT WORLDS
            </h3>
            <p className="text-xs text-[#A0A0A0] font-mono leading-relaxed">
              Explore 4 high-tension tactical simulations, survival horror complexes, and void exploration engines.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#D7FF3F]">
            <span className="font-bold tracking-wider">[ 4 ACTIVE BUILDS ]</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Zyvro Lab */}
        <div 
          onClick={() => {
            sound.playClick();
            onNavigate('lab');
          }}
          onMouseEnter={() => sound.playHover()}
          data-cursor="select"
          data-cursor-label="OPEN LAB"
          className="group relative p-6 bg-[#101010] border border-[#202020] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(215,255,63,0.15)] flex flex-col justify-between"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D7FF3F] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#A0A0A0] tracking-widest uppercase">
                SECTOR // 02
              </span>
              <FlaskConical className="w-5 h-5 text-[#D7FF3F] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold font-display text-white tracking-wider mb-2 group-hover:text-[#D7FF3F] transition-colors">
              ZYVRO LAB R&amp;D
            </h3>
            <p className="text-xs text-[#A0A0A0] font-mono leading-relaxed">
              Interact with live experimental prototypes: AI creature kinematics, 3D terrain matrices, and gravity singularity solvers.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#D7FF3F]">
            <span className="font-bold tracking-wider">[ INTERACTIVE PROTOTYPES ]</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Archive */}
        <div 
          onClick={() => {
            sound.playClick();
            onNavigate('archive');
          }}
          onMouseEnter={() => sound.playHover()}
          data-cursor="select"
          data-cursor-label="READ LOGS"
          className="group relative p-6 bg-[#101010] border border-[#202020] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(215,255,63,0.15)] flex flex-col justify-between"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D7FF3F] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#A0A0A0] tracking-widest uppercase">
                SECTOR // 03
              </span>
              <BookOpen className="w-5 h-5 text-[#D7FF3F] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold font-display text-white tracking-wider mb-2 group-hover:text-[#D7FF3F] transition-colors">
              DEV ARCHIVE &amp; LORE
            </h3>
            <p className="text-xs text-[#A0A0A0] font-mono leading-relaxed">
              Technical design documents, binaural audio research, classified declassified post-mortems, and patch logs.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#D7FF3F]">
            <span className="font-bold tracking-wider">[ ACCESS DATABASE ]</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* ========================================================
          BOTTOM SYSTEM MANIFESTO STRIP
      ======================================================== */}
      <div className="relative z-10 border border-[#202020] bg-[#0c0c0c] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A0A0A0]">
        <div className="flex items-center space-x-3">
          <span className="text-[#D7FF3F] font-bold">SYS // IDENTIFIER:</span>
          <span>ZYVRO LABS IS A DIGITAL WORLD. NOT A CORPORATE HOMEPAGE.</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('origin');
            }}
            className="text-white hover:text-[#D7FF3F] underline underline-offset-4 tracking-wider"
          >
            VIEW ORIGIN MANIFESTO →
          </button>
        </div>
      </div>

    </div>
  );
};
