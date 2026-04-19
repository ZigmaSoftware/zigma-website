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
            const isKodungaiyurChennai =
              normalizedTitle === 'kodungaiyur- chennai' || normalizedTitle === 'kodungaiyur - chennai';
            const isVendipalayamErode =
              normalizedTitle === 'vendipalayam- erode' || normalizedTitle === 'vendipalayam - erode';
            const isPerungudiChennai =
              normalizedTitle === 'perungudi- chennai' || normalizedTitle === 'perungudi - chennai';
            const isMakarpuraPhase1 =
              normalizedTitle === 'makarpura- vadodara- phase 1' || normalizedTitle === 'makarpura - vadodara - phase 1';
            const isMakarpuraPhase2 =
              normalizedTitle === 'makarpura- vadodara- phase 2' || normalizedTitle === 'makarpura - vadodara - phase 2';
            const isRayadurgam =
              normalizedTitle === 'rayadurgam';
            const showNagpurGallery = !isPrivateView && normalizedState === 'maharashtra' && isNagpurPhase2;
            const showAtladaraGallery = !isPrivateView && normalizedState === 'gujarat' && isAtladaraVadodara;
            const showKodungaiyurGallery =
              !isPrivateView &&
              (normalizedState === 'tamilnadu' || normalizedState === 'tamil nadu') &&
              isKodungaiyurChennai;
            const showVendipalayamGallery =
              !isPrivateView &&
              (normalizedState === 'tamilnadu' || normalizedState === 'tamil nadu') &&
              isVendipalayamErode;
            const showPerungudiGallery =
              !isPrivateView &&
              (normalizedState === 'tamilnadu' || normalizedState === 'tamil nadu') &&
              isPerungudiChennai;
            const showMakarpuraGallery = !isPrivateView && normalizedState === 'gujarat' && isMakarpuraPhase1;
            const showMakarpuraPhase2Gallery = !isPrivateView && normalizedState === 'gujarat' && isMakarpuraPhase2;
            const showRayadurgamGallery = !isPrivateView && normalizedState === 'andhra pradesh' && isRayadurgam;

            if (showNagpurGallery || showAtladaraGallery || showKodungaiyurGallery || showVendipalayamGallery || showPerungudiGallery || showMakarpuraGallery || showMakarpuraPhase2Gallery || showRayadurgamGallery) {
              return (
                <ProjectGalleryCard
                  key={p.id}
                  variant={
                    showNagpurGallery
                      ? 'nagpur-phase-2'
                      : showAtladaraGallery
                        ? 'atladara-vadodara'
                        : showKodungaiyurGallery
                          ? 'kodungaiyur-chennai'
                          : showVendipalayamGallery
                            ? 'vendipalayam-erode'
                            : showPerungudiGallery
                              ? 'perungudi-chennai'
                              : showMakarpuraGallery
                                ? 'makarpura-vadodara-phase-1'
                                : showMakarpuraPhase2Gallery
                                  ? 'makarpura-vadodara-phase-2'
                                  : 'rayadurgam-andhra-pradesh'
                  }
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

