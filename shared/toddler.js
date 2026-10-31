/* Shared kit for Amna's games: sounds, key-mash safety, home button, fullscreen. */
(function () {
  'use strict';

  // ---------- Audio (Web Audio, synthesized; no files needed) ----------
  let ctx = null;
  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone({ type = 'sine', from = 440, to = from, dur = 0.2, vol = 0.3, filter = null, delay = 0 }) {
    const c = audio(); if (!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t0);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, to), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = osc;
    if (filter) {
      const f = c.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = filter;
      f.Q.value = 2;
      osc.connect(f); node = f;
    }
    node.connect(gain).connect(c.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  }

  const S = {
    pop() { tone({ type: 'sine', from: 900, to: 300, dur: 0.12, vol: 0.35 }); },
    bloop() { tone({ type: 'sine', from: 250, to: 650, dur: 0.18, vol: 0.3 }); },
    splash() {
      const c = audio(); if (!c) return;
      const len = 0.35, buf = c.createBuffer(1, c.sampleRate * len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
      const src = c.createBufferSource(); src.buffer = buf;
      const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800; f.Q.value = 0.7;
      const g = c.createGain(); g.gain.value = 0.35;
      src.connect(f).connect(g).connect(c.destination); src.start();
    },
    // pitch: 0..1 picks a meow from low (big cat) to high (kitten)
    meow(pitch = 0.5) {
      const base = 300 + pitch * 500;
      tone({ type: 'sawtooth', from: base, to: base * 1.6, dur: 0.18, vol: 0.18, filter: 1400 });
      tone({ type: 'sawtooth', from: base * 1.6, to: base * 0.85, dur: 0.32, vol: 0.18, filter: 1200, delay: 0.17 });
      tone({ type: 'triangle', from: base * 2, to: base * 1.1, dur: 0.45, vol: 0.06, delay: 0.05 });
    },
    purr() {
      for (let i = 0; i < 12; i++) tone({ type: 'triangle', from: 60, to: 55, dur: 0.06, vol: 0.12, delay: i * 0.07 });
    },
    chime() {
      [523, 659, 784, 1047].forEach((f, i) => tone({ type: 'sine', from: f, dur: 0.5, vol: 0.18, delay: i * 0.09 }));
    },
    note(freq) { tone({ type: 'triangle', from: freq, dur: 0.5, vol: 0.25 }); },

    // ----- Silly sound effects -----
    boing() {
      const c = audio(); if (!c) return;
      const t0 = c.currentTime;
      const osc = c.createOscillator(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t0);
      osc.frequency.exponentialRampToValueAtTime(520, t0 + 0.08);
      osc.frequency.exponentialRampToValueAtTime(180, t0 + 0.5);
      lfo.frequency.setValueAtTime(18, t0); lfo.frequency.linearRampToValueAtTime(6, t0 + 0.5);
      lg.gain.value = 40; lfo.connect(lg).connect(osc.frequency);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.35, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.55);
      osc.connect(g).connect(c.destination); osc.start(t0); lfo.start(t0); osc.stop(t0 + 0.6); lfo.stop(t0 + 0.6);
    },
    honk() {
      tone({ type: 'square', from: 220, to: 200, dur: 0.28, vol: 0.14, filter: 900 });
      tone({ type: 'sawtooth', from: 330, to: 300, dur: 0.28, vol: 0.1, filter: 1200 });
      tone({ type: 'square', from: 190, to: 230, dur: 0.22, vol: 0.14, filter: 900, delay: 0.3 });
      tone({ type: 'sawtooth', from: 285, to: 345, dur: 0.22, vol: 0.1, filter: 1200, delay: 0.3 });
    },
    giggle() {
      const base = 500 + Math.random() * 300;
      for (let i = 0; i < 6; i++)
        tone({ type: 'triangle', from: base * (1 + i * 0.06), to: base * (1 + i * 0.06) * 1.3, dur: 0.09, vol: 0.2, delay: i * 0.11 });
    },
    // Nonsense gibberish: random vowel-ish blips with sliding pitch, like a tiny creature chattering.
    babble() {
      let t = 0;
      const n = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < n; i++) {
        const f = 260 + Math.random() * 360, len = 0.08 + Math.random() * 0.12;
        tone({ type: 'sawtooth', from: f, to: f * (0.8 + Math.random() * 0.6), dur: len, vol: 0.16, filter: 700 + Math.random() * 1200, delay: t });
        t += len + 0.03;
      }
    },
    toot() {
      const c = audio(); if (!c) return;
      const t0 = c.currentTime;
      const osc = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(95, t0); osc.frequency.exponentialRampToValueAtTime(60, t0 + 0.35);
      f.type = 'lowpass'; f.frequency.value = 350; f.Q.value = 6;
      const lfo = c.createOscillator(), lg = c.createGain();
      lfo.frequency.value = 28; lg.gain.value = 25; lfo.connect(lg).connect(osc.frequency);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.4);
      osc.connect(f).connect(g).connect(c.destination); osc.start(t0); lfo.start(t0); osc.stop(t0 + 0.45); lfo.stop(t0 + 0.45);
    },
    whee() { tone({ type: 'sine', from: 300, to: 1400, dur: 0.6, vol: 0.25 }); tone({ type: 'sine', from: 1400, to: 900, dur: 0.25, vol: 0.2, delay: 0.6 }); },
    drum() {
      tone({ type: 'sine', from: 160, to: 45, dur: 0.25, vol: 0.6 });
      S.splash();
    },
    moo(big = true) {
      const c = audio(); if (!c) return;
      const t0 = c.currentTime, base = big ? 110 : 170;
      const osc = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(base * 1.25, t0);
      osc.frequency.exponentialRampToValueAtTime(base, t0 + 0.25);
      osc.frequency.exponentialRampToValueAtTime(base * 0.8, t0 + 0.9);
      f.type = 'lowpass'; f.frequency.setValueAtTime(900, t0); f.frequency.exponentialRampToValueAtTime(400, t0 + 0.9); f.Q.value = 4;
      const lfo = c.createOscillator(), lg = c.createGain();
      lfo.frequency.value = 7; lg.gain.value = 6; lfo.connect(lg).connect(osc.frequency);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.4, t0 + 0.08);
      g.gain.setValueAtTime(0.4, t0 + 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.0);
      osc.connect(f).connect(g).connect(c.destination); osc.start(t0); lfo.start(t0); osc.stop(t0 + 1.05); lfo.stop(t0 + 1.05);
    },
    // "ooh ooh aah aah"
    monkey() {
      for (let i = 0; i < 2; i++) tone({ type: 'sawtooth', from: 380, to: 520, dur: 0.16, vol: 0.18, filter: 1100, delay: i * 0.22 });
      for (let i = 0; i < 2; i++) tone({ type: 'sawtooth', from: 650, to: 480, dur: 0.2, vol: 0.18, filter: 1600, delay: 0.5 + i * 0.26 });
    },
    nom() {
      for (let i = 0; i < 3; i++) {
        tone({ type: 'square', from: 180, to: 120, dur: 0.07, vol: 0.12, filter: 600, delay: i * 0.16 });
        tone({ type: 'sine', from: 90, to: 70, dur: 0.08, vol: 0.25, delay: i * 0.16 });
      }
    },
    bell() { tone({ type: 'sine', from: 1760, dur: 0.6, vol: 0.12 }); tone({ type: 'sine', from: 2640, dur: 0.4, vol: 0.06 }); tone({ type: 'triangle', from: 880, dur: 0.5, vol: 0.1 }); },
    sneeze() {
      tone({ type: 'sawtooth', from: 400, to: 700, dur: 0.25, vol: 0.12, filter: 1500 });
      setTimeout(() => { S.splash(); tone({ type: 'sawtooth', from: 500, to: 150, dur: 0.3, vol: 0.2, filter: 1200 }); }, 280);
    },
    roar(big = true) {
      const c = audio(); if (!c) return;
      const t0 = c.currentTime, base = big ? 70 : 140;
      const osc = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(base, t0);
      osc.frequency.exponentialRampToValueAtTime(base * 2.2, t0 + 0.25);
      osc.frequency.exponentialRampToValueAtTime(base * 0.9, t0 + 1.0);
      f.type = 'lowpass'; f.frequency.setValueAtTime(600, t0); f.frequency.exponentialRampToValueAtTime(1800, t0 + 0.3); f.frequency.exponentialRampToValueAtTime(300, t0 + 1.0); f.Q.value = 5;
      const lfo = c.createOscillator(), lg = c.createGain();
      lfo.frequency.value = 22; lg.gain.value = base * 0.35; lfo.connect(lg).connect(osc.frequency);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.45, t0 + 0.1);
      g.gain.setValueAtTime(0.45, t0 + 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.1);
      osc.connect(f).connect(g).connect(c.destination); osc.start(t0); lfo.start(t0); osc.stop(t0 + 1.15); lfo.stop(t0 + 1.15);
      // low thump underneath
      tone({ type: 'sine', from: 90, to: 35, dur: 0.5, vol: 0.5 });
    },
    stomp() { tone({ type: 'sine', from: 120, to: 30, dur: 0.3, vol: 0.7 }); S.splash(); },
    chirp() { for (let i = 0; i < 3; i++) tone({ type: 'sine', from: 1200, to: 1900, dur: 0.08, vol: 0.2, delay: i * 0.12 }); },
    crack() { for (let i = 0; i < 3; i++) tone({ type: 'square', from: 2500 - i * 500, to: 800, dur: 0.04, vol: 0.12, delay: i * 0.09 }); },
    rumble() {
      const c = audio(); if (!c) return;
      const len = 1.4, buf = c.createBuffer(1, c.sampleRate * len, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / d.length);
      const src = c.createBufferSource(); src.buffer = buf;
      const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 140;
      const g = c.createGain(); g.gain.value = 1.2;
      src.connect(f).connect(g).connect(c.destination); src.start();
    },
    whirr() { for (let i = 0; i < 8; i++) tone({ type: 'triangle', from: 300 + i * 60, to: 340 + i * 60, dur: 0.1, vol: 0.14, delay: i * 0.1 }); },
    swish() {
      const c = audio(); if (!c) return;
      for (let k = 0; k < 2; k++) {
        const t0 = c.currentTime + k * 0.4, len = 0.35, buf = c.createBuffer(1, c.sampleRate * len, c.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / d.length);
        const src = c.createBufferSource(); src.buffer = buf;
        const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2;
        f.frequency.setValueAtTime(k ? 3000 : 1200, t0); f.frequency.exponentialRampToValueAtTime(k ? 1200 : 3000, t0 + len);
        const g = c.createGain(); g.gain.value = 0.3;
        src.connect(f).connect(g).connect(c.destination); src.start(t0);
      }
    },
    beep() { tone({ type: 'square', from: 880, dur: 0.12, vol: 0.12, filter: 2000 }); tone({ type: 'square', from: 880, dur: 0.12, vol: 0.12, filter: 2000, delay: 0.18 }); },
  };

  // ---------- Key-mash safety ----------
  // A toddler on the keyboard should trigger play, never scroll, zoom, find, print, etc.
  function guardKeys(onKey) {
    document.addEventListener('keydown', (e) => {
      // Let the parent quit fullscreen with Escape; block everything else.
      if (e.key !== 'Escape') e.preventDefault();
      if (e.repeat) return;
      if (onKey) onKey(e);
    }, { capture: true });
    document.addEventListener('keyup', (e) => { if (e.key !== 'Escape') e.preventDefault(); }, { capture: true });
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dblclick', (e) => e.preventDefault());
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('wheel', (e) => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
    document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
    window.addEventListener('beforeunload', () => {});
  }

  // Unified "press" handling: pointerdown anywhere (mouse, trackpad, finger), multi-touch friendly.
  function onPress(el, fn) {
    el.addEventListener('pointerdown', (e) => { audio(); fn(e.clientX, e.clientY, e); }, { passive: true });
  }

  // ---------- Parent controls ----------
  // Home button needs a 1.2s press-and-hold so a toddler tap does not leave the game.
  function addParentBar({ home = '../index.html' } = {}) {
    const bar = document.createElement('div');
    bar.className = 'parent-bar';
    bar.innerHTML = `
      <button class="pbtn home" aria-label="Hold to go home" title="Hold to go home">🏠<span class="ring"></span></button>
      <button class="pbtn fs" aria-label="Fullscreen" title="Fullscreen">⛶</button>`;
    document.body.appendChild(bar);

    const homeBtn = bar.querySelector('.home');
    let timer = null;
    const start = (e) => { e.stopPropagation(); homeBtn.classList.add('holding'); timer = setTimeout(() => { location.href = home; }, 1200); };
    const cancel = () => { homeBtn.classList.remove('holding'); clearTimeout(timer); };
    homeBtn.addEventListener('pointerdown', start);
    homeBtn.addEventListener('pointerup', cancel);
    homeBtn.addEventListener('pointerleave', cancel);
    homeBtn.addEventListener('pointercancel', cancel);

    bar.querySelector('.fs').addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    });
  }

  // ---------- Helpers ----------
  // Scene unit in px: matches the CSS --u (1vmin capped at 0.62vw).
  const u = () => innerHeight > innerWidth ? innerWidth * 0.008 : Math.min(Math.min(innerWidth, innerHeight) / 100, innerWidth * 0.0062);
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Burst of emoji/particles at a point.
  function burst(x, y, items, count = 10, spread = 160) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = pick(items);
      const ang = rand(0, Math.PI * 2), dist = rand(spread * 0.4, spread);
      p.style.left = x + 'px'; p.style.top = y + 'px';
      p.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
      p.style.setProperty('--rot', rand(-180, 180) + 'deg');
      p.style.fontSize = rand(22, 44) + 'px';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  }

  window.Toddler = { audio, S, guardKeys, onPress, addParentBar, rand, pick, burst, u };
})();
