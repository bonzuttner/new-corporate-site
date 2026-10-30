const root = document.documentElement;
const state = window.BZDisplay;
const hero = document.querySelector('#bz-hero');
const modern = document.querySelector('#modern');
const retro = document.querySelector('.retro-entry');
const header = document.querySelector('.header');
const enter = document.querySelector('#enter-modern');
const status = document.querySelector('#entry-status');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let busy = false;
let revisiting = false;
let currentScene = 0;
let returnScene = 0;

function setMode(mode) {
  root.dataset.display = mode;
  for (const el of [retro, header]) {
    if (el) { el.hidden = mode === 'modern'; el.inert = mode === 'modern'; }
  }
  modern.hidden = mode !== 'modern';
  modern.inert = mode !== 'modern';
  hero.manual = mode !== 'modern';
}
setMode(root.dataset.display);

const ready = import('/components/bonzuttner-hero/bonzuttner-hero.js?v='+(root.lang==='en'?'20261028':'20261028-ja-copy2')).then(async () => {
  hero.manual = root.dataset.display !== 'modern';
  const sheet = hero.shadowRoot.querySelector('link');
  if (!sheet.sheet) await new Promise((resolve, reject) => {
    sheet.addEventListener('load', resolve, { once: true });
    sheet.addEventListener('error', reject, { once: true });
  });
  if (new URLSearchParams(location.search).has('still')) hero.setAttribute('reduced-motion', 'true');
});
// Decode the existing sprites before covering the entrance. Nothing is generated.
const assetNames = ['greeting-poses', 'iskandar-poses', 'city-parts', 'motorcycle-phone', 'rider-bike-layers', 'space-parts'];
let prepared;
function prepare() {
  if (!prepared) prepared = Promise.all(assetNames.map(name => {
    const img = new Image();
    img.src = `/components/bonzuttner-hero/assets/${name}.png`;
    return img.decode();
  })).catch(error => { prepared = null; throw error; });
  return prepared;
}
// Warm the cache without blocking the retro UI; a click retries a failed request.
prepare().catch(() => {});
hero.addEventListener('hero-scene-change', e => { currentScene = e.detail.scene; });

function cleanAnchor(hash) {
  history.replaceState(null, '', `${location.pathname}${hash}`);
}
function focusHero() {
  hero.shadowRoot?.querySelector('h1')?.focus({ preventScroll: true });
}
function landAtStart() {
  // Do not call goToScene(0): it intentionally advances 35% into a scene.
  hero.manual = true;
  hero.summary = false;
  hero.progress = 0;
  hero.scene = 0;
  hero.render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  hero.manual = false;
  currentScene = 0;
}
async function showModern(target = 'modern', { focus = true, restoreScene = false } = {}) {
  await ready;
  state.choose();
  setMode('modern');
  cleanAnchor(`#${target}`);
  if (target === 'services') {
    document.querySelector('#services').scrollIntoView({ behavior: 'instant' });
    if (focus) document.querySelector('#services-title').focus({ preventScroll: true });
  } else {
    if (restoreScene) hero.goToScene(returnScene);
    else landAtStart();
    if (focus) focusHero();
  }
}

async function transform() {
  if (busy) return;
  if (revisiting) { await showModern('modern', { restoreScene: true }); return; }
  busy = true;
  enter.disabled = true;
  status.textContent = '未来の準備をしています…';
  let overlay;
  try {
    await Promise.all([ready, prepare()]);
    status.textContent = '';
    if (motion.matches || hero.reduced) {
      await showModern();
      return;
    }
    const bounds = retro.querySelector('img').getBoundingClientRect();
    overlay = document.createElement('div');
    overlay.className = 'morph-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="morph-color"></div><div class="morph-frame"><img src="/assets/hero-monochrome.png" alt=""></div><div class="morph-dots"></div><span class="morph-logo" dir="ltr">BonZuttner</span>';
    overlay.style.setProperty('--frame-left', `${bounds.left}px`);
    overlay.style.setProperty('--frame-top', `${bounds.top}px`);
    overlay.style.setProperty('--frame-width', `${bounds.width}px`);
    overlay.style.setProperty('--frame-height', `${bounds.height}px`);
    document.body.append(overlay);
    root.classList.add('is-transforming');
    header.inert = retro.inert = true;
    // Only the cover is fixed/transformed. The hero's sticky ancestry is untouched.
    await new Promise(resolve => setTimeout(resolve, 940));
    await showModern('modern', { focus: false });
    modern.inert = true;
    await new Promise(resolve => setTimeout(resolve, 860));
    focusHero();
  } catch {
    status.textContent = '素材を読み込めませんでした。もう一度お試しください。サービスは先にご覧いただけます。';
  } finally {
    overlay?.remove();
    root.classList.remove('is-transforming');
    setMode(root.dataset.display);
    if (root.dataset.display === 'modern') focusHero();
    enter.disabled = false;
    busy = false;
  }
}
enter?.addEventListener('click', transform);
document.querySelector('#show-retro')?.addEventListener('click', () => {
  if (busy) return;
  returnScene = currentScene;
  revisiting = true;
  setMode('retro');
  enter.textContent = 'モダン表示へ戻る';
  retro.querySelector('.down-note').textContent = 'レトロ表示を、ちょっと寄り道。';
  window.scrollTo({ top: 0, behavior: 'instant' });
  retro.querySelector('h1').focus({ preventScroll: true });
});

document.querySelectorAll('a[href="#services"]').forEach(link => link.addEventListener('click', async e => {
  e.preventDefault();
  if (busy) return;
  await showModern('services');
}));
document.querySelectorAll('[data-language]').forEach(link => link.addEventListener('click', () => {
  state.choose();
  const atServices = root.dataset.display === 'modern' && document.querySelector('#services').getBoundingClientRect().top < innerHeight * .55;
  const destination = atServices ? 'services' : 'modern';
  const scene = root.dataset.display === 'modern' ? currentScene : 0;
  link.href = `/${link.dataset.language}/${atServices ? '' : `?scene=${scene}${hero.summary ? '&summary=1' : ''}${hero.reduced ? '&still=1' : ''}`}#${destination}`;
}));

async function restoreFromURL(focus = false) {
  const wasRetro = modern.hidden;
  if (state.read() || ['#modern', '#news', '#services'].includes(location.hash)) {
    state.choose();
    setMode('modern');
    await ready;
    if (location.hash === '#news') {
      document.querySelector('#news').scrollIntoView({ behavior: 'instant' });
      if (focus) { const title = document.querySelector('#top-news-title'); title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true }); }
    } else if (location.hash === '#services') {
      document.querySelector('#services').scrollIntoView({ behavior: 'instant' });
      if (focus) document.querySelector('#services-title').focus({ preventScroll: true });
    } else {
      const params = new URLSearchParams(location.search);
      if (params.get('summary') === '1') hero.skip();
      else if (params.has('scene')) hero.goToScene(Math.max(0, Math.min(4, Number(params.get('scene')) || 0)));
      else if (wasRetro || !location.hash || location.hash === '#modern') landAtStart();
      if (focus) focusHero();
    }
  }
}
addEventListener('bz:restore-modern', () => { if (!busy) restoreFromURL(); });
addEventListener('hashchange', () => restoreFromURL(true));
addEventListener('popstate', () => restoreFromURL());
await ready;
await restoreFromURL();
