import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

async function main() {
  let JSDOM, VirtualConsole;
  try {
    const jsdomModule = await import('jsdom');
    JSDOM = jsdomModule.JSDOM;
    VirtualConsole = jsdomModule.VirtualConsole;
  } catch (error) {
    if (fs.existsSync('src/generated/pages.json') && fs.statSync('src/generated/pages.json').size > 1000) {
      console.warn('[prepare-pages] jsdom is unavailable in this Node environment; using existing committed src/generated/pages.json');
      return;
    }
    throw error;
  }

  const publishedLocales=JSON.parse(fs.readFileSync('src/content/published-locales.json','utf8'));
  const routes=JSON.parse(fs.readFileSync('src/content/routes.json','utf8')).filter(route=>publishedLocales.includes(route.locale));
  // Remove exports for languages that are temporarily unpublished. Keep their source copy.
  for(const lang of ['ja','en','ar'])if(!publishedLocales.includes(lang))fs.rmSync(`out/${lang}`,{recursive:true,force:true});
  const dictionaries=Object.fromEntries(['ja','en','ar'].map(lang=>[lang,JSON.parse(fs.readFileSync(`src/content/locales/${lang}.json`,'utf8'))]));
  const translations={};for(const key of Object.keys(dictionaries.ja))translations[key]=Object.fromEntries(['ja','en','ar'].map(lang=>[lang,dictionaries[lang][key]]));
  const output={};fs.mkdirSync('src/generated',{recursive:true});
  for(const file of fs.readdirSync('src/legacy/scripts')){
   const source=fs.readFileSync(`src/legacy/scripts/${file}`,'utf8');
   // Only the initial page-template write is skipped in the hydrated Next.js tree.
   const adapted=source.replace(/document\.querySelector\('#app'\)\.innerHTML\s*=/,`if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML =`);
   fs.writeFileSync(`public/assets/${file}`,adapted);
  }
  for(const route of routes){
   const input=fs.readFileSync(`src/legacy/documents/${route.document}`,'utf8');
   const dom=new JSDOM(input,{url:`https://bonzuttner.example/${route.locale}/${route.slug.length?route.slug.join('/')+'/':''}`,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:new VirtualConsole()});
   const w=dom.window;w.BZTranslations=translations;const evaluate=code=>vm.runInContext(code,dom.getInternalVMContext());
   Object.defineProperty(w.document,'readyState',{get:()=> 'complete'});
   w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
   w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};
   w.ResizeObserver=class{observe(){}disconnect(){}};
   w.requestAnimationFrame=()=>0;w.cancelAnimationFrame=()=>{};w.scrollTo=()=>{};
   w.fetch=async()=>{throw new Error('CMS is not configured at build time')};
   w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
   const scripts=[...w.document.querySelectorAll('script[src]')].map(node=>({src:node.getAttribute('src'),module:node.type==='module'}));
   for(const script of scripts){
    const filename=path.basename(script.src.split('?')[0]);const file=`src/legacy/scripts/${filename}`;
    if(!fs.existsSync(file))throw new Error(`Missing script ${file}`);
    let source=fs.readFileSync(file,'utf8');
    if(filename==='site.js'){
     evaluate('(function(){'+fs.readFileSync('src/legacy/scripts/top-news.js','utf8').replace(/export function/g,'function')+'\nwindow.topNewsMarkup=topNewsMarkup;window.mountTopNews=mountTopNews;})();');
     source='(function(){'+source.replace(/^import .*?;\n/,'').replace(/await import\([^;]+\);/g,'')+'})();';
    }
    if(filename==='display-state.js')continue;
    try{evaluate(source);}catch(error){throw new Error(`${route.locale}/${route.slug.join('/')} ${filename}: ${error.stack}`);}
   }
   await new Promise(resolve=>setTimeout(resolve,0));
   const app=w.document.querySelector('#app');if(!app?.innerHTML)throw new Error(`Empty SSR content: ${route.document}`);
   for(const link of w.document.querySelectorAll('a[lang],a[href]')){const code=link.getAttribute('lang')||link.getAttribute('href')?.match(/^\/(ja|en|ar)\//)?.[1];if(code&&['ja','en','ar'].includes(code)&&!publishedLocales.includes(code))link.remove();}
   const shell=w.document.querySelector('.service-nav, .modern-bar');
   const header=shell?{tag:shell.tagName.toLowerCase(),className:shell.className,hasConsult:!!shell.querySelector('.service-consult'),brandClass:shell.querySelector('.service-brand')?.className||'service-brand',navLabel:shell.querySelector('nav')?.getAttribute('aria-label')||'',languageClass:shell.querySelector('.service-languages')?.className||'service-languages',languages:[...shell.querySelectorAll('.service-languages a')].map(a=>({locale:a.lang,label:a.textContent,href:a.getAttribute('href'),dataLanguage:a.getAttribute('data-language')})),retro:shell.querySelector('#show-retro')?.textContent||null}:null;
   if(shell)shell.replaceWith(w.document.createElement('bz-next-header'));
   const footer=w.document.querySelector('.site-footer');const footerHTML=footer?.innerHTML||'';footer?.remove();
   output[`${route.locale}/${route.slug.join('/')}`]={locale:route.locale,slug:route.slug,title:w.document.title,description:w.document.querySelector('meta[name="description"]')?.content||'',bodyAttributes:Object.fromEntries([...w.document.body.attributes].map(a=>[a.name,a.value])),styles:[...w.document.querySelectorAll('link[rel="stylesheet"]')].map(n=>n.href.replace('https://bonzuttner.example','')),html:app.innerHTML.replace(/fetchpriority=/gi,'fetchPriority='),header,footer:footerHTML,scripts:scripts.filter(s=>!['site-shell.js','display-state.js'].includes(path.basename(s.src.split('?')[0]))).map(s=>({...s,src:s.src.split('?')[0]+'?v='+(route.locale==='en'?'next-20261028':'next-20261028-ja-copy2')}))};
   dom.window.close();
  }
  fs.writeFileSync('src/generated/pages.json',JSON.stringify(output));console.log(`Prepared ${routes.length} localized pages with prerendered content.`);
}

main().catch(error => {
  if (fs.existsSync('src/generated/pages.json') && fs.statSync('src/generated/pages.json').size > 1000) {
    console.warn('[prepare-pages] Error encountered during preparation; using existing committed src/generated/pages.json:', error.message);
    process.exit(0);
  }
  console.error('[prepare-pages] Fatal error:', error);
  process.exit(1);
});
