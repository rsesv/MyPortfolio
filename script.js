(function () {
  // Skip all animation if the visitor asked their device for less motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Soft light that follows the mouse (computers only)
  if (window.matchMedia('(hover: hover)').matches) {
    var ticking = false;
    window.addEventListener('mousemove', function (e) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        document.documentElement.style.setProperty('--mx', e.clientX + 'px');
        document.documentElement.style.setProperty('--my', e.clientY + 'px');
        ticking = false;
      });
    });
  }

  if (!('IntersectionObserver' in window)) return;

  var root = document.documentElement;
  root.classList.add('anim');

  // 1. Hero: items slide in one after another when the page loads
  var hero = Array.prototype.slice.call(document.querySelectorAll('.hero > *'));
  hero.forEach(function (el, i) {
    setTimeout(function () { el.classList.add('in'); }, 150 + i * 160);
  });

  // 2. Sections: content fades in as you scroll down to it
  var targets = document.querySelectorAll('section h2, .about > *, .skills > div, .project, #contact p, #contact .mail');
  var reveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  targets.forEach(function (el) { el.classList.add('rv'); reveal.observe(el); });

  // 3. Menu: underline the link of the section you are viewing
  var links = document.querySelectorAll('nav a');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) {
        if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });
})();
