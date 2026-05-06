import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideosCascadeSlider from "@/components/videos/VideosCascadeSlider";
import heroBg from "@/assets/website/hero/news_bg.webp";
import sectionBg from "@/assets/website/background-1.png";
import { newsEnglishArticles, newsPagedAssetPaths } from "@/data/newsEnglishPageWise";

interface NewsItem {
  id: string;
  title: string;
  thumbnail: string;
  fullImage: string;
  language: string;
  pages?: string[];
}

interface FeaturedVideo {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  label: string;
}

const YOUTUBE_PATTERNS: RegExp[] = [
  /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([A-Za-z0-9_-]{11})/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:.*&)?v=([A-Za-z0-9_-]{11})/i,
  /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([A-Za-z0-9_-]{11})/i,
];

const getYouTubeId = (source: string): string | null => {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = source.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

const getYouTubeThumbnail = (source: string): string => {
  const id = getYouTubeId(source);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
};

const getYouTubeEmbedUrl = (source: string): string | null => {
  const id = getYouTubeId(source);
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : null;
};

const FEATURED_VIDEO_LINKS: string[] = [
  "https://youtu.be/0jSDIE-WYFc",
  "https://youtu.be/2PkOQRJyvzQ",
  "https://youtu.be/howdJTR0IqQ",
  "https://youtu.be/pDVwHbMWX9k",
  "https://youtu.be/c8gh5kWmaAY",
  "https://youtu.be/X5ehvOddWTU",
  "https://youtu.be/x9E-7rT6KC8",
  "https://youtu.be/aOtNnkAUo0o",
  "https://youtu.be/erVRarDVMno",
  "https://youtu.be/Vav1K4thRYY",
  "https://youtu.be/0WscPowKp60",
  "https://youtu.be/J6OCSlODxLw",
  "https://youtu.be/kE5W3w9ao6M",
  "https://youtu.be/Up1AqUe_WNY",
  "https://youtu.be/PjObYFsdPdM",
  "https://youtu.be/TXKcIaF9pd8",
  "https://youtu.be/z1vAN67LceY",
  "https://youtu.be/-E0jiZUUKd4",
  "https://youtu.be/bxv2ZCh-3T8",
  "https://youtu.be/vngSQHFCjM4",
  "https://youtu.be/i9TVKl-eVDc",
  "https://youtu.be/psbedFJNN4w",
  "https://youtu.be/cIlPFcl874s",
  "https://youtu.be/rrlmAHF2J3k",
  "https://youtu.be/XUia9pKBCq8",
  "https://youtu.be/hHqRdoo5Cn0",
  "https://youtu.be/TLXCtngKo6U",
];

const extractLanguageFromPath = (path: string): string => {
  const match = path.match(/\/News\/([^/]+)\//);
  return match?.[1] ?? "Other";
};

const newsAssets = Object.entries(
  import.meta.glob("../assets/News/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
    eager: true,
    import: "default",
  }),
)
  .filter(([path]) => !newsPagedAssetPaths.has(path))
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? "News Image";
    const title = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim();
    const language = extractLanguageFromPath(path);

    return {
      id: path,
      title,
      thumbnail: src as string,
      fullImage: src as string,
      language,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

const NEWS_ITEMS: NewsItem[] = newsAssets;

const PAGE_WISE_NEWS_ITEMS: NewsItem[] = newsEnglishArticles.map((article) => ({
  id: `page-wise-${article.slug}`,
  title: article.title,
  thumbnail: article.coverUrl,
  fullImage: article.coverUrl,
  language: article.language,
  pages: article.pages.map((page) => page.url),
}));

const ALL_NEWS_ITEMS: NewsItem[] = [...NEWS_ITEMS, ...PAGE_WISE_NEWS_ITEMS];

const LANGUAGE_ORDER: string[] = ["English", "Hindi", "Tamil", "Telugu", "Malayalam", "Gujarati"];

const AVAILABLE_LANGUAGES: string[] = Array.from(new Set(ALL_NEWS_ITEMS.map((item) => item.language))).sort(
  (a, b) => {
    const rankA = LANGUAGE_ORDER.indexOf(a);
    const rankB = LANGUAGE_ORDER.indexOf(b);
    const normalizedRankA = rankA === -1 ? Number.POSITIVE_INFINITY : rankA;
    const normalizedRankB = rankB === -1 ? Number.POSITIVE_INFINITY : rankB;
    if (normalizedRankA !== normalizedRankB) return normalizedRankA - normalizedRankB;
    return a.localeCompare(b);
  },
);

const LANGUAGE_COUNTS: Record<string, number> = ALL_NEWS_ITEMS.reduce<Record<string, number>>(
  (acc, item) => {
    acc[item.language] = (acc[item.language] ?? 0) + 1;
    return acc;
  },
  {},
);

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
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-smca"
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
      {item.pages && item.pages.length > 0 ? (
        <div className="mb-8 grid grid-cols-1 gap-6">
          {item.pages.map((pageUrl, pageIndex) => (
            <article key={`${item.id}-page-${pageIndex + 1}`} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">Page {pageIndex + 1}</p>
              </div>
              <img src={pageUrl} alt={`${item.title} page ${pageIndex + 1}`} className="block h-auto w-full object-contain" />
            </article>
          ))}
        </div>
      ) : (
        <div className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 md:p-2">
          <img
            src={item.fullImage}
            alt={item.title}
            className="block h-auto w-full object-contain"
          />
        </div>
      )}

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
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<string>("All");

  const filtered =
    activeLanguage === "All"
      ? ALL_NEWS_ITEMS
      : ALL_NEWS_ITEMS.filter((item) => item.language === activeLanguage);
  const featuredVideos: FeaturedVideo[] = FEATURED_VIDEO_LINKS.map((url, index) => ({
    id: `${index + 1}`,
    url,
    thumbnail: getYouTubeThumbnail(url),
    title: `Media Coverage ${index + 1}`,
    label: "News Coverage",
  })).filter((video) => Boolean(video.thumbnail));

  const activeFeaturedVideo = featuredVideos[featuredIndex] ?? featuredVideos[0] ?? null;
  const selectedVideoEmbedUrl = activeFeaturedVideo ? getYouTubeEmbedUrl(activeFeaturedVideo.url) : null;

  useEffect(() => {
    if (!selectedItem) return;
    if (activeLanguage === "All") return;
    if (selectedItem.language !== activeLanguage) {
      setSelectedItem(null);
    }
  }, [activeLanguage, selectedItem]);

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
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18"
            aria-hidden="true"
          />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <p className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
              Newsroom
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight text-white">
              In The News
            </h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-3xl text-center">
              Explore media coverage, project stories, and important updates from Zigma Blue Planet.
            </p>
          </div>
        </section>

        {featuredVideos.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-main">
              <div className="px-1 py-1 text-center md:px-0">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  Featured Coverage
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Spotlight <span className="text-primary">Stories</span>
                </h2>
                <p className="mt-3 max-w-3xl mx-auto text-sm md:text-base text-slate-600">
                  A quick visual look at key media highlights showcasing our projects, partnerships,
                  and sustainability milestones.
                </p>
              </div>

              <div className="mt-8">
                <VideosCascadeSlider
                  slides={featuredVideos.map((video) => ({
                    id: video.id,
                    title: video.title,
                    label: video.label,
                    poster: video.thumbnail,
                    src: video.url,
                  }))}
                  currentIndex={featuredIndex}
                  onIndexChange={setFeaturedIndex}
                  onPlayVideo={(video) => {
                    const targetIndex = featuredVideos.findIndex((item) => item.url === video.src);
                    if (targetIndex !== -1) {
                      setFeaturedIndex(targetIndex);
                    }
                    setVideoOpen(true);
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {videoOpen && activeFeaturedVideo && selectedVideoEmbedUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          >
            <div
              className="relative w-11/12 max-w-3xl overflow-hidden rounded-2xl bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="aspect-video w-full bg-black">
                <iframe
                  key={activeFeaturedVideo.url}
                  src={selectedVideoEmbedUrl}
                  title={activeFeaturedVideo.title}
                  className="h-full w-full"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

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

                <div className="mt-6 mb-8 flex flex-wrap justify-center gap-2">
                  {["All", ...AVAILABLE_LANGUAGES].map((language) => {
                    const isActive = activeLanguage === language;
                    const count =
                      language === "All" ? ALL_NEWS_ITEMS.length : (LANGUAGE_COUNTS[language] ?? 0);
                    return (
                      <button
                        key={language}
                        type="button"
                        onClick={() => setActiveLanguage(language)}
                        aria-pressed={isActive}
                        className={[
                          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                          isActive
                            ? "border-primary bg-primary text-white"
                            : "border-slate-300 bg-white text-slate-700 hover:border-primary/40 hover:text-primary",
                        ].join(" ")}
                      >
                        <span>{language}</span>
                      </button>
                    );
                  })}
                </div>

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
