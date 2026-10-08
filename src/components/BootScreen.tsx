import React, { useState, useEffect } from 'react';
import { sound } from '../utils/soundManager';
import { ZyvroLogo } from './ZyvroLogo';
import { Shield, Cpu, Activity, Terminal } from 'lucide-react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ 
  onBootComplete
}) => {
  const [bootState, setBootState] = useState<'idle' | 'booting' | 'ready'>('idle');
  const [progress, setProgress] = useState(0);
  const [logSteps, setLogSteps] = useState<string[]>([]);
  const [glitchActive, setGlitchActive] = useState(false);

  const startBootSequence = () => {
    if (bootState !== 'idle') return;
    setBootState('booting');
    sound.playBootSequence();

    // Step 1: Initialize progress bar
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setBootState('ready');
          sound.playAccessGranted();
          setTimeout(() => {
            onBootComplete();
          }, 650);
        }, 300);
      }
      setProgress(currentProgress);
    }, 45);

    // Progressive logs sequence
    setTimeout(() => {
      setLogSteps(prev => [...prev, 'INITIALIZING KERNEL MATRIX: Z-CORE.64x [ OK ]']);
      sound.playHover();
    }, 250);

    setTimeout(() => {
      setLogSteps(prev => [...prev, 'MOUNTING PROJECT DATABASE & 4K ASSETS [ OK ]']);
      sound.playHover();
    }, 550);

    setTimeout(() => {
      setLogSteps(prev => [...prev, 'CALIBRATING SPATIAL AUDIO SYNTHESIS [ OK ]']);
      sound.playHover();
    }, 850);

    setTimeout(() => {
      setLogSteps(prev => [...prev, 'SYNCING EXPERIMENTAL R&D LAB CLUSTER [ OK ]']);
      sound.playHover();
    }, 1150);

    setTimeout(() => {
      setLogSteps(prev => [...prev, 'ESTABLISHING SECURE TRANSMISSION CHANNEL [ OK ]']);
      sound.playAccessGranted();
    }, 1450);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (bootState === 'idle' && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) {
        e.preventDefault();
        startBootSequence();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Random slight micro-glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 90);
      }
    }, 3200);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(glitchInterval);
    };
  }, [bootState]);

  // Compute loading bar characters
  const totalBlocks = 24;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const loadingBarString = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#080808] text-[#F2F2F2] overflow-hidden select-none transition-opacity duration-700 ${bootState === 'ready' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Decorative Corner HUD elements */}
      <div className="absolute top-6 left-6 flex items-center space-x-3 text-xs text-[#A0A0A0] font-mono">
        <span className="inline-block w-2.5 h-2.5 bg-[#D7FF3F] animate-ping rounded-full" />
        <span>SYS // BOOT_LOADER_v2026.09</span>
      </div>

      <div className="absolute top-6 right-6 flex items-center space-x-4 text-xs text-[#A0A0A0] font-mono">
        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#D7FF3F]" /> SECURE LINK</span>
        <span className="text-[#3F3F46]">|</span>
        <span className="text-[#D7FF3F]">CORE: ONLINE</span>
      </div>

      <div className="absolute bottom-6 left-6 text-xs text-[#666666] font-mono flex items-center gap-2">
        <Terminal className="w-3.5 h-3.5 text-[#D7FF3F]" />
        <span>TERMINAL: TTY_01 // LAT: 37.7749° N</span>
      </div>

      <div className="absolute bottom-6 right-6 text-xs text-[#666666] font-mono">
        <span>PRESS [ENTER] OR CLICK [START]</span>
      </div>

      {/* Center Console Container */}
      <div className={`relative max-w-xl w-full mx-4 p-8 md:p-12 border border-[#262626] bg-[#101010]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-300 ${glitchActive ? 'translate-x-1 skew-x-1 border-[#D7FF3F]/40' : ''}`}>
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

        {/* HUD Reticle Corners */}
        <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#D7FF3F]" />
        <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#D7FF3F]" />
        <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#D7FF3F]" />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#D7FF3F]" />

        {bootState === 'idle' ? (
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Title Block */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#292929] text-[10px] tracking-widest text-[#D7FF3F] uppercase">
                <Cpu className="w-3 h-3 text-[#D7FF3F] animate-pulse" />
                <span>EXPERIMENTAL GAME OPERATING SYSTEM</span>
              </div>

              {/* Central Official ZV Monogram Master Brand Emblem (Ultra-HD 4K Asset) */}
              <div className="py-3 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[#D7FF3F]/15 blur-2xl rounded-full scale-125 pointer-events-none" />
                <ZyvroLogo variant="symbol" state="active" renderMode="ultra-hd" size={96} />
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase">
                  ZYVRO
                </h1>
                <div className="flex items-center justify-center space-x-2 pt-1">
                  <div className="h-[1px] w-6 bg-[#D7FF3F]" />
                  <span className="text-sm md:text-base font-mono tracking-[0.4em] text-[#D7FF3F] uppercase font-bold">
                    LABS
                  </span>
                  <div className="h-[1px] w-6 bg-[#D7FF3F]" />
                </div>
                <p className="text-[10px] font-mono tracking-[0.3em] text-[#888888] uppercase mt-2">
                  PLAY BEYOND LIMITS
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full flex items-center justify-center space-x-3 my-2">
              <div className="h-[1px] flex-1 bg-[#262626]" />
              <div className="w-2 h-2 rotate-45 border border-[#D7FF3F] bg-[#080808]" />
              <div className="h-[1px] flex-1 bg-[#262626]" />
            </div>

            <div className="text-xs font-mono tracking-widest text-[#A0A0A0]">
              SYSTEM BOOT SEQUENCE
            </div>

            {/* Main Interactive Button */}
            <button
              onClick={startBootSequence}
              onMouseEnter={() => sound.playHover()}
              data-cursor="interact"
              data-cursor-label="BOOT SYSTEM"
              className="group relative px-8 py-4 bg-[#D7FF3F] text-[#080808] font-mono font-bold tracking-widest text-sm uppercase transition-all duration-200 hover:bg-[#c4eb35] hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(215,255,63,0.35)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#080808] group-hover:animate-ping" />
                [ PRESS START ]
              </span>
              <div className="absolute inset-0 border-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Telemetry info */}
            <div className="pt-4 flex flex-col md:flex-row items-center justify-between w-full text-[11px] font-mono text-[#666666] border-t border-[#202020] gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF3F]" />
                BUILD 2026.09.27
              </span>
              <span className="text-[#A0A0A0]">CONNECTION: SECURE (TLS 1.3)</span>
              <span>KERNEL: Z-CORE.64x</span>
            </div>

          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header in booting state */}
            <div className="flex items-center justify-between border-b border-[#202020] pb-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#D7FF3F] animate-spin-slow" />
                <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                  INITIALIZING WORLD MATRIX...
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-[#D7FF3F]">
                {progress}%
              </span>
            </div>

            {/* ASCII / High-tech Progress Bar */}
            <div className="space-y-2">
              <div className="font-mono text-xs md:text-sm tracking-tighter text-[#D7FF3F] overflow-hidden whitespace-nowrap bg-[#080808] p-3 border border-[#262626]">
                {loadingBarString}
              </div>
              <div className="w-full bg-[#171717] h-1.5 overflow-hidden">
                <div 
                  className="bg-[#D7FF3F] h-full transition-all duration-75 shadow-[0_0_10px_#D7FF3F]" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>

            {/* Real-time System logs */}
            <div className="bg-[#080808] p-4 border border-[#202020] h-32 overflow-hidden flex flex-col justify-end space-y-1.5 font-mono text-[11px]">
              {logSteps.map((log, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-[#A0A0A0] animate-fadeIn">
                  <span className="text-[#D7FF3F]">›</span>
                  <span className="truncate">{log}</span>
                </div>
              ))}
              {bootState === 'ready' && (
                <div className="text-[#D7FF3F] font-bold flex items-center space-x-2 animate-pulse">
                  <span>›</span>
                  <span>SYSTEM READY. WELCOME TO ZYVRO LABS.</span>
                </div>
              )}
            </div>

            <div className="text-center font-mono text-[10px] text-[#666666] tracking-widest uppercase">
              DECRYPTING SYSTEM RUNTIME &amp; 3D ENVIRONMENT PIPELINES
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
