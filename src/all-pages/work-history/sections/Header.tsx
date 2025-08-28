import { useTranslations } from "next-intl";
import React from "react";

const Header = () => {
  const t = useTranslations('workHistory.Header')
  console.log(t);
  
  return (
    <section className="relative bg-gradient-to-r from-sky-500 to-sky-700 text-white py-5 overflow-hidden">

      {/* Content */}
      <div className="relative px-6 text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-9 animate-slideInDown">
            {t('title')}
        </h1>
        <p className="text-lg md:text-xl opacity-90 animate-slideInUp delay-200">
            {t('subtitle')}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-10 mt-10 animate-fadeIn delay-400">
          <div className="text-center">
            <span className="block text-3xl font-bold" id="projectCount">
              13
            </span>
            <span className="text-sm opacity-80">{t('stats.projects')}</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold" id="clientCount">
              11
            </span>
            <span className="text-sm opacity-80">{t('stats.clients')}</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold" id="techCount">
              9
            </span>
            <span className="text-sm opacity-80">{t('stats.technologies')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
