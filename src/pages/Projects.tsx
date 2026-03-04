import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FC,
  type ReactNode,
} from "react";

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
interface Stat {
  label: string;
  value: number;
  unit: string;
  icon: "waste" | "land" | "co2";
  description?: string;
}

interface Project {
  id: string;
  index: string;
  name: string;
  state: string;
  type: string;
  beforeImage?: string;
  afterImage?: string;
  stats: Stat[];
}

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const PROJECTS: Project[] = [
  {
    id: "kumbakonam",
    index: "01",
    name: "Kumbakonam",
    state: "Tamil Nadu",
    type: "Dump Yard Reclamation",
    beforeImage: "kuma-before.jpg",
    afterImage: "kuma-after (2).jpg",
    stats: [
      { label: "Waste Processed", value: 100000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 6.5, unit: "Acres", icon: "land" },
      { label: "CO₂ Mitigated", value: 34801, unit: "MT", icon: "co2", description: "CO₂ mitigated by processing the legacy waste" },
    ],
  },
  {
    id: "sembakkam",
    index: "02",
    name: "Sembakkam",
    state: "Tamil Nadu",
    type: "Legacy Waste Processing",
    beforeImage: "6 vijawada_B-CVJT-fa4 (1).jpg",
    afterImage: "6 vijawada_A-CrjMjYq8.jpg",
    stats: [
      { label: "Waste Processed", value: 45000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 3.2, unit: "Acres", icon: "land" },
      { label: "CO₂ Mitigated", value: 15200, unit: "MT", icon: "co2", description: "CO₂ mitigated by processing the legacy waste" },
    ],
  },
  {
    id: "pammal",
    index: "03",
    name: "Pammal",
    state: "Tamil Nadu",
    type: "Legacy Waste Processing",
    beforeImage: "8 pammal_B-IoW823nS.jpg",
    afterImage: "8 pammal_A-BihJHQIQ.jpg",
    stats: [
      { label: "Waste Processed", value: 55000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 4.1, unit: "Acres", icon: "land" },
      { label: "CO₂ Mitigated", value: 18500, unit: "MT", icon: "co2", description: "CO₂ mitigated by processing the legacy waste" },
    ],
  },
  {
    id: "poonamallee",
    index: "04",
    name: "Poonamallee",
    state: "Tamil Nadu",
    type: "Legacy Waste Remediation",
    beforeImage: "kuma-before.jpg",
    afterImage: "kuma-after (2).jpg",
    stats: [
      { label: "Waste Processed", value: 320000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 22.5, unit: "Acres", icon: "land" },
      { label: "CO₂ Mitigated", value: 107000, unit: "MT", icon: "co2", description: "CO₂ mitigated by processing the legacy waste" },
    ],
  },
  {
    id: "atladara",
    index: "05",
    name: "Atladara",
    state: "Gujarat",
    type: "Dump Yard Reclamation",
    beforeImage: "4 atladara_B-CsgR5s9v.jpg",
    afterImage: "4 atladara_A-CS_bWnUv.jpg",
    stats: [
      { label: "Waste Processed", value: 110000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 7.5, unit: "Acres", icon: "land" },
      { label: "CO₂ Mitigated", value: 36900, unit: "MT", icon: "co2", description: "CO₂ mitigated by processing the legacy waste" },
    ],
  },
  {
    id: "ajithsingh",
    index: "06",
    name: "Ajithsingh Nagar",
    state: "Andhra Pradesh",
    type: "Legacy Waste Processing",
    beforeImage: "4 atladara_B-CsgR5s9v.jpg",
    afterImage: "4 atladara_A-CS_bWnUv.jpg",
    stats: [
      { label: "Waste Processed", value: 180000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 12.0, unit: "Acres", icon: "land" },
      { label: "CO₂ Mitigated", value: 60300, unit: "MT", icon: "co2", description: "CO₂ mitigated by processing the legacy waste" },
    ],
  },
  {
    id: "vairapalayam",
    index: "07",
    name: "Vairapalayam",
    state: "Tamil Nadu",
    type: "Legacy Waste Processing",
    beforeImage: "kuma-before.jpg",
    afterImage: "kuma-after (2).jpg",
    stats: [
      { label: "Waste Processed", value: 75000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 5.8, unit: "Acres", icon: "land" },
      { label: "CO₂ Mitigated", value: 25100, unit: "MT", icon: "co2", description: "CO₂ mitigated by processing the legacy waste" },
    ],
  },
  {
    id: "tirupati",
    index: "08",
    name: "Tirupati",
    state: "Andhra Pradesh",
    type: "Legacy Waste Remediation",
    stats: [
      { label: "Waste Processed", value: 150000, unit: "Cubic Meters", icon: "waste" },
      { label: "Land Reclaimed", value: 10.5, unit: "Acres", icon: "land" },
      { label: "CO₂ Mitigated", value: 50200, unit: "MT", icon: "co2", description: "CO₂ mitigated by processing the legacy waste" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   SVG ICONS
═══════════════════════════════════════════════════════ */
const IconWaste: FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconLand: FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h4l3-9 5 18 3-9h5" />
  </svg>
);

const IconCO2: FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22s5.5-2 9-5c0 0 4-4 11-15-11 7-15 11-15 11-3 3.5-5 9-5 9z" />
    <path d="M11.39 11.9a7.5 7.5 0 0 0-3.48 4.51" />
  </svg>
);

const IconPin: FC<{ size?: number }> = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconArrows: FC = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3L4 7l4 4" /><path d="M16 3l4 4-4 4" /><line x1="4" y1="7" x2="20" y2="7" />
  </svg>
);

const STAT_ICONS = { waste: IconWaste, land: IconLand, co2: IconCO2 };

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */

/** Fires once when element enters viewport */
function useInView(threshold = 0.08): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/** Animated counter — fires when inView becomes true */
function useCounter(target: number, inView: boolean, duration = 1800): string {
  const [display, setDisplay] = useState("0");
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const curr = eased * target;
      setDisplay(isDecimal ? curr.toFixed(1) : Math.floor(curr).toLocaleString());
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(isDecimal ? target.toFixed(1) : target.toLocaleString());
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, isDecimal]);

  return display;
}

/* ═══════════════════════════════════════════════════════
   BEFORE / AFTER SLIDER
═══════════════════════════════════════════════════════ */
interface BASliderProps {
  beforeImage?: string;
  afterImage?: string;
}

const BASlider: FC<BASliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderVal, setSliderVal] = useState(50);
  const [hintVisible, setHintVisible] = useState(false);
  const [hintFaded, setHintFaded] = useState(false);
  const [containerRef, inView] = useInView(0.15);
  const animating = useRef(false);
  const current = useRef(50);
  const target = useRef(50);
  const rafId = useRef<number>(0);

  // Smooth lerp loop
  const loop = useCallback(() => {
    const diff = target.current - current.current;
    if (Math.abs(diff) > 0.05) {
      current.current += diff * 0.12;
      setSliderVal(current.current);
      rafId.current = requestAnimationFrame(loop);
    } else {
      current.current = target.current;
      setSliderVal(target.current);
      animating.current = false;
    }
  }, []);

  // Intro sweep: 100 → 50
  useEffect(() => {
    if (!inView) return;
    current.current = 100;
    target.current = 100;
    setSliderVal(100);
    const t = setTimeout(() => {
      target.current = 50;
      animating.current = true;
      rafId.current = requestAnimationFrame(loop);
    }, 600);

    // Show hint
    setTimeout(() => setHintVisible(true), 1200);
    setTimeout(() => setHintFaded(true), 3800);

    return () => { clearTimeout(t); cancelAnimationFrame(rafId.current); };
  }, [inView, loop]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    target.current = parseFloat(e.target.value);
    if (!animating.current) {
      animating.current = true;
      rafId.current = requestAnimationFrame(loop);
    }
  };

  const hasImages = beforeImage || afterImage;

  return (
    <div ref={containerRef} style={styles.sliderContainer(inView)}>
      {/* After layer */}
      <div style={styles.sliderImageLayer(hasImages ? `url('${afterImage}')` : undefined, 1, "after")} />

      {/* Before layer (clipped) */}
      <div style={styles.sliderImageLayer(hasImages ? `url('${beforeImage}')` : undefined, 2, "before", sliderVal)} />

      {/* Divider line */}
      <div style={styles.sliderDivider(sliderVal)} />

      {/* Handle */}
      <div style={styles.sliderHandle(sliderVal)}>
        <div style={styles.sliderHandleKnob}>
          <span style={styles.sliderArrow("left")}>‹</span>
          <span style={styles.sliderArrow("right")}>›</span>
        </div>
      </div>

      {/* Labels */}
      <span style={{ ...styles.baLabel, right: "1rem", background: "rgba(26,107,58,0.88)" }}>After</span>
      <span style={{ ...styles.baLabel, left: "1rem", background: "rgba(0,0,0,0.55)" }}>Before</span>

      {/* Range input */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderVal}
        onChange={handleInput}
        aria-label="Compare before and after"
        style={styles.rangeInput}
      />

      {/* Drag hint */}
      {hintVisible && (
        <div style={styles.dragHint(hintFaded)}>
          <IconArrows /> Drag to compare
        </div>
      )}

      {/* Placeholder when no images */}
      {!hasImages && (
        <div style={styles.placeholderOverlay}>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Image Coming Soon
          </span>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════ */
interface StatCardProps {
  stat: Stat;
  delay?: number;
  isFull?: boolean;
}

const StatCard: FC<StatCardProps> = ({ stat, delay = 0, isFull = false }) => {
  const [cardRef, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const count = useCounter(stat.value, inView);
  const IconComp = STAT_ICONS[stat.icon];
  const isCO2 = stat.icon === "co2";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={styles.statCard(inView, delay, hovered, isFull, isCO2)}
    >
      <div style={styles.statIconWrap(hovered, isCO2)}>
        <IconComp size={17} />
      </div>
      <div style={isFull ? styles.statContentFull : styles.statContent}>
        <span style={styles.statLabel}>{stat.label}</span>
        <div style={styles.statValueRow}>
          <span style={styles.statValue}>{count}</span>
          <span style={styles.statUnit}>{stat.unit}</span>
        </div>
        {stat.description && (
          <p style={styles.statDesc}>{stat.description}</p>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   PROJECT ITEM
═══════════════════════════════════════════════════════ */
const ProjectItem: FC<{ project: Project; isEven: boolean }> = ({ project, isEven }) => {
  const [headerRef, headerInView] = useInView(0.1);
  const [gridRef, gridInView] = useInView(0.05);

  return (
    <article id={project.id} style={styles.projectItem}>
      {/* Header */}
      <div
        ref={headerRef}
        style={styles.projectHeader(headerInView, isEven)}
      >
        <span style={styles.projectIndex}>{project.index}</span>
        <div style={styles.projectTitleGroup}>
          <h2 style={styles.projectName}>{project.name}</h2>
          <div style={styles.projectMeta}>
            <span style={styles.locationTag}>
              <IconPin /> {project.state}
            </span>
            <span style={styles.typeBadge}>{project.type}</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div ref={gridRef} style={styles.showcaseGrid(isEven)}>
        {/* BA Slider */}
        <div style={{ borderRadius: 20, overflow: "hidden" }}>
          <BASlider beforeImage={project.beforeImage} afterImage={project.afterImage} />
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {project.stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              delay={i * 0.1}
              isFull={stat.icon === "co2"}
            />
          ))}
        </div>
      </div>

      {/* Separator */}
      <div style={styles.separator} aria-hidden />
    </article>
  );
};

/* ═══════════════════════════════════════════════════════
   TABS NAV
═══════════════════════════════════════════════════════ */
const TabsNav: FC<{ activeId: string; onSelect: (id: string) => void }> = ({ activeId, onSelect }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToProject = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 138;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    onSelect(id);

    // Center tab
    const btn = listRef.current?.querySelector<HTMLButtonElement>(`[data-id="${id}"]`);
    if (btn && listRef.current) {
      const pos = btn.offsetLeft - listRef.current.offsetWidth / 2 + btn.offsetWidth / 2;
      listRef.current.scrollTo({ left: pos, behavior: "smooth" });
    }
  };

  return (
    <nav style={styles.tabsNav(scrolled)}>
      <div style={styles.tabsEdgeFadeLeft} aria-hidden />
      <div ref={listRef} style={styles.tabList} role="tablist">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            data-id={p.id}
            role="tab"
            aria-selected={activeId === p.id}
            onClick={() => scrollToProject(p.id)}
            style={styles.tabBtn(activeId === p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div style={styles.tabsEdgeFadeRight} aria-hidden />
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
const Hero: FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t); }, []);

  return (
    <section style={styles.hero}>
      <div style={styles.heroBg} />
      <div style={styles.heroOverlay} />

      <div style={styles.heroContent}>
        <div style={styles.heroEyebrow(visible)}>
          <span style={styles.eyebrowDot} />
          Our Impact Portfolio
        </div>

        <h1 style={styles.heroH1(visible)}>
          Completed<br />
          <em style={{ fontStyle: "italic", color: "#3ecf6e" }}>Projects</em>
        </h1>

        <p style={styles.heroP(visible)}>
          Transforming legacy waste dumps into sustainable, usable land spaces across India — one site at a time.
        </p>

        <div style={styles.heroStats(visible)}>
          {[
            { value: "8", label: "Sites Remediated" },
            { value: "1M+", label: "Cubic Meters Processed" },
            { value: "75+", label: "Acres Reclaimed" },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div style={styles.statsDivider} />}
              <div style={styles.heroStatItem}>
                <strong style={styles.heroStatValue}>{s.value}</strong>
                <span style={styles.heroStatLabel}>{s.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={styles.scrollIndicator}>
        <span style={styles.scrollText}>Scroll to explore</span>
        <div style={styles.mouse}>
          <div style={styles.wheel} />
        </div>
      </div>

      <div style={styles.heroArc} aria-hidden />
    </section>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const ProjectShowcase: FC = () => {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  // Track active project on scroll
  useEffect(() => {
    const onScroll = () => {
      let current = PROJECTS[0].id;
      PROJECTS.forEach((p) => {
        const el = document.getElementById(p.id);
        if (el && window.scrollY >= el.offsetTop - 200) current = p.id;
      });
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      <div style={styles.root}>
        {/* Header */}
        <Header />

        {/* Hero */}
        <Hero />

        {/* Sticky Tabs */}
        <TabsNav activeId={activeId} onSelect={setActiveId} />

        {/* Projects */}
        <main style={styles.main}>
          {PROJECTS.map((project, i) => (
            <ProjectItem key={project.id} project={project} isEven={i % 2 !== 0} />
          ))}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════ */
const Header: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={styles.header(scrolled)}>
      <div
        style={styles.logoWrap}
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
      >
        <div style={styles.logoMark(logoHover)}>
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <path d="M4 28 L16 4 L28 28 Z" fill="white" opacity="0.95" />
            <path d="M10 20 L22 20" stroke="#1a6b3a" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <span style={styles.logoWordmark}>Zigma</span>
      </div>

      <nav style={styles.mainNav}>
        {["Home", "About", "Process", "Products"].map((item) => (
          <a key={item} href="#" style={styles.navLink}>{item}</a>
        ))}
        <a href="#" style={{ ...styles.navLink, color: "#1a6b3a", fontWeight: 600 }}>Projects</a>
        <a href="#" style={styles.navCta}>Contact Us →</a>
      </nav>
    </header>
  );
};

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
const Footer: FC = () => (
  <footer style={styles.footer}>
    <div style={styles.footerInner}>
      <div>
        <div style={styles.footerLogo}>
          <div style={{ ...styles.logoMark(false), width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.12)" }}>
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <path d="M4 28 L16 4 L28 28 Z" fill="white" opacity="0.9" />
              <path d="M10 20 L22 20" stroke="#3ecf6e" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.2rem", color: "white" }}>Zigma</span>
        </div>
        <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", marginTop: "0.8rem", lineHeight: 1.7, maxWidth: 240 }}>
          Alchemists of the MSW —<br />turning waste into land, and land into opportunity.
        </p>
      </div>
      <div style={{ display: "flex", gap: "3rem" }}>
        {[
          { title: "Company", links: ["About Us", "Our Process", "Products", "Careers"] },
          { title: "Projects", links: ["Completed", "Ongoing", "Impact Reports"] },
          { title: "Contact", links: ["Get in Touch", "Partnerships", "Media Enquiries"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#3ecf6e", marginBottom: "1rem", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
              {col.title}
            </h4>
            {col.links.map((l) => (
              <a key={l} href="#" style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", marginBottom: "0.55rem", textDecoration: "none", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', system-ui, sans-serif", flexWrap: "wrap", gap: "0.5rem" }}>
      <span>© 2025 Zigma Software. All rights reserved.</span>
      <span>Built with purpose, for the planet.</span>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════
   STYLE OBJECTS (inline styles — zero external deps)
═══════════════════════════════════════════════════════ */

// Tokens
const C = {
  primary:     "#1a6b3a",
  primaryDark: "#10472a",
  primaryLight:"#25924f",
  accent:      "#3ecf6e",
  accentMuted: "rgba(62,207,110,0.10)",
  bg:          "#f7f8f5",
  bgCard:      "#ffffff",
  bgSubtle:    "#f0f2ed",
  dark:        "#111c14",
  textPrimary: "#111c14",
  textSec:     "#52695a",
  textMuted:   "#8a9e90",
};

const styles = {
  root: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    background: C.bg,
    color: C.textPrimary,
    overflowX: "hidden" as const,
    WebkitFontSmoothing: "antialiased" as const,
  } as React.CSSProperties,

  // Header
  header: (scrolled: boolean): React.CSSProperties => ({
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 clamp(1.5rem, 5%, 4rem)",
    background: scrolled ? "rgba(247,248,245,0.98)" : "rgba(247,248,245,0.92)",
    backdropFilter: "blur(16px) saturate(1.5)",
    WebkitBackdropFilter: "blur(16px) saturate(1.5)",
    borderBottom: "1px solid rgba(17,28,20,0.07)",
    boxShadow: scrolled ? "0 2px 16px rgba(17,28,20,0.08)" : "none",
    transition: "background 0.3s ease, box-shadow 0.3s ease",
  }),

  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    cursor: "pointer",
  } as React.CSSProperties,

  logoMark: (hovered: boolean): React.CSSProperties => ({
    width: 36,
    height: 36,
    background: C.primary,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: hovered ? "rotate(-6deg) scale(1.06)" : "none",
  }),

  logoWordmark: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "1.35rem",
    color: C.primaryDark,
    letterSpacing: "-0.03em",
  } as React.CSSProperties,

  mainNav: {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
  } as React.CSSProperties,

  navLink: {
    padding: "0.45rem 0.9rem",
    fontSize: "0.88rem",
    fontWeight: 500,
    color: C.textSec,
    borderRadius: 8,
    textDecoration: "none",
    transition: "all 0.2s",
  } as React.CSSProperties,

  navCta: {
    marginLeft: "0.5rem",
    padding: "0.48rem 1.1rem",
    background: C.primary,
    color: "white",
    borderRadius: 30,
    fontSize: "0.85rem",
    fontWeight: 600,
    textDecoration: "none",
    transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
  } as React.CSSProperties,

  // Hero
  hero: {
    position: "relative",
    minHeight: "88vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center" as const,
    padding: "6rem clamp(1.5rem, 8%, 8rem) 8rem",
    overflow: "hidden",
    color: "white",
  } as React.CSSProperties,

  heroBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('6 vijawada_B-CVJT-fa4.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  } as React.CSSProperties,

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(160deg, rgba(10,28,15,0.84) 0%, rgba(17,52,28,0.72) 50%, rgba(10,28,15,0.88) 100%)",
    zIndex: 1,
  } as React.CSSProperties,

  heroContent: {
    position: "relative",
    zIndex: 3,
    maxWidth: 860,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  } as React.CSSProperties,

  heroEyebrow: (v: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.76rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: C.accent,
    background: "rgba(62,207,110,0.1)",
    border: "1px solid rgba(62,207,110,0.25)",
    padding: "0.4rem 1rem",
    borderRadius: 30,
    backdropFilter: "blur(8px)",
    marginBottom: "1.5rem",
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  }),

  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: C.accent,
    animation: "zigma-pulse 2s ease-in-out infinite",
    flexShrink: 0,
  } as React.CSSProperties,

  heroH1: (v: boolean): React.CSSProperties => ({
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(3rem, 7vw, 6rem)",
    letterSpacing: "-0.04em",
    lineHeight: 1.0,
    color: "white",
    textShadow: "0 4px 32px rgba(0,0,0,0.25)",
    marginBottom: "1.5rem",
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(28px)",
    transition: "opacity 0.8s ease 0.12s, transform 0.8s ease 0.12s",
  }),

  heroP: (v: boolean): React.CSSProperties => ({
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    color: "rgba(255,255,255,0.72)",
    maxWidth: 560,
    lineHeight: 1.7,
    marginBottom: "2.5rem",
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease 0.24s, transform 0.8s ease 0.24s",
  }),

  heroStats: (v: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: "1rem 0",
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease 0.36s, transform 0.8s ease 0.36s",
  }),

  heroStatItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "0 2rem",
  } as React.CSSProperties,

  heroStatValue: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "2rem",
    letterSpacing: "-0.03em",
    color: C.accent,
    lineHeight: 1,
  } as React.CSSProperties,

  heroStatLabel: {
    fontSize: "0.68rem",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.5)",
    marginTop: "0.2rem",
  } as React.CSSProperties,

  statsDivider: {
    width: 1,
    height: 40,
    background: "rgba(255,255,255,0.18)",
    flexShrink: 0,
  } as React.CSSProperties,

  scrollIndicator: {
    position: "absolute",
    bottom: "5rem",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.6rem",
    zIndex: 3,
    color: "rgba(255,255,255,0.45)",
  } as React.CSSProperties,

  scrollText: {
    fontSize: "0.68rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    fontWeight: 500,
  } as React.CSSProperties,

  mouse: {
    width: 22,
    height: 34,
    border: "1.5px solid rgba(255,255,255,0.3)",
    borderRadius: 11,
    position: "relative" as const,
    overflow: "hidden",
  } as React.CSSProperties,

  wheel: {
    width: 3,
    height: 6,
    background: C.accent,
    borderRadius: 2,
    position: "absolute" as const,
    top: 6,
    left: "50%",
    transform: "translateX(-50%)",
    animation: "zigma-wheel 1.8s ease-in-out infinite",
  } as React.CSSProperties,

  heroArc: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 80,
    background: C.bg,
    clipPath: "ellipse(55% 100% at 50% 100%)",
    zIndex: 4,
  } as React.CSSProperties,

  // Tabs
  tabsNav: (scrolled: boolean): React.CSSProperties => ({
    position: "sticky",
    top: 68,
    zIndex: 900,
    background: "white",
    borderBottom: "1px solid rgba(17,28,20,0.07)",
    boxShadow: scrolled ? "0 1px 8px rgba(17,28,20,0.06)" : "none",
    position: "sticky" as const,
  }),

  tabsEdgeFadeLeft: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 60,
    background: "linear-gradient(to right, white, transparent)",
    zIndex: 2,
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  tabsEdgeFadeRight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 60,
    background: "linear-gradient(to left, white, transparent)",
    zIndex: 2,
    pointerEvents: "none" as const,
  } as React.CSSProperties,

  tabList: {
    display: "flex",
    gap: "0.4rem",
    overflowX: "auto" as const,
    padding: "0.65rem clamp(1.5rem, 5%, 3rem)",
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none" as const,
  } as React.CSSProperties,

  tabBtn: (active: boolean): React.CSSProperties => ({
    padding: "0.48rem 1.1rem",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontWeight: 600,
    fontSize: "0.83rem",
    color: active ? "white" : C.textSec,
    background: active ? C.primary : "transparent",
    borderRadius: 30,
    whiteSpace: "nowrap" as const,
    border: `1.5px solid ${active ? C.primary : "transparent"}`,
    cursor: "pointer",
    transition: "all 0.22s ease",
    boxShadow: active ? "0 4px 16px rgba(26,107,58,0.25)" : "none",
    letterSpacing: "0.01em",
    minWidth: 110,
  }),

  // Main
  main: {
    maxWidth: 1380,
    margin: "0 auto",
    padding: "5rem clamp(1.5rem, 5%, 4rem) 6rem",
  } as React.CSSProperties,

  // Project
  projectItem: {
    marginBottom: "7rem",
    position: "relative" as const,
    scrollMarginTop: 150,
  } as React.CSSProperties,

  separator: {
    position: "absolute" as const,
    bottom: "-3.5rem",
    left: 0,
    right: 0,
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(26,107,58,0.14) 30%, rgba(26,107,58,0.14) 70%, transparent)",
  } as React.CSSProperties,

  projectHeader: (inView: boolean, isEven: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "flex-start",
    gap: "1.5rem",
    marginBottom: "1.5rem",
    padding: "0 0.25rem",
    flexDirection: isEven ? "row-reverse" : "row",
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  }),

  projectIndex: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "3.5rem",
    color: "rgba(26,107,58,0.09)",
    lineHeight: 1,
    letterSpacing: "-0.05em",
    flexShrink: 0,
    marginTop: "-0.25rem",
    userSelect: "none" as const,
  } as React.CSSProperties,

  projectTitleGroup: { flex: 1 } as React.CSSProperties,

  projectName: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
    color: C.primaryDark,
    marginBottom: "0.5rem",
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
  } as React.CSSProperties,

  projectMeta: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,

  locationTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: C.textSec,
    background: C.bgSubtle,
    padding: "0.28rem 0.75rem",
    borderRadius: 20,
  } as React.CSSProperties,

  typeBadge: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: C.primary,
    background: C.accentMuted,
    padding: "0.28rem 0.8rem",
    borderRadius: 20,
    border: `1px solid rgba(26,107,58,0.15)`,
    letterSpacing: "0.02em",
    textTransform: "uppercase" as const,
  } as React.CSSProperties,

  showcaseGrid: (isEven: boolean): React.CSSProperties => ({
    display: "grid",
    gridTemplateColumns: "7fr 3fr",
    gap: 10,
    alignItems: "stretch",
    direction: isEven ? "rtl" : "ltr",
  }),

  // Slider
  sliderContainer: (inView: boolean): React.CSSProperties => ({
    position: "relative",
    width: "100%",
    minHeight: 420,
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(17,28,20,0.12)",
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.985)",
    transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
    direction: "ltr" as const,
  }),

  sliderImageLayer: (
    url: string | undefined,
    zIndex: number,
    type: "before" | "after",
    val?: number
  ): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    backgroundImage: url,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex,
    ...(type === "before" && val !== undefined
      ? {
          width: `${val}%`,
          borderRight: "2.5px solid rgba(255,255,255,0.88)",
          boxShadow: "2px 0 20px rgba(0,0,0,0.18)",
        }
      : {}),
    ...(type === "after"
      ? { background: url ? undefined : "linear-gradient(135deg,#1b4332,#2d6a4f)" }
      : { background: url ? undefined : "linear-gradient(135deg,#3d1a00,#6b3a1f)" }),
  }),

  sliderDivider: (val: number): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    left: `${val}%`,
    width: 2,
    height: "100%",
    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.85) 10%, rgba(255,255,255,0.85) 90%, transparent)",
    transform: "translateX(-1px)",
    zIndex: 3,
    pointerEvents: "none",
  }),

  sliderHandle: (val: number): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    left: `${val}%`,
    transform: "translate(-50%, -50%)",
    zIndex: 4,
    pointerEvents: "none",
    width: 40,
    height: 40,
  }),

  sliderHandleKnob: {
    width: 38,
    height: 38,
    background: "rgba(255,255,255,0.18)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1.5px solid rgba(255,255,255,0.55)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.1rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15), 0 0 0 5px rgba(255,255,255,0.07)",
    fontSize: "1.1rem",
    color: "white",
    fontWeight: 700,
    lineHeight: 1,
  } as React.CSSProperties,

  sliderArrow: (dir: "left" | "right"): React.CSSProperties => ({
    fontSize: "1rem",
    color: "white",
    lineHeight: 1,
    marginTop: "-1px",
    display: "inline-block",
    fontFamily: "system-ui, sans-serif",
  }),

  baLabel: {
    position: "absolute" as const,
    top: "1rem",
    padding: "0.32rem 0.8rem",
    fontSize: "0.68rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    borderRadius: 4,
    backdropFilter: "blur(8px)",
    color: "white",
    zIndex: 3,
  } as React.CSSProperties,

  rangeInput: {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: 5,
    opacity: 0,
    cursor: "ew-resize",
    margin: 0,
  } as React.CSSProperties,

  dragHint: (faded: boolean): React.CSSProperties => ({
    position: "absolute",
    bottom: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.68rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.65)",
    background: "rgba(0,0,0,0.38)",
    backdropFilter: "blur(6px)",
    padding: "0.32rem 0.8rem",
    borderRadius: 20,
    zIndex: 4,
    pointerEvents: "none",
    opacity: faded ? 0 : 1,
    transition: "opacity 1.2s ease",
    whiteSpace: "nowrap" as const,
  }),

  placeholderOverlay: {
    position: "absolute" as const,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    background: "linear-gradient(135deg, #1b4332, #2d6a4f)",
  } as React.CSSProperties,

  // Stat cards
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: 10,
    height: "100%",
    direction: "ltr" as const,
  } as React.CSSProperties,

  statCard: (inView: boolean, delay: number, hovered: boolean, isFull: boolean, isCO2: boolean): React.CSSProperties => ({
    background: isCO2 ? "linear-gradient(135deg, #f0f8f2, #ffffff)" : "white",
    border: `1px solid ${hovered ? "rgba(26,107,58,0.2)" : isCO2 ? "rgba(26,107,58,0.12)" : "rgba(17,28,20,0.07)"}`,
    borderRadius: 14,
    padding: isFull ? "1.1rem 1.5rem" : "1rem 0.9rem",
    display: "flex",
    flexDirection: isFull ? "row" : "column",
    justifyContent: "center",
    alignItems: isFull ? "center" : "center",
    textAlign: isFull ? "left" : "center",
    gap: isFull ? "1.25rem" : 0,
    gridColumn: isFull ? "span 2" : undefined,
    boxShadow: hovered ? "0 6px 24px rgba(17,28,20,0.09)" : "0 1px 3px rgba(17,28,20,0.05)",
    transform: inView ? (hovered ? "translateY(-3px)" : "translateY(0)") : "translateY(18px)",
    opacity: inView ? 1 : 0,
    transition: `opacity 0.6s ease ${delay}s, transform 0.5s ease ${delay}s, box-shadow 0.25s ease, border-color 0.25s ease`,
    overflow: "hidden",
    position: "relative" as const,
    cursor: "default",
  }),

  statIconWrap: (hovered: boolean, isCO2: boolean): React.CSSProperties => ({
    width: 34,
    height: 34,
    background: hovered ? "#1a6b3a" : isCO2 ? "rgba(26,107,58,0.08)" : "rgba(62,207,110,0.1)",
    color: hovered ? "white" : "#1a6b3a",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.25s ease, color 0.25s ease, transform 0.25s ease",
    transform: hovered ? "scale(1.08) rotate(-4deg)" : "none",
    marginBottom: "0.55rem",
  }),

  statContent: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  } as React.CSSProperties,

  statContentFull: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    flex: 1,
  } as React.CSSProperties,

  statLabel: {
    display: "block",
    fontSize: "0.66rem",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#8a9e90",
    marginBottom: "0.32rem",
  } as React.CSSProperties,

  statValueRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.3rem",
  } as React.CSSProperties,

  statValue: {
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "1.6rem",
    color: "#10472a",
    letterSpacing: "-0.03em",
    lineHeight: 1,
  } as React.CSSProperties,

  statUnit: {
    fontSize: "0.66rem",
    fontWeight: 700,
    color: "#8a9e90",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  } as React.CSSProperties,

  statDesc: {
    fontSize: "0.7rem",
    color: "#52695a",
    lineHeight: 1.45,
    marginTop: "0.3rem",
    fontWeight: 400,
  } as React.CSSProperties,

  // Footer
  footer: {
    background: "#111c14",
    color: "rgba(255,255,255,0.75)",
    padding: "4rem clamp(1.5rem, 5%, 4rem) 2rem",
    borderRadius: "32px 32px 0 0",
    marginTop: "2rem",
    fontFamily: "'DM Sans', system-ui, sans-serif",
  } as React.CSSProperties,

  footerInner: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "4rem",
    marginBottom: "3rem",
    alignItems: "start",
  } as React.CSSProperties,

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "0",
  } as React.CSSProperties,
};

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES (keyframes, resets, scrollbar, responsive)
═══════════════════════════════════════════════════════ */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { -webkit-font-smoothing: antialiased; }
  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; font-family: inherit; }

  @keyframes zigma-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.45; transform: scale(0.7); }
  }
  @keyframes zigma-wheel {
    0%   { top: 6px; opacity: 1; }
    50%  { top: 14px; opacity: 0.25; }
    100% { top: 6px; opacity: 1; }
  }
  @keyframes zigma-hint-show {
    from { opacity: 0; transform: translateX(-50%) translateY(6px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  .zigma-tab-list::-webkit-scrollbar { display: none; }

  /* Responsive: stack on small screens */
  @media (max-width: 960px) {
    .zigma-showcase-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
    .zigma-stats-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 640px) {
    .zigma-main-nav { display: none !important; }
    .zigma-hero-stats { display: none !important; }
    .zigma-footer-inner { grid-template-columns: 1fr !important; }
    .zigma-footer-links { flex-wrap: wrap !important; }
  }

  /* Smooth slider input */
  input[type=range] { -webkit-appearance: none; appearance: none; }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default ProjectShowcase;