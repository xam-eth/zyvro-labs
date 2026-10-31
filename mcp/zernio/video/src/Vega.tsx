import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame,
} from 'remotion';

const VOID = '#05080c';
const LIME = '#D7FF3F';
const AMBER = '#ffb020';
const INK = '#e8ffe0';
const DIM = '#8aa08a';
const MONO = "'DejaVu Sans Mono', 'Liberation Mono', monospace";
const bez = Easing.bezier(0.2, 0, 0.25, 1);
const snap = Easing.bezier(0.1, 0.9, 0.2, 1);
export const VEGA_TOTAL = 1245; // 40.7s VO @30fps + 24f tail hold

/* caption windows (frames) = script seconds * 30 */
const CAPS: [number, number, string, boolean][] = [
  [0, 54, 'Checked, not claimed.', false],
  [54, 225, "I'm Vega Arunika — an AI ambassador for Zyvro Labs,\nand yes, that's disclosed, because honesty is the whole brand.", false],
  [225, 405, 'This week: the arena moved its relay masts off the spawn ring.\nThe lane breathes at six metres per side.', false],
  [405, 570, '259 animation clips, forge-verified.\nThree worlds. Zero failures.', false],
  [570, 750, 'And one selector that never worked —\nwe confess that one aloud, because confessions are content here.', false],
  [750, 945, 'What stays unverified: Android packaging.\nPhysical touch. Mobile frame time.', true],
  [945, 1050, 'Same font. Same weight. As the wins.', true],
  [1050, 1221, 'Saya baca ledger-nya dulu — always.\nSee you in the next transmission.', false],
];

const Film: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)' }} />
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="vgrain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /></filter>
    </svg>
    <AbsoluteFill style={{ filter: 'url(#vgrain)', opacity: 0.05, mixBlendMode: 'overlay' }} />
  </>
);

const Portrait: React.FC<{ from: number; dur: number; scale0: number; scale1: number; dx?: [number, number] }> = ({ from, dur, scale0, scale1, dx }) => {
  const f = useCurrentFrame();
  const g = f - from;
  if (g < 0 || g >= dur) return null;
  const s = interpolate(g, [0, dur], [scale0, scale1], { easing: bez });
  const x = dx ? interpolate(g, [0, dur], dx, { easing: Easing.inOut(Easing.ease) }) : 0;
  return (
    <AbsoluteFill style={{ transform: `translateX(${x}px) scale(${s})`, transformOrigin: '50% 42%' }}>
      <Img src={staticFile('vega.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(to top, rgba(5,8,12,0.85), transparent 45%)' }} />
    </AbsoluteFill>
  );
};

const Arena: React.FC = () => {
  const f = useCurrentFrame();
  const g = f - 225;
  if (g < 0 || g >= 180) return null;
  const punch = interpolate(g, [20, 26], [1, 1.5], { easing: snap, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shake = g > 26 ? 7 * Math.exp(-(g - 26) / 1.8) : 0;
  return (
    <AbsoluteFill style={{ transform: `translate(${shake * Math.sin(g * 7.3)}px,${shake * Math.cos(g * 9.1)}px) scale(${g < 20 ? 1 : punch})`, transformOrigin: '50% 55%' }}>
      <Img src={staticFile('frames/arena.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </AbsoluteFill>
  );
};

const Odo: React.FC = () => {
  const f = useCurrentFrame();
  const g = f - 405;
  if (g < 0 || g >= 165) return null;
  const nums = [
    { v: 259, l: 'CLIPS FORGE-VERIFIED' },
    { v: 3, l: 'WORLDS' },
    { v: 0, l: 'FAILURES' },
  ];
  return (
    <AbsoluteFill style={{ background: VOID, fontFamily: MONO, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 90 }}>
      {nums.map((n, i) => {
        const t = interpolate(g, [10 + i * 4, 60 + i * 4], [0, 1], { easing: bez, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <div key={n.l} style={{ textAlign: 'center' }}>
            <div style={{ color: n.v === 0 ? AMBER : LIME, fontSize: 96 }}>{Math.round(n.v * t)}</div>
            <div style={{ color: DIM, fontSize: 20, letterSpacing: 3, marginTop: 8 }}>{n.l}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const LedgerType: React.FC = () => {
  const f = useCurrentFrame();
  const g = f - 750;
  if (g < 0 || g >= 300) return null;
  const lines = ['UNVERIFIED: ANDROID PACKAGING.', 'PHYSICAL TOUCH. MOBILE FRAME TIME.', 'SAME FONT. SAME WEIGHT. AS THE WINS.'];
  return (
    <AbsoluteFill style={{ background: VOID, fontFamily: MONO, justifyContent: 'center', paddingLeft: 110, gap: 26 }}>
      {lines.map((l, i) => {
        const n = Math.floor(interpolate(g, [i * 70, i * 70 + 50], [0, l.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
        return <div key={l} style={{ color: i === 2 ? INK : AMBER, fontSize: 36, letterSpacing: 2, whiteSpace: 'pre' }}>{l.slice(0, n)}</div>;
      })}
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const g = f - 1050;
  if (g < 0) return null;
  const t = g / 195;
  const burst = interpolate(t, [0.1, 0.3], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lock = interpolate(t, [0.6, 0.85], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const disp = 40 * burst * lock;
  const seed = Math.floor(t * 46);
  return (
    <AbsoluteFill style={{ background: VOID }}>
      <AbsoluteFill style={{ opacity: 0.35, transform: 'scale(1.15)' }}>
        <Img src={staticFile('vega.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%' }} />
      </AbsoluteFill>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="vsand" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence key={seed} type="fractalNoise" baseFrequency={0.9 + 0.4 * burst} numOctaves="2" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={disp} />
        </filter>
      </svg>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: MONO }}>
        <div style={{ filter: 'url(#vsand)', textAlign: 'center' }}>
          <div style={{ color: LIME, fontSize: 64, letterSpacing: 8 }}>VEGA ARUNIKA</div>
          <div style={{ color: DIM, fontSize: 22, letterSpacing: 5, marginTop: 14 }}>AI AMBASSADOR // ZYVRO LABS RECEIPT DESK</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const cap = CAPS.find(([a, b]) => f >= a && f < b);
  const corner = (
    <div style={{ position: 'absolute', top: 22, right: 30, fontFamily: MONO, fontSize: 16, letterSpacing: 3, color: DIM, border: `1px solid ${DIM}`, padding: '6px 10px' }}>
      AI AMBASSADOR // VEGA ARUNIKA
    </div>
  );
  if (!cap) return corner;
  return (
    <>
      {corner}
      <div style={{ position: 'absolute', bottom: 46, left: 0, right: 0, textAlign: 'center', fontFamily: MONO, fontSize: 28, lineHeight: 1.35, letterSpacing: 1, whiteSpace: 'pre', color: cap[3] ? AMBER : LIME, textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
        {cap[2]}
      </div>
    </>
  );
};

export const VegaLedgerRead: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: VOID }}>
      {f < 225 && <Portrait from={0} dur={225} scale0={1} scale1={1.08} />}
      {f >= 30 && f < 225 && (
        <div style={{ position: 'absolute', left: 60, bottom: 120, fontFamily: MONO }}>
          <div style={{ color: INK, fontSize: 40, letterSpacing: 4 }}>VEGA ARUNIKA</div>
          <div style={{ color: LIME, fontSize: 20, letterSpacing: 4, marginTop: 6 }}>AI AMBASSADOR // EXOCOMPLICT RECEIPT DESK</div>
        </div>
      )}
      <Arena />
      <Odo />
      {f >= 570 && f < 750 && <Portrait from={570} dur={180} scale0={1.06} scale1={1.1} dx={[-14, 14]} />}
      <LedgerType />
      <Outro />
      <Captions />
      <Film />
      <Audio src={staticFile('audio/vo-ledger-w44.mp3')} volume={1} />
    </AbsoluteFill>
  );
};
