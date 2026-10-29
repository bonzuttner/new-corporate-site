(() => {
  class RecruitError extends Error{constructor(code){super(code);this.code=code;}}
  const applicationUrl=value=>{
    if(typeof value!=='string'||!value||/[\u0000-\u0020\\]/.test(value))return '';
    if(value.startsWith('/')&&!value.startsWith('//'))return value;
    try{const url=new URL(value);return url.protocol==='https:'?url.href:'';}catch{return '';}
  };
  function normalize(raw,locale){
    if(!raw||raw.status!=='published'||raw.locale!==locale||typeof raw.slug!=='string'||!/^[a-z0-9][a-z0-9-]{0,119}$/.test(raw.slug)||typeof raw.title!=='string'||!raw.title.trim()||typeof raw.publishedAt!=='string')return null;
    const date=Date.parse(raw.publishedAt);if(!Number.isFinite(date)||date>Date.now())return null;
    if(raw.closesAt){const closing=Date.parse(raw.closesAt);if(!Number.isFinite(closing)||closing<=Date.now())return null;}
    const text=value=>typeof value==='string'?value:'';
    return{slug:raw.slug,title:raw.title,summary:text(raw.summary),employmentType:text(raw.employmentType),location:text(raw.location),facts:Array.isArray(raw.facts)?raw.facts.filter(f=>f&&typeof f.label==='string'&&typeof f.value==='string'):[],sections:Array.isArray(raw.sections)?raw.sections.filter(s=>s&&typeof s.heading==='string').map(s=>({heading:s.heading,paragraphs:Array.isArray(s.paragraphs)?s.paragraphs.filter(p=>typeof p==='string'):[],items:Array.isArray(s.items)?s.items.filter(p=>typeof p==='string'):[]})):[],applicationUrl:applicationUrl(raw.applicationUrl)};
  }
  async function request(endpoint,params){
    if(!endpoint)throw new RecruitError('unavailable');const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try{const url=new URL(endpoint,location.origin);Object.entries(params).forEach(([key,value])=>url.searchParams.set(key,value));const response=await fetch(url.href,{signal:controller.signal,credentials:'same-origin',headers:{Accept:'application/json'}});if(response.status===404)throw new RecruitError('not-found');if(!response.ok)throw new RecruitError('network');try{return await response.json();}catch{throw new RecruitError('invalid');}}
    catch(error){if(error instanceof RecruitError)throw error;throw new RecruitError('network');}finally{clearTimeout(timer);}
  }
  window.BonZuttnerRecruitApi={
    configured:mode=>!!window.BONZUTTNER_RECRUIT?.[mode==='detail'?'detailEndpoint':'listEndpoint'],
    async list(locale,page=1){const result=await request(window.BONZUTTNER_RECRUIT?.listEndpoint,{locale,page,pageSize:8});if(!result||!Array.isArray(result.items)||typeof result.hasMore!=='boolean')throw new RecruitError('invalid');return{items:result.items.map(item=>normalize(item,locale)).filter(Boolean),hasMore:result.hasMore};},
    async detail(locale,slug){if(!/^[a-z0-9][a-z0-9-]{0,119}$/.test(slug||''))throw new RecruitError('not-found');const result=await request(window.BONZUTTNER_RECRUIT?.detailEndpoint,{locale,slug});const item=normalize(result?.item,locale);if(!item||item.slug!==slug)throw new RecruitError('not-found');return item;}
  };
})();
