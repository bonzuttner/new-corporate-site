// Runs synchronously in <head>, before either presentation can be painted.
(() => {
  const key = 'bonzuttner.display.v1';
  let chosen = false;
  const read = () => {
    try { chosen = chosen || sessionStorage.getItem(key) === 'modern'; } catch {}
    return chosen;
  };
  const choose = () => {
    chosen = true;
    try { sessionStorage.setItem(key, 'modern'); } catch {}
  };
  const direct = ['#modern', '#news', '#services'].includes(location.hash);
  if (document.documentElement.lang !== 'ja' || direct) choose();
  document.documentElement.dataset.display = read() ? 'modern' : 'retro';
  window.BZDisplay = { read, choose };
  // bfcache restores the old DOM. Reconcile before the next visible paint.
  addEventListener('pageshow', event => {
    if (event.persisted && read()) {
      document.documentElement.dataset.display = 'modern';
      dispatchEvent(new Event('bz:restore-modern'));
    }
  });
})();
