(() => {
  const lang = ['ja', 'en', 'ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ja';
  const copy = window.BZTranslations["satellite.0"];
  const t = copy[lang];
  const title = lines => lines.map(line => `<span class="sat-heading-line">${line}</span>`).join('');
  const languages = [['ja', '日本語'], ['en', 'English'], ['ar', 'العربية']].map(([code, label]) => `<a href="/${code}/satellite/" lang="${code}" ${code === lang ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  const contact = 'mailto:info@bonzuttner.com?subject=' + encodeURIComponent('Satellite data enquiry');
  if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML = `
    <a class="skip" href="#main">${t.skip}</a><header class="service-nav"><a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a><nav aria-label="${t.navigation}">${t.nav.map(([url, label]) => `<a href="${url}">${label}</a>`).join('')}</nav><div class="service-actions"><div class="service-languages" aria-label="${t.language}">${languages}</div><a class="service-consult" href="#contact">${t.consult}</a></div></header>
    <main id="main"><section class="sat-hero" aria-labelledby="sat-title"><div><img class="sat-logo" src="/assets/satellite-data-ai-logo.png" alt="${t.logo}"><p class="sat-eyebrow" dir="ltr">SATELLITE DATA INTELLIGENCE</p><h1 id="sat-title">${title(t.title)}</h1><p class="sat-lead">${t.lead}</p><div class="sat-actions"><a class="sat-primary" href="#contact">${t.action}</a><a class="sat-text-link" href="#applications">${t.explore}</a></div></div><div class="sat-visual"><div class="sat-tabs" role="tablist" aria-label="${t.explore}">${t.tabs.map((label, index) => `<button type="button" role="tab" id="sat-tab-${index}" aria-controls="sat-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-mode="${index}">${label}</button>`).join('')}</div><div class="sat-scene" data-playing="true" data-mode="0"><div class="sat-earth sat-sprite" aria-hidden="true"></div><div class="sat-orbiter sat-sprite" aria-hidden="true"></div><div class="sat-transmission" aria-hidden="true"></div><div class="sat-field sat-sprite" aria-hidden="true"></div><div class="sat-caption" id="sat-panel" role="tabpanel" tabindex="0" aria-labelledby="sat-tab-0"><p data-caption-label></p><strong data-caption-question></strong></div></div><div class="sat-visual-controls"><p>${t.sceneNote}</p><button class="sat-motion" type="button" aria-pressed="false"></button></div></div></section>
    <section class="sat-applications sat-section" id="applications" aria-labelledby="sat-app-title"><header><p class="sat-eyebrow">${t.applications.label}</p><h2 id="sat-app-title">${title(t.applications.title)}</h2></header><div class="sat-application-list">${t.applications.rows.map(([label, heading, body, topics], index) => `<article><div><p class="sat-eyebrow" dir="ltr">${label}</p><h3>${heading}</h3><span class="sat-application-index" aria-hidden="true">0${index + 1}</span></div><div><p>${body}</p><p class="sat-example-label">${t.applications.examples}</p><dl class="sat-use-cases">${topics.map(([name, description]) => `<div><dt>${name}</dt><dd>${description}</dd></div>`).join('')}</dl></div></article>`).join('')}</div><p class="sat-scope-note">${t.applications.note}</p></section>
    <section class="sat-implementation sat-section" aria-labelledby="sat-implementation-title"><header><p class="sat-eyebrow" dir="ltr">${t.implementation.label}</p><h2 id="sat-implementation-title">${title(t.implementation.title)}</h2><p class="sat-lead">${t.implementation.body}</p></header><dl>${t.implementation.rows.map(([heading, body]) => `<div><dt>${heading}</dt><dd>${body}</dd></div>`).join('')}</dl></section>
    <section class="sat-approach sat-section" aria-labelledby="sat-approach-title"><header><p class="sat-eyebrow">${t.approach.label}</p><h2 id="sat-approach-title">${title(t.approach.title)}</h2><p class="sat-lead">${t.approach.body}</p></header><dl>${t.approach.rows.map(([heading, body]) => `<div><dt>${heading}</dt><dd>${body}</dd></div>`).join('')}</dl></section>
    <section class="sat-contact sat-section" id="contact" aria-labelledby="sat-contact-title"><div><p class="sat-eyebrow">${t.cta.label}</p><h2 id="sat-contact-title">${title(t.cta.title)}</h2></div><div><p>${t.cta.body}</p><a class="sat-primary" href="${contact}">${t.cta.action}</a><a class="sat-text-link" href="/${lang}/services/">${t.cta.back}</a></div></section></main>`;
  const scene = document.querySelector('.sat-scene');
  const panel = document.querySelector('#sat-panel');
  const label = document.querySelector('[data-caption-label]');
  const question = document.querySelector('[data-caption-question]');
  const tabs = [...document.querySelectorAll('[data-mode]')].filter(element => element.matches('button'));
  function select(index, focus = false) {
    scene.dataset.mode = String(index);
    label.textContent = t.labels[index][0]; question.textContent = t.labels[index][1];
    panel.setAttribute('aria-labelledby', `sat-tab-${index}`);
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = index + (lang === 'ar' ? -1 : 1);
      else if (event.key === 'ArrowLeft') next = index + (lang === 'ar' ? 1 : -1);
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();select((next + tabs.length) % tabs.length, true);
    });
  });
  const button = document.querySelector('.sat-motion');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reduced.matches;
  function motion() { scene.dataset.playing = String(playing); button.textContent = playing ? t.pause : t.play; button.setAttribute('aria-pressed', String(!playing)); button.hidden = reduced.matches; }
  button.addEventListener('click', () => { playing = !playing; motion(); });
  reduced.addEventListener('change', () => { playing = !reduced.matches; motion(); });
  document.addEventListener('visibilitychange', () => { scene.classList.toggle('sat-out-of-view', document.hidden); });
  select(0);motion();
})();
