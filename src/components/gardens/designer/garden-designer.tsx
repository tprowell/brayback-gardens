"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { Garden, GardenFeature } from "@/types/database";
import {
  createGardenFeature,
  updateGardenFeature,
  deleteGardenFeature,
} from "@/actions/gardens";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  MousePointer2,
  Trash2,
  Pencil,
} from "lucide-react";
import { BedConfigDialog, type BedConfig } from "./bed-config-dialog";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  garden: Garden;
  features: GardenFeature[];
}

type ToolMode =
  | { type: "select" }
  | {
      type: "place-bed";
      shape: BedConfig["shape"];
      width: number;
      depth: number;
      name: string;
    }
  | { type: "draw-path"; width: number; points: { x: number; y: number }[] };

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PADDING = 5;
const ZOOM_FACTOR = 1.2;
const BED_FILL = "#c4a882";
const BED_STROKE = "#8b6914";
const PATH_STROKE = "#d6c9a4";
const SELECTED_STROKE = "#2563eb";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toSvgY(specY: number, gardenH: number) {
  return gardenH - specY;
}

function snap(value: number, gridSize: number) {
  return Math.round(value / gridSize) * gridSize;
}

function buildBoundarySegments(
  gardenL: number,
  gardenH: number,
  gates: GardenFeature[]
): Segment[] {
  const segments: Segment[] = [];

  const bottomGates = gates
    .filter(
      (g) => (g.properties as Record<string, unknown>)?.edge === "bottom"
    )
    .sort((a, b) => a.x - b.x);
  const rightGates = gates
    .filter(
      (g) => (g.properties as Record<string, unknown>)?.edge === "right"
    )
    .sort((a, b) => a.y - b.y);

  let cursor = 0;
  for (const gate of bottomGates) {
    if (gate.x > cursor)
      segments.push({ x1: cursor, y1: gardenH, x2: gate.x, y2: gardenH });
    cursor = gate.x + gate.width;
  }
  if (cursor < gardenL)
    segments.push({ x1: cursor, y1: gardenH, x2: gardenL, y2: gardenH });

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

  segments.push({ x1: 0, y1: 0, x2: 0, y2: gardenH });
  segments.push({ x1: 0, y1: 0, x2: gardenL, y2: 0 });

  return segments;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GardenDesigner({ garden, features }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const gardenL = garden.length_ft || 80;
  const gardenH = garden.width_ft || 45;
  const gridSize = garden.grid_size_ft || 2;

  const defaultVB = {
    x: -PADDING,
    y: -PADDING,
    width: gardenL + PADDING * 2,
    height: gardenH + PADDING * 2,
  };

  // ---- State ----
  const [localFeatures, setLocalFeatures] =
    useState<GardenFeature[]>(features);
  const [vb, setVB] = useState(defaultVB);
  const [mode, setMode] = useState<ToolMode>({ type: "select" });
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const panRef = useRef({ x: 0, y: 0, vbX: 0, vbY: 0 });
  const dragRef = useRef({
    offsetX: 0,
    offsetY: 0,
    moved: false,
  });

  // ---- Effects ----

  // Prevent default wheel
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const prevent = (e: WheelEvent) => e.preventDefault();
    el.addEventListener("wheel", prevent, { passive: false });
    return () => el.removeEventListener("wheel", prevent);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMode({ type: "select" });
        setSelectedId(null);
        setGhostPos(null);
      }
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedId &&
        mode.type === "select"
      ) {
        handleDeleteFeature(selectedId);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, mode.type]);

  // ---- Coordinate helpers ----

  const mouseToSvg = useCallback(
    (e: React.MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const rect = svg.getBoundingClientRect();
      return {
        x: vb.x + ((e.clientX - rect.left) / rect.width) * vb.width,
        y: vb.y + ((e.clientY - rect.top) / rect.height) * vb.height,
      };
    },
    [vb]
  );

  // ---- Feature CRUD ----

  async function placeBed(svgX: number, svgY: number) {
    if (mode.type !== "place-bed") return;
    const { shape, width: bw, depth: bd, name: bname } = mode;

    // Center the bed on the click position, snapped
    const cx = snap(svgX, gridSize);
    const cy = snap(svgY, gridSize);
    const specX = cx - bw / 2;
    const specY = gardenH - cy - bd / 2;

    const tempId = `temp-${Date.now()}`;
    const feature: GardenFeature = {
      id: tempId,
      garden_id: garden.id,
      name: bname,
      feature_type: "bed",
      x: specX,
      y: specY,
      width: bw,
      height: bd,
      rotation: 0,
      points: null,
      properties: { shape },
      is_fixture: false,
      notes: null,
      created_at: new Date().toISOString(),
    };

    setLocalFeatures((prev) => [...prev, feature]);

    const result = await createGardenFeature(garden.id, {
      name: bname,
      feature_type: "bed",
      x: specX,
      y: specY,
      width: bw,
      height: bd,
      properties: { shape },
    });

    if (result.data) {
      setLocalFeatures((prev) =>
        prev.map((f) => (f.id === tempId ? { ...f, id: result.data!.id } : f))
      );
    } else {
      setLocalFeatures((prev) => prev.filter((f) => f.id !== tempId));
    }
  }

  async function finishPath(
    points: { x: number; y: number }[],
    pathWidth: number
  ) {
    if (points.length < 2) return;

    const tempId = `temp-${Date.now()}`;
    const feature: GardenFeature = {
      id: tempId,
      garden_id: garden.id,
      name: "Path",
      feature_type: "path",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      rotation: 0,
      points,
      properties: { width: pathWidth },
      is_fixture: false,
      notes: null,
      created_at: new Date().toISOString(),
    };

    setLocalFeatures((prev) => [...prev, feature]);

    const result = await createGardenFeature(garden.id, {
      name: "Path",
      feature_type: "path",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      points,
      properties: { width: pathWidth },
    });

    if (result.data) {
      setLocalFeatures((prev) =>
        prev.map((f) => (f.id === tempId ? { ...f, id: result.data!.id } : f))
      );
    }
  }

  async function handleDeleteFeature(id: string) {
    if (id.startsWith("temp-")) return;
    setLocalFeatures((prev) => prev.filter((f) => f.id !== id));
    setSelectedId(null);
    await deleteGardenFeature(id);
  }

  // ---- Mouse handlers ----

  const handleSvgMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const pos = mouseToSvg(e);

      if (mode.type === "place-bed") {
        placeBed(pos.x, pos.y);
        return;
      }

      if (mode.type === "draw-path") {
        const sx = snap(pos.x, gridSize);
        const sy = snap(pos.y, gridSize);
        const specPt = { x: sx, y: gardenH - sy };
        setMode((prev) => {
          if (prev.type !== "draw-path") return prev;
          return { ...prev, points: [...prev.points, specPt] };
        });
        return;
      }

      // Select mode — clicked on empty area → pan
      setSelectedId(null);
      setIsPanning(true);
      panRef.current = { x: e.clientX, y: e.clientY, vbX: vb.x, vbY: vb.y };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, mouseToSvg, gridSize, gardenH, vb.x, vb.y]
  );

  const handleFeatureMouseDown = useCallback(
    (e: React.MouseEvent, feature: GardenFeature) => {
      if (mode.type !== "select" || feature.is_fixture) return;
      e.stopPropagation();

      setSelectedId(feature.id);

      const pos = mouseToSvg(e);
      const fSvgX = feature.x;
      const fSvgY = toSvgY(feature.y + feature.height, gardenH);

      setIsDragging(true);
      dragRef.current = {
        offsetX: pos.x - fSvgX,
        offsetY: pos.y - fSvgY,
        moved: false,
      };
    },
    [mode.type, mouseToSvg, gardenH]
  );

  const handleSvgMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // Ghost preview for placement / path modes
      if (mode.type === "place-bed" || mode.type === "draw-path") {
        const pos = mouseToSvg(e);
        setGhostPos({ x: snap(pos.x, gridSize), y: snap(pos.y, gridSize) });
        return;
      }

      // Feature dragging
      if (isDragging && selectedId) {
        const pos = mouseToSvg(e);
        const newSvgX = snap(pos.x - dragRef.current.offsetX, gridSize);
        const newSvgY = snap(pos.y - dragRef.current.offsetY, gridSize);

        setLocalFeatures((prev) =>
          prev.map((f) => {
            if (f.id !== selectedId) return f;
            const specX = newSvgX;
            const specY = gardenH - newSvgY - f.height;
            return { ...f, x: specX, y: specY };
          })
        );
        dragRef.current.moved = true;
        return;
      }

      // Panning
      if (isPanning) {
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        const dx =
          ((e.clientX - panRef.current.x) / rect.width) * vb.width;
        const dy =
          ((e.clientY - panRef.current.y) / rect.height) * vb.height;
        setVB((prev) => ({
          ...prev,
          x: panRef.current.vbX - dx,
          y: panRef.current.vbY - dy,
        }));
      }
    },
    [mode.type, mouseToSvg, gridSize, isDragging, selectedId, isPanning, gardenH, vb.width, vb.height]
  );

  const handleSvgMouseUp = useCallback(() => {
    if (isDragging && selectedId && dragRef.current.moved) {
      const feature = localFeatures.find((f) => f.id === selectedId);
      if (feature && !feature.id.startsWith("temp-")) {
        updateGardenFeature(feature.id, { x: feature.x, y: feature.y });
      }
    }
    setIsDragging(false);
    setIsPanning(false);
  }, [isDragging, selectedId, localFeatures]);

  const handleSvgDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (mode.type === "draw-path" && mode.points.length >= 2) {
        finishPath(mode.points, mode.width);
        setMode({ type: "select" });
        setGhostPos(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode]
  );

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
        const maxW = (gardenL + PADDING * 2) * 3;
        const minW = (gardenL + PADDING * 2) / 10;
        if (nw < minW || nw > maxW) return prev;
        return {
          x: mx - (mx - prev.x) * factor,
          y: my - (my - prev.y) * factor,
          width: nw,
          height: prev.height * factor,
        };
      });
    },
    [vb, gardenL]
  );

  // ---- Zoom controls ----

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

  // ---- Tool actions ----

  function handleBedConfig(config: BedConfig) {
    setMode({
      type: "place-bed",
      shape: config.shape,
      width: config.width,
      depth: config.depth,
      name: config.name,
    });
    setSelectedId(null);
  }

  function startPathDrawing(width: number) {
    setMode({ type: "draw-path", width, points: [] });
    setSelectedId(null);
    setGhostPos(null);
  }

  // ---- Computed values ----

  const gates = localFeatures.filter((f) => f.feature_type === "gate");
  const fixtures = localFeatures.filter(
    (f) => f.is_fixture && f.feature_type !== "gate"
  );
  const userFeatures = localFeatures.filter((f) => !f.is_fixture);
  const boundarySegments = buildBoundarySegments(gardenL, gardenH, gates);

  const vLines: number[] = [];
  for (let x = 0; x <= gardenL; x += gridSize) vLines.push(x);
  const hLines: number[] = [];
  for (let y = 0; y <= gardenH; y += gridSize) hLines.push(y);

  const cursor =
    mode.type === "place-bed" || mode.type === "draw-path"
      ? "crosshair"
      : isPanning
        ? "grabbing"
        : "grab";

  // ---- Render helpers ----

  function renderBed(f: GardenFeature, isGhost = false) {
    const isRound =
      (f.properties as Record<string, unknown>)?.shape === "round";
    const isSelected = f.id === selectedId && !isGhost;
    const ry = toSvgY(f.y + f.height, gardenH);
    const opacity = isGhost ? 0.45 : 0.75;
    const stroke = isSelected ? SELECTED_STROKE : BED_STROKE;
    const strokeW = isSelected ? 0.25 : 0.15;
    const dash = isGhost ? "0.5 0.3" : undefined;

    if (isRound) {
      return (
        <g
          key={f.id}
          onMouseDown={
            isGhost
              ? undefined
              : (e: React.MouseEvent) => handleFeatureMouseDown(e, f)
          }
          style={!isGhost && mode.type === "select" ? { cursor: "move" } : undefined}
        >
          <ellipse
            cx={f.x + f.width / 2}
            cy={ry + f.height / 2}
            rx={f.width / 2}
            ry={f.height / 2}
            fill={BED_FILL}
            fillOpacity={opacity}
            stroke={stroke}
            strokeWidth={strokeW}
            strokeDasharray={dash}
          />
          {!isGhost && (
            <text
              x={f.x + f.width / 2}
              y={ry + f.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={Math.min(f.width, f.height) * 0.22}
              fill="#4a3520"
            >
              {f.name}
            </text>
          )}
        </g>
      );
    }

    return (
      <g
        key={f.id}
        onMouseDown={
          isGhost
            ? undefined
            : (e: React.MouseEvent) => handleFeatureMouseDown(e, f)
        }
        style={!isGhost && mode.type === "select" ? { cursor: "move" } : undefined}
      >
        <rect
          x={f.x}
          y={ry}
          width={f.width}
          height={f.height}
          fill={BED_FILL}
          fillOpacity={opacity}
          stroke={stroke}
          strokeWidth={strokeW}
          strokeDasharray={dash}
          rx={0.2}
        />
        {!isGhost && (
          <text
            x={f.x + f.width / 2}
            y={ry + f.height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={Math.min(f.width, f.height) * 0.22}
            fill="#4a3520"
          >
            {f.name}
          </text>
        )}
      </g>
    );
  }

  function renderPath(f: GardenFeature, isPreview = false) {
    const pts = f.points;
    if (!pts || pts.length < 2) return null;
    const w = ((f.properties as Record<string, unknown>)?.width as number) || 3;
    return (
      <polyline
        key={f.id}
        points={pts
          .map((p) => `${p.x},${toSvgY(p.y, gardenH)}`)
          .join(" ")}
        fill="none"
        stroke={f.id === selectedId ? SELECTED_STROKE : PATH_STROKE}
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={isPreview ? 0.5 : 0.8}
        onMouseDown={
          isPreview
            ? undefined
            : (e: React.MouseEvent) => {
                if (mode.type !== "select") return;
                e.stopPropagation();
                setSelectedId(f.id);
              }
        }
        style={mode.type === "select" ? { cursor: "pointer" } : undefined}
      />
    );
  }

  // Ghost feature for placement preview
  const ghostFeature: GardenFeature | null =
    mode.type === "place-bed" && ghostPos
      ? {
          id: "ghost",
          garden_id: garden.id,
          name: mode.name,
          feature_type: "bed",
          x: ghostPos.x - mode.width / 2,
          y: gardenH - ghostPos.y - mode.depth / 2,
          width: mode.width,
          height: mode.depth,
          rotation: 0,
          points: null,
          properties: { shape: mode.shape },
          is_fixture: false,
          notes: null,
          created_at: "",
        }
      : null;

  // In-progress path preview
  const pathPreviewPoints =
    mode.type === "draw-path" && mode.points.length > 0
      ? [
          ...mode.points.map((p) => ({
            x: p.x,
            svgY: toSvgY(p.y, gardenH),
          })),
          ...(ghostPos
            ? [{ x: ghostPos.x, svgY: ghostPos.y }]
            : []),
        ]
      : null;

  // ---- JSX ----

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b bg-background flex-wrap">
        <h2 className="text-sm font-semibold truncate">{garden.name}</h2>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {gardenL}&prime; &times; {gardenH}&prime;
        </span>

        <div className="border-l h-5 mx-1" />

        {/* Tool buttons */}
        <Button
          variant={mode.type === "select" ? "secondary" : "ghost"}
          size="sm"
          className="h-7 text-xs"
          onClick={() => {
            setMode({ type: "select" });
            setGhostPos(null);
          }}
        >
          <MousePointer2 className="h-3.5 w-3.5 mr-1" />
          Select
        </Button>

        <BedConfigDialog onPlace={handleBedConfig} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={mode.type === "draw-path" ? "secondary" : "outline"}
              size="sm"
              className="h-7 text-xs"
            >
              <Pencil className="h-3.5 w-3.5 mr-1" />
              Path
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => startPathDrawing(2)}>
              2ft wide
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startPathDrawing(3)}>
              3ft wide
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => startPathDrawing(4)}>
              4ft wide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Delete (context action) */}
        {selectedId && mode.type === "select" && (
          <Button
            variant="destructive"
            size="sm"
            className="h-7 text-xs"
            onClick={() => handleDeleteFeature(selectedId)}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Delete
          </Button>
        )}

        {/* Zoom controls */}
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
          style={{ cursor }}
          viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
          preserveAspectRatio="xMidYMid meet"
          onMouseDown={handleSvgMouseDown}
          onMouseMove={handleSvgMouseMove}
          onMouseUp={handleSvgMouseUp}
          onMouseLeave={handleSvgMouseUp}
          onDoubleClick={handleSvgDoubleClick}
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

          {/* Grid */}
          <g opacity={0.25} stroke="#a3a3a3" strokeWidth={0.08}>
            {vLines.map((x) => (
              <line key={`v${x}`} x1={x} y1={0} x2={x} y2={gardenH} />
            ))}
            {hLines.map((y) => (
              <line key={`h${y}`} x1={0} y1={y} x2={gardenL} y2={y} />
            ))}
          </g>

          {/* Boundary */}
          <g stroke="#78350f" strokeWidth={0.35} strokeLinecap="round">
            {boundarySegments.map((s, i) => (
              <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
            ))}
          </g>

          {/* Gates */}
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

          {/* User paths */}
          {userFeatures
            .filter((f) => f.feature_type === "path")
            .map((f) => renderPath(f))}

          {/* User beds */}
          {userFeatures
            .filter((f) => f.feature_type === "bed")
            .map((f) => renderBed(f))}

          {/* Ghost bed preview */}
          {ghostFeature && renderBed(ghostFeature, true)}

          {/* Path drawing preview */}
          {pathPreviewPoints && pathPreviewPoints.length > 0 && (
            <g>
              <polyline
                points={pathPreviewPoints
                  .map((p) => `${p.x},${p.svgY}`)
                  .join(" ")}
                fill="none"
                stroke={PATH_STROKE}
                strokeWidth={
                  mode.type === "draw-path" ? mode.width : 3
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.5}
                strokeDasharray="1 0.5"
              />
              {pathPreviewPoints.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.svgY}
                  r={0.35}
                  fill={PATH_STROKE}
                  stroke="#b5a070"
                  strokeWidth={0.08}
                />
              ))}
            </g>
          )}

          {/* Orientation labels */}
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

        {/* Mode indicator overlay */}
        {mode.type !== "select" && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur rounded-md border px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
            {mode.type === "place-bed" &&
              "Click to place bed. Press Esc to cancel."}
            {mode.type === "draw-path" &&
              (mode.points.length === 0
                ? "Click to start path. Press Esc to cancel."
                : "Click to add points. Double-click to finish.")}
          </div>
        )}
      </div>
    </div>
  );
}
