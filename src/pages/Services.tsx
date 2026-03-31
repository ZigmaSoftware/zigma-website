import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import landfillMining from "@/assets/website/hero/landfill-mining-hero.jpg";
import landfillManagement from "@/assets/windrow.jpg";
import wetWaste from "@/assets/fresh waste.jpg";
import herobg from "@/assets/services/kumbakonam.png";
import machine from "@/assets/services/machinery.png";
import iot from "@/assets/services/WB.png";
import bsflsolarr from "@/assets/solarr.jpg.jpeg";
import integrated from "@/assets/website/hero/RDF1.jpeg";
import industrial from "@/assets/services/Industrial & Commercial Waste Solutions.jpg";
import epr from "@/assets/services/EPR.png";
import Servicescp from "./Servicescp";


const SLOW_EASE = "power2.out";

const EMPHASIS_MAP: Record<string, string[]> = {
  "Legacy Waste Reclamation": [
    "state-of-the-art processing machinery",
    "ESG (Environmental, Social, and Governance) and EHS (Environment, Health, and Safety) compliance",
    "reuse, recycling, or circularity pathways",
  ],
  "landfill-management": [
    "environmental monitoring",
    "compliance control",
    "controlled disposal of waste",
    "minimal environmental contamination",
    "space management",
    "leachate treatment systems",
    "methane management",
    "fire management and monitoring",
    "circular landfill mining",
  ],
  "fresh-waste": [
    "daily fresh municipal solid waste (MSW)",
    "state-of-the-art machinery",
    "environmental and ESG (Environmental, Social, and Governance) compliance",
    "leachate management",
    "rejects management",
    "high-value compost",
    "RDF (Refuse Derived Fuel) management",
  ],
  "bsfl-organic-waste": [
    "industrial-scale Black Soldier Fly (BSF) bio-conversion system",
    "in-house breeding",
    "high-speed recovery",
    "very low reject profile",
    "BSFL biomass",
    "high-protein animal feed",
    "high-quality manure and frass",
  ],
  "machinery-sales-rentals": [
    "state-of-the-art machinery",
    "legacy waste reclamation and municipal solid waste (MSW) processing",
    "in-house research and development (R&D) and specialized fabrication setup",
    "outright sale or on a flexible rental basis",
    "scientific technical support available round-the-clock",
    "high-quality output",
  ],
  "iot-waste-management": [
    "Industrial Internet of Things (IIoT)",
    "smart sensor networks",
    "data-driven optimization",
    "predictive system maintenance",
    "real-time landfill management",
    "door-to-door collection",
    "waste transfer station monitoring",
    "capacity monitoring, process monitoring, and disposal monitoring",
    "grievance redressal mechanism",
  ],
  "integrated-alternative-fuel-solutions": [
    "Refuse Derived Fuel (RDF)",
    "pre-processing facilities",
    "calorific value and moisture content",
    "industrial co-processing",
    "alternative fuel systems",
    "high-quality alternative raw materials",
    "adherence to regulatory norms",
  ],
  "industrial-commercial-waste-solutions": [
    "end-to-end management for hazardous and non-hazardous waste streams",
    "technical preparation of Refuse Derived Fuel (RDF)",
    "shredding and moisture reduction systems",
    "calorific value and blending",
    "strategic technical consultants",
    "specialized knowledge of material specifications and industrial requirements",
    "regular and apt material",
    "stable feedstock supply planning",
  ],
  "epr-extended-producer-responsibility": [
    "Extended Producer Responsibility (EPR)",
    "end-of-life management",
    "plastic waste collection and sorting operations",
    "digital traceability and real-time reporting",
  ],
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightPhrases = (text: string, phrases: string[]): ReactNode => {
  if (!phrases.length) return text;
  const unique = Array.from(new Set(phrases)).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${unique.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return parts.map((part, idx) => {
    const isMatch = unique.some((phrase) => phrase === part);
    return isMatch ? <strong key={`${part}-${idx}`}>{part}</strong> : part;
  });
};

const renderFeatureText = (feature: string): ReactNode => {
  const [head, ...rest] = feature.split(":");
  if (rest.length === 0) return feature;
  return (
    <>
      <strong>{head.trim()}:</strong> {rest.join(":").trim()}
    </>
  );
};

const services = [
  {
    id: "Legacy Waste Reclamation",
    title: "Landfill Mining and Remediation",
    eyebrow: "Legacy Waste Reclamation",
    image: landfillMining,
    description: "We execute large-scale legacy waste reclamation projects powered by state-of-the-art processing machinery designed for high-precision material separation. Our operations are strictly governed by ESG (Environmental, Social, and Governance) and EHS (Environment, Health, and Safety) compliance protocols, ensuring that every stage of the recovery process adheres to global environmental, health, and safety standards. Through advanced landfill mining, we extract various resources that are strategically directed toward reuse, recycling, or circularity pathways. This scientific methodology optimizes resource recovery while facilitating the remediation of contaminated land and the systematic reduction of the landfill footprint.",
    features: [
      " Precision material recovery,systematic land reclamation and rigorous adherence to international compliance frameworks.",
    ],
  },
  {
    id: "landfill-management",
    title: "Landfill Management",
    eyebrow: "Scientific Landfill Operations",
    image: landfillManagement,
    description: "We provide end-to-end scientific landfill operations centered on rigorous environmental monitoring and strict compliance control. Our approach prioritizes the controlled disposal of waste to ensure minimal environmental contamination, utilizing sophisticated space management and site development strategies to optimize the lifecycle of the facility. We employ high-tier leachate treatment systems and advanced methane management through integrated gas collection and utilization. To ensure maximum operational safety and sustainability, we implement continuous fire management and monitoring protocols alongside circular landfill mining to extract reusable resources and restore site capacity.",
    features: [
      "Environmental & Fire Monitoring: Real-time tracking of site conditions to prevent contamination and mitigate fire risks.",
      "Leachate & Methane Management: Integrated treatment and gas utilization systems to handle hazardous by-products.",
      "Space Optimization: Strategic site design for efficient land use and controlled waste placement.",
      "Circular Resource Recovery: Utilizing landfill mining to transition from static storage to active resource reclamation.",
      
    ],
  },
  {
    id: "fresh-waste",
    title: "Daily MSW Management and Processing",
    eyebrow: "Municipal Solid Waste Processing",
    image: wetWaste,
    description: "We specialize in the industrial-scale processing of daily fresh municipal solid waste (MSW) utilizing state-of-the-art machinery to maximize material recovery and operational efficiency. Our facilities are designed for full environmental and ESG (Environmental, Social, and Governance) compliance, ensuring that all waste streams are handled according to the highest sustainability standards. We integrate advanced leachate management and systematic rejects management protocols to mitigate environmental impact throughout the processing lifecycle. By isolating the biodegradable fraction, we execute the biological conversion of organic material into high-value compost, while concurrently optimizing RDF (Refuse Derived Fuel) management to transform non-biodegradable components into stable industrial energy sources.",
    features: [
      "Automated Fresh MSW Sorting: High-throughput processing of daily municipal streams using advanced separation technology",
      "Nutrient Recovery: Technical transformation of organic fractions into premium-grade agricultural compost.",
      "RDF & Energy Recovery: Strategic management and preparation of Refuse Derived Fuel from non-recyclable rejects.",
      "Environmental Safeguarding: Comprehensive leachate treatment and rigorous ESG-compliant operational oversight.",
     
    ],
  },
  {
    id: "bsfl-organic-waste",
    title: "BSFL Based Organic Waste Management",
    eyebrow: "Advanced Organic Waste Processing",
    image: bsflsolarr,
    description: "We operate a sophisticated, industrial-scale Black Soldier Fly (BSF) bio-conversion system featuring integrated in-house breeding and cultivation protocols. This advanced biological treatment is engineered for the high-speed recovery of organic waste streams with a very low reject profile, ensuring maximum efficiency and resource utilization. Our process facilitates the high-volume generation of BSFL biomass, which serves as a high-protein animal feed supplement, alongside the production of high-quality manure and frass. This technology provides a high-efficiency, sustainable solution for nutrient upcycling and the production of alternative protein sources.",
    features: [
      "In-House Lifecycle Management: Proprietary BSF breeding and cultivation to ensure consistent industrial throughput.",
      "Accelerated Bio-Conversion: Rapid transformation of organic matter into value-added products at a high recovery rate.",
      "Biomass Protein Production: Systematic generation of nutrient-dense larvae for the animal nutrition sector.",
      "Nutrient-Rich Bio-Fertilizers: High-speed production of enriched manure and frass with minimal residual waste.",
    ],
  },
  {
    id: "machinery-sales-rentals",
    title: "Machinery Sales & Rentals",
    eyebrow: "Industrial Processing Equipment",
    image: machine,
    description: "We engineer and provide state-of-the-art machinery specifically designed for the rigorous technical demands of legacy waste reclamation and municipal solid waste (MSW) processing. These industrial assets are developed through our dedicated in-house research and development (R&D) and specialized fabrication setup, ensuring that every system is optimized for high-performance resource recovery. To accommodate diverse project requirements, our equipment is available for outright sale or on a flexible rental basis. Every deployment is backed by scientific technical support available round-the-clock, guaranteeing maximum operational uptime, high-quality output, and the scalability necessary for large-scale environmental projects.",
    features: [
      "Proprietary Engineering: Custom-built processing systems developed via in-house R&D and precision fabrication.",
      "Versatile Waste Processing: Specialized hardware for both high-throughput MSW sorting and complex legacy landfill mining.",
      "Flexible Acquisition Models: Comprehensive support for both equipment purchase and operational leasing.",
      "24/7 Scientific Support: Continuous technical and operational assistance to ensure consistent, high-performance results.",
    
    ],
  },
  {
    id: "iot-waste-management",
    title: "IOT Systems for Waste Management",
    eyebrow: "Smart Technology Solutions",
    image: iot,
    description: "Our Industrial Internet of Things (IIoT) platforms provide granular, real-time visibility into the entire waste management lifecycle. By integrating smart sensor networks, we enable data-driven optimization and predictive system maintenance to ensure maximum operational efficiency. This infrastructure facilitates real-time landfill management, oversight of door-to-door collection logistics, and continuous waste transfer station monitoring. Our technology ensures precise capacity monitoring, process monitoring, and disposal monitoring, providing total transparency from collection to final disposal, while incorporating a robust grievance redressal mechanism to ensure service accountability.",
    features: [
      "Advanced Pre-Processing: Utilization of automated crushing, shredding, and screening systems to produce standardized feedstock.",
      "Thermal Engineering: Precision calorific blending and moisture reduction to maximize energy recovery and combustion efficiency",
      "Industrial Feedstock Stability: Strategic planning and logistics to ensure a stable and regular supply of alternative fuel for continuous industrial operations.",
      "Compliance-Driven Integration: System establishment and maintenance that prioritizes high-quality outputs while meeting all environmental and safety protocols.",
   
    ],
  },
  {
    id: "integrated-alternative-fuel-solutions",
    title: "Integrated Alternative Fuel Solutions",
    eyebrow: "Comprehensive Waste Management",
    image: integrated,
    description: "We provide comprehensive, end-to-end solutions for the engineering, production, and supply of Refuse Derived Fuel (RDF). This includes the establishment and operation of specialized pre-processing facilities designed to optimize the calorific value and moisture content of diverse waste streams, ensuring they meet the technical requirements for industrial co-processing. Furthermore, we facilitate the establishment of alternative fuel systems across various industrial sectors to guarantee a consistent supply of high-quality alternative raw materials. All systems are implemented in strict adherence to regulatory norms and environmental standards, supporting a seamless transition to sustainable energy sources.",
    
    features: [
      "Advanced Pre-Processing: Utilization of automated crushing, shredding, and screening systems to produce standardized feedstock.",
      "Thermal Engineering: Precision calorific blending and moisture reduction to maximize energy recovery and combustion efficiency.",
      "Industrial Feedstock Stability: Strategic planning and logistics to ensure a stable and regular supply of alternative fuel for continuous industrial operations.",
      "Compliance-Driven Integration: System establishment and maintenance that prioritizes high-quality outputs while meeting all environmental and safety protocols.",
    ],
  },
  {
    id: "industrial-commercial-waste-solutions",
    title: "Industrial & Commercial Waste Solutions",
    eyebrow: "Comprehensive Waste Management",
    image: industrial,
    description: "We provide end-to-end management for hazardous and non-hazardous waste streams, catering to both large-scale manufacturers and industrial end-users. We specialize in the technical preparation of Refuse Derived Fuel (RDF), utilizing sophisticated shredding and moisture reduction systems to optimize calorific value and blending for high-tier industrial applications. Acting as strategic technical consultants, we bridge the operational gap between waste generators and industrial consumers. By leveraging our specialized knowledge of material specifications and industrial requirements, we connect sellers with buyers to ensure that regular and apt material reaches the consumer without operational hitches. Our focus on stable feedstock supply planning ensures a seamless transition of processed waste into the energy and manufacturing supply chains.",
    features: [
      "Advanced RDF Engineering: Precision pre-processing for co-processing industries, focusing on calorific optimization and moisture control.",
      "Specialized Material Consulting: Expert-led brokerage and supply chain management to ensure consistent material quality and logistical reliability.",
      "Industrial Waste Management: Tailored handling and disposal solutions for diverse manufacturing and commercial waste outputs.",
      "Comprehensive Compliance Oversight: Managing various waste streams with rigorous adherence to environmental and safety standards.",
      "Stable feedstock supply planning",
    ],
  },
  {
    id: "epr-extended-producer-responsibility",
    title: "EPR (Extended Producer Responsibility)",
    eyebrow: "EPR Programs and Compliance",
    image: epr,
    description: "We engineer comprehensive Extended Producer Responsibility (EPR) programs designed to facilitate the sustainable end-of-life management of post-consumer products. Our frameworks provide a technical and transparent approach to fulfilling producer obligations through an integrated, large-scale network of plastic waste collection and sorting operations. By leveraging digital traceability and real-time reporting, we ensure total transparency across the recycling chain, from initial recovery to final processing by our verified network of industrial recycling partners.",
    features: [
      "Strategic Compliance Planning: Professional management of annual target planning and systematic compliance tracking to meet and exceed regulatory mandates.",
      "Verified Recycler Ecosystem: Rigorous onboarding and verification of recycling partners to guarantee high-standard material recovery and operational integrity.",
      "Digital Traceability Frameworks: Advanced documentation and evidence support providing auditable data and granular visibility for end-of-life product management.",
      "Network Optimization: Scalable plastic waste collection and sorting networks engineered for high-efficiency material recovery and circularity solutions.",
      
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
              <p className="mt-6 text-lg text-white/90 leading-relaxed   max-w-3xl mx-auto">
            We specialize in the technical transformation of waste streams into high-value products, bridging the gap between disposal and industrial utility. By leveraging advanced processing methodologies, we produce recovered materials that serve as essential inputs for a circular economy, effectively closing the loop on resource lifecycles.</p>
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
                >
                  {(() => {
                    const isPinnedExpanded = expandedService === service.id;
                    const isExpanded = isPinnedExpanded;
                    const fullDescription = Array.isArray(service.description)
                      ? service.description.join(" ")
                      : service.description;
                    const shortDescription =
                      fullDescription.length > 140  
                        ? `${fullDescription.slice(0, 140)}...`
                        : fullDescription;

                    return (
                      <>
                        <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                          <div className="overflow-hidden rounded-2xl shadow-xl ">
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
                          <p className="mt-4  text-base lg:text-lg text-muted-foreground leading-relaxed text-justify">
                            {highlightPhrases(
                              isExpanded ? fullDescription : shortDescription,
                              EMPHASIS_MAP[service.id] ?? []
                            )}
                          </p>
                          <button
                            type="button"
                            className="text-sm pb-2 text-primary font-semibold hover:underline mt-2 text-left"
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
                                  <span className="text-foreground">{renderFeatureText(feature)}</span>
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
