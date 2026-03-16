import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import bg from "@/assets/background-1.png";
import picture1 from "@/assets/website/war room.jpeg";

import {
  Briefcase,
  MapPin,
  Clock,
  Send,
  Building2,
  Check,
  Upload
} from "lucide-react";

import { toast } from "sonner";

/* ---------------- JOB DATA ---------------- */

const jobOpenings = [
  {
    id: 1,
    title: "Environmental Engineer/ Officer",
    department: "Operations",
    location: "Guwahati, Puducherry, Tirupati, Chittoor, Trichy",
    type: "Full-time",
    Qualifications:
      "BE/ME - Environmental Engineering, B.Sc/M.Sc - Environmental Science, Chemistry",
    experience: "0-3 years",
    description:
      "Lead environmental assessment and remediation projects for landfill sites.",
    responsibilities: [
      "Conduct environmental impact assessments",
      "Design and implement remediation strategies",
      "Monitor compliance with environmental regulations",
      "Prepare technical reports and documentation",
    ],
  },
  {
    id: 2,
    title: "Project Engineer",
    department: "Project Management",
    location:
      "Chennai, Chittoor, Srikalasti, Nellore, Guwahati, Tirupati, Visakhapatnam",
    type: "Full-time",
    Qualifications: "Diploma / B.E. in: Any Specialization",
    experience: "2-4 years",
    description:
      "Manage large-scale waste management and landfill reclamation projects.",
    responsibilities: [
      "Oversee project planning and execution",
      "Manage project budgets and timelines",
      "Coordinate with stakeholders and clients",
      "Lead cross-functional project teams",
    ],
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
      "Support site operations with minimal downtime",
    ],
    experience: "0-5 years",
    description:
      "Operate heavy machinery for landfill mining and waste processing.",
    responsibilities: [
      "Operate excavators and loaders",
      "Perform routine maintenance checks",
      "Follow safety protocols and guidelines",
      "Report equipment issues promptly",
    ],
  },
  {
    id: 4,
    title: "Stores Executive",
    department: "Stores & Logistics",
    location: "Puducherry, Kodungaiyur(Chennai)",
    type: "Full-time",
    Qualifications: "Any degree",
    experience: "0-3 years",
    description:
      "Manage receipt, storage, and issue of materials, maintain stock registers and ERP entries.",
    responsibilities: [
      "Monitor inventory levels",
      "Coordinate with procurement and logistics teams",
      "Ensure FIFO and stock audits",
      "Maintain store hygiene and compliance",
    ],
  },
];

/* ---------------- FORM STATE ---------------- */

const initialApplicationForm = {
  fullName: "",
  email: "",
  phone: "",
  coverLetter: "",
};

/* ---------------- COMPONENT ---------------- */

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const [selectedJob, setSelectedJob] =
    useState<(typeof jobOpenings)[number] | null>(null);

  const [applicationForm, setApplicationForm] =
    useState(initialApplicationForm);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragOverResume, setIsDragOverResume] = useState(false);

  /* ---------------- ANIMATION ---------------- */

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add("reveal-in");
              observer.unobserve(entry.target);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ---------------- FILTER DATA ---------------- */

  const departments = ["all", ...new Set(jobOpenings.map((j) => j.department))];

  const filteredJobs = jobOpenings.filter((job) => {
    const departmentMatch =
      selectedDepartment === "all" || job.department === selectedDepartment;

    const locationMatch =
      selectedLocation === "all" || job.location.includes(selectedLocation);

    return departmentMatch && locationMatch;
  });

  /* ---------------- HANDLERS ---------------- */

  const openApplicationForm = (jobId: number) => {
    const job = jobOpenings.find((j) => j.id === jobId) ?? null;
    setSelectedJob(job);
  };

  const closeApplicationForm = () => {
    setSelectedJob(null);
    setApplicationForm(initialApplicationForm);
    setResumeFile(null);
  };

  const handleApplicationFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setApplicationForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  const handleResumeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverResume(true);
  };

  const handleResumeDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverResume(false);
  };

  const handleResumeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverResume(false);

    const file = e.dataTransfer.files?.[0] ?? null;

    if (file) setResumeFile(file);
  };

  const handleApplicationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    if (!selectedJob) return;

    toast.success(`Application submitted for ${selectedJob.title}.`);

    closeApplicationForm();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>

        {/* HERO */}

        <section
          className="section-padding bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="container-main grid lg:grid-cols-2 items-center gap-10">

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Shape the Future
              </p>

              <h2 className="text-4xl font-semibold mt-3">
                Build Careers that Drive
                <span className="text-primary"> Sustainability</span>
              </h2>

              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Join Zigma to build sustainable infrastructure, solve real
                environmental challenges, and grow with a team focused on
                engineering excellence and impact.
              </p>
            </div>

            <div className="relative h-[420px] overflow-hidden shadow-xl [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]">
              <img
                src={picture1}
                alt="Zigma Office"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* JOB OPENINGS */}

        <section className="section-padding">

          <div className="container-main">

            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Explore Our Roles
              </p>

              <h2 className="text-4xl font-semibold mt-3">
                Explore Your <span className="text-primary">Career Path</span>
              </h2>
            </div>

            {/* DEPARTMENT FILTER */}

            <div className="flex gap-6 border-b mb-8 overflow-x-auto">

              {departments.map((dept) => {

                const active = selectedDepartment === dept;

                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`pb-3 font-semibold ${active ? "text-primary border-b-2 border-primary" : ""
                      }`}
                  >
                    {dept === "all" ? "All Openings" : dept}
                  </button>
                );
              })}
            </div>

            {/* JOB CARDS */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredJobs.map((job) => (

                <div
                  key={job.id}
                  className="border rounded-xl p-5 bg-card hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-3">

                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {job.department}
                    </div>

                    <Building2 className="w-4 h-4 text-primary" />

                  </div>

                  <h3 className="text-lg font-bold mb-2">{job.title}</h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {job.description}
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => openApplicationForm(job.id)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    View Opening
                  </Button>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* APPLICATION DIALOG */}

        <Dialog open={Boolean(selectedJob)} onOpenChange={() => closeApplicationForm()}>
          <DialogContent className="max-w-3xl">

            <DialogHeader>
              <DialogTitle>Application Form</DialogTitle>
              <DialogDescription>
                Complete your application details below.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleApplicationSubmit} className="space-y-4 mt-4">

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <Label>Full Name</Label>
                  <Input
                    name="fullName"
                    value={applicationForm.fullName}
                    onChange={handleApplicationFormChange}
                    required
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={applicationForm.phone}
                    onChange={handleApplicationFormChange}
                    required
                  />
                </div>

              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={applicationForm.email}
                  onChange={handleApplicationFormChange}
                  required
                />
              </div>

              {/* RESUME */}

              <div>

                <Label>Upload Resume</Label>

                <div
                  onDragOver={handleResumeDragOver}
                  onDragLeave={handleResumeDragLeave}
                  onDrop={handleResumeDrop}
                  className={`border-dashed border-2 p-6 text-center rounded-lg ${isDragOverResume
                      ? "border-primary bg-primary/10"
                      : "border-border"
                    }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resumeUpload"
                  />

                  <label
                    htmlFor="resumeUpload"
                    className="cursor-pointer text-primary font-medium"
                  >
                    <Upload className="inline mr-2 w-4 h-4" />
                    Drag & Drop Resume
                  </label>

                  <p className="text-sm text-muted-foreground mt-2">
                    {resumeFile ? resumeFile.name : "or click to upload"}
                  </p>

                </div>

              </div>

              <div>

                <Label>Why are you fit for this role?</Label>

                <Textarea
                  rows={4}
                  name="coverLetter"
                  value={applicationForm.coverLetter}
                  onChange={handleApplicationFormChange}
                  required
                />

              </div>

              <div className="flex justify-end gap-3 pt-2">

                <Button variant="outline" type="button" onClick={closeApplicationForm}>
                  Cancel
                </Button>

                <Button type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>

              </div>

            </form>

          </DialogContent>
        </Dialog>

      </main>

      <Footer />
    </div>
  );
};

export default Careers;