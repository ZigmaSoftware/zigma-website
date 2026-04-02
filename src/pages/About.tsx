import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/animation/Reveal';
import bg1 from '@/assets/background-1.png';
import hero from '@/assets/website/hero/about-hero.jpg';
import globeSvg from '@/assets/contact_globe.svg';

import img1 from '@/assets/website/Kumbakonam.png';
import img2 from '@/assets/website/Forcebel.png';
import img3 from '@/assets/Forcebel awd.jpg';
import img4 from '@/assets/before after projects/chidambaram after.png';
import img5 from '@/assets/before after projects/SEMBAKKAM LAKE  after.png';
import img6 from '@/assets/before after projects/karaikudi after.png';
import img7 from '@/assets/before after projects/VIJAYAWADA-AJITSINGH NAGAR after.png';
import img8 from '@/assets/website/noida present.png';
import img9 from '@/assets/website/image ewd.png';
import img10 from '@/assets/website/hero/controll room.png';
import img11 from '@/assets/Awards/award12_Swachha Andhra.png';

import picture1 from '@/assets/Leaders/Boopathy Dharmaraj.jpeg';
import picture2 from '@/assets/Leaders/K P Mutharasu.jpeg';
import picture3 from '@/assets/Leaders/ANAND THANGARAJ.png';
import picture4 from '@/assets/Leaders/KTI.png';
import picture5 from '@/assets/Leaders/NAGESH PRABHU.jpeg';
import picture6 from '@/assets/Leaders/Aghoramoorthy Rajasekaran.png';
import picture7 from '@/assets/Leaders/Sridhar Jagannathan.jpeg';
import picture10 from '@/assets/Leaders/Prashant Singh.jpeg';
import picture11 from '@/assets/Leaders/Shankar Raman.png';
import picture13 from '@/assets/Leaders/Varun Boralkar.png';
import picture14 from '@/assets/Leaders/Maran.png';
import picture15 from '@/assets/Leaders/Senthil Annamalai.jpeg';
import picture16 from '@/assets/Leaders/Vijayan.png';
import picture17 from '@/assets/Leaders/Mohan kumar.png';
import picture18 from '@/assets/Leaders/Shivashankar Pandian.jpeg';

import milestone2016 from '@/assets/Awards/award7.jpg';
import milestone2017 from '@/assets/milestone/Chandrababu naidu handing over Vijayawada order.jpeg';
import milestone2018 from '@/assets/milestone/Nitin gadkari foundation laying for nagpur.jpeg';
import milestone2020 from '@/assets/milestone/blueplanet investing in Zigma.jpg';
import milestone2021 from '@/assets/milestone/Perungudi plant inauguration.png';
import milestone2022 from '@/assets/milestone/GUWAHATI BEFORE.jpg';
import milestone2023 from '@/assets/milestone/KDG inauguration picture.jpg';
import milestone2024 from '@/assets/milestone/AVPN event.jpg';
import milestone2026 from '@/assets/milestone/KSWMP awarding Kozhikode project.jpeg';


gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const INITIAL_INDEX = 0;
const SLOW_EASE = 'power2.out';
const INPUT_CLASS =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700';
const NAV_BUTTON_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-300 transition-all hover:border-green-700 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-300 disabled:hover:text-slate-900 lg:h-10 lg:w-10';
const ABOUT_VIDEO_EMBED_URL =
  'https://www.youtube.com/embed/0zmdFARwHsA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=0zmdFARwHsA&rel=0&modestbranding=1&playsinline=1&vq=hd1080';

interface Milestone {
  year: number;
  title: string;
  description: string[];
  image: string;
}

type Leader = {
  group: 'Promoters and CoFounders' | 'Management Team';
  name: string;
  designation?: string;
  image?: string;
  linkedin?: string;
};

const milestones: Milestone[] = [
  {
    year: 2015,
    title: 'The Foundation',
    description: [
      'March: Zigma Global Environ Solutions Pvt. Ltd. was founded.',
      "May: Awarded the Kumbakonam biomining project for 1.3 lakh m³, India's first ever integrated landfill mining project executed on zero residue methodology.",
      'July: Invited by the Ministry of Urban Development (Govt. of India) to present in workshops for first Swachh Survekshan 2017 for Bio-mining across 500 cities in India.',
    ],
    image: img1,
  },
  {
    year: 2016,
    title: 'Early Expansion',
    description: [
      'April: Reclaimed more than 4 acres of land in Kumbakonam.',
      'June: Secured orders from 20 municipalities in Tamil Nadu for MSW plants and machinery.',
      'July: Received the prestigious Frost & Sullivan 2016 Award.',
      'December: Reclaimed an additional 6+ acres in Kumbakonam.',
    ],
    image: milestone2016,
  },
  {
    year: 2017,
    title: 'Strategic Partnerships',
    description: [
      "May: Formed a joint venture with Forcebel, establishing Zigma as Asia's largest landfill mining company.",
      'July: Awarded biomining projects in Sembakkam and Pammal (Chennai).',
      'August: Awarded biomining project in Vijayawada.',
      'October: Awarded biomining project in Vadodara.',
    ],
    image: milestone2017,
  },
  {
    year: 2018,
    title: 'National Footprint',
    description: [
      'April - July: Awarded major biomining projects across India, including Chidambaram, Poonamallee (Chennai), NOIDA, and Nagpur.',
    ],
    image: milestone2018,
  },
  {
    year: 2019,
    title: 'Land Reclamation Success',
    description: [
      'January: Awarded projects in Trichy and Erode.',
      'February: Handed over 4 reclaimed acres to Sembakkam Municipality.',
      'March: Awarded Tirupati project and successfully reclaimed 10.5 acres in Vadodara and 32.5 acres in Vijayawada.',
    ],
    image: img5,
  },
  {
    year: 2020,
    title: 'Investment and Growth',
    description: [
      'January: Awarded biomining project in Visakhapatnam.',
      'March: Blue Planet Environmental Solutions made a significant investment in Zigma.',
      'June - August: Awarded projects in Karaikudi, Karur, and NOIDA; reclaimed 5 acres in Pammal.',
      'October: Awarded projects in Cuddalore, Dindigul, and Perungudi; handed over 2 reclaimed acres to Poonamallee Municipality.',
    ],
    image: milestone2020,
  },
  {
    year: 2021,
    title: 'Regional Milestones',
    description: [
      "February: Awarded the prestigious Chennai-Perungudi project, India's largest marshland recovery project.",
      'Handed over 6.2 acres to NOIDA Municipality.',
      'September - October: Reclaimed land handed over to Erode (7 acres) and Pammal (4 acres) municipalities.',
      'December: Handed over 10.5 acres to Vadodara Municipality and awarded the first Union Territory project in Puducherry.',
    ],
    image: milestone2021,
  },
  {
    year: 2022,
    title: 'Market Diversification',
    description: [
      'Secured the first-ever private contract for landfill mining from ITC.',
      'Expanded into North East India with a project awarded in Guwahati.',
    ],
    image: milestone2022,
  },
  {
    year: 2023,
    title: 'Massive Scaling',
    description: [
      'Received a $35 million investment from the Investment Fund for Developing Countries (IFU) via Blue Planet.',
      'Awarded the Kodungaiyur Project in Chennai.',
      'Reached a massive achievement of 400 total acres of land reclaimed.',
    ],
    image: milestone2023,
  },
  {
    year: 2024,
    title: 'Innovation and Command',
    description: [
      "December: Blue Planet served as Anchor Partner for the AVPN South Asia Summit 2024 in Chennai, the world's first summit of this magnitude undertaken in a reclaimed dumpsite.",
      'Inaugurated a new state-of-the-art office facility in Erode, featuring a world-class CCC (Control Command Centre).',
    ],
    image: milestone2024,
  },
  {
    year: 2025,
    title: 'A Decade of Impact',
    description: [
      'January: Awarded the Legendary Andhra Pradesh Cluster project covering multiple sites and enabling large-scale reclamation.',
      'Increased processing capacity to 30,000 tons per day.',
      'Co-processed 25 lakh tons of RDF with cement plants and Waste-to-Energy facilities, the highest in the country.',
      'October: Zigma officially completed one decade of working for the people and the planet.',
    ],
    image: img11,
  },
  {
    year: 2026,
    title: 'The Dawn of the Second Decade',
    description: [
      'Awarded the prestigious project of Kozhikode by Kerala SWMP, fully funded by the World Bank.',
      "Bagged Kerala's first integrated bio-mining project at Kureepuzha, Kollam.",
      "Awarded the Andhra Pradesh Chief Minister's award for exemplary performance in bio-mining.",
      'Received funding from Denmark-based Novo Holdings through Blue Planet.',
    ],
    image: milestone2026,
  },
];

const leaders: Leader[] = [
  {
    group: 'Promoters and CoFounders',
    name: 'Boopathy Dharmaraj',
    image: picture1,
    designation: 'Managing Director & Co-Founder',
    linkedin: 'https://www.linkedin.com/in/boopathy-dharmaraj-6b64b0ba/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Ku Tha Ilangovan',
    image: picture4,
    designation: 'Director & Co-Founder',
    linkedin: 'https://www.linkedin.com/in/ilangovan-thangavelu-kugalur-a44084185/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Anand Thangaraj',
    image: picture3,
    designation: 'Director',
    linkedin: 'https://www.linkedin.com/in/anand-thangaraj-b421b8400/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'K P Mutharasu',
    image: picture2,
    designation: ' Promoter & Co- Founder',
    linkedin: 'https://www.linkedin.com/in/mutharasu-k-p-125b2546/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Vijayan S',
    designation: 'Promoter',
    image: picture16,
    // linkedin: 'https://www.linkedin.com/in/vijayan-s/', / / FIX: was incorrectly pointing to Anand Thangaraj's profile
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Nagesh Prabhu Chinivartha',
    image: picture5,
    designation: 'Promoter & Co- Founder',
    linkedin: 'https://www.linkedin.com/in/nageshprabhu/',
  },

  {
    group: 'Management Team',
    name: 'A Rajasekaran',
    image: picture6,
    designation: 'President- Technical',
    linkedin: 'https://www.linkedin.com/in/aghoramoorthy-rajasekaran-54479521/',
  },
  {
    group: 'Management Team',
    name: 'Senthil Annamalai',
    image: picture15,
    designation: 'Chief Operating Officer',
    linkedin: 'https://www.linkedin.com/in/senthil-annamalai-b3b38258/',
  },
  {
    group: 'Management Team',
    name: 'Maran V',
    image: picture14,
    designation: 'Vice President - Research & Product  Development',
    // linkedin: 'https://www.linkedin.com/in/maaran-9b1a8614a/',
  },
  {
    group: 'Management Team',
    name: 'Sridhar Jegannathan',
    image: picture7,
    designation: 'Vice President - Operations',
    linkedin: 'https://www.linkedin.com/in/sridhar-jagannathan-00a52444/',
  },
  {
    group: 'Management Team',
    name: 'Shankar Raman C V',
    image: picture11,
    designation: 'Vice President - Business Development',
    linkedin: 'https://www.linkedin.com/in/shankar-raman-c-v-64528611/',
  },
  {
    group: 'Management Team',
    name: 'Varun Boralkar',
    image: picture13,
    designation: 'Vice President - Strategic Business Group',
    linkedin: 'https://www.linkedin.com/in/varun-boralkar-aa085a15/',
  },
  {
    group: 'Management Team',
    name: 'Mohan Kumar',
    image: picture17,
    designation: 'General Manager - Resource Recovery & Revenue',
    linkedin: 'https://www.linkedin.com/in/mohan-kumaar-subramaniam-a3b064175/',
  },
  {
    group: 'Management Team',
    name: 'Shivashankar Pandian',
    image: picture18,
    designation: 'General Manager - Finance & Accounts',
    linkedin: 'https://www.linkedin.com/in/shivashankar-pandian/', // FIX: was incorrectly pointing to Mohan Kumar's profile
  },
];

const isReducedMotionPreferred = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;

const clampMilestoneIndex = (index: number): number =>
  Math.max(0, Math.min(milestones.length - 1, index));
const leaderGroups: Array<Leader['group']> = ['Promoters and CoFounders', 'Management Team'];

const SectionTitle = ({ label, title }: { label: string; title: JSX.Element | string }) => (
  <div>
    <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
    <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
  </div>
);

const About = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(isReducedMotionPreferred);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isMilestoneInView, setIsMilestoneInView] = useState(false);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const milestoneSectionRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const milestoneImagePanelRef = useRef<HTMLDivElement | null>(null);
  const milestoneTextPanelRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(currentIndex);
  const hasStartedTimelineRef = useRef(false);
  const preloadedMilestoneImagesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setAutoPlay(false);
    }
  }, [prefersReducedMotion]);

  const preloadMilestoneImage = useCallback((src: string) => {
    if (typeof window === 'undefined' || !src || preloadedMilestoneImagesRef.current.has(src)) return;

    const image = new Image();
    image.src = src;
    preloadedMilestoneImagesRef.current.add(src);
  }, []);

  useEffect(() => {
    preloadMilestoneImage(milestones[INITIAL_INDEX].image);
    preloadMilestoneImage(milestones[(INITIAL_INDEX + 1) % milestones.length].image);
  }, [preloadMilestoneImage]);

  // FIX: Added forceUpdate parameter to allow wrapping back to index 0
  // without being blocked by the "same index" guard
  const transitionToMilestone = useCallback(
    (nextIndex: number, forceUpdate = false) => {
      const clampedIndex = clampMilestoneIndex(nextIndex);

      if (!forceUpdate && clampedIndex === currentIndexRef.current) return;
      const upcomingMilestone = milestones[(clampedIndex + 1) % milestones.length];
      preloadMilestoneImage(upcomingMilestone.image);
      currentIndexRef.current = clampedIndex;
      setCurrentIndex(clampedIndex);
    },
    [preloadMilestoneImage],
  );

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const intervalId = setInterval(() => {
      // FIX: Pass forceUpdate=true when wrapping from last index back to 0
      // so the guard doesn't silently block it on first load
      const isLast = currentIndexRef.current === milestones.length - 1;
      const nextIndex = isLast ? 0 : currentIndexRef.current + 1;
      transitionToMilestone(nextIndex, isLast);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [autoPlay, prefersReducedMotion, transitionToMilestone]);

  useEffect(() => {
    const section = milestoneSectionRef.current;
    if (!section || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isInView = Boolean(entry?.isIntersecting);
        setIsMilestoneInView(isInView);
        if (!isInView || hasStartedTimelineRef.current) return;

        hasStartedTimelineRef.current = true;
        milestones.forEach((milestone) => preloadMilestoneImage(milestone.image));
        transitionToMilestone(0);
        setAutoPlay(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      setIsMilestoneInView(false);
    };
  }, [prefersReducedMotion, preloadMilestoneImage, transitionToMilestone]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || !isMilestoneInView || prefersReducedMotion) return;

      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;

      if (isTypingTarget) return;
      event.preventDefault();
      setAutoPlay((prev) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMilestoneInView, prefersReducedMotion]);

  useEffect(() => {
    const section = heroSectionRef.current;
    const image = heroImageRef.current;

    if (!section || !image || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: 0, scale: 1.1 },
        {
          y: 80,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const currentMilestone = milestones[currentIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="scroll-pt-24 lg:snap-y lg:snap-proximity">
        <section
          id="about-hero"
          ref={heroSectionRef}
          data-no-animate
          className="relative box-border flex min-h-[100svh] items-center overflow-hidden pt-20 scroll-mt-24 lg:scroll-mt-28 lg:snap-start"
        >
          <img
            ref={heroImageRef}
            src={hero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center">
            <Reveal
              className="w-full items-center justify-items-center text-center"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <div className="text-lg font-medium uppercase tracking-[0.35em] text-white/85">
                Our Journey
              </div>
              <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-5xl">
                Milestones That Shaped Us
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-white/90">
                Explore the defining moments that transformed our vision into a global footprint.
                Each year marks a new chapter in growth, innovation, and impact.
              </p>
            </Reveal>
          </div>
        </section>

        <section
          data-no-animate
          className="section-padding relative overflow-hidden scroll-mt-24 lg:scroll-mt-28 lg:snap-start"
          style={{ background: 'linear-gradient(135deg, hsl(145 40% 97%) 0%, hsl(0 0% 100%) 50%, hsl(145 30% 96%) 100%)' }}
        >
          {/* Globe SVG background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 select-none lg:h-[560px] lg:w-[560px]"
          >
            <img
              src={globeSvg}
              alt=""
              className="h-full w-full opacity-[.25] drop-shadow-[0_0_20px_rgba(22,101,52,0.2)] motion-safe:animate-[spin_40s_linear_infinite] motion-reduce:animate-none"
            />
          </div>

          <div className="container-main relative w-full max-w-5xl section-padding">
            <Reveal
              className="mt-4 flex flex-col justify-start"
              data-anim-start="top 92%"
              data-anim-duration="1.5"
              data-anim-ease={SLOW_EASE}
            >
              <div className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Our Company
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Zigma Global Environ <span className="text-primary">Solutions Pvt Ltd.</span>
              </h2>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                In 2015, while exploring various waste streams, our founders discovered a stark reality: India had no solution for its growing legacy waste crisis. Open dump yards across the country were overflowing with decades of mismanaged municipal solid waste, and the nation was grappling with the absence of a clear, scientific pathway to address it.
              </p>
               <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
This realization became the turning point. A group of serial entrepreneurs from South India—experienced in steel manufacturing, TMT bars, billets, UPVC profiles, hospitality, and IT infrastructure—saw in this challenge an opportunity to do something truly transformative, not just for communities but for the country at large.              </p>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                Determined to find answers, they traveled across Germany, South Africa, Thailand, China, and South Korea, studying how these nations tackled municipal solid waste. Out of this exploration emerged Zigma: a company dedicated to pioneering solutions for legacy waste management.
              </p>

              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                At the heart of our operations lies a low-carbon emission model that scientifically segregates and remediates decades of accumulated waste. What began as a quest to solve India's most pressing environmental challenge has evolved into a mission with global resonance—turning neglected dump yards into opportunities for renewal, sustainability, and impact.              </p>
            </Reveal>
          </div>
        </section>

        <section
          ref={milestoneSectionRef}
          data-no-animate
          className="min-h-[100svh] py-6 scroll-mt-24 lg:scroll-mt-28 lg:snap-start lg:py-8"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="container-main section-padding flex h-full flex-col">
            <Reveal
              className="mb-4"
              data-anim-start="top 92%"
              data-anim-duration="1.45"
              data-anim-ease={SLOW_EASE}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <SectionTitle
                  label="Path to Recognition"
                  title={
                    <>
                      Building India's First <span className="text-primary">Landfill Mining Powerhouse</span>
                    </>
                  }
                />

                <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                  <button
                    onClick={() => setAutoPlay((prev) => !prev)}
                    disabled={prefersReducedMotion}
                    className="flex items-center gap-2 text-sm text-green-700 transition-colors hover:text-green-700 disabled:cursor-not-allowed disabled:text-slate-500 lg:text-base"
                  >
                    {prefersReducedMotion ? (
                      <span className="font-medium">Reduced Motion</span>
                    ) : autoPlay ? (
                      <>
                        <Pause className="h-4 w-4 lg:h-5 lg:w-5" fill="currentColor" />
                        <span className="font-medium">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 lg:h-5 lg:w-5" fill="currentColor" />
                        <span className="font-medium">Play</span>
                      </>
                    )}
                  </button>

                  <span className="text-sm font-medium text-slate-600 lg:text-base">
                    {milestones[0].year} - {milestones[milestones.length - 1].year}
                  </span>
                </div>
              </div>
            </Reveal>

            <div
              className="mt-3 grid min-h-0 flex-1 grid-cols-1 items-stretch justify-center gap-5 lg:grid-cols-2"
            >
              <div ref={milestoneImagePanelRef} className="relative">
                <div className="group relative aspect-[18/10] overflow-hidden shadow-2xl">
                  <img
                    src={currentMilestone.image}
                    alt={currentMilestone.title}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* FIX: Prev button — behaviour unchanged */}
                  <button
                    onClick={() => transitionToMilestone(currentIndexRef.current - 1)}
                    disabled={currentIndex === 0}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-transparent text-white opacity-0 transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Previous milestone"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {/* FIX: Next button now has disabled at last index + forceUpdate on wrap */}
                  <button
                    onClick={() =>
                      transitionToMilestone(
                        currentIndexRef.current === milestones.length - 1
                          ? 0
                          : currentIndexRef.current + 1,
                        currentIndexRef.current === milestones.length - 1,
                      )
                    }
                    disabled={currentIndex === milestones.length - 1}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-transparent text-white opacity-0 transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Next milestone"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div ref={milestoneTextPanelRef} className="flex min-h-0 flex-col">
                <div className="min-h-[200px] lg:min-h-[260px]">
                  <div className="mb-2 text-sm font-bold tracking-wider text-green-700">
                    YEAR {currentMilestone.year}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold leading-tight text-slate-900 lg:text-3xl">
                    {currentMilestone.title}
                  </h3>
                  <ul className="h-[170px] list-disc space-y-2 overflow-y-auto pl-5 pr-2 text-sm leading-relaxed text-slate-600 lg:h-[220px] lg:text-lg">
                    {currentMilestone.description.map((item) => {
                      const keyPattern =
                        /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Swachh Survekshan 2017|Frost & Sullivan 2016 Award|AVPN South Asia Summit 2024|Chief Minister's award|World Bank|Novo Holdings|Blue Planet|Forcebel|Kumbakonam|Sembakkam|Pammal|Vijayawada|Vadodara|NOIDA|Nagpur|Trichy|Erode|Tirupati|Visakhapatnam|Karaikudi|Karur|Cuddalore|Dindigul|Perungudi|Puducherry|ITC|Guwahati|Kodungaiyur|Kozhikode|Kerala SWMP|Kureepuzha|Kollam|RDF|CCC|Zigma)\b|\b\d[\d,.]*\+?\s*(?:acres?|tons?|tonnes?|TPH|m(?:3|³)|lakh|million|cities?|municipalities|sites?)(?=\b|\s|$|[.,;:]))/g;
                      const highlightKeyWords = (text: string) => {
                        const parts = text.split(keyPattern);
                        return parts.map((part, index) => {
                          if (!part) return null;
                          if (part.match(keyPattern)) {
                            return (
                              <span key={`${item}-k-${index}`} className="font-semibold text-slate-700 ">
                                {part}
                              </span>
                            );
                          }
                          return <span key={`${item}-n-${index}`}>{part}</span>;
                        });
                      };

                      return <li key={item}>{highlightKeyWords(item)}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <Reveal
              className="mt-4 overflow-x-auto overflow-y-visible py-2"
              data-anim-start="top 84%"
              data-anim-duration="1.4"
              data-anim-ease={SLOW_EASE}
            >
              <div className="relative flex min-w-[760px] items-center justify-between">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-slate-200" />
                <div
                  className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-green-700 transition-all duration-500"
                  style={{ width: `${(currentIndex / (milestones.length - 1)) * 100}%` }}
                />

                {milestones.map((milestone, index) => {
                  const isActive = index === currentIndex;
                  const isPast = index < currentIndex;

                  return (
                    <button
                      key={milestone.year}
                      onClick={() => transitionToMilestone(index)}
                      className="group relative z-10 flex flex-col items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
                    >
                      <div
                        className={`h-4 w-4 rounded-full transition-all duration-300 ${isActive
                          ? 'scale-150 bg-green-700 shadow-lg shadow-green-700/50'
                          : isPast
                            ? 'bg-green-700'
                            : 'bg-slate-300'
                          } group-hover:scale-125`}
                      />
                      <span
                        className={`text-lg transition-colors ${isActive ? 'text-green-700' : 'text-slate-500 group-hover:text-slate-700'
                          }`}
                      >
                        {milestone.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        <section data-no-animate className="scroll-mt-24 lg:scroll-mt-28">
          <div className="group relative mx-auto w-full overflow-hidden border border-border shadow-xl">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                src={ABOUT_VIDEO_EMBED_URL}
                title="Zigma corporate video"
                className="absolute inset-0 h-full w-full"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section
          data-no-animate
          className="section-padding scroll-mt-24 lg:scroll-mt-28 "
        >
          <div className="container-main flex flex-col">
            <Reveal data-anim-start="top 92%" data-anim-duration="1.45" data-anim-ease={SLOW_EASE}>
              <SectionTitle
                label="Meet Our Management Team"
                title={
                  <>
                    Leadership Driving Sustainable <span className="text-primary">Excellence</span>
                  </>
                }
              />
            </Reveal>

            {leaderGroups.map((group) => (
              <div key={group} className="mt-8 first:mt-6">
                <h3 className="mb-4 text-xl font-semibold text-slate-900">{group.replace('CoFounders', 'Co-Founders')}</h3>
                <div className="grid grid-cols-1 gap-y-14 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-3 xl:gap-x-10">
                  {leaders
                    .filter((leader) => leader.group === group)
                    .map((leader) => (
                      <article
                        key={`${leader.group}-${leader.name}`}
                        className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                          <div className="relative h-full w-full">
                            {leader.image ? (
                              <img
                                src={leader.image}
                                alt={leader.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover object-center"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-slate-100">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-600">
                                  {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </div>
                              </div>
                            )}

                            {/* LinkedIn icon */}
                            {leader.linkedin ? (
                              <a
                                href={leader.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${leader.name} on LinkedIn`}
                                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0A66C2] bg-white/95 text-[#0A66C2] shadow-sm transition-colors duration-200 hover:bg-[#0A66C2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2"
                              >
                                <span className="text-sm font-extrabold leading-none">in</span>
                              </a>
                            ) : null}

                            {/* Name pill */}
                            <div className="absolute bottom-6 left-0">
                              <div className="bg-white rounded-r-full px-6 py-4 shadow-md min-w-[260px]">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                  {leader.name}
                                </h3>

                                {leader.designation && (
                                  <p className="text-sm text-slate-700 mt-1 leading-tight">
                                    {leader.designation}
                                  </p>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
