import React, { Suspense, lazy, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ProjectCard,
  StateFilter,
} from '@/features/projects/components';
import { useProjectFilter } from '@/features/projects/hooks/useProjectFilter';
import { getOngoingProjects } from '@/features/projects/data/projects';

const ProjectModal = lazy(() => import('@/features/projects/components/ProjectModal/ProjectModal'));

interface OngoingProjectsProps {
  hideLayout?: boolean;
  showTabSwitcher?: boolean;
  activeTab?: 'completed' | 'ongoing';
  onTabChange?: (tab: 'completed' | 'ongoing') => void;
}

const OngoingProjects: React.FC<OngoingProjectsProps> = ({
  hideLayout = false,
  showTabSwitcher = false,
  activeTab = 'ongoing',
  onTabChange,
}) => {
  const projects = getOngoingProjects();
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
        showTabSwitcher={showTabSwitcher}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Projects list */}
      <main className="max-w-[1400px] mx-auto px-[5%] pb-24 flex flex-col gap-20">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              total={filteredProjects.length}
              onViewDetails={(id) => setModalId(id)}
              allProjects={projects}
              isComparison={false}
            />
          ))
        ) : (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            No ongoing projects found for the selected state.
          </div>
        )}
      </main>

      {/* Modal */}
      {activeProject && (
        <Suspense fallback={null}>
          <ProjectModal project={activeProject} onClose={() => setModalId(null)} />
        </Suspense>
      )}

      {!hideLayout && <Footer />}
    </div>
  );
};

export default OngoingProjects;
