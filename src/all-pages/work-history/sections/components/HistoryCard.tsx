'use client';

import { useTranslations } from "next-intl";
import React from "react";
import ProjectModal from './ProjectModal';

interface HistoryCardProps {
  id: number;
  title: string;
  client: string;
  description: string;
  technologies: string[];
  url?: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  id,
  title,
  client,
  description,
  technologies,
  url,
}) => {
  const t = useTranslations('workHistory.Card');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-700 p-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white/80 text-sm">{client}</p>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-sky-100 text-sky-600 rounded-full hover:bg-sky-500 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link */}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:gap-3 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              {t('visitProject')}
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={{
          id,
          title,
          client,
          description,
          technologies,
          url,
        }}
      />
    </>
  );
};

export default HistoryCard;
