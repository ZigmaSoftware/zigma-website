// import { useEffect, useState } from "react"
// import Header from "@/components/Header"
// import Footer from "@/components/Footer"
// import ScrollToTop from "@/components/ScrollToTop"

// import faci1 from "@/assets/website/The Landfill Mining.jpg"
// import faci2 from "@/assets/faci_2.jpg"
// import faci3 from "@/assets/faci_3.png"
// import faci4 from "@/assets/faci_4.png"
// import faci5 from "@/assets/faci_5.png"
// import faci6 from "@/assets/website/noida present.png"
// // import faci12 from "@/assets/pic1.jpeg"

// import faci_off1 from
//  "@/assets/Office Img/Waiting Lounge.jpeg"
// import faci_off2 from "@/assets/Office Img/Clean slate Conference Hall.jpeg"
// import faci_off3 from "@/assets/Office Img/Oxygen oasis Conference Hall.jpeg"
// import faci_off4 from "@/assets/Office Img/Cafeteria.jpg"
// import faci_off5 from "@/assets/Office Img/Amphi Theater.jpeg"
// import faci_off6 from "@/assets/Office Img/Office Corridor.jpg"


// /* =====================
//    DATA
// ===================== */

// const services = [
//   "Centralized control-room with CCTV, sensors, and real-time compliance alerts.",
//   "Cross-trained operations, safety, and quality teams following daily SOP checklists.",
//   "Community-facing programs enabling transparent site visits and local employment.",
//   "Dedicated emergency response with backup power, gas management, and fire prevention.",
// ]

// const facilities = [
//   {
//     img: faci1,
//     caption: "State-of-the-art waste processing equipment supporting high-efficiency operations.",
//   },
//   {
//     img: faci2,
//     caption: "Advanced sorting and recycling technology maximizing material recovery.",
//   },
//   {
//     img: faci3,
//     caption: "Integrated waste management systems ensuring safety and statutory compliance.",
//   },
//   {
//     img: faci4,
//     caption: "High-throughput processing lines designed for large-scale waste handling.",
//   },
//   {
//     img: faci5,
//     caption: "Eco-conscious infrastructure built for long-term environmental sustainability.",
//   },
//   {
//     img: faci6,
//     caption: "Innovative waste management solutions for modern challenges.",
//   },
// ]

// const peopleEnvironment = [
//   {
//     img: faci_off1,
//     caption: "Trained teams managing daily operations with a safety-first mindset.",
//   },
//   {
//     img: faci_off2,
//     caption: "Collaborative culture across operations, engineering, and compliance teams.",
//   },
//   {
//     img: faci_off3,
//     caption: "Clean, organized sites promoting productivity and accountability.",
//   },
//   {
//     img: faci_off4,
//     caption: "Dedicated professionals ensuring high standards in waste management processes.",
//   },
//   {
//     img: faci_off5,
//     caption: "Team members focused on innovation and continuous improvement.",
//   },
//   {
//     img: faci_off6,
//     caption: "Skilled workforce committed to environmental sustainability.",
//   },
// ]


// /* =====================
//    COMPONENT
// ===================== */

// function Facilities() {
//   const [selectedCard, setSelectedCard] = useState<number | null>(null)

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape' && selectedCard !== null) {
//         setSelectedCard(null)
//       }
//     }
//     document.addEventListener('keydown', handleKeyDown)
//     return () => document.removeEventListener('keydown', handleKeyDown)
//   }, [selectedCard])

//   return (
//     <section className="min-h-screen bg-background">
//       <ScrollToTop />
//       <Header />

//       <main className="scroll-pt-24 pt-24 pb-8">
//         <section className="relative min-h-[100svh] box-border flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
//           <div className="absolute inset-0 h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${faci1})` }} aria-hidden="true" />
//           <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />
//           <div className="container-main relative grid items-center text-center">
//             <div className="text-sm tracking-[0.35em] uppercase text-white/85 font-medium">
//               Facilities & Environment
//             </div>
//             <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">
//               Infrastructure Built For Performance
//             </h1>
//             <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
//               Explore our operational assets, workplace culture, and support systems designed to deliver safe, compliant,
//               and sustainable outcomes at scale.
//             </p>
//           </div>
//         </section>


//         {/* INTRO
//         <section className=" w-full max-w-6xl space-y-8">
//           <div>
//             <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
//               Facilities & Environment
//             </p>
//             <h1 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
//               Infrastructure built for performance, safety, and sustainability
//             </h1>
//             <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
//               Our facilities form the backbone of our waste management operations.
//               Each site is engineered to deliver operational efficiency while
//               meeting stringent environmental, safety, and regulatory standards.
//             </p>
//           </div>
//         </section> */}

//         {/* FACILITIES GRID */}
//         {/* <section className="mx-auto w-full max-w-6xl space-y-6"> */}
//         <section className="section-padding bg-white">

//           <div className="container-main">
//             <div className="text-center">
//             <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
//               Our Facilities
//             </p>
//             <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
//               A snapshot of our <span className="text-primary"> operational assets</span>
//             </h2>
//             <p className="mt-4 max-w-3xl mx-auto text-sm md:text-lg text-muted-foreground leading-relaxed">
//               Our facilities are designed for high-throughput, compliant, and safe operations while maintaining long-term sustainability outcomes.
//             </p>
//             </div>

//             <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {facilities.map((facility, index) => (
//                 <article
//                   key={index}
//                   className="relative overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer group"
//                   onClick={() => setSelectedCard(index)}
//                 >
//                   <img
//                     src={facility.img}
//                     alt={`Facility ${index + 1}`}
//                     className="w-full h-56 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
//                   <div className="p-4">
//                     <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
//                       {facility.caption}
//                     </p>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
            
//         {/* PEOPLE & WORK ENVIRONMENT */}
//         {/* <section className="mx-auto w-full max-w-6xl space-y-8"> */}
//         <section className="section-padding bg-slate-100">
//           <div className="container-main space-y-10">

//             {/* TEXT BLOCK */}
//             <div className="text-center">
//               <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
//                 People & Workplace
//               </p>
//               <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
//                 Built by people, operated <span className="text-primary"> with care</span> 
//               </h2>
//               <p className="mt-4 max-w-3xl mx-auto text-sm md:text-lg leading-relaxed text-muted-foreground">
//                 Beyond infrastructure, our facilities reflect a strong culture of
//                 safety, accountability, and respect for people and communities.
//                 We invest continuously in training, workplace standards, and
//                 employee well-being.
//               </p>
//             </div>

//             {/* IMAGE GRID */}
//             <div className="grid gap-6 md:grid-cols-3">
//               {peopleEnvironment.map((item, index) => (
//                 <article
//                   key={index}
//                   className="overflow-hidden border border-slate-200 bg-white shadow-sm"
//                 >
//                   <img
//                     src={item.img}
//                     alt={`Work environment ${index + 1}`}
//                     className="h-56 w-full object-cover"
//                   />
//                   <div className="p-4">
//                     <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.caption}</p>
//                   </div>
//                 </article>
//               ))}
//             </div>

//           </div>
//         </section>

//         {/* SERVICES & SUPPORT */}
//         {/* <section className="section-padding">
//           <div className="container-main max-w-4xl">
//             <div className="bg-white/80 p-6 md:p-8 shadow-sm backdrop-blur">
//             <div className="flex flex-col gap-4 text-slate-700">
//               <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
//                 Services & Support
//               </p>
//               <h2 className="mt-1 text-3xl md:text-4xl font-bold text-foreground leading-tight">
//                 End-to-end operational support
//               </h2>

//               <ul className="mt-4 space-y-3 text-base leading-relaxed">
//                 {services.map((service) => (
//                   <li
//                     key={service}
//                     className="flex items-start gap-3 border border-slate-200 bg-white/80 px-4 py-3"
//                   >
//                     <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
//                     {service}
//                   </li>
//                 ))}
//               </ul>

//               <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
//                 Continuous improvement and transparent reporting are integral to
//                 every engagement.
//               </p>
//             </div>
//           </div>
//           </div>
//         </section> */}

//         {/* GOVERNANCE */}
//         {/* <section className="w-full max-w-8xl">
//           <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
//             <div className="space-y-3">
//               <p className="text-sm font-semibold uppercase tracking-widest text-slate-300">
//                 Assurance Pillars
//               </p>
//               <h2 className="text-2xl font-semibold">
//                 Governance backed by data
//               </h2>
//               <p className="text-sm text-slate-300">
//                 Centralized dashboards track safety, environmental, and operational
//                 KPIs, with alerts routed directly to leadership and compliance teams.
//               </p>
//             </div>

//             <div className="mt-6 grid gap-4 md:grid-cols-3">
//               {[
//                 "Safety Leadership",
//                 "Environmental Stewardship",
//                 "Operational Transparency",
//               ].map((pillar) => (
//                 <div
//                   key={pillar}
//                   className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm font-medium"
//                 >
//                   {pillar}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section> */}

//       </main>

//       {selectedCard !== null && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[120] transition-opacity duration-300"
//           onClick={() => setSelectedCard(null)}
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="modal-title"
//         >
//           <div
//             className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 transform transition-all duration-300 scale-100"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedCard(null)}
//               className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
//               aria-label="Close facility details modal"
//             >
//               <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">Facility Details</h2>
//             <img
//               src={facilities[selectedCard].img}
//               alt={`Facility ${selectedCard + 1}`}
//               className="w-full h-64 object-cover rounded-lg mb-4"
//             />
//             <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
//               {facilities[selectedCard].caption}
//             </p>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </section>
//   )
// }

// export default Facilities
