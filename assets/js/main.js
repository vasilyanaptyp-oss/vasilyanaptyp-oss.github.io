/* Portfolio — Artur Vasilyan. Static, GSAP for the wall + reveals. Degrades to static without JS/GSAP. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = window.WORK || [], MORE = window.MORE || [], PAIRS = window.PAIRS || [], GREET = window.GREET || [];
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- header ---------- */
  var hdr = document.getElementById('hdr');
  var onScroll = function () { hdr.classList.toggle('is-scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- wall of sites (hero) ---------- */
  var track = document.getElementById('wallTrack');
  if (track) {
    var items = W.slice(0, 12);
    var html = '';
    // two identical rows so the vertical drift can loop seamlessly
    for (var r = 0; r < 2; r++) {
      items.forEach(function (w) {
        html += '<a class="wall__card" href="' + esc(w.url) + '" target="_blank" rel="noopener" tabindex="-1">' +
          '<img src="assets/shots/' + w.id + '-d.webp" alt="" loading="' + (r ? 'lazy' : 'eager') + '" decoding="async" width="1200" height="750">' +
          '<span>' + esc(w.name) + '</span></a>';
      });
    }
    track.innerHTML = html;
  }

  /* ---------- greetings ticker ---------- */
  var ticker = document.getElementById('ticker');
  if (ticker) {
    var g = GREET.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('');
    ticker.innerHTML = '<div class="ticker__half">' + g + '</div><div class="ticker__half" aria-hidden="true">' + g + '</div>';
  }

  /* ---------- work grid ---------- */
  var grid = document.getElementById('grid');
  if (grid) {
    grid.innerHTML = W.map(function (w, i) {
      return '<a class="card" href="' + esc(w.url) + '" target="_blank" rel="noopener" style="--i:' + i + '">' +
        '<span class="card__shots">' +
          '<img class="card__d" src="assets/shots/' + w.id + '-d.webp" alt="' + esc(w.name) + ' — homepage on desktop" loading="lazy" decoding="async" width="1200" height="750">' +
          '<img class="card__m" src="assets/shots/' + w.id + '-m.webp" alt="" loading="lazy" decoding="async" width="600" height="1299">' +
          (w.live ? '<b class="card__live">Live client site</b>' : '') +
        '</span>' +
        '<span class="card__meta">' +
          '<span class="card__t">' + esc(w.name) + '</span>' +
          '<span class="card__s">' + esc(w.flag) + ' ' + esc(w.place) + ' · ' + esc(w.craft) + '</span>' +
          '<span class="card__tag">' + esc(w.lang) + ' · ' + esc(w.tag) + '</span>' +
        '</span></a>';
    }).join('');
    var more = document.getElementById('more');
    if (more && MORE.length) {
      more.innerHTML = 'Also built: ' + MORE.map(function (m) { return '<a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(m.name) + '</a>'; }).join(', ') + '.';
    }
  }

  /* ---------- before / after sliders ---------- */
  var ba = document.getElementById('ba');
  if (ba) {
    var byId = {}; W.concat(MORE).forEach(function (w) { if (w.id) byId[w.id] = w; });
    ba.innerHTML = PAIRS.map(function (id) {
      var w = byId[id] || { name: id, place: '', craft: '' };
      return '<figure class="cmp" data-id="' + esc(id) + '">' +
        '<div class="cmp__frame">' +
          '<img class="cmp__new" src="assets/shots/' + id + '-m.webp" alt="' + esc(w.name) + ' — new concept on a phone" loading="lazy" decoding="async" width="600" height="1299">' +
          '<img class="cmp__old" src="assets/shots/' + id + '-old-m.webp" alt="' + esc(w.name) + ' — the old site on a phone" loading="lazy" decoding="async" width="600" height="1299">' +
          '<span class="cmp__handle" aria-hidden="true"></span>' +
          '<input class="cmp__range" type="range" min="0" max="100" value="50" aria-label="Compare old and new ' + esc(w.name) + '">' +
          '<span class="cmp__lbl cmp__lbl--a">Before</span><span class="cmp__lbl cmp__lbl--b">After</span>' +
        '</div>' +
        '<figcaption><b>' + esc(w.name) + '</b><span>' + esc(w.place) + (w.craft ? ' · ' + esc(w.craft) : '') + '</span></figcaption>' +
      '</figure>';
    }).join('');
    ba.querySelectorAll('.cmp').forEach(function (f) {
      var range = f.querySelector('.cmp__range');
      var set = function (v) { f.style.setProperty('--p', v + '%'); };
      range.addEventListener('input', function () { set(range.value); });
      set(50);
      // if the old-site capture is missing, hide the pair instead of showing a broken image
      f.querySelector('.cmp__old').addEventListener('error', function () { f.remove(); });
    });
  }

  /* ---------- copy email ---------- */
  var copy = document.getElementById('copyMail'), note = document.getElementById('copyNote');
  if (copy) copy.addEventListener('click', function () {
    var mail = 'vasilyanaptyp@gmail.com';
    var done = function () { note.textContent = 'Copied: ' + mail; setTimeout(function () { note.textContent = 'I answer within a day.'; }, 2500); };
    if (navigator.clipboard) navigator.clipboard.writeText(mail).then(done, done); else done();
  });

  /* ---------- pitch in your language (auto-picked from the browser) ---------- */
  var pitch = document.getElementById('pitch'), langs = document.getElementById('langs'), PITCH = window.PITCH || {};
  if (pitch && langs && Object.keys(PITCH).length) {
    var setLang = function (code, animate) {
      if (!PITCH[code]) return;
      var apply = function () { pitch.innerHTML = PITCH[code].text; pitch.setAttribute('lang', code); };
      langs.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === code ? 'true' : 'false'); });
      if (animate && typeof gsap !== 'undefined' && !rm) gsap.to(pitch, { opacity: 0, y: 6, duration: .18, onComplete: function () { apply(); gsap.to(pitch, { opacity: 1, y: 0, duration: .35, ease: 'expo.out' }); } });
      else apply();
      try { localStorage.setItem('pitchLang', code); } catch (e) {}
    };
    Object.keys(PITCH).forEach(function (code) {
      var b = document.createElement('button'); b.type = 'button'; b.dataset.lang = code; b.textContent = code.toUpperCase(); b.title = PITCH[code].name; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () { setLang(code, true); });
      langs.appendChild(b);
    });
    var saved = null; try { saved = localStorage.getItem('pitchLang'); } catch (e) {}
    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    setLang(saved && PITCH[saved] ? saved : (PITCH[nav] ? nav : 'en'), false);
  }

  /* ---------- theme toggle (system by default, remembered when chosen) ---------- */
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)');
    var current = function () { return doc.getAttribute('data-theme') || (sysDark.matches ? 'dark' : 'light'); };
    var label = function () { themeBtn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); };
    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next); try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
    label();
  }

  /* ---------- live preview: the real page inside a phone ---------- */
  var peek = document.getElementById('peek');
  if (peek && typeof peek.showModal === 'function') {
    var frame = document.getElementById('peekFrame'), pt = document.getElementById('peekTitle'), po = document.getElementById('peekOpen');
    var openPeek = function (w) {
      pt.textContent = w.name + ' — ' + w.place; po.href = w.url; frame.src = w.url;
      peek.showModal(); document.body.style.overflow = 'hidden';
    };
    var closePeek = function () { peek.close(); };
    peek.addEventListener('close', function () { frame.src = 'about:blank'; document.body.style.overflow = ''; });
    document.getElementById('peekClose').addEventListener('click', closePeek);
    peek.addEventListener('click', function (e) { if (e.target === peek) closePeek(); });
    document.querySelectorAll('.card').forEach(function (card, i) {
      var w = W[i]; if (!w || w.live) return;      // client sites may forbid framing; those open in a new tab
      var b = document.createElement('button'); b.type = 'button'; b.className = 'card__peek'; b.textContent = 'Preview on a phone';
      b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); openPeek(w); });
      card.querySelector('.card__meta').appendChild(b);
    });
  }

  /* ---------- clock: my local time, so you know when to expect an answer ---------- */
  var clock = document.getElementById('clock');
  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Kyiv' });
    var tick = function () { var h = +fmt.format(new Date()).slice(0, 2); clock.textContent = 'It is ' + fmt.format(new Date()) + ' in Kyiv' + (h >= 9 && h < 21 ? ' — I am probably online.' : ' — I will answer in the morning.'); };
    tick(); setInterval(tick, 30000);
  }

  /* ---------- QR code of this page ---------- */
  var qr = document.getElementById('qr');
  if (qr && typeof QRCode !== 'undefined') {
    try { new QRCode(qr, { text: 'https://vasilyanaptyp-oss.github.io/', width: 112, height: 112, colorDark: '#141412', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M }); } catch (e) { qr.parentNode.remove(); }
  } else if (qr) { qr.parentNode.remove(); }

  if (rm || typeof gsap === 'undefined') { doc.classList.add('rm'); return; }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ---------- wall: drift + mouse parallax ---------- */
  var plane = document.getElementById('wallPlane');
  if (plane && track) {
    gsap.set(plane, { rotateX: 55, rotateZ: -12 });   // record the resting angles so quickTo has a start value
    var drift = gsap.to(track, { yPercent: -50, duration: 60, ease: 'none', repeat: -1 });
    var mx = 0, my = 0, rafId = 0;
    var tilt = function () { rafId = 0; gsap.to(plane, { rotateZ: -12 + mx * 6, rotateX: 55 - my * 8, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }); };
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch' || window.innerWidth < 900) return;
      mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5;
      if (!rafId) rafId = requestAnimationFrame(tilt);
    }, { passive: true });
    // slow down while the hero is off screen
    ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onLeave: function () { drift.pause(); }, onEnterBack: function () { drift.play(); }, onLeaveBack: function () { drift.pause(); }, onEnter: function () { drift.play(); } });
  }

  /* ---------- hero: headline words rise, copy follows, wall parallaxes on scroll ---------- */
  var intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro.from('.hero__h .w', { yPercent: 105, duration: 1.1, stagger: 0.06 }, 0.05)
       .from('.hero .eyebrow', { y: 10, opacity: 0, duration: .7 }, 0.1)
       .from('.hero__sub, .hero__cta', { y: 20, opacity: 0, duration: .9, stagger: .1 }, 0.5)
       .from('.hero__facts li', { y: 14, opacity: 0, duration: .7, stagger: .06 }, 0.8);
  if (plane) {
    intro.from(plane, { y: 120, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0.2);
    gsap.to(plane, { y: -140, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });
  }

  /* ---------- section heads: words rise line by line ---------- */
  gsap.utils.toArray('.sec__head').forEach(function (el) {
    gsap.from(el.querySelectorAll('.eyebrow, h2, .lead'), { y: 26, opacity: 0, duration: 1, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  /* ---------- work cards: rise + the phone slides in after the desktop ---------- */
  gsap.utils.toArray('.card').forEach(function (el, i) {
    var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    tl.from(el, { y: 36, opacity: 0, duration: .9, ease: 'expo.out', delay: (i % 3) * .08 })
      .from(el.querySelector('.card__m'), { y: 40, x: 20, opacity: 0, duration: .8, ease: 'expo.out' }, '-=.5');
  });

  /* ---------- before/after: the handle sweeps once when the card comes into view ---------- */
  gsap.utils.toArray('.cmp').forEach(function (el, i) {
    var range = el.querySelector('.cmp__range'), o = { p: 100 };
    gsap.from(el, { y: 36, opacity: 0, duration: .9, ease: 'expo.out', delay: i * .08, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    gsap.to(o, { p: 50, duration: 1.6, ease: 'power3.inOut', delay: .3 + i * .15,
      onUpdate: function () { el.style.setProperty('--p', o.p + '%'); if (range) range.value = o.p; },
      scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
  });

  /* ---------- process: cards rise, the connector draws itself ---------- */
  var steps = document.getElementById('steps');
  if (steps) {
    gsap.from(steps.querySelectorAll('li'), { y: 30, opacity: 0, duration: .9, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: steps, start: 'top 85%', once: true } });
    gsap.to(steps, { '--line-p': 1, ease: 'none', scrollTrigger: { trigger: steps, start: 'top 80%', end: 'bottom 60%', scrub: 0.5 } });
  }

  /* ---------- pricing + about: settle in ---------- */
  gsap.from('.price__card', { scale: .96, y: 30, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.price__card', start: 'top 85%', once: true } });
  gsap.from('.about__grid > *', { y: 30, opacity: 0, duration: .9, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: '.about', start: 'top 85%', once: true } });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
