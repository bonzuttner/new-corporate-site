import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {JSDOM,VirtualConsole} from 'jsdom';
const pages=JSON.parse(fs.readFileSync('src/generated/pages.json','utf8'));
const dictionaries=Object.fromEntries(['ja','en','ar'].map(lang=>[lang,JSON.parse(fs.readFileSync(`src/content/locales/${lang}.json`,'utf8'))]));
const translations=Object.fromEntries(Object.keys(dictionaries.ja).map(key=>[key,Object.fromEntries(['ja','en','ar'].map(lang=>[lang,dictionaries[lang][key]]))]));
let assets=0,dialogs=0;
for(const [key,page] of Object.entries(pages)){
 const file=`out/${key}${key.endsWith('/')?'':'/'}index.html`;
 assert(fs.existsSync(file),`Missing exported route: ${file}`);
 const dom=new JSDOM(fs.readFileSync(file,'utf8'),{url:`https://bonzuttner.example/${key}/`,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:new VirtualConsole()});
 const w=dom.window;const evaluate=code=>vm.runInContext(code,dom.getInternalVMContext());w.BZTranslations=translations;
 assert.equal(w.document.documentElement.lang,page.locale);
 assert.equal(w.document.documentElement.dir,page.locale==='ar'?'rtl':'ltr');
 assert.equal(w.document.querySelectorAll('#app').length,1);
 assert(w.document.querySelector('main'),`No prerendered main: ${key}`);
 assert.equal(w.document.querySelectorAll('.site-footer').length,1);
 for(const node of w.document.querySelectorAll('img[src],link[rel="stylesheet"]')){
  const src=(node.getAttribute('src')||node.getAttribute('href')).split('?')[0];
  if(src.startsWith('/')){assert(fs.existsSync(`out${src}`),`${key} missing asset ${src}`);assets++;}
 }
 for(const [name,value]of Object.entries(page.bodyAttributes))w.document.body.setAttribute(name,value);
 Object.defineProperty(w.document,'readyState',{get:()=> 'complete'});
 w.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
 w.IntersectionObserver=class{observe(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};
 w.requestAnimationFrame=()=>0;w.cancelAnimationFrame=()=>{};w.scrollTo=()=>{};
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
 for(const script of page.scripts){
  const file=`public${script.src.split('?')[0]}`;let source=fs.readFileSync(file,'utf8');
  if(script.module){
   evaluate('(function(){'+fs.readFileSync('public/assets/top-news.js','utf8').replace(/export function/g,'function')+'\nwindow.topNewsMarkup=topNewsMarkup;window.mountTopNews=mountTopNews;})();');
   source='(function(){'+source.replace(/^import .*?;\n/,'').replace(/await import\([^;]+\);/g,'')+'})();';
  }
  evaluate(source);
 }
 if(page.slug[0]==='development'){
  const triggers=[...w.document.querySelectorAll('[data-project]')];assert(triggers.length>=8);
  for(const project of w.BonZuttnerDevelopmentCases){
   assert.notEqual(project.id,'polariss');const button=triggers.find(node=>node.dataset.project===project.id);assert(button,`${key} missing ${project.id}`);button.click();
   const dialog=w.document.querySelector('.dev-project-dialog');assert(dialog.open);assert(dialog.textContent.includes(project.title[page.locale]));dialogs++;dialog.close();dialog.dispatchEvent(new w.Event('close'));
  }
 }
 if(page.slug[0]==='members') {
  const triggers=[...w.document.querySelectorAll('[data-profile]')];assert.equal(triggers.length,10);
  for(const trigger of triggers){trigger.click();const dialog=w.document.querySelector('#mb-profile-dialog');assert(dialog.open);assert.equal(dialog.querySelectorAll('dt').length,3);dialog.close();dialog.dispatchEvent(new w.Event('close'));dialogs++;}
 }
 if(page.slug[0]==='contact') {
  const form=w.document.querySelector('#contact-form');form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert(!w.document.querySelector('#cp-error-summary').hidden);
  for(const [id,value] of Object.entries({'cp-topic':'development','cp-name':'Sample','cp-email':'sample@example.com','cp-message':'Testing form review.'}))w.document.getElementById(id).value=value;
  w.document.querySelector('#cp-consent').checked=true;form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert(!w.document.querySelector('#cp-confirm-stage').hidden);assert(w.document.querySelector('#cp-send').disabled);w.document.querySelector('#cp-edit').click();assert(!w.document.querySelector('#cp-input-stage').hidden);
 }
 if(page.slug[0]==='akarel'){
  const tabs=[...w.document.querySelectorAll('[role="tab"]')];assert.equal(tabs.length,2);tabs[1].click();assert.equal(tabs[1].getAttribute('aria-selected'),'true');tabs[0].click();assert.equal(tabs[0].getAttribute('aria-selected'),'true');
 }
 await new Promise(resolve=>setTimeout(resolve,0));dom.window.close();
}
for(const lang of ['en','ar'])assert.deepEqual(Object.keys(dictionaries[lang]),Object.keys(dictionaries.ja));
console.log(`PASS: ${Object.keys(pages).length} exported routes, ${assets} asset references, ${dialogs} project/member modal opens, published-language Akarel tabs and contact form validation/review, matching translation keys.`);
