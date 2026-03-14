import { useState } from "react";
import { Link } from "react-router-dom";
import landfillMining from "@/assets/website/hero/Pdgclose.jpg";
import landfillManagement from "@/assets/services/windrow.jpg";
// import wetWaste from "@/assets/Wet Waste Management.jpeg";
import machine from "@/assets/services/Machinery.jpg";
// import wpe from "@/assets/website/Wpe product.png";
import Reveal from "@/components/animation/Reveal";
import { AnimatePresence, motion } from "framer-motion"

const services = [
  {
    id: "landfill-mining",
    title: "Landfill Mining and Remediation",
    image: landfillMining,
    description: "Extracting valuable materials from legacy waste deposits.",
    tag: "Prominent Award",
  },
  {
    id: "landfill-management",
    title: "Landfill Management",
    image: landfillManagement,
    description: "Modern approaches to waste disposal and site maintenance.",
    tag: "Recognized Program",
  },
  {
    id: "wet-waste-management",
    title: "Fresh waste Management and Processing",
 
    description: "Organic waste processing and composting solutions.",
    tag: "Sustainability Focus",
  },
  {
    id: "bsfl-organic-waste",
    title: "BSFL based organic waste Management",
    
    description: "High-efficiency organic waste conversion using BSFL-based processing systems.",
    tag: "Circular Innovation",
  },
  {
    id: "machinery-sales-rentals",
    title: "Machinery sales and rentals",
    image: machine,
    description: "Sales and rental support for specialized machinery used across waste processing operations.",
    tag: "Operations Support",
  },
  {
    id: "iot-waste-management",
    title: "IoT Systems for Waste Management",
 
    description: "Smart monitoring and analytics to optimize collections, operations, and compliance reporting.",
    tag: "Smart Systems",
  },
];

const ServicesSection = () => {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);

  const hoveredService = hoveredServiceId ? services.find((service) => service.id === hoveredServiceId) : null;

  return (
    <section data-anim-start="top 90%" data-anim-duration="1.1" className="section-padding">
      <div className="container-main">
        <Reveal
          className="text-center"
          variant="fade-up"
          data-anim-start="top 90%"
          data-anim-duration="1.1"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Services</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
            Waste Management <span className="text-primary">Solutions</span>
          </h2>
        </Reveal>

        <div
          className="relative mt-8 overflow-hidden rounded-lg"
          onMouseLeave={() => setHoveredServiceId(null)}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onMouseEnter={() => setHoveredServiceId(service.id)}
                className="group relative h-[220px] overflow-hidden rounded-lg bg-black text-left shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-[240px] lg:h-[260px]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" aria-hidden="true" /> */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <h3 className="text-white font-semibold leading-snug">{service.title}</h3>
                  {/* <p className="mt-1 text-xs text-white/75">{service.tag}</p> */}
                </div>
              </button>
            ))}
          </div>

       
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
