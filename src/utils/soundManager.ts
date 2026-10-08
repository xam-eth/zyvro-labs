/**
 * ZYVRO LABS // WEB AUDIO SYNTHESIS ENGINE
 * High-performance, zero-latency procedural UI sound synthesis.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private initialized: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (this.initialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
    } catch (e) {
      console.warn('AudioContext not supported or blocked:', e);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.25, this.ctx.currentTime, 0.05);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * Subtle high-tech hover blip
   */
  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // ignore
    }
  }

  /**
   * Crisp mechanical click / selection confirm
   */
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      
      // Tone 1: High crisp snap
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.06);

      // Tone 2: Sub click body
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(180, now);
      sub.frequency.exponentialRampToValueAtTime(50, now + 0.05);

      subGain.gain.setValueAtTime(0.12, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      sub.connect(subGain);
      subGain.connect(this.masterGain);
      sub.start(now);
      sub.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  /**
   * System Online / Access Granted Chord
   */
  public playAccessGranted() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const frequencies = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 (Acid tech harmony)

      frequencies.forEach((freq, index) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.04);

        gain.gain.setValueAtTime(0, now + index * 0.04);
        gain.gain.linearRampToValueAtTime(0.06, now + index * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.04 + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + index * 0.04);
        osc.stop(now + index * 0.04 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Full dramatic Boot Sequence Audio
   */
  public playBootSequence() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Sub Bass Charge
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(45, now);
      sub.frequency.exponentialRampToValueAtTime(110, now + 0.8);
      sub.frequency.exponentialRampToValueAtTime(55, now + 1.6);

      // Lowpass filter for deep rumble
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.linearRampToValueAtTime(320, now + 0.8);
      filter.frequency.linearRampToValueAtTime(80, now + 1.6);

      subGain.gain.setValueAtTime(0.01, now);
      subGain.gain.linearRampToValueAtTime(0.2, now + 0.5);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      sub.connect(filter);
      filter.connect(subGain);
      subGain.connect(this.masterGain);
      sub.start(now);
      sub.stop(now + 1.6);

      // 2. High Frequency Quantum Sweep
      const sweep = this.ctx.createOscillator();
      const sweepGain = this.ctx.createGain();
      sweep.type = 'sine';
      sweep.frequency.setValueAtTime(300, now + 0.2);
      sweep.frequency.exponentialRampToValueAtTime(2400, now + 0.9);

      sweepGain.gain.setValueAtTime(0.001, now + 0.2);
      sweepGain.gain.linearRampToValueAtTime(0.08, now + 0.5);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      sweep.connect(sweepGain);
      sweepGain.connect(this.masterGain);
      sweep.start(now + 0.2);
      sweep.stop(now + 0.95);

      // 3. Cyber Relays
      [0.9, 1.1, 1.3].forEach((timeOffset, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const relay = this.ctx.createOscillator();
        const rGain = this.ctx.createGain();
        relay.type = 'square';
        relay.frequency.setValueAtTime(880 * (idx + 1), now + timeOffset);

        rGain.gain.setValueAtTime(0.03, now + timeOffset);
        rGain.gain.exponentialRampToValueAtTime(0.0001, now + timeOffset + 0.08);

        relay.connect(rGain);
        rGain.connect(this.masterGain);
        relay.start(now + timeOffset);
        relay.stop(now + timeOffset + 0.08);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Terminal / Keystroke tick
   */
  public playKeyTick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 300, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // ignore
    }
  }

  /**
   * Radar / Scan sweep tone
   */
  public playScanTone() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(1600, now + 0.18);
      osc.frequency.linearRampToValueAtTime(400, now + 0.28);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // ignore
    }
  }

  /**
   * Glitch / Fault sound
   */
  public playFault() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(90, now + 0.05);
      osc.frequency.setValueAtTime(220, now + 0.1);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundManager();
