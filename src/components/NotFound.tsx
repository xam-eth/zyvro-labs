import React from 'react';
import { Link } from 'react-router-dom';
import { sound } from '../utils/soundManager';

export const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center select-none">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] border border-[#FF3344]/40 text-[11px] font-mono text-[#FF3344]">
          <span className="w-2 h-2 bg-[#FF3344] animate-pulse rounded-full" />
          <span>ERROR 404 // ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white uppercase">
          SIGNAL LOST
        </h1>

        <p className="text-sm font-mono text-[#A0A0A0] max-w-md mx-auto">
          THE REQUESTED ROUTE DOES NOT EXIST IN THE ZYVRO OPERATING SYSTEM.
        </p>

        <Link
          to="/"
          onClick={() => sound.playClick()}
          onMouseEnter={() => sound.playHover()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D7FF3F] hover:bg-white text-[#080808] font-mono font-bold tracking-widest text-xs uppercase transition-all"
        >
          [ RETURN TO COMMAND CENTER ]
        </Link>
      </div>
    </div>
  );
};