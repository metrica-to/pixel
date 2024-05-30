import PixelTracker from './pixel-tracker';

((m, t) => {
  const currentScriptUrl = import.meta.url;
  const scripts = t.getElementsByTagName('script');
  let currentScript = null;

  for (let script of scripts) {
    if (script.src === currentScriptUrl) {
      currentScript = script;
      break;
    }
  }

  const ds = currentScript?.dataset;

  if (!ds || !ds.siteId) {
    console.error(
      'Metrica-Pixel: You must have a valid data-siteid in your script tag.'
    );
    return;
  }

  let externalReferrer = '';
  const ref = t.referrer;
  if (ref && ref.indexOf(`${m.location.protocol}//${m.location.host}`) == 0) {
    externalReferrer = ref;
  }

  const path = m.location.pathname;
  console.log('Path', path);
  console.log('data-siteid', ds.siteId);

  let pixelTracker = new PixelTracker(ds.siteId, externalReferrer);
  m._mtr = m._mtr || pixelTracker;
  pixelTracker.page(path);

  const _history = window.history;
  if (_history.pushState) {
    const originalFn = _history['pushState'];
    _history.pushState = function () {
      originalFn.apply(this, arguments);
      pixelTracker.page(m.location.pathname);
    };

    window.addEventListener('popstate', () => {
      pixelTracker.page(m.location.pathname);
    });
  }

  m.addEventListener(
    'hashchange',
    () => {
      pixelTracker.page(t.location.hash);
    },
    false
  );
  console.log('Build OK');
})(window, document);
