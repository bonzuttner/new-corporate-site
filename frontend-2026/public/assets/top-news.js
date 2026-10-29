const copy=window.BZTranslations["top-news.0"];
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function topNewsMarkup(lang){const t=copy[lang],preview=new URLSearchParams(location.search).get('preview')==='layout';return `<section class="top-news" id="news" aria-labelledby="top-news-title"><header class="top-news-head"><div><p class="top-news-kicker">NEWS</p><h2 id="top-news-title">${t.heading}</h2></div><a class="top-news-all" href="/${lang}/news/${preview?'?preview=layout':''}">${t.all}</a></header>${preview?`<p class="top-news-preview">${t.preview}</p>`:''}<div id="top-news-feed" aria-busy="true"><p class="top-news-state" role="status">${t.loading}</p></div></section>`;}
export function mountTopNews(lang){
  const feed=document.querySelector('#top-news-feed');if(!feed)return;
  const t=copy[lang],api=window.BonZuttnerNewsApi,preview=new URLSearchParams(location.search).get('preview')==='layout';let busy=false;
  function notice(text,retry=false){feed.innerHTML=`<div class="top-news-state" role="status"><p>${text}</p>${retry?`<button type="button" id="top-news-retry">${t.retry}</button>`:''}</div>`;if(retry)document.querySelector('#top-news-retry').addEventListener('click',load);}
  async function load(){
    if(busy)return;busy=true;feed.setAttribute('aria-busy','true');
    try{
      if(!preview&&!api?.configured('list')){notice(t.preparing);return;}
      const samples=t.titles.map((title,i)=>({slug:`layout-sample-${i+1}`,title,category:t.categories[i],publishedAt:null,cover:null}));
      const result=preview?{items:samples}:await api.list(lang,1);
      const items=[...result.items].sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt)).slice(0,3);
      if(!items.length){notice(t.empty);return;}
      feed.innerHTML=`<ul class="top-news-items">${items.map(item=>{const query=new URLSearchParams({slug:item.slug});if(preview)query.set('preview','layout');return `<li><a class="top-news-item" href="/${lang}/news/article/?${query}">${item.cover?`<figure><img src="${esc(item.cover.src)}" alt="${esc(item.cover.alt)}" width="480" height="320" loading="lazy"></figure>`:''}<div class="top-news-meta">${item.publishedAt?`<time datetime="${esc(item.publishedAt)}" dir="ltr">${esc(item.publishedAt.slice(0,10).replaceAll('-','.'))}</time>`:'<span dir="ltr">YYYY.MM.DD</span>'}${item.category?`<span>${esc(item.category)}</span>`:''}</div><h3>${esc(item.title)}</h3></a></li>`;}).join('')}</ul>`;
    }catch{notice(t.error,true);}finally{busy=false;feed.setAttribute('aria-busy','false');}
  }
  load();
}
