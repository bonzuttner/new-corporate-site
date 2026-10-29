(() => {
  class NewsError extends Error {constructor(code){super(code);this.code=code;}}
  const safeUrl=value=>{
    if(typeof value!=='string'||!value||/[\u0000-\u0020\\]/.test(value))return '';
    if(value.startsWith('/')&&!value.startsWith('//'))return value;
    try {const url=new URL(value);return ['https:','http:'].includes(url.protocol)?url.href:'';}catch{return '';}
  };
  function record(raw,locale) {
    if(!raw||raw.status!=='published'||raw.locale!==locale||typeof raw.slug!=='string'||!/^[a-z0-9][a-z0-9-]{0,119}$/.test(raw.slug)||typeof raw.title!=='string'||!raw.title.trim()||typeof raw.publishedAt!=='string'||!/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(raw.publishedAt))return null;
    const date=Date.parse(raw.publishedAt);if(!Number.isFinite(date)||date>Date.now())return null;
    return {slug:raw.slug,title:raw.title,category:typeof raw.category==='string'?raw.category:'',excerpt:typeof raw.excerpt==='string'?raw.excerpt:'',publishedAt:raw.publishedAt,cover:raw.cover&&safeUrl(raw.cover.src)?{src:safeUrl(raw.cover.src),alt:typeof raw.cover.alt==='string'?raw.cover.alt:''}:null,blocks:Array.isArray(raw.blocks)?raw.blocks:[]};
  }
  async function request(endpoint,params) {
    if(!endpoint)throw new NewsError('unavailable');
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
    try {
      const url=new URL(endpoint,location.origin);Object.entries(params).forEach(([key,value])=>url.searchParams.set(key,value));
      const response=await fetch(url.href,{signal:controller.signal,credentials:'same-origin',headers:{Accept:'application/json'}});
      if(response.status===404)throw new NewsError('not-found');
      if(!response.ok)throw new NewsError('network');
      try{return await response.json();}catch{throw new NewsError('invalid');}
    }catch(error){if(error instanceof NewsError)throw error;throw new NewsError('network');}finally{clearTimeout(timeout);}
  }
  window.BonZuttnerNewsApi={
    safeUrl,
    configured:mode=>!!window.BONZUTTNER_NEWS?.[mode==='article'?'detailEndpoint':'listEndpoint'],
    async list(locale,page=1){
      const result=await request(window.BONZUTTNER_NEWS?.listEndpoint,{locale,page,pageSize:8});
      if(!result||!Array.isArray(result.items)||typeof result.hasMore!=='boolean')throw new NewsError('invalid');
      return {items:result.items.map(item=>record(item,locale)).filter(Boolean),hasMore:result.hasMore};
    },
    async detail(locale,slug){
      if(!/^[a-z0-9][a-z0-9-]{0,119}$/.test(slug||''))throw new NewsError('not-found');
      const result=await request(window.BONZUTTNER_NEWS?.detailEndpoint,{locale,slug});
      const item=record(result?.item,locale);if(!item||item.slug!==slug)throw new NewsError('not-found');return item;
    }
  };
})();
