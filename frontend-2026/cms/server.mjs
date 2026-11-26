import {createServer} from 'node:http';
import {DatabaseSync} from 'node:sqlite';
import {randomBytes,createHash} from 'node:crypto';
import {readFileSync,mkdirSync} from 'node:fs';
import {dirname,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
const token=()=>randomBytes(32).toString('base64url');
const hash=x=>createHash('sha256').update(x).digest('base64url');
const fail=(status,msg)=>{throw Object.assign(new Error(msg),{status})};
const UI=new Map(['index.html','editor.css','editor.js'].map(n=>[n,readFileSync(new URL('./ui/'+n,import.meta.url))]));
const locales=['ja','en'],kinds=['news','recruit'],slugOK=/^[a-z0-9][a-z0-9-]{0,119}$/;
function clean(x){
 if(!x||typeof x!=='object'||Array.isArray(x))fail(400,'Invalid draft');
 const o={};for(const [k,max] of Object.entries({title:200,category:120,summary:2000,body:50000,location:250,employment:250,requirements:10000,apply:2000,alt:400,pic:680000})){const v=x[k]??'';if(typeof v!=='string'||v.length>max)fail(400,'Invalid field: '+k);o[k]=v.trim()}
 if(!o.title)fail(400,'A title is required');
 if(o.apply){let u;try{u=new URL(o.apply)}catch{}if(u?.protocol!=='https:'||u.username||u.password)fail(400,'Use an HTTPS application URL')}
 if(o.pic){const m=/^data:image\/(png|jpeg|webp);base64,([a-zA-Z0-9+/]+=*)$/.exec(o.pic);if(!m)fail(400,'Invalid cover');const b=Buffer.from(m[2],'base64');const type=b.subarray(0,8).toString('hex')==='89504e470d0a1a0a'?'png':b.subarray(0,3).toString('hex')==='ffd8ff'?'jpeg':b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP'?'webp':'';if(type!==m[1]||b.length>500000)fail(400,'Invalid image format or size')}
 return o;
}
function record(r){
 const d=JSON.parse(r.live),base={locale:r.locale,slug:r.slug,title:d.title,publishedAt:r.published,status:'published'};
 if(r.kind==='news')return {...base,category:d.category,excerpt:d.summary,cover:d.pic?{src:'/api/cms/cover/'+r.locale+'/'+r.slug,alt:d.alt}:null,blocks:d.body.split(/\n\s*\n/).filter(Boolean).map(text=>({type:'paragraph',text}))};
 return {...base,location:d.location,employmentType:d.employment,summary:d.summary,applicationUrl:d.apply,sections:[[r.locale==='ja'?'仕事内容':'Responsibilities',d.body],[r.locale==='ja'?'応募条件':'Requirements',d.requirements]].filter(([,s])=>s).map(([heading,s])=>({heading,paragraphs:s.split(/\n\s*\n/)}))};
}
async function body(req){let size=0,buf=[];for await(const chunk of req){size+=chunk.length;if(size>750000)fail(413,'Request too large');buf.push(chunk)}try{return JSON.parse(Buffer.concat(buf).toString())}catch{fail(400,'Invalid JSON')}}
export function makeCMS(env,{http=fetch}={}){
 const {CMS_ORIGIN:origin,CMS_DB:dbPath,CMS_GITHUB_CLIENT_ID:client,CMS_GITHUB_CLIENT_SECRET:secret}=env;
 if(!origin||new URL(origin).protocol!=='https:'||new URL(origin).origin!==origin||!dbPath||!isAbsolute(dbPath)||!client||!secret)throw Error('Set HTTPS CMS_ORIGIN, absolute CMS_DB and OAuth credentials');
 const ids=s=>new Set((s||'').split(',').map(s=>s.trim()).filter(Boolean)),editors=ids(env.CMS_EDITOR_IDS),publishers=ids(env.CMS_PUBLISHER_IDS);
 if(!publishers.size||[...editors,...publishers].some(x=>!/^\d+$/.test(x)))throw Error('Provide numeric GitHub account IDs and at least one publisher');
 mkdirSync(dirname(dbPath),{recursive:true,mode:0o700});const db=new DatabaseSync(dbPath);db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
 CREATE TABLE IF NOT EXISTS docs(kind TEXT,slug TEXT,locale TEXT,rev INTEGER,draft TEXT NOT NULL,live TEXT,published TEXT,PRIMARY KEY(kind,slug,locale));
 CREATE TABLE IF NOT EXISTS audit(at TEXT DEFAULT CURRENT_TIMESTAMP,actor TEXT,action TEXT,kind TEXT,slug TEXT,locale TEXT);
 CREATE TABLE IF NOT EXISTS sessions(id TEXT PRIMARY KEY,actor TEXT,expires INTEGER);`);
 const q=(sql)=>db.prepare(sql),pending=new Map(),role=id=>publishers.has(id)?'publisher':editors.has(id)?'editor':null;
 const srv=createServer(async(req,res)=>{
  res.setHeader('cache-control','no-store');res.setHeader('x-content-type-options','nosniff');res.setHeader('referrer-policy','no-referrer');res.setHeader('content-security-policy',"default-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  const send=(code,payload,type='application/json; charset=utf-8')=>{res.writeHead(code,{'content-type':type});res.end(Buffer.isBuffer(payload)?payload:JSON.stringify(payload))};
  const redirect=url=>{res.writeHead(303,{location:url});res.end()};const cookies=Object.fromEntries((req.headers.cookie||'').split(';').map(c=>c.trim().split('=')));
  const cookie=(name,value,age)=>name+'='+value+'; Path=/; Max-Age='+age+'; Secure; HttpOnly; SameSite=Lax';
  try{const u=new URL(req.url,origin),p=u.pathname,now=Date.now(),get=req.method==='GET';
   if(get&&p==='/admin/login'){for(const [k,v] of pending)if(v.expires<=now)pending.delete(k);if(pending.size>=2000)fail(429,'Try again later');const state=token(),binding=token(),verifier=token();pending.set(state,{binding,verifier,expires:now+600000});res.setHeader('set-cookie',cookie('__Host-bz-login',binding,600));const url=new URL('https://github.com/login/oauth/authorize');url.search=new URLSearchParams({client_id:client,redirect_uri:origin+'/admin/callback',state,code_challenge:hash(verifier),code_challenge_method:'S256',allow_signup:'false'});return redirect(url.href)}
   if(get&&p==='/admin/callback'){const state=u.searchParams.get('state'),s=pending.get(state);if(!s||s.expires<=now||s.binding!==cookies['__Host-bz-login']||!u.searchParams.get('code'))fail(403,'Login expired. Return to /admin/');pending.delete(state);
    const r=await http('https://github.com/login/oauth/access_token',{method:'POST',headers:{accept:'application/json'},body:new URLSearchParams({client_id:client,client_secret:secret,code:u.searchParams.get('code'),redirect_uri:origin+'/admin/callback',code_verifier:s.verifier}),signal:AbortSignal.timeout(10000)});const access=r.ok&&(await r.json()).access_token;if(!access)fail(403,'Login failed');const user=await http('https://api.github.com/user',{headers:{Authorization:'Bearer '+access,'User-Agent':'BonZuttner-CMS'},signal:AbortSignal.timeout(10000)});const actor=user.ok&&String((await user.json()).id);if(!actor||!role(actor))fail(403,'This account has no CMS access');const sid=token();q('DELETE FROM sessions WHERE expires<=?').run(now);q('INSERT INTO sessions VALUES(?,?,?)').run(hash(sid),actor,now+8*3600000);res.setHeader('set-cookie',[cookie('__Host-bz-session',sid,28800),cookie('__Host-bz-login','',0)]);return redirect('/admin/')}
   if(get&&p.startsWith('/api/cms/')){const [, , ,kind,op,...rest]=p.split('/');if(kind==='cover'&&locales.includes(op)&&rest.length===1){const row=q("SELECT live FROM docs WHERE kind='news' AND locale=? AND slug=? AND live IS NOT NULL").get(op,rest[0]);const pic=row&&JSON.parse(row.live).pic;if(!pic)fail(404,'Not found');const [meta,b64]=pic.split(',');return send(200,Buffer.from(b64,'base64'),meta.slice(5,-7))}
    const locale=u.searchParams.get('locale');if(rest.length||!kinds.includes(kind)||!locales.includes(locale))fail(404,'Not found');
    if(op==='detail'){const row=q('SELECT * FROM docs WHERE kind=? AND locale=? AND slug=? AND live IS NOT NULL').get(kind,locale,u.searchParams.get('slug'));if(!row)fail(404,'Not found');return send(200,{item:record(row)})}
    if(op==='list'){const size=Number(u.searchParams.get('pageSize')||8),page=Number(u.searchParams.get('page')||1);if(!Number.isInteger(size)||size<1||size>50||!Number.isInteger(page)||page<1||page>100000)fail(400,'Invalid pagination');const rows=q('SELECT * FROM docs WHERE kind=? AND locale=? AND live IS NOT NULL ORDER BY published DESC,slug LIMIT ? OFFSET ?').all(kind,locale,size+1,(page-1)*size);return send(200,{items:rows.slice(0,size).map(record),hasMore:rows.length>size})}fail(404,'Not found')}
   if(!p.startsWith('/admin/'))fail(404,'Not found');const sid=cookies['__Host-bz-session']||'',session=q('SELECT actor FROM sessions WHERE id=? AND expires>?').get(hash(sid),now),actor=session?.actor,access=role(actor);
   if(!access){if(get&&p==='/admin/')return redirect('/admin/login');fail(401,'Sign in again at /admin/')}
   if(get&&['/admin/','/admin/editor.js','/admin/editor.css'].includes(p)){const n=p.split('/').pop()||'index.html';return send(200,UI.get(n),{'editor.js':'text/javascript','editor.css':'text/css','index.html':'text/html; charset=utf-8'}[n])}
   if(get&&p==='/admin/api/list')return send(200,{role:access,items:q("SELECT kind,slug,locale,rev,json_extract(draft,'$.title') AS title,live IS NOT NULL AS visible FROM docs ORDER BY rowid DESC").all()});
   if(req.method==='POST'){if(req.headers.origin!==origin||req.headers['content-type']?.split(';')[0]!=='application/json')fail(403,'Invalid request origin or type');
    if(p==='/admin/logout'){q('DELETE FROM sessions WHERE id=?').run(hash(sid));res.setHeader('set-cookie',cookie('__Host-bz-session','',0));return send(200,{ok:true})}}
   const match=/^\/admin\/api\/(news|recruit)\/([a-z0-9-]+)\/(ja|en)$/.exec(p);if(!match||!slugOK.test(match[2]))fail(404,'Not found');const [kind,slug,locale]=match.slice(1),key=[kind,slug,locale],read=()=>q('SELECT * FROM docs WHERE kind=? AND slug=? AND locale=?').get(...key);
   if(get){const d=read();return send(200,{rev:d?.rev||0,draft:d?JSON.parse(d.draft):{},visible:!!d?.live})}
   if(req.method!=='POST')fail(405,'Unsupported method');const input=await body(req),op=input?.action;if(!['save','publish','withdraw'].includes(op))fail(400,'Unknown action');if(op!=='save'&&access!=='publisher')fail(403,'Publisher permission required');
   db.exec('BEGIN IMMEDIATE');try{const d=read(),rev=d?.rev||0;if(input.rev!==rev)fail(409,'Another editor changed this draft. Reload before continuing.');if(op==='save'){const draft=JSON.stringify(clean(input.draft));q('INSERT INTO docs(kind,slug,locale,rev,draft) VALUES(?,?,?,1,?) ON CONFLICT(kind,slug,locale) DO UPDATE SET rev=rev+1,draft=excluded.draft').run(...key,draft)}else{if(!d)fail(404,'Save a draft first');if(op==='publish'&&!JSON.parse(d.draft).body.trim())fail(400,'Body text is required for publication');if(op==='publish')q('UPDATE docs SET live=draft,published=COALESCE(published,?),rev=rev+1 WHERE kind=? AND slug=? AND locale=?').run(new Date().toISOString(),...key);else q('UPDATE docs SET live=NULL,published=NULL,rev=rev+1 WHERE kind=? AND slug=? AND locale=?').run(...key)}
    q('INSERT INTO audit(actor,action,kind,slug,locale) VALUES(?,?,?,?,?)').run(actor,op,...key);db.exec('COMMIT')}catch(e){db.exec('ROLLBACK');throw e}return send(200,{rev:read().rev,visible:!!read().live});
  }catch(e){if(!res.headersSent)send(e.status||500,{error:e.status?e.message:'CMS request failed'});else res.end()}
 });srv.on('close',()=>db.close());return srv;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){process.umask(0o077);makeCMS(process.env).listen(Number(process.env.PORT||8788),process.env.CMS_BIND||'127.0.0.1')}
