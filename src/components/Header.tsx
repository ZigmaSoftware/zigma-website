import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/* NAV ITEMS */

const navItems = [
  { name: "Home", path: "/" },

  { name: "About Us", path: "/about" },

  {
    name: "Services",
    path: "/services",
    dropdown: [
      { name: "Landfill Mining and Remediation", path: "/services" },
      { name: "Landfill Management", path: "/services#landfill-management" },
      { name: "Fresh Waste Management and Processing", path: "/services#wet-waste" },
      { name: "BSFL Based Organic Waste Management", path: "/services#Bsfl" },
      { name: "Machinery Sales & Rentals", path: "/services#machinery" },
      { name: "IOT Systems for Waste Management", path: "/services#iot" },
  
    ],
  },

  { name: "Products", path: "/products" },

  { name: "Projects", path: "/project-showcase" ,
  // dropdown: [
  //   { name: "Projects", path: "/project-showcase" },
    
  
  // ],
  },

  {
    name: "News Room",
    path: "/media",
    dropdown: [
      { name: "In the News", path: "/Media" },
      { name: "Publications", path: "/Awardsection" },
      { name: "Awards and Recognition", path: "/Awardsection" },
    
    ],
  },

  {
    name: "People At Zigma",
    path: "/peopledemo1",
    // dropdown: [
    //   { name: "People", path: "/people" },
    //   { name: "People Demo1", path: "/peopledemo1" },
    //   { name: "People Demo2", path: "/peopledemo2" },
    //   { name: "People Demo3", path: "/peopledemo3" },
    // ],
  },

  { name: "Careers", path: "/careers" },
];

/* COMPONENT */

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();

  const dropdownRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = (path: string) => location.pathname === path;

  /* Close dropdown when clicking outside */

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

  /* Indicator Movement */

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
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => resetIndicatorToActive();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 inset-x-0 z-[80] bg-background/95 backdrop-blur border-b border-border">

      <div className="container-main flex items-center justify-center">

        <div className="flex items-center justify-between w-full h-20 px-4">

          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/zigma_blueplanet_logo.png"
              alt="Zigma Blue Planet"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}

          <nav
            className="relative hidden lg:flex items-center justify-center gap-8 flex-wrap"
            ref={(el) => {
              dropdownRef.current = el;
              navRef.current = el;
            }}
            onMouseLeave={resetIndicatorToActive}
          >

            {/* Sliding Indicator */}

            <div
              className="pointer-events-none absolute left-0 top-3/4 h-[3px] bg-emerald-600 transition-[left,width,opacity] duration-500"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />

            {navItems.map((item) => (

              <div
                key={item.name}
                className="relative"
                ref={(el) => {
                  itemRefs.current[item.name] = el;
                }}
                onMouseEnter={() => updateIndicatorToItem(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >

                {item.dropdown ? (

                  <button
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    className={`flex items-center gap-1 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.path)
                        ? "text-primary"
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
                    className={`flex items-center py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.path)
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>

                )}

                {/* DROPDOWN */}

                {item.dropdown && activeDropdown === item.name && (

                  <div className="absolute top-full left-0 z-50 w-max min-w-[200px] bg-card border border-border rounded-md shadow-xl p-2">

                    {item.dropdown.map((sub) => (

                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-4 py-2 text-sm hover:text-primary"
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
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* MOBILE TOGGLE */}

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                  className={`block py-3 px-4 text-sm text-bold ${
                    isActive(item.path)
                      ? "text-primary "
                      : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>

                {item.dropdown && (

                  <div className="pl-6 pb-2">

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