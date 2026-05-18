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

type EventItem = {
  id: string;
  title: string;
  dateLabel: string;
  time?: string;
  location: string;
  description: string;
  tag: string;
  image: string;
};

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

const pickEventAsset = (keywords: string[], fallbackIndex = 0) => {
  const normalizedKeywords = keywords.map((keyword) => keyword.toLowerCase());

  const matchedAsset =
    EVENT_ASSET_ENTRIES.find(([assetPath]) => {
      const normalizedTitle = formatGalleryTitle(assetPath).toLowerCase();
      return normalizedKeywords.every((keyword) => normalizedTitle.includes(keyword));
    }) ??
    EVENT_ASSET_ENTRIES.find(([assetPath]) => {
      const normalizedTitle = formatGalleryTitle(assetPath).toLowerCase();
      return normalizedKeywords.some((keyword) => normalizedTitle.includes(keyword));
    });

  return matchedAsset?.[1] ?? EVENT_ASSET_ENTRIES[fallbackIndex]?.[1] ?? heroBg;
};

const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "avpn-summit-workshop",
    title: "AVPN Summit Workshop",
    dateLabel: "2025",
    time: "08:30",
    location: "Chennai, India",
    description:
      "A workshop hosted at a reclaimed dumpsite to discuss scalable, city-ready remediation models and circular recovery outcomes.",
    tag: "Workshop",
    image: pickEventAsset(["cii"], 0),
  },
  {
    id: "municipal-collaboration-roundtable",
    title: "Municipal Collaboration Roundtable",
    dateLabel: "Date to be announced",
    time: "TBA",
    location: "India",
    description:
      "A forum with city partners to align execution plans, compliance reporting, and operational readiness for large-scale remediation.",
    tag: "Roundtable",
    image: pickEventAsset(["dma"], 1),
  },
  {
    id: "waste-to-resource-knowledge-session",
    title: "Waste-to-Resource Knowledge Session",
    dateLabel: "Date to be announced",
    time: "TBA",
    location: "India",
    description:
      "A knowledge-sharing session covering best practices in landfill mining, daily MSW processing, and integrated alternative fuel solutions.",
    tag: "Knowledge Session",
    image: pickEventAsset(["circular"], 2),
  },
];

const DISPLAY_EVENTS: EventAssetItem[] = EVENT_ASSET_ENTRIES.map(([assetPath, image]) => ({
  id: assetPath,
  title: formatGalleryTitle(assetPath),
  image,
})).sort((a, b) => a.title.localeCompare(b.title));

function CalendarIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 opacity-70" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M5 1v4M11 1v4M2 7h12" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 opacity-70" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5C12.5 3.51 10.49 1.5 8 1.5z" />
      <circle cx="8" cy="6" r="1.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 opacity-70" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 4.8V8l2.4 1.6" />
    </svg>
  );
}

function UpcomingEventsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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

        <div className="mx-auto mt-8 max-w-5xl rounded-[24px] bg-muted/30 px-4 py-4 shadow-sm md:px-5 md:py-5 lg:px-6 lg:py-6">
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            className="relative"
          >
            <CarouselContent className="-ml-0">
              {UPCOMING_EVENTS.map((event) => (
                <CarouselItem key={event.id} className="pl-0">
                  <article className="grid gap-5 rounded-[20px] bg-background/70 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                    <div className="overflow-hidden rounded-[18px] border border-border bg-card shadow-sm">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="aspect-[16/10] h-full w-full object-cover lg:aspect-[1.42/1]"
                      />
                    </div>

                    <div className="px-1 py-1 lg:px-3">
                      <h3 className="max-w-xl text-xl font-bold leading-snug text-foreground md:text-[1.7rem]">
                        {event.title}
                      </h3>

                      <div className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon />
                          <span>{event.dateLabel}</span>
                        </div>
                        {event.time ? (
                          <div className="flex items-center gap-2">
                            <ClockIcon />
                            <span>{event.time}</span>
                          </div>
                        ) : null}
                        <div className="flex items-center gap-2">
                          <PinIcon />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-5 flex items-center justify-center gap-2.5">
            {UPCOMING_EVENTS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Show event ${index + 1}`}
                className={`transition-all duration-300 ${
                  index === current
                    ? "h-2.5 w-7 rounded-sm bg-primary"
                    : "h-2.5 w-2.5 rounded-full border-2 border-border bg-transparent"
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
