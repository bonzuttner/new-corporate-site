(() => {
  const lang = ['ja','en','ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ja';
  const copy = window.BZTranslations["satellite-agri.0"];
  const t=copy[lang];
  const lines=items=>items.map(line=>`<span class="sat-heading-line">${line}</span>`).join('');
  const veggies=()=>[0,1,2].map(i=>`<i class="ag-veg ag-veg-${i}" aria-hidden="true"></i>`).join('');
  const languages=[['ja','日本語'],['en','English'],['ar','العربية']].map(([code,name])=>`<a href="/${code}/satellite/" lang="${code}" ${code===lang?'aria-current="page"':''}>${name}</a>`).join('');
  const contact='mailto:info@bonzuttner.com?subject='+encodeURIComponent('Agriculture satellite data enquiry');
  if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML =`
    <a class="skip" href="#main">${t.skip}</a><header class="service-nav"><a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a><nav aria-label="${t.navigation}">${t.nav.map(([url,label])=>`<a href="${url}">${label}</a>`).join('')}</nav><div class="service-actions"><div class="service-languages" aria-label="${t.language}">${languages}</div><a class="service-consult" href="#contact">${t.consult}</a></div></header>
    <main id="main" class="ag-main" data-playing="true"><section class="sat-hero ag-hero" aria-labelledby="sat-title"><div><img class="sat-logo" src="/assets/satellite-data-ai-logo.png" alt="${t.logo}"><p class="sat-eyebrow" dir="ltr">SATELLITE DATA × AGRICULTURE</p><h1 id="sat-title">${lines(t.title)}</h1><p class="sat-lead">${t.lead}</p><div class="sat-actions"><a class="sat-primary" href="#contact">${t.action}</a><a class="sat-text-link" href="#applications">${t.explore}</a></div></div><div class="sat-visual"><div class="ag-sky" aria-hidden="true"><div class="ag-earth sat-sprite"></div><div class="ag-satellite sat-sprite"></div><div class="ag-beam"></div><div class="ag-hero-field sat-sprite"></div><div class="ag-harvest">${veggies()}</div></div><p class="ag-scene-label">${t.sceneLabel}</p><div class="sat-visual-controls"><button class="sat-motion" type="button" aria-pressed="false"></button></div></div></section>
    <section class="ag-questions sat-section" id="applications" aria-labelledby="ag-question-title"><header><p class="sat-eyebrow">${t.field.label}</p><h2 id="ag-question-title">${lines(t.field.title)}</h2><p class="sat-lead">${t.field.intro}</p></header><div class="ag-explorer"><div class="ag-tabs" role="tablist" aria-orientation="vertical" aria-label="${t.explore}">${t.field.tabs.map((label,i)=>`<button type="button" role="tab" id="ag-tab-${i}" aria-controls="ag-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-question="${i}"><span>${label}</span><span aria-hidden="true">↗</span></button>`).join('')}</div><div class="ag-map" data-mode="0"><div class="ag-map-art" aria-hidden="true"><div class="ag-map-field sat-sprite"></div><div class="ag-map-scan"></div><div class="ag-map-vegetables">${veggies()}</div></div><p class="ag-map-caption"></p></div><div class="ag-answer" id="ag-panel" role="tabpanel" tabindex="0" aria-labelledby="ag-tab-0"></div></div><p class="sat-scope-note">${t.field.note}</p></section>
    <section class="ag-partnership sat-section" aria-labelledby="ag-partnership-title"><div class="ag-partnership-head"><p class="sat-eyebrow">${t.partnership.label}</p><h2 id="ag-partnership-title">${lines(t.partnership.title)}</h2><p class="ag-punch">${t.partnership.punch}</p></div><div class="ag-partnership-copy"><p>${t.partnership.body}</p><div class="ag-ground-note"><h3>${t.partnership.sub}</h3><p>${t.partnership.detail}</p></div></div></section>
    <section class="sat-contact sat-section" id="contact" aria-labelledby="sat-contact-title"><div><p class="sat-eyebrow">${t.cta.label}</p><h2 id="sat-contact-title">${lines(t.cta.title)}</h2></div><div><p>${t.cta.body}</p><a class="sat-primary" href="${contact}">${t.cta.action}</a><a class="sat-text-link" href="/${lang}/services/">${t.cta.back}</a></div></section></main>`;
  const tabs=[...document.querySelectorAll('[data-question]')];
  const panel=document.querySelector('#ag-panel'), map=document.querySelector('.ag-map'), caption=document.querySelector('.ag-map-caption');
  function select(index,focus=false){
    const item=t.field.topics[index];
    map.dataset.mode=String(index);caption.textContent=t.field.visual[index];
    panel.innerHTML=`<p class="sat-eyebrow" dir="ltr">${item.label}</p><h3>${item.title}</h3><p>${item.body}</p><ul class="ag-data">${item.data.map(name=>`<li>${name}</li>`).join('')}</ul><p class="ag-decision">${item.decision}</p>`;
    panel.setAttribute('aria-labelledby',`ag-tab-${index}`);
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});
    if(focus)tabs[index].focus();
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>select(i));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowDown')next=i+1;
      else if(event.key==='ArrowUp')next=i-1;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      if(next===undefined)return;event.preventDefault();select((next+tabs.length)%tabs.length,true);
    });
  });
  const main=document.querySelector('.ag-main'),button=document.querySelector('.sat-motion'),reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing=!reduced.matches;
  function motion(){main.dataset.playing=String(playing);button.textContent=playing?t.pause:t.play;button.setAttribute('aria-pressed',String(!playing));button.hidden=reduced.matches;}
  button.addEventListener('click',()=>{playing=!playing;motion()});
  reduced.addEventListener('change',()=>{playing=!reduced.matches;motion()});
  document.addEventListener('visibilitychange',()=>{main.classList.toggle('ag-out-of-view',document.hidden)});
  select(0);motion();
})();
