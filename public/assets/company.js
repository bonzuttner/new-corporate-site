(() => {
  const lang = ['ja', 'en', 'ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ja';
  // Company facts: official JA/EN Company page, contact policy, and supplied FY2026 deck.
  const copy = window.BZTranslations["company.0"];
  const t = copy[lang];
  const lines = value => value.map(line => `<span>${line}</span>`).join('');
  const routes = ['', 'services/', 'story/', 'members/', 'company/'];
  if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML = `
    <a class="skip" href="#main">${t.skip}</a>
    <header class="service-nav"><a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a><nav aria-label="${t.navigation}">${t.nav.map((label, i) => `<a href="/${lang}/${routes[i]}" ${i === 4 ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav><div class="service-actions"><div class="service-languages" aria-label="${t.language}">${[['ja','JA'],['en','EN'],['ar','AR']].map(([code,label])=>`<a href="/${code}/company/" lang="${code}" ${lang===code?'aria-current="page"':''}>${label}</a>`).join('')}</div><a class="service-consult" href="#contact">${t.consult}</a></div></header>
    <main id="main">
      <section class="co-hero co-section" aria-labelledby="co-title"><div><p class="co-eyebrow">${lang === 'ar' ? 'عن الشركة' : 'COMPANY'}</p><h1 id="co-title">${lines(t.title)}</h1></div><div class="co-intro"><p>${t.intro}</p><p class="co-attitude">${t.attitude}</p></div><p class="co-wordmark" dir="ltr">BonZuttner<span aria-hidden="true">.</span></p></section>
      <section class="co-profile co-section" aria-labelledby="co-profile-title"><header><p class="co-eyebrow">${lang === 'ar' ? 'المعلومات الأساسية' : 'COMPANY PROFILE'}</p><h2 id="co-profile-title">${t.profile}</h2><p>${t.profileNote}</p></header><dl>${t.rows.map(([key,value])=>`<div class="co-profile-row"><dt>${key}</dt><dd>${value}</dd></div>`).join('')}</dl></section>
      <section class="co-explore co-section" aria-labelledby="co-explore-title"><h2 id="co-explore-title">${t.explore}</h2><div class="co-destinations">${t.destinations.map(([route,title,body])=>`<a href="/${lang}/${route}/"><h3>${title}</h3><p>${body}</p></a>`).join('')}</div></section>
      <section class="co-contact co-section" id="contact" aria-labelledby="co-contact-title"><div><p class="co-eyebrow">${lang === 'ar' ? 'تواصل معنا' : 'CONTACT'}</p><h2 id="co-contact-title">${lines(t.contact)}</h2></div><div><p class="co-contact-body">${t.contactBody}</p><div class="co-contact-actions"><a class="co-email" href="mailto:info@bonzuttner.com">${t.email}</a><a class="co-form" href="/${lang}/contact/">${t.form}</a></div><a class="co-privacy" href="/ja/privacy-policy/" target="_blank" rel="noopener noreferrer">${t.privacy}</a></div></section>
    </main>`;
})();
