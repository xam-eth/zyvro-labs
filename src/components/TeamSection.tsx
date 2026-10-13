import React from 'react';
import { Users, ExternalLink, MapPin } from 'lucide-react';
import { FounderProfile as FounderProfileData } from '../types';
import { sound } from '../utils/soundManager';

interface TeamSectionProps {
  founder: FounderProfileData;
}

/**
 * The "Team" block at the bottom of the About page. Zyvro Labs is one person,
 * so the section says so plainly instead of padding it with a roster.
 */
export const TeamSection: React.FC<TeamSectionProps> = ({ founder }) => {
  return (
    <section aria-labelledby="team-heading" className="mt-10 pt-8 border-t border-[#202020]">
      <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
        <Users className="w-3.5 h-3.5" aria-hidden="true" />
        <span>THE TEAM</span>
      </div>
      <h2 id="team-heading" className="text-2xl md:text-3xl font-black font-display tracking-tight text-white uppercase">
        ONE FOUNDER
      </h2>
      <p className="mt-1 mb-6 text-xs font-mono text-[#888888]">
        Zyvro Labs has no other team members. Everything on this site is built by the person below.
      </p>

      <div className="bg-[#0b0b0b] border border-[#262626] p-5 md:p-6 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-5 items-start">
        <img
          src={founder.photo}
          alt={`Portrait of ${founder.name}`}
          width={160}
          height={160}
          loading="lazy"
          className="w-32 h-32 sm:w-40 sm:h-40 object-cover border-2 border-[#D7FF3F]"
        />

        <div className="space-y-4 min-w-0">
          <div>
            <h3 className="text-xl md:text-2xl font-black font-display text-white uppercase">{founder.name}</h3>
            <p className="text-xs font-mono text-[#A0A0A0]">{founder.role}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-mono text-[#888888]">
              <MapPin className="w-3.5 h-3.5 text-[#D7FF3F]" aria-hidden="true" />
              {founder.location}
            </p>
          </div>

          <p className="text-sm font-mono text-[#DDDDDD] leading-relaxed">{founder.bio}</p>
          <p className="text-sm font-mono text-[#A0A0A0] leading-relaxed">{founder.workStyle}</p>

          {founder.links.length > 0 && (
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
          )}
        </div>
      </div>
    </section>
  );
};
