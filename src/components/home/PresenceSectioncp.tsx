import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import indiaMap from "@/assets/map-india.png";

const MAP_BOUNDS = {
  north: 36.3,
  south: 2.7,
  west: 61.0,
  east: 98.5,
};

type PresenceLocation = {
  name: string;
  lat: number;
  lng: number;
  ongoing: number;
  completed: number;
  description: string;
  labelSide?: "left" | "right";
};

function latLngToPercent(lat: number, lng: number) {
  const top = ((MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100;
  const left = ((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100;
  return { top: +top.toFixed(2), left: +left.toFixed(2) };
}

const presenceLocations: PresenceLocation[] = [
  {
    name: "Tamil Nadu",
    lat: 7,
    lng: 74.6,
    ongoing: 3,
    completed: 5,
    description: "Leading biomining initiatives in southern India.",
    labelSide: "right",
  },
  {
    name: "Kerala",
    lat: 6.2,
    lng: 71.2,
    ongoing: 2,
    completed: 4,
    description: "Sustainable waste management projects.",
    labelSide: "left",
  },
  {
    name: "Andhra Pradesh",
    lat: 11.5,
    lng: 74.5,
    ongoing: 4,
    completed: 3,
    description: "Advanced landfill reclamation efforts.",
    labelSide: "right",
  },
  {
    name: "Gujarat",
    lat: 21,
    lng: 66,
    ongoing: 3,
    completed: 6,
    description: "Pioneering environmental restoration.",
    labelSide: "right",
  },
  {
    name: "Maharashtra",
    lat: 16.5,
    lng: 70,
    ongoing: 5,
    completed: 7,
    description: "Major urban waste transformation projects.",
    labelSide: "right",
  },
  {
    name: "Assam",
    lat: 25,
    lng: 93,
    ongoing: 2,
    completed: 3,
    description: "Northeast India's green initiatives.",
    labelSide: "left",
  },
  {
    name: "Uttar Pradesh",
    lat: 24,
    lng: 79,
    ongoing: 2,
    completed: 2,
    description: "Scaling landfill reclamation across key urban centers.",
    labelSide: "left",
  },
  {
    name: "Telangana",
    lat: 14.3,
    lng: 75,
    ongoing: 1,
    completed: 1,
    description: "New projects focused on sustainable waste recovery.",
    labelSide: "left",
  },
  // {
  //   name: "Visakhapatnam",
  //   lat: 17.69,
  //   lng: 83.22,
  //   ongoing: 1,
  //   completed: 1,
  //   description: "Coastal operations supporting circular city initiatives.",
  //   labelSide: "left",
  // },
  // {
  //   name: "Guwahati",
  //   lat: 26.14,
  //   lng: 91.74,
  //   ongoing: 1,
  //   completed: 1,
  //   description: "Expanding presence in the Northeast for greener outcomes.",
  //   labelSide: "left",
  // },
];

const DEV_MODE = false;

const PresenceSectioncp = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredPinIndex, setHoveredPinIndex] = useState<number | null>(null);

  const handleDevClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!DEV_MODE || !mapRef.current) {
      return;
    }
    const rect = mapRef.current.getBoundingClientRect();
    const xPct = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2);
    const yPct = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2);
    console.log(`Clicked -> top: ${yPct}% left: ${xPct}%`);
  };

  return (
    <motion.section
      data-anim-start="top 90%"
      data-anim-duration="1.1"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-main section-padding">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">Pan-India Presence</p>

            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Transforming Landfills <span className="text-primary">Across India</span>
            </h2>

            <p className="mt-6 text-sm md:text-lg text-muted-foreground leading-relaxed">
              Driving large-scale landfill reclamation through advanced biomining, reclaiming land, reducing
              environmental risk and carbon impact, and enabling circular urban transformation.
            </p>
          </div>

          <div className="relative  justify-center ">
            <div
              ref={mapRef}
              onClick={handleDevClick}
              className={`relative w-full max-w-[480px] ${DEV_MODE ? "cursor-crosshair" : "cursor-default"}`}
            >
              <img
                src={indiaMap}
                alt="Pan-India Presence Map"
                className="block w-full select-none"
                draggable={false}
              />

              {presenceLocations.map((location, index) => {
                const { top, left } = latLngToPercent(location.lat, location.lng);
                const tooltipSideClass = location.labelSide === "left" ? "right-full mr-2 sm:mr-3" : "left-full ml-2 ";

                return (
                  <div
                    key={location.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: `${top}%`, left: `${left}%` }}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredPinIndex(index)}
                      onMouseLeave={() => setHoveredPinIndex(null)}
                      className="group relative flex items-center justify-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span className="sr-only">{location.name}</span>
                      <div className="relative">
                        <motion.span
                          aria-hidden="true"
                          className="absolute left-1 top-2.5 h-3 w-3 -translate-x-1/4 -translate-y-1/2 rounded-full bg-primary"
                          animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0.12, 0.55] }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.12, ease: "easeInOut" }}
                        />

                        <span
                          aria-hidden="true"
                          className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white/25 blur-[0.5px]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                        />
                        <MapPin
                          className="h-5 w-5 fill-primary stroke-white drop-shadow-sm"
                          strokeWidth={2.25}
                        />
                      </div>

                     <div
                      className={`pointer-events-none absolute top-1/2 z-50 -translate-y-1/2
                      bg-primary text-white text-xs font-semibold
                      px-3 py-1.5 rounded-md shadow-lg
                      min-w-[120px] text-center
                      ${tooltipSideClass}
                      opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition`}
                    >
                      {location.name}
                    </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PresenceSectioncp;
