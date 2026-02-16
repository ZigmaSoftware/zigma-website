import { useEffect, useState, useRef } from "react";
import { MapPin, Trash2, Factory, Weight, Leaf, TrendingUp } from "lucide-react";

const stats = [
  { icon: MapPin, value: 3230, suffix: "+", label: "Land Cleared", description: "Acres restored" },
  { icon: Trash2, value: 600, suffix: "+", label: "Dumpsites Reclaimed", description: "Sites remediated" },
  { icon: Factory, value: 250, suffix: "+", label: "RDF Disposed", description: "Co-processing facilities" },
  { icon: Weight, value: 180, suffix: "K+", label: "Tons Processed", description: "Monthly capacity" },
  { icon: Leaf, value: 5330, suffix: "+", label: "CO₂ Emissions Saved", description: "Metric tons offset" },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="container-main relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-4 h-4" />
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 leading-tight">
            Measurable Environmental
            <span className="block text-primary">Outcomes</span>
          </h2>
        </div>

        {/* Hero Metric */}
        {/* <div  
          className="relative mb-16 p-8 md:p-12 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,250,251,0.8))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.05)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          Glass Shine Effect
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 50%)'
            }}
          />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900">
                {isVisible ? <CountUp end={5816672} /> : "0"}
                <span className="text-emerald-600 text-3xl md:text-4xl ml-2">MT</span>
              </div>
              <div className="text-xl md:text-2xl text-slate-700 mt-4 font-medium">
                Metric Tons of Legacy Waste Processed
              </div>
            </div>
            <div className="h-px md:h-32 w-full md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-emerald-300 to-transparent" />
            <div className="text-center md:text-left max-w-sm">
              <p className="text-slate-600 text-lg leading-relaxed">
                Transforming legacy dumpsites into reclaimed land assets while 
                enabling circular waste recovery systems across India.
              </p>
              <div className="mt-6 flex items-center gap-2 text-emerald-600">
                <Leaf className="w-5 h-5" />
                <span className="font-semibold">Carbon Neutral Operations</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl p-6 bg-card border border-border shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-md"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease-out ${index * 0.1}s`
              }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/70 opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <div className="relative z-10 mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-primary transition-colors" strokeWidth={2} />
                </div>
              </div>

              {/* Value */}
              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {isVisible ? <CountUp end={stat.value} /> : "0"}
                  <span className="text-lg text-primary">{stat.suffix}</span>
                </div>
                <p className="text-sm text-foreground mt-2 font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
          <a 
            href="/milestones"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            View Full Impact Report
            <TrendingUp className="w-5 h-5" />
          </a>
        </div> */}
      </div>
    </section>
  );
};

const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <>{count.toLocaleString()}</>;
};

export default StatsSection;
