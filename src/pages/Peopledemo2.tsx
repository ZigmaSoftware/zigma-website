import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const peopleImageModules = import.meta.glob<{ default: string }>(
  "../assets/people at zigma/*.{jpg,jpeg,JPG,png,webp,avif,JPEG,PNG,WEBP,AVIF}",
  { eager: true }
);

type GalleryItem = {
  id: string;
  src: string;
  title: string;
};

const toTitle = (path: string) => {
  const fileName = path.split("/").pop()?.split("\\").pop() ?? "People Moment";

  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const allItems: GalleryItem[] = Object.entries(peopleImageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
  .map(([path, mod]) => ({
    id: path,
    src: mod.default,
    title: toTitle(path),
  }));

const ITEMS_PER_PAGE = 16;

const Peopledemo2 = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(allItems.length / ITEMS_PER_PAGE));

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return allItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const visiblePages = useMemo(() => {
    const pages = [];
    const maxVisible = Math.min(4, totalPages);

    for (let i = 1; i <= maxVisible; i += 1) {
      pages.push(i);
    }

    return pages;
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Header />

      <main className="pt-24 pb-12">
        <section className="mx-auto w-[min(90%,1240px)]">
          <div className="text-center">
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">People at Zigma</span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
              Life at Zigma in <span className="text-primary">People Moments</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg">
              A visual collection of Zigma team moments, celebrations, and day-to-day culture captured across events and office life.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <p className="text-xs md:text-sm text-muted-foreground">
              Page <span className="font-semibold text-primary">{currentPage}</span> of {totalPages}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {currentItems.map((item) => (
              <article key={item.id} className="group">
                <div className="overflow-hidden rounded-[4px] bg-slate-100 shadow-sm">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-[145px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-[3px] bg-primary px-5 py-2 text-xs md:text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {visiblePages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-[3px] text-xs md:text-sm font-medium transition ${
                    page === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-[3px] bg-primary px-5 py-2 text-xs md:text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next Page
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Peopledemo2;
