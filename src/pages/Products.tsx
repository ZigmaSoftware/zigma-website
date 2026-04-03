import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { CheckCircle, ArrowRight, Leaf, Recycle, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import product1 from "@/assets/website/goodearth.jpg";
import product2 from "@/assets/website/stone.jpg";
import product3 from "@/assets/website/soil.jpg";
import product4 from "@/assets/website/glass.jpg";
import product5 from "@/assets/website/Ferrous.jpg";
import productRdf from "@/assets/services/Refuse-Derived Fuel.jpeg";
import productAfd from "@/assets/services/Alternative fuel derivative feedstocks.jpg";
import img4 from "@/assets/website/hero/Furnitures.png";
import larva from "@/assets/website/larva.jpeg";

import bg1 from "@/assets/background-1.png"; 

const SLOW_EASE = "power2.out";

const products = [
  {
    id: 101,
    name: "Refuse-Derived Fuel",
    tagline: "High-Calorific Recovery",
    description: "Engineered refuse-derived fuel processed from non-recyclable waste streams for efficient co-processing in industrial kilns and energy recovery systems.",
    image: productRdf,
    color: "from-orange-600 to-orange-800",
    features: [
      "Consistent calorific value",
      "Moisture-controlled output",
      "Reduced landfill dependency",
      "Industrial-grade processing"
    ],
    applications: ["Cement Kilns", "Waste-to-Energy", "Industrial Boilers", "Co-processing Units"],
    icon: Recycle
  },
  {
    id: 102,
    name: "Alternative fuel derivative feedstocks",
    tagline: "Circular Energy Inputs",
    description: "Pre-processed alternative fuel derivative feedstocks designed for thermal substitution and circular fuel programs across energy-intensive industries.",
    image: productAfd,
    color: "from-emerald-600 to-emerald-800",
    features: [
      "Segregated and pre-processed",
      "Optimized burn characteristics",
      "Reliable bulk supply",
      "Supports decarbonization goals"
    ],
    applications: ["Thermal Substitution", "Industrial Furnaces", "Energy Recovery", "Alternative Fuel Blends"],
    icon: Leaf
  },
  {
    id: 1,
    name: "Bio Earth",
    tagline: "Building Tomorrow's Foundation",
    description: "High-quality recovered stones and aggregates from landfill mining, suitable for construction and infrastructure projects.",
    image: product1,
    color: "from-slate-600 to-slate-800",
    features: [
      "Graded as per IS standards",
      "Suitable for road construction",
      "Cost-effective alternative",
      "Eco-friendly sourcing"
    ],
    applications: ["Road Construction", "Building Foundation", "Landscaping", "Drainage Systems"],
    icon: Building2
  },
  {
    id: 2,
    name: "Inert Stones",
    tagline: "Sustainable Raw Materials",
    description: "Processed inert materials recovered from waste, ideal for construction fill and land reclamation projects.",
    image: product2,
    color: "from-amber-600 to-amber-800",
    features: [
      "Chemically stable",
      "Non-reactive materials",
      "Consistent quality",
      "Bulk availability"
    ],
    applications: ["Land Filling", "Embankment", "Backfilling", "Construction Base"],
    icon: Recycle
  },
  {
    id: 3,
    name: "Inert Soil",
    tagline: "Nature's Gift Renewed",
    description: "Nutrient-rich organic compost and soil conditioner produced from processed wet waste, perfect for agriculture and gardening.",
    image: product3,
    color: "from-green-600 to-green-800",
    features: [
      "Rich in organic matter",
      "Improves soil fertility",
      "Chemical-free production",
      "FSSAI compliant"
    ],
    applications: ["Agriculture", "Horticulture", "Landscaping", "Urban Farming"],
    icon: Leaf
  },
  {
    id: 4,
    name: "Glass scrap",
    tagline: "Crystal Clear Recycling",
    description: "Sorted and processed glass recovered from landfills, ready for recycling and reuse in various industries.",
    image: product4,
    color: "from-cyan-600 to-cyan-800",
    features: [
      "Color segregated",
      "Cleaned and processed",
      "High purity levels",
      "Multiple size grades"
    ],
    applications: ["Glass Manufacturing", "Abrasives", "Construction", "Art & Crafts"],
    icon: Sparkles
  },
  {
    id: 5,
    name: "Iron Scrap",
    tagline: "Recycled Iron Solutions",
    description: "Processed iron scrap recovered from landfills, suitable for steel manufacturing and other industrial applications.",
    image: product5,
    color: "from-gray-700 to-gray-900",
    features: [
      "Multiple size options",
      "Clean and contaminant-free",
      "High calorific value",
      "Steel wire separated"
    ],
    applications: ["Rubberized Asphalt", "Playground Surfaces", "Fuel Alternative", "Civil Engineering"],
    icon: Recycle
  },
  {
    id: 7,
    name: "Black Soldier Fly Larvae (BSFL)",
    tagline: "Sustainable Protein Source",
    description: "Black Soldier Fly Larvae (BSFL) produced through controlled organic waste bioconversion for use in animal feed, aquaculture, and circular bio-economy applications.",
    image: larva,
    color: "from-amber-500 to-orange-700",
    features: [
      "High protein and fat content",
      "Produced from organic waste streams",
      "Supports circular waste management",
      "Consistent quality output"
    ],
    applications: ["Animal Feed", "Aquaculture", "Poultry Nutrition", "Organic Waste Bioconversion"],
    icon: Leaf
  },
  {
    id: 6,
    name: "Recycled Furniture",
    tagline: "From Waste to Wealth, Responsibly.",
    description: "Eco-friendly furniture crafted from recycled materials, promoting sustainable living and reducing environmental impact through innovative design.",
    image: img4,
    color: "from-purple-600 to-purple-800",
    features: [
      "Made from recycled materials",
      "Durable and stylish designs",
      "Eco-friendly production",
      "Customizable options"
    ],
    applications: ["Home Furniture", "Office Furniture", "Outdoor Furniture", "Commercial Spaces"],
    icon: Sparkles
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        {/* Page Header */}
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${product1})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/35" aria-hidden="true" /> */}

          <div className="container-main relative grid items-center justify-items-center pt-28 text-center">
            <Reveal
              className="max-w-3xl mx-auto"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <span className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium  block">
                Our Products
              </span>
              <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">
                Recovered Resources
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                Transforming waste into valuable products. Our recovered materials support sustainable construction and agriculture.
              </p>
            </Reveal>

            {/* <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/30 bg-white/95 p-5 text-center backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">100% Recycled</h3>
                <p className="text-slate-600 text-sm">All products recovered from landfill waste</p>
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/95 p-5 text-center backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Quality Certified</h3>
                <p className="text-slate-600 text-sm">Meets industry standards and specifications</p>
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/95 p-5 text-center backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Eco-Friendly</h3>
                <p className="text-slate-600 text-sm">Supporting circular economy principles</p>
              </div>
            </div> */}
          </div>
        </section>

        {/* Products Showcase */}
        <section className="section-padding">
          <div className="container-main">
            <div className="space-y-24">
              {products.map((product, index) => (
                <Reveal
                  key={product.id}
                  data-anim-start="top 90%"
                  data-anim-duration="1.45"
                  data-anim-ease={SLOW_EASE}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    {/* <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500`} /> */}
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                      {product.tagline}
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Applications */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.map((app) => (
                          <span 
                            key={app}
                            className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="group">
                      <Link to="/contact">
                        Enquire Now
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section
          className="section-padding py-20 relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />

          <div className="container-main relative z-10 text-center">
            <Reveal data-anim-start="top 92%" data-anim-duration="1.45" data-anim-ease={SLOW_EASE}>
              <span className="text-sm uppercase tracking-[0.3em] text-primary-foreground/85">
                Let Us Deliver Impact
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-primary-foreground">
                Need Bulk Orders?
              </h2>
              <p className="mt-6 text-base lg:text-lg text-primary-foreground/90 leading-relaxed max-w-xl mx-auto mb-8">
                We supply recovered materials in bulk quantities for construction and industrial projects. Get competitive pricing for your requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="hero">
                  <Link to="/contact">Request Quote</Link>
                </Button>
                <Button asChild size="lg" variant="heroOutline">
                  <Link to="/projects">View Projects</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
