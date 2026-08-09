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
import { MATRIX_TIMING } from "../data/scripts";

export const AdjacencyMatrixScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeProgress = NODES.map(() => 1);
  const edgeProgress = EDGES.map(() => 1);

  const reveal = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // cue 0 = intro, cues 1..5 = rows, last = wrap
  const rowCues = MATRIX_TIMING.cues.slice(1, 1 + NODE_ORDER.length);
  const scanStarted =
    frame >= rowCues[0].from &&
    frame < MATRIX_TIMING.cues[MATRIX_TIMING.cues.length - 1].from;

  let scanRow = 0;
  for (let i = 0; i < rowCues.length; i++) {
    if (frame >= rowCues[i].from) {
      scanRow = i;
    }
  }

  const isConnected = (a: string, b: string) =>
    a === b ? false : ADJACENCY_LIST[a].includes(b);

  const activeId = NODE_ORDER[scanRow];

  return (
    <Background>
      <SceneLabel eyebrow="Representation 2" title="Adjacency matrix" />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "100px 48px 140px",
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
            height={380}
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
            matrix[i][j]
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
                frame: frame - (20 + ri * 12),
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
                    const cellDelay = 30 + ri * 10 + ci * 6;
                    const cellIn = spring({
                      frame: frame - cellDelay,
                      fps,
                      config: { damping: 20, stiffness: 70 },
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
      <NarrationBar cues={MATRIX_TIMING.cues} />
    </Background>
  );
};
