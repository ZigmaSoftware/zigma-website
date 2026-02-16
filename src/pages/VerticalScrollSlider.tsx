import React, { useState, useEffect, useRef } from 'react';
import { Phone, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VerticalScrollSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);

  const slides = [
    {
      id: 1,
      number: "1",
      title: "Comprehensive Waste Management Solutions",
      subtitle: "Clearing the Past, Securing the Future",
      description: "Zigma Global Environ Solutions  Pvt. Ltd. offers end-to-end waste management solutions — from collection to disposal — for urban, industrial, commercial, and institutional clients. Our approach ensures environmental compliance, cost-efficiency, and sustainability. Our holistic waste management solutions cater to municipalities, smart cities, townships, and institutions. We help transform the traditional waste chain into a circular economy.",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80"
    },
    {
      id: 2,
      number: "2",
      title: "Reviving Land, Restoring Balance",
      subtitle: "Turning Waste Mountains into Green Spaces",
      description: "Old dumpsites are a major environmental hazard. Zigma Global Environ Solutions  specializes in turning decades-old waste mountains into usable, green spaces. With years of hands-on experience in scientific remediation of legacy waste, we turn hazardous dumpsites into eco-friendly, usable land — safely, efficiently, and sustainably.",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&q=80"
    },
    {
      id: 3,
      number: "3",
      title: "Efficient Solutions for Everyday Waste",
      subtitle: "Fresh Waste Management Excellence",
      description: "Zigma Global Environ Solutions  Pvt. Ltd. offers end-to-end fresh waste management services, from collection to sorting and disposal. We ensure that waste from households, commercial establishments, and industries is efficiently processed, reducing environmental harm. Whether you are looking for routine collection services or need a customized waste management plan, we provide innovative solutions for each scenario. Our team sorts waste into recyclable, compostable, and landfill categories, contributing to circular economy.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80"
    }
  ];

  const handleScroll = (e) => {
    if (isScrolling) return;

    const delta = e.deltaY;
    
    if (delta > 0 && currentSlide < slides.length - 1) {
      // Scroll down
      setIsScrolling(true);
      setCurrentSlide(prev => prev + 1);
      setTimeout(() => setIsScrolling(false), 1000);
    } else if (delta < 0 && currentSlide > 0) {
      // Scroll up
      setIsScrolling(true);
      setCurrentSlide(prev => prev - 1);
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isScrolling) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < slides.length - 1) {
        // Swipe up
        setIsScrolling(true);
        setCurrentSlide(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (diff < 0 && currentSlide > 0) {
        // Swipe down
        setIsScrolling(true);
        setCurrentSlide(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    }
  };

  const scrollToSlide = (index) => {
    if (!isScrolling && index !== currentSlide) {
      setIsScrolling(true);
      setCurrentSlide(index);
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const scrollToTop = () => {
    setCurrentSlide(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      return () => container.removeEventListener('wheel', handleScroll);
    }
  }, [currentSlide, isScrolling]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gray-100"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
        <Header />
      {/* Slides Container */}
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSlide * 100}vh)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute top-0 left-0 w-full h-screen flex items-center"
            style={{ 
              top: `${index * 100}vh`,
              opacity: Math.abs(currentSlide - index) <= 1 ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          >
            <div className="w-full h-full flex flex-col lg:flex-row items-center px-6 lg:px-16 py-12 bg-gray-50">
              {/* Image Section */}
              <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center mb-8 lg:mb-0">
                <div 
                  className="relative w-full max-w-2xl h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10%)',
                    animation: currentSlide === index ? 'slideInLeft 1s ease-out' : 'none'
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div 
                className="w-full lg:w-1/2 lg:pl-16 flex flex-col justify-center"
                style={{
                  animation: currentSlide === index ? 'slideInRight 1s ease-out 0.2s both' : 'none'
                }}
              >
                {/* Number */}
                <div className="text-8xl lg:text-9xl font-black text-emerald-600 mb-4 leading-none">
                  {slide.number}
                </div>

                {/* Title */}
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <h3 className="text-xl lg:text-2xl text-emerald-600 font-semibold mb-6">
                  {slide.subtitle}
                </h3>

                {/* Description */}
                <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
                  {slide.description}
                </p>

                {/* Button */}
                <div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-lg">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => scrollToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-emerald-600 h-12' 
                : 'bg-gray-400 hover:bg-emerald-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Action Buttons */}
      {/* <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50"> */}
        {/* Call Button */}
        {/* <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </button> */}

        {/* Scroll to Top Button */}
        {/* <button
          onClick={scrollToTop}
          className={`bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
            currentSlide > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button> */}

      {/* </div> */}

      {/* Scroll Hint */}
      {/* {currentSlide === 0 && (
        <div 
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 text-emerald-600 flex flex-col items-center gap-2"
          style={{ animation: 'bounce 2s ease-in-out infinite' }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronUp className="w-6 h-6 rotate-180" />
        </div>
      )} */}

              {/* <Footer /> */}


      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
      `}</style>
      
    </div>
    
  );
};

export default VerticalScrollSlider;

