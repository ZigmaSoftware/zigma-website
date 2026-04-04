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
          <div>
            <p className="text-[0.7rem] font-bold text-slate-400 mb-1">{project.subtitle}</p>
            <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
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
          <p className="text-slate-600 leading-relaxed mb-6 text-[0.95rem]">{project.desc}</p>

          {project.metrics.length > 0 && (
            <div className="border-t border-slate-100 pt-5 mb-6">
              <p className="text-[0.75rem] tracking-widest font-bold text-slate-400 mb-3">
                Credibility Markers
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.metrics.map((m, i) => (
                  <li
                    key={i}
                    className="bg-green-50 border-l-4 border-green-600 rounded-lg px-4 py-3 text-[0.85rem] font-medium text-slate-700 leading-snug"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Project', value: project.project },
              { label: 'Focus', value: project.focus },
              { label: 'Outcome', value: project.outcome },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-slate-50 border border-slate-100 rounded-xl p-4 transition-all duration-200 hover:border-green-400 hover:-translate-y-1"
              >
                <p className="text-sm tracking-widest font-bold text-slate-400 mb-2">{label}</p>
                <p className="text-lg font-medium text-slate-800 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
