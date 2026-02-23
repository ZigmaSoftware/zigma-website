import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LenisLike = {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; offset?: number },
  ) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let isActive = true;
    let lenis: LenisLike | null = null;

    const init = async () => {
      try {
        const lenisModuleName = "lenis";
        const imported = await import(/* @vite-ignore */ lenisModuleName);
        const Lenis = imported.default;

        if (!isActive || !Lenis) return;

        lenis = new Lenis({
          duration: 1.1,
          smoothWheel: true,
          touchMultiplier: 1.5,
          wheelMultiplier: 0.95,
          normalizeWheel: true,
        });

        window.__lenis = lenis;
        lenis.scrollTo(window.scrollY, { immediate: true });

        const updateScroll = () => ScrollTrigger.update();
        gsap.ticker.lagSmoothing(0);

        const raf = (timeInSeconds: number) => {
          if (!lenis) return;
          lenis.raf(timeInSeconds * 1000);
        };

        gsap.ticker.add(raf);
        ScrollTrigger.addEventListener("refresh", updateScroll);
        ScrollTrigger.refresh();

        return () => {
          ScrollTrigger.removeEventListener("refresh", updateScroll);
          gsap.ticker.remove(raf);
        };
      } catch {
        // Graceful fallback when lenis is not installed in the local environment.
      }
      return undefined;
    };

    let cleanupTicker: (() => void) | undefined;
    init().then((cleanup) => {
      cleanupTicker = cleanup;
    });

    return () => {
      isActive = false;
      if (cleanupTicker) cleanupTicker();
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
