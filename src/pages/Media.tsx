import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Herobg from "@/assets/website/news_bg.jpeg";
import bg1 from "@/assets/background-1.png";

type MediaAsset = {
  src: string;
  name: string;
  path: string;
};

const mediaAssets: MediaAsset[] = Object.entries(
  import.meta.glob("../assets/News/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
    eager: true,
    import: "default",
  }),
)
  .map(([path, src]) => ({
    src: src as string,
    name: path.split("/").pop() ?? "News Image",
    path,
  }))
  .sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));

const headlineByImageKey: Record<string, string> = {
  "get 1": "TTD takes up mammoth waste management exercise",
  "get 2": "What cities are doing with land reclaimed from garbage dumps",
  get: "Indian jackal spotted for 1st time at Pallikaranai marsh",
  "legacy waste remediation": "Corporation plans biomining of waste at Athipet dumpyard",
  "matter of pride for zigma wherein the land reclaimed through bio mining will be used for buildin":
    "Ariyamangalam dump yard will soon get a materials recovery facility centre",
  "proud to announce that zigma s contribution to sustainable waste management has been recognized":
    "GVMC unveils plan to clear 24 lakh tonnes waste from Kapuluppada",
  "the reclaimed land at the ariyamangalam dump yard is now a beacon of sustainable development th":
    "Reclaimed Ariyamangalam site emerges as a model for sustainable urban restoration",
  "transforming waste into opportunity the bhandewadi story at blue planet s zigma global we ar":
    "Transforming waste into opportunity: The Bhandewadi story",
  "we are happy to share the success of our biomining initiative at the bhandewadi dumping yard w":
    "Biomining success at Bhandewadi dumping yard gains public recognition",
  n2: "City remediation program advances legacy waste clearance targets",
  n3: "Municipal action plan accelerates landfill recovery and reuse",
  n4: "Integrated biomining operations strengthen urban sustainability outcomes",
  n5: "Project teams scale field execution for high-volume waste processing",
  n6: "Public infrastructure planning aligned with reclaimed land utilization",
  n8: "Environmental compliance and monitoring framework reports steady progress",
  n9: "Circular resource recovery model expands across operational clusters",
  n10: "Large-scale waste reduction milestone recorded in active project zone",
  n11: "Urban ecological restoration program shows measurable impact gains",
  n12: "Regional waste-to-resource strategy enters next implementation phase",
  sm1: "ZIGMA completes major landfill reclamation milestone in Delhi",
  sm2: "Innovative biomining platform receives national recognition",
  sm4: "State partnership launched for waste-to-resource transformation",
  sm5: "Operations expanded across key South India project corridors",
  sm6: "Tier-2 city biomining rollout improves implementation velocity",
  sm7: "Material recovery workflow increases reusable resource output",
  sm8: "Multi-city remediation portfolio reaches key execution milestone",
  sm15: "Digital site governance platform improves project transparency",
  sm16: "Engineering teams enhance processing efficiency across active sites",
  sm17: "Legacy dumpsite conversion supports safer urban land rehabilitation",
  sm18: "Operational controls strengthen quality and environmental performance",
  sm19: "Waste handling modernization improves end-to-end site productivity",
  sm20: "Municipal collaboration expands sustainable remediation capacity",
  sm21: "Field deployment program advances compliance-led execution standards",
  sm22: "Strategic infrastructure planning supports long-term landfill diversion",
  sm23: "Technology-led screening systems increase material recovery accuracy",
  sm24: "Scalable remediation architecture supports high-throughput operations",
  sm25: "On-ground execution teams deliver consistent sustainability outcomes",
  sm26: "Resource recovery value chain strengthened through process integration",
  sm27: "Environmental restoration metrics improve across completed work zones",
  sm28: "Urban waste transformation initiative records sustained progress",
  sm29: "Program governance model reinforces transparent performance tracking",
};

const toHeadlineKey = (fileName: string) =>
  fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const Media = () => {
  const CARDS_PER_LEVEL = 6;
  const MAX_EXPAND_LEVELS = 3;
  const [activeGalleryAsset, setActiveGalleryAsset] = useState<MediaAsset | null>(
    null,
  );
  const [galleryLevel, setGalleryLevel] = useState(1);
  const [typedHeadline, setTypedHeadline] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const gallerySpotlightRef = useRef<HTMLDivElement | null>(null);

  const totalLevels = useMemo(
    () =>
      Math.min(
        MAX_EXPAND_LEVELS,
        Math.max(1, Math.ceil(mediaAssets.length / CARDS_PER_LEVEL)),
      ),
    [mediaAssets.length],
  );

  const visibleGalleryAssets = useMemo(() => {
    if (galleryLevel >= totalLevels) return mediaAssets;
    return mediaAssets.slice(0, galleryLevel * CARDS_PER_LEVEL);
  }, [galleryLevel, totalLevels]);

  const hasMoreCards = totalLevels > 1;

  useEffect(() => {
    if (!activeGalleryAsset || !gallerySpotlightRef.current) return;
    const headerElement = document.querySelector("header");
    const headerOffset =
      headerElement instanceof HTMLElement ? headerElement.offsetHeight + 16 : 112;
    const targetY =
      gallerySpotlightRef.current.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: Math.max(targetY, 0),
      behavior: "smooth",
    });
  }, [activeGalleryAsset]);

  const formatHeadline = (fileName: string) => {
    const key = toHeadlineKey(fileName);
    return (
      headlineByImageKey[key] ??
      "Official press release update from ZIGMA Media Center"
    );
  };

  const selectedHeadline = useMemo(
    () => (activeGalleryAsset ? formatHeadline(activeGalleryAsset.name) : ""),
    [activeGalleryAsset],
  );

  useEffect(() => {
    if (!selectedHeadline) {
      setTypedHeadline("");
      setIsTyping(false);
      return;
    }

    const fullHeadline = selectedHeadline;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedHeadline(fullHeadline);
      setIsTyping(false);
      return;
    }

    let rafId = 0;
    const startedAt = performance.now();
    const durationMs = Math.max(1000, fullHeadline.length * 45);
    setTypedHeadline("");
    setIsTyping(true);

    const step = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / durationMs, 1);
      const charCount = Math.max(1, Math.floor(progress * fullHeadline.length));
      setTypedHeadline(fullHeadline.slice(0, charCount));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setTypedHeadline(fullHeadline);
        setIsTyping(false);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [selectedHeadline]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Herobg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium">Media Center</div>
            <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">News And Media</h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl text-center">
              Stay updated with announcements, project highlights, and verified press coverage from Zigma Global Environ Solutions.
            </p>
          </div>
        </section>

     

        <section
          className="section-padding"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="container-main">
            {activeGalleryAsset && (
              <div
                ref={gallerySpotlightRef}
                className="mb-6 scroll-mt-32 border border-slate-300 bg-white shadow-sm transition-all duration-500 ease-out"
              >
                <div className="border-b border-border px-4 py-3 md:px-6 md:py-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Headline Focus
                  </p>
                  <h3 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
                    {typedHeadline}
                    <span
                      className={`ml-0.5 inline-block h-[1em] w-[2px] bg-primary align-middle ${
                        isTyping ? "animate-pulse" : "opacity-50"
                      }`}
                    />
                  </h3>
                </div>
                <img
                  src={activeGalleryAsset.src}
                  alt={activeGalleryAsset.name}
                  className="max-h-[48vh] w-full object-contain object-top bg-white md:max-h-[54vh]"
                />
              </div>
            )}

            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                  Visual Archive
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                  Complete News <span className="text-primary">Image Library</span>
                </h2>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {visibleGalleryAssets.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => setActiveGalleryAsset(item)}
                  className="group w-full overflow-hidden border border-border bg-card text-left shadow-sm transition hover:border-primary/40"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[150px_1fr]">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="h-38 w-full object-contain bg-white"
                    />
                    <div className="flex items-center border-t border-border px-4 py-4 md:border-l md:border-t-0">
                      <h4 className="line-clamp-2 text-base md:text-lg font-bold leading-snug text-foreground group-hover:text-primary">
                        {formatHeadline(item.name)}
                      </h4>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {hasMoreCards ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setGalleryLevel((prev) =>
                      prev < totalLevels ? prev + 1 : 1,
                    )
                  }
                  className="inline-flex items-center rounded-md border border-primary/30 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  {galleryLevel < totalLevels
                    ? `Explore More Press Release (${galleryLevel + 1}/${totalLevels})`
                    : "Show Less Press Release"}
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Media;
