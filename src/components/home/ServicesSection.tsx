import { motion } from "framer-motion";
import { Factory, Recycle, Cog, Cpu, Layers, Sprout, ArrowRight, Fuel, Trash2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/animation/Reveal";

const services = [
  {
    id: "landfill-mining",
    title: "Landfill Mining and Remediation",
    description:
      "Scientific recovery of legacy waste to reclaim land and extract reusable resources.",
    icon: Layers,
  },
  {
    id: "landfill-management",
    title: "Landfill Management",
    description:
      "Advanced landfill operations with environmental monitoring and compliance control.",
    icon: Factory,
  },
  {
    id: "fresh-waste",
    title: "Fresh Waste Management and Processing",
    description:
      "Organic waste processing systems converting biodegradable waste into compost.",
    icon: Recycle,
  },
  {
    id: "bsfl-organic-waste",
    title: "BSFL Based Organic Waste Management",
    description:
      "High-efficiency organic waste treatment using Black Soldier Fly larvae technology.",
    icon: Sprout,
  },
  {
    id: "machinery-sales-rentals",
    title: "Machinery Sales & Rentals",
    description:
      "Industrial machinery supply and rental support for waste processing operations.",
    icon: Cog,
  },
  {
    id: "iot-waste-management",
    title: "IOT Systems for Waste Management",
    description:
      "Smart monitoring systems delivering real-time waste analytics and optimization.",
    icon: Cpu,
  },
  {
    id: "alternative-fuel-solutions",
    title: "Integrated Alternative Fuel Solutions",
    description:
      "Supply of Alternative Fuel with preprocessing facility, operations & maintenance services.",
    icon: Fuel,
  },
  {
    id: "industrial-commercial-waste",
    title: "Industrial & Commercial Waste Solutions",
    description:
      "Comprehensive waste management for hazardous and non-hazardous waste from manufacturers & end users.",
    icon: Trash2,
  },
  {
    id: "epr-responsibility",
    title: "EPR ",
    // title: "EPR (Extended Producer Responsibility)",
    description:
      "Extended Producer Responsibility - Sustainable producer responsibility programs ensuring end-of-life product management and recycling.",
    icon: CheckCircle2,
  },
];

const cardAnimation = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  hover: {
    y: -10,
    scale: 1.02,
    rotateX: 2,
    rotateY: -2,
    transition: { type: "spring" as const, stiffness: 180, damping: 18 },
  },
};

const iconAnimation = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.12,
    rotate: 6,
    transition: { type: "spring" as const, stiffness: 260, damping: 14 },
  },
};

const ServicesSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-main relative z-10">

        {/* Heading */}
        <Reveal
          className="text-center"
          variant="fade-up"
          data-anim-start="top 90%"
          data-anim-duration="1.1"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Services
          </span>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
            Waste Management <span className="text-primary">Solutions</span>
          </h2>
        </Reveal>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => {
            const Icon = service.icon;
            const isLast = index === services.length - 1;

            return (
              <motion.div
                key={service.id}
                variants={cardAnimation}
                initial="hidden"
                animate="show"
                whileHover="hover"
                className={`group relative flex flex-col items-center text-center rounded-2xl bg-white/80 border border-gray-100 p-3 shadow-lg transition-shadow duration-500 hover:shadow-2xl ${isLast ? "lg:col-start-2 lg:col-span-2 lg:justify-self-center" : ""
                  }`}
              >

                {/* Icon */}
                <motion.div
                  variants={iconAnimation}
                  initial="initial"
                  whileHover="hover"
                  className="flex items-center justify-center text-primary"
                >
                  <Icon size={36} strokeWidth={1.8} />
                </motion.div>

                {/* Title */}
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-1 text-sm leading-relaxed text-gray-600 max-w-xs">
                  {service.description}
                </p>

                {/* Read More Button */}
                <div className="mt-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-3 transition-all duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read More <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-primary transition-all duration-500 group-hover:w-full group-hover:left-0 rounded-b-xl" />

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;