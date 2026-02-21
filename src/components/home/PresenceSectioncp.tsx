import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, MapPin } from "lucide-react";
import indiaMap from "@/assets/indiamap.jpg";

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
  icon: string;
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
    lat: 10.1,
    lng: 78,
    icon: "🌿",
    ongoing: 3,
    completed: 5,
    description: "Leading biomining initiatives in southern India.",
    labelSide: "right",
  },
  {
    name: "Kerala",
    lat: 10,
    lng: 75.6,
    icon: "🌴",
    ongoing: 2,
    completed: 4,
    description: "Sustainable waste management projects.",
    labelSide: "left",
  },
  {
    name: "Andhra Pradesh",
    lat: 15.6,
    lng: 78,
    icon: "♻️",
    ongoing: 4,
    completed: 3,
    description: "Advanced landfill reclamation efforts.",
    labelSide: "right",
  },
  {
    name: "Gujarat",
    lat: 21.5,
    lng: 71,
    icon: "🏭",
    ongoing: 3,
    completed: 6,
    description: "Pioneering environmental restoration.",
    labelSide: "right",
  },
  {
    name: "Maharashtra",
    lat: 17.3,
    lng: 75,
    icon: "🌱",
    ongoing: 5,
    completed: 7,
    description: "Major urban waste transformation projects.",
    labelSide: "right",
  },
  {
    name: "Assam",
    lat: 25,
    lng: 90.5,
    icon: "🍃",
    ongoing: 2,
    completed: 3,
    description: "Northeast India's green initiatives.",
    labelSide: "left",
  },
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
    //   className="section-padding"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >

        
      <div className="container-main ">

                  <div className="text-left  ">
            <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
             Pan-India Presence
            </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
           Transforming Landfills  <span className="text-primary">Across India</span>
          </h2>
          
         </div>
        <div className="grid items-center lg:grid-cols-2 ">
          <div className="relative order-2 flex justify-center lg:order-1">
            <div
              ref={mapRef}
              onClick={handleDevClick}
              className={`relative w-full max-w-[420px] ${DEV_MODE ? "cursor-crosshair" : "cursor-default"}`}
            >
              <img
                src={indiaMap}
                alt="Pan-India Presence Map"
                className="block w-full select-none"
                draggable={false}
              />

              {presenceLocations.map((location, index) => {
                const { top, left } = latLngToPercent(location.lat, location.lng);
                const tooltipSideClass =
                  location.labelSide === "left"
                    ? "right-full mr-2 sm:mr-3"
                    : "left-full ml-2 sm:ml-3";

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
                        {/* <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 animate-pulse" /> */}
                        <motion.span
                          className="relative z-10 inline-block text-base leading-none"
                          animate={{ y: hoveredPinIndex === index ? 6 : 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          📍
                        </motion.span>
                      </div>

                      <div
                        className={`pointer-events-none absolute top-1/2 z-50 w-48 -translate-y-1/2 border border-border bg-gradient-to-br from-card to-card/95 px-3 py-2 text-left shadow-xl backdrop-blur-sm transition-all duration-300 sm:w-56 sm:px-4 sm:py-3 md:w-64 ${tooltipSideClass} opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100`}
                      >
                        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          {location.name}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">{location.description}</p>
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* {DEV_MODE && (
                <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/80 px-3 py-1 text-[11px] text-white">
                  DEV MODE - Click map to log percentage coordinates
                </div>
              )} */}
            </div>
          </div>

          

          <div >       
            {/* <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-primary">Pan-India</span> Presence
            </h2> */}
            
            <p className="text-left mb-5  text-justify  leading-relaxed text-muted-foreground text-lg">
            Driving large-scale landfill reclamation across India through advanced biomining solutions that convert legacy waste into reusable resources. We reclaim land, mitigate environmental risks, reduce carbon impact, and support circular economy outcomes — enabling sustainable urban transformation and long-term ecological balance.
            </p>

            <motion.div
              className="grid grid-cols-1  sm:grid-cols-2 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
                <p className="mb-2 text-sm text-muted-foreground">Completed Projects</p>
                <span className="text-3xl font-bold text-foreground">12</span>
              </motion.div>
              <motion.div
                className="border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="mx-auto h-8 w-8 text-primary" />
                <p className="mb-2 text-sm text-muted-foreground">Ongoing Projects</p>
                <span className="text-3xl font-bold text-primary">8</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PresenceSectioncp;
