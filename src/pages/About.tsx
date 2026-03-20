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
import img4 from '@/assets/Before - After/11 chidambaram_a.jpg';
import img5 from '@/assets/Before - After/2 sembakam_A.jpg';
import img6 from '@/assets/Before - After/14 karur_A.jpg';
import img7 from '@/assets/Before - After/6 vijawada_A.jpg';
import img8 from '@/assets/website/Noida.png';
import img9 from '@/assets/website/image ewd.png';
import img10 from '@/assets/website/hero/controll room.png';
import img11 from '@/assets/Awards/award12_Swachha Andhra.png';

import picture1 from '@/assets/Leaders/Mr. Boopathy Dharmaraj.jpeg';
import picture2 from '@/assets/Leaders/Mr. K P Mutharasu.jpeg';
import picture3 from '@/assets/Leaders/Mr. ANAND THANGARAJ.jpeg';
import picture4 from '@/assets/Leaders/Mr. KTI.jpeg';
import picture5 from '@/assets/Leaders/Mr. NAGESH PRABHU.jpeg';
import picture6 from '@/assets/Leaders/Mr. Aghoramoorthy Rajasekaran.jpeg';
import picture7 from '@/assets/Leaders/Mr. Sridhar Jagannathan.jpeg';
import picture10 from '@/assets/Leaders/Mr. Prashant Singh.jpeg';
import picture11 from '@/assets/Leaders/Mr. Shankar Raman.jpeg';
// import picture12 from '@/assets/Mr. Mohan Kumar.png';
import picture13 from '@/assets/Leaders/Mr. Varun Boralkar.jpeg';
import picture14 from '@/assets/website/Mr. Maran.png';
import picture15 from '@/assets/Leaders/Mr. Senthil Annamalai.jpeg';
import picture16 from '@/assets/Leaders/Vijayan.jpeg';
import picture17 from '@/assets/Leaders/Mohan kumar.jpeg';
import picture18 from '@/assets/Leaders/Shivashankar Pandian.jpeg';

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
  group: 'Promoters and CoFounders' | 'Management Team';
  name: string;
  designation?: string;
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
    linkedin: 'https://www.linkedin.com/in/anand-thangaraj-9b1a8614a/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Prashant Singh',
    image: picture10,
    designation: 'Director',
    linkedin: 'https://www.linkedin.com/in/prashantsingh4/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'K.P Mutharasu',
    image: picture2,
    designation: ' Promoter & Co- Founder',
    linkedin: 'https://www.linkedin.com/in/mutharasu-k-p-125b2546/',
  },
  {
    group: 'Promoters and CoFounders',
    name: 'Vijayan S',
    designation: 'Promoter',
    image: picture16,
    linkedin: 'https://www.linkedin.com/in/vijayans/',
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
    designation: 'Vice President',
    linkedin: 'https://www.linkedin.com/in/maaran-9b1a8614a/',
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
    name: 'Shankar Raman CV',
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
    designation: 'General Manager - AFR',
    linkedin: 'https://www.linkedin.com/in/mohan-kumaar-subramaniam-a3b064175/',
  },
   {
    group: 'Management Team',
    name: 'Shivashankar Pandian',
    image: picture18,
    designation: 'GM- Finance & Accounts',
    linkedin: 'https://www.linkedin.com/in/mohan-kumaar-subramaniam-a3b064175/',
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










