import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompletedProjects from "@/pages/CompletedProjects";
import BSFLorganicwaste from "@/components/projects/BSFLorganicwaste";
import IntegratedAFProjects from "@/components/projects/IntegratedAFProjects";
import Wpe from "@/components/projects/Wpe";

const Projects: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const showBSFLOrganicWaste = categoryParam === "bsfl-organic-waste";
  const showIntegratedAFProjects = categoryParam === "integrated-af-projects";
  const showWpeProjects = categoryParam === "waste-plastics-extrusion";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {showBSFLOrganicWaste ? (
        <main className="max-w-[1400px] mx-auto px-[5%] py-10">
          <BSFLorganicwaste />
        </main>
      ) : showIntegratedAFProjects ? (
        <main className="max-w-[1400px] mx-auto px-[5%] py-10">
          <IntegratedAFProjects />
        </main>
      ) : showWpeProjects ? (
        <main className="max-w-[1400px] mx-auto px-[5%] py-10">
          <Wpe />
        </main>
      ) : (
        <CompletedProjects hideLayout />
      )}

      <Footer />
    </div>
  );
};

export default Projects;
