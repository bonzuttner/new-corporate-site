(() => {
  const lang = ['ja','en','ar'].includes(document.documentElement.lang) ? document.documentElement.lang : 'ja';
  const topics = ['dx-ai','development','akarel','polariss','satellite','partnership','other'];
  const copy = window.BZTranslations["contact.0"];
  const t=copy[lang],required=['topic','name','email','message'];
  const limits={name:80,company:120,email:254,phone:40,message:6000};
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const badge=key=>`<span class="cp-field-badge ${required.includes(key)?'is-required':''}">${required.includes(key)?t.required:t.optional}</span>`;
  const label=key=>`<label for="cp-${key}">${t.fields[key]}${badge(key)}</label>`;
  const error=key=>`<p id="cp-error-${key}" class="cp-field-error" hidden></p>`;
  const input=(key,type,autocomplete)=>`<div class="cp-field">${label(key)}<input id="cp-${key}" name="${key}" type="${type}" autocomplete="${autocomplete}" maxlength="${limits[key]}" ${required.includes(key)?'required':''} placeholder="${t.placeholders[key]}" aria-describedby="cp-error-${key}" ${['email','phone'].includes(key)?'dir="ltr"':''}>${error(key)}</div>`;
  const configured=window.BonZuttnerContactApi.configured();
  document.querySelector('#app').innerHTML=`<a class="skip" href="#main">${t.skip}</a><header class="service-nav"><a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a><nav aria-label="${t.navigation}">${['','services/','story/','members/','company/'].map((route,i)=>`<a href="/${lang}/${route}">${t.nav[i]}</a>`).join('')}</nav><div class="service-actions"><div class="service-languages" aria-label="${t.language}">${[['ja','JA'],['en','EN'],['ar','AR']].map(([code,title])=>`<a href="/${code}/contact/" lang="${code}" ${code===lang?'aria-current="page"':''}>${title}</a>`).join('')}</div></div></header>
    <main class="cp-main" id="main"><aside class="cp-intro"><p class="cp-eyebrow">CONTACT</p><h1>${t.title.map(line=>`<span>${line}</span>`).join('')}</h1><p class="cp-intro-text">${t.intro}</p><p class="cp-email-intro">${t.emailIntro}</p><a class="cp-email" href="mailto:info@bonzuttner.com" dir="ltr">info@bonzuttner.com</a><div class="cp-availability" ${configured?'hidden':''}><p>${t.preparing}</p><a href="mailto:info@bonzuttner.com">${t.emailAction}</a></div></aside>
    <section class="cp-surface" aria-labelledby="cp-form-title"><form id="contact-form" novalidate><div id="cp-input-stage"><h2 id="cp-form-title">${t.formTitle}</h2><p class="cp-required-note">${t.requiredNote}</p><div class="cp-errors" id="cp-error-summary" role="alert" tabindex="-1" hidden></div>
      <div class="cp-field">${label('topic')}<select name="topic" id="cp-topic" required aria-describedby="cp-error-topic"><option value="">${t.select}</option>${topics.map((value,i)=>`<option value="${value}">${t.topicOptions[i]}</option>`).join('')}</select>${error('topic')}</div>
      <div class="cp-field-pair">${input('name','text','name')}${input('company','text','organization')}</div><div class="cp-field-pair">${input('email','email','email')}${input('phone','tel','tel')}</div>
      <div class="cp-field">${label('message')}<textarea name="message" id="cp-message" required maxlength="6000" rows="8" placeholder="${t.placeholders.message}" aria-describedby="cp-message-hint cp-error-message"></textarea><p class="cp-field-hint" id="cp-message-hint">${t.messageHint}</p>${error('message')}</div>
      <div class="cp-consent"><label><input type="checkbox" name="consent" id="cp-consent" required aria-describedby="cp-error-consent"><span>${t.consentBefore}<a href="/ja/privacy-policy/" target="_blank" rel="noopener noreferrer">${t.policy}</a>${t.consentAfter}</span></label>${error('consent')}</div>
      <div class="cp-honeypot" aria-hidden="true"><label for="cp-website">Website</label><input id="cp-website" name="website" tabindex="-1" autocomplete="off"></div>
      <button class="cp-primary" type="submit">${t.review}</button></div>
      <div id="cp-confirm-stage" hidden><h2 tabindex="-1" id="cp-confirm-title">${t.confirmation}</h2><p class="cp-stage-body">${t.confirmationBody}</p><dl class="cp-confirm-list"></dl><p class="cp-consent-confirmed">${t.confirmedConsent}</p><div class="cp-submit-error" role="alert" tabindex="-1" hidden></div><p class="cp-not-ready" ${configured?'hidden':''}>${t.preparing}</p><div class="cp-actions"><button class="cp-secondary" id="cp-edit" type="button">${t.edit}</button><button class="cp-primary" id="cp-send" type="submit" ${configured?'':'disabled'}>${configured?t.send:t.unavailableSend}</button></div></div>
      <div id="cp-success-stage" hidden><p class="cp-eyebrow">${lang==='ar'?'تم الاستلام':'RECEIVED'}</p><h2 id="cp-success-title" tabindex="-1">${t.complete}</h2><p class="cp-stage-body">${t.completeBody}</p><p class="cp-receipt">${t.receipt}: <bdi id="cp-receipt-id" dir="ltr"></bdi></p><div class="cp-success-links"><a href="/${lang}/">${t.home}</a><a href="/${lang}/services/">${t.services}</a></div></div>
    </form></section></main>`;
  const form=document.querySelector('#contact-form'),inputStage=document.querySelector('#cp-input-stage'),confirmStage=document.querySelector('#cp-confirm-stage'),successStage=document.querySelector('#cp-success-stage');
  const fields=Object.fromEntries(['topic','name','company','email','phone','message','consent','website'].map(key=>[key,form.elements.namedItem(key)]));
  const initialTopic=new URLSearchParams(location.search).get('topic');
  if(topics.includes(initialTopic))fields.topic.value=initialTopic;
  const summary=document.querySelector('#cp-error-summary'),send=document.querySelector('#cp-send'),edit=document.querySelector('#cp-edit'),submitError=document.querySelector('.cp-submit-error');
  let stage='input',draft,requestId,sending=false;
  function clearErrors(){summary.hidden=true;for(const key of [...Object.keys(t.fields),'consent']){document.querySelector(`#cp-error-${key}`).hidden=true;fields[key].removeAttribute('aria-invalid');}}
  function showErrors(errors){clearErrors();const entries=Object.entries(errors).filter(([key])=>fields[key]&&key!=='website');if(!entries.length)return;for(const [key,message]of entries){const el=document.querySelector(`#cp-error-${key}`);el.textContent=message;el.hidden=false;fields[key].setAttribute('aria-invalid','true');}summary.innerHTML=`<p>${t.errorsTitle}</p><ul>${entries.map(([key,message])=>`<li><a href="#cp-${key}">${escape(message)}</a></li>`).join('')}</ul>`;summary.hidden=false;summary.focus();}
  function read(){return {topic:fields.topic.value,name:fields.name.value.trim(),company:fields.company.value.trim(),email:fields.email.value.trim(),phone:fields.phone.value.trim(),message:fields.message.value.trim(),consent:fields.consent.checked,website:fields.website.value,locale:lang};}
  function validate(data){const errors={};for(const key of required){if(!data[key])errors[key]=t.errors[key];}if(data.topic&&!topics.includes(data.topic))errors.topic=t.errors.topic;if(data.email&&!fields.email.validity.valid)errors.email=t.errors.email;for(const [key,max]of Object.entries(limits))if(data[key].length>max)errors[key]=t.errors.tooLong;if(!data.consent)errors.consent=t.errors.consent;return errors;}
  function setStage(next){stage=next;inputStage.hidden=next!=='input';confirmStage.hidden=next!=='confirm';successStage.hidden=next!=='success';}
  edit.addEventListener('click',()=>{if(sending)return;setStage('input');document.querySelector('#cp-form-title').setAttribute('tabindex','-1');document.querySelector('#cp-form-title').focus();});
  summary.addEventListener('click',event=>{const link=event.target.closest('a');if(link){event.preventDefault();document.querySelector(link.getAttribute('href')).focus();}});
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(sending||stage==='success')return;
    if(stage==='input'){
      draft=read();const errors=validate(draft);if(Object.keys(errors).length){showErrors(errors);return;}clearErrors();
      document.querySelector('.cp-confirm-list').innerHTML=Object.keys(t.fields).map(key=>`<div><dt>${t.fields[key]}</dt><dd ${['email','phone'].includes(key)?'dir="ltr"':''}>${escape(key==='topic'?t.topicOptions[topics.indexOf(draft.topic)]:draft[key]||'—')}</dd></div>`).join('');
      requestId=crypto.randomUUID();submitError.hidden=true;setStage('confirm');document.querySelector('#cp-confirm-title').focus();return;
    }
    if(!configured)return;
    sending=true;send.disabled=edit.disabled=true;send.textContent=t.sending;form.setAttribute('aria-busy','true');submitError.hidden=true;
    try{
      const receipt=await window.BonZuttnerContactApi.submit(draft,requestId);
      document.querySelector('#cp-receipt-id').textContent=receipt.receiptId;setStage('success');document.querySelector('#cp-success-title').focus();form.reset();draft=null;
    }catch(error){
      if(error.code==='validation'&&Object.keys(error.fields||{}).some(key=>fields[key]&&key!=='website')){setStage('input');showErrors(Object.fromEntries(Object.keys(error.fields).filter(key=>fields[key]&&key!=='website').map(key=>[key,t.errors[key]||t.errors.validation])));}
      else {submitError.textContent=t.errors[error.code]||t.errors.server;submitError.hidden=false;submitError.focus();}
    }finally{sending=false;send.disabled=!configured;edit.disabled=false;send.textContent=configured?t.send:t.unavailableSend;form.removeAttribute('aria-busy');}
  });
})();
