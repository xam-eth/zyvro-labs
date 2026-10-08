import React from 'react';
import { User, ExternalLink, MapPin } from 'lucide-react';
import { FounderProfile as FounderProfileData } from '../types';
import { GAME_PROJECTS } from '../utils/constants';
import { sound } from '../utils/soundManager';

interface FounderProfileProps {
  founder: FounderProfileData;
}

/**
 * The real person behind Zyvro Labs. Rendered only when FOUNDER is set in
 * constants.ts; App.tsx and the navigation never mount it otherwise.
 */
export const FounderProfile: React.FC<FounderProfileProps> = ({ founder }) => {
  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="border-b border-[#202020] pb-4 mb-6">
        <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
          <User className="w-3.5 h-3.5" aria-hidden="true" />
          <span>FOUNDER // THE PERSON BEHIND THE LAB</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
          {founder.name}
        </h1>
        <p className="mt-1 text-sm font-mono text-[#A0A0A0]">{founder.role}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4">
          <div className="relative aspect-square bg-[#080808] border-2 border-[#D7FF3F] overflow-hidden">
            <img
              src={founder.photo}
              alt={`Portrait of ${founder.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-[#A0A0A0]">
            <MapPin className="w-3.5 h-3.5 text-[#D7FF3F]" aria-hidden="true" />
            <span>{founder.location}</span>
          </div>
        </div>

        <div className="md:col-span-8 bg-[#0b0b0b] border border-[#262626] p-6 space-y-5">
          <section>
            <h2 className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mb-2">ABOUT</h2>
            <p className="text-sm font-mono text-[#DDDDDD] leading-relaxed">{founder.bio}</p>
          </section>

          <section>
            <h2 className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mb-2">HOW THE WORK IS DONE</h2>
            <p className="text-sm font-mono text-[#DDDDDD] leading-relaxed">{founder.workStyle}</p>
          </section>

          <section>
            <h2 className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mb-2">GAMES IN DEVELOPMENT</h2>
            <ul className="space-y-1.5">
              {GAME_PROJECTS.map((game) => (
                <li key={game.id} className="flex items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-white font-bold">{game.title}</span>
                  <span className="text-[#888888]">{game.status} // {game.build}</span>
                </li>
              ))}
            </ul>
          </section>

          {founder.links.length > 0 && (
            <section>
              <h2 className="text-[10px] font-mono text-[#666666] uppercase tracking-widest mb-2">FIND THE FOUNDER</h2>
              <div className="flex flex-wrap gap-2">
                {founder.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover()}
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 bg-[#141414] border border-[#2a2a2a] hover:border-[#D7FF3F] text-xs font-mono text-[#D7FF3F] transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
