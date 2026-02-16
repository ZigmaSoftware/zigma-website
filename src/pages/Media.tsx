import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  ExternalLink,
} from "lucide-react";


import news1 from "@/assets/News/sm1.jpg";
import news2 from "@/assets/News/sm2.jpg";
import news3 from "@/assets/News/sm4.jpg";
import news4 from "@/assets/News/sm5.jpg";
import Herobg from '@/assets/website/globe_bg.jpg';


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

const newsArticles = [
  {
    id: 1,
    title: "ZIGMA Completes Largest Landfill Reclamation in Delhi",
    date: "December 15, 2024",
    source: "The Economic Times",
    excerpt: "ZIGMA Global Enviro Solutions successfully completed the reclamation of 50 acres of landfill land in Delhi, setting a new benchmark for urban waste management.",
    image: news1,
    link: "#"
  },
  {
    id: 2,
    title: "Innovative Bio-Mining Technology Wins National Award",
    date: "November 28, 2024",
    source: "Business Standard",
    excerpt: "ZIGMA's proprietary bio-mining technology received the National Environmental Excellence Award for innovation in waste management.",
    image: news2,
    link: "#"
  },
  {
    id: 3,
    title: "Partnership with Maharashtra Government for Waste-to-Resource",
    date: "October 10, 2024",
    source: "Hindustan Times",
    excerpt: "ZIGMA signed a landmark MOU with Maharashtra Government to implement waste-to-resource programs across 10 major cities.",
    image: news3,
    link: "#"
  },
  {
    id: 4,
    title: "ZIGMA Expands Operations to South India",
    date: "September 5, 2024",
    source: "Deccan Chronicle",
    excerpt: "ZIGMA announces expansion of operations to Karnataka and Tamil Nadu with three new projects worth ₹500 crores.",
    image: news4,
    link: "#"
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
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">

        {/* Hero Section */}
        
        {/* <section className="section-dark-bg py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="container-main text-center relative z-10">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              Media Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
              News & Media
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Stay updated with the latest news, videos, and announcements from ZIGMA Global Enviro Solutions.
            </p>
          </div>
        </section> */}


         <section className="relative  overflow-hidden  text-white h-[70vh] flex items-center  text-right">
          <div
            className=" absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${Herobg})` }}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 opacity-25 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute -top-24 -right-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

         <div className="relative px-6 py-20 lg:py-24 lg:px-8 float-right">

      <div className="max-w-4xl ml-auto ">

      <h2 className="mt-1 text-3xl sm:text-2xl lg:text-5xl font-semibold leading-tight">
        News &amp; Media
      </h2>

      <p className="mt-6 text-lg text-white/80 leading-relaxed">
        Stay updated with the latest news and announcements from Zigma.
      </p>

     </div>
     </div> 
        </section>  

        {/* Content Sections */}
        <section className="section-padding">
          <div className="container-main">
            <div className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Featured Article */}
                <div className="lg:row-span-2">
                  <div className="group bg-card rounded-2xl border border-border overflow-hidden h-full card-hover">
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={newsArticles[featuredIndex].image}
                        alt={newsArticles[featuredIndex].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {newsArticles[featuredIndex].date}
                        </span>
                        <span className="text-primary font-medium">{newsArticles[featuredIndex].source}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {newsArticles[featuredIndex].title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{newsArticles[featuredIndex].excerpt}</p>
                      <Button variant="outline" className="group/btn">
                        Read Full Article 
                        <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Other Articles */}
                <div className="space-y-6">
                  {newsArticles.slice(1).map((article) => (
                    <div 
                      key={article.id}
                      className="group bg-card rounded-xl border border-border overflow-hidden card-hover flex"
                    >
                      <div className="w-40 flex-shrink-0">
                        <img 
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {article.date}
                          <span className="text-primary font-medium ml-auto">{article.source}</span>
                        </div>
                        <h4 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  News Gallery
                </h2>
                <span className="text-sm text-muted-foreground">
                  {newsGallery.length} images
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {newsGallery.map((item) => (
                  <div
                    key={item.name}
                    className="group relative rounded-xl overflow-hidden border border-border bg-card cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Contact CTA */}
        {/* <section className="section-padding section-alt-bg">
          <div className="container-main">
            <div className="bg-card rounded-3xl border border-border p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Media Inquiries
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                For press inquiries, interview requests, or media-related questions, 
                please contact our communications team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg">
                  Contact Media Team
                </Button>
                <Button size="lg" variant="outline">
                  Download Press Kit
                </Button>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-sm px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              Close
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="w-full max-h-[80vh] object-contain rounded-2xl bg-black"
            />
            <div className="mt-3 text-center text-white/80 text-sm">
              {selectedImage.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;



