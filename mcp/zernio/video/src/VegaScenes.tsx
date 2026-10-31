import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame,
} from 'remotion';
import ENV from './vo-envelope.json';

const VOID = '#05080c';
const LIME = '#D7FF3F';
const AMBER = '#ffb020';
const INK = '#e8ffe0';
const DIM = '#8aa08a';
const MONO = "'DejaVu Sans Mono', 'Liberation Mono', monospace";
const bez = Easing.bezier(0.2, 0, 0.25, 1);

export const VEGA_SCENES_TOTAL = 1245; // 40.7s VO @30fps + tail

/* ---- voice envelope helpers (30fps RMS jaw-open) ---- */
const rawOpen = (f: number) => {
  const i = Math.max(0, Math.min(ENV.length - 1, Math.round(f)));
  return (ENV as { f: number; open: number }[])[i]?.open ?? 0;
};
const openAt = (f: number) => (rawOpen(f - 1) + rawOpen(f) * 2 + rawOpen(f + 1)) / 4;
const blinkAt = (f: number) => (((f + 37) % 128) < 4 || ((f + 191) % 173) < 3) ? 1 : 0;

/* ---- caption windows (frames) — same script beats as the VO ---- */
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

const Grain: React.FC = () => (
  <>
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="sgrain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /></filter>
    </svg>
    <AbsoluteFill style={{ filter: 'url(#sgrain)', opacity: 0.05, mixBlendMode: 'overlay' }} />
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.5) 100%)' }} />
  </>
);

const Scan: React.FC<{ o?: number }> = ({ o = 0.07 }) => (
  <AbsoluteFill style={{ background: 'repeating-linear-gradient(to bottom, rgba(215,255,63,0.5) 0px, rgba(215,255,63,0.5) 1px, transparent 1px, transparent 4px)', opacity: o, mixBlendMode: 'overlay' }} />
);

const Chip: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 20) return null;
  return (
    <div style={{ position: 'absolute', top: 22, right: 26, display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${LIME}`, padding: '7px 12px', fontFamily: MONO, fontSize: 12, letterSpacing: 2, color: LIME, background: 'rgba(5,8,12,0.72)' }}>
      <span style={{ width: 8, height: 8, borderRadius: 8, background: LIME, opacity: f % 40 < 24 ? 1 : 0.25 }} />
      AI AMBASSADOR // VEGA ARUNIKA
    </div>
  );
};

const Timecode: React.FC = () => {
  const f = useCurrentFrame();
  const ss = String(Math.floor(f / 30)).padStart(2, '0');
  const ff = String(f % 30).padStart(2, '0');
  return (
    <div style={{ position: 'absolute', top: 24, left: 26, fontFamily: MONO, fontSize: 12, letterSpacing: 2, color: DIM }}>
      REC <span style={{ color: f % 40 < 24 ? AMBER : 'transparent' }}>●</span> 00:{ss}:{ff}
    </div>
  );
};

const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const cap = CAPS.find(([a, b]) => f >= a && f < b);
  if (!cap) return null;
  const [a, , text, amber] = cap;
  const g = f - a;
  const op = interpolate(g, [0, 6], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, display: 'flex', justifyContent: 'center', opacity: op }}>
      <div style={{ maxWidth: 940, borderLeft: `3px solid ${amber ? AMBER : LIME}`, background: 'rgba(5,8,12,0.82)', padding: '12px 20px', fontFamily: MONO, fontSize: 25, lineHeight: 1.4, color: INK, whiteSpace: 'pre-line' }}>
        {text}
      </div>
    </div>
  );
};

/* ---- B-roll scene plate with directed camera move + grade + VFX ---- */
type Move = 'push' | 'panR' | 'panL' | 'arc' | 'hold';
const Scene: React.FC<{
  from: number; dur: number; plate: string; move: Move; label: string;
  grade?: 'none' | 'amber'; flash?: number[]; inset?: string;
}> = ({ from, dur, plate, move, label, grade = 'none', flash, inset }) => {
  const f = useCurrentFrame();
  const g = f - from;
  if (g < 0 || g >= dur) return null;
  const t = g / dur;
  let sc = 1.1; let x = 0; let y = 0; let rot = 0;
  if (move === 'push') sc = interpolate(t, [0, 1], [1.06, 1.2], { easing: bez });
  if (move === 'panR') { sc = 1.18; x = interpolate(t, [0, 1], [60, -60], { easing: Easing.inOut(Easing.ease) }); }
  if (move === 'panL') { sc = 1.18; x = interpolate(t, [0, 1], [-60, 60], { easing: Easing.inOut(Easing.ease) }); }
  if (move === 'arc') { sc = 1.16; x = 40 * Math.sin(t * Math.PI * 2); rot = 1.2 * Math.sin(t * Math.PI * 2); y = -14 * Math.sin(t * Math.PI); }
  let shakeX = 0; let shakeY = 0; let flashOp = 0;
  (flash ?? []).forEach((fx) => {
    const d = g - fx;
    if (d >= 0 && d < 10) {
      flashOp = Math.max(flashOp, 0.85 * Math.exp(-d / 2.2));
      shakeX += 6 * Math.exp(-d / 2) * Math.sin(d * 9.7);
      shakeY += 4 * Math.exp(-d / 2) * Math.cos(d * 11.3);
    }
  });
  const inOp = interpolate(g, [0, 5], [0, 1], { extrapolateRight: 'clamp' });
  const outOp = interpolate(g, [dur - 6, dur - 1], [1, 0], { extrapolateLeft: 'clamp' });
  return (
    <AbsoluteFill style={{ opacity: inOp * outOp, background: VOID }}>
      <AbsoluteFill style={{ transform: `translate(${x + shakeX}px, ${y + shakeY}px) scale(${sc}) rotate(${rot}deg)` }}>
        <Img src={staticFile(plate)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      {grade === 'amber' && <AbsoluteFill style={{ background: 'linear-gradient(to top, rgba(255,176,32,0.22), rgba(255,176,32,0.05))', mixBlendMode: 'overlay' }} />}
      {flashOp > 0 && (
        <>
          <AbsoluteFill style={{ background: `radial-gradient(circle at 52% 46%, rgba(215,255,63,${0.5 * flashOp}), transparent 34%)` }} />
          <div style={{ position: 'absolute', left: '50%', top: '78%', width: 3, height: 250, background: `linear-gradient(to top, rgba(215,255,63,${flashOp}), transparent)`, transform: `rotate(${18 + (g % 7)}deg)`, transformOrigin: '50% 100%' }} />
        </>
      )}
      <Scan o={0.05} />
      <Grain />
      <div style={{ position: 'absolute', top: 58, left: 26, fontFamily: MONO, fontSize: 13, letterSpacing: 3, color: grade === 'amber' ? AMBER : LIME, background: 'rgba(5,8,12,0.7)', padding: '6px 10px', borderLeft: `3px solid ${grade === 'amber' ? AMBER : LIME}` }}>
        {label}
      </div>
      {inset && (
        <div style={{ position: 'absolute', right: 26, bottom: 120, width: 300, height: 169, border: `1px solid ${LIME}`, boxShadow: '0 0 24px rgba(215,255,63,0.25)', overflow: 'hidden' }}>
          <Img src={staticFile(inset)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(5,8,12,0.8)', fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: LIME, padding: '3px 6px' }}>CAPTURE // THIS WEEK</div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ---- presenter mode: 'puppet' = sandbox-native photo-puppet rig (default, ships everywhere)
   'photoreal' = FaceFusion lip-synced plate produced by ambassador/tools/vega-talk-local.sh ---- */
export const PRESENTER_MODE: 'puppet' | 'photoreal' = 'puppet';

const PhotorealPresenter: React.FC<{ from: number; dur: number }> = ({ from, dur }) => {
  const f = useCurrentFrame();
  const g = f - from;
  if (g < 0 || g >= dur) return null;
  const env = openAt(f + from);
  const inOp = interpolate(g, [0, 7], [0, 1], { extrapolateRight: 'clamp' });
  const outOp = interpolate(g, [dur - 7, dur - 1], [1, 0], { extrapolateLeft: 'clamp' });
  return (
    <AbsoluteFill style={{ opacity: inOp * outOp }}>
      <AbsoluteFill style={{ transform: `translateY(${4 * env}px) scale(${1 + 0.006 * Math.sin(g / 23)})` }}>
        <OffthreadVideo src={staticFile('talk/vega-talk-photoreal.mp4')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      <Scan o={0.04} />
    </AbsoluteFill>
  );
};

/* ---- the living presenter: photo-puppet rig driven by the VO envelope ---- */
const MOUTH_MASK = 'radial-gradient(ellipse 64px 44px at 50.97% 34.0%, #000 52%, transparent 100%)';
const EYE_MASK = 'radial-gradient(ellipse 92px 36px at 52.6% 24.45%, #000 55%, transparent 100%)';

const Presenter: React.FC<{ from: number; dur: number; shot: 'wide' | 'med' | 'close'; t0: number }> = ({ from, dur, shot, t0 }) => {
  const f = useCurrentFrame();
  const g = f - from;
  if (g < 0 || g >= dur) return null;
  const env = openAt(f + t0);
  const blink = blinkAt(f + t0) && env < 0.6 ? 1 : 0;
  const openOp = interpolate(env, [0.42, 0.58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const midOp = interpolate(env, [0.1, 0.26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * (1 - openOp);
  const S = shot === 'wide' ? 0.61 : shot === 'med' ? 0.8 : 1.18;
  const mouthX = shot === 'wide' ? 880 : shot === 'med' ? 850 : 660;
  const mouthY = shot === 'wide' ? 330 : shot === 'med' ? 350 : 430;
  const W = 1776 * S; const H = 2368 * S;
  const left = mouthX - 905 * S; const top = mouthY - 805 * S;
  const sway = 0.7 * Math.sin(g / 47);
  const breathe = 1 + 0.006 * Math.sin(g / 23);
  const nod = 5 * env;
  const inOp = interpolate(g, [0, 7], [0, 1], { extrapolateRight: 'clamp' });
  const outOp = interpolate(g, [dur - 7, dur - 1], [1, 0], { extrapolateLeft: 'clamp' });
  const layer = (src: string, extra: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute', left: 0, top: 0, width: W, height: H, objectFit: 'cover', ...extra,
  });
  return (
    <AbsoluteFill style={{ opacity: inOp * outOp }}>
      <div style={{ position: 'absolute', left, top, width: W, height: H, transform: `rotate(${sway}deg) translateY(${nod}px) scale(${breathe})`, transformOrigin: `${905 * S}px ${805 * S}px`, filter: 'saturate(1.06) contrast(1.05)' }}>
        <Img src={staticFile('rig/vega-base.jpg')} style={layer('rig/vega-base.jpg', {})} />
        <Img src={staticFile('rig/vega-mouth-mid.jpg')} style={layer('rig/vega-mouth-mid.jpg', { opacity: midOp, maskImage: MOUTH_MASK, WebkitMaskImage: MOUTH_MASK, left: 0 * S, top: -4 * S })} />
        <Img src={staticFile('rig/vega-mouth-open.jpg')} style={layer('rig/vega-mouth-open.jpg', { opacity: openOp, maskImage: MOUTH_MASK, WebkitMaskImage: MOUTH_MASK, left: -4 * S, top: -8 * S, transform: `scaleY(${1 + 0.16 * env})`, transformOrigin: `${905 * S}px ${805 * S}px` })} />
        <Img src={staticFile('rig/vega-blink.jpg')} style={layer('rig/vega-blink.jpg', { opacity: blink, maskImage: EYE_MASK, WebkitMaskImage: EYE_MASK })} />
        <Scan o={0.04} />
      </div>
      {/* comms frame around the presenter */}
      <div style={{ position: 'absolute', left: mouthX - 300, top: 40, width: 600, height: 660, border: '1px solid rgba(215,255,63,0.35)', pointerEvents: 'none' }}>
        {([[-1, -1], [1, -1], [-1, 1], [1, 1]] as const).map(([sx, sy], i) => (
          <div key={i} style={{ position: 'absolute', width: 18, height: 18, borderColor: LIME, borderStyle: 'solid', borderWidth: 0, borderTopWidth: sy < 0 ? 3 : 0, borderBottomWidth: sy > 0 ? 3 : 0, borderLeftWidth: sx < 0 ? 3 : 0, borderRightWidth: sx > 0 ? 3 : 0, left: sx < 0 ? -2 : undefined, right: sx > 0 ? -2 : undefined, top: sy < 0 ? -2 : undefined, bottom: sy > 0 ? -2 : undefined }} />
        ))}
        <div style={{ position: 'absolute', top: -24, left: 0, fontFamily: MONO, fontSize: 12, letterSpacing: 3, color: LIME }}>LIVE COMMS // HOLO-UPLINK</div>
      </div>
      {/* waveform driven by the same envelope */}
      <div style={{ position: 'absolute', left: mouthX - 300, top: 712, display: 'flex', gap: 4, alignItems: 'flex-end', height: 40 }}>
        {Array.from({ length: 32 }, (_, i) => {
          const v = openAt(f + t0 - (31 - i) * 2);
          return <div key={i} style={{ width: 8, height: 4 + v * 34, background: i === 31 ? LIME : 'rgba(215,255,63,0.45)' }} />;
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ---- left data column for the wide A-roll ---- */
const LEDGER: [string, string, boolean][] = [
  ['ANIMATION CLIPS // FORGE-VERIFIED', '259', false],
  ['WORLDS SHIPPING', '3', false],
  ['BUILD FAILURES', '0', false],
  ['UNVERIFIED SURFACES', '3', true],
];
const DataCol: React.FC<{ from: number; dur: number }> = ({ from, dur }) => {
  const f = useCurrentFrame();
  const g = f - from;
  if (g < 0 || g >= dur) return null;
  return (
    <div style={{ position: 'absolute', left: 60, top: 150, width: 430, opacity: interpolate(g, [0, 10], [0, 1], { extrapolateRight: 'clamp' }) }}>
      <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: 4, color: DIM, marginBottom: 14 }}>FIELD LEDGER // W44</div>
      {LEDGER.map(([k, v, amber], i) => {
        const on = g > 18 + i * 26;
        return (
          <div key={k} style={{ marginBottom: 20, opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-14px)', transition: 'none' }}>
            <div style={{ fontFamily: MONO, fontSize: 14, letterSpacing: 1.5, color: DIM }}>{k}</div>
            <div style={{ fontFamily: MONO, fontSize: 44, color: amber ? AMBER : LIME, letterSpacing: 2 }}>{v}</div>
          </div>
        );
      })}
      <div style={{ marginTop: 26, fontFamily: MONO, fontSize: 13, lineHeight: 1.7, color: INK, borderLeft: `2px solid ${LIME}`, paddingLeft: 12, opacity: g > 130 ? 1 : 0 }}>
        Every number here is reproducible.<br />Every gap is named out loud.
      </div>
    </div>
  );
};

const LowerThird: React.FC<{ from: number; dur: number }> = ({ from, dur }) => {
  const f = useCurrentFrame();
  const g = f - from;
  if (g < 0 || g >= dur) return null;
  const w = interpolate(g, [0, 12], [0, 100], { extrapolateRight: 'clamp', easing: bez });
  return (
    <div style={{ position: 'absolute', left: 60, bottom: 214, opacity: interpolate(g, [0, 6], [0, 1], { extrapolateRight: 'clamp' }) }}>
      <div style={{ width: `${w}%`, minWidth: w > 0 ? 420 : 0, background: 'rgba(5,8,12,0.85)', borderLeft: `4px solid ${LIME}`, padding: '10px 16px' }}>
        <div style={{ fontFamily: MONO, fontSize: 30, letterSpacing: 2, color: INK }}>VEGA ARUNIKA</div>
        <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: 3, color: LIME }}>AI AMBASSADOR // ZYVRO LABS</div>
      </div>
    </div>
  );
};

const TitleCard: React.FC = () => {
  const f = useCurrentFrame();
  if (f >= 54) return null;
  const op = interpolate(f, [4, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * interpolate(f, [44, 53], [1, 0], { extrapolateLeft: 'clamp' });
  return (
    <AbsoluteFill style={{ opacity: op, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 90 }}>
      <div style={{ fontFamily: MONO, fontSize: 15, letterSpacing: 6, color: LIME, marginBottom: 10 }}>ZYVRO LABS // FIELD REPORT</div>
      <div style={{ fontFamily: MONO, fontSize: 76, letterSpacing: 4, color: INK, lineHeight: 1 }}>WEEK 44</div>
      <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: 3, color: DIM, marginTop: 14 }}>CHECKED, NOT CLAIMED.</div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const g = f;
  if (g < 0) return null;
  const op = interpolate(g, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ opacity: op, background: 'rgba(5,8,12,0.88)', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontFamily: MONO, fontSize: 54, letterSpacing: 8, color: LIME }}>ZYVRO LABS</div>
      <div style={{ fontFamily: MONO, fontSize: 18, letterSpacing: 4, color: INK, marginTop: 12 }}>FIELD REPORT // W44 // EXOCOMPLICT</div>
      <div style={{ fontFamily: MONO, fontSize: 14, letterSpacing: 3, color: DIM, marginTop: 26 }}>AI AMBASSADOR // VEGA ARUNIKA — SYNTHETIC PRESENTER, DISCLOSED</div>
      <div style={{ fontFamily: MONO, fontSize: 14, letterSpacing: 3, color: DIM, marginTop: 6 }}>@zyvrolabs</div>
    </AbsoluteFill>
  );
};

export const VegaScenes: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: VOID }}>
      {/* SCENE 01 — cold open over the world plate */}
      <Sequence from={0} durationInFrames={58}>
        <Scene from={0} dur={58} plate="plates/exocomplict-world-frostline.jpg" move="push" label="SCENE 01 // COLD OPEN" />
        <TitleCard />
      </Sequence>
      {/* SCENE 02 — A-roll wide: presenter + ledger column */}
      <Sequence from={54} durationInFrames={175}>
        {PRESENTER_MODE === 'puppet'
          ? <Presenter from={0} dur={175} shot="wide" t0={54} />
          : <PhotorealPresenter from={54} dur={175} />}
        <DataCol from={0} dur={175} />
        <LowerThird from={12} dur={150} />
      </Sequence>
      {/* SCENE 03 — B-roll lane walk */}
      <Scene from={225} dur={180} plate="plates/exocomplict-live-hero-walk.jpg" move="panR" label="SCENE 03 // THE LANE" inset="plates/w-b-walk.jpg" />
      {/* SCENE 04 — A-roll medium */}
      <Sequence from={405} durationInFrames={169}>
        {PRESENTER_MODE === 'puppet'
          ? <Presenter from={0} dur={169} shot="med" t0={405} />
          : <PhotorealPresenter from={405} dur={169} />}
      </Sequence>
      {/* SCENE 05 — B-roll fire + confession */}
      <Scene from={570} dur={180} plate="plates/exocomplict-live-hero-aim.jpg" move="panL" label="SCENE 05 // THE CONFESSION" flash={[26, 64, 108]} inset="plates/w-a-idle.jpg" />
      {/* SCENE 06 — B-roll amber: unverified surfaces */}
      <Scene from={750} dur={195} plate="plates/exocomplict-live-defense-prep.jpg" move="hold" label="SCENE 06 // UNVERIFIED" grade="amber" />
      {/* SCENE 07 — B-roll arena arc, grade returns */}
      <Scene from={945} dur={105} plate="plates/exocomplict-live-arena-neon-frontier.jpg" move="arc" label="SCENE 07 // SAME WEIGHT" />
      {/* SCENE 08 — A-roll close sign-off */}
      <Sequence from={1050} durationInFrames={115}>
        {PRESENTER_MODE === 'puppet'
          ? <Presenter from={0} dur={115} shot="close" t0={1050} />
          : <PhotorealPresenter from={1050} dur={115} />}
      </Sequence>
      <Sequence from={1160} durationInFrames={85}>
        <Scene from={0} dur={85} plate="plates/exocomplict-world-emberfall.jpg" move="push" label="SCENE 09 // END CARD" />
        <EndCard />
      </Sequence>
      <Captions />
      <Chip />
      <Timecode />
      <Audio src={staticFile('audio/vo-ledger-w44.mp3')} />
    </AbsoluteFill>
  );
};
