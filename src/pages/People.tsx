import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import bg from "@/assets/background-1.png";

import { TrendingUp, BarChart3, Users, ChevronLeft, ChevronRight } from "lucide-react";

const peopleImageModules = import.meta.glob<{ default: string }>(
  "../assets/people at zigma/*.{jpg,jpeg,JPG,png,webp,avif,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

const peopleRelatedTitles = [
  "Team Celebration",
  "Festival Moments",
  "Culture Day",
  "Office Bonding",
  "Zigma Family",
  "Together at Work",
  "Team Spirit",
  "Happy Workspace",
  "Shared Success",
  "Life at Zigma",
  "Collaboration Time",
  "Workplace Memories",
];

const collageImages = Object.entries(peopleImageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: "base" }))
  .map(([, module], index) => {
    const title = peopleRelatedTitles[index % peopleRelatedTitles.length];
    return { title, image: module.default };
  })
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: "base" }));

const getColumnCount = (width: number) => {
  if (width >= 1024) return 5;
  if (width >= 640) return 3;
  return 2;
};

const getCircularOffset = (index: number, activeIndex: number, total: number) => {
  if (total <= 1) return 0;
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

/*  
   COMPONENT
===================================================== */
const People = () => {
  const [columnCount, setColumnCount] = useState(() =>
    typeof window !== "undefined" ? getColumnCount(window.innerWidth) : 5
  );
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      collageImages.map(
        (item) =>
          new Promise<[string, number]>((resolve) => {
            const img = new Image();
            img.onload = () => {
              const ratio = img.naturalWidth > 0 ? img.naturalHeight / img.naturalWidth : 1;
              resolve([item.image, ratio]);
            };
            img.onerror = () => resolve([item.image, 1]);
            img.src = item.image;
          })
      )
    ).then((entries) => {
      if (cancelled) return;
      setImageRatios(Object.fromEntries(entries));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const balancedColumns = useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => [] as typeof collageImages);
    const heights = Array.from({ length: columnCount }, () => 0);

    for (const item of collageImages) {
      const ratio = imageRatios[item.image] ?? 1;
      let shortestColumn = 0;

      for (let i = 1; i < columnCount; i += 1) {
        if (heights[i] < heights[shortestColumn]) shortestColumn = i;
      }

      columns[shortestColumn].push(item);
      heights[shortestColumn] += ratio;
    }

    return columns;
  }, [columnCount, imageRatios]);

  const carouselImages = useMemo(() => {
    const recommended = collageImages.filter((item) => {
      const ratio = imageRatios[item.image] ?? 1;
      const widthOverHeight = ratio > 0 ? 1 / ratio : 1;
      return widthOverHeight >= 1.18 && widthOverHeight <= 2.1;
    });

    return recommended.length >= 5 ? recommended : collageImages;
  }, [imageRatios]);

  const totalSlides = carouselImages.length;

  useEffect(() => {
    if (totalSlides === 0) return;
    if (activeIndex >= totalSlides) {
      setActiveIndex(0);
    }
  }, [activeIndex, totalSlides]);

  const visibleSlides = useMemo(
    () =>
      carouselImages
        .map((slide, index) => ({
          ...slide,
          index,
          offset: getCircularOffset(index, activeIndex, totalSlides),
        }))
        .filter((slide) => Math.abs(slide.offset) <= 3),
    [activeIndex, carouselImages, totalSlides]
  );

  const goToSlide = (direction: -1 | 1) => {
    if (totalSlides <= 1) return;
    setActiveIndex((prev) => (prev + direction + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Header />

      <div className="pt-20">
        {/* MASONRY GALLERY */}
        <section className="bg-white py-1 w-full">
          <div className="mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 px-1 sm:px-2 lg:px-1">
              {balancedColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-1">
                  {column.map((item, imageIndex) => (
                    <div key={`${item.title}-${imageIndex}`} className="group relative overflow-hidden bg-white">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="block w-full h-auto object-cover transition duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-95"
                      />
                      <div className="pointer-events-none absolute inset-0 ring-0 ring-white/70 transition duration-300 group-hover:ring-2" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STACKED CAROUSEL */}
        {/* <section className="bg-white w-full py-6 sm:py-8 lg:py-10">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-10">
            <div className="relative h-[280px] sm:h-[360px] lg:h-[460px] overflow-hidden">
              {visibleSlides.map((slide) => {
                const distance = Math.abs(slide.offset);
                const isActive = slide.offset === 0;
                const xOffset = isActive ? 0 : Math.sign(slide.offset) * (120 + distance * 95);
                const scale = isActive ? 1 : Math.max(0.58, 0.95 - distance * 0.16);
                const opacity = isActive ? 1 : Math.max(0.22, 0.72 - distance * 0.18);
                const zIndex = 20 - distance;

                return (
                  <button
                    key={`${slide.title}-${slide.index}`}
                    type="button"
                    onClick={() => setActiveIndex(slide.index)}
                    className="absolute left-1/2 top-1/2 h-[80%] w-[80%] max-w-[600px] -translate-y-1/2 overflow-hidden rounded-[26px] border border-white/75 shadow-[0_18px_40px_rgba(15,23,42,0.25)] transition-all duration-500 ease-out sm:h-[84%] sm:w-[76%] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    style={{
                      transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
                      opacity,
                      zIndex,
                    }}
                    aria-label={`Show ${slide.title}`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      style={{ filter: isActive ? "none" : "brightness(0.4) saturate(0.85)" }}
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 ${
                        isActive
                          ? "bg-gradient-to-t from-black/45 via-primary/12 to-transparent"
                          : "bg-black/18"
                      }`}
                    />
                    {isActive ? (
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 text-left sm:p-6">
                        <h3 className="text-lg font-semibold text-white sm:text-[38px]">
                          {slide.title}
                        </h3>
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goToSlide(-1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-slate-50 text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
              </button>
              <button
                type="button"
                onClick={() => goToSlide(1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-slate-50 text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </section> */}

        {/*        WORKING @ ZIGMA – REFINED DESIGN */}
        <section className=" min-h-[100svh]  py-6 lg:py-8 "   style={{
                  backgroundImage: `url(${bg})`,
                 
                }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              {/* <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Working @ Zigma
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                A performance-driven workplace where people, purpose, and
                progress move together.
              </p> */}

                          <span className="text-sm  uppercase tracking-[0.3em] text-muted-foreground">
             Working @ Zigma
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
              Where Performance Meets<span className="text-primary"> Purpose</span>
            </h2>

            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-center text-sm md:text-lg  ">
                  A performance-driven workplace where people, purpose, and
                progress move together.
              </p>
            </div>

            <div className="grid text-center grid-cols-1 md:grid-cols-3 gap-8  container-main section-padding">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-50 mb-6 mx-auto">
                  <TrendingUp className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Supersonic Growth
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Accelerate your career with real ownership, challenging
                  projects, and fast-tracked learning opportunities.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-50 mb-6 mx-auto">
                  <BarChart3 className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Continuous Opportunity
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Work across domains, expand your skills, and unlock growth
                  paths aligned with your ambition.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-50 mb-6 mx-auto">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  People-First Culture
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Thrive in a collaborative, respectful, and high-energy
                  environment that values people as much as performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default People;
