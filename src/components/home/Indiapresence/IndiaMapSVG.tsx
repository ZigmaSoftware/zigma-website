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
};

interface IndiaMapSVGProps {
  activeState: string | null;
  onStateHover: (stateId: string | null) => void;
  onStateClick: (stateId: string) => void;
}

const markerKeys = Object.keys(stateCentroids);

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

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

  const [viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight] = (
    String(indiaMapData.viewBox).split(" ").map(Number) as [number, number, number, number]
  );

  // Auto-cycle through markers one at a time
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (activeState) return;
    const timer = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % markerKeys.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [activeState]);

  const handleMarkerEnter = useCallback((stateId: string, index: number) => {
    setHighlightedIndex(index);
    onStateHover(stateId);
  }, [onStateHover]);

  const handleMarkerLeave = useCallback(() => {
    onStateHover(null);
  }, [onStateHover]);

  // Collect marker data for interactive states that have stateData and centroids
  const markerLocations = Object.entries(stateCentroids)
    .filter(([stateId]) => interactiveStateIds.has(stateId))
    .map(([stateId, centroid], index) => {
      const svgId = stateIdToSvgId[stateId] || stateId;
      return { stateId, centroid, index, id: svgId };
    });

  const stateIdToMarkerIndex = new Map(markerLocations.map((m) => [m.stateId, m.index]));

  useEffect(() => {
    if (!activeState) return;
    const idx = stateIdToMarkerIndex.get(activeState);
    if (typeof idx === "number") setHighlightedIndex(idx);
  }, [activeState, stateIdToMarkerIndex]);

  // Render highlighted marker last so it appears above others (SVG has no z-index)
  const orderedMarkerLocations = [...markerLocations].sort(
    (a, b) => Number(a.index === highlightedIndex) - Number(b.index === highlightedIndex),
  );

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
        const isInteractive = !!stateId && interactiveStateIds.has(stateId);
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
      {orderedMarkerLocations.map(({ stateId, centroid, index, id }) => {
        const isActive = activeState === stateId;
        const isHighlighted = index === highlightedIndex;
        const isTooltipVisible = isActive || (!activeState && isHighlighted);
        const data = stateData[stateId];
        const pinColor = "hsl(145, 63%, 32%)";
        const tooltipTitle = data?.name || stateId;
        const districts = data?.districts || [];

        // Tooltip layout: prefer 2 columns for long lists so the tooltip doesn't become too tall.
        const useTwoColumns = districts.length >= 7;
        const maxTooltipLocations = useTwoColumns ? 12 : 8;
        const tooltipLocations = districts.slice(0, maxTooltipLocations);
        const hasMoreLocations = districts.length > tooltipLocations.length;

        const tooltipMaxLen = Math.max(
          tooltipTitle.length,
          ...tooltipLocations.map((district) => district.length),
          hasMoreLocations ? `+${districts.length - tooltipLocations.length} more`.length : 0,
          "Locations".length,
        );
        // Wider max helps long names like "Tiruchirappalli (Trichy)" fit without truncating.
        const baseTooltipWidth = clamp(Math.ceil((tooltipMaxLen * 7 + 70) / 10) * 10, 200, 340);
        const tooltipWidth = useTwoColumns
          ? clamp(Math.ceil((baseTooltipWidth * 1.35) / 10) * 10, 320, 440)
          : baseTooltipWidth;

        const locationRows = useTwoColumns
          ? Math.ceil(tooltipLocations.length / 2)
          : tooltipLocations.length;
        const visibleLocationCount = locationRows + (hasMoreLocations ? 1 : 0);
        const headerHeight = 22;
        const tooltipPaddingY = 20; // 10 top + 10 bottom
        const rowHeight = 18;
        const tooltipHeight = clamp(
          districts.length > 0
            ? tooltipPaddingY + headerHeight + 8 + visibleLocationCount * rowHeight
            : tooltipPaddingY + headerHeight,
          56,
          190,
        );

        const preferredRightX = centroid.x + 18;
        const preferredLeftX = centroid.x - 18 - tooltipWidth;
        const canPlaceRight = preferredRightX + tooltipWidth <= viewBoxX + viewBoxWidth - 8;
        const canPlaceLeft = preferredLeftX >= viewBoxX + 8;
        const placeRight = canPlaceRight || !canPlaceLeft;

        const unclampedTooltipX = placeRight ? preferredRightX : preferredLeftX;
        const unclampedTooltipY = centroid.y - tooltipHeight / 2;

        const tooltipX = clamp(unclampedTooltipX, viewBoxX + 8, viewBoxX + viewBoxWidth - tooltipWidth - 8);
        const tooltipY = clamp(unclampedTooltipY, viewBoxY + 8, viewBoxY + viewBoxHeight - tooltipHeight - 8);

        const arrowMidY = clamp(centroid.y, tooltipY + 18, tooltipY + tooltipHeight - 18);
        const arrowSize = 8;
        const arrowTipX = placeRight ? tooltipX : tooltipX + tooltipWidth;
        const arrowBaseX = placeRight ? arrowTipX - arrowSize : arrowTipX + arrowSize;
        const arrowPath = `M ${arrowTipX} ${arrowMidY} L ${arrowBaseX} ${arrowMidY - 7} L ${arrowBaseX} ${arrowMidY + 7} Z`;

        // Light-green theme (clean + subtle)
        const cardBg = "#F0FDF4"; // emerald-50
        const cardBorder = "rgba(5, 150, 105, 0.25)"; // emerald-600/25

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

            {/* Tooltip - state name + districts (visible only when highlighted) */}
            <g className={isTooltipVisible ? "marker-tooltip-visible" : "marker-tooltip-hidden"}>
              {/* Arrow */}
              <path d={arrowPath} fill={cardBg} stroke={cardBorder} strokeWidth="1" />

              <foreignObject
                x={tooltipX}
                y={tooltipY}
                width={tooltipWidth}
                height={tooltipHeight}
              >
                <div
	                  style={{
	                    width: "100%",
	                    height: "100%",
	                    background: cardBg,
	                    color: "#0F172A",
	                    borderRadius: 10,
	                    border: `1px solid ${cardBorder}`,
	                    boxShadow: "0 10px 22px rgba(2,6,23,0.14), 0 2px 6px rgba(2,6,23,0.08)",
	                    padding: "10px 12px",
	                    boxSizing: "border-box",
	                    fontFamily: "system-ui, sans-serif",
	                    lineHeight: 1.25,
	                    textAlign: "left",
	                  }}
	                >
	                  <div
	                    style={{
	                      display: "flex",
	                      gap: 10,
	                      alignItems: "flex-start",
	                      marginBottom: districts.length > 0 ? 10 : 0,
	                    }}
	                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: pinColor,
                        marginTop: 4,
                        flex: "0 0 auto",
                        boxShadow: "0 0 0 4px rgba(5,146,54,0.10)",
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: "#065F46",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={tooltipTitle}
                      >
                        {tooltipTitle}
                      </div>
                     
                    </div>
	                  </div>

	                  {districts.length > 0 ? (
	                    <div>
	                      {/* <div
	                        style={{
	                          fontSize: 11,
	                          fontWeight: 700,
                          color: "rgba(15,23,42,0.72)",
                          marginBottom: 6,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        Locations
                      </div> */}
		                      <div
		                        style={{
		                          paddingRight: 4,
		                        }}
		                      >
		                        <div
		                          style={{
		                            display: "grid",
		                            gridTemplateColumns: useTwoColumns
		                              ? "repeat(2, minmax(0, 1fr))"
		                              : "minmax(0, 1fr)",
		                            columnGap: 16,
		                            rowGap: 3,
		                          }}
		                        >
		                          {tooltipLocations.map((district) => (
		                            <div
		                              key={district}
		                              title={district}
		                              style={{
		                                display: "flex",
		                                alignItems: "center",
		                                gap: 8,
		                                minWidth: 0,
		                              }}
		                            >
		                              <span
		                                style={{
		                                  width: 5,
		                                  height: 5,
		                                  borderRadius: 999,
		                                  background: "#16A34A",
		                                  flex: "0 0 auto",
		                                }}
		                              />
		                              <span
		                                style={{
		                                  fontSize: 12,
		                                  fontWeight: 600,
		                                  color: "#0F172A",
		                                  lineHeight: 1.3,
		                                  whiteSpace: "nowrap",
		                                  overflow: "hidden",
		                                  textOverflow: "ellipsis",
		                                }}
		                              >
		                                {district}
		                              </span>
		                            </div>
		                          ))}

                              {hasMoreLocations ? (
                                <div
                                  style={{
                                    marginTop: 4,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: "rgba(6,95,70,0.85)",
                                    gridColumn: "1 / -1",
                                  }}
                                >
                                  +{districts.length - tooltipLocations.length} more
                                </div>
                              ) : null}
		                        </div>
	                      </div>
	                    </div>
	                  ) : null}
                </div>
              </foreignObject>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

export default IndiaMapSVG;
