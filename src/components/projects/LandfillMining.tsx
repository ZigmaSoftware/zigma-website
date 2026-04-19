import React, { useMemo, useState } from 'react';
import {
  ProjectCard,
  ProjectGalleryCard,
  ProjectModal,
  StateFilter,
} from '@/features/projects/components';
import { useProjectFilter } from '@/features/projects/hooks/useProjectFilter';
import { getAllProjects } from '@/features/projects/data/projects';

interface LandfillMiningProps {
  hideLayout?: boolean;
}

const LandfillMining: React.FC<LandfillMiningProps> = ({ hideLayout = false }) => {
  const allProjects = getAllProjects();
  const [activeRegion, setActiveRegion] = useState<'india' | 'international'>('india');
  const [modalId, setModalId] = useState<number | null>(null);

  // Landfill mining project titles
  const landfillMiningTitles = useMemo(
    () => new Set([
      'Kumbakonam',
      'Sembakkam',
      'Pammal',
      'Poonamallee',
      'Pallavaram',
      'Tambaram',
      'Perungudi',
      'Kodungaiyur',
      'Chidambaram',
      'Vendipalayam',
      'Kammiyampettai',
      'Pachayankuppam',
      'Keeramangalam',
      'Karaikudi',
      'Karur',
      'Dindigul',
      'Tiruchirappalli',
      'Vijayawada',
      'Kollam',
      'Kozhikode',
      'Rayadurgam',
      'Atmakur',
      'Buchireddypalem',
      'Gudur',
      'Kavali',
      'Nayudupeta',
      'Atladara- Vadodara',
      'Nagpur- Phase 2',
      'Paschim Boragaon- Guwahati',
      'Belortol Guwahati',
      'Sector 54 NOIDA',
      'Sector 145 NOIDA Phase 1',
      'Sector 145 NOIDA Phase 2',
      'Gurugram',
      'Puducherry',
    ]),
    [],
  );

  // Filter only landfill mining projects
  const landfillMiningProjects = useMemo(
    () => allProjects.filter((p) => landfillMiningTitles.has(p.title)),
    [allProjects, landfillMiningTitles],
  );

  // Use project filter hook for state filtering
  const { states, selectedState, filteredProjects, handleStateSelect } = useProjectFilter(landfillMiningProjects);

  // Filter by state and ensure they're landfill mining projects
  const displayProjects = useMemo(
    () => filteredProjects.filter((p) => landfillMiningTitles.has(p.title)),
    [filteredProjects, landfillMiningTitles],
  );

  const activeProject = modalId !== null ? displayProjects.find((p) => p.id === modalId) ?? null : null;
  const normalizedState = selectedState.trim().toLowerCase();

  return (
    <div className="min-h-screen bg-background">
      {/* shimmer keyframes */}
      <style>{`
        @keyframes barShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      {/* Region Tabs - India / International */}
      <nav className="sticky top-[64px] p-2 pt-4 overflow-hidden border-y border-border bg-background/95 backdrop-blur z-40">
        <div className="max-w-[1400px] mx-auto px-[5%] py-2 flex flex-wrap items-center gap-3">
          <div className="relative inline-grid grid-cols-2 rounded-full border border-border bg-muted/60 p-1">
            <span
              aria-hidden="true"
              className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out ${
                activeRegion === 'international' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            <button
              type="button"
              onClick={() => setActiveRegion('india')}
              className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                activeRegion === 'india'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              India
            </button>
            <button
              type="button"
              onClick={() => setActiveRegion('international')}
              className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                activeRegion === 'international'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              International
            </button>
          </div>
        </div>
      </nav>

      {/* State Filter - Only show for India region */}
      {activeRegion === 'india' && (
        <StateFilter
          states={states}
          selectedState={selectedState}
          onStateSelect={handleStateSelect}
        />
      )}

      {/* Projects list */}
      {activeRegion === 'india' ? (
        <main className="max-w-[1400px] mx-auto px-[5%] pb-24 flex flex-col gap-20">
          {displayProjects.length > 0 ? (
            displayProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                total={displayProjects.length}
                onViewDetails={(id) => setModalId(id)}
                allProjects={landfillMiningProjects}
                isComparison={p.status === 'completed'}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                No landfill mining projects found in this state.
              </p>
            </div>
          )}
        </main>
      ) : (
        <main className="max-w-[1400px] mx-auto px-[5%] pb-24 flex flex-col gap-20">
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              International landfill mining projects coming soon...
            </p>
          </div>
        </main>
      )}

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setModalId(null)} />
      )}
    </div>
  );
};

export default LandfillMining;
