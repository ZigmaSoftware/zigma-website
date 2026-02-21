import { Link } from "react-router-dom";
import { Target, Eye } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import Vision from "./Vision";


const AboutSection = () => {
  return (

    <div>
    {/* 
    <section className="section-padding">
            <ScrollToTop />

      <div className="container-main">
        Main About
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-2xl font-bold text-foreground mb-4">
              Transforming Waste<br />Management for a{" "}
              <span className="text-primary">Sustainable Future</span>
            </h2>
            <Link 
              to="/about" 
              className="inline-flex items-center text-primary font-semibold hover:underline mt-4"
            >
              Know More
            </Link>
          </div>
          <div>
            <p className="text-[#535353] text-sm leading-relaxed text-center">
              Our sustainable technologies are enabling organisations globally to transition from a linear to a circular economy, faster and more efficiently. We lead the regional 
                    waste management markets, deploying technologies spanning the entire waste management value chain. 
            </p>
          </div>
        </div>

        Mission & Vision
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-card border border-border card-hover">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Optimize expense tracking across platforms, & product lines using multiple cards, 
              delivering innovative waste management solutions for a cleaner India.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border card-hover">
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Optimize expense tracking across platforms, & product lines using multiple cards, 
              establishing ourselves as leaders in sustainable waste management.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border card-hover flex flex-col justify-center">
            <div className="text-center">
              <span className="text-5xl md:text-6xl font-bold text-foreground">
                10+
              </span>
              <p className="text-muted-foreground mt-2">Years Experience<br />with proud</p>
            </div>
          </div>
        </div>
      </div>
    </section> */}

    <Vision />  
    
     </div>
  );
};

export default AboutSection;

