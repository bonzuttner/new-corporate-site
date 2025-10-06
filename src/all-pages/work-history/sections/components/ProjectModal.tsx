'use client';

import React from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    client: string;
    description: string;
    technologies: string[];
    url?: string;
  } | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto relative animate-modalSlideIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-700 p-8 relative overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all z-10"
          >
            ×
          </button>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white mb-2">{project.title}</h2>
            <p className="text-white/90 text-lg font-semibold">{project.client}</p>
          </div>
          {/* Grid Background */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"
            style={{
              animation: 'moveGrid 15s linear infinite',
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-sky-600 mb-4 flex items-center gap-2 before:content-[''] before:w-1 before:h-6 before:bg-sky-500 before:rounded">
              Description
            </h3>
            {(project.id === 1 || project.id === 15 || project.id === 16) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {project.id === 1 ? (
                  <>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <img
                        src="/images/polariss/polaris device.png"
                        alt="POLARISS IoT GPS Device"
                        className="w-full h-auto object-contain p-4"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-sky-50">
                      <img
                        src="/images/polariss/Line.png"
                        alt="POLARISS LINE App Interface"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-sky-50">
                      <img
                        src="/images/polariss/map.png"
                        alt="POLARISS Map View"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </>
                ) : project.id === 15 ? (
                  <>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <img
                        src="/images/クラウド受付システム（タブレット／モバイルアプリ/クラウド受付システム（タブレット／モバイルアプリ.png"
                        alt="クラウド受付システム スクリーンショット"
                        className="w-full h-auto object-contain p-4"
                      />
                    </div>
                    
                  </>
                ) : (
                  <>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <img
                        src="/images/ノウドー障がい者特化就労マッチングプラットフォーム/photo1.png"
                        alt="ノウドー就労マッチングプラットフォーム スクリーンショット1"
                        className="w-full h-auto object-contain p-4"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <img
                        src="/images/ノウドー障がい者特化就労マッチングプラットフォーム/photo2.png"
                        alt="ノウドー就労マッチングプラットフォーム スクリーンショット2"
                        className="w-full h-auto object-contain p-4"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                      <img
                        src="/images/ノウドー障がい者特化就労マッチングプラットフォーム/photo3.png"
                        alt="ノウドー就労マッチングプラットフォーム スクリーンショット3"
                        className="w-full h-auto object-contain p-4"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Technologies Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-sky-600 mb-4 flex items-center gap-2 before:content-[''] before:w-1 before:h-6 before:bg-sky-500 before:rounded">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-sky-100 text-sky-600 rounded-full font-semibold hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Link */}
          {project.url && (
            <div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-sky-600 font-semibold border-2 border-sky-100 rounded-full hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:-translate-y-1 transition-all"
              >
                Visit Project
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;