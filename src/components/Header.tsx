import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";


/* NAV ITEMS */
const navItems = [
  { name: "Home", path: "/" },

  {
    name: "About Us",
    path: "/about",
    // dropdown: [
    //   { name: "Milestones", path: "/about#milestones"},
    //   { name: "Awards", path: "/awards"},
    //   { name: "Facilities", path: "/facilities" },
    //   { name: "Governance Policies", path: "/governance-policies" },
    //   // { name: "Policies", path: "/policies" },
      
    // ],
  },

  {
    name: "Services",
    path: "/services",
    // dropdown: [
    //   // { name: "Services Design", path: "/servicescp" },
    //   // { name: "Landfill Mining", path: "/services#landfill-mining" },
    //   // { name: "Landfill Management", path: "/services#landfill-management" },
    //   // { name: "Wet Waste Management", path: "/services#wet-waste" },

      
    // ],
  },

  {
    name: "Products",
    path: "/products",
    // dropdown: [
    //   { name: "Bio Earth", path: "/products#bio-earth" },
    //   { name: "Inert Stones", path: "/products#inerts" },
    //   { name: "Inert Soil", path: "/products#inert-soil" },
    //   { name: "Glass Scrap", path: "/products#glass-scrap" },
    //   { name: "Iron Scrap", path: "/products#iron-scrap" },
    //   { name: "design", path: "/stacked-cards" },
      
    // ],
  },

  {
    name: "Projects",
    path: "/projects",
    dropdown: [
      { name: "Completed Projects", path: "/projects?tab=completed" },
      { name: "Project Showcase", path: "/project-showcase" },
      { name: "Ongoing Projects", path: "/projects?tab=ongoing" },
      { name: "Upcoming Projects", path: "/vertical-scroll-slider" },
      // { name: "Project Showcase", path: "/vertical-slider" },
      { name: "Waste Management Showcase", path: "/waste-management-showcase" },
      
    ],
  },

  /* FLOW FIX */
  // { name: "Careers", path: "/careers" },
  // { name: "Media", path: "/media" },
  { name: "People At Zigma", path: "/people" },
  { name: "Contact", path: "/contact" },
];

/* COMPONENT */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });
  const location = useLocation();
  const dropdownRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = (path: string) => location.pathname === path;

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const updateIndicatorToItem = (name: string) => {
    const itemEl = itemRefs.current[name];
    const navEl = navRef.current;
    if (!itemEl || !navEl) return;
    const itemRect = itemEl.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();
    setIndicatorStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  };

  const resetIndicatorToActive = () => {
    const activeItem = navItems.find((item) => isActive(item.path));
    if (activeItem) {
      updateIndicatorToItem(activeItem.name);
      return;
    }
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  useEffect(() => {
    resetIndicatorToActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => resetIndicatorToActive();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur border-b border-border ">
     <div className="container-main">

        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/zigma_blueplanet_logo.png"
              alt="Zigma Blue Planet"
              className="h-12 w-auto object-contain"
              loading="eager"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="relative hidden lg:flex items-center gap-6 flex-nowrap"
            ref={(el) => {
              dropdownRef.current = el;
              navRef.current = el;
            }}
            onMouseLeave={resetIndicatorToActive}
          >
            <div
              className="pointer-events-none absolute left-0 top-4 h-[3px]   bg-emerald-500 transition-[left,width,opacity] duration-300 ease-out"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                ref={(el) => {
                  itemRefs.current[item.name] = el;
                }}
                onMouseEnter={() => updateIndicatorToItem(item.name)}
                onFocus={() => updateIndicatorToItem(item.name)}
              >
                {item.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`group relative flex items-center gap-1 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.path)
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`group relative flex items-center py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.path)
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* DROPDOWN */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-xl border border-border py-3">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-5 py-3 text-sm hover:text-primary"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block shrink-0">
            <Button asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {isMenuOpen && (
        <div className="container-main">
          <nav className="lg:hidden py-4 border-t border-border max-h-[70vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`block py-3 px-4 ${
                    isActive(item.path)
                      ? "text-primary font-semibold"
                      : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>

                {item.dropdown && (
                  <div className="pl-8 pb-2">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 px-4">
              <Button asChild className="w-full">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get in Touch
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
