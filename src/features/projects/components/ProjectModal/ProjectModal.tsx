import React, { useEffect } from 'react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Project details modal component
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;
  const displayTitle = project.title.replace(/\s*-\s*/g, ' - ');

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '88vh', boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}
      >
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 pt-6 pb-4 bg-white border-b border-slate-100 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-3xl leading-none font-bold text-slate-900">{displayTitle}</h3>
            <span className="inline-flex items-center gap-1.5 text-lg font-semibold text-slate-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {project.state}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 transition-all duration-200 hover:bg-green-700 hover:text-white hover:border-green-700 hover:rotate-90 flex-shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-6 py-5 lg:px-8">
          <section className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-slate-500 mb-2">
              Project Brief
            </p>
            <p className="text-slate-700 leading-relaxed text-[1.06rem]">{project.desc}</p>
          </section>

          {project.metrics.length > 0 ? (
            <div className="border-t border-slate-100 pt-5 mb-6">
              <p className="text-[0.8rem] tracking-[0.14em] font-semibold uppercase text-slate-600 mb-3">
                Credibility Markers
              </p>
              <ul className="space-y-3">
                {project.metrics.map((m, i) => (
                  <li
                    key={i}
                    className="bg-green-50 border-l-4 border-green-600 rounded-lg px-4 py-3 text-md font-medium text-slate-800 leading-snug"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

