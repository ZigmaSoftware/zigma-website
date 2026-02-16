import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, CheckCircle2, Clock, ArrowRight, Eye } from "lucide-react";
import P1b from "@/assets/Before - After/1 kumbakonam b.jpg";
import P1a from "@/assets/Before - After/1 kumbakonam_A.jpg";
import P2b from "@/assets/Before - After/2 sembakam_B.jpg";
import P2a from "@/assets/Before - After/2 sembakam_A.jpg";
import P3b from "@/assets/Before - After//3 noida_B.jpg";
import P3a from "@/assets/Before - After/3 noida_A.jpg";
import P4b from "@/assets/Before - After/4 atladara_B.jpg";
import P4a from "@/assets/Before - After/4 atladara_A.jpg";
import P5b from "@/assets/Before - After/5 poonamallee_B.jpg";
import P5a from "@/assets/Before - After/5 poonamallee_A.jpg";
import P6b from "@/assets/Before - After/6 vijawada_B.jpg";
import P6a from "@/assets/Before - After/6 vijawada_A.jpg";
import P7b from "@/assets/Before - After/7 vairapalayam_B.jpg";
import P7a from "@/assets/Before - After/7 vairapalayam_A.jpg";
import P8b from "@/assets/Before - After/8 pammal_B.jpg";
import P8a from "@/assets/Before - After/8 pammal_A.jpg";
import P9b from "@/assets/Before - After/9 noida_B.jpg";
import P9a from "@/assets/Before - After/9 noida_A.jpg";
import P10b from "@/assets/Before - After/10 tirupathi_B.jpg";
import P10a from "@/assets/Before - After/10 tirupathi_A.jpg";
import P11b from "@/assets/Before - After/11 chidambaram_B.jpg";
import P11a from "@/assets/Before - After/11 chidambaram_A.jpg";
import P12b from "@/assets/Before - After/12 pallavaram_B.jpg";
import P12a from "@/assets/Before - After/12 pallavaram_A.jpg";
import P13b from "@/assets/Before - After/13 karaikudi_B.jpg";
import P13a from "@/assets/Before - After/13 karaikudi_A.jpg";
import P14b from "@/assets/Before - After/14 karur_B.jpg";
import P14a from "@/assets/Before - After/14 karur_A.jpg";
import P15b from "@/assets/Before - After/15noida_B.jpg";
import P15a from "@/assets/Before - After/15 noida_A.jpg";

const completedProjects = [
  {
    id: 1,
    title: "Delhi Landfill Reclamation",
    location: "Delhi, India",
    year: "2023",
    description: "Successful reclamation of 50 acres of landfill land, processing over 2 million tons of legacy waste.",
    impact: "Land cleared for urban development",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
    stats: { waste: "2M tons", land: "50 acres", recovery: "75%" }
  },
  {
    id: 2,
    title: "Gurugram Waste Mining",
    location: "Gurugram, Haryana",
    year: "2022",
    description: "Mining and processing of 15-year-old legacy waste dump, recovering valuable materials.",
    impact: "80% waste diverted from landfill",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    stats: { waste: "1.5M tons", land: "35 acres", recovery: "80%" }
  },
  {
    id: 3,
    title: "Hyderabad Landfill Remediation",
    location: "Hyderabad, Telangana",
    year: "2021",
    description: "Complete remediation of contaminated landfill site with groundwater treatment.",
    impact: "Environmental restoration achieved",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600",
    stats: { waste: "800K tons", land: "25 acres", recovery: "70%" }
  },
  {
    id: 4,
    title: "Pune Bio-mining Project",
    location: "Pune, Maharashtra",
    year: "2023",
    description: "Bio-mining operations at Uruli-Devachi landfill site with material recovery.",
    impact: "70% material recovery rate",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600",
    stats: { waste: "1.2M tons", land: "40 acres", recovery: "70%" }
  },
  {
    id: 5,
    title: "Ahmedabad Legacy Waste",
    location: "Ahmedabad, Gujarat",
    year: "2020",
    description: "Comprehensive landfill mining and site remediation for the municipal corporation.",
    impact: "Site converted to green space",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600",
    stats: { waste: "600K tons", land: "20 acres", recovery: "65%" }
  },
  {
    id: 6,
    title: "Jaipur Dumpsite Clearance",
    location: "Jaipur, Rajasthan",
    year: "2019",
    description: "Complete clearance and remediation of 30-year-old municipal dumpsite.",
    impact: "Land reclaimed for public use",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    stats: { waste: "900K tons", land: "28 acres", recovery: "68%" }
  },
];

const ongoingProjects = [
  {
    id: 1,
    title: "Bangalore Municipal Project",
    location: "Bangalore, Karnataka",
    year: "2024",
    description: "Large-scale landfill management and biomining project for Bangalore municipality.",
    progress: 65,
    expectedCompletion: "2025",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
    stats: { target: "100+ acres", processed: "60 acres", timeline: "18 months" }
  },
  {
    id: 2,
    title: "Chennai Wet Waste Processing",
    location: "Chennai, Tamil Nadu",
    year: "2024",
    description: "Establishing wet waste processing facility serving 500,000 households.",
    progress: 45,
    expectedCompletion: "2025",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600",
    stats: { target: "200 TPD", processed: "90 TPD", timeline: "12 months" }
  },
  {
    id: 3,
    title: "Mumbai Landfill Reclamation",
    location: "Mumbai, Maharashtra",
    year: "2024",
    description: "Massive urban landfill reclamation project in partnership with BMC.",
    progress: 30,
    expectedCompletion: "2026",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600",
    stats: { target: "150 acres", processed: "45 acres", timeline: "24 months" }
  },
  {
    id: 4,
    title: "Kolkata Bio-mining Initiative",
    location: "Kolkata, West Bengal",
    year: "2024",
    description: "Bio-mining and material recovery from legacy waste dumpsites.",
    progress: 55,
    expectedCompletion: "2025",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600",
    stats: { target: "80 acres", processed: "44 acres", timeline: "15 months" }
  },
];

type TabType = "completed" | "ongoing";

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<TabType>(
    tabParam === "ongoing" ? "ongoing" : "completed"
  );

  // Sync URL → state
  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "ongoing" || t === "completed") {
      setActiveTab(t);
    }
  }, [searchParams]);

  // Sync state → URL
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Tab Navigation */}
        <section className="py-8 bg-background sticky top-20 z-40 border-b border-border">
          <div className="container-main">
            <div className="flex justify-center">
              <div className="inline-flex bg-muted p-1.5 rounded-xl">
                <button
                  onClick={() => handleTabChange("completed")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "completed"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Completed Projects
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === "completed" ? "bg-primary-foreground/20" : "bg-primary/20 text-primary"
                  }`}>
                    {completedProjects.length}
                  </span>
                </button>
                <button
                  onClick={() => handleTabChange("ongoing")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === "ongoing"
                      ? "bg-accent text-accent-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  Ongoing Projects
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === "ongoing" ? "bg-accent-foreground/20" : "bg-accent/20 text-accent"
                  }`}>
                    {ongoingProjects.length}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-main">
            {activeTab === "completed" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                {completedProjects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="group bg-card rounded-2xl border border-border overflow-hidden card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Completed
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-primary" /> {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-primary" /> {project.year}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted rounded-xl">
                        <div className="text-center">
                          <span className="block text-sm font-bold text-primary">{project.stats.waste}</span>
                          <span className="text-xs text-muted-foreground">Processed</span>
                        </div>
                        <div className="text-center border-x border-border">
                          <span className="block text-sm font-bold text-primary">{project.stats.land}</span>
                          <span className="text-xs text-muted-foreground">Land</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-sm font-bold text-primary">{project.stats.recovery}</span>
                          <span className="text-xs text-muted-foreground">Recovery</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-primary uppercase">Impact</span>
                          <p className="text-foreground text-sm mt-1">{project.impact}</p>
                        </div>
                        <Button asChild size="sm" variant="outline" className="group/btn">
                          <Link to={`/projects/${project.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                {ongoingProjects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className="group bg-card rounded-2xl border border-border overflow-hidden card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="grid lg:grid-cols-2">
                      <div className="relative h-64 lg:h-full overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30 lg:block hidden" />
                      </div>
                      <div className="p-6 lg:p-8">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/20 text-accent rounded-full text-xs font-semibold mb-4">
                          <Clock className="w-3.5 h-3.5" />
                          In Progress
                        </span>
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-accent" /> {project.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-accent" /> Started {project.year}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-5">{project.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-5">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">Progress</span>
                            <span className="text-sm font-bold text-accent">{project.progress}%</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-1000"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 p-3 bg-muted rounded-xl mb-4">
                          <div className="text-center">
                            <span className="block text-sm font-bold text-accent">{project.stats.target}</span>
                            <span className="text-xs text-muted-foreground">Target</span>
                          </div>
                          <div className="text-center border-x border-border">
                            <span className="block text-sm font-bold text-accent">{project.stats.processed}</span>
                            <span className="text-xs text-muted-foreground">Done</span>
                          </div>
                          <div className="text-center">
                            <span className="block text-sm font-bold text-accent">{project.stats.timeline}</span>
                            <span className="text-xs text-muted-foreground">Timeline</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground">Expected Completion:</span>
                          <span className="ml-2 text-sm font-bold text-accent">{project.expectedCompletion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
