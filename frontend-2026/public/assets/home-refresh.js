// Japanese homepage treatment. The legacy site script owns hero, retro and news.
(() => {
  const markup = `
<section id="services" class="services" aria-labelledby="services-title"><header class="section-head"><span class="chapter-label">WHAT WE DO</span><h2 id="services-title" tabindex="-1">課題から、<br>一緒に考える。</h2></header><div class="service-split"><div><p class="list-label">CLIENT SOLUTIONS</p><a class="service-link" href="/ja/dx-ai/">DX・AI活用伴走<span class="arrow" aria-hidden="true">↗</span></a><a class="service-link" href="/ja/development/">システム・アプリ開発<span class="arrow" aria-hidden="true">↗</span></a><p class="list-label">PRODUCTS &amp; DATA</p><a class="service-link" href="/ja/akarel/"><span class="service-label"><span>Akarel</span><small>AIエージェント</small></span><span class="arrow" aria-hidden="true">↗</span></a><a class="service-link" href="/ja/polariss/"><span class="service-label"><span>POLARISS</span><small>盗難対策のGPS見守りサービス</small></span><span class="arrow" aria-hidden="true">↗</span></a><a class="service-link" href="/ja/satellite/">衛星データ × AI解析<span class="arrow" aria-hidden="true">↗</span></a><a class="service-all" href="/ja/services/">サービスを詳しく見る ↗</a></div><div class="field-drawing" data-view="city" role="region" aria-label="サービスのイラスト"><div class="field-meta"><p aria-live="polite">現場から始める</p><span>FIELD NOTES / 01</span></div><div class="artwork" aria-hidden="true"><img class="ride-art" src="/assets/home-scene-ride.webp" alt=""><img class="space-art" src="/assets/home-scene-space.webp" alt=""><img class="earth-art" src="/assets/home-scene-earth.webp" alt=""></div><div class="work-scene" data-step="3" aria-hidden="true"><div class="tokens"><span>話を聞く</span><span>課題を整理</span><span>改善を試す</span><span class="active">組織がもっと素敵になる</span></div><div class="actor-row"><i class="actor actor-listen"></i><i class="actor actor-plan"></i><i class="actor actor-try"></i><i class="actor actor-improve"></i></div><div class="ground"></div><div class="result"><span>✓ 確認の手間が減る</span><span>✓ 引き継ぎがスムーズに</span></div></div>
<div class="field-graphic ride-graphic" aria-hidden="true">
<svg viewBox="0 0 560 370" preserveAspectRatio="none">
<circle class="radar" cx="222" cy="224" r="38"/><circle class="radar" cx="222" cy="224" r="53" style="animation-delay:.16s"/><circle cx="222" cy="224" r="5" fill="#1576ae" stroke="white" stroke-width="2"/>
<path d="M241 209 L321 141 L351 141" stroke="#176b9f" stroke-width="2" stroke-dasharray="4 5" fill="none"/>
<g class="alert-card"><rect x="350" y="108" width="174" height="64" rx="5" fill="white" stroke="#5e8599"/><circle cx="373" cy="137" r="9" fill="#22a65b"/><text x="450" y="134" style="font-size:12px">移動を検知</text><text x="450" y="153" style="font-size:11px;fill:#3f677a">LINEでお知らせ</text></g></svg>
</div>
<div class="field-graphic space-graphic" aria-hidden="true">
<svg viewBox="0 0 560 370" preserveAspectRatio="none">
<path d="M374 141 L178 191 L248 249 Z" fill="#3ba1e8" opacity=".2"/>
<path class="scan" d="M177 216 L254 216" /></svg>
</div>
<div class="field-bottom"><p id="field-caption">話を聞き、課題を整理して改善を試す。確認や引き継ぎなど、日々の仕事が変わり、組織がもっと素敵になります。</p><div class="field-controls" role="group" aria-label="イラストを切り替える"><button type="button" data-view="city" aria-pressed="true">現場</button><button type="button" data-view="ride" aria-pressed="false">POLARISS</button><button type="button" data-view="space" aria-pressed="false">衛星データ</button></div></div></div></div></section><div class="approach-stage"><svg class="sweat-art" viewBox="0 0 690 470" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
<defs><pattern id="sweat-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#73bded" stroke-opacity=".23"/></pattern>
<linearGradient id="sweat-grad" x2="0" y2="1"><stop stop-color="#103141"/><stop offset="1" stop-color="#153e53"/></linearGradient></defs>
<path d="M244 0H690V470H83V431H127V392H162V344H195V285H223V220H244Z" fill="url(#sweat-grad)"/>
<path d="M244 0H690V470H83V431H127V392H162V344H195V285H223V220H244Z" fill="url(#sweat-grid)"/>
<g fill="none" stroke="#487e9b"><path d="M260 358c63-70 195-136 359-164"/><path d="M282 390c104-105 250-147 371-156" stroke-dasharray="4 10"/><path d="M315 421c81-65 171-120 338-150" stroke-dasharray="4 10"/></g>
<g>
<path class="drop" d="M441 95H477V116H502V142H528V177H543V216H528V241H500V254H460V242H427V217H412V180H428V137H441Z" fill="#3ba1e8"/>
<path class="drop" d="M551 111H579V130H600V152H615V178H602V199H581V210H554V194H536V175H530V149H542V129H551Z" fill="#91d7fc"/>
<path class="drop" d="M625 129H642V144H657V162H665V183H652V196H625V184H612V158H625Z" fill="#d0efff"/>
</g>
<g fill="#83cefa"><path d="M376 281h13v13h-13zM351 309h7v7h-7zM329 332h5v5h-5zM572 258h9v9h-9zM603 242h5v5h-5z"/></g>
</svg>
<section id="difference" class="difference" aria-labelledby="difference-title">
      <div class="difference-intro"><p class="difference-kicker">OUR DIFFERENCE</p><h2 id="difference-title">一緒に、汗をかく。</h2><p>会議室で描いた正解を渡すのではなく、現場に入り、手を動かしながら一緒に答えを見つけます。</p><details><summary>BonZuttnerの仕事の進め方</summary><ol class="difference-points"><li><span>01</span><div><h3>現場から始める</h3><p>実際の作業、会話、迷いまでを見る。資料だけでは分からない課題から始めます。</p></div></li><li><span>02</span><div><h3>つくらない選択もする</h3><p>システム開発ありきではありません。既存ツールや業務ルールの見直しで解けるなら、そこから進めます。</p></div></li><li><span>03</span><div><h3>動くまで一緒にいる</h3><p>提案や導入をゴールにせず、現場で変化が生まれ、続いていくところまで伴走します。</p></div></li></ol></details></div>

    </section></div><div class="tail-scene"><section id="story" class="story" aria-labelledby="story-title">
      <p class="story-mark" aria-hidden="true">RE.</p>
      <div class="story-copy"><p class="story-kicker">OUR STORY</p><h2 id="story-title">仕事から、<br>未来をつくる。</h2></div>
      <p class="story-body">一人ひとりの技術と願いが、正当に仕事へつながること。日々の対話と協働が、社会の平和につながること。BonZuttnerは2019年、そんな願いを実業のかたちにするために始まりました。<a class="story-read-link" href="/ja/story/">私たちの物語を読む <span aria-hidden="true">↗</span></a></p>
    </section><div class="member-seam" aria-hidden="true"></div><section id="members" class="members-journey" aria-labelledby="members-title">
      <div class="members-copy"><p>MEET THE TEAM</p><h2 id="members-title">この仕事を、<br>動かす人たち。</h2><p>お客さまの声を聞き、考え、現場で手を動かし、解決へつなぐ。異なる専門と背景を持つメンバーが、一つのチームで仕事を前へ進めます。</p><a href="/ja/members/">メンバーを見る <span aria-hidden="true">→</span></a></div>
      <figure class="team-portrait"><img src="/assets/members/team-pixel.png" width="1774" height="887" alt="木々と街を背景に、ベンチで語り合うBonZuttnerのチームのドット絵"></figure>
    </section><section id="contact" class="contact-block" aria-labelledby="contact-title">
      <p>START WITH A CONVERSATION</p><h2 id="contact-title">まだ言葉にならない<br>課題から。</h2><div><p>「何から始めればよいか分からない」段階でも大丈夫です。現場と経営の間に入り、一緒に整理します。</p><a href="/ja/contact/">まずは相談する <span aria-hidden="true">↗</span></a></div>
    </section></div>
`;
  function mount(root) {
    if (!root) return;
    const drawing=root.querySelector('.field-drawing');
    const scenes={
     city:['現場から始める','01','話を聞き、課題を整理して改善を試す。確認や引き継ぎなど、日々の仕事が変わり、組織がもっと素敵になります。'],
     ride:['愛車の位置を見守る','02','GPSで位置を把握。車両の移動を検知すると、LINEで知らせます。'],
     space:['宇宙から、農業の判断へ','03','衛星から土地を観測し、農業の判断に役立てます。']
    };
    let demoTimer;
    let workTimers=[];
    const workScene=drawing.querySelector('.work-scene');
    function setWorkStep(step){
     workScene.dataset.step=String(step);
     workScene.querySelectorAll('.tokens span').forEach((token,i)=>token.classList.toggle('active',i===step));
    }
    function playDrawing(){
     clearTimeout(demoTimer);
     workTimers.forEach(clearTimeout);
     workTimers=[];
     if(drawing.dataset.view==='city' && !matchMedia('(prefers-reduced-motion: reduce)').matches){
      setWorkStep(0);
      workTimers=[1400,2800,4300].map((delay,i)=>setTimeout(()=>setWorkStep(i+1),delay));
     }else setWorkStep(3);
     drawing.classList.remove('is-demonstrating');
     void drawing.offsetWidth;
     drawing.classList.add('is-demonstrating');
     demoTimer=setTimeout(()=>drawing.classList.remove('is-demonstrating'),3200);
    }
    drawing.querySelector('.field-controls').addEventListener('click',(event)=>{
     const btn=event.target.closest('button[data-view]');
     if(!btn || !Object.hasOwn(scenes,btn.dataset.view)) return;
     const view=btn.dataset.view;
     drawing.dataset.view=view;
     drawing.querySelector('.field-meta p').textContent=scenes[view][0];
     drawing.querySelector('.field-meta span').textContent='FIELD NOTES / '+scenes[view][1];
     drawing.querySelector('#field-caption').textContent=scenes[view][2];
     drawing.querySelectorAll('button[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
     playDrawing();
    });
    if('IntersectionObserver' in window){
     const enter=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)){playDrawing();enter.disconnect();}
     },{threshold:.35});
     enter.observe(drawing);
    }
    const stage=root.querySelector('.approach-stage');
    if('IntersectionObserver' in window){
     const observer=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)){stage.classList.add('is-in-view'); observer.disconnect();}
     },{threshold:.28});
     observer.observe(stage);
    }else stage.classList.add('is-in-view');
  }
  window.BZHomeRefresh = { markup, mount };
})();
