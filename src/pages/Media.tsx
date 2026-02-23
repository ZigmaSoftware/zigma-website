import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink } from "lucide-react";

import news1 from "@/assets/News/sm1.jpg";
import news2 from "@/assets/News/sm2.jpg";
import news3 from "@/assets/News/sm4.jpg";
import news4 from "@/assets/News/sm5.jpg";
import Herobg from "@/assets/website/globe_bg.jpg";

type NewsArticle = {
  id: number;
  title: string;
  date: string;
  source: string;
  excerpt: string;
  image: string;
  link: string;
};

const newsGallery = Object.entries(
  import.meta.glob("../assets/News/*.{jpg,png,JPG,PNG}", {
    eager: true,
    import: "default",
  })
)
  .map(([path, src]) => ({
    src: src as string,
    name: path.split("/").pop() ?? "",
  }))
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "ZIGMA Completes Largest Landfill Reclamation in Delhi",
    date: "December 15, 2024",
    source: "The Economic Times",
    excerpt:
      "ZIGMA Global Enviro Solutions successfully completed the reclamation of 50 acres of landfill land in Delhi, setting a new benchmark for urban waste management.",
    image: news1,
    link: "#",
  },
  {
    id: 2,
    title: "Innovative Bio-Mining Technology Wins National Award",
    date: "November 28, 2024",
    source: "Business Standard",
    excerpt:
      "ZIGMA's proprietary bio-mining technology received the National Environmental Excellence Award for innovation in waste management.",
    image: news2,
    link: "#",
  },
  {
    id: 3,
    title: "Partnership with Maharashtra Government for Waste-to-Resource",
    date: "October 10, 2024",
    source: "Hindustan Times",
    excerpt:
      "ZIGMA signed a landmark MOU with Maharashtra Government to implement waste-to-resource programs across 10 major cities.",
    image: news3,
    link: "#",
  },
  {
    id: 4,
    title: "ZIGMA Expands Operations to South India",
    date: "September 5, 2024",
    source: "Deccan Chronicle",
    excerpt:
      "ZIGMA announces expansion of operations to Karnataka and Tamil Nadu with three new projects worth INR 500 crores.",
    image: news4,
    link: "#",
  },
];

const Media = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ src: string; name: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % newsArticles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const featuredArticle = newsArticles[featuredIndex];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div className="absolute inset-0 h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${Herobg})` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />

          <div className="container-main relative grid items-center">
            <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium">Media Center</div>
            <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">News And Media</h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl text-justify">
              Stay updated with announcements, project highlights, and verified press coverage from Zigma Global Environ Solutions.
            </p>
          </div>
        </section>

        <section className="section-padding min-h-screen bg-white scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main w-full h-full">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Latest Coverage</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Media Highlights <span className="text-primary">And Announcements</span>
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="lg:row-span-2">
                <div className="group bg-card border border-border overflow-hidden h-full">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold">
                      Featured
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredArticle.date}
                      </span>
                      <span className="text-primary font-medium">{featuredArticle.source}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3 leading-snug">{featuredArticle.title}</h3>
                    <p className="text-muted-foreground mb-4 text-justify">{featuredArticle.excerpt}</p>

                    <Button variant="outline" className="group/btn">
                      Read Full Article
                      <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {newsArticles.map((article, index) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => setFeaturedIndex(index)}
                    className={`w-full text-left border p-4 transition-colors ${
                      featuredIndex === index ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                      <span className="text-primary font-medium ml-auto">{article.source}</span>
                    </div>
                    <h4 className="font-bold text-foreground mb-2 line-clamp-2">{article.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main w-full h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Visual Archive</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                  News <span className="text-primary">Gallery</span>
                </h2>
              </div>
              <span className="text-sm text-muted-foreground">{newsGallery.length} images</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newsGallery.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="group relative overflow-hidden border border-border bg-card"
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {selectedImage && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-sm px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              Close
            </button>
            <img src={selectedImage.src} alt={selectedImage.name} className="w-full max-h-[80vh] object-contain rounded-2xl bg-white" />
            <div className="mt-3 text-center text-white/80 text-sm">{selectedImage.name}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
