import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import { IndiaPresence } from "@/components/home/Indiapresence";
import ServicesSection from "@/components/home/ServicesSection";
import PartnersSectioncp from "@/components/home/PartnersSectioncp";
import ULBClientsSection from "@/components/home/ULBClientsSection";
import ULBClientsSectioncp from "@/components/home/ULBClientsSectioncp";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />   
        <StatsSection />
        <AboutSection />
        <IndiaPresence/>
        <ServicesSection/>
        <PartnersSectioncp/>
        <ULBClientsSection/>
        <ULBClientsSectioncp/>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
