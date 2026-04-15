import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FullScreenSlider, { type SliderSlide } from "./Fullscreenslider";
import awdbg from "@/assets/website/hero/award-bg.jpeg";
const awardImageModules = import.meta.glob(
  "../assets/Awards/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  {
  eager: true,
  import: "default",
});

const getAwardOrder = (path: string): number => {
  const fileName = path.split("/").pop() ?? "";
  const match = fileName.match(/(\d+)/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
};

const toSlideTitle = (path: string, index: number): string => {
  const fileName = path.split("/").pop() ?? `award-${index + 1}`;
  const match = fileName.match(/award\s*([0-9]+)/i) ?? fileName.match(/(\d+)/);
  if (match?.[1]) return `Award\n${match[1]}`;

  const clean = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim();
  return clean || `Award\n${index + 1}`;
};

const sliderSlides: SliderSlide[] = Object.entries(awardImageModules)
  .sort((a, b) => {
    const orderDiff = getAwardOrder(a[0]) - getAwardOrder(b[0]);
    return orderDiff !== 0 ? orderDiff : a[0].localeCompare(b[0], undefined, { numeric: true });
  })
  .map(([path, src], index) => ({
    id: index + 1,
    title: toSlideTitle(path, index),
    imageUrl: src as string,
  }));

export default function AwardsandRecognition(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={awdbg}
            alt="Awards background"
          />
          {/* <div className="absolute inset-0 bg-black/30" aria-hidden="true" /> */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium">Industry Recognition</div>
            <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">Awards And Honors</h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl text-center">
              Proven excellence across sustainability, operations, and large-scale environmental projects delivered across India.
            </p>
          </div>
        </section>



        {/* <section className="section-padding bg-white scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Recognition Snapshot</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Performance Backed By <span className="text-primary">Awards</span>
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{metric.helper}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Awards Interactive Slider */}
        <section className="section-padding bg-white scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Awards Showcase</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Our <span className="text-primary">Achievements</span>
              </h2>
              <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                Browse through our collection of certifications and industry recognitions
              </p>
            </div>
            <div className="mt-8">
              <FullScreenSlider slides={sliderSlides} />
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}

