import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import heroBg from "@/assets/website/hero/DA4A6583.webp";
import sectionBg from "@/assets/website/background-1.png";
import varunEventPoster from "@/assets/Events/varun.webp";
import lfmEventPoster from "@/assets/Events/LFM.webp";

type EventAssetItem = {
  id: string;
  title: string;
  image: string;
};

const EVENT_ASSETS = import.meta.glob("../assets/Events/*.{jpg,jpeg,jfif,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const formatGalleryTitle = (assetPath: string) =>
  assetPath
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim() ?? "Event Image";

const EVENT_ASSET_ENTRIES = Object.entries(EVENT_ASSETS).sort(([a], [b]) => a.localeCompare(b));

const UPCOMING_EVENT_ASSET_NAMES = ["varun.webp", "LFM.webp"];

const DISPLAY_EVENTS: EventAssetItem[] = EVENT_ASSET_ENTRIES.filter(([assetPath]) => {
  const assetName = assetPath.split("/").pop() ?? "";
  return !UPCOMING_EVENT_ASSET_NAMES.includes(assetName);
}).map(([assetPath, image]) => ({
  id: assetPath,
  title: formatGalleryTitle(assetPath),
  image,
})).sort((a, b) => a.title.localeCompare(b.title));

const UPCOMING_EVENT_POSTERS = [
  {
    id: "varun",
    title: "Upcoming event poster",
    image: varunEventPoster,
  },
  {
    id: "lfm",
    title: "Upcoming event poster",
    image: lfmEventPoster,
  },
];

function UpcomingEventsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) return;

    const syncCurrent = () => setCurrent(api.selectedScrollSnap());

    syncCurrent();
    api.on("select", syncCurrent);
    api.on("reInit", syncCurrent);

    return () => {
      api.off("select", syncCurrent);
      api.off("reInit", syncCurrent);
    };
  }, [api]);

  useEffect(() => {
    if (!api || isHovered || UPCOMING_EVENT_POSTERS.length < 2) return;

    const autoplay = window.setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => window.clearInterval(autoplay);
  }, [api, isHovered]);

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Featured Updates
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Upcoming <span className="text-primary">Events</span>
          </h2>
        </div>

        <div
          className="mx-auto mt-6 max-w-xs rounded-xl bg-muted/30 p-2.5 shadow-sm sm:max-w-sm md:max-w-md md:p-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            className="relative"
          >
            <CarouselContent className="-ml-0">
              {UPCOMING_EVENT_POSTERS.map((poster) => (
                <CarouselItem key={poster.id} className="pl-0">
                  <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
                    <img
                      src={poster.image}
                      alt={poster.title}
                      className="h-[350px] w-full max-w-full object-contain md:max-h-[450px]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-3 flex items-center justify-center gap-2">
            {UPCOMING_EVENT_POSTERS.map((poster, index) => (
              <button
                key={poster.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Show event ${index + 1}`}
                className={`transition-all duration-300 ${
                  index === current
                    ? "h-2 w-6 rounded-sm bg-primary"
                    : "h-2 w-2 rounded-full border-2 border-border bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Events(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <p className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
              Newsroom
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight text-white">
              Events
            </h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl text-center">
              Track workshops, summits, and partner engagements showcasing our work in remediation
              and sustainable waste solutions.
            </p>
          </div>
        </section>

        <UpcomingEventsSection />

        <section
          id="event-archive"
          className="section-padding bg-top bg-repeat"
          style={{ backgroundImage: `url(${sectionBg})`, backgroundSize: "520px auto" }}
        >
          <div className="container-main">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Archive</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Past <span className="text-primary">Events</span>
              </h2>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {DISPLAY_EVENTS.map((event) => (
                <article
                  key={event.id}
                  className="group break-inside-avoid mb-8 rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
