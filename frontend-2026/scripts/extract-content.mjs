// One-time extraction of localized copy; normal builds use the checked-in JSON.
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const locales = {ja:{},en:{},ar:{}};
for (const filename of fs.readdirSync('src/legacy/scripts').filter(f=>f.endsWith('.js'))) {
 let source=fs.readFileSync(`src/legacy/scripts/${filename}`,'utf8');
 const ast=ts.createSourceFile(filename,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
 const edits=[];let index=0;
 function visit(node){
  if(ts.isObjectLiteralExpression(node)) {
   const keys=node.properties.map(p=>p.name?.getText(ast).replace(/^['"]|['"]$/g,''));
   if(['ja','en','ar'].every(k=>keys.includes(k))){
    try {const value=vm.runInNewContext(`(${node.getText(ast)})`,{}, {timeout:1000});const key=`${filename.replace('.js','')}.${index++}`;
     for(const lang of Object.keys(locales))locales[lang][key]=value[lang];
     edits.push({start:node.getStart(ast),end:node.end,text:`window.BZTranslations[${JSON.stringify(key)}]`});return;
    } catch { /* non-literal domain data stays with its module */ }
   }
  }ts.forEachChild(node,visit);
 }visit(ast);
 for(const edit of edits.reverse())source=source.slice(0,edit.start)+edit.text+source.slice(edit.end);
 fs.writeFileSync(`src/legacy/scripts/${filename}`,source);
}
for(const [lang,value] of Object.entries(locales))fs.writeFileSync(`src/content/locales/${lang}.json`,JSON.stringify(value,null,2)+'\n');
console.log('Extracted localized copy:',Object.fromEntries(Object.entries(locales).map(([lang,data])=>[lang,Object.keys(data).length])));
