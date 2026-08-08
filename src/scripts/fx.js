// Site-wide effects — faithful port of the design export's runtime script.
// Loader timing, scroll progress bar, back-to-top, watermark parallax,
// 3D card tilt, reveal-on-scroll with per-group stagger, and stat count-up.

function animateStats() {
  document.querySelectorAll('.statn').forEach((el) => {
    const m = el.textContent.match(/^(\d+)(.*)$/);
    if (!m) return;
    const target = +m[1], suf = m[2], start = target > 1000 ? target - 80 : 0;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now(), dur = 1400;
        const tick = (n) => {
          const p = Math.min(1, (n - t0) / dur), ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(start + (target - start) * ease) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });
}

function initReveal() {
  animateStats();
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = [...document.querySelectorAll('.bcard,.bfeat,.tmcard,.tli,.pq,.pstep,.card,.rev,.why,.vcard,.scard,.step,.stat,.cf,.faq,.city,.badge,.tcard,.sec .eb,.sec .h2,.sec .sub,article .eb,article .h2,article .bodyp,.cki,article img,article .ph2,.ctap,.cta .eb,.cta .btn')];
  const groups = new Map();
  els.forEach((el) => {
    el.classList.add('rv');
    const p = el.parentElement;
    const n = groups.get(p) || 0;
    el.style.transitionDelay = Math.min(n, 7) * 85 + 'ms';
    groups.set(p, n + 1);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const el = en.target;
        el.classList.add('in');
        io.unobserve(el);
        setTimeout(() => { el.classList.remove('rv', 'in'); el.style.transitionDelay = ''; }, 1500);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  els.forEach((el) => io.observe(el));
}

function initFx() {
  if (document.querySelector('.sprog')) return;
  document.documentElement.style.scrollBehavior = 'smooth';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar = document.createElement('div'); bar.className = 'sprog'; document.body.appendChild(bar);
  const btt = document.createElement('button'); btt.className = 'btt'; btt.textContent = '↑'; btt.title = 'Back to top';
  btt.onclick = () => window.scrollTo({ top: 0 }); document.body.appendChild(btt);
  let tick = false;
  const onScroll = () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      tick = false;
      const d = document.documentElement;
      bar.style.width = (d.scrollTop / ((d.scrollHeight - d.clientHeight) || 1) * 100) + '%';
      btt.classList.toggle('show', d.scrollTop > 600);
      if (!reduce) document.querySelectorAll('.wm,.wm2,.wmD,.ftwm').forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        el.style.transform = 'translateY(' + ((r.top - innerHeight * 0.5) * -0.06).toFixed(1) + 'px)';
      });
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (!reduce) document.addEventListener('mousemove', (e) => {
    const c = e.target && e.target.closest ? e.target.closest('.card') : null;
    document.querySelectorAll('.card').forEach((el) => { if (el !== c && el.style.transform) el.style.transform = ''; });
    if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = 'perspective(900px) translateY(-6px) rotateX(' + (-y * 6).toFixed(2) + 'deg) rotateY(' + (x * 6).toFixed(2) + 'deg)';
  }, { passive: true });
}

initFx();

// Loader timing (as designed): home = logo pop, message at 700ms, fade at
// 3000ms, gone at 3650ms; inner pages = fade at 2800ms, gone at 3450ms.
// Reveal choreography starts once the loader leaves.
const loader = document.querySelector('.loader');
if (loader) {
  const home = loader.dataset.variant === 'home';
  if (home) setTimeout(() => loader.classList.add('lmshow'), 700);
  setTimeout(() => loader.classList.add('ldone'), home ? 3000 : 2800);
  setTimeout(() => { loader.remove(); initReveal(); }, home ? 3650 : 3450);
} else {
  initReveal();
}
