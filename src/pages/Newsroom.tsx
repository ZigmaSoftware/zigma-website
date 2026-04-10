import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/website/news_bg.jpeg";
import sectionBg from "@/assets/background-1.png";

interface NewsItem {
  id: string;
  title: string;
  thumbnail: string;
  fullImage: string;
}

const newsAssets = Object.entries(
  import.meta.glob("../assets/News/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
    eager: true,
    import: "default",
  }),
)
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? "News Image";
    const title = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim();

    return {
      id: path,
      title,
      thumbnail: src as string,
      fullImage: src as string,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

const NEWS_ITEMS: NewsItem[] = newsAssets;

interface NewsCardProps {
  item: NewsItem;
  onClick: (item: NewsItem) => void;
}

function NewsCard({ item, onClick }: NewsCardProps) {
  return (
    <article
      onClick={() => onClick(item)}
      className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-primary/35"
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={item.thumbnail}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30"
        />
        <div className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white/70 to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white/70 to-transparent" />
        <div className="absolute inset-0 bg-white/15" />
        <img
          src={item.thumbnail}
          alt={item.title}
          className="relative z-20 h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      </div>
    </article>
  );
}

interface DetailViewProps {
  item: NewsItem;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function DetailView({ item, onBack, onPrev, onNext }: DetailViewProps) {
  return (
    <div className="animate-fadeIn rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 md:p-2">
        <img
          src={item.fullImage}
          alt={item.title}
          className="block h-auto w-full object-contain"
        />
      </div>

      <div className="grid grid-cols-3 items-center gap-3">
        <button
          onClick={onPrev}
          className="justify-self-start inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>

        <button
          onClick={onBack}
          className="justify-self-center inline-flex items-center rounded-full border border-primary bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          View All
        </button>

        <button
          onClick={onNext}
          className="justify-self-end inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary/40 hover:text-primary"
        >
          Next
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Newsroom() {
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

  const filtered = NEWS_ITEMS;
  const selectedIndex = selectedItem
    ? filtered.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const showPrevious = () => {
    if (!filtered.length || selectedIndex === -1) return;
    const previousIndex = (selectedIndex - 1 + filtered.length) % filtered.length;
    setSelectedItem(filtered[previousIndex]);
  };

  const showNext = () => {
    if (!filtered.length || selectedIndex === -1) return;
    const nextIndex = (selectedIndex + 1) % filtered.length;
    setSelectedItem(filtered[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30"
            aria-hidden="true"
          />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <p className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
              Newsroom
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight text-white">
              In The <span className="text-primary">News</span>
            </h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl text-center">
              Explore media coverage, project stories, and important updates from Zigma Blue Planet.
            </p>
          </div>
        </section>

        <section
          className="section-padding bg-top bg-repeat"
          style={{ backgroundImage: `url(${sectionBg})`, backgroundSize: "520px auto" }}
        >
          <div className="container-main">
            {selectedItem ? (
              <DetailView
                item={selectedItem}
                onBack={() => setSelectedItem(null)}
                onPrev={showPrevious}
                onNext={showNext}
              />
            ) : (
              <>
                <div className="px-1 py-1 text-center md:px-0">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    Media Archive
                  </p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    In The <span className="text-primary">News</span>
                  </h2>
                  <p className="mt-3 max-w-3xl mx-auto text-sm md:text-base text-slate-600">
                    Explore press mentions and project coverage from our complete visual newsroom.
                  </p>
                </div>

                <div className="mt-6 mb-8" />

                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((item) => (
                      <NewsCard key={item.id} item={item} onClick={setSelectedItem} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed border-slate-300 bg-white py-24 text-center text-slate-500">
                    <p className="text-sm">No articles found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
