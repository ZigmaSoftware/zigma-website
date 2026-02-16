import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import P1b from "@/assets/Before - After/1 kumbakonam b.jpg";
import P1a from "@/assets/Before - After/1 kumbakonam_A.jpg";
import P2b from "@/assets/Before - After/2 sembakam_B.jpg";
import P2a from "@/assets/Before - After/2 sembakam_A.jpg";
import P3b from "@/assets/Before - After/3 noida_B.jpg";
import P3a from "@/assets/Before - After/3 noid_A.jpg";
import P4b from "@/assets/Before - After/4 atladara_B.jpg";
import P4a from "@/assets/Before - After/4 atladara_A.jpg";
import P5b from "@/assets/Before - After/5 poonamallee_B.jpg";
import P5a from "@/assets/Before - After/5 poonamallee_A.jpg";
import P6b from "@/assets/Before - After/6 vijawada_B.jpg";
import P6a from "@/assets/Before - After/6 vijawada_A.jpg";
import P7b from "@/assets/Before - After/7 vairapalayam_B.jpg";
import P7a from "@/assets/Before - After/7 vairapalayam_A.jpg";
import P8b from "@/assets/Before - After/8 pammal_B.jpg";
import P8a from "@/assets/Before - After/8 pammal_A.jpg";
import P9b from "@/assets/Before - After/9 noida_B.jpg";
import P9a from "@/assets/Before - After/9 noida_A.jpg";
import P10b from "@/assets/Before - After/10 tirupathi_B.jpg";
import P10a from "@/assets/Before - After/10 tirupathi_A.jpg";
import P11b from "@/assets/Before - After/11 chidambaram_B.jpg";
import P11a from "@/assets/Before - After/11 chidambaram_a.jpg";
import P12b from "@/assets/Before - After/12 pallavaram_B.jpg";
import P12a from "@/assets/Before - After/12 pallavaram_A.jpg";
import P13b from "@/assets/Before - After/13 karaikudi_B.jpg";
import P13a from "@/assets/Before - After/13 karaikudi_A.jpg";
import P14b from "@/assets/Before - After/14 karur_B.jpg";
import P14a from "@/assets/Before - After/14 karur_A.jpg";
import P15b from "@/assets/Before - After/Tambaram_B.jpg";
import P15a from "@/assets/Before - After/Tambaram_A.jpg";

const ProjectShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedSlideId, setExpandedSlideId] = useState<number | null>(null);
  const [splitPct, setSplitPct] = useState(50);
  const containerRef = useRef(null);
  const splitPanelRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollLockTimeout = useRef(null);
  const isDraggingSplitRef = useRef(false);
  
  const slides = [
    { id: 1, title: "Kumbakonam", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Kumbakonam dumpsite reclamation project.", details: { project: "Quantity: 2,31,782 cubic meter. Area reclaimed: 12 acres.", focus: "Project period: December 2015 - March 2018. Quantity of RDF disposed (MT): 22,586.", outcome: "CO2 mitigated by processing the legacy waste (MT): 1,16,280." }, metrics: ["CO2 mitigated per square meter (MT): 2.39", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 3,794", "Carbon sequestered by 1.43 lakh acres of US forests in one year", "GHG emissions avoided by 33 wind turbines running for a year", "Carbon emissions from 26,720 gasoline powered-passenger vehicles driven for one year"], beforeImage: P1b, afterImage: P1a },
    { id: 2, title: "Sembakkam Lake", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Sembakkam Lake dumpsite reclamation project.", details: { project: "Quantity: 38,026 cubic meter. Area reclaimed: 4 acres.", focus: "Project period: August 2017 - August 2018. Quantity of RDF disposed (MT): 7,316.", outcome: "CO2 mitigated by processing the legacy waste (MT): 15,823." }, metrics: ["CO2 mitigated per square meter (MT): 0.98", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,229", "Carbon sequestered by 20,335 acres of US forests in one year", "GHO emissions avoided by 5 wind turbines running for a year", "Carbon emissions from 3,795 gasoline powered-passenger vehicles driven for one year"], beforeImage: P2b, afterImage: P2a },
    { id: 3, title: "Noida Sector 54", subtitle: "Community Development Projects", highlight: "", description: "In a remarkable feat, this award-winning project, conducted under the watchful eye of the Honourable National Green Tribunal, achieved an incredible transformation in the shortest possible time. It effectively converted a once neglected dumping ground into a state-of-the-art wetland area, captivating thousands of visitors who now frequent the site for recreational purposes. The project’s efficiency in completing the transformation within a condensed timeframe further adds to its extraordinary success.", details: { project: "Quantity: 99,665 metric tonnes. Area reclaimed: 4 acres.", focus: "Project period: December 2018 – July 2019. Quantity of RDF disposed: 15,498 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 68,698 metric tonnes." }, metrics: ["CO2 mitigated per square metre: 4.26 metric tonnes", "CO2 mitigated by using RDF as an alternate fuel resource: 2,604 metric tonnes", "Area of US forests where carbon was sequestered in one year: 85,351 acres", "GHG emissions avoided: Running 20 wind turbines for a year", "Carbon emissions from: 15,927 gasoline-powered passenger vehicles driven for one year"], beforeImage: P3b, afterImage: P3a },
    { id: 4, title: "Vadodara-Atladara", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Under the vigilant monitoring of the Honourable National Green Tribunal, this remarkable project successfully removed the pollution source from the landfill situated on the banks of the Vishwamitri River, preserving the natural habitat of the critically endangered gharials – an IUCN-protected species. The reclaimed land was effectively utilised to establish waste management facilities, including a construction and demolition waste treatment facility, plastic waste treatment facility and waste-to-energy plant. The NGT’s oversight ensured compliance with environmental regulations and promoted sustainable practices, further safeguarding the endangered gharials.", details: { project: "Quantity: 4,21,187 cubic metres. Area reclaimed: 10.5 acres.", focus: "Project period: July 2018 – February 2021. Quantity of RDF disposed: 58,897 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 2,91,462 metric tonnes." }, metrics: ["CO2 mitigated per square metre: 6.86 metric tonnes", "CO2 mitigated by using RDF as an alternate fuel resource: 9,895 metric tonnes", "Area of US forests where carbon was sequestered in one year: 3.59 lakh", "GHG emissions avoided: Running 84 wind turbines for a year", "Carbon emissions from: 67,061 gasoline-powered passenger vehicles driven for one year"], beforeImage: P4b, afterImage: P4a },
    { id: 5, title: "Poonamallee", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Poonamallee dumpsite reclamation project.", details: { project: "Quantity: 30,930 cubic meter. Area reclaimed: 3 acres.", focus: "Project period: July 2018 - September 2019. Quantity of RDF disposed (MT): 6,034.", outcome: "CO2 mitigated by processing the legacy waste (MT): 14,823." }, metrics: ["CO2 mitigated per square meter (MT): 1.22", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,014", "Carbon sequestered by 18,886 acres of US forests in one year", "GHG emissions avoided by 4 wind turbines running for a year", "Carbon emissions from 3,524 gasoline powered-passenger vehicles"], beforeImage: P5b, afterImage: P5a },
    { id: 6, title: "Vijayawada-Ajitsingh Nagar", subtitle: "Community Development Projects", highlight: "", description: "The project played a vital role in reclaiming India’s largest dump site to date, spanning 45 acres in Vijayawada, amidst densely populated areas. One significant accomplishment was the successful occupation of over 2,500 apartments that had previously remained unoccupied. These apartments were specifically allocated to individuals from low-income groups through a slum rehabilitation programme, ensuring a positive social impact. The reclaimed land was intelligently repurposed to incorporate various essential facilities, including a construction and demolition waste management facility, material recovery facility, waste transfer station, farmer’s produce market and a children’s park.", details: { project: "Quantity: 3,05,897 cubic metres. Area reclaimed: 45 acres.", focus: "Project period: July 2018 – July 2020. Quantity of RDF disposed: 47,178 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 2,11,681 metric tonnes." }, metrics: ["CO2 mitigated by using RDF as an alternate fuel resource: 7,926 tonnes", "Area of US forests where carbon was sequestered in one year: 2.61 lakh", "GHG emissions avoided: Running 61 wind turbines for a year", "Carbon emissions from: 48,869 gasoline-powered passenger vehicles driven for one year"], beforeImage: P6b, afterImage: P6a },
    { id: 7, title: "Erode-Vairapalayam", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Under the vigilant monitoring of the esteemed National Green Tribunal, the acclaimed project has successfully reclaimed a sprawling seven-acre dumpsite situated along the banks of the Cauvery river. The Cauvery river serves as a vital source of drinking water for millions of individuals. Presently, the reclaimed land has been transformed into a magnificent Miyawaki forest by the urban local body. In recognition of its significant role in preserving the region’s flora and fauna, the project has received the prestigious Smart City award for the urban local body.", details: { project: "Quantity: 1,25,092 cubic metres. Area reclaimed: 7 acres.", focus: "Project period: September 2019 – August 2021. Quantity of RDF disposed: 8,719 metric tonnes.", outcome: "CO2 mitigated by processing the legacy waste: 91,009 metric tonnes." }, metrics: ["CO2 mitigated per square metre: 3.21 metric tonnes", "CO2 mitigated by using RDF as an alternate fuel resource: 1,465 metric tonnes", "Area of US forests where carbon was sequestered in one year: 1.1 lakh", "GHG emissions avoided: Running 26 wind turbines for a year", "Carbon emissions from: 20,578 gasoline-powered passenger vehicles driven for one year"], beforeImage: P7b, afterImage: P7a },
    { id: 8, title: "Pammal", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Pammal dumpsite reclamation project.", details: { project: "Quantity: 59,175 cubic meter. Area reclaimed: 2.4 acres.", focus: "Project period: August 2018 - August 2020. Quantity of RDF disposed (MT): 6,682.", outcome: "CO2 mitigated by processing the legacy waste (MT): 34,801." }, metrics: ["CO2 mitigated per square meter (MT): 3.58", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,123", "Carbon sequestered by 42,840 acres of US forests in one year", "GHG emissions avoided by 10 wind turbines running for a year", "Carbon emissions from 7,994 gasoline powered-passenger vehicles"], beforeImage: P8b, afterImage: P8a },
    { id: 9, title: "Noida Sector 145 A", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Noida Sector 145 A dumpsite reclamation project.", details: { project: "Quantity: 1,02,837 cubic meter. Area reclaimed: 6.2 acres.", focus: "Project period: July 2019 - August 2020. Quantity of RDF disposed (MT): 10,259.", outcome: "CO2 mitigated by processing the legacy waste (MT): 71,163." }, metrics: ["CO2 mitigated per square meter (MT): 2.8", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,724", "Carbon sequestered by 86,919 acres of US forests in one year", "GHG emissions avoided by 20 wind turbines running for a year", "Carbon emissions from 16,220 gasoline powered-passenger vehicles driven for one year"], beforeImage: P9b, afterImage: P9a },
    { id: 10, title: "Tirupathi", subtitle: "Surface Stabilization", highlight: "", description: "Stabilized the surface by leveling and clearing, reducing runoff issues.", details: { project: "Surface stabilization and cleanup.", focus: "Leveling, drainage pathing, cleanup.", outcome: "Stable surface with reduced runoff." }, beforeImage: P10b, afterImage: P10a },
    { id: 11, title: "Chidambaram", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Chidambaram dumpsite reclamation project.", details: { project: "Quantity: 52,000 cubic meter. Area reclaimed: 4 acres.", focus: "Project period : April 2019- March 2021. Quantity of RDF disposed (MT) : 4,804.", outcome: "CO2 mitigated by processing the legacy waste: 30,634." }, metrics: ["CO2 mitigated per square meter (MT): 1.89", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 807", "Carbon sequestered by 37,494 acres of US forests in one year", "GHG emissions avoided by 9 wind turbines running for a year", "Carbon emissions from 6,997 gasoline powered-passenger vehicles driven for one year"], beforeImage: P11b, afterImage: P11a },
    { id: 12, title: "Pallavaram", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Pallavaram dumpsite reclamation project.", details: { project: "Quantity: 1,08,000 cubic meter. Area reclaimed: 5 acres.", focus: "Project period : Jan 2020 -Sept 2021. Quantity of RDF disposed (MT) : 13,271.", outcome: "CO2 mitigated by processing the legacy waste (MT): 49,809." }, metrics: ["CO2 mitigated per square meter (MT): 2.46", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,230", "Carbon sequestered by 62,057 acres of US forests in one year", "GHG emissions avoided by 15 wind turbines running for a year", "Carbon emissions from 11,580 gasoline powered-passenger vehicles driven for one year"], beforeImage: P12b, afterImage: P12a },
    { id: 13, title: "Karaikudi", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Karaikudi dumpsite reclamation project.", details: { project: "Quantity: 1,35,635 cubic meter. Area reclaimed: 13.75 acres.", focus: "Project period : Feb 2020 - Sept 2021. Quantity of RDF disposed (MT) : 15,796.", outcome: "CO2 mitigated by processing the legacy waste (MT): 81,381." }, metrics: ["CO2 mitigated per square meter (MT): 1.46", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 2,654", "Carbon sequestered by 1 lakh acres of US forests in one year", "GHG emissions avoided by 23 wind turbines running for a year", "Carbon emissions from 18,,700 gasoline powered-passenger vehicles driven for one year"], beforeImage: P13b, afterImage: P13a },
    { id: 14, title: "Karur", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Karur dumpsite reclamation project.", details: { project: "Quantity: 1,37,394 cubic meter. Area reclaimed: 15 acres.", focus: "Project period : February 2020 - March 2021. Quantity of RDF disposed (MT) : 6,586.", outcome: "CO2 mitigated by processing the legacy waste (MT): 90,461." }, metrics: ["CO2 mitigated per square meter (MT): 1.49", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 1,106", "Carbon sequestered by 1.09 lakh acres of US forests in one year", "GHG emissions avoided by 26 wind turbines running for a year", "Carbon emissions from 20,376 gasoline powered-passenger vehicles driven for one year"], beforeImage: P14b, afterImage: P14a },
    { id: 15, title: "Tambaram- Kannadapalayam", subtitle: "Dumpsite Reclamation Project", highlight: "", description: "Tambaram- Kannadapalayam dumpsite reclamation project.", details: { project: "Quantity : 1,50,494 cubic meter. Area reclaimed : 5 acres.", focus: "Project period : August 2019 - June 2022. Quantity of RDF disposed (MT) : 24,841.", outcome: "CO2 mitigated by processing the legacy waste (MT): 1,18,362." }, metrics: ["CO2 mitigated per square meter (MT): 5.85", "CO2 mitigated by using RDF as Alternate Fuel Resource (MT): 4,173", "Carbon sequestered by 1.46 lakh acres of US forests in one year", "GHG emissions avoided by 34 wind turbines running for a year", "Carbon emissions from 27,268 gasoline powered-passenger vehicles driven for one year"], beforeImage: P15b, afterImage: P15a },
  ];

  const releaseScrollLock = () => {
    isScrollingRef.current = false;
  };

  const lockScroll = () => {
    isScrollingRef.current = true;
    if (scrollLockTimeout.current) {
      clearTimeout(scrollLockTimeout.current);
    }
    scrollLockTimeout.current = setTimeout(releaseScrollLock, 1800);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (isScrollingRef.current) return;

    const delta = e.deltaY;
    if (delta > 0 && currentSlide < slides.length - 1) {
      lockScroll();
      setCurrentSlide(prev => prev + 1);
    } else if (delta < 0 && currentSlide > 0) {
      lockScroll();
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isScrollingRef.current) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < slides.length - 1) {
        // Swipe up
        lockScroll();
        setCurrentSlide(prev => prev + 1);
      } else if (diff < 0 && currentSlide > 0) {
        // Swipe down
        lockScroll();
        setCurrentSlide(prev => prev - 1);
      }
    }
  };

  const scrollToSlide = (index) => {
    if (!isScrollingRef.current && index !== currentSlide) {
      lockScroll();
      setCurrentSlide(index);
    }
  };

  const scrollToTop = () => {
    setCurrentSlide(0);
  };

  const toggleDetails = (slideId: number) => {
    setExpandedSlideId(prev => (prev === slideId ? null : slideId));
  };

  const closeDetails = () => {
    setExpandedSlideId(null);
  };

  const updateSplitFromClientX = (clientX: number) => {
    if (!splitPanelRef.current) return;
    const rect = splitPanelRef.current.getBoundingClientRect();
    const clamped = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setSplitPct((clamped / rect.width) * 100);
  };

  const handleSplitPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingSplitRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateSplitFromClientX(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingSplitRef.current) return;
      updateSplitFromClientX(e.clientX);
    };
    const handlePointerUp = () => {
      isDraggingSplitRef.current = false;
    };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);
  useEffect(() => {
    return () => {
      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current);
      }
    };
  }, []);

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      lockScroll();
      setCurrentSlide(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      lockScroll();
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="corporate-page relative w-full h-screen overflow-hidden bg-slate-50 pt-20">
      <Header />

      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides Container */}
        <div
          className="relative w-full h-full transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateY(-${currentSlide * 100}%)` }}
        >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute top-0 left-0 w-full h-full flex items-center"
            style={{
              top: `${index * 100}%`,
              opacity: Math.abs(currentSlide - index) <= 1 ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          >
            <div className="w-full h-full flex items-center justify-center px-5 lg:px-12 py-6 bg-white">
              <div className="showcase-frame w-full max-w-7xl h-full">
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full"
                  style={{ animation: currentSlide === index ? 'fadeInUp 0.8s ease-out' : 'none' }}
                >
                  {/* Split Before/After Panel */}
                  <div
                    ref={currentSlide === index ? splitPanelRef : null}
                    className="relative h-[48vh] lg:h-[70vh] rounded-2xl overflow-hidden split-panel border border-slate-200"
                    onPointerDown={handleSplitPointerDown}
                  >
                    <div className="absolute inset-0 flex">
                      <div className="relative h-full" style={{ width: `${splitPct}%` }}>
                        <img src={slide.beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
                        <span className="badge before-badge">BEFORE</span>
                      </div>
                      <div className="relative h-full" style={{ width: `${100 - splitPct}%` }}>
                        <img src={slide.afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
                        <span className="badge after-badge">AFTER</span>
                      </div>
                    </div>
                    <div className="split-divider" style={{ left: `${splitPct}%` }} />
                    <div
                      className="split-handle"
                      style={{ left: `${splitPct}%` }}
                      aria-hidden="true"
                    >
                      <span className="split-chevron">&lt; &gt;</span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-xs font-semibold tracking-widest text-slate-600 bg-white/80 backdrop-blur px-3 py-1 rounded-full">
                      {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </div>
                  </div>  

                  {/* Content Panel */}
                  <div className="lg:pr-6" style={{ animation: currentSlide === index ? 'fadeInUp 1s ease-out 0.2s both' : 'none' }}>
                    <div className="flex items-center gap-3 text-emerald-700 mb-4">
                  
                      <p className="text-xs tracking-[0.2em] font-semibold uppercase">{slide.subtitle}</p>
                    </div>

                    <h2 className="title-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-3">
                      {slide.title}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div className="info-card">
                        <p className="info-label">Scope</p>
                        <p className="info-value">{slide.details.project}</p>
                      </div>
                      <div className="info-card">
                        <p className="info-label">Outcome</p>
                        <p className="info-value">{slide.details.outcome}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleDetails(slide.id)}
                      className="cta-button"
                    >
                      {expandedSlideId === slide.id ? "Close" : "View Full Details"}
                      <span className="ml-2">-&gt;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Slide Indicators */}
      {/* <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => scrollToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-emerald-600 border-emerald-600 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]' 
                : 'bg-slate-200 border-slate-300 hover:border-slate-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* Floating Action Buttons */}
      <div className="fixed   right-6 top-1 translate-y-28 flex flex-col gap-3 z-50">
        <button
          onClick={goPrev}
          className="nav-square"
          aria-label="Previous slide"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          className="nav-square"
          aria-label="Next slide"
        >
          <ChevronUp className="w-5 h-5 rotate-180" />
        </button>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* Call Button */}
        {/* <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </button> */}

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-105 ${
            currentSlide > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>

      {/* Details Modal */}
      {expandedSlideId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={closeDetails}
          />
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            {(() => {
              const active = slides.find(s => s.id === expandedSlideId);
              if (!active) return null;
              return (
                <div className="p-6 lg:p-8 bg-white">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{active.title}</h3>
                      <p className="text-emerald-600 font-semibold">{active.subtitle}</p>
                    </div>
                    <button
                      onClick={closeDetails}
                      className="text-slate-500 hover:text-slate-800 transition-colors"
                      aria-label="Close details"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-slate-700 mb-6">{active.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
                    <div>
                      <p className="text-slate-500 mb-1">Project</p>
                      <p className="font-medium text-slate-800">{active.details.project}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Focus</p>
                      <p className="font-medium text-slate-800">{active.details.focus}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Outcome</p>
                      <p className="font-medium text-slate-800">{active.details.outcome}</p>
                    </div>
                  </div>

                  {active.metrics && active.metrics.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-slate-200">
                      <p className="text-slate-500 text-sm mb-3">Key Metrics</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                        {active.metrics.map((item, idx) => (
                          <li key={idx} className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Shared showcase styles are in style.css */}
    </div>
  );
};

export default ProjectShowcase;
