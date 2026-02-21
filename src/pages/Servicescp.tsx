import React, { useState } from 'react';
 import image1 from "@/assets/website/noida present.png";
import image2 from "@/assets/website/landfill mining.png";
import image3 from "@/assets/hero-bg.jpg";
import image4 from "@/assets/completed_project.jpg";

export default function Servicescp() {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
     const sections = [
    {
      id: 'legacy-waste',
      title: 'Legacy Waste Reclamation',
      description: 'Scientific bio-mining and landfill reclamation programs that reduce dumpsite burden and recover usable land.',
      image: image1
    },
    {
      id: 'resource-recovery',
      title: 'Resource Recovery',
      description: 'Segregation and value extraction systems that convert waste streams into circular economy materials.',
      image: image2
    },
    {
      id: 'technical-control',
      title: 'Technical Control',
      description: 'Data-led operations, process monitoring, and engineering supervision to ensure predictable project performance.',
      image: image3
    },
    {
      id: 'compliance',
      title: 'Compliance Assurance',
      description: 'Policy-aligned execution, statutory documentation, and auditable reporting for municipalities and industrial partners.',
      image: image4
    }
  ];
  const handleSectionClick = (id) => {
    setSelectedSection(id);
  };

  // Determine which image to show
  const currentImage = hoveredSection 
    ? sections.find(s => s.id === hoveredSection)?.image 
    : sections[0].image; // Default to first section's image

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden ">


      <div className="absolute inset-0 transition-opacity duration-500">
        <img
          src={currentImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      </div>

      {/* Sections Container (Overlay) */}
      <div className="relative flex h-full">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-out group"
            style={{
              flex: hoveredSection === section.id ? 1.5 : 1,
            }}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => handleSectionClick(section.id)}
          >
            {/* Vertical Divider */}
            {index < sections.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-[2px] bg-white/20 z-10" />
            )}

            {/* Section Title (Always Visible) */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <h2 className="text-white font-bold text-2xl tracking-tight transform transition-all duration-300">
                {section.title}
              </h2>
            </div>

            {/* Hover Content */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-300 z-20 ${
                hoveredSection === section.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="max-w-md text-center">
                <h2 className="text-white font-bold text-4xl mb-4 tracking-tight">
                  {section.title}
                </h2>
                <p className="text-white/90 text-base leading-relaxed font-light">
                  {section.description}
                </p>
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedSection === section.id && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-30" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}