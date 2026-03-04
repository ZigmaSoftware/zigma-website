import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Pause, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/animation/Reveal';
import StaggerReveal from '@/components/animation/StaggerReveal';
import bg1 from '@/assets/background-1.png';
import hero from '@/assets/website/hero/about-hero.jpg';

import img1 from '@/assets/website/Kumbakonam.png';
import img2 from '@/assets/website/Forcebel.png';
import img3 from '@/assets/hero-bg.jpg';
import img4 from '@/assets/completed_project.jpg';
import img5 from '@/assets/website/Erode,Vairapalayam.png';
import img6 from '@/assets/website/Kumbakonam.png';
import img7 from '@/assets/website/Picture2.png';
import img8 from '@/assets/website/Noida.png';
import img9 from '@/assets/website/image ewd.png';
import img10 from '@/assets/website/image ewd.png';
import img11 from '@/assets/website/image site.png';

import picture1 from '@/assets/website/Mr. Boopathy Dharmaraj.png';
import picture2 from '@/assets/website/Mr. K.P Mutharasu.jpg';
import picture3 from '@/assets/website/Mr. ANAND THANGARAJ.png';
import picture5 from '@/assets/website/Mr. NAGESH PRABHU.jpg';

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
  linkedin: string;
};

const milestones: Milestone[] = [
  {
    year: 2015,
    title: 'Company Founded',
    description: [
      'May: Awarded the Kumbakonam biomining project for 1.3 lakh m3.',
      'July: Invited by the Government of India, Ministry of Urban Development, to present in workshops for Swachh Survekshan 2017.',
    ],
    image: img1,
  },
  {
    year: 2016,
    title: 'First Major Client',
    description: [
      'April: Reclaimed more than 4 acres in Kumbakonam.',
      'June: Won orders in 20 municipalities of Tamil Nadu for supply of MSW plants and machinery.',
      'July: Awarded Frost and Sullivan 2016 Award.',
      'December: Reclaimed more than 6 acres in Kumbakonam.',
    ],
    image: img2,
  },
  {
    year: 2017,
    title: 'International Expansion',
    description: [
      "May: Signed a joint venture with Forcebel, becoming Asia's largest landfill mining company.",
      'July: Awarded biomining projects in Chennai - Sembakkam and Pammal.',
      'August: Awarded biomining project in Vijayawada.',
      'October: Awarded biomining project in Vadodara.',
    ],
    image: img3,
  },
  {
    year: 2018,
    title: 'Industry Recognition',
    description: [
      'April: Awarded biomining project in Chidambaram.',
      'May: Awarded biomining project in Chennai - Poonamallee.',
      'June: Awarded biomining project in NOIDA.',
      'July: Awarded biomining project in Nagpur.',
    ],
    image: img4,
  },
  {
    year: 2019,
    title: 'Project Wins and Land Reclamation Impact',
    description: [
      'January: Awarded biomining projects in Trichy and Erode.',
      'February: Handed over 4 acres of reclaimed land to Sembakkam Municipality.',
      'March: Awarded biomining project in Tirupati; reclaimed 10.5 acres in Vadodara and 32.5 acres in Vijayawada.',
    ],
    image: img5,
  },
  {
    year: 2020,
    title: 'Accelerated Growth and Delivery Momentum',
    description: [
      'January: Awarded biomining project in Visakhapatnam.',
      'June: Awarded biomining projects in Karaikudi and Karur.',
      'July: Handed over 4 acres of reclaimed land to NOIDA Authority.',
      'August: Awarded biomining project in NOIDA; reclaimed 5 acres in Pammal.',
      'March: Blue Planet Environmental Solutions made a significant investment in Zigma Global Environ Solutions.',
      'October: Awarded biomining projects in Cuddalore and Dindigul; handed over 2 acres of reclaimed land to Poonamallee Municipality.',
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
    title: 'Strategic Expansion Milestones',
    description: [
      'Secured first private contract from ITC for landfill mining.',
      'Awarded project in Guwahati and expanded into North East India.',
    ],
    image: img8,
  },
  {
    year: 2023,
    title: 'Sustainability Initiative',
    description: [
      'IFU invested 35 million USD in Blue Planet Environmental Solutions for Zigma.',
      'Awarded Kodungaiyur project in Chennai.',
      'Milestone of 400 acres achieved.',
    ],
    image: img9,
  },
  {
    year: 2024,
    title: 'Global Partnerships and Expansion',
    description: [
      'December: Blue Planet was an anchor partner of the AVPN South Asia Summit 2024 in Chennai on December 9, 2024.',
      'Zigma moved into its new state-of-the-art facility in Erode, including a CCC control command center.',
    ],
    image: img10,
  },
  {
    year: 2025,
    title: 'Global Leadership',
    description: [
      'The Andhra Pradesh cluster project was awarded.',
      'Processing capacity increased to 30,000 tons per day.',
      '25 lakh tons of RDF coprocessed with cement plants and waste-to-energy by October 2025.',
      'Zigma completed a decade of serving people and planet.',
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
    title: 'Director',
    image: picture2,
    linkedin: 'https://www.linkedin.com/in/mutharasu-k-p-125b2546/',
  },
  {
    name: 'Mr. Anand Thangaraj',
    title: 'Director',
    image: picture3,
    linkedin: '#',
  },
  {
    name: 'Mr. KU THA ILANGOVAN',
    title: 'Director',
    linkedin: '#',
  },
  {
    name: 'Mr. Nagesh Prabhu',
    title: 'Director',
    image: picture5,
    linkedin: 'https://www.linkedin.com/in/nageshprabhu/',
  },
];

const isReducedMotionPreferred = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;

const clampMilestoneIndex = (index: number): number =>
  Math.max(0, Math.min(milestones.length - 1, index));

const getLeaderInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

const SectionTitle = ({ label, title }: { label: string; title: JSX.Element | string }) => (
  <div>
    <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
    <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
  </div>
);

const LeaderCard = ({ leader }: { leader: Leader }): JSX.Element => {
  const hasLinkedIn = leader.linkedin !== '#';

  return (
    <div className="group w-full max-w-[240px] text-center">
      <div className="relative mx-auto h-32 w-32">
        <div className="h-32 w-32 overflow-hidden rounded-full bg-slate-100">
          {leader.image ? (
            <img
              src={leader.image}
              alt={leader.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-slate-400">
              {getLeaderInitials(leader.name)}
            </div>
          )}
        </div>
        {hasLinkedIn && (
          <a
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${leader.name} on LinkedIn`}
            className="absolute bottom-0 right-0 inline-flex h-9 w-9 translate-x-2 translate-y-2 items-center justify-center rounded-full border border-white bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-200 hover:text-slate-800"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="mt-6">
        <div className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-green-700">
          {leader.name}
        </div>
        <div className="text-sm text-slate-500">{leader.title}</div>
      </div>
    </div>
  );
};

const About = (): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(isReducedMotionPreferred);
  const [autoPlay, setAutoPlay] = useState(() => !isReducedMotionPreferred());

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const milestoneImagePanelRef = useRef<HTMLDivElement | null>(null);
  const milestoneTextPanelRef = useRef<HTMLDivElement | null>(null);
  const currentIndexRef = useRef(currentIndex);
  const isMilestoneAnimatingRef = useRef(false);
  const queuedMilestoneIndexRef = useRef<number | null>(null);

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
      if (prefersReducedMotion) {
        setCurrentIndex(clampedIndex);
        return;
      }

      if (isMilestoneAnimatingRef.current) {
        queuedMilestoneIndexRef.current = clampedIndex;
        return;
      }

      const panels = [milestoneImagePanelRef.current, milestoneTextPanelRef.current].filter(
        Boolean,
      ) as HTMLElement[];

      if (panels.length === 0) {
        setCurrentIndex(clampedIndex);
        return;
      }

      isMilestoneAnimatingRef.current = true;
      gsap.killTweensOf(panels);

      gsap
        .timeline({
          onComplete: () => {
            isMilestoneAnimatingRef.current = false;
            const queuedIndex = queuedMilestoneIndexRef.current;
            queuedMilestoneIndexRef.current = null;

            if (queuedIndex !== null && queuedIndex !== currentIndexRef.current) {
              transitionToMilestone(queuedIndex);
            }
          },
        })
        .to(panels, {
          opacity: 0,
          y: 8,
          duration: 0.22,
          ease: 'power2.out',
        })
        .add(() => {
          currentIndexRef.current = clampedIndex;
          setCurrentIndex(clampedIndex);
        })
        .set(panels, { y: 12 })
        .to(panels, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        });
    },
    [prefersReducedMotion],
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
          className="section-padding bg-white scroll-mt-24 lg:scroll-mt-28 lg:snap-start"
        >
          <div className="container-main w-full max-w-5xl">
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
                Zigma Global Environ Solutions Pvt. Ltd.
              </h2>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                Zigma was founded by a group of serial entrepreneurs from South India, experienced
                in manufacturing steel, TMT bars, billets, UPVC door and window profiles, hospitality,
                and IT infrastructure projects. The team recognized the growing challenge of waste
                mismanagement and built a company focused on solving it at scale.
              </p>
              <p className="mt-4 text-justify text-base leading-relaxed text-slate-600 lg:text-lg">
                After studying municipal solid waste systems in Germany, South Africa, Thailand,
                China, and South Korea, Zigma was founded to address legacy waste management in
                India with a lower-carbon segregation model.
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
                  label="Our Journey So Far"
                  title={
                    <>
                      Measurable Sustainability <span className="text-primary">Progress</span>
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

            <StaggerReveal
              className="mt-3 grid min-h-0 flex-1 grid-cols-1 items-stretch justify-center gap-5 lg:grid-cols-2"
              data-anim-start="top 88%"
              data-anim-duration="1.55"
              data-anim-ease={SLOW_EASE}
            >
              <div ref={milestoneImagePanelRef} className="relative">
                <div className="relative aspect-[16/10] overflow-hidden shadow-2xl">
                  <img
                    src={currentMilestone.image}
                    alt={currentMilestone.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              </div>

              <div ref={milestoneTextPanelRef} className="flex min-h-0 flex-col">
                <div className="min-h-[260px] lg:min-h-[320px]">
                  <div className="mb-2 text-sm font-bold tracking-wider text-green-700">
                    YEAR {currentMilestone.year}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold leading-tight text-slate-900 lg:text-3xl">
                    {currentMilestone.title}
                  </h3>
                  <ul className="h-[170px] list-disc space-y-2 overflow-y-auto pl-5 pr-2 text-sm leading-relaxed text-slate-600 lg:h-[220px] lg:text-base">
                    {currentMilestone.description.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <button
                    onClick={() => transitionToMilestone(currentIndexRef.current - 1)}
                    disabled={currentIndex === 0}
                    className={NAV_BUTTON_CLASS}
                    aria-label="Previous milestone"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => transitionToMilestone(currentIndexRef.current + 1)}
                    disabled={currentIndex === milestones.length - 1}
                    className={NAV_BUTTON_CLASS}
                    aria-label="Next milestone"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium text-slate-600">
                    {currentIndex + 1} / {milestones.length}
                  </span>
                </div>
              </div>
            </StaggerReveal>

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
                        className={`h-4 w-4 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'scale-150 bg-green-700 shadow-lg shadow-green-700/50'
                            : isPast
                              ? 'bg-green-700'
                              : 'bg-slate-300'
                        } group-hover:scale-125`}
                      />
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isActive ? 'text-green-700' : 'text-slate-500 group-hover:text-slate-700'
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
          className="section-padding bg-white scroll-mt-24 lg:scroll-mt-28 lg:snap-start"
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

            <div className="mt-8 min-h-0 flex-1">
              <StaggerReveal
                className="grid grid-cols-1 place-items-center gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-5"
                data-anim-start="top 88%"
                data-anim-duration="3"
                data-anim-ease={SLOW_EASE}
              >
                {leaders.map((leader) => (
                  <LeaderCard key={`${leader.name}-${leader.title}`} leader={leader} />
                ))}
              </StaggerReveal>
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
