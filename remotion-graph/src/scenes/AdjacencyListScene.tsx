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
  SceneLabel,
  fonts,
} from "../components/Visual";
import {
  ADJACENCY_LIST,
  EDGES,
  NODE_ORDER,
  NODES,
} from "../data/graph";

export const AdjacencyListScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeProgress = NODES.map(() => 1);
  const edgeProgress = EDGES.map(() => 1);

  const activeIndex = Math.min(
    NODE_ORDER.length - 1,
    Math.max(0, Math.floor((frame - 12) / 22)),
  );
  const activeId = NODE_ORDER[activeIndex];

  return (
    <Background>
      <SceneLabel eyebrow="Step 02" title="Adjacency list" />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "120px 48px 48px",
          gap: 24,
        }}
      >
        <div style={{ flex: 1.1, display: "flex", justifyContent: "center" }}>
          <MiniGraph
            nodes={NODES}
            edges={EDGES}
            nodeProgress={nodeProgress}
            edgeProgress={edgeProgress}
            highlightNodeIds={[activeId]}
            mutedEdgePredicate={(edge) =>
              edge.from !== activeId && edge.to !== activeId
            }
            width={620}
            height={460}
            offsetX={220}
            offsetY={60}
            scale={0.95}
          />
        </div>

        <div
          style={{
            flex: 0.9,
            background: COLORS.panel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 18,
            padding: "28px 32px",
            fontFamily: fonts.mono,
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              color: COLORS.muted,
              fontSize: 16,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            neighbors[v]
          </div>
          {NODE_ORDER.map((id, i) => {
            const rowIn = spring({
              frame: frame - (8 + i * 8),
              fps,
              config: { damping: 200 },
            });
            const isActive = id === activeId;
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 14,
                  opacity: rowIn,
                  transform: `translateX(${interpolate(rowIn, [0, 1], [24, 0])}px)`,
                  padding: "10px 12px",
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
                    width: 36,
                    height: 36,
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
                <span style={{ fontSize: 22, color: COLORS.text }}>
                  [{ADJACENCY_LIST[id].join(", ")}]
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Background>
  );
};
