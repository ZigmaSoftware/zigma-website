import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  Beaker,
  Factory,
  Map,
  MountainSnow,
  Shovel,
  Sprout,
  Trash2,
  Users2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import bgstat from "../../assets/website/background-1.png";

interface ImpactMetric {
  id: string;
  icon: LucideIcon;
  x: number;
  y: number; 
  dx?: number;
  dy?: number;
  revealStart: number;
  revealEnd: number;
  titleLines: string[];
  descLines: string[];
}

const CHAIN_PATH =
  "M 63,158 L 9,104 Q -3,92 9,80 L 71,18 Q 83,6 95,18 L 157,80 Q 169,92 157,104 L 95,166 Q 83,178 95,190 L 157,252 Q 169,264 181,252 L 243,190 Q 255,178 243,166 L 181,104 Q 169,92 181,80 L 243,18 Q 255,6 267,18 L 329,80 Q 341,92 329,104 L 267,166 Q 255,178 267,190 L 329,252 Q 341,264 353,252 L 415,190 Q 427,178 415,166 L 353,104 Q 341,92 353,80 L 415,18 Q 427,6 439,18 L 501,80 Q 513,92 501,104 L 439,166 Q 427,178 439,190 L 501,252 Q 513,264 525,252 L 587,190 Q 599,178 587,166 L 525,104 Q 513,92 525,80 L 587,18 Q 599,6 611,18 L 673,80 Q 685,92 673,104 L 611,166 Q 599,178 611,190 L 673,252 Q 685,264 697,252 L 759,190 Q 771,178 759,166 L 697,104";

const VIEWBOX = {
  minX: -10,
  minY: 5,
  width: 790,
  height: 340,
} as const;
const SVG_VIEWBOX = `${VIEWBOX.minX} ${VIEWBOX.minY} ${VIEWBOX.width} ${VIEWBOX.height}`;
const CHAIN_ANIMATION_MS = 60000;
const CHAIN_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const ICON_SIZE = 30;
const ICON_GAP = 13;
const TITLE_LINE_HEIGHT = 13;
const DIVIDER_GAP_TOP = 12;
const DIVIDER_GAP_BOTTOM = 11;
const DESC_LINE_HEIGHT = 9;
const DIVIDER_WIDTH = 66;
const TITLE_FONT_SIZE = 11.5;
const DESC_FONT_SIZE = 9;
const DESC_FONT_WEIGHT = 500;
const metrics: ImpactMetric[] = [
  {
    id: "waste-processed",
    icon: Trash2,
    x: 83,
    y: 90,
    dx: 2,
    revealStart: 0.02,
    revealEnd: 0.03,
    titleLines: ["11.71+ Million", "Tons"],
    descLines: ["Waste", "processed"],
  },

  {
    id: "soil-repurposed",
    icon: Sprout,
    x: 173,
    y: 170,
    dx: -2,
    revealStart: 0.04,
    revealEnd: 0.05,
    titleLines: ["7.9+ Million Tons", "soil repurposed"],
    descLines: ["For sustainable", "earthfilling"],
  },

  {
    id: "daily-capacity",
    icon: Factory,
    x: 258,
    y: 82,
    dy: 2,
    revealStart: 0.06,
    revealEnd: 0.07,
    titleLines: ["27,000+", "Metric Tons"],
    descLines: ["Daily waste processing", "capacity"],
  },

  {
    id: "stones-reused",
    icon: MountainSnow,
    x: 343,
    y: 164,
    dx: 1,
    dy: 2,
    revealStart: 0.08,
    revealEnd: 0.09,
    titleLines: ["3.2+ Million Tons", "stones reused"],
    descLines: ["Minimizing dependence", "on materials"],
  },

  {
    id: "rdf",
    icon: Beaker,
    x: 430,
    y: 89,
    dx: -1,
    revealStart: 0.11,
    revealEnd: 0.12,
    titleLines: ["2.9+ Million Tons"],
    descLines: ["RDF used as", "alternative fuel"],
  },
  {
    id: "landfills",
    icon: Shovel,
    x: 515,
    y: 164,
    dx: -2,
    revealStart: 0.14,
    revealEnd: 0.15,
    titleLines: ["70+ Landfills"],
    descLines: ["Remediation projects", "completed"],
  },

  {
    id: "land-reclaimed",
    icon: Map,
    x: 605,
    y: 80,
    dy: 2,
    revealStart: 0.17,
    revealEnd: 0.18,
    titleLines: ["850+ Acres"],
    descLines: ["Land reclaimed"],
  },

  {
    id: "employees",
    icon: Users2,
    x: 689,
    y: 165,
    dx: -5,
    dy: 2,
    revealStart: 0.20,
    revealEnd: 0.21,
    titleLines: ["2,000+", "Employees"],
    descLines: ["Working for sustainable", "future"],
  },
];

const renderMultilineText = (
  lines: string[],
  startY: number,
  lineHeight: number,
  className: string,
  style?: CSSProperties,
) => (
  <text textAnchor="middle" className={className} style={style}>
    {lines.map((line, index) => (
      <tspan key={`${line}-${index}`} x="0" y={startY + index * lineHeight}>
        {line}
      </tspan>
    ))}
  </text>
);

const clampProgress = (value: number) => Math.max(0, Math.min(1, value));

const formatProgressPercent = (value: number) => {
  const percent = clampProgress(value) * 100;
  return `${Number(percent.toFixed(2))}%`;
};

const getMetricRevealAnimationName = (metric: ImpactMetric, prefix: string) =>
  `${prefix}-${metric.id}-reveal`;

const getMetricRevealKeyframes = (metric: ImpactMetric, prefix: string) => {
  const start = formatProgressPercent(metric.revealStart);
  const end = formatProgressPercent(metric.revealEnd);

  return `
    @keyframes ${getMetricRevealAnimationName(metric, prefix)} {
      0%, ${start} {
        opacity: 0;
        transform: translateY(10px) scale(0.94);
      }
      ${end}, 100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `;
};

const getMetricRevealAnimation = (metric: ImpactMetric, prefix: string) =>
  `${getMetricRevealAnimationName(metric, prefix)} ${CHAIN_ANIMATION_MS}ms ${CHAIN_EASING} both`;

const MobileMetricsGrid = () => (
  <div className="grid gap-4 sm:grid-cols-2 md:hidden">
    {metrics.map((metric) => {
      const Icon = metric.icon;

      return (
        <article
          key={metric.id}
          className="rounded-2xl border border-border/70 bg-background/90 p-5 shadow-sm backdrop-blur-sm"
        >
          <Icon
            width={24}
            height={24}
            strokeWidth={1.75}
            className="text-foreground/70"
            aria-hidden="true"
          />
          <h3 className="mt-4 text-lg font-bold leading-tight text-foreground">
            {metric.titleLines.join(" ")}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {[...metric.descLines].join(" ")}
          </p>
        </article>
      );
    })}
  </div>
);

const ChainGraphic = ({
  hasAnimated,
  prefersReducedMotion,
}: {
  hasAnimated: boolean;
  prefersReducedMotion: boolean;
}) => {
  const graphicId = useId().replace(/:/g, "");
  const chainAnimationName = `${graphicId}-chain-draw`;
  const metricAnimationPrefix = `${graphicId}-metric`;
  const titleId = `${graphicId}-chain-graphic-title`;
  const shapeId = `${graphicId}-stats-chain-shape`;
  const metricRevealKeyframes = metrics
    .map((metric) => getMetricRevealKeyframes(metric, metricAnimationPrefix))
    .join("\n");
  const shouldAnimate = hasAnimated && !prefersReducedMotion;
  const chainStrokeStyle = {
    strokeDasharray: 4000,
    strokeDashoffset: prefersReducedMotion ? 0 : 4000,
    animation: shouldAnimate
      ? `${chainAnimationName} ${CHAIN_ANIMATION_MS}ms ${CHAIN_EASING} forwards`
      : undefined,
  };

  return (
    <div className="pb-2">
      <style>{`
        @keyframes ${chainAnimationName} {
          to {
            stroke-dashoffset: 0;
          }
        }
        ${metricRevealKeyframes}
      `}</style>
      <svg
        viewBox={SVG_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-labelledby={titleId}
        className="mx-auto block w-full max-w-[1080px] overflow-visible"
      >
        <title id={titleId}>Animated diamond chain with ecological metrics</title>
        <defs>
          <path id={shapeId} d={CHAIN_PATH} />
        </defs>

        <use
          href={`#${shapeId}`}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={chainStrokeStyle}
        />
        <use
          href={`#${shapeId}`}
          fill="none"
          stroke="hsl(var(--background))"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={chainStrokeStyle}
        />

        {metrics.map((metric) => {
          const Icon = metric.icon;
          const metricX = metric.x + (metric.dx ?? 0);
          const metricY = metric.y + (metric.dy ?? 0);
          const titleHeight = (metric.titleLines.length - 1) * TITLE_LINE_HEIGHT;
          const descHeight = (metric.descLines.length - 1) * DESC_LINE_HEIGHT;
          const totalHeight =
            ICON_SIZE +
            ICON_GAP +
            titleHeight +
            DIVIDER_GAP_TOP +
            DIVIDER_GAP_BOTTOM +
            descHeight;
          const topY = -totalHeight / 2;
          const iconY = topY + ICON_SIZE / 2;
          const titleStartY = topY + ICON_SIZE + ICON_GAP;
          const dividerY = titleStartY + titleHeight + DIVIDER_GAP_TOP;
          const descStartY = dividerY + DIVIDER_GAP_BOTTOM;

          return (
            <g
              key={metric.id}
              transform={`translate(${metricX}, ${metricY})`}
            >
              <g
                style={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  transformOrigin: "center",
                  transformBox: "fill-box",
                  animation: shouldAnimate
                    ? getMetricRevealAnimation(metric, metricAnimationPrefix)
                    : undefined,
                }}
              >
                <Icon
                  x={-ICON_SIZE / 2}
                  y={iconY - ICON_SIZE / 2}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  strokeWidth={1.35}
                  className="text-foreground/70"
                />
                {renderMultilineText(
                  metric.titleLines,
                  titleStartY,
                  TITLE_LINE_HEIGHT,
                  "fill-slate-800 font-bold dark:fill-foreground",
                  { fontSize: TITLE_FONT_SIZE },
                )}
                <line
                  x1={-DIVIDER_WIDTH / 2}
                  y1={dividerY}
                  x2={DIVIDER_WIDTH / 2}
                  y2={dividerY}
                  stroke="hsl(var(--foreground) / 0.3)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                {renderMultilineText(
                  metric.descLines,
                  descStartY,
                  DESC_LINE_HEIGHT,
                  "fill-foreground font-medium",
                  { fontSize: DESC_FONT_SIZE, fontWeight: DESC_FONT_WEIGHT },
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasAnimated(true);
      return;
    }

    const element = statsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const videoSrc = prefersReducedMotion
    ? "https://www.youtube.com/embed/tf9xo3Q0x3Q?rel=0&modestbranding=1&playsinline=1"
    : "https://www.youtube.com/embed/tf9xo3Q0x3Q?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=tf9xo3Q0x3Q&rel=0&modestbranding=1&playsinline=1&vq=hd1080";

  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-scroll opacity-[0.18] md:bg-fixed"
        style={{ backgroundImage: `url(${bgstat})` }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-background/70" />

      <div className="container-main relative z-10 py-16 md:py-10">
        <div className="mb-10 text-center md:mb-14">
          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-muted-foreground md:text-sm">
            Why Zigma
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Proven Ecological <span className="text-primary">Outcomes</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            The waste management company specializes in providing innovative, eco-friendly
            solutions that reduce carbon footprint and optimize sustainable impact for clients
            worldwide.
          </p>
        </div>

        <div ref={statsRef} className="w-full">
          <MobileMetricsGrid />
          <div className="hidden md:block">
            <ChainGraphic
              hasAnimated={hasAnimated}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>

      <div className="group relative mx-auto w-full overflow-hidden border border-border shadow-xl">
        <div className="relative w-full pt-[56.25%]">
          <iframe
            src={videoSrc}
            title="Zigma avpn summit Video"
            className="absolute inset-0 h-full w-full"
            frameBorder={0}
            loading="lazy"
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
