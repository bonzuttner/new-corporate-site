(() => {
  const lang = ['ja', 'en', 'ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ja';
  const copy = window.BZTranslations["members.0"];
  // Names, roles and photographs are taken from the existing Members page.
  // Keep the agreed display names and order. Profile facts are supplied by the user.
  const members = [
    { id: 'ismael', name: 'イスマイル', image: 'ismael-pixel.png', role: 7 },
    { id: 'yuka', name: 'ゆーか', image: 'yuka-pixel.png', role: 3 },
    { id: 'moneer', name: 'ムニール', image: 'moneer-pixel.png', role: 5 },
    { id: 'maher', name: 'マヘル', image: 'maher-pixel.png', role: 1 },
    { id: 'mario', name: 'マリオ', image: 'mario-pixel.png', role: 5 },
    { id: 'iskandar', name: 'イスカンダル', image: 'iskandar-pixel.png', role: 2 },
    { id: 'dai', name: 'だい', image: 'dai-pixel.png', role: 4 },
    { id: 'rezk', name: 'レゼック', image: 'rezk-pixel.png', role: 6 },
    { id: 'haidar', name: 'ハイダラ', image: 'haidar-pixel.png', role: 5 },
    { id: 'chiri', name: 'ちり', image: 'chiri-pixel.png', role: 0 }
  ];
  const profiles = {
    chiri: window.BZTranslations["members.1"],
    maher: window.BZTranslations["members.2"],
    iskandar: window.BZTranslations["members.3"],
    yuka: window.BZTranslations["members.4"],
    dai: window.BZTranslations["members.5"],
    ismael: window.BZTranslations["members.6"],
    rezk: window.BZTranslations["members.7"],
    moneer: window.BZTranslations["members.8"],
    mario: window.BZTranslations["members.9"],
    haidar: window.BZTranslations["members.10"]
  };
  const profileCopy = window.BZTranslations["members.11"][lang];
  const t = copy[lang];
  const playCopy = window.BZTranslations["members.12"][lang];
  const roleLines = role => role.split(/\s*\/\s*/).map(part => `<span>${part}</span>`).join('');
  const lines = value => value.map(line => `<span>${line}</span>`).join(lang === 'en' ? ' ' : '');
  const links = [`/${lang}/`, `/${lang}/services/`, `/${lang}/story/`, `/${lang}/members/`];
  document.querySelector('#app').innerHTML = `
    <a class="skip" href="#main">${t.skip}</a>
    <header class="service-nav">
      <a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a>
      <nav aria-label="${t.navigation}">${t.nav.map((label, i) => `<a href="${links[i]}" ${i === 3 ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
      <div class="service-actions"><div class="service-languages" aria-label="${t.language}">${[['ja', 'JA'], ['en', 'EN'], ['ar', 'AR']].map(([code, label]) => `<a href="/${code}/members/" lang="${code}" ${lang === code ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</div><a class="service-consult" href="mailto:info@bonzuttner.com">${t.consult}</a></div>
    </header>
    <main id="main">
      <section class="mb-hero mb-section" aria-labelledby="mb-title">
        <p class="mb-welcome">${playCopy.welcome}</p>
        <figure class="mb-hello"><img class="mb-team-image" src="/assets/members/team-pixel.png" alt="${lang === 'ja' ? '木々と街を背景に、ベンチで語り合うチームのドット絵' : lang === 'en' ? 'Pixel illustration of a team talking together on park benches, with trees and buildings behind them' : 'رسم بكسل لفريق يتحدث على مقاعد حديقة بين الأشجار والمباني'}" width="1774" height="887" fetchpriority="high" decoding="async"><figcaption><span dir="ltr">BonZuttner — ${t.label}</span></figcaption></figure>
        <div class="mb-playground" aria-label="${t.label}">
          <div class="mb-greeting-output" role="status" aria-live="polite" aria-atomic="true"></div>
          ${members.map((member, i) => `<div class="mb-play-lane" style="--delay:${-i * 1.7}s;--duration:${8 + i % 3}s;--direction:${i % 2 ? -1 : 1}"><div class="mb-wander"><button class="mb-avatar" type="button" aria-label="${member.name}${playCopy.play}" data-member="${member.id}"><span class="mb-spark" aria-hidden="true">${i % 2 ? '♪' : '!'}</span><img src="/assets/members/${member.image}" alt="" width="64" height="64" decoding="async"></button></div></div>`).join('')}
        </div>
        <button class="mb-play-hint" type="button">${playCopy.hint}</button>
        <h1 id="mb-title">${t.title.join(' ')}</h1><p class="mb-intro">${t.intro}</p>
        <p class="mb-caption">${t.caption}</p>
        <div class="mb-hero-links"><a class="mb-retro-button" href="#mb-roster-title">${playCopy.roster} ↓</a><button class="mb-retro-button mb-motion-toggle" type="button" aria-pressed="false">${playCopy.pause}</button></div>
      </section>
      <section class="mb-roster mb-section" aria-labelledby="mb-roster-title">
        <header class="mb-roster-head"><h2 id="mb-roster-title">${t.roster}</h2><p>${t.rosterBody}</p></header>
        <ul class="mb-grid">${members.map(member => `<li class="mb-person" id="member-${member.id}"><button class="mb-portrait mb-profile-open" type="button" data-profile="${member.id}" aria-label="${member.name} — ${profileCopy.title}" aria-haspopup="dialog" aria-controls="mb-profile-dialog"><img src="/assets/members/${member.image}" alt="${member.name}" width="640" height="640" loading="lazy" decoding="async"><span class="mb-profile-cue">${profileCopy.open}</span></button><p class="mb-role">${roleLines(t.roles[member.role])}</p><h3 lang="ja" dir="ltr">${member.name}</h3></li>`).join('')}</ul>
      </section>
      <section class="mb-next mb-section" aria-labelledby="mb-next-title"><div><p class="mb-eyebrow">${lang === 'ar' ? 'لنعمل معاً' : lang === 'en' ? "LET'S WORK TOGETHER" : 'WORK WITH US'}</p><h2 id="mb-next-title">${lines(t.closing)}</h2></div><div><p>${t.closingBody}</p><div class="mb-links"><a href="/${lang}/services/">${t.service}</a><a href="/${lang}/story/">${t.story}</a></div></div></section>
    </main>
    <dialog class="mb-profile-dialog" id="mb-profile-dialog" aria-labelledby="mb-profile-title"><div class="mb-profile-titlebar"><p>${profileCopy.title}</p><button class="mb-profile-close" type="button" aria-label="${profileCopy.close}" autofocus>×</button></div><div class="mb-profile-content"></div></dialog>`;
  const profileDialog = document.querySelector('#mb-profile-dialog');
  const profileContent = document.querySelector('.mb-profile-content');
  const profileClose = document.querySelector('.mb-profile-close');
  let profileOpener;
  let previousOverflow;
  document.querySelectorAll('[data-profile]').forEach(button => {
    button.addEventListener('click', () => {
      const member = members.find(person => person.id === button.dataset.profile);
      if (!member) return;
      const values = profiles[member.id][lang];
      profileContent.innerHTML = `<div class="mb-profile-person"><img src="/assets/members/${member.image}" alt="${member.name}" width="160" height="160"><h2 id="mb-profile-title" lang="ja" dir="ltr">${member.name}</h2><p>${roleLines(t.roles[member.role])}</p></div><dl class="mb-profile-facts">${values.map((value, i) => `<div class="${i === 2 ? 'mb-profile-comment' : ''}"><dt>${profileCopy.fields[i]}</dt><dd>${value}</dd></div>`).join('')}</dl>`;
      profileOpener = button;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      profileDialog.showModal();
      profileDialog.scrollTop = 0;
      profileClose.focus();
    });
  });
  profileClose.addEventListener('click', () => profileDialog.close());
  profileDialog.addEventListener('click', event => {
    if (event.target !== profileDialog) return;
    const bounds = profileDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) profileDialog.close();
  });
  // Native dialog handles Escape and traps keyboard focus; restore the opener on close.
  profileDialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    profileOpener?.focus();
  });
  const playground = document.querySelector('.mb-playground');
  const toggle = document.querySelector('.mb-motion-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const setPaused = paused => {
    playground.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? playCopy.resume : playCopy.pause;
  };
  setPaused(reducedMotion.matches);
  reducedMotion.addEventListener('change', event => setPaused(event.matches));
  toggle.addEventListener('click', () => setPaused(!playground.classList.contains('is-paused')));
  const greetings = [
    { lang: 'ja', text: 'こんにちは！' },
    { lang: 'en', text: 'Hello!' },
    { lang: 'ar', text: 'مرحباً!' },
    { lang: 'zh', text: '你好！' },
    { lang: 'fr', text: 'Bonjour !' },
    { lang: 'es', text: '¡Hola!' },
    { lang: 'sw', text: 'Hujambo!' },
    { lang: 'eo', text: 'Saluton!' },
    { lang: 'ru', text: 'Привет!' },
    { lang: 'tr', text: 'Merhaba!' }
  ];
  const greetingOutput = document.querySelector('.mb-greeting-output');
  const avatars = [...document.querySelectorAll('.mb-avatar')];
  let greetingIndex = 0;
  let greetingTimer;
  const sayHello = avatar => {
    const greeting = greetings[greetingIndex % greetings.length];
    greetingIndex += 1;
    greetingOutput.innerHTML = `<span lang="${greeting.lang}" dir="${greeting.lang === 'ar' ? 'rtl' : 'ltr'}">${greeting.text}</span>`;
    greetingOutput.classList.add('is-visible');
    clearTimeout(greetingTimer);
    greetingTimer = setTimeout(() => greetingOutput.classList.remove('is-visible'), 3200);
    avatar.classList.remove('is-playing');
    void avatar.offsetWidth;
    avatar.classList.add('is-playing');
  };
  avatars.forEach(avatar => {
    avatar.addEventListener('click', () => sayHello(avatar));
    avatar.addEventListener('animationend', event => {
      if (event.animationName === 'mb-greeting') avatar.classList.remove('is-playing');
    });
  });
  document.querySelector('.mb-play-hint').addEventListener('click', () => sayHello(avatars[greetingIndex % avatars.length]));
})();
