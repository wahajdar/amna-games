/* Original cartoon characters drawn in SVG: glossy, big-eyed, thick outlines. */
(function () {
  'use strict';
  let uid = 0;
  const id = (p) => p + (++uid);

  // Shared eye: white, pupil, two sparkles. Pupils carry class "pupil" so games can move them.
  function eye(cx, cy, r) {
    return `
      <g class="eye">
        <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 1.15}" fill="#fff" stroke="#222" stroke-width="4"/>
        <g class="pupil">
          <circle cx="${cx}" cy="${cy + r * .15}" r="${r * .55}" fill="#1b1b2f"/>
          <circle cx="${cx - r * .2}" cy="${cy - r * .15}" r="${r * .2}" fill="#fff"/>
          <circle cx="${cx + r * .15}" cy="${cy + r * .3}" r="${r * .09}" fill="#fff"/>
        </g>
      </g>`;
  }

  function cat(color = '#ff9f43', opts = {}) {
    const dark = opts.dark || shade(color, -25);
    const light = opts.light || shade(color, 30);
    const g = id('catg'), s = id('cats');
    return `
<svg class="char cat" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="${g}" cx="40%" cy="30%" r="80%">
      <stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${color}"/>
    </radialGradient>
    <radialGradient id="${s}" cx="50%" cy="20%" r="60%">
      <stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g class="body">
    <!-- tail -->
    <path class="tail" d="M175 165 C215 160 215 110 185 115 C165 118 170 140 180 140" fill="none" stroke="${dark}" stroke-width="16" stroke-linecap="round"/>
    <path d="M175 165 C215 160 215 110 185 115 C165 118 170 140 180 140" fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"/>
    <!-- ears -->
    <path d="M45 85 L35 25 L95 60 Z" fill="${color}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <path d="M175 85 L185 25 L125 60 Z" fill="${color}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <path d="M52 76 L47 42 L82 62 Z" fill="#ffb7c5"/>
    <path d="M168 76 L173 42 L138 62 Z" fill="#ffb7c5"/>
    <!-- head/body blob -->
    <ellipse cx="110" cy="125" rx="85" ry="78" fill="url(#${g})" stroke="#222" stroke-width="5"/>
    <ellipse cx="110" cy="160" rx="48" ry="34" fill="#fff4e0" opacity=".9"/>
    <ellipse cx="95" cy="75" rx="55" ry="26" fill="url(#${s})"/>
    <!-- stripes -->
    <path d="M60 60 q10 20 30 22 M150 58 q-8 22 -30 24" fill="none" stroke="${dark}" stroke-width="7" stroke-linecap="round"/>
    <!-- cheeks -->
    <circle cx="62" cy="135" r="12" fill="#ff8fa3" opacity=".7"/>
    <circle cx="158" cy="135" r="12" fill="#ff8fa3" opacity=".7"/>
    ${eye(82, 108, 17)}
    ${eye(138, 108, 17)}
    <!-- nose + mouth -->
    <path d="M100 136 L120 136 L110 148 Z" fill="#ff6b81" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
    <path class="mouth" d="M110 148 q-8 14 -20 8 M110 148 q8 14 20 8" fill="none" stroke="#222" stroke-width="4" stroke-linecap="round"/>
    <!-- whiskers -->
    <path d="M30 128 L72 136 M30 148 L72 142 M190 128 L148 136 M190 148 L148 142" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <!-- paws -->
    <ellipse cx="80" cy="198" rx="22" ry="12" fill="${light}" stroke="#222" stroke-width="4"/>
    <ellipse cx="140" cy="198" rx="22" ry="12" fill="${light}" stroke="#222" stroke-width="4"/>
  </g>
</svg>`;
  }

  function shark(color = '#5fa8ff', opts = {}) {
    const dark = opts.dark || shade(color, -25);
    const light = opts.light || shade(color, 35);
    const g = id('shg');
    return `
<svg class="char shark" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${light}"/><stop offset=".55" stop-color="${color}"/><stop offset="1" stop-color="${dark}"/>
    </linearGradient>
  </defs>
  <g class="body">
    <!-- tail -->
    <path d="M235 90 L290 40 L278 92 L290 140 Z" fill="${color}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <!-- dorsal fin -->
    <path d="M120 52 L150 5 L185 55 Z" fill="${color}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <!-- body -->
    <path d="M20 95 C40 40 110 30 160 38 C215 46 245 70 250 92 C245 115 215 135 160 142 C110 150 40 140 20 95 Z" fill="url(#${g})" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <!-- belly -->
    <path d="M40 108 C80 135 170 140 235 112 C200 128 90 128 40 108 Z" fill="#fff" opacity=".9"/>
    <!-- side fin -->
    <path class="fin" d="M135 112 L120 160 L175 128 Z" fill="${color}" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
    <!-- gills -->
    <path d="M185 72 q6 14 0 28 M198 70 q6 16 0 32" fill="none" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>
    <!-- mouth -->
    <path class="mouth" d="M28 100 Q60 125 105 118" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <path d="M44 108 l5 8 l6 -8 l6 9 l6 -8 l6 8 l6 -7" fill="#fff" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- cheek -->
    <circle cx="70" cy="92" r="9" fill="#ff8fa3" opacity=".6"/>
    ${eye(95, 78, 15)}
  </g>
</svg>`;
  }

  function fish(color = '#ffd43b') {
    const dark = shade(color, -25), light = shade(color, 35);
    const g = id('fg');
    return `
<svg class="char fish" viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${color}"/></linearGradient></defs>
  <g class="body">
    <path d="M118 55 L155 20 L150 55 L155 90 Z" fill="${color}" stroke="#222" stroke-width="4" stroke-linejoin="round"/>
    <path d="M70 25 L85 5 L100 28 Z" fill="${dark}" stroke="#222" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="70" cy="55" rx="58" ry="38" fill="url(#${g})" stroke="#222" stroke-width="4"/>
    <path d="M60 50 q12 10 0 22 M80 44 q14 12 0 30" fill="none" stroke="${dark}" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    <path class="mouth" d="M16 60 q8 6 16 2" fill="none" stroke="#222" stroke-width="4" stroke-linecap="round"/>
    <circle cx="35" cy="66" r="6" fill="#ff8fa3" opacity=".6"/>
    ${eye(40, 46, 10)}
  </g>
</svg>`;
  }

  // Silly Bean: a chubby jellybean critter with antennae, stubby arms and feet. Original design.
  function bean(color = '#ff8787', mood = 'happy') {
    const dark = shade(color, -25), light = shade(color, 40);
    const g = id('bg'), s = id('bs');
    const mouths = {
      happy: `<path class="mouth" d="M68 142 Q100 178 132 142 Z" fill="#5a1f3a" stroke="#222" stroke-width="4" stroke-linejoin="round"/>
              <path d="M78 146 Q100 150 122 146 L118 142 L82 142 Z" fill="#fff"/>
              <path d="M84 166 Q100 174 116 166" fill="#ff6b81"/>`,
      wow: `<ellipse class="mouth" cx="100" cy="150" rx="12" ry="16" fill="#5a1f3a" stroke="#222" stroke-width="4"/>`,
      silly: `<path class="mouth" d="M70 140 Q100 150 130 136" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>
              <path d="M110 140 q10 2 10 14 q-10 2 -14 -8 Z" fill="#ff6b81" stroke="#222" stroke-width="3" stroke-linejoin="round"/>`,
    };
    return `
<svg class="char bean" viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="${g}" cx="38%" cy="28%" r="80%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${color}"/></radialGradient>
    <radialGradient id="${s}" cx="50%" cy="20%" r="60%"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  </defs>
  <g class="body">
    <!-- antennae -->
    <path class="antenna" d="M80 40 Q70 10 50 14" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <path class="antenna" d="M120 40 Q130 10 150 14" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <circle cx="48" cy="14" r="9" fill="${light}" stroke="#222" stroke-width="4"/>
    <circle cx="152" cy="14" r="9" fill="${light}" stroke="#222" stroke-width="4"/>
    <!-- feet -->
    <ellipse cx="72" cy="214" rx="24" ry="11" fill="${dark}" stroke="#222" stroke-width="4"/>
    <ellipse cx="128" cy="214" rx="24" ry="11" fill="${dark}" stroke="#222" stroke-width="4"/>
    <!-- arms -->
    <path class="arm armL" d="M30 130 Q0 150 18 172" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/>
    <path class="arm armL" d="M30 130 Q0 150 18 172" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round" stroke-dasharray="0 1" opacity="0"/>
    <circle cx="18" cy="172" r="11" fill="${light}" stroke="#222" stroke-width="4"/>
    <path class="arm armR" d="M170 130 Q200 150 182 172" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/>
    <circle cx="182" cy="172" r="11" fill="${light}" stroke="#222" stroke-width="4"/>
    <!-- body -->
    <path d="M100 36 C150 36 170 90 168 140 C166 190 140 212 100 212 C60 212 34 190 32 140 C30 90 50 36 100 36 Z" fill="url(#${g})" stroke="#222" stroke-width="5"/>
    <ellipse cx="100" cy="170" rx="42" ry="28" fill="#fff" opacity=".35"/>
    <ellipse cx="88" cy="70" rx="40" ry="22" fill="url(#${s})"/>
    <!-- freckles + cheeks -->
    <circle cx="58" cy="128" r="11" fill="#ff8fa3" opacity=".65"/><circle cx="142" cy="128" r="11" fill="#ff8fa3" opacity=".65"/>
    <circle cx="52" cy="114" r="2.5" fill="${dark}"/><circle cx="62" cy="110" r="2.5" fill="${dark}"/><circle cx="146" cy="112" r="2.5" fill="${dark}"/><circle cx="138" cy="108" r="2.5" fill="${dark}"/>
    ${eye(78, 100, 19)}
    ${eye(124, 100, 19)}
    ${mouths[mood] || mouths.happy}
  </g>
</svg>`;
  }

  // Cow: side view facing left, white with patches. patch = patch color.
  function cow(patch = '#333', opts = {}) {
    const g = id('cwg');
    const bell = opts.bell !== false;
    return `
<svg class="char cow" viewBox="0 0 320 230" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="${g}" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e9e4dc"/></radialGradient></defs>
  <g class="body">
    <!-- tail -->
    <path class="tail" d="M282 110 Q312 130 296 170" fill="none" stroke="#222" stroke-width="7" stroke-linecap="round"/>
    <circle cx="297" cy="172" r="9" fill="${patch}" stroke="#222" stroke-width="3"/>
    <!-- legs -->
    <g class="legs">
      <rect x="110" y="165" width="26" height="50" rx="8" fill="#fff" stroke="#222" stroke-width="5"/>
      <rect x="150" y="165" width="26" height="50" rx="8" fill="#fff" stroke="#222" stroke-width="5"/>
      <rect x="215" y="165" width="26" height="50" rx="8" fill="#fff" stroke="#222" stroke-width="5"/>
      <rect x="255" y="165" width="26" height="50" rx="8" fill="#fff" stroke="#222" stroke-width="5"/>
      <rect x="108" y="200" width="30" height="18" rx="6" fill="#444"/><rect x="148" y="200" width="30" height="18" rx="6" fill="#444"/>
      <rect x="213" y="200" width="30" height="18" rx="6" fill="#444"/><rect x="253" y="200" width="30" height="18" rx="6" fill="#444"/>
    </g>
    <!-- udder -->
    <ellipse cx="200" cy="178" rx="30" ry="18" fill="#ffb3c6" stroke="#222" stroke-width="4"/>
    <!-- body -->
    <rect x="95" y="70" width="195" height="115" rx="55" fill="url(#${g})" stroke="#222" stroke-width="5"/>
    <path d="M150 85 q30 -15 45 10 q-5 30 -35 25 q-25 -5 -10 -35 Z" fill="${patch}"/>
    <path d="M225 120 q35 -10 45 20 q-10 30 -40 20 q-20 -15 -5 -40 Z" fill="${patch}"/>
    <!-- head -->
    <path d="M60 38 L48 12 L78 28 Z" fill="#f4d6a8" stroke="#222" stroke-width="4" stroke-linejoin="round"/>
    <path d="M118 38 L130 12 L100 28 Z" fill="#f4d6a8" stroke="#222" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="42" cy="62" rx="20" ry="11" fill="#e9e4dc" stroke="#222" stroke-width="4"/>
    <ellipse cx="136" cy="62" rx="20" ry="11" fill="#e9e4dc" stroke="#222" stroke-width="4"/>
    <rect x="42" y="30" width="95" height="105" rx="40" fill="url(#${g})" stroke="#222" stroke-width="5"/>
    <path d="M60 40 q25 -5 30 20 q-15 15 -32 0 Z" fill="${patch}"/>
    <!-- muzzle -->
    <ellipse cx="90" cy="112" rx="38" ry="24" fill="#ffb3c6" stroke="#222" stroke-width="4"/>
    <ellipse cx="76" cy="110" rx="6" ry="8" fill="#c0607f"/><ellipse cx="104" cy="110" rx="6" ry="8" fill="#c0607f"/>
    <path class="mouth" d="M78 126 q12 8 24 0" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    ${eye(70, 72, 13)}
    ${eye(110, 72, 13)}
    ${bell ? `<path d="M80 134 q10 10 20 0" fill="none" stroke="#c0392b" stroke-width="6"/><circle cx="90" cy="146" r="9" fill="#ffd43b" stroke="#222" stroke-width="3"/>` : ''}
  </g>
</svg>`;
  }

  // Monkey: front view, brown with tan face, long tail. mood: happy | eat | wow
  function monkey(color = '#a0693b', mood = 'happy') {
    const dark = shade(color, -25), light = shade(color, 25), face = '#f6d7a8';
    const g = id('mkg');
    const mouths = {
      happy: `<path class="mouth" d="M85 150 Q110 172 135 150" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>`,
      eat: `<ellipse class="mouth" cx="110" cy="156" rx="18" ry="14" fill="#5a1f3a" stroke="#222" stroke-width="4"/><path d="M96 150 h28" stroke="#fff" stroke-width="5"/>`,
      wow: `<ellipse class="mouth" cx="110" cy="158" rx="10" ry="13" fill="#5a1f3a" stroke="#222" stroke-width="4"/>`,
    };
    return `
<svg class="char monkey" viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="${g}" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${color}"/></radialGradient></defs>
  <g class="body">
    <path class="tail" d="M150 225 C215 230 215 150 180 165 C160 175 175 195 190 190" fill="none" stroke="${dark}" stroke-width="12" stroke-linecap="round"/>
    <!-- body -->
    <ellipse cx="110" cy="205" rx="58" ry="46" fill="url(#${g})" stroke="#222" stroke-width="5"/>
    <ellipse cx="110" cy="212" rx="34" ry="30" fill="${face}"/>
    <!-- arms -->
    <path class="arm armL" d="M58 190 Q25 210 30 240" fill="none" stroke="${color}" stroke-width="18" stroke-linecap="round"/>
    <path class="arm armR" d="M162 190 Q195 210 190 240" fill="none" stroke="${color}" stroke-width="18" stroke-linecap="round"/>
    <circle cx="30" cy="242" r="12" fill="${face}" stroke="#222" stroke-width="4"/>
    <circle cx="190" cy="242" r="12" fill="${face}" stroke="#222" stroke-width="4"/>
    <!-- ears -->
    <circle cx="28" cy="100" r="26" fill="${color}" stroke="#222" stroke-width="5"/><circle cx="28" cy="100" r="14" fill="${face}"/>
    <circle cx="192" cy="100" r="26" fill="${color}" stroke="#222" stroke-width="5"/><circle cx="192" cy="100" r="14" fill="${face}"/>
    <!-- head -->
    <circle cx="110" cy="100" r="72" fill="url(#${g})" stroke="#222" stroke-width="5"/>
    <path d="M60 110 C55 70 85 60 110 75 C135 60 165 70 160 110 C165 150 140 165 110 165 C80 165 55 150 60 110 Z" fill="${face}"/>
    <path d="M90 40 q20 -22 40 0" fill="none" stroke="${dark}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="80" cy="130" r="10" fill="#ff8fa3" opacity=".6"/><circle cx="140" cy="130" r="10" fill="#ff8fa3" opacity=".6"/>
    <ellipse cx="102" cy="132" rx="5" ry="4" fill="#5a3a1a"/><ellipse cx="118" cy="132" rx="5" ry="4" fill="#5a3a1a"/>
    ${eye(84, 102, 16)}
    ${eye(136, 102, 16)}
    ${mouths[mood] || mouths.happy}
  </g>
</svg>`;
  }

  function banana() {
    const g = id('bng');
    return `
<svg class="char banana" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3a0"/><stop offset="1" stop-color="#f5c518"/></linearGradient></defs>
  <path d="M22 18 C10 60 40 105 95 100 C105 99 108 90 100 86 C60 84 38 55 36 20 C35 12 24 10 22 18 Z" fill="url(#${g})" stroke="#222" stroke-width="5" stroke-linejoin="round"/>
  <path d="M30 30 C32 60 55 85 90 92" fill="none" stroke="#e0a800" stroke-width="4" stroke-linecap="round"/>
  <path d="M20 14 l10 -2 l4 10" fill="#8b5a2b" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="101" cy="92" r="5" fill="#8b5a2b"/>
</svg>`;
  }

  // Simple hex shade helper
  function shade(hex, pct) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const f = (c) => Math.max(0, Math.min(255, Math.round(pct > 0 ? c + (255 - c) * pct / 100 : c + c * pct / 100)));
    return '#' + [f(r), f(g), f(b)].map(c => c.toString(16).padStart(2, '0')).join('');
  }

  // Make every pupil on the page glance toward a point (cheap "looking at you" effect).
  function lookAt(x, y, maxShift = 5) {
    document.querySelectorAll('.char .eye').forEach(e => {
      const r = e.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300) * maxShift;
      e.querySelector('.pupil').setAttribute('transform', `translate(${dx / d * k}, ${dy / d * k})`);
    });
  }

  // Random blinking for all eyes.
  function startBlinking() {
    setInterval(() => {
      const eyes = document.querySelectorAll('.char');
      if (!eyes.length) return;
      const c = eyes[Math.floor(Math.random() * eyes.length)];
      c.classList.add('blink');
      setTimeout(() => c.classList.remove('blink'), 160);
    }, 1400);
  }

  window.Chars = { cat, shark, fish, bean, cow, monkey, banana, shade, lookAt, startBlinking };
})();
