const lang = document.documentElement.lang || 'ja';
const pages = window.BZTranslations["development.0"];
const t = pages[lang] || pages.ja;
const projects = window.BonZuttnerDevelopmentCases;
const projectUI = window.BZTranslations["development.1"][lang] || { heading: '実績', title: '開発の実績。', view: '実績の詳細を見る', close: '閉じる', featured: '現場理解 → 業務整理 → 実装 → 継続改善', labels: ['概要', 'お客さま', '課題', '実装内容', '解決したこと・価値', '仕事を支える技術', 'BonZuttnerの担当領域'], detail: '詳しい実績を見る', diagram: '仕組みの要点', technology: '主な技術', role: '担当範囲' };
const localized = value => value && typeof value === 'object' && !Array.isArray(value) ? (value[lang] || value.ja) : value;
const escapeText = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const categoryTitle = item => lang === 'ja' && item.title === 'スマートフォン・タブレットアプリ' ? '<span class="dev-heading-part">スマートフォン・</span><wbr><span class="dev-heading-part">タブレットアプリ</span>' : item.title;
const orbitUI = window.BZTranslations["development.2"][lang] || null;
const projectGlobe = `<div class="dev-orbit-layout"><div class="dev-orbit-explorer"><p class="dev-orbit-hint" id="dev-orbit-hint">${orbitUI.hint}</p><div class="dev-orbit-stage" role="group" aria-label="${orbitUI.label}" aria-describedby="dev-orbit-hint"><div class="dev-orbit-core" aria-hidden="true"><i class="orbit-longitude"></i><i class="orbit-longitude orbit-longitude-two"></i><i class="orbit-latitude"></i><i class="orbit-latitude orbit-latitude-three"></i><i class="orbit-latitude orbit-latitude-two"></i><span dir="ltr">BonZuttner<br>WORKS</span></div>${projects.map((project, index) => `<button type="button" class="dev-orbit-node${project.featured ? ' dev-orbit-featured' : ''}" data-orbit-index="${index}" data-project="${project.id}" aria-haspopup="dialog" aria-label="${escapeText(localized(project.title))}">${project.image?`<img src="${escapeText(project.image)}" alt="" width="128" height="128" loading="lazy" decoding="async">`:`<span class="dev-orbit-mark" dir="ltr" aria-hidden="true">${escapeText(project.mark)}</span>`}<span class="dev-orbit-name">${escapeText(orbitUI.names[index])}</span><span class="dev-orbit-summary">${escapeText(orbitUI.summaries[index])}</span></button>`).join('')}</div><div class="dev-orbit-controls"><button type="button" data-orbit-previous>${orbitUI.previous}</button><button type="button" data-orbit-pause aria-pressed="false">${orbitUI.pause}</button><button type="button" data-orbit-next>${orbitUI.next}</button></div></div><div class="dev-orbit-inspector"><p class="dev-case-meta" data-orbit-meta></p><p class="dev-orbit-category" data-orbit-category></p><h3 data-orbit-title></h3><p class="dev-orbit-partner" data-orbit-partner></p><p class="dev-orbit-detail" data-orbit-detail></p><button type="button" class="dev-orbit-open" data-project="${projects[0].id}" data-orbit-open aria-haspopup="dialog">${projectUI.view}</button><p class="dev-orbit-count" data-orbit-count></p></div></div><div class="dev-orbit-index"><p>${orbitUI.all}</p><div>${projects.map((project, index) => `<button type="button" data-project="${project.id}" aria-haspopup="dialog">${escapeText(orbitUI.names[index])}</button>`).join('')}</div></div>`;
const languageLinks = [['ja', '日本語'], ['en', 'English'], ['ar', 'العربية']].map(([code, label]) => `<a href="/${code}/development/" lang="${code}" ${code === lang ? 'aria-current="page"' : ''}>${label}</a>`).join('');

if (!document.querySelector('#app').dataset.nextPrerender) document.querySelector('#app').innerHTML = `
  <a class="skip" href="#main">${t.skip}</a>
  <header class="service-nav">
    <a class="service-brand" href="/${lang}/" dir="ltr">BonZuttner</a>
    <nav aria-label="${t.navigation}">${t.nav.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</nav>
    <div class="service-actions"><div class="service-languages" aria-label="${t.languages}">${languageLinks}</div><a class="service-consult" href="#contact">${t.consult}</a></div>
  </header>
  <main id="main">
    <section class="dev-hero"><div><p class="service-eyebrow">${t.hero.eyebrow}</p><h1>${t.hero.title}</h1><p class="dev-lead">${t.hero.body}</p></div><div class="dev-hero-type" aria-hidden="true" dir="ltr"><span>BUILD</span><span>FOR</span><span>WORK<span class="dev-type-dot">.</span></span><p>${t.hero.note}</p></div></section>
    <section class="dev-start"><header><p class="service-eyebrow">${t.starting.eyebrow}</p><h2>${t.starting.title}</h2><p>${t.starting.body}</p></header><div class="dev-start-points">${t.starting.points.map(([title, body]) => `<article><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></section>
    <section class="dev-scope" id="scope"><header><p class="service-eyebrow">${t.scope.eyebrow}</p><h2>${t.scope.title}</h2></header><div class="dev-capabilities">${t.scope.items.map(item => `<article><p class="dev-category" dir="ltr">${item.label}</p><h3>${categoryTitle(item)}</h3><p class="dev-capability-body">${item.body}</p><p class="dev-examples">${item.examples}</p></article>`).join('')}</div></section>
    <section class="dev-expertise"><header><p class="service-eyebrow">${t.expertise.eyebrow}</p><h2>${t.expertise.title}</h2><p>${t.expertise.body}</p></header><dl>${t.expertise.items.map(([title, body]) => `<div><dt>${title}</dt><dd>${body}</dd></div>`).join('')}</dl></section>
    <section class="dev-process"><header><p class="service-eyebrow">${t.process.eyebrow}</p><h2>${t.process.title}</h2><p>${t.process.body}</p></header><ol>${t.process.steps.map(([number, title, body]) => `<li><span>${number}</span><h3>${title}</h3><p>${body}</p></li>`).join('')}</ol></section>
    <section class="dev-work-showcase" id="works"><header class="dev-work-intro"><p class="service-eyebrow">${projectUI.heading}</p><h2>${projectUI.title}</h2></header>${projectGlobe}</section>
    <aside class="dev-connection"><div><h2>${t.connection.title}</h2><p>${t.connection.body}</p></div><a href="/${lang}/dx-ai/">${t.connection.link}</a></aside>
    <section class="service-contact" id="contact"><p>${t.cta.eyebrow}</p><h2>${t.cta.title}</h2><div><p>${t.cta.body}</p><a href="mailto:info@bonzuttner.com">${t.cta.action}</a></div></section>
  </main>
  <dialog class="dev-project-dialog" aria-labelledby="dev-project-title"><div class="dev-project-bar"><span>${projectUI.heading}</span><button type="button" class="dev-project-close" autofocus>${projectUI.close}<span aria-hidden="true">×</span></button></div><div class="dev-project-content"></div></dialog>
`;

const projectDialog = document.querySelector('.dev-project-dialog');
const projectContent = document.querySelector('.dev-project-content');
const projectClose = document.querySelector('.dev-project-close');
const roleNames = { 'Tech Lead':'技術方針・開発のリード', 'AI Engineering':'AI機能の開発', 'AI Integration':'AI機能の統合', 'System Development':'システム開発', 'User / Permission Management':'ユーザー・権限管理', 'Concept Design':'コンセプト設計', 'Information Architecture':'情報設計', 'UX Design':'使いやすさの設計', 'Web Design':'Webデザイン', 'Project Management':'プロジェクト管理', 'Client Communication':'お客さまとの対話', 'Launch Support':'公開支援', 'Field Interviews':'現場ヒアリング', 'Operational Understanding':'業務オペレーション理解', 'As-Is Analysis':'現状の業務整理', 'Workflow Improvement':'業務フロー改善', 'Admin Development':'管理画面開発', 'Ongoing Development':'運用に合わせた追加開発', 'Requirements': '要件整理', 'System Design': 'システム設計', 'Frontend Development': 'フロントエンド開発', 'Backend Development': 'バックエンド開発', 'Infrastructure': 'インフラ構築', 'Testing': 'テスト', 'Payment Integration': '決済連携', 'Planning': '企画', 'UX': 'UX設計', 'Operation Support': '運用支援', 'Development': '開発', 'Reservation Functions': '予約機能', 'Mobile Application Development': 'モバイルアプリ開発', 'SDK Integration': 'ロボット連携', 'Cloud Infrastructure': 'クラウド構築', 'Field Testing': '現場テスト', 'UI / UX': '画面・使いやすさの設計', 'Mobile / Tablet UI': 'モバイル・タブレットUI', 'Coding': 'コーディング', 'PM': 'プロジェクト管理', 'Web Development': 'Web開発', 'IoT Integration': 'IoT連携', 'Cloud': 'クラウド', 'LINE Integration': 'LINE連携', 'Continuous Improvement': '継続改善', 'AI Design': 'AI設計', 'API Integration': 'API連携', 'Analysis Functions': '分析機能' };
const paragraph = value => `<p>${escapeText(localized(value))}</p>`;
const list = value => `<ul>${localized(value).map(item => `<li>${escapeText(item)}</li>`).join('')}</ul>`;
const modalSection = (index, content) => `<section class="dev-project-section" data-section="${index}"><h3>${projectUI.labels[index]}</h3><div>${content}</div></section>`;

const storyUI = window.BZTranslations["development.3"][lang];
const plainRoleNames = {'PM':'Project management','AI Design':'AI design','API Integration':'Service integration','Analysis Functions':'Analysis features','Requirements':'Requirements discovery','UX':'User experience design'};
const arRoleNames = { 'Tech Lead':'قيادة التطوير التقني', 'AI Engineering':'تطوير وظائف AI', 'AI Integration':'دمج وظائف AI', 'System Development':'تطوير النظام', 'User / Permission Management':'إدارة المستخدمين والصلاحيات', 'Concept Design':'تصميم المفهوم', 'Information Architecture':'هندسة المعلومات', 'UX Design':'تصميم تجربة الاستخدام', 'Web Design':'تصميم الويب', 'Project Management':'إدارة المشروع', 'Client Communication':'التواصل مع العميل', 'Launch Support':'دعم الإطلاق','Field Interviews':'الاستماع للميدان','Operational Understanding':'فهم العمليات','As-Is Analysis':'تحليل العمل الحالي','Workflow Improvement':'تحسين سير العمل','Requirements':'تحديد المتطلبات','UI / UX':'تصميم تجربة الاستخدام','System Design':'تصميم النظام','Frontend Development':'تطوير الواجهة','Backend Development':'تطوير المعالجة','Admin Development':'تطوير الإدارة','Continuous Improvement':'تحسين مستمر','Ongoing Development':'تطوير مستمر وفق التشغيل','PM':'إدارة المشروع','AI Design':'تصميم الذكاء الاصطناعي','API Integration':'ربط الخدمات','Analysis Functions':'وظائف التحليل','Cloud':'السحابة','Infrastructure':'البنية التحتية','Payment Integration':'ربط الدفع','Testing':'اختبارات','Mobile Application Development':'تطوير تطبيق الجوال','SDK Integration':'ربط الروبوت','Cloud Infrastructure':'البنية السحابية','Field Testing':'اختبار ميداني','Planning':'تخطيط','UX':'تصميم تجربة الاستخدام','Operation Support':'دعم التشغيل'};
const storyPairs = project => `<dl class="dev-change-list">${localized(project.storyPairs).map(([before,after])=>`<div><dt><span>${storyUI.before}</span><strong>${escapeText(before)}</strong></dt><dd><span>${storyUI.after}</span><strong>${escapeText(after)}</strong></dd></div>`).join('')}</dl><details class="dev-project-disclosure"><summary>${storyUI.details}</summary>${list(project.challenge)}</details>`;

let projectTrigger;
let projectScrollTop = 0;

document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects.find(item => item.id === button.dataset.project);
  if (!project) return;
  projectTrigger = button;
  const tech = project.technology.length ? `<dl class="dev-project-tech">${project.technology.map(([label, stack]) => `<div><dt>${escapeText(storyUI.labels[label] || label)}</dt><dd dir="ltr">${stack.map(escapeText).join(' / ')}</dd></div>`).join('')}</dl>` : '';
  const technologyNote = project.technologyNote ? paragraph(project.technologyNote) : '';
  const solution = project.solutionGroups ? project.solutionGroups.map(group => `<div class="dev-solution-group"><h4>${escapeText(localized(group.heading))}</h4>${list(group.items)}</div>`).join('') : list(project.solution);
  const media = (project.media || []).map(item => `<figure><img src="${escapeText(item.src)}" alt="${escapeText(localized(item.alt))}" loading="lazy">${item.caption ? `<figcaption>${escapeText(localized(item.caption))}</figcaption>` : ''}</figure>`).join('');
  projectContent.innerHTML = `<header class="dev-project-heading"><p class="dev-case-meta">${projectUI.heading} ${project.number} / ${escapeText(t.scope.items[project.category].title)}</p><h2 id="dev-project-title">${escapeText(localized(project.title))}</h2><p class="dev-project-type">${escapeText(localized(project.type))}</p><p class="dev-project-headline">${escapeText(localized(project.headline))}</p>${project.subtitle ? `<p class="dev-project-subtitle" dir="ltr">${escapeText(project.subtitle)}</p>` : ''}<p class="dev-project-intro">${escapeText(localized(project.short))}</p></header>${modalSection(0, paragraph(project.overview))}${media ? `<div class="dev-project-media">${media}</div>` : ''}${modalSection(1, paragraph(project.client)+(project.clientUrl?`<a href="${escapeText(project.clientUrl)}" target="_blank" rel="noopener noreferrer">${escapeText(project.clientUrl)}</a>`:''))}${modalSection(2, storyPairs(project))}${modalSection(3, solution)}${modalSection(4, paragraph(project.value))}${modalSection(5, project.technology.length?`<p>${storyUI.techLead}</p><details class="dev-project-disclosure dev-project-technical"><summary>${storyUI.tech}</summary>${tech}${technologyNote}</details>`:technologyNote)}${modalSection(6, `<p class="dev-role-intro">${storyUI.roles}</p><ul class="dev-project-role-list">${project.roles.map(role=>`<li>${escapeText(lang==='ja'?roleNames[role]||role:lang==='ar'?arRoleNames[role]||role:plainRoleNames[role]||role)}</li>`).join('')}</ul>`)}${project.detailUrl ? `<a class="dev-project-detail" href="${escapeText(project.detailUrl)}">${projectUI.detail}</a>` : ''}`;
  projectScrollTop = window.scrollY;
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
  document.documentElement.classList.add('dev-dialog-open');
  projectClose.focus({ preventScroll: true });
}));
projectClose.addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => {
  if (event.target !== projectDialog) return;
  const rect = projectDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) projectDialog.close();
});
// Native dialog handles Escape and traps focus. Restore the reading position.
projectDialog.addEventListener('close', () => {
  document.documentElement.classList.remove('dev-dialog-open');
  window.scrollTo({ top: projectScrollTop, behavior: 'instant' });
  projectTrigger?.focus({ preventScroll: true });
});
