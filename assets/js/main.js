(function () {
'use strict';
var D = {}; try { D = JSON.parse(document.getElementById('data').textContent); } catch (e) {}
var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var store = {
get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
var hdr = $('#hdr');
var onScroll = function () { if (hdr) hdr.classList.toggle('is-scrolled', window.scrollY > 8); };
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
var lang = $('#lang');
if (lang) {
document.addEventListener('click', function (e) { if (lang.open && !lang.contains(e.target)) lang.open = false; });
document.addEventListener('keydown', function (e) {
if (e.key === 'Escape' && lang.open) { lang.open = false; var s = $('summary', lang); if (s) s.focus(); }
});
}
$$('a[hreflang]').forEach(function (a) {
a.addEventListener('click', function () { store.set('lang', a.getAttribute('hreflang')); });
});
var strip = $('#strip');
if (hdr && strip && 'IntersectionObserver' in window) {
new IntersectionObserver(function (es) {
var e = es[0]; hdr.classList.toggle('show-cta', !e.isIntersecting && e.boundingClientRect.top < 0);
}).observe(strip);
}
var stage = $('#stage');
if (!stage) return;
var slides = $$('.slide', stage), phones = $$('.ph', stage), segs = $$('.seg', stage), list = $$('#heroList button');
var url = $('#heroUrl'), st = $('#heroState'), cap = $('#heroCap'), pp = $('#playpause'), screens = $('#screens');
var n = slides.length, cur = 0, DUR = 5200, timer = null, typing = null;
var playing = !rm && n > 1, visible = true, hovering = false, focused = false;
stage.style.setProperty('--dur', DUR + 'ms');
if (n < 2) { var c = $('.stage__ctl .segs', stage); if (c) c.hidden = true; if (pp) pp.hidden = true; return; }
var load = function (i) {
[slides[i], phones[i]].forEach(function (el) {
if (!el) return;
$$('[data-srcset],[data-src]', el).forEach(function (x) {
if (x.getAttribute('data-srcset')) { x.setAttribute('srcset', x.getAttribute('data-srcset')); x.removeAttribute('data-srcset'); }
if (x.getAttribute('data-src')) { x.setAttribute('src', x.getAttribute('data-src')); x.removeAttribute('data-src'); }
});
});
};
var stateEl = function (kind) {
var s = document.createElement('span');
s.className = kind === 'live' ? 'state state--live' : 'state';
if (kind === 'live') { var d = document.createElement('i'); d.className = 'dot'; d.setAttribute('aria-hidden', 'true'); s.appendChild(d); }
s.appendChild(document.createTextNode(kind === 'live' ? D.live : D.first));
return s;
};
var type = function (text) {
clearInterval(typing);
if (rm || !url) { if (url) url.textContent = text; return; }
var k = 0; url.textContent = '';
typing = setInterval(function () { k += 1; url.textContent = text.slice(0, k); if (k >= text.length) clearInterval(typing); }, Math.max(14, Math.min(34, 520 / text.length)));
};
var restartBar = function () {
var b = segs[cur] && $('i', segs[cur]); if (!b) return;
stage.classList.remove('is-auto'); void b.offsetWidth; if (playing) stage.classList.add('is-auto');
};
var show = function (i) {
i = (i + n) % n;
if (i === cur) return;
load(i); load((i + 1) % n);
var a = slides[cur], b = slides[i];
a.classList.remove('is-on'); a.setAttribute('aria-hidden', 'true');
b.classList.add('is-on'); b.removeAttribute('aria-hidden');
if (phones[cur]) phones[cur].classList.remove('is-on');
if (phones[i]) phones[i].classList.add('is-on');
segs.forEach(function (s, k) { if (k === i) s.setAttribute('aria-current', 'true'); else s.removeAttribute('aria-current'); });
list.forEach(function (s, k) { if (k === i) s.setAttribute('aria-current', 'true'); else s.removeAttribute('aria-current'); });
type(b.getAttribute('data-addr'));
if (url) url.setAttribute('href', b.getAttribute('data-href'));
if (st) { st.textContent = ''; st.appendChild(stateEl(b.getAttribute('data-kind'))); }
if (cap) {
var top = document.createElement('span'), bb = document.createElement('b'), sp = document.createElement('span');
top.className = 'cap__top'; sp.className = 'cap__meta';
bb.textContent = b.getAttribute('data-name'); top.appendChild(bb);
if (b.getAttribute('data-kind') !== 'live') top.appendChild(stateEl('first'));
sp.textContent = b.getAttribute('data-meta');
cap.textContent = ''; cap.appendChild(top); cap.appendChild(sp);
}
cur = i;
restartBar();
schedule();
};
var schedule = function () {
clearTimeout(timer);
var run = playing && visible && !hovering && !focused && !document.hidden;
stage.classList.toggle('is-paused', !run);
if (run) timer = setTimeout(function () { show(cur + 1); }, DUR);
};
var setPlaying = function (p) {
playing = p;
if (p) { focused = false; hovering = false; }
if (pp) { pp.setAttribute('data-state', p ? 'playing' : 'paused'); pp.setAttribute('aria-label', p ? D.pause : D.play); }
restartBar(); schedule();
};
segs.forEach(function (s, k) { s.addEventListener('click', function () { show(k); }); });
list.forEach(function (s, k) {
s.addEventListener('click', function () { show(k); });
s.addEventListener('mouseenter', function () { show(k); });
});
if (pp) pp.addEventListener('click', function () { setPlaying(!playing); });
var enter = function (e) { if (e.pointerType === 'mouse') { hovering = true; schedule(); } };
var leave = function (e) { if (e.pointerType === 'mouse') { hovering = false; restartBar(); schedule(); } };
stage.addEventListener('pointerenter', enter); stage.addEventListener('pointerleave', leave);
var hl = $('.hl'); if (hl) { hl.addEventListener('pointerenter', enter); hl.addEventListener('pointerleave', leave); }
var kbd = function (el) { try { return el.matches(':focus-visible'); } catch (e) { return false; } };
stage.addEventListener('focusin', function (e) { focused = kbd(e.target); schedule(); });
stage.addEventListener('focusout', function () { focused = false; schedule(); });
stage.addEventListener('keydown', function (e) {
if (e.key === 'ArrowRight') { show(cur + 1); e.preventDefault(); }
if (e.key === 'ArrowLeft') { show(cur - 1); e.preventDefault(); }
});
var x0 = null, y0 = null, moved = false;
screens.addEventListener('touchstart', function (e) { var t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; moved = false; }, { passive: true });
screens.addEventListener('touchmove', function (e) { if (x0 === null) return; var t = e.touches[0]; if (Math.abs(t.clientX - x0) > 10 || Math.abs(t.clientY - y0) > 10) moved = true; }, { passive: true });
screens.addEventListener('touchend', function (e) {
if (x0 === null) return;
var t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0; x0 = null;
if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(cur + (dx < 0 ? 1 : -1));
});
screens.addEventListener('click', function () { if (moved) { moved = false; return; } show(cur + 1); });
screens.style.cursor = 'pointer';
if ('IntersectionObserver' in window) {
new IntersectionObserver(function (es) { visible = es[0].isIntersecting; schedule(); }, { threshold: 0.25 }).observe(stage);
}
document.addEventListener('visibilitychange', schedule);
var boot = function () { load(1); setPlaying(playing); };
if (document.readyState === 'complete') boot(); else window.addEventListener('load', boot);
})();
