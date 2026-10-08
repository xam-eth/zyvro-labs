import React, { useState } from 'react';
import { CREW_MEMBERS } from '../utils/constants';
import { CrewMember } from '../types';
import { sound } from '../utils/soundManager';
import { 
  Users
} from 'lucide-react';

export const CrewDatabase: React.FC = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(CREW_MEMBERS[0].id);
  const activePlayer = CREW_MEMBERS.find(c => c.id === selectedPlayerId) || CREW_MEMBERS[0];

  const handleSelect = (member: CrewMember) => {
    sound.playClick();
    setSelectedPlayerId(member.id);
  };

  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      
      {/* Top Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <Users className="w-3.5 h-3.5 text-[#D7FF3F]" />
            <span>OPERATIVE ROSTER // CREW DATABASE</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">CHARACTER SELECT</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            ZYVRO CREW
          </h1>
        </div>

        <div className="flex items-center space-x-2 bg-[#101010] border border-[#262626] px-3 py-1.5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#D7FF3F] animate-ping" />
          <span className="text-white font-bold">{CREW_MEMBERS.length} OPERATIVES ACTIVE</span>
        </div>
      </div>

      {/* Main Character Selection Interface: Left Slots Carousel, Right Detail Rig */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
        
        {/* Left Column: Player Cards Grid / Slot Select (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-[#666666] uppercase tracking-widest mb-1">
            SELECT PLAYER DOSSIER:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {CREW_MEMBERS.map((member) => {
              const isSelected = member.id === selectedPlayerId;
              return (
                <div
                  key={member.id}
                  onClick={() => handleSelect(member)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="select"
                  data-cursor-label={member.playerCode}
                  className={`p-3 border transition-all cursor-pointer flex items-center space-x-3.5 relative overflow-hidden ${
                    isSelected
                      ? 'bg-[#151515] border-[#D7FF3F] shadow-[0_0_20px_rgba(215,255,63,0.2)]'
                      : 'bg-[#0f0f0f] border-[#222222] hover:border-[#333333] hover:bg-[#121212]'
                  }`}
                >
                  {/* Left Active Glow bar */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D7FF3F]" />
                  )}

                  {/* Thumbnail Avatar */}
                  <div className="relative w-12 h-12 flex-shrink-0 bg-[#080808] border border-[#2a2a2a] overflow-hidden">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute inset-0 bg-[#D7FF3F]/10 mix-blend-color-burn" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                      <span className="text-[#D7FF3F] font-bold tracking-widest">{member.playerCode}</span>
                      <span className={`px-1.5 py-0.2 border text-[9px] ${
                        member.status === 'ONLINE' 
                          ? 'border-[#D7FF3F]/40 text-[#D7FF3F]' 
                          : 'border-[#FFB800]/40 text-[#FFB800]'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="font-display font-bold text-white text-sm truncate uppercase">
                      {member.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#888888] truncate">
                      {member.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Player Rig & Stats Telemetry (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b0b0b] border border-[#262626] p-6 shadow-[0_0_40px_rgba(0,0,0,0.85)] relative">
          
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

          {/* Top Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#202020] pb-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 bg-[#080808] border-2 border-[#D7FF3F] overflow-hidden flex-shrink-0">
                <img 
                  src={activePlayer.avatar} 
                  alt={activePlayer.name}
                  className="w-full h-full object-cover filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div>
                <span className="text-[11px] font-mono text-[#D7FF3F] font-bold tracking-widest block uppercase">
                  {activePlayer.playerCode} // {activePlayer.alias}
                </span>
                <h2 className="text-2xl font-black font-display text-white uppercase">
                  {activePlayer.name}
                </h2>
                <p className="text-xs font-mono text-[#A0A0A0]">
                  {activePlayer.role}
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#282828] px-3 py-1.5 text-right font-mono">
              <div className="text-[9px] text-[#666666] uppercase">SYS STATUS</div>
              <div className="text-xs font-bold text-[#D7FF3F] flex items-center gap-1.5 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF3F] animate-pulse" />
                <span>{activePlayer.status}</span>
              </div>
            </div>
          </div>

          {/* Bio & Department */}
          <div className="space-y-3 py-4 border-b border-[#202020]">
            <div className="text-[10px] font-mono text-[#666666] uppercase tracking-widest">
              DEPARTMENT // {activePlayer.department}
            </div>
            <p className="text-xs md:text-sm font-mono text-[#CCCCCC] leading-relaxed">
              {activePlayer.bio}
            </p>
          </div>

          {/* Player Stats Meters */}
          <div className="py-4 border-b border-[#202020] space-y-3">
            <div className="text-[10px] font-mono text-[#666666] uppercase tracking-widest">
              ATTRIBUTE MATRIX &amp; PROFICIENCY:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              
              {/* Design */}
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1">
                  <span>WORLD &amp; GAME DESIGN</span>
                  <span className="text-[#D7FF3F] font-bold">{activePlayer.stats.design}%</span>
                </div>
                <div className="w-full bg-[#171717] h-1.5">
                  <div className="bg-[#D7FF3F] h-full" style={{ width: `${activePlayer.stats.design}%` }} />
                </div>
              </div>

              {/* Code */}
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1">
                  <span>SYSTEM ARCH &amp; CODE</span>
                  <span className="text-[#D7FF3F] font-bold">{activePlayer.stats.code}%</span>
                </div>
                <div className="w-full bg-[#171717] h-1.5">
                  <div className="bg-[#D7FF3F] h-full" style={{ width: `${activePlayer.stats.code}%` }} />
                </div>
              </div>

              {/* Art */}
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1">
                  <span>SHADERS &amp; VISUAL TECH</span>
                  <span className="text-[#D7FF3F] font-bold">{activePlayer.stats.art}%</span>
                </div>
                <div className="w-full bg-[#171717] h-1.5">
                  <div className="bg-[#D7FF3F] h-full" style={{ width: `${activePlayer.stats.art}%` }} />
                </div>
              </div>

              {/* Lore */}
              <div>
                <div className="flex justify-between text-[#A0A0A0] mb-1">
                  <span>LORE &amp; PSYCHOACOUSTICS</span>
                  <span className="text-[#D7FF3F] font-bold">{activePlayer.stats.lore}%</span>
                </div>
                <div className="w-full bg-[#171717] h-1.5">
                  <div className="bg-[#D7FF3F] h-full" style={{ width: `${activePlayer.stats.lore}%` }} />
                </div>
              </div>

            </div>
          </div>

          {/* Tactical Loadout */}
          <div className="pt-4 space-y-2">
            <div className="text-[10px] font-mono text-[#666666] uppercase tracking-widest">
              DEPLOYED LOADOUT &amp; TOOLSET:
            </div>
            <div className="flex flex-wrap gap-2">
              {activePlayer.loadout.map((tool, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[#141414] border border-[#2a2a2a] text-xs font-mono text-[#D7FF3F]">
                  ◈ {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Footer Note */}
      <div className="mt-8 text-center text-xs font-mono text-[#555555] tracking-widest uppercase">
        ZYVRO LABS DEPLOYED CREW MATRIX // ALL OPERATIVES ARE ACTIVE IN SIMULATION SPACE
      </div>

    </div>
  );
};
