import { useEffect, useState } from "react";
import ScrollAnimator from "../ScrollAnimator";
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
const rowOne = partners.slice(0, 6);
const rowTwo = partners.slice(6, 12);
const PartnersSection = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const stepMs = visibleCount === 0 ? 250 : 420;
    const pauseMs = 1200;
    const resetMs = 300;

    let timer: ReturnType<typeof setTimeout>;

    if (visibleCount < 20) {
      timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, stepMs);
    } else if (!isResetting) {
      timer = setTimeout(() => {
        setIsResetting(true);
      }, pauseMs);
    } else {
      timer = setTimeout(() => {
        setVisibleCount(0);
        setIsResetting(false);
      }, resetMs);
    }

    return () => clearTimeout(timer);
  }, [visibleCount, isResetting]);

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <ScrollAnimator />
      <div className="container-main relative">
        <style>{`
          .glass-sheen,
          .glass-streak,
          .glass-glow {
            animation: none;
          }
        `}</style>

        {/* <div className="text-center mb-10 md:mb-14">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Trusted Partners
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Partnerships with <span className="text-primary">Cement Plants</span>
          </h2>
        </div> */}
        <div className="text-left mb-10 md:mb-14">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Trusted Partners
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Partnerships with <span className="text-primary">Cement Plants</span>
          </h2>
          
        </div>


        <div className="relative space-y-6 md:space-y-8 bg-card p-6 md:p-8 ">
          <div className="flex flex-nowrap justify-center gap-6 md:gap-8 ">
            {rowOne.map((partner, index) => {
              const isVisible = index < visibleCount;
              const shouldShow = isVisible && !isResetting;
              return (
                <div
                  key={`row1-${partner.name}`}
                  className={`transition-all duration-300 ease-out ${shouldShow ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                    }`}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="relative group w-[clamp(7.5rem,11vw,13rem)] h-16 md:h-20 bg-card shadow-sm flex items-center justify-center px-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md shrink-0 border border-border rounded-lg">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="relative max-h-9 md:max-h-10 w-auto object-cover opacity-95 transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-nowrap justify-center gap-4 md:gap-8 ">
            {rowTwo.map((partner, index) => {
              const isVisible = index < visibleCount;
              const shouldShow = isVisible && !isResetting;
              return (
                <div
                  key={`row2-${partner.name}`}
                  className={`transition-all duration-300 ease-out ${shouldShow ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                    }`}
                  style={{ willChange: "transform, opacity" }}
                >
                  <div className="relative group w-[clamp(7.5rem,11vw,13rem)] h-16 md:h-20 bg-card shadow-sm flex items-center justify-center px-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md shrink-0 border border-border rounded-lg">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="relative max-h-9 md:max-h-10 w-auto object-cover opacity-95 transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;


