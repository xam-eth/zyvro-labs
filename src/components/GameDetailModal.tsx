import React, { useState, useEffect, useRef } from 'react';
import { GameProject } from '../types';
import { sound } from '../utils/soundManager';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  Radio, 
  Maximize2, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  HardDrive, 
  Activity,
  Flame,
  DownloadCloud,
  ChevronRight
} from 'lucide-react';

interface GameDetailModalProps {
  project: GameProject | null;
  onClose: () => void;
  onWishlist: (projectName: string) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  project,
  onClose,
  onWishlist
}) => {
  const [initStage, setInitStage] = useState<'loading' | 'loaded'>('loading');
  const [worldProgress, setWorldProgress] = useState(0);
  const [charProgress, setCharProgress] = useState(0);
  const [combatProgress, setCombatProgress] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [isPlayingSim, setIsPlayingSim] = useState(true);
  const [showWishlistSuccess, setShowWishlistSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Progressive Diagnostic Load Simulation
  useEffect(() => {
    if (!project) return;
    setInitStage('loading');
    sound.playHover();

    let step = 0;
    const interval = setInterval(() => {
      step += 4;
      setWorldProgress(Math.min(project.progress.world, step * (project.progress.world / 100)));
      setCharProgress(Math.min(project.progress.characters, step * (project.progress.characters / 100)));
      setCombatProgress(Math.min(project.progress.combat, step * (project.progress.combat / 100)));
      setAudioProgress(Math.min(project.progress.audio, step * (project.progress.audio / 100)));

      if (step >= 100) {
        clearInterval(interval);
        setWorldProgress(project.progress.world);
        setCharProgress(project.progress.characters);
        setCombatProgress(project.progress.combat);
        setAudioProgress(project.progress.audio);
        setTimeout(() => {
          setInitStage('loaded');
          sound.playAccessGranted();
        }, 350);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [project]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Dynamic Canvas Audio Spectrogram & Trailer Simulation
  useEffect(() => {
    if (initStage !== 'loaded') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 400);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 200);

      ctx.clearRect(0, 0, w, h);

      if (isPlayingSim) {
        // Draw Dynamic Synthesizer Waveform
        const bars = 48;
        const barWidth = w / bars;

        for (let i = 0; i < bars; i++) {
          const noise = Math.sin(i * 0.3 + t * 2) * Math.cos(i * 0.15 - t) * 0.5 + 0.5;
          const barHeight = noise * (h * 0.65) + 6;
          const x = i * barWidth;
          const y = h / 2 - barHeight / 2;

          ctx.fillStyle = i % 2 === 0 ? '#D7FF3F' : '#00F0FF';
          ctx.globalAlpha = 0.75;
          ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
        }

        // Draw central laser tracking line
        ctx.strokeStyle = '#D7FF3F';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        for (let x = 0; x < w; x += 4) {
          const y = h / 2 + Math.sin(x * 0.04 + t * 3) * 18 * Math.cos(x * 0.01);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [initStage, isPlayingSim]);

  if (!project) return null;

  const galleryImages = [project.images.hero, project.images.cover, ...(project.images.conceptArt || [])];

  const handleTriggerWishlist = () => {
    sound.playAccessGranted();
    setShowWishlistSuccess(true);
    onWishlist(project.title);
    setTimeout(() => setShowWishlistSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl p-2 sm:p-4 md:p-8 overflow-y-auto select-none">
      
      {/* Container Box */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#0c0c0c] border border-[#2a2a2a] shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto">
        
        {/* Top Edge Neon Accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#121212] border-b border-[#202020] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#D7FF3F] rounded-full animate-ping" />
            <span className="font-mono text-xs md:text-sm font-bold text-white tracking-widest uppercase">
              {initStage === 'loading' ? `INITIALIZING ${project.code}...` : `PROJECT ENVIRONMENT // ${project.title}`}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#1f1f1f] border border-[#333333] text-[10px] font-mono text-[#D7FF3F]">
              {project.build}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="CLOSE [ESC]"
            className="p-1.5 bg-[#171717] hover:bg-[#D7FF3F] hover:text-[#080808] border border-[#292929] text-[#A0A0A0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Two States (Loading Diagnostic -> Full Project View) */}
        {initStage === 'loading' ? (
          
          /* DIAGNOSTIC LOADING SCREEN */
          <div className="p-8 md:p-16 flex flex-col items-center justify-center space-y-8 min-h-[450px]">
            
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#262626] text-[11px] font-mono text-[#D7FF3F]">
                <Activity className="w-3.5 h-3.5 animate-spin-slow" />
                <span>ALLOCATING 4K BUFFER &amp; SYSTEM GEOMETRY</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase tracking-wider">
                INITIALIZING {project.title}
              </h2>
              <p className="text-xs font-mono text-[#A0A0A0]">
                {project.codename} // {project.engine}
              </p>
            </div>

            {/* Diagnostic Progress Telemetry Bars */}
            <div className="w-full max-w-lg space-y-4 font-mono text-xs">
              
              {/* World */}
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1 font-bold">
                  <span>WORLD GEOMETRY &amp; SHADERS</span>
                  <span className="text-[#D7FF3F]">{Math.round(worldProgress)}%</span>
                </div>
                <div className="w-full bg-[#171717] h-2 border border-[#262626]">
                  <div className="bg-[#D7FF3F] h-full transition-all duration-75" style={{ width: `${worldProgress}%` }} />
                </div>
              </div>

              {/* Characters */}
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1 font-bold">
                  <span>CHARACTER RIGS &amp; NEURAL AGENTS</span>
                  <span className="text-[#D7FF3F]">{Math.round(charProgress)}%</span>
                </div>
                <div className="w-full bg-[#171717] h-2 border border-[#262626]">
                  <div className="bg-[#D7FF3F] h-full transition-all duration-75" style={{ width: `${charProgress}%` }} />
                </div>
              </div>

              {/* Combat */}
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1 font-bold">
                  <span>COMBAT DYNAMICS &amp; BALLISTICS</span>
                  <span className="text-[#D7FF3F]">{Math.round(combatProgress)}%</span>
                </div>
                <div className="w-full bg-[#171717] h-2 border border-[#262626]">
                  <div className="bg-[#D7FF3F] h-full transition-all duration-75" style={{ width: `${combatProgress}%` }} />
                </div>
              </div>

              {/* Audio */}
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1 font-bold">
                  <span>SPATIAL RAYTRACED ACOUSTICS</span>
                  <span className="text-[#D7FF3F]">{Math.round(audioProgress)}%</span>
                </div>
                <div className="w-full bg-[#171717] h-2 border border-[#262626]">
                  <div className="bg-[#D7FF3F] h-full transition-all duration-75" style={{ width: `${audioProgress}%` }} />
                </div>
              </div>

            </div>

            <div className="text-xs font-mono text-[#666666] animate-pulse">
              [ STREAMING HIGH-PRECISION TEXTURES &amp; LEVEL VECTORS ]
            </div>

          </div>

        ) : (

          /* FULL LOADED PROJECT PAGE OVERVIEW */
          <div className="overflow-y-auto max-h-[calc(92vh-70px)] p-6 md:p-8 space-y-8">
            
            {/* Top Overview: 4K Gallery + Hero Spotlight */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Main 4K Image Spotlight (8 cols) */}
              <div className="lg:col-span-8 space-y-3">
                <div className="relative h-[280px] sm:h-[380px] md:h-[420px] bg-[#080808] border border-[#262626] overflow-hidden group">
                  <img 
                    src={galleryImages[activeGalleryIdx] || project.images.hero} 
                    alt={project.title}
                    className="w-full h-full object-cover filter contrast-105 brightness-95 transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Resolution Badge */}
                  <div className="absolute top-3 left-3 bg-[#080808]/90 border border-[#292929] px-2.5 py-1 text-[10px] font-mono text-[#D7FF3F] flex items-center gap-1.5 font-bold backdrop-blur-md">
                    <Maximize2 className="w-3 h-3" />
                    <span>4K ULTRA-HD MASTER RENDER</span>
                  </div>
                </div>

                {/* Lore Quote as dedicated banner below artwork */}
                <div className="text-xs font-mono text-[#CCCCCC] italic bg-[#111111] p-3 border-l-2 border-[#D7FF3F]">
                  {project.loreQuote}
                </div>

                {/* Thumbnails Bar */}
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playHover();
                        setActiveGalleryIdx(idx);
                      }}
                      data-cursor="select"
                      data-cursor-label={`VIEW 0${idx + 1}`}
                      className={`relative w-20 h-14 flex-shrink-0 border transition-all overflow-hidden ${
                        idx === activeGalleryIdx 
                          ? 'border-[#D7FF3F] ring-1 ring-[#D7FF3F]' 
                          : 'border-[#262626] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Specs & Audio Telemetry (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 bg-[#101010] p-5 border border-[#202020]">
                
                <div className="space-y-4">
                  <div className="border-b border-[#202020] pb-3">
                    <span className="text-[10px] font-mono text-[#666666] tracking-widest uppercase block">
                      STATUS &amp; BUILD
                    </span>
                    <span className="text-xl font-bold font-display text-white">
                      {project.status} // {project.build}
                    </span>
                  </div>

                  {/* Technical Specs List */}
                  <div className="space-y-2.5 text-xs font-mono text-[#A0A0A0]">
                    <div className="flex justify-between items-center py-1 border-b border-[#1a1a1a]">
                      <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#D7FF3F]" /> ENGINE:</span>
                      <span className="text-white font-bold">{project.engine}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#1a1a1a]">
                      <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-[#D7FF3F]" /> RENDERING:</span>
                      <span className="text-white text-right text-[11px]">{project.specs.rendering}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#1a1a1a]">
                      <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-[#D7FF3F]" /> TARGET:</span>
                      <span className="text-[#D7FF3F] font-bold">{project.specs.targetPlatforms[0]}</span>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-[#1a1a1a]">
                      <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-[#FF3344]" /> THREAT LEVEL:</span>
                      <span className="text-[#FF3344] font-bold">{project.threatLevel}</span>
                    </div>
                  </div>

                  {/* Audio Telemetry Simulator */}
                  <div className="bg-[#080808] p-3 border border-[#262626] space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="flex items-center gap-1 text-[#D7FF3F]">
                        <Volume2 className="w-3 h-3" />
                        <span>SPATIAL AUDIO FEED</span>
                      </span>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setIsPlayingSim(!isPlayingSim);
                        }}
                        className="text-[#A0A0A0] hover:text-white"
                      >
                        {isPlayingSim ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </button>
                    </div>

                    <div className="h-14 w-full overflow-hidden bg-[#0a0a0a]">
                      <canvas ref={canvasRef} className="w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Primary Wishlist / Request Token Action */}
                <div className="space-y-2">
                  <button
                    onClick={handleTriggerWishlist}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="interact"
                    data-cursor-label="TRANSMIT"
                    className="w-full py-3.5 px-4 bg-[#D7FF3F] hover:bg-white text-[#080808] font-mono font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(215,255,63,0.3)]"
                  >
                    <DownloadCloud className="w-4 h-4" />
                    <span>WISHLIST &amp; REQUEST ACCESS</span>
                  </button>

                  {showWishlistSuccess && (
                    <div className="p-2 bg-[#D7FF3F]/15 border border-[#D7FF3F]/50 text-[#D7FF3F] text-[11px] font-mono flex items-center gap-2 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>FREQUENCY REGISTERED. ACCESS TOKEN DISPATCHED.</span>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Gameplay Features & Narrative Deep Dive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#202020]">
              
              {/* Left: Synopsis & Architecture */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#D7FF3F] tracking-widest uppercase">
                  <span className="w-2 h-2 bg-[#D7FF3F]" />
                  <span>PROJECT SYNOPSIS &amp; ATMOSPHERE</span>
                </div>
                <p className="text-sm font-mono text-[#C0C0C0] leading-relaxed">
                  {project.description}
                </p>
                <div className="bg-[#121212] p-4 border border-[#202020] text-xs font-mono space-y-2">
                  <div className="text-white font-bold tracking-wider">PHYSICS &amp; SIMULATION ENGINE:</div>
                  <p className="text-[#888888]">{project.specs.physics}</p>
                </div>
              </div>

              {/* Right: Key Gameplay Pillars */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#D7FF3F] tracking-widest uppercase">
                  <span className="w-2 h-2 bg-[#D7FF3F]" />
                  <span>CORE MECHANICS &amp; SYSTEMS</span>
                </div>

                <div className="space-y-2.5">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="p-3 bg-[#121212] border border-[#262626] flex items-start space-x-3 group hover:border-[#D7FF3F]/50 transition-colors">
                      <span className="text-[#D7FF3F] font-mono text-xs font-bold mt-0.5">0{idx + 1}</span>
                      <p className="text-xs font-mono text-[#E0E0E0] leading-normal">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Transmission Prompt */}
            <div className="p-4 bg-[#0a0a0a] border border-[#202020] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <span className="text-[#A0A0A0] flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#D7FF3F]" />
                HAVE TECHNICAL QUESTIONS OR FEEDBACK FOR THIS PROJECT?
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="text-[#D7FF3F] hover:text-white uppercase font-bold tracking-wider flex items-center gap-1"
              >
                <span>OPEN TRANSMISSION CHANNEL</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        )}

      </div>

    </div>
  );
};
