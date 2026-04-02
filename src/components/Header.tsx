import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/zigma_blueplanet_logo.png";
import landfillMining from "@/assets/website/hero/landfill-mining-hero.jpg";
import landfillManagement from "@/assets/windrow.jpg";
import wetWaste from "@/assets/fresh waste.jpg";
import herobg from "@/assets/website/hero/noida-present-hero.jpg";
import machine from "@/assets/services/machinery.png";
import iotImage from "@/assets/services/WB.png";
import iotLogo from "@/assets/services/IOT.png";
import bsflsolar from "@/assets/solarr.jpg.jpeg";
import servicesDropdownLogo from "@/assets/services/zigma_blueplanet_logo.png";
import zigflyLogo from "@/assets/services/zigfly.png";
import wasteTechLogo from "@/assets/services/logo-wastetech.png";
import productRdf from "@/assets/services/Refuse-Derived Fuel.png";
import productAfd from "@/assets/services/Alternative fuel derivative feedstocks.jpg";
import productBioEarth from "@/assets/website/goodearth.jpg";
import productInertStones from "@/assets/website/stone.jpg";
import productInertSoil from "@/assets/website/soil.jpg";
import productGlass from "@/assets/website/glass.jpg";
import productIron from "@/assets/website/Ferrous.jpg";
import productFurniture from "@/assets/website/hero/Furnitures.png";
import integrated from "@/assets/website/hero/RDF1.jpeg";
import industrial from "@/assets/services/Industrial & Commercial Waste Solutions.jpg";
import epr from "@/assets/services/EPR.png";
// import 


/* ── Types ─────────────────────────────────────────────────── */
interface DropdownItem {
  name: string;
  path: string;
  image?: string;
}

interface NavItem {
  name: string;
  path: string;
  megaMenu?: boolean;
  dropdown?: DropdownItem[];
}

const splitIntoTwoRows = <T,>(items: T[]): [T[], T[]] => {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
};

/* NAV ITEMS */

const navItems: NavItem[] = [
  { name: "Home", path: "/" },

  { name: "About Us", path: "/about" },

  {
    name: "Services",
    path: "/services",
    megaMenu: true,
    dropdown: [
      {
        name: "Landfill Mining and Remediation",
        path: "/services",
        image: landfillMining,
        },
      {
        name: "Landfill Management",
        path: "/services#landfill-management",
        image: landfillManagement,
      },
      {
        name: "Daily MSW Management and Processing",
        path: "/services#wet-waste",
        image: wetWaste,
      },
      {
        name: "BSFL Based Organic Waste Management",
        path: "/services#Bsfl",
        image: bsflsolar,
      },
      {
        name: "Machinery Sales & Rentals",
        path: "/services#machinery",
        image: machine,
      },
      {
        name: "IOT Systems for Waste Management",
        path: "/services#iot",
        image: iotImage,
      },
      {
        name: "Integrated Alternative Fuel Solutions",
        path: "/services#alt-fuel",
        image: integrated,
      },
      {
        name: "Industrial & Commercial Waste Solutions",
        path: "/services#industrial",
        image: industrial,
      },
      {
        name: "EPR Responsibility Services",
        path: "/services#epr",
        image: epr,
      },
      

    ],
  },

    {
    name: "Products",
    path: "/products",
    megaMenu: true,
    dropdown: [
      { name: "Refuse-Derived Fuel", path: "/products", image: productRdf },
      { name: "Alternative fuel derivative feedstocks", path: "/products", image: productAfd },
      { name: "Bio Earth", path: "/products", image: productBioEarth },
      { name: "Inert Stones", path: "/products", image: productInertStones },
      { name: "Inert Soil", path: "/products", image: productInertSoil },
      { name: "Glass scrap", path: "/products", image: productGlass },
      { name: "Iron Scrap", path: "/products", image: productIron },
      { name: "Recycled Furniture", path: "/products", image: productFurniture },
    ],
  },

  { name: "Projects", path: "/project-showcase" ,
  dropdown: [
    { name: "Completed Projects", path: "/completedprojects" },
    { name: "Ongoing Projects", path: "/ongoingprojects" },
    
  
  ],
  },

  {
    name: "News Room",
    path: "/media",
    dropdown: [
      { name: "In the News", path: "/Media" },
      { name: "Publications", path: "/publications" },
      { name: "Newsletters", path: "/newsletters" },
      { name: "Awards and Recognitions", path: "/AwardsandRecognition" },
      { name: "Testimonials", path: "/Testimonials" },  
    
    ],
  },

  {
    name: "People At Zigma",
    path: "/people",
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

  const activeMegaMenuItem = navItems.find(
    (item) => item.name === activeDropdown && item.megaMenu && item.dropdown
  );
  const megaMenuWidth = activeMegaMenuItem?.name === "Products"
    ? "clamp(760px, 78vw, 1080px)"
    : "clamp(760px, 88vw, 1200px)";
  const megaGridCols = activeMegaMenuItem?.name === "Products" ? "grid-cols-4" : "grid-cols-5";

  return (
    <header className="sticky top-0 inset-x-0 z-[80] bg-background/95 backdrop-blur border-b border-border">

      <div className="container-main flex items-center justify-center">

        <div className="flex items-center justify-between w-full h-20">

          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logo}
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
            onMouseLeave={() => {
              resetIndicatorToActive();
              setActiveDropdown(null);
            }}
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
                className={item.megaMenu ? "static" : "relative"}
                ref={(el) => {
                  itemRefs.current[item.name] = el;
                }}
                onMouseEnter={() => updateIndicatorToItem(item.name)}
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

                {item.dropdown && !item.megaMenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-max min-w-[200px] bg-card border border-border rounded-md shadow-xl p-2">
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

            {activeMegaMenuItem?.dropdown && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 z-50 bg-white border border-border rounded-xl shadow-2xl p-6"
                style={{ width: megaMenuWidth }}
              >
                <p className="text-[0.65rem] font-bold tracking-widest text-muted-foreground uppercase mb-5 px-1">
                  {`Our ${activeMegaMenuItem.name}`}
                </p>

                <div className="space-y-5">
                  {splitIntoTwoRows(activeMegaMenuItem.dropdown).map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className={`grid ${megaGridCols} gap-4`}>
                      {row.map((sub) => {
                        const isServicesMenu = activeMegaMenuItem.name === "Services";
                        const isIotService =
                          sub.name === "IOT Systems for Waste Management";
                        const isWasteTechService =
                          sub.name === "Machinery Sales & Rentals";
                        const serviceCardLogo =
                          sub.name === "BSFL Based Organic Waste Management"
                            ? zigflyLogo
                            : isIotService
                              ? iotLogo
                            : isWasteTechService
                              ? wasteTechLogo
                              : servicesDropdownLogo;

                        // Add this helper near the top (outside component) or replace the placeholder.
                        const cn = (...classes: Array<string | undefined | null | false>): string =>
                          classes.filter(Boolean).join(" ");
                        return (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex flex-col gap-2 rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <div
                              className={`relative overflow-hidden rounded-lg aspect-[16/9] ${
                                isServicesMenu ? "bg-transparent" : "bg-muted"
                              }`}
                            >
                              {isServicesMenu ? (
                                <>
                                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/7y0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-0">
                                    <img
                                      src={serviceCardLogo}
                                      alt=""
                                      aria-hidden="true"
                                      className={cn(
                                        "w-auto object-contain transition-transform duration-300",
                                        isIotService
                                          ? "h-9 scale-[1.22] drop-shadow-md"
                                          : isWasteTechService
                                            ? "h-6 mix-blend-multiply"
                                            : "h-10 mix-blend-multiply"
                                      )}
                                      loading="lazy"
                                    />
                                  </div>
                                  {sub.image ? (
                                    <img
                                      src={sub.image}
                                      alt={sub.name}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      loading="lazy"
                                    />
                                  ) : null}
                                </>
                              ) : sub.image ? (
                                <img
                                  src={sub.image}
                                  alt={sub.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-secondary" />
                              )}
                              {isServicesMenu ? null : (
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                              )}
                            </div>

                            <span className="text-[0.9rem] font-medium text-foreground text-center group-hover:text-primary transition-colors duration-200 leading-snug px-1 pb-1">
                              {sub.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

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

              <div
                key={item.name}
                className={item.megaMenu ? "static" : "relative"}
                ref={(el) => {
                  itemRefs.current[item.name] = el;
                }}
                onMouseEnter={() => updateIndicatorToItem(item.name)}
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

                {item.dropdown && !item.megaMenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-max min-w-[200px] bg-card border border-border rounded-md shadow-xl p-2">
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

            {activeMegaMenuItem?.dropdown && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 z-50 bg-white border border-border rounded-xl shadow-2xl p-6"
                style={{ width: megaMenuWidth }}
              >
                <p className="text-[0.65rem] font-bold tracking-widest text-muted-foreground uppercase mb-5 px-1">
                  {`Our ${activeMegaMenuItem.name}`}
                </p>

                <div className="space-y-5">
                  {splitIntoTwoRows(activeMegaMenuItem.dropdown).map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className={`grid ${megaGridCols} gap-4`}>
                      {row.map((sub) => {
                        const isServicesMenu = activeMegaMenuItem.name === "Services";
                        const isIotService =
                          sub.name === "IOT Systems for Waste Management";
                        const isWasteTechService =
                          sub.name === "Machinery Sales & Rentals";
                        const serviceCardLogo =
                          sub.name === "BSFL Based Organic Waste Management"
                            ? zigflyLogo
                            : isIotService
                              ? iotLogo
                            : isWasteTechService
                              ? wasteTechLogo
                              : servicesDropdownLogo;

                        const cn = (...classes: Array<string | undefined | null | false>): string =>
                          classes.filter(Boolean).join(" ");
                        return (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex flex-col gap-2 rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <div
                              className={`relative overflow-hidden rounded-lg aspect-[16/9] ${
                                isServicesMenu ? "bg-transparent" : "bg-muted"
                              }`}
                            >
                              {isServicesMenu ? (
                                <>
                                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/90 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-0">
                                    <img
                                      src={serviceCardLogo}
                                      alt=""
                                      aria-hidden="true"
                                      className={cn(
                                        "w-auto object-contain transition-transform duration-300",
                                        isIotService
                                          ? "h-9 scale-[1.22] drop-shadow-md"
                                          : isWasteTechService
                                            ? "h-6 mix-blend-multiply"
                                            : "h-10 mix-blend-multiply"
                                      )}
                                      loading="lazy"
                                    />
                                  </div>
                                  {sub.image ? (
                                    <img
                                      src={sub.image}
                                      alt={sub.name}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      loading="lazy"
                                    />
                                  ) : null}
                                </>
                              ) : sub.image ? (
                                <img
                                  src={sub.image}
                                  alt={sub.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-secondary" />
                              )}
                              {isServicesMenu ? null : (
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                              )}
                            </div>

                            <span className="text-[0.9rem] font-medium text-foreground text-center group-hover:text-primary transition-colors duration-200 leading-snug px-1 pb-1">
                              {sub.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </nav>

        </div>

      )}

    </header>
  );
};

export default Header;
