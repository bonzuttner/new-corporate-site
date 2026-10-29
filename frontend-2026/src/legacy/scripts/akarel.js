(() => {
  const language = document.documentElement.lang || 'ja';
  const copy = window.BZTranslations["akarel.0"];
  const t = copy[language] || copy.ja;
  const lang = copy[language] ? language : 'ja';
  const lines = value => value.map(line => `<span class="ak-heading-line">${line}</span>`).join('');
  const mail = 'mailto:info@bonzuttner.com?subject=' + encodeURIComponent('Akarelについてのご相談');
  const languages = [['ja', '日本語'], ['en', 'English'], ['ar', 'العربية']].map(([code, label]) => `<a href="/${code}/akarel/" lang="${code}" ${code === lang ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  document.querySelector('#app').innerHTML = `
    <a class="skip" href="#main">${t.skip}</a>
    <header class="service-nav">
      <a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a>
      <nav aria-label="${t.navigation}">${t.nav.map(([url, label]) => `<a href="${url}">${label}</a>`).join('')}</nav>
      <div class="service-actions"><div class="service-languages" aria-label="${t.languages}">${languages}</div><a class="service-consult" href="#contact">${t.consult}</a></div>
    </header>
    <main id="main">
      <section class="ak-hero" aria-labelledby="ak-title">
        <div class="ak-hero-copy"><img class="ak-logo" src="/assets/akarel-logo.png" width="2048" height="544" alt="Akarel"><p class="ak-eyebrow">${t.hero.label}</p><h1 id="ak-title">${lines(t.hero.title)}</h1><p class="ak-lead">${t.hero.body}</p><div class="ak-hero-actions"><a class="ak-primary" href="#contact">${t.hero.action}</a><a class="ak-text-link" href="#ak-demo">${t.hero.more}</a></div></div>
        <div class="ak-demo" id="ak-demo"><p class="ak-demo-label">${t.demo.label}</p><div class="ak-demo-tabs" role="tablist" aria-label="${t.hero.more}"><button type="button" role="tab" id="ak-tab-0" aria-controls="ak-demo-panel" aria-selected="true" data-mode="0">${t.demo.knowledge}</button><button type="button" role="tab" id="ak-tab-1" aria-controls="ak-demo-panel" aria-selected="false" tabindex="-1" data-mode="1">${t.demo.agent}</button></div><div class="ak-knowledge-sources" aria-hidden="true">${t.demo.sources.map(source => `<span>${source}</span>`).join('')}</div><div class="ak-demo-link" aria-hidden="true"><i></i><i></i><i></i></div><div class="ak-demo-panel" id="ak-demo-panel" role="tabpanel" aria-labelledby="ak-tab-0" tabindex="0"></div><p class="ak-demo-note">${t.demo.note}</p></div>
      </section>
      <section class="ak-knowledge ak-section" aria-labelledby="ak-knowledge-title"><header><p class="ak-eyebrow">${t.knowledge.label}</p><h2 id="ak-knowledge-title">${lines(t.knowledge.title)}</h2><p class="ak-section-lead">${t.knowledge.body}</p></header><div class="ak-knowledge-copy">${t.knowledge.rows.map(([title, body]) => `<article><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></section>
      <section class="ak-agents ak-section" id="agents" aria-labelledby="ak-agents-title"><header><p class="ak-eyebrow">${t.agents.label}</p><p class="ak-status">${t.agents.status}</p><h2 id="ak-agents-title">${lines(t.agents.title)}</h2><p class="ak-section-lead">${t.agents.body}</p></header><div class="ak-agent-examples"><p class="ak-example-label">${t.agents.exampleLabel}</p>${t.agents.rows.map(([role, title, body]) => `<article><p class="ak-agent-role">${role}</p><div><h3>${title}</h3><p>${body}</p></div><span class="ak-agent-mark" aria-hidden="true">+</span></article>`).join('')}</div><div class="ak-human"><h3>${t.agents.human}</h3><p>${t.agents.humanBody}</p></div></section>
      <section class="ak-security ak-section" id="security" aria-labelledby="ak-security-title"><header><p class="ak-eyebrow">${t.security.label}</p><h2 id="ak-security-title">${lines(t.security.title)}</h2><p class="ak-section-lead">${t.security.body}</p><p class="ak-security-note">${t.security.note}</p></header><div class="ak-security-details">${t.security.rows.map(([title, body], index) => `<details ${index === 0 ? 'open' : ''}><summary>${title}<span aria-hidden="true"></span></summary><p>${body}</p></details>`).join('')}</div></section>
      <section class="ak-approach ak-section" aria-labelledby="ak-approach-title"><header><p class="ak-eyebrow">${t.approach.label}</p><h2 id="ak-approach-title">${lines(t.approach.title)}</h2><p class="ak-section-lead">${t.approach.body}</p></header><ol>${t.approach.rows.map(([title, body], index) => `<li><span class="ak-phase" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><h3>${title}</h3><p>${body}</p></li>`).join('')}</ol><a class="ak-text-link" href="/${lang}/dx-ai/">${t.approach.link}</a></section>
      <section class="ak-contact ak-section" id="contact" aria-labelledby="ak-contact-title"><div><p class="ak-eyebrow">${t.cta.label}</p><h2 id="ak-contact-title">${lines(t.cta.title)}</h2></div><div><p>${t.cta.body}</p><a class="ak-primary" href="${mail}">${t.cta.action}</a><a class="ak-text-link" href="/${lang}/services/">${t.cta.back}</a></div></section>
    </main>`;
  const panel = document.querySelector('#ak-demo-panel');
  const tabs = [...document.querySelectorAll('[data-mode]')];
  function setMode(index, focus = false) {
    const item = t.demo.data[index];
    tabs.forEach((tab, tabIndex) => { tab.setAttribute('aria-selected', String(tabIndex === index)); tab.tabIndex = tabIndex === index ? 0 : -1; });
    panel.setAttribute('aria-labelledby', `ak-tab-${index}`);
    panel.dataset.mode = String(index);
    panel.innerHTML = `<p class="ak-demo-badge">${item.badge}</p><h3>${item.question}</h3><p class="ak-demo-answer">${item.answer}</p><ul>${item.items.map(text => `<li>${text}</li>`).join('')}</ul><p class="ak-demo-finish">${item.finish}</p>`;
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setMode(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = lang === 'ar' ? index - 1 : index + 1;
      else if (event.key === 'ArrowLeft') next = lang === 'ar' ? index + 1 : index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      setMode((next + tabs.length) % tabs.length, true);
    });
  });
  setMode(0);
})();
