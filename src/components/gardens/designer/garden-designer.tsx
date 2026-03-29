"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { Garden, GardenFeature } from "@/types/database";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

interface Props {
  garden: Garden;
  features: GardenFeature[];
}

const PADDING = 5;
const ZOOM_FACTOR = 1.2;

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// Convert spec Y (origin bottom-left, y-up) to SVG Y (origin top-left, y-down)
function toSvgY(specY: number, gardenH: number) {
  return gardenH - specY;
}

function buildBoundarySegments(
  gardenL: number,
  gardenH: number,
  gates: GardenFeature[]
): Segment[] {
  const segments: Segment[] = [];

  const bottomGates = gates
    .filter((g) => (g.properties as Record<string, unknown>)?.edge === "bottom")
    .sort((a, b) => a.x - b.x);
  const rightGates = gates
    .filter((g) => (g.properties as Record<string, unknown>)?.edge === "right")
    .sort((a, b) => a.y - b.y);

  // Bottom edge (spec y=0 → svg y=gardenH)
  let cursor = 0;
  for (const gate of bottomGates) {
    if (gate.x > cursor)
      segments.push({ x1: cursor, y1: gardenH, x2: gate.x, y2: gardenH });
    cursor = gate.x + gate.width;
  }
  if (cursor < gardenL)
    segments.push({ x1: cursor, y1: gardenH, x2: gardenL, y2: gardenH });

  // Right edge (spec x=gardenL)
  cursor = 0;
  for (const gate of rightGates) {
    const topSvg = toSvgY(gate.y + gate.height, gardenH);
    const botSvg = toSvgY(gate.y, gardenH);
    if (topSvg > cursor)
      segments.push({ x1: gardenL, y1: cursor, x2: gardenL, y2: topSvg });
    cursor = botSvg;
  }
  if (cursor < gardenH)
    segments.push({ x1: gardenL, y1: cursor, x2: gardenL, y2: gardenH });

  // Left edge (solid)
  segments.push({ x1: 0, y1: 0, x2: 0, y2: gardenH });
  // Top edge (solid)
  segments.push({ x1: 0, y1: 0, x2: gardenL, y2: 0 });

  return segments;
}

export function GardenDesigner({ garden, features }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  // In the coordinate system: x spans length_ft, y spans width_ft
  const gardenL = garden.length_ft || 80;
  const gardenH = garden.width_ft || 45;
  const gridSize = garden.grid_size_ft || 2;

  const defaultVB = {
    x: -PADDING,
    y: -PADDING,
    width: gardenL + PADDING * 2,
    height: gardenH + PADDING * 2,
  };

  const [vb, setVB] = useState(defaultVB);
  const [isPanning, setIsPanning] = useState(false);
  const panRef = useRef({ x: 0, y: 0, vbX: 0, vbY: 0 });

  // Prevent default wheel scroll on the SVG element
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const prevent = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", prevent, { passive: false });
    return () => el.removeEventListener("wheel", prevent);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setIsPanning(true);
      panRef.current = { x: e.clientX, y: e.clientY, vbX: vb.x, vbY: vb.y };
    },
    [vb.x, vb.y]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isPanning) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const dx = ((e.clientX - panRef.current.x) / rect.width) * vb.width;
      const dy = ((e.clientY - panRef.current.y) / rect.height) * vb.height;
      setVB((prev) => ({
        ...prev,
        x: panRef.current.vbX - dx,
        y: panRef.current.vbY - dy,
      }));
    },
    [isPanning, vb.width, vb.height]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mx = vb.x + ((e.clientX - rect.left) / rect.width) * vb.width;
      const my = vb.y + ((e.clientY - rect.top) / rect.height) * vb.height;
      const factor = e.deltaY > 0 ? ZOOM_FACTOR : 1 / ZOOM_FACTOR;
      setVB((prev) => {
        const nw = prev.width * factor;
        const nh = prev.height * factor;
        const maxW = (gardenL + PADDING * 2) * 3;
        const minW = (gardenL + PADDING * 2) / 10;
        if (nw < minW || nw > maxW) return prev;
        return {
          x: mx - (mx - prev.x) * factor,
          y: my - (my - prev.y) * factor,
          width: nw,
          height: nh,
        };
      });
    },
    [vb, gardenL]
  );

  const zoomIn = () =>
    setVB((prev) => {
      const cx = prev.x + prev.width / 2;
      const cy = prev.y + prev.height / 2;
      const f = 1 / ZOOM_FACTOR;
      return {
        x: cx - (prev.width * f) / 2,
        y: cy - (prev.height * f) / 2,
        width: prev.width * f,
        height: prev.height * f,
      };
    });

  const zoomOut = () =>
    setVB((prev) => {
      const cx = prev.x + prev.width / 2;
      const cy = prev.y + prev.height / 2;
      return {
        x: cx - (prev.width * ZOOM_FACTOR) / 2,
        y: cy - (prev.height * ZOOM_FACTOR) / 2,
        width: prev.width * ZOOM_FACTOR,
        height: prev.height * ZOOM_FACTOR,
      };
    });

  const fitToScreen = () => setVB(defaultVB);

  // Classify features
  const gates = features.filter((f) => f.feature_type === "gate");
  const fixtures = features.filter(
    (f) => f.is_fixture && f.feature_type !== "gate"
  );
  const boundarySegments = buildBoundarySegments(gardenL, gardenH, gates);

  // Grid lines
  const vLines: number[] = [];
  for (let x = 0; x <= gardenL; x += gridSize) vLines.push(x);
  const hLines: number[] = [];
  for (let y = 0; y <= gardenH; y += gridSize) hLines.push(y);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b bg-background">
        <h2 className="text-sm font-semibold truncate">{garden.name}</h2>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {gardenL}&prime; &times; {gardenH}&prime;
        </span>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={zoomIn}
            title="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={zoomOut}
            title="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={fitToScreen}
            title="Fit to screen"
          >
            <Maximize className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden bg-stone-100 dark:bg-stone-900">
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full select-none"
          style={{ cursor: isPanning ? "grabbing" : "grab" }}
          viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
          preserveAspectRatio="xMidYMid meet"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {/* Garden fill */}
          <rect
            x={0}
            y={0}
            width={gardenL}
            height={gardenH}
            fill="#f0fdf0"
            className="dark:fill-[#0a1f0a]"
          />

          {/* Grid lines */}
          <g opacity={0.25} stroke="#a3a3a3" strokeWidth={0.08}>
            {vLines.map((x) => (
              <line key={`v${x}`} x1={x} y1={0} x2={x} y2={gardenH} />
            ))}
            {hLines.map((y) => (
              <line key={`h${y}`} x1={0} y1={y} x2={gardenL} y2={y} />
            ))}
          </g>

          {/* Boundary segments (fence / walls) */}
          <g stroke="#78350f" strokeWidth={0.35} strokeLinecap="round">
            {boundarySegments.map((s, i) => (
              <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
            ))}
          </g>

          {/* Gate markers */}
          {gates.map((gate) => {
            const props = gate.properties as Record<string, unknown> | null;
            const edge = props?.edge;
            if (edge === "bottom") {
              return (
                <g key={gate.id}>
                  <line
                    x1={gate.x}
                    y1={gardenH}
                    x2={gate.x + gate.width}
                    y2={gardenH}
                    stroke="#78350f"
                    strokeWidth={0.2}
                    strokeDasharray="0.5 0.4"
                    opacity={0.5}
                  />
                  <text
                    x={gate.x + gate.width / 2}
                    y={gardenH + 1.8}
                    textAnchor="middle"
                    fontSize={1.1}
                    fill="#78350f"
                  >
                    {gate.name}
                  </text>
                </g>
              );
            }
            if (edge === "right") {
              const top = toSvgY(gate.y + gate.height, gardenH);
              const bot = toSvgY(gate.y, gardenH);
              return (
                <g key={gate.id}>
                  <line
                    x1={gardenL}
                    y1={top}
                    x2={gardenL}
                    y2={bot}
                    stroke="#78350f"
                    strokeWidth={0.2}
                    strokeDasharray="0.5 0.4"
                    opacity={0.5}
                  />
                  <text
                    x={gardenL + 1}
                    y={(top + bot) / 2}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fontSize={1.1}
                    fill="#78350f"
                  >
                    {gate.name}
                  </text>
                </g>
              );
            }
            return null;
          })}

          {/* Fixtures */}
          {fixtures.map((f) => {
            if (f.feature_type === "greenhouse") {
              const ry = toSvgY(f.y + f.height, gardenH);
              return (
                <g key={f.id}>
                  <rect
                    x={f.x}
                    y={ry}
                    width={f.width}
                    height={f.height}
                    fill="#d4d4d8"
                    fillOpacity={0.5}
                    stroke="#71717a"
                    strokeWidth={0.2}
                  />
                  <text
                    x={f.x + f.width / 2}
                    y={ry + f.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={1.3}
                    fill="#3f3f46"
                    fontWeight="600"
                  >
                    {f.name}
                  </text>
                </g>
              );
            }

            if (f.feature_type === "water") {
              const cy = toSvgY(f.y, gardenH);
              return (
                <g key={f.id}>
                  <circle
                    cx={f.x}
                    cy={cy}
                    r={0.7}
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    stroke="#1d4ed8"
                    strokeWidth={0.12}
                  />
                  <text
                    x={f.x}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={0.75}
                    fill="white"
                    fontWeight="bold"
                  >
                    W
                  </text>
                </g>
              );
            }

            // Generic rectangle feature
            const ry = toSvgY(f.y + f.height, gardenH);
            return (
              <g key={f.id}>
                <rect
                  x={f.x}
                  y={ry}
                  width={f.width}
                  height={f.height}
                  fill="#e5e7eb"
                  fillOpacity={0.5}
                  stroke="#6b7280"
                  strokeWidth={0.15}
                />
                <text
                  x={f.x + f.width / 2}
                  y={ry + f.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={1}
                  fill="#374151"
                >
                  {f.name}
                </text>
              </g>
            );
          })}

          {/* Compass / orientation label */}
          <text
            x={gardenL / 2}
            y={-2}
            textAnchor="middle"
            fontSize={1.2}
            fill="#a3a3a3"
          >
            N
          </text>
          <text
            x={gardenL / 2}
            y={gardenH + 3.5}
            textAnchor="middle"
            fontSize={1}
            fill="#a3a3a3"
          >
            Outer Fence (South)
          </text>
        </svg>
      </div>
    </div>
  );
}
