import { useEffect, useRef, useState } from "react";
import bgstat from "../../assets/website/background-1.png";
import { MapPin, Landmark, FlaskConical, Globe, Leaf, Mountain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── Layout constants ───────────────────────────────────────────────────────────
const D_SIZE      = 248;                                  // visual diamond width = height (px)
const SQUARE_SIZE = Math.round(D_SIZE / Math.SQRT2);      // rotated square side ≈ 175 px
const CENTER_OFF  = Math.round((D_SIZE - SQUARE_SIZE) / 2); // centering offset ≈ 36 px
const BR          = 29;   // border-radius on the square → rounded diamond corners
const BORDER      = 2.5;  // outer gradient ring thickness (px)
const INNER_GAP   = 6;    // white gap between the two rings (px)
const INNER_BDR   = 2;    // inner gradient ring thickness (px)
const D_GAP       = 10;   // gap between diamonds in same row (px)

// Gradient matching reference: warm olive-green → cool blue-gray
const GRADIENT = "linear-gradient(135deg, #8fa870 0%, #94a8be 100%)";

// ── Border-radius cascade ─────────────────────────────────────────────────────
const BR1 = BR;                              // outer ring      = 22
const BR2 = Math.max(2, BR - BORDER);        // white gap       = 20
const BR3 = Math.max(2, BR - BORDER - INNER_GAP); // inner ring = 15
const BR4 = Math.max(2, BR - BORDER - INNER_GAP - INNER_BDR); // content = 13

// ── Staggered grid constants ──────────────────────────────────────────────────
const ROW_OFFSET  = Math.round((D_SIZE + D_GAP) / 2);
const ROW_OVERLAP = Math.round(D_SIZE * 0.44);
const TOP_ROW_W   = 3 * D_SIZE + 2 * D_GAP;
const CONTAINER_W = ROW_OFFSET + TOP_ROW_W;
const CONTAINER_H = 2 * D_SIZE - ROW_OVERLAP;

// ── Data ──────────────────────────────────────────────────────────────────────
const stats = [
  { icon: MapPin,       value: 2000,  suffix: "+",  label: "Acres Land Cleared" },
  { icon: Landmark,     value: 55,    suffix: "+",  label: "Landfills Projects Completed" },
  { icon: FlaskConical, value: 2.5,   suffix: "M+", label: "Tonnes RDF" },
  { icon: Globe,        value: 170,   suffix: "+",  label: "Projects in 15 Countries" },
  { icon: Leaf,         value: 8,     suffix: "M+", label: "CO2 Emissions Reduced" },
  { icon: Mountain,     value: 30000, suffix: "+",  label: "MT Daily Waste Processing" },
];

const topStats    = stats.slice(0, 3);
const bottomStats = stats.slice(3);

// ── CountUp ───────────────────────────────────────────────────────────────────
const CountUp = ({
  end,
  duration = 4200,
  separator = ",",
}: {
  end: number;
  duration?: number;
  separator?: string;
}) => {
  const [count, setCount] = useState(0);
  const decimalPlaces = Number.isInteger(end)
    ? 0
    : Math.min(2, (end.toString().split(".")[1] || "").length);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const factor = 10 ** decimalPlaces;
      setCount(Math.round(easeOutQuart * end * factor) / factor);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, decimalPlaces]);

  return (
    <>
      {count.toLocaleString(undefined, {
        useGrouping: separator.length > 0,
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })}
    </>
  );
};

// ── Diamond card ──────────────────────────────────────────────────────────────
interface DiamondCardProps {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  index: number;
  isVisible: boolean;
  animationRun: number;
}

// Width of the un-rotated content block that sits inside the diamond
const CONTENT_W = Math.round(SQUARE_SIZE * 0.62); // ≈ 109 px

const DiamondCard = ({
  icon: Icon,
  value,
  suffix,
  label,
  index,
  isVisible,
  animationRun,
}: DiamondCardProps) => (
  <div
    aria-label={`${value}${suffix} ${label}`}
    role="img"
    className="relative flex-shrink-0"
    style={{
      width:      D_SIZE,
      height:     D_SIZE,
      opacity:    isVisible ? 1 : 0,
      transform:  isVisible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.55s ease-out ${index * 0.08}s, transform 0.55s ease-out ${index * 0.08}s`,
    }}
  >
    {/*
      Rounded square rotated 45° → produces a diamond with rounded corners.
      Each nesting level uses padding to create a visible "ring":
        gradient bg + padding  →  outer border ring
        bg-background + padding →  white gap
        gradient bg + padding  →  inner border ring
        bg-background          →  content background
    */}
    <div
      style={{
        position:     "absolute",
        width:        SQUARE_SIZE,
        height:       SQUARE_SIZE,
        top:          CENTER_OFF,
        left:         CENTER_OFF,
        transform:    "rotate(45deg)",
        borderRadius: BR1,
        background:   GRADIENT,
        padding:      BORDER,
        boxSizing:    "border-box",
      }}
    >
      {/* ── White gap ring ── */}
      <div
        className="bg-background"
        style={{
          width:        "100%",
          height:       "100%",
          borderRadius: BR2,
          padding:      INNER_GAP,
          boxSizing:    "border-box",
        }}
      >
        {/* ── Inner gradient ring ── */}
        <div
          style={{
            width:        "100%",
            height:       "100%",
            borderRadius: BR3,
            background:   GRADIENT,
            padding:      INNER_BDR,
            boxSizing:    "border-box",
          }}
        >
          {/* ── Content background ── */}
          <div
            className="bg-background"
            style={{
              width:          "100%",
              height:         "100%",
              borderRadius:   BR4,
              position:       "relative",
              overflow:       "hidden",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
            }}
          >
            {/*
              Counter-rotate -45° so text/icon appear upright.
              Fixed width keeps text from wrapping unexpectedly.
            */}
            <div
              className="flex flex-col items-center justify-center text-center"
              style={{
                transform:  "rotate(-45deg)",
                width:      CONTENT_W,
                flexShrink: 0,
                gap:        3,
              }}
            >
              <Icon
                size={32}
                strokeWidth={1.5}
                className="flex-shrink-0 text-foreground/75"
              />
              <dd className="m-0 text-lg font-bold tracking-tight text-slate-900 dark:text-foreground leading-tight">
                {isVisible ? (
                  <CountUp key={`${label}-${animationRun}`} end={value} />
                ) : (
                  "0"
                )}
                <span className="text-primary ml-0.5">{suffix}</span>
              </dd>
              <dt className="text-xs font-semibold text-slate-600 dark:text-muted-foreground leading-tight list-none">
                {label}
              </dt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Section ───────────────────────────────────────────────────────────────────
const StatsSection = () => {
  const [isVisible, setIsVisible]       = useState(false);
  const [animationRun, setAnimationRun] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationRun((prev) => prev + 1);
          return;
        }
        setIsVisible(false);
      },
      { threshold: 0.35 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-background"
      data-anim-start="top 90%"
      data-anim-duration="1.1"
    >
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-[0.18]"
        style={{ backgroundImage: `url(${bgstat})` }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-background/70" />

      <div className="container-main relative z-10 py-16 md:py-10">
        {/* Section header */}
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

        {/* Staggered diamond grid — horizontally scrollable on small screens */}
        <div className="flex justify-center overflow-x-auto scrollbar-hide py-4">
          <div
            ref={statsRef}
            className="relative flex-shrink-0"
            style={{ width: CONTAINER_W, height: CONTAINER_H }}
          >
            {/* Top row */}
            <div className="absolute top-0 left-0 flex" style={{ gap: D_GAP }}>
              {topStats.map((s, i) => (
                <DiamondCard
                  key={s.label}
                  {...s}
                  index={i}
                  isVisible={isVisible}
                  animationRun={animationRun}
                />
              ))}
            </div>

            {/* Bottom row — shifted right and overlapping */}
            <div
              className="absolute flex"
              style={{ gap: D_GAP, top: D_SIZE - ROW_OVERLAP, left: ROW_OFFSET }}
            >
              {bottomStats.map((s, i) => (
                <DiamondCard
                  key={s.label}
                  {...s}
                  index={i + 3}
                  isVisible={isVisible}
                  animationRun={animationRun}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded video */}
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
