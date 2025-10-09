
"use client";

import React from "react";
import HistoryCard from "./components/HistoryCard";
import { useFilter } from "@/Store/FilterContext";
import { useLocale } from 'next-intl';
import { jaProjects, enProjects } from '@/data/projects';

const getProjects = (locale: string) => {
  return locale === 'ja' ? jaProjects : enProjects;
};

const WorkHistory = () => {
  const { activeCategory, searchQuery } = useFilter();
  const locale = useLocale();
  const projects = getProjects(locale);

  const filteredProjects = projects.filter((p) => {
    const matchCategory =
      activeCategory === "すべて" || p.category === activeCategory;

    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <HistoryCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default WorkHistory;
