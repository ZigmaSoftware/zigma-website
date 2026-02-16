import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import bg1 from "@/assets/bamboo-forest-china.jpg";
import bg2 from "@/assets/eco-friendly-environment-bamboo-tube-straws-background.jpg";
import bg3 from "@/assets/nature-background-green-foliage-bamboo-leaves-with-bokeh-sunlight.jpg"
import picture1 from "@/assets/Office Img/IT department  floor.jpeg";
import picture2 from "@/assets/Office Img/Admin & Finance department floor.jpeg";
import picture3 from "@/assets/Office Img/HR, Tender Department floor.jpeg";

import people1 from "@/assets/people at zigma/Picture1.png";
import people2 from "@/assets/people at zigma/Picture2.png";
import people3 from "@/assets/people at zigma/Picture3.png";
import people4 from "@/assets/people at zigma/image  rm.jpg";
import people5 from "@/assets/people at zigma/image cdb.jpg";
import people6 from "@/assets/people at zigma/image cej.jpg";
import people7 from "@/assets/people at zigma/image dcd.jpg";
import people8 from "@/assets/people at zigma/image frhb.jpg";
import people9 from "@/assets/people at zigma/image frhb.jpg";  
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Heart, 
  Leaf, 
  TrendingUp,
  GraduationCap,
  Award,
  Coffee,
  Send,
  ChevronRight,
  Building2,
  Check
} from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Environmental Engineer/ Officer",
    department: "Operations",
    location: "Guwahati, Puducherry, Tirupati, Chittoor, Trichy",
    type: "Full-time",
    Qualifications: "BE/ME - Environmental Engineering, B.Sc/M.Sc - Environmental Science, Chemistry",
    experience: "0-3 years",
    description: "Lead environmental assessment and remediation projects for landfill sites.",
    responsibilities: [
      "Conduct environmental impact assessments",
      "Design and implement remediation strategies",
      "Monitor compliance with environmental regulations",
      "Prepare technical reports and documentation"
    ]
  
  },
  {
    id: 2,
    title: "Project Engineer",
    department: "Project Management",
    location: "Chennai, Chittoor, Srikalasti, Nellore,Guwahati, Tirupati, Visakhapatnam",
    type: "Full-time",
    Qualifications: "Diploma / B.E. in: Any Specialization",
    experience: "2-4 years",
    description: "Manage large-scale waste management and landfill reclamation projects.",
    responsibilities: [
      "Oversee project planning and execution",
      "Manage project budgets and timelines",
      "Coordinate with stakeholders and clients",
      "Lead cross-functional project teams"
    ]
  },
  {
    id: 3,
    title: "Machine Operator",
    department: "Field Operations",
    location: "Pan India (Multiple Sites)",
    type: "Full-time",
    Qualifications: [
      "Electrical installation, maintenance, and troubleshooting",
      "Handling LT panels, motors, pumps, and control wiring",
      "Routine inspection and preventive maintenance",
      "Compliance with safety and electrical standards",
      "Support site operations with minimal downtime"
    ],
    experience: "0-5 years",
    description: "Operate heavy machinery for landfill mining and waste processing.",
    responsibilities: [
      "Operate excavators and loaders",
      "Perform routine maintenance checks",
      "Follow safety protocols and guidelines",
      "Report equipment issues promptly"
    ]
  },
  {
    id: 4,
    title: "Stores Executive",
    department: "Stores & Logistics",
    location: "Puducherry, Kodungaiyur(Chennai)",  
    type: "Full-time",
    Qualifications: " Any degree",
    experience: "0-3 years",
    description: "Manage receipt, storage, and issue of materials , Maintain stock registers and ERP entries",
    responsibilities: [
      "Monitor inventory levels and trigger re-order actions",
      "Coordinate with procurement, site, and logistics teams",
      "Ensure FIFO, material tagging, and stock audits",
      " Maintain store hygiene, safety, and compliance standards"
    ]
  },
  
  // {
  //   id: 5,
  //   title: "Lab Technician",
  //   department: "Quality Control",
  //   location: "Chennai",
  //   type: "Full-time",
  //   experience: "1-3 years",
  //   description: "Conduct laboratory analysis of soil and waste samples.",
  //   responsibilities: [
  //     "Perform chemical and physical tests",
  //     "Maintain laboratory equipment",
  //     "Document and report test results",
  //     "Ensure quality control standards"
  //   ]
  // },
  // {
  //   id: 6,
  //   title: "Site Supervisor",
  //   department: "Field Operations",
  //   location: "Pune",
  //   type: "Full-time",
  //   experience: "4-6 years",
  //   description: "Supervise daily operations at landfill mining sites.",
  //   responsibilities: [
  //     "Manage on-site workforce",
  //     "Ensure safety compliance",
  //     "Monitor project progress",
  //     "Coordinate with project managers"
  //   ]
  // },
];

const benefits = [
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive health coverage for you and your family"
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Continuous training and skill development programs"
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear career progression paths and promotion opportunities"
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible working hours and paid time off"
  },
  {
    icon: Award,
    title: "Performance Bonus",
    description: "Annual performance-based bonuses and incentives"
  },
  {
    icon: Leaf,
    title: "Green Impact",
    description: "Make a real difference for the environment every day"
  },
];

const teamAvatarsBase = [
  { name: "Ava", role: "Engineering", src: people1 },
  { name: "Liam", role: "Operations", src: people2 },
  { name: "Noah", role: "Field Ops", src: people3 },
  { name: "Mia", role: "Design", src: people4 },
  { name: "Ethan", role: "PMO", src: people5 },
  { name: "Zoe", role: "Quality", src: people6 },
  { name: "Omar", role: "Compliance", src: people7 },
  { name: "Ria", role: "People", src: people8 },
  { name: "Arjun", role: "R&D", src: people9 },
];
const teamAvatars = [
  ...teamAvatarsBase,
  ...teamAvatarsBase,
  ...teamAvatarsBase,
  ...teamAvatarsBase,
  ...teamAvatarsBase,
  ...teamAvatarsBase,
];

const spotlightRowCounts = [16, 18, 20, 18, 16];
const spotlightPlaceholderCounts = [4, 4, 5, 4, 4];

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [activeAvatarIndex, setActiveAvatarIndex] = useState<number>(0);
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ensure initial styles are painted before animating.
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                entry.target.classList.add("reveal-in");
                observer.unobserve(entry.target);
              });
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const totalAvatars = spotlightRowCounts.reduce((sum, value) => sum + value, 0);
    if (totalAvatars === 0) return;

    const intervalId = setInterval(() => {
      setActiveAvatarIndex((prev) => {
        let next = Math.floor(Math.random() * totalAvatars);
        if (totalAvatars > 1 && next === prev) {
          next = (next + 1) % totalAvatars;
        }
        return next;
      });
    }, 1400);

    return () => clearInterval(intervalId);
  }, []);

  const departments = ["all", ...new Set(jobOpenings.map(job => job.department))];
  const locations = ["all", ...new Set(jobOpenings.map(job => job.location))];
  const filteredJobs = jobOpenings.filter((job) => {
    const departmentMatch = selectedDepartment === "all" || job.department === selectedDepartment;
    const locationMatch = selectedLocation === "all" || job.location === selectedLocation;
    return departmentMatch && locationMatch;
  });

  const toggleJobDetails = (jobId: number) => {
    setExpandedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Animation classes are in index.css */}
        {/* Hero Section */}
        <section className="bg-background" id="overview">
          <div className="container-main py-0 md:py-0 space-y-0">
            <div
              className="relative overflow-hidden border border-border"
              style={{ backgroundImage: `url(${bg1})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div
                className="absolute inset-0 bg-black/35"
                aria-hidden="true"
              />
              <div
                className="relative z-10 grid min-h-screen items-center gap-10 px-6 py-16 md:px-12 lg:grid-cols-[1.1fr_1fr] reveal hero-block"
                data-reveal
              >
                <div className="space-y-4 hero-text">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    Careers
                  </h1>
                  <p className="text-white/80 max-w-xl text-lg">
                    Join Zigma to build sustainable infrastructure, solve real-world challenges, and grow with a team
                    that values craft, safety, and impact.
                  </p>
                </div>
                <div className="relative h-72 md:h-96 lg:h-[28rem] reveal hero-visual" data-reveal>
                  <div className="relative h-full overflow-hidden shadow-2xl ring-1 ring-black/10 [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]">
                    <img src={picture1} alt="Office environment" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative overflow-hidden border border-border"
              style={{ backgroundImage: `url(${bg2})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div
                className="absolute inset-0 bg-black/35"
                aria-hidden="true"
              />
              <div
                className="relative z-10 grid min-h-screen items-center gap-10 px-6 py-16 md:px-12 lg:grid-cols-[1.1fr_1fr] reveal hero-block hero-swap"
                data-reveal
              >
                <div className="space-y-4 lg:order-2 hero-text">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    Grow With Us
                  </h2>
                  <p className="text-white/80 max-w-xl text-lg">
                    Learn on the job, take on meaningful responsibility, and shape projects that serve communities.
                  </p>
                </div>
                <div className="relative h-72 md:h-96 lg:h-[28rem] lg:order-1 reveal hero-visual" data-reveal>
                  <div className="relative h-full overflow-hidden shadow-2xl ring-1 ring-black/10 [clip-path:polygon(8%_0%,92%_0%,100%_50%,92%_100%,8%_100%,0%_50%)]">
                    <img src={picture2} alt="Finance and admin team" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative overflow-hidden border border-border"
              style={{ backgroundImage: `url(${bg3})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div
                className="absolute inset-0 bg-black/35"
                aria-hidden="true"
              />
              <div
                className="relative z-10 grid min-h-screen items-center gap-10 px-6 py-16 md:px-12 lg:grid-cols-[1.1fr_1fr] reveal hero-block"
                data-reveal
              >
                <div className="space-y-4 hero-text">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    Work With Purpose
                  </h2>
                  <p className="text-white/80 max-w-xl text-lg">
                    Make measurable environmental impact through engineering, operations, and innovation.
                  </p>
                </div>
                <div className="relative h-72 md:h-96 lg:h-[28rem] reveal hero-visual" data-reveal>
                  <div className="relative h-full overflow-hidden shadow-2xl ring-1 ring-black/10 [clip-path:polygon(0%_0%,100%_0%,100%_85%,85%_100%,0%_100%)]">
                    <img src={picture3} alt="HR and tender department" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Quick Nav */}
        {/* <section className="bg-background/80 backdrop-blur sticky top-20 z-20 border-b border-border">
          <div className="container-main py-3 flex flex-wrap items-center gap-3 text-sm font-medium">
            <a href="#overview" className="px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted transition-colors">
              Overview
            </a>
            <a href="#culture" className="px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted transition-colors">
              Culture
            </a>
            <a href="#openings" className="px-3 py-1.5 rounded-full bg-muted/60 hover:bg-muted transition-colors">
              Open Roles
            </a>
          </div>
        </section> */}

        {/* Hero Section */}
        {/* <section className="section-dark-bg py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="container-main text-center relative z-10">

             <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Briefcase className="mr-2 h-5 w-5" /> Join Our Team
              </Button>
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
              Careers at ZIGMA
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-8">
              Build a meaningful career while making a positive impact on the environment. 
              Join us in creating a cleaner, greener future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Briefcase className="mr-2 h-5 w-5" /> View Openings
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn About Culture
              </Button>
            </div>
          </div>
        </section> */}

        {/* Stats
        <section className="py-12 border-b border-border bg-card">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-4">
                <span className="text-4xl lg:text-5xl font-bold text-primary">500+</span>
                <p className="text-muted-foreground mt-2 font-medium">Team Members</p>
              </div>
              <div className="p-4">
                <span className="text-4xl lg:text-5xl font-bold text-primary">15+</span>
                <p className="text-muted-foreground mt-2 font-medium">Locations</p>
              </div>
              <div className="p-4">
                <span className="text-4xl lg:text-5xl font-bold text-accent">95%</span>
                <p className="text-muted-foreground mt-2 font-medium">Employee Satisfaction</p>
              </div>
              <div className="p-4">
                <span className="text-4xl lg:text-5xl font-bold text-primary">40%</span>
                <p className="text-muted-foreground mt-2 font-medium">Women in Leadership</p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Why Join Us */}
        {/* <section className="section-padding section-alt-bg">
          <div className="container-main">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Why Join Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Benefits & Perks
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We believe in taking care of our team so they can take care of our planet.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="group bg-card p-6 rounded-2xl border border-border card-hover"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Team Spotlight */}
        <section className="section-padding" id="culture">
          <div className="container-main text-center">
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground mb-2 reveal"
              data-reveal
            >
              Join a team of builders.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto reveal" data-reveal>
              We're looking for highly ambitious and talented people to help us drive real change.
            </p>

            <div className="relative mt-10 mb-10 flex justify-center reveal" data-reveal>
              <div
                className="w-full max-w-5xl h-48 md:h-56 rounded-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, hsl(var(--muted-foreground) / 0.25) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 max-w-5xl">
                  {spotlightRowCounts.map((count, rowIndex) => {
                    const startIndex = spotlightRowCounts
                      .slice(0, rowIndex)
                      .reduce((sum, value) => sum + value, 0);
                    const placeholderCount = spotlightPlaceholderCounts[rowIndex] ?? 2;
                    return (
                      <div key={`row-${rowIndex}`} className="flex justify-center gap-1.5">
                        {Array.from({ length: placeholderCount }).map((_, index) => (
                          <div
                            key={`ph-left-${rowIndex}-${index}`}
                            className="w-8 h-8 md:w-7 md:h-7 rounded-full avatar-placeholder"
                            aria-hidden="true"
                          />
                        ))}
                        {Array.from({ length: count }).map((_, index) => {
                          const avatarIndex = startIndex + index;
                          const person = teamAvatars[avatarIndex % teamAvatars.length];
                          const isActive = avatarIndex === activeAvatarIndex;
                          return (
                            <div
                              key={`${person.name}-${startIndex + index}`}
                              className={`group avatar-item w-8 h-8 md:w-7 md:h-7 rounded-full overflow-hidden shadow-sm ring-1 ring-transparent hover:scale-110 hover:ring-primary/40 hover:shadow-md ${isActive ? "avatar-active" : ""}`}
                              aria-label={`${person.name} from ${person.role}`}
                              title={`${person.name} - ${person.role}`}
                            >
                              <img
                                src={person.src}
                                alt={`${person.name} portrait`}
                                className={`avatar-img w-full h-full object-cover opacity-70 group-hover:opacity-100 ${isActive ? "opacity-100" : ""}`}
                                loading="lazy"
                              />
                            </div>
                          );
                        })}
                        {Array.from({ length: placeholderCount }).map((_, index) => (
                          <div
                            key={`ph-right-${rowIndex}-${index}`}
                            className="w-8 h-8 md:w-7 md:h-7 rounded-full avatar-placeholder"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
              "I'm proud to be part of a team creating such a thoughtfully crafted product, centered on our customer
              experiences."
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-foreground">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-accent" />
              <span className="font-semibold">Zigma</span>
              <span className="text-muted-foreground">- Our Organization</span>
            </div>
          </div>
        </section>


        {/* Job Openings */}
        <section className="section-padding section-alt-bg" id="openings">
          <div className="container-main">
            <div className="text-center mb-12">
              {/* <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Open Positions
              </span> */}
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Explore Our Roles
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Filter by team or location to find the right opportunity.
              </p>
            </div>

            <div className="grid lg:grid-cols-[320px_1fr] gap-8">
              <div className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Refine Your Search
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Department
                    </label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept === "all" ? "All Departments" : dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc === "all" ? "All Locations" : loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredJobs.length}</span> roles match your filters.
                  </div>
                  <button
                    className="w-full px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-lg hover:text-foreground hover:border-primary/40 hover:bg-muted/40 transition-colors"
                    onClick={() => {
                      setSelectedDepartment("all");
                      setSelectedLocation("all");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-card border border-border rounded-2xl p-6 transition-all hover:shadow-lg hover:border-primary/40"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 text-sm text-primary font-medium">
                          <Building2 className="w-4 h-4" />
                          {job.department}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" /> {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" /> {job.type}
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
                            <Briefcase className="w-3.5 h-3.5" /> {job.experience}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{job.description}</p>
                        {expandedJobs.has(job.id) && (
                          <>
                            {job.Qualifications && (
                              <div className="mb-3 flex flex-col gap-2 text-sm">
                                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                  Qualification
                                </span>
                                {Array.isArray(job.Qualifications) ? (
                                  <ul className="space-y-1.5 text-muted-foreground">
                                    {job.Qualifications.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/70" />
                                        <span className="text-foreground/90">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="text-foreground/90">{job.Qualifications}</span>
                                )}
                              </div>
                            )}
                            <div className="mt-4 rounded-xl border border-border/80 bg-muted/30 p-3">
                              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                Responsibilities
                              </p>
                              <ul className="space-y-2">
                                {job.responsibilities.slice(0, 3).map((resp, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                                      <Check className="h-3 w-3" />
                                    </span>
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 min-w-[160px]">
                        <Button className="w-full">
                          <Send className="mr-2 h-4 w-4" /> Apply Now
                        </Button>
                        <button
                          className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                          onClick={() => toggleJobDetails(job.id)}
                        >
                          {expandedJobs.has(job.id) ? "Hide Details" : "View Details"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12 bg-card border border-border rounded-2xl">
                    <p className="text-muted-foreground text-lg">
                      No positions match your filters. Try adjusting your selection.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="section-padding section-dark-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2),transparent_60%)]" />
          <div className="container-main text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Don't See Your Perfect Role?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals. Send us your resume and 
              we'll reach out when a suitable position opens up.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="mr-2 h-5 w-5" /> Submit Your Resume
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;



