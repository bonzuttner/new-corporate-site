(() => {
  const lang=['ja','en','ar'].includes(document.documentElement.lang)?document.documentElement.lang:'ja';
  const copy=window.BZTranslations["story.0"];
  const t=copy[lang], lines=items=>items.map(line=>`<span>${line}</span>`).join(lang==='en'?' ':''), paragraphs=items=>items.map(p=>`<p>${p}</p>`).join('');
  const members=`/${lang}/members/`;
  const languages=[['ja','日本語'],['en','English'],['ar','العربية']].map(([code,label])=>`<a href="/${code}/story/" lang="${code}" ${code===lang?'aria-current="page"':''}>${label}</a>`).join('');
  document.querySelector('#app').innerHTML=`<a class="skip" href="#main">${t.skip}</a><header class="service-nav"><a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a><nav aria-label="${t.navigation}">${t.nav.map(([url,label])=>`<a href="${url}" ${url===`/${lang}/story/`?'aria-current="page"':''}>${label}</a>`).join('')}</nav><div class="service-actions"><div class="service-languages" aria-label="${t.language}">${languages}</div><a class="service-consult" href="#next">${t.consult}</a></div></header>
  <main id="main"><section class="st-hero st-section" aria-labelledby="st-title"><div><p class="st-eyebrow">${t.hero.label}</p><h1 id="st-title">${lines(t.hero.title)}</h1><p class="st-lead">${t.hero.body}</p><a class="st-link" href="#beginning">${t.hero.read} <span aria-hidden="true">↓</span></a></div><div class="st-re-mark" aria-hidden="true"><strong dir="ltr">Re.</strong><p>${t.hero.aside}</p></div></section>
  <section class="st-beginning st-section" id="beginning" aria-labelledby="st-beginning-title"><div class="st-year" aria-label="2019"><span dir="ltr">2019</span><p>${t.beginning.label}</p></div><div><h2 id="st-beginning-title">${lines(t.beginning.title)}</h2><div class="st-prose">${paragraphs(t.beginning.body)}</div><p class="st-emphasis">${t.beginning.note}</p><a class="st-source" href="https://www.fujitv.co.jp/futurerunners/archive_291.html">${t.beginning.source} <span aria-hidden="true">↗</span></a></div></section>
  <section class="st-name st-section" aria-labelledby="st-name-title"><header><p class="st-eyebrow">${t.name.label}</p><h2 id="st-name-title">${lines(t.name.title)}</h2></header><div class="st-name-copy"><p>${t.name.body}</p><p class="st-person">${t.name.person}<span dir="ltr">${t.name.personEnglish}</span></p></div><dl class="st-name-parts">${t.name.parts.map(([word,meaning,language])=>`<div><dt dir="ltr">${word}</dt><dd><strong>${meaning}</strong><span>${language}</span></dd></div>`).join('')}</dl><p class="st-name-meaning">${t.name.meaning}</p></section>
  <section class="st-technology st-section" aria-labelledby="st-tech-title"><div><p class="st-eyebrow">${t.technology.label}</p><h2 id="st-tech-title">${lines(t.technology.title)}</h2><p class="st-tech-note">${t.technology.note}</p></div><div class="st-prose">${paragraphs(t.technology.body)}<a class="st-link" href="/${lang}/services/">${t.technology.link} <span aria-hidden="true">↗</span></a></div></section>
  <section class="st-re st-section" aria-labelledby="st-re-title"><header><p class="st-eyebrow">${t.re.label}</p><h2 id="st-re-title">${lines(t.re.title)}</h2><p class="st-lead">${t.re.body}</p></header><div class="st-re-interaction"><div class="st-re-tabs" role="tablist" aria-label="${t.re.tabLabel}">${t.re.items.map(([word],i)=>`${lang==='en'&&i>0?'<span class="st-re-separator" aria-hidden="true"> · </span>':''}<button type="button" role="tab" id="st-tab-${i}" aria-controls="st-re-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-re="${i}" dir="ltr">${word}</button>`).join('')}</div><div class="st-re-panel" id="st-re-panel" role="tabpanel" tabindex="0" aria-labelledby="st-tab-0"></div></div></section>
  <section class="st-humor st-section" aria-labelledby="st-humor-title">
    <p class="st-eyebrow">${lang==='ar'?'روحنا':'OUR ATTITUDE'}</p>
    <div class="st-humor-stage">
      <span class="st-spoon" aria-hidden="true">🥄</span><span class="st-humor-dot" aria-hidden="true">.</span>
      <h2 id="st-humor-title"><span class="st-sincere">${t.future.value[0]}</span><span class="st-playful">${t.future.value[1]}</span></h2>
      <div class="st-oops"><span class="st-iskandar" role="img" aria-label="${lang==='ja'?'ハットをかぶったイスカンダル':lang==='en'?'Iskandar wearing his hat':'إسكندر يرتدي قبعته'}"></span><p class="st-speech">${lang==='ja'?'あ、入れすぎた。':lang==='en'?'Oops. A little too much.':'أوه، أكثر بقليل.'}</p></div>
    </div>
    <button class="st-humor-replay" type="button">${lang==='ja'?'ユーモアをひとさじ':lang==='en'?'A spoonful of humor':'ملعقة من روح الدعابة'}<span aria-hidden="true">＋</span></button>
  </section>
  <section class="st-next st-section" id="next" aria-labelledby="st-next-title"><div><p class="st-eyebrow">${t.next.label}</p><h2 id="st-next-title">${lines(t.next.title)}</h2></div><div><p>${t.next.body}</p><div class="st-actions"><a href="/${lang}/services/">${t.next.services} <span aria-hidden="true">↗</span></a><a href="${members}">${t.next.members} <span aria-hidden="true">↗</span></a></div><a class="st-link" href="mailto:info@bonzuttner.com">${t.next.contact} <span aria-hidden="true">↗</span></a></div></section></main>`;
  const tabs=[...document.querySelectorAll('[data-re]')],panel=document.querySelector('#st-re-panel');
  function select(index,focus=false){const [word,label,body]=t.re.items[index];panel.innerHTML=`<p class="st-re-word" dir="ltr">${word}<span aria-hidden="true">.</span></p><h3>${label}</h3><p class="st-re-body">${body}</p>`;panel.setAttribute('aria-labelledby',`st-tab-${index}`);tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(index===i));tab.tabIndex=index===i?0:-1});if(focus)tabs[index].focus()}
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(i));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=i+(lang==='ar'?-1:1);else if(e.key==='ArrowLeft')next=i+(lang==='ar'?1:-1);else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;if(next===undefined)return;e.preventDefault();select((next+tabs.length)%tabs.length,true)})});select(0);
  const humor=document.querySelector('.st-humor'),replay=humor.querySelector('button');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let humorTimer;
  function addHumor(){
    clearTimeout(humorTimer);humor.classList.remove('is-playing');
    void humor.offsetWidth;humor.classList.add('is-playing');
    replay.disabled=true;
    humorTimer=setTimeout(()=>{humor.classList.remove('is-playing');replay.disabled=false},reduced.matches?1600:4700);
  }
  replay.addEventListener('click',addHumor);
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){if(!reduced.matches)addHumor();observer.disconnect()}},{threshold:.45});observer.observe(humor)}
})();
