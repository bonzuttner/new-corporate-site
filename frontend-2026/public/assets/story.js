(() => {
  const lang=['ja','en','ar'].includes(document.documentElement.lang)?document.documentElement.lang:'ja';
  const copy=window.BZTranslations["story.0"];
  const t=copy[lang], lines=items=>items.map(line=>`<span>${line}</span>`).join(lang==='en'?' ':''), paragraphs=items=>items.map(p=>`<p>${p}</p>`).join('');
  const polish=lang!=='ar';
  const chapters=lang==='ja'?['出発点','名前の由来','技術を選んだ理由','3つのRe.']:['Our beginning','Our name','Why technology','Three Re. words'];
  const chapterIds=['beginning','st-name','st-technology','st-re'];
  const sceneWords=lang==='ja'?['出会い','社名','現場','再出発']:['ENCOUNTER','NAME','FIELD','RE:'];

  const motifs=['<path d="M2 41H62M12 50V19M52 50V19M12 21Q32 52 52 21M21 32V40M43 32V40"/>', '<path d="M32 53V31M32 35Q11 35 10 15Q32 15 32 35ZM32 27Q33 8 54 9Q51 27 32 27Z"/>', '<path d="M8 54Q57 44 32 34T48 21M49 22V5L61 10L49 15"/><circle cx="15" cy="24" r="6"/>'];
  const motif=i=>`<svg aria-hidden="true" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${motifs[i]}</svg>`;
  const questions=lang==='ja'?['何がきっかけ？','なぜ、この名前？','なぜ、技術なのか？','もう一度、どこへ？']:['Who do we work with?','Why this name?','Why technology?','Where do we go from here?'];
  const scene=i=>polish?`<div class="atlas-anchor" id="scene-${i}"></div>`:'';
  const atlas=`<div class="story-atlas"><aside class="atlas-stage" aria-label="${lang==='ja'?'物語の風景':'Story landscape'}"><div class="atlas-meter">${lang==='ja'?'物語の地図':'BZ ／ STORY ATLAS'} <span>01 / 04</span></div><div class="atlas-world" aria-hidden="true"><i class="atlas-sun"></i><i class="atlas-horizon"></i><img class="atlas-town" src="/assets/subpage-city.webp" alt=""><svg class="story-bridge" viewBox="0 0 320 160" fill="none" stroke-linecap="round" aria-hidden="true"><path d="M4 135 Q85 60 145 110 T316 75" stroke="#71b9c3" stroke-width="12"/><path d="M40 102H276 M78 102V45 M235 102V45 M78 48Q156 132 235 48 M103 70V100 M130 84V100 M182 84V100 M210 70V100" stroke="#193f53" stroke-width="6"/><circle cx="78" cy="45" r="8" fill="#ffcb6a"/><circle cx="235" cy="45" r="8" fill="#ffcb6a"/></svg><img class="atlas-earth" src="/assets/home-scene-earth.webp" alt=""><div class="re-panorama"><figure>${motif(0)}<figcaption>${t.re.items[0][lang==='ja'?1:0]}</figcaption></figure><figure>${motif(1)}<figcaption>${t.re.items[1][lang==='ja'?1:0]}</figcaption></figure><figure>${motif(2)}<figcaption>${t.re.items[2][lang==='ja'?1:0]}</figcaption></figure></div></div><figure class="atlas-portrait" hidden><img src="/assets/suttner-portrait.png" width="280" height="396" alt=""><figcaption>${lang==='ja'?'ベルタ・フォン・ズットナー':'Bertha von Suttner'}</figcaption></figure><div class="atlas-sign"><small>${lang==='ja'?'物語の手帖':'FIELD NOTES'}</small><strong>${sceneWords[0]}</strong></div><nav aria-label="${lang==='ja'?'章を選ぶ':'Select a chapter'}">${sceneWords.map((w,i)=>`<a href="#scene-${i}" aria-label="${chapters[i]}">${w}</a>`).join('')}</nav></aside><div class="atlas-pages">`;
  const members=`/${lang}/members/`;
  const languages=[['ja','日本語'],['en','English'],['ar','العربية']].map(([code,label])=>`<a href="/${code}/story/" lang="${code}" ${code===lang?'aria-current="page"':''}>${label}</a>`).join('');
  if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML =`<a class="skip" href="#main">${t.skip}</a><header class="service-nav"><a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a><nav aria-label="${t.navigation}">${t.nav.map(([url,label])=>`<a href="${url}" ${url===`/${lang}/story/`?'aria-current="page"':''}>${label}</a>`).join('')}</nav><div class="service-actions"><div class="service-languages" aria-label="${t.language}">${languages}</div><a class="service-consult" href="#next">${t.consult}</a></div></header>
  <main id="main" ${polish?'class="bz-subpage bz-story-polish"':''}><section class="st-hero st-section" aria-labelledby="st-title"><div><div class="story-chrome" aria-hidden="true">▣　BonZuttner.exe <span>—　□　×</span></div><p class="st-eyebrow">${t.hero.label}</p><h1 id="st-title">${lines(t.hero.title)}</h1><p class="st-lead">${t.hero.body}</p><a class="st-link" href="${polish?'#scene-0':'#beginning'}">${polish?(lang==='ja'?'物語を起動する':'Launch our story'):t.hero.read} <span aria-hidden="true">↓</span></a></div><div class="st-re-mark" aria-hidden="true"><strong dir="ltr">Re.</strong><p>${t.hero.aside}</p>${polish?'<img src="/assets/hero-monochrome.png" alt="">':''}</div></section>

  ${polish?atlas:''}${scene(0)}<section class="st-beginning st-section" id="beginning" aria-labelledby="st-beginning-title"><div class="st-year" aria-label="2019"><span dir="ltr">2019</span><p>${t.beginning.label}</p></div><div><h2 id="st-beginning-title">${lines(t.beginning.title)}</h2><div class="st-prose">${paragraphs(t.beginning.body)}</div><p class="st-emphasis">${t.beginning.note}</p><a class="st-source" href="https://www.fujitv.co.jp/futurerunners/archive_291.html">${t.beginning.source} <span aria-hidden="true">↗</span></a></div></section>
  ${scene(1)}<section class="st-name st-section" id="st-name" aria-labelledby="st-name-title"><header><p class="st-eyebrow">${t.name.label}</p><h2 id="st-name-title">${lines(t.name.title)}</h2></header><div class="st-name-copy"><p>${t.name.body}</p><p class="st-person">${t.name.person}<span dir="ltr">${t.name.personEnglish}</span></p></div><dl class="st-name-parts">${t.name.parts.map(([word,meaning,language])=>`<div><dt dir="ltr">${word}</dt><dd><strong>${meaning}</strong><span>${language}</span></dd></div>`).join('')}</dl><p class="st-name-meaning">${t.name.meaning}</p></section>
  ${scene(2)}<section class="st-technology st-section" id="st-technology" aria-labelledby="st-tech-title"><div><p class="st-eyebrow">${t.technology.label}</p><h2 id="st-tech-title">${lines(t.technology.title)}</h2><p class="st-tech-note">${t.technology.note}</p></div><div class="st-prose">${paragraphs(t.technology.body)}<a class="st-link" href="/${lang}/services/">${t.technology.link} <span aria-hidden="true">↗</span></a></div></section>
  ${scene(3)}<section class="st-re st-section" id="st-re" aria-labelledby="st-re-title"><header><p class="st-eyebrow">${t.re.label}</p><h2 id="st-re-title">${lines(t.re.title)}</h2><p class="st-lead">${t.re.body}</p></header><dl class="story-re-list">${t.re.items.map(([word,label,body])=>`<div><dt><strong lang="en">${word}</strong> <span>${label}</span></dt><dd>${body}</dd></div>`).join('')}</dl></section>
  ${polish?'</div></div>':''}<section class="st-humor st-section" aria-labelledby="st-humor-title">
    <p class="st-eyebrow">${lang==='ar'?'روحنا':lang==='ja'?'私たちの姿勢':'OUR ATTITUDE'}</p>
    <div class="st-humor-stage">
      <span class="st-spoon" aria-hidden="true">🥄</span><span class="st-humor-dot" aria-hidden="true">.</span>
      <h2 id="st-humor-title"><span class="st-sincere">${t.future.value[0]}</span><span class="st-playful">${t.future.value[1]}</span></h2>
      <div class="st-oops"><span class="st-iskandar" role="img" aria-label="${lang==='ja'?'ハットをかぶったイスカンダル':lang==='en'?'Iskandar wearing his hat':'إسكندر يرتدي قبعته'}"></span><p class="st-speech">${lang==='ja'?'あ、入れすぎた。':lang==='en'?'Oops. A little too much.':'أوه، أكثر بقليل.'}</p></div>
    </div>
    <button class="st-humor-replay" type="button">${lang==='ja'?'ユーモアをひとさじ':lang==='en'?'A spoonful of humor':'ملعقة من روح الدعابة'}<span aria-hidden="true">＋</span></button>
  </section>
  <section class="st-next st-section" id="next" aria-labelledby="st-next-title"><div><p class="st-eyebrow">${t.next.label}</p><h2 id="st-next-title">${lines(t.next.title)}</h2></div><div><p>${t.next.body}</p><div class="st-actions"><a href="/${lang}/services/">${t.next.services} <span aria-hidden="true">↗</span></a><a href="${members}">${t.next.members} <span aria-hidden="true">↗</span></a></div><a class="st-link" href="/${lang}/contact/">${t.next.contact} <span aria-hidden="true">↗</span></a></div></section></main>`;
  if(polish && typeof window.requestAnimationFrame==='function'){
    const stage=document.querySelector('.atlas-stage'),sections=chapterIds.map(id=>document.getElementById(id)),motion=window.matchMedia('(prefers-reduced-motion: reduce)');let frame=0,last=-1;
    function paint(){frame=0;const h=innerHeight,marker=h*(innerWidth<800?.62:.48);let idx=0;
      sections.forEach((s,i)=>{if(s.getBoundingClientRect().top<=marker)idx=i});
      const r=sections[idx].getBoundingClientRect(),v=Math.min(1,Math.max(0,(marker-r.top)/Math.max(1,r.height)));
      stage.style.setProperty('--pan',motion.matches?'0':String(v));
      if(last!==idx){last=idx;stage.dataset.scene=idx;stage.querySelector('.atlas-portrait').hidden=idx!==1;stage.querySelector('.atlas-sign strong').textContent=sceneWords[idx];stage.querySelector('.atlas-meter span').textContent='0'+(idx+1)+' / 04';
      stage.querySelectorAll('nav a').forEach((a,i)=>i===idx?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current'));}}
    function schedule(){if(!frame)frame=requestAnimationFrame(paint)}
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);motion.addEventListener?.('change',schedule);schedule();
  }
  if(polish && 'IntersectionObserver' in window){
    const seen=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('story-arrived');seen.unobserve(e.target)}}),{threshold:.12});
    document.querySelectorAll('.st-section:not(.st-hero)').forEach(s=>seen.observe(s));
  }
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
