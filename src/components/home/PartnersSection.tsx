import { useEffect, useRef, useState } from "react";
import { Handshake } from "lucide-react";
import svg1 from "@/assets/Cement Svgs/Vector.53dee65f3b0d9da04365c863143abecf.svg";
import svg2 from "@/assets/Cement Svgs/image 10.7346932e76235806e74c2ce978ac18ba.svg";
import svg3 from "@/assets/Cement Svgs/image 11.f3351996401bebfa9d851fe3470552d5.svg";
import svg4 from "@/assets/Cement Svgs/image 12.1dd46e8a48fb067247421b48c72601e4.svg";
import svg5 from "@/assets/Cement Svgs/image 13.da07b6aa0ab9b03d4052e8bf51e1d394.svg";
import svg6 from "@/assets/Cement Svgs/image 14.b132fd4011f25920c2f33aaa46a60c52.svg";
import svg7 from "@/assets/Cement Svgs/image 15.d34ca9cecf940bf3d8f986e50748f03c.svg";
import svg8 from "@/assets/Cement Svgs/image 16.3e17e493bacc6b274c6ec289ce7e2c5a.svg";
import svg9 from "@/assets/Cement Svgs/image 17.eb96e28633daedc876b07c457fbf4685.svg";
import svg10 from "@/assets/Cement Svgs/image 18.cd14aefdaa68b56c376f6464db205e17.svg";
import svg11 from "@/assets/Cement Svgs/image 19.be1ca566e42e32cab74459351df5f8f7.svg";
import svg12 from "@/assets/Cement Svgs/image 20.f3476c05dd7bbb13053e5f128739b993.svg";

const partners = [
  { name: "VICAT", logo: svg1 },
  { name: "The India Cements Ltd", logo: svg2 },
  { name: "ACC", logo: svg3 },
  { name: "Ambuja Cements", logo: svg4 },
  { name: "Dalmia Cement", logo: svg5 },
  { name: "Zuari Cement", logo: svg6 },
  { name: "Shree Cement", logo: svg7 },
  { name: "JK Cement", logo: svg8 },
  { name: "UltraTech Cement", logo: svg9 },
  { name: "Birla Corporation", logo: svg10 },
  { name: "Ramco Cements", logo: svg11 },
  { name: "Nuvoco Vistas", logo: svg12 },
];

const desktopPositions = [
  { x: 12, y: 29 },
  { x: 27, y: 11 },
  { x: 42, y: 18 },
  { x: 58, y: 13 },
  { x: 74, y: 10 },
  { x: 88, y: 24 },
  { x: 92, y: 50 },
  { x: 86, y: 74 },
  { x: 72, y: 88 },
  { x: 56, y: 83 },
  { x: 32, y: 85 },
  { x: 15, y: 68 },
];

const PartnersSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasShown) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasShown]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-8 h-72 w-[40rem] -translate-x-1/2 rounded-full " />
      </div>

      <div className="container-main relative">
        <div className="mb-8 text-center md:mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Trusted Partners
          </p>
          <h2 className="mt-3 text-2xl font-bold text-foreground md:text-4xl">
            Connected <span className="text-primary">Cement Network</span>
          </h2>
        </div>

        <div className="relative mx-auto h-[380px] max-w-[960px] sm:h-[430px] md:h-[500px] xl:h-[520px] xl:max-w-[1100px]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {partners.map((partner, index) => {
              const point = desktopPositions[index];
              if (!point) return null;
              const dotX = 50 + (point.x - 50) * 0.62;
              const dotY = 50 + (point.y - 50) * 0.62;

              return (
                <g key={`line-${partner.name}`}>
                  <line
                    x1="50"
                    y1="50"
                    x2={point.x}
                    y2={point.y}
                    stroke="#1e8549"
                    strokeWidth="0.2"
                    opacity="0.95"
                  />
                  {/* <circle cx={dotX} cy={dotY} r="0.42" fill="#8ccf63" /> */}
                  <circle className="opacity-95" r="0.35" fill="#1ea657">
                    <animate
                      attributeName="cx"
                      values={`50;${point.x};50`}
                      dur={`${4.8 + (index % 4) * 1}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values={`50;${point.y};50`}
                      dur={`${4.8 + (index % 4) * 1}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_20px_40px_rgba(15,23,42,0.15)] backdrop-blur sm:h-20 sm:w-20 xl:h-18 xl:w-18">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 sm:h-11 sm:w-11 xl:h-10 xl:w-10">
              <Handshake className="h-9 w-9 text-slate-600 transition-transform" />
            </div>
          </div>

          {partners.map((partner, index) => {
            const point = desktopPositions[index];
            if (!point) return null;

            return (
              <div
                key={partner.name}
                className={`group absolute z-10 h-[48px] w-[48px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.18)] transition-[transform,opacity] duration-500 ease-out hover:scale-110 sm:h-[62px] sm:w-[62px] md:h-[76px] md:w-[76px] xl:h-[92px] xl:w-[92px] ${
                  hasShown ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transitionDelay: `${index * 65}ms`,
                }}
                title={partner.name}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full p-2 sm:p-3 xl:p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-5 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110 sm:max-h-7 xl:max-h-10"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
