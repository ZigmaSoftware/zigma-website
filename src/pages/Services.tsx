import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import landfillMining from "@/assets/website/hero/landfill-mining-hero.jpg";
import landfillManagement from "@/assets/website/hero/noida-present-hero.jpg";
import wetWaste from "@/assets/Wet Waste Management.jpeg";
import herobg from "@/assets/website/hero/noida-present-hero.jpg";
import Wpe from "@/assets/website/Wpe product.png";
import machine from "@/assets/website/machineries.jpg";
import Servicescp from "./Servicescp";


const SLOW_EASE = "power2.out";

const services = [
  {
    id: "landfill-mining",
    title: "Landfill Mining and Remediation",
    eyebrow: "Legacy Waste Reclamation",
    image: landfillMining,
    description: "Landfill mining involves the excavation, processing, treatment, and/or recovery of deposited materials from active or closed landfill sites.",
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
    description: "Comprehensive landfill management services ensuring safe, efficient, and environmentally responsible waste disposal operations.",
    features: [
      "Site design and development",
      "Operational management",
      "Environmental monitoring",
      "Leachate treatment systems",
      "Gas collection and utilization",
    ],
  },
  {
    id: "wet-waste",
    title: "Fresh waste Management and Processing ",
    eyebrow: "Organic Waste Processing",
    image: wetWaste,
    description: "Sustainable processing of organic waste through composting and bio-methanation, converting waste into valuable resources.",
    features: [
      "Composting solutions",
      "Bio-methanation plants",
      "Organic fertilizer production",
      "Zero-waste initiatives",
      "Community engagement programs",
    ],
  },
  {
    id: "waste-processing-equipment",
    title: "Waste Processing Equipment",
    eyebrow: "From Waste to Wealth, Responsibly",
    image: Wpe,
    description: "A value-added product vertical that transforms recovered waste streams into practical, market-ready applications for urban and commercial use.",
    features: [
      "Recycled-material based product development",
      "Modular structures and utility kiosks",
      "Durable weather-resistant panel applications",
      "Designs suited for public and commercial spaces",
      "Circular economy focused manufacturing",
    ],
  },
  {
    id: "waste-management-process-machinery",
    title: "Waste Management Process Machinery",
    eyebrow: "Industrial Processing Systems",
    image: machine,
    description: "Specialized machinery solutions for municipal and industrial waste processing, built to improve throughput, segregation quality, and operational safety.",
    features: [
      "Segregation and screening machine lines",
      "Conveyor-based process flow integration",
      "Shredding, sizing, and material handling units",
      "Process automation and control interfaces",
      "Installation, commissioning, and O&M support",
    ],
  },
];

const Services = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Page Header */}
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
          <img
            src={herobg}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 from-black/35 via-black/45 to-black/30" aria-hidden="true" />

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
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {(() => {
                    const isExpanded = expandedService === service.id;
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
                    <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                      {isExpanded ? service.description : shortDescription}{" "}
                      <button
                        type="button"
                        className="text-sm text-primary font-semibold hover:underline"
                        onClick={() =>
                          setExpandedService(isExpanded ? null : service.id)
                        }
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                      </button>
                    </p>
                    {isExpanded ? (
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Button asChild   className="w-28">
                      <Link to="/contact">Get Quote</Link>
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
