(() => {
  function mount() {
    const lang = ['ja','en','ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ja';
    const page = location.pathname.split('/')[2] || '';
    const topic = ['dx-ai','development','akarel','polariss','satellite'].includes(page) ? `?topic=${page}` : '';
    const contact = `/${lang}/contact/${topic}`;
    const copy = window.BZTranslations["site-shell.0"];
    const t=copy[lang];
    const newsLabel=window.BZTranslations["site-shell.1"][lang];
    const recruitLabel=window.BZTranslations["site-shell.2"][lang];
    const header=document.querySelector('.service-nav, .modern-bar');
    if(header){
      header.classList.add('bz-header');
      const nav=header.querySelector('nav');
      const routes=['','services/','story/','members/','company/','news/','recruit/'];
      const labels=[t.links[0],t.services,t.links[1],t.links[2],t.company,newsLabel,recruitLabel];
      if(nav)nav.innerHTML=routes.map((route,i)=>`<a href="/${lang}/${route}" ${page===route.replace('/','')?'aria-current="page"':''}>${labels[i]}</a>`).join('');
      const action=header.querySelector('.service-consult');
      if(action){action.href=contact;action.textContent=t.contact;}
    }
    document.querySelectorAll('.service-consult, #contact a[href^="mailto:"], #next a[href^="mailto:"]').forEach(link=>{
      if(link.classList.contains('co-email'))return;
      link.href=contact;
    });
    if(document.querySelector('.site-footer'))return;
    let route=page&&page!=='privacy-policy'?`${page}/`:'';
    if(['news','recruit'].includes(page)) {
      const params=new URLSearchParams(location.search),query=new URLSearchParams();
      const detailSegment=page==='news'?'article':'position';
      if(location.pathname.includes(`/${detailSegment}/`)) {route=`${page}/${detailSegment}/`;if(params.get('slug'))query.set('slug',params.get('slug'));}
      if(params.get('preview')==='layout')query.set('preview','layout');
      if(query.size)route+=`?${query}`;
    }
    const footer=document.createElement('footer');footer.className='site-footer';
    const links=(routes,labels)=>routes.map((route,i)=>`<li><a href="/${lang}/${route}">${labels[i]}</a></li>`).join('');
    footer.innerHTML=`<div class="sf-top"><a class="sf-brand" href="/${lang}/" dir="ltr">BonZuttner</a><div class="sf-contact"><p>${t.talk}</p><a class="sf-contact-action" href="${contact}">${t.action}</a></div></div><nav class="sf-navigation" aria-label="${t.nav}"><div class="sf-link-group"><h2>${t.about}</h2><ul>${links(['','story/','members/','company/','news/','recruit/'],[...t.links,newsLabel,recruitLabel])}</ul></div><div class="sf-link-group"><h2>${t.services}</h2><ul>${links(['dx-ai/','development/','akarel/','polariss/','satellite/'],t.serviceLinks)}</ul></div><div class="sf-link-group sf-email"><h2>${t.contact}</h2><a href="${contact}">${t.contact}</a></div></nav><div class="sf-bottom"><small dir="ltr">© ${new Date().getFullYear()} BonZuttner Inc.</small><a href="/ja/privacy-policy/" target="_blank" rel="noopener noreferrer">${t.privacy}</a><div class="sf-languages" aria-label="${t.language}">${[['ja','JA'],['en','EN'],['ar','AR']].map(([code,label])=>`<a href="/${code}/${route}" lang="${code}" ${code===lang?'aria-current="page"':''}>${label}</a>`).join('')}</div></div>`;
    document.querySelector('#app').appendChild(footer);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
