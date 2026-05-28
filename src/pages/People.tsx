import { useEffect, useRef, useState, useMemo, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/animation/Reveal";
import heroImage from "@/assets/website/hero/people-hero.jpg.jpeg";

gsap.registerPlugin(ScrollTrigger);

// ==================== CONSTANTS ====================
const SLOW_EASE = 'power2.out';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const HERO_IMAGE_SCALE = 1.1;
const HERO_IMAGE_Y_END = 60;
const ANIMATION_BASE_DURATION = 0;
const ANIMATION_LANE_MULTIPLIERS = [1, 1, 1] as const;

// ==================== TYPES ====================
type MediaCategory = "office" | "plants" | "beyond" | "other";
type MediaType = {
  src: string;
  label: string;
  type: "image" | "video" | "youtube";
  category: MediaCategory;
  poster?: string;
};

const YOUTUBE_PATTERNS: RegExp[] = [
  /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([A-Za-z0-9_-]{11})/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:.*&)?v=([A-Za-z0-9_-]{11})/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([A-Za-z0-9_-]{11})/i,
];

const getYouTubeId = (source: string): string | null => {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = source.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

const getYouTubeEmbedUrl = (source: string): string => {
  const id = getYouTubeId(source);
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`
    : source;
};

const getYouTubeThumbnail = (source: string): string => {
  const id = getYouTubeId(source);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
};

const YOUTUBE_BEYOND_MEDIA: MediaType[] = [
  {
    src: "https://youtube.com/shorts/l-IyVxyO1jw",
    label: "Zigma beyond work short",
    type: "youtube",
    category: "beyond",
    poster: getYouTubeThumbnail("https://youtube.com/shorts/l-IyVxyO1jw"),
  },
  {
    src: "https://youtu.be/W6385dkjsjc",
    label: "Zigma beyond work video",
    type: "youtube",
    category: "beyond",
    poster: getYouTubeThumbnail("https://youtu.be/W6385dkjsjc"),
  },
  {
    src: "https://www.youtube.com/watch?v=-zGlQTDRWuc",
    label: "Zigma beyond work video",
    type: "youtube",
    category: "beyond",
    poster: getYouTubeThumbnail("https://www.youtube.com/watch?v=-zGlQTDRWuc"),
  },
];

// ==================== MEDIA LOADING & PROCESSING ====================
/**
 * Dynamically imports all media files from the "people at zigma" assets folder
 */
const mediaModules = import.meta.glob(
  "../assets/people at zigma/**/*.{jpg,jpeg,png,webp,mp4,webm}",
  { eager: true }
);

/**
 * Determines the category of media based on the file path
 */
const getCategoryFromPath = (path: string): MediaCategory => {
  const lowerPath = path.toLowerCase();
  if (lowerPath.includes("/office/")) return "office";
  if (lowerPath.includes("/plants/")) return "plants";
  if (lowerPath.includes("/zigma beyond work/")) return "beyond";
  return "other";
};

/**
 * Determines if a file is a video based on its extension
 */
const isVideo = (path: string): boolean => /\.(mp4|webm)$/i.test(path);

/**
 * Processes imported media modules into structured MediaType array
 */
const allMedia: MediaType[] = Object.entries(mediaModules).map(
  ([path, mod]) => ({
    src: (mod as { default: string }).default,
    label: path.split("/").pop()?.replace(/\.[^.]+$/, "") || "media",
    type: isVideo(path) ? "video" : "image",
    category: getCategoryFromPath(path),
  })
);

const mediaItems: MediaType[] = [...allMedia, ...YOUTUBE_BEYOND_MEDIA];

// ==================== HELPER FUNCTIONS ====================
/**
 * Filters media items by category
 */
const getMediaByCategory = (category: MediaCategory) =>
  mediaItems.filter((item) => item.category === category);

/**
 * Gets all gallery media for a given category
 */
const getGalleryMedia = (category: MediaCategory) => {
  const items = getMediaByCategory(category);

  if (category !== "beyond") return items;

  return [
    ...items.filter((item) => item.type === "youtube"),
    ...items.filter((item) => item.type !== "youtube"),
  ];
};

/**
 * Gets the hero image for the hero section
 */
const getHeroImage = (): string => {
  return heroImage;
};

// ==================== TABS CONFIGURATION ====================
const TABS = [
  { id: "office", label: "Our Office" },
  { id: "plants", label: "Our Plants" },
  { id: "beyond", label: "Zigma beyond work" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ==================== UTILITY FUNCTIONS FOR LAYOUT ====================
/**
 * Distributes images into 3 columns and duplicates each lane for continuous scroll effect
 */
const createLaneImages = (images: MediaType[]): [MediaType[], MediaType[], MediaType[]] => {
  const lanes: [MediaType[], MediaType[], MediaType[]] = [[], [], []];
  
  images.forEach((item, index) => {
    lanes[index % 3].push(item);
  });
  
  return lanes.map((lane) => 
    lane.length > 0 ? [...lane, ...lane] : lane
  ) as [MediaType[], MediaType[], MediaType[]];
};

/**
 * Calculates animation duration for each lane
 * Base duration scales based on number of images
 */
const calculateLaneDurations = (imageCount: number): [number, number, number] => {
  const base = Math.max(ANIMATION_BASE_DURATION, Math.ceil(imageCount / 8) * 12);
  return [
    base,
    base * ANIMATION_LANE_MULTIPLIERS[1],
    base * ANIMATION_LANE_MULTIPLIERS[2],
  ];
};

/**
 * Generates CSS-in-JS styles for animated lane containers
 */
const getLaneStyle = (duration: number): CSSProperties => ({
  animationName: "peopleScrollUp",
  animationDuration: `${duration}s`,
  animationTimingFunction: "linear",
  animationIterationCount: "infinite",
  animationDirection: "normal",
  animationDelay: "inherit",
  willChange: "transform",
});

type MediaCardProps = {
  item: MediaType;
  className?: string;
};

const MediaCard = ({ item, className = "" }: MediaCardProps) => {
  if (item.type === "youtube") {
    return (
      <div className={`overflow-hidden rounded-[10px] bg-slate-100 ${className}`}>
        <iframe
          src={getYouTubeEmbedUrl(item.src)}
          title={item.label}
          className="h-full min-h-[240px] w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div className={`overflow-hidden rounded-[10px] bg-slate-100 ${className}`}>
        <video
          src={item.src}
          className="block h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-[10px] bg-slate-100 ${className}`}>
      <img
        src={item.src}
        alt={item.label}
        className="block h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const People = () => {
  // ---- State Management ----
  const [activeTab, setActiveTab] = useState<TabId>("office");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ---- Refs ----
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);

  // ---- Memoized Values ----
  const currentMedia = useMemo(() => getGalleryMedia(activeTab), [activeTab]);
  
  const laneImages = useMemo(
    () => createLaneImages(currentMedia),
    [currentMedia]
  );
  
  const laneDurations = useMemo(
    () => calculateLaneDurations(currentMedia.length),
    [currentMedia.length]
  );

  // ---- Effects ----
  
  /**
   * Monitor user's reduced motion preference
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    
    handleChange(); // Set initial state
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  /**
   * Apply parallax scroll animation to hero image
   * Respects user's reduced motion preference
   */
  useEffect(() => {
    if (!heroSectionRef.current || !heroImageRef.current || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageRef.current,
        { y: 0, scale: HERO_IMAGE_SCALE },
        {
          y: HERO_IMAGE_Y_END,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, heroSectionRef.current);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Header />

      <style>{`
        @keyframes peopleScrollUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>

      {/* ========== HERO SECTION ========== */}
      <section
        id="people-hero"
        ref={heroSectionRef}
        data-no-animate
        className="relative box-border flex min-h-[100svh] items-center overflow-hidden pt-20 scroll-mt-24 lg:scroll-mt-28"
      >
        {/* Background Image with Parallax Effect */}
        <img
          ref={heroImageRef}
          src={getHeroImage()}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/30" aria-hidden="true" /> */}

        {/* Content */}
        <div className="container-main relative grid items-center justify-items-center">
          <Reveal
            className="w-full items-center justify-items-center text-center"
            variant="fade-up"
            data-anim-start="top 94%"
            data-anim-duration="1.6"
            data-anim-ease={SLOW_EASE}
          >
            <div className="text-lg font-medium uppercase tracking-[0.35em] text-white/85">
              Our Team
            </div>
            <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-5xl">
              Life at Zigma
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/90">
              Experience a workplace that values innovation, collaboration and makes a meaningful impact.
              Indulge in an intrapreneurial culture that enables you to find your own identity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ========== LIFE AT ZIGMA GALLERY SECTION ========== */}
      <section className="section-padding pt-0 pb-[100px]">
        <div className="container-main">
          <div className="pt-5 md:pt-0 px-[10px] md:px-0">
            <div className="flex flex-col">
              {/* Tab Navigation */}
              <div className="w-full md:w-fit md:mx-auto">
                <div className="flex flex-nowrap md:justify-center gap-0 overflow-x-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`whitespace-nowrap text-base md:text-lg  text-left px-3 py-2 md:px-[50px] md:py-6 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "text-primary border-primary"
                          : "text-foreground/80 border-transparent hover:text-primary"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Content */}
              <div className="mt-5 min-w-0 flex-1">
                {/* Mobile Gallery - Single Column */}
                <div className="grid grid-cols-1 gap-3 md:hidden">
                  {currentMedia.map((item, index) => (
                    <MediaCard
                      key={`${activeTab}-mobile-${item.src}-${index}`}
                      item={item}
                      className="min-h-[240px]"
                    />
                  ))}
                </div>

                {/* Desktop Gallery - 3 Column Animated Lanes */}
                <div className="hidden md:grid md:grid-cols-3 gap-5">
                  {laneImages.map((lane, laneIndex) => (
                    <div 
                      key={`${activeTab}-lane-${laneIndex}`} 
                      className="overflow-hidden h-[920px]"
                    >
                      <div
                        className="flex flex-col gap-5 hover:[animation-play-state:paused]"
                        style={{
                          ...getLaneStyle(laneDurations[laneIndex]),
                          animationDelay:
                            activeTab === "beyond" ? "10s" : `${laneIndex * -3.5}s`,
                        }}
                      >
                        {lane.map((item, index) => (
                          <MediaCard
                            key={`${activeTab}-lane-${laneIndex}-${item.src}-${index}`}
                            item={item}
                            className="h-[300px]"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {currentMedia.length === 0 && (
                  <div className="text-sm text-muted-foreground px-2 py-4">
                    No images found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default People;
