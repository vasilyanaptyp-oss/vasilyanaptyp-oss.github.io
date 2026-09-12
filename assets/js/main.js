/* Portfolio — Artur Vasilyan. Static, GSAP for the wall + reveals. Degrades to static without JS/GSAP.
   The first-screen language is applied by an inline script in index.html (before first paint). */
(function () {
  'use strict';
  var doc = document.documentElement;
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = window.WORK || [], MORE = window.MORE || [], PAIRS = window.PAIRS || [], PITCH = window.PITCH || {};
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var shot = function (id, kind) {
    // desktop shots exist at 1200 and 640 px; phones and small thumbnails get the small one
    if (kind === 'd') return 'src="assets/shots/' + id + '-d-640.webp" srcset="assets/shots/' + id + '-d-640.webp 640w, assets/shots/' + id + '-d.webp 1200w"';
    return 'src="assets/shots/' + id + '-' + kind + '.webp"';
  };

  /* ---------- header ---------- */
  var hdr = document.getElementById('hdr');
  var onScroll = function () { hdr.classList.toggle('is-scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- wall of sites (hero): decorative, 8 cards, no links ---------- */
  var track = document.getElementById('wallTrack');
  if (track && window.innerWidth >= 900) {
    var items = W.slice(0, 8), html = '';
    for (var r = 0; r < 2; r++) {          // two identical rows so the drift can loop
      items.forEach(function (w) {
        html += '<div class="wall__card"><img ' + shot(w.id, 'd') + ' sizes="(max-width: 899px) 45vw, 22vw" alt="" loading="' + (r ? 'lazy' : 'eager') + '" decoding="async" width="640" height="400"></div>';
      });
    }
    track.innerHTML = html;
  }

  /* ---------- language chips: handlers (chips themselves are rendered inline before paint) ---------- */
  var langs = document.getElementById('langs'), pitch = document.getElementById('pitch');
  if (langs && window.applyPitch) {
    langs.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]'); if (!b) return;
      var code = b.dataset.lang;
      var swap = function () { window.applyPitch(code); try { localStorage.setItem('pitchLang', code); } catch (err) {} };
      if (typeof gsap !== 'undefined' && !rm) gsap.to('.hero__copy > :not(.langs)', { opacity: 0, y: 6, duration: .18, onComplete: function () { swap(); gsap.to('.hero__copy > :not(.langs)', { opacity: 1, y: 0, duration: .4, ease: 'expo.out' }); } });
      else swap();
    });
  }

  /* ---------- work grid ---------- */
  var grid = document.getElementById('grid');
  if (grid) {
    grid.innerHTML = W.map(function (w, i) {
      return '<a class="card' + (w.live ? ' card--live' : '') + '" href="' + esc(w.url) + '" target="_blank" rel="noopener" style="--i:' + i + '">' +
        '<span class="card__shots">' +
          '<img class="card__d" ' + shot(w.id, 'd') + ' sizes="(max-width: 640px) 80vw, (max-width: 1100px) 46vw, 380px" alt="' + esc(w.name) + ' — homepage on desktop" loading="lazy" decoding="async" width="640" height="400">' +
          '<img class="card__m" ' + shot(w.id, 'm') + ' alt="" loading="lazy" decoding="async" width="600" height="1299">' +
          '<b class="card__badge' + (w.live ? ' card__badge--live' : '') + '">' + (w.live ? 'Live client site' : 'Concept · not the official site') + '</b>' +
        '</span>' +
        '<span class="card__meta">' +
          '<span class="card__t">' + esc(w.name) + '</span>' +
          '<span class="card__s">' + esc(w.place) + ' · ' + esc(w.craft) + '</span>' +
          '<span class="card__tag">' + esc(w.lang) + ' · ' + esc(w.tag) + '</span>' +
        '</span></a>';
    }).join('');
    var more = document.getElementById('more');
    if (more && MORE.length) {
      more.innerHTML = 'More concepts: ' + MORE.map(function (m) { return '<a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(m.name) + '</a>'; }).join(', ') + '.';
    }
  }

  /* ---------- before / after sliders (old site fully visible by default) ---------- */
  var ba = document.getElementById('ba'), DEFAULT_P = 78;
  if (ba) {
    var byId = {}; W.concat(MORE).forEach(function (w) { if (w.id) byId[w.id] = w; });
    ba.innerHTML = PAIRS.map(function (id) {
      var w = byId[id] || { name: id, place: '', craft: '' };
      return '<figure class="cmp" data-id="' + esc(id) + '" style="--p:' + DEFAULT_P + '%">' +
        '<div class="cmp__frame">' +
          '<img class="cmp__new" ' + shot(id, 'm') + ' alt="' + esc(w.name) + ' — new concept on a phone" loading="lazy" decoding="async" width="600" height="1299">' +
          '<img class="cmp__old" ' + shot(id, 'old-m') + ' alt="' + esc(w.name) + ' — the old site on a phone" loading="lazy" decoding="async" width="600" height="1299">' +
          '<span class="cmp__handle" aria-hidden="true"></span>' +
          '<input class="cmp__range" type="range" min="0" max="100" value="' + DEFAULT_P + '" aria-label="Compare the old and the new ' + esc(w.name) + ' page">' +
          '<span class="cmp__lbl cmp__lbl--a">Before</span><span class="cmp__lbl cmp__lbl--b">After</span>' +
        '</div>' +
        '<figcaption><b>' + esc(w.name) + '</b><span>' + esc(w.place) + (w.craft ? ' · ' + esc(w.craft) : '') + '</span></figcaption>' +
      '</figure>';
    }).join('');
    ba.querySelectorAll('.cmp').forEach(function (f) {
      var range = f.querySelector('.cmp__range');
      range.addEventListener('input', function () { f.style.setProperty('--p', range.value + '%'); f.dataset.touched = '1'; });
      f.querySelector('.cmp__old').addEventListener('error', function () { f.remove(); });   // no old capture → no pair
    });
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
    var openPeek = function (w) { pt.textContent = w.name; po.href = w.url; frame.src = w.url; peek.showModal(); document.body.style.overflow = 'hidden'; };
    peek.addEventListener('close', function () { frame.src = 'about:blank'; document.body.style.overflow = ''; });
    document.getElementById('peekClose').addEventListener('click', function () { peek.close(); });
    peek.addEventListener('click', function (e) { if (e.target === peek) peek.close(); });
    document.querySelectorAll('.card').forEach(function (card, i) {
      var w = W[i]; if (!w || w.live) return;      // client sites may forbid framing; those open in a new tab
      var b = document.createElement('button'); b.type = 'button'; b.className = 'card__peek'; b.textContent = 'Preview on a phone';
      b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); openPeek(w); });
      card.querySelector('.card__meta').appendChild(b);
    });
  }

  /* ---------- copy email ---------- */
  var copy = document.getElementById('copyMail'), note = document.getElementById('copyNote');
  if (copy) copy.addEventListener('click', function () {
    var mail = 'vasilyanaptyp@gmail.com';
    var done = function () { note.textContent = 'Copied: ' + mail; setTimeout(function () { note.textContent = 'I answer within a day.'; }, 2500); };
    if (navigator.clipboard) navigator.clipboard.writeText(mail).then(done, done); else done();
  });

  /* ---------- clock: my local time, so you know when to expect an answer ---------- */
  var clock = document.getElementById('clock');
  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Kyiv' });
    var tick = function () { var t = fmt.format(new Date()), h = +t.slice(0, 2); clock.textContent = 'It is ' + t + ' in Kyiv' + (h >= 9 && h < 21 ? ' — I am probably online.' : ' — I will answer in the morning.'); };
    tick(); setInterval(tick, 30000);
  }

  /* ---------- QR code of this page ---------- */
  var qr = document.getElementById('qr');
  if (qr && typeof QRCode !== 'undefined') {
    try { new QRCode(qr, { text: 'https://vasilyanaptyp-oss.github.io/', width: 112, height: 112, colorDark: '#141412', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M }); } catch (e) { qr.parentNode.remove(); }
  } else if (qr) { qr.parentNode.remove(); }

  /* ---------- print: everything visible, regardless of scroll reveals ---------- */
  window.addEventListener('beforeprint', function () {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.getAll().forEach(function (t) { t.animation && t.animation.progress(1); });
    if (typeof gsap !== 'undefined') gsap.set('.card, .cmp, .steps li, .price__card, .about__grid > *, .sec__head > *, .hero__copy > *', { clearProps: 'opacity,transform' });
  });

  if (rm || typeof gsap === 'undefined') { doc.classList.add('rm'); return; }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  var mobile = window.matchMedia('(max-width: 899px)').matches;

  /* ---------- wall: drift, mouse tilt, scroll parallax ---------- */
  var plane = document.getElementById('wallPlane');
  if (plane && track && track.children.length) {
    gsap.set(plane, { rotateX: 55, rotateZ: -12 });
    var drift = gsap.to(track, { yPercent: -50, duration: 70, ease: 'none', repeat: -1 });
    var mx = 0, my = 0, rafId = 0;
    var tilt = function () { rafId = 0; gsap.to(plane, { rotateZ: -12 + mx * 6, rotateX: 55 - my * 8, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }); };
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch' || window.innerWidth < 900) return;
      mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5;
      if (!rafId) rafId = requestAnimationFrame(tilt);
    }, { passive: true });
    ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onLeave: function () { drift.pause(); }, onEnterBack: function () { drift.play(); }, onLeaveBack: function () { drift.pause(); }, onEnter: function () { drift.play(); } });
    if (!mobile) gsap.to(plane, { y: -140, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });
  }

  /* ---------- hero entrance ---------- */
  var intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro.from('#h1', { y: 28, opacity: 0, duration: 1.1 }, 0.05)
       .from('#eye', { y: 10, opacity: 0, duration: .7 }, 0.1)
       .from('#pitch, .langs, .hero__cta', { y: 18, opacity: 0, duration: .9, stagger: .08 }, 0.4)
       .from('.hero__facts li', { y: 12, opacity: 0, duration: .7, stagger: .06 }, 0.7);
  if (plane) intro.from(plane, { y: 120, opacity: 0, duration: 1.6 }, 0.2);

  /* ---------- section heads ---------- */
  gsap.utils.toArray('.sec__head').forEach(function (el) {
    gsap.from(el.querySelectorAll('.eyebrow, h2, .lead'), { y: 24, opacity: 0, duration: 1, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  /* ---------- work cards: rise, then the phone slides in ---------- */
  gsap.utils.toArray('.card').forEach(function (el, i) {
    var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    tl.from(el, { y: 32, opacity: 0, duration: .9, ease: 'expo.out', delay: (i % 3) * .08 })
      .from(el.querySelector('.card__m'), { y: 40, x: 20, opacity: 0, duration: .8, ease: 'expo.out' }, '-=.5');
  });

  /* ---------- before/after: sweep once, only after both images are decoded ---------- */
  gsap.utils.toArray('.cmp').forEach(function (el, i) {
    gsap.from(el, { y: 32, opacity: 0, duration: .9, ease: 'expo.out', delay: i * .08, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    ScrollTrigger.create({ trigger: el, start: 'top 75%', once: true, onEnter: function () {
      var imgs = [el.querySelector('.cmp__old'), el.querySelector('.cmp__new')];
      Promise.all(imgs.map(function (im) { return im.decode ? im.decode().catch(function () {}) : Promise.resolve(); })).then(function () {
        if (el.dataset.touched) return;
        var o = { p: DEFAULT_P }, range = el.querySelector('.cmp__range');
        gsap.timeline({ delay: .2 + i * .15 })
          .to(o, { p: 30, duration: 1.1, ease: 'power2.inOut', onUpdate: function () { if (el.dataset.touched) return; el.style.setProperty('--p', o.p + '%'); range.value = o.p; } })
          .to(o, { p: DEFAULT_P, duration: 1.1, ease: 'power2.inOut', onUpdate: function () { if (el.dataset.touched) return; el.style.setProperty('--p', o.p + '%'); range.value = o.p; } }, '+=.4');
      });
    } });
  });

  /* ---------- process, pricing, about ---------- */
  var steps = document.getElementById('steps');
  if (steps) gsap.from(steps.querySelectorAll('li'), { y: 28, opacity: 0, duration: .9, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: steps, start: 'top 85%', once: true } });
  gsap.from('.price__card', { scale: .97, y: 24, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.price__card', start: 'top 85%', once: true } });
  gsap.from('.about__grid > *', { y: 24, opacity: 0, duration: .9, stagger: .12, ease: 'expo.out', scrollTrigger: { trigger: '.about', start: 'top 85%', once: true } });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
