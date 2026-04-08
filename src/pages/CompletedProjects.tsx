import React, { useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ProjectCard,
  ProjectGalleryCard,
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
  const [isPrivateView, setIsPrivateView] = useState(false);

  const privateProjectTitles = useMemo(
    () => new Set(['Tirupati Tirumala Devasthanams', 'ITC Coimbatore']),
    [],
  );
  const privateProjects = useMemo(
    () => projects.filter((p) => privateProjectTitles.has(p.title)),
    [projects, privateProjectTitles],
  );
  const publicFilteredProjects = useMemo(
    () => filteredProjects.filter((p) => !privateProjectTitles.has(p.title)),
    [filteredProjects, privateProjectTitles],
  );
  const displayProjects = isPrivateView ? privateProjects : publicFilteredProjects;

  const activeProject = modalId !== null ? displayProjects.find((p) => p.id === modalId) ?? null : null;
  const normalizedState = selectedState.trim().toLowerCase();

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
        onStateSelect={(state) => {
          setIsPrivateView(false);
          handleStateSelect(state);
        }}
        showPrivateTab
        isPrivateActive={isPrivateView}
        onPrivateTabClick={() => setIsPrivateView((prev) => !prev)}
      />

      {/* Projects list */}
      <main className="max-w-[1400px] mx-auto px-[5%] pb-24 flex flex-col gap-20">
        {displayProjects.map((p, i) => (
          (() => {
            const normalizedTitle = p.title.trim().toLowerCase().replace(/\s+/g, ' ');
            const isNagpurPhase2 = normalizedTitle === 'nagpur- phase 2' || normalizedTitle === 'nagpur - phase 2';
            const isAtladaraVadodara =
              normalizedTitle === 'atladara- vadodara' || normalizedTitle === 'atladara - vadodara';
            const showNagpurGallery = !isPrivateView && normalizedState === 'maharashtra' && isNagpurPhase2;
            const showAtladaraGallery = !isPrivateView && normalizedState === 'gujarat' && isAtladaraVadodara;

            if (showNagpurGallery || showAtladaraGallery) {
              return (
                <ProjectGalleryCard
                  key={p.id}
                  variant={showNagpurGallery ? 'nagpur-phase-2' : 'atladara-vadodara'}
                  onViewDetails={() => setModalId(p.id)}
                />
              );
            }

            return (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                total={displayProjects.length}
                onViewDetails={(id) => setModalId(id)}
                allProjects={projects}
                isComparison={p.status === 'completed'}
              />
            );
          })()
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
