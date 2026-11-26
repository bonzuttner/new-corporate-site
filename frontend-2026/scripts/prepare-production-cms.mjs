// Run after the normal static build, when the same-origin backend is available.
import {writeFileSync,rmSync} from 'node:fs';
for(const [file,global,kind] of [['news','BONZUTTNER_NEWS','news'],['recruit','BONZUTTNER_RECRUIT','recruit']]){
 writeFileSync('out/assets/'+file+'-config.js','window.'+global+'='+JSON.stringify({listEndpoint:'/api/cms/'+kind+'/list',detailEndpoint:'/api/cms/'+kind+'/detail'})+';\n');
}
rmSync('out/cms-preview',{recursive:true,force:true});
