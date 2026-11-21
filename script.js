(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var page = location.pathname.split('/').pop() || 'index.html';
  var ic = function (n, s) { return '<svg width="' + s + '" height="' + s + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };

  // ---------- Shared components (one source of truth for every page) ----------
  var NAV = [['Home', 'index.html'], ['Presentations/Workshops', 'workshops.html'], ['Programs', 'programs.html'], ['Meet Larry', 'meet-larry.html'], ['Reviews & Results', 'reviews.html'], ['Contact', 'contact.html']];
  var MORE = [['Our Difference', 'index.html#difference'], ['Videos', 'index.html#videos'], ['Ask Larry', 'contact.html']];
  var short = { 'Presentations/Workshops': 'Presentations' };
  var brand = '<a class="brand-logo" href="index.html" aria-label="Larry Bell home"><span class="brand-mark photo" role="img" aria-label="Larry Bell speaking on stage"></span><span><span class="brand-tag">Somebody Needs You!</span><span class="brand-name">Larry Bell</span><span class="brand-sub">National Presenter · Educational Consultant · Author</span></span></a>';
  function cur(h) { return h === page ? ' aria-current="page"' : ''; }
  var headerHTML =
    '<header class="site-header"><div class="container header-inner">' + brand +
    '<nav class="desktop-nav" aria-label="Main navigation">' +
    NAV.map(function (n) { return '<a class="nav-link" href="' + n[1] + '"' + cur(n[1]) + '>' + (short[n[0]] || n[0]) + '</a>'; }).join('') +
    '<details class="nav-more"><summary class="nav-link">More ' + ic('chev', 13) + '</summary><div class="nav-dropdown">' +
    MORE.map(function (n) { return '<a class="nav-link" href="' + n[1] + '">' + n[0] + '</a>'; }).join('') + '</div></details></nav>' +
    '<div class="header-actions"><a class="header-phone" href="tel:7039690156" aria-label="Call Larry at 703.969.0156">' + ic('phone', 16) + '<span>703.969.0156</span></a>' +
    '<a class="header-book btn btn-red btn-shine" href="contact.html">Book Larry ' + ic('arrow', 15) + '</a>' +
    '<a class="mobile-call" href="tel:7039690156" aria-label="Call Larry">' + ic('phone', 19) + '</a>' +
    '<button type="button" class="mobile-menu-button" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">' + ic('menu', 20) + '</button></div></div>' +
    '<button class="drawer-backdrop" id="backdrop" aria-label="Close menu" tabindex="-1"></button>' +
    '<nav id="drawer" class="mobile-drawer" aria-label="Mobile navigation" aria-hidden="true"><div class="drawer-top"><span class="eyebrow" style="color:var(--gold)">Explore</span><button type="button" id="closeBtn" aria-label="Close menu">' + ic('x', 24) + '</button></div>' +
    NAV.concat(MORE).map(function (n, i) { return '<a class="drawer-link" href="' + n[1] + '" style="--i:' + i + '">' + n[0] + ic('arrow', 17) + '</a>'; }).join('') +
    '<div class="drawer-actions"><a href="contact.html" class="btn btn-red btn-shine">Book Larry ' + ic('arrow', 18) + '</a><a href="tel:7039690156" class="drawer-call">' + ic('phone', 18) + ' Call Larry</a></div></nav>' +
    '<div class="scroll-progress" aria-hidden="true"><span id="progress"></span></div></header>';
  var footerHTML =
    '<footer><div class="container"><div class="footer-grid"><div>' + brand + '<p class="f-about">Empowering educators to bring energy, purpose, and hope to the work that matters.</p></div>' +
    '<div><p class="eyebrow gold">Contact</p><address>Empowering Presentations Inc.<br>12689 Crossbow Dr.<br>Manassas, VA 20112</address><a href="tel:7039690156" class="flink">Call 703.969.0156</a><span class="flink">Fax 866.590.3767</span><a href="mailto:larry@larry-bell.com" class="flink">larry@larry-bell.com</a><p class="f-serve">Serving schools nationwide including California, Tennessee, Texas, Louisiana, Arkansas, and Oklahoma.</p></div>' +
    '<div><p class="eyebrow gold">Explore</p>' + NAV.concat(MORE).map(function (n) { return '<a class="flink" href="' + n[1] + '">' + n[0] + '</a>'; }).join('') + '</div>' +
    '<div><p class="eyebrow gold">Connect with us</p><div class="social-links">' +
    '<a href="https://www.facebook.com/LarryiBell" target="_blank" rel="noreferrer" aria-label="Larry Bell on Facebook">' + ic('fb', 16) + '</a>' +
    '<a href="https://www.youtube.com/@larrybelleducation/videos" target="_blank" rel="noreferrer" aria-label="Larry Bell on YouTube">' + ic('yt', 18) + '</a>' +
    '<a href="https://linkedin.com/in/larrybellspeaker" target="_blank" rel="noreferrer" aria-label="Larry Bell on LinkedIn">' + ic('in', 16) + '</a>' +
    '<a href="https://x.com/GoodGuhGaMooGah" target="_blank" rel="noreferrer" aria-label="Larry Bell on X">' + ic('x2', 16) + '</a></div>' +
    '<p class="serif f-tag">Somebody Needs You!</p><a href="contact.html" class="btn btn-red f-btn">Bring Larry to your school</a></div></div>' +
    '<div class="f-bottom"><span>© 2026 Empowering Presentations Inc. All rights reserved.</span><a href="#top">Back to top ↑</a></div></div></footer>' +
    '<a href="contact.html" class="mobile-float-book">Book Larry ' + ic('arrow', 16) + '</a>' +
    '<button type="button" id="toTop" class="to-top" aria-label="Back to top">' + ic('up', 19) + '</button><div id="toast" class="toast" role="status" aria-live="polite" hidden></div>';
  document.body.insertAdjacentHTML('afterbegin', '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></symbol><symbol id="i-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14m7-7-7 7-7-7"/></symbol><symbol id="i-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7M12 19V5"/></symbol><symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></symbol><symbol id="i-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></symbol><symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></symbol><symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></symbol><symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></symbol><symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7"/></symbol><symbol id="i-fb" viewBox="0 0 320 512"><path fill="currentColor" d="M80 299.3V512h116V299.3h86.5l18-97.8H196v-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4.4 37 1.2V7.9C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4v42.1H14v97.8z"/></symbol><symbol id="i-yt" viewBox="0 0 576 512"><path fill="currentColor" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6V175.2l142.7 81.2z"/></symbol><symbol id="i-in" viewBox="0 0 448 512"><path fill="currentColor" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3z"/></symbol><symbol id="i-x2" viewBox="0 0 512 512"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"/></symbol></defs></svg>' + headerHTML);
  document.body.id = 'top';
  var main = $('main'); main.insertAdjacentHTML('afterend', footerHTML);

  var header = $('.site-header'), progress = $('#progress'), toTop = $('#toTop'), hero = $('.hero-image'), float = $('.mobile-float-book');

  // ---------- Scroll state ----------
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 40);
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    toTop.classList.toggle('show', y > 650);
    if (!reduce && hero) hero.style.setProperty('--shift', Math.min(y * 0.05, 30) + 'px');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  // ---------- Drawer + dropdown ----------
  var btn = $('#menuBtn'), drawer = $('#drawer'), backdrop = $('#backdrop'), more = $('.nav-more');
  function setMenu(open) {
    drawer.classList.toggle('open', open); backdrop.classList.toggle('visible', open);
    document.body.classList.toggle('menu-open', open);
    drawer.setAttribute('aria-hidden', String(!open)); btn.setAttribute('aria-expanded', String(open));
    backdrop.tabIndex = open ? 0 : -1;
    if (open) $('#closeBtn').focus(); else btn.focus({ preventScroll: true });
  }
  btn.addEventListener('click', function () { setMenu(!drawer.classList.contains('open')); });
  $('#closeBtn').addEventListener('click', function () { setMenu(false); });
  backdrop.addEventListener('click', function () { setMenu(false); });
  $$('.drawer-link, .drawer-actions a').forEach(function (a) {
    a.addEventListener('click', function () {
      drawer.classList.remove('open'); backdrop.classList.remove('visible');
      document.body.classList.remove('menu-open'); btn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (drawer.classList.contains('open')) setMenu(false);
    more.open = false;
  });
  document.addEventListener('click', function (e) { if (!more.contains(e.target)) more.open = false; });
  $$('.nav-dropdown a').forEach(function (a) { a.addEventListener('click', function () { more.open = false; }); });

  // ---------- Reveal ----------
  var sections = $$('main > section'), cards = $$('main .card, main .pcard, .cres-card');
  var seen = new Map();
  sections.forEach(function (s) { s.classList.add('reveal-section'); });
  cards.forEach(function (c) {
    var p = c.parentElement, i = seen.get(p) || 0; seen.set(p, i + 1);
    c.style.setProperty('--d', Math.min(i, 5) * 85 + 'ms'); c.classList.add('reveal-card');
  });
  var targets = sections.concat(cards);
  if (reduce || !('IntersectionObserver' in window)) targets.forEach(function (t) { t.classList.add('revealed'); });
  else {
    var obs = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } }); }, { threshold: 0.08 });
    targets.forEach(function (t) { obs.observe(t); });
    sections[0].classList.add('revealed');
    var contact = $('#contact');
    if (float && contact) new IntersectionObserver(function (e) { float.classList.toggle('hide', e[0].isIntersecting); }, { threshold: .05 }).observe(contact);
  }

  // ---------- Marquee + count-up ----------
  var pills = $('#pills');
  if (pills) $$('.tag', pills).forEach(function (t) { var c = t.cloneNode(true); c.setAttribute('aria-hidden', 'true'); pills.appendChild(c); });
  var years = $('#years');
  if (years && !reduce) {
    var t0 = performance.now();
    (function tick(now) { var p = Math.min((now - t0) / 1400, 1); years.textContent = Math.round(20 * (1 - Math.pow(1 - p, 3))) + '+'; if (p < 1) requestAnimationFrame(tick); })(t0);
  }

  // ---------- Hero canvas: rising gold light that links up like a network of teachers ----------
  var cv = $('#fx');
  if (cv && !reduce) {
    var g = cv.getContext('2d'), W, H, P = [], dpr = Math.min(window.devicePixelRatio || 1, 2), M = { x: -9999, y: -9999 }, on = true, host = cv.parentNode;
    var mk = function (init) { return { x: Math.random() * W, y: init ? Math.random() * H : H + 10, r: (Math.random() * 1.9 + .6) * dpr, v: (Math.random() * .45 + .15) * dpr, d: Math.random() * 6.28, gold: Math.random() < .72 }; };
    var size = function () {
      var r = host.getBoundingClientRect(); W = cv.width = r.width * dpr; H = cv.height = r.height * dpr;
      cv.style.width = r.width + 'px'; cv.style.height = r.height + 'px';
      P = []; for (var i = 0, n = Math.min(Math.round(r.width * r.height / 13000), 110); i < n; i++) P.push(mk(true));
    };
    size(); window.addEventListener('resize', size);
    host.addEventListener('mousemove', function (e) {
      var r = host.getBoundingClientRect(); M.x = (e.clientX - r.left) * dpr; M.y = (e.clientY - r.top) * dpr;
      if (hero) { hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(3)); hero.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(3)); }
    });
    host.addEventListener('mouseleave', function () { M.x = M.y = -9999; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(host);
    (function frame() {
      requestAnimationFrame(frame); if (!on || document.hidden) return;
      g.clearRect(0, 0, W, H);
      for (var i = 0; i < P.length; i++) {
        var p = P[i]; p.y -= p.v; p.d += .012; p.x += Math.sin(p.d) * .35 * dpr;
        var dx = M.x - p.x, dy = M.y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 170 * dpr) { p.x += dx * .006; p.y += dy * .006; }
        if (p.y < -10) P[i] = mk(false);
        var a = Math.min(1, p.y / (H * .35)) * .9;
        g.fillStyle = p.gold ? 'rgba(255,201,60,' + a + ')' : 'rgba(80,175,235,' + a + ')';
        g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill();
        for (var j = i + 1; j < P.length; j++) {
          var q = P[j], lx = p.x - q.x, ly = p.y - q.y, ld = lx * lx + ly * ly, lim = 120 * dpr;
          if (ld < lim * lim) { g.strokeStyle = 'rgba(255,201,60,' + (1 - Math.sqrt(ld) / lim) * .22 * a + ')'; g.lineWidth = dpr * .7; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(q.x, q.y); g.stroke(); }
        }
      }
    })();
  }

  // ---------- Inquiry form ----------
  if ($('#inquiry')) {
  var form = $('#inquiry'), toast = $('#toast'), timer;
  var rules = {
    name: [function (v) { return v.trim().length > 0; }, 'Enter your name.'],
    school: [function (v) { return v.trim().length > 0; }, 'Enter your school or district.'],
    email: [function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }, 'Enter a valid email address.'],
    message: [function (v) { return v.trim().length > 0; }, 'Add a short message.']
  };
  function check(el) {
    var r = rules[el.name]; if (!r) return true;
    var ok = r[0](el.value), msg = el.parentNode.querySelector('.err');
    el.setAttribute('aria-invalid', String(!ok));
    if (msg) msg.textContent = ok ? '' : r[1];
    return ok;
  }
  $$('input, textarea', form).forEach(function (el) {
    el.addEventListener('blur', function () { check(el); });
    el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = $$('input, textarea', form).filter(function (el) { return !check(el); });
    if (bad.length) { bad[0].focus(); return; }
    var d = {}; $$('input, textarea', form).forEach(function (el) { d[el.name] = el.value.trim(); });
    var body = 'Name: ' + d.name + '\nSchool/District: ' + d.school + '\nEmail: ' + d.email +
      '\nPhone: ' + (d.phone || '-') + '\nPreferred date: ' + (d.date || '-') + '\n\n' + d.message;
    window.location.href = 'mailto:Larry@Larry-Bell.com?subject=' + encodeURIComponent('Inquiry from ' + d.school) + '&body=' + encodeURIComponent(body);
    toast.textContent = 'Thank you! Your email app is opening with your inquiry ready to send to Larry@Larry-Bell.com. If it doesn’t open, please call 703.969.0156.';
    toast.hidden = false; clearTimeout(timer);
    timer = setTimeout(function () { toast.hidden = true; }, 7000);
    form.reset();
  });
  }
})();
