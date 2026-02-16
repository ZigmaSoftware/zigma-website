import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Header from "@/components/Header";
import "@/style.css";

import img1 from "@/assets/home2.jpg";
import img2 from "@/assets/service-landfill-mining.jpg";
import img3 from "@/assets/hero-bg.jpg";
import img4 from "@/assets/completed_project.jpg";  

import { ChevronLeft, ChevronRight } from "lucide-react";

/* ================= TYPES ================= */
type CinematicMilestone = {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
};

/* ================= DATA ================= */
const cinematicMilestones: CinematicMilestone[] = [
  {
    year: "2019",
    title: "The Beginning",
    subtitle: "Idea & Prototype",
    description:
      "The idea was born and the first prototype was created, laying the foundation for long-term innovation.",
    image: img1,
  },
  {
    year: "2021",
    title: "Major Growth",
    subtitle: "Scaling Up",
    description:
      "The platform scaled rapidly as adoption increased and infrastructure matured.",
    image: img2,
  },
  {
    year: "2023",
    title: "Global Impact",
    subtitle: "Expanding Horizons",
    description:
      "The platform expanded globally with advanced AI-powered features.",
    image: img3,
  },
  {
    year: "2025",
    title: "The Future",
    subtitle: "Innovation Ahead",
    description:
      "A future driven by sustainability, innovation, and meaningful global impact.",
    image: img4,
  },
];

/* ================= ANIMATION ================= */
const slideVariants: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0.7,
    backgroundColor: "rgba(0,0,0,0.8)",
  }),
  animate: {
    x: 0,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    transition: {
      duration: 1,
      ease: [0, 0, 0.58, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? -40 : 40,
    opacity: 0.7,
    backgroundColor: "rgba(0,0,0,0.8)",
    transition: {
      duration: 1,
      ease: [0.42, 0, 1, 1],
    },
  }),
};

/* ================= COMPONENT ================= */
const Milestones = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) =>
      prev === 0 ? cinematicMilestones.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) =>
      prev === cinematicMilestones.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) =>
        prev === cinematicMilestones.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => window.clearInterval(id);
  }, []);

  const current = cinematicMilestones[index];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 w-full">
        <section className="mb-16">
          <div className="relative h-[640px] overflow-hidden">
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/40 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/40 transition"
            >
              <ChevronRight size={20} />
            </button>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="text-white text-center max-w-2xl">
                    <span className="inline-block text-xs tracking-[0.2em] uppercase opacity-80 bg-white/10 px-3 py-1 rounded-full mb-4">
                      Milestone • {current.year}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
                      {current.title}
                    </h2>

                    {current.subtitle && (
                      <p className="mt-3 text-lg font-semibold text-white/90">
                        {current.subtitle}
                      </p>
                    )}

                    <p className="mt-4 text-base text-white/85 max-w-lg mx-auto">
                      {current.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Milestones;


