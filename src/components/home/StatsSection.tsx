import { useEffect, useRef, useState } from "react";
import bgstat from "../../assets/website/background-1.png";
import { Trash2, Factory, Beaker, Map, Sprout, MountainSnow, Shovel, Users2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── Layout constants ───────────────────────────────────────────────────────────
const D_SIZE      = 288;
const SQUARE_SIZE = Math.round(D_SIZE / Math.SQRT2);
const CENTER_OFF  = Math.round((D_SIZE - SQUARE_SIZE) / 2);
const BR          = 30;
const BORDER      = 3;
const INNER_GAP   = 5;
const INNER_BDR   = 2;
const D_GAP       = .5;
const CONTENT_W   = Math.round(SQUARE_SIZE * 0.72);

const GRADIENT = "linear-gradient(135deg, rgba(var(--foreground), 0.2) 0%, rgba(var(--foreground), 0.3) 100%)";

const BR1 = BR;
const BR2 = Math.max(2, BR - BORDER);
const BR3 = Math.max(2, BR - BORDER - INNER_GAP);
const BR4 = Math.max(2, BR - BORDER - INNER_GAP - INNER_BDR);

const ROW_OFFSET  = Math.round((D_SIZE + D_GAP) / 2);
const ROW_OVERLAP = Math.round(D_SIZE * 0.44);
const TOP_ROW_W   = 4 * D_SIZE + 3 * D_GAP;
const CONTAINER_W = ROW_OFFSET + TOP_ROW_W;
const CONTAINER_H = 2 * D_SIZE - ROW_OVERLAP;

// ── Data ──────────────────────────────────────────────────────────────────────
interface ImpactStat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  line2?: string;
  desc: string;
}

const stats: ImpactStat[] = [
  { icon: Trash2,       value: 11.71, suffix: "+ Million",  line2: "Tons", desc: "Waste processed" },
  { icon: Factory,      value: 20000, suffix: "+ Metric",   line2: "Tons", desc: "Daily waste processing capacity" },
  { icon: Beaker,       value: 2,     suffix: "+ Million",  line2: "Tons", desc: "RDF used as alternative fuel" },
  { icon: Map,          value: 650,   suffix: "+",    line2: "Acres", desc: "Land reclaimed" },
  { icon: Sprout,       value: 4.95,  suffix: "+ Million Tons",  line2: "soil repurposed", desc: "For sustainable earthfilling" },
  { icon: MountainSnow, value: 2.18,  suffix: "+ Million Tons",  line2: "stones reused",   desc: "Minimizing dependence on materials" },
  { icon: Shovel,       value: 30,    suffix: "+",     line2: "Landfills", desc: "Remediation projects completed" },
  { icon: Users2,       value: 2000,  suffix: "+",     line2: "Employees", desc: "Working for sustainable future" },
];

const topStats    = stats.slice(0, 4);
const bottomStats = stats.slice(4);

// ── CountUp ───────────────────────────────────────────────────────────────────
const CountUp = ({ end, run }: { end: number; run: number }) => {
  const [count, setCount] = useState(0);
  const decimals = Number.isInteger(end) ? 0 : (end.toString().split(".")[1] ?? "").length;

  useEffect(() => {
    setCount(0);
    let raf: number;
    let startTime: number;
    const duration = 5000;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const factor = 10 ** decimals;
      setCount(Math.round(eased * end * factor) / factor);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [run, decimals, end]);

  return (
    <>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </>
  );
};

// ── Diamond card ──────────────────────────────────────────────────────────────
interface DiamondCardProps extends ImpactStat {
  index: number;
  isVisible: boolean;
  animRun: number;
}

const DiamondCard = ({ icon: Icon, value, suffix, line2, desc, index, isVisible, animRun }: DiamondCardProps) => {
  return (
    <div
      role="img"
      aria-label={`${value}${suffix}${line2 ? " " + line2 : ""} — ${desc}`}
      className="relative flex-shrink-0 transition-all duration-[550ms] ease-out"
      style={{
        width: D_SIZE,
        height: D_SIZE,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      <div
        className="absolute box-border border-2 border-foreground/60"
        style={{
          width: SQUARE_SIZE,
          height: SQUARE_SIZE,
          top: CENTER_OFF,
          left: CENTER_OFF,
          transform: "rotate(45deg)",
          borderRadius: BR1,
          background: GRADIENT,
          padding: BORDER,
        }}
      >
        <div
          className="w-full h-full bg-background box-border"
          style={{ borderRadius: BR2, padding: INNER_GAP }}
        >
          <div
            className="w-full h-full box-border border-2 border-foreground/30"
            style={{
              borderRadius: BR3,
              background: GRADIENT,
              padding: INNER_BDR,
            }}
          >
            <div
              className="w-full h-full bg-background flex items-center justify-center overflow-hidden"
              style={{ borderRadius: BR4 }}
            >
              <div
                className="flex flex-col items-center justify-center text-center flex-shrink-0"
                style={{ transform: "rotate(-45deg)", width: CONTENT_W }}
              >
                <Icon size={36} strokeWidth={1.25} className="mb-2 flex-shrink-0 text-foreground/60" />
                <div className="m-0 font-bold text-slate-800 dark:text-foreground leading-tight whitespace-nowrap">
                  <p className="m-0">
                    <span className="text-2xl">{isVisible ? <CountUp end={value} run={animRun} /> : "0"}</span>
                    <span className="text-md">{suffix}</span>
                  </p>
                  {line2 && <p className="m-0 text-md">{line2}</p>}
                </div>
                <div className="w-full border-t border-foreground/30 dark:border-foreground/30 my-2" />
                <p className="m-0 text-sm  text-slate-500 dark:text-muted-foreground leading-snug">
                  {desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Scaled Diamond Grid ──────────────────────────────────────────────────────
const ScaledDiamondGrid = ({ isVisible, animRun }: { isVisible: boolean; animRun: number }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      setScale(Math.min(1, available / CONTAINER_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full flex justify-center py-4">
      <div
        style={{
          width: CONTAINER_W * scale,
          height: CONTAINER_H * scale,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CONTAINER_W,
            height: CONTAINER_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div className="absolute top-0 left-0 flex" style={{ gap: D_GAP }}>
            {topStats.map((s, i) => (
              <DiamondCard key={s.desc} {...s} index={i} isVisible={isVisible} animRun={animRun} />
            ))}
          </div>
          <div
            className="absolute flex"
            style={{ gap: D_GAP, top: D_SIZE - ROW_OVERLAP, left: ROW_OFFSET }}
          >
            {bottomStats.map((s, i) => (
              <DiamondCard key={s.desc} {...s} index={i + 4} isVisible={isVisible} animRun={animRun} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animRun, setAnimRun]     = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setAnimRun(r => r + 1);
      },
      { threshold: 0.15 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-[0.18]"
        style={{ backgroundImage: `url(${bgstat})` }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-background/70" />

      <div className="container-main relative z-10 py-16 md:py-10">
        <div className="text-center mb-10 md:mb-14">
          <p className="mt-8 text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Why Zigma
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Proven Ecological <span className="text-primary">Outcomes</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-sm md:text-lg leading-relaxed">
            The waste management company specializes in providing innovative, eco-friendly
            solutions that reduce carbon footprint and optimize sustainable impact for
            clients worldwide.
          </p>
        </div>

        <div ref={statsRef} className="w-full">
          <ScaledDiamondGrid isVisible={isVisible} animRun={animRun} />
        </div>
      </div>

      <div className="group relative mx-auto w-full overflow-hidden border border-border shadow-xl">
        <div className="relative w-full pt-[56.25%]">
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/tf9xo3Q0x3Q?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=tf9xo3Q0x3Q&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
            title="Zigma avpn summit Video"
            className="absolute inset-0 h-full w-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
