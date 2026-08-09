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
import { ADJACENCY_LIST, EDGES, NODE_ORDER, NODES } from "../data/graph";

export const AdjacencyMatrixScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeProgress = NODES.map(() => 1);
  const edgeProgress = EDGES.map(() => 1);

  const reveal = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scanRow = Math.min(
    NODE_ORDER.length - 1,
    Math.max(0, Math.floor((frame - 24) / 18)),
  );

  const isConnected = (a: string, b: string) =>
    a === b ? false : ADJACENCY_LIST[a].includes(b);

  const highlightPair =
    frame > 24
      ? {
          row: NODE_ORDER[scanRow],
          neighbors: ADJACENCY_LIST[NODE_ORDER[scanRow]],
        }
      : null;

  return (
    <Background>
      <SceneLabel eyebrow="Step 03" title="Adjacency matrix" />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "120px 48px 48px",
          gap: 20,
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <MiniGraph
            nodes={NODES}
            edges={EDGES}
            nodeProgress={nodeProgress}
            edgeProgress={edgeProgress}
            highlightNodeIds={highlightPair ? [highlightPair.row] : []}
            width={560}
            height={440}
            offsetX={240}
            offsetY={70}
            scale={0.9}
          />
        </div>

        <div
          style={{
            flex: 1.05,
            opacity: reveal,
            transform: `translateY(${interpolate(reveal, [0, 1], [24, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              color: COLORS.muted,
              fontSize: 16,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            matrix[i][j] = 1 if edge exists
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `48px repeat(${NODE_ORDER.length}, 64px)`,
              gap: 8,
              alignItems: "center",
              justifyContent: "start",
              fontFamily: fonts.mono,
            }}
          >
            <div />
            {NODE_ORDER.map((col) => (
              <div
                key={`h-${col}`}
                style={{
                  textAlign: "center",
                  color: COLORS.muted,
                  fontSize: 18,
                }}
              >
                {col}
              </div>
            ))}
            {NODE_ORDER.map((row, ri) => {
              const rowSpring = spring({
                frame: frame - (10 + ri * 6),
                fps,
                config: { damping: 200 },
              });
              return (
                <React.Fragment key={`r-${row}`}>
                  <div
                    style={{
                      textAlign: "center",
                      color: COLORS.muted,
                      fontSize: 18,
                      opacity: rowSpring,
                    }}
                  >
                    {row}
                  </div>
                  {NODE_ORDER.map((col, ci) => {
                    const on = isConnected(row, col);
                    const cellDelay = 14 + ri * 5 + ci * 3;
                    const cellIn = spring({
                      frame: frame - cellDelay,
                      fps,
                      config: { damping: 16, stiffness: 120 },
                    });
                    const scanning = ri === scanRow && frame > 24;
                    return (
                      <div
                        key={`${row}-${col}`}
                        style={{
                          width: 64,
                          height: 54,
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: on ? COLORS.matrixOn : COLORS.matrixOff,
                          color: on ? COLORS.nodeText : COLORS.muted,
                          fontWeight: 700,
                          fontSize: 20,
                          opacity: cellIn,
                          transform: `scale(${interpolate(cellIn, [0, 1], [0.6, 1])})`,
                          boxShadow: scanning
                            ? `0 0 0 2px ${COLORS.accent}`
                            : "none",
                        }}
                      >
                        {row === col ? "0" : on ? "1" : "0"}
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 20,
              color: "rgba(232, 238, 247, 0.8)",
              fontFamily: fonts.display,
            }}
          >
            O(V²) space — fast edge queries, denser graphs
          </div>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
