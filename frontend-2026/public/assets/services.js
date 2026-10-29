const lang = document.documentElement.lang || 'ja';

const content = window.BZTranslations["services.0"];

const t = content[lang] || content.ja;
const isLtr = /^(Akarel|POLARISS|Satellite)/;
const productLogos = {
  Akarel: { src: '/assets/akarel-logo.png', className: 'product-logo--akarel' },
  POLARISS: { src: '/assets/polariss-logo.png', className: 'product-logo--polariss' },
  'Satellite Data Intelligence': { src: '/assets/satellite-data-ai-logo.png', className: 'product-logo--satellite' }
};
const productName = item => {
  const logo = productLogos[item.name];
  return logo ? `<img class="product-logo ${logo.className}" src="${logo.src}" alt="${item.name}">` : item.name;
};
const detailLink = item => ['dx-ai', 'development', 'akarel', 'polariss', 'satellite'].includes(item.id) ? `<a class="card-detail-link" href="/${lang}/${item.id}/">${t.details}${item.id === 'dx-ai' ? '<span aria-hidden="true">→</span>' : ''}</a>` : '';
const languageLinks = [['ja','日本語'],['en','English'],['ar','العربية']].map(([code,label]) => `<a href="/${code}/services/" lang="${code}" ${code === lang ? 'aria-current="page"' : ''}>${label}</a>`).join('');
const groupTitle = group => lang === 'ja' && group.no === '01'
  ? 'お客様と一緒に<br><span class="sweat-line"><span class="sweat-kanji">汗</span>をかく。</span>'
  : group.title;

if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML = `
  <a class="skip" href="#main">${lang === 'ar' ? 'انتقل إلى المحتوى' : lang === 'en' ? 'Skip to content' : '本文へ'}</a>
  <header class="service-nav">
    <a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a>
    <nav aria-label="${lang === 'ar' ? 'التنقل الرئيسي' : lang === 'en' ? 'Main navigation' : 'メインナビゲーション'}">${t.nav.map(([href, label]) => `<a href="${href}" ${href.includes('/services/') ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    <div class="service-actions"><div class="service-languages" aria-label="${lang === 'ar' ? 'اللغة' : lang === 'en' ? 'Language' : '言語'}">${languageLinks}</div><a class="service-consult" href="#contact">${t.consult} <span aria-hidden="true">↗</span></a></div>
  </header>
  <main id="main">
    <section class="service-hero">
      <div class="service-hero-copy">
        <p class="service-eyebrow">${t.eyebrow}</p>
        <h1 class="services-overview-title">${t.title}</h1>
        <p>${t.lead}</p>
      </div>
      <div class="route-map" aria-hidden="true"><span>01</span><i></i><span>02</span><i></i><span>03</span><b>+</b><em>${t.route}</em></div>
    </section>
    <section class="service-list" aria-label="${t.eyebrow}">
      ${t.groups.map(group => `
        <div class="service-group">
          <header class="service-group-head ${lang === 'ja' && group.no === '02' ? 'service-group-head--own-products' : ''}"><span>${group.no}</span><p>${group.kind}</p><h2>${groupTitle(group)}</h2><p>${group.desc}</p></header>
          <div class="service-cards">
            ${group.items.map(item => `
              <article id="${item.id}" class="service-detail-card">
                <p class="card-number">${item.no}</p>
                <div><p class="card-sub" dir="ltr">${item.sub}</p><h3 ${isLtr.test(item.name) ? 'dir="ltr"' : ''}>${productName(item)}</h3></div>
                <p class="card-body">${item.text}</p>
                <ul>${item.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>${detailLink(item)}
              </article>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </section>
    <section id="contact" class="service-contact">
      <p>${t.cta.eyebrow}</p><h2>${t.cta.title}</h2><div><p>${t.cta.body}</p><a href="mailto:info@bonzuttner.com">${t.cta.action} <span aria-hidden="true">→</span></a></div>
    </section>
  </main>
`;
