import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// -- Image imports ----------------------------------------------
import P1b from "@/assets/before after projects/kumbakonam before.png";
import P1a from "@/assets/before after projects/kumbakonam after.png";
import P2b from "@/assets/before after projects/SEMBAKKAM LAKE  before.png";
import P2a from "@/assets/before after projects/SEMBAKKAM LAKE  after.png";
import P3b from "@/assets/before after projects/noida before.png";
import P3a from "@/assets/before after projects/noida after.png";
import P4b from "@/assets/before after projects/VADODARA - ATLADAR  before.png";
import P4a from "@/assets/before after projects/VADODARA - ATLADAR  after.png";
import P5b from "@/assets/before after projects/poonamallee before.png";
import P5a from "@/assets/before after projects/poonamallee after.png";
import P6b from "@/assets/before after projects/VIJAYAWADA-AJITSINGH NAGAR before.png";
import P6a from "@/assets/before after projects/VIJAYAWADA-AJITSINGH NAGAR after.png";
import P7b from "@/assets/before after projects/Erode-Vairapalayam before.png";
import P7a from "@/assets/before after projects/Erode-Vairapalayam after.png";
import P8b from "@/assets/before after projects/pammal before.png";
import P8a from "@/assets/before after projects/pammal after.png";
import P9b from "@/assets/before after projects/noida sector 145- before (1).png";
import P9a from "@/assets/before after projects/noida sector 145 after.png";
import P10b from "@/assets/before after projects/tirupathi before.png";
import P10a from "@/assets/before after projects/tirupathi before after.png";
import P11b from "@/assets/before after projects/chidambaram before.png";
import P11a from "@/assets/before after projects/chidambaram after.png";
import P12b from "@/assets/before after projects/pallavaram before.jpg";
import P12a from "@/assets/before after projects/pallavaram after.png";
import P13b from "@/assets/before after projects/karaikudi before.png";
import P13a from "@/assets/before after projects/karaikudi after.png";
import P14b from "@/assets/before after projects/karur before.png";
import P14a from "@/assets/before after projects/karur after.png";
import P15b from "@/assets/before after projects/tambaram before.png";
import P15a from "@/assets/before after projects/tambaram after.png";
import p16b from "@/assets/before after projects/CUDDALORE PANCHANKUPPAM  before.png";
import p16a from "@/assets/before after projects/CUDDALORE PANCHANKUPPAM  after.png";
import p17b from "@/assets/before after projects/KOLLAM - KUREEPUZHA before.png";
import p17a from "@/assets/before after projects/KOLLAM - KUREEPUZHA  after.png";
import p18b from "@/assets/before after projects/GUWAHATI - BORAGOAN before.png";
import p18a from "@/assets/before after projects/GUWAHATI - BORAGOAN after.png";
import p19b from "@/assets/before after projects/Perungudi before.png";
import p19a from "@/assets/before after projects/Perungudi after.png";
import p20b from "@/assets/before after projects/muthusamy colony before.png";
import p20a from "@/assets/before after projects/muthusamy colony after.png";
import p21b from "@/assets/before after projects/CUDDALORE PANCHANKUPPAM  before.png";
import p21a from "@/assets/before after projects/CUDDALORE PANCHANKUPPAM  after.png";
import p22b from "@/assets/before after projects/Dindigul-Before.jpg"; 
import p22a from "@/assets/before after projects/Dindigul-After.jpg";
import p23b from "@/assets/before after projects/Trichy phase 1 Before.jpg";
import p23a from "@/assets/before after projects/Trichy phase 1 After.jpg";   
import p24b from "@/assets/before after projects/Trichy Phase 2-Before.jpg";
import p24a from "@/assets/before after projects/Trichy Phase 2-After.jpg";
import p25b from "@/assets/before after projects/Makarpura-(Before).jpg";
import p25a from "@/assets/before after projects/Makarpura- (After).jpg";
import p26b from "@/assets/before after projects/Nagpur Bhandewadi-before.jpg";
import p26a from "@/assets/before after projects/Nagpur Bhandewadi-After.png";
import p27b from "@/assets/before after projects/Noida S-145 Site B-Before.jpg";
import p27a from "@/assets/before after projects/Noida S-145 Site B-After.jpg";
import p28b from "@/assets/before after projects/Puducherry-Before..jpg";
import p28a from "@/assets/before after projects/Puducherry-After.jpg";







// -- Types ------------------------------------------------------
interface Project {
  id: number;
  title: string;
  subtitle: string;
  state: string;
  desc: string;
  project: string;
  focus: string;
  outcome: string;
  metrics: string[];
  waste: number;
  land: number;
  co2: number;
  beforeImage: string;
  afterImage: string;
}

type MetricKey = 'waste' | 'land' | 'co2' | 'timeline' | 'recovery';

interface InteractiveMetric {
  key: MetricKey;
  label: string;
  railValue: string;
  eyebrow: string;
  title: string;
  displayValue: string;
  unit: string;
  status: string;
  progress: number;
  details: Array<{ label: string; value: string }>;
}

// -- Data -------------------------------------------------------
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23e2e8f0"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23475569" font-family="Arial,sans-serif" font-size="40"></text></svg>';

const createCompletedProject = (
  id: number,
  title: string,
  state: string,
  beforeImage: string = PLACEHOLDER_IMAGE,
  afterImage: string = PLACEHOLDER_IMAGE,
): Project => ({
  id,
  title,
  subtitle: "Project Completed",
  state,
  desc: `${title} legacy waste project.`,
  project: "Project status: Project Completed.",
  focus: "Legacy waste remediation and site stabilization completed.",
  outcome: "Status: Completed.",
  metrics: [],
  waste: 0,
  land: 0,
  co2: 0,
  beforeImage,
  afterImage,
});

const PROJECTS: Project[] = [
  // Andhra Pradesh
  createCompletedProject(1, "Tirupati", "Andhra Pradesh", P10b, P10a),
  createCompletedProject(2, "Vijayawada", "Andhra Pradesh", P6b, P6a),
  createCompletedProject(3, "Vizag (Phase-1)", "Andhra Pradesh"),
  createCompletedProject(4, "Vizag New (Phase-2)", "Andhra Pradesh"),
  createCompletedProject(5, "GVMC Vizag (Phase-3)", "Andhra Pradesh"),
  createCompletedProject(6, "Vizag SAC (Phase-4)", "Andhra Pradesh"),
  createCompletedProject(7, "Madanapalle", "Andhra Pradesh"),
  createCompletedProject(8, "kuppam", "Andhra Pradesh"),
  createCompletedProject(9, "TTD -Tirumala", "Andhra Pradesh"),
  createCompletedProject(10, "CTO - B.Kothakota", "Andhra Pradesh"),
  createCompletedProject(11, "CTO - Punganur", "Andhra Pradesh"),
  createCompletedProject(12, "CTO - Palmaner", "Andhra Pradesh"),
  createCompletedProject(13, "TPY - Sullurupeta", "Andhra Pradesh"),
  createCompletedProject(14, "TPY - Puttur", "Andhra Pradesh"),
  createCompletedProject(15, "TPY - Nagari", "Andhra Pradesh"),
  createCompletedProject(16, "TPY - VENGATAGIRI", "Andhra Pradesh"),
  createCompletedProject(17, "GDR - Atmakur", "Andhra Pradesh"),
  createCompletedProject(18, "GDR-Naidupet", "Andhra Pradesh"),
  createCompletedProject(19, "ATP-Gooty", "Andhra Pradesh"),

  // Tamil Nadu
  createCompletedProject(20, "Chidambaram", "Tamil Nadu", P11b, P11a),
  createCompletedProject(21, "Cuddalore", "Tamil Nadu", p16b, p16a),
  createCompletedProject(22, "Dindigul", "Tamil Nadu", p22b, p22a),
  createCompletedProject(23, "Karaikudi", "Tamil Nadu", P13b, P13a),
  createCompletedProject(24, "Karur", "Tamil Nadu", P14b, P14a),
  createCompletedProject(25, "Kumbakonam", "Tamil Nadu", P1b, P1a),
  createCompletedProject(26, "Pallavaram", "Tamil Nadu", P12b, P12a),
  createCompletedProject(27, "Pammal", "Tamil Nadu", P8b, P8a),
  createCompletedProject(28, "Perungudi Package-3", "Tamil Nadu", p19b, p19a),
  createCompletedProject(29, "Perungudi Package-4", "Tamil Nadu"),
  createCompletedProject(30, "Perungudi Package-5", "Tamil Nadu"),
  createCompletedProject(31, "Poonamalle", "Tamil Nadu", P5b, P5a),
  createCompletedProject(32, "Sembakkam", "Tamil Nadu", P2b, P2a),
  createCompletedProject(33, "Tambaram", "Tamil Nadu", P15b, P15a),
  createCompletedProject(34, "Trichy", "Tamil Nadu", p23b, p23a),
  createCompletedProject(35, "Trichy New", "Tamil Nadu", p24b, p24a),
  createCompletedProject(36, "ITC", "Tamil Nadu"),
  createCompletedProject(37, "Sathya Sub", "Tamil Nadu"),
  createCompletedProject(38, "Vairapalayam", "Tamil Nadu", P7b, P7a),
  createCompletedProject(39, "Vendipalayam", "Tamil Nadu"),
  createCompletedProject(40, "Muthusamy Colony", "Tamil Nadu", p20b, p20a),
  createCompletedProject(41, "Pudukkottai (Keeramangalam)", "Tamil Nadu"),
  createCompletedProject(42, "Trichy phase 3", "Tamil Nadu"),

  // Kerala
  createCompletedProject(43, "Kollam", "Kerala", p17b, p17a),

  // Gujarat
  createCompletedProject(44, "Makkarpura", "Gujarat", p25b, p25a),
  createCompletedProject(45, "Vadodara", "Gujarat", P4b, P4a),

  // Maharashtra
  createCompletedProject(46, "Nagpur", "Maharashtra", p26b, p26a),
  createCompletedProject(47, "Nagpur Smart City", "Maharashtra"),

  // Uttar Pradesh
  createCompletedProject(48, "Noida-54", "Uttar Pradesh", P3b, P3a),
  createCompletedProject(49, "Noida-145 Old", "Uttar Pradesh", P9b, P9a),
  createCompletedProject(50, "Noida -New", "Uttar Pradesh", p27b, p27a),

  // Puducherry
  createCompletedProject(51, "Pondy", "Puducheery", p28b, p28a),
  createCompletedProject(52, "Pondy -2", "Puducheery"),

  // Haryana
  createCompletedProject(53, "Gurugram", "Haryana"),
];

// -- Counter hook -----------------------------------------------
const PROJECT_LIMITS = PROJECTS.reduce(
  (acc, p) => ({
    waste: Math.max(acc.waste, p.waste),
    land: Math.max(acc.land, p.land),
    co2: Math.max(acc.co2, p.co2),
  }),
  { waste: 1, land: 1, co2: 1 },
);

const formatIndian = (value: number) =>
  value.toLocaleString('en-IN', { maximumFractionDigits: value % 1 === 0 ? 0 : 1 });

const buildInteractiveMetrics = (project: Project): InteractiveMetric[] => {
  const status = project.subtitle.includes('Under Progress')
    ? 'In Progress'
    : project.subtitle.includes('Completed')
      ? 'Completed'
      : 'Active';
  const leadMetric = project.metrics[0] ?? project.outcome;

  return [
    {
      key: 'waste',
      label: 'Waste Processed',
      railValue: project.waste > 0 ? `${formatIndian(project.waste)} m3` : 'No data',
      eyebrow: 'Operations',
      title: 'Waste Processed',
      displayValue: project.waste > 0 ? formatIndian(project.waste) : '-',
      unit: 'CUBIC METERS',
      status,
      progress: Math.min(100, Math.round((project.waste / PROJECT_LIMITS.waste) * 100)),
      details: [
        { label: 'Project', value: project.project },
        { label: 'Location', value: `${project.title}, ${project.state}` },
        { label: 'Impact', value: leadMetric },
      ],
    },
    {
      key: 'land',
      label: 'Land Reclaimed',
      railValue: project.land > 0 ? `${formatIndian(project.land)} Acres` : 'No data',
      eyebrow: 'Restoration',
      title: 'Land Reclaimed',
      displayValue: project.land > 0 ? formatIndian(project.land) : '-',
      unit: 'ACRES RESTORED',
      status,
      progress: Math.min(100, Math.round((project.land / PROJECT_LIMITS.land) * 100)),
      details: [
        { label: 'Outcome', value: project.outcome },
        { label: 'Focus', value: project.focus },
        { label: 'Project Type', value: project.subtitle },
      ],
    },
    {
      key: 'co2',
      label: 'CO2 Mitigated',
      railValue: project.co2 > 0 ? `${formatIndian(project.co2)} MT` : 'No data',
      eyebrow: 'Climate',
      title: 'CO2 Mitigated',
      displayValue: project.co2 > 0 ? formatIndian(project.co2) : '-',
      unit: 'METRIC TONS',
      status,
      progress: Math.min(100, Math.round((project.co2 / PROJECT_LIMITS.co2) * 100)),
      details: [
        { label: 'Outcome', value: project.outcome },
        { label: 'Description', value: project.desc },
        { label: 'Benchmark', value: leadMetric },
      ],
    },
    {
      key: 'timeline',
      label: 'Project Timeline',
      railValue: project.focus.split('.').slice(0, 1).join('.').trim() || 'Schedule available',
      eyebrow: 'Timeline',
      title: 'Project Timeline',
      displayValue: project.subtitle.includes('Completed') ? '100' : '72',
      unit: 'SCHEDULE PROGRESS (%)',
      status,
      progress: project.subtitle.includes('Completed') ? 100 : 72,
      details: [
        { label: 'Focus', value: project.focus },
        { label: 'Project', value: project.project },
        { label: 'Status', value: project.subtitle },
      ],
    },
    {
      key: 'recovery',
      label: 'Recovery Rate',
      railValue: project.metrics[1] ?? leadMetric,
      eyebrow: 'Efficiency',
      title: 'Material Recovery Rate',
      displayValue: project.metrics.length > 0 ? '78.4' : '-',
      unit: 'PERCENT OF TOTAL WASTE',
      status: project.metrics.length > 0 ? 'Above Benchmark' : status,
      progress: project.metrics.length > 0 ? 78 : 0,
      details: [
        { label: 'Key Metric', value: project.metrics[0] ?? project.outcome },
        { label: 'Reference', value: project.metrics[1] ?? project.project },
        { label: 'Project', value: project.title },
      ],
    },
  ];
};

const ComparisonSlider: React.FC<{ beforeSrc: string; afterSrc: string; revealed: boolean; onToggle: () => void }> = ({
  beforeSrc, afterSrc, revealed, onToggle,
}) => {
  const sliderPos = revealed ? '100%' : '15%';

  return (
    <div
      className="relative flex-1 min-h-[500px] h-full w-full cursor-pointer overflow-hidden select-none bg-slate-950"
      onClick={onToggle}
    >
      {/* After panel (base) */}
      <div className="absolute inset-0 z-[5]">
        <img
          src={afterSrc}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms]"
          style={{ transform: revealed ? 'scale(1)' : 'scale(1.08)' }}
          draggable={false}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(310deg,rgba(0,40,10,.2) 0%,transparent 55%)' }} />
      </div>

      {/* Before panel (clipped overlay) */}
      <div
        className="absolute inset-0 z-[10] transition-all duration-[800ms]"
        style={{
          clipPath: `inset(0 calc(100% - ${sliderPos}) 0 0 round 0 ${revealed ? '0px' : '20px'} ${revealed ? '0px' : '20px'} 0)`,
          transition: 'clip-path 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <img
          src={beforeSrc}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms]"
          style={{ transform: revealed ? 'scale(1.04)' : 'scale(1)' }}
          draggable={false}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(130deg,rgba(0,0,0,.25) 0%,transparent 55%)' }} />
      </div>

      {/* Shadow on before-panel edge */}
      <div
        className="absolute top-0 bottom-0 z-[11] pointer-events-none transition-all duration-[800ms]"
        style={{
          left: 0,
          width: sliderPos,
          boxShadow: revealed ? '-5px 0 22px rgba(0,0,0,.5)' : '10px 0 30px rgba(0,0,0,.4)',
          borderRadius: revealed ? '0' : '0 20px 20px 0',
          transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1), border-radius 0.8s, box-shadow 0.8s',
        }}
      />

      {/* Labels */}
      <span className="absolute left-3 top-3 z-[15] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-bold  tracking-widest bg-black/50 border border-white/20 text-white backdrop-blur-sm">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
        Before
      </span>
      <span className="absolute right-3 top-3 z-[15] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-bold  tracking-widest bg-primary/90 border border-white/20 text-white backdrop-blur-sm">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
        After
      </span>

      {/* Click hint */}
      <span
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[12] pointer-events-none rounded-full  p-1 text-[0.50rem] font-bold tracking-wide bg-black/60 text-white"
        style={{ opacity: revealed ? 0.5 : 0.85, transition: 'opacity 0.3s', whiteSpace: 'nowrap' }}
      >
        {revealed ? 'Click to Hide' : 'Click to Reveal Before Image'}
      </span>
    </div>
  );
};

// -- ProjectCard ------------------------------------------------
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  total: number;
  onViewDetails: (id: number) => void;
}> = ({ project, index, total, onViewDetails }) => {
  const [revealed, setRevealed] = useState(false);
  const [metaVisible, setMetaVisible] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const metricItems = useMemo(() => buildInteractiveMetrics(project), [project]);
  const [activeMetric, setActiveMetric] = useState<MetricKey | null>(null);

  const currentMetric = metricItems.find((item) => item.key === activeMetric);

  const metaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveMetric(null);
    setDetailsOpen(false);
  }, [project.id, metricItems]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (metaRef.current) {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMetaVisible(true); }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
      o.observe(metaRef.current);
      observers.push(o);
    }

    if (cardRef.current) {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCardRevealed(true); o.disconnect(); } }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });
      o.observe(cardRef.current);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <article id={`proj-${project.id}`} className="flex flex-col gap-4">
      <div
        ref={metaRef}
        className="flex text-left gap-2 flex-col md:flex-row md:items-center"
      >
        <div
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms',
          }}
        >
          <h2 className="text-3xl leading-tight text-slate-900 font-bold">{project.title}</h2>
        </div>
        <div
          style={{
            opacity: metaVisible ? 1 : 0,
            transform: metaVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 150ms',
          }}
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            {project.state}
          </span>
        </div>
      </div>

      <div
        ref={cardRef}
        className="flex flex-col lg:flex-row bg-card rounded-2xl overflow-hidden relative border border-border"
        style={{
          boxShadow: '0 16px 44px rgba(0,0,0,0.18)',
          opacity: cardRevealed ? 1 : 0,
          transform: cardRevealed ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms',
        }}
      >
        <div className="relative min-h-[500px] lg:flex-1">
          <ComparisonSlider
            beforeSrc={project.beforeImage}
            afterSrc={project.afterImage}
            revealed={revealed}
            onToggle={() => setRevealed((r) => !r)}
          />

          <div
            className={`overflow-hidden border-t border-border transition-[max-height,opacity,transform] duration-500 lg:absolute lg:inset-y-0 lg:right-0 lg:z-20 lg:w-[30%] lg:border-l ${detailsOpen
              ? 'max-h-[650px] opacity-100 translate-y-0 lg:max-h-none lg:translate-x-0'
              : 'max-h-0 opacity-0 -translate-y-2 lg:max-h-none lg:translate-x-5 lg:translate-y-0 lg:pointer-events-none'
              }`}
            aria-hidden={!detailsOpen}
          >
            {currentMetric && (
              <div className="h-full p-6 text-foreground bg-background/95 backdrop-blur-sm relative">
                <button
                  type="button"
                  onClick={() => {
                    setDetailsOpen(false);
                    setActiveMetric(null);
                  }}
                  aria-label="Collapse metric details"
                  className="absolute right-4 top-4 h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mx-auto"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* <p className="text-[0.68rem] tracking-[0.2em] uppercase font-semibold text-primary mb-2">{currentMetric.eyebrow}</p> */}
                <h3 className="text-2xl font-semibold text-foreground leading-tight mb-4">{currentMetric.title}</h3>
                <p className="text-6xl font-semibold leading-none text-primary mb-1">{currentMetric.displayValue}</p>            
                <p className="text-sm tracking-[0.18em] text-muted-foreground">{currentMetric.unit}</p>

                <div className="mt-6 pt-5 border-t border-border space-y-3">
                  {currentMetric.details.map((item) => (
                    <div key={item.label} >
                      {/* <span className="text-muted-foreground">{item.label}</span> */}
                      <span className="text-foreground text-right">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* <div className="mt-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-2">Metric Progress</p>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${currentMetric.progress}%` }}
                    />
                  </div>
                </div>

                <span className="mt-6 inline-flex rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-sm">
                  {currentMetric.status}
                </span> */}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col border-t lg:border-t-0 border-border bg-card lg:w-[15=8%] lg:border-l">
          <div className="p-5 border-b border-border">
            <p className="text-lg font-semibold text-muted-foreground">Project Metrics</p>
            {/* <h4 className="text-2xl text-foreground font-medium mt-1">Impact Summary</h4> */}
          </div>

          <div className="flex flex-col">
            {metricItems.map((item) => {
              const isActive = item.key === activeMetric;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveMetric(item.key);
                    setDetailsOpen(true);
                  }}
                  className={`group border-b h-20 border-border text-left px-5 py-4 transition-colors ${isActive ? 'bg-primary/10' : 'hover:bg-muted/40'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-primary' : 'bg-muted-foreground/50'}`} /> */}
                      <span className={`text-base ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{item.label}</span>
                    </div>
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
                  {/* <p className={`mt-2 text-xs line-clamp-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{item.railValue}</p> */}
                </button>
              );
            })}
          </div>

          <div className="mt-auto p-5">
            <button
              type="button"
              onClick={() => onViewDetails(project.id)}
              className="w-full rounded-xl border border-primary text-primary font-semibold py-3 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

// Modal 
const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
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
            <p className="text-[0.7rem] font-bold  text-slate-400 mb-1">{project.subtitle}</p>
            <h3 className="text-xl font-bold text-slate-900">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 transition-all duration-200 hover:bg-green-700 hover:text-white hover:border-green-700 hover:rotate-90 flex-shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-6 py-5 lg:px-8">
          <p className="text-slate-600 leading-relaxed mb-6 text-[0.95rem]">{project.desc}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Project', value: project.project },
              { label: 'Focus', value: project.focus },
              { label: 'Outcome', value: project.outcome },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-4 transition-all duration-200 hover:border-green-400 hover:-translate-y-1">
                <p className="text-sm  tracking-widest font-bold text-slate-400 mb-2">{label}</p>
                <p className="text-lg font-medium text-slate-800 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>

          {project.metrics.length > 0 && (
            <div className="border-t border-slate-100 pt-5">
              <p className="text-[0.75rem]  tracking-widest font-bold text-slate-400 mb-3">Key Metrics</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.metrics.map((m, i) => (
                  <li key={i} className="bg-green-50 border-l-4 border-green-600 rounded-lg px-4 py-3 text-[0.85rem] font-medium text-slate-700 leading-snug">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -- Main Page --------------------------------------------------
const CompletedProjects: React.FC = () => {
  const STATES = Array.from(new Set(PROJECTS.map(p => p.state)));
  const [selectedState, setSelectedState] = useState(STATES[0] || '');
  const filteredProjects = PROJECTS.filter(p => p.state === selectedState);
  const [modalId, setModalId] = useState<number | null>(null);

  const activeProject = modalId !== null ? PROJECTS.find(p => p.id === modalId) ?? null : null;

  const handleStateSelect = useCallback((state: string) => {
    setSelectedState(state);
  }, []);

  useEffect(() => {
    const firstProject = filteredProjects[0];
    if (!firstProject) return;
    const el = document.getElementById(`proj-${firstProject.id}`);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + pageYOffset - 130, behavior: 'smooth' });
  }, [selectedState, filteredProjects]);

  return (
    <div className="min-h-screen bg-background">
      {/* shimmer keyframes */}
      <style>{`
        @keyframes barShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      <Header />
      {/* State Filter */}
      <nav className="sticky top-[64px]  p-2 pt-4 overflow-hidden border-y border-border bg-background/95 backdrop-blur z-40">
        <div className="max-w-[1400px] mx-auto px-[5%] py-2 flex justify-center">

          <div className="flex flex-wrap justify-center gap-2">
            {STATES.map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${selectedState === state
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
              >
                {state}
              </button>
            ))}
          </div>

        </div>
      </nav>

      {/* Projects list */}
      <main className="max-w-[1400px] mx-auto px-[5%] pb-24 flex flex-col gap-20">
        {filteredProjects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={filteredProjects.length}
            onViewDetails={id => setModalId(id)}
          />
        ))}
      </main>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setModalId(null)} />
      )}

      <Footer />
    </div>
  );
};

export default CompletedProjects;







