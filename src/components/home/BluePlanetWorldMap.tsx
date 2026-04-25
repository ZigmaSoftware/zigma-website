const BluePlanetWorldMap = () => {
  const locations = [
    { name: "Singapore", x: "75%", y: "58%", delay: "0s" },
    { name: "India", x: "72%", y: "48%", delay: "0.3s" },
    { name: "Malaysia", x: "76%", y: "56%", delay: "0.6s" },
    { name: "United Kingdom", x: "48%", y: "28%", delay: "0.9s" },
  ];

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1200 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* World map paths - simplified continents */}
        <g fill="hsl(145 30% 85%)" stroke="hsl(145 40% 70%)" strokeWidth="1">
          {/* Asia */}
          <path d="M 650 200 Q 750 180 850 220 Q 900 250 920 300 Q 900 350 850 380 Q 800 400 750 390 Q 700 380 680 350 Q 650 320 650 280 Q 650 240 650 200 Z" />
          
          {/* Europe */}
          <path d="M 520 150 Q 580 140 620 160 Q 640 180 630 210 Q 610 240 570 250 Q 530 250 500 230 Q 480 210 490 180 Q 500 160 520 150 Z" />
          
          {/* Africa */}
          <path d="M 520 280 Q 560 270 600 290 Q 620 320 610 360 Q 590 400 560 430 Q 530 450 500 440 Q 470 420 460 380 Q 450 340 470 310 Q 490 290 520 280 Z" />
          
          {/* North America */}
          <path d="M 150 150 Q 220 130 280 150 Q 320 180 310 230 Q 290 280 250 300 Q 210 310 170 290 Q 140 270 130 230 Q 120 190 150 150 Z" />
          
          {/* South America */}
          <path d="M 280 320 Q 320 310 350 330 Q 370 360 360 400 Q 340 440 310 460 Q 280 470 250 450 Q 230 430 230 400 Q 230 370 250 340 Q 265 325 280 320 Z" />
          
          {/* Australia */}
          <path d="M 850 420 Q 900 410 940 430 Q 960 450 950 480 Q 930 510 890 520 Q 850 520 820 500 Q 800 480 810 450 Q 820 430 850 420 Z" />
        </g>

        {/* Grid lines */}
        <g stroke="hsl(145 20% 90%)" strokeWidth="0.5" opacity="0.3">
          {[...Array(12)].map((_, i) => (
            <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="600" />
          ))}
          {[...Array(6)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 100} x2="1200" y2={i * 100} />
          ))}
        </g>
      </svg>

      {/* Animated location markers */}
      {locations.map((location, index) => (
        <div
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ left: location.x, top: location.y }}
        >
          {/* Pulsing ring */}
          <div
            className="absolute inset-0 animate-ping"
            style={{ animationDelay: location.delay }}
          >
            <div className="h-4 w-4 rounded-full bg-primary opacity-75"></div>
          </div>
          
          {/* Center dot */}
          <div className="relative h-4 w-4 rounded-full bg-primary border-2 border-white shadow-lg"></div>
          
          {/* Tooltip */}
          <div className="absolute left-1/2 -translate-x-1/2 top-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-foreground text-background px-3 py-1 rounded text-sm font-medium pointer-events-none">
            {location.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BluePlanetWorldMap;
