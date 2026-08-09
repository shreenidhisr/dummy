import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/IBMPlexMono";
import { getNode, type GraphEdge, type GraphNode } from "../data/graph";

const { fontFamily: displayFont } = loadDisplay("normal", {
  weights: ["500", "700"],
  subsets: ["latin"],
});
const { fontFamily: monoFont } = loadMono("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const COLORS = {
  bg: "#0B1220",
  bgSoft: "#121A2B",
  grid: "rgba(148, 163, 184, 0.08)",
  node: "#1EE3A1",
  nodeGlow: "rgba(30, 227, 161, 0.35)",
  nodeText: "#041016",
  edge: "#5EEAD4",
  edgeMuted: "rgba(94, 234, 212, 0.35)",
  accent: "#FF8A3D",
  text: "#E8EEF7",
  muted: "#94A3B8",
  panel: "rgba(18, 26, 43, 0.92)",
  border: "rgba(148, 163, 184, 0.22)",
  matrixOn: "#1EE3A1",
  matrixOff: "rgba(148, 163, 184, 0.18)",
};

export const fonts = {
  display: displayFont,
  mono: monoFont,
};

export const Background: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1200px 700px at 20% 10%, #16324a 0%, ${COLORS.bg} 55%, #070b14 100%)`,
        color: COLORS.text,
        fontFamily: fonts.display,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(${COLORS.grid} 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.7,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const SceneLabel: React.FC<{
  eyebrow: string;
  title: string;
  delay?: number;
}> = ({ eyebrow, title, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });
  const y = interpolate(enter, [0, 1], [24, 0]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        left: 64,
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: COLORS.accent,
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: -0.5,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const GraphEdgeLine: React.FC<{
  edge: GraphEdge;
  progress: number;
  highlight?: boolean;
  muted?: boolean;
  thickness?: number;
}> = ({ edge, progress, highlight = false, muted = false, thickness = 3 }) => {
  const from = getNode(edge.from);
  const to = getNode(edge.to);
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const draw = Math.max(0, Math.min(1, progress));
  const opacity = muted ? 0.22 : highlight ? 1 : 0.85;

  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={highlight ? COLORS.accent : COLORS.edge}
      strokeWidth={highlight ? thickness + 1.5 : thickness}
      strokeLinecap="round"
      strokeDasharray={length}
      strokeDashoffset={length * (1 - draw)}
      opacity={opacity}
    />
  );
};

export const GraphNodeCircle: React.FC<{
  node: GraphNode;
  scale?: number;
  highlight?: boolean;
  appear?: number;
}> = ({ node, scale = 1, highlight = false, appear = 1 }) => {
  const r = 34 * scale;
  const opacity = interpolate(appear, [0, 1], [0, 1]);
  const grow = interpolate(appear, [0, 1], [0.4, 1]);

  return (
    <g
      transform={`translate(${node.x} ${node.y}) scale(${grow})`}
      opacity={opacity}
    >
      <circle
        r={r + 10}
        fill={highlight ? "rgba(255, 138, 61, 0.22)" : COLORS.nodeGlow}
      />
      <circle
        r={r}
        fill={highlight ? COLORS.accent : COLORS.node}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={2}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={COLORS.nodeText}
        fontFamily={fonts.display}
        fontSize={28}
        fontWeight={700}
      >
        {node.label}
      </text>
    </g>
  );
};

export const MiniGraph: React.FC<{
  nodes: GraphNode[];
  edges: GraphEdge[];
  nodeProgress: number[];
  edgeProgress: number[];
  highlightEdgeIndex?: number | null;
  highlightNodeIds?: string[];
  mutedEdgePredicate?: (edge: GraphEdge, index: number) => boolean;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
}> = ({
  nodes,
  edges,
  nodeProgress,
  edgeProgress,
  highlightEdgeIndex = null,
  highlightNodeIds = [],
  mutedEdgePredicate,
  width = 1100,
  height = 520,
  offsetX = 0,
  offsetY = 0,
  scale = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`${offsetX} ${offsetY} ${width / scale} ${height / scale}`}
      style={{ overflow: "visible" }}
    >
      {edges.map((edge, i) => (
        <GraphEdgeLine
          key={`${edge.from}-${edge.to}`}
          edge={edge}
          progress={edgeProgress[i] ?? 0}
          highlight={highlightEdgeIndex === i}
          muted={mutedEdgePredicate ? mutedEdgePredicate(edge, i) : false}
        />
      ))}
      {nodes.map((node, i) => (
        <GraphNodeCircle
          key={node.id}
          node={node}
          appear={nodeProgress[i] ?? 0}
          highlight={highlightNodeIds.includes(node.id)}
        />
      ))}
    </svg>
  );
};
