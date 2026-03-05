import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import bg from "@/assets/background-1.png";

import { TrendingUp, BarChart3, Users } from "lucide-react";

const peopleImageModules = import.meta.glob<{ default: string }>(
  "../assets/people at zigma/*.{jpg,jpeg,JPG,png,webp,avif,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

const collageImages = Object.entries(peopleImageModules)
  .map(([path, module]) => {
    const fileName = path.split("/").pop()?.replace(/\.[^/.]+$/, "") ?? "People at Zigma";
    const title = fileName.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
    return { title, image: module.default };
  })
  .sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: "base" }));

const getColumnCount = (width: number) => {
  if (width >= 1024) return 5;
  if (width >= 640) return 3;
  return 2;
};

/*  
   COMPONENT
===================================================== */
const People = () => {
  const [columnCount, setColumnCount] = useState(() =>
    typeof window !== "undefined" ? getColumnCount(window.innerWidth) : 5
  );
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Header />

      <div className="pt-20">
        {/* HERO GRID */}
        <section className="bg-white py-1 w-full">
          <div className=" mx-auto">
            
          {/*             
            <h2 className="mb-10 text-center text-2xl md:text-3xl font-bold">
              Life at Zigma
            </h2> */}

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
