import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// import Pic1 from "@/assets/people at zigma/Picture1.png";
import Pic2 from "@/assets/people at zigma/6P6A2357.JPG.jpeg";
import Pic3 from "@/assets/people at zigma/Picture2.png";
// import Pic4 from "@/assets/people at zigma/Picture3.png";
import Pic5 from "@/assets/people at zigma/image jbrhe.jpg";
import Pic6 from "@/assets/people at zigma/image cdb.jpg";
import Pic7 from "@/assets/people at zigma/image cej.jpg";
import Pic8 from "@/assets/people at zigma/image dcd.jpg";
import Pic9 from "@/assets/people at zigma/image ef.jpg";
import Pic10 from "@/assets/people at zigma/image frhb.jpg";
import Pic11 from "@/assets/people at zigma/image hbj.jpg";
import Pic12 from "@/assets/people at zigma/image hfjr.jpg";
// import Pic13 from "@/assets/people at zigma/image kfr.jpg";
import Pic14 from "@/assets/people at zigma/images edwq.jpg";
// import Pic15 from "@/assets/people at zigma/office front.png";
import Pic16 from "@/assets/people at zigma/Picture 4.jpg";
import Pic17 from "@/assets/people at zigma/bday p1.jpg";
import Pic18 from "@/assets/people at zigma/crismas p1.jpg";
import Pic19 from "@/assets/people at zigma/crtm p2.jpg";
import Pic20 from "@/assets/people at zigma/crstm p3.jpg";
import Pic21 from "@/assets/people at zigma/mdc p1.jpg";
import Pic22 from "@/assets/people at zigma/mdc p2.jpg";
import Pic23 from "@/assets/people at zigma/newyear p1.jpg";
import Pic24 from "@/assets/people at zigma/newyear p2.jpg";
import Pic25 from "@/assets/people at zigma/newyear p3.jpg";


// import Pic17 from "@/assets/people at zigma/WhatsApp Image 2025-09-23 at 15.08.43_d4bbc581.jpg.jpeg";

import { TrendingUp, BarChart3, Users } from "lucide-react";

const collageImages = [
  // { title: "Erode Head Office", image: Pic1 },
  { title: "Chennai Office", image: Pic2 },
  { title: "Annual Team Meet", image: Pic3 },
  // { title: "Employee Engagement", image: Pic4 },
  { title: "Team Culture", image: Pic5 },
  { title: "Field Operations", image: Pic6 },
  { title: "CSR Activities", image: Pic7 },
  { title: "Leadership Meet", image: Pic8 },
  { title: "Plant Operations", image: Pic9 },
  { title: "On-site Review", image: Pic10 },
  { title: "People at Work", image: Pic11 },
  { title: "Team Moments", image: Pic12 },
  // { title: "Office Moments", image: Pic13 },
  { title: "World Earth Day", image: Pic14 },
  // { title: "Office Front", image: Pic15 },
  { title: "Team Photo", image: Pic16 },
  { title: "Birthday Celebration", image: Pic17 },
  { title: "Christmas Celebration 1", image: Pic18 },
  { title: "Christmas Celebration 2", image: Pic19 },
  { title: "Christmas Celebration 3", image: Pic20 },
  { title: "MDC Event 1", image: Pic21 },
  { title: "MDC Event 2", image: Pic22 },
  { title: "New Year Celebration 1", image: Pic23 },
  { title: "New Year Celebration 2", image: Pic24 },
  { title: "New Year Celebration 3", image: Pic25 },
];

/*  
   COMPONENT
===================================================== */
const People = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Header />

      <div className="pt-20">
        {/* HERO GRID */}
        <section className="bg-white py-1 w-full">
          <div className=" mx-auto">
            
          {/*             
            <h2 className="mb-10 text-center text-2xl md:text-3xl font-bold">
              Life at Zigma
            </h2> */}

            <div className="columns-2 sm:columns-3 lg:columns-4 gap-1 px-4">
              {collageImages.map((item, i) => (
                <div key={i} className="mb-1 break-inside-avoid">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*        WORKING @ ZIGMA – REFINED DESIGN */}
        <section className="bg-slate-50 py-20 ">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center">
              {/* <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Working @ Zigma
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                A performance-driven workplace where people, purpose, and
                progress move together.
              </p> */}

                          <span className="text-sm  uppercase tracking-[0.3em] text-muted-foreground">
             Working @ Zigma
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
              Where Performance Meets<span className="text-primary"> Purpose</span>
            </h2>

            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-center text-sm md:text-lg  ">
                  A performance-driven workplace where people, purpose, and
                progress move together.
              </p>
            </div>

            <div className="grid text-center grid-cols-1 md:grid-cols-3 gap-8  container-main section-padding">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-50 mb-6 mx-auto">
                  <TrendingUp className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Supersonic Growth
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Accelerate your career with real ownership, challenging
                  projects, and fast-tracked learning opportunities.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-50 mb-6 mx-auto">
                  <BarChart3 className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Continuous Opportunity
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Work across domains, expand your skills, and unlock growth
                  paths aligned with your ambition.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-green-50 mb-6 mx-auto">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  People-First Culture
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Thrive in a collaborative, respectful, and high-energy
                  environment that values people as much as performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default People;
