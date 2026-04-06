import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ProjectCard,
  ProjectModal,
  StateFilter,
} from '@/features/projects/components';
import { useProjectFilter } from '@/features/projects/hooks/useProjectFilter';
import { getAllProjects } from '@/features/projects/data/projects';

interface CompletedProjectsProps {
  hideLayout?: boolean;
}

const CompletedProjects: React.FC<CompletedProjectsProps> = ({
  hideLayout = false,
}) => {
  const projects = getAllProjects();
  const { states, selectedState, filteredProjects, handleStateSelect } = useProjectFilter(projects);
  const [modalId, setModalId] = useState<number | null>(null);

  const activeProject = modalId !== null ? projects.find((p) => p.id === modalId) ?? null : null;

  return (
    <div className="min-h-screen bg-background">
      {/* shimmer keyframes */}
      <style>{`
        @keyframes barShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      {!hideLayout && <Header />}

      {/* State Filter */}
      <StateFilter
        states={states}
        selectedState={selectedState}
        onStateSelect={handleStateSelect}
      />

      {/* Projects list */}
      <main className="max-w-[1400px] mx-auto px-[5%] pb-24 flex flex-col gap-20">
        {filteredProjects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={filteredProjects.length}
            onViewDetails={(id) => setModalId(id)}
            allProjects={projects}
            isComparison={p.status === 'completed'}
          />
        ))}
      </main>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setModalId(null)} />
      )}

      {!hideLayout && <Footer />}
    </div>
  );
};

export default CompletedProjects;
