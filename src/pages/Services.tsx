import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import landfillMining from "@/assets/website/The Landfill Mining.jpg";
import landfillManagement from "@/assets/website/noida present.png";
import wetWaste from "@/assets/Wet Waste Management.jpeg";
import Servicescp from "./Servicescp";

const services = [
  {
    id: "landfill-mining",
    title: "Landfill Mining",
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
    title: "Wet Waste Management",
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
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="section-dark-bg py-20">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our Services
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Comprehensive waste management solutions tailored to meet the unique needs of municipalities and industries.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding">
          <div className="container-main">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild>
                      <Link to="/contact">Get Quote</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-alt-bg section-padding">
          <div className="container-main text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Waste Management?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Contact us today to discuss how we can help you achieve your sustainability goals.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Servicescp />
      <Footer />
    </div>
  );
};

export default Services;



