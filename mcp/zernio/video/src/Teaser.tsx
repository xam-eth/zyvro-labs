import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame,
} from 'remotion';

/* ---------------------------------------------------------------- tokens */
const VOID = '#05080c';
const LIME = '#D7FF3F';
const AMBER = '#ffb020';
const INK = '#e8ffe0';
const DIM = '#8aa08a';
const MONO = "'DejaVu Sans Mono', 'Liberation Mono', monospace";

/* shot windows @30fps — storyboard lives in mcp/zernio/CINEMA-DESK.md */
const S = {
  crane: [0, 165],
  title: [165, 90],
  crash: [255, 75],
  whip: [330, 60],
  ramp: [390, 90],
  data: [480, 120],
  ledger: [600, 60],
  outro: [660, 60],
} as const;
export const TOTAL = 720;

const bez = Easing.bezier(0.2, 0, 0.25, 1); // the crane arm curve
const snap = Easing.bezier(0.1, 0.9, 0.2, 1);

/* ------------------------------------------------------------ house film */
const Film: React.FC = () => (
  <>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)' }} />
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /></filter>
    </svg>
    <AbsoluteFill style={{ filter: 'url(#grain)', opacity: 0.05, mixBlendMode: 'overlay' }} />
  </>
);

const Cap: React.FC<{ t: string; right?: string }> = ({ t, right }) => (
  <div style={{ position: 'absolute', top: 28, left: 40, right: 40, display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 20, letterSpacing: 3, color: LIME, borderBottom: `2px solid ${LIME}`, paddingBottom: 10 }}>
    <span>{t}</span><span style={{ color: AMBER }}>{right}</span>
  </div>
);

/* ------------------------------------------------- 1 · crane rise reveal */
const Crane: React.FC = () => {
  const f = useCurrentFrame();
  const breath = interpolate(f, [0, 24], [0, 0.015], { extrapolateRight: 'clamp' });
  const rise = interpolate(f, [24, 126], [3.0, 1.0], { easing: bez, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = f < 24 ? 3.0 + breath : rise;
  const dim = interpolate(f, [24, 50], [0.62, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: VOID }}>
      <AbsoluteFill style={{ transform: `scale(${scale}) translateY(${(scale - 1) * 6}%)`, transformOrigin: '50% 62%' }}>
        <Img src={staticFile('frames/chapter-first-light.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `rgba(5,8,12,${dim})` }} />
      <Cap t="SOURCE // HEADLESS PASS 07" right="CHAPTER 01" />
    </AbsoluteFill>
  );
};

/* ------------------------------------------- 2 · terminal title material */
const Title: React.FC = () => {
  const f = useCurrentFrame();
  const line = 'ZYVRO LABS // EXOCOMPLICT';
  const sub = 'DEV TRANSMISSION // 2026-W44';
  const n = Math.floor(interpolate(f, [6, 46], [0, line.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const m = Math.floor(interpolate(f, [40, 74], [0, sub.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const ls = interpolate(f, [0, 60], [18, 6], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: VOID, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 96, fontFamily: MONO }}>
      <div style={{ color: LIME, fontSize: 62, letterSpacing: ls, whiteSpace: 'pre' }}>{line.slice(0, n)}<span style={{ color: AMBER }}>{f % 12 < 6 ? '_' : ' '}</span></div>
      <div style={{ color: DIM, fontSize: 26, letterSpacing: 6, marginTop: 22, whiteSpace: 'pre' }}>{sub.slice(0, m)}</div>
      <div style={{ color: DIM, fontSize: 19, letterSpacing: 2, marginTop: 46 }}>WE DO NOT ANNOUNCE. WE PRODUCE EVIDENCE.</div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------ 3 · crash zoom punch + shake */
const Crash: React.FC = () => {
  const f = useCurrentFrame();
  const punch = interpolate(f, [30, 36], [1, 2.6], { easing: snap, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rebound = f > 36 ? 1 + 0.05 * Math.exp(-(f - 36) / 6) * Math.cos((f - 36) / 3) : 1;
  const scale = (f < 30 ? 1 : punch) * rebound;
  const shake = f > 36 ? 14 * Math.exp(-(f - 36) / 1.8) : 0;
  const dx = shake * Math.sin(f * 7.3);
  const dy = shake * Math.cos(f * 9.1);
  const flash = f > 36 ? 0.8 * Math.exp(-(f - 36) / 3) : 0;
  const dim = interpolate(f, [36, 48], [0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: VOID }}>
      <AbsoluteFill style={{ transform: `translate(${dx}px,${dy}px) scale(${scale})`, transformOrigin: '50% 55%' }}>
        <Img src={staticFile('frames/arena.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `rgba(5,8,12,${dim})` }} />
      <AbsoluteFill style={{ background: `rgba(255,244,214,${flash})` }} />
      <Cap t="ARENA // NEON FRONTIER" right="LANE 6 M OPEN" />
    </AbsoluteFill>
  );
};

/* --------------------------------------------- 4 · whip pan (speed blur) */
const Whip: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [8, 26], [0, 1], { easing: snap, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blur = 26 * Math.sin(Math.PI * t);
  return (
    <AbsoluteFill style={{ background: VOID }}>
      <AbsoluteFill style={{ transform: `translateX(${-t * 100}%)`, filter: `blur(${blur}px)` }}>
        <Img src={staticFile('frames/arena.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `translateX(${(1 - t) * 100}%)`, filter: `blur(${blur}px)` }}>
        <Img src={staticFile('frames/world-frostline.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <Cap t="THEATRES // FROSTLINE RELAY" right="3 WORLDS 0 FAIL" />
    </AbsoluteFill>
  );
};

/* ---------------------------------------- 5 · speed ramp walk -> prep cut */
const Ramp: React.FC = () => {
  const f = useCurrentFrame();
  const slow = interpolate(f, [0, 55], [1, 1.15], { easing: Easing.inOut(Easing.ease), extrapolateRight: 'clamp' });
  const fast = interpolate(f, [55, 68], [1.15, 1.5], { easing: snap, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const scale = f < 55 ? slow : fast;
  const late = f >= 68;
  return (
    <AbsoluteFill style={{ background: VOID }}>
      <AbsoluteFill style={{ transform: `scale(${late ? 1 : scale})`, transformOrigin: '50% 60%', opacity: late ? 0 : 1 }}>
        <Img src={staticFile('frames/walk.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: late ? 1 : 0 }}>
        <Img src={staticFile('frames/defense-prep.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Cap t="ENCOUNTER // START DEFENSE [B]" right="GATE HELD" />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ------------------------------------------ 6 · ledger gauges (odometer) */
const NUMS = [
  { v: 116282422, label: 'BYTES BOOT DEBT, PRINTED ON THE DOOR' },
  { v: 259, label: 'ANIMATION CLIPS, FORGE-VERIFIED' },
  { v: 9, label: 'HUE FAMILIES UNDER CONTRACT' },
];
const Data: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: VOID, fontFamily: MONO, justifyContent: 'center', paddingLeft: 96, gap: 34 }}>
      <div style={{ color: DIM, fontSize: 22, letterSpacing: 4 }}>RECEIPT // WEEK 44</div>
      {NUMS.map((n, i) => {
        const t = interpolate(f, [12 + i * 4, 62 + i * 4], [0, 1], { easing: bez, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const over = f > 62 + i * 4 && f < 74 + i * 4 ? 1.04 : 1; // mechanical overshoot settle
        return (
          <div key={n.label} style={{ transform: `scale(${over})`, transformOrigin: 'left center' }}>
            <div style={{ color: LIME, fontSize: 66, letterSpacing: 2 }}>{Math.round(n.v * t).toLocaleString('en-US')}</div>
            <div style={{ color: DIM, fontSize: 20, letterSpacing: 3, marginTop: 4 }}>{n.label}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------- 7 · amber ledger line */
const Ledger: React.FC = () => {
  const f = useCurrentFrame();
  const line = 'UNVERIFIED: ANDROID PACKAGING · PHYSICAL TOUCH · MOBILE FRAME TIME.';
  const n = Math.floor(interpolate(f, [4, 44], [0, line.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return (
    <AbsoluteFill style={{ background: VOID, fontFamily: MONO, justifyContent: 'center', paddingLeft: 96, paddingRight: 96 }}>
      <div style={{ color: AMBER, fontSize: 34, letterSpacing: 2, lineHeight: 1.5, whiteSpace: 'pre' }}>{line.slice(0, n)}</div>
      <div style={{ color: DIM, fontSize: 21, letterSpacing: 3, marginTop: 26 }}>SAME FONT. SAME WEIGHT. AS THE WINS.</div>
    </AbsoluteFill>
  );
};

/* ------------------------------- 8 · grain dissolve outro (turbulence chain) */
const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 60;
  const burst = interpolate(t, [0.13, 0.28], [0, 1], { easing: Easing.out(Easing.cubic), extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lock = interpolate(t, [0.68, 0.9], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const disp = 52 * burst * lock;
  const freq = 0.9 + 0.4 * burst;
  const blur = 1.1 * burst * lock;
  const seed = Math.floor(t * 46);
  const long_ = interpolate(t, [0.6, 0.71], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mark = interpolate(t, [0.6, 0.71], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bloom = t < 0.28 ? 0.3 : t < 0.8 ? 0.7 : 0.45;
  const filt = `url(#sand)`;
  return (
    <AbsoluteFill style={{ background: VOID, fontFamily: MONO, justifyContent: 'center', alignItems: 'center' }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="sand" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence key={seed} type="fractalNoise" baseFrequency={freq} numOctaves="2" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={disp} />
          <feGaussianBlur stdDeviation={blur} />
        </filter>
      </svg>
      <div style={{ filter: filt, textAlign: 'center', textShadow: `0 0 ${8 * bloom}px rgba(232,255,224,0.8), 0 0 ${33 * bloom}px rgba(215,255,63,0.35)` }}>
        <div style={{ opacity: long_, color: INK, fontSize: 26, letterSpacing: 4 }}>THE RECEIPT DESK</div>
        <div style={{ opacity: mark, color: LIME, fontSize: 74, letterSpacing: 8, marginTop: 10 }}>EXOCOMPLICT</div>
        <div style={{ opacity: mark, color: DIM, fontSize: 20, letterSpacing: 5, marginTop: 18 }}>ZYVRO LABS // BUILD TESTED, CLAIMS RECEIPTED</div>
      </div>
    </AbsoluteFill>
  );
};

/* --------------------------------------------------------------- assemble */
export const ZyvroTeaser: React.FC = () => (
  <AbsoluteFill style={{ background: VOID }}>
    <Sequence from={S.crane[0]} durationInFrames={S.crane[1]}><Crane /></Sequence>
    <Sequence from={S.title[0]} durationInFrames={S.title[1]}><Title /></Sequence>
    <Sequence from={S.crash[0]} durationInFrames={S.crash[1]}><Crash /></Sequence>
    <Sequence from={S.whip[0]} durationInFrames={S.whip[1]}><Whip /></Sequence>
    <Sequence from={S.ramp[0]} durationInFrames={S.ramp[1]}><Ramp /></Sequence>
    <Sequence from={S.data[0]} durationInFrames={S.data[1]}><Data /></Sequence>
    <Sequence from={S.ledger[0]} durationInFrames={S.ledger[1]}><Ledger /></Sequence>
    <Sequence from={S.outro[0]} durationInFrames={S.outro[1]}><Outro /></Sequence>
    <Film />
    {/* sound design: riser -> impact -> swoosh -> snap -> sparkle -> whoosh, per shotcraft's riser/impact/sparkle sentence */}
    <Audio src={staticFile('audio/riser-cine.mp3')} volume={0.45} />
    <Sequence from={291}><Audio src={staticFile('audio/impact-cine.mp3')} volume={0.75} /></Sequence>
    <Sequence from={336}><Audio src={staticFile('audio/swoosh-quick.mp3')} volume={0.5} /></Sequence>
    <Sequence from={455}><Audio src={staticFile('audio/transition-snap.mp3')} volume={0.6} /></Sequence>
    <Sequence from={492}><Audio src={staticFile('audio/sparkle.mp3')} volume={0.35} /></Sequence>
    <Sequence from={658}><Audio src={staticFile('audio/whoosh-big.mp3')} volume={0.6} /></Sequence>
  </AbsoluteFill>
);
