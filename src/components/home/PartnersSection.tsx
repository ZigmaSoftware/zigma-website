import { useEffect, useMemo, useRef, useState } from "react";
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

import PartnersSectioncp from "./PartnersSectioncp";

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
const PartnersSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasShown, setHasShown] = useState(false);
  const delays = useMemo(() => {
    const base = Array.from({ length: partners.length }, (_, i) => i);
    for (let i = base.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    return base.map((i) => 120 + i * 90);
  }, []);

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

    <div>
    {/* <section ref={sectionRef} className="section-padding relative overflow-hidden bg-gradient-to-b from-slate-50 via-sky-50/60 to-emerald-50/70">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />
      </div>
      <div className="container-main relative">
        <style>{`
          .glass-sheen,
          .glass-streak,
          .glass-glow {
            animation: none;
          }
        `}</style>
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Trusted Partners
          </p>
          <h2 className="mt-3 text-2xl md:text-4xl font-bold text-foreground">
            Partnerships with <span className="text-primary">Cement Plants</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <div 
              key={partner.name}
              className={`transition-all duration-500 ease-out ${
                hasShown ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
              }`}
              style={{ transitionDelay: `${delays[index]}ms` }}
            >
              <div className="relative group w-44 md:w-52 h-16 md:h-20 rounded-2xl border border-white/70 bg-white/70 backdrop-blur-xl shadow-[0_18px_40px_rgba(15,23,42,0.16)] flex items-center justify-center px-6 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/60" />
                <div className="absolute -top-6 left-3 h-14 w-28 rounded-full bg-white/60 blur-2xl" />
                <div className="glass-sheen absolute inset-x-0 -top-6 h-12 bg-gradient-to-b from-white/60 via-white/30 to-transparent opacity-100" />
                <div className="glass-streak absolute -left-12 top-1/2 h-28 w-44 -translate-y-1/2 -rotate-12 bg-gradient-to-r from-white/55 via-white/25 to-transparent opacity-100 blur-[1px]" />
                <div className="glass-glow absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-white/35 blur-2xl opacity-90" />
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="relative max-h-9 md:max-h-10 w-auto object-cover opacity-95"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section> */}
    
    <PartnersSectioncp />

    </div>
  );
};

export default PartnersSection;


