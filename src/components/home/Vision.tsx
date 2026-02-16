import { Link } from "react-router-dom";
import { Target, Eye } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import picture from "@/assets/website/cartoon-recycling (2).png";
import globe from "@/assets/website/globe.png";

const spinKeyframes = `
  @keyframes rotate-360 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Vision = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-muted/30 text-foreground">
      <ScrollToTop />
      <style>{spinKeyframes}</style>

      <div className="container-main relative">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div className="flex flex-col h-full motion-safe:animate-[fadeUp_0.36s_ease-out_both] motion-reduce:animate-none">
            <p className="text-3xl md:text-2xl font-semibold  text-primary mb-4">
              Transforming Waste. Restoring Earth.
            </p>
            <div className="relative bg-card w-full max-w-lg aspect-square flex items-center justify-center">
              <img
                src={globe}
                alt="Waste management operations"
                className="w-full h-full object-contain"
                style={{ animation: 'rotate-360 200s linear infinite' }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div
              className="mt-14 border border-border bg-card backdrop-blur-sm p-6 flex flex-col rounded-xl motion-safe:animate-[fadeUp_0.36s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: "120ms" }}
            >
              <div className="flex items-center gap-3 text-primary">
                <Target className="w-6 h-6" />
                <span className="text-sm uppercase ">Mission</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Deliver innovative waste management services with integrity, speed, and measurable impact.
              </p>
            </div>

            <div
              className="border border-border bg-card backdrop-blur-sm p-6 flex flex-col rounded-xl motion-safe:animate-[fadeUp_0.36s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: "220ms" }}
            >
              <div className="flex items-center gap-3 text-primary">
                <Eye className="w-6 h-6" />
                <span className="text-sm uppercase ">Vision</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Lead India's transition to sustainable waste systems through landfill mining and circular recovery.
              </p>
            </div>

            <div
              className="border border-primary/20 bg-secondary p-6 flex flex-col justify-center rounded-xl motion-safe:animate-[fadeUp_0.36s_ease-out_both] motion-reduce:animate-none"
              style={{ animationDelay: "320ms" }}
            >
              <div className="text-4xl font-bold text-foreground">
                10+
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Years of operational experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Vision;


