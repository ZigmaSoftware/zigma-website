import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const runFadeUp = (elements: Element[]) => {
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 44, force3D: true },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform,willChange",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
      },
    );
  });
};

const runFadeLeft = (elements: Element[]) => {
  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, x: 56, force3D: true },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform,willChange",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
      },
    );
  });
};

const runStagger = (containers: Element[]) => {
  containers.forEach((container) => {
    const children = container.querySelectorAll("[data-stagger-item]");
    const targets = children.length > 0 ? Array.from(children) : Array.from(container.children);

    if (targets.length === 0) return;

    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 26, force3D: true },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,willChange",
        scrollTrigger: {
          trigger: container,
          start: "top 86%",
          once: true,
        },
      },
    );
  });
};

const ScrollAnimator = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const majorBlocks = gsap
        .utils.toArray("main > *, main section, main article")
        .filter((el) => {
          const element = el as Element;
          const tagName = element.tagName.toLowerCase();
          if (tagName === "header" || tagName === "footer") return false;
          if (element.hasAttribute("data-no-animate")) return false;
          return !element.hasAttribute("data-animate");
        });

      const fadeUpEls = gsap.utils.toArray('[data-animate="fade-up"]');
      const fadeLeftEls = gsap.utils.toArray('[data-animate="fade-left"]');
      const staggerEls = gsap.utils.toArray('[data-animate="stagger"]');
      const fallbackEls = gsap
        .utils.toArray("section, [data-scroll], .scroll-animate")
        .filter((el) => {
          const element = el as Element;
          const tagName = element.tagName.toLowerCase();
          if (tagName === "header" || tagName === "footer") return false;
          if (element.hasAttribute("data-no-animate")) return false;
          return !element.hasAttribute("data-animate");
        });
      const uniqueFallbackEls = Array.from(new Set([...majorBlocks, ...fallbackEls]));

      runFadeUp(fadeUpEls);
      runFadeUp(uniqueFallbackEls);
      runFadeLeft(fadeLeftEls);
      runStagger(staggerEls);

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      ScrollTrigger.clearScrollMemory();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollAnimator;
