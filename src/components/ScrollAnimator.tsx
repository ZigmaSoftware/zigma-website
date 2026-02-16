import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollAnimator = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const candidates = new Set<Element>();

    document
      .querySelectorAll("section, [data-scroll], .scroll-animate")
      .forEach((el) => candidates.add(el));

    const base =
      document.querySelector("main") ?? document.querySelector("#root > div");

    if (base) {
      Array.from(base.children).forEach((el) => {
        const tag = el.tagName.toLowerCase();
        if (tag === "header" || tag === "footer") return;
        candidates.add(el);
      });
    }

    const elements = Array.from(candidates);
    if (elements.length === 0) return;

    elements.forEach((el) => el.classList.add("scroll-reveal"));

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname]);

  return null;
};

export default ScrollAnimator;
