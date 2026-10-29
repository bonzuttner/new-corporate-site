import fs from 'node:fs';
import assert from 'node:assert/strict';
import{JSDOM}from'jsdom';
const languages=JSON.parse(fs.readFileSync('src/content/published-locales.json','utf8'));
const pages=JSON.parse(fs.readFileSync('src/generated/pages.json','utf8'));
assert.deepEqual(languages,['ja','en']);assert(!fs.existsSync('out/ar'));
assert(fs.existsSync('src/content/locales/ar.json'));
for(const key of ['',...Object.keys(pages)]){
 const file=key?`out/${key}${key.endsWith('/')?'':'/'}index.html`:'out/index.html';const doc=new JSDOM(fs.readFileSync(file,'utf8')).window.document;
 assert(!doc.querySelector('a[lang="ar"],a[href^="/ar/"]'),`Arabic navigation remains on ${file}`);
 if(key)assert(languages.includes(doc.documentElement.lang));
}
console.log(`PASS: ${Object.keys(pages).length} Japanese/English pages only; no Arabic exports or navigation links; Arabic source retained.`);
