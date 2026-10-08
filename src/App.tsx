import React, { useState, useEffect } from 'react';
import { SystemSection, GameProject } from './types';
import { FOUNDER } from './utils/constants';
import { sound } from './utils/soundManager';

import { CustomCursor } from './components/CustomCursor';
import { BootScreen } from './components/BootScreen';
import { SystemHUD } from './components/SystemHUD';
import { ScanlinesOverlay } from './components/ScanlinesOverlay';
import { MainHub } from './components/MainHub';
import { GameLibrary } from './components/GameLibrary';
import { GameDetailModal } from './components/GameDetailModal';
import { ZyvroLab } from './components/ZyvroLab';
import { ArchiveDatabase } from './components/ArchiveDatabase';
import { OriginSystem } from './components/OriginSystem';
import { FounderProfile } from './components/FounderProfile';
import { TransmissionTerminal } from './components/TransmissionTerminal';
import { SystemFooter } from './components/SystemFooter';
import { CommandPalette } from './components/CommandPalette';

const BOOT_SEEN_KEY = 'zyvro_booted';

/**
 * The boot sequence is skipped for links shared with reviewers (?skipboot=1),
 * for visitors who already watched it once, and for visitors who asked the
 * system to reduce motion.
 */
function shouldSkipBoot(): boolean {
  if (typeof window === 'undefined') return false;
  if (new URLSearchParams(window.location.search).get('skipboot') === '1') return true;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return window.localStorage.getItem(BOOT_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function rememberBootSeen(): void {
  try {
    window.localStorage.setItem(BOOT_SEEN_KEY, '1');
  } catch {
    // Storage unavailable (private mode or blocked): the intro simply shows again next visit.
  }
}

export const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState<boolean>(shouldSkipBoot);
  const [activeSection, setActiveSection] = useState<SystemSection>('hub');
  const [selectedProject, setSelectedProject] = useState<GameProject | null>(null);
  const [isScanlinesOn, setIsScanlinesOn] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isPurging, setIsPurging] = useState(false);

  const handleBootComplete = () => {
    rememberBootSeen();
    setIsBooted(true);
  };

  const handleRestartSystem = () => {
    setIsBooted(false);
    setSelectedProject(null);
    setActiveSection('hub');
    setIsConsoleOpen(false);
  };

  const handleEmergencyPurge = () => {
    setIsPurging(true);
    setTimeout(() => {
      setIsPurging(false);
    }, 700);
  };

  // Scroll to top smoothly when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className={`min-h-screen bg-[#080808] text-[#F2F2F2] selection:bg-[#D7FF3F] selection:text-[#080808] relative ${isPurging ? 'filter invert hue-rotate-180 animate-glitch' : ''}`}>
      
      {/* Custom Precision Targeting Reticle Cursor */}
      <CustomCursor />

      {/* CRT Scanlines and Screen Curvature */}
      <ScanlinesOverlay enabled={isScanlinesOn} />

      {/* MANDATORY BOOT SCREEN */}
      {!isBooted && (
        <BootScreen 
          onBootComplete={handleBootComplete} 
        />
      )}

      {/* ACTIVE GAME OPERATING SYSTEM ENVIRONMENT */}
      {isBooted && (
        <>
          {/* Global System HUD Header and Vertical Navigation Console */}
          <SystemHUD
            activeSection={activeSection}
            onSelectSection={(section) => setActiveSection(section)}
            isScanlinesOn={isScanlinesOn}
            onToggleScanlines={() => setIsScanlinesOn(!isScanlinesOn)}
            onOpenConsole={() => setIsConsoleOpen(true)}
            showFounder={FOUNDER !== null}
          />

          {/* Dynamic Content Views */}
          <main className="relative z-10 transition-opacity duration-300">
            {activeSection === 'hub' && (
              <MainHub
                onSelectProject={(project) => setSelectedProject(project)}
                onNavigate={(section) => setActiveSection(section)}
              />
            )}

            {activeSection === 'projects' && (
              <GameLibrary
                onSelectProject={(project) => setSelectedProject(project)}
              />
            )}

            {activeSection === 'lab' && (
              <ZyvroLab />
            )}

            {activeSection === 'archive' && (
              <ArchiveDatabase />
            )}

            {activeSection === 'origin' && (
              <OriginSystem />
            )}

            {activeSection === 'founder' && FOUNDER && (
              <FounderProfile founder={FOUNDER} />
            )}

            {activeSection === 'transmission' && (
              <TransmissionTerminal />
            )}
          </main>

          {/* Interactive Game Detail Modal / Initialization Screen */}
          <GameDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          {/* In-Game Terminal CLI Console */}
          <CommandPalette
            isOpen={isConsoleOpen}
            onClose={() => setIsConsoleOpen(false)}
            onNavigate={(section) => setActiveSection(section)}
            onSelectProject={(project) => setSelectedProject(project)}
            onToggleScanlines={() => setIsScanlinesOn(!isScanlinesOn)}
            onToggleSound={() => sound.toggleMute()}
            onReboot={handleRestartSystem}
            onPurge={handleEmergencyPurge}
          />

          {/* Footer: End of Transmission / System Shutdown */}
          <SystemFooter
            onRestartSystem={handleRestartSystem}
            onEmergencyPurge={handleEmergencyPurge}
          />
        </>
      )}

    </div>
  );
};
