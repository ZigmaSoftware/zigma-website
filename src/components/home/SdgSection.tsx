import { useEffect, useState, useRef, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const GOALS = [
  { id: 1, name: "No Poverty", color: "#E5243B", lines: ["NO", "POVERTY"] },
  { id: 2, name: "Zero Hunger", color: "#DDA63A", lines: ["ZERO", "HUNGER"] },
  {
    id: 3,
    name: "Good Health and Well-Being",
    color: " #4C9F38    ",
    lines: ["GOOD HEALTH", "AND WELL-BEING"],
  },
  { id: 4, name: "Quality Education", color: "#C5192D", lines: ["QUALITY", "EDUCATION"] },
  { id: 5, name: "Gender Equality", color: "#FF3A21", lines: ["GENDER", "EQUALITY"] },
  {
    id: 6,
    name: "Clean Water and Sanitation",
    color: "#26BDE2",
    lines: ["CLEAN WATER", "AND SANITATION"],
  },
  {
    id: 7,
    name: "Affordable and Clean Energy",
    color: "#FCC30B",
    lines: ["AFFORDABLE AND", "CLEAN ENERGY"],
  },
  {
    id: 8,
    name: "Decent Work and Economic Growth",
    color: "#A21942",
    lines: ["DECENT WORK", "AND ECONOMIC GROWTH"],
  },
  {
    id: 9,
    name: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    lines: ["INDUSTRY, INNOVATION", "AND INFRASTRUCTURE"],
  },
  { id: 10, name: "Reduced Inequalities", color: "#DD1367", lines: ["REDUCED", "INEQUALITIES"] },
  {
    id: 11,
    name: "Sustainable Cities and Communities",
    color: "#FD9D24",
    lines: ["SUSTAINABLE CITIES", "AND COMMUNITIES"],
  },
  {
    id: 12,
    name: "Responsible Consumption and Production",
    color: "#BF8B2E",
    lines: ["RESPONSIBLE", "CONSUMPTION & PRODUCTION"],
  },
  { id: 13, name: "Climate Action", color: "#3F7E44", lines: ["CLIMATE", "ACTION"] },
  { id: 14, name: "Life Below Water", color: "#0A97D9", lines: ["LIFE", "BELOW WATER"] },
  { id: 15, name: "Life on Land", color: "#56C02B", lines: ["LIFE", "ON LAND"] },
  {
    id: 16,
    name: "Peace, Justice and Strong Institutions",
    color: "#00689D",
    lines: ["PEACE, JUSTICE", "AND STRONG INSTITUTIONS"],
  },
  {
    id: 17,
    name: "Partnerships for the Goals",
    color: "#19486A",
    lines: ["PARTNERSHIPS", "FOR THE GOALS"],
  },
];

const ICON_BASE = "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/";
const ICON_FILE: Record<number, string> = {
  1: "01.svg",
  2: "02.svg",
  3: "03.svg",
  4: "04.svg",
  5: "05.svg",
  6: "06.svg",
  7: "07.svg",
  8: "08.svg",
  9: "09.svg",
  10: "10.svg",
  11: "11.svg",
  12: "12.svg",
  13: "13.svg",
  14: "14.svg",
  15: "15.svg",
  16: "16.svg",
  17: "17.svg",
};

// ─── Geometry Constants ────────────────────────────────────────────────────────
const CX = 250;
const CY = 250;
const R_IN = 108;
const R_OUT = 242;
const N = GOALS.length; // 17
const SEG = 360 / N;
const GAP = 1.6;
const ICON_SIZE = N >= 15 ? 30 : 38;

// ─── Geometry Helpers ─────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
}

function segPath(i: number) {
  const a1 = i * SEG + GAP / 2;
  const a2 = (i + 1) * SEG - GAP / 2;
  const [x1, y1] = polar(CX, CY, R_OUT, a1);
  const [x2, y2] = polar(CX, CY, R_OUT, a2);
  const [x3, y3] = polar(CX, CY, R_IN,  a2);
  const [x4, y4] = polar(CX, CY, R_IN,  a1);
  return `M${x1},${y1} A${R_OUT},${R_OUT},0,0,1,${x2},${y2} L${x3},${y3} A${R_IN},${R_IN},0,0,0,${x4},${y4}Z`;
}

function iconCenter(i: number) {
  return polar(CX, CY, (R_IN + R_OUT) / 2, i * SEG + SEG / 2);
}

function segIndexAtAngle(wheelRot: number, px: number, py: number): number {
  const dx = px - CX;
  const dy = py - CY;
  if (Math.hypot(dx, dy) < R_IN || Math.hypot(dx, dy) > R_OUT) return -1;
  let clickAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  if (clickAngle < 0) clickAngle += 360;
  let logical = ((clickAngle - wheelRot) % 360 + 360) % 360;
  return Math.floor(logical / SEG);
}

// ─── Center Text Component ─────────────────────────────────────────────────────
interface NameLinesProps {
  name: string;
  lines?: [string, string] | string[];
  color: string;
}

function NameLines({ name, lines }: NameLinesProps) {
  const fallbackWords = name.toUpperCase().split(" ");
  const mid = Math.ceil(fallbackWords.length / 2);
  const fallbackL1 = fallbackWords.slice(0, mid).join(" ");
  const fallbackL2 = fallbackWords.slice(mid).join(" ");

  const l1 = lines?.[0] ?? fallbackL1;
  const l2 = lines?.[1] ?? fallbackL2;

  return (
    <>
      <text
        x={CX}
        y={l2 ? CY + 4 : CY + 10}
        textAnchor="middle"
        className="fill-white font-bold select-none"
        fontSize={l2 ? 11 : 12}
        fontFamily="'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif"
      >
        {l1}
      </text>
      {l2 && (
        <text
          x={CX}
          y={CY + 18}
          textAnchor="middle"
          className="fill-white font-bold select-none"
          fontSize={11}
          fontFamily="'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif"
        >
          {l2}
        </text>
      )}
    </>
  );
}

// ─── Wheel SVG Component ───────────────────────────────────────────────────────
interface WheelProps {
  rotation: number;
  activeIdx: number | null;
  animate: boolean;
  onPointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerUp: (e: React.PointerEvent<SVGSVGElement>) => void;
  onClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}

function Wheel({
  rotation,
  activeIdx,
  animate,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onClick,
}: WheelProps) {
  const goal = activeIdx !== null ? GOALS[activeIdx] : null;

  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
      style={{
        touchAction: "none",
        cursor: "grab",
        overflow: "visible",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onClick={onClick}
    >
      {/* Rotating Ring of Segments */}
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${CX}px ${CY}px`,
          transition: animate ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)" : "none",
          willChange: "transform",
        }}
      >
        {GOALS.map((g, i) => {
          const [ix, iy] = iconCenter(i);
          const isActive = i === activeIdx;
          return (
            <g key={g.id}>
              <path
                d={segPath(i)}
                fill={g.color}
                style={{
                  opacity: activeIdx === null ? 1 : isActive ? 1 : 0.7,
                }}
              />
              <image
                href={`${ICON_BASE}${ICON_FILE[g.id]}`}
                x={ix - ICON_SIZE / 2}
                y={iy - ICON_SIZE / 2}
                width={ICON_SIZE}
                height={ICON_SIZE}
                style={{ pointerEvents: "none" }}
              />
            </g>
          );
        })}
      </g>

      {/* Grey Separator Ring */}
      <circle cx={CX} cy={CY} r={R_IN + 3} fill="none" stroke="#bbb" strokeWidth={4} />

      {/* Centre Circle */}
      {goal ? (
        // Active State: Goal Colour + Number + Name
        <>
          <circle cx={CX} cy={CY} r={R_IN - 2} fill={goal.color} />
          <text
            x={CX}
            y={CY - 26}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white font-black select-none"
            fontSize={60}
            fontFamily="'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif"
          >
            {goal.id}
          </text>
          <NameLines name={goal.name} lines={goal.lines} color={goal.color} />
        </>
      ) : (
        // Initial Empty State
        <>
          <circle cx={CX} cy={CY} r={R_IN - 2} fill="white" />
          <circle cx={CX} cy={CY} r={R_IN - 18} fill="none" stroke="#e8e8e8" strokeWidth={1} />
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-300 font-semibold select-none"
            fontSize={11}
            letterSpacing={1.5}
            fontFamily="'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif"
          >
            CLICK A GOAL
          </text>
          <text
            x={CX}
            y={CY + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-400 select-none"
            fontSize={9}
            letterSpacing={1}
            fontFamily="Arial,sans-serif"
          >
            OR DRAG TO SPIN
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Main SDG Section Component ────────────────────────────────────────────────
export default function SDGSection() {
  const [rotation, setRotation] = useState(0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [animateWheel, setAnimateWheel] = useState(false);

  const isDragging = useRef(false);
  const dragStartAngle = useRef(0);
  const dragStartRot = useRef(0);
  const totalDrag = useRef(0);
  const rotationRef = useRef(0);
  const isHoveringWheel = useRef(false);
  const pausedUntilMs = useRef(0);

  // Convert Pointer Event to SVG Coordinates
  function getSVGPoint(e: React.PointerEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const scaleX = 500 / rect.width;
    const scaleY = 500 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  // Get Angle from Centre to Point
  function getAngle(px: number, py: number) {
    const dx = px - CX;
    const dy = py - CY;
    let a = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (a < 0) a += 360;
    return a;
  }

  // Pointer Down: Start Drag
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const { x, y } = getSVGPoint(e);
      isDragging.current = true;
      dragStartAngle.current = getAngle(x, y);
      dragStartRot.current = rotationRef.current;
      totalDrag.current = 0;
      setAnimateWheel(false);
    },
    []
  );

  // Pointer Move: Rotate Freely
  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    const { x, y } = getSVGPoint(e);
    const currentAngle = getAngle(x, y);
    const delta = currentAngle - dragStartAngle.current;
    totalDrag.current += Math.abs(delta);
    const newRot = dragStartRot.current + delta;
    rotationRef.current = newRot;
    setRotation(newRot);
  }, []);

  // Pointer Up: Stop Drag
  const handlePointerUp = useCallback((_e: React.PointerEvent<SVGSVGElement>) => {
    isDragging.current = false;
  }, []);

  // Click: Snap Clicked Segment to Top
  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (totalDrag.current > 6) return;

      const { x, y } = getSVGPoint(e);
      const idx = segIndexAtAngle(rotationRef.current, x, y);
      if (idx === -1 || idx >= N) return;

      const segCentre = idx * SEG + SEG / 2;
      let delta = -(segCentre + rotationRef.current);
      delta = ((delta + 180) % 360 + 360) % 360 - 180;
      const newRot = rotationRef.current + delta;

      rotationRef.current = newRot;
      setAnimateWheel(true);
      setRotation(newRot);
      setActiveIdx(idx);
      pausedUntilMs.current = Date.now() + 1400;
    },
    []
  );

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    let lastTs = 0;
    const speedDegPerSec = 12;

    const tick = (ts: number) => {
      rafId = window.requestAnimationFrame(tick);
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      const now = Date.now();
      const shouldPause =
        isDragging.current || isHoveringWheel.current || now < pausedUntilMs.current;
      if (shouldPause) return;

      const next = rotationRef.current + speedDegPerSec * dt;
      rotationRef.current = next;
      setAnimateWheel(false);
      setRotation(next);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleWheelMouseEnter = useCallback(() => {
    isHoveringWheel.current = true;
  }, []);

  const handleWheelMouseLeave = useCallback(() => {
    isHoveringWheel.current = false;
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white relative font-['Franklin_Gothic_Medium','Arial_Narrow',Arial,sans-serif]">
      {/* Wheel Container - Absolute positioned on right */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[52%] max-w-[570px] aspect-square z-20 select-none"
        onMouseEnter={handleWheelMouseEnter}
        onMouseLeave={handleWheelMouseLeave}
      >
        <Wheel
          rotation={rotation}
          activeIdx={activeIdx}
          animate={animateWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleClick}
        />
      </div>

      {/* Content Section - Left Side */}
      <div className="bg-white px-12 py-16 min-h-96 w-1/2">
        <div className="max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">
            Our Commitment to the UN Sustainable Development Goals
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 mb-5 font-normal font-['Arial','Helvetica',sans-serif]">
            As part of the Blue Planet Group, Zigma embeds sustainability into the very core of
            its mission. By advancing the Triple Bottom Line of People, Planet, and Prosperity,
            we ensure that every initiative delivers enduring value to communities and
            ecosystems.
          </p>

          <p className="text-sm leading-relaxed text-gray-600 mb-5 font-normal font-['Arial','Helvetica',sans-serif]">
            Guided by the United Nations Sustainable Development Goals, our operations generate
            measurable impact&mdash;strengthening public health and well-being through safe and
            scientific waste management, safeguarding clean water and sanitation by protecting
            vital resources, and enabling sustainable cities and communities through circular
            solutions that make urban environments more resilient and future-ready.
          </p>

          <p className="text-sm leading-relaxed text-gray-600 mb-8 font-normal font-['Arial','Helvetica',sans-serif]">
            Zigma contributes to 10 of the 17 UN Sustainable Development Goals, aligning
            innovation with responsibility to achieve a Net Positive Impact&mdash;leaving behind
            stronger communities, cleaner environments, and a more sustainable future.
          </p>

        
        </div>
      </div>
    </div>
  );
}
