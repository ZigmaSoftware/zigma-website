import { useState, useMemo, type CSSProperties } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

/* --------- Media Import --------- */
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
  ([path, mod]) => ({
    src: (mod as { default: string }).default,
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

/* --------- Helpers --------- */
const getMediaByCategory = (category: MediaType["category"]) =>
  allMedia.filter((item) => item.category === category);

const getAllImages = (category: MediaType["category"]) =>
  getMediaByCategory(category).filter((item) => item.type === "image");

/* --------- Tabs --------- */
const TABS = [
  { id: "office", label: "Our Office " },
  { id: "plants", label: "Our Plants" },
  { id: "beyond", label: "Zigma beyond work" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* --------- Main Component --------- */
const People = () => {
  const [activeTab, setActiveTab] = useState<TabId>("office");
  const currentImages = useMemo(() => getAllImages(activeTab), [activeTab]);
  const laneImages = useMemo(() => {
    const lanes: [MediaType[], MediaType[], MediaType[]] = [[], [], []];
    currentImages.forEach((item, index) => {
      lanes[index % 3].push(item);
    });
    return lanes.map((lane) => (lane.length > 0 ? [...lane, ...lane] : lane)) as [
      MediaType[],
      MediaType[],
      MediaType[]
    ];
  }, [currentImages]);
  const laneDurations = useMemo(() => {
    const base = Math.max(420, Math.ceil(currentImages.length / 8) * 12);
    return [base, base * 1.25, base * 1.5];
  }, [currentImages.length]);
  const getLaneStyle = (duration: number, laneIndex: number): CSSProperties => ({
    animationName: "peopleScrollUp",
    animationDuration: `${duration}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDirection: laneIndex === 1 ? "normal" : "normal",
    animationDelay: `${laneIndex * -3.5}s`,
    willChange: "transform",
  });

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

      {/* Life at Zigma Section */}
      <section className="section-padding pt-0 pb-[100px]">
        <div className="container-main">
          {/* <div className="w-full md:w-1/2 mx-auto mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl leading-tight font-bold text-foreground text-left md:text-center">
              <span className="text-primary">Life </span>at Zigma
            </h2>
            <p className="mt-2 text-base md:text-lg font-normal text-muted-foreground text-left md:text-center">
              Experience a workplace that values innovation, collaboration and makes a meaningful impact.
              Indulge in an intrapreneurial culture that enables you to find your own identity.
            </p>
          </div> */}

          <div className="pt-5 md:pt-0 px-[10px] md:px-0 ">
            <div className="flex flex-col">
              <div className="w-full md:w-fit md:mx-auto">
                <div className="flex flex-nowrap md:justify-center gap-0 overflow-x-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`whitespace-nowrap text-base md:text-lg font-semibold text-left px-3 py-2 md:px-[50px] md:py-6 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "text-primary border-primary"
                          : "text-foreground/80 border-transparent hover:text-primary "
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 min-w-0 flex-1">
                <div className="grid grid-cols-1 gap-3 md:hidden">
                  {currentImages.map((item, index) => (
                    <div
                      key={`${activeTab}-mobile-${item.src}-${index}`}
                      className="rounded-[10px] overflow-hidden bg-slate-100"
                    >
                      <img
                        src={item.src}
                        alt={item.label}
                        className="w-full h-auto block"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>

                <div className="hidden md:grid md:grid-cols-3 gap-5">
                  {laneImages.map((lane, laneIndex) => (
                    <div key={`${activeTab}-lane-${laneIndex}`} className="overflow-hidden h-[920px]">
                      <div
                        className="flex flex-col gap-5 hover:[animation-play-state:paused]"
                        style={getLaneStyle(laneDurations[laneIndex], laneIndex)}
                      >
                        {lane.map((item, index) => (
                          <div
                            key={`${activeTab}-lane-${laneIndex}-${item.src}-${index}`}
                            className="rounded-[10px] overflow-hidden bg-slate-100 h-[300px]"
                          >
                            <img
                              src={item.src}
                              alt={item.label}
                              className="w-full h-full object-cover block"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {currentImages.length === 0 && (
                  <div className="text-sm text-muted-foreground px-2 py-4">No images found.</div>
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
