import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Projects from "./pages/Projects";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScrollProvider from "@/components/animation/SmoothScrollProvider";
import Newsletters from "./pages/Newsletters";
// import Facilities from "./pages/Facilities";
// import StackedCards from "./components/ui/StackedCards";
// import Peopledemo1 from "./pages/Peopledemo1";
// import Peopledemo2 from "./pages/Peopledemo2";
// import Peopledemo3 from "./pages/Peopledemo3";

const ScrollAnimator = lazy(() => import("@/components/ScrollAnimator"));
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Awards = lazy(() => import("./pages/Awards"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Products = lazy(() => import("./pages/Products"));
const Careers = lazy(() => import("./pages/Careers"));
const CareersApply = lazy(() => import("./pages/CareersApply"));
const Media = lazy(() => import("./pages/Media"));
const NotFound = lazy(() => import("./pages/NotFound"));
const People = lazy(() => import("./pages/People"));
const Projects = lazy(() => import("./pages/Projects"));
const WasteManagementShowcase = lazy(() => import("./pages/WasteManagementShowcase"));
const GovernancePolicies = lazy(() => import("./pages/GovernancePolicies"));
const Policies = lazy(() => import("./pages/Policies"));
const Servicescp = lazy(() => import("./pages/Servicescp"));
const Mediacp = lazy(() => import("./pages/Mediacp"));
const AwardsandRecognition = lazy(() => import("./pages/AwardsandRecognition"));
const Publications = lazy(() => import("./pages/Publications"));

// const Projectsdemo1 = lazy(() => import("./pages/Projectsdemo1"));
const Testimonials = lazy(() => import("./pages/Testimonials"));


const queryClient = new QueryClient();

const RouteFallback = () => <div className="min-h-screen bg-background" aria-busy="true" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScrollProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <Suspense fallback={null}>
            <ScrollAnimator />
          </Suspense>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/facilities" element={<Facilities />} /> */}
              <Route path="/awards" element={<Awards />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/ongoingprojects" element={<Navigate to="/projects?tab=ongoing" replace />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/apply" element={<CareersApply />} />
              <Route path="/media" element={<Media />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/newsletters" element={<Newsletters />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/people" element={<People />} />
              <Route path="/completedprojects" element={<Navigate to="/projects?tab=completed" replace />} />
              {/* <Route path="/stacked-cards" element={<StackedCards />} /> */}

              <Route path="/waste-management-showcase" element={<WasteManagementShowcase />} />
              <Route path="/governance-policies" element={<GovernancePolicies />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/servicescp" element={<Servicescp />} />

              <Route path="/mediacp" element={<Mediacp />} />
              <Route path="/awardsandrecognition" element={<AwardsandRecognition />} />
              {/* <Route path="/peopledemo1" element={<Peopledemo1 />} /> */}
              {/* <Route path="/peopledemo2" element={<Peopledemo2 />} /> */}
              {/* <Route path="/peopledemo3" element={<Peopledemo3 />} /> */}
              {/* <Route path="/projectsdemo1" element={<Projectsdemo1 />} /> */}
              <Route path="/testimonials" element={<Testimonials />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SmoothScrollProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
