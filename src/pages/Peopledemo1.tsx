import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import bg from "@/assets/background-1.png";


const peopleImageModules = import.meta.glob<{ default: string }>(
  "../assets/people at zigma/*.{jpg,jpeg,JPG,png,webp,avif,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

const imageEntries = Object.entries(peopleImageModules).sort(([a], [b]) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
);

const toLabel = (path: string) => {
  const fileName = path.split("/").pop()?.split("\\").pop() ?? "Visual";
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const allImages = imageEntries.map(([path, mod]) => ({
  path,
  src: mod.default,
  label: toLabel(path),
}));

const usedImagePaths = new Set<string>();

const allocateImage = (keywords: string[], fallbackIndex: number) => {
  if (!imageEntries.length) return "";

  const loweredKeywords = keywords.map((item) => item.toLowerCase());
  const matched = imageEntries.find(
    ([path]) =>
      !usedImagePaths.has(path) && loweredKeywords.some((keyword) => path.toLowerCase().includes(keyword))
  );

  if (matched) {
    usedImagePaths.add(matched[0]);
    return matched[1].default;
  }

  const preferredStart = fallbackIndex % imageEntries.length;
  const fallback =
    imageEntries.slice(preferredStart).find(([path]) => !usedImagePaths.has(path)) ??
    imageEntries.find(([path]) => !usedImagePaths.has(path)) ??
    imageEntries[preferredStart];

  usedImagePaths.add(fallback[0]);
  return fallback[1].default;
};

const layoutImages = {
  miniTote: allocateImage(["womens day", "picture 4", "pongal 1"], 0),
  petShop: allocateImage(["ind 1", "ind 2", "site"], 2),
  realEstate: allocateImage(["kozhikode", "republic 1", "newyear p1"], 4),
  jacket: allocateImage(["mdc p1", "crismas p1", "image rm"], 6),
  retroCar: allocateImage(["dsc070", "6p6a", "site"], 8),
  skincare: allocateImage(["bday p1", "image cskf", "newyear p2"], 10),
  topLeft: allocateImage(["crstm p3", "mdc p2", "newyear p3"], 12),
  bottomAccent: allocateImage(["pongal 4", "republic 1", "newyear p3"], 14),
};

const referenceTrends = allImages.slice(0, 8);
const referenceFeed = (allImages.length > 8 ? allImages.slice(8) : allImages).slice(0, 12);

const cardBaseClass =
  "group relative overflow-hidden rounded-[18px] shadow-[0_10px_24px_rgba(15,23,42,0.16)]";
const imageCardClass = "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110";
const defaultOverlayClass = "absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent";

type GalleryCardProps = {
  src: string;
  alt: string;
  className?: string;
  overlayClass?: string;
};

const GalleryCard = ({
  src,
  alt,
  className = "",
  overlayClass = defaultOverlayClass,
}: GalleryCardProps) => (
  <article className={`${cardBaseClass} ${className}`.trim()}>
    <img src={src} alt={alt} className={imageCardClass} />
    <div className={overlayClass} />
  </article>
);

const Peopledemo1 = () => {
  const [showReferenceUI, setShowReferenceUI] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Header />

      <main className="pt-24 pb-6">
        <section className="mx-auto w-[min(88%,1240px)]">
          <div className="text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">People at Zigma</span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
              Life at Zigma in <span className="text-primary">People Moments</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg">
              A visual collection of Zigma team moments, celebrations, and day-to-day culture captured across events and office life.
            </p>
          </div>

          <div className="mt-4 grid gap-2 lg:h-[calc(100vh-290px)] lg:grid-cols-[1.05fr_2.1fr_1.4fr_2.5fr]">
            <div className="grid min-h-[220px] gap-2 sm:min-h-[260px] lg:h-full lg:min-h-0 lg:grid-rows-[0.25fr_0.75fr]">
              <GalleryCard
                src={layoutImages.topLeft}
                alt="Featured Moment"
                className="lg:min-h-0"
                overlayClass="absolute inset-0 bg-gradient-to-t from-black/55 via-black/8 to-transparent"
              />
              <GalleryCard src={layoutImages.miniTote} alt="Mini Tote" className="min-h-[92px] lg:min-h-0" />
            </div>

            <div className="grid min-h-[220px] gap-2 sm:min-h-[260px] lg:h-full lg:min-h-0 lg:grid-rows-2">
              <GalleryCard
                src={layoutImages.petShop}
                alt="Pet Shop Labor Day Promo"
                className="min-h-[100px] lg:min-h-0"
                overlayClass="absolute inset-0 bg-gradient-to-t from-black/65 via-black/12 to-transparent"
              />
              <GalleryCard
                src={layoutImages.realEstate}
                alt="Real Estate Promo"
                className="min-h-[100px] lg:min-h-0"
                overlayClass="absolute inset-0 bg-gradient-to-t from-black/65 via-black/12 to-transparent"
              />
            </div>

            <GalleryCard
              src={layoutImages.jacket}
              alt="The Perfect Jacket"
              className="min-h-[220px] sm:min-h-[260px] lg:h-full lg:min-h-0"
              overlayClass="absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent"
            />

            <div className="grid min-h-[220px] gap-2 sm:min-h-[260px] lg:h-full lg:min-h-0 lg:grid-rows-[1.25fr_1fr]">
              <GalleryCard src={layoutImages.retroCar} alt="Retro Compact Car Ad" className="min-h-[110px] lg:min-h-0" />

              <div className="grid gap-2 sm:grid-cols-2">
                <GalleryCard
                  src={layoutImages.bottomAccent}
                  alt="Creative Concept"
                  overlayClass="absolute inset-0 bg-gradient-to-t from-black/45 via-black/8 to-transparent"
                />
                <GalleryCard
                  src={layoutImages.skincare}
                  alt="Korean Skincare"
                  className="min-h-[92px] lg:min-h-0"
                  overlayClass="absolute inset-0 bg-gradient-to-t from-black/65 via-black/8 to-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setShowReferenceUI((prev) => !prev)}
              className="rounded-xl bg-primary px-6 py-2.5 text-lg md:text-xl font-semibold text-primary-foreground shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition duration-300 hover:bg-primary/90"
            >
              {showReferenceUI ? "Hide Moments" : "View More Moments"}
            </button>
          </div>

          {showReferenceUI ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-[0_24px_60px_rgba(15,23,42,0.1)] md:p-6">
              <div className="mx-auto max-w-5xl">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">People at Zigma Gallery</h2>
                  <p className="text-md text-slate-500">Browse more snapshots from Zigma team activities, special occasions, and memorable moments.</p>
                </div>
                {/* <button
                  type="button"
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  View All Moments
                </button> */}
                 <div className="mt-5">
                {/* <h3 className="text-lg font-semibold text-slate-900">Featured Moments</h3> */}
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {referenceTrends.map((item) => (
                    <article key={item.path} className="w-28 shrink-0">
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        <img
                          src={item.src}
                          alt={item.label}
                          className="h-36 w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              </div>

             
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {referenceFeed.map((item, index) => (
                  <article
                    key={`${item.path}-${index}`}
                    className={`overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${index % 5 === 0 ? "md:col-span-2" : ""
                      }`}
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className={`w-full object-cover transition-transform duration-300 hover:scale-[1.03] ${index % 5 === 0 ? "h-64 md:h-72" : "h-52 md:h-60"
                        }`}
                    />
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </main>

        {/*        WORKING @ ZIGMA – REFINED DESIGN */}
        <section className=" min-h-[100svh]  py-6 lg:py-8 "   style={{
                  backgroundImage: `url(${bg})`,
                 
                }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
             

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
  );
};

export default Peopledemo1;








