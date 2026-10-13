import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SystemSection, GameProject } from './types';
import { GAME_PROJECTS } from './utils/constants';
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
import { TransmissionTerminal } from './components/TransmissionTerminal';
import { SystemFooter } from './components/SystemFooter';
import { CommandPalette } from './components/CommandPalette';
import { NotFound } from './components/NotFound';

const BOOT_SEEN_KEY = 'zyvro_booted';

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
    // Storage unavailable
  }
}

/** Map a pathname to the SystemSection the HUD expects */
function pathnameToSection(pathname: string): SystemSection {
  if (pathname === '/') return 'hub';
  if (pathname.startsWith('/games/lab')) return 'lab';
  if (pathname.startsWith('/games/archive')) return 'archive';
  if (pathname.startsWith('/games')) return 'projects';
  if (pathname === '/about') return 'origin';
  if (pathname === '/contact') return 'transmission';
  return 'hub';
}

/** Wrapper for /games/:slug route that opens the modal */
const GameRoute: React.FC<{ onSelectProject: (p: GameProject) => void }> = ({ onSelectProject }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = GAME_PROJECTS.find(p => p.slug === slug) || null;

  useEffect(() => {
    if (project) {
      onSelectProject(project);
    }
  }, [project, onSelectProject]);

  if (!project) {
    return <NotFound />;
  }

  return (
    <>
      <GameLibrary onSelectProject={(p) => {
        navigate(`/games/${p.slug}`);
      }} />
      <GameDetailModal
        project={project}
        onClose={() => navigate('/games')}
      />
    </>
  );
};

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isBooted, setIsBooted] = useState<boolean>(shouldSkipBoot);
  const [selectedProject, setSelectedProject] = useState<GameProject | null>(null);
  const [isScanlinesOn, setIsScanlinesOn] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isPurging, setIsPurging] = useState(false);

  const activeSection = useMemo(() => pathnameToSection(location.pathname), [location.pathname]);

  const handleBootComplete = useCallback(() => {
    rememberBootSeen();
    setIsBooted(true);
  }, []);

  const handleRestartSystem = useCallback(() => {
    setIsBooted(false);
    setSelectedProject(null);
    setIsConsoleOpen(false);
    navigate('/');
  }, [navigate]);

  const handleEmergencyPurge = useCallback(() => {
    setIsPurging(true);
    setTimeout(() => {
      setIsPurging(false);
    }, 700);
  }, []);

  const handleNavigate = useCallback((section: SystemSection) => {
    const routeMap: Record<SystemSection, string> = {
      hub: '/',
      projects: '/games',
      lab: '/games/lab',
      archive: '/games/archive',
      origin: '/about',
      transmission: '/contact',
    };
    navigate(routeMap[section] || '/');
  }, [navigate]);

  const handleSelectProject = useCallback((project: GameProject) => {
    navigate(`/games/${project.slug}`);
  }, [navigate]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={`min-h-screen bg-[#080808] text-[#F2F2F2] selection:bg-[#D7FF3F] selection:text-[#080808] relative ${isPurging ? 'filter invert hue-rotate-180 animate-glitch' : ''}`}>
      
      <CustomCursor />
      <ScanlinesOverlay enabled={isScanlinesOn} />

      {!isBooted && (
        <BootScreen onBootComplete={handleBootComplete} />
      )}

      {isBooted && (
        <>
          <SystemHUD
            activeSection={activeSection}
            onSelectSection={handleNavigate}
            isScanlinesOn={isScanlinesOn}
            onToggleScanlines={() => setIsScanlinesOn(!isScanlinesOn)}
            onOpenConsole={() => setIsConsoleOpen(true)}
          />

          <main className="relative z-10 transition-opacity duration-300">
            <Routes>
              <Route path="/" element={
                <MainHub
                  onSelectProject={handleSelectProject}
                  onNavigate={handleNavigate}
                />
              } />
              <Route path="/games" element={
                <GameLibrary onSelectProject={handleSelectProject} />
              } />
              <Route path="/games/:slug" element={
                <GameRoute onSelectProject={setSelectedProject} />
              } />
              <Route path="/games/lab" element={<ZyvroLab />} />
              <Route path="/games/archive" element={<ArchiveDatabase />} />
              <Route path="/about" element={<OriginSystem />} />
              <Route path="/contact" element={<TransmissionTerminal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Game modal for direct navigation from non-game routes */}
          {selectedProject && !location.pathname.startsWith('/games/') && (
            <GameDetailModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}

          <CommandPalette
            isOpen={isConsoleOpen}
            onClose={() => setIsConsoleOpen(false)}
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
            onToggleScanlines={() => setIsScanlinesOn(!isScanlinesOn)}
            onToggleSound={() => sound.toggleMute()}
            onReboot={handleRestartSystem}
            onPurge={handleEmergencyPurge}
          />

          <SystemFooter
            onRestartSystem={handleRestartSystem}
            onEmergencyPurge={handleEmergencyPurge}
          />
        </>
      )}
    </div>
  );
};