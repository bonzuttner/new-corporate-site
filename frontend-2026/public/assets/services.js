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
const polish = lang === 'ja' || lang === 'en';
const indexLabel = lang === 'ja' ? 'サービスの目次' : 'Service directory';
const serviceArt = {
  'dx-ai': '<img class="subcity" src="/assets/subpage-city.webp" alt=""><span class="pixel-signal"><i></i><i></i><i></i></span>',
  development: '<div class="sub-window"><span></span><i></i><i></i><i></i><b></b></div><span class="sub-code" dir="ltr">&lt;/&gt;</span>',
  akarel: '<div class="sub-ai"><i></i><i></i><i></i><b>✦</b></div>',
  polariss: '<div class="sub-radar"></div><img src="/assets/home-scene-ride.webp" alt="">',
  satellite: '<div class="sub-orbit"></div><img class="sub-earth" src="/assets/home-scene-earth.webp" alt=""><img class="sub-sat" src="/assets/home-scene-space.webp" alt="">'
};
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
  <main id="main" ${polish?'class="bz-subpage bz-services-polish"':''}>
    <section class="service-hero">
      <div class="service-hero-copy">
        <p class="service-eyebrow">${t.eyebrow}</p>
        <h1 class="services-overview-title">${lang==='ja'?'<span>私たちが</span><span>ご案内するサービス</span>':t.title}</h1>
        <p class="svc-intro">${lang==='ja'?t.lead.split(/(?=必要に応じて)/).map(line=>'<span class="svc-line">'+line.split(/(?<=、|・|べきかを|などの手法を)/).map(part=>'<span class="svc-phrase">'+part+'</span>').join('')+'</span>').join(''):t.lead}</p>
      </div>
      ${polish ? `<div class="svc-stage" aria-hidden="true"><div class="svc-grid"></div><span class="svc-stage-label">FIELD / 01—05</span><div class="svc-stage-caption">${t.route}</div><img src="/assets/subpage-city.webp" alt=""><span class="svc-plus">+</span></div>` : `<div class="route-map" aria-hidden="true"><span>01</span><i></i><span>02</span><i></i><span>03</span><b>+</b><em>${t.route}</em></div>`}
    </section>
    ${polish ? `<nav class="sub-index" aria-label="${indexLabel}">${t.groups.flatMap(g=>g.items).map(item=>`<a href="#${item.id}"><span aria-hidden="true">${item.no}</span>${item.id==='satellite'&&lang==='ja'?'衛星データ × AI解析':item.name}<span aria-hidden="true">↓</span></a>`).join('')}</nav>` : ''}
    <section class="service-list" aria-label="${t.eyebrow}">
      ${t.groups.map(group => `
        <div class="service-group">
          <header class="service-group-head ${lang === 'ja' && group.no === '02' ? 'service-group-head--own-products' : ''}"><span>${group.no}</span><p>${group.kind}</p><h2>${groupTitle(group)}</h2><p>${group.desc}</p></header>
          <div class="service-cards">
            ${group.items.map(item => `
              <article id="${item.id}" class="service-detail-card">
                ${polish ? `<div class="svc-card-art svc-art-${item.id}" aria-hidden="true"><span class="svc-grid"></span><span class="svc-art-number">${item.no} / 05</span>${serviceArt[item.id] || ''}</div>` : ''}
                ${polish ? '<div class="svc-card-copy">' : ''}
                <p class="card-number">${item.no}</p>
                <div><p class="card-sub" dir="ltr">${item.sub}</p><h3 ${isLtr.test(item.name) ? 'dir="ltr"' : ''}>${productName(item)}</h3></div>
                <p class="card-body">${item.text}</p>
                <ul>${item.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>${detailLink(item)}${polish ? '</div>' : ''}
              </article>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </section>
    <section id="contact" class="service-contact">
      <p>${t.cta.eyebrow}</p><h2>${t.cta.title}</h2><div><p>${t.cta.body}</p><a href="/${lang}/contact/">${t.cta.action} <span aria-hidden="true">→</span></a></div>
    </section>
  </main>
`;
