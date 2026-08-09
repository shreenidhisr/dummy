import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Background,
  COLORS,
  MiniGraph,
  NarrationBar,
  SceneLabel,
  fonts,
} from "../components/Visual";
import {
  ADJACENCY_LIST,
  EDGES,
  NODE_ORDER,
  NODES,
} from "../data/graph";
import { LIST_TIMING } from "../data/scripts";

export const AdjacencyListScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeProgress = NODES.map(() => 1);
  const edgeProgress = EDGES.map(() => 1);

  // cues[0] = intro; cues[1..] = one node each
  const nodeCues = LIST_TIMING.cues.slice(1);
  let activeIndex = 0;
  for (let i = 0; i < nodeCues.length; i++) {
    if (frame >= nodeCues[i].from) {
      activeIndex = i;
    }
  }
  const highlighting = frame >= nodeCues[0].from;
  const activeId = NODE_ORDER[activeIndex];

  return (
    <Background>
      <SceneLabel eyebrow="Step 02" title="Adjacency list" />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "100px 48px 140px",
          gap: 24,
        }}
      >
        <div style={{ flex: 1.1, display: "flex", justifyContent: "center" }}>
          <MiniGraph
            nodes={NODES}
            edges={EDGES}
            nodeProgress={nodeProgress}
            edgeProgress={edgeProgress}
            highlightNodeIds={highlighting ? [activeId] : []}
            mutedEdgePredicate={
              highlighting
                ? (edge) => edge.from !== activeId && edge.to !== activeId
                : undefined
            }
            width={620}
            height={400}
            offsetX={220}
            offsetY={70}
            scale={0.95}
          />
        </div>

        <div
          style={{
            flex: 0.9,
            background: COLORS.panel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 18,
            padding: "24px 28px",
            fontFamily: fonts.mono,
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              color: COLORS.muted,
              fontSize: 15,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            neighbors[v]
          </div>
          {NODE_ORDER.map((id, i) => {
            const rowIn = spring({
              frame: frame - (20 + i * 18),
              fps,
              config: { damping: 200 },
            });
            const isActive = highlighting && id === activeId;
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 12,
                  opacity: rowIn,
                  transform: `translateX(${interpolate(rowIn, [0, 1], [24, 0])}px)`,
                  padding: "9px 12px",
                  borderRadius: 10,
                  background: isActive
                    ? "rgba(255, 138, 61, 0.14)"
                    : "transparent",
                  border: isActive
                    ? `1px solid rgba(255, 138, 61, 0.45)`
                    : "1px solid transparent",
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: isActive ? COLORS.accent : COLORS.node,
                    color: COLORS.nodeText,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontFamily: fonts.display,
                  }}
                >
                  {id}
                </span>
                <span style={{ color: COLORS.muted }}>→</span>
                <span style={{ fontSize: 21, color: COLORS.text }}>
                  [{ADJACENCY_LIST[id].join(", ")}]
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <NarrationBar cues={LIST_TIMING.cues} />
    </Background>
  );
};
