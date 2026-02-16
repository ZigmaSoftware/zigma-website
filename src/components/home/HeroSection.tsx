import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

import img1 from "@/assets/website/noida present.png";
import img2 from "@/assets/website/landfill mining.png";
import img3 from "@/assets/hero-bg.jpg";
import img4 from "@/assets/completed_project.jpg";

const slides = [
  {
    image: img1,
    title: "Innovative Waste Solutions",
  },
  {
    image: img2,
    title: "Landfill Mining",
  },
  {
    image: img3,
    title: "Sustainable Future",
  },
  {
    image: img4,
    title: "Proven Results",
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
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative h-[100vh] flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ScrollToTop />

      {/* Background Images (Fade Only) */}
      <div className="absolute inset-0 pointer-events-none bg-foreground">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
              <div className="absolute inset-0 bg-black/2" />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="container-main relative z-10 w-full">
        <div className="max-w-2xl text-background transition-all duration-700 ease-out">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight whitespace-pre-line drop-shadow-lg">
            {slides[current].title}
          </h1>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/services">Our Services</Link>
            </Button>

            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute top-6 right-6 flex gap-3 z-[60] pointer-events-auto">
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

      {/* Indicators - Horizontal sliding lines on right middle */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 rounded-full ${
              index === current
                ? "w-12 h-1 bg-primary rounded-full"
                : index < current
                ? "w-6 h-1 bg-white/30 rounded-full"
                : "w-1 h-1 bg-white/10 rounded-full"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
