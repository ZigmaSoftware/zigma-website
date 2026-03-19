import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ChevronUp, Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-200 via-white to-slate-100 text-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(148,163,184,0.14),transparent_50%)]" />
        </div>

        <div className="container-main py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1.5fr_1.1fr] gap-5 lg:gap-x-4 lg:gap-y-6">
            {/* Company Info */}
            <div>
              <a href="/"
                className="flex items-center gap-3 mb-4">
                <img
                  src="/zigma_blueplanet_logo.png"
                  alt="Zigma Blue Planet"
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
              </a>
              {/* <p className="text-background/70 text-sm leading-relaxed mb-4">
                Driving sustainable landfill reclamation across India through advanced biomining,
                transforming waste into reusable resources.
              </p> */}

              {/* Social Media Links */}
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/zigmaglobal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 hover:bg-[#1877F2] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/zigmaglobal1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8  hover:bg-[#000000] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Twitter"
                >
                  {/* <Twitter className="w-4 h-4" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                  >
                    <path d="M18.244 2H21.5l-7.38 8.43L22 22h-6.87l-5.39-7.05L3.5 22H.244l7.89-9.01L2 2h7l4.89 6.43L18.244 2z" />
                  </svg>

                </a>
                <a
                  href="https://in.linkedin.com/company/zigma-global-environ-solutions-plc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8  hover:bg-[#0A66C2] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/zigma_2015/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 hover:bg-[#E1306C] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCoSAp-9wtY6m58IknjmweHg/null"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8  hover:bg-[#FF0000] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                {["About Us", "Services", "Projects", "Products", "In the News", "Publications", "Awards & Recognition","Testimonials", "Careers", "Governance Policies", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-foreground/70 hover:text-primary transition-all duration-300 text-md hover:translate-x-1 inline-block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {["Landfill Mining and Remediation", "Landfill Management", "Fresh Waste Management and Processing", "BSFL Based Organic Waste Management", "IOT Systems for Waste Management"].map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-foreground/70 hover:text-primary transition-all duration-300 text-md hover:translate-x-1 inline-block"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">

                  <MapPin className="w-4 h-4 mt-1.5 flex-shrink-0" />

                  <span className="text-foreground/70 text-md">
                    178, Indu Nagar, Palayapalayam, Perundurai Road, Erode, Tamilnadu - 638 011.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4  flex-shrink-0" />

                  <a href="mailto:connect@zigma.in" className="text-foreground/70 hover:text-primary text-md transition-colors">
                    connect@zigma.in
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href="tel:+911234567890" className="text-foreground/70 hover:text-primary text-md transition-colors">
                   0424 222 5157
                  </a>
                </li>
              </ul>



              {/* Newsletter Signup */}
              {/* <div>
                <h5 className="text-sm font-semibold mb-2 text-background/90">Stay Updated</h5>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary h-8 text-sm"
                    required
                  />
                  <Button type="submit" size="sm" className="h-8 px-2">
                    <Send className="w-3 h-3" />
                  </Button>
                </form>
              </div> */}




            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">
              © {new Date().getFullYear()} Zigma Global Environ Solutions Pvt Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/governance-policies" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                Privacy Policy & Terms of Service
              </Link>
              {/* <Link to="/governance-policies" className="text-foreground/60 hover:text-foreground text-sm transition-colors">
                
              </Link> */}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default Footer;

