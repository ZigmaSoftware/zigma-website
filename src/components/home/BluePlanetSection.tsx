import { ExternalLink } from "lucide-react";
import worldMapUrl from "../../assets/website/BP-worldmap.svg";

type Marker = {
  name: string;
  coords: [number, number];
  labelPos?: "right" | "left" | "top" | "bottom";
};

const markers: Marker[] = [
  { name: "Canada", coords: [-130, 40], labelPos: "right" },
  { name: "USA", coords: [-110, 20], labelPos: "right" },
  { name: "Portugal", coords: [-19.5, 18 ], labelPos: "left" },
  { name: "UK", coords: [-15, 33], labelPos: "right" },
  { name: "Spain", coords: [-13.5, 15], labelPos: "right" },
  { name: "Kenya", coords: [20, -24.5], labelPos: "right" },
  { name: "Nepal", coords: [70, -1], labelPos: "right" },
  { name: "India", coords: [65, -10.6], labelPos: "right" },
  { name: "Malaysia", coords: [87, -19], labelPos: "left" },
  { name: "Singapore", coords: [103.8, 1.35], labelPos: "right" },
  { name: "Philippines", coords: [121.8, 12.9], labelPos: "right" },
  { name: "Australia", coords: [133.8, -25.3], labelPos: "right" },
  { name: "New Zealand", coords: [174, -41], labelPos: "left" },
];

const MAP_WIDTH = 1061;
const MAP_HEIGHT = 520;

function project([lon, lat]: [number, number]): { x: number; y: number } {
  const x = ((lon + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return { x, y };
}

const BluePlanetSection = () => {
  return (
    <section className="section-padding scroll-mt-24 lg:scroll-mt-28 lg:snap-start bg-background">
      <div className="container-main">
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Our Parent Company
          </div>
          <h2 className="mt-3 mb-6 text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Blue Planet Environmental{" "}
            <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
            Zigma is proud to be part of{" "}
            <a
              href="https://www.blueplanet.asia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
            >
              Blue Planet Environmental Solutions
              <ExternalLink className="w-3 h-3" />
            </a>
            , a Singapore-headquartered company and one of Asia's fastest-growing
            integrated waste management enterprises.
          </p>

          <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
            Founded in 2017, Blue Planet deploys sustainable technologies that
            enable organisations globally to transition from a linear to a
            circular economy, with a comprehensive suite of solutions spanning
            the entire waste management value chain.
          </p>

          <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
            Blue Planet's operations extend from the point of waste generation
            through to collection, segregation, treatment, and processing, right
            through to the sale of energy and other waste-derived fuels and
            products.
          </p>

          <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg italic">
            Guided by the United Nations Sustainable Development Goals and a
            commitment to the triple bottom line of People, Planet, and
            Prosperity, Blue Planet drives decarbonisation and promotes
            environmental sustainability across Asia, striving to achieve zero
            waste to landfill and a net positive impact for current and future
            generations.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="https://www.blueplanet.asia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Visit Blue Planet
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/blue-planet-environmental-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="relative mt-12 mx-auto w-full max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl p-3 sm:p-4">
            <img
              src={worldMapUrl}
              alt="World map showing Blue Planet presence"
              loading="lazy"
              className="block w-full h-auto opacity-95"
            />

            <div className="absolute inset-0 pointer-events-none">
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="absolute inset-0 h-auto w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {markers.map((m) => {
                  const { x, y } = project(m.coords);
                  const labelOffset =
                    m.labelPos === "left"
                      ? { dx: -9, dy: 3, anchor: "end" as const }
                      : m.labelPos === "top"
                        ? { dx: 0, dy: -8, anchor: "middle" as const }
                        : m.labelPos === "bottom"
                          ? { dx: 0, dy: 12, anchor: "middle" as const }
                          : { dx: 9, dy: 3, anchor: "start" as const };

                  return (
                    <g key={m.name}>
                      <circle
                        cx={x}
                        cy={y}
                        r={6}
                        fill="hsl(var(--primary) / 0.14)"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={3.2}
                        fill="hsl(var(--primary))"
                      />
                      <text
                        x={x + labelOffset.dx}
                        y={y + labelOffset.dy}
                        fontSize={10}
                        fill="hsl(var(--foreground))"
                        textAnchor={labelOffset.anchor}
                        style={{
                          fontFamily: "inherit",
                          paintOrder: "stroke",
                        }}
                        stroke="hsl(var(--background))"
                        strokeWidth={2.6}
                        strokeLinejoin="round"
                      >
                        {m.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BluePlanetSection;
