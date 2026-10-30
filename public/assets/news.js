(() => {
  const lang=['ja','en','ar'].includes(document.documentElement.lang)?document.documentElement.lang:'ja';
  const mode=document.body.dataset.newsView||'list',params=new URLSearchParams(location.search),preview=params.get('preview')==='layout',slug=params.get('slug');
  const t=window.BZTranslations["news.0"][lang];
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const api=window.BonZuttnerNewsApi;
  const sampleSuffix=preview?'?preview=layout':'';
  const listUrl=`/${lang}/news/${sampleSuffix}`;
  function articleUrl(item){const query=new URLSearchParams({slug:item.slug});if(preview)query.set('preview','layout');return `/${lang}/news/article/?${query}`;}
  const languageUrl=code=>mode==='article'?articleUrl({slug:slug||''}).replace(`/${lang}/`,`/${code}/`):`/${code}/news/${sampleSuffix}`;
  const samples=t.sampleTitles.map((title,i)=>({slug:`layout-sample-${i+1}`,title,category:t.sampleCategories[i],excerpt:t.sampleExcerpt,publishedAt:null,cover:null,blocks:[{type:'paragraph',text:t.sampleBody},{type:'heading',text:t.sampleHeading},{type:'paragraph',text:t.sampleBody},{type:'list',items:t.sampleList}]}));
  if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML =`<a class="skip" href="#main">${t.skip}</a><header class="service-nav"><a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a><nav aria-label="${t.navigation}">${['','services/','story/','members/','company/'].map((route,i)=>`<a href="/${lang}/${route}">${t.nav[i]}</a>`).join('')}</nav><div class="service-actions"><div class="service-languages" aria-label="${t.language}">${[['ja','JA'],['en','EN'],['ar','AR']].map(([code,label])=>`<a href="${languageUrl(code)}" lang="${code}" ${code===lang?'aria-current="page"':''}>${label}</a>`).join('')}</div><a class="service-consult" href="/${lang}/contact/">${t.consult}</a></div></header><main id="main" class="nw-main">${preview?`<aside class="nw-preview"><p>${t.previewLabel}</p><a href="/${lang}/news/">${t.leavePreview}</a></aside>`:''}${mode==='list'?`<header class="nw-heading"><div><p class="nw-eyebrow">NEWS</p><h1>${t.page}${lang==='ja'?'。':''}</h1></div><p>${t.intro}</p></header><section class="nw-list-section" aria-labelledby="nw-list-title"><h2 id="nw-list-title">${t.latest}</h2><div id="nw-content" aria-busy="true"><p class="nw-loading" role="status">${t.loading}</p></div><div id="nw-pagination"></div></section>`:`<div class="nw-back"><a href="${listUrl}">${t.back}</a></div><div id="nw-content" aria-busy="true"><p class="nw-loading" role="status">${t.loading}</p></div>`}</main>`;
  const content=document.querySelector('#nw-content'),pagination=document.querySelector('#nw-pagination');
  let page=0,busy=false,items=[];
  function dateMarkup(item){return item.publishedAt?`<time datetime="${esc(item.publishedAt)}" dir="ltr">${esc(item.publishedAt.slice(0,10).replaceAll('-','.'))}</time>`:`<span class="nw-date-placeholder" dir="ltr">${t.datePlaceholder}</span>`;}
  function notice(title,body,retry=false){content.innerHTML=`<div class="nw-notice"><p class="nw-notice-title">${title}</p><p>${body}</p>${retry?`<button type="button" id="nw-retry">${t.retry}</button>`:''}${mode==='article'?`<a href="${listUrl}">${t.back}</a>`:''}</div>`;if(retry)document.querySelector('#nw-retry').addEventListener('click',()=>mode==='article'?loadArticle():loadList());}
  function listMarkup(){return `<ul class="nw-list">${items.map(item=>`<li><a class="nw-item ${item.cover?'nw-item--image':''}" href="${articleUrl(item)}"><div class="nw-item-meta">${dateMarkup(item)}${item.category?`<span class="nw-category">${esc(item.category)}</span>`:''}</div>${item.cover?`<figure class="nw-thumbnail"><img src="${esc(item.cover.src)}" alt="${esc(item.cover.alt)}" loading="lazy" width="240" height="180"></figure>`:''}<div class="nw-item-copy"><h3>${esc(item.title)}</h3>${item.excerpt?`<p>${esc(item.excerpt)}</p>`:''}</div><span class="nw-read">${t.read}</span></a></li>`).join('')}</ul>`;}
  function blockMarkup(block){
    if(!block||typeof block!=='object')return '';
    if(block.type==='paragraph'&&typeof block.text==='string')return `<p>${esc(block.text)}</p>`;
    if(block.type==='heading'&&typeof block.text==='string')return `<h2>${esc(block.text)}</h2>`;
    if(block.type==='list'&&Array.isArray(block.items))return `<ul>${block.items.filter(item=>typeof item==='string').map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`;
    if(block.type==='image'&&api.safeUrl(block.src))return `<figure><img src="${esc(api.safeUrl(block.src))}" alt="${esc(block.alt||'')}" loading="lazy">${block.caption?`<figcaption>${esc(block.caption)}</figcaption>`:''}</figure>`;
    if(block.type==='link'&&api.safeUrl(block.href)&&typeof block.text==='string')return `<p><a href="${esc(api.safeUrl(block.href))}" rel="noopener noreferrer">${esc(block.text)}</a></p>`;
    return '';
  }
  function renderArticle(item){
    document.title=`${item.title} | BonZuttner`;
    document.querySelector('meta[name="description"]').setAttribute('content',item.excerpt||item.title);
    content.innerHTML=`<article class="nw-article"><header class="nw-article-heading"><div class="nw-article-meta">${dateMarkup(item)}${item.category?`<span class="nw-category">${esc(item.category)}</span>`:''}</div><h1>${esc(item.title)}</h1>${item.excerpt?`<p class="nw-article-lead">${esc(item.excerpt)}</p>`:''}</header>${item.cover?`<figure class="nw-cover"><img src="${esc(item.cover.src)}" alt="${esc(item.cover.alt)}" width="1200" height="800"></figure>`:''}<div class="nw-article-body">${item.blocks.map(blockMarkup).join('')}</div><div class="nw-article-end"><a href="${listUrl}">${t.back}</a></div></article>`;
  }
  async function loadList(more=false){
    if(busy)return;busy=true;content.setAttribute('aria-busy','true');const button=document.querySelector('#nw-more');if(button){button.disabled=true;button.textContent=t.loading;}
    const next=more?page+1:1;
    try{
      if(!preview&&!api.configured('list')){notice(t.unavailable,t.unavailableBody);return;}
      const result=preview?{items:samples,hasMore:false}:await api.list(lang,next);
      items=more?[...items,...result.items.filter(item=>!items.some(existing=>existing.slug===item.slug))]:result.items;page=next;
      if(items.length)content.innerHTML=listMarkup();else notice(t.empty,t.emptyBody);
      pagination.innerHTML=result.hasMore?`<button type="button" class="nw-more" id="nw-more">${t.more}</button>`:'';
      if(result.hasMore)document.querySelector('#nw-more').addEventListener('click',()=>loadList(true));
      if(more){const first=document.querySelector(`.nw-list a[href="${articleUrl(result.items[0]||{slug:''})}"]`);first?.focus();}
    }catch(error){
      if(more){pagination.innerHTML=`<p class="nw-page-error" role="alert">${t.error}</p><button type="button" class="nw-more" id="nw-more">${t.retry}</button>`;document.querySelector('#nw-more').addEventListener('click',()=>loadList(true));}
      else notice(t.error,t.errorBody,true);
    }finally{busy=false;content.setAttribute('aria-busy','false');}
  }
  async function loadArticle(){
    if(busy)return;busy=true;content.setAttribute('aria-busy','true');
    try{
      if(preview){const sample=samples.find(item=>item.slug===slug);if(sample)renderArticle(sample);else notice(t.notFound,t.notFoundBody);return;}
      if(!api.configured('article')){notice(t.unavailable,t.unavailableBody);return;}
      renderArticle(await api.detail(lang,slug));
    }catch(error){if(error.code==='not-found')notice(t.notFound,t.notFoundBody);else notice(t.error,t.errorBody,true);}
    finally{busy=false;content.setAttribute('aria-busy','false');}
  }
  if(mode==='article')loadArticle();else loadList();
})();
