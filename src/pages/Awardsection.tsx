import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";


import Awardbanner from "@/assets/award bg.jpg";

import Award1 from "@/assets/award1.jpg";
import Award2 from "@/assets/award2.jpg";
import Award3 from "@/assets/award3.webp";
import Award4 from "@/assets/award4.jpg";
import Award5 from "@/assets/award5.jpg";
import Award6 from "@/assets/award6.jpg";

type Award = {
  title: string;
  org: string;
  year: string;
  img: string;
  highlight?: boolean;
  desc?: string;
};

const awards: Award[] = [
  {
    title: "Best industry in global markets",
    org: "Global Awards Committee",
    year: "2025",
    img: Award1,
    highlight: true,
    desc:
      "Recognized for clean layouts, strong visual hierarchy, and polished user journeys across devices. The award highlights consistent delivery of high-quality solutions with measurable real-world impact.",
  },
  {
    title: "Innovation Excellence",
    org: "Tech Leaders Forum",
    year: "2023",
    img: Award2,
    desc:
      "Awarded for breakthrough innovation that improved operational reliability, scalability, and long-term system sustainability across deployments.",
  },
  {
    title: "Top Startup Award",
    org: "Startup India",
    year: "2022",
    img: Award3,
    desc:
      "Recognized for rapid growth, adoption, and tangible outcomes delivered through production-grade platforms.",
  },
  {
    title: "Best Environmental Organization",
    org: "Environmental Awards",
    year: "2021",
    img: Award4,
    desc:
      "Awarded for environmental stewardship, responsible operations, and measurable sustainability outcomes.",
  },
  {
    title: "Sustainability Leadership",
    org: "Green Impact Forum",
    year: "2020",
    img: Award5,
    desc:
      "Recognized for sustainability-first thinking, long-term impact strategies, and operational excellence.",
  },
  {
    title: "Operations Excellence",
    org: "Industry Recognition",
    year: "2019",
    img: Award6,
    desc:
      "Awarded for consistent execution, quality delivery, and strong governance frameworks.",
  },
];

export default function AwardsSection(): JSX.Element {
  const sorted = useMemo(
    () => [...awards].sort((a, b) => Number(b.year) - Number(a.year)),
    []
  );

  const startIndex = Math.max(0, sorted.findIndex((a) => a.highlight));
  const [idx, setIdx] = useState(startIndex);
  const active = sorted[idx] ?? sorted[0];

  const prev = () =>
    setIdx((p) => (p - 1 + sorted.length) % sorted.length);

  const next = () =>
    setIdx((p) => (p + 1) % sorted.length);

  /* ✅ AUTO SLIDE EVERY 5 SECONDS */
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((p) => (p + 1) % sorted.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sorted.length]);

  if (!active) return null;

  return (
    <section className="w-full bg-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* HEADER */}
        <div className="relative mb-8 overflow-hidden border border-slate-200">
          <div
           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${Awardbanner})` }}
            // className="absolute inset-0 bg-cover bg-center"
            // style={{ backgroundImage: `url(${Awardbanner})` }}
          />
          <div className="absolute inset-0" />

          <div className="relative px-6 py-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              <Sparkles className="h-4 w-4" />
              Awards & Recognition
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white">
              Celebrating Excellence
            </h2>
          </div>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT LIST */}
          <div className="lg:col-span-4">
            <div className=" border border-slate-200 bg-white p-4 space-y-3">
              {sorted.map((a, i) => (
                <button
                  key={a.title}
                  onClick={() => setIdx(i)}
                  className={[
                    "w-full rounded-2xl px-4 py-3 text-left transition",
                    i === idx
                      ? "bg-amber-50 border border-amber-200"
                      : "bg-slate-50 border border-slate-200 hover:bg-slate-100",
                  ].join(" ")}
                >
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {a.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 truncate">
                    {a.org} • {a.year}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SPOTLIGHT */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="border-slate-200 bg-white overflow-hidden"
              >
                {/* IMAGE WITH HOVER CONTROLS */}
                <div className="relative aspect-[16/9] group">
                  <img
                    src={active.img}
                    alt={active.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black/40 p-3 rounded-full text-white"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-black/40 p-3 rounded-full text-white"
                  >
                    <ChevronRight />
                  </button>

                  {active.highlight && (
                    <div className="absolute top-4 right-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white">
                      Featured
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-slate-900">
                    {active.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    {active.org} • {active.year}
                  </p>

                  <div className="mt-6 rounded-2xl bg-slate-50 p-6">
                    <p className="text-base text-slate-700 leading-relaxed">
                      {active.desc}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}


