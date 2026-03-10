import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Products from "./pages/Products";
import Careers from "./pages/Careers";
import CareersApply from "./pages/CareersApply";
import Media from "./pages/Media";
import NotFound from "./pages/NotFound";
import Awards from "./pages/Awards";
import People from "@/pages/People";
import Facilities from "./pages/Facilities";
import GovernancePolicies from "./pages/GovernancePolicies";
import Policies from "./pages/Policies";
import ProjectShowcase from "./pages/ProjectShowcase";
import StackedCards from "./components/ui/StackedCards";
import WasteManagementShowcase from "./pages/WasteManagementShowcase";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollAnimator from "@/components/ScrollAnimator";
import Servicescp from "./pages/Servicescp";
import SmoothScrollProvider from "@/components/animation/SmoothScrollProvider";
import Mediacp from "./pages/Mediacp";
import Awardsection from "./pages/Awardsection";
import Peopledemo1 from "./pages/Peopledemo1";
import Peopledemo2 from "./pages/Peopledemo2";
import Peopledemo3 from "./pages/Peopledemo3";
import Projectsdemo1 from "./pages/Projectsdemo1";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScrollProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ScrollAnimator />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/apply" element={<CareersApply />} />
            <Route path="/media" element={<Media />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/people" element={<People />} />
            <Route path="/project-showcase" element={<ProjectShowcase />} />
            <Route path="/stacked-cards" element={<StackedCards />} />

            <Route path="/waste-management-showcase" element={<WasteManagementShowcase />} />
            <Route path="/governance-policies" element={<GovernancePolicies />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/servicescp" element={<Servicescp />} />

            <Route path="/mediacp" element={<Mediacp />} />
            <Route path="/awardsection" element={<Awardsection />} />
            <Route path="/peopledemo1" element={<Peopledemo1 />} />
            <Route path="/peopledemo2" element={<Peopledemo2 />} />
            <Route path="/peopledemo3" element={<Peopledemo3 />} />
            <Route path="/projectsdemo1" element={<Projectsdemo1 />} />
          </Routes>
        </BrowserRouter>
      </SmoothScrollProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
