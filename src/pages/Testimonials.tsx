import { useState, useEffect, useRef, useCallback, FC, type ReactNode } from "react";
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
  Image,
  MapPin,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/animation/Reveal";
import VideosCascadeSlider from "@/components/videos/VideosCascadeSlider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
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
import msMehakJainIasImg from "@/assets/Testimonials/Ms. Mehak Jain, IAS.png";
import drJRadhakrishnanImg from "@/assets/Testimonials/Dr. J. Radhakrishnan, IAS.png";
import mrPSwaroopImg from "@/assets/Testimonials/Mr. P. Swaroop, IAS.png";
import mrGagandeepSinghBediImg from "@/assets/Testimonials/Mr. Gagandeep Singh Bedi, IAS.png";
import mrManojJoshiImg from "@/assets/Testimonials/Mr. Manoj Joshi, IAS.jpg";
import mrJusticePJyothimaniImg from "@/assets/Testimonials/Mr. Justice P Jyothimani.jpg";
import mrJusticeAdiImg from "@/assets/Testimonials/Mr. Justice Adi.jpg";
import shriArunMaheshBabuImg from "@/assets/Testimonials/Arun Mahesh Babu Profile.png";
import mrAjayKapurImg from "@/assets/Testimonials/Mr. Ajay Kapur.png";
import andersBendsenSpohrImg from "@/assets/Testimonials/Anders Bendsen Spohr.webp";
import nelloreCommissionerVisitImg from "@/assets/people at zigma/Plants/6.webp";
import kodungaiyurTeamsVisitImg from "@/assets/people at zigma/Plants/10.webp";
// import andersBendsenSpohrCommentsImg from "@/assets/Testimonials/social proof/Anders Bendsen Spohr comments.jpeg";
// import arunMaheshBabuCommentsImg from "@/assets/Testimonials/social proof/Arun Mahesh Babu IAS comments.jpeg";
// Social proof (currently hidden/disabled on the page)
// import socialImg1 from "@/assets/Testimonials/social proof/social.jpg";
// import socialImg2 from "@/assets/Testimonials/social proof/social2.png";
// import socialImg3 from "@/assets/Testimonials/social proof/social3.png";
// import socialImg4 from "@/assets/Testimonials/social proof/social4.png";
// import socialImg5 from "@/assets/Testimonials/social proof/social5.png";
// import socialImg6 from "@/assets/Testimonials/social proof/social6.png";
// import socialImg7 from "@/assets/Testimonials/social proof/social7.png";
// import socialImg8 from "@/assets/Testimonials/social proof/social8.png";
// import socialImg9 from "@/assets/Testimonials/social proof/social9.png";
// import socialImg10 from "@/assets/Testimonials/social proof/social10.png";
import bg from "@/assets/website/hero/Testimonials-bg.jpeg";


/*TYPES*/

interface Slide {
  text: string;
  image: string;
  name: string;
  role: string;
  tag: string;
  commentImage?: string;
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
}

interface SiteVisitImage {
  src: string;
  alt: string;
  headline?: string;
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

type IconComponent = React.ComponentType<{ size?: number | string; className?: string }>;

const SECTION_EYEBROW_CLASS =
  "text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground";
const SECTION_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-foreground leading-tight md:text-4xl";
const SECTION_SUBTITLE_CLASS =
  "mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base";

// Social proof wall types (currently hidden/disabled on the page)
// type Platform = "linkedin" | "twitter";
//
// interface WallCard {
//   initials: string;
//   gradient: string;
//   name: string;
//   handle: string;
//   platform: Platform;
//   text: string;
//   likes: string;
//   time: string;
//   tall?: boolean;
//   image?: string;
// }
//
// type LoadState = "idle" | "loading" | "done";

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
  options?: { featured?: boolean }
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
});

/* Data*/
const SLIDES: Slide[] = [

     {
    text: "It was a great pleasure to see the site. You guys are doing great things for the planet and you are very professional in how you manage and the culture you have on site. So many thanks.",
    image: andersBendsenSpohrImg,
    name: "Anders Bendsen Spohr",
    role: "Managing Partner - NOVO Holdings, Head of Planetary Health Investments",
    tag: "International",
    // commentImage: andersBendsenSpohrCommentsImg,
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
    name: "Durga Shankar Mishra",
    role: "Former Secretary, Ministry of Housing and Urban Affairs (MoHUA), Govt. of India",
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
    text: "Excellent facility & infrastructure created with the potential to have a solid-free city.",
    image: drTarjindarSinghDhindsaImg,
    name: "Dr. Tarjindar Singh Dhindsa",
    role: "Former Deputy Executive Director, Dalmia Cements Limited",
    tag: "India",
  },

  {
    text: "Well-organized and well-maintained SWM plant.",
    image: mrAmolSAwateImg,
    name: "Amol S. Awate, IAS",
    role: "Former Sub Divisional Magistrate, Dwarka, Gujarat",
    tag: "Gujarat",
  },
  {
    text: "A well-functioning mechanized plant. Waste to wealth being realized for real.",
    image: msMehakJainIasImg,
    name: "Ms. Mehak Jain, IAS",
    role: "Former Deputy Collector, Rajkot City-2 Office",
    tag: "Gujarat",
  },
  {
    text: "Amazed to see the work addressing legacy waste issues.",
    image: drJRadhakrishnanImg,
    name: "Dr. J. Radhakrishnan, IAS",
    role: "Former Commissioner, Greater Chennai Corporation (GCC), Tamil Nadu",
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
    name: "P. Swaroop, IAS",
    role: "Former Municipal Commissioner, Vadodara",
    tag: "Gujarat",
  },
  {
    text: "Had the experience of visiting the site. It is a great learning experience. The project is going as per schedule, aiming for completion by December 2022. Suggested creating a booklet for officials of other municipalities and preparing a time-lapse video.",
    image: drVIraiAnduImg,
    name: "Dr. V. Irai Andu, IAS",
    role: "Former Chief Secretary to the Government of Tamil Nadu",
    tag: "Tamil Nadu",
  },
  {
    text: "Happy to see the initial works starting here, wish to see a quick starting of the project and continuation of the good work already done by Zigma in other cities.",
    image: mrGagandeepSinghBediImg,
    name: "Gagandeep Singh Bedi, IAS",
    role: "Former Commissioner, Greater Chennai Corporation (GCC)",
    tag: "Tamil Nadu",
  },
  {
    text: "Carried out an inspection of the bio mining work being done at the Perungudi garbage dump in Chennai, Tamil Nadu. GOI stands committed under the Swachh Bharat Mission for remediation of legacy dumpsites of solid waste in urban cities.",
    image: mrManojJoshiImg,
    name: "Manoj Joshi, IAS",
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
    name: "Justice P Jyothimani",
    role: "Chairman, South Zone, Hon. National Green Tribunal",
    tag: "India",
  },
 
  {
    text: "Very impressive. Would love to see progress in few years' time here.",
    image: mrJusticeAdiImg,
    name: "Justice Adi",
    role: "Head, SWM Monitoring Committee, Hon. National Green Tribunal, Karnataka",
    tag: "India",
  },
  {
    text: "It is the only site where absolutely zero material is left behind on the cleared area.",
    image: mrsAlmitraHPatelImg,
    name: "Mrs. Almitra H Patel",
    role: "National Expert, Swachh Bharat Mission and Former Member, Supreme Court Committee for SWM",
    tag: "India",
  },
  {
    text: "The site visit was quite insightful. Happy to see good work of processing happening. Hope the work helps the environment.",
    image: shriArunMaheshBabuImg,
    name: "Shri Arun Mahesh Babu M.S., IAS",
    role: "Municipal Commissioner - Vadodara Municipal Corporation",
    tag: "Gujarat",
    // commentImage: arunMaheshBabuCommentsImg,
  },
  {
    text: "For nearly a decade, Zigma part of the Blue Planet Group and our sustainability partner, has played a crucial role in advancing the circular economy in our cement manufacturing. I commend them for facilitating the use of over two million tonnes of RDF.",
    image: mrAjayKapurImg,
    name: "Mr. Ajay Kapur",
    role: "CEO, Cement Business, Adani Group",
    tag: "India",
  },
  {
    text: "Take a tour of #Kumbakonm and learn about the bio-mining.",
    image: mrVenkaihNaiduImg,
    name: "Venkaih Naidu",
    role: "Former Minister for Urban Development, Govt. of India, Former Vice President of India.",
    tag: "India",
  },
    {
    text: "Had a great experience learning the hardships involved in waste clearance. Good luck & continue the great work.",
    image: msRAPriyangaImg,
    name: "Ms. R A Priyanga, IAS",
    role: "Former Assistant Collector, Dindigul District",
    tag: "Tamil Nadu",
  },
];

const VIDEO_COLORS = ["#10B981", "#34D399", "#059669", "#047857", "#0F766E"] as const;

type VideoSeed = {
  src: string;
  title: string;
  label: string;
  featured?: boolean;
};

const VIDEO_SEEDS: VideoSeed[] = [
  {
    src: "https://youtu.be/t-gGP3wHEmw",
    title: "Zigma Coverage",
    label: "Video Feature",
    featured: true,
  },
  {
    src: "https://youtu.be/OE-IB6rNaP0",
    title: "Zigma Coverage",
    label: "Video Feature",
  },
  {
    src: "https://youtu.be/bMfHysHGKoM",
    title: "Zigma Presentation in Malaysia",
    label: "Presentation",
  },
  {
    src: "https://youtu.be/C631gB_SMOY",
    title: "Speech by the Minister of Sustainability and Environment in Perungudi, Chennai",
    label: "Speech",
  },
  {
    src: "https://youtu.be/-BPYW6cfHAk",
    title: "Press Meet",
    label: "Press Meet",
  },
  // {
  //   src: "https://youtu.be/3J3p_MSsB0k",
  //   title: "Sun TV Erode on Vairapalayam Dump Site to Prevent Cauvery Pollution",
  //   label: "News Coverage",
  // },
  {
    src: "https://youtu.be/LMRHIdbetAE",
    title: "Erode MLA Visit",
    label: "Site Visit",
  },
  {
    src: "https://youtu.be/cbNVz0H8qaI",
    title: "Zigma and Anna University: Soil Transformation and Scientific Validation Initiative",
    label: "Anna University",
  },
];

const VIDEOS: Video[] = VIDEO_SEEDS.map((seed, index) => {
  const order = index + 1;
  const durationLabel = seed.src.includes("/shorts/")
    ? `Short ${String(order).padStart(2, "0")}`
    : `Clip ${String(order).padStart(2, "0")}`;

  return createYouTubeVideo(
    seed.src,
    seed.title,
    seed.title,
    seed.label,
    durationLabel,
    VIDEO_COLORS[index % VIDEO_COLORS.length],
    { featured: seed.featured }
  );
});

const DEFAULT_VIDEO: Video = VIDEOS.find((video) => video.featured) ?? VIDEOS[0];

const SITE_VISIT_ASSETS = import.meta.glob("../assets/Testimonials/Visits/*.{jpg,jpeg,jfif,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const SITE_VISIT_HEADLINES: Record<string, string> = {
  "#biomining#landfill_reclamation #landfill_mining #legacy_waste #We_Transform.webp":
    "Mr. Sandeep, Chief Engineer, and Ms. Meera, Deputy Chief Engineer, Local Self Government Department, Government of Kerala, along with Kollam Municipal Corporation officials, visited Zigma's Kureepuzha Biomining Facility in Kollam on 11 March 2023.",
  "Kollam Kureepuzha Biomining.webp":
    "Mr. Sandeep, Chief Engineer, and Ms. Meera, Deputy Chief Engineer, Local Self Government Department, Government of Kerala, along with Kollam Municipal Corporation officials, visited Zigma's Kureepuzha Biomining Facility in Kollam on 11 March 2023.",
  "2.jpg":
    "India-Bhutan Delegation Explores Zigma's Biomining Solutions\nA knowledge exchange on legacy waste remediation and sustainable waste management",
  "6.jpeg":
    "Ms. Amanda Kwek, First Secretary (Economics), High Commission of Singapore; Ms. Denise Tan, Regional Director, Enterprise Singapore; and Blue Planet leadership visited Zigma's Noida Biomining Facility.",
  "12.jpeg":
    "TTD Chairman and former DRDO Chairman visit Zigma's Tirumala project site to review sustainable waste management initiatives.",
  "13.jpeg":
    "Sri Lankan Delegation Visits Zigma Global's Perungudi Reclaimed Dumpsite to Observe Bio-Mining Best Practices",
  "17.jpg":
    "KfW and TNUIFSL delegation visit Zigma's Chennai facility for discussions on circular economy and sustainable waste management.",
  "Biomining Site in Kodungaiyur..webp":
    "The Additional Collector (Development), Project Director (DRDA), and Executive Engineers (RD) from all districts of Tamil Nadu visited the Kodungaiyur Biomining Site for an exposure visit on scientific legacy municipal solid waste management.",
  "Blue Planet’s Zigma was delighted to host distinguished representatives of GIZ from Germany at o.webp":
    "Representatives of GIZ Germany visited Blue Planet's Zigma Guwahati Biomining Facility, highlighting a shared commitment to sustainable waste management and environmental innovation.",
  "Chairman of Swacch Andhra Corporation Mr. Sr. Pattabhi at our.webp":
    "Mr. Sr. Pattabhi, Chairman of Swachh Andhra Corporation, visited Zigma's Vizag Dumpsite Mining Facility to review recovered material utilization and sustainable legacy waste management initiatives.",
  "Chairman of Vadodara Municipal Corporation Dr. Hitendra Patel.webp":
    "Dr. Hitendra Patel, Standing Committee Chairman, Vadodara Municipal Corporation, along with officials and representatives from Karamsad Nagar Palika and Vallabh Vidyanagar, visited Zigma's Makarpura Biomining Facility in Vadodara on 17 July 2021.",
  "CITIIS 2.0 Visit.webp":
    "NIUA and AFD delegation visit Zigma's Boragaon Bio-Mining Project Site under the CITIIS 2.0 initiative.",
  "Commissioner Visit.webp":
    "Greater Chennai Corporation Commissioner visits Zigma's Chennai bio-mining facility to review scientific landfill reclamation and sustainable waste management.",
  "Dr. G. S. Sameeran, IAS,.jpeg":
    "Dr. G. S. Sameeran, IAS, Commissioner, Greater Chennai Corporation, visited Zigma's Kodungaiyur Biomining Project on 21 May 2026 to review ongoing scientific legacy waste remediation activities.",
  "Dr. G. S. Sameeran, IAS, 2.webp":
    "Dr. G. S. Sameeran, IAS, Commissioner, Greater Chennai Corporation, visited Zigma's Perungudi Biomining Project on 22 May 2026 to review the project area and the proposed scientific approach for legacy waste remediation.",
  "Dr. M. C. Dathan, Scientific Advisor to Chief Minister of Kerala at our Kollam biomining (overview).webp":
    "Dr. M. C. Dathan, Scientific Advisor to the Chief Minister of Kerala, along with Kollam Municipal Corporation representatives, visited Zigma's Kollam Biomining Facility to review sustainable landfill waste reduction initiatives.",
  "Dr. M. C. Dathan, Scientific Advisor to Chief Minister of Kerala at our Kollam biomining (date).webp":
    "Dr. M. C. Dathan, Scientific Advisor to the Chief Minister of Kerala, along with Kollam Municipal Corporation representatives, visited Zigma's Kollam Biomining Facility on 30 December 2021.",
  "Dr. Manish S Narnaware IAS - Deputy Commissioner - Health - Greater Chennai Corporation.webp":
    "Dr. Manish S. Narnaware, IAS, Deputy Commissioner (Health), Greater Chennai Corporation, along with GCC officials, visited Zigma's Perungudi Biomining Facility on 31 July 2021.",
  "Dr. V. Jaya Chandra Bhanu Reddy, I.A.S.webp":
    "Dr. V. Jaya Chandra Bhanu Reddy, IAS, Additional Commissioner (Health), Greater Chennai Corporation, along with GCC dignitaries, visited Zigma's Kodungaiyur Biomining Site for a pre-analysis visit on 8 March 2024.",
  "Educational Visit.webp":
    "AIILSG Nagpur students and faculty visit Zigma's Bhandewadi Bio-Mining Facility to learn about legacy waste processing and sustainable waste management.",
  "Gurukul students visit.webp":
    "Sanskriti The Gurukul students visit Boragaon Landfill and Zigma Recycling Plant to learn about sustainable waste management.",
  "Grace Fu Minister for Envt , Singapore . PDG.jpeg":
    "Ms. Grace Fu, Minister for Sustainability and the Environment, Singapore, visited Zigma's Perungudi Biomining Facility in Chennai.",
  "IAS Trainee Visit.webp":
    "LBSNAA trainee IAS officers visit Zigma's Makarpura biomining site to learn about sustainable waste management and environmental restoration.",
  "Leadership Visit.webp":
    "Swachha Andhra Corporation Chairman and Anantapur MLA Visit Zigma's Anantapuram Biomining Facility",
  "Legislative Visit.webp":
    "Tamil Nadu Congress President and senior officials visit Zigma's Kodungaiyur dumpsite mining facility.",
  "Minister Thiru S. Muthusamy.jpg":
    "Honorable Minister Thiru S. Muthusamy, Honorable Minister Thiru Siva V. Meyyanathan, Honorable MP Thiru A. Ganeshamurthi, Honorable MLA Thiru A.G. Venkatachalam, Honorable Collector Thiru H. Krishnanunni IAS, Honorable Thiru A.V. Venkatachalam IFS, and Honorable Commissioner Dr. M. Elangovan visited Zigma's Erode biomining facility.",
  "MoHUA Visit.jpg":
    "MoHUA Secretary and senior officials visit Zigma's Tirupati biomining facility to review sustainable legacy waste remediation.",
  "Ministerial Visit.webp":
    "Andhra Pradesh Urban Development Minister visits Zigma's Tirupati Bio-Mining Facility to review sustainable urban transformation.",
  "Mr. Alex Ellis,.webp":
    "Zigma showcased its biomining process and milestone achievements at the British Deputy High Commission's Climate Expo 2023 in Chennai, attended by Mr. Alex Ellis, Ms. Supriya Sahu and the Prince of Arcot on 9 March 2023.",
  "Mr. Anbil Mahesh Poyyamozhi, Minister for School Education- Govt. of Tamilnadu at our Tiruchirapalli.jpg":
    "Mr. Anbil Mahesh Poyyamozhi, Minister for School Education, Government of Tamil Nadu, along with Tiruchirappalli Municipal Corporation dignitaries, visited Zigma's Tiruchirappalli Biomining Facility on 20 May 2021.",
  "Mr. Arun Mehta - MD & CEO, SBI Capital and Mr. Manav Bansal-CEO, Neev Fund at our NOIDA Bio-mining.webp":
    "Mr. Arun Mehta, MD & CEO, SBI Capital, and Mr. Manav Bansal, CEO, Neev Fund, visited Zigma's Noida Biomining Facility on 26 August 2021.",
  "Mr. Francis Chong - Senior Director; Ms. Magdalene Loh - Director; Ms. Uma Muniandy - Deputy Director, Ministry of Trade and Industry, Singapore at our NOIDA Landfill Mining.jpeg":
    "Mr. Francis Chong, Senior Director; Ms. Magdalene Loh, Director; and Ms. Uma Muniandy, Deputy Director, Ministry of Trade and Industry, Singapore, visited Zigma's Noida Landfill Mining Facility.",
  "Mr. Gagandeep Singh Bedi IAS, Commissioner.webp":
    "Mr. Mahesh Mahajan, Chairman, Special Committee on Medical Services and Health, Nagpur Municipal Corporation, along with other officials, visited Zigma's Bhandewadi Biomining Facility in Nagpur on 20 May 2021.",
  "Mr. K. N. Nehru, Minister for Municipal Administration, Urban and Water Supply, Govt. of Tamilnadu and other officials at our Ariyamangalam Biomining facility in Trichy.webp":
    "Mr. K. N. Nehru, Minister for Municipal Administration, Urban and Water Supply, Government of Tamil Nadu, along with officials, visited Zigma's Ariyamangalam Biomining Facility in Tiruchirappalli to review scientific legacy waste segregation operations.",
  "Mr. Karti Chidambaram, Member of Parliament - Sivagangai DT, and Mr. S. Mangudi, Member of Legislative Assembly- Karaikudi.webp":
    "Mr. Karti Chidambaram, Member of Parliament for Sivaganga, and Mr. S. Mangudi, Member of the Legislative Assembly for Karaikudi, visited Zigma's Karaikudi Biomining Facility.",
  "Mr. Krishnan Unni I.A.S - Collector - Erode district.webp":
    "Mr. Krishnan Unni, IAS, District Collector, Erode, along with Erode City Municipal Corporation officials, visited Zigma's Vendipalayam Biomining Facility in Erode.",
  "Mr. Mahesh Mahajan- Chairman- Special Committee on Medical Services and Health- Nagpur Municipal Corporation.webp":
    "Mr. Mahesh Mahajan, Chairman, Special Committee on Medical Services and Health, Nagpur Municipal Corporation, along with other officials, visited Zigma's Bhandewadi Biomining Facility in Nagpur on 20 May 2021.",
  "Mr. P. Ponnaiah IAS - Commissioner.webp":
    "Mr. P. Ponnaiah, IAS, Commissioner, Directorate of Municipal Administration, Government of Tamil Nadu, along with officials, visited Zigma's Ariyamangalam Biomining Facility in Tiruchirappalli on 11 July 2021.",
  "Mr. P Jagadishwasr Reddy, SE, Mr. M Chandramouli Reddy, Deputy EE, Mr. Sunil Kumar, Additional Health Officer from Tirumala Tirupati Desvasthanams.webp":
    "Mr. P. Jagadishwar Reddy, SE; Mr. M. Chandramouli Reddy, Deputy EE; and Mr. Sunil Kumar, Additional Health Officer, Tirumala Tirupati Devasthanams, visited Zigma's Vendipalayam Biomining Facility on 26 September 2021.",
  "Mr. Renju R Pillai - Senior Technical Consultant and Mr. Jyothish Chandran G - Director (SWM) from Suchitwa Mission, Kerala Local Self Government Department at our Kollam.webp":
    "Mr. Renju R. Pillai, Senior Technical Consultant, and Mr. Jyothish Chandran G., Director (SWM), Suchitwa Mission, Kerala Local Self Government Department, along with Kollam Municipal Corporation representatives, visited Zigma's Kollam Biomining Facility.",
  "Ms. Shalini Agarwal IAS - Commissioner.webp":
    "Ms. Shalini Agarwal, IAS, Commissioner, Vadodara Municipal Corporation, along with VMC officials, visited Zigma's Makarpura Biomining Facility in Vadodara on 5 July 2021.",
  "nellore2.jpg":
    "Nellore Municipal Commissioner Visits Zigma Blue Planet to Explore Waste Management Best Practices",
  "Workshop Site Visit.webp":
    "IIT Guwahati workshop participants visit Boragaon dumpsite to experience Zigma's biomining operations in action.",
  "Sri Lanka Study Visit.jpeg":
    "Colombo Municipal Corporation and Sri Lanka officials visit Zigma's reclaimed Perungudi dumpsite in Chennai.",
  "Simi Karan I Swachh Bharat Mission.webp":
    "SBM-U Assam State Mission Director Visits Zigma's Guwahati Facility\nExploring biomining solutions for sustainable urban waste management - Simi Karan, Swachh Bharat Mission",
  "Swachh Andhra Corporation, and Mr. Ketan Garg, IAS, Commissioner – GVMC.webp":
    "Swachh Andhra Corporation and GVMC Leadership Visit Zigma's Visakhapatnam Facility\nA collaborative step towards scientific biomining and legacy waste remediation",
  "Sustainable Initiatives at Tirumala!TTD Chairman Sri B.R. Naidu.jpg":
    "TTD Chairman Sri B.R. Naidu visited Zigma Plant and the Kakulamanu Dibba dumping yard in Tirumala to review sustainable waste management and recycling initiatives.",
  "Shri C. M. Saikanth Varma, IAS, Commissioner,.webp":
    "Shri C. M. Saikanth Varma, IAS, Commissioner, Greater Visakhapatnam Municipal Corporation, along with GVMC officials, visited Zigma's Kapulappada Biomining Facility in Visakhapatnam.",
  "Shri Jayanta Malla Baruah, Hon’ble Minister for Urban Development, Government of Assam, visited Zigma’s Guwahati Biomining.jpeg":
    "Shri Jayanta Malla Baruah, Hon'ble Minister for Urban Development, Government of Assam, visited Zigma's Guwahati Biomining Facility to review sustainable legacy waste management and resource recovery practices.",
  "Shri Manoj Joshi, IAS, Secretary,.jpeg":
    "Shri Manoj Joshi, IAS, Secretary, Ministry of Housing and Urban Affairs (MoHUA), along with senior officials from the Government of Assam and Guwahati Municipal Corporation, visited Zigma's Boragaon Biomining Facility in Guwahati to review ongoing biomining operations.",
  "Shri Ashwini Kumar Tewari, Managing Director - SBI.webp":
    "Mr. Ashwini Kumar Tewari, Managing Director of the State Bank of India, visited Zigma's Noida Biomining Facility to gain insights into sustainable legacy waste management and resource recovery practices.",
  "Shiv Das Meena - IAS - Additional Chief Secretary to Government, Municipal Administration.jpg":
    "Thiru Shiv Das Meena, IAS, Additional Chief Secretary, Municipal Administration and Water Supply Department, Government of Tamil Nadu, and Thiru P. Ponniah, IAS, Director of Municipal Administration, along with Tiruchirappalli Municipal Corporation officials, visited Zigma's Tiruchirappalli Biomining Facility on 12 January 2022.",
  "Shiv Das Meena - IAS - Secretary to Government, Municipal Administration & Water Supply, Government of Tamil Nadu and Thiru..webp":
    "Thiru Shiv Das Meena, IAS, Secretary to Government, Municipal Administration and Water Supply Department, and Thiru Gagandeep Singh Bedi, IAS, Commissioner, Greater Chennai Corporation, along with GCC officials, visited Zigma's Perungudi Biomining Facility on 25 January 2022.",
  "Smt. Roopa Mishra, IAS, Joint Secretary, Ministry of Housing.jpeg":
    "Smt. Roopa Mishra, IAS, Joint Secretary, Ministry of Housing and Urban Affairs (MoHUA), Government of India, and National Mission Director, Swachh Bharat Mission-Urban (SBM-U), visited Zigma's Perungudi Biomining Facility in Chennai.",
  "Tamsyn Barton, Chief Commissioner of the United Kingdom’s.webp":
    "Tamsyn Barton, Chief Commissioner of the United Kingdom's Independent Commission for Aid Impact, visited Zigma's Perungudi Biomining Facility in Chennai on 9 February 2024.",
  "𝑪𝒉𝒆𝒏𝒏𝒂𝒊 𝒕𝒂𝒌𝒆𝒔 𝒂 𝒈𝒊𝒂𝒏𝒕 𝒍𝒆𝒂𝒑 𝒕𝒐𝒘𝒂𝒓𝒅𝒔 𝒔𝒖𝒔𝒕𝒂𝒊𝒏𝒂𝒃𝒍𝒆 𝒘𝒂𝒔𝒕e.webp":
    "Thiru K.N. Nehru, Tmt R. Priya and Thiru M. Mahesh Kumar visited Zigma's Kodungaiyur Biomining Facility, highlighting Chennai's commitment to scientific legacy waste remediation and sustainable land reclamation.",
  "Honored to host a team of 65 representatives from the Greater Hyderabad Municipal Corporation, l.webp":
    "A team of 65 representatives from the Greater Hyderabad Municipal Corporation, led by Deputy Mayor Mothe Srilatha Reddy, visited Zigma's Guwahati dumpsite mining plant to review operations and sustainable waste management practices.",
  "IIT Madras, IIT Guwahati, IISc Bangalore, IIT BHU, and Saahas NGO.webp":
    "Academic and Industry Experts Visit Zigma's Kodungaiyur Biomining Site. A technical exchange on scientific biomining, resource recovery, and legacy waste remediation",
};

SITE_VISIT_HEADLINES[
  "Dr. M. C. Dathan, Scientific Advisor to Chief Minister of Kerala at our Kollam biomining.webp"
] =
  "Dr. M. C. Dathan, Scientific Advisor to the Chief Minister of Kerala, along with representatives from Kollam Municipal Corporation, visited Zigma's Kollam Biomining Facility to review sustainable legacy waste management practices.";

const formatSiteVisitAlt = (assetPath: string): string => {
  const fileName = assetPath.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "visit";

  if (/^\d+$/.test(fileName)) {
    return `Site visit ${fileName}`;
  }

  return `Site visit ${fileName.replace(/[_-]+/g, " ").trim()}`;
};

const getSiteVisitTagline = (headline?: string): string | null => {
  if (!headline) return null;

  const [firstLine] = headline
    .split("\n")
    .map((part) => part.trim())
    .filter(Boolean);

  if (!firstLine) return null;

  return firstLine;
};

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  className,
}) => (
  <>
    <Reveal className={cn("inline-flex items-center gap-2", className)}>
      <span className={SECTION_EYEBROW_CLASS}>{eyebrow}</span>
    </Reveal>
    <Reveal className="mt-3">
      <h2 className={SECTION_TITLE_CLASS}>{title}</h2>
    </Reveal>
    <Reveal
      className="mt-3"
      data-anim-duration="0.6"
      data-anim-ease="power1.out"
    >
      <p className={SECTION_SUBTITLE_CLASS}>{description}</p>
    </Reveal>
  </>
);

interface SiteVisitCardProps {
  image: SiteVisitImage;
}

const SiteVisitCard: FC<SiteVisitCardProps> = ({ image }) => {
  const tagline = getSiteVisitTagline(image.headline);

  return (
    <article className="group flex flex-col overflow-hidden border border-border/70 bg-white text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
          loading="lazy"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/22 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary/80" />
      </div>
      {tagline ? (
        <div className="flex min-h-[104px] flex-none items-center justify-center bg-gradient-to-b from-white to-muted/20 px-5 py-4 transition-all duration-300 group-hover:min-h-[142px] group-focus-within:min-h-[142px]">
          <p
            className="line-clamp-2 max-w-[28rem] text-center text-sm font-normal leading-relaxed text-foreground transition-all duration-300 group-hover:line-clamp-none group-focus-within:line-clamp-none md:text-[15px]"
            title={tagline}
          >
            {tagline}
          </p>
        </div>
      ) : null}
    </article>
  );
};

interface VisitorsSliderProps {
  images: SiteVisitImage[];
}

const VISITORS_SLIDER_DELAY = 5000;

const VisitorsSlider: FC<VisitorsSliderProps> = ({ images }) => {
  const [api, setApi] = useState<CarouselApi>();
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  const clearAutoSlide = useCallback((): void => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }, []);

  const restartAutoSlide = useCallback((): void => {
    clearAutoSlide();

    if (!api || images.length <= 1 || isHoveredRef.current) return;

    autoSlideRef.current = setInterval(() => {
      api.scrollNext();
    }, VISITORS_SLIDER_DELAY);
  }, [api, clearAutoSlide, images.length]);

  useEffect(() => {
    if (!api) return;

    restartAutoSlide();

    return () => {
      clearAutoSlide();
    };
  }, [api, clearAutoSlide, restartAutoSlide]);

  useEffect(() => clearAutoSlide, [clearAutoSlide]);

  const handleManualAction = useCallback(
    (action: () => void): void => {
      clearAutoSlide();
      action();
      restartAutoSlide();
    },
    [clearAutoSlide, restartAutoSlide]
  );

  const handleMouseEnter = (): void => {
    isHoveredRef.current = true;
    clearAutoSlide();
  };

  const handleMouseLeave = (): void => {
    isHoveredRef.current = false;
    restartAutoSlide();
  };

  const totalSlides = api?.scrollSnapList().length ?? images.length;

  return (
    <div
      className="mx-auto max-w-7xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true, slidesToScroll: 1, duration: 45 }}
        className="w-full"
      >
        <CarouselContent className="-ml-5 py-2 md:-ml-7">
          {images.map((image) => (
            <CarouselItem
              key={image.src}
              className="basis-full pl-5 md:basis-1/2 md:pl-7 lg:basis-1/3"
            >
              <SiteVisitCard image={image} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {totalSlides > 1 ? (
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => handleManualAction(() => api?.scrollPrev())}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/25 bg-white text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              aria-label="Previous visitor slide"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => handleManualAction(() => api?.scrollNext())}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/25 bg-white text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              aria-label="Next visitor slide"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const SITE_VISIT_IMAGES: SiteVisitImage[] = Object.entries(SITE_VISIT_ASSETS)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
  .map(([assetPath, src]) => {
    const fileName = assetPath.split("/").pop() ?? "";

    return {
      src,
      alt: formatSiteVisitAlt(assetPath),
      headline: SITE_VISIT_HEADLINES[fileName],
    };
  })
  .concat({
    src: nelloreCommissionerVisitImg,
    alt: "Nellore Municipal Commissioner visit",
    headline:
      "Nellore Municipal Commissioner visits Zigma to study advanced waste processing and circular economy solutions.",
  })
  .concat({
    src: kodungaiyurTeamsVisitImg,
    alt: "KFW TNUIFSL and Anna University teams visit",
    headline:
      "KFW, TNUIFSL, and Anna University teams visit Zigma's Kodungaiyur dumpsite mining facility.",
  })
  .sort((a, b) => Number(Boolean(b.headline)) - Number(Boolean(a.headline)));

/*
const SITE_VISIT_IMAGES_LEGACY: SiteVisitImage[] = [
  {
    src: new URL("../assets/Testimonials/Visits/2.jpg", import.meta.url).href,
    alt: "Site visit 2",
    headline:
      "Suchitwa Mission and KSWMP Team Visit Zigma Project Site\nA review of integrated biomining operations and sustainable legacy waste remediation",
  },
  {
    src: new URL("../assets/Testimonials/Visits/3.jpeg", import.meta.url).href,
    alt: "Site visit 3",
  },
  {
    src: new URL("../assets/Testimonials/Visits/4.jpeg", import.meta.url).href,
    alt: "Site visit 4",
  },
  {
    src: new URL("../assets/Testimonials/Visits/5.jpeg", import.meta.url).href,
    alt: "Site visit 5",
  },
  {
    src: new URL("../assets/Testimonials/Visits/6.jpeg", import.meta.url).href,
    alt: "Site visit 6",
  },
  {
    src: new URL("../assets/Testimonials/Visits/7.jpeg", import.meta.url).href,
    alt: "Site visit 7",
  },
  {
    src: new URL("../assets/Testimonials/Visits/8.jpeg", import.meta.url).href,
    alt: "Site visit 8",
  },
  {
    src: new URL("../assets/Testimonials/Visits/9.jpeg", import.meta.url).href,
    alt: "Site visit 9",
  },
  {
    src: new URL("../assets/Testimonials/Visits/10.jpeg", import.meta.url).href,
    alt: "Site visit 10",
  },
  {
    src: new URL("../assets/Testimonials/Visits/11.jpeg", import.meta.url).href,
    alt: "Site visit 11",
  },
  {
    src: new URL("../assets/Testimonials/Visits/12.jpeg", import.meta.url).href,
    alt: "Site visit 12",
  },
  {
    src: new URL("../assets/Testimonials/Visits/13.jpeg", import.meta.url).href,
    alt: "Site visit 13",
    headline:
      "Sri Lankan Delegation Visits Zigma Global’s Perungudi Reclaimed Dumpsite to Observe Bio-Mining Best Practices",
  },
  {
    src: new URL("../assets/Testimonials/Visits/14.jpeg", import.meta.url).href,
    alt: "Site visit 14",
  },
  {
    src: new URL("../assets/Testimonials/Visits/15.jpeg", import.meta.url).href,
    alt: "Site visit 15",
  },
  {
    src: new URL("../assets/Testimonials/Visits/16.jpeg", import.meta.url).href,
    alt: "Site visit 16",
  },
  {
    src: new URL("../assets/Testimonials/Visits/17.jpg", import.meta.url).href,
    alt: "Site visit 17",
    headline:
      "KFW and TNUIFSL Delegation Visits Zigma Global to Explore Circular Economy Solutions",
  },
  {
    src: new URL("../assets/Testimonials/Visits/nellore2.jpg", import.meta.url).href,
    alt: "Site visit Nellore",
    headline:
      "Nellore Municipal Commissioner Visits Zigma Blue Planet to Explore Waste Management Best Practices",
  },
];
*/

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

// Social proof wall data (currently hidden/disabled on the page)
// const WALL_CARDS: WallCard[] = [
//   {
//     initials: "MD",
//     gradient: "linear-gradient(135deg,#10B981,#34D399)",
//     name: "MoUD",
//     handle: "@Moud_India",
//     platform: "linkedin",
//     text: `Take a tour of #Kumbakonam dumpyard and learn about the biomining process. #MyCleanIndia.`,
//     likes: "2.1k",
//     time: "3 days ago",
//     image: socialImg1,
//   },
//   {
//     initials: "NF",
//     gradient: "linear-gradient(135deg,#059669,#10B981)",
//     name: "Neev Fund",
//     handle: "@NeevFund",
//     platform: "linkedin",
//     text: `Blue Planet Environmental Solutions and partners Zigma Global Environ Solutions Pvt. Ltd. are addressing urban waste by clearing a legacy dumpsite and freeing up land for Chidambaram Municipality.`,
//     likes: "1.8k",
//     time: "5 days ago",
//     image: socialImg2,
//   },
//   {
//     initials: "NF",
//     gradient: "linear-gradient(135deg,#047857,#10B981)",
//     name: "Neev Fund",
//     handle: "@NeevFund",
//     platform: "linkedin",
//     text: `Our portfolio company Blue Planet Environmental Solutions' efforts in waste management and biomining have paid off, helping transform degraded sites into greener, more sustainable spaces.`,
//     likes: "1.2k",
//     time: "1 week ago",
//     image: socialImg3,
//   },
//   {
//     initials: "NF",
//     gradient: "linear-gradient(135deg,#065F46,#059669)",
//     name: "Neev Fund",
//     handle: "@NeevFund",
//     platform: "linkedin",
//     text: `Rapid urbanization has intensified city waste challenges. This highlights Blue Planet Environmental Solutions and Zigma leaders discussing practical technologies to tackle the problem.`,
//     likes: "986",
//     time: "9 days ago",
//     image: socialImg4,
//   },
// ];
//
// const EXTRA_CARDS: WallCard[] = [
//   {
//     initials: "BP",
//     gradient: "linear-gradient(135deg,#10B981,#6EE7B7)",
//     name: "Blue Planet Environmental Solutions",
//     handle: "@BluePlanet_Env",
//     platform: "linkedin",
//     text: `This contribution by our associate company @zigmaglobal1 is commendable. We are working with partners to support communities with essential resources.`,
//     likes: "1.1k",
//     time: "2 weeks ago",
//     image: socialImg5,
//   },
//   {
//     initials: "BP",
//     gradient: "linear-gradient(135deg,#059669,#34D399)",
//     name: "Blue Planet Environmental Solutions",
//     handle: "@BluePlanet_Env",
//     platform: "linkedin",
//     text: `Our partner @zigmaglobal1 has leveraged eco-friendly landfill-mining techniques to reclaim over 12 acres under the Kumbakonam Dumpyard Reclamation Project.`,
//     likes: "1.4k",
//     time: "2 weeks ago",
//     image: socialImg6,
//   },
//   {
//     initials: "BP",
//     gradient: "linear-gradient(135deg,#047857,#34D399)",
//     name: "Blue Planet Environmental Solutions",
//     handle: "@BluePlanet_Env",
//     platform: "linkedin",
//     text: `We continue driving circular-economy outcomes with partners like @NeevFund through the #SustainabilityShowcase and broader sustainability efforts.`,
//     likes: "1.6k",
//     time: "3 weeks ago",
//     image: socialImg7,
//   },
//   {
//     initials: "BP",
//     gradient: "linear-gradient(135deg,#10B981,#059669)",
//     name: "Blue Planet Environmental Solutions",
//     handle: "@BluePlanet_Env",
//     platform: "linkedin",
//     text: `Converting landfills into clean, productive stretches of land may seem far-fetched, but together with Zigma Global Environ Solutions we have been doing exactly that.`,
//     likes: "2.4k",
//     time: "1 month ago",
//     image: socialImg8,
//   },
// ];

/* Icons */
const StatIcons: Record<StatIconType, IconComponent> = {
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

// Social proof wall UI (currently hidden/disabled on the page)
// interface WallCardProps {
//   card: WallCard;
//   delay?: number;
// }
//
// const WallCardItem: FC<WallCardProps> = ({ card, delay = 0 }) => (
//   <Reveal
//     className="break-inside-avoid"
//     style={{
//       display: "inline-block",
//       width: "100%",
//       marginBottom: 20,
//     }}
//   >
//     <article
//       className={cn(
//         "group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl",
//         card.tall && "motion-safe:hover:shadow-lg"
//       )}
//     >
//       {card.image && (
//         <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
//           <img
//             src={card.image}
//             alt={card.name}
//             className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
//           />
//         </div>
//       )}
//
//       <div className="flex flex-1 flex-col p-5">
//         <div className="mb-3 text-left">
//           <strong className="block text-sm font-bold text-foreground">
//             {card.name}
//           </strong>
//           <span className="block text-xs text-muted-foreground">
//             {card.handle.replace(/\s*-\s*LinkedIn\s*$/i, "")}
//           </span>
//         </div>
//         <p
//           className="text-left text-sm leading-relaxed text-muted-foreground"
//           dangerouslySetInnerHTML={{ __html: card.text }}
//         />
//       </div>
//     </article>
//   </Reveal>
// );

/* Main Component */
const TESTIMONIAL_SLIDE_DELAY = 5000;
const TESTIMONIAL_RESUME_DELAY = 350;

const Testimonials: FC = () => {
  /* Slider state */
  const [current, setCurrent] = useState<number>(0);
  const [videoCascadeIndex, setVideoCascadeIndex] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  /* Comment image modal state */
  const [commentImageOpen, setCommentImageOpen] = useState<boolean>(false);
  const [selectedCommentImage, setSelectedCommentImage] = useState<string>("");

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length);
  }, []);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      TESTIMONIAL_SLIDE_DELAY
    );
  }, []);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resumeAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      TESTIMONIAL_SLIDE_DELAY
    );
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const handlePrev = (): void => {
    stopAuto();
    goTo(current - 1);
    setTimeout(() => resumeAuto(), TESTIMONIAL_RESUME_DELAY);
  };
  const handleNext = (): void => {
    stopAuto();
    goTo(current + 1);
    setTimeout(() => resumeAuto(), TESTIMONIAL_RESUME_DELAY);
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
      if (diff > 0) goTo(current + 1);
      else goTo(current - 1);
      setTimeout(() => resumeAuto(), TESTIMONIAL_RESUME_DELAY);
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

  // Social proof wall (currently hidden/disabled on the page)
  // const [wallCards, setWallCards] = useState<WallCard[]>(WALL_CARDS);
  // const [loadState, setLoadState] = useState<LoadState>("idle");
  //
  // const handleLoadMore = (): void => {
  //   if (loadState !== "idle") return;
  //   setLoadState("loading");
  //   setTimeout(() => {
  //     setWallCards((c) => [...c, ...EXTRA_CARDS]);
  //     setLoadState("done");
  //   }, 900);
  // };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="scroll-pt-24">
        <section
          data-no-animate
          className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28"
        >
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <Reveal className="mx-auto max-w-3xl">
              <div className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
                Testimonials
              </div>
              <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-6xl">
                Voices That Validate Our Impact
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
                Hear directly from global leaders, public officials, and partners
                who have witnessed our waste-to-value transformation.
              </p>
            </Reveal>
          </div>
        </section>
        {/* FEATURED TESTIMONIALS  */}
        <section className="section-padding">
          <div className="container-main text-center">
          <SectionHeader
            eyebrow="Featured Testimonials"
            title={
              <>
                What Our <span className="text-primary">Clients Say</span>
              </>
            }
            description="Real experiences from industry leaders driving sustainable change"
          />

          <div
            className="relative mt-6 overflow-hidden rounded-2xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {SLIDES.map((s: Slide, i: number) => (
              <div
                key={i}
                aria-hidden={i !== current}
                className={cn(
                  "transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                  i === current
                    ? "relative z-20 translate-x-0 scale-100 opacity-100"
                    : "pointer-events-none absolute inset-0 z-10 translate-x-12 scale-[0.985] opacity-0"
                )}
              >
                <div 
                  className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-lg sm:p-8 md:min-h-[460px] md:p-12"
                  onMouseEnter={stopAuto}
                  onMouseLeave={resumeAuto}
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/70" />
                  <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-3xl" />
                  
                  {/* Comment Icon Button */}
                  {s.commentImage && (
                    <button
                      onClick={() => {
                        setSelectedCommentImage(s.commentImage!);
                        setCommentImageOpen(true);
                      }}
                      className="absolute right-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white hover:scale-110 shadow-md"
                      aria-label="View comment image"
                      title="View original comment image"
                    >
                      <Image size={22} />
                    </button>
                  )}

                  <div className="relative z-10 grid h-full items-center justify-items-center gap-6 md:grid-cols-[360px_1fr] md:gap-10">
                    <div className="mx-auto w-full max-w-[300px] sm:max-w-[340px]">
                      <div className="relative aspect-[4/5] overflow-hidden border border-emerald-200/80 bg-emerald-50 shadow-md">
                        <img
                          src={s.image}
                          alt={s.name}
                          className="h-full w-full object-cover object-top"
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
                        <p className="pl-3 pr-4 text-left text-base italic leading-relaxed text-muted-foreground sm:pl-4 sm:pr-12 sm:text-lg md:pl-6 md:text-xl">
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
                          <span className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                            {s.role}
                          </span>
                          <div className="mt-1 text-lg tracking-wider text-amber-400">
                            {"\u2605\u2605\u2605\u2605\u2605"}
                          </div>
                          {/* <div className="mt-2 w-fit   pl-1  text-sm font-semibold text-primary">
                            {s.tag}
                          </div> */}
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
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110 sm:h-12 sm:w-12"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>

              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-110 sm:h-12 sm:w-12"
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
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full " />
          <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-400/20 to-transparent blur-3xl" />
          <div className="container-main py-14 text-center md:py-16">
          <SectionHeader
            eyebrow="Video Stories"
            title={
              <>
                Hear It From <span className="text-primary">Them</span>
              </>
            }
            description="Watch real interviews with our partners and clients"
          />

          <Reveal className="mt-8">
            <VideosCascadeSlider
              slides={VIDEOS.map((video, index) => ({
                id: `video-${index}`,
                title: video.title,
                label: video.label,
                poster: video.poster,
                src: video.src,
              }))}
              currentIndex={videoCascadeIndex}
              onIndexChange={setVideoCascadeIndex}
              onPlayVideo={(video) => {
                const matchingVideo = VIDEOS.find(v => v.src === video.src);
                if (matchingVideo) {
                  openVideoModal(matchingVideo);
                }
              }}
            />
          </Reveal>
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

        {/* Comment Image Modal */}
        {commentImageOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setCommentImageOpen(false)}
          >
            <div
              className="relative w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setCommentImageOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <div className="max-h-[85vh] overflow-auto">
                <img
                  src={selectedCommentImage}
                  alt="Original comment"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* SITE VISITS GALLERY */}
        <section className="section-padding overflow-hidden">
          <div className="container-main text-center">
            <SectionHeader
              eyebrow="Site Visits"
              title={
                <>
                  Witnessing Change <span className="text-primary">On the Ground</span>
                </>
              }
              description="Leaders and officials visiting our sites to see the transformation firsthand"
            />
            <Reveal className="mt-10">
              <VisitorsSlider images={SITE_VISIT_IMAGES} />
            </Reveal>
          </div>
        </section>

        {/* -------- SOCIAL PROOF WALL -------- */}
        {/* <section className="section-padding">
          <div className="container-main text-center">
          <SectionHeader
            eyebrow="Social Proof"
            title={
              <>
                The Conversation <span className="text-primary">Around Us</span>
              </>
            }
            description="Real-time voices from LinkedIn, Twitter & industry forums"
          />


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
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;






