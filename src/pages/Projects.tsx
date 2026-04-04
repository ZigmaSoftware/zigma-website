import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompletedProjects from "@/pages/CompletedProjects";
import OngoingProjects from "@/pages/OngoingProjects";
import BSFLorganicwaste from "@/components/projects/BSFLorganicwaste";

type ProjectTab = "completed" | "ongoing";

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const categoryParam = searchParams.get("category");
  const activeTab: ProjectTab = tabParam === "ongoing" ? "ongoing" : "completed";
  const showBSFLOrganicWaste = categoryParam === "bsfl-organic-waste";

  const setTab = (tab: ProjectTab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {showBSFLOrganicWaste ? (
        <main className="max-w-[1400px] mx-auto px-[5%] py-10">
          <BSFLorganicwaste />
        </main>
      ) : activeTab === "completed" ? (
        <CompletedProjects
          hideLayout
          showTabSwitcher
          activeTab={activeTab}
          onTabChange={setTab}
        />
      ) : (
        <OngoingProjects
          hideLayout
          showTabSwitcher
          activeTab={activeTab}
          onTabChange={setTab}
        />
      )}

      <Footer />
    </div>
  );
};

export default Projects;
