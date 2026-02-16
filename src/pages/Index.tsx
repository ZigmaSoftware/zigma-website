import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import PresenceSection from "@/components/home/PresenceSection";
import ServicesSection from "@/components/home/ServicesSection";
import PartnersSection from "@/components/home/PartnersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <PresenceSection />
        <ServicesSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
