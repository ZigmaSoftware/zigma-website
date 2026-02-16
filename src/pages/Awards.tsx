import React, { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import Awardbanner from "@/assets/people at zigma/Picture1.png";
import Award1 from "@/assets/Awards/award1.jpg";
import Award2 from "@/assets/Awards/award2.jpg";
import Award3 from "@/assets/Awards/award3.jpg";
import Award4 from "@/assets/Awards/award4.jpg";
import Award5 from "@/assets/Awards/award5.jpg";
import Award6 from "@/assets/Awards/award6.jpg";
import Award7 from "@/assets/Awards/award7.jpg";
import Award8 from "@/assets/Awards/award8.jpg";
import Award9 from "@/assets/Awards/award9.jpg";
import Award10 from "@/assets/Awards/award10.jpg";
import Award11 from "@/assets/Awards/award11.png";
import Award12 from "@/assets/Awards/award12_Swachha Andhra.png";


// import Picture1 from "@/assets/Awards/Picture1.png";
// import SwachhaAndhra from "@/assets/Awards/Swachha Andhra.png";

type Award = {
  id: string;
  title: string;
  org: string;
  year: number;
  category: "Sustainability" | "Operations" | "Innovation" | "Corporate";
  img: string;
  highlight?: boolean;
  desc: string;
};

type Metric = {
  label: string;
  value: string;
  helper: string;
};

const awards: Award[] = [
  {
    id: "a1",
    title: "1st Winner of Best Industry in Global Markets",
    org: "Global Awards Committee",
    year: 2025,
    category: "Corporate",
    img: Award1,
    highlight: true,
    desc:
      "for outstanding industry leadership and global excellence,recognized for consistent delivery, polished user journeys, andmeasurable outcomes across international markets..",
  },
  {
    id: "a2",
    title: "Indian Leadership Award for Industrial Development",
    org: "All India Achievers Foundation",
    year: 2017,
    category: "Innovation",
    img: Award2,
    desc:
      "Presented in recognition of leadership and contribution to industrial development, awarded on the occasion of the National Seminar on “Individual Achievements & National Development”, honoring excellence in industry and nation-building.",
  },
  {
    id: "a3",
    title: "Trees for Tigers – Bountiful Tree Recognition",
    org: "Geocycle",
    year: 2019,
    category: "Corporate",
    img: Award3,
    desc:
      "Honoured for contributing to environmental conservation through the Trees for Tigers initiative at the periphery of Sariska Tiger Reserve, Alwar, Rajasthan, recognizing commitment to sustainability and a zero-waste future.",
  },
  {
    id: "a4",
    title: "India Sustainable Waste Management Technology Innovation Award",
    org: "Frost & Sullivan",
    year: 2016,
    category: "Sustainability",
    img: Award4,
    desc:
      "Presented to Zigma Global Environ Solutions Private Limited for pioneering innovation in sustainable waste management technologies, recognizing excellence in technology-driven environmental solutions and industry best practices.",
  },
  {
    id: "a5",
    title: "Award for Excellence",
    org: "Municipalika & CAPEX",
    year: 2017,
    category: "Sustainability",
    img: Award5,
    desc:
      "Awarded in appreciation of participation in Municipalika and CAPEX 2017, the 14th International Exhibition on Smart & Sustainable City Solutions, recognizing excellence in municipal and urban infrastructure solutions.",
  },
  {
    id: "a6",
    title: "SKOCH Award – Corporate Silver",
    org: "SKOCH Group",
    year: 2017,
    category: "Operations",
    img: Award6,
    desc:
      "Awarded for Excellence in Municipal Solid Waste Landfill Mining, recognizing impactful corporate performance and sustainable waste management practices.",
  },
  {
    id: "a7",
    title: "Best Practices Award – Sustainable Waste Management Technology Innovation",
    org: "Frost & Sullivan",
    year: 2016,
    category: "Sustainability",
    img:Award7,
    desc: "Recognized for innovation and best practices in sustainable waste management technology, honoring leadership in transforming waste management solutions through advanced and scalable technologies.",
  },
  {
    id: "a8",
    title: "Indian Leadership Award for Industrial Development",
    org: "All India Achievers Foundation",
    year:2017,
    category: "Sustainability",
    img: Award8,
    desc: "Presented to Nagesh Prabhu C., Director – Zigma Global Environ Solutions Pvt. Ltd., in recognition of exemplary leadership and significant contribution to industrial development, honoring impact-driven leadership and enterprise excellence.",
  },
  {
    id: "a9",
    title: "Vijayawada Municipal Corporation – Best Performance Awards",
    org: "Vijayawada Municipal Corporation",
    year: 2019,
    category: "Corporate",
    img: Award9,
    desc: "Recognized for outstanding operational performance and individual excellence in municipal services. Awards include Best Performance Award (Organization) and Achiever’s Awards for Best Manager and Best Project Engineer, acknowledging impactful execution and service delivery by Zigma Global Environ Solutions Pvt. Ltd. and its leadership team..",
  },
  {
    id: "a10",
    title: "Memento – Appreciation of Participation",
    org: "Good Governance India Foundation",
    year: 2017,
    category: "Operations",
    img: Award10,
    desc: "Presented in appreciation of participation at the 14th International Conference & Exhibition on Smart & Sustainable City Solutions (Municipalika & CAPEX 2017), held at CIDCO Exhibition Centre, Navi Mumbai, recognizing engagement in advancing smart and sustainable urban development initiatives.",
  },
  {
    id: "a11",
    title: "Green Innovation Award",
    org: "Services Export Promotion Council (SEPC)",
    year: 2017,
    category: "Operations",
    img: Award11,
    desc: "Honoured at the National Conclave on Environmental Services and Environmental Musketeers Awards 2025 for driving green innovation in environmental services, recognizing leadership in sustainability, export-oriented solutions, and advancement of India’s environmental services ecosystem.",
  },
  {
    id: "a12",
    title: "State Level Award",
    org: "Government of Andhra Pradesh (Swachha Andhra Initiative)",
    year: 2027,
    category: "Corporate",
    img: Award12,
    desc: "Recognized for outstanding operational performance and individual excellence in municipal services. Awards include Best Performance Award (Organization) and Achiever’s Awards for Best Manager and Best Project Engineer, acknowledging impactful execution and service delivery by Zigma Global Environ Solutions Pvt. Ltd. and its leadership team.",
  },
  // {
  //   id: "a13",
  //   title: "Innovation Catalyst",
  //   org: "Innovation Board",
  //   year: 2015,
  //   category: "Innovation",
  //   img: Award10,
  //   desc: "Recognized for a sustained culture of experimentation and innovation.",
  // },
];

const metrics: Metric[] = [
  {
    label: "Total Awards",
    value: "13",
    helper: "Across corporate, sustainability, and innovation programs",
  },
  {
    label: "Years Recognized",
    value: "2015-2025",
    helper: "A decade of verified industry recognition",
  },
  {
    label: "Highlighted Wins",
    value: "4",
    helper: "Top-tier awards based on peer review",
  },
  {
    label: "Global Footprint",
    value: "6 Countries",
    helper: "Programs recognized across regions",
  },
];

const categories = [
  "All",
  "Corporate",
  "Sustainability",
  "Innovation",
  "Operations",
] as const;

type CategoryFilter = (typeof categories)[number];

function getYears(items: Award[]) {
  const years = Array.from(new Set(items.map((a) => a.year)));
  years.sort((a, b) => b - a);
  return years;
}

function groupByYear(items: Award[]) {
  const map = new Map<number, Award[]>();
  items.forEach((a) => {
    if (!map.has(a.year)) map.set(a.year, []);
    map.get(a.year)!.push(a);
  });
  const ordered = Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  return ordered;
}

export default function Awards(): JSX.Element {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [year, setYear] = useState<number | "All">("All");
  const [activeAward, setActiveAward] = useState<Award | null>(null);

  const years = useMemo(() => getYears(awards), []);

  const filtered = useMemo(() => {
    return awards.filter((a) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesYear = year === "All" || a.year === year;
      return matchesCategory && matchesYear;
    });
  }, [category, year]);

  const timeline = useMemo(() => groupByYear(filtered), [filtered]);

  return (
    <main className="min-h-screen bg-slate-50">
      <ScrollToTop />
      <Header />

      {/* HERO */}

     <section className="relative h-[90vh] min-h-[520px] overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${Awardbanner})` }}
    aria-hidden="true"
  />

  {/* Optional dark overlay for readability */}
  <div className="absolute inset-0 bg-black/10" aria-hidden="true" />

  {/* Content */}
  <div className="relative z-10 flex h-full items-end">
    <div className="max-w-7xl mx-auto px-6 pb-16 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
        Awards & Industry Recognition
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-200">
       Proven excellence across sustainability, operations, and large-scale environmental solutions.
      </p>
    </div>
  </div>
</section>


      {/* METRICS */}
      {/* <section className="mx-auto -mt-10 max-w-7xl px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-500">{m.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {m.value}
              </p>
              <p className="mt-2 text-xs text-slate-500">{m.helper}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* FILTERS */}
      {/* <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Filter Awards
              </h2>
              <p className="text-sm text-slate-500">
                Browse by year and recognition category.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="text-sm text-slate-600">
                <span className="sr-only">Filter by year</span>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={year}
                  onChange={(e) =>
                    setYear(
                      e.target.value === "All"
                        ? "All"
                        : Number(e.target.value)
                    )
                  }
                  aria-label="Filter awards by year"
                >
                  <option value="All">All years</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm text-slate-600">
                <span className="sr-only">Filter by category</span>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as CategoryFilter)
                  }
                  aria-label="Filter awards by category"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
      </section> */}

      {/* TIMELINE */}
      {/* <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">Timeline</h2>
          <p className="mt-2 text-sm text-slate-500">
            Awards organized by year for a quick historical view.
          </p>

          <div className="mt-6 space-y-8">
            {timeline.length === 0 ? (
              <p className="text-sm text-slate-500">
                No awards found for the selected filters.
              </p>
            ) : (
              timeline.map(([yearKey, items]) => (
                <div key={yearKey} className="grid gap-4 lg:grid-cols-12">
                  <div className="lg:col-span-2">
                    <div className="sticky top-20 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                      {yearKey}
                    </div>
                  </div>
                  <div className="lg:col-span-10">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {item.title}
                            </p>
                            <p className="text-xs text-slate-600">
                              {item.org} � {item.category}
                            </p>
                          </div>
                          <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                            {item.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section> */}

      {/* MASONRY GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        {/* <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Award Gallery
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Visual archive of certificates and recognitions.
            </p>
          </div>
        </div> */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs text-slate-500">{metric.helper}</p>
              </div>

            ))}
          </div> */}

          {filtered.length === 0 ? (
            <p className="text-sm text-slate-500">
              No awards found for the selected filters.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((award) => (
                <article
                  key={award.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between px-4 pt-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {award.category}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                      {award.year}
                    </span>
                  </div>
                  <div className="px-4 pt-3">
                    <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <img
                        src={award.img}
                        alt={`${award.title} certificate`}
                        className="h-44 w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {award.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{award.org}</p>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                      onClick={() => setActiveAward(award)}
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {activeAward ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeAward.title} details`}
          onClick={() => setActiveAward(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-base font-semibold text-slate-900">
                  {activeAward.title}
                </p>
                <p className="text-xs text-slate-600">
                  {activeAward.org} - {activeAward.year}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                onClick={() => setActiveAward(null)}
                aria-label="Close award details"
              >
                Close
              </button>
            </div>
            <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_1fr]">
              <div className="flex items-center justify-center rounded-xl bg-slate-50 p-3">
                <img
                  src={activeAward.img}
                  alt={`${activeAward.title} certificate`}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Description
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {activeAward.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </main>
  );
}
