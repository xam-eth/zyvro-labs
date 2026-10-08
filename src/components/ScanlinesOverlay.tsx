import React from 'react';

interface ScanlinesOverlayProps {
  enabled: boolean;
}

export const ScanlinesOverlay: React.FC<ScanlinesOverlayProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* High-frequency Subtle CRT Scanlines */}
      <div 
        className="absolute inset-0 bg-repeat opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.6))` ,
          backgroundSize: '100% 3px',
        }}
      />

      {/* Screen Vignette & CRT Edge Shadow */}
      <div 
        className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" 
      />

      {/* Subtle traveling scan bar */}
      <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#D7FF3F]/[0.03] to-transparent animate-scan pointer-events-none" />
    </div>
  );
};
