import { useState, useEffect, useCallback, useRef } from "react";

// ─── Award Images ─────────────────────────────────────────────────────────────
import award1 from "../assets/Awards/award1.jpg";
import award2 from "../assets/Awards/award2.jpg";
import award3 from "../assets/Awards/award3.jpg";
import award4 from "../assets/Awards/award4.jpg";
import award5 from "../assets/Awards/award5.jpg";
// import award6 from "../assets/Awards/award6.jpg";
import award7 from "../assets/Awards/award7.jpg";
import award8 from "../assets/Awards/award8.jpg";
import award9 from "../assets/Awards/award9.jpg";
import award10 from "../assets/Awards/award10.jpg";
import award11 from "../assets/Awards/award11.png";
import award12 from "../assets/website/hero/award12_Swachha Andhra.png";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SliderSlide {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl: string;
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_SLIDES: SliderSlide[] = [
  {
    id: 1,
    title: "Award\nOne",
    imageUrl: award1,
  },
  {
    id: 2,
    title: "Award\nTwo",
    imageUrl: award2,
  },
  {
    id: 3,
    title: "Award\nThree",
    imageUrl: award3,
  },
  {
    id: 4,
    title: "Award\nFour",
    imageUrl: award4,
  },
  {
    id: 5,
    title: "Award\nFive",
    imageUrl: award5,
  },
  // {
  //   id: 6,
  //   title: "Award\nSix",
  //   imageUrl: award6,
  // },
  {
    id: 7,
    title: "Award\nSeven",
    imageUrl: award7,
  },
  {
    id: 8,
    title: "Award\nEight",
    imageUrl: award8,
  },
  {
    id: 9,
    title: "Award\nNine",
    imageUrl: award9,
  },
  {
    id: 10,
    title: "Award\nTen",
    imageUrl: award10,
  },
  {
    id: 11,
    title: "Award\nEleven",
    imageUrl: award11,
  },
  {
    id: 12,
    title: "Swachha\nAndhra",
    imageUrl: award12,
  },
];

// ─── Easing (matches original cubic-bezier) ───────────────────────────────────

const EASE_IN_OUT = "cubic-bezier(0.785,0.135,0.150,0.860)";
const EASE_OUT    = "cubic-bezier(0.260,0.005,0.135,1.000)";
const TIME        = 1800; // ms — matches $time

// ─── Slide component ──────────────────────────────────────────────────────────

interface SlideProps {
  slide: SliderSlide;
  isActive: boolean;
  onNext: () => void;
  /** true once the initial mount hack-animation has run */
  hacked: boolean;
}

function Slide({ slide, isActive, onNext, hacked }: SlideProps) {
  /**
   * We reproduce the SCSS animation logic with inline styles so the exact
   * cubic-bezier curves and timing are preserved without needing arbitrary
   * Tailwind extensions.
   */

  // ── __wrap ────────────────────────────────────────────────────────────────
  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    transformOrigin: "50% 50%",
    // Opacity trick: inactive wraps start opacity-0 until the hack class runs
    opacity: hacked ? 1 : 0,
    ...(isActive
      ? {
          transform: "translateX(0)",
          transition: `transform ${TIME / 4}ms ${EASE_IN_OUT}`,
          transitionDelay: `${TIME / 4}ms`,
        }
      : {
          transform: "translateX(0)",
          transition: `transform ${TIME / 4}ms ${EASE_IN_OUT}`,
          transitionDelay: `${TIME / 4}ms`,
        }),
  };

  // ── __back (blurred BG) ───────────────────────────────────────────────────
  const backStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${slide.imageUrl})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "none",
    ...(isActive
      ? {
          filter: `blur(0)`,
          transition: `filter ${TIME / 2}ms ${EASE_IN_OUT}`,
          transitionDelay: `${TIME / 2}ms`,
        }
      : {
          filter: "blur(0)",
          transition: `filter ${TIME / 4}ms ${EASE_IN_OUT}`,
        }),
  };

  // ── __inner (sharp scaled image) ─────────────────────────────────────────
  const innerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${slide.imageUrl})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "0",
    boxSizing: "border-box",
    opacity: isActive ? 1 : 0,
    ...(isActive
      ? {
          transform: "scale(1)",
          boxShadow: "none",
          pointerEvents: "auto",
          transition: `transform ${TIME / 2}ms ${EASE_IN_OUT}, opacity ${TIME / 4}ms ease-out`,
          transitionDelay: `${TIME / 4}ms`,
        }
      : {
          transform: "scale(0.85)",
          boxShadow: "none",
          pointerEvents: "none",
          transition: `transform ${TIME / 4}ms ${EASE_IN_OUT}, opacity ${TIME / 4}ms step-end`,
        }),
  };

  // ── __content ─────────────────────────────────────────────────────────────
  const contentStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    opacity: isActive ? 1 : 0,
    transition: `opacity ${TIME / 4}ms`,
    transitionDelay: isActive ? `${TIME * 3 / 4}ms` : "0ms",
    fontFamily: "'Heebo', sans-serif",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: isActive ? 2 : 0,
        pointerEvents: "none",
        transition: `transform ${TIME / 3}ms ${EASE_IN_OUT}`,
        transitionDelay: `${TIME / 3}ms`,
      }}
    >
      {/* __wrap */}
      <div style={wrapStyle}>
        {/* __back */}
        <div style={backStyle} />

        {/* __inner */}
        <div style={innerStyle}>
          {/* __content */}
          <div style={contentStyle} />
        </div>
      </div>
    </div>
  );
}

// ─── Navigation Buttons (Left/Right) ──────────────────────────────────────────

interface NavButtonProps {
  onClick: () => void;
  direction: "left" | "right";
}

function NavButton({ onClick, direction }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Go to ${direction} slide`}
      className={`absolute ${direction === "left" ? "left-6" : "right-6"} top-1/2 z-40 h-11 w-11 -translate-y-1/2 rounded-lg border border-slate-300 bg-white/90 text-slate-700 shadow-sm transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto h-5 w-5"
        aria-hidden="true"
      >
        {direction === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
}

// ─── Thumbnails ───────────────────────────────────────────────────────────────

interface ThumbnailsProps {
  slides: SliderSlide[];
  current: number;
  onChange: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

function Thumbnails({ slides, current, onChange, onPrev, onNext }: ThumbnailsProps) {
  const visibleCount = Math.min(10, slides.length);
  const startIndex =
    slides.length <= visibleCount
      ? 0
      : (current - Math.floor(visibleCount / 2) + slides.length) % slides.length;

  const visibleSlides = Array.from({ length: visibleCount }, (_, offset) => {
    const realIndex = (startIndex + offset) % slides.length;
    return { slide: slides[realIndex], realIndex };
  });

  return (
    <div className="w-full">
      {/* Smaller Thumbnails Grid */}
      <div className="w-full grid grid-cols-10 justify-items-center gap-2 px-2">
        {visibleSlides.map(({ slide, realIndex }) => (
          <button
            key={`small-${slide.id}`}
            onClick={() => onChange(realIndex)}
            className={`
              h-10 w-10 rounded-md overflow-hidden cursor-pointer
              transition-all duration-300 ease-out
              ${realIndex === current
                ? "border-2 border-gray-500 opacity-100 scale-105 shadow-lg" 
                : "border border-white/20 opacity-40 "
              }
              bg-gray-900
            `}
          >
            <img
              src={slide.imageUrl}
              alt={`Thumbnail ${realIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Arrow link ───────────────────────────────────────────────────────────────

function NextArrow({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const TIME2 = TIME * 2 / 3;

  return (
    <a
      onClick={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        fontSize: "2.4vh",
        letterSpacing: "0.3vh",
        fontWeight: 100,
        position: "relative",
        display: "inline-block",
        paddingLeft: "6vh",
        paddingRight: "2vh",
        color: "white",
        userSelect: "none",
        textDecoration: "none",
      }}
    >
      next
      {/* horizontal line */}
      <span
        style={{
          content: "''",
          display: "block",
          width: "9vh",
          background: "white",
          height: "1px",
          position: "absolute",
          top: "50%",
          left: "6vh",
          transformOrigin: "0% 50%",
          transform: hovered ? "scaleX(1.5)" : "scaleX(1)",
          transition: `transform ${hovered ? TIME2 : TIME / 2}ms ${EASE_IN_OUT}`,
        }}
      />
      {/* chevron arrow */}
      <span
        style={{
          display: "block",
          borderTop: "1px solid white",
          borderRight: "1px solid white",
          width: "1vh",
          height: "1vh",
          position: "absolute",
          top: "50%",
          left: "15vh",
          transform: hovered
            ? `translateX(6vh) translateY(-50%) rotate(45deg)`
            : `translateX(0) translateY(-50%) rotate(45deg)`,
          transition: `transform ${hovered ? TIME2 : TIME / 2}ms ${EASE_IN_OUT}`,
        }}
      />
    </a>
  );
}


// ─── Main component ───────────────────────────────────────────────────────────

export interface FullScreenSliderProps {
  slides?: SliderSlide[];
}

export default function FullScreenSlider({
  slides = DEFAULT_SLIDES,
}: FullScreenSliderProps) {
  const [current, setCurrent] = useState(0);
  const [hacked, setHacked] = useState(false);
  const total = slides.length;

  // Reproduce the original 1s setTimeout hack that enables wrap animations
  useEffect(() => {
    const t = setTimeout(() => setHacked(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-sliding functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 3000); // Auto-slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full" >
      <div className="flex flex-col items-center w-full md:w-11/12 md:max-w-4xl gap-8 px-4">
        {/* Award Display Container */}
        <NavButton onClick={goPrev} direction="left" />
          <NavButton onClick={goNext} direction="right" />
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "500px" }}>
          {/* Navigation Buttons - Inside Slider Container */}
          
          
          {slides.map((slide, i) => (
            <Slide
              key={slide.id}
              slide={slide}
              isActive={i === current}
              onNext={goNext}
              hacked={hacked}
            />
          ))}
        </div>

        {/* Thumbnails at Bottom */}
        <div className="w-full">
          <Thumbnails slides={slides} current={current} onChange={goTo} onPrev={goPrev} onNext={goNext} />
        </div>
      </div>
    </div>
  );
}
