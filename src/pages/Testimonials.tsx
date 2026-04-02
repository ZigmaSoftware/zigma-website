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
import socialImg1 from "@/assets/Testimonials/social proof/social.jpg";
import socialImg2 from "@/assets/Testimonials/social proof/social2.png";
import socialImg3 from "@/assets/Testimonials/social proof/social3.png";
import socialImg4 from "@/assets/Testimonials/social proof/social4.png";
import socialImg5 from "@/assets/Testimonials/social proof/social5.png";
import socialImg6 from "@/assets/Testimonials/social proof/social6.png";
import socialImg7 from "@/assets/Testimonials/social proof/social7.png";
import socialImg8 from "@/assets/Testimonials/social proof/social8.png";
import socialImg9 from "@/assets/Testimonials/social proof/social9.png";
import socialImg10 from "@/assets/Testimonials/social proof/social10.png";
import bg from "@/assets/Testimonials bg.png";


/*TYPES*/

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

const isYouTubeSource = (source: string): boolean => getYouTubeId(source) !== null;

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

const createYouTubeVideo = (
  src: string,
  title: string,
  desc: string,
  label: string,
  duration: string,
  dotColor: string,
  options?: { featured?: boolean; badge?: string }
): Video => ({
  src,
  poster: getYouTubeThumbnail(src),
  label,
  duration,
  title,
  desc,
  author: "YouTube Coverage",
  dotColor,
  featured: options?.featured ?? false,
  badge: options?.badge,
});

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
  createYouTubeVideo(
    "https://youtu.be/TLXCtngKo6U",
    "Zigma: Transforming Waste into Value (Amrita TV)",
    "Amrita TV feature on Zigma's waste-to-value transformation.",
    "TV Feature",
    "Clip 01",
    "#10B981",
    { featured: true, badge: "Featured" }
  ),
  createYouTubeVideo(
    "https://youtu.be/hHqRdoo5Cn0",
    "Integrated Waste Management Initiative (Andhra Cluster)",
    "Integrated waste-management execution across the Andhra cluster.",
    "Project Update",
    "Clip 02",
    "#34D399"
  ),
  createYouTubeVideo(
    "https://youtu.be/XUia9pKBCq8",
    "Zigma: Andhra Cluster - Large-Scale Waste Transformation",
    "Large-scale transformation story from Andhra cluster operations.",
    "Andhra Cluster",
    "Clip 03",
    "#059669"
  ),
  createYouTubeVideo(
    "https://youtu.be/rrlmAHF2J3k",
    "Andhra Pradesh Cluster Development Programme - Field Report",
    "Ground-level field report from the Andhra Pradesh cluster development programme.",
    "Field Report",
    "Clip 04",
    "#047857"
  ),
  createYouTubeVideo(
    "https://youtube.com/shorts/wtwIxpW18wI",
    "Andhra Pradesh Chief Minister - Speech / Press Byte",
    "Press byte coverage from the Andhra Pradesh Chief Minister event.",
    "Press Byte",
    "Short 01",
    "#0F766E",
    { badge: "Short" }
  ),
  createYouTubeVideo(
    "https://youtu.be/cIlPFcl874s",
    "ANI Vijayawada Inauguration",
    "ANI coverage from Vijayawada inauguration activity.",
    "News Coverage",
    "Clip 05",
    "#10B981"
  ),
  createYouTubeVideo(
    "https://youtu.be/cbNVz0H8qaI",
    "Zigma & Anna University: Soil Transformation and Scientific Validation Initiative",
    "Scientific validation initiative in collaboration with Anna University.",
    "Research",
    "Clip 06",
    "#34D399"
  ),
  createYouTubeVideo(
    "https://youtu.be/psbedFJNN4w",
    "BSF Club FM Radio",
    "Radio feature discussing Zigma's project outcomes and impact.",
    "Radio Feature",
    "Clip 07",
    "#059669"
  ),
  createYouTubeVideo(
    "https://youtu.be/i9TVKl-eVDc",
    "CNBC TV18 News",
    "Business news coverage of Zigma's project work and scale.",
    "Business News",
    "Clip 08",
    "#047857"
  ),
  createYouTubeVideo(
    "https://youtu.be/vngSQHFCjM4",
    "Cuddalore Puthiyathalaimurai",
    "Regional media coverage from Cuddalore operations.",
    "Regional News",
    "Clip 09",
    "#0F766E"
  ),
  createYouTubeVideo(
    "https://youtube.com/shorts/VJcVc7TKYN8",
    "Andhra Cluster Shorts Update",
    "Short-format update from Andhra cluster execution.",
    "Project Short",
    "Short 02",
    "#10B981",
    { badge: "Short" }
  ),
  createYouTubeVideo(
    "https://youtu.be/qe2Bt-AjaiQ",
    "Zigma: Building Sustainable Urban India",
    "Sustainability-focused overview of urban transformation work.",
    "Brand Story",
    "Clip 10",
    "#34D399"
  ),
  createYouTubeVideo(
    "https://youtu.be/bxv2ZCh-3T8",
    "Zigma: Smart Solutions for Cleaner Cities - Erode Malai Murasu News",
    "Erode media coverage featuring smart solutions for cleaner cities.",
    "Regional News",
    "Clip 11",
    "#059669"
  ),
  createYouTubeVideo(
    "https://youtu.be/LMRHIdbetAE",
    "Erode MLA Visit",
    "On-site coverage from the Erode MLA visit.",
    "Site Visit",
    "Clip 12",
    "#047857"
  ),
  createYouTubeVideo(
    "https://youtu.be/-E0jiZUUKd4",
    "ETV News Vijayawada",
    "ETV News coverage from Vijayawada project updates.",
    "News Coverage",
    "Clip 13",
    "#0F766E"
  ),
];

const DEFAULT_VIDEO: Video = VIDEOS.find((video) => video.featured) ?? VIDEOS[0];

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
    initials: "MD",
    gradient: "linear-gradient(135deg,#10B981,#34D399)",
    name: "MoUD",
    handle: "@Moud_India",
    platform: "linkedin",
    text: `Take a tour of #Kumbakonam dumpyard and learn about the biomining process. #MyCleanIndia.`,
    likes: "2.1k",
    time: "3 days ago",
    image: socialImg1,
  },
  {
    initials: "NF",
    gradient: "linear-gradient(135deg,#059669,#10B981)",
    name: "Neev Fund",
    handle: "@NeevFund",
    platform: "linkedin",
    text: `Blue Planet Environmental Solutions and partners Zigma Global Environ Solutions Pvt. Ltd. are addressing urban waste by clearing a legacy dumpsite and freeing up land for Chidambaram Municipality.`,
    likes: "1.8k",
    time: "5 days ago",
    image: socialImg2,
  },
  {
    initials: "NF",
    gradient: "linear-gradient(135deg,#047857,#10B981)",
    name: "Neev Fund",
    handle: "@NeevFund",
    platform: "linkedin",
    text: `Our portfolio company Blue Planet Environmental Solutions' efforts in waste management and biomining have paid off, helping transform degraded sites into greener, more sustainable spaces.`,
    likes: "1.2k",
    time: "1 week ago",
    image: socialImg3,
  },
  {
    initials: "NF",
    gradient: "linear-gradient(135deg,#065F46,#059669)",
    name: "Neev Fund",
    handle: "@NeevFund",
    platform: "linkedin",
    text: `Rapid urbanization has intensified city waste challenges. This highlights Blue Planet Environmental Solutions and Zigma leaders discussing practical technologies to tackle the problem.`,
    likes: "986",
    time: "9 days ago",
    image: socialImg4,
  },
];

const EXTRA_CARDS: WallCard[] = [
  {
    initials: "BP",
    gradient: "linear-gradient(135deg,#10B981,#6EE7B7)",
    name: "Blue Planet Environmental Solutions",
    handle: "@BluePlanet_Env",
    platform: "linkedin",
    text: `This contribution by our associate company @zigmaglobal1 is commendable. We are working with partners to support communities with essential resources.`,
    likes: "1.1k",
    time: "2 weeks ago",
    image: socialImg5,
  },
  {
    initials: "BP",
    gradient: "linear-gradient(135deg,#059669,#34D399)",
    name: "Blue Planet Environmental Solutions",
    handle: "@BluePlanet_Env",
    platform: "linkedin",
    text: `Our partner @zigmaglobal1 has leveraged eco-friendly landfill-mining techniques to reclaim over 12 acres under the Kumbakonam Dumpyard Reclamation Project.`,
    likes: "1.4k",
    time: "2 weeks ago",
    image: socialImg6,
  },
  {
    initials: "BP",
    gradient: "linear-gradient(135deg,#047857,#34D399)",
    name: "Blue Planet Environmental Solutions",
    handle: "@BluePlanet_Env",
    platform: "linkedin",
    text: `We continue driving circular-economy outcomes with partners like @NeevFund through the #SustainabilityShowcase and broader sustainability efforts.`,
    likes: "1.6k",
    time: "3 weeks ago",
    image: socialImg7,
  },
  {
    initials: "BP",
    gradient: "linear-gradient(135deg,#10B981,#059669)",
    name: "Blue Planet Environmental Solutions",
    handle: "@BluePlanet_Env",
    platform: "linkedin",
    text: `Converting landfills into clean, productive stretches of land may seem far-fetched, but together with Zigma Global Environ Solutions we have been doing exactly that.`,
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

function captureVideoThumbnail(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve(null);
      return;
    }

    const video = document.createElement("video");
    let done = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const finalize = (thumb: string | null): void => {
      if (done) return;
      done = true;
      if (timeoutId) clearTimeout(timeoutId);
      video.pause();
      video.removeAttribute("src");
      video.load();
      resolve(thumb);
    };

    const drawFrame = (): void => {
      if (!video.videoWidth || !video.videoHeight) {
        finalize(null);
        return;
      }

      const canvas = document.createElement("canvas");
      const maxWidth = 960;
      const scale = Math.min(1, maxWidth / video.videoWidth);
      canvas.width = Math.max(1, Math.floor(video.videoWidth * scale));
      canvas.height = Math.max(1, Math.floor(video.videoHeight * scale));

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        finalize(null);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      finalize(canvas.toDataURL("image/jpeg", 0.85));
    };

    const seekAndCapture = (): void => {
      const seekTime =
        Number.isFinite(video.duration) && video.duration > 0.25
          ? Math.min(1.5, video.duration / 3)
          : 0;

      if (seekTime <= 0) {
        drawFrame();
        return;
      }

      const onSeeked = (): void => {
        video.removeEventListener("seeked", onSeeked);
        drawFrame();
      };

      video.addEventListener("seeked", onSeeked);
      video.currentTime = seekTime;
    };

    video.addEventListener("loadeddata", seekAndCapture, { once: true });
    video.addEventListener("error", () => finalize(null), { once: true });

    timeoutId = setTimeout(() => finalize(null), 5000);
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.src = src;
  });
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
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl",
        card.tall && "motion-safe:hover:shadow-lg"
      )}
    >
      {card.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={card.image}
            alt={card.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 text-left">
          <strong className="block text-sm font-bold text-foreground">
            {card.name}
          </strong>
          <span className="block text-xs text-muted-foreground">
            {card.handle.replace(/\s*-\s*LinkedIn\s*$/i, "")}
          </span>
        </div>
        <p
          className="text-left text-sm leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: card.text }}
        />
      </div>
    </article>
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
  const [selectedVideo, setSelectedVideo] = useState<Video>(DEFAULT_VIDEO);
  const [videoThumbs, setVideoThumbs] = useState<Record<string, string>>({});
  const selectedVideoEmbedUrl = getYouTubeEmbedUrl(selectedVideo.src);

  const openVideoModal = (video: Video): void => {
    setSelectedVideo(video);
    setVideoOpen(true);
  };

  useEffect(() => {
    let active = true;

    const loadThumbs = async (): Promise<void> => {
      const localVideos = VIDEOS.filter((video) => !isYouTubeSource(video.src));
      if (!localVideos.length) return;

      const entries = await Promise.all(
        localVideos.map(async (video) => [
          video.src,
          await captureVideoThumbnail(video.src),
        ] as const)
      );

      if (!active) return;

      const nextThumbs: Record<string, string> = {};
      for (const [src, thumb] of entries) {
        if (thumb) nextThumbs[src] = thumb;
      }
      setVideoThumbs(nextThumbs);
    };

    void loadThumbs();
    return () => {
      active = false;
    };
  }, []);

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
                <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-lg md:p-12">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/70" />
                  <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-3xl" />

                  <div className="relative z-10 grid h-full items-center justify-items-center gap-8 md:grid-cols-[360px_1fr] md:gap-10">
                    <div className="mx-auto w-full max-w-[360px]">
                      <div className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-emerald-50 shadow-md">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="h-[340px] w-full object-cover object-top md:h-[390px]"
                        />
                      </div>
                    </div>

                    <div className="grid h-full w-full max-w-2xl grid-rows-[1fr_auto] gap-4">
                      <div className="relative w-full self-center pb-6">
                        <div className="mb-3 opacity-75">
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
                        <p className="pl-4 pr-12 text-left text-lg italic text-muted-foreground md:pl-6 md:text-xl">
                          {s.text}
                        </p>
                        <div className="absolute -bottom-1 right-0 w-fit opacity-75 rotate-180">
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
                      </div>

                      <div className="w-full pt-2">
                        <div className="flex max-w-[420px] flex-col items-start gap-0.5 text-left">
                          <strong className="text-xl font-bold text-foreground">
                            {s.name}
                          </strong>
                          <span className="text-lmd font-medium text-muted-foreground">
                            {s.role}
                          </span>
                          <div className="mt-1 text-lg tracking-wider text-amber-400">
                            {"\u2605\u2605\u2605\u2605\u2605"}
                          </div>
                          <div className="mt-2 w-fit   pl-1  text-sm font-semibold text-primary">
                            {s.tag}
                          </div>
                        </div>
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

        {/* VIDEO TESTIMONIALS */}
        <section className="relative overflow-hidden bg-muted/30">
          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-400/20 to-transparent blur-3xl" />
          <div className="container-main py-14 text-center md:py-16">

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
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Watch real interviews with our partners and clients
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video: Video) => (
              <Reveal key={video.src} className="h-full">
                <article className="h-full overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <button
                    type="button"
                    onClick={() => openVideoModal(video)}
                    className="group flex h-full w-full flex-col text-left"
                    aria-label={`Play ${video.title}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={videoThumbs[video.src] ?? video.poster}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur transition-transform group-hover:scale-105">
                        <Play size={18} fill="currentColor" className="ml-0.5" />
                      </span>
                    </div>

                    <div className="flex h-[108px] flex-col p-4 sm:h-[116px]">
                      <h3 className="min-h-[2.75rem] line-clamp-2 text-sm font-semibold text-foreground sm:text-base">
                        {video.title}
                      </h3>
                      <p className="mt-1 min-h-[2.25rem] line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                        {video.desc}
                      </p>
                    </div>
                  </button>
                </article>
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
                {selectedVideoEmbedUrl ? (
                  <iframe
                    key={selectedVideo.src}
                    src={selectedVideoEmbedUrl}
                    title={selectedVideo.title}
                    className="h-full w-full"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={selectedVideo.src}
                    src={selectedVideo.src}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full"
                  />
                )}
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


          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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




