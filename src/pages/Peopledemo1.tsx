import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { TrendingUp, BarChart3, Users } from "lucide-react";
import bg from "@/assets/background-1.png";

/* ───────── Media Import (Images + Videos) ───────── */

const mediaModules = import.meta.glob(
  "../assets/people at zigma/**/*.{jpg,jpeg,png,webp,mp4,webm}",
  { eager: true }
);

type MediaType = {
  src: string;
  label: string;
  type: "image" | "video";
  category: "office" | "plants" | "beyond" | "other";
};

const allMedia: MediaType[] = Object.entries(mediaModules).map(
  ([path, mod]: any) => ({
    src: mod.default,
    label: path.split("/").pop()?.replace(/\.[^.]+$/, "") || "media",
    type: path.match(/\.(mp4|webm)$/i) ? "video" : "image",
    category: path.toLowerCase().includes("/office/")
      ? "office"
      : path.toLowerCase().includes("/plants/")
      ? "plants"
      : path.toLowerCase().includes("/zigma beyond work/")
      ? "beyond"
      : "other",
  })
);

/* ───────── Media Allocation ───────── */

const getMediaByCategory = (category: MediaType["category"]) =>
  allMedia.filter((item) => item.category === category);

const allocateImages = (
  category: MediaType["category"],
  count: number,
  startIndex = 0
) => {
  const items = getMediaByCategory(category);
  return items.slice(startIndex, startIndex + count);
};

/* ───────── Column Media ───────── */

const officeCol1Images = allocateImages("office", 8, 0);
const officeCol2Images = allocateImages("office", 8, 8);
const officeCol3Images = allocateImages("office", 8, 16);

const plantsCol1Images = allocateImages("plants", 8, 0);
const plantsCol2Images = allocateImages("plants", 8, 8);
const plantsCol3Images = allocateImages("plants", 8, 16);

/* ───────── Card Heights ───────── */

const CARD_HEIGHTS = [
  "tall",
  "short",
  "medium",
  "tall",
  "short",
  "medium",
  "tall",
  "short",
] as const;

type CardHeight = (typeof CARD_HEIGHTS)[number];

const heightMap: Record<CardHeight, string> = {
  tall: "h-[340px] lg:h-[300px] md:h-[240px] sm:h-[200px]",
  medium: "h-[230px] lg:h-[200px] md:h-[160px] sm:h-[140px]",
  short: "h-[160px] lg:h-[140px] md:h-[120px] sm:h-[110px]",
};

/* ───────── Scroll Column ───────── */

interface ScrollColumnProps {
  images: MediaType[];
  speed: number;
}

const ScrollColumn = ({ images, speed }: ScrollColumnProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    const clone = cloneRef.current;

    if (!track || !clone) return;

    const animate = () => {
      if (!pausedRef.current) {
        offset.current += speed;
        const trackH = track.scrollHeight + 20;

        if (offset.current >= trackH) offset.current -= trackH;

        track.style.transform = `translateY(-${offset.current}px)`;
        clone.style.transform = `translateY(-${offset.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [speed]);

  const cards = images.map((img, i) => ({
    img,
    height: CARD_HEIGHTS[i % CARD_HEIGHTS.length],
  }));

  const CardList = ({ refProp }: { refProp: React.RefObject<HTMLDivElement> }) => (
    <div ref={refProp} className="flex flex-col gap-5 w-full">
      {cards.map(({ img, height }, i) => (
        <div
          key={i}
          className={`relative rounded-[18px] overflow-hidden flex-shrink-0 border border-white/70
          shadow-[0_4px_16px_rgba(31,38,135,0.08),0_1px_3px_rgba(0,0,0,0.06)]
          group cursor-pointer transition-all duration-300 hover:scale-[1.03]
          hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(31,38,135,0.18)]
          ${heightMap[height]}`}
        >
          {img.type === "video" ? (
            <video
              src={img.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-white/8" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="relative overflow-hidden h-full"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <CardList refProp={trackRef} />
      <CardList refProp={cloneRef} />
    </div>
  );
};

/* ───────── Values Section ───────── */

const VALUES = [
  {
    Icon: TrendingUp,
    title: "Supersonic Growth",
    text: "Accelerate your career with real ownership and challenging projects.",
  },
  {
    Icon: BarChart3,
    title: "Continuous Opportunity",
    text: "Work across domains and expand your skills.",
  },
  {
    Icon: Users,
    title: "People-First Culture",
    text: "A collaborative and energetic work environment.",
  },
];

/* ───────── Tabs ───────── */

const TABS = [
  { id: "our-office", label: "Our Office" },
  { id: "our-plants", label: "Our Plants" },
  { id: "beyond-work", label: "Zigma Beyond Work" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ───────── Main Page ───────── */

const PeopleAtZigma = () => {
  const [activeTab, setActiveTab] = useState<TabId>("our-office");
  const [galleryExpanded, setGalleryExpanded] = useState(false);

  const scrollToSection = (id: TabId) => {
    setActiveTab(id);

    setTimeout(() => {
      const mainEl = document.querySelector("main");
      if (mainEl)
        window.scrollTo({ top: mainEl.offsetTop - 110, behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Header />

      {/* Navigation */}

      <div className="sticky z-[70] bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? "text-green-600 border-green-600"
                  : "text-slate-600 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1">

        {activeTab === "our-office" && (
          <section className="container-main">
            <div
              className="mx-auto w-[95%] max-w-[1200px] overflow-hidden relative pb-20"
              style={{ height: galleryExpanded ? "120vh" : "100vh" }}
            >
              <div
                className="grid h-full gap-5 px-8"
                style={{ gridTemplateColumns: "1fr 1.65fr 1fr" }}
              >
                <ScrollColumn images={officeCol1Images} speed={0.4} />
                <ScrollColumn images={officeCol2Images} speed={0.65} />
                <ScrollColumn images={officeCol3Images} speed={0.5} />
              </div>
            </div>
          </section>
        )}

        {activeTab === "our-plants" && (
          <section>
            <div
              className="mx-auto w-[95%] max-w-[1200px] pb-20 overflow-hidden relative"
              style={{ height: galleryExpanded ? "120vh" : "100vh" }}
            >
              <div
                className="grid h-full gap-5 px-8"
                style={{ gridTemplateColumns: "1fr 1.65fr 1fr" }}
              >
                <ScrollColumn images={plantsCol1Images} speed={0.4} />
                <ScrollColumn images={plantsCol2Images} speed={0.65} />
                <ScrollColumn images={plantsCol3Images} speed={0.5} />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Values Section */}

      <section
        id="beyond-work"
        className="py-20 bg-cover bg-center min-h-[60vh]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-7">
            {VALUES.map(({ Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-8 border shadow-sm">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-secondary mb-6 mx-auto">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-lg font-bold text-center">{title}</h3>
                <p className="text-muted-foreground text-center">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PeopleAtZigma;