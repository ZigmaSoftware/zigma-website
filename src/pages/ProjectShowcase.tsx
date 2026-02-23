import React, { useState, useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';
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
  const [expandedSlideId, setExpandedSlideId] = useState<number | null>(null);

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

  const toggleDetails = (slideId: number) => {
    setExpandedSlideId(prev => (prev === slideId ? null : slideId));
  };

  const closeDetails = () => {
    setExpandedSlideId(null);
  };

  useEffect(() => {
    if (expandedSlideId === null) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDetails();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [expandedSlideId]);

  useEffect(() => {
    document.body.style.overflow = expandedSlideId !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedSlideId]);

  return (
    <div className="corporate-page relative min-h-screen bg-slate-50">
      <Header />
      <main className="pt-24 pb-8">
        <section className="container-main space-y-6">
          {slides.map((slide, index) => (
            <article key={slide.id} className="bg-white border border-slate-200 shadow-sm p-4 md:p-5 space-y-2 md:space-y-3 flex flex-col overflow-hidden">
              <div className="relative h-[34vh] sm:h-[36vh] lg:h-[40vh] overflow-hidden border border-slate-200">
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="relative h-full">
                    <img src={slide.beforeImage} alt={`${slide.title} before`} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="badge before-badge">BEFORE</span>
                  </div>
                  <div className="relative h-full">
                    <img src={slide.afterImage} alt={`${slide.title} after`} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="badge after-badge">AFTER</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-xs font-semibold tracking-widest text-slate-600 bg-white/80 backdrop-blur px-3 py-1 rounded-full">
                  {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
              </div>

              <div className="lg:pr-6 flex flex-col">
                <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
                  {slide.subtitle}
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                  {slide.title}
                </h2>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
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
                  type="button"
                  onClick={() => toggleDetails(slide.id)}
                  className="mt-1 text-right w-fit self-start group inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-[0.95rem] font-bold leading-none text-primary-foreground shadow-[0_12px_30px_hsl(var(--primary)/0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_hsl(var(--primary)/0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-expanded={expandedSlideId === slide.id}
                >
                  <span>{expandedSlideId === slide.id ? "Close Details" : "View Details"}</span>
                  {expandedSlideId === slide.id ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Details Modal */}
      {expandedSlideId !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 sm:py-8">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={closeDetails}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
          >
            {(() => {
              const active = slides.find(s => s.id === expandedSlideId);
              if (!active) return null;
              return (
                <div className="bg-white">
                  <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-6 pt-6 pb-4 backdrop-blur lg:px-8">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">{active.subtitle}</p>
                      <h3 className="mt-3 text-2xl md:text-3xl font-bold leading-tight text-foreground">{active.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={closeDetails}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800"
                      aria-label="Close details"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="max-h-[calc(90vh-96px)] overflow-y-auto px-6 py-5 lg:px-8">
                    <p className="mb-6 text-slate-700 leading-relaxed">{active.description}</p>

                    <div className="grid grid-cols-1 gap-4 text-sm text-slate-700 md:grid-cols-3">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="mb-1 text-slate-500">Project</p>
                        <p className="font-medium text-slate-800">{active.details.project}</p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="mb-1 text-slate-500">Focus</p>
                        <p className="font-medium text-slate-800">{active.details.focus}</p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <p className="mb-1 text-slate-500">Outcome</p>
                        <p className="font-medium text-slate-800">{active.details.outcome}</p>
                      </div>
                    </div>

                    {active.metrics && active.metrics.length > 0 && (
                      <div className="mt-6 border-t border-slate-200 pt-5">
                        <p className="mb-3 text-sm text-slate-500">Key Metrics</p>
                        <ul className="grid grid-cols-1 gap-2 text-sm text-slate-700 md:grid-cols-2">
                          {active.metrics.map((item, idx) => (
                            <li key={idx} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
        <Footer/>
      {/* Shared showcase styles are in style.css */}
    </div>
  );
};

export default ProjectShowcase;
