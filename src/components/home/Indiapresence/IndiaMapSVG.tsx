import React from "react";
import indiaMapData from "@/data/india-map-raw.js";

// Map from svg-maps IDs to our stateData IDs (interactive states)
const svgIdToStateId: Record<string, string> = {
  as: "assam",
  ap: "andhra-pradesh",
  ct: "chhattisgarh",
  gj: "gujarat",
  hp: "himachal-pradesh",
  jh: "jharkhand",
  ka: "karnataka",
  kl: "kerala",
  mp: "madhya-pradesh",
  mh: "maharashtra",
  or: "odisha",
  pb: "punjab",
  rj: "rajasthan",
  tn: "tamil-nadu",
  tg: "telangana",
  up: "uttar-pradesh",
  ut: "uttarakhand",
  wb: "west-bengal",
};

// Reverse mapping
const stateIdToSvgId: Record<string, string> = {};
Object.entries(svgIdToStateId).forEach(([svgId, stateId]) => {
  stateIdToSvgId[stateId] = svgId;
});

interface IndiaMapSVGProps {
  activeState: string | null;
  onStateHover: (stateId: string | null) => void;
  onStateClick: (stateId: string) => void;
}

const IndiaMapSVG: React.FC<IndiaMapSVGProps> = ({
  activeState,
  onStateHover,
  onStateClick,
}) => {
  const locations = indiaMapData.locations as Array<{
    name: string;
    id: string;
    path: string;
  }>;

  // Find active location for the ping indicator
  const activeSvgId = activeState ? stateIdToSvgId[activeState] : null;
  const activeLocation = activeSvgId
    ? locations.find((l) => l.id === activeSvgId)
    : null;

  return (
    <svg
      viewBox={indiaMapData.viewBox}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* All state paths */}
      {locations.map((location) => {
        const stateId = svgIdToStateId[location.id];
        const isInteractive = !!stateId;
        const isActive = activeState === stateId;

        return (
          <path
            key={location.id}
            d={location.path}
            className={`map-state-path ${isActive ? "active" : ""}`}
            style={
              !isInteractive
                ? { cursor: "default", opacity: 0.5 }
                : isActive
                ? { fill: "#10B981", cursor: "pointer", transition: "fill 0.2s" }
                : { cursor: "pointer", transition: "fill 0.2s" }
            }
            onMouseEnter={
              isInteractive ? () => onStateHover(stateId) : undefined
            }
            onMouseLeave={
              isInteractive ? () => onStateHover(null) : undefined
            }
            onClick={
              isInteractive ? () => onStateClick(stateId) : undefined
            }
          >
            <title>{location.name}</title>
          </path>
        );
      })}

      {/* Ping indicator on active state */}
      {activeLocation && (
        <g className="pointer-events-none">
          <circle
            cx={getCentroid(activeLocation.path).x}
            cy={getCentroid(activeLocation.path).y}
            r="5"
            fill="hsl(16, 88%, 54%)"
            className="animate-pulse"
          />
          <circle
            cx={getCentroid(activeLocation.path).x}
            cy={getCentroid(activeLocation.path).y}
            r="10"
            fill="none"
            stroke="hsl(16, 88%, 54%)"
            strokeWidth="1.5"
            opacity="0.5"
            className="animate-ping"
          />
        </g>
      )}
    </svg>
  );
};

// Helper to get approximate centroid of an SVG path
function getCentroid(pathD: string): { x: number; y: number } {
  const coords: Array<[number, number]> = [];
  // Match coordinate pairs in various SVG path formats
  const regex = /(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/g;
  let match;
  while ((match = regex.exec(pathD)) !== null) {
    coords.push([parseFloat(match[1]), parseFloat(match[2])]);
  }
  if (coords.length === 0) return { x: 0, y: 0 };

  let sumX = 0;
  let sumY = 0;
  coords.forEach(([x, y]) => {
    sumX += x;
    sumY += y;
  });
  return { x: sumX / coords.length, y: sumY / coords.length };
}

export default IndiaMapSVG;
