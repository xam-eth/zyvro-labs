import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'select' | 'interact' | 'scan'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Check if touch device - if so, don't show custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      const clickable = target.closest('button, a, input, select, textarea, [role="button"]');

      if (interactive) {
        const type = interactive.getAttribute('data-cursor');
        const label = interactive.getAttribute('data-cursor-label') || '';
        if (type === 'select') {
          setCursorState('select');
          setCursorLabel(label || 'SELECT');
        } else if (type === 'scan') {
          setCursorState('scan');
          setCursorLabel(label || 'SCANNING');
        } else if (type === 'interact') {
          setCursorState('interact');
          setCursorLabel(label || 'INTERACT');
        }
      } else if (clickable) {
        setCursorState('interact');
        setCursorLabel('INTERACT');
      } else {
        setCursorState('default');
        setCursorLabel('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp animation loop
    let animId: number;
    const updateCursor = () => {
      setPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.35,
        y: prev.y + (targetPos.y - prev.y) * 0.35,
      }));
      animId = requestAnimationFrame(updateCursor);
    };
    animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [targetPos, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-opacity duration-200 hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Central reticle dot */}
      <div
        className={`w-2 h-2 rounded-full transition-all duration-150 ${
          isClicking
            ? 'scale-150 bg-[#D7FF3F] shadow-[0_0_12px_#D7FF3F]'
            : cursorState === 'scan'
            ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]'
            : 'bg-[#D7FF3F] shadow-[0_0_8px_#D7FF3F]'
        }`}
      />

      {/* Reticle Outer Brackets */}
      <div
        className={`absolute -top-4 -left-4 w-8 h-8 pointer-events-none transition-transform duration-200 ${
          cursorState === 'interact'
            ? 'scale-125 rotate-45'
            : cursorState === 'scan'
            ? 'scale-150 animate-spin-slow'
            : isClicking
            ? 'scale-75'
            : 'scale-100 rotate-0'
        }`}
      >
        {/* Top-left corner */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#D7FF3F]/80" />
        {/* Top-right corner */}
        <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#D7FF3F]/80" />
        {/* Bottom-left corner */}
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#D7FF3F]/80" />
        {/* Bottom-right corner */}
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#D7FF3F]/80" />
      </div>

      {/* Cursor state indicator label & coordinates */}
      {cursorLabel && (
        <div className="absolute left-6 top-2 flex items-center space-x-1.5 whitespace-nowrap bg-[#080808]/90 border border-[#D7FF3F]/50 px-2 py-0.5 rounded-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-[#D7FF3F] animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest text-[#D7FF3F] font-bold uppercase">
            {cursorLabel}
          </span>
        </div>
      )}
    </div>
  );
};
