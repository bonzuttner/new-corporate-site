import {topNewsMarkup,mountTopNews} from '/assets/top-news.js?v=1';
const lang = document.documentElement.dataset.lang;

const copy = window.BZTranslations["site.0"];

const t = copy[lang];
const servicePage = `/${lang}/services/`;
const nextLabel = window.BZTranslations["site.1"][lang];
const languageLinks = `<div class="languages" aria-label="${window.BZTranslations["site.2"][lang]}">${[['ja','日本語'],['en','English'],['ar','العربية']].map(([l,label])=>`<a data-language="${l}" href="/${l}/#modern" lang="${l}" ${l===lang?'aria-current="page"':''}>${label}</a>`).join('')}</div>`;
const ui = lang === 'ja'
    ? { skip: '本文へ', nav: 'メインナビゲーション', more: '[ 詳しく見る ]', close: '閉じる', modal: 'この先は今回の試作範囲外です。ご相談の送信は行われません。', end: 'DESIGN DIRECTION PROTOTYPE — 2 SECTIONS' }
  : lang === 'en'
    ? { skip: 'Skip to content', nav: 'Main navigation', more: 'Learn more +', close: 'Close', modal: 'This destination is outside the current prototype. No enquiry has been sent.', end: 'End of the current prototype' }
    : { skip: 'انتقل إلى المحتوى', nav: 'التنقل الرئيسي', more: 'اعرف المزيد +', close: 'إغلاق', modal: 'هذه الوجهة خارج نطاق النموذج الأولي الحالي. لم يتم إرسال أي طلب.', end: 'نهاية نطاق النموذج الأولي الحالي' };

const hrefs = [servicePage, `/${lang}/story/`, `/${lang}/members/`, `/${lang}/company/`, `/${lang}/news/`, `/${lang}/recruit/`];
const topNav=[...t.nav,window.BZTranslations["site.3"][lang]];
const membersUrl = `/${lang}/members/`;
let serviceIndex = 0;

document.querySelector('#app').innerHTML = `
  <a class="skip" href="#main">${ui.skip}</a>
  <header class="header">
    <a class="brand" href="/${lang}/" lang="en" dir="ltr">BonZuttner</a>
    <nav aria-label="${ui.nav}">${topNav.map((item, i) => `<a href="${hrefs[i]}">${item}</a>`).join('')}</nav>
    <div class="header-actions">
      ${languageLinks}
      <a class="consult" href="/${lang}/contact/">${t.consult}</a>
    </div>
  </header>
  <main id="main">
    ${lang==='ja'?`<section class="retro-entry" aria-label="BonZuttnerの入口"><div class="retro-inner"><p class="welcome">★ ようこそ、BonZuttnerのホームページへ ★</p><figure><img src="/assets/hero-monochrome.png" alt="${t.alt}" width="1755" height="896"><figcaption><span>BonZuttner（ボンズットナー）</span></figcaption></figure><h1 tabindex="-1">真摯な姿勢をひとさじのユーモアと共に。</h1><p>業務の「なぜ？」から一緒に考え、業務整理から開発・運用まで伴走します。</p><div class="entry-links" aria-label="入口のメニュー"><button type="button" id="enter-modern" class="retro-cta retro-cta-primary">ちょっと未来へ</button><a class="retro-cta retro-cta-secondary" href="${servicePage}">サービスを見る</a></div><p class="down-note">ボタンを押すと、この画面がちょっと未来へ。</p><p id="entry-status" role="status"></p></div></section>`:''}
    <section id="modern" class="modern-section" aria-label="${t.label}" tabindex="-1"><header class="modern-bar service-nav"><a href="/${lang}/" class="modern-brand service-brand" dir="ltr">BonZuttner</a><nav aria-label="${ui.nav}"></nav><div class="service-actions">${languageLinks.replace('class="languages"','class="languages service-languages"').replace('>日本語</a>','>JA</a>').replace('>English</a>','>EN</a>').replace('>العربية</a>','>AR</a>')}<a class="service-consult" href="/${lang}/contact/">${t.consult}</a>${lang==='ja'?'<button type="button" id="show-retro">レトロ表示を見る</button>':''}</div></header><bonzuttner-hero lang="${lang}" id="bz-hero"></bonzuttner-hero>
    ${topNewsMarkup(lang)}
    <section id="services" class="services design-preview" aria-labelledby="services-title">
      <header class="section-head"><p class="section-kicker">WHAT WE DO</p><h2 id="services-title" tabindex="-1">${t.section}</h2><p>${t.intro}</p></header>
      <div class="offer-lanes">${t.groups.map((group, groupIndex) => `<article class="offer-lane"><div class="lane-index">0${groupIndex + 1}</div><div class="lane-heading"><p>${group.name}</p><h3>${group.label}</h3></div><p class="lane-summary">${group.summary}</p><ul>${group.items.map((item) => {
        const ltr = /^(Akarel|POLARISS|Satellite Data Intelligence)$/.test(item[0]) ? 'lang="en" dir="ltr"' : '';
        const productRoute = { Akarel: 'akarel', POLARISS: 'polariss', 'Satellite Data Intelligence': 'satellite' }[item[0]];
        return `<li><span ${ltr}>${productRoute ? `<a href="/${lang}/${productRoute}/">${item[0]}</a>` : item[0]}</span><small>${item[1]}</small></li>`;
      }).join('')}</ul><a class="lane-link" href="${servicePage}">${ui.more}</a></article>`).join('')}</div>
    </section>
    <section id="difference" class="difference" aria-labelledby="difference-title">
      <div class="difference-intro"><p class="difference-kicker">${t.difference.kicker}</p><h2 id="difference-title">${t.difference.title}</h2><p>${t.difference.desc}</p></div>
      <ol class="difference-points">${t.difference.points.map(point => `<li><span>${point[0]}</span><div><h3>${point[1]}</h3><p>${point[2]}</p></div></li>`).join('')}</ol>
    </section>
    <section id="story" class="story" aria-labelledby="story-title">
      <p class="story-mark" aria-hidden="true">RE.</p>
      <div class="story-copy"><p class="story-kicker">${t.story.kicker}</p><h2 id="story-title">${t.story.title}</h2></div>
      <p class="story-body">${t.story.body}<a class="story-read-link" href="/${lang}/story/">${window.BZTranslations["site.4"][lang]} <span aria-hidden="true">↗</span></a></p>
    </section>
    <section id="members" class="members-journey" aria-labelledby="members-title">
      <div class="members-copy"><p>${t.members.kicker}</p><h2 id="members-title">${t.members.title}</h2><p>${t.members.body}</p><a href="${membersUrl}">${t.members.action} <span aria-hidden="true">→</span></a></div>
      <div class="members-scene" aria-label="${t.members.speech.replace('<br>',' ')}"><p class="members-speech">${t.members.speech}</p><p class="members-voice">${t.members.voice}</p><p class="members-plan">${t.members.plan}</p><div class="members-card" aria-hidden="true"><span class="problem">${lang === 'ar' ? 'تحدٍ' : lang === 'en' ? 'Challenge' : '課題'}</span><span class="solved">${lang === 'ar' ? 'حل' : lang === 'en' ? 'Solved' : '解決'}</span></div><i class="member-listener" aria-hidden="true"></i><i class="member-planner" aria-hidden="true"></i><i class="member-farmer" aria-hidden="true"></i><i class="member-magician" aria-hidden="true"></i></div>
    </section>
    <section id="field" class="field ${lang === 'ja' ? 'field--animated' : ''}" aria-labelledby="field-title" hidden>
      <header class="field-head"><p>${t.field.kicker}</p>${lang === 'ja' ? `<div class="field-title-stage"><div class="field-title-motion"><h2 id="field-title" class="field-title-copy">${t.field.title}</h2><img class="field-title-hand" src="/assets/field-title-hand.png" alt="" aria-hidden="true"></div></div>` : `<h2 id="field-title">${t.field.title}</h2>`}</header>
      <div class="case-grid">${t.field.cases.map((item, index) => `<article class="case-card"><p class="case-index">0${index + 1}</p><p class="case-tag">${item[0]}</p><h3>${item[1]}</h3><p>${item[2]}</p></article>`).join('')}</div>
    </section>
    <section id="contact" class="contact-block" aria-labelledby="contact-title">
      <p>${t.contact.kicker}</p><h2 id="contact-title">${t.contact.title}</h2><div><p>${t.contact.body}</p><a href="/${lang}/contact/">${t.contact.action} <span aria-hidden="true">↗</span></a></div>
    </section>
    </section>
  </main>
  <dialog id="prototype"><button class="dialog-close" aria-label="${ui.close}">×</button><p>${ui.modal}</p></dialog>`;

mountTopNews(lang);
const dialog = document.querySelector('dialog');
document.querySelectorAll('[data-prototype]').forEach((element) => element.addEventListener('click', (event) => {
  event.preventDefault();
  dialog.querySelector('p').textContent = ui.modal;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
const animatedField = document.querySelector('.field--animated');
if (animatedField && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  animatedField.classList.add('motion-ready');
  new IntersectionObserver((entries, observer) => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    animatedField.classList.add('is-placed');
    observer.disconnect();
  }, { threshold: .35 }).observe(animatedField);
}
await import('/assets/transition.js?v='+(lang==='en'?'20261028':'20261028-ja-copy2'));
