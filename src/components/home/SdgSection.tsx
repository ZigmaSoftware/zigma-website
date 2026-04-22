import { useEffect, useState, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// VERIFIED against official UN PDF:
// "Guidelines for the Use of the SDG Logo Including the Colour Wheel, and 17 Icons"
// UN Dept of Global Communications, Aug 2019 / Sep 2023
//
// SDG  | Name                                      | Official Hex | PMS colour name
//  3   | Good Health and Well-Being                | #4C9F38      | Kelly Green   (PMS 7739 C)
//  6   | Clean Water and Sanitation                | #26BDE2      | Bright Blue   (PMS 638 C)
//  8   | Decent Work and Economic Growth           | #A21942      | Dark Red      (PMS 7435 C)
//  9   | Industry, Innovation and Infrastructure   | #FD6925      | Orange        (PMS 1505 C)
// 10   | Reduced Inequalities                      | #DD1367      | Deep Pink     (PMS 214 C)
// 11   | Sustainable Cities and Communities        | #FD9D24      | Amber         (PMS 137 C)
// 12   | Responsible Consumption and Production    | #BF8B2E      | Dark Gold     (PMS 7555 C)
// 13   | Climate Action                            | #3F7E44      | Dark Green    (PMS 7742 C)
// 15   | Life on Land                              | #56C02B      | Light Green   (PMS 375 C)
// 17   | Partnerships for the Goals                | #19486A      | Dark Navy     (PMS 302 C)
//
// Icon CDN: globalgoalscms.co.uk/wp-content/uploads/2021/09/
// Filename pattern: zero-padded SDG number + ".svg"  e.g. 03.svg, 09.svg, 15.svg
// ─────────────────────────────────────────────────────────────────────────────

const GOALS = [
  { id: 3,  name: "Good Health and Well-Being",               color: "#4C9F38", lines: ["GOOD HEALTH","AND WELL-BEING"],             icon: "03.svg" },
  { id: 6,  name: "Clean Water and Sanitation",               color: "#26BDE2", lines: ["CLEAN WATER","AND SANITATION"],             icon: "06.svg" },
  { id: 8,  name: "Decent Work and Economic Growth",          color: "#A21942", lines: ["DECENT WORK","AND ECONOMIC GROWTH"],        icon: "08.svg" },
  { id: 9,  name: "Industry, Innovation and Infrastructure",  color: "#FD6925", lines: ["INDUSTRY, INNOVATION","AND INFRASTRUCTURE"], icon: "09.svg" },
  { id: 10, name: "Reduced Inequalities",                     color: "#DD1367", lines: ["REDUCED","INEQUALITIES"],                   icon: "10.svg" },
  { id: 11, name: "Sustainable Cities and Communities",       color: "#FD9D24", lines: ["SUSTAINABLE CITIES","AND COMMUNITIES"],     icon: "11.svg" },
  { id: 12, name: "Responsible Consumption and Production",   color: "#BF8B2E", lines: ["RESPONSIBLE","CONSUMPTION & PRODUCTION"],   icon: "12.svg" },
  { id: 13, name: "Climate Action",                           color: "#3F7E44", lines: ["CLIMATE","ACTION"],                         icon: "13.svg" },
  { id: 15, name: "Life on Land",                             color: "#56C02B", lines: ["LIFE","ON LAND"],                           icon: "15.svg" },
  { id: 17, name: "Partnerships for the Goals",               color: "#19486A", lines: ["PARTNERSHIPS","FOR THE GOALS"],             icon: "17.svg" },
] as const;

const ICON_BASE = "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/";

const CX = 250, CY = 250, R_IN = 108, R_OUT = 242;
const N = GOALS.length;
const SEG = 360 / N;
const GAP = 1.6;
const ICON_SIZE = 38;

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function segPath(i: number) {
  const a1 = i * SEG + GAP / 2, a2 = (i + 1) * SEG - GAP / 2;
  const [x1,y1] = polar(CX,CY,R_OUT,a1), [x2,y2] = polar(CX,CY,R_OUT,a2);
  const [x3,y3] = polar(CX,CY,R_IN,a2),  [x4,y4] = polar(CX,CY,R_IN,a1);
  return `M${x1},${y1} A${R_OUT},${R_OUT},0,0,1,${x2},${y2} L${x3},${y3} A${R_IN},${R_IN},0,0,0,${x4},${y4}Z`;
}

function iconCenter(i: number) {
  return polar(CX, CY, (R_IN + R_OUT) / 2, i * SEG + SEG / 2);
}

function segIndexAtAngle(wheelRot: number, px: number, py: number): number {
  const dx = px - CX, dy = py - CY;
  if (Math.hypot(dx, dy) < R_IN || Math.hypot(dx, dy) > R_OUT) return -1;
  let a = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  if (a < 0) a += 360;
  return Math.floor(((a - wheelRot) % 360 + 360) % 360 / SEG);
}

function NameLines({ name, lines }: { name: string; lines?: readonly string[] }) {
  const words = name.toUpperCase().split(" ");
  const mid = Math.ceil(words.length / 2);
  const l1 = lines?.[0] ?? words.slice(0, mid).join(" ");
  const l2 = lines?.[1] ?? words.slice(mid).join(" ");
  const ff = "'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif";
  return (
    <>
      <text x={CX} y={l2 ? CY + 4 : CY + 10} textAnchor="middle" fill="white"
        fontSize={l2 ? 11 : 12} fontWeight="bold" fontFamily={ff} style={{userSelect:"none"}}>{l1}</text>
      {l2 && <text x={CX} y={CY + 18} textAnchor="middle" fill="white"
        fontSize={11} fontWeight="bold" fontFamily={ff} style={{userSelect:"none"}}>{l2}</text>}
    </>
  );
}

interface WheelProps {
  rotation: number; activeIdx: number | null; animate: boolean;
  onPointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerUp:   (e: React.PointerEvent<SVGSVGElement>) => void;
  onClick:       (e: React.MouseEvent<SVGSVGElement>)   => void;
}

function Wheel({ rotation, activeIdx, animate, onPointerDown, onPointerMove, onPointerUp, onClick }: WheelProps) {
  const goal = activeIdx !== null ? GOALS[activeIdx] : null;
  const ff = "'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif";
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
      style={{width:"100%",height:"100%",touchAction:"none",cursor:"grab",overflow:"visible",userSelect:"none"}}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove}
      onPointerUp={onPointerUp} onPointerLeave={onPointerUp} onClick={onClick}>
      <g style={{
        transform:`rotate(${rotation}deg)`, transformOrigin:`${CX}px ${CY}px`,
        transition: animate ? "transform 0.55s cubic-bezier(0.4,0,0.2,1)" : "none",
        willChange:"transform",
      }}>
        {GOALS.map((g, i) => {
          const [ix,iy] = iconCenter(i);
          return (
            <g key={`sdg-${g.id}`}>
              <path d={segPath(i)} fill={g.color}
                style={{opacity: activeIdx === null ? 1 : i === activeIdx ? 1 : 0.65}} />
              <image href={`${ICON_BASE}${g.icon}`}
                x={ix - ICON_SIZE/2} y={iy - ICON_SIZE/2}
                width={ICON_SIZE} height={ICON_SIZE}
                style={{pointerEvents:"none"}} />
            </g>
          );
        })}
      </g>
      <circle cx={CX} cy={CY} r={R_IN + 3} fill="none" stroke="#bbb" strokeWidth={4} />
      {goal ? (
        <>
          <circle cx={CX} cy={CY} r={R_IN - 2} fill={goal.color} />
          <text x={CX} y={CY - 26} textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize={60} fontWeight="900" fontFamily={ff}
            style={{userSelect:"none"}}>{goal.id}</text>
          <NameLines name={goal.name} lines={goal.lines} />
        </>
      ) : (
        <>
          <circle cx={CX} cy={CY} r={R_IN - 2} fill="white" />
          <circle cx={CX} cy={CY} r={R_IN - 18} fill="none" stroke="#e8e8e8" strokeWidth={1} />
          <text x={CX} y={CY - 6} textAnchor="middle" dominantBaseline="middle"
            fill="#ccc" fontSize={11} letterSpacing={1.5} fontWeight="600" fontFamily={ff}
            style={{userSelect:"none"}}>CLICK A GOAL</text>
          <text x={CX} y={CY + 10} textAnchor="middle" dominantBaseline="middle"
            fill="#aaa" fontSize={9} letterSpacing={1} fontFamily="Arial,sans-serif"
            style={{userSelect:"none"}}>OR DRAG TO SPIN</text>
        </>
      )}
    </svg>
  );
}

export default function SDGSection() {
  const [rotation, setRotation] = useState(0);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [animateWheel, setAnimateWheel] = useState(false);

  const isDragging    = useRef(false);
  const dragStartAngle = useRef(0);
  const dragStartRot  = useRef(0);
  const totalDrag     = useRef(0);
  const rotationRef   = useRef(0);
  const isHovering    = useRef(false);
  const pausedUntil   = useRef(0);

  function getSVGPoint(e: React.PointerEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget as SVGSVGElement;
    const r = svg.getBoundingClientRect();
    return { x:(e.clientX-r.left)*(500/r.width), y:(e.clientY-r.top)*(500/r.height) };
  }
  function getAngle(px: number, py: number) {
    let a = (Math.atan2(py-CY, px-CX)*180/Math.PI)+90;
    if (a<0) a+=360; return a;
  }

  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const {x,y} = getSVGPoint(e);
    isDragging.current = true;
    dragStartAngle.current = getAngle(x,y);
    dragStartRot.current = rotationRef.current;
    totalDrag.current = 0;
    setAnimateWheel(false);
  },[]);

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    const {x,y} = getSVGPoint(e);
    const delta = getAngle(x,y) - dragStartAngle.current;
    totalDrag.current += Math.abs(delta);
    const newRot = dragStartRot.current + delta;
    rotationRef.current = newRot;
    setRotation(newRot);
  },[]);

  const handlePointerUp = useCallback((_e: React.PointerEvent<SVGSVGElement>) => {
    isDragging.current = false;
  },[]);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (totalDrag.current > 6) return;
    const {x,y} = getSVGPoint(e);
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
    pausedUntil.current = Date.now() + 1400;
  },[]);

  useEffect(() => { rotationRef.current = rotation; }, [rotation]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let rafId = 0, lastTs = 0;
    const tick = (ts: number) => {
      rafId = requestAnimationFrame(tick);
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.05); lastTs = ts;
      if (isDragging.current || isHovering.current || Date.now() < pausedUntil.current) return;
      const next = rotationRef.current + 12 * dt;
      rotationRef.current = next;
      setAnimateWheel(false);
      setRotation(next);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white relative font-['Franklin_Gothic_Medium','Arial_Narrow',Arial,sans-serif]">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[52%] max-w-[570px] aspect-square z-20 select-none"
        onMouseEnter={() => { isHovering.current = true; }}
        onMouseLeave={() => { isHovering.current = false; }}
      >
        <Wheel rotation={rotation} activeIdx={activeIdx} animate={animateWheel}
          onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp} onClick={handleClick} />
      </div>

      <div className="bg-white px-12 py-16 min-h-96 w-1/2">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">
          Our Commitment to the UN Sustainable Development Goals
        </h2>
        <p className="text-sm leading-relaxed text-gray-600 mb-5 font-normal font-['Arial','Helvetica',sans-serif]">
          As part of the Blue Planet Group, Zigma embeds sustainability into the very core of
          its mission. By advancing the Triple Bottom Line of People, Planet, and Prosperity,
          we ensure that every initiative delivers enduring value to communities and ecosystems.
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
  );
}