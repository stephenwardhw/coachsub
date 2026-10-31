/**
 * Synthesizes athletic whistle and sound feedback using Web Audio API
 */
class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Classic referee whistle sound: two modulated frequency bursts (trill)
   */
  playWhistle() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Burst 1
      this.createWhistleBurst(ctx, now, 0.15, 2400, 2900);
      // Burst 2 (longer burst for official stoppage / sub execution)
      this.createWhistleBurst(ctx, now + 0.2, 0.35, 2500, 3000);
    } catch {
      // Audio might be blocked by browser autoplay policy
    }
  }

  private createWhistleBurst(
    ctx: AudioContext,
    startTime: number,
    duration: number,
    freqLow: number,
    freqHigh: number
  ) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    // Modulate pitch rapidly for whistle "trill"
    lfo.frequency.setValueAtTime(35, startTime);
    lfoGain.gain.setValueAtTime((freqHigh - freqLow) / 2, startTime);
    lfo.connect(osc.frequency);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime((freqHigh + freqLow) / 2, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.25, startTime + 0.03);
    gain.gain.setValueAtTime(0.25, startTime + duration - 0.05);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    lfo.start(startTime);
    osc.start(startTime);
    lfo.stop(startTime + duration);
    osc.stop(startTime + duration);
  }

  /**
   * Snappy click/drop sound for placing player or staging sub
   */
  playDrop() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore audio errors
    }
  }
}

export const sounds = new SoundEffects();
