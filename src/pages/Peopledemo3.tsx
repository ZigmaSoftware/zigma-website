import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const peopleImageModules = import.meta.glob<{ default: string }>(
  "../assets/people at zigma/*.{jpg,jpeg,JPG,png,webp,avif,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

type GalleryImage = {
  id: string;
  src: string;
};

const galleryImages: GalleryImage[] = Object.entries(peopleImageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
  .map(([path, mod]) => ({
    id: path,
    src: mod.default,
  }));

const getImageByIndex = (index: number) => {
  if (!galleryImages.length) {
    return "";
  }

  return galleryImages[index % galleryImages.length].src;
};

const FrameCard = ({
  src,
  className,
}: {
  src: string;
  className: string;
}) => (
  <article className={`group relative overflow-hidden border-[5px] border-white bg-black shadow-[0_14px_30px_rgba(0,0,0,0.45)] ${className}`}>
    <img
      src={src}
      alt="People at Zigma"
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      loading="lazy"
    />
  </article>
);

const Peopledemo3 = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Header />

      <main className="pt-24 pb-14">
        <section className="mx-auto w-[min(92%,1240px)]">
          <div className="text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">People at Zigma</span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
              Life at Zigma in <span className="text-primary">People Moments</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg">
              A visual collection of Zigma team moments, celebrations, and day-to-day culture captured across events and office life.
            </p>
          </div>

          <div className="mt-8 relative overflow-hidden rounded-sm border border-white/15 bg-[#262a2f] px-5 py-6 shadow-[0_20px_50px_rgba(2,6,23,0.35)] md:px-8 md:py-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.22), transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(56,189,248,0.2), transparent 52%)",
              }}
            />

            <div className="relative grid gap-4 lg:grid-cols-3">
              <div className="grid gap-4">
                <FrameCard src={getImageByIndex(0)} className="h-[160px]" />
                <FrameCard src={getImageByIndex(1)} className="h-[220px]" />
                <FrameCard src={getImageByIndex(2)} className="h-[190px]" />
              </div>

              <div className="grid gap-4">
                <FrameCard src={getImageByIndex(3)} className="h-[260px]" />
                <FrameCard src={getImageByIndex(4)} className="h-[150px]" />
                <FrameCard src={getImageByIndex(5)} className="h-[160px]" />
              </div>

              <div className="grid gap-4">
                <FrameCard src={getImageByIndex(6)} className="h-[170px]" />
                <FrameCard src={getImageByIndex(7)} className="h-[170px]" />
                <FrameCard src={getImageByIndex(8)} className="h-[230px]" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Peopledemo3;
