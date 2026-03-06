import { useEffect, useState, useRef } from "react";
import { MapPin, Trash2, Factory, Weight, Leaf, Play, Pause } from "lucide-react";
import bgstat from "../../assets/background-1.png";

const stats = [
  { icon: MapPin, value: 750, suffix: "+", label: "Acres Land Cleared", description: "Acres restored" },
  { icon: Trash2, value: 55, suffix: "+", label: "Landfills Projects completed", description: "Sites remediated" },
  { icon: Factory, value:2.5, suffix: "+", label: "Milliontonnes RDF", description: "milliontonnes Fossil fuels replaced with RDF" },
  { icon: Weight, value: 170, suffix: "K+", label: " Projects 15 countries globally", description: "Projects completed" },
  { icon: Leaf, value: 8, suffix: "+", label: "Reduction of CO 2 emissions", description: "Million tons offset" },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIntroFlipping, setIsIntroFlipping] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
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

  const postPlayerCommand = (command: "playVideo" | "pauseVideo") => {
    if (!videoRef.current?.contentWindow) return;
    videoRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "*"
    );
  };

  const toggleVideoPlayback = () => {
    if (!isPlayerReady) return;

    if (isVideoPlaying) {
      postPlayerCommand("pauseVideo");
      setIsVideoPlaying(false);
      return;
    }

    postPlayerCommand("playVideo");
    setIsVideoPlaying(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden"
      data-anim-start="top 90%"
      data-anim-duration="1.1"
    >
      {/* Top background image (70% section height) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${bgstat})`,
          clipPath: "inset(0 0 30% 0)",
        }}
      />

      {/* Subtle Theme Glow */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/60 blur-3xl" />
      </div>

      <div className="container-main relative z-10 py-16 md:py-10">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Why Zigma
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Proven Ecological <span className="text-primary">Outcomes</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-center text-sm md:text-lg  ">
                The waste management company specializes in providing innovative,
                eco-friendly solutions that reduce carbon footprint and optimize
                sustainable impact for clients worldwide.
              </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-3 mb-2">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative transition-all duration-500 hover:-translate-y-1 [perspective:1200px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease-out ${index * 0.1}s`,
              }}
            >
              <div
                className={`relative h-[172px] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${isIntroFlipping ? "[transform:rotateY(180deg)]" : ""}`}
                style={{ transitionDelay: isIntroFlipping ? `${index * 120}ms` : "0ms" }}
              >
                <div className="absolute inset-0 rounded-lg [backface-visibility:hidden] bg-primary/5 border border-primary/20">
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1">
                      {isVisible ? <CountUp end={stat.value} /> : "0"}
                      <span className="text-xl md:text-2xl text-primary">{stat.suffix}</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden] bg-primary/5 border border-primary/20">
                  <div className="h-full flex flex-col items-center justify-center text-center gap-2">
                    <stat.icon className="w-10 h-10 text-primary" />
                    <p className="text-sm font-semibold text-foreground">{stat.label}</p>
                    <p className="text-xs font-medium text-primary">{stat.value.toLocaleString()}{stat.suffix}</p>
                    <p className="text-[11px] leading-tight text-muted-foreground/90">{stat.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>      
      </div>
          
        {/* Video Section with YouTube Embed */}
        <div className="group  relative aspect-video h-[500px] w-full overflow-hidden shadow-xl border border-border mx-auto">
          <iframe
            ref={videoRef}
            src="https://www.youtube.com/embed/hdu_hZGvom4?enablejsapi=1&autoplay=0&loop=1&playlist=hdu_hZGvom4&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            title="Zigma Video"
            onLoad={() => setIsPlayerReady(true)}
          />
          {/* <button
            type="button"
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
            onClick={toggleVideoPlayback}
            className="group/control absolute inset-0 z-20 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
          >
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-[0_10px_24px_rgba(15,23,42,0.25)] transition-transform duration-300 group-hover/control:scale-105">
              {isVideoPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 fill-current" />}
            </span>
          </button> */}
        </div>

    </section>
  );
};

const CountUp = ({ end, duration = 4200, separator = "," }: { end: number; duration?: number; separator?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <>{count.toLocaleString(undefined, { useGrouping: separator.length > 0 })}</>;
};

export default StatsSection;
