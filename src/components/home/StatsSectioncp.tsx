import { useEffect, useRef, useState } from "react";
import bgstat from "../../assets/website/background-1.png";

const stats = [
  { value: 2000, suffix: "+", label: "Acres Land Cleared" },
  { value: 55, suffix: "+", label: "Landfills Projects Completed" },
  { value: 2.5, suffix: "M+", label: "Tonnes RDF" },
  { value: 170, suffix: "+", label: "Projects in 15 Countries" },
  { value: 8, suffix: "M+", label: "CO2 Emissions Reduced" },
  { value: 30000, suffix: "+", label: "MT Daily Waste Processing" },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationRun, setAnimationRun] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {   
          setIsVisible(true);
          setAnimationRun((prev) => prev + 1);
          return;
        }

        setIsVisible(false);
      },
      { threshold: 0.35 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-background"
      data-anim-start="top 90%"
      data-anim-duration="1.1"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-[0.18]"
        style={{
          backgroundImage: `url(${bgstat})`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 bg-background/70" />

        <div className="container-main relative z-10 py-16 md:py-10">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="mt-8 text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
              Why Zigma
            </p>

            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Proven Ecological <span className="text-primary">Outcomes</span>
            </h2>

            <p className="mt-6 text-muted-foreground max-w-xl text-sm md:text-lg leading-relaxed">
              The waste management company specializes in providing innovative, eco-friendly solutions that reduce
              carbon footprint and optimize sustainable impact for clients worldwide.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div ref={statsRef}>
              <dl className="m-0 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="relative rounded-xl bg-card/40 px-5 py-6 text-center backdrop-blur-sm md:px-6 md:py-8"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(30px)",
                      transition: `opacity 0.6s ease-out ${index * 0.08}s, transform 0.6s ease-out ${index * 0.08}s`,
                    }}
                  >
                    {/* Dividers: 70% length, centered, no outer edge lines */}
                    {index % 2 === 0 && index !== stats.length - 1 && (
                      <span className="pointer-events-none absolute right-0 top-1/2 h-[70%] w-px -translate-y-1/2 bg-border/50 sm:hidden" />
                    )}
                    {index < 4 && (
                      <span className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-border/50 sm:hidden" />
                    )}

                    {index % 3 !== 2 && index !== stats.length - 1 && (
                      <span className="pointer-events-none absolute right-0 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-border/50 sm:block" />
                    )}
                    {index < 3 && (
                      <span className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[70%] -translate-x-1/2 bg-border/50 sm:block" />
                    )}

                    <dd className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">
                      {isVisible ? <CountUp key={`${stat.label}-${animationRun}`} end={stat.value} /> : "0"}
                      <span className="text-lg md:text-xl align-top text-primary">{stat.suffix}</span>
                    </dd>
                    <dt className="mt-1 text-sm md:text-base font-medium text-muted-foreground">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="group relative mx-auto w-full overflow-hidden border border-border shadow-xl">
        <div className="relative w-full pt-[56.25%]">
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/tf9xo3Q0x3Q?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=tf9xo3Q0x3Q&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
            title="Zigma avpn summit Video"
            className="absolute inset-0 h-full w-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

const CountUp = ({ end, duration = 4200, separator = "," }: { end: number; duration?: number; separator?: string }) => {
  const [count, setCount] = useState(0);
  const decimalPlaces = Number.isInteger(end) ? 0 : Math.min(2, (end.toString().split(".")[1] || "").length);

  useEffect(() => {
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const nextValue = easeOutQuart * end;
      const factor = 10 ** decimalPlaces;
      setCount(Math.round(nextValue * factor) / factor);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration, decimalPlaces]);

  return (
    <>
      {count.toLocaleString(undefined, {
        useGrouping: separator.length > 0,
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })}
    </>
  );
};

export default StatsSection;
