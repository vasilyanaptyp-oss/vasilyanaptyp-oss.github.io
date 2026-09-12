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

  if (rm || typeof gsap === 'undefined') { doc.classList.add('rm'); return; }
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ---------- wall: drift + mouse parallax ---------- */
  var plane = document.getElementById('wallPlane');
  if (plane && track) {
    var drift = gsap.to(track, { yPercent: -50, duration: 60, ease: 'none', repeat: -1 });
    var qx = gsap.quickTo(plane, 'rotateZ', { duration: 1.2, ease: 'power3.out' });
    var qy = gsap.quickTo(plane, 'rotateX', { duration: 1.2, ease: 'power3.out' });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch' || window.innerWidth < 900) return;
      qx(-12 + (e.clientX / window.innerWidth - 0.5) * 6);
      qy(55 - (e.clientY / window.innerHeight - 0.5) * 8);
    }, { passive: true });
    // slow down while the hero is off screen
    ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onLeave: function () { drift.pause(); }, onEnterBack: function () { drift.play(); }, onLeaveBack: function () { drift.pause(); }, onEnter: function () { drift.play(); } });
  }

  /* ---------- reveals ---------- */
  gsap.utils.toArray('.sec__head, .hero__copy > *').forEach(function (el) {
    gsap.from(el, { y: 24, opacity: 0, duration: .9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  gsap.utils.toArray('.card, .cmp, .steps li, .price__card, .about__grid > *').forEach(function (el, i) {
    gsap.from(el, { y: 30, opacity: 0, duration: .8, ease: 'expo.out', delay: (i % 3) * .06, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
