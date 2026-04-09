/**
 * Overlay de carga entre pantallas (logo assets/descarga.png).
 * - Visible al inicio hasta DOMContentLoaded
 * - Al navegar: parchea assign/replace y enlaces internos .html
 */
(function () {
  var LOADER_ID = 'ciPageLoader';
  var NAV_DELAY_MS = 70;

  function ensureLoader() {
    var el = document.getElementById(LOADER_ID);
    if (el) return el;
    el = document.createElement('div');
    el.id = LOADER_ID;
    el.className = 'page-loader';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-label', 'Cargando');
    el.innerHTML =
      '<div class="page-loader-inner">' +
      '<img src="assets/descarga.png" alt="" class="page-loader-logo" width="200" height="80" decoding="async">' +
      '<div class="page-loader-ring" aria-hidden="true"></div>' +
      '</div>';
    if (document.body) document.body.insertBefore(el, document.body.firstChild);
    return el;
  }

  function showLoader() {
    var el = ensureLoader();
    el.classList.remove('page-loader--hide');
    el.style.display = 'flex';
  }

  function hideLoader() {
    var el = document.getElementById(LOADER_ID);
    if (!el) return;
    el.classList.add('page-loader--hide');
    setTimeout(function () {
      if (el.classList.contains('page-loader--hide')) el.style.display = 'none';
    }, 400);
  }

  window.showPageLoader = showLoader;
  window.hidePageLoader = hideLoader;

  function patchLocation() {
    if (window.__ciNavPatched) return;
    window.__ciNavPatched = true;
    var loc = window.location;
    var origReplace = loc.replace.bind(loc);
    var origAssign = loc.assign.bind(loc);
    loc.replace = function (url) {
      showLoader();
      setTimeout(function () {
        origReplace(String(url));
      }, NAV_DELAY_MS);
    };
    loc.assign = function (url) {
      showLoader();
      setTimeout(function () {
        origAssign(String(url));
      }, NAV_DELAY_MS);
    };
  }

  function shouldInterceptAnchor(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return false;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('javascript:') === 0) return false;
    try {
      var u = new URL(href, window.location.href);
      if (u.origin !== window.location.origin) return false;
      var path = u.pathname || '';
      if (u.hash && !u.search && path === window.location.pathname) return false;
      if (path.endsWith('.html') || path === '/' || /\/$/.test(path)) return true;
    } catch (e) {
      return false;
    }
    return false;
  }

  function onDocClick(e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a || !shouldInterceptAnchor(a)) return;
    e.preventDefault();
    window.location.assign(a.href);
  }

  function init() {
    if (window.__ciLoaderInit) return;
    window.__ciLoaderInit = true;
    patchLocation();
    ensureLoader();
    document.addEventListener('click', onDocClick, true);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        requestAnimationFrame(function () {
          hideLoader();
        });
      });
    } else {
      requestAnimationFrame(function () {
        hideLoader();
      });
    }
  }

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
