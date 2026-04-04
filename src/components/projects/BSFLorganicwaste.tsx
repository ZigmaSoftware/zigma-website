import React, { useEffect, useState } from 'react';
import pic1 from '@/assets/BSFL project pictures/pic 1.jpeg';
import pic2 from '@/assets/BSFL project pictures/pic 2.jpeg';
import pic3 from '@/assets/BSFL project pictures/pic 3.jpeg';
import pic4 from '@/assets/BSFL project pictures/pic 4.jpeg';

interface MetricItem {
  id: string;
  title: string;
  description: string;
  value: string;
  unit: string;
  image: string;
}

interface FocusSection {
  id: string;
  title: string;
  description: string;
  image: string;
  metricId: string;
  bottomLabel?: string;
}

const METRICS: MetricItem[] = [
  {
    id: 'waste-intake',
    title: 'Waste Intake',
    description: 'Daily organic feed intake at site.',
    value: '50',
    unit: 'TONS / DAY',
    image: pic1,
  },
  {
    id: 'land-area',
    title: 'Land Area',
    description: 'Project footprint spread at Brahmapuram.',
    value: '3.4',
    unit: 'ACRES',
    image: pic2,
  },
  {
    id: 'people-employed',
    title: 'People Employed',
    description: 'Current on-ground staffing.',
    value: '25',
    unit: 'WORKFORCE',
    image: pic3,
  },
  {
    id: 'contract-period',
    title: 'Contract Period',
    description: 'Execution period for this project.',
    value: '3',
    unit: 'YEARS',
    image: pic4,
  },
  {
    id: 'technology',
    title: 'Technology Type',
    description: 'Processing technology deployed at site.',
    value: 'Pit Type',
    unit: 'PROCESS',
    image: pic3,
  },
  {
    id: 'egg-capacity',
    title: 'Egg Capacity',
    description: 'Daily egg production capacity.',
    value: '4',
    unit: 'KGS / DAY',
    image: pic2,
  },
  {
    id: 'project-status',
    title: 'Project Status',
    description: 'Current project stage.',
    value: 'Ongoing',
    unit: 'CURRENT STAGE',
    image: pic1,
  },
];

const FOCUS_SECTIONS: FocusSection[] = [
  {
    id: 'intake-land',
    title: 'Waste Intake & Land',
    description: 'Waste intake: 50 tons/day | Land area: 3.4 acres',
    image: pic1,
    metricId: 'waste-intake',
    bottomLabel: 'Our Plant',
  },
  {
    id: 'operations',
    title: 'Operations',
    description: 'People employed: 25 | Contract period: 3 years',
    image: pic2,
    metricId: 'people-employed',
    bottomLabel: 'Operations',
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'Technology deployed: Pit type BSFL process',
    image: pic3,
    metricId: 'technology',
    bottomLabel: 'Processing',
  },
  {
    id: 'production-status',
    title: 'Production & Status',
    description: 'Egg production capacity: 4 kgs/day | Project status: Ongoing',
    image: pic4,
    metricId: 'project-status',
    bottomLabel: 'Solar Dry',
  },
];

const BSFLorganicwaste: React.FC = () => {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);

  const shouldAutoPlay =
    !hoveredSection && !selectedSection && !hoveredMetric && !selectedMetric;
  const autoSectionId = shouldAutoPlay ? FOCUS_SECTIONS[autoIndex]?.id ?? null : null;
  const effectiveHoveredSection = hoveredSection ?? autoSectionId;

  useEffect(() => {
    if (!shouldAutoPlay) return;
    const timer = window.setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % FOCUS_SECTIONS.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [shouldAutoPlay]);

  const activeSection =
    FOCUS_SECTIONS.find((section) => section.id === effectiveHoveredSection) ??
    FOCUS_SECTIONS.find((section) => section.id === selectedSection) ??
    FOCUS_SECTIONS[0];

  const currentMetric =
    METRICS.find((metric) => metric.id === hoveredMetric) ??
    METRICS.find((metric) => metric.id === selectedMetric) ??
    METRICS[0];

  const currentImage = effectiveHoveredSection ? activeSection.image : (hoveredMetric ? currentMetric.image : activeSection.image);

  return (
    <article id="bsfl-organic-waste" className="flex flex-col gap-4">
      <div className="flex text-left gap-2 flex-col md:flex-row md:items-center">
        <h2 className="text-3xl leading-tight text-slate-900 font-bold">Brahmapuram - Kochi, Keralam</h2>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          Kerala
        </span>
      </div>

      <div
        className="flex flex-col lg:flex-row bg-card rounded-2xl overflow-hidden relative border border-border"
        style={{ boxShadow: '0 16px 44px rgba(0,0,0,0.18)' }}
      >
      <div className="relative min-h-[520px] lg:flex-1 bg-black">
        <div className="absolute inset-0 transition-opacity duration-500 overflow-hidden">
          <img
            src={currentImage}
            alt="BSFL organic waste project"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
              hoveredMetric || effectiveHoveredSection ? 'scale-105' : ''
            }`}
          />
          <div className="absolute left-5 top-5 z-30 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-bold tracking-widest bg-orange-400/90 border border-orange-200/70 text-white shadow-lg shadow-orange-900/30 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            Plant Running
          </div>
        </div>

        <div className="relative h-full flex z-20">
          {FOCUS_SECTIONS.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-out group text-left"
              style={{ flex: effectiveHoveredSection === section.id ? 1.45 : 1 }}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => {
                setSelectedSection(section.id);
                setSelectedMetric(section.metricId);
                setDetailsOpen(true);
              }}
            >
              {index < FOCUS_SECTIONS.length - 1 && (
                <div className="absolute right-0 top-0 h-full w-[1.5px] bg-white/25 z-20" />
              )}

              {section.bottomLabel && (
                <div
                  className="absolute bottom-4 left-4 z-20 text-white font-semibold text-base tracking-wide"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.85)' }}
                >
                  {section.bottomLabel}
                </div>
              )}

              {selectedSection === section.id && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 to-emerald-300 z-30" />
              )}
            </button>
          ))}
        </div>

        <div
          className={`overflow-hidden border-t border-border transition-[max-height,opacity,transform] duration-500 lg:absolute lg:inset-y-0 lg:right-0 lg:z-20 lg:w-[36%] lg:border-l ${
            detailsOpen
              ? 'max-h-[650px] opacity-100 translate-y-0 lg:max-h-none lg:translate-x-0'
              : 'max-h-0 opacity-0 -translate-y-2 lg:max-h-none lg:translate-x-5 lg:translate-y-0 lg:pointer-events-none'
          }`}
          aria-hidden={!detailsOpen}
        >
          <div className="h-full p-6 text-foreground bg-background/95 backdrop-blur-sm relative">
            <button
              type="button"
              onClick={() => setDetailsOpen(false)}
              aria-label="Collapse metric details"
              className="absolute right-4 top-4 h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mx-auto"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            <h3 className="text-2xl font-semibold text-foreground leading-tight mb-4">{currentMetric.title}</h3>
            <p
              className={`font-semibold text-primary mb-1 break-words ${
                /[A-Za-z]/.test(currentMetric.value)
                  ? 'text-3xl md:text-4xl leading-tight'
                  : 'text-5xl md:text-6xl leading-none'
              }`}
            >
              {currentMetric.value}
            </p>
            <p className="text-sm tracking-[0.18em] text-muted-foreground">{currentMetric.unit}</p>

            <div className="mt-6 pt-5 border-t border-border space-y-3">
              <p className="text-foreground">Brahmapuram- Kochi, Keralam</p>
              <p className="text-foreground">{currentMetric.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-t lg:border-t-0 border-border bg-card lg:w-[18%] lg:border-l">
        <div className="p-5 border-b border-border">
          <p className="text-lg font-semibold text-muted-foreground">Project Metrics</p>
        </div>

        <div className="flex flex-col">
          {METRICS.map((item) => {
            const isActive = item.id === selectedMetric;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setHoveredMetric(item.id)}
                onMouseLeave={() => setHoveredMetric(null)}
                onClick={() => {
                  setSelectedMetric(item.id);
                  setDetailsOpen(true);
                }}
                className={`group border-b h-20 border-border text-left px-5 py-4 transition-colors ${
                  isActive ? 'bg-primary/10' : 'hover:bg-muted/40'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-base ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{item.title}</span>
                  <svg
                    className="h-4 w-4 text-muted-foreground group-hover:text-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      </div>
    </article>
  );
};

export default BSFLorganicwaste;
