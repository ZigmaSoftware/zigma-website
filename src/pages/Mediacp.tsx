import { useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Herobg from "@/assets/website/globe_bg.png";

type NewsArticle = {
  id: number;
  title: string;
  date: string;
  source: string;
  excerpt: string;
  fullText: string;
  imageName: string;
  link: string;
};

type NewsImage = {
  name: string;
  src: string;
};

const newsImages: NewsImage[] = Object.entries(
  import.meta.glob("../assets/News/**/*.{jpg,png,JPG,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }),
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
    fullText:
      "ZIGMA Global Enviro Solutions has completed one of India's largest landfill reclamation initiatives in Delhi, restoring nearly 50 acres of degraded land for productive civic use. The project combined advanced biomining, on-site waste segregation, and safe material recovery workflows under strict environmental controls. City officials reported visible reduction in legacy waste burden, while local stakeholders highlighted improved air quality and lower odor impact in surrounding neighborhoods. This milestone reinforces ZIGMA's ability to deliver high-capacity remediation projects in dense urban environments.",
    imageName: "sm1.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Innovative Bio-Mining Technology Wins National Award",
    date: "November 28, 2024",
    source: "Business Standard",
    excerpt:
      "ZIGMA's proprietary bio-mining technology received the National Environmental Excellence Award for innovation in waste management.",
    fullText:
      "ZIGMA's proprietary bio-mining technology has received the National Environmental Excellence Award, recognizing the company's technical leadership in legacy waste remediation. The platform integrates optimized screening, stabilization, and high-throughput material recovery to improve landfill diversion outcomes while reducing processing timelines. Jury members acknowledged the measurable environmental impact achieved across multiple municipalities, including reduction in open-dump volume and improved land recovery rates. The award marks a key validation of ZIGMA's long-term innovation investments.",
    imageName: "sm2.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Partnership with Maharashtra Government for Waste-to-Resource",
    date: "October 10, 2024",
    source: "Hindustan Times",
    excerpt:
      "ZIGMA signed a landmark MOU with Maharashtra Government to implement waste-to-resource programs across 10 major cities.",
    fullText:
      "Under a new agreement with the Maharashtra Government, ZIGMA will support waste-to-resource implementation across ten major cities through phased deployment. The program includes biomining of legacy dumpsites, stream-based processing, and responsible recovery channels for recyclable and combustible fractions. Project governance will include milestone-based reporting, environmental compliance monitoring, and capacity-building for local bodies. The partnership is expected to accelerate landfill reduction and unlock large-scale land reclamation benefits across the state.",
    imageName: "sm4.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "ZIGMA Expands Operations to South India",
    date: "September 5, 2024",
    source: "Deccan Chronicle",
    excerpt:
      "ZIGMA announces expansion of operations to Karnataka and Tamil Nadu with three new projects worth INR 500 crores.",
    fullText:
      "ZIGMA has announced expansion into Karnataka and additional Tamil Nadu clusters through three strategic projects valued at approximately INR 500 crores. The expansion strengthens the company's regional execution network with new processing facilities, project teams, and control systems tailored for high-volume municipal waste streams. Leadership stated that the new footprint will improve response time and throughput while maintaining safety and environmental standards. This move supports ZIGMA's multi-state growth roadmap and reinforces its position in India's circular resource ecosystem.",
    imageName: "sm5.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Urban Biomining Program Accelerates in Tier-2 Cities",
    date: "August 22, 2024",
    source: "Times of India",
    excerpt:
      "ZIGMA scaled its biomining deployment model to additional Tier-2 municipalities with a faster site mobilization cycle.",
    fullText:
      "ZIGMA has expanded its urban biomining execution model into multiple Tier-2 city clusters to improve legacy waste processing rates and land recovery timelines. The rollout includes rapid mobilization workflows, calibrated screening systems, and tighter monitoring checkpoints for environmental compliance. Municipal officials noted improved throughput and better site discipline during early-stage implementation. The initiative is expected to strengthen city-level waste remediation capacity across emerging urban regions.",
    imageName: "sm6.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Integrated Material Recovery Improves Circular Output",
    date: "July 14, 2024",
    source: "Financial Express",
    excerpt:
      "New material recovery workflows increased reusable output from processed legacy waste streams.",
    fullText:
      "Through integrated sorting and recovery processes, ZIGMA has improved the share of reusable fractions extracted from mixed legacy waste. The enhanced flow combines pre-processing, calibrated separation, and safer handling for recoverable materials to improve circular outcomes. Internal project dashboards indicate stable quality and lower rejection rates across participating sites. This operational gain supports long-term landfill diversion goals and resource reuse performance.",
    imageName: "sm7.jpg",
    link: "#",
  },
  {
    id: 7,
    title: "Multi-City Waste Remediation Milestone Achieved",
    date: "June 30, 2024",
    source: "The Hindu BusinessLine",
    excerpt:
      "ZIGMA reported a milestone across concurrent remediation projects in multiple Indian cities.",
    fullText:
      "ZIGMA has reported a major multi-city remediation milestone with several legacy waste projects crossing critical processing thresholds in the same quarter. The milestone reflects synchronized execution planning, improved machine uptime, and coordinated safety oversight across distributed sites. Field teams have also documented better turnaround in stabilized zones where waste loads were previously unmanaged. The company stated that this phase strengthens readiness for larger municipal portfolios ahead.",
    imageName: "sm8.jpg",
    link: "#",
  },
  {
    id: 8,
    title: "Project Monitoring Digitization Enhances Site Governance",
    date: "May 18, 2024",
    source: "Mint",
    excerpt:
      "Digital monitoring dashboards were introduced to improve accountability and performance tracking at active sites.",
    fullText:
      "ZIGMA introduced expanded digital monitoring tools to improve governance across active remediation and waste management sites. The system tracks operational checkpoints, compliance observations, and output indicators in near real-time for project teams and stakeholders. Early adoption has improved reporting consistency and enabled faster escalation of on-ground bottlenecks. Leadership indicated that the digitization layer will remain central to future scale-up programs.",
    imageName: "sm15.jpg",
    link: "#",
  },
  // Latest News Section Articles
  {
    id: 9,
    title: "Matter of Pride for Zigma - Land Reclaimed Through Bio-mining for Building Infrastructure",
    date: "January 20, 2025",
    source: "Zigma Press Desk",
    excerpt:
      "Matter of pride for Zigma wherein the land reclaimed through Bio-mining will be used for building infrastructure.",
    fullText:
      "This landmark achievement demonstrates Zigma's commitment to transforming waste into valuable land resources. Through advanced bio-mining techniques, previously contaminated land has been successfully reclaimed and is now being utilized for constructive civic infrastructure development. This project showcases the potential of sustainable waste management practices to create lasting environmental and social benefits.",
    imageName: "Matter of pride for Zigma wherein the land reclaimed through Bio-mining will be used for buildin.jpg",
    link: "#",
  },
  {
    id: 10,
    title: "Proud to Announce - Zigma's Contribution to Sustainable Waste Management Recognized",
    date: "January 18, 2025",
    source: "Zigma Press Desk",
    excerpt:
      "Proud to announce that Zigma's contribution to sustainable waste management has been recognized.",
    fullText:
      "Zigma's unwavering dedication to sustainable waste management practices has received well-deserved recognition. This acknowledgment highlights the company's innovative approaches to environmental solutions and reinforces its position as a leader in the waste management sector. The recognition serves as a testament to the hard work and commitment of the entire Zigma team.",
    imageName: "Proud to announce that Zigma's contribution to sustainable waste management has been recognized .jpg",
    link: "#",
  },
  {
    id: 11,
    title: "The Reclaimed Land at Ariyamangalam Dump Yard - A Beacon of Sustainable Development",
    date: "January 15, 2025",
    source: "Zigma Press Desk",
    excerpt:
      "The reclaimed land at the Ariyamangalam dump yard is now a beacon of sustainable development!",
    fullText:
      "The reclaimed land at the Ariyamangalam dump yard stands as a powerful example of sustainable development achieved through innovative waste remediation. What was once a burden on the environment has been transformed into a valuable resource for the community. This transformation demonstrates the immense potential of bio-mining and land reclamation technologies in creating greener, cleaner cities.",
    imageName: "The reclaimed land at the Ariyamangalam dump yard is now a beacon of sustainable development! Th.jpg",
    link: "#",
  },
  {
    id: 12,
    title: "Transforming Waste into Opportunity – The Bhandewadi Story",
    date: "January 12, 2025",
    source: "Zigma Press Desk",
    excerpt:
      "Transforming Waste into Opportunity – The Bhandewadi Story At Blue Planet's Zigma Global, we are committed to sustainable solutions.",
    fullText:
      "The Bhandewadi Story exemplifies how innovative waste management can transform challenges into opportunities. Through dedicated efforts and sustainable practices, Zigma Global has turned a problematic waste dumping site into a symbol of environmental restoration. This transformation highlights the company's mission to create value from waste while protecting our planet.",
    imageName: "Transforming Waste into Opportunity – The Bhandewadi Story At Blue Planet's Zigma Global, we ar.webp",
    link: "#",
  },
  {
    id: 13,
    title: "Success of Biomining Initiative at Bhandewadi Dumping Yard",
    date: "January 10, 2025",
    source: "Zigma Press Desk",
    excerpt:
      "We are happy to share the success of our biomining initiative at the Bhandewadi dumping yard.",
    fullText:
      "The success of our biomining initiative at the Bhandewadi dumping yard marks a significant milestone in our journey towards sustainable waste management. This project has not only cleaned up the environment but also demonstrated the effectiveness of modern remediation technologies. We are proud to share this success story with all our stakeholders.",
    imageName: "We are happy to share the success of our biomining initiative at the Bhandewadi dumping yard, w.webp",
    link: "#",
  },
  {
    id: 14,
    title: "Legacy Waste Remediation - Critical Step in Strengthening Urban Waste Infrastructure",
    date: "January 8, 2025",
    source: "Zigma Press Desk",
    excerpt:
      "Legacy waste remediation is a critical step in strengthening urban waste infrastructure.",
    fullText:
      "Legacy waste remediation plays a crucial role in strengthening urban waste infrastructure. By addressing accumulated waste from past decades, we create a cleaner foundation for future waste management systems. This critical step ensures that our cities can move towards more sustainable and efficient waste handling practices.",
    imageName: "Legacy waste remediation is a critical step in strengthening urban waste infrastructure.Structu.webp",
    link: "#",
  },
  {
    id: 15,
    title: "Zigma's Environmental Initiative Success Story",
    date: "January 5, 2025",
    source: "Zigma Press Desk",
    excerpt:
      "Highlighting Zigma's successful environmental initiatives and waste management solutions.",
    fullText:
      "This press release captures the essence of Zigma's successful environmental initiatives. Through innovative approaches and dedicated execution, Zigma continues to make significant strides in sustainable waste management. The success story reflects the company's commitment to environmental excellence and community welfare.",
    imageName: "get.jpg",
    link: "#",
  },
  {
    id: 16,
    title: "Zigma's Sustainable Waste Management Journey Continues",
    date: "January 3, 2025",
    source: "Zigma Press Desk",
    excerpt:
      "Continuing our journey towards sustainable waste management and environmental stewardship.",
    fullText:
      "Zigma's journey towards sustainable waste management continues with renewed vigor and commitment. This update highlights our ongoing efforts to implement innovative solutions and create lasting environmental impact. We remain dedicated to our mission of transforming waste into valuable resources.",
    imageName: "get (1).jpg",
    link: "#",
  },
  {
    id: 17,
    title: "Commitment to Excellence in Environmental Solutions",
    date: "January 1, 2025",
    source: "Zigma Press Desk",
    excerpt:
      " reaffirming our commitment to excellence in environmental solutions and sustainable practices.",
    fullText:
      "At Zigma, our commitment to excellence in environmental solutions remains unwavering. This press release reaffirms our dedication to implementing best practices in waste management and environmental stewardship. We continue to work towards creating a cleaner, greener future for all.",
    imageName: "get (2).jpg",
    link: "#",
  },
];

type NewsArticleWithImage = NewsArticle & { image: string };

type NewsCard = {
  id: number;
  title: string;
  image: string;
  articleId: number;
};

const Mediacp = () => {
  const CARDS_PER_LEVEL = 6;
  const MAX_EXPAND_LEVELS = 3;
  const imageByName = useMemo(
    () => Object.fromEntries(newsImages.map((img) => [img.name, img.src])),
    [],
  );

  const detailedArticles = useMemo<NewsArticleWithImage[]>(
    () =>
      newsArticles.map((article) => ({
        ...article,
        image: imageByName[article.imageName] ?? newsImages[0]?.src ?? "",
      })),
    [imageByName],
  );

  const allNewsDetails = detailedArticles;

  const [activeArticleId, setActiveArticleId] = useState<number | null>(null);
  const [expandLevel, setExpandLevel] = useState(1);
  const storyRef = useRef<HTMLElement | null>(null);
  const storyImageRef = useRef<HTMLDivElement | null>(null);

  const activeArticle = useMemo(
    () => allNewsDetails.find((article) => article.id === activeArticleId) ?? null,
    [activeArticleId, allNewsDetails],
  );

  const newsCards = useMemo<NewsCard[]>(() => {
    return allNewsDetails.map((article) => ({
      id: article.id,
      title: article.title,
      image: article.image,
      articleId: article.id,
    }));
  }, [allNewsDetails]);

  const totalLevels = useMemo(
    () => Math.min(MAX_EXPAND_LEVELS, Math.max(1, Math.ceil(newsCards.length / CARDS_PER_LEVEL))),
    [newsCards.length],
  );

  const visibleNewsCards = useMemo(() => {
    if (expandLevel >= totalLevels) return newsCards;
    return newsCards.slice(0, expandLevel * CARDS_PER_LEVEL);
  }, [expandLevel, totalLevels, newsCards]);

  const hasMoreCards = totalLevels > 1;

  const scrollToNewsDetails = () => {
    const targetElement = storyImageRef.current ?? storyRef.current;
    if (!targetElement) return;

    const headerElement = document.querySelector("header");
    const headerOffset = headerElement instanceof HTMLElement ? headerElement.offsetHeight + 12 : 108;
    const targetY = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetY, 0),
      behavior: "smooth",
    });
  };

  const handleReadMore = (id: number) => {
    setActiveArticleId(id);
    requestAnimationFrame(() => requestAnimationFrame(scrollToNewsDetails));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div className="absolute inset-0 h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${Herobg})` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium">Media Center</div>
            <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">News And Media</h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl text-center">
              Stay updated with announcements, project highlights, and verified press coverage from Zigma Global Environ Solutions.
            </p>
          </div>
        </section>

        {activeArticle && (
          <section
            ref={storyRef}
            className="section-padding pt-4 pb-8 md:pt-6 md:pb-10 bg-white scroll-mt-24 lg:scroll-mt-28"
          >
            <div className="container-main">
              <div className="text-xs uppercase tracking-[0.26em] text-muted-foreground font-medium">Top Story</div>
              <h2 className="mt-1 text-xl md:text-2xl font-bold text-foreground">
                News <span className="text-primary">Details</span>
              </h2>

              <div className="mt-3 border border-slate-200 bg-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex h-full flex-col justify-center p-4 space-y-4 lg:p-5">
                    <div className="flex items-center gap-3 text-md text-muted-foreground">
                      <span className="text-primary font-medium">{activeArticle.source}</span>
                    </div>

                    <h3 className="mt-2 text-xl lg:text-2xl font-bold text-foreground leading-snug">
                      {activeArticle.title}
                    </h3>
                    <p className="mt-3 text-base lg:text-lg text-slate-600 leading-relaxed text-justify line-clamp-3">
                      {activeArticle.excerpt}
                    </p>
                  </div>

                  <div ref={storyImageRef} className="relative h-[340px] md:h-[420px] overflow-hidden bg-white p-2">
                    <img
                      src={activeArticle.image}
                      alt={activeArticle.title}
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="section-padding bg-slate-50 scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Latest Coverage</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Latest <span className="text-primary">News</span>
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {visibleNewsCards.map((card) => (
                <article key={card.id} className="flex items-center gap-3 border border-slate-200 bg-white p-3 shadow-sm">
                  <img src={card.image} alt={card.title} className="h-20 w-24 flex-shrink-0 object-cover" />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-foreground line-clamp-2">{card.title}</h4>
                    <button
                      type="button"
                      onClick={() => handleReadMore(card.articleId)}
                      className="mt-2 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary/80"
                    >
                      Read more
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {hasMoreCards ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpandLevel((prev) => (prev < totalLevels ? prev + 1 : 1))}
                  className="inline-flex items-center rounded-md border border-primary/30 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                >
                  {expandLevel < totalLevels
                    ? `Explore More News (${expandLevel + 1}/${totalLevels})`
                    : "Show Less News"}
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Mediacp;
