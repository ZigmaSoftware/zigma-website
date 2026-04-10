import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FullScreenSlider from "./Fullscreenslider";

import Award1 from "@/assets/Awards/award1.jpg";
import Award2 from "@/assets/Awards/award2.jpg";
import Award3 from "@/assets/Awards/award3.jpg";
import Award4 from "@/assets/Awards/award4.jpg";
import Award5 from "@/assets/Awards/award5.jpg";
import Award6 from "@/assets/Awards/award6.jpg";
import Award7 from "@/assets/Awards/award7.jpg";
import Award8 from "@/assets/Awards/award8.jpg";
import Award9 from "@/assets/Awards/award9.jpg";
import Award10 from "@/assets/Awards/award10.jpg";
import Award11 from "@/assets/Awards/award11.png";
import Award12 from "@/assets/Awards/award12_Swachha Andhra.png";

// import  Awardvd from "@/assets/Awards/Swachh Andhra Award 2025.mp4";
import awdbg from "@/assets/website/hero/award-bg.jpeg";

type Award = {
  id: string;
  title: string;
  org: string;
  year: number;
  category: "Sustainability" | "Operations" | "Innovation" | "Corporate";
  img: string;
  highlight?: boolean;
  desc: string;
};

type Metric = {
  label: string;
  value: string;
  helper: string;
};

const awards: Award[] = [
  {
    id: "a1",
    title: "Excellence in Managing Municipal Solid Waste",
    org: "Confederation of Indian Industry (CII)",
    year: 2020,
    category: "Corporate",
    img: Award1,
    highlight: true,
    desc:
      "Awarded for exemplary performance in municipal solid waste (MSW) management and leadership in sustainable waste solutions.",
  },
  {
    id: "a2",
    title: "Indian Leadership Award for Industrial Development",
    org: "All India Achievers Foundation",
    year: 2017,
    category: "Innovation",
    img: Award2,
    desc:
      "Presented in recognition of leadership and contribution to industrial development at the National Seminar on Individual Achievements and National Development.",
  },
  {
    id: "a3",
    title: "Trees for Tigers - Bountiful Tree Recognition",
    org: "Geocycle",
    year: 2019,
    category: "Corporate",
    img: Award3,
    desc:
      "Honoured for environmental conservation contribution through the Trees for Tigers initiative near Sariska Tiger Reserve, Alwar, Rajasthan.",
  },
  {
    id: "a4",
    title: "India Sustainable Waste Management Technology Innovation Award",
    org: "Frost & Sullivan",
    year: 2016,
    category: "Sustainability",
    img: Award4,
    desc:
      "Presented for pioneering innovation in sustainable waste management technologies and excellence in technology-driven environmental solutions.",
  },
  {
    id: "a5",
    title: "Award for Excellence",
    org: "Municipalika & CAPEX",
    year: 2017,
    category: "Sustainability",
    img: Award5,
    desc:
      "Awarded for participation in Municipalika and CAPEX 2017, the 14th International Exhibition on Smart and Sustainable City Solutions.",
  },
  {
    id: "a6",
    title: "SKOCH Award - Corporate Silver",
    org: "SKOCH Group",
    year: 2017,
    category: "Operations",
    img: Award6,
    desc:
      "Awarded for excellence in municipal solid waste landfill mining and impactful corporate performance.",
  },
  {
    id: "a7",
    title: "Best Practices Award - Sustainable Waste Management Technology Innovation",
    org: "Frost & Sullivan",
    year: 2016,
    category: "Sustainability",
    img: Award7,
    desc:
      "Recognized for innovation and best practices in sustainable waste management through advanced scalable technologies.",
  },
  {
    id: "a8",
    title: "Indian Leadership Award for Industrial Development",
    org: "All India Achievers Foundation",
    year: 2017,
    category: "Sustainability",
    img: Award8,
    desc:
      "Presented to Nagesh Prabhu C., Director - Zigma Global Environ Solutions Pvt. Ltd., for exemplary leadership and industrial impact.",
  },
  {
    id: "a9",
    title: "Vijayawada Municipal Corporation - Best Performance Awards",
    org: "Vijayawada Municipal Corporation",
    year: 2019,
    category: "Corporate",
    img: Award9,
    desc:
      "Recognized for outstanding organizational and individual performance in municipal services including project leadership excellence.",
  },
  {
    id: "a10",
    title: "Memento - Appreciation of Participation",
    org: "Good Governance India Foundation",
    year: 2017,
    category: "Operations",
    img: Award10,
    desc:
      "Presented for participation at the 14th International Conference and Exhibition on Smart and Sustainable City Solutions.",
  },
  {
    id: "a11",
    title: "Green Innovation Award",
    org: "Services Export Promotion Council (SEPC)",
    year: 2025,
    category: "Operations",
    img: Award11,
    desc:
      "Honoured at the National Conclave on Environmental Services for driving green innovation and sustainability-focused solutions.",
  },
  {
    id: "a12",
    title: "State Level Award",
    org: "Government of Andhra Pradesh (Swachha Andhra Initiative)",
    year: 2025,
    category: "Corporate",
    img: Award12,
    desc:
      "Recognized for outstanding operational performance and service delivery under major municipal solid waste programs.",
  },
];

const metrics: Metric[] = [
  {
    label: "Total Awards",
    value: `${awards.length}`,
    helper: "Across corporate, sustainability, operations, and innovation",
  },
  {
    label: "Years Recognized",
    value: "2016-2025",
    helper: "A decade of verified industry recognition",
  },
  {
    label: "Highlighted Wins",
    value: `${awards.filter((award) => award.highlight).length}`,
    helper: "Top-tier awards based on peer and program recognition",
  },
  {
    label: "Award Categories",
    value: "4",
    helper: "Corporate, sustainability, innovation, and operations",
  },
];

export default function AwardsandRecognition(): JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Header />

      <main className="scroll-pt-24">
        <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={awdbg}
            alt="Awards background"
          />
          {/* <div className="absolute inset-0 bg-black/45" aria-hidden="true" /> */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium">Industry Recognition</div>
            <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">Awards And Honors</h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl text-center">
              Proven excellence across sustainability, operations, and large-scale environmental projects delivered across India.
            </p>
          </div>
        </section>



        {/* <section className="section-padding bg-white scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Recognition Snapshot</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Performance Backed By <span className="text-primary">Awards</span>
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{metric.helper}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Awards Interactive Slider */}
        <section className="section-padding bg-white scroll-mt-24 lg:scroll-mt-28">
          <div className="container-main">
            <div className="text-center mb-8">
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Awards Showcase</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Our <span className="text-primary">Achievements</span>
              </h2>
              <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
                Browse through our collection of certifications and industry recognitions
              </p>
            </div>
            <div className="mt-8">
              <FullScreenSlider />
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}
