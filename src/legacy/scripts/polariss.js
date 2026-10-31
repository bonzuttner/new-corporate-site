(() => {
  const lang = ['ja', 'en', 'ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ja';
  const texts = window.BZTranslations["polariss.0"];
  const t = texts[lang];
  const languages = [['ja', '日本語'], ['en', 'English'], ['ar', 'العربية']].map(([code, label]) => `<a href="/${code}/polariss/" lang="${code}" ${code === lang ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  document.querySelector('#app').innerHTML = `
    <a class="skip" href="#main">${t.skip}</a>
    <header class="service-nav"><a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a><nav aria-label="${t.navigation}">${t.nav.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</nav><div class="service-actions"><div class="service-languages" aria-label="${t.languages}">${languages}</div></div></header>
    <main id="main"><section class="pl-hero" aria-labelledby="pl-title">
      <div class="pl-copy"><img class="pl-logo" src="/assets/polariss-logo.png" alt="POLARISS" width="1800" height="323"><p class="pl-eyebrow" dir="ltr">CONNECTED TO YOUR RIDE</p><h1 id="pl-title">${t.title.map(line => `<span>${line}</span>`).join('')}</h1><p class="pl-lead">${t.body}</p><a class="pl-official" href="https://www.polariss.jp/">${t.official}</a><p class="pl-detail">${t.detail}</p><div class="pl-bottom"><a href="/${lang}/services/">${t.back}</a><p>${t.partner}</p></div></div>
      <div class="pl-visual"><div class="pl-scene" data-playing="true"><div class="pl-signal" aria-hidden="true"><i></i><i></i><i></i></div><img class="pl-rider" src="/components/bonzuttner-hero/assets/motorcycle-phone.png" alt="${t.alt}" width="1254" height="1254">${t.messages.map(([label, message], index) => `<div class="pl-message pl-message-${index}" aria-hidden="true"><span class="pl-message-marker"></span><p>${label}</p><strong>${message}</strong></div>`).join('')}<div class="pl-capabilities">${t.messages.map(([label]) => `<span>${label}</span>`).join('')}</div></div><div class="pl-visual-controls"><span>${t.note}</span><button type="button" class="pl-motion" aria-pressed="false">${t.pause}</button></div></div>
    </section></main>`;
  const scene = document.querySelector('.pl-scene');
  const button = document.querySelector('.pl-motion');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !preference.matches;
  function update() {
    scene.dataset.playing = String(playing);
    button.hidden = preference.matches;
    button.textContent = playing ? t.pause : t.play;
    button.setAttribute('aria-pressed', String(!playing));
  }
  button.addEventListener('click', () => { playing = !playing; update(); });
  preference.addEventListener('change', () => { playing = !preference.matches; update(); });
  document.addEventListener('visibilitychange', () => { scene.classList.toggle('pl-out-of-view', document.hidden); });
  update();
})();
