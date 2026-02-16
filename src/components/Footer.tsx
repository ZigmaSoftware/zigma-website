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
      <footer className="bg-gradient-to-br from-foreground via-foreground to-foreground/95 text-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.2),transparent_50%)]" />
        </div>

        <div className="container-main py-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-lg">Z</span>
                </div>
                <div>
                  <span className="text-lg font-bold">ZIGMA</span>
                  <span className="block text-xs text-background/70">Global Environ Solutions</span>
                </div>
              </div>
              <p className="text-background/70 text-sm leading-relaxed mb-4">
                Driving sustainable landfill reclamation across India through advanced biomining,
                transforming waste into reusable resources.
              </p>

              {/* Social Media Links */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Follow us on YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About Us", "Services", "Projects", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-background/70 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {["Landfill Mining", "Landfill Management", "Wet Waste Management"].map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-background/70 hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Newsletter */}
            <div>
              <h4 className="text-base font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-background/70 text-sm">
                   HO : 178, Indu Nagar, Palayapalayam,Perundurai Road, Erode, Tamilnadu - 638 011.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:connect@zigma.in" className="text-background/70 hover:text-primary text-sm transition-colors">
                    connect@zigma.in
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="tel:+911234567890" className="text-background/70 hover:text-primary text-sm transition-colors">
                    +91 123 456 7890
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
          <div className="mt-8 pt-6 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Zigma Global Environ Solutions Pvt Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/governance-policies" className="text-background/60 hover:text-background text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/governance-policies" className="text-background/60 hover:text-background text-sm transition-colors">
                Terms of Service
              </Link>
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

