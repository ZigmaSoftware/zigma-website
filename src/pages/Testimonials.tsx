import { useState, useEffect, useRef, useCallback, FC } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Leaf,
  Star,
  Zap,
  Home,
  Award,
  Play,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/animation/Reveal";
import { cn } from "@/lib/utils";
import msJennyBatesImg from "@/assets/Testimonials/Ms. Jenny Bates.png";
import ministerGraceFuImg from "@/assets/Testimonials/Minister Grace Fu.png";
import msRupaMishraImg from "@/assets/Testimonials/Ms. Rupa Mishra.png";
import mrsAlmitraHPatelImg from "@/assets/Testimonials/Mrs. Almitra H Patel.png";
import drVIraiAnduImg from "@/assets/Testimonials/Dr. V. Irai Andu, IAS.png";
import msSupriyaSahuImg from "@/assets/Testimonials/Ms. Supriya Sahu, IAS.jpg";
import mrVenkaihNaiduImg from "@/assets/Testimonials/Mr. Venkaih Naidu.jpg";
import mrDurgaShankarMishraImg from "@/assets/Testimonials/Mr. Durga Shankar Mishra.jpg";
import drTarjindarSinghDhindsaImg from "@/assets/Testimonials/Dr. Tarjindar Singh Dhindsa.png";
import msRAPriyangaImg from "@/assets/Testimonials/Ms. R A Priyanga, IAS.png";
import mrAmolSAwateImg from "@/assets/Testimonials/Mr. Amol S. Awate, IAS.png";
import drJRadhakrishnanImg from "@/assets/Testimonials/Dr. J. Radhakrishnan, IAS.png";
import mrPSwaroopImg from "@/assets/Testimonials/Mr. P. Swaroop, IAS.png";
import mrGagandeepSinghBediImg from "@/assets/Testimonials/Mr. Gagandeep Singh Bedi, IAS.png";
import mrManojJoshiImg from "@/assets/Testimonials/Mr. Manoj Joshi, IAS.jpg";
import mrJusticePJyothimaniImg from "@/assets/Testimonials/Mr. Justice P Jyothimani.jpg";
import mrJusticeAdiImg from "@/assets/Testimonials/Mr. Justice Adi.jpg";
import videoOne from "@/assets/Testimonials/video 1.mp4";
import videoTwo from "@/assets/Testimonials/video 2.mp4";
import videoThree from "@/assets/Testimonials/video 3.mp4";
import pictureOne from "@/assets/Testimonials/Picture1.png";
import pictureTwo from "@/assets/Testimonials/Picture2.png";
import pictureThree from "@/assets/Testimonials/Picture3.png";
import socialImg1 from "@/assets/Testimonials/social.jpg";
import socialImg2 from "@/assets/Testimonials/social2.png";
import socialImg3 from "@/assets/Testimonials/social3.png";
import socialImg4 from "@/assets/Testimonials/social4.png";
import socialImg5 from "@/assets/Testimonials/social5.png";
import socialImg6 from "@/assets/Testimonials/social6.png";
import socialImg7 from "@/assets/Testimonials/social7.png";
import socialImg8 from "@/assets/Testimonials/social8.png";
import socialImg9 from "@/assets/Testimonials/social9.png";
import socialImg10 from "@/assets/Testimonials/social10.png";
import bg from "@/assets/Testimonials bg.png";


/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   TYPES
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface Slide {
  text: string;
  image: string;
  name: string;
  role: string;
  tag: string;
}

interface Video {
  src: string;
  poster: string;
  label: string;
  duration: string;
  title: string;
  desc: string;
  author: string;
  dotColor: string;
  featured: boolean;
  badge?: string;
}

type StatIconType = "globe" | "leaf" | "star" | "zap" | "home" | "award";

interface Stat {
  icon: StatIconType;
  number: number;
  suffix: string;
  label: string;
  barWidth: string;
  decimal?: boolean;
}

type Platform = "linkedin" | "twitter";

interface WallCard {
  initials: string;
  gradient: string;
  name: string;
  handle: string;
  platform: Platform;
  text: string;
  likes: string;
  time: string;
  tall?: boolean;
  image?: string;
}

type LoadState = "idle" | "loading" | "done";

/* Data*/
const SLIDES: Slide[] = [
  {
    text: "Take a tour of #Kumbakonm and learn about the bio-mining.",
    image: mrVenkaihNaiduImg,
    name: "Mr. Venkaih Naidu",
    role: "Former Minister for Urban Development, Govt. of India",
    tag: "India",
  },
  {
    text: "I am most impressed with the technology that is involved, especially how we can mine and turn waste into Treasure... there are too many sites that need to be cured.",
    image: ministerGraceFuImg,
    name: "Minister Grace Fu",
    role: "Minister for Sustainability & the Environment, Member of Parliament, Singapore",
    tag: "Singapore",
  },
  {
    text: "Extremely impressed by the process going on in remediating the legacy waste, my best wishes.",
    image: mrDurgaShankarMishraImg,
    name: "Mr. Durga Shankar Mishra",
    role: "Secretary, Ministry of Housing and Urban Affairs (MoHUA), Govt. of India",
    tag: "India",
  },
  {
    text: "Excellent facility & infrastructure created with the potential to have a solid-free city.",
    image: drTarjindarSinghDhindsaImg,
    name: "Dr. Tarjindar Singh Dhindsa",
    role: "Deputy Executive Director, Dalmia Cement",
    tag: "India",
  },
  {
    text: "Had a great experience learning the hardships involved in waste clearance. Good luck & continue the great work.",
    image: msRAPriyangaImg,
    name: "Ms. R A Priyanga, IAS",
    role: "Assistant Collector, Dindigul District",
    tag: "Tamil Nadu",
  },
  {
    text: "Well-organized and well-maintained SWM plant.",
    image: mrAmolSAwateImg,
    name: "Mr. Amol S. Awate, IAS",
    role: "Sub Divisional Magistrate, Dwarka, Gujarat",
    tag: "Gujarat",
  },
  {
    text: "Amazed to see the work addressing legacy waste issues.",
    image: drJRadhakrishnanImg,
    name: "Dr. J. Radhakrishnan, IAS",
    role: "Commissioner, Greater Chennai Corporation (GCC), Tamil Nadu",
    tag: "Tamil Nadu",
  },
  {
    text: "The visit to the Zigma facility was a great learning experience. The task at hand is humongous, and I hope that the ground team completes it on time. The facility was certainly impressive.",
    image: msSupriyaSahuImg,
    name: "Ms. Supriya Sahu, IAS",
    role: "ACS, ECC&F Department, Tamil Nadu",
    tag: "Tamil Nadu",
  },
  {
    text: "Today visited the dump yard at Atladara and witnessed a massive transformation from garbage dump to a processed plant. Seventeen acres of valuable land have been preserved and reclaimed. Good work.",
    image: mrPSwaroopImg,
    name: "Mr. P. Swaroop, IAS",
    role: "Municipal Commissioner, Vadodara",
    tag: "Gujarat",
  },
  {
    text: "Had the experience of visiting the site. It is a great learning experience. The project is going as per schedule, aiming for completion by December 2022. Suggested creating a booklet for officials of other municipalities and preparing a time-lapse video.",
    image: drVIraiAnduImg,
    name: "Dr. V. Irai Andu, IAS",
    role: "Chief Secretary to the Government of Tamil Nadu",
    tag: "Tamil Nadu",
  },
  {
    text: "Happy to see the initial works starting here, wish to see a quick starting of the project and continuation of the good work already done by Zigma in other cities.",
    image: mrGagandeepSinghBediImg,
    name: "Mr. Gagandeep Singh Bedi, IAS",
    role: "Commissioner, Greater Chennai Corporation (GCC)",
    tag: "Tamil Nadu",
  },
  {
    text: "Carried out an inspection of the bio mining work being done at the Perungudi garbage dump in Chennai, Tamil Nadu. GOI stands committed under the Swachh Bharat Mission for remediation of legacy dumpsites of solid waste in urban cities.",
    image: mrManojJoshiImg,
    name: "Mr. Manoj Joshi, IAS",
    role: "Former Secretary, MoHUA, Govt. of India",
    tag: "India",
  },
  {
    text: "Looks like a factory site while in reality it is full scale work going on at the dumpsite in Vizag.",
    image: msRupaMishraImg,
    name: "Ms. Rupa Mishra",
    role: "Jt. Secretary, MoHUA and National Mission Director, Swachh Bharat Mission",
    tag: "India",
  },
  {
    text: "I was astonished to see that the TN Municipal Administration department along with Zigma are able to implement bio-mining projects while still other states are in the conceptualization stage.",
    image: mrJusticePJyothimaniImg,
    name: "Mr. Justice P Jyothimani",
    role: "Chairman, South Zone NGT",
    tag: "India",
  },
  {
    text: "So impressive - the collaboration, the engineering and the scale. Plus an excellent impact for the future.",
    image: msJennyBatesImg,
    name: "Ms. Jenny Bates",
    role: "Director General, Indo-Pacific, FCDO United Kingdom",
    tag: "United Kingdom",
  },
  {
    text: "Very impressive. Would love to see progress in few years' time here.",
    image: mrJusticeAdiImg,
    name: "Mr. Justice Adi",
    role: "Head, Karnataka NGT SWM Monitoring Committee",
    tag: "India",
  },
  {
    text: "It is the only site where absolutely zero material is left behind on the cleared area.",
    image: mrsAlmitraHPatelImg,
    name: "Mrs. Almitra H Patel",
    role: "National Expert, Swachh Bharat Mission and Former Member, Supreme Court Committee for SWM",
    tag: "India",
  },
];

const VIDEOS: Video[] = [
  {
    src: videoOne,
    poster: pictureOne,
    label: "Site Visit",
    duration: "Video 1",
    title: "Transformation At Scale",
    desc: "Field insights and outcomes from leadership visits to Zigma project sites.",
    author: "Zigma Testimonials",
    dotColor: "#10B981",
    featured: false,
  },
  {
    src: videoTwo,
    poster: pictureTwo,
    label: "Featured Story",
    duration: "Video 2",
    title: "Partners Speak",
    desc: "A featured testimonial compilation from key government and industry stakeholders.",
    author: "Zigma Testimonials",
    dotColor: "#34D399",
    featured: true,
    badge: "Featured",
  },
  {
    src: videoThree,
    poster: pictureThree,
    label: "Project Story",
    duration: "Video 3",
    title: "Waste To Value",
    desc: "Ground-level view of remediation progress and circular-economy impact.",
    author: "Zigma Testimonials",
    dotColor: "#059669",
    featured: false,
  },
];

const STATS: Stat[] = [
  {
    icon: "globe",
    number: 200,
    suffix: "+",
    label: "Clients Served",
    barWidth: "80%",
  },
  {
    icon: "leaf",
    number: 500,
    suffix: "k+",
    label: "Tonnes Waste Processed",
    barWidth: "85%",
  },
  {
    icon: "star",
    number: 4.9,
    suffix: "",
    label: "Average Rating",
    barWidth: "97%",
    decimal: true,
  },
  {
    icon: "zap",
    number: 45,
    suffix: "%",
    label: "Avg Carbon Reduction",
    barWidth: "60%",
  },
  {
    icon: "home",
    number: 98,
    suffix: "%",
    label: "Client Retention Rate",
    barWidth: "98%",
  },
  {
    icon: "award",
    number: 50,
    suffix: "+",
    label: "Industry Awards",
    barWidth: "65%",
  },
];

const WALL_CARDS: WallCard[] = [
  {
    initials: "JB",
    gradient: "linear-gradient(135deg,#10B981,#34D399)",
    name: "Ms. Jenny Bates",
    handle: "@jenny_bates - LinkedIn",
    platform: "linkedin",
    text: `So impressive - the collaboration, the engineering and the scale. Plus, an excellent impact for the future.`,
    likes: "2.1k",
    time: "3 days ago",
    image: socialImg1,
  },
  {
    initials: "GF",
    gradient: "linear-gradient(135deg,#059669,#10B981)",
    name: "Minister Grace Fu",
    handle: "@gracefu_sg - LinkedIn",
    platform: "linkedin",
    text: `I am most impressed with the technology involved, especially how we can mine and turn waste into treasure.`,
    likes: "1.8k",
    time: "5 days ago",
    image: socialImg2,
  },
  {
    initials: "RM",
    gradient: "linear-gradient(135deg,#047857,#10B981)",
    name: "Ms. Rupa Mishra",
    handle: "@rupa_mohua - LinkedIn",
    platform: "linkedin",
    text: `Looks like a factory site while in reality it is full-scale work going on at the dumpsite in Vizag.`,
    likes: "1.2k",
    time: "1 week ago",
    image: socialImg3,
  },
  {
    initials: "AP",
    gradient: "linear-gradient(135deg,#065F46,#059669)",
    name: "Mrs. Almitra H. Patel",
    handle: "@almitra_sbm - LinkedIn",
    platform: "linkedin",
    text: `It is the only site where absolutely zero material is left behind on the cleared area.`,
    likes: "986",
    time: "9 days ago",
    image: socialImg4,
  },
];

const EXTRA_CARDS: WallCard[] = [
  {
    initials: "VA",
    gradient: "linear-gradient(135deg,#10B981,#6EE7B7)",
    name: "Dr. V. Irai Andu",
    handle: "@viraiandu_tn - LinkedIn",
    platform: "linkedin",
    text: `The site visit was a great learning experience. The project is progressing as per schedule.`,
    likes: "1.1k",
    time: "2 weeks ago",
    image: socialImg5,
  },
  {
    initials: "SS",
    gradient: "linear-gradient(135deg,#059669,#34D399)",
    name: "Ms. Supriya Sahu",
    handle: "@supriya_sahu - LinkedIn",
    platform: "linkedin",
    text: `The visit to the Zigma facility was a strong learning experience. The task is huge and the facility is impressive.`,
    likes: "1.4k",
    time: "2 weeks ago",
    image: socialImg6,
  },
  {
    initials: "AK",
    gradient: "linear-gradient(135deg,#047857,#34D399)",
    name: "Mr. Ajay Kapur",
    handle: "@ajaykapur_adani - LinkedIn",
    platform: "linkedin",
    text: `For nearly a decade, Zigma has played a crucial role in advancing circular economy outcomes in cement manufacturing.`,
    likes: "1.6k",
    time: "3 weeks ago",
    image: socialImg7,
  },
  {
    initials: "GK",
    gradient: "linear-gradient(135deg,#10B981,#059669)",
    name: "Gan Kim Yong",
    handle: "@gankimyong - LinkedIn",
    platform: "linkedin",
    text: `Technology-driven end-to-end waste management and upcycling can transform even former dumping sites.`,
    likes: "2.4k",
    time: "1 month ago",
    image: socialImg8,
  },
];

/* Icons */
const StatIcons: Record<StatIconType, React.ComponentType<any>> = {
  globe: Globe,
  leaf: Leaf,
  star: Star,
  zap: Zap,
  home: Home,
  award: Award,
};

/* Hooks */
function useInView(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.15
): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useCounter(
  target: number,
  active: boolean,
  decimal = false,
  duration = 1800
): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const steps = duration / 16;
    const inc = target / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur = Math.min(cur + inc, target);
      setVal(decimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
      if (cur >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, decimal, duration]);
  return val;
}

/* Stat Card */

interface StatCardProps {
  stat: Stat;
}

const StatCard: FC<StatCardProps> = ({ stat }) => {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, 0.5);
  const [barActive, setBarActive] = useState(false);
  const count = useCounter(stat.number, active, stat.decimal);

  useEffect(() => {
    if (active) setTimeout(() => setBarActive(true), 400);
  }, [active]);

  const getIconComponent = () => {
    const Icon = StatIcons[stat.icon];
    return <Icon size={32} />;
  };

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/5 px-7 py-9 text-center backdrop-blur-2xl transition-all hover:border-white/20 hover:bg-white/10"
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
        {getIconComponent()}
      </div>
      <div className="mb-2 text-4xl font-black text-white">
        {count}
        {stat.suffix}
      </div>
      <div className="mb-5 text-sm font-medium text-white/65">{stat.label}</div>
      <div className="h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-[1.5s]"
          style={{
            width: barActive ? stat.barWidth : "0%",
            transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
            transitionDelay: "0.4s",
          }}
        />
      </div>
    </div>
  );
};

interface WallCardProps {
  card: WallCard;
  delay?: number;
}

const WallCardItem: FC<WallCardProps> = ({ card, delay = 0 }) => (
  <Reveal
    className="break-inside-avoid"
    style={{
      display: "inline-block",
      width: "100%",
      marginBottom: 20,
    }}
  >
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all hover:border-primary/25 hover:shadow-md hover:-translate-y-1",
        card.tall && "motion-safe:hover:shadow-lg"
      )}
    >
      <div className="mb-3.5 flex items-center gap-3">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
          style={{ background: card.gradient }}
        >
          {card.initials}
        </div>
        <div className="min-w-0 flex-1">
          <strong className="block text-sm font-bold text-foreground">
            {card.name}
          </strong>
          <span className="block text-xs text-muted-foreground">{card.handle}</span>
        </div>
        <div
          className={cn(
            "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded text-xs font-black text-white",
            card.platform === "linkedin" ? "bg-blue-600" : "bg-black"
          )}
        >
          {card.platform === "linkedin" ? "in" : "ð•"}
        </div>
      </div>
      <p
        className="mb-3.5 text-sm leading-relaxed text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: card.text }}
      />
      {card.image && (
        <img
          src={card.image}
          alt={card.name}
          className="mb-3.5 h-36 w-full rounded-xl border border-border/60 object-cover"
        />
      )}
      <div className="flex items-center justify-between border-t border-border/60 pt-3">
        <span className="text-xs text-muted-foreground"> {card.likes}</span>
        <span className="text-xs text-muted-foreground">{card.time}</span>
      </div>
    </div>
  </Reveal>
);

/* Main Component */
const Testimonials: FC = () => {
  /* Slider state */
  const [current, setCurrent] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      5000
    );
  }, []);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const handlePrev = (): void => {
    stopAuto();
    goTo(current - 1);
    startAuto();
  };
  const handleNext = (): void => {
    stopAuto();
    goTo(current + 1);
    startAuto();
  };
  const handleDot = (i: number): void => {
    stopAuto();
    goTo(i);
    startAuto();
  };

  /* Touch swipe */
  const touchStart = useRef<number>(0);
  const onTouchStart = (e: React.TouchEvent): void => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent): void => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      stopAuto();
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      startAuto();
    }
  };

  /* Video modal */
  const [videoOpen, setVideoOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<Video>(VIDEOS[0]);

  /* Social wall */
  const [wallCards, setWallCards] = useState<WallCard[]>(WALL_CARDS);
  const [loadState, setLoadState] = useState<LoadState>("idle");

  const handleLoadMore = (): void => {
    if (loadState !== "idle") return;
    setLoadState("loading");
    setTimeout(() => {
      setWallCards((c) => [...c, ...EXTRA_CARDS]);
      setLoadState("done");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="scroll-pt-24">
        <section
          data-no-animate
          className="relative flex min-h-[90vh] items-center overflow-hidden pt-20"
        >
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          {/* <div
            className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/35"
            aria-hidden="true"
          /> */}

          <div className="container-main relative text-center">
            <Reveal className="mx-auto max-w-3xl">
              <div className="text-sm font-medium uppercase tracking-[0.35em] text-white/85">
                Testimonials
              </div>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl">
                Voices That Validate Our Impact
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                Hear directly from global leaders, public officials, and partners
                who have witnessed our waste-to-value transformation.
              </p>
            </Reveal>
          </div>
        </section>
        {/* FEATURED TESTIMONIALS  */}
        <section className="section-padding">
          <div className="container-main text-center">
          <Reveal className="inline-flex items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Featured Testimonials
            </span>
          </Reveal>

          <Reveal className="mt-3">
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              What Our <span className="text-primary">Clients Say</span> 
            </h2>
          </Reveal>

          <Reveal className="mt-3">
            <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Real experiences from industry leaders driving sustainable change
            </p>
          </Reveal>

          <div
            className="relative mt-6 overflow-hidden rounded-2xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {SLIDES.map((s: Slide, i: number) => (
              <div
                key={i}
                style={{ display: i === current ? "block" : "none" }}
              >
                <div className="relative h-[460px] md:h-[460px]  overflow-hidden rounded-2xl border border-border bg-white p-14 shadow-lg md:p-16">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/70" />
                  <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-3xl" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-8 opacity-75">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <path
                          d="M14 20h-4a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6zM8 20v-4a10 10 0 0 1 10-10"
                          stroke="#10B981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M34 20h-4a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6zM28 20v-4a10 10 0 0 1 10-10"
                          stroke="#10B981"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <p className=" flex-1 overflow-y-auto pr-1 text-lg italic  text-muted-foreground md:text-xl">
                      {s.text}
                    </p>

                    <div className="flex flex-wrap items-center gap-5">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400/70 via-emerald-500/40 to-transparent blur-[1px]" />
                        <div className="relative rounded-full p-1.5 bg-white shadow-lg ring-1 ring-emerald-100">
                          <img
                            src={s.image}
                            alt={s.name}
                            className="h-24 w-24 md:h-28 md:w-28 rounded-full object-cover object-top border-2 border-emerald-200/70"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5 max-w-[420px]">
                        <strong className="text-base font-bold text-foreground">
                          {s.name}
                        </strong>
                        <span className="text-sm font-medium text-muted-foreground">
                          {s.role}
                        </span>
                        <div className="mt-1 text-lg tracking-wider text-amber-400">
                          {"\u2605\u2605\u2605\u2605\u2605"}
                        </div>
                      </div>
                      <div className="ml-auto rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
                        {s.tag}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-white text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>

              <div className="flex gap-2.5">
                {SLIDES.map((_: Slide, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    className={cn(
                      "transition-all duration-300",
                      i === current
                        ? "h-2.5 w-7 rounded-sm bg-primary"
                        : "h-2.5 w-2.5 rounded-full border-2 border-border bg-transparent"
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-white text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                style={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
              />
            </div>
          </div>
          </div>
        </section>

        {/* â•â•â•â•â•â•â•â• VIDEO TESTIMONIALS â•â•â•â•â•â•â•â• */}
        <section className="relative overflow-hidden bg-muted/30">
          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
          <div className="container-main section-padding text-center">

          <Reveal className="inline-flex items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Video Stories
            </span>
          </Reveal>

          <Reveal className="mt-3">
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Hear It From <span className="text-primary">Them</span>
            </h2>
          </Reveal>

          <Reveal className="mt-3">
            <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Watch real interviews with our partners and clients
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((v: Video, i: number) => (
              <Reveal key={i} className="group">
                <div
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
                  onClick={() => {
                    setSelectedVideo(v);
                    setVideoOpen(true);
                  }}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      v.featured ? "h-64" : "h-48"
                    )}
                  >
                    <img
                      src={v.poster}
                      alt={v.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35" />

                    <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      {v.label}
                    </div>

                    <button
                      className={cn(
                        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-primary/100/90 transition-all hover:scale-110",
                        v.featured ? "h-16 w-16" : "h-14 w-14"
                      )}
                      aria-label="Play video"
                    >
                      <Play
                        size={v.featured ? 36 : 28}
                        fill="white"
                        className="ml-1"
                      />
                    </button>

                    <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                      {v.duration}
                    </div>

                    {v.badge && (
                      <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-primary to-primary/70 px-3 py-1 text-xs font-bold text-white">
                        {v.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <div
                        className="h-2 w-2 rounded-full flex-shrink-0"
                        style={{ background: v.dotColor }}
                      />
                      <span>{v.author}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </section>

        {/* Video Modal */}
        {videoOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          >
            <div
              className="relative w-11/12 max-w-3xl overflow-hidden rounded-2xl bg-gray-900"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="aspect-video w-full bg-black">
                <video
                  key={selectedVideo.src}
                  src={selectedVideo.src}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* â•â•â•â•â•â•â•â• SOCIAL PROOF WALL â•â•â•â•â•â•â•â• */}
        <section className="section-padding">
          <div className="container-main text-center">
          <Reveal className="inline-flex items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Social Proof
            </span>
          </Reveal>

          <Reveal className="mt-3">
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              The Conversation <span className="text-primary">Around
              Us</span> 
            </h2>
          </Reveal>

          <Reveal className="mt-3">
            <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Real-time voices from LinkedIn, Twitter &amp; industry forums
            </p>
          </Reveal>


          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {wallCards.map((c: WallCard, i: number) => (
              <WallCardItem key={i} card={c} delay={(i % 4) * 0.06} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadState === "done"}
              className={cn(
                "inline-flex items-center gap-3 rounded-xl px-8 py-3.5 font-semibold transition-all",
                loadState === "done"
                  ? "border-2 border-border bg-muted/30 text-muted-foreground cursor-not-allowed opacity-60"
                  : "border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white"
              )}
            >
              {loadState === "idle" && (
                <>
                  <span>Load More Reviews</span>
                  <ChevronDown size={18} />
                </>
              )}
              {loadState === "loading" && <span>Loading</span>}
              {loadState === "done" && (
                <>
                  <span>All Reviews Loaded</span>
                  <Check size={18} />
                </>
              )}
            </button>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;




