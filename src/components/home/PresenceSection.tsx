import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Clock } from "lucide-react";
import indiaMap from "@/assets/india-map.png";

const presenceLocations = [
  {
    name: "Tamil Nadu",
    top: "75%",
    left: "43%",
    ongoing: 3,
    completed: 5,
    description: "Leading biomining initiatives in southern India.",
    color: "text-emerald-500",
  },
  {
    name: "Kerala",
    top: "75%",
    left: "40%",
    ongoing: 2,
    completed: 4,
    description: "Sustainable waste management projects.",
    color: "text-emerald-500",
  },
  {
    name: "Andhra Pradesh",
    top: "60%",
    left: "45%",
    ongoing: 4,
    completed: 3,
    description: "Advanced landfill reclamation efforts.",
    color: "text-emerald-500",
  },
  {
    name: "Gujarat",
    top: "39%",
    left: "30%",
    ongoing: 3,
    completed: 6,
    description: "Pioneering environmental restoration.",
    color: "text-emerald-500",
  },
  {
    name: "Maharashtra",
    top: "52%",
    left: "38%",
    ongoing: 5,
    completed: 7,
    description: "Major urban waste transformation projects.",
    color: "text-emerald-500",
  },
  {
    name: "Assam",
    top: "30%",
    left: "70%",
    ongoing: 2,
    completed: 3,
    description: "Northeast India's green initiatives.",
    color: "text-emerald-500",
  },
];

const PresenceSection = () => {
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % presenceLocations.length);
    }, 2000); // Show each for 2 seconds

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const markerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="section-padding"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Map */}
          <div className="relative order-2 lg:order-1">
            <img
              src={indiaMap}
              alt="Pan-India Presence Map"
              className="w-full max-w-sm sm:max-w-md mx-auto relative z-0"
            />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0"
            >
              {presenceLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  variants={markerVariants}
                  style={{ top: location.top, left: location.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 ${visibleIndex === index ? 'block' : 'hidden'}`}
                >
                  <button
                    type="button"
                    className="group relative flex items-center justify-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary pointer-events-auto"
                  >
                    <span className="sr-only">{location.name}</span>
                    <div className="relative">
                      {visibleIndex === index && (
                        <div className={`absolute top-1/2 left-1/2 w-10 h-10 rounded-full ${location.color.replace('text-', 'bg-')}/20 animate-pulse-ring`}></div>
                      )}
                      <MapPin className={`w-6 h-6 ${visibleIndex === index ? `${location.color} drop-shadow-lg` : `${location.color}/50`} transition-colors duration-300`} />
                    </div>
                    <motion.div
                      className={`pointer-events-none absolute left-full ml-2 sm:ml-3 top-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-64 border border-border bg-gradient-to-br from-card to-card/95 px-3 sm:px-4 py-2 sm:py-3 text-left shadow-xl backdrop-blur-sm transition-all duration-300 z-50 ${visibleIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: visibleIndex === index ? 1 : 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {location.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {location.description}
                      </p>
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              <span className="text-primary">Pan-India</span> Presence
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Driving sustainable landfill reclamation across India through advanced biomining,
              transforming waste into reusable resources, restoring land, and promoting
              environmental sustainability.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="p-6 bg-card border border-border  text-center hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Completed Projects</p>
                <span
                  className="text-3xl font-bold text-foreground"
                >
                  12
                </span>
              </motion.div>
              <motion.div
                className="p-6 bg-card border border-border  text-center hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Ongoing Projects</p>
                <span
                  className="text-3xl font-bold text-primary"
                >
                  8
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PresenceSection;

