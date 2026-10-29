// Make the new Company destination available in the existing page navigation.
(() => {
  const addCompany = () => {
    const lang = document.documentElement.lang || document.documentElement.dataset.lang || 'ja';
    const nav = document.querySelector('.service-nav nav');
    if (!nav || nav.querySelector(`a[href="/${lang}/company/"]`)) return;
    const link = document.createElement('a');
    link.href = `/${lang}/company/`;
    link.textContent = window.BZTranslations["company-nav.0"][lang] || 'Company';
    nav.appendChild(link);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addCompany, {once:true});
  else addCompany();
})();
