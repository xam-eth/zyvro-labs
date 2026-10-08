import React, { useState, useEffect, useRef } from 'react';
import { LAB_EXPERIMENTS } from '../utils/constants';
import { sound } from '../utils/soundManager';
import { 
  FlaskConical, 
  Radio, 
  Lock, 
  Unlock, 
  Sliders, 
  Atom
} from 'lucide-react';

export const ZyvroLab: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(LAB_EXPERIMENTS[0].id);
  const activeExp = LAB_EXPERIMENTS.find(e => e.id === selectedExpId) || LAB_EXPERIMENTS[0];

  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      
      {/* Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <FlaskConical className="w-3.5 h-3.5 text-[#D7FF3F] animate-pulse" />
            <span>R&amp;D EXPERIMENTAL PROTOTYPES</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">INTERACTIVE SANDBOX</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            ZYVRO LAB
          </h1>
        </div>

        <div className="flex items-center space-x-2 bg-[#101010] border border-[#262626] px-3 py-1.5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#D7FF3F] animate-ping" />
          <span className="text-white font-bold">4 ACTIVE SIMULATIONS</span>
        </div>
      </div>

      {/* Main Lab Grid: Left Experiment Selector Tabs, Right Interactive Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Experiment Selection List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-[#666666] uppercase tracking-widest mb-2">
            SELECT PROTOTYPE TO INITIALIZE:
          </div>

          {LAB_EXPERIMENTS.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <div
                key={exp.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedExpId(exp.id);
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="select"
                data-cursor-label={exp.code}
                className={`p-4 border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#151515] border-[#D7FF3F] shadow-[0_0_20px_rgba(215,255,63,0.2)]'
                    : 'bg-[#0f0f0f] border-[#202020] hover:border-[#383838] hover:bg-[#121212]'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D7FF3F]" />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#D7FF3F] tracking-widest">
                    {exp.code}
                  </span>
                  <span className={`text-[9px] font-mono px-2 py-0.5 border ${
                    exp.status === 'ACTIVE' 
                      ? 'border-[#D7FF3F]/40 text-[#D7FF3F] bg-[#D7FF3F]/10' 
                      : exp.status === 'CLASSIFIED'
                      ? 'border-[#FF3344]/40 text-[#FF3344] bg-[#FF3344]/10'
                      : 'border-[#FFB800]/40 text-[#FFB800] bg-[#FFB800]/10'
                  }`}>
                    {exp.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold font-display text-white tracking-wide uppercase mb-1">
                  {exp.title}
                </h3>

                <p className="text-[11px] font-mono text-[#888888] line-clamp-2">
                  {exp.description}
                </p>
              </div>
            );
          })}

          <div className="p-4 bg-[#0c0c0c] border border-[#202020] text-xs font-mono text-[#777777] space-y-1">
            <div className="text-white font-bold text-[11px] flex items-center gap-1.5">
              <Atom className="w-3.5 h-3.5 text-[#D7FF3F]" />
              ZYVRO LAB MANDATE:
            </div>
            <p className="text-[10px] leading-relaxed">
              Every prototype in this lab tests core mechanics for upcoming titles: AI sensory behavior, procedural math, cryptographic puzzles, and physics.
            </p>
          </div>
        </div>

        {/* Right: Interactive Workbench Canvas Simulation (8 Cols) */}
        <div className="lg:col-span-8 bg-[#0c0c0c] border border-[#262626] p-4 md:p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative">
          
          {/* Top Workbench Status */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#202020] pb-3 mb-4 gap-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#D7FF3F] rounded-full animate-ping" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                ACTIVE LAB WORKBENCH // {activeExp.title}
              </span>
            </div>

            <div className="flex items-center space-x-3 text-[11px] font-mono text-[#888888]">
              <span>VERSION: {activeExp.version}</span>
              <span>|</span>
              <span className="text-[#D7FF3F]">STATUS: READY</span>
            </div>
          </div>

          {/* Dynamic Interactive Mini-App based on Experiment Type */}
          <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] bg-[#060606] border border-[#1e1e1e] overflow-hidden">
            {activeExp.interactiveType === 'creature' && <BioCreatureSimulation />}
            {activeExp.interactiveType === 'terrain' && <ProceduralTerrainSimulation />}
            {activeExp.interactiveType === 'cipher' && <CipherSignalSimulation />}
            {activeExp.interactiveType === 'gravity' && <GravitySingularitySimulation />}
          </div>

          {/* Bottom Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-4 border-t border-[#202020] text-xs font-mono">
            {activeExp.metrics.map((m, idx) => (
              <div key={idx} className="bg-[#121212] p-2.5 border border-[#1c1c1c]">
                <div className="text-[10px] text-[#666666] tracking-wider uppercase mb-0.5">{m.label}</div>
                <div className="text-white font-bold text-xs text-[#D7FF3F]">{m.value}</div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

/* ========================================================
   SUB-EXPERIMENT 1: BIO-NEURAL ENTITY SIMULATION
======================================================== */
const BioCreatureSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Spine segments
    const segmentCount = 22;
    const segments = Array.from({ length: segmentCount }, (_, i) => ({
      x: width / 2,
      y: height / 2 + i * 10,
      radius: Math.max(3, 20 - i * 0.75),
    }));

    let targetX = width / 2;
    let targetY = height / 2;
    let t = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const onClick = () => {
      sound.playAccessGranted();
      setPulseCount(p => p + 1);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);

    const render = () => {
      t += 0.05;
      ctx.fillStyle = 'rgba(6, 6, 6, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Faint radial lab grid
      ctx.strokeStyle = 'rgba(215, 255, 63, 0.04)';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 140, 0, Math.PI * 2);
      ctx.arc(width / 2, height / 2, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Head follows target with smooth easing
      segments[0].x += (targetX - segments[0].x) * 0.12;
      segments[0].y += (targetY - segments[0].y) * 0.12;

      // Trailing vertebrae physics
      for (let i = 1; i < segmentCount; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const angle = Math.atan2(dy, dx);
        const dist = 14;

        curr.x = prev.x - Math.cos(angle) * dist + Math.sin(t + i * 0.3) * 1.5;
        curr.y = prev.y - Math.sin(angle) * dist + Math.cos(t + i * 0.3) * 1.5;
      }

      // Draw tentacles branching from body
      for (let i = 2; i < segmentCount; i += 3) {
        const seg = segments[i];
        const sideAngle1 = Math.sin(t * 1.5 + i) * 0.8 + Math.PI / 2;
        const sideAngle2 = -Math.sin(t * 1.5 + i) * 0.8 - Math.PI / 2;

        ctx.strokeStyle = 'rgba(215, 255, 63, 0.3)';
        ctx.lineWidth = 1;

        // Left tentacle
        ctx.beginPath();
        ctx.moveTo(seg.x, seg.y);
        ctx.quadraticCurveTo(
          seg.x + Math.cos(sideAngle1) * 35,
          seg.y + Math.sin(sideAngle1) * 35,
          seg.x + Math.cos(sideAngle1) * 60,
          seg.y + Math.sin(sideAngle1) * 60
        );
        ctx.stroke();

        // Right tentacle
        ctx.beginPath();
        ctx.moveTo(seg.x, seg.y);
        ctx.quadraticCurveTo(
          seg.x + Math.cos(sideAngle2) * 35,
          seg.y + Math.sin(sideAngle2) * 35,
          seg.x + Math.cos(sideAngle2) * 60,
          seg.y + Math.sin(sideAngle2) * 60
        );
        ctx.stroke();
      }

      // Draw spine nodes & glowing neural core
      segments.forEach((seg, i) => {
        const pulse = Math.sin(t * 2 + i * 0.4) * 2;
        ctx.fillStyle = i === 0 ? '#D7FF3F' : i < 6 ? '#A6E22E' : '#222222';
        ctx.beginPath();
        ctx.arc(seg.x, seg.y, Math.max(2, seg.radius + pulse * 0.5), 0, Math.PI * 2);
        ctx.fill();

        if (i === 0) {
          // Organism Eyes / Luminescence
          ctx.fillStyle = '#080808';
          ctx.beginPath();
          ctx.arc(seg.x - 5, seg.y - 4, 3, 0, Math.PI * 2);
          ctx.arc(seg.x + 5, seg.y - 4, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#00F0FF';
          ctx.beginPath();
          ctx.arc(seg.x - 5, seg.y - 4, 1.5, 0, Math.PI * 2);
          ctx.arc(seg.x + 5, seg.y - 4, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      <div className="absolute bottom-3 left-3 bg-[#080808]/90 border border-[#262626] px-3 py-1.5 text-[11px] font-mono text-[#A0A0A0] flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-[#D7FF3F] animate-pulse" />
        <span>MOVE CURSOR TO DIRECT ORGANISM · CLICK TO EMIT STIMULUS (PULSES: {pulseCount})</span>
      </div>
    </div>
  );
};

/* ========================================================
   SUB-EXPERIMENT 2: PROCEDURAL TERRAIN MATRIX
======================================================== */
const ProceduralTerrainSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [elevation, setElevation] = useState(45);
  const [frequency, setFrequency] = useState(18);
  const [wireframeMode, setWireframeMode] = useState<'scan' | 'solid'>('scan');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    let offset = 0;

    const render = () => {
      offset += 0.015;
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, width, height);

      const rows = 28;
      const cols = 28;
      const spacingX = width / cols;
      const spacingY = (height * 0.75) / rows;

      ctx.lineWidth = 1;

      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        const screenY = height * 0.25 + y * spacingY;

        for (let x = 0; x <= cols; x++) {
          const screenX = x * spacingX;
          
          // Synthetic procedural perlin-like noise
          const nx = (x * frequency) / 100;
          const ny = (y * frequency) / 100 + offset;
          const z = Math.sin(nx) * Math.cos(ny) * elevation + Math.sin(nx * 2 + offset) * (elevation * 0.35);

          const finalY = screenY - z;

          if (x === 0) ctx.moveTo(screenX, finalY);
          else ctx.lineTo(screenX, finalY);
        }

        const alpha = (y / rows) * 0.9 + 0.1;
        ctx.strokeStyle = wireframeMode === 'scan' 
          ? `rgba(215, 255, 63, ${alpha})` 
          : `rgba(0, 240, 255, ${alpha})`;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [elevation, frequency, wireframeMode]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Controls Overlay */}
      <div className="absolute top-3 right-3 bg-[#080808]/90 border border-[#292929] p-3 text-xs font-mono space-y-2.5 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-[#D7FF3F] font-bold">
          <Sliders className="w-3.5 h-3.5" />
          <span>TOPOLOGY GENERATOR</span>
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-[#A0A0A0] mb-0.5">
            <span>ELEVATION NOISE</span>
            <span className="text-white">{elevation}m</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={elevation}
            onChange={(e) => {
              sound.playKeyTick();
              setElevation(Number(e.target.value));
            }}
            className="w-36 accent-[#D7FF3F]"
          />
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-[#A0A0A0] mb-0.5">
            <span>FREQUENCY OCTAVE</span>
            <span className="text-white">{frequency}</span>
          </div>
          <input
            type="range"
            min="5"
            max="45"
            value={frequency}
            onChange={(e) => {
              sound.playKeyTick();
              setFrequency(Number(e.target.value));
            }}
            className="w-36 accent-[#D7FF3F]"
          />
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setWireframeMode(w => w === 'scan' ? 'solid' : 'scan');
          }}
          className="w-full py-1 bg-[#171717] hover:bg-[#222222] border border-[#333333] text-[10px] text-[#D7FF3F] font-bold uppercase"
        >
          MODE: {wireframeMode === 'scan' ? 'ACID SCAN' : 'CYAN VECTOR'}
        </button>
      </div>
    </div>
  );
};

/* ========================================================
   SUB-EXPERIMENT 3: QUANTUM CIPHER & SIGNAL DECRYPTOR
======================================================== */
const CipherSignalSimulation: React.FC = () => {
  const [freqDial, setFreqDial] = useState(1400);
  const targetFreq = 1420;
  const isAligned = Math.abs(freqDial - targetFreq) <= 3;
  const [isDecrypted, setIsDecrypted] = useState(false);

  const handleTune = (val: number) => {
    setFreqDial(val);
    if (Math.abs(val - targetFreq) <= 3) {
      sound.playScanTone();
    } else {
      sound.playKeyTick();
    }
  };

  const handleDecrypt = () => {
    if (!isAligned) {
      sound.playFault();
      return;
    }
    sound.playAccessGranted();
    setIsDecrypted(true);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col justify-between font-mono bg-[#070707]">
      
      {/* Top Telemetry */}
      <div className="flex items-center justify-between border-b border-[#202020] pb-3 text-xs">
        <span className="flex items-center gap-1.5 text-[#D7FF3F]">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>INTERCEPTED DEEP VOID SIGNAL // SECTOR-Z</span>
        </span>
        <span className={isAligned ? "text-[#D7FF3F] font-bold" : "text-[#FF3344]"}>
          {isAligned ? "● PHASE HARMONIC LOCKED" : "○ CARRIER STATIC // UNRESOLVED"}
        </span>
      </div>

      {/* Spectrogram / Audio Visualizer representation */}
      <div className="my-auto space-y-4">
        
        {/* Signal readout */}
        <div className="bg-[#0e0e0e] border border-[#262626] p-4 text-center space-y-2">
          <div className="text-3xl font-display font-black tracking-widest text-white">
            {freqDial.toFixed(1)} <span className="text-sm font-mono text-[#D7FF3F]">MHz</span>
          </div>
          <div className="text-xs text-[#777777]">
            TARGET SPECTRAL PEAK: ~1420.4 MHz (HYDROGEN 21CM LINE)
          </div>
        </div>

        {/* Frequency Scrub Slider */}
        <div className="space-y-1">
          <input
            type="range"
            min="1350"
            max="1480"
            step="0.5"
            value={freqDial}
            onChange={(e) => handleTune(parseFloat(e.target.value))}
            className="w-full h-2 bg-[#1a1a1a] accent-[#D7FF3F] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#555555]">
            <span>1350.0 MHz</span>
            <span>1420.4 MHz (LOCKED)</span>
            <span>1480.0 MHz</span>
          </div>
        </div>

        {/* Decrypted Content Box */}
        {isDecrypted ? (
          <div className="p-4 bg-[#D7FF3F]/10 border border-[#D7FF3F] text-xs space-y-1 text-white animate-fadeIn">
            <div className="text-[#D7FF3F] font-bold flex items-center gap-1.5 uppercase">
              <Unlock className="w-4 h-4" />
              <span>CLASSIFIED LOG DECRYPTED // TRANSMISSION 2026.09</span>
            </div>
            <p className="text-[#D0D0D0] leading-relaxed pt-1">
              "The engine protocol was not authored by human engineers. In June 2026, the procedural compiler began compiling code loops that no team member wrote. We didn't cancel it. We built the game around it."
            </p>
          </div>
        ) : (
          <div className="p-3 bg-[#111111] border border-[#222222] text-xs text-[#666666] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#888888]" />
              CIPHER LOCKED: TUNE FREQUENCY TO 1420.4 MHz TO DECRYPT
            </span>
            <button
              onClick={handleDecrypt}
              disabled={!isAligned}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase transition-all ${
                isAligned 
                  ? 'bg-[#D7FF3F] text-[#080808] hover:bg-white shadow-[0_0_12px_#D7FF3F]' 
                  : 'bg-[#1c1c1c] text-[#555555] cursor-not-allowed'
              }`}
            >
              EXECUTE DECRYPT
            </button>
          </div>
        )}

      </div>

      <div className="text-[10px] text-[#555555] text-center border-t border-[#1c1c1c] pt-2">
        ZYVRO LAB HARDWARE-ACCELERATED SPECTROGRAM TUNER
      </div>
    </div>
  );
};

/* ========================================================
   SUB-EXPERIMENT 4: GRAVITATIONAL SINGULARITY SIMULATION
======================================================== */
const GravitySingularitySimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wellsCount, setWellsCount] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Singularities (gravity wells)
    let wells: { x: number; y: number; mass: number }[] = [
      { x: width / 2, y: height / 2, mass: 600 }
    ];

    // 2,000 Particles
    const particleCount = 1200;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: Math.random() > 0.4 ? '#D7FF3F' : '#00F0FF',
    }));

    const onClick = (e: MouseEvent) => {
      sound.playClick();
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (wells.length >= 4) {
        wells = [{ x: clickX, y: clickY, mass: 600 }];
      } else {
        wells.push({ x: clickX, y: clickY, mass: 600 });
      }
      setWellsCount(wells.length);
    };

    canvas.addEventListener('click', onClick);

    const render = () => {
      ctx.fillStyle = 'rgba(6, 6, 6, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Draw gravity event horizons
      wells.forEach((well) => {
        ctx.strokeStyle = 'rgba(215, 255, 63, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(well.x, well.y, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(well.x, well.y, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Particles with N-body Gravity physics
      particles.forEach((p) => {
        wells.forEach((well) => {
          const dx = well.x - p.x;
          const dy = well.y - p.y;
          const distSq = dx * dx + dy * dy + 400; // soften singularity
          const dist = Math.sqrt(distSq);
          const force = well.mass / distSq;

          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        });

        // Speed dampening
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />
      <div className="absolute bottom-3 left-3 bg-[#080808]/90 border border-[#262626] px-3 py-1.5 text-[11px] font-mono text-[#A0A0A0] flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-[#D7FF3F] animate-ping" />
        <span>CLICK ANYWHERE IN CHAMBER TO SPAWN GRAVITATIONAL SINGULARITY (ACTIVE: {wellsCount} / 4)</span>
      </div>
    </div>
  );
};
