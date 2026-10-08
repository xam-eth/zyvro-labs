/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zyvro: {
          bg: "#080808",
          dark: "#101010",
          card: "#171717",
          surface: "#202020",
          hover: "#292929",
          border: "#262626",
          "border-bright": "#3F3F46",
          text: "#F2F2F2",
          muted: "#A0A0A0",
          dim: "#666666",
          accent: "#D7FF3F", // Signature Acid Lime / Toxic Yellow
          "accent-glow": "rgba(215, 255, 63, 0.25)",
          "accent-dim": "rgba(215, 255, 63, 0.1)",
          amber: "#FFB800",
          red: "#FF3344",
          cyan: "#00F0FF",
        }
      },
      fontFamily: {
        display: ['"Chakra Petch"', '"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'monospace'],
        hud: ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scanline 8s linear infinite',
        'glitch': 'glitch 1s linear infinite',
        'blink': 'blink 1s step-start infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(215,255,63,0.08) 1px, transparent 1px)',
        'dots-pattern': 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        'scanlines': 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
      }
    },
  },
  plugins: [],
}
