import { useState, useEffect, useRef, useCallback, CSSProperties, FC, ReactNode } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Slide {
  text: string;
  initials: string;
  gradient: string;
  name: string;
  role: string;
  tag: string;
}

interface Video {
  gradient: string;
  label: string;
  duration: string;
  title: string;
  desc: string;
  author: string;
  dotColor: string;
  featured: boolean;
  badge?: string;
}

type StatIconType = "globe" | "leaf" | "star" | "zap" | "home" | "award";

interface Stat {
  icon: StatIconType;
  number: number;
  suffix: string;
  label: string;
  barWidth: string;
  decimal?: boolean;
}

type Platform = "linkedin" | "twitter";

interface WallCard {
  initials: string;
  gradient: string;
  name: string;
  handle: string;
  platform: Platform;
  text: string;
  likes: string;
  time: string;
  tall?: boolean;
}

type LoadState = "idle" | "loading" | "done";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SLIDES: Slide[] = [
  {
    text: `"Zigma's landfill mining solution transformed our facility completely. We reduced waste volumes by 60% and generated new revenue from recovered materials. Their team was exceptional throughout—professional, knowledgeable, and truly committed to our success."`,
    initials: "RK", gradient: "linear-gradient(135deg,#10B981,#34D399)",
    name: "Rajesh Kumar", role: "CEO, GreenPath Industries", tag: "Landfill Mining",
  },
  {
    text: `"The BSFL organic waste management program was a game-changer for our food processing plant. We went from paying for waste disposal to earning from bio-conversion. The ROI was remarkable—we broke even within 8 months. Highly recommend partnering with Zigma!"`,
    initials: "PS", gradient: "linear-gradient(135deg,#059669,#10B981)",
    name: "Priya Sharma", role: "Operations Director, FreshFoods Co.", tag: "BSFL Organic",
  },
  {
    text: `"We partnered with Zigma for our municipality's waste-to-energy initiative. The results exceeded every benchmark we set. Carbon emissions down 45%, landfill usage cut to near zero. The community response has been overwhelmingly positive. Zigma delivered excellence."`,
    initials: "AM", gradient: "linear-gradient(135deg,#047857,#10B981)",
    name: "Arjun Mehta", role: "Municipal Commissioner, EcoCity", tag: "Waste-to-Energy",
  },
  {
    text: `"The BluePlanet bioremediation project for our contaminated industrial site was handled with precision and care. The remediation was 3x faster than traditional methods. Their environmental scientists were always accessible and transparent. Outstanding professionalism."`,
    initials: "SD", gradient: "linear-gradient(135deg,#065F46,#059669)",
    name: "Sunita Desai", role: "VP Sustainability, IndoTech Corp", tag: "Bioremediation",
  },
];

const VIDEOS: Video[] = [
  {
    gradient: "linear-gradient(135deg,#064e3b,#10B981)", label: "Landfill Mining Success",
    duration: "4:32", title: "From Waste to Wealth",
    desc: "GreenPath Industries shares how landfill mining opened new revenue streams",
    author: "Rajesh Kumar · GreenPath Industries", dotColor: "#10B981", featured: false,
  },
  {
    gradient: "linear-gradient(135deg,#047857,#34D399)", label: "Featured Story",
    duration: "8:15", title: "A City Transformed",
    desc: "How EcoCity municipality eliminated landfill usage in under 2 years—a documentary",
    author: "Arjun Mehta · EcoCity Municipality", dotColor: "#34D399", featured: true,
    badge: "⭐ Most Watched",
  },
  {
    gradient: "linear-gradient(135deg,#065F46,#059669)", label: "Industrial Reclamation",
    duration: "5:47", title: "Bioremediation Excellence",
    desc: "IndoTech Corp walks through the contamination-to-clean journey",
    author: "Sunita Desai · IndoTech Corp", dotColor: "#059669", featured: false,
  },
];

const STATS: Stat[] = [
  { icon: "globe", number: 200,  suffix: "+",  label: "Clients Served",           barWidth: "80%"  },
  { icon: "leaf",  number: 500,  suffix: "k+", label: "Tonnes Waste Processed",   barWidth: "85%"  },
  { icon: "star",  number: 4.9,  suffix: "",   label: "Average Rating",            barWidth: "97%", decimal: true },
  { icon: "zap",   number: 45,   suffix: "%",  label: "Avg Carbon Reduction",      barWidth: "60%"  },
  { icon: "home",  number: 98,   suffix: "%",  label: "Client Retention Rate",     barWidth: "98%"  },
  { icon: "award", number: 50,   suffix: "+",  label: "Industry Awards",           barWidth: "65%"  },
];

const WALL_CARDS: WallCard[] = [
  { initials: "RK", gradient: "linear-gradient(135deg,#10B981,#34D399)", name: "Rajesh Kumar",  handle: "@rajesh_greenpath · LinkedIn", platform: "linkedin", text: `Just completed our 1-year anniversary with <b>@Zigma_Enviro</b> – our landfill has been reduced by 60%! Best environmental partner we've ever worked with. 🌿 #SustainableBusiness #WasteManagement`, likes: "234",  time: "2 hours ago"  },
  { initials: "PS", gradient: "linear-gradient(135deg,#059669,#10B981)", name: "Priya Sharma",  handle: "@priya_freshfoods · Twitter",  platform: "twitter",  text: `Our BSFL facility is now fully operational thanks to <b>@ZigmaBluePlanet</b>. We turned 5 tonnes/day of organic waste into bioprotein. The future of circular economy is here! 🦋`,                      likes: "189",  time: "5 hours ago"  },
  { initials: "AM", gradient: "linear-gradient(135deg,#047857,#10B981)", name: "Arjun Mehta",   handle: "@arjun_ecocity · LinkedIn",   platform: "linkedin", text: `We declared EcoCity officially landfill-free! This milestone was made possible by our 2-year partnership with <b>@Zigma</b>. Carbon emissions are down 45%. 🌍💚 #EcoCity #ZeroWaste`,              likes: "1.2k", time: "1 day ago",    tall: true },
  { initials: "SD", gradient: "linear-gradient(135deg,#065F46,#059669)", name: "Sunita Desai",  handle: "@sunita_indotech · Twitter",  platform: "twitter",  text: `Bioremediation complete 🎉 Our site went from heavily contaminated to certified clean in 14 months — <b>@ZigmaBluePlanet</b> delivered 3x faster than any previous contractor. #CleanSite`,          likes: "312",  time: "3 days ago"   },
  { initials: "VN", gradient: "linear-gradient(135deg,#10B981,#6EE7B7)", name: "Vikram Nair",   handle: "@vikram_cleanearth · LinkedIn", platform: "linkedin", text: `Partnered with Zigma for our industrial zone cleanup project. Professional, punctual, and produced results beyond what was scoped. 10/10 would recommend. 🌱`,                                          likes: "445",  time: "1 week ago"   },
  { initials: "MT", gradient: "linear-gradient(135deg,#059669,#34D399)", name: "Meera Trivedi", handle: "@meera_hydrogro · Twitter",   platform: "twitter",  text: `Just hosted <b>@ZigmaEnviro</b> for an on-site review of our hydroponic waste-loop system they designed. 18 months in, zero food waste going to landfill. 🌿💧 #CircularEconomy`,                         likes: "567",  time: "2 weeks ago"  },
  { initials: "KR", gradient: "linear-gradient(135deg,#047857,#34D399)", name: "Karan Reddy",   handle: "@karan_zerocarbon · LinkedIn", platform: "linkedin", text: `Six months into our ZeroCarbon initiative and we've already offset 12,000 tonnes of CO₂ equivalent. This is what systemic change looks like. 💚🌍 #ZeroCarbon`,                                      likes: "892",  time: "3 weeks ago",  tall: true },
  { initials: "AP", gradient: "linear-gradient(135deg,#10B981,#059669)", name: "Aisha Patel",   handle: "@aisha_biogreen · Twitter",   platform: "twitter",  text: `Our BioGreen Labs chose <b>@ZigmaBluePlanet</b> after evaluating 6 other environmental firms. Best decision we made. Their BSFL tech is at least 2 generations ahead. 🔬🌿`,                             likes: "278",  time: "1 month ago"  },
];

const EXTRA_CARDS: WallCard[] = [
  { initials: "LP", gradient: "linear-gradient(135deg,#10B981,#059669)", name: "Lakshmi Pillai", handle: "@lakshmi_naturefirst · LinkedIn", platform: "linkedin", text: `NatureFirst has been working with Zigma for 3 years. Their environmental audit reports are thorough and their remediation team sets the gold standard. 🌿 #GreenFuture`,               likes: "1.1k", time: "5 weeks ago"  },
  { initials: "DG", gradient: "linear-gradient(135deg,#047857,#34D399)", name: "Deepak Gupta",   handle: "@deepak_opti · Twitter",         platform: "twitter",  text: `Zigma upgraded our waste processing line and our monthly disposal costs dropped by 70%. The system paid for itself in under a year. Jaw-dropping ROI. 💰🌱`,                           likes: "398",  time: "6 weeks ago"  },
  { initials: "SR", gradient: "linear-gradient(135deg,#065F46,#10B981)", name: "Sneha Rao",      handle: "@sneha_zerocarbon · LinkedIn",   platform: "linkedin", text: `Zero Waste certification achieved! After implementing Zigma's circular economy framework, we now have zero materials going to landfill. 🏆 #CircularEconomy #ZeroWaste`,           likes: "2.3k", time: "2 months ago" },
  { initials: "BN", gradient: "linear-gradient(135deg,#059669,#6EE7B7)", name: "Balaji Nair",    handle: "@balaji_solarair · Twitter",     platform: "twitter",  text: `Integration of our solar farm with Zigma's waste-to-energy grid was seamless. 40% of our power now comes from secondary recovered sources. 🌞♻️`,                                  likes: "512",  time: "2 months ago" },
];

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const QuoteIcon: FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M14 20h-4a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6zM8 20v-4a10 10 0 0 1 10-10" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M34 20h-4a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6zM28 20v-4a10 10 0 0 1 10-10" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ChevronLeft: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const PlayIcon: FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ArrowRight: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ArrowDown: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

const CheckIcon: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const STAT_ICONS: Record<StatIconType, ReactNode> = {
  globe: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  leaf: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  star: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  ),
  zap: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
    </svg>
  ),
  home: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  ),
  award: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useCounter(target: number, active: boolean, decimal = false, duration = 1800): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const steps = duration / 16;
    const inc = target / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setVal(decimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
      if (cur >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, decimal, duration]);
  return val;
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/* Reveal wrapper */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}

const Reveal: FC<RevealProps> = ({ children, delay = 0, style = {} }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity .7s cubic-bezier(.4,0,.2,1) ${delay}s, transform .7s cubic-bezier(.4,0,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* Stat card with animated counter */
interface StatCardProps {
  stat: Stat;
}

const StatCard: FC<StatCardProps> = ({ stat }) => {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, 0.5);
  const [barActive, setBarActive] = useState(false);
  const count = useCounter(stat.number, active, stat.decimal);

  useEffect(() => {
    if (active) setTimeout(() => setBarActive(true), 400);
  }, [active]);

  return (
    <div ref={ref} style={styles.statCard}>
      <div style={styles.statIconWrap}>{STAT_ICONS[stat.icon]}</div>
      <div style={styles.statNumber}>{count}{stat.suffix}</div>
      <div style={styles.statLabel}>{stat.label}</div>
      <div style={styles.statBar}>
        <div style={{ ...styles.statBarFill, width: barActive ? stat.barWidth : "0%" }} />
      </div>
    </div>
  );
};

/* Wall card */
interface WallCardProps {
  card: WallCard;
  delay?: number;
}

const WallCardItem: FC<WallCardProps> = ({ card, delay = 0 }) => (
  <Reveal
    delay={delay}
    style={{ display: "inline-block", width: "100%", marginBottom: 20, breakInside: "avoid" }}
  >
    <div style={styles.wallCard} className="wall-card-hover">
      <div style={styles.wallHeader}>
        <div style={{ ...styles.wallAvatar, background: card.gradient }}>
          <span>{card.initials}</span>
        </div>
        <div style={styles.wallUser}>
          <strong style={styles.wallUserName}>{card.name}</strong>
          <span style={styles.wallHandle}>{card.handle}</span>
        </div>
        <div style={{ ...styles.wallPlatform, background: card.platform === "linkedin" ? "#0077B5" : "#000" }}>
          {card.platform === "linkedin" ? "in" : "𝕏"}
        </div>
      </div>
      <p style={styles.wallText} dangerouslySetInnerHTML={{ __html: card.text }} />
      {card.tall && <div style={styles.wallImgPlaceholder} />}
      <div style={styles.wallFooter}>
        <span style={styles.wallLikes}>❤ {card.likes}</span>
        <span style={styles.wallTime}>{card.time}</span>
      </div>
    </div>
  </Reveal>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Testimonials: FC = () => {
  /* ── Slider state ── */
  const [current, setCurrent] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      5000
    );
  }, []);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const handlePrev = (): void => { stopAuto(); goTo(current - 1); startAuto(); };
  const handleNext = (): void => { stopAuto(); goTo(current + 1); startAuto(); };
  const handleDot  = (i: number): void => { stopAuto(); goTo(i); startAuto(); };

  /* ── Touch swipe ── */
  const touchStart = useRef<number>(0);
  const onTouchStart = (e: React.TouchEvent): void => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent): void => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { stopAuto(); diff > 0 ? goTo(current + 1) : goTo(current - 1); startAuto(); }
  };

  /* ── Video modal ── */
  const [videoOpen, setVideoOpen] = useState<boolean>(false);

  /* ── Social wall ── */
  const [wallCards, setWallCards] = useState<WallCard[]>(WALL_CARDS);
  const [loadState, setLoadState] = useState<LoadState>("idle");

  const handleLoadMore = (): void => {
    if (loadState !== "idle") return;
    setLoadState("loading");
    setTimeout(() => {
      setWallCards((c) => [...c, ...EXTRA_CARDS]);
      setLoadState("done");
    }, 900);
  };

  /* ── Render ── */
  return (
    <>
      <style>{CSS}</style>

      {/* ════════ FEATURED TESTIMONIALS ════════ */}
      <section style={styles.featured}>
        <Reveal><div style={styles.sectionLabel}>Featured Testimonials</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={styles.sectionTitle}>
            What Our <span style={{ color: "#10B981" }}>Clients</span> Say
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={styles.sectionSub}>Real experiences from industry leaders driving sustainable change</p>
        </Reveal>

        <div style={styles.sliderContainer} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {SLIDES.map((s: Slide, i: number) => (
            <div key={i} style={{ display: i === current ? "block" : "none" }}>
              <div style={styles.slideInner} className="slide-inner-pseudo">
                <div style={{ marginBottom: 28, opacity: 0.8 }}><QuoteIcon /></div>
                <p style={styles.slideText}>{s.text}</p>
                <div style={styles.slideMeta}>
                  <div style={{ ...styles.slideAvatar, background: s.gradient }}>
                    <span>{s.initials}</span>
                  </div>
                  <div style={styles.slideInfo}>
                    <strong style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>{s.name}</strong>
                    <span style={{ fontSize: ".875rem", color: "#6B7280" }}>{s.role}</span>
                    <div style={{ color: "#F59E0B", fontSize: "1.1rem", letterSpacing: 2, marginTop: 2 }}>★★★★★</div>
                  </div>
                  <div style={styles.slideTag}>{s.tag}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <div style={styles.sliderControls}>
            <button style={styles.sliderBtn} onClick={handlePrev} className="slider-btn-hover">
              <ChevronLeft />
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              {SLIDES.map((_: Slide, i: number) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  style={{ ...styles.dot, ...(i === current ? styles.dotActive : {}) }}
                />
              ))}
            </div>
            <button style={styles.sliderBtn} onClick={handleNext} className="slider-btn-hover">
              <ChevronRight />
            </button>
          </div>

          <div style={styles.sliderProgress}>
            <div style={{ ...styles.sliderProgressFill, width: `${((current + 1) / SLIDES.length) * 100}%` }} />
          </div>
        </div>
      </section>

      {/* ════════ VIDEO TESTIMONIALS ════════ */}
      <section style={styles.videoSection}>
        <div style={styles.videoBgShape} />
        <Reveal><div style={styles.sectionLabel}>Video Stories</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={styles.sectionTitle}>Hear It From <span style={{ color: "#10B981" }}>Them</span></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={styles.sectionSub}>Watch real interviews with our partners and clients</p>
        </Reveal>

        <div style={styles.videoGrid}>
          {VIDEOS.map((v: Video, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                style={styles.videoCard}
                className="video-card-hover"
                onClick={() => setVideoOpen(true)}
              >
                <div style={{ ...styles.videoThumb, height: v.featured ? 260 : 200 }}>
                  <div style={{ ...styles.thumbGradient, background: v.gradient }} />
                  <div style={styles.thumbLabel}>{v.label}</div>
                  <button
                    style={{ ...styles.playBtn, width: v.featured ? 64 : 52, height: v.featured ? 64 : 52 }}
                    aria-label="Play video"
                  >
                    <PlayIcon size={v.featured ? 36 : 28} />
                  </button>
                  <div style={styles.videoDuration}>{v.duration}</div>
                  {v.badge && <div style={styles.videoBadge}>{v.badge}</div>}
                </div>
                <div style={styles.videoInfo}>
                  <h3 style={styles.videoTitle}>{v.title}</h3>
                  <p style={styles.videoDesc}>{v.desc}</p>
                  <div style={styles.videoAuthor}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.dotColor, flexShrink: 0 }} />
                    <span style={{ fontSize: ".82rem", color: "#6B7280" }}>{v.author}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div style={styles.modalBackdrop} onClick={() => setVideoOpen(false)}>
          <div style={styles.modal} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setVideoOpen(false)}>✕</button>
            <div style={styles.modalBody}>
              <div style={{ textAlign: "center", color: "#6B7280" }}>
                <PlayIcon size={56} />
                <p style={{ marginTop: 16, color: "#374151" }}>Video player would load here.</p>
              </div>
            </div>
          </div>
        </div>
      )}

     

      {/* ════════ SOCIAL PROOF WALL ════════ */}
      <section style={styles.socialWall}>
        <Reveal><div style={styles.sectionLabel}>Social Proof</div></Reveal>
        <Reveal delay={0.05}>
          <h2 style={styles.sectionTitle}>
            The <span style={{ color: "#10B981" }}>Conversation</span> Around Us
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={styles.sectionSub}>Real-time voices from LinkedIn, Twitter &amp; industry forums</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={styles.liveBadge}>
            <span style={styles.liveDot} className="live-dot-anim" />
            <span>Live Feed</span>
          </div>
        </Reveal>

        <div style={styles.wallGrid}>
          {wallCards.map((c: WallCard, i: number) => (
            <WallCardItem key={i} card={c} delay={(i % 4) * 0.06} />
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <button
            style={styles.btnOutline}
            onClick={handleLoadMore}
            disabled={loadState === "done"}
            className="btn-outline-hover"
          >
            {loadState === "idle"    && <><span>Load More Reviews</span><ArrowDown /></>}
            {loadState === "loading" && <span>Loading…</span>}
            {loadState === "done"    && <><span>All Reviews Loaded</span><CheckIcon /></>}
          </button>
        </div>
      </section>

     

    
    </>
  );
};

export default Testimonials;

/* ─────────────────────────────────────────────
   STYLE TOKENS
───────────────────────────────────────────── */
const G    = "#10B981";
const GD   = "#059669";
const GDK  = "#047857";
const GL   = "#34D399";
const GPale  = "#D1FAE5";
const GFaint = "#ECFDF5";

/* ─────────────────────────────────────────────
   STYLES  (typed as Record<string, CSSProperties>)
───────────────────────────────────────────── */
const styles: Record<string, CSSProperties> = {
  /* ── Shared typography ── */
  sectionLabel: {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontSize: ".78rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase",
    color: G, background: GFaint, border: `1px solid ${GPale}`,
    padding: "6px 16px", borderRadius: 100, marginBottom: 20,
  },
  sectionTitle: {
    fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800,
    lineHeight: 1.15, color: "#111827", marginBottom: 14,
  },
  sectionSub: {
    fontSize: "1.05rem", color: "#6B7280", maxWidth: 520,
    lineHeight: 1.7, margin: "0 auto 48px",
  },

  /* ── Featured / Slider ── */
  featured: { padding: "100px 32px", maxWidth: 1280, margin: "0 auto", textAlign: "center" },
  sliderContainer: { position: "relative", marginTop: 20, overflow: "hidden", borderRadius: 16 },
  slideInner: {
    background: "#fff", border: "1px solid #F3F4F6", borderRadius: 16,
    padding: "56px 64px", textAlign: "left", position: "relative",
    boxShadow: "0 12px 40px rgba(0,0,0,.12)", overflow: "hidden",
  },
  slideText: {
    fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)", lineHeight: 1.75,
    color: "#374151", marginBottom: 36, maxWidth: 840,
    fontStyle: "italic", position: "relative", zIndex: 1,
  },
  slideMeta:   { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" },
  slideAvatar: {
    width: 56, height: 56, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: "1rem", fontWeight: 700, flexShrink: 0,
    boxShadow: "0 4px 16px rgba(0,0,0,.15)",
  },
  slideInfo: { display: "flex", flexDirection: "column", gap: 3 },
  slideTag: {
    marginLeft: "auto", background: GFaint, color: GD,
    fontSize: ".78rem", fontWeight: 600, padding: "6px 16px",
    borderRadius: 100, border: `1px solid ${GPale}`,
  },
  sliderControls: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 32,
  },
  sliderBtn: {
    width: 48, height: 48, borderRadius: "50%", border: "2px solid #E5E7EB",
    background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: "#374151", transition: ".35s",
  },
  dot: {
    width: 10, height: 10, borderRadius: "50%", border: "2px solid #D1D5DB",
    background: "transparent", cursor: "pointer", padding: 0, transition: ".35s",
  },
  dotActive:            { background: G, borderColor: G, width: 28, borderRadius: 5 },
  sliderProgress:       { height: 3, background: "#F3F4F6", borderRadius: 2, marginTop: 20, overflow: "hidden" },
  sliderProgressFill:   { height: "100%", background: `linear-gradient(90deg, ${G}, ${GL})`, borderRadius: 2, transition: "width .5s ease" },

  /* ── Video section ── */
  videoSection: {
    padding: "100px 32px", background: "#F9FAFB",
    textAlign: "center", position: "relative", overflow: "hidden",
  },
  videoBgShape: {
    position: "absolute", top: -100, right: -150, width: 600, height: 600,
    background: `radial-gradient(circle, ${GPale} 0%, transparent 70%)`,
    borderRadius: "50%", pointerEvents: "none",
  },
  videoGrid: {
    display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr",
    gap: 24, maxWidth: 1280, margin: "0 auto",
  },
  videoCard: {
    background: "#fff", borderRadius: 16, overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,.09)", transition: ".35s", cursor: "pointer",
  },
  videoThumb:   { position: "relative", overflow: "hidden" },
  thumbGradient:{ position: "absolute", inset: 0 },
  thumbLabel: {
    position: "absolute", top: 16, left: 16,
    background: "rgba(0,0,0,.45)", color: "#fff", backdropFilter: "blur(8px)",
    fontSize: ".72rem", fontWeight: 600, padding: "4px 12px",
    borderRadius: 100, letterSpacing: ".06em",
  },
  playBtn: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    background: "rgba(16,185,129,.9)", border: "none", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: ".3s", boxShadow: "0 8px 32px rgba(16,185,129,.4)",
  },
  videoDuration: {
    position: "absolute", bottom: 12, right: 12,
    background: "rgba(0,0,0,.6)", color: "#fff",
    fontSize: ".75rem", fontWeight: 600, padding: "3px 10px", borderRadius: 6,
  },
  videoBadge: {
    position: "absolute", top: 12, right: 12,
    background: `linear-gradient(135deg, ${G}, ${GL})`,
    color: "#fff", fontSize: ".72rem", fontWeight: 700,
    padding: "4px 12px", borderRadius: 100,
  },
  videoInfo:   { padding: "20px 24px 24px" },
  videoTitle:  { fontSize: "1rem",   fontWeight: 700, color: "#111827", margin: "0 0 8px" },
  videoDesc:   { fontSize: ".875rem", color: "#6B7280", lineHeight: 1.6,  margin: "0 0 14px" },
  videoAuthor: { display: "flex", alignItems: "center", gap: 8 },

  /* Video modal */
  modalBackdrop: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,.75)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 9000, backdropFilter: "blur(6px)",
  },
  modal: {
    background: "#111827", borderRadius: 16, width: "90%",
    maxWidth: 760, position: "relative", overflow: "hidden",
  },
  modalClose: {
    position: "absolute", top: 16, right: 16,
    background: "rgba(255,255,255,.1)", border: "none",
    color: "#fff", width: 36, height: 36, borderRadius: "50%",
    cursor: "pointer", fontSize: "1rem",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1,
  },
  modalBody: {
    height: 420, display: "flex",
    alignItems: "center", justifyContent: "center", color: "#fff",
  },

  /* ── Stats ── */
  statsSection: {
    padding: "100px 32px", textAlign: "center",
    background: `linear-gradient(135deg, #022c22, ${GDK}, #065F46)`,
    position: "relative", overflow: "hidden",
  },
  statsOrb1: {
    position: "absolute", borderRadius: "50%", filter: "blur(80px)",
    width: 500, height: 500, background: "rgba(52,211,153,.12)",
    top: -200, left: -100, pointerEvents: "none",
  },
  statsOrb2: {
    position: "absolute", borderRadius: "50%", filter: "blur(80px)",
    width: 400, height: 400, background: "rgba(16,185,129,.1)",
    bottom: -150, right: -80, pointerEvents: "none",
  },
  statsGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24, maxWidth: 960, margin: "0 auto",
  },
  statCard: {
    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(16px)", borderRadius: 16,
    padding: "36px 28px", textAlign: "center", transition: ".35s",
  },
  statIconWrap: {
    width: 52, height: 52, background: "rgba(52,211,153,.15)",
    border: "1px solid rgba(52,211,153,.25)", borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 20px", color: GL,
  },
  statNumber: { fontSize: "3rem", fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: 8 },
  statLabel:  { fontSize: ".875rem", color: "rgba(255,255,255,.65)", fontWeight: 500, marginBottom: 20 },
  statBar:    { height: 4, background: "rgba(255,255,255,.1)", borderRadius: 2, overflow: "hidden" },
  statBarFill: {
    height: "100%", background: `linear-gradient(90deg, ${GL}, ${G})`,
    borderRadius: 2, transition: "width 1.5s cubic-bezier(.4,0,.2,1) .4s",
  },

  /* ── Social wall ── */
  socialWall: { padding: "100px 32px", background: "#F9FAFB", textAlign: "center" },
  liveBadge: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "#fff", border: "1px solid #E5E7EB", borderRadius: 100,
    padding: "7px 18px", fontSize: ".82rem", fontWeight: 600, color: "#374151",
    marginBottom: 40, boxShadow: "0 1px 3px rgba(0,0,0,.07)",
  },
  liveDot:   { display: "inline-block", width: 8, height: 8, background: "#EF4444", borderRadius: "50%" },
  wallGrid:  { columns: 4, columnGap: 20, maxWidth: 1280, margin: "0 auto", textAlign: "left" },
  wallCard: {
    background: "#fff", border: "1px solid #F3F4F6", borderRadius: 16,
    padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,.07)", transition: ".35s",
  },
  wallHeader:   { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 },
  wallAvatar: {
    width: 42, height: 42, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: ".85rem", fontWeight: 700, flexShrink: 0,
  },
  wallUser:     { flex: 1, minWidth: 0 },
  wallUserName: { fontSize: ".9rem", fontWeight: 700, color: "#111827", display: "block" },
  wallHandle:   { fontSize: ".75rem", color: "#9CA3AF" },
  wallPlatform: {
    width: 28, height: 28, borderRadius: 6,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: ".8rem", fontWeight: 800, color: "#fff", flexShrink: 0,
  },
  wallText: { fontSize: ".875rem", lineHeight: 1.65, color: "#374151", marginBottom: 14 },
  wallImgPlaceholder: {
    height: 120, borderRadius: 10, background: GFaint,
    marginBottom: 14, border: `1px solid ${GPale}`,
  },
  wallFooter: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    paddingTop: 12, borderTop: "1px solid #F3F4F6",
  },
  wallLikes: { fontSize: ".8rem", color: "#6B7280" },
  wallTime:  { fontSize: ".77rem", color: "#9CA3AF" },

  /* ── Buttons ── */
  btnOutline: {
    display: "inline-flex", alignItems: "center", gap: 10,
    border: `2px solid ${G}`, color: G, background: "transparent",
    padding: "14px 32px", borderRadius: 12, fontWeight: 600,
    fontSize: "1rem", cursor: "pointer", transition: ".3s",
  },
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: G, color: "#fff", padding: "16px 36px",
    borderRadius: 12, fontWeight: 700, fontSize: "1rem",
    textDecoration: "none", transition: ".3s",
  },
  btnGhostWhite: {
    display: "inline-flex", alignItems: "center",
    border: "2px solid rgba(255,255,255,.4)", color: "#fff",
    background: "transparent", padding: "16px 36px",
    borderRadius: 12, fontWeight: 600, fontSize: "1rem",
    textDecoration: "none", transition: ".3s",
  },

  /* ── CTA ── */
  ctaSection: {
    padding: "120px 32px",
    background: "linear-gradient(135deg, #022c22, #047857, #065F46)",
    textAlign: "center", position: "relative", overflow: "hidden",
  },
  ctaOrb1: {
    position: "absolute", borderRadius: "50%", filter: "blur(80px)",
    width: 500, height: 500, background: "rgba(52,211,153,.12)",
    top: -200, left: -100, pointerEvents: "none",
  },
  ctaOrb2: {
    position: "absolute", borderRadius: "50%", filter: "blur(80px)",
    width: 400, height: 400, background: "rgba(16,185,129,.1)",
    bottom: -150, right: -80, pointerEvents: "none",
  },
  ctaInner: { position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" },
  ctaTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800,
    color: "#fff", lineHeight: 1.15, margin: "16px 0 20px",
  },
  ctaSub: { fontSize: "1.1rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7, marginBottom: 44 },

  /* ── Footer ── */
  footer:      { background: "#111827", padding: "24px 32px" },
  footerInner: {
    maxWidth: 1280, margin: "0 auto",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexWrap: "wrap", gap: 12, fontSize: ".85rem", color: "#9CA3AF",
  },
  footerLink: { color: "#9CA3AF", textDecoration: "none", transition: "color .2s" },
};

/* ─────────────────────────────────────────────
   GLOBAL CSS — hover states, animations, responsive
───────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; color: #111827; background: #fff; overflow-x: hidden; }

  /* Slide accent bar + glow */
  .slide-inner-pseudo { position: relative; }
  .slide-inner-pseudo::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 5px; background: linear-gradient(to bottom, #10B981, #34D399);
    border-radius: 4px 0 0 4px;
  }
  .slide-inner-pseudo::after {
    content: ''; position: absolute; top: 0; right: 0;
    width: 280px; height: 280px;
    background: radial-gradient(circle, #ECFDF5, transparent 70%);
    border-radius: 50%; transform: translate(40%,-40%); pointer-events: none;
  }

  /* Hover states */
  .slider-btn-hover:hover   { border-color: #10B981 !important; color: #10B981 !important; background: #ECFDF5 !important; transform: scale(1.1); }
  .video-card-hover:hover   { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,.12) !important; }
  .wall-card-hover:hover    { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,.09) !important; border-color: #D1FAE5 !important; }
  .btn-outline-hover:hover  { background: #10B981 !important; color: #fff !important; }
  .btn-primary-hover:hover  { background: #059669 !important; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(16,185,129,.35); }
  .btn-ghost-white-hover:hover { background: rgba(255,255,255,.12) !important; }
  .footer-link-hover:hover  { color: #10B981 !important; }

  /* Live dot pulse */
  .live-dot-anim { animation: livePulse 1.2s ease infinite; }
  @keyframes livePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,.5); }
    50%       { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
  }

  /* Responsive — video grid */
  @media (max-width: 1024px) {
    div[style*="1fr 1.4fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 600px) {
    div[style*="1fr 1.4fr 1fr"]  { grid-template-columns: 1fr !important; }
    div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (max-width: 480px) {
    div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
  }

  /* Responsive — social wall */
  @media (max-width: 1200px) { div[style*="columns: 4"] { columns: 3 !important; } }
  @media (max-width: 860px)  { div[style*="columns: 4"] { columns: 2 !important; } }
  @media (max-width: 540px)  {
    div[style*="columns: 4"]        { columns: 1 !important; }
    div[style*="padding: 56px 64px"] { padding: 32px 24px !important; }
  }
`;