import React, { useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"

import faci1 from "@/assets/website/The Landfill Mining.jpg"
import faci2 from "@/assets/faci_2.jpg"
import faci3 from "@/assets/faci_3.png"
import faci4 from "@/assets/faci_4.png"
import faci5 from "@/assets/faci_5.png"
import faci6 from "@/assets/website/noida present.png"
// import faci12 from "@/assets/pic1.jpeg"

import faci_off1 from "@/assets/Office Img/Waiting Lounge.jpeg"
import faci_off2 from "@/assets/Office Img/Clean slate Conference Hall.jpeg"
import faci_off3 from "@/assets/Office Img/Oxygen oasis Conference Hall.jpeg"
import faci_off4 from "@/assets/Office Img/Cafeteria.jpg"
import faci_off5 from "@/assets/Office Img/Amphi Theater.jpeg"
import faci_off6 from "@/assets/Office Img/Office Corridor.jpg"


/* =====================
   DATA
===================== */

const services = [
  "Centralized control-room with CCTV, sensors, and real-time compliance alerts.",
  "Cross-trained operations, safety, and quality teams following daily SOP checklists.",
  "Community-facing programs enabling transparent site visits and local employment.",
  "Dedicated emergency response with backup power, gas management, and fire prevention.",
]

const facilities = [
  {
    img: faci1,
    caption: "State-of-the-art waste processing equipment supporting high-efficiency operations.",
  },
  {
    img: faci2,
    caption: "Advanced sorting and recycling technology maximizing material recovery.",
  },
  {
    img: faci3,
    caption: "Integrated waste management systems ensuring safety and statutory compliance.",
  },
  {
    img: faci4,
    caption: "High-throughput processing lines designed for large-scale waste handling.",
  },
  {
    img: faci5,
    caption: "Eco-conscious infrastructure built for long-term environmental sustainability.",
  },
  {
    img: faci6,
    caption: "Innovative waste management solutions for modern challenges.",
  },
]

const peopleEnvironment = [
  {
    img: faci_off1,
    caption: "Trained teams managing daily operations with a safety-first mindset.",
  },
  {
    img: faci_off2,
    caption: "Collaborative culture across operations, engineering, and compliance teams.",
  },
  {
    img: faci_off3,
    caption: "Clean, organized sites promoting productivity and accountability.",
  },
  {
    img: faci_off4,
    caption: "Dedicated professionals ensuring high standards in waste management processes.",
  },
  {
    img: faci_off5,
    caption: "Team members focused on innovation and continuous improvement.",
  },
  {
    img: faci_off6,
    caption: "Skilled workforce committed to environmental sustainability.",
  },
]


/* =====================
   COMPONENT
===================== */

function Facilities() {
  const [selectedCard, setSelectedCard] = React.useState(null)

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && selectedCard !== null) {
        setSelectedCard(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedCard])

  return (
    <section className="w-full bg-slate-50 text-slate-900">
      <ScrollToTop />
      <Header />

      <main className="flex flex-col gap-20 px-6 py-16">

        {/* INTRO
        <section className=" w-full max-w-6xl space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Facilities & Environment
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
              Infrastructure built for performance, safety, and sustainability
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              Our facilities form the backbone of our waste management operations.
              Each site is engineered to deliver operational efficiency while
              meeting stringent environmental, safety, and regulatory standards.
            </p>
          </div>
        </section> */}

        {/* FACILITIES GRID */}
        {/* <section className="mx-auto w-full max-w-6xl space-y-6"> */}
        <section className="container-main bg-white">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Our Facilities
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
              A snapshot of our operational assets
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => (
              <article
                key={index}
                className="relative border border-slate-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                onClick={() => setSelectedCard(index)}
              >
                <img
                  src={facility.img}
                  alt={`Facility ${index + 1}`}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg"></div>
                <div className="p-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {facility.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
            
        {/* PEOPLE & WORK ENVIRONMENT */}
        {/* <section className="mx-auto w-full max-w-6xl space-y-8"> */}
        <section className="container-main bg-slate-100 py-12">
          <div className=" space-y-10">

            {/* TEXT BLOCK */}
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                People & Workplace
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
                Built by people, operated with care
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
                Beyond infrastructure, our facilities reflect a strong culture of
                safety, accountability, and respect for people and communities.
                We invest continuously in training, workplace standards, and
                employee well-being.
              </p>
            </div>

            {/* IMAGE GRID */}
            <div className="grid gap-6 md:grid-cols-3">
              {peopleEnvironment.map((item, index) => (
                <article
                  key={index}
                  className="overflow-hidden border border-slate-200 bg-white shadow-sm"
                >
                  <img
                    src={item.img}
                    alt={`Work environment ${index + 1}`}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-slate-600">{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* SERVICES & SUPPORT */}
        <section className=" w-full max-w-4xl">
          <div className=" bg-white/80 p-8 shadow-sm backdrop-blur">
            <div className="flex flex-col gap-4 text-slate-700">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                Services & Support
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                End-to-end operational support
              </h2>

              <ul className="mt-4 space-y-3 text-sm leading-relaxed">
                {services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 border border-slate-200 bg-white/80 px-4 py-3"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    {service}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs uppercase tracking-widest text-slate-500">
                Continuous improvement and transparent reporting are integral to
                every engagement.
              </p>
            </div>
          </div>
        </section>

        {/* GOVERNANCE */}
        <section className="w-full max-w-8xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                Assurance Pillars
              </p>
              <h2 className="text-2xl font-semibold">
                Governance backed by data
              </h2>
              <p className="text-sm text-slate-300">
                Centralized dashboards track safety, environmental, and operational
                KPIs, with alerts routed directly to leadership and compliance teams.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Safety Leadership",
                "Environmental Stewardship",
                "Operational Transparency",
              ].map((pillar) => (
                <div
                  key={pillar}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm font-medium"
                >
                  {pillar}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {selectedCard !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setSelectedCard(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label="Close facility details modal"
            >
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 id="modal-title" className="text-xl font-semibold text-slate-900 mb-4">Facility Details</h2>
            <img
              src={facilities[selectedCard].img}
              alt={`Facility ${selectedCard + 1}`}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-base text-slate-700 leading-relaxed">
              {facilities[selectedCard].caption}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </section>
  )
}

export default Facilities



