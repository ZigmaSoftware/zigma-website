import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/website/news_bg.jpeg";
import sectionBg from "@/assets/website/background-1.png";

type EventItem = {
  id: string;
  title: string;
  dateLabel: string;
  location: string;
  description: string;
  tag: string;
};

const EVENTS: EventItem[] = [
  {
    id: "event-1",
    title: "AVPN Summit Workshop",
    dateLabel: "2025",
    location: "Chennai, India",
    description:
      "A workshop hosted at a reclaimed dumpsite to discuss scalable, city-ready remediation models and circular recovery outcomes.",
    tag: "Summit",
  },
  {
    id: "event-2",
    title: "Municipal Collaboration Roundtable",
    dateLabel: "Upcoming",
    location: "India",
    description:
      "A forum with city partners to align execution plans, compliance reporting, and operational readiness for large-scale remediation.",
    tag: "Roundtable",
  },
  {
    id: "event-3",
    title: "Waste-to-Resource Knowledge Session",
    dateLabel: "Upcoming",
    location: "India",
    description:
      "A knowledge-sharing session covering best practices in landfill mining, daily MSW processing, and integrated alternative fuel solutions.",
    tag: "Session",
  },
];

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
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18"
            aria-hidden="true"
          />

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

        <section
          className="section-padding bg-top bg-repeat"
          style={{ backgroundImage: `url(${sectionBg})`, backgroundSize: "520px auto" }}
        >
          <div className="container-main">
            <div className="px-1 py-1 text-center md:px-0">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Updates
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Upcoming <span className="text-primary">Events</span>
              </h2>
              <p className="mt-3 max-w-3xl mx-auto text-sm md:text-base text-slate-600">
                New event listings will be added here as announcements go live.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EVENTS.map((event) => (
                <article
                  key={event.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/35"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {event.tag}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">
                        {event.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {event.dateLabel}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-600">{event.location}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {event.description}
                  </p>
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

