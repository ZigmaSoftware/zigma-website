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
import img3 from '@/assets/Before - After/5 poonamallee_A.jpg';
import img4 from '@/assets/Before - After/11 chidambaram_a.jpg';
import img5 from '@/assets/Before - After/2 sembakam_A.jpg';
import img6 from '@/assets/Before - After/14 karur_A.jpg';
import img7 from '@/assets/Before - After/6 vijawada_A.jpg';
import img8 from '@/assets/website/Noida.png';
import img9 from '@/assets/website/image ewd.png';
import img10 from '@/assets/Before - After/perungudi_2.png';
import img11 from '@/assets/website/image site.png';

import picture1 from '@/assets/website/Mr. Boopathy Dharmaraj.png';
import picture2 from '@/assets/website/Mr. K P Mutharasu.png';
import picture3 from '@/assets/website/Mr. ANAND THANGARAJ.png';
import picture4 from '@/assets/website/Mr. KTI.png';
import picture5 from '@/assets/website/Mr. NAGESH PRABHU.jpg';
import picture6 from '@/assets/website/Mr. Aghoramoorthy Rajasekaran.jpg';
import picture7 from '@/assets/website/Mr. SRIDHAR JAGANNATHAN.png';
import picture8 from '@/assets/website/Mr. VIJAYAN S.png';
import picture9 from '@/assets/website/Mr. Senthil Annamalai.png';
import picture10 from '@/assets/website/Mr. Prashant Singh.png';
import picture11 from '@/assets/website/Mr. Shankar Raman.jpg';
import picture12 from '@/assets/website/Mr. Maaran.png';
import picture13 from '@/assets/website/Mr. Varun Boralkar.jpg';

gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const INITIAL_INDEX = 3;
const SLOW_EASE = 'power2.out';
const INPUT_CLASS =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700';
const NAV_BUTTON_CLASS =
  'flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-300 transition-all hover:border-green-700 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-300 disabled:hover:text-slate-900 lg:h-10 lg:w-10';

interface Milestone {
  year: number;
  title: string;
  description: string[];
  image: string;
}

type Leader = {
  name: string;
  title: string;
  image?: string;
  linkedin?: string;
};

const milestones: Milestone[] = [
  {
    year: 2015,
    title: 'Founding Year',
    description: [
      "Founded to tackle India's legacy waste crisis.",
      'Developed indigenous machines with near-zero human intervention.',
    ],
    image: img1,
  },
  {
    year: 2016,
    title: 'National Recognition Begins',
    description: [
      'Instrumental in the Gazette notification of the SWM Rules 2016 mandating landfill mining.',
      "Invited to Swachh Survekshan 2016 by MoUD to showcase India's first biomining project.",
      'Marked as a best practice across 500 cities.',
    ],
    image: img2,
  },
  {
    year: 2017,
    title: 'Tech Collaboration and First Project',
    description: [
      'Partnership with Forcebel (Korea) - access to technology.',
      "Awarded India's first DBFOO model biomining project in Kumbakonam.",
      'Reclaimed 12 acres; began receiving central funding approvals.',
    ],
    image: img3,
  },
  {
    year: 2018,
    title: 'Infrastructure and Pipeline Expansion',
    description: [
      '15 acres reclaimed by March, 30 acres by December.',
      'Commissioned a 25 TPH line in Kumbakonam.',
      'Collaboration with IIT Bombay on aggregate disposal.',
      'Strong pipeline of 45 projects, 25+ million tonnes waste, INR 1,400+ Cr revenue potential.',
    ],
    image: img4,
  },
  {
    year: 2019,
    title: 'Capacity and Reputation Scaling',
    description: [
      'Commissioned 40 TPH line in Vijayawada.',
      'Participated in Swachh Sarvekshan workshops with 500+ officials.',
      'Cemented national model status with MoUD and MoEF&CC backing.',
    ],
    image: img5,
  },
  {
    year: 2020,
    title: 'Awards and Partnerships',
    description: [
      'CII 3R Awards for Excellence in Municipal Solid Waste Management.',
      'Expanded urban partnerships and state-level adoption.',
    ],
    image: img6,
  },
  {
    year: 2021,
    title: 'Strategic Acquisitions',
    description: [
      'February: Awarded biomining project in Chennai; handed over 6.2 acres of reclaimed land to NOIDA Municipality.',
      'September: Handed over 7 acres of reclaimed land to Erode Municipality.',
      'October: Handed over 4 acres of reclaimed land to Pammal Municipality.',
      'December: Handed over 10.5 acres of reclaimed land to Vadodara Municipality.',
      'Awarded first Union Territory project in Puducherry.',
    ],
    image: img7,
  },
  {
    year: 2022,
    title: 'Enhanced Credentials',
    description: [
      'Platinum Leadership Award for CSR & ESG at the 14th Annual Global CSR & ESG Summit, Hanoi, Vietnam.',
      'Reinforced focus on ESG, sustainability and global standards.',
    ],
    image: img8,
  },
  {
    year: 2023,
    title: 'Strategic Positioning',
    description: [
      'Won Best ESG Initiative for GHG Emission Reduction at the 4th Annual ESG Summit & Awards.',
      'Positioned as an industrial decarbonisation enabler.',
    ],
    image: img9,
  },
  {
    year: 2024,
    title: 'Key Partnerships',
    description: [
      'Blue Planet was an Anchor Partner of the AVPN South Asia Summit 2024, held in Chennai, India, on December 9, 2024.',
      'Moved to their new state of art facility in Erode, a world class facility, also a CCC Control Command Centre.',
    ],
    image: img10,
  },
  {
    year: 2025,
    title: 'Capacity Scale-up',
    description: [
      'The legendary Andhra Pradesh Cluster project was awarded.',
      'Processing capacity increased to 30 thousand tons per day.',
      '25 lakh tons of RDF coprocessed with cement plants & Waste to Energy by October 2025.',
      'Completed a decade of working for the people and the Planet.',
    ],
    image: img11,
  },
];

const leaders: Leader[] = [
  {
    name: 'Mr. Boopathy Dharmaraj',
    title: 'Managing Director',
    image: picture1,
    linkedin: 'https://www.linkedin.com/in/boopathy-dharmaraj-6b64b0ba/',
  },
  {
    name: 'Mr. K.P Mutharasu',
    title: ' Director',
    image: picture2,
    linkedin: 'https://www.linkedin.com/in/mutharasu-k-p-125b2546/',
  },
  {
    name: 'Mr. Anand Thangaraj',
    title: 'Director',
    image: picture3,
    linkedin: 'https://www.linkedin.com/in/anand-thangaraj-9b1a8614a/',
  },
  {
    name: 'Mr. KU THA ILANGOVAN',
    title: 'Director',
    image: picture4,
    linkedin: 'https://www.linkedin.com/in/ku-tha-ilangovan-9b1a8614a/',
  },
  {
    name: 'Mr. Nagesh Prabhu',
    title: 'Co-Founder ',
    image: picture5,
    linkedin: 'https://www.linkedin.com/in/nageshprabhu/',
  },
  {
    name: 'Mr. A Rajasekaran ',
    title: 'Director-Technical',
    image: picture6,
    linkedin: 'https://www.linkedin.com/in/aghoramoorthy-rajasekaran-54479521/',
  },
  {
    name: 'Mr. Sridhar Jagannathan',
    title: 'Vice President - Operations',
    linkedin: 'https://www.linkedin.com/in/sridhar-jagannathan-00a52444/',
  },
  {
    name: 'Mr. Vijayan S',
    title: 'Director',
    linkedin: 'https://www.linkedin.com/in/vijayans/',
  },
  {
    name: 'Mr. Senthil Annamalai',
    title: 'COO',
    image: picture9,
    linkedin: 'https://www.linkedin.com/in/senthil-annamalai-9b1a8614a/',
  },
  {
    name: 'Mr.Prashant Singh',
    title: 'Co-Founder & CEO',
    image: picture10,
    linkedin: 'https://www.linkedin.com/in/prashantsingh4/',
  },
  {
    name: 'Mr. Shankar Raman C V',
    title: 'Director',
    image: picture11,
    linkedin: 'https://www.linkedin.com/in/shankar-raman-c-v-64528611/',

  },
  {
    name: 'Mr. Maaran',
    title: 'Vice President - Product Development & R&D',
    
    linkedin: 'https://www.linkedin.com/in/maaran-9b1a8614a/',
  },
  {
    name: 'Mr. Varun Boralkar',
    title: 'Vice President - Strategic Business Group',
    image: picture13,
    linkedin: 'https://www.linkedin.com/in/varun-boralkar-aa085a15/',
  },
];

const isReducedMotionPreferred = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;

const clampMilestoneIndex = (index: number): number =>
  Math.max(0, Math.min(milestones.length - 1, index));

const SectionTitle = ({ label, title }: { label: string; title: JSX.Element | string }) => (
  <div>
    <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
    <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
  </div>
);

const About = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(isReducedMotionPreferred);
  const [autoPlay, setAutoPlay] = useState(() => !isReducedMotionPreferred());

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const milestoneImagePanelRef = useRef<HTMLDivElement | null>(null);
  const milestoneTextPanelRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(currentIndex);

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

  const transitionToMilestone = useCallback(
    (nextIndex: number) => {
      const clampedIndex = clampMilestoneIndex(nextIndex);

      if (clampedIndex === currentIndexRef.current) return;
      currentIndexRef.current = clampedIndex;
      setCurrentIndex(clampedIndex);
    },
    [],
  );

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const intervalId = setInterval(() => {
      const nextIndex =
        currentIndexRef.current === milestones.length - 1 ? 0 : currentIndexRef.current + 1;
      transitionToMilestone(nextIndex);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [autoPlay, prefersReducedMotion, transitionToMilestone]);

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
    <div className="min-h-screen overflow-x-hidden bg-background">
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
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30"
            aria-hidden="true"
          />

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
                Zigma was founded by a group of serial enterpreneurs from South India, experienced in
                manufacuring Steel, TMT Bars, Billets, UPVC Door and Window profiles, hospitality and IT
                infrastructure projects. On the quest for a worthy challenge came across the rising
                menace of waste mismanagement and realised that this was the opportunity to so
                something phenomenal that would benefit not only the community but the country at large.
              </p>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                After extensive research and travel to countries like Germany, South Africa,
                Thailand, China and South Korea to understand how these countries manage their
                Municipal Solid Waste (MSW), Zigma was founded, to solve the problem of legacy
                waste management. At the core of our operations is a low carbon emission model
                for segregation of legacy MSW dumped indiscriminately in the open dump yards
                in India today.
              </p>
            </Reveal>
          </div>
        </section>

        <section
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
                      Building India’s First <span className="text-primary">Landfill Mining Powerhouse</span>
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
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <button
                    onClick={() => transitionToMilestone(currentIndexRef.current - 1)}
                    disabled={currentIndex === 0}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-transparent text-white opacity-0 transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Previous milestone"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => transitionToMilestone(currentIndexRef.current + 1)}
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
                    {currentMilestone.description.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
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
                        className={`text-sm font-medium transition-colors ${isActive ? 'text-green-700' : 'text-slate-500 group-hover:text-slate-700'
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

        <section
          data-no-animate
          className="section-padding scroll-mt-24 lg:scroll-mt-28 "
         
        >
          <div className="container-main flex flex-col">
            <Reveal data-anim-start="top 92%" data-anim-duration="1.45" data-anim-ease={SLOW_EASE}>
              <SectionTitle
                label="Meet Our Leaders"
                title={
                  <>
                    Leadership Driving Sustainable <span className="text-primary">Excellence</span>
                  </>
                }
              />
            </Reveal>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.map((leader) => (
                <article
                  key={`${leader.name}-${leader.title}`}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/4.1] bg-slate-100">
                    {leader.image ? (
                      <img
                        src={leader.image}
                        alt={leader.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-100" />
                    )}
                    {leader.linkedin && (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${leader.name} on LinkedIn`}
                        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#0A66C2] bg-white/95 text-[#0A66C2] transition-colors hover:bg-[#0A66C2] hover:text-white"
                      >
                        <span className="text-sm font-extrabold leading-none">in</span>
                      </a>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-lg font-semibold text-slate-900">{leader.name}</h3>
                    <p className="mt-1 text-md text-slate-600">{leader.title}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          data-no-animate
          className="container-main section-padding scroll-mt-24 lg:scroll-mt-28 lg:snap-start"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Reveal
              className="text-center lg:text-left"
              data-anim-start="top 92%"
              data-anim-duration="1.45"
              data-anim-ease={SLOW_EASE}
            >
              <div className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Let Us Deliver Impact
              </div>
              <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                Let us deliver impact for your <span className="text-primary">Organization</span>
              </h2>
              <p className="mt-6 max-w-2xl text-justify text-lg leading-relaxed text-muted-foreground">
                Partner with Zigma to accelerate sustainable outcomes with proven expertise across
                large-scale projects.
              </p>
            </Reveal>

            <Reveal
              className="mx-auto w-full max-w-md lg:ml-auto lg:mr-0"
              data-anim-start="top 86%"
              data-anim-duration="1.5"
              data-anim-ease={SLOW_EASE}
            >
              <form className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-3">
                  <input type="text" placeholder="Name" className={INPUT_CLASS} />
                  <input type="email" placeholder="Email" className={INPUT_CLASS} />
                  <input type="tel" placeholder="Contact" className={INPUT_CLASS} />
                  <textarea placeholder="Message" rows={3} className={INPUT_CLASS} />
                  <button
                    type="button"
                    className="mt-1 w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;










