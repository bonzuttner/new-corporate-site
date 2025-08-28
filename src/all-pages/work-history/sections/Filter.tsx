"use client";

import React from "react";
import { useFilter } from "@/Store/FilterContext";
import { useTranslations } from "next-intl";

const Filter = () => {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useFilter();
  const t = useTranslations("workHistory.Filter");
  const categories = ["すべて", "アプリケーション", "WEBサイト", "システム"];

  return (
    <section className="bg-white py-6 shadow-md sticky top-0 z-50">
      <div className="px-6 flex flex-col gap-4 md:flex-row md:items-center">
        <span className="font-semibold text-gray-800 shrink-0">
          {t("label")}
        </span>

        <div className="flex gap-2 overflow-x-auto md:overflow-visible w-full pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all hover:-translate-y-1 hover:shadow-md ${
                activeCategory === cat
                  ? "bg-sky-500 text-white border-sky-500"
                  : "border-sky-200 text-sky-500 bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="px-4 py-2 border-2 border-sky-200 rounded-full text-sm w-full md:w-64 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>
    </section>
  );
};

export default Filter;
