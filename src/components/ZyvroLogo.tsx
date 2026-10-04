import React from 'react';

export type ZVLogoVariant = 'symbol' | 'wordmark' | 'horizontal' | 'vertical' | 'full' | 'monolith' | 'kinetic' | 'shield';
export type ZVLogoState = 'normal' | 'active' | 'loading' | 'inactive';
export type ZVColorMode = 'full-color' | 'monochrome-white' | 'monochrome-dark' | 'toxic-lime';

interface ZyvroLogoProps {
  variant?: ZVLogoVariant;
  state?: ZVLogoState;
  colorMode?: ZVColorMode;
  renderMode?: 'ultra-hd' | 'vector';
  size?: number;
  className?: string;
  showText?: boolean;
}

/**
 * Returns the correct symbol image path based on color mode.
 * - full-color / toxic-lime → lime ZV symbol
 * - monochrome-white → white ZV symbol
 * - monochrome-dark → white symbol with dark filter
 */
function getSymbolSrcSet(colorMode: ZVColorMode): { src: string; srcSet: string } {
  const isWhite = colorMode === 'monochrome-white' || colorMode === 'monochrome-dark';
  const base = isWhite ? 'zyvro-zv-symbol-white' : 'zyvro-zv-symbol-lime';
  return {
    src: `/assets/brandkit/${base}.png`,
    srcSet: `/assets/brandkit/${base}-128px.png 1x, /assets/brandkit/${base}-512px.png 2x, /assets/brandkit/${base}-1024px.png 3x`,
  };
}

export const ZyvroLogo: React.FC<ZyvroLogoProps> = ({
  variant = 'symbol',
  state = 'normal',
  colorMode = 'full-color',
  renderMode = 'ultra-hd',
  size = 36,
  className = '',
  showText = false
}) => {
  // Dynamic glow and lighting styles based on UX state
  const getStateFilter = () => {
    if (colorMode === 'monochrome-white') {
      return 'brightness(2) contrast(1.5) grayscale(1) drop-shadow(0 0 6px rgba(255,255,255,0.5))';
    }
    if (colorMode === 'monochrome-dark') {
      return 'brightness(0.15) contrast(2) grayscale(1)';
    }
    if (colorMode === 'toxic-lime') {
      return 'hue-rotate(20deg) brightness(1.2) drop-shadow(0 0 12px rgba(215,255,63,0.8))';
    }

    switch (state) {
      case 'active':
        return 'brightness(1.2) drop-shadow(0 0 14px rgba(215,255,63,0.9))';
      case 'loading':
        return 'brightness(1.1) drop-shadow(0 0 16px rgba(215,255,63,0.7))';
      case 'inactive':
        return 'brightness(0.5) grayscale(0.8)';
      case 'normal':
      default:
        return 'drop-shadow(0 0 8px rgba(215,255,63,0.45))';
    }
  };

  const isOnlyWordmark = variant === 'wordmark';
  const isVertical = variant === 'vertical';
  const isHorizontal = variant === 'horizontal' || variant === 'full' || showText;
  const stateFilter = getStateFilter();
  const { src, srcSet } = getSymbolSrcSet(colorMode);

  return (
    <div 
      className={`inline-flex ${isVertical ? 'flex-col items-center space-y-2' : 'items-center space-x-3'} select-none ${className}`}
    >
      {/* 1. Ultra-HD Master Photorealistic Mode (real PNG assets) */}
      {!isOnlyWordmark && renderMode === 'ultra-hd' && (
        <div 
          className={`relative flex items-center justify-center flex-shrink-0 transition-all duration-300 ${state === 'loading' ? 'animate-pulse' : ''}`}
          style={{ width: size, height: size }}
        >
          <img 
            src={src}
            srcSet={srcSet}
            alt="ZYVRO LABS Official ZV Monogram"
            className="w-full h-full object-contain pointer-events-none transition-all duration-300"
            style={{ 
              filter: stateFilter,
              imageRendering: 'auto'
            }}
          />
        </div>
      )}

      {/* 2. Scalable Vector Mode (Pure SVG Geometry — fallback) */}
      {!isOnlyWordmark && renderMode === 'vector' && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 transition-all duration-300 ${state === 'loading' ? 'animate-pulse' : ''}`}
          style={{ filter: stateFilter }}
        >
          <defs>
            <linearGradient id="zv-vector-metal" x1="10%" y1="20%" x2="90%" y2="80%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="35%" stop-color="#E2E8F0" />
              <stop offset="70%" stop-color="#94A3B8" />
              <stop offset="100%" stop-color="#64748B" />
            </linearGradient>
            <linearGradient id="zv-vector-lime" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F4FFA8" />
              <stop offset="100%" stop-color="#D7FF3F" />
            </linearGradient>
          </defs>

          {/* Right 'V' Arm */}
          <polygon 
            points="44,56 60,86 86,26 72,26 58,64 48,46" 
            fill="url(#zv-vector-lime)" 
          />

          {/* Left 'Z' Monogram */}
          <polygon 
            points="14,26 58,26 68,38 38,38 52,66 52,78 14,78 24,66 38,66 24,38 14,38" 
            fill="url(#zv-vector-metal)" 
          />
        </svg>
      )}

      {/* Typography: ZYVRO — LABS — */}
      {(isHorizontal || isVertical) && (
        <div className={`flex flex-col ${isVertical ? 'items-center text-center' : 'text-left justify-center'} leading-none`}>
          <div className="flex items-center space-x-1.5">
            <span 
              className="font-display font-black tracking-widest uppercase transition-colors text-white"
              style={{ fontSize: Math.max(14, Math.round(size * 0.48)) }}
            >
              ZYVRO
            </span>
            <span 
              className="font-mono font-bold tracking-widest uppercase transition-colors text-[#D7FF3F]"
              style={{ fontSize: Math.max(9, Math.round(size * 0.28)) }}
            >
              LABS
            </span>
          </div>
          <span 
            className="font-mono tracking-[0.25em] text-[#888888] uppercase mt-1 block font-semibold"
            style={{ fontSize: Math.max(7, Math.round(size * 0.18)) }}
          >
            PLAY BEYOND LIMITS
          </span>
        </div>
      )}
    </div>
  );
};