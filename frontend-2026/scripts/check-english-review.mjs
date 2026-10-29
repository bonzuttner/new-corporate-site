import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';
import{JSDOM}from'jsdom';
import{execFileSync}from'node:child_process';
const review=JSON.parse(fs.readFileSync('docs/english-wording-review-20261028.json','utf8'));
const routes={'Top Page Review':'','Services Page Review':'services/','Our Story Page Review':'story/','Members Page Review':'members/','Company Page Review':'company/','Careers Page Review':'recruit/'};
const pages=Object.fromEntries(Object.entries(routes).map(([sheet,route])=>[sheet,new JSDOM(fs.readFileSync(`out/en/${route}index.html`,'utf8')).window.document]));
const norm=text=>text.replace(/\s+/g,'').toLowerCase();
const hero=fs.readFileSync('public/components/bonzuttner-hero/bonzuttner-hero.js','utf8'),ast=ts.createSourceFile('hero.js',hero,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);let copy;
function visit(node){if(ts.isVariableDeclaration(node)&&node.name.getText(ast)==='COPY')copy=vm.runInNewContext('('+node.initializer.getText(ast)+')');ts.forEachChild(node,visit);}visit(ast);
for(const row of review.applied){const text=row.resolution==='hero'?JSON.stringify(copy.en):pages[row.sheet].body.textContent;assert(norm(text.replace(/\\n/g,' ')).includes(norm(row.new)),`${row.sheet} ${row.row}: revised copy missing from exported content`);}
for(const lang of ['ja','ar']){
 const previous=execFileSync('git',['show',`HEAD:src/content/locales/${lang}.json`]);assert.deepEqual(fs.readFileSync(`src/content/locales/${lang}.json`),previous);
}
assert.equal(review.pending.length,1);assert.equal(review.applied.length,106);
console.log('PASS: All 106 review rows verified in exported English content / hero; Japanese and Arabic source dictionaries unchanged; one name-confirmation item pending.');
