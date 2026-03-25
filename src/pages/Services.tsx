import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import landfillMining from "@/assets/website/hero/landfill-mining-hero.jpg";
import landfillManagement from "@/assets/windrow.jpg";
import wetWaste from "@/assets/fresh waste.jpg.jpeg";
import herobg from "@/assets/services/kumbakonam.png";
import machine from "@/assets/services/machinery.jpeg";
import iot from "@/assets/services/WB.png";
import bsfl from "@/assets/Bsfl.png";
import integrated from "@/assets/services/Integrated Alternative Fuel Solutions.jpg";
import industrial from "@/assets/services/Industrial & Commercial Waste Solutions.jpg";
import epr from "@/assets/services/EPR.png";
import Servicescp from "./Servicescp";


const SLOW_EASE = "power2.out";

const services = [
  {
    id: "landfill-mining",
    title: "Landfill Mining and Remediation",
    eyebrow: "Legacy Waste Reclamation",
    image: landfillMining,
    description: "Scientific recovery of legacy waste to reclaim land and extract reusable resources.",
    features: [
      "Material recovery and recycling",
      "Land reclamation for reuse",
      "Environmental remediation",
      "Reduction of landfill footprint",
      "Resource recovery optimization",
    ],
  },
  {
    id: "landfill-management",
    title: "Landfill Management",
    eyebrow: "Scientific Landfill Operations",
    image: landfillManagement,
    description: "Advanced landfill operations with environmental monitoring and compliance control.",
    features: [
      "Site design and development",
      "Operational management",
      "Environmental monitoring",
      "Leachate treatment systems",
      "Gas collection and utilization",
    ],
  },
  {
    id: "fresh-waste",
    title: "Fresh Waste Management and Processing",
    eyebrow: "Organic Waste Processing",
    image: wetWaste,
    description: "Waste processing systems converting biodegradable waste into compost/gas, non-biodegradables into refuse derived fuel and channelising recyclables into circularity solutions.",
    features: [
      "Composting solutions",
      "Bio-methanation plants",
      "Organic fertilizer production",
      "Zero-waste initiatives",
      "Community engagement programs",
    ],
  },
  {
    id: "bsfl-organic-waste",
    title: "BSFL Based Organic Waste Management",
    eyebrow: "Advanced Biological Processing",
    image: bsfl,
    description: "High-efficiency organic waste treatment using Black Soldier Fly larvae technology to derive highly enriched manure, frass and BSF larvae as protein supplements.",
    features: [
      "Black Soldier Fly larvae cultivation",
      "High-efficiency waste conversion",
      "Biomass protein production",
      "Nutrient-rich compost generation",
      "Sustainable alternative protein source",
    ],
  },
  {
    id: "machinery-sales-rentals",
    title: "Machinery Sales & Rentals",
    eyebrow: "Industrial Processing Equipment",
    image: machine,
    description: "Industrial waste management machinery supplies and rental support for waste processing operations.",
    features: [
      "Wide range of processing equipment",
      "Flexible rental and lease options",
      "Purchase and ownership support",
      "Technical assistance and training",
      "Maintenance and operational support",
    ],
  },
  {
    id: "iot-waste-management",
    title: "IOT Systems for Waste Management",
    eyebrow: "Smart Technology Solutions",
    image: iot,
    description: "Smart monitoring systems delivering real-time waste analytics and optimization.",
    features: [
      "Real-time waste tracking and monitoring",
      "Smart sensor networks integration",
      "Data analytics and optimization",
      "Remote system management dashboards",
      "Predictive maintenance and alerts",
    ],
  },
  {
    id: "integrated-alternative-fuel-solutions",
    title: "Integrated Alternative Fuel Solutions",
    eyebrow: "Alternative Fuel Systems",
    image: integrated,
    description: "Supply of alternative fuel along with preprocessing facilities, establishment, operations and maintenance services, and related support services delivered as an integrated solution.",
    features: [
      "On-site and centralized C&D waste handling",
      "Automated crushing and screening systems",
      "Recovered aggregate quality control",
      "Diversion of inert waste from landfills",
      "Support for green construction materials",
    ],
  },
  {
    id: "industrial-commercial-waste-solutions",
    title: "Industrial & Commercial Waste Solutions",
    eyebrow: "Comprehensive Waste Management",
    image: industrial,
    description: "Comprehensive waste management for hazardous and non-hazardous waste from manufacturers & end users.",
    features: [
      "Refuse Derived Fuel preparation",
      "Calorific value optimization and blending",
      "Pre-processing for co-processing industries",
      "Moisture reduction and shredding systems",
      "Stable feedstock supply planning",
    ],
  },
  {
    id: "epr-extended-producer-responsibility",
    title: "EPR (Extended Producer Responsibility)",
    eyebrow: "EPR Programs and Compliance",
    image: epr,
    description: "Extended Producer Responsibility - Sustainable producer responsibility programs ensuring end-of-life product management and recycling.",
    features: [
      "Plastic waste collection and sorting networks",
      "Recycler onboarding and verification",
      "Digital traceability and reporting",
      "EPR documentation and evidence support",
      "Annual target planning and compliance tracking",
    ],
  },
  
];

const Services = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Page Header */}
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
          <img
            src={herobg}
            alt=" Services Hero Background"
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
          {/* <div className="absolute inset-0 from-black/35 via-black/45 to-black/30" aria-hidden="true" /> */}

          <div className="container-main relative grid items-center justify-items-center pt-28 text-center">
            <Reveal
              className="max-w-3xl mx-auto"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium ">
                What We Do
              </div>
              <h1 className="text-5xl md:text-5xl font-bold leading-tight text-white mt-3">
                Our Services
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                Transforming waste into valuable products. Our recovered materials support sustainable construction and agriculture.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding">
          <div className="container-main">
            <div className="space-y-24">
              {services.map((service, index) => (
                <Reveal
                  key={service.id}
                  id={service.id}
                  data-anim-start="top 90%"
                  data-anim-duration="1.45"
                  data-anim-ease={SLOW_EASE}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService((current) => (current === service.id ? null : current))}
                >
                  {(() => {
                    const isPinnedExpanded = expandedService === service.id;
                    const isExpanded = isPinnedExpanded || hoveredService === service.id;
                    const shortDescription =
                      service.description.length > 140
                        ? `${service.description.slice(0, 140)}...`
                        : service.description;

                    return (
                      <>
                        <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                          <div className="overflow-hidden rounded-2xl shadow-xl">
                            <img
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        </div>
                        <div className={`${index % 2 === 1 ? "lg:order-1" : ""} flex flex-col`}>
                          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                            {service.eyebrow}
                          </span>
                          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                            {service.title}
                          </h2>
                          <p className="mt-4  text-base lg:text-lg text-muted-foreground leading-relaxed">
                            {isExpanded ? service.description : shortDescription}
                          </p>
                          <button
                            type="button"
                            className="text-sm p-2 text-primary font-semibold hover:underline mt-2 text-left"
                            onClick={() =>
                              setExpandedService(isPinnedExpanded ? null : service.id)
                            }
                          >
                            {isPinnedExpanded ? "Show Less" : "Read More"}
                          </button>
                          {isExpanded ? (
                            <ul className="space-y-3 mb-8 mt-6">
                              {service.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                  <span className="text-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          <Button asChild className="w-28">
                            <Link to="/contact">Enquire Now</Link>
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className=" section-padding">
          <div className="container-main text-center">
            <Reveal data-anim-start="top 92%" data-anim-duration="1.45" data-anim-ease={SLOW_EASE}>
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Let Us Deliver Impact
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Ready to Transform Your Waste Management?
              </h2>
              <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                Contact us today to discuss how we can help you achieve your sustainability goals.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </Reveal>
          </div>
        </section>
        {/* <Servicescp/>  */}
      </main>
      <Footer />
    </div>
  );
};

export default Services;
