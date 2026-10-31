const lang = document.documentElement.lang || 'ja';

const pages = window.BZTranslations["dx-ai.0"];

const t = pages[lang] || pages.ja;
const sweatingTitle = lang === 'ja' ? '<span class="dx-sweating-letter">汗</span>をかく。' : t.hero.title[1];
const toolkitLabels = lang === 'ar'
  ? ['الإدخال والنسخ', 'البحث والسؤال', 'التسجيل والتقارير']
  : lang === 'en' ? ['INPUT & RE-ENTRY', 'SEARCH & QUESTIONS', 'RECORDS & REPORTS']
  : ['入力・転記', '探す・聞く', '記録・報告'];
const languageLinks = [['ja', '日本語'], ['en', 'English'], ['ar', 'العربية']].map(([code, label]) => `<a href="/${code}/dx-ai/" lang="${code}" ${code === lang ? 'aria-current="page"' : ''}>${label}</a>`).join('');
const caseUI = lang === 'ar'
  ? { read: 'التفاصيل', close: 'إغلاق', previous: 'السابق', next: 'التالي', label: 'نماذج من العمل' }
  : lang === 'en'
  ? { read: 'Read the case', close: 'Close', previous: 'Previous', next: 'Next', label: 'Case studies' }
  : { read: '詳しく読む', close: '閉じる', previous: '前へ', next: '次へ', label: '伴走支援の実績' };
const caseItem = (item, index) => `<article class="case-slide"><p class="case-index">CASE ${String(index + 1).padStart(2, '0')}</p><p class="case-client">${item.client}</p><h3>${item.title}</h3><p class="case-kind">${item.kind}</p><button type="button" class="case-open" data-case="${index}" aria-haspopup="dialog">${caseUI.read}<span class="case-plus" aria-hidden="true">＋</span></button></article>`;

if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML = `
  <a class="skip" href="#main">${lang === 'ar' ? 'انتقل إلى المحتوى' : lang === 'en' ? 'Skip to content' : '本文へ'}</a>
  <header class="service-nav">
    <a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a>
    <nav aria-label="${lang === 'ar' ? 'التنقل الرئيسي' : lang === 'en' ? 'Main navigation' : 'メインナビゲーション'}">${t.nav.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</nav>
    <div class="service-actions"><div class="service-languages" aria-label="${lang === 'ar' ? 'اللغة' : lang === 'en' ? 'Language' : '言語'}">${languageLinks}</div><a class="service-consult" href="#contact">${t.consult} <span aria-hidden="true">↗</span></a></div>
  </header>
  <main id="main">
    <section class="dx-hero"><div class="dx-hero-copy"><p class="service-eyebrow">${t.hero.eyebrow}</p><h1><span>${t.hero.title[0]}</span><span class="dx-sweat">${sweatingTitle}</span></h1><p>${t.hero.lead}</p></div><div class="dx-hero-mark" aria-hidden="true"><span>LISTEN</span><i></i><span>UNTANGLE</span><i></i><span>MOVE</span><b>${t.hero.note}</b></div></section>
    <section class="reality"><header><p class="service-eyebrow">${t.reality.eyebrow}</p><h2>${t.reality.title}</h2></header><div class="reality-copy">${t.reality.body.map((paragraph, index) => `<p class="${index === t.reality.body.length - 1 ? 'reality-last' : ''}">${paragraph}</p>`).join('')}</div></section>
    <section class="principles"><header><p class="service-eyebrow">${t.principles.eyebrow}</p><h2>${t.principles.title}</h2></header><ol>${t.principles.items.map(item => `<li><span>${item.no}</span><div><h3>${item.title}</h3><p class="principle-sub">${item.sub}</p></div><div class="principle-body"><p>${item.body}</p>${item.emphasis ? `<strong>${item.emphasis}</strong>` : ''}</div></li>`).join('')}</ol></section>
    <section class="technology" aria-labelledby="toolkit-heading"><header class="toolkit-header"><p class="service-eyebrow">${t.technology.eyebrow}</p><h2 id="toolkit-heading">${t.technology.title}</h2><p class="toolkit-intro">${t.technology.body}</p></header><div class="toolkit-board">${t.technology.items.map(([problem, support, tools], index) => `<article class="toolkit-note"><p class="toolkit-label">${toolkitLabels[index]}</p><h3>${problem}</h3><p class="toolkit-support">${support}</p><ul class="toolkit-tools" aria-label="${lang === 'ar' ? 'الوسائل' : lang === 'en' ? 'Possible approaches' : '使える手段'}">${tools.split(' / ').map(tool => `<li>${tool}</li>`).join('')}</ul></article>`).join('')}</div></section>
    <section class="fde"><div><p class="service-eyebrow">${t.fde.eyebrow}</p><h2>${t.fde.title}</h2></div><div class="fde-copy"><p>${t.fde.body[0]}</p><p>${t.fde.body[1]}</p><div class="fde-map">${t.fde.nodes.map((node, index) => `<span>${node}</span>${index < 2 ? '<i>↕</i>' : ''}`).join('')}</div></div></section>
    <section class="cases" aria-labelledby="cases-heading"><header><p class="service-eyebrow">${t.cases.eyebrow}</p><h2 id="cases-heading">${t.cases.title}</h2><small>${t.cases.note}</small></header><div class="case-track" role="region" aria-label="${caseUI.label}" tabindex="0">${t.cases.items.map(caseItem).join('')}</div><div class="case-controls"><span class="case-position" aria-live="polite" aria-atomic="true">01 / ${String(t.cases.items.length).padStart(2, '0')}</span><div><button type="button" class="case-previous" disabled>${caseUI.previous}</button><button type="button" class="case-next">${caseUI.next}</button></div></div></section>
    <section class="dx-process"><header><p class="service-eyebrow">${t.process.eyebrow}</p><h2>${t.process.title}</h2><p>${t.process.lead}</p></header><ol>${t.process.steps.map(([no, title, body]) => `<li><p>${no}</p><h3>${title}</h3><span>${body}</span></li>`).join('')}</ol></section>
    <section class="graduation"><div><p class="service-eyebrow">${t.graduation.eyebrow}</p><h2>${t.graduation.title}</h2></div><div>${t.graduation.body.map((paragraph, index) => `<p class="graduation-p${index + 1}">${paragraph}</p>`).join('')}</div></section>
    <section id="contact" class="service-contact"><p>${t.cta.eyebrow}</p><h2>${t.cta.title}</h2><div><p>${t.cta.body}</p><a href="mailto:info@bonzuttner.com">${t.cta.action} <span aria-hidden="true">→</span></a></div></section>
  </main>
  <dialog class="case-dialog" aria-labelledby="case-dialog-title" aria-describedby="case-dialog-body"><div class="case-dialog-bar"><span>CASE STUDY</span><button type="button" class="case-close" autofocus>${caseUI.close}<span aria-hidden="true">×</span></button></div><div class="case-dialog-content"><p class="case-client" id="case-dialog-client"></p><h2 id="case-dialog-title"></h2><p class="case-kind" id="case-dialog-kind"></p><p id="case-dialog-body"></p></div></dialog>
`;

const caseTrack = document.querySelector('.case-track');
const caseSlides = [...document.querySelectorAll('.case-slide')];
const casePrevious = document.querySelector('.case-previous');
const caseNext = document.querySelector('.case-next');
const casePosition = document.querySelector('.case-position');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let caseIndex = 0;
function updateCasePosition() {
  const trackBounds = caseTrack.getBoundingClientRect();
  const edge = lang === 'ar' ? trackBounds.right : trackBounds.left;
  let nearest = Infinity;
  caseSlides.forEach((slide, index) => {
    const bounds = slide.getBoundingClientRect();
    const distance = Math.abs((lang === 'ar' ? bounds.right : bounds.left) - edge);
    if (distance < nearest) { nearest = distance; caseIndex = index; }
  });
  casePosition.textContent = `${String(caseIndex + 1).padStart(2, '0')} / ${String(caseSlides.length).padStart(2, '0')}`;
  casePrevious.disabled = caseIndex === 0;
  const atEnd = Math.abs(caseTrack.scrollLeft) + caseTrack.clientWidth >= caseTrack.scrollWidth - 2;
  caseNext.disabled = atEnd || caseIndex === caseSlides.length - 1;
}
function moveCase(direction) {
  const target = Math.max(0, Math.min(caseSlides.length - 1, caseIndex + direction));
  const offset = caseSlides[target].offsetLeft - caseSlides[0].offsetLeft;
  caseTrack.scrollTo({ left: offset, behavior: motionPreference.matches ? 'auto' : 'smooth' });
}
casePrevious.addEventListener('click', () => moveCase(-1));
caseNext.addEventListener('click', () => moveCase(1));
caseTrack.addEventListener('scroll', updateCasePosition, { passive: true });
caseTrack.addEventListener('keydown', event => {
  if (event.target !== caseTrack || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  moveCase((event.key === 'ArrowRight' ? 1 : -1) * (lang === 'ar' ? -1 : 1));
});
window.addEventListener('resize', updateCasePosition);
updateCasePosition();

const caseDialog = document.querySelector('.case-dialog');
let caseOpener;
document.querySelectorAll('.case-open').forEach(button => button.addEventListener('click', () => {
  const item = t.cases.items[Number(button.dataset.case)];
  document.querySelector('#case-dialog-client').textContent = item.client;
  document.querySelector('#case-dialog-title').innerHTML = item.title;
  document.querySelector('#case-dialog-kind').textContent = item.kind;
  document.querySelector('#case-dialog-body').textContent = item.body;
  caseOpener = button;
  caseDialog.showModal();
  caseDialog.scrollTop = 0;
  document.documentElement.classList.add('dx-dialog-open');
}));
document.querySelector('.case-close').addEventListener('click', () => caseDialog.close());
caseDialog.addEventListener('click', event => {
  if (event.target !== caseDialog) return;
  const bounds = caseDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) caseDialog.close();
});
caseDialog.addEventListener('close', () => {
  document.documentElement.classList.remove('dx-dialog-open');
  caseOpener?.focus({ preventScroll: true });
});

// Run a short sweating burst on entry, then let the text settle for reading.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const hero = document.querySelector('.dx-hero');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        hero.classList.add('is-sweating');
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(hero);
  } else {
    hero.classList.add('is-sweating');
  }
}
