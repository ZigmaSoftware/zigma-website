import { useEffect, useState, useRef } from "react";
import { MapPin, Trash2, Factory, Weight, Leaf, Play,Pause } from "lucide-react";
// import video from "../../assets/website/AVPN_SUMMIT 2024.mp4";

const stats = [
  { icon: MapPin, value: 3230, suffix: "+", label: "Land Cleared", description: "Acres restored" },
  { icon: Trash2, value: 600, suffix: "+", label: "Dumpsites Reclaimed", description: "Sites remediated" },
  { icon: Factory, value: 250, suffix: "+", label: "RDF Disposed", description: "Co-processing facilities" },
  { icon: Weight, value: 180, suffix: "K+", label: "Tons Processed", description: "Monthly capacity" },
  { icon: Leaf, value: 5330, suffix: "+", label: "CO2 Emissions Saved", description: "Metric tons offset" },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIntroFlipping, setIsIntroFlipping] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedIntroFlip = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasPlayedIntroFlip.current) {
            hasPlayedIntroFlip.current = true;
            setIsIntroFlipping(true);
            setTimeout(() => setIsIntroFlipping(false), 1400);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  
  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      void videoRef.current.play();
      setIsVideoPlaying(true);
      return;
    }

    videoRef.current.pause();
    setIsVideoPlaying(false);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      
      {/*  Light Gray Background Top ? 60% */}
  <div className="absolute inset-0 -z-10 h-[70%] bg-[url('https://xpeedstudio.com/wp/medizco/assets/images/backgrounds/background-1.png')] bg-cover bg-center bg-no-repeat" />

      {/* Subtle Theme Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/60  blur-3xl" />
      </div>

      <div className="container-main relative z-10 py-16 md:py-10 px-4">

        {/* Header */}
       
          <div className="">

            {/* center */}
            <div className="text-center">
              {/* <p className="text-primary text-sm md:text-base font-semibold mb-3 tracking-wide uppercase">
                Why Choose Us
              </p> */}
                <p className="text-xs md:text-sm uppercase tracking-[0.35em]  text-muted-foreground">
             Why Choose Us
          </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Proven Ecological <span className="text-primary">Outcomes</span>
               
              </h2>
            </div>

            {/* center */}
            <div >
              <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-center text-sm md:text-lg  ">
                The waste management company specializes in providing innovative,
                eco-friendly solutions that reduce carbon footprint and optimize
                sustainable impact for clients worldwide.
              </p>
            </div>

          </div>
       

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-3 mb-2 max-w-">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative  transition-all duration-500 hover:-translate-y-1 [perspective:1200px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease-out ${index * 0.1}s`,
              }}
            >
              <div
                className={`relative h-[172px] w-full  transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${
                  isIntroFlipping ? "[transform:rotateY(180deg)]" : ""
                }`}
                style={{ transitionDelay: isIntroFlipping ? `${index * 120}ms` : "0ms" }}
              >
                <div className="absolute inset-0  p-6 [backface-visibility:hidden]">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1">
                      {isVisible ? <CountUp end={stat.value} /> : "0"}
                      <span className="text-xl md:text-2xl text-primary">
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-lg p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] bg-primary/5 border border-primary/20">
                  <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                    <stat.icon className="w-10 h-10 text-primary" />
                    <p className="text-sm font-semibold text-foreground">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="group relative overflow-hidden shadow-xl border border-border md:w-[1000px] md:h-[400px] mx-auto">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          >
            {/* <source src={video}  type="video/mp4" /> */}
            <source  type="video/mp4" />
          </video>
          <button
            type="button"
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
            onClick={toggleVideoPlayback}
            className={`group/control absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${
              isVideoPlaying
                ? "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                : "opacity-100"
            }`}
          >
            <span className="relative inline-flex h-36 w-36 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-white/28 backdrop-blur-[1px]" />
              <span className="absolute inset-4 rounded-full bg-white/16 transition-transform duration-300 group-hover/control:scale-105" />
              <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-[0_10px_24px_rgba(15,23,42,0.25)] transition-transform duration-300 group-hover/control:scale-105">
                {isVideoPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 fill-current" />}
              </span>
            </span>
          </button>

          <div className="relative z-10 min-h-[400px] md:min-h-[500px]" />
        </div>

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
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <>{count.toLocaleString()}</>;
};

export default StatsSection;
