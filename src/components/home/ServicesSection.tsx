import { Link } from "react-router-dom";
import landfillMining from "@/assets/website/landfill mining.png";
import landfillManagement from "@/assets/website/noida present.png";
import wetWaste from "@/assets/website/The Landfill Mining.jpg";

const services = [
  {
    title: "Landfill Mining",
    image: landfillMining,
    description: "Extracting valuable materials from legacy waste deposits.",
    tag: "Prominent Award",
  },
  {
    title: "Landfill Management",
    image: landfillManagement,
    description: "Modern approaches to waste disposal and site maintenance.",
    tag: "Recognized Program",
  },
  {
    title: "Wet Waste Management",
    image: wetWaste,
    description: "Organic waste processing and composting solutions.",
    tag: "Sustainability Focus",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding ">
      <div className="container-main">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Services
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
              Waste Management <span className="text-primary">Solutions</span>
            </h2>
          </div>

          {/* <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              aria-label="Previous recognition"
              className="h-12 w-12 rounded-full border border-border text-foreground transition hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              &#8592;
            </button>
            <button
              type="button"
              aria-label="Next recognition"
              className="h-12 w-12 rounded-full border border-border text-foreground transition hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              &#8594;
            </button>
          </div>
           */}
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-2 md:gap-6 w-[1200px] mx-auto" >
            {services.map((service, index) => (
              <div
                key={service.title}
                className={[
                  "group relative flex overflow-hidden rounded-xl border border-border shadow-lg transition-[flex] duration-500",
                  "flex-[1] basis-0 min-w-[160px] sm:min-w-[200px] md:min-w-0",
                  index === 1
                    ? "scale-[1.02]"
                    : "hover:opacity-100",
                  "hover:z-10 hover:flex-[3]",
                ].join(" ")}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-[240px] w-full object-cover transition-transform duration-700 group-hover:scale-110 md:h-[300px] lg:h-[340px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
                <div className="absolute inset-0 text-white">
                  <div className="absolute left-4 bottom-6 flex items-start gap-3">
                    <div
                      className="flex flex-col items-start"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/90 md:text-base">
                        {service.title}
                      </h3>
                      <Link
                        to="/services"
                        className="mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80 opacity-0 transition duration-300 group-hover:opacity-100 hover:text-white"
                      >
                        Read More &#8594;
                      </Link>
                      <span className="mt-4 h-12 w-px bg-primary/70" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
