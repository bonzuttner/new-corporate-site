(()=>{
'use strict';
const $=id=>document.getElementById(id),fields=['title','category','summary','body','location','employment','requirements','apply','alt'];
let kind='news',slug=crypto.randomUUID(),locale='ja',rev=0,visible=false,dirty=false,pic='',role='',rows=[],busy=false,reading=false;
const msg=s=>$('status').textContent=s,url=()=>'/admin/api/'+kind+'/'+slug+'/'+locale;
async function api(p,data){const r=await fetch(p,data?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}:{});const j=await r.json();if(!r.ok)throw Error(r.status===409?'他の人が更新しました。原稿を控えてから開き直してください。':r.status===401?'ログイン期限が切れました。原稿を控えてから再ログインしてください。':j.error);return j}
function lock(task){return async()=>{if(busy||reading)return;busy=true;const desk=document.querySelector('.desk');desk.inert=true;try{await task()}catch(e){msg(e.message)}finally{busy=false;desk.inert=false}}}
function controls(){const pub=role==='publisher';$('publish').hidden=!pub;$('publish').disabled=!rev||dirty;$('withdraw').hidden=!pub||!visible;$('withdraw').disabled=dirty;$('kind').textContent=(kind==='news'?'お知らせ':'募集')+' ／ '+(visible?'掲載中':'下書き');$('withdraw').textContent=kind==='news'?'掲載を取り下げる':'募集を終了する'}
function picture(){if(pic)$('thumb').src=pic;else $('thumb').removeAttribute('src');$('imageTools').hidden=!pic}
function fill(x){const d=x.draft;rev=x.rev;visible=x.visible;pic=d.pic||'';dirty=false;$('file').value='';picture();for(const id of fields)$(id).value=d[id]||'';const job=kind==='recruit';$('jobFields').hidden=$('extra').hidden=!job;$('newsFields').hidden=job;$('bodyLabel').textContent=job?'仕事内容':'本文';$('titleLabel').textContent=job?'募集職種':'タイトル';for(const l of ['ja','en'])$(l).setAttribute('aria-pressed',String(l===locale));controls()}
async function select(k,s,l){if(dirty&&!confirm('未保存の変更を破棄して切り替えますか？'))return;const d=await api('/admin/api/'+k+'/'+s+'/'+l);kind=k;slug=s;locale=l;fill(d);list();msg('')}
function list(){$('empty').hidden=!!rows.length;$('drafts').replaceChildren();for(const d of rows){const li=document.createElement('li'),b=document.createElement('button'),small=document.createElement('small');small.textContent=[d.kind==='news'?'お知らせ':'募集',d.locale,d.visible?'掲載中':'下書き'].join(' ／ ');b.setAttribute('aria-current',String(d.slug===slug&&d.locale===locale&&d.kind===kind));b.append(small,d.title);b.onclick=lock(()=>select(d.kind,d.slug,d.locale));li.append(b);$('drafts').append(li)}}
async function refresh(){const x=await api('/admin/api/list');role=x.role;rows=x.items;list();controls()}
for(const [id,k] of [['news','news'],['job','recruit']])$(id).onclick=lock(()=>select(k,crypto.randomUUID(),'ja'));
for(const l of ['ja','en'])$(l).onclick=lock(()=>l!==locale&&select(kind,slug,l));
function changed(){dirty=true;controls();msg('未保存の変更があります。')}
$('editor').oninput=changed;
$('file').onchange=async()=>{const f=$('file').files[0];if(!f)return;if(!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>500000){$('file').value='';msg('500 KB以下のJPEG・PNG・WebPを選んでください。');return}reading=true;const r=new FileReader();r.onload=()=>{pic=r.result;picture();changed()};r.onerror=()=>msg('画像を読み込めませんでした。');r.onloadend=()=>reading=false;r.readAsDataURL(f)};
$('remove').onclick=()=>{pic='';$('file').value='';$('alt').value='';picture();changed()};
function draft(){return {...Object.fromEntries(fields.map(f=>[f,$(f).value])),pic}}
async function write(action){if(action!=='save'&&!confirm((locale==='ja'?'日本語版':'英語版')+'を'+(action==='publish'?'公開しますか？':'取り下げますか？')))return;const x=await api(url(),{action,rev,draft:action==='save'?draft():undefined});rev=x.rev;visible=x.visible;dirty=false;controls();msg(action==='save'?'下書きをサーバーに保存しました。':action==='publish'?'公開しました。':'取り下げました。');await refresh()}
$('editor').onsubmit=e=>{e.preventDefault();lock(()=>write('save'))()};$('publish').onclick=lock(()=>write('publish'));$('withdraw').onclick=lock(()=>write('withdraw'));
$('logout').onclick=lock(async()=>{if(dirty&&!confirm('未保存の変更を破棄してログアウトしますか？'))return;await api('/admin/logout',{});dirty=false;location.replace('/')});
$('preview').onclick=()=>{const s=$('sheet'),x=draft(),en=locale==='en',job=kind==='recruit';s.lang=locale;s.replaceChildren();const add=(tag,str)=>{if(str){const el=document.createElement(tag);el.textContent=str;s.append(el)}};add('small',job?(en?'Careers':'採用情報'):x.category||(en?'News':'お知らせ'));add('h2',x.title||(en?'Untitled':'無題'));add('p',x.summary);if(!job&&x.pic){const im=document.createElement('img');im.src=x.pic;im.alt=x.alt||'';s.append(im)}if(job){add('p',[x.location,x.employment].filter(Boolean).join(' ／ '));if(x.body)add('h3',en?'Responsibilities':'仕事内容')}add('p',x.body);if(job&&x.requirements){add('h3',en?'Requirements':'応募条件');add('p',x.requirements)}if(job&&x.apply){add('h3',en?'Application URL':'応募先');add('p',x.apply)}$('paper').showModal()};
$('close').onclick=()=>$('paper').close();window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
lock(async()=>{await refresh();fill({draft:{},visible:false,rev:0})})();
})();
