import PixelTracker from './pixel-tracker';

((m, t) => {
  const path = m.location.pathname;
  console.log('Path', path);
  let pixelTracker = new PixelTracker();
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
