import { useEffect, type ReactNode } from "react";
import { X, MapPin, Award, Shield, Star, BookOpen } from "lucide-react";
import credibilityBg from "@/assets/icons/Credibility.png";
import leafLeft from "@/assets/icons/leaf-left.png";
import leafRight from "@/assets/icons/leaf-right.png";
import leafbottom from "@/assets/icons/leaf-bottom.png";
import type { Project } from "../../types";

// ============ Types ============
interface CredibilityMarker {
  text: string;
  icon: ReactNode;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// ============ Style Constants ============
const COLORS = {
  primary: "#0f2e51",
  text: "#2f3944",
  border: "#cad2d2",
  background: "#f3f5f7",
  accent: "#43b187",
  secondary: "#667488",
};

const SIZES = {
  modalWidth: "max-w-[1100px]",
  modalHeight: "max-h-[95vh]",
  leafIcon: "h-14 w-14",
  cardIcon: "h-12 w-12",
};

// ============ Sub-Components ============

/** Header with title, location badge, and close button */
interface ModalHeaderProps {
  title: string;
  state: string;
  onClose: () => void;
}

const ModalHeader = ({ title, state, onClose }: ModalHeaderProps) => (
  <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-[18px] border-b border-[#d5dce5] bg-[#f3f5f7] px-6 py-5 sm:px-10 sm:py-6">
    <div className="flex flex-1 items-center gap-3 sm:gap-4">
      <h2 className="truncate text-2xl font-extrabold leading-none tracking-[-0.02em]  sm:text-[40px]">
        {title}
      </h2>
      <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full  px-4 py-1.5">
        <MapPin className="h-4 w-4 text-[#7f8c9f]" />
        <span className="text-sm font-medium text-[#667488]">{state}</span>
      </span>
    </div>

    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="ml-4 flex-shrink-0 rounded-full border border-[#cad2dc] p-2 text-[#98a5b6] transition-colors hover:bg-[#e8edf3] hover:text-[#647589]"
    >
      <X className="h-5 w-5" />
    </button>
  </div>
);

/** Project brief section */
interface ProjectBriefProps {
  description: string;
}

const ProjectBrief = ({ description }: ProjectBriefProps) => (
  <section>
    <div className="mb-4 flex items-center gap-2">
      <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#1f4c8a]">
        Project Brief
      </span>
    </div>
    <div className="rounded-[14px] border border-[#ced6df] bg-[#eceff3] px-6 py-6 sm:px-8">
      <p className="text-base leading-relaxed text-[#394450]">{description}</p>
    </div>
  </section>
);

/** Single credibility marker card */
interface MarkerCardProps {
  icon: ReactNode;
  text: string;
}

const MarkerCard = ({ icon, text }: MarkerCardProps) => 
  <div className="flex h-full items-center gap-5 rounded-[14px] border border-[#cae4d8] bg-white px-6 py-5 transition-all hover:shadow-md">
    <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center">
      <img src={credibilityBg} alt="" className="absolute inset-0 h-full w-full object-contain opacity-80" />
      <span className="relative z-10 flex h-8 w-8 items-center justify-center text-[#36a57a]">{icon}</span>
    </div>

    <p className="flex-1 text-base leading-relaxed text-[#2f3944]">{text}</p>
  </div>
;

/** Credibility markers section with header */
interface CredibilityMarkersSectionProps {
  markers: CredibilityMarker[];
}

const CredibilityMarkersSection = ({ markers }: CredibilityMarkersSectionProps) => (
  <section>
    {/* Section Header with decorative leaves */}
    <div className="mb-7 flex items-center justify-center  ">
      <img src={leafLeft} alt="" className="h-14 w-8 object-contain opacity-85" />
      <div className="text-center">
        <h3 className="text-xl uppercase font-bold tracking-[0.34em] ">
          Credibility Markers
        </h3>
      </div>
      <img src={leafRight} alt="" className="h-14 w-8 object-contain opacity-85" />
    </div>

    {/* Marker Cards Grid */}
    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
      {markers.map((marker, index) => (
        <div key={index} className={markers.length === 1 ? "md:col-span-2" : "h-full"}>
          <MarkerCard icon={marker.icon} text={marker.text} />
        </div>
      ))}
    </div>
  </section>
);

// ============ Main Component ============

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Handle Escape key and body overflow
  useEffect(() => {
    if (!project) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const scrollY = window.scrollY;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyOverflow = document.body.style.overflow;

    window.addEventListener("keydown", handleEscapeKey);
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.overflow = originalBodyOverflow;
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };
  }, [project, onClose]);

  if (!project) return null;

  // Create credibility markers with icons
  const markerIcons: ReactNode[] = [
    <Award className="h-9 w-9" />,
    <Shield className="h-9 w-9" />,
    <Star className="h-9 w-9" />,
    <BookOpen className="h-9 w-9" />,
  ];

  const credibilityMarkers: CredibilityMarker[] = project.metrics.map((text, index) => ({
    text,
    icon: markerIcons[index % markerIcons.length],
  }));

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop with blur effect */}
      <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px]" onClick={onClose} />

      {/* Modal Container */}
      <div className={`relative z-10 w-full ${SIZES.modalWidth} ${SIZES.modalHeight} overflow-y-auto rounded-[18px] border border-[#d8dee6] bg-[#f3f5f7] shadow-[0_25px_70px_rgba(15,23,42,0.20)]`}>
        {/* Header Section */}
        <ModalHeader title={project.title} state={project.state} onClose={onClose} />

        {/* Content Section */}
        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
          <ProjectBrief description={project.desc} />
          {credibilityMarkers.length > 0 && (
            <CredibilityMarkersSection markers={credibilityMarkers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
