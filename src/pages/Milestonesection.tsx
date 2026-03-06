import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import "@/style.css";
// import Milestones from "@/pages/Milestones"


import img1 from "@/assets/home2.jpg";
import img2 from "@/assets/service-landfill-mining.jpg";
import img3 from "@/assets/hero-bg.jpg";
import img4 from "@/assets/completed_project.jpg";

import { ChevronLeft, ChevronRight } from "lucide-react";

/* TYPES */
type NewsArticle = {
  title: string;
  date: string;
  excerpt: string;
};

type Appreciation = {
  name: string;
  role: string;
  message: string;
};

type CinematicMilestone = {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  news: NewsArticle[];
  appreciations: Appreciation[];
};

/* DATA */
const cinematicMilestones: CinematicMilestone[] = [
  {
    year: "2019",
    title: "The Beginning",
    subtitle: "Idea & Prototype",
    description:
      "The idea was born and the first prototype was created, laying the foundation for long-term innovation.",
    image: img1,
    news: [
      {
        title: "First Prototype Released",
        date: "Jan 2019",
        excerpt:
          "The first internal prototype marked the platform’s foundation. Early testing revealed UX challenges and scalability limits, guiding months of focused architectural refinement."
      },
      {
        title: "Core Team Assembled",
        date: "Feb 2019",
        excerpt:
          "A multidisciplinary team of engineers and designers was formed, establishing design systems, coding standards, and a clear long-term technical roadmap."
      }
    ],
    appreciations: [
      {
        name: "Founding Team",
        role: "Early Contributors",
        message:
          "The passion and dedication during the early days turned an ambitious idea into a working product."
      },
      {
        name: "Product Advisors",
        role: "Mentors",
        message:
          "Strong guidance at the prototype stage helped avoid costly mistakes later in the journey."
      }
    ]
  },
  {
    year: "2021",
    title: "Major Growth",
    subtitle: "Scaling Up",
    description:
      "The platform scaled rapidly as adoption increased and infrastructure matured.",
    image: img2,
    news: [
      {
        title: "10,000 Active Users",
        date: "Mar 2021",
        excerpt:
          "Reaching 10,000 active users validated market fit and triggered infrastructure upgrades for reliability and performance."
      },
      {
        title: "Series A Funding Secured",
        date: "May 2021",
        excerpt:
          "New funding accelerated hiring, product expansion, and marketing efforts to support sustained growth."
      }
    ],
    appreciations: [
      {
        name: "Investor Group",
        role: "Strategic Partners",
        message:
          "Clear vision and execution confidence made this investment a natural decision."
      },
      {
        name: "Operations Team",
        role: "Growth Support",
        message:
          "Behind-the-scenes operational excellence ensured stability during rapid scaling."
      }
    ]
  },
  {
    year: "2023",
    title: "Global Impact",
    subtitle: "Expanding Horizons",
    description:
      "The platform expanded globally with advanced AI-powered features.",
    image: img3,
    news: [
      {
        title: "International Expansion",
        date: "Apr 2023",
        excerpt:
          "Launches across Europe, Asia, and North America required localization, compliance, and strategic regional partnerships."
      },
      {
        title: "AI-Powered Tools Introduced",
        date: "Jun 2023",
        excerpt:
          "Automation and predictive insights dramatically improved user efficiency and decision-making."
      }
      
    ],
    appreciations: [
      {
        name: "Global Partners",
        role: "Regional Leads",
        message:
          "Localized expertise played a crucial role in successful international adoption."
      },
      {
        name: "Engineering Team",
        role: "Innovation Drivers",
        message:
          "AI integration elevated the platform to a new competitive level."
      }
    ]
  },
  {
    year: "2025",
    title: "The Future",
    subtitle: "Innovation Ahead",
    description:
      "A future driven by sustainability, innovation, and meaningful global impact.",
    image: img4,
    news: [
      {
        title: "Sustainability Programs Launched",
        date: "Jan 2025",
        excerpt:
          "Initiatives focused on carbon neutrality, energy efficiency, and community education were introduced."
      },
      {
        title: "Industry Recognition",
        date: "Feb 2025",
        excerpt:
          "Multiple awards reinforced the company’s position as an industry leader."
      }
    ],
    appreciations: [
      {
        name: "Industry Panel",
        role: "Award Committee",
        message:
          "Consistent innovation and social responsibility set this organization apart."
      },
      {
        name: "User Community",
        role: "Global Users",
        message:
          "The platform continues to empower teams and drive real-world impact."
      }
    ]
  }
];

/* ANIMATION */
const slideVariants: Variants = {

  initial: (direction: number) => ({
    x: direction > 0 ? 180 : -180,
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 180 : -180,
    opacity: 0,
    transition: { duration: 0.45, ease: "easeIn" }
  })
};

// const listContainer = {
const listContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

// const cardItem = {
const cardItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(6px)",
    transition: { duration: 0.2 }
  }
};

// const fadeUpSection = {
const fadeUpSection: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

/* COMPONENT */
const MilestoneSection = () => {
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

      <ScrollToTop/>
      

      <main className="pt-20 w-full">
        {/* HEADER */}
        <section className="section-dark-bg py-12 text-center mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_55%)]" />
          <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-primary-foreground">
            Our Story
          </h1>
          <p className="relative z-10 text-primary-foreground/80 mt-2">
            A journey of innovation, growth, and global impact.
          </p>
        </section>

        {/* MILESTONES */}
        {/* <section id="milestones" className="mb-10">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/50 via-background to-muted/30 px-6 py-8 md:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.10),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Timeline Highlights
              </div>

              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                Milestones that shaped our journey
              </h2>

              <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                Explore key moments across the years — each slide captures a major milestone,
                along with related updates and appreciation from our community.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-[2px] w-12 bg-primary/70" />
                <p className="text-xs text-muted-foreground">
                  Currently viewing:{" "}
                  <span className="font-semibold text-foreground">
                    {current.year}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* SLIDER + NEWS */}
        <section className="grid md:grid-cols-2 gap-1 mb-16">
          <div className="relative h-[480px] overflow-hidden border border-border shadow-lg">
            <button
              onClick={handlePrev}
              aria-label="Previous milestone"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/40 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next milestone"
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

                <div className="absolute inset-0 flex items-center px-6">
                  <div className="text-white max-w-xl">
                    <span className="text-xs tracking-widest uppercase opacity-90">
                      Milestone • {current.year}
                    </span>

                    <h2 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">
                      {current.title}
                    </h2>

                    {current.subtitle && (
                      <p className="mt-2 text-base md:text-lg font-medium text-white/85">
                        {current.subtitle}
                      </p>
                    )}

                    <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
                      {current.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-[480px] border border-border p-6 bg-gradient-to-br from-muted/40 via-background to-muted/30 overflow-y-auto">
          

            <div className="relative z-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`side-${current.year}`}
                  variants={fadeUpSection}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  <h2 className="text-2xl font-bold mb-4">News Articles</h2>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`news-${current.year}`}
                      variants={listContainer}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="flex flex-col gap-4 mb-6"
                    >
                      {current.news.map((n, i) => (
                        <motion.div
                          key={`${current.year}-news-${i}`}
                          variants={cardItem}
                          whileHover={{ scale: 1.01, y: -2 }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                          className="p-4 rounded-xl bg-card/80 border border-border"
                        >
                          <h3 className="font-semibold">{n.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {n.date}
                          </p>
                          <p className="text-sm">{n.excerpt}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  <div className="pt-4 border-t border-border">
                    <h3 className="text-lg font-semibold mb-3">
                      Appreciation & Feedback
                    </h3>

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`app-${current.year}`}
                        variants={listContainer}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="flex flex-col gap-3"
                      >
                        {current.appreciations.map((a, i) => (
                          <motion.div
                            key={`${current.year}-app-${i}`}
                            variants={cardItem}
                            whileHover={{ scale: 1.01, y: -2 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="p-4 rounded-xl bg-background border border-border"
                          >
                            <p className="text-sm mb-2">“{a.message}”</p>
                            <p className="text-xs text-muted-foreground">
                              — {a.name}, {a.role}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>


      {/* <Footer /> */}

     

    </div>
  );
};

export default MilestoneSection;


