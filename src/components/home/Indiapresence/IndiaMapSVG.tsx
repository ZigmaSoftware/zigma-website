import React, { useState, useEffect, useCallback } from "react";
import indiaMapData from "@/data/india-map-raw.js";
import { stateData } from "@/data/indiaPresenceData";

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

// Only states with data get markers
const interactiveStateIds = new Set(Object.keys(stateData));

// Manually defined center coordinates for each state (calibrated to viewBox 0 0 612 696)
const stateCentroids: Record<string, { x: number; y: number }> = {
  "tamil-nadu": { x: 215, y: 580 },
  "kerala": { x: 165, y: 600 },
  "andhra-pradesh": { x: 250, y: 495 },
  "gujarat": { x: 95, y: 340 },
  "maharashtra": { x: 155, y: 440 },
  "assam": { x: 520, y: 270 },
  "uttar-pradesh": { x: 250, y: 260 },
  "telangana": { x: 225, y: 460 },
};

interface IndiaMapSVGProps {
  activeState: string | null;
  onStateHover: (stateId: string | null) => void;
  onStateClick: (stateId: string) => void;
}

const markerKeys = Object.keys(stateCentroids);

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

  // Auto-cycle through markers one at a time
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % markerKeys.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Pause auto-cycle when user hovers a state
  const handleMarkerEnter = useCallback((stateId: string, index: number) => {
    setIsPaused(true);
    setHighlightedIndex(index);
    onStateHover(stateId);
  }, [onStateHover]);

  const handleMarkerLeave = useCallback(() => {
    setIsPaused(false);
    onStateHover(null);
  }, [onStateHover]);

  // Collect marker data for interactive states that have stateData and centroids
  const markerLocations = Object.entries(stateCentroids).map(([stateId, centroid], index) => {
    const svgId = stateIdToSvgId[stateId] || stateId;
    return { stateId, centroid, index, id: svgId };
  });

  return (
    <svg
      viewBox={indiaMapData.viewBox}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pulsing animation keyframes */}
      <defs>
        <style>{`
          @keyframes marker-pulse {
            0%, 100% { transform: scale(1); opacity: 0.55; }
            50% { transform: scale(1.8); opacity: 0.12; }
          }
          @keyframes marker-ping {
            0% { transform: scale(1); opacity: 0.6; }
            75%, 100% { transform: scale(2.5); opacity: 0; }
          }
          .marker-pulse-ring {
            animation: marker-pulse 1.8s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
          .marker-ping-ring {
            animation: marker-ping 1.8s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
          @keyframes marker-tooltip-fadein {
            0% { opacity: 0; transform: translateX(-4px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .marker-tooltip-visible {
            animation: marker-tooltip-fadein 0.4s ease forwards;
            pointer-events: none;
          }
          .marker-tooltip-hidden {
            opacity: 0;
            pointer-events: none;
          }
        `}</style>
      </defs>

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
                ? { fill: "#E5E7EB", stroke: "#000", strokeWidth: 0.5, cursor: "default", opacity: 0.5 }
                : isActive
                  ? { fill: "hsl(145, 63%, 32%)", stroke: "#000", strokeWidth: 0.5, cursor: "pointer", transition: "fill 0.2s" }
                  : { fill: "#ffffffff", stroke: "#000", strokeWidth: 0.5, cursor: "pointer", transition: "fill 0.2s" }
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

      {/* MapPin Markers on all interactive states */}
      {markerLocations.map(({ stateId, centroid, index, id }) => {
        const isActive = activeState === stateId;
        const isHighlighted = index === highlightedIndex;
        const data = stateData[stateId];
        const pinColor = "hsl(145, 63%, 32%)";

        return (
          <g
            key={`marker-${id}`}
            className="marker-group"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => handleMarkerEnter(stateId, index)}
            onMouseLeave={handleMarkerLeave}
            onClick={() => onStateClick(stateId)}
          >
            {/* Pulsing outer ring */}
            <circle
              cx={centroid.x}
              cy={centroid.y}
              r="10"
              fill={pinColor}
              opacity="0.3"
              className="marker-pulse-ring"
              style={{ animationDelay: `${index * 0.12}s` }}
            />

            {/* Ping ring (active state gets a more prominent ping) */}
            {isActive && (
              <circle
                cx={centroid.x}
                cy={centroid.y}
                r="8"
                fill="none"
                stroke={pinColor}
                strokeWidth="2"
                className="marker-ping-ring"
              />
            )}

            {/* Inner dot (white center) */}
            <circle
              cx={centroid.x}
              cy={centroid.y}
              r="5"
              fill="white"
              stroke={pinColor}
              strokeWidth="1.5"
            />

            {/* MapPin icon - positioned above centroid, scaled for viewBox */}
            <g transform={`translate(${centroid.x - 7}, ${centroid.y - 20}) scale(1.4)`}>
              <path
                d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                fill={pinColor}
                stroke="white"
                strokeWidth="0.8"
                opacity={isActive ? 1 : 0.85}
              />
            </g>

            {/* Tooltip - state name label (visible only when highlighted) */}
            <g className={isHighlighted ? "marker-tooltip-visible" : "marker-tooltip-hidden"}>
              <rect
                x={centroid.x + 12}
                y={centroid.y - 12}
                width={data ? data.name.length * 7 + 30 : 80}
                height="24"
                rx="4"
                ry="4"
                fill={"#059236ff"}
                opacity="0.95"


              />
              <text

                x={centroid.x + 20}
                y={centroid.y + 4}
                fontSize="16"
                fontWeight="600"
                fill="white"
                fontFamily="system-ui, sans-serif"
              >
                {data?.name || stateId}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default IndiaMapSVG;

