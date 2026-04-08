import { useEffect, useState, useRef } from "react";
import { MapPin, Trash2, Factory, Weight, Leaf } from "lucide-react";
import StatsSectioncp from "./StatsSectioncp";

const stats = [
  { icon: MapPin, value: 2000, suffix: "+", label: "Land Cleared" },
  { icon: Trash2, value: 600, suffix: "+", label: "Dumpsites Reclaimed" },
  { icon: Factory, value: 250, suffix: "+", label: "RDF Disposed" },
  { icon: Weight, value: 180, suffix: "+", label: "Tons Processed" },
  { icon: Leaf, value: 5330, suffix: "+", label: "CO2‚ Emissions Saved" },
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (

    <div>
    {/* <section ref={sectionRef} className="section-alt-bg section-padding">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Impact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            What have we achieved so far?
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="stat-card"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${index * 0.1}s`
              }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {isVisible ? <CountUp end={stat.value} /> : "0"}{stat.suffix}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section> */}

    <StatsSectioncp />
    </div>
  );
};

const CountUp = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <>{count.toLocaleString()}</>;
};

export default StatsSection;

