import { ActivityType } from '../types/game';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: number | null = null;
  private musicEnabled = true;
  private voEnabled = true;
  private step = 0;
  private speakingListeners = new Set<(speaking: boolean) => void>();
  private speakFallbackTimer: number | null = null;

  private ensureContext(): AudioContext | null {
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

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startBackgroundMusic();
    } else {
      this.stopBackgroundMusic();
    }
  }

  public setVoEnabled(enabled: boolean) {
    this.voEnabled = enabled;
    if (!enabled) {
      this.stopSpeaking();
    }
  }

  public onSpeakingChange(cb: (speaking: boolean) => void): () => void {
    this.speakingListeners.add(cb);
    return () => {
      this.speakingListeners.delete(cb);
    };
  }

  private notifySpeaking(state: boolean) {
    this.speakingListeners.forEach((cb) => cb(state));
  }

  public stopSpeaking() {
    if (this.speakFallbackTimer) {
      window.clearTimeout(this.speakFallbackTimer);
      this.speakFallbackTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.notifySpeaking(false);
  }

  public speak(text: string, tone: 'kid' | 'teacher' | 'cheer' = 'teacher') {
    this.stopSpeaking();
    if (!this.voEnabled || typeof window === 'undefined') return;

    const estimatedMs = Math.min(9500, Math.max(2000, text.length * 62));

    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
        if (idVoice) {
          utterance.voice = idVoice;
        }
        utterance.rate = tone === 'cheer' ? 1.06 : 0.96;
        utterance.pitch = tone === 'kid' ? 1.25 : tone === 'cheer' ? 1.3 : 1.1;

        utterance.onstart = () => this.notifySpeaking(true);
        utterance.onend = () => {
          if (this.speakFallbackTimer) {
            window.clearTimeout(this.speakFallbackTimer);
            this.speakFallbackTimer = null;
          }
          this.notifySpeaking(false);
        };
        utterance.onerror = () => {
          this.notifySpeaking(false);
        };

        this.notifySpeaking(true);
        window.speechSynthesis.speak(utterance);

        // Safety timer in case sandboxed Chromium doesn't fire onend
        this.speakFallbackTimer = window.setTimeout(() => {
          this.notifySpeaking(false);
        }, estimatedMs);
        return;
      } catch {
        // fallback below
      }
    }

    // Visual lip-sync fallback when SpeechSynthesis is unavailable
    this.notifySpeaking(true);
    this.speakFallbackTimer = window.setTimeout(() => {
      this.notifySpeaking(false);
    }, estimatedMs);
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.08,
    delay = 0
  ) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  }

  public startBackgroundMusic() {
    if (!this.musicEnabled || this.musicInterval !== null || typeof window === 'undefined') return;
    this.ensureContext();

    // Cheerful marimba & ukulele chord arpeggio (C - G - Am - F in upbeat 120bpm feel)
    const melody = [
      523.25, 659.25, 783.99, 659.25,
      587.33, 698.46, 783.99, 587.33,
      440.0, 523.25, 659.25, 523.25,
      349.23, 440.0, 523.25, 659.25,
    ];
    const bass = [
      261.63, 0, 261.63, 0,
      196.0, 0, 196.0, 0,
      220.0, 0, 220.0, 0,
      174.61, 0, 196.0, 0,
    ];

    this.musicInterval = window.setInterval(() => {
      if (!this.musicEnabled) return;
      const idx = this.step % melody.length;
      // Marimba pluck
      this.playTone(melody[idx], 0.22, 'sine', 0.028);
      // Warm ukulele pluck on beats
      if (bass[idx] > 0) {
        this.playTone(bass[idx], 0.28, 'triangle', 0.022);
      }
      this.step++;
    }, 340);
  }

  public stopBackgroundMusic() {
    if (this.musicInterval !== null) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public playHoverPop() {
    this.playTone(620, 0.07, 'sine', 0.04);
  }

  public playWoodTap() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.07);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  public playPageFlip() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.14;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.25;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.14, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  }

  public playSchoolBell() {
    // Classic "ting-tong" school chime
    this.playTone(880, 0.45, 'sine', 0.1, 0);
    this.playTone(1318.5, 0.3, 'sine', 0.04, 0);
    this.playTone(698.46, 0.55, 'sine', 0.1, 0.26);
    this.playTone(1046.5, 0.35, 'sine', 0.04, 0.26);
  }

  public playVillageBirds() {
    // Playful bird chirps
    const ctx = this.ensureContext();
    if (!ctx) return;
    [0, 0.22, 0.48].forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + delay;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1650 + idx * 180, t);
      osc.frequency.exponentialRampToValueAtTime(2400 + idx * 120, t + 0.09);
      osc.frequency.exponentialRampToValueAtTime(1850, t + 0.15);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.17);
    });
  }

  public playActivitySfx(activity: ActivityType) {
    if (activity === 'sweep' || activity === 'gotong_royong') {
      // Broom "srek-srek" swish
      this.playPageFlip();
      window.setTimeout(() => this.playPageFlip(), 210);
    } else if (activity === 'gardener') {
      // Water sprinkle chimes
      [880, 1046, 1174, 1318].forEach((f, i) => this.playTone(f, 0.14, 'sine', 0.05, i * 0.07));
    } else if (activity === 'merchant') {
      // Market scale bell + upbeat chime
      this.playTone(987.77, 0.18, 'triangle', 0.09, 0);
      this.playTone(1318.51, 0.26, 'triangle', 0.08, 0.12);
    } else if (activity === 'farmer') {
      this.playVillageBirds();
      this.playWoodTap();
    } else if (activity === 'doctor') {
      // Gentle heartbeat lub-dub
      this.playTone(160, 0.1, 'sine', 0.12, 0);
      this.playTone(140, 0.12, 'sine', 0.11, 0.14);
    } else {
      this.playWoodTap();
      this.playTone(587.33, 0.16, 'sine', 0.06, 0.08);
    }
  }

  public playStarSuccess() {
    // Twinkling star arpeggio + soft applause shimmer
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((n, idx) => {
      this.playTone(n, 0.28, 'triangle', 0.09, idx * 0.075);
    });
  }

  public playGentleBoing() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.14);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.28);
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.32);
  }

  public playVictoryFanfare() {
    const melody = [
      { f: 523.25, d: 0.16, t: 0 },
      { f: 523.25, d: 0.16, t: 0.16 },
      { f: 523.25, d: 0.16, t: 0.32 },
      { f: 659.25, d: 0.32, t: 0.48 },
      { f: 587.33, d: 0.18, t: 0.82 },
      { f: 659.25, d: 0.2, t: 1.02 },
      { f: 783.99, d: 0.55, t: 1.24 },
      { f: 1046.5, d: 0.65, t: 1.48 },
    ];
    melody.forEach((m) => this.playTone(m.f, m.d, 'triangle', 0.1, m.t));
  }
}

export const audioEngine = new AudioEngine();
