import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/Events/DA4A6583.webp";
import sectionBg from "@/assets/website/background-1.png";
import ckcImg from "@/assets/Events/CKC- Vruthi 2025/picture.jpeg";
import ckcPdf from "@/assets/Events/CKC- Vruthi 2025/exibition_Letter.pdf";
import bordaImg from "@/assets/Events/BORDA/1732039843831.jpeg";
import ciiImg from "@/assets/Events/CII/1668965411101.jpeg";
import ciiAgenda from "@/assets/Events/CII/Agenda.pdf";
import ciiSession from "@/assets/Events/CII/Final Session 1- Day 1 (1).pdf";
import csrImg from "@/assets/Events/CSR-ESG-2022-Hanoi/WhatsApp Image 2022-10-13 at 10.18.08 AM.jpeg";
import csrPdf from "@/assets/Events/CSR-ESG-2022-Hanoi/CSR+ESG 2022 (10 October 2022) (1).pdf";
import ficciIscImg from "@/assets/Events/FICCI-ISC/FICCI.jpeg";
import ficciIscPdf from "@/assets/Events/FICCI-ISC/Revised Agenda 20-21 November V3.docx.pdf";
import ficciSustImg from "@/assets/Events/FICCI-Sustainability Conference/1740405608518.jpeg";
import ficciSustPdf1 from "@/assets/Events/FICCI-Sustainability Conference/Biomining and Bioremediation_Report 1.pdf";
import ficciSustPdf2 from "@/assets/Events/FICCI-Sustainability Conference/Presentation by Dr Bharat Bhushan Nagar.pdf";

type EventItem = {
  id: string;
  title: string;
  dateLabel: string;
  time?: string;
  location: string;
  description: string;
  tag: string;
  isPast?: boolean;
};

type PastEventItem = EventItem & {
  image: string;
  pdfs?: { label: string; url: string }[];
};

const UPCOMING_EVENTS: EventItem[] = [
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

const PAST_EVENTS: PastEventItem[] = [
  {
    id: "past-1",
    title: "CKC – Vruthi 2025: Circular Economy & Waste Innovation Exhibition",
    dateLabel: "2025",
    location: "India",
    description: "",
    tag: "Exhibition",
    isPast: true,
    image: ckcImg,
    pdfs: [{ label: "Exhibition Letter", url: ckcPdf }],
  },
  {
    id: "past-2",
    title: "BORDA South Asia Decentralised Waste Treatment Forum",
    dateLabel: "Nov 2024",
    location: "India",
    description: "",
    tag: "Conference",
    isPast: true,
    image: bordaImg,
  },
  {
    id: "past-3",
    title: "CII Sustainable Waste-to-Resource Industry Summit",
    dateLabel: "2022",
    location: "India",
    description: "",
    tag: "Summit",
    isPast: true,
    image: ciiImg,
    pdfs: [
      { label: "Agenda", url: ciiAgenda },
      { label: "Session 1 – Day 1", url: ciiSession },
    ],
  },
  {
    id: "past-4",
    title: "CSR & ESG 2022 – Hanoi International Sustainability Forum",
    dateLabel: "10 Oct 2022",
    location: "Hanoi, Vietnam",
    description: "",
    tag: "Forum",
    isPast: true,
    image: csrImg,
    pdfs: [{ label: "Event Brochure", url: csrPdf }],
  },
  {
    id: "past-5",
    title: "FICCI ISC – Industry Sustainability Conclave",
    dateLabel: "20–21 Nov",
    location: "India",
    description: "",
    tag: "Conclave",
    isPast: true,
    image: ficciIscImg,
    pdfs: [{ label: "Revised Agenda", url: ficciIscPdf }],
  },
  {
    id: "past-6",
    title: "FICCI Sustainability Conference – Biomining & Bioremediation",
    dateLabel: "2025",
    location: "India",
    description: "",
    tag: "Conference",
    isPast: true,
    image: ficciSustImg,
    pdfs: [
      { label: "Biomining Report", url: ficciSustPdf1 },
      { label: "Presentation", url: ficciSustPdf2 },
    ],
  },
];

const PLACEHOLDER_GRADIENTS = [
  "from-emerald-100 to-teal-200",
  "from-green-100 to-emerald-200",
  "from-teal-100 to-cyan-200",
  "from-lime-100 to-green-200",
];

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 opacity-60 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M5 1v4M11 1v4M2 7h12" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-4 h-4 opacity-60 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5C12.5 3.51 10.49 1.5 8 1.5z" />
      <circle cx="8" cy="6" r="1.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 3L5 8l5 5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3l5 5-5 5" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 1h6l4 4v10H4V1z" />
      <path d="M10 1v4h4" />
      <path d="M6 9h4M6 12h4" />
    </svg>
  );
}

function UpcomingSlider() {
  const [current, setCurrent] = useState(0);
  const total = UPCOMING_EVENTS.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);
  const event = UPCOMING_EVENTS[current];

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Updates</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Upcoming <span className="text-primary">Events</span>
          </h2>
        </div>

        <div className="relative">
          <article
            key={event.id}
            className="grid grid-cols-1 md:grid-cols-[320px_1fr] rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm transition-all duration-500"
          >
            <div
              className={`bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[current % PLACEHOLDER_GRADIENTS.length]} min-h-[200px] md:min-h-0 flex items-center justify-center`}
              aria-hidden="true"
            >
              <svg className="w-16 h-16 text-primary/20" viewBox="0 0 64 64" fill="currentColor">
                <rect x="4" y="4" width="56" height="56" rx="6" />
                <path fill="white" opacity="0.4" d="M20 44l10-14 8 10 6-8 10 12H20z" />
                <circle cx="42" cy="22" r="6" fill="white" opacity="0.4" />
              </svg>
            </div>
            <div className="p-7 flex flex-col justify-center gap-3">
              <span className="inline-block self-start text-[10px] font-bold uppercase tracking-[0.22em] text-primary bg-primary/10 px-3 py-1 rounded-full">
                {event.tag}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                {event.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><CalendarIcon /> {event.dateLabel}</span>
                <span className="flex items-center gap-1.5"><PinIcon /> {event.location}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{event.description}</p>
              <a href="#" className="group mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read More <ArrowRightIcon />
              </a>
            </div>
          </article>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="p-2 rounded-full border border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-colors" aria-label="Previous">
              <ChevronLeft />
            </button>
            <span className="text-sm text-slate-500">{current + 1} / {total}</span>
            <button onClick={next} className="p-2 rounded-full border border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-colors" aria-label="Next">
              <ChevronRight />
            </button>
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
        {/* ── Hero ── */}
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

        {/* ── Upcoming Events ── */}
        {/* <UpcomingSlider /> */}

        {/* ── Past Events ── */}
        <section
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
              {PAST_EVENTS.map((event) => (
                <article key={event.id} className="group break-inside-avoid mb-8 rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="pt-3 px-3 pb-4 flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{event.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <PinIcon /> {event.location}
                    </p>

                    {event.pdfs && event.pdfs.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {event.pdfs.map((pdf) => (
                          <a
                            key={pdf.label}
                            href={pdf.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary border border-primary/30 px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                          >
                            <PdfIcon /> {pdf.label}
                          </a>
                        ))}
                      </div>
                    )}
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
