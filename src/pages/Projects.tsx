import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompletedProjects from "@/pages/CompletedProjects";
import OngoingProjects from "@/pages/OngoingProjects";

type ProjectTab = "completed" | "ongoing";

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: ProjectTab = tabParam === "ongoing" ? "ongoing" : "completed";

  const setTab = (tab: ProjectTab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {activeTab === "completed" ? (
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
