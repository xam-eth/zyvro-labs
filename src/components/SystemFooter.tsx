import React from 'react';
import { SYSTEM_METADATA } from '../utils/constants';
import { sound } from '../utils/soundManager';
import { ZyvroLogo } from './ZyvroLogo';
import { 
  RotateCcw, 
  Flame
} from 'lucide-react';

interface SystemFooterProps {
  onRestartSystem: () => void;
  onEmergencyPurge: () => void;
}

export const SystemFooter: React.FC<SystemFooterProps> = ({
  onRestartSystem,
  onEmergencyPurge
}) => {
  const socials = [
    { label: 'X // TWITTER', href: 'https://x.com' },
    { label: 'DISCORD', href: 'https://discord.gg' },
    { label: 'STEAM', href: 'https://store.steampowered.com' },
    { label: 'YOUTUBE', href: 'https://youtube.com' },
    { label: 'GITHUB', href: 'https://github.com' },
    { label: 'EMAIL', href: 'mailto:contact@zyvro.com' },
  ];

  return (
    <footer className="relative z-20 border-t border-[#202020] bg-[#070707] text-[#A0A0A0] font-mono py-16 px-4 md:px-8 select-none">
      
      {/* Top Divider */}
      <div className="max-w-4xl mx-auto flex items-center justify-center space-x-4 mb-8">
        <div className="h-[1px] flex-1 bg-[#262626]" />
        <span className="text-xs tracking-widest text-[#666666] uppercase">END OF TRANSMISSION</span>
        <div className="h-[1px] flex-1 bg-[#262626]" />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Brand System Identifier */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center p-2">
            <ZyvroLogo variant="symbol" state="active" renderMode="ultra-hd" size={60} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black font-display text-white tracking-widest uppercase">
              ZYVRO LABS
            </h2>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <div className="h-[1px] w-4 bg-[#D7FF3F]" />
              <span className="text-xs font-mono tracking-[0.3em] text-[#D7FF3F] uppercase font-bold">
                PLAY BEYOND LIMITS
              </span>
              <div className="h-[1px] w-4 bg-[#D7FF3F]" />
            </div>
            <p className="text-[11px] tracking-[0.2em] text-[#666666] uppercase mt-2">
              EXPERIMENTAL DIGITAL WORLD &amp; GAME OPERATING SYSTEM
            </p>
          </div>
        </div>

        {/* System Online Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#101010] border border-[#262626] text-xs">
          <span className="w-2 h-2 rounded-full bg-[#D7FF3F] animate-ping" />
          <span className="text-white font-bold">SYSTEM STATUS:</span>
          <span className="text-[#D7FF3F]">● ONLINE</span>
        </div>

        {/* Social Frequencies Channels */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              data-cursor="interact"
              data-cursor-label={s.label.split(' ')[0]}
              className="px-3.5 py-1.5 bg-[#121212] hover:bg-[#1a1a1a] border border-[#262626] hover:border-[#D7FF3F] text-xs text-[#CCCCCC] hover:text-[#D7FF3F] transition-all flex items-center gap-1.5"
            >
              <span>[ {s.label} ]</span>
            </a>
          ))}
        </div>

        {/* System Actions: Restart & Emergency Purge */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          
          {/* Restart System Button */}
          <button
            onClick={() => {
              sound.playClick();
              onRestartSystem();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="RESTART OS"
            className="px-6 py-2.5 bg-[#171717] hover:bg-[#D7FF3F] text-white hover:text-[#080808] border border-[#333333] hover:border-[#D7FF3F] text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>[ RESTART SYSTEM ]</span>
          </button>

          {/* Emergency Purge Effect */}
          <button
            onClick={() => {
              sound.playFault();
              onEmergencyPurge();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="PURGE VRAM"
            className="px-4 py-2.5 bg-[#121212] hover:bg-[#FF3344] text-[#777777] hover:text-white border border-[#262626] hover:border-[#FF3344] text-xs tracking-widest uppercase transition-all flex items-center gap-2"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>[ EMERGENCY PURGE ]</span>
          </button>

        </div>

        {/* Build & Copyright Telemetry */}
        <div className="pt-6 border-t border-[#1a1a1a] w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#555555] gap-2">
          <span>BUILD: {SYSTEM_METADATA.build} // KERNEL: {SYSTEM_METADATA.kernel}</span>
          <span>© {SYSTEM_METADATA.originYear} ZYVRO LABS. ALL WORLDS RESERVED.</span>
        </div>

      </div>

    </footer>
  );
};
