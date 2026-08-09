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
  NarrationBar,
  SceneLabel,
  fonts,
} from "../components/Visual";
import { JAVA_MATRIX_TIMING } from "../data/scripts";

const CODE_LINES = [
  { text: "int V = 5; // A B C D E", tone: "plain" },
  { text: "int[][] matrix = new int[V][V]; // all 0", tone: "plain" },
  { text: "", tone: "blank" },
  { text: "void addEdge(int u, int v) {", tone: "edge" },
  { text: "    matrix[u][v] = 1;", tone: "edge" },
  { text: "    matrix[v][u] = 1; // undirected", tone: "edge" },
  { text: "}", tone: "edge" },
  { text: "", tone: "blank" },
  { text: "addEdge(0, 1); // A–B", tone: "calls" },
  { text: "addEdge(0, 3); // A–D", tone: "calls" },
  { text: "addEdge(1, 2); // B–C", tone: "calls" },
  { text: "addEdge(1, 4); // B–E", tone: "calls" },
  { text: "addEdge(2, 4); // C–E", tone: "calls" },
  { text: "addEdge(3, 4); // D–E", tone: "calls" },
  { text: "", tone: "blank" },
  { text: "boolean linked = matrix[u][v] == 1;", tone: "query" },
] as const;

export const JavaMatrixScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cueIndex = JAVA_MATRIX_TIMING.cues.reduce(
    (idx, cue, i) => (frame >= cue.from ? i : idx),
    0,
  );

  const lineVisible = (tone: string) => {
    if (cueIndex === 0) {
      return tone === "plain" || tone === "blank";
    }
    if (cueIndex === 1) {
      return tone !== "query";
    }
    return true;
  };

  const highlightTone =
    cueIndex === 0
      ? ["plain"]
      : cueIndex === 1
        ? ["edge", "calls"]
        : ["query"];

  return (
    <Background>
      <SceneLabel eyebrow="Java code" title="Adjacency matrix" />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "100px 64px 140px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            background: "#0A101B",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: "28px 32px",
            fontFamily: fonts.mono,
            fontSize: 21,
            lineHeight: 1.5,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              color: COLORS.muted,
              fontSize: 14,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            GraphMatrix.java
          </div>
          {CODE_LINES.map((line, i) => {
            const show = lineVisible(line.tone);
            const enter = spring({
              frame: frame - (8 + i * 5),
              fps,
              config: { damping: 200 },
            });
            const hot = highlightTone.includes(line.tone);
            if (line.tone === "blank") {
              return <div key={`b-${i}`} style={{ height: 12 }} />;
            }
            return (
              <div
                key={`${line.text}-${i}`}
                style={{
                  opacity: show ? enter : 0.15,
                  transform: `translateX(${interpolate(enter, [0, 1], [12, 0])}px)`,
                  color: hot ? COLORS.accent : COLORS.text,
                  background: hot
                    ? "rgba(255, 138, 61, 0.1)"
                    : "transparent",
                  borderRadius: 6,
                  padding: "1px 8px",
                  marginLeft: -8,
                  marginRight: -8,
                  whiteSpace: "pre",
                }}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <NarrationBar cues={JAVA_MATRIX_TIMING.cues} />
    </Background>
  );
};
