import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../Header";
import Footer from "../Footer";
import Herobg from "../../assets/hero_bg.jpg";
import Machine1 from "@/assets/projects/patent machine.jpg";
import Machine2 from "@/assets/projects/Picture 1.jpg";
import Machine3 from "@/assets/projects/Picture 2.jpg";
import Machine4 from "@/assets/projects/Picture 3.jpg";
import Machine5 from "@/assets/projects/Picture 4.jpg";
import Machine6 from "@/assets/projects/Picture 5.jpg";
import Machine7 from "@/assets/projects/Picture 7.jpg";
import Machine8 from "@/assets/projects/Picture 8.jpg";
import Machine9 from "@/assets/projects/Picture 9.png";


gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Comprehensive Waste Management Solutions",
    subtitle: "Clearing the Past, Securing the Future",
    description: "Zigma Global Environ Solutions Pvt. Ltd. offers end-to-end waste management solutions — from collection to disposal — for urban, industrial, commercial, and institutional clients. Our approach ensures environmental compliance, cost-efficiency, and sustainability. Our holistic waste management solutions cater to municipalities, smart cities, townships, and institutions. We help transform the traditional waste chain into a circular economy.",
    image: Machine1,
    color: "from-green-700 to-emerald-900",
    accent: "#16a34a"
  },
  {
    id: 2,
    title: "Reviving Land, Restoring Balance",
    subtitle: "Legacy Waste Remediation",
    description: "Old dumpsites are a major environmental hazard. Zigma Global Environ Solutions specializes in turning decades-old waste mountains into usable, green spaces. With years of hands-on experience in scientific remediation of legacy waste, we turn hazardous dumpsites into eco-friendly, usable land — safely, efficiently, and sustainably.",
    image: Machine2,
    color: "from-amber-700 to-yellow-900",
    accent: "#d97706"
  },
  {
    id: 3,
    title: "Efficient Solutions for Everyday Waste",
    subtitle: "FreshZigma Global Environ Solutions  Pvt Waste Management",
    description: ". Ltd. offers end-to-end fresh waste management services, from collection to sorting and disposal. We ensure that waste from households, commercial establishments, and industries is efficiently processed, reducing environmental harm. Whether you are looking for routine collection services or need a customized waste management plan, we provide innovative solutions for each scenario. Our team sorts waste into recyclable, compostable, and landfill categories, contributing to circular economy.",
    image: Machine3,
    color: "from-orange-700 to-red-900",
    accent: "#ea580c"
  },
  {
    id: 4,
    title: "Smart Waste Collection Systems",
    subtitle: "Technology-Driven Collection",
    description: "Leverage our advanced GPS-enabled waste collection vehicles and real-time monitoring systems. Our smart bins with IoT sensors optimize collection routes, reduce fuel consumption, and ensure timely pickup. Perfect for smart cities and modern townships looking to enhance operational efficiency while minimizing environmental impact.",
    image: Machine4,
    color: "from-blue-700 to-indigo-900",
    accent: "#2563eb"
  },
  {
    id: 5,
    title: "Industrial Waste Processing",
    subtitle: "Specialized Industrial Solutions",
    description: "Expert handling of industrial waste including hazardous materials, chemical byproducts, and manufacturing residue. Our certified facilities process, treat, and dispose of industrial waste in compliance with environmental regulations. We provide customized solutions for factories, manufacturing units, and industrial parks.",
    image: Machine5,
    color: "from-slate-700 to-gray-900",
    accent: "#475569"
  },
  {
    id: 6,
    title: "Organic Waste Composting",
    subtitle: "From Waste to Resource",
    description: "Transform organic waste into nutrient-rich compost through our advanced composting facilities. We process kitchen waste, garden waste, and agricultural residue into high-quality organic fertilizer. Our composting solutions help reduce landfill burden while creating valuable resources for agriculture and landscaping.",
    image: Machine6,
    color: "from-lime-700 to-green-900",
    accent: "#65a30d"
  },
  {
    id: 7,
    title: "Plastic Waste Recycling",
    subtitle: "Closing the Plastic Loop",
    description: "State-of-the-art plastic recycling facility that processes various types of plastics into reusable raw materials. We segregate, clean, shred, and pelletize plastic waste, preventing it from polluting our environment. Our recycling solutions support the circular economy and reduce dependency on virgin plastic production.",
    image: Machine7,
    color: "from-cyan-700 to-teal-900",
    accent: "#0891b2"
  },
  {
    id: 8,
    title: "E-Waste Management",
    subtitle: "Responsible Electronics Disposal",
    description: "Certified e-waste recycling services for computers, mobile phones, appliances, and electronic equipment. We safely extract valuable materials while ensuring hazardous components are disposed of responsibly. Our facility is equipped to handle bulk e-waste from corporate offices, institutions, and households.",
    image: Machine8,
    color: "from-purple-700 to-violet-900",
    accent: "#7c3aed"
  },
  {
    id: 9,
    title: "Biomedical Waste Disposal",
    subtitle: "Safe Healthcare Waste Management",
    description: "Specialized handling of biomedical waste from hospitals, clinics, laboratories, and healthcare facilities. Our certified processes ensure complete sterilization and safe disposal of infectious waste, sharps, and pharmaceutical residue. We maintain strict compliance with biomedical waste management rules and regulations.",
    image: Machine9,
    color: "from-red-700 to-rose-900",
    accent: "#dc2626"
  },
  {
    id: 10,
    title: "Waste-to-Energy Solutions",
    subtitle: "Powering Tomorrow with Today's Waste",
    description: "Convert non-recyclable waste into clean energy through our waste-to-energy plants. Using advanced incineration and gasification technologies, we generate electricity while reducing landfill dependency. Our solutions help cities and industries achieve sustainability goals while creating renewable energy from waste.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    color: "from-yellow-600 to-orange-900",
    accent: "#ca8a04"
  },
];

export default function StackedCards() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const currentSlideRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalSlides = services.length;
      
      // Pin the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalSlides * 100}%`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const slideIndex = Math.min(
            Math.floor(progress * totalSlides),
            totalSlides - 1
          );
          
          if (slideIndex !== currentSlideRef.current) {
            currentSlideRef.current = slideIndex;
            updateSlide(slideIndex);
          }
          
          // Update progress bar
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              scaleX: progress,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        },
      });

      // Initial slide setup
      updateSlide(0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const updateSlide = (index) => {
    const service = services[index];
    const card = cardRef.current;
    if (!card) return;

    const timeline = gsap.timeline();

    // Fade out current content
    timeline.to(card.querySelectorAll('.slide-content'), {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
    });

    // Fade out image
    timeline.to(card.querySelector('.slide-image'), {
      opacity: 0,
      scale: 1.05,
      duration: 0.3,
    }, "<");

    // Update content
    timeline.call(() => {
      // Update number
      const numberEl = card.querySelector('.slide-number');
      if (numberEl) numberEl.textContent = String(service.id).padStart(2, '0');

      // Update title
      const titleEl = card.querySelector('.slide-title');
      if (titleEl) titleEl.textContent = service.title;

      // Update subtitle
      const subtitleEl = card.querySelector('.slide-subtitle');
      if (subtitleEl) subtitleEl.textContent = service.subtitle;

      // Update description
      const descEl = card.querySelector('.slide-description');
      if (descEl) descEl.textContent = service.description;

      // Update image
      const imageEl = card.querySelector('.slide-image');
      if (imageEl) imageEl.src = service.image;

      // Keep a clean, professional background
      card.style.background = "#ffffff";
    });

    // Fade in new content
    timeline.to(card.querySelectorAll('.slide-content'), {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out"
    });

    // Fade in image
    timeline.to(card.querySelector('.slide-image'), {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "<0.2");
  };

  return (
    <div className="bg-slate-50">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center text-white py-24 px-6 min-h-screen flex items-center justify-center"
          style={{ backgroundImage: `url(${Herobg})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative max-w-5xl mx-auto text-center">
          {/* <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium tracking-wider uppercase">
              Zigma Global Environ Solutions  Pvt. Ltd.
            </span>
          </div> */}
          <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
            Sustainable
            <br />
            <span className="text-green-300">Waste Solutions</span>
          </h1>
          {/* <p className="text-xl md:text-3xl text-gray-700 font-medium max-w-3xl mx-auto mb-12">
            Transforming waste management through innovation, technology, and environmental responsibility
          </p> */}
          {/* <div className="flex items-center justify-center gap-4">
            <div className="b-16 h-0.5 bg-gradient-to-r from-transparent to-green-500"></div>
            <span className="text-green-1000 text-sm font-mono">Scroll to explore</span>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-green-500"></div>
          </div> */}
        </div>
        </section>

        {/* Main Showcase Section */}
        <section
          ref={containerRef}
          className="relative min-h-[100vh] py-12 flex items-center justify-center overflow-hidden bg-slate-50"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 z-50">
            <div
              ref={progressRef}
              className="h-full bg-emerald-600 origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

        {/* Single Card */}
        <div className="relative w-full max-w-7xl mx-auto px-8">
          <div
            ref={cardRef}
            className="relative rounded-2xl overflow-hidden shadow-xl bg-white"
            style={{
              minHeight: '560px',
            }}
          >
            {/* Card Container with Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] h-full items-stretch">
              {/* Left Side - Image */}
              <div className="relative overflow-hidden h-full">
                <img
                  src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80"
                  alt="Waste Management"
                  className="slide-image absolute inset-0 w-full h-full object-cover"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Right Side - Content */}
              <div className="relative h-full">
                {/* Card Content */}
                <div className="relative h-full min-h-[560px] flex flex-col justify-between p-10 lg:p-12">
                  {/* Header */}
                  <div className="flex justify-between items-start slide-content">
                    <div className="flex items-center gap-4">
                      <span className="slide-number text-slate-400 text-5xl font-semibold font-mono">
                        01
                      </span>
                      <div className="h-10 w-0.5 bg-slate-200"></div>
                      <span className="text-slate-600 text-sm font-medium tracking-wider uppercase">
                        Our Services
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-slate-100" />
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-6">
                    <div className="slide-content">
                      <h3 className="text-emerald-700 text-base font-semibold mb-3 slide-subtitle tracking-wide">
                        Clearing the Past, Securing the Future
                      </h3>
                      <h2 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-6 slide-title leading-tight">
                        Comprehensive Waste Management Solutions
                      </h2>
                    </div>
                    
                    <p className="text-slate-600 text-base lg:text-lg leading-relaxed slide-content slide-description">
                      Zigma Global Environ Solutions  Pvt. Ltd. offers end-to-end waste management solutions — from collection to disposal — for urban, industrial, commercial, and institutional clients. Our approach ensures environmental compliance, cost-efficiency, and sustainability.
                    </p>

                    <button className="slide-content inline-flex items-center gap-3 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all duration-300 shadow-sm">
                      View Details
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>

                  {/* Slide Counter */}
                  <div className="flex items-center justify-between slide-content">
                    <div className="flex items-center gap-3">
                      {/* <div className="h-0.5 w-12 bg-white/30"></div> */}
                      {/* <span className="text-white/60 text-sm font-mono">
                        Slide <span className="slide-number">01</span> / {services.length}
                      </span> */}
                    </div>
                    <div className="text-slate-500 text-sm font-light">
                      Scroll to continue
                    </div>
                  </div>

                  {/* Decorative Circle */}
                  <div className="absolute top-1/2 right-16 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
                    <div className="w-80 h-80 border border-slate-200 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div> */}
        </section>

        {/* Footer CTA */}
        <section className="h-screen flex items-center justify-center px-8 bg-gradient-to-br from-green-900 via-green-800 to-green-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your
              <br />
              <span className="text-green-300">
                Waste Management?
              </span>
            </h2>
            <p className="text-xl text-green-50/90 font-light mb-10">
              Partner with Zigma Global Environ Solutions  for sustainable, efficient, and compliant waste solutions
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-10 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-green-500/50 hover:border-green-400 hover:bg-white/20 text-white rounded-full text-lg font-semibold transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* <WasteManagementShowcase/> */}

    </div>
  );
}


