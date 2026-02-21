import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
// import Container from "./Container";

import img1 from "@/assets/website/noida present.png";
import img2 from "@/assets/website/landfill mining.png";
import img3 from "@/assets/home4.jpg";
import img4 from "@/assets/home5.jpg";
import img5 from "@/assets/home6.jpg";


const slides = [
  {
    image: img1,
    title: "Transforming Legacy Waste Into Green Urban Assets",
  },
  {
    image: img2,
    title: "Engineering Large-Scale Landfill Remediation",
  },
  {
    image: img3,
    title: "Restoring Land Through Advanced Waste Recovery",
  },
  {
    image: img4,
    title: "Uncontrolled landfill methane poses 23 times the climate impact of CO2.",
  },
  {
    image: img5,
    title: "Only 75 % of the urban waste produced in India each year is collected",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === current) return;
      setCurrent(index);
    },
    [current],
  );

  // Continuous auto slide for all slides
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className=" relative h-[100vh] flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28 "
    >
      <ScrollToTop />

      {/* Background Images (Fade Only) */}
   <div className="absolute inset-0 pointer-events-none">
  {slides.map((slide, index) => {
    const isActive = index === current;

    return (
      <div 
        key={slide.image}
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Zooming Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center ${
            isActive ? "animate-heroZoom" : ""
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 via-foreground/20 to-transparent" />



        
      </div>
    );
  })}
</div>
   

      {/* Content */}
      <div className="container-main relative z-10 w-full">
        <div className="max-w-xl text-background transition-all duration-700 ease-out">
          <div className="relative pl-6 overflow-hidden">
            {/* Accent Line */}
            <div className="absolute left-0 top-0 h-full w-1 bg-primary animate-lineGrow" />

            {/* Animated Text */}
            <h1
              key={current}
              className="text-5xl md:text-5xl font-semibold text-white leading-tight tracking-tight opacity-0 translate-x-[-40px] animate-slideIn"
            >
              {slides[current].title}
            </h1>
             
            {/* <p>
              {slides[current].subtitle}
            </p> */}
          </div>

          <div className="flex flex-wrap  gap-4 mt-4  bg-transparent shadow-md">
            {/* <Button variant="heroOutline"  size="lg" asChild className="border " >
              <Link to="/services">Our Services</Link>
            </Button> */}

            <Button variant="heroOutline" size="lg" asChild className="border ml-6 ">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute inset-x-0 top-6 z-[30] pointer-events-none">
        <div className="container-main flex justify-end">
          <div
            className="flex gap-3 pointer-events-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-transparent shadow-md flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-transparent shadow-md flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Indicators - Horizontal sliding lines on right middle */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="container-main relative h-full">
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-6 h-[1px] rounded-full transition-all duration-300 transform -rotate-12 ${
                  index === current
                    ? "bg-white scale-100"
                    : "bg-white/30 scale-75 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
