import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ── Image imports ──────────────────────────────────────────────
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
import P8b from "@/assets/Before - After/8 pammal_B.jpg";
import P8a from "@/assets/Before - After/8 pammal_A.jpg";
import P9b from "@/assets/Before - After/9 noida_B.jpg";
import P9a from "@/assets/Before - After/9 noida_A.jpg";
import P10b from "@/assets/Before - After/10 tirupathi_B.jpg";
import P10a from "@/assets/Before - After/10 tirupathi_A.jpg";
import P11b from "@/assets/Before - After/11 chidambaram_B.jpg";
import P11a from "@/assets/Before - After/11 chidambaram_a.jpg";
import P12b from "@/assets/Before - After/12 pallavaram_B.jpg";
import P12a from "@/assets/Before - After/12 pallavaram_A.jpg";
import P13b from "@/assets/Before - After/13 karaikudi_B.jpg";
import P13a from "@/assets/Before - After/13 karaikudi_A.jpg";
import P14b from "@/assets/Before - After/14 karur_B.jpg";
import P14a from "@/assets/Before - After/14 karur_A.jpg";
import P15b from "@/assets/Before - After/Tambaram_B.jpg";
import P15a from "@/assets/Before - After/Tambaram_A.jpg";

// ── Types ──────────────────────────────────────────────────────
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

// ── Data ───────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  { id: 1, title: "Kumbakonam", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Kumbakonam dumpsite reclamation project.", project: "Quantity: 2,31,782 cubic meter. Area reclaimed: 12 acres.", focus: "Project period: December 2015 - March 2018. Quantity of RDF disposed (MT): 22,586.", outcome: "CO2 mitigated by processing the legacy waste (MT): 1,16,280.", metrics: ["CO2 mitigated per square meter (MT): 2.39", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 3,794", "Carbon sequestered by 1.43 lakh acres of US forests in one year", "GHG emissions avoided by 33 wind turbines running for a year", "Carbon emissions from 26,720 gasoline powered-passenger vehicles driven for one year"], waste: 231782, land: 12, co2: 116280, beforeImage: P1b, afterImage: P1a },
  { id: 2, title: "Sembakkam Lake", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Sembakkam Lake dumpsite reclamation project.", project: "Quantity: 38,026 cubic meter. Area reclaimed: 4 acres.", focus: "Project period: August 2017 - August 2018. Quantity of RDF disposed (MT): 7,316.", outcome: "CO2 mitigated by processing the legacy waste (MT): 15,823.", metrics: ["CO2 mitigated per square meter (MT): 0.98", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,229", "Carbon sequestered by 20,335 acres of US forests in one year", "GHG emissions avoided by 5 wind turbines running for a year", "Carbon emissions from 3,795 gasoline powered-passenger vehicles driven for one year"], waste: 38026, land: 4, co2: 15823, beforeImage: P2b, afterImage: P2a },
  { id: 3, title: "Noida Sector 54", subtitle: "Community Development Projects", state: "Uttar Pradesh", desc: "Award-winning project under the National Green Tribunal. Converted a neglected dumping ground into a state-of-the-art wetland area now frequented by thousands of visitors.", project: "Quantity: 99,665 metric tonnes. Area reclaimed: 4 acres.", focus: "Project period: December 2018 – July 2019. Quantity of RDF disposed: 15,498 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 68,698 metric tonnes.", metrics: ["CO2 mitigated per square metre: 4.26 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 2,604 metric tonnes", "Area of US forests carbon sequestered: 85,351 acres", "GHG emissions avoided: Running 20 wind turbines for a year", "Carbon emissions from 15,927 gasoline-powered passenger vehicles driven for one year"], waste: 99665, land: 4, co2: 68698, beforeImage: P3b, afterImage: P3a },
  { id: 4, title: "Vadodara-Atladara", subtitle: "Dumpsite Reclamation Project", state: "Gujarat", desc: "Removed the pollution source from the landfill on the banks of the Vishwamitri River, preserving the habitat of critically endangered gharials – an IUCN-protected species.", project: "Quantity: 4,21,187 cubic metres. Area reclaimed: 10.5 acres.", focus: "Project period: July 2018 – February 2021. Quantity of RDF disposed: 58,897 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 2,91,462 metric tonnes.", metrics: ["CO2 mitigated per square metre: 6.86 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 9,895 metric tonnes", "Area of US forests carbon sequestered in one year: 3.59 lakh acres", "GHG emissions avoided: Running 84 wind turbines for a year", "Carbon emissions from 67,061 gasoline-powered passenger vehicles driven for one year"], waste: 421187, land: 10.5, co2: 291462, beforeImage: P4b, afterImage: P4a },
  { id: 5, title: "Poonamallee", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Poonamallee dumpsite reclamation project.", project: "Quantity: 30,930 cubic meter. Area reclaimed: 3 acres.", focus: "Project period: July 2018 - September 2019. Quantity of RDF disposed (MT): 6,034.", outcome: "CO2 mitigated by processing the legacy waste (MT): 14,823.", metrics: ["CO2 mitigated per square meter (MT): 1.22", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,014", "Carbon sequestered by 18,886 acres of US forests in one year", "GHG emissions avoided by 4 wind turbines running for a year", "Carbon emissions from 3,524 gasoline powered-passenger vehicles"], waste: 30930, land: 3, co2: 14823, beforeImage: P5b, afterImage: P5a },
  { id: 6, title: "Vijayawada-Ajitsingh Nagar", subtitle: "Community Development Projects", state: "Andhra Pradesh", desc: "Reclaimed India's largest dump site spanning 45 acres. Over 2,500 apartments previously unoccupied were allocated to low-income groups through a slum rehabilitation programme.", project: "Quantity: 3,05,897 cubic metres. Area reclaimed: 45 acres.", focus: "Project period: July 2018 – July 2020. Quantity of RDF disposed: 47,178 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 2,11,681 metric tonnes.", metrics: ["CO2 mitigated by using RDF as alternate fuel resource: 7,926 tonnes", "Area of US forests carbon sequestered in one year: 2.61 lakh acres", "GHG emissions avoided: Running 61 wind turbines for a year", "Carbon emissions from 48,869 gasoline-powered passenger vehicles driven for one year"], waste: 305897, land: 45, co2: 211681, beforeImage: P6b, afterImage: P6a },
  { id: 7, title: "Erode-Vairapalayam", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Reclaimed a 7-acre dumpsite on the banks of the Cauvery river. Now transformed into a Miyawaki forest. Winner of the prestigious Smart City award.", project: "Quantity: 1,25,092 cubic metres. Area reclaimed: 7 acres.", focus: "Project period: September 2019 – August 2021. Quantity of RDF disposed: 8,719 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 91,009 metric tonnes.", metrics: ["CO2 mitigated per square metre: 3.21 metric tonnes", "CO2 mitigated by using RDF as alternate fuel resource: 1,465 metric tonnes", "Area of US forests carbon sequestered in one year: 1.1 lakh acres", "GHG emissions avoided: Running 26 wind turbines for a year", "Carbon emissions from 20,578 gasoline-powered passenger vehicles driven for one year"], waste: 125092, land: 7, co2: 91009, beforeImage: P7b, afterImage: P7a },
  { id: 8, title: "Pammal", subtitle: "Dumpsite Reclamation Project", state: "Tamil Nadu", desc: "Pammal dumpsite reclamation project.", project: "Quantity: 59,175 cubic meter. Area reclaimed: 2.4 acres.", focus: "Project period: August 2018 - August 2020. Quantity of RDF disposed (MT): 6,682.", outcome: "CO2 mitigated by processing the legacy waste (MT): 34,801.", metrics: ["CO2 mitigated per square meter (MT): 3.58", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,123", "Carbon sequestered by 42,840 acres of US forests in one year", "GHG emissions avoided by 10 wind turbines running for a year", "Carbon emissions from 7,994 gasoline powered-passenger vehicles"], waste: 59175, land: 2.4, co2: 34801, beforeImage: P8b, afterImage: P8a },
  { id: 9, title: "Noida Sector 145A", subtitle: "Dumpsite Reclamation Project", state: "Uttar Pradesh", desc: "Noida Sector 145 A dumpsite reclamation project.", project: "Quantity: 1,02,837 cubic meter. Area reclaimed: 6.2 acres.", focus: "Project period: July 2019 - August 2020. Quantity of RDF disposed (MT): 10,259.", outcome: "CO2 mitigated by processing the legacy waste (MT): 71,163.", metrics: ["CO2 mitigated per square meter (MT): 2.8", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,724", "Carbon sequestered by 86,919 acres of US forests in one year", "GHG emissions avoided by 20 wind turbines running for a year", "Carbon emissions from 16,220 gasoline powered-passenger vehicles driven for one year"], waste: 102837, land: 6.2, co2: 71163, beforeImage: P9b, afterImage: P9a },
  // ... Add remaining projects (10-15)
];

// ── Counter hook ───────────────────────────────────────────────
function useCounter(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current || target === 0) return;
    started.current = true;
    const isDecimal = target % 1 !== 0;
    let startTs: number | null = null;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(isDecimal ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return target % 1 !== 0 ? value.toFixed(1) : value.toLocaleString('en-IN');
}

// ── StatPill ───────────────────────────────────────────────────
const StatPill: React.FC<{ label: string; target: number; unit: string; active: boolean; delay?: number }> = ({ label, target, unit, active, delay = 0 }) => {
  const display = useCounter(target, active);
  return (
    <div
      className="stat-pill flex flex-col items-center justify-center px-3 py-4 text-center flex-1 transition-all duration-500 hover:bg-muted/20"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.88)',
        transitionDelay: `${delay}ms`,
        transition: `opacity 0.55s cubic-bezier(0.175,0.885,0.32,1.275) ${delay}ms, transform 0.55s cubic-bezier(0.175,0.885,0.32,1.275) ${delay}ms`,
      }}
    >
      <span className="block text-[0.65rem] tracking-widest font-bold text-muted-foreground mb-1">{label}</span>
      <strong className="block font-black leading-none text-primary" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)' }}>
        {target === 0 ? '—' : display}
      </strong>
      <span className="text-[0.65rem] font-semibold tracking-wide text-muted-foreground mt-0.5">{unit}</span>
    </div>
  );
};

// ── ComparisonSlider ───────────────────────────────────────────
const ComparisonSlider: React.FC<{ beforeSrc: string; afterSrc: string; revealed: boolean; onToggle: () => void }> = ({ beforeSrc, afterSrc, revealed, onToggle }) => {
  const sliderPos = revealed ? '100%' : '15%';
  return (
    <div
      className="relative flex-1 min-h-[440px] cursor-pointer overflow-hidden select-none bg-slate-950"
      onClick={onToggle}
    >
      {/* After panel */}
      <div className="absolute inset-0 z-[5]">
        <img src={afterSrc} alt="After" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms]" style={{ transform: revealed ? 'scale(1)' : 'scale(1.08)' }} draggable={false} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(310deg,rgba(0,40,10,.2) 0%,transparent 55%)' }} />
      </div>
      {/* Before panel */}
      <div
        className="absolute inset-0 z-[10] transition-all duration-[800ms]"
        style={{
          clipPath: `inset(0 calc(100% - ${sliderPos}) 0 0 round 0 ${revealed ? '0px' : '20px'} ${revealed ? '0px' : '20px'} 0)`,
          transition: 'clip-path 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <img src={beforeSrc} alt="Before" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms]" style={{ transform: revealed ? 'scale(1.04)' : 'scale(1)' }} draggable={false} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(130deg,rgba(0,0,0,.25) 0%,transparent 55%)' }} />
      </div>
      {/* Shadow */}
      <div
        className="absolute top-0 bottom-0 z-[11] pointer-events-none"
        style={{
          left: sliderPos,
          width: '1px',
          boxShadow: '0 0 8px 1px rgba(0,0,0,0.5)',
          transition: 'left 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
const ProjectShowcase: React.FC = () => {
  const [modalId, setModalId] = useState<number | null>(null);
  const [activeState, setActiveState] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(true); // Scroll hide/show
  const [revealedMap, setRevealedMap] = useState<{ [id: number]: boolean }>({});

  // ── Scroll detection ──────────────────────────────
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowFilter(false); // scroll down
      else setShowFilter(true); // scroll up
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleReveal = useCallback((id: number) => {
    setRevealedMap(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const states = Array.from(new Set(PROJECTS.map(p => p.state)));

  const filteredProjects = activeState ? PROJECTS.filter(p => p.state === activeState) : PROJECTS;

  return (
    <div className="relative">
      <Header />

      {/* ── State Filter Nav ────────────────────────────── */}
    <nav
  className={`fixed pt-8 left-0 right-0 top-[64px] p-3 overflow-hidden border-y border-slate-200 bg-white/95 backdrop-blur z-40 transition-transform duration-300 ${
    showFilter ? 'translate-y-0' : '-translate-y-full'
  }`}
>
  <div className="flex justify-center overflow-x-auto no-scrollbar gap-2.5">
    <button
      className={`px-3 py-1 rounded-full ${!activeState ? 'bg-primary text-white' : 'bg-muted'}`}
      onClick={() => setActiveState(null)}
    >
      All States
    </button>

    {states.map((state) => (
      <button
        key={state}
        className={`px-3 py-1 rounded-full ${
          activeState === state ? 'bg-primary text-white' : 'bg-muted'
        }`}
        onClick={() => setActiveState(state)}
      >
        {state}
      </button>
    ))}
  </div>
</nav>

      <main className="max-w-[1400px] mx-auto px-[5%]  flex flex-col gap-20 section-padding">
        {filteredProjects.map((p) => (
          <div key={p.id} className="flex flex-col md:flex-row gap-8 md:gap-12">
            <ComparisonSlider
              beforeSrc={p.beforeImage}
              afterSrc={p.afterImage}
              revealed={!!revealedMap[p.id]}
              onToggle={() => toggleReveal(p.id)}
            />
            <div className="flex-1 flex flex-col justify-between gap-4">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="text-muted-foreground">{p.subtitle}</p>
              <p>{p.desc}</p>
              <p>{p.project}</p>
              <p>{p.focus}</p>
              <p>{p.outcome}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <StatPill label="Waste Processed" target={p.waste} unit="m³" active={true} />
                <StatPill label="Land Reclaimed" target={p.land} unit="acres" active={true} delay={100} />
                <StatPill label="CO2 Mitigated" target={p.co2} unit="MT" active={true} delay={200} />
              </div>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectShowcase;