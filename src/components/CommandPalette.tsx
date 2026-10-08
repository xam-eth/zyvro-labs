import React, { useState, useEffect, useRef } from 'react';
import { SystemSection, GameProject } from '../types';
import { GAME_PROJECTS, SYSTEM_METADATA } from '../utils/constants';
import { sound } from '../utils/soundManager';
import { Terminal, X, CornerDownLeft } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: SystemSection) => void;
  onSelectProject: (project: GameProject) => void;
  onToggleScanlines: () => void;
  onToggleSound: () => void;
  onReboot: () => void;
  onPurge: () => void;
}

interface LogEntry {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectProject,
  onToggleScanlines,
  onToggleSound,
  onReboot,
  onPurge
}) => {
  const [cmdInput, setCmdInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'output', text: `ZYVRO_OS KERNEL ${SYSTEM_METADATA.kernel} // TYPE 'help' FOR COMMANDS` }
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Global keydown for ~ or Escape
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    const query = cmdInput.trim().toLowerCase();
    if (!query) return;

    sound.playClick();
    const newLogs: LogEntry[] = [...history, { type: 'input', text: `> ${cmdInput}` }];

    switch (query) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'AVAILABLE PROTOCOLS:\n • hub, projects, lab, archive, origin, crew, transmission\n • valen, exo, null, aether (direct world launch)\n • sound (toggle audio), scanlines (toggle CRT)\n • reboot (restart OS), purge (vram reset), clear (cls)'
        });
        break;

      case 'hub':
      case 'home':
        onNavigate('hub');
        newLogs.push({ type: 'success', text: 'NAVIGATING TO COMMAND CENTER (MAIN HUB)...' });
        setTimeout(onClose, 400);
        break;

      case 'projects':
      case 'games':
      case 'worlds':
        onNavigate('projects');
        newLogs.push({ type: 'success', text: 'NAVIGATING TO PROJECT SELECT SCREEN...' });
        setTimeout(onClose, 400);
        break;

      case 'lab':
      case 'r&d':
        onNavigate('lab');
        newLogs.push({ type: 'success', text: 'INITIALIZING ZYVRO LAB EXPERIMENTAL WORKBENCH...' });
        setTimeout(onClose, 400);
        break;

      case 'archive':
      case 'logs':
      case 'lore':
        onNavigate('archive');
        newLogs.push({ type: 'success', text: 'MOUNTING ARCHIVE DATABASE...' });
        setTimeout(onClose, 400);
        break;

      case 'origin':
      case 'about':
      case 'manifesto':
        onNavigate('origin');
        newLogs.push({ type: 'success', text: 'DISPLAYING SYSTEM ORIGIN MANIFESTO...' });
        setTimeout(onClose, 400);
        break;

      case 'crew':
      case 'team':
      case 'players':
        onNavigate('crew');
        newLogs.push({ type: 'success', text: 'OPENING OPERATIVE ROSTER...' });
        setTimeout(onClose, 400);
        break;

      case 'transmission':
      case 'contact':
        onNavigate('transmission');
        newLogs.push({ type: 'success', text: 'ESTABLISHING UPLINK TO TRANSMISSION TERMINAL...' });
        setTimeout(onClose, 400);
        break;

      case 'valen':
        onSelectProject(GAME_PROJECTS[0]);
        newLogs.push({ type: 'success', text: 'INITIALIZING PROJECT 001: VALEN...' });
        setTimeout(onClose, 400);
        break;

      case 'exo':
      case 'exo-chrono':
        onSelectProject(GAME_PROJECTS[1]);
        newLogs.push({ type: 'success', text: 'INITIALIZING PROJECT 002: EXO-CHRONO...' });
        setTimeout(onClose, 400);
        break;

      case 'null':
      case 'null-sector':
        onSelectProject(GAME_PROJECTS[2]);
        newLogs.push({ type: 'success', text: 'INITIALIZING PROJECT 003: NULL//SECTOR...' });
        setTimeout(onClose, 400);
        break;

      case 'aether':
      case 'aether-voyager':
        onSelectProject(GAME_PROJECTS[3]);
        newLogs.push({ type: 'success', text: 'INITIALIZING PROJECT 004: AETHER VOYAGER...' });
        setTimeout(onClose, 400);
        break;

      case 'sound':
      case 'mute':
        onToggleSound();
        newLogs.push({ type: 'output', text: 'AUDIO SYNTHESIS STATE TOGGLED.' });
        break;

      case 'scanlines':
      case 'crt':
        onToggleScanlines();
        newLogs.push({ type: 'output', text: 'CRT SCANLINES OVERLAY TOGGLED.' });
        break;

      case 'reboot':
      case 'restart':
        onClose();
        onReboot();
        break;

      case 'purge':
        onPurge();
        newLogs.push({ type: 'error', text: 'WARNING: VRAM BUFFER PURGED. SYSTEM REFRESHED.' });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setCmdInput('');
        return;

      default:
        sound.playFault();
        newLogs.push({
          type: 'error',
          text: `COMMAND NOT RECOGNIZED: '${cmdInput}'. TYPE 'help' FOR SYSTEM COMMANDS.`
        });
        break;
    }

    setHistory(newLogs);
    setCmdInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none">
      
      {/* Console Window */}
      <div className="w-full max-w-2xl bg-[#090909] border border-[#2d2d2d] shadow-[0_0_50px_rgba(215,255,63,0.15)] flex flex-col h-[420px] overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-[#121212] border-b border-[#202020] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-mono text-white">
            <Terminal className="w-4 h-4 text-[#D7FF3F]" />
            <span className="font-bold">ZYVRO_TERMINAL_TTY // PROTOCOL CONSOLE</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-[#666666] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Logs Output Box */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs">
          {history.map((item, idx) => (
            <div 
              key={idx}
              className={`whitespace-pre-line leading-relaxed ${
                item.type === 'input' 
                  ? 'text-[#D7FF3F] font-bold' 
                  : item.type === 'error'
                  ? 'text-[#FF3344]'
                  : item.type === 'success'
                  ? 'text-[#D7FF3F]'
                  : 'text-[#A0A0A0]'
              }`}
            >
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleExecute} className="border-t border-[#202020] bg-[#0d0d0d] p-3 flex items-center space-x-2">
          <span className="text-[#D7FF3F] font-mono text-sm font-bold">›</span>
          <input
            ref={inputRef}
            type="text"
            value={cmdInput}
            onChange={(e) => {
              sound.playKeyTick();
              setCmdInput(e.target.value);
            }}
            placeholder="Type 'help', 'valen', 'lab', 'reboot'..."
            className="flex-1 bg-transparent text-xs font-mono text-white outline-none uppercase placeholder:text-[#444444]"
          />
          <button
            type="submit"
            className="p-1 bg-[#1c1c1c] hover:bg-[#D7FF3F] text-[#888888] hover:text-[#080808] transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
};
