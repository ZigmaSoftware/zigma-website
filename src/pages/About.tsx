import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Linkedin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import img1 from "@/assets/website/Kumbakonam.png";
import img2 from "@/assets/website/Forcebel.png";
import img3 from "@/assets/hero-bg.jpg";
import img4 from "@/assets/completed_project.jpg";
import img5 from "@/assets/website/Erode,Vairapalayam.png";
import img6 from "@/assets/website/Kumbakonam.png";
import img7 from "@/assets/website/Picture2.png";
import img8 from "@/assets/website/Noida.png";
import img9 from "@/assets/website/image ewd.png";
import img10 from "@/assets/website/image ewd.png";
import img11 from "@/assets/website/image site.png";

import company from "@/assets/zigma.jpg";
import hero from "@/assets/website/The Landfill Mining.jpg";


import picture1 from "@/assets/website/Mr. Boopathy Dharmaraj.png";
import picture2 from "@/assets/website/Mr. K.P Mutharasu.jpg";
import picture3 from "@/assets/website/Mr. ANAND THANGARAJ.png";
import picture4 from "@/assets/website/Mr. Boopathy Dharmaraj.png";
import picture5 from "@/assets/website/Mr. NAGESH PRABHU.jpg";


interface Milestone {
  year: number;
  title: string;
  description: string | string[];
  image: string;
}

const milestones: Milestone[] = [
  {
    year: 2015,
    title: 'Company Founded',
    description: [
      "MAY: Awarded the Kumbakonam biomining project for 1.3 lakh m³",
      "July: Invited by the Govt. of India, Ministry of Urban Development, to present in workshops for Swachh Survekshan 2017"
    ],
    image: img1
  },
  {
    year: 2016,
    title: 'First Major Client',
    description: [
      "April: Reclaims more than 4 acres in Kumbakonam,",
      "June: Bags orders in 20 municipalities of Tamil Nadu for supply of MSW plants and machineries.",
      "July: Awarded Frost & Sullivan 2016 Award.",
      "December: Reclaims more than 6 acres in Kumbakonam."
    ],
    image: img2
  },
  {
    year: 2017,
    title: 'International Expansion',
    description: [
      "May: Signs a joint venture with Forcebel, becoming Asia’s largest landfill mining company.",
      "July: Awarded biomining projects in Chennai – Sembakkam and Pammal.",
      "August: Awarded biomining project in Vijayawada.",
      "October: Awarded biomining project in Vadodara."
    ],
    image: img3
  },
  {
    year: 2018,
    title: 'Industry Recognition',
    description: [
      "April: Awarded biomining project in Chidambaram",
      "May: Awarded biomining project in Chennai – Poonamallee.",
      "June: Awarded biomining project in NOIDA.",
      "July: Awarded biomining project in Nagpur."
    ],
    image: img4
  },
  {
    year: 2019,
    title: 'Product Launch 2.0',
    description: [
      "January: Awarded biomining projects in Trichy & Erode.",
      "February: Hands over 4 acres of reclaimed land to Sembakkam Municipality.",
      "March: Awarded biomining project in Tirupati; reclaims 10.5 acres in Vadodara & 32.5 acres in Vijayawada."
    ],
    image: img5
  },
  {
    year: 2020,
    title: 'Pandemic Adaptation',
    description: [
      "January: Awarded biomining project in Visakhapatnam.",
      "June: Awarded biomining projects in Karaikudi & Karur.",
      "July: Hands over 4 acres of reclaimed land to NOIDA Authority.",
      "August: Awarded biomining project in NOIDA; reclaims 5 acres in Pammal.",
      "March :Blue Planet Environmental Solutions made a significant investment in Zigma Global Environ Solutions Awarde",
      "October: Awarded biomining projects in Cuddalore & Dindigul; hands over 2 acres of reclaimed land to Poonamallee Municipality. Perungudi Project."



    ],
    image: img6
  },
  {
    year: 2021,
    title: 'Strategic Acquisitions',
    description: [
      "February: Awarded biomining project in Chennai; hands over 6.2 acres of reclaimed land to NOIDA Municipality.",
      "September: Hands over 7 acres of reclaimed land to Erode Municipality.",
      "October: Hands over 4 acres of reclaimed land to Pammal Municipality.",
      "December: Hands over 10.5 acres of reclaimed land to Vadodara Municipality.",
      "Awarded 1st UT project - Puducherry"

    ],
    image: img7
  },
  {
    year: 2022,
    title: 'IPO Success',
    description: [
      "First ever private contract from ITC for Landfill Mining",
      "Awarded Project in Guwahati and opened gates in North East India"
    ],
    image: img8
  },
  {
    year: 2023,
    title: 'Sustainability Initiative',
    description: [
      "The Investment Fund for Developing Countries (IFU) has made a $35 million investment in Blue Planet Environmental Solutions for Zigma.",
      "Awarded Kodungaiyur Project in Chennai.",
      "MILESTONE of 400 ACRE ACHIEVED"


    ],
    image: img9
  },
  {
    year: 2024,
    title: 'AI Integration',
    description: [
      "December: Blue Planet was an Anchor Partner of the AVPN South Asia Summit 2024, which took place in Chennai, India, on December 9, 2024.",
      "Zigma moved in to their New State of Art Facility in Erode. a world class facility, also a CCC Control Command Centre. "

    ],
    image: img10
  },
  {
    year: 2025,
    title: 'Global Leadership',
    description: [
      "The Legendary Andhra Pradesh Cluster project was awarded",
      "Processing capacity increased to 30 thousand tons per day",
      "25 lakh tons of RDF coprocessed with Cement plants & Waste to Energy by October 2025",
      "ZIGMA complete a decade of working for the people for the Planet."

    ],
    image: img11
  }
];

const leaders = [
  {
    name: "Mr. Boopathy Dharmaraj",
    title: "Managing Director",
    image: picture1,
    linkedin: "#"
  },
  {
    name: "Mr. K.P Mutharasu",
    title: "Director",
    image: picture2,
    linkedin: "#"
  },
  {
    name: "Mr. Anand Thangaraj",
    title: "Director",
    image: picture3,
    linkedin: "#"
  },
  {
    name: "Mr. KU THA  ILANGOVAN",
    title: "Director",
    // image: picture4,
    linkedin: "#"
  },
  {
    name: "Mr. Nagesh Prabhu",
    title: "Director",
    image: picture5,
    linkedin: "#"
  }
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showFullCompany, setShowFullCompany] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(milestones.length - 1, prev + 1));
  };

  const handleYearClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === milestones.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const currentMilestone = milestones[currentIndex];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      {/* tw-line animation classes are in index.css */}
      <main className="scroll-pt-24 lg:scroll-pt-28">
        {/* Hero Section */}
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <div className="absolute inset-0 h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${hero})` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />
          <div className="relative container-main w-full pt-28 pb-20 text-white">
            <div className="max-w-2xl">
              <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium mb-4">
                Our Journey
              </div>
              <h1 className="text-5xl md:text-5xl font-bold leading-tight text-white">
                Milestones That Shaped Us
              </h1>

              <p className="mt-6 text-lg text-white/90 leading-relaxed">
                Explore the defining moments that transformed our vision into a global footprint.
                Each year marks a new chapter in growth, innovation, and impact.
              </p>
            </div>
          </div>
        </section>

        {/* Our Company */}
        <section className="section-padding min-h-screen bg-white scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main w-full h-full max-w-5xl">
            <div className="relative overflow-hidden shadow-2xl min-h-[320px] md:min-h-[420px]">
              <img
                src={company}
                alt="Our Company"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            </div>

            <div className="mt-8 h-full flex flex-col justify-start">
              <div className="text-sm tracking-[0.35em] uppercase text-slate-500 font-medium">
                Our Company
              </div>
              <h2 className="mt-3 text-3xl lg:text-2xl  font-bold  leading-tight">
                Zigma Global Environ Solutions Pvt. Ltd.
              </h2>
              <p className="mt-3 text-base lg:text-lg text-slate-600 leading-relaxed text-justify">
                Zigma was founded by a group of serial enterpreneurs from South India, experienced in
                manufacuring Steel, TMT Bars, Billets, UPVC Door and Window profiles,
                hospitality and IT infrastructure projects. On the quest for a worthy challenge came
                across the rising menace of waste mismanagement and realised that this was the
                opportunity to so something phenomenal that would benefit not only the community but the country at large.
              </p>
              {showFullCompany && (
                <p className="mt-3 text-base lg:text-lg text-slate-600 leading-relaxed text-justify">
                  After extensive research and travel to countries like Germany, South Africa, Thailand,
                  China and South Korea to understand how these countries manage their
                  Municipal Solid Waste (MSW), Zigma was founded, to solve the problem of legacy
                  waste management. At the core of our operations is a low carbon emission model for
                  segregation of legacy MSW dumped indiscriminately in the open dump yards in India today.
                </p>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => setShowFullCompany((prev) => !prev)}
                  className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-green-700 hover:text-green-700 transition-colors"
                >
                  {showFullCompany ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Organization */}
        {/* <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 px-6 lg:px-8 pt-10 pb-6 lg:pt-12 lg:pb-8 scroll-mt-24 lg:scroll-mt-28">
        <div className="max-w-4xl mx-auto w-full h-full flex items-center">
          <div className="w-full max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl px-6 py-7 lg:px-10 lg:py-9 space-y-5 min-h-[320px] flex flex-col justify-center">
            <div className="text-xs tracking-[0.35em] uppercase text-slate-500 font-medium">
              Organization
            </div>
            <h2
              className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight tw-line tw-delay-1"
              style={{ "--tw-duration": "4s", "--tw-steps": 80 } as React.CSSProperties}
            >
              Built For Scale And Accountability
            </h2>
            <p
              className="text-base lg:text-base text-slate-600 leading-relaxed tw-line tw-delay-2"
              style={{ "--tw-duration": "7s", "--tw-steps": 160 } as React.CSSProperties}
            >
              Since its inception, Zigma has come a long way by evolving and pioneering Landfill
              Mining across various Urban and Local Bodies in India. This approach has firmly positioned
              the organisation as one of the leading Landfill Mining companies of India and continues to further improve
              its reach and acceptance across represented geographies. Zigma is headquartered in Erode, Tamilnadu
              where it manages its all research, development and administration. The company operates twenty plants across in India.
            </p>
            <p
              className="text-sm lg:text-base text-slate-600 leading-relaxed tw-line tw-delay-3"
              style={{ "--tw-duration": "6s", "--tw-steps": 140 } as React.CSSProperties}
            >
              Zigmaites are guided by the passion to converge technology and knowledge together to
              empower solutions and embark upon a methodology which can resolve the waste menace
              constantly harassing the Urban/Local Bodies and the surrounding communities at large.
              Our ethos are built on the principle of valuing the 'values' and trust skill over shortcuts.
            </p>
          </div>
        </div>
      </section> */}

        {/* Milestones Content */}
        <section className="section-padding min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ">
          <div className="container-main w-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              {/* <div className="text-sm tracking-[0.35em] uppercase text-slate-500 font-medium">
              Our Journey So Far
            </div>
            <h2 className="mt-3 text-3xl lg:text-2xl  font-bold  leading-tight">
             Measurable Sustainability Progress
            </h2> */}

              <div>
                <span className="text-sm  uppercase tracking-[0.3em] text-muted-foreground">
                  Our Journey So Far
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                  Measurable Sustainability <span className="text-primary"> Progress</span>
                </h2>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <button
                  onClick={() => setIsAutoPlay((prev) => !prev)}
                  className="flex items-center gap-2 text-green-700 hover:text-green-700 transition-colors text-sm lg:text-base"
                >
                  {isAutoPlay ? (
                    <>
                      <Pause className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" />
                      <span className="font-medium">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" />
                      <span className="font-medium">Play</span>
                    </>
                  )}
                </button>
                <span className="text-slate-600 font-medium text-sm lg:text-base">
                  {milestones[0].year} - {milestones[milestones.length - 1].year}
                </span>
              </div>
            </div>

            {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch flex-1 justify-center">
              {/* Image Section */}
              <div className="relative">
                <div className="relative  overflow-hidden shadow-2xl aspect-[16/10]">
                  <img
                    src={currentMilestone.image}
                    alt={currentMilestone.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    {/* <div className="bg-white rounded-full px-3 py-1.5 shadow-lg">
                      <span className="text-lg lg:text-xl font-bold text-green-700">
                        {currentMilestone.year}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Content Section */}
            <div className="space-y-6 min-h-[360px] lg:min-h-[420px]">
              <div className="min-h-[250px] lg:min-h-[300px]">
                <div className="text-green-700 font-bold text-sm tracking-wider mb-2">
                  YEAR {currentMilestone.year}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                  {currentMilestone.title}
                </h3>
                {Array.isArray(currentMilestone.description) ? (
                  <ul className="text-sm lg:text-base text-slate-600 leading-relaxed list-disc pl-5 space-y-2 max-h-[170px] lg:max-h-[220px] overflow-y-auto pr-2">
                    {currentMilestone.description.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed max-h-[170px] lg:max-h-[220px] overflow-y-auto ">
                    {currentMilestone.description}
                  </p>
                )}
              </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-slate-300 flex items-center justify-center hover:border-green-700 hover:text-green-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-900"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex === milestones.length - 1}
                    className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-slate-300 flex items-center justify-center hover:border-green-700 hover:text-green-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-900"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-slate-600 font-medium text-sm">
                    {currentIndex + 1} / {milestones.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div >
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2" />
                <div
                  className="absolute top-1/2 left-0 h-0.5 bg-green-700 -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${(currentIndex / (milestones.length - 1)) * 100}%` }}
                />

                {/* Year Dots */}
                {milestones.map((milestone, index) => (
                  <button
                    key={milestone.year}
                    onClick={() => handleYearClick(index)}
                    className="relative z-10 flex flex-col items-center gap-3 group"
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex
                          ? 'bg-green-700 scale-150 shadow-lg shadow-green-700/50'
                          : index < currentIndex
                            ? 'bg-green-700'
                            : 'bg-slate-300'
                        } group-hover:scale-125`}
                    />
                    <span
                      className={`text-sm font-medium transition-colors ${index === currentIndex
                          ? 'text-green-700'
                          : 'text-slate-500 group-hover:text-slate-700'
                        }`}
                    >
                      {milestone.year}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Leaders */}
        <section className="section-padding min-h-screen bg-white scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main w-full h-full flex flex-col">
            {/* <div className="mb-12 text-center">
            <h3 className="text-base tracking-[0.35em] uppercase text-slate-500 font-medium">
              Meet Our Leaders
            </h3>
         
            <p className="text-base text-slate-600 mt-1 max-w-3xl mx-auto">
              A focused leadership group driving compliance, operational excellence, and sustainable growth across all projects.
            </p>
          </div> */}

            <div>
              <span className="text-sm  uppercase tracking-[0.3em] text-muted-foreground">
                Meet Our Leaders
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Leadership Driving Sustainable <span className="text-primary">Excellence</span>
              </h2>
            </div>

            <div className="mt-6 flex-1 min-h-0 ">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 place-items-center">
                {leaders.map((leader) => (
                  <div
                    key={leader.name + leader.title}
                    className="overflow-hidden  border-slate-200 bg-white shadow-[0_6px_14px_rgba(15,23,42,0.08)] w-full max-w-[200px]"
                  >
                    <div className="relative aspect-[4/5] min-h-[110px] bg-white p-1">
                      {leader.image ? (
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-3xl font-semibold text-slate-400">
                          {leader.name
                            .split(' ')
                            .slice(0, 2)
                            .map((word) => word[0])
                            .join('')}
                        </div>
                      )}
                      <a
                        href={leader.linkedin}
                        aria-label={`${leader.name} on LinkedIn`}
                        className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-[#0A66C2] border-2 border-[#0A66C2] hover:bg-white/80 transition"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <div className="px-3 py-2 text-center">
                      <div className="text-[12px] font-semibold text-slate-900">{leader.name}</div>
                      <div className="text-[11px] text-slate-600">{leader.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* contact */}
        <section className="container-main section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="text-center lg:text-left">
              <div className="text-sm tracking-[0.35em] uppercase text-slate-500 font-medium">
                Let Us Deliver Impact
              </div>
               <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
               Let us deliver impact for your <span className="text-primary">Organization</span>
              </h2>
              {/* <h3 className="mt-3 text-2xl lg:text-4xl font-bold text-slate-900">
                Let us deliver impact for your organization
              </h3> */}
              <p className="mt-6 text-sm text-slate-600 max-w-2xl lg:max-w-xl">
                Partner with Zigma to accelerate sustainable outcomes with proven expertise across large-scale projects.
              </p>
            </div>

            <form className="w-full max-w-md ml-auto border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <input
                  type="tel"
                  placeholder="Contact"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
                />
                <button
                  type="button"
                  className="mt-1 w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
