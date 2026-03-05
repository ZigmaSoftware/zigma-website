import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, MapPin, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectStatCard from "@/components/projects/ProjectStatCard";
import { PROJECTS } from "@/data/projects";
import heroImage from "@/assets/website/hero/landfill-mining-hero.jpg";

const TOP_OFFSET = 150;

type ProjectShowcaseDetail = {
  subtitle: string;
  description: string;
  details: {
    project: string;
    focus: string;
    outcome: string;
  };
  metrics?: string[];
};

const PROJECT_SHOWCASE_DETAILS: Record<string, ProjectShowcaseDetail> = {
  kumbakonam: {
    subtitle: "Dumpsite Reclamation Project",
    description: "Kumbakonam dumpsite reclamation project.",
    details: {
      project: "Quantity: 2,31,782 cubic meter. Area reclaimed: 12 acres.",
      focus: "Project period: December 2015 - March 2018. Quantity of RDF disposed (MT): 22,586.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 1,16,280.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 2.39",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 3,794",
      "Carbon sequestered by 1.43 lakh acres of US forests in one year",
      "GHG emissions avoided by 33 wind turbines running for a year",
      "Carbon emissions from 26,720 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  sembakkam: {
    subtitle: "Dumpsite Reclamation Project",
    description: "Sembakkam Lake dumpsite reclamation project.",
    details: {
      project: "Quantity: 38,026 cubic meter. Area reclaimed: 4 acres.",
      focus: "Project period: August 2017 - August 2018. Quantity of RDF disposed (MT): 7,316.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 15,823.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 0.98",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,229",
      "Carbon sequestered by 20,335 acres of US forests in one year",
      "GHO emissions avoided by 5 wind turbines running for a year",
      "Carbon emissions from 3,795 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  "noida-sector-54": {
    subtitle: "Community Development Projects",
    description:
      "In a remarkable feat, this award-winning project, conducted under the watchful eye of the Honourable National Green Tribunal, achieved an incredible transformation in the shortest possible time. It effectively converted a once neglected dumping ground into a state-of-the-art wetland area, captivating thousands of visitors who now frequent the site for recreational purposes. The project's efficiency in completing the transformation within a condensed timeframe further adds to its extraordinary success.",
    details: {
      project: "Quantity: 99,665 metric tonnes. Area reclaimed: 4 acres.",
      focus: "Project period: December 2018 - July 2019. Quantity of RDF disposed: 15,498 metric tonnes.",
      outcome: "CO2 mitigated by processing the legacy waste: 68,698 metric tonnes.",
    },
    metrics: [
      "CO2 mitigated per square metre: 4.26 metric tonnes",
      "CO2 mitigated by using RDF as an alternate fuel resource: 2,604 metric tonnes",
      "Area of US forests where carbon was sequestered in one year: 85,351 acres",
      "GHG emissions avoided: Running 20 wind turbines for a year",
      "Carbon emissions from: 15,927 gasoline-powered passenger vehicles driven for one year",
    ],
  },
  atladara: {
    subtitle: "Dumpsite Reclamation Project",
    description:
      "Under the vigilant monitoring of the Honourable National Green Tribunal, this remarkable project successfully removed the pollution source from the landfill situated on the banks of the Vishwamitri River, preserving the natural habitat of the critically endangered gharials - an IUCN-protected species. The reclaimed land was effectively utilised to establish waste management facilities, including a construction and demolition waste treatment facility, plastic waste treatment facility and waste-to-energy plant. The NGT's oversight ensured compliance with environmental regulations and promoted sustainable practices, further safeguarding the endangered gharials.",
    details: {
      project: "Quantity: 4,21,187 cubic metres. Area reclaimed: 10.5 acres.",
      focus: "Project period: July 2018 - February 2021. Quantity of RDF disposed: 58,897 metric tonnes.",
      outcome: "CO2 mitigated by processing the legacy waste: 2,91,462 metric tonnes.",
    },
    metrics: [
      "CO2 mitigated per square metre: 6.86 metric tonnes",
      "CO2 mitigated by using RDF as an alternate fuel resource: 9,895 metric tonnes",
      "Area of US forests where carbon was sequestered in one year: 3.59 lakh",
      "GHG emissions avoided: Running 84 wind turbines for a year",
      "Carbon emissions from: 67,061 gasoline-powered passenger vehicles driven for one year",
    ],
  },
  pammal: {
    subtitle: "Dumpsite Reclamation Project",
    description: "Pammal dumpsite reclamation project.",
    details: {
      project: "Quantity: 59,175 cubic meter. Area reclaimed: 2.4 acres.",
      focus: "Project period: August 2018 - August 2020. Quantity of RDF disposed (MT): 6,682.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 34,801.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 3.58",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,123",
      "Carbon sequestered by 42,840 acres of US forests in one year",
      "GHG emissions avoided by 10 wind turbines running for a year",
      "Carbon emissions from 7,994 gasoline powered-passenger vehicles",
    ],
  },
  "noida-sector-145a": {
    subtitle: "Dumpsite Reclamation Project",
    description: "Noida Sector 145 A dumpsite reclamation project.",
    details: {
      project: "Quantity: 1,02,837 cubic meter. Area reclaimed: 6.2 acres.",
      focus: "Project period: July 2019 - August 2020. Quantity of RDF disposed (MT): 10,259.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 71,163.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 2.8",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,724",
      "Carbon sequestered by 86,919 acres of US forests in one year",
      "GHG emissions avoided by 20 wind turbines running for a year",
      "Carbon emissions from 16,220 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  poonamallee: {
    subtitle: "Dumpsite Reclamation Project",
    description: "Poonamallee dumpsite reclamation project.",
    details: {
      project: "Quantity: 30,930 cubic meter. Area reclaimed: 3 acres.",
      focus: "Project period: July 2018 - September 2019. Quantity of RDF disposed (MT): 6,034.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 14,823.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 1.22",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,014",
      "Carbon sequestered by 18,886 acres of US forests in one year",
      "GHG emissions avoided by 4 wind turbines running for a year",
      "Carbon emissions from 3,524 gasoline powered-passenger vehicles",
    ],
  },
  ajithsingh: {
    subtitle: "Community Development Projects",
    description:
      "The project played a vital role in reclaiming India's largest dump site to date, spanning 45 acres in Vijayawada, amidst densely populated areas. One significant accomplishment was the successful occupation of over 2,500 apartments that had previously remained unoccupied. These apartments were specifically allocated to individuals from low-income groups through a slum rehabilitation programme, ensuring a positive social impact. The reclaimed land was intelligently repurposed to incorporate various essential facilities, including a construction and demolition waste management facility, material recovery facility, waste transfer station, farmer's produce market and a children's park.",
    details: {
      project: "Quantity: 3,05,897 cubic metres. Area reclaimed: 45 acres.",
      focus: "Project period: July 2018 - July 2020. Quantity of RDF disposed: 47,178 metric tonnes.",
      outcome: "CO2 mitigated by processing the legacy waste: 2,11,681 metric tonnes.",
    },
    metrics: [
      "CO2 mitigated by using RDF as an alternate fuel resource: 7,926 tonnes",
      "Area of US forests where carbon was sequestered in one year: 2.61 lakh",
      "GHG emissions avoided: Running 61 wind turbines for a year",
      "Carbon emissions from: 48,869 gasoline-powered passenger vehicles driven for one year",
    ],
  },
  vairapalayam: {
    subtitle: "Dumpsite Reclamation Project",
    description:
      "Under the vigilant monitoring of the esteemed National Green Tribunal, the acclaimed project has successfully reclaimed a sprawling seven-acre dumpsite situated along the banks of the Cauvery river. The Cauvery river serves as a vital source of drinking water for millions of individuals. Presently, the reclaimed land has been transformed into a magnificent Miyawaki forest by the urban local body. In recognition of its significant role in preserving the region's flora and fauna, the project has received the prestigious Smart City award for the urban local body.",
    details: {
      project: "Quantity: 1,25,092 cubic metres. Area reclaimed: 7 acres.",
      focus: "Project period: September 2019 - August 2021. Quantity of RDF disposed: 8,719 metric tonnes.",
      outcome: "CO2 mitigated by processing the legacy waste: 91,009 metric tonnes.",
    },
    metrics: [
      "CO2 mitigated per square metre: 3.21 metric tonnes",
      "CO2 mitigated by using RDF as an alternate fuel resource: 1,465 metric tonnes",
      "Area of US forests where carbon was sequestered in one year: 1.1 lakh",
      "GHG emissions avoided: Running 26 wind turbines for a year",
      "Carbon emissions from: 20,578 gasoline-powered passenger vehicles driven for one year",
    ],
  },
  tirupati: {
    subtitle: "Surface Stabilization",
    description: "Stabilized the surface by leveling and clearing, reducing runoff issues.",
    details: {
      project: "Surface stabilization and cleanup.",
      focus: "Leveling, drainage pathing, cleanup.",
      outcome: "Stable surface with reduced runoff.",
    },
  },
  chidambaram: {
    subtitle: "Dumpsite Reclamation Project",
    description: "Chidambaram dumpsite reclamation project.",
    details: {
      project: "Quantity: 52,000 cubic meter. Area reclaimed: 4 acres.",
      focus: "Project period : April 2019- March 2021. Quantity of RDF disposed (MT) : 4,804.",
      outcome: "CO2 mitigated by processing the legacy waste: 30,634.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 1.89",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 807",
      "Carbon sequestered by 37,494 acres of US forests in one year",
      "GHG emissions avoided by 9 wind turbines running for a year",
      "Carbon emissions from 6,997 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  pallavaram: {
    subtitle: "Dumpsite Reclamation Project",
    description: "Pallavaram dumpsite reclamation project.",
    details: {
      project: "Quantity: 1,08,000 cubic meter. Area reclaimed: 5 acres.",
      focus: "Project period : Jan 2020 -Sept 2021. Quantity of RDF disposed (MT) : 13,271.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 49,809.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 2.46",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,230",
      "Carbon sequestered by 62,057 acres of US forests in one year",
      "GHG emissions avoided by 15 wind turbines running for a year",
      "Carbon emissions from 11,580 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  karaikudi: {
    subtitle: "Dumpsite Reclamation Project",
    description: "Karaikudi dumpsite reclamation project.",
    details: {
      project: "Quantity: 1,35,635 cubic meter. Area reclaimed: 13.75 acres.",
      focus: "Project period : Feb 2020 - Sept 2021. Quantity of RDF disposed (MT) : 15,796.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 81,381.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 1.46",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,654",
      "Carbon sequestered by 1 lakh acres of US forests in one year",
      "GHG emissions avoided by 23 wind turbines running for a year",
      "Carbon emissions from 18,,700 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  karur: {
    subtitle: "Dumpsite Reclamation Project",
    description: "Karur dumpsite reclamation project.",
    details: {
      project: "Quantity: 1,37,394 cubic meter. Area reclaimed: 15 acres.",
      focus: "Project period : February 2020 - March 2021. Quantity of RDF disposed (MT) : 6,586.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 90,461.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 1.49",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,106",
      "Carbon sequestered by 1.09 lakh acres of US forests in one year",
      "GHG emissions avoided by 26 wind turbines running for a year",
      "Carbon emissions from 20,376 gasoline powered-passenger vehicles driven for one year",
    ],
  },
  "tambaram-kannadapalayam": {
    subtitle: "Dumpsite Reclamation Project",
    description: "Tambaram- Kannadapalayam dumpsite reclamation project.",
    details: {
      project: "Quantity : 1,50,494 cubic meter. Area reclaimed : 5 acres.",
      focus: "Project period : August 2019 - June 2022. Quantity of RDF disposed (MT) : 24,841.",
      outcome: "CO2 mitigated by processing the legacy waste (MT): 1,18,362.",
    },
    metrics: [
      "CO2 mitigated per square meter (MT): 5.85",
      "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 4,173",
      "Carbon sequestered by 1.46 lakh acres of US forests in one year",
      "GHG emissions avoided by 34 wind turbines running for a year",
      "Carbon emissions from 27,268 gasoline powered-passenger vehicles driven for one year",
    ],
  },
};

const Projects = () => {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const [activeState, setActiveState] = useState(PROJECTS[0].state);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const hasInitializedStateScroll = useRef(false);
  const states = Array.from(new Set(PROJECTS.map((project) => project.state)));
  const filteredProjects = useMemo(
    () => PROJECTS.filter((project) => project.state === activeState),
    [activeState]
  );

  useEffect(() => {
    if (!filteredProjects.length) return;

    const onScroll = () => {
      let currentProjectId = filteredProjects[0].id;

      filteredProjects.forEach((project) => {
        const element = document.getElementById(project.id);
        if (element && window.scrollY >= element.offsetTop - TOP_OFFSET) {
          currentProjectId = project.id;
        }
      });

      setActiveId(currentProjectId);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [filteredProjects]);

  useEffect(() => {
    if (filteredProjects.length) {
      setActiveId(filteredProjects[0].id);
    }
  }, [activeState]);

  useEffect(() => {
    if (!filteredProjects.length) return;

    if (!hasInitializedStateScroll.current) {
      hasInitializedStateScroll.current = true;
      return;
    }

    requestAnimationFrame(() => {
      const firstProjectElement = document.getElementById(filteredProjects[0].id);
      if (!firstProjectElement) return;

      window.scrollTo({
        top: firstProjectElement.getBoundingClientRect().top + window.scrollY - TOP_OFFSET,
        behavior: "smooth",
      });
    });
  }, [filteredProjects]);

  useEffect(() => {
    if (!expandedProjectId) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedProjectId(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [expandedProjectId]);

  useEffect(() => {
    document.body.style.overflow = expandedProjectId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedProjectId]);

  const scrollToState = (state: string) => {
    setActiveState(state);
    setExpandedProjectId(null);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <Header />

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24 text-center lg:px-10">
        <img
          src={heroImage}
          alt="Landfill mining projects"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/85 md:text-sm">Impact in Action</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Projects That Reclaimed Land at Scale
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
            Explore how Zigma transforms legacy waste into measurable environmental outcomes across
            multiple cities in India.
          </p>
        </div>
      </section>

      <nav className="sticky top-20 z-40 border-y border-slate-200 bg-white/95 backdrop-blur">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

        <div
          className="mx-auto flex max-w-[1400px] justify-center gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:px-10"
          role="tablist"
          aria-label="State navigation"
        >
          {states.map((state) => {
            const isActive = activeState === state;
            return (
              <button
                key={state}
                data-state={state}
                onClick={() => scrollToState(state)}
                onKeyPress={(e) => { if (e.key === "Enter") scrollToState(state); }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${isActive ? "border-primary bg-primary text-primary-foreground" : "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to ${state} projects`}
              >
                {state}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-[1400px] space-y-16 px-6 py-12 lg:px-10">
        {filteredProjects.map((project) => {
          return (
            <article
              key={project.id}
              id={project.id}
              className="container-main scroll-mt-40 border-b border-slate-200 pb-12 last:border-b-0"
              tabIndex={0} // Ensures focus on this project article
              aria-labelledby={project.name}
            >
              <div className="mb-6">
                <header className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(260px,320px)_1fr_auto] lg:items-center">
                  <div className="flex flex-col items-start gap-3">
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl lg:text-4xl">{project.name}</h2>
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                      {project.type}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.state}
                    </span>
                  </div>

                  <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.stats.map((stat) => (
                      <div key={`${project.id}-${stat.label}`} className="w-full max-w-[230px]">
                        <ProjectStatCard stat={stat} compact />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-start lg:justify-end">
                    <button
                      type="button"
                      onClick={() => setExpandedProjectId(project.id)}
                      className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </header>
              </div>

              <div id={`${project.id}-details`} className="mt-2">
                <div className="relative  w-full">
                  {project.beforeImage && project.afterImage ? (
                    <div>
                      <div className="relative h-[34vh] sm:h-[36vh] lg:h-[40vh] overflow-hidden border border-slate-200">
                        <div className="absolute inset-0 grid grid-cols-2">
                          <div className="relative h-full">
                            <img
                              src={project.beforeImage}
                              alt={`${project.name} before`}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                            <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-sm bg-slate-900 px-3 py-1 text-xs font-bold tracking-[0.08em] text-white">
                              BEFORE
                            </span>
                          </div>
                          <div className="relative h-full">
                            <img
                              src={project.afterImage}
                              alt={`${project.name} after`}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                            <span className="absolute right-3 top-3 z-10 inline-flex items-center rounded-sm bg-primary px-3 py-1 text-xs font-bold tracking-[0.08em] text-white">
                              AFTER
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600">
                      Before/after images are not available for this project.
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {expandedProjectId && PROJECT_SHOWCASE_DETAILS[expandedProjectId] && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 sm:py-8">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setExpandedProjectId(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 pb-4 pt-6 backdrop-blur lg:px-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  {PROJECT_SHOWCASE_DETAILS[expandedProjectId].subtitle}
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  {PROJECTS.find((project) => project.id === expandedProjectId)?.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setExpandedProjectId(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(90vh-96px)] overflow-y-auto px-6 py-5 lg:px-8">
              <p className="mb-6 text-sm leading-relaxed text-slate-700 md:text-base">
                {PROJECT_SHOWCASE_DETAILS[expandedProjectId].description}
              </p>

              <div className="grid grid-cols-1 gap-4 text-sm text-slate-700 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-1 text-xs text-slate-500 md:text-sm">Project</p>
                  <p className="text-sm text-slate-800 md:text-base">
                    {PROJECT_SHOWCASE_DETAILS[expandedProjectId].details.project}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-1 text-xs text-slate-500 md:text-sm">Focus</p>
                  <p className="text-sm text-slate-800 md:text-base">
                    {PROJECT_SHOWCASE_DETAILS[expandedProjectId].details.focus}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-1 text-xs text-slate-500 md:text-sm">Outcome</p>
                  <p className="text-sm text-slate-800 md:text-base">
                    {PROJECT_SHOWCASE_DETAILS[expandedProjectId].details.outcome}
                  </p>
                </div>
              </div>

              {PROJECT_SHOWCASE_DETAILS[expandedProjectId].metrics && (
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="mb-3 text-sm text-slate-500">Key Metrics</p>
                  <ul className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2 md:text-base">
                    {PROJECT_SHOWCASE_DETAILS[expandedProjectId].metrics?.map((item, idx) => (
                      <li key={idx} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Projects;
