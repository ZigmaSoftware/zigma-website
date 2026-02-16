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

const products = [
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
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-16 relative overflow-hidden bg-white">
          <div className="container-main relative grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <span className="inline-block px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold mb-5">
                Our Products
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                Recovered Resources
              </h1>
              <p className="text-slate-600 max-w-2xl text-lg">
                Transforming waste into valuable products. Our recovered materials support sustainable construction and agriculture.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">100% Recycled</h3>
                <p className="text-slate-600 text-sm">All products recovered from landfill waste</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Quality Certified</h3>
                <p className="text-slate-600 text-sm">Meets industry standards and specifications</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Eco-Friendly</h3>
                <p className="text-slate-600 text-sm">Supporting circular economy principles</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Showcase */}
        <section className="section-padding">
          <div className="container-main">
            <div className="space-y-24">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500`} />
                    <div className="relative overflow-hidden rounded-3xl">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                      Product {String(product.id).padStart(2, '0')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-lg text-primary font-medium mb-4">{product.tagline}</p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-dark-bg py-20">
          <div className="container-main text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Need Bulk Orders?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;


