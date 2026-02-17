import React from "react";
// import leaderImg from "@/assets/website/Mr. Boopathy Dharmaraj.png";
import { Quote } from "lucide-react";

// Using the same Mission/Vision text but in a narrative format as implied by "message"
// If specific message text is provided later, simply update this const.
const leaderMessage = `
  To deliver innovative, sustainable waste management solutions that protect our environment and empower communities. 
  Our vision is to be the global leader in circular ecosystem transformation, setting the standard for a zero-waste future.
  We operate with unyielding integrity, ensuring safety, transparency, and long-term value for all stakeholders.
`;

const Vision = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">

             <div className="text-left mb-10 md:mb-14">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
             Leadership Vision
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Driving Sustainable <span className="text-primary">Change</span>
          </h2>
          
        </div>

            <div className="relative">
              <Quote className="absolute -top-2 -left-4 w-8 h-8 text-primary/20 rotate-180" />
              <p className="text-muted-foreground text-lg leading-relaxed relative z-10 ">
                {leaderMessage}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold text-foreground   font-display">
                Zigma Global Environ Solutions Pvt Ltd.
              </h3>
              {/* <p className="text-primary font-medium mt-1">
                Managing Director
              </p> */}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="order-1 lg:order-2 relative">
            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent -z-10" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 -z-10 blur-xl" />

            <div className="relative  overflow-hidden aspect-[4/5] lg:aspect-square">
              {/* <img
                src={leaderImg}
                alt="Mr. Boopathy Dharmaraj - Managing Director"
                className="w-full h-full object-cover"
              /> */}

              {/* Optional Overlay Gradient for text readability if needed, though clean looks better */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Vision;
