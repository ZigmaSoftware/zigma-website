import adaniCementLogo from "@/assets/Cement Svgs/adani-cement_logo.jpg";
import adaniLogo from "@/assets/Cement Svgs/adani-logo.svg";
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
import birlaLogo from "@/assets/Cement Svgs/birla-logo.jpg";
import chettinadLogo from "@/assets/Cement Svgs/Chettinad Cement.png";
import jswLogo from "@/assets/Cement Svgs/jsw-cement.jpeg";
import mycemLogo from "@/assets/Cement Svgs/HC logo.png";
import ramcoLogo from "@/assets/Cement Svgs/Ramco.jpg";
import shreeLogo from "@/assets/Cement Svgs/shree-cement-logo.jpg";
import starLogo from "@/assets/Cement Svgs/star-cement-logo.svg";
import tnCementsLogo from "@/assets/Cement Svgs/Tamil Nadu Cements.svg";

const partners = [
  // { name: "Adani Cement", logo: adaniCementLogo },
  { name: "Adani Group", logo: adaniLogo },
  { name: "Bharathi Cement Corporation Pvt Ltd", logo: svg1 },
  { name: "The India Cements Limited", logo: svg2 },
  { name: "ACC Limited", logo: svg3 },
  { name: "Ambuja Cements Limited", logo: svg4 },
  { name: "Birla Corporation Ltd", logo: birlaLogo },
  { name: "Chettinad Cement Corporation Pvt Ltd", logo: chettinadLogo },
  { name: "Dalmia Cement (B) Ltd", logo: svg5 },
  // { name: "Zuari Cement Limited", logo: svg6 },
  { name: "Kalburgi Cement Private Limited", logo: svg7 },
  { name: "JK Cement Ltd", logo: svg8 },
  { name: "Ultratech Cement Limited", logo: svg9 },
  { name: "Dhandapani Cements Pvt Ltd", logo: svg10 },
  { name: "Heidelberg Cement India Limited", logo: svg11 },
  { name: "Nuvoco Vistas Corporation Ltd", logo: svg12 },
  { name: "JSW Cement Limited", logo: jswLogo },
  { name: "My Home Industries Private Limited", logo: mycemLogo },
  { name: "Shree Cement Ltd", logo: shreeLogo },
  { name: "Star Cement Limited", logo: starLogo },
  { name: "Tamil Nadu Cements Corporation Ltd", logo: tnCementsLogo },
  { name: "The Ramco Cements Limited", logo: ramcoLogo },
];

const PartnersSection = () => {
  const rowOne = partners.filter((_, index) => index % 2 === 0);
  const rowTwo = partners.filter((_, index) => index % 2 !== 0);
  const getLogoScaleClass = (name: string) => (/ramco/i.test(name) ? "scale-125" : "");

  return (
    <section
      className="section-padding relative overflow-hidden bg-background"
      data-anim-start="top 90%"
      data-anim-duration="1.1"
    >
      <div className="container-main relative">
        <div className="text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Trusted Partners
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Partnerships with <span className="text-primary">Cement Plants</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-center text-sm md:text-lg  ">
                We convert legacy waste into high-calorific RDF for co-processing in cement kilns, reducing landfill burden and fossil fuel dependency while advancing measurable decarbonization outcomes.
              </p>
          
        </div>


        <div className="mt-6 space-y-4">
          <div className="relative overflow-hidden rounded-xl bg-card/40">
            <div className="flex w-max items-center gap-4 py-3 px-3 animate-partners-marquee hover:[animation-play-state:paused]">
              {rowOne.map((partner) => (
                <div
                  key={`${partner.name}-row1-a`}
                  className="group relative min-w-[150px] md:min-w-[180px] h-16 md:h-20 bg-card rounded-lg flex items-center justify-center px-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:z-10"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`max-h-9 md:max-h-10 w-auto max-w-full object-contain opacity-95 transition-opacity transition-transform duration-300 ease-out group-hover:opacity-100 ${getLogoScaleClass(
                      partner.name
                    )}`}
                    loading="lazy"
                  />
                </div>
              ))}
              {rowOne.map((partner) => (
                <div
                  key={`${partner.name}-row1-b`}
                  aria-hidden="true"
                  className="group relative min-w-[150px] md:min-w-[180px] h-16 md:h-20 bg-card rounded-lg flex items-center justify-center px-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:z-10"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`max-h-9 md:max-h-10 w-auto max-w-full object-contain opacity-95 transition-opacity transition-transform duration-300 ease-out group-hover:opacity-100 ${getLogoScaleClass(
                      partner.name
                    )}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-card/40">
            <div className="flex w-max items-center gap-4 py-3 px-3 animate-partners-marquee-reverse hover:[animation-play-state:paused]">
              {rowTwo.map((partner) => (
                <div
                  key={`${partner.name}-row2-a`}
                  className="group relative min-w-[150px] md:min-w-[180px] h-16 md:h-20 bg-card rounded-lg flex items-center justify-center px-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:z-10"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`max-h-9 md:max-h-10 w-auto max-w-full object-contain opacity-95 transition-opacity transition-transform duration-300 ease-out group-hover:opacity-100 ${getLogoScaleClass(
                      partner.name
                    )}`}
                    loading="lazy"
                  />
                </div>
              ))}
              {rowTwo.map((partner) => (
                <div
                  key={`${partner.name}-row2-b`}
                  aria-hidden="true"
                  className="group relative min-w-[150px] md:min-w-[180px] h-16 md:h-20 bg-card rounded-lg flex items-center justify-center px-3 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:z-10"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`max-h-9 md:max-h-10 w-auto max-w-full object-contain opacity-95 transition-opacity transition-transform duration-300 ease-out group-hover:opacity-100 ${getLogoScaleClass(
                      partner.name
                    )}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
