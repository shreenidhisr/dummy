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
import { ADJACENCY_LIST, EDGES, NODE_ORDER, NODES } from "../data/graph";

const FRAMES_PER_ROW = 64;

export const AdjacencyMatrixScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeProgress = NODES.map(() => 1);
  const edgeProgress = EDGES.map(() => 1);

  const reveal = interpolate(frame, [0, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scanStarted = frame >= 70;
  const scanRow = Math.min(
    NODE_ORDER.length - 1,
    Math.max(0, Math.floor((frame - 70) / FRAMES_PER_ROW)),
  );

  const isConnected = (a: string, b: string) =>
    a === b ? false : ADJACENCY_LIST[a].includes(b);

  const activeId = NODE_ORDER[scanRow];

  return (
    <Background>
      <SceneLabel eyebrow="Step 03" title="Adjacency matrix" />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "100px 48px 130px",
          gap: 20,
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <MiniGraph
            nodes={NODES}
            edges={EDGES}
            nodeProgress={nodeProgress}
            edgeProgress={edgeProgress}
            highlightNodeIds={scanStarted ? [activeId] : []}
            mutedEdgePredicate={
              scanStarted
                ? (edge) => edge.from !== activeId && edge.to !== activeId
                : undefined
            }
            width={520}
            height={400}
            offsetX={250}
            offsetY={80}
            scale={0.88}
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
              fontSize: 15,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            matrix[i][j] = 1 if edge exists
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `44px repeat(${NODE_ORDER.length}, 58px)`,
              gap: 7,
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
                  fontSize: 17,
                }}
              >
                {col}
              </div>
            ))}
            {NODE_ORDER.map((row, ri) => {
              const rowSpring = spring({
                frame: frame - (18 + ri * 10),
                fps,
                config: { damping: 200 },
              });
              return (
                <React.Fragment key={`r-${row}`}>
                  <div
                    style={{
                      textAlign: "center",
                      color: COLORS.muted,
                      fontSize: 17,
                      opacity: rowSpring,
                    }}
                  >
                    {row}
                  </div>
                  {NODE_ORDER.map((col, ci) => {
                    const on = isConnected(row, col);
                    const cellDelay = 24 + ri * 8 + ci * 5;
                    const cellIn = spring({
                      frame: frame - cellDelay,
                      fps,
                      config: { damping: 18, stiffness: 90 },
                    });
                    const scanning = scanStarted && ri === scanRow;
                    return (
                      <div
                        key={`${row}-${col}`}
                        style={{
                          width: 58,
                          height: 48,
                          borderRadius: 9,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: on ? COLORS.matrixOn : COLORS.matrixOff,
                          color: on ? COLORS.nodeText : COLORS.muted,
                          fontWeight: 700,
                          fontSize: 18,
                          opacity: cellIn,
                          transform: `scale(${interpolate(cellIn, [0, 1], [0.65, 1])})`,
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
        </div>
      </AbsoluteFill>
      <NarrationBar
        cues={[
          {
            from: 0,
            text: "Adjacency matrix: a V×V grid. Cell (i, j) is 1 if an edge exists.",
          },
          {
            from: 70,
            text: `Row A: 1s mark neighbors [${ADJACENCY_LIST.A.join(", ")}]. Diagonal stays 0 (no self-loops).`,
          },
          {
            from: 70 + FRAMES_PER_ROW,
            text: `Row B: edges to [${ADJACENCY_LIST.B.join(", ")}]. Read one cell to test an edge in O(1).`,
          },
          {
            from: 70 + FRAMES_PER_ROW * 2,
            text: `Row C: [${ADJACENCY_LIST.C.join(", ")}]. Fast queries, but we store every pair.`,
          },
          {
            from: 70 + FRAMES_PER_ROW * 3,
            text: "Cost: O(V²) space — many zeros when the graph is sparse.",
          },
          {
            from: 70 + FRAMES_PER_ROW * 4,
            text: "Prefer a matrix for dense graphs or frequent “is there an edge?” checks.",
          },
        ]}
      />
    </Background>
  );
};
