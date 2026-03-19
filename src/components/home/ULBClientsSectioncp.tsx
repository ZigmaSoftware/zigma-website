"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Award {
  id: number;
  source: string;
  description: string;
  href?: string;
}

interface LogoTile {
  id: string;
  name: string;
  src: string;
}

// ─── Data (UPDATED CONTENT ONLY) ──────────────────────────────────────────────

const awards: Award[] = [
  {
    id: 1,
    source: "Zigma Impact",
    href: "/awardsection",
    description:
      "Partnering with Urban Local Bodies across India to deliver scalable, technology-driven waste management and sustainability solutions.",
  },
  {
    id: 2,
    source: "Digital Transformation",
    href: "/awardsection",
    description:
      "Enabled municipalities with ERP, IoT integrations, and real-time dashboards to improve operational efficiency and compliance.",
  },
  {
    id: 3,
    source: "Operational Excellence",
    href: "/awardsection",
    description:
      "Driving measurable impact through data-driven decision making, process automation, and smart monitoring systems.",
  },
  {
    id: 4,
    source: "Sustainability",
    href: "/awardsection",
    description:
      "Supporting cities in achieving cleaner environments through intelligent waste management and circular economy practices.",
  },
  {
    id: 5,
    source: "Scalability",
    href: "/awardsection",
    description:
      "Solutions designed to scale across multiple cities, handling high-volume municipal operations with consistency and accuracy.",
  },
];

const ULB_LOGOS = import.meta.glob("../../assets/ULB Logos/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const normalizeLogoName = (value: string) =>
  value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\(\s*/g, " (")
    .replace(/\s*\)/g, ")")
    .trim();

const logoTiles: LogoTile[] = Object.entries(ULB_LOGOS)
  .map(([filePath, src]) => {
    const fileName = filePath.split("/").pop() ?? filePath;
    const name = normalizeLogoName(fileName);
    return { id: fileName, name, src };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// duplicate once
const allTiles = [...logoTiles, ...logoTiles];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AwardCard({ award }: { award: Award }) {
  return (
    <a
      href={award.href ?? "#"}
      className="group flex items-center justify-between gap-4 rounded-lg bg-card border border-border/40 px-5 py-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {award.source}
        </span>
        <p className="text-sm md:text-base leading-snug text-foreground/90 font-medium">
          {award.description}
        </p>
      </div>
      <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 transition-transform duration-300 group-hover:translate-x-1">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          />
        </svg>
      </span>
    </a>
  );
}

function LogoBadge({ tile }: { tile: LogoTile }) {
  return (
    <div className="group flex items-center justify-center rounded-lg bg-card border border-border/40 px-4 md:px-5 h-16 md:h-24 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg">
      <img
        src={tile.src}
        alt={tile.name}
        loading="lazy"
        className="max-h-full max-w-full w-auto object-contain opacity-95 transition-opacity duration-300 ease-out group-hover:opacity-100"
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ULBClientsSectioncp() {
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  const paused1 = useRef(false);
  const paused2 = useRef(false);
  const paused3 = useRef(false);

  const pos1Ref = useRef(0);
  const pos2Ref = useRef(0);
  const pos3Ref = useRef(0);

  // 👉 Show top 3 impact statements
  const leftAwards = awards.slice(0, 3);

  const col1Tiles = allTiles.filter((_, idx) => idx % 3 === 0);
  const col2Tiles = allTiles.filter((_, idx) => idx % 3 === 1);
  const col3Tiles = allTiles.filter((_, idx) => idx % 3 === 2);

  useEffect(() => {
    const speed = 0.6;

    function animate(ref: any, pos: any, paused: any, dir: "up" | "down") {
      function step() {
        if (ref.current && !paused.current) {
          const max = ref.current.scrollHeight / 2;

          if (dir === "up") {
            pos.current -= speed;
            if (pos.current <= 0) pos.current = max;
          } else {
            pos.current += speed;
            if (pos.current >= max) pos.current = 0;
          }

          ref.current.scrollTop = pos.current;
        }
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    setTimeout(() => {
      if (col1Ref.current) {
        pos1Ref.current = col1Ref.current.scrollHeight / 2;
        col1Ref.current.scrollTop = pos1Ref.current;
      }
      if (col3Ref.current) {
        pos3Ref.current = col3Ref.current.scrollHeight / 2;
        col3Ref.current.scrollTop = pos3Ref.current;
      }
    }, 100);

    animate(col1Ref, pos1Ref, paused1, "up");
    animate(col2Ref, pos2Ref, paused2, "down");
    animate(col3Ref, pos3Ref, paused3, "up");

  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="container-main relative flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">

        {/* LEFT PANEL */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col gap-8">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
              Our ULB Clients
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Trusted by <span className="text-primary">Urban Local Bodies</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              Empowering municipalities with scalable digital infrastructure and sustainable waste management solutions.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {leftAwards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))} 
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative flex-1 w-full lg:w-1/2 h-[520px]">
          <div className="h-full flex gap-6">

            <div
              ref={col1Ref}
              className="flex-1 overflow-hidden"
              onMouseEnter={() => (paused1.current = true)}
              onMouseLeave={() => (paused1.current = false)}
            >
              <div className="flex flex-col gap-6">
                {col1Tiles.map((tile, i) => (
                  <LogoBadge key={i} tile={tile} />
                ))}
              </div>
            </div>

            <div
              ref={col2Ref}
              className="flex-1 overflow-hidden"
              onMouseEnter={() => (paused2.current = true)}
              onMouseLeave={() => (paused2.current = false)}
            >
              <div className="flex flex-col gap-6">
                {col2Tiles.map((tile, i) => (
                  <LogoBadge key={i} tile={tile} />
                ))}
              </div>
            </div>

            <div
              ref={col3Ref}
              className="flex-1 overflow-hidden"
              onMouseEnter={() => (paused3.current = true)}
              onMouseLeave={() => (paused3.current = false)}
            >
              <div className="flex flex-col gap-6">
                {col3Tiles.map((tile, i) => (
                  <LogoBadge key={i} tile={tile} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}