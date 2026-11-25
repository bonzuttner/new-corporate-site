(()=>{
'use strict';
const $=id=>document.getElementById(id), key='bz-editor-preview:v1', fields=['title','category','summary','body','location','employment','requirements','apply','alt'];
let drafts=[], current, locale='ja',dirty=false,reading=0,storageOK=true;
try{const parsed=JSON.parse(localStorage.getItem(key)||'[]');if(!Array.isArray(parsed)||parsed.some(d=>!d?.id||!d?.ja||!d?.en||!['news','job'].includes(d.kind)))throw Error(); drafts=parsed}catch{storageOK=false}
const note=s=>$('status').textContent=s;
const fresh=kind=>({id:crypto.randomUUID?crypto.randomUUID():String(Date.now())+'-'+Math.random(),kind,ja:{},en:{}});
function copy(){for(const f of fields)current[locale][f]=$(f).value}
function list(){$('empty').hidden=!!drafts.length;$('drafts').replaceChildren();for(const d of drafts){const li=document.createElement('li'),button=document.createElement('button'),small=document.createElement('small');small.textContent=(d.kind==='news'?'お知らせ':'募集')+' ・ 下書き';button.setAttribute('aria-current',String(d.id===current.id));button.append(small,d.ja.title||d.en.title||'無題');button.onclick=()=>select(d);li.append(button);$('drafts').append(li)}}
function form(){reading++;const x=current[locale],job=current.kind==='job';for(const f of fields)$(f).value=x[f]||'';$('file').value='';$('thumb').removeAttribute('src');if(x.pic)$('thumb').src=x.pic;$('imageTools').hidden=!x.pic;$('jobFields').hidden=$('extra').hidden=!job;$('newsFields').hidden=job;$('kind').textContent=job?'採用・募集':'お知らせ';$('titleLabel').textContent=job?'募集職種':'タイトル';$('bodyLabel').textContent=job?'仕事内容':'本文';for(const l of ['ja','en'])$(l).setAttribute('aria-pressed',String(l===locale));list()}
function select(d){if(dirty&&!confirm('未保存の変更を破棄して原稿を切り替えますか？'))return;current=structuredClone(d);locale=current.ja.title||!current.en.title?'ja':'en';dirty=false;form();note('');$('title').focus()}
current=fresh('news');form();if(!storageOK)note('このブラウザでは保存領域を読み込めません。プレビューのみ利用できます。');
for(const k of ['news','job'])$(k).onclick=()=>select(fresh(k));
for(const l of ['ja','en'])$(l).onclick=()=>{copy();locale=l;form();note(dirty?'未保存の変更があります。':'')};
$('editor').oninput=()=>{dirty=true;note('未保存の変更があります。')};
$('remove').onclick=()=>{copy();delete current[locale].pic;current[locale].alt='';dirty=true;form();note('画像を外しました。下書き保存で確定します。')};
$('file').onchange=()=>{const file=$('file').files[0],ticket=++reading;if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>500000){$('file').value='';note('500 KB以下のJPEG・PNG・WebPを選んでください。');return}const fr=new FileReader();fr.onload=()=>{if(ticket!==reading)return;copy();current[locale].pic=fr.result;dirty=true;form();note('画像を追加しました。下書き保存で確定します。')};fr.onerror=()=>note('画像を読み込めませんでした。');fr.readAsDataURL(file)};
$('editor').onsubmit=e=>{e.preventDefault();copy();if(!current[locale].title.trim()){note('タイトルまたは募集職種を入力してください。');$('title').focus();return}if(!storageOK){note('保存領域を利用できません。ブラウザの設定を確認してください。');return}const next=[structuredClone(current),...drafts.filter(d=>d.id!==current.id)];try{localStorage.setItem(key,JSON.stringify(next));drafts=next;dirty=false;list();note('下書きをこのブラウザに保存しました。')}catch{note('保存できませんでした。画像サイズやブラウザの保存容量をご確認ください。')}};
$('preview').onclick=()=>{copy();const s=$('sheet'),x=current[locale],en=locale==='en',job=current.kind==='job';s.lang=locale;s.replaceChildren();const add=(tag,str)=>{if(str){const el=document.createElement(tag);el.textContent=str;s.append(el)}};add('small',job?(en?'Careers':'採用情報'):x.category||(en?'News':'お知らせ'));add('h2',x.title||(en?'Untitled':'無題'));add('p',x.summary);if(!job&&x.pic){const im=document.createElement('img');im.src=x.pic;im.alt=x.alt||'';s.append(im)}if(job){add('p',[x.location,x.employment].filter(Boolean).join(' ／ '));if(x.body)add('h3',en?'Responsibilities':'仕事内容')}add('p',x.body);if(job&&x.requirements){add('h3',en?'Requirements':'応募条件');add('p',x.requirements)}if(job&&x.apply){add('h3',en?'Application URL':'応募先');add('p',x.apply)}$('paper').showModal()};
$('close').onclick=()=>$('paper').close();window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
})();
