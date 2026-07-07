/* ============================================================
   URIM v4 — ANIMATION ENGINE
   Built on: gsap-core (tweens/stagger/matchMedia) ·
   gsap-timeline (sequencing) · gsap-scrolltrigger (scrub/pin/batch)
   gsap-performance (transform+opacity, will-change, batching)
   css-animation (ambient keyframe layer in urim-anim-css)
   ============================================================ */
(function () {
  'use strict';
  if (!window.gsap) return; /* graceful no-JS/no-CDN degradation: page stays fully readable */
  gsap.registerPlugin(ScrollTrigger);
  if (window.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

  var AC = '#00FF41', DIM = '#447950';
  var FINE = window.matchMedia('(pointer: fine)').matches;
  /* pinned scrub sections only where the set-piece fits in the viewport */
  var PINS = window.matchMedia('(min-width: 900px)').matches;
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  /* release will-change/filter layers once a one-shot reveal has landed */
  function settle(els) {
    gsap.set(els, { clearProps: 'transform,filter' });
    els.forEach(function (e) { e.style.willChange = 'auto'; });
  }
  /* JS-driven anchor scroll — CSS smooth-scroll fights pinned scrub sections */
  function goTo(t, d) {
    if (window.ScrollToPlugin) gsap.to(window, { scrollTo: { y: t, offsetY: 60, autoKill: true }, duration: d || 1.1, ease: 'power3.inOut' });
    else t.scrollIntoView();
  }

  /* ---------- glyph decode (in-house ScrambleText) ---------- */
  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§¶†‡✓✕/\\|·';
  function rg() { return GLYPHS.charAt(Math.random() * GLYPHS.length | 0); }
  function scrambleTo(el, txt, dur, delay) {
    if (!el) return gsap.to({}, { duration: 0 });
    var st = { p: 0 };
    return gsap.to(st, {
      p: 1, duration: dur || 1.2, delay: delay || 0, ease: 'power2.out',
      onUpdate: function () {
        var n = Math.floor(st.p * txt.length), out = txt.slice(0, n);
        for (var i = n; i < txt.length; i++) out += (txt[i] === ' ' ? ' ' : rg());
        el.textContent = out;
      },
      onComplete: function () { el.textContent = txt; }
    });
  }

  /* ---------- splitters (SplitText-style, dependency-free) ---------- */
  function splitWords(el) {
    var out = [];
    (function walk(node) {
      $$(':scope > *', node); /* noop guard for old engines */
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function (tok) {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
            var w = document.createElement('span'); w.className = 'u-wln';
            var i = document.createElement('span'); i.className = 'u-wch'; i.textContent = tok;
            w.appendChild(i); frag.appendChild(w); out.push(i);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') { walk(ch); }
      });
    })(el);
    return out;
  }
  function splitChars(el) {
    var txt = el.textContent, out = [];
    el.textContent = '';
    txt.split('').forEach(function (c) {
      var w = document.createElement('span'); w.className = 'u-chln';
      var i = document.createElement('span'); i.className = 'u-chch'; i.textContent = c;
      w.appendChild(i); el.appendChild(w); out.push(i);
    });
    return out;
  }

  /* ---------- precedent rain (canvas, DPR-capped, offscreen-paused) ---------- */
  function initRain(reduced) {
    var cv = $('#uh-rain'); if (!cv) return;
    var ctx = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var CH = '§¶†✓✕URIM0123456789'.split(''), cols = [], run = false, raf = 0, W = 0, H = 0, FS = 15;
    function size() {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FS + 'px "Share Tech Mono", monospace';
      cols = []; for (var i = 0; i < Math.ceil(W / FS); i++) cols.push({ y: Math.random() * -H, v: 1.6 + Math.random() * 2.6 });
    }
    function frame() {
      ctx.fillStyle = 'rgba(0,0,0,0.085)'; ctx.fillRect(0, 0, W, H);
      for (var i = 0; i < cols.length; i++) {
        var c = cols[i], x = i * FS;
        ctx.fillStyle = Math.random() < 0.06 ? 'rgba(180,255,200,0.9)' : 'rgba(0,255,65,0.32)';
        ctx.fillText(CH[Math.random() * CH.length | 0], x, c.y);
        c.y += c.v * FS * 0.22;
        if (c.y > H + 40) { c.y = Math.random() * -160; c.v = 1.6 + Math.random() * 2.6; }
      }
      if (run) raf = requestAnimationFrame(frame);
    }
    function still() { for (var k = 0; k < 26; k++) frame(); }
    size(); window.addEventListener('resize', size);
    if (reduced) { /* calm static frames; repaint after resize wipes the canvas */
      still(); window.addEventListener('resize', still); return;
    }
    ScrollTrigger.create({
      trigger: '#top', start: 'top bottom', end: 'bottom top',
      onToggle: function (self) { run = self.isActive; if (run) raf = requestAnimationFrame(frame); else cancelAnimationFrame(raf); }
    });
    run = true; raf = requestAnimationFrame(frame);
  }

  /* ---------- boot sequence ---------- */
  function boot(done) {
    /* lock scroll behind the veil — otherwise once-only triggers fire unseen
       and the hero intro ends up fighting the hero-exit scrub */
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    var o = document.createElement('div'); o.id = 'u-boot';
    o.innerHTML = '<div class="u-boot-inner">' +
      '<div class="u-boot-line" data-bl></div><div class="u-boot-line" data-bl></div>' +
      '<div class="u-boot-line" data-bl></div><div class="u-boot-line" data-bl></div>' +
      '<div class="u-boot-line" data-bl></div><div class="u-boot-line" data-bl></div>' +
      '<div id="u-bar"><i></i></div><div class="u-skip">CLICK TO SKIP</div></div>';
    document.body.appendChild(o);
    var fl = document.createElement('div'); fl.id = 'u-flash'; document.body.appendChild(fl);
    var lines = [
      'LABORATOIRES STRUCTURE — <b>URIM//KERNEL 4.1.0</b>',
      'MOUNTING PRECEDENT CORPUS ....... <b>12,847,203 RECORDS</b>',
      'CALIBRATING PANEL ............... <b>14 EXPERT MODELS</b>',
      'SIGNAL ARRAY .................... <b>3/3 LIVE</b>',
      'REPLICATION LEDGER .............. <b>STREAMING</b>',
      '> <b>INSTRUMENT READY_</b>'
    ];
    var els = $$('[data-bl]', o), tl = gsap.timeline({
      onComplete: function () { o.remove(); fl.remove(); document.documentElement.style.overflow = ''; done(); }
    });
    els.forEach(function (el, i) {
      var st = { p: 0 }, html = lines[i];
      var plain = html.replace(/<[^>]+>/g, '');
      tl.to(st, {
        p: 1, duration: 0.28, ease: 'none',
        onUpdate: function () { el.textContent = plain.slice(0, Math.floor(st.p * plain.length)); },
        onComplete: function () { el.innerHTML = html; }
      }, i * 0.3);
    });
    tl.to('#u-bar i', { scaleX: 1, duration: 1.7, ease: 'power1.inOut' }, 0.1)
      .to(fl, { opacity: 1, duration: 0.09, ease: 'none' }, '+=0.12')
      .to(fl, { opacity: 0, duration: 0.4, ease: 'power2.out' })
      .to(o, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '-=0.34');
    function skip() { tl.progress(1); }
    o.addEventListener('click', skip);
    window.addEventListener('keydown', skip, { once: true });
    return tl;
  }
  /* ---------- hero intro (gsap-timeline sequencing) ---------- */
  function heroIntro() {
    var hd = $('#top'), h1 = $('#top h1'), tag = $('#hero-title');
    var kick = $('#top span'); /* first span = kicker */
    var chars = splitChars(h1); h1.classList.add('u-glow');
    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('nav', { yPercent: -100, autoAlpha: 0, duration: 0.8 }, 0)
      .from(kick, { autoAlpha: 0, y: 14, duration: 0.7 }, 0.05)
      .from(chars, { yPercent: 118, filter: 'blur(14px)', duration: 1.15, stagger: 0.09,
        onComplete: function () { settle(chars); } }, 0.1)
      .add(scrambleTo(tag, tag.getAttribute('data-decode') || tag.textContent, 1.5), 0.55);
    /* stagger the remaining content blocks in as one field */
    tl.from($$('#top > div > *').filter(function (el) { return !el.contains(h1) && el !== kick && el !== tag; }),
      { autoAlpha: 0, y: 26, duration: 0.9, stagger: 0.08 }, 0.75);
    /* hero parallax + exit (scrub) */
    gsap.to('#top > div:nth-of-type(2)', {
      yPercent: -18, autoAlpha: 0, ease: 'none',
      scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom 35%', scrub: true }
    });
    gsap.to('#uh-rain', { yPercent: 22, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- global chrome ---------- */
  function chrome() {
    var bar = document.createElement('div'); bar.id = 'u-progress'; document.body.appendChild(bar);
    gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'max', scrub: 0.3 } });
    var crt = document.createElement('div'); crt.id = 'u-crt'; document.body.appendChild(crt);
    (function blip() {
      gsap.delayedCall(6 + Math.random() * 8, function () {
        gsap.timeline().to(crt, { opacity: 0.16, duration: 0.05 }).to(crt, { opacity: 0, duration: 0.12 })
          .to(crt, { opacity: 0.1, duration: 0.04 }, '+=0.05').to(crt, { opacity: 0, duration: 0.1 });
        blip();
      });
    })();
  }

  /* ---------- editorial reveals (ScrollTrigger.batch — gsap-performance) ---------- */
  function reveals() {
    /* H2: word rise */
    $$('section h2').forEach(function (h2) {
      var w = splitWords(h2);
      gsap.set(w, { yPercent: 115 });
      gsap.to(w, {
        yPercent: 0, duration: 0.95, ease: 'power4.out', stagger: 0.05,
        onComplete: function () { settle(w); },
        scrollTrigger: { trigger: h2, start: 'top 84%', once: true }
      });
    });
    /* prose + captions: batched fade-rise */
    var ps = $$('section p, footer p').filter(function (p) {
      return !p.closest('#panel-viz') && !p.closest('#cpath') && !p.closest('#ledger-box') &&
             !p.closest('#access-done') && p.id !== 'nl-done' && p.id !== 'hero-title' && !p.closest('#top') &&
             !p.closest('section[aria-label^="Campaign"]') && !p.closest('[data-pinned]');
    });
    gsap.set(ps, { autoAlpha: 0, y: 26 });
    ScrollTrigger.batch(ps, {
      start: 'top 90%', once: true,
      onEnter: function (els) {
        gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
          onComplete: function () { gsap.set(els, { clearProps: 'transform' }); } });
      }
    });
    /* № kickers: decode in */
    $$('section span, footer span').filter(function (s) { return /^№/.test(s.textContent.trim()); })
      .forEach(function (s) {
        var t = s.textContent;
        ScrollTrigger.create({
          trigger: s, start: 'top 90%', once: true,
          onEnter: function () { scrambleTo(s, t, 0.9); }
        });
      });
    /* signal array rows: slide from the margin */
    var rows = $$('#instrument div[style*="grid-template-columns:120px"]');
    gsap.set(rows, { autoAlpha: 0, x: -44 });
    gsap.to(rows, {
      autoAlpha: 1, x: 0, duration: 0.9, ease: 'power3.out', stagger: 0.16,
      scrollTrigger: { trigger: '#instrument', start: 'top 70%', once: true }
    });
    /* access form: frame powers on */
    var af = $('#access-form');
    if (af) {
      gsap.set(af, { autoAlpha: 0, y: 36 });
      gsap.to(af, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: af, start: 'top 86%', once: true } });
    }
    /* interstitials: scrubbed parallax drift */
    $$('section[aria-label^="Campaign"] p').forEach(function (p) {
      /* drift runs the full range; opacity lands early so the line is fully
         lit while it is actually readable, not only as it exits */
      var stl = gsap.timeline({ scrollTrigger: { trigger: p.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
      stl.fromTo(p, { y: 70 }, { y: -70, duration: 1, ease: 'none' }, 0)
         .fromTo(p, { autoAlpha: 0.35 }, { autoAlpha: 1, duration: 0.45, ease: 'none' }, 0);
    });
  }

  /* ---------- № 03 THE PANEL — pinned, scrubbed convening ---------- */
  function panel() {
    var pv = $('#panel-viz'); if (!pv) return;
    var wrap = pv.parentNode; wrap.setAttribute('data-pinned', '');
    var cap = $$(':scope > p', wrap)[0]; /* FIG caption — owned here, not by the global batch */
    var nodes = $$('[data-pnode]', pv), active = $$('[data-pactive]', pv),
        links = $$('[data-plink]', pv), rings = $$('[data-ring]', pv),
        hub = $('#pv-hub'), roster = $('#pv-roster'), num = $('#pd-num'), ci = $('#pd-ci');
    var ROSTER = 'CONTRACT LAW · FINANCE · GEOPOLITICS · SUSTAINABLE AGRICULTURE';
    gsap.set(nodes, { opacity: 0 });
    var st = { r: 0, n: 0 };
    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: PINS
        ? { trigger: wrap, start: 'center 58%', end: '+=170%', scrub: 0.6, pin: true, anticipatePin: 1,
            /* parent is column-flex: ScrollTrigger auto-disables pinSpacing there,
               which lets the next section scroll over the pinned viz — force it */
            pinSpacing: true }
        : { trigger: wrap, start: 'top 75%', once: true } /* set-piece taller than small viewports: play, don't pin */
    });
    if (cap) {
      gsap.set(cap, { autoAlpha: 0, y: 18 });
      tl.to(cap, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.4);
    }
    tl.to(nodes, { opacity: 0.55, duration: 0.9, stagger: { each: 0.07, from: 'random' }, ease: 'power1.out' }, 0)
      .to(active, { opacity: 1, color: AC, duration: 0.45, stagger: 0.14 }, 1.0)
      .to(rings, { opacity: 0.9, duration: 0.3, stagger: 0.14 }, 1.1)
      .to(links, { strokeDashoffset: 0, duration: 0.55, stagger: 0.18 }, 1.7)
      .to(hub, { opacity: 1, color: AC, duration: 0.4 }, 2.6)
      .to(st, {
        r: 1, duration: 0.9,
        onUpdate: function () {
          var n = Math.round(st.r * ROSTER.length);
          roster.textContent = ROSTER.slice(0, n) + (n < ROSTER.length ? '█' : '');
        }
      }, 2.6)
      .to(st, { n: 0.706, duration: 0.55, ease: 'power2.out', onUpdate: function () { num.textContent = st.n.toFixed(3); } }, 3.1)
      .to(st, { n: 0.683, duration: 0.6, ease: 'power3.out', onUpdate: function () { num.textContent = st.n.toFixed(3); } }, 3.65)
      .to(ci, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 3.8);
  }

  /* ---------- № 04 THE LEDGER — sequential replication, then the surge ---------- */
  function fmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function ledger() {
    var box = $('#ledger-box'); if (!box) return;
    var rows = $$('[data-lrow]', box), count = $('#lg-count'), rate = $('#lg-rate');
    var st = { c: 0, r: 0 }, done = 0, hits = 0;
    var tl = gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 72%', once: true } });
    rows.forEach(function (row, i) {
      var stt = $('[data-lst]', row), fin = row.getAttribute('data-final') === 'R';
      tl.call(function () { stt.textContent = 'EVALUATING…'; stt.style.color = '#8FD8A0'; }, null, i * 0.26)
        .call(function () {
          done++; if (fin) hits++;
          stt.textContent = fin ? 'REPLICATED ✓' : 'MISS · SIGNAL ✕';
          stt.style.color = fin ? AC : DIM;
          stt.style.textShadow = fin ? '0 0 10px rgba(0,255,65,0.55)' : 'none';
          count.textContent = fmt(done);
          rate.textContent = (hits / done * 100).toFixed(1);
          if (fin) { row.classList.add('u-lrow-flash'); gsap.delayedCall(0.22, function () { row.classList.remove('u-lrow-flash'); }); }
        }, null, i * 0.26 + 0.2);
    });
    /* the surge: the R&D engine keeps running past the demo window */
    tl.to(st, {
      c: 12847203, duration: 2.4, ease: 'expo.out',
      onUpdate: function () { count.textContent = fmt(st.c); }
    }, rows.length * 0.26 + 0.5)
      .to(st, { r: 93.1, duration: 0.5, ease: 'power2.in', onUpdate: function () { rate.textContent = st.r.toFixed(1); } }, '<')
      .to(st, { r: 91.7, duration: 1.1, ease: 'power3.out', onUpdate: function () { rate.textContent = st.r.toFixed(1); } }, '>');
  }

  /* ---------- № 05 THE CRITICAL PATH — pinned, scrubbed dependency chain ---------- */
  function cpath() {
    var cp = $('#cpath'); if (!cp) return;
    var wrap = cp.parentNode; wrap.setAttribute('data-pinned', '');
    var cap = $$(':scope > p', wrap)[0]; /* FIG caption — owned here, not by the global batch */
    var segs = $$('[data-cseg]', cp), nds = $$('[data-cnode]', cp), fails = $$('[data-cfail]', cp);
    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: PINS
        ? { trigger: wrap, start: 'center 56%', end: '+=150%', scrub: 0.6, pin: true, anticipatePin: 1,
            pinSpacing: true /* column-flex parent — same as the panel pin */ }
        : { trigger: wrap, start: 'top 75%', once: true }
    });
    if (cap) {
      gsap.set(cap, { autoAlpha: 0, y: 18 });
      tl.to(cap, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.3);
    }
    tl.to(nds[0], { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
    segs.forEach(function (sg, i) {
      var t = 0.35 + i * 0.85;
      tl.to(sg, { strokeDashoffset: 0, duration: 0.6 }, t)
        .to(nds[i + 1], { opacity: 1, duration: 0.3, ease: 'power2.out' }, t + 0.55);
      if (i === 0 && fails[0]) tl.to(fails[0], { opacity: 0.1, duration: 0.4 }, t + 0.7);
      if (i === 2 && fails[1]) tl.to(fails[1], { opacity: 0.1, duration: 0.4 }, t + 0.7);
    });
    /* outcome node heartbeat once the chain completes (outside the scrub) */
    var ring = nds[nds.length - 1] && nds[nds.length - 1].querySelector('circle');
    if (ring) {
      var pulse = gsap.to(ring, { attr: { r: 16 }, opacity: 0.25, duration: 1.1, ease: 'power1.out', repeat: -1, paused: true });
      ScrollTrigger.create({
        trigger: cp, start: 'top 80%', end: 'bottom top',
        pinnedContainer: PINS ? wrap : undefined, /* cp lives inside the pinned wrapper */
        onToggle: function (s) { s.isActive ? pulse.play() : pulse.pause(); }
      });
    }
  }

  /* ---------- magnetic CTAs (fine pointers only) ---------- */
  function magnets() {
    if (!FINE) return;
    $$('a[href="#access"], #access-form button, #nl-row button, a[href="#method"]').forEach(function (el) {
      el.classList.add('u-mag');
      var sx = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' }),
          sy = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        sx((e.clientX - r.left - r.width / 2) * 0.22);
        sy((e.clientY - r.top - r.height / 2) * 0.3);
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.45)' });
      });
    });
  }

  /* ---------- anchor navigation (ScrollToPlugin — plays nice with pins) ---------- */
  function anchors() {
    if (!window.ScrollToPlugin) return; /* native jump remains as fallback */
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href.length < 2) return;
        var t = $(href); if (!t) return;
        e.preventDefault();
        goTo(t);
        if (history.pushState) history.pushState(null, '', href);
      });
    });
  }

  /* ---------- forms → /api (Neon-backed serverless endpoints) ---------- */
  function postJSON(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); });
  }
  function forms() {
    var af = $('#access-form'), ad = $('#access-done'), aerr = $('#af-err');
    if (af && ad) af.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = af.querySelector('button[type="submit"]'), fd = new FormData(af);
      var label = btn.textContent;
      btn.disabled = true; btn.textContent = 'TRANSMITTING…';
      if (aerr) aerr.style.display = 'none';
      postJSON('/api/access', {
        name: fd.get('name'), firm: fd.get('firm'), role: fd.get('role'),
        jurisdiction: fd.get('jurisdiction'), matters: fd.get('matters') || '',
        consent: !!fd.get('consent')
      }).then(function () {
        gsap.to(af, {
          autoAlpha: 0, y: -14, duration: 0.35, ease: 'power2.in',
          onComplete: function () {
            af.style.display = 'none'; ad.style.display = 'flex';
            ScrollTrigger.refresh(); /* layout height changed under the triggers */
            gsap.from(ad, { autoAlpha: 0, y: 20, duration: 0.7, ease: 'power3.out' });
            var s = ad.querySelector('span'); if (s) scrambleTo(s, 'REQUEST LOGGED ✓', 0.9);
          }
        });
      }).catch(function () {
        btn.disabled = false; btn.textContent = label;
        if (aerr) { aerr.style.display = 'block'; scrambleTo(aerr, 'TRANSMISSION FAILED — PLEASE RETRY', 0.7); }
      });
    });
    var nr = $('#nl-row'), nd = $('#nl-done'), nerr = $('#nl-err');
    if (nr && nd) nr.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = nr.querySelector('button[type="submit"]'), label = btn.textContent;
      btn.disabled = true; btn.textContent = '…';
      if (nerr) nerr.style.display = 'none';
      postJSON('/api/subscribe', { email: nr.querySelector('input[type="email"]').value })
        .then(function () {
          gsap.to(nr, {
            autoAlpha: 0, duration: 0.3,
            onComplete: function () {
              nr.style.display = 'none'; nd.style.display = 'block';
              ScrollTrigger.refresh();
              scrambleTo(nd, nd.textContent, 1.0);
            }
          });
        }).catch(function () {
          btn.disabled = false; btn.textContent = label;
          if (nerr) { nerr.style.display = 'block'; scrambleTo(nerr, 'SUBSCRIPTION FAILED — PLEASE RETRY', 0.7); }
        });
    });
  }

  /* ---------- reduced-motion: everything lands, nothing moves ---------- */
  function finalStates() {
    forms();
    initRain(true);
    var pv = $('#panel-viz');
    if (pv) {
      gsap.set($$('[data-pnode]', pv), { opacity: 0.55 });
      gsap.set($$('[data-pactive]', pv), { opacity: 1, color: AC });
      gsap.set($$('[data-ring]', pv), { opacity: 0.9 });
      gsap.set($$('[data-plink]', pv), { strokeDashoffset: 0 });
      gsap.set('#pv-hub', { opacity: 1, color: AC });
      var r = $('#pv-roster'); if (r) r.textContent = 'CONTRACT LAW · FINANCE · GEOPOLITICS · SUSTAINABLE AGRICULTURE';
      var n = $('#pd-num'); if (n) n.textContent = '0.683';
      gsap.set('#pd-ci', { opacity: 1 });
    }
    $$('[data-lrow]').forEach(function (row) {
      var stt = row.querySelector('[data-lst]'), fin = row.getAttribute('data-final') === 'R';
      stt.textContent = fin ? 'REPLICATED ✓' : 'MISS · SIGNAL ✕';
      stt.style.color = fin ? AC : DIM;
    });
    var c = $('#lg-count'); if (c) c.textContent = '12,847,203';
    var rt = $('#lg-rate'); if (rt) rt.textContent = '91.7';
    gsap.set($$('[data-cseg]'), { strokeDashoffset: 0 });
    gsap.set($$('[data-cnode]'), { opacity: 1 });
    gsap.set($$('[data-cfail]'), { opacity: 0.1 });
  }

  /* ---------- init (gsap.matchMedia — gsap-core responsive/a11y pattern) ---------- */
  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', function () {
    initRain(false); chrome();
    /* set-pieces first, in document order, so their pin spacers are known
       before the page-wide reveal triggers are laid down */
    panel(); ledger(); cpath();
    reveals(); magnets(); anchors(); forms();
    ScrollTrigger.sort(); /* refresh top-to-bottom regardless of creation order */
    boot(function () {
      heroIntro();
      ScrollTrigger.sort(); ScrollTrigger.refresh();
      /* honor deep links that the boot lock deferred */
      var h = location.hash;
      if (/^#[A-Za-z][\w-]*$/.test(h)) { var t = $(h); if (t) goTo(t, 0.8); }
    });
  });
  mm.add('(prefers-reduced-motion: reduce)', function () { finalStates(); });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
