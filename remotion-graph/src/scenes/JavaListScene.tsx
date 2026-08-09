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
import { JAVA_LIST_TIMING } from "../data/scripts";

const CODE_LINES = [
  { text: "Map<Character, List<Character>> adj = new HashMap<>();", tone: "plain" },
  { text: "", tone: "blank" },
  { text: "adj.put('A', Arrays.asList('B', 'D'));", tone: "a" },
  { text: "adj.put('B', Arrays.asList('A', 'C', 'E'));", tone: "b" },
  { text: "adj.put('C', Arrays.asList('B', 'E'));", tone: "c" },
  { text: "adj.put('D', Arrays.asList('A', 'E'));", tone: "d" },
  { text: "adj.put('E', Arrays.asList('B', 'C', 'D'));", tone: "e" },
  { text: "", tone: "blank" },
  { text: "// undirected edge u–v", tone: "comment" },
  { text: "adj.get(u).add(v);", tone: "edge" },
  { text: "adj.get(v).add(u);", tone: "edge" },
] as const;

export const JavaListScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cueIndex = JAVA_LIST_TIMING.cues.reduce(
    (idx, cue, i) => (frame >= cue.from ? i : idx),
    0,
  );

  const lineVisible = (tone: string) => {
    if (cueIndex === 0) {
      return tone === "plain" || tone === "blank" || tone === "comment";
    }
    if (cueIndex === 1) {
      return tone !== "edge";
    }
    return true;
  };

  const highlightTone =
    cueIndex === 1
      ? ["a", "b", "c", "d", "e"]
      : cueIndex >= 2
        ? ["edge", "comment"]
        : ["plain"];

  return (
    <Background>
      <SceneLabel eyebrow="Java code" title="Adjacency list" />
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
            fontSize: 22,
            lineHeight: 1.55,
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
            GraphList.java
          </div>
          {CODE_LINES.map((line, i) => {
            const show = lineVisible(line.tone);
            const enter = spring({
              frame: frame - (10 + i * 6),
              fps,
              config: { damping: 200 },
            });
            const hot = highlightTone.includes(line.tone);
            if (line.tone === "blank") {
              return <div key={`b-${i}`} style={{ height: 14 }} />;
            }
            return (
              <div
                key={`${line.text}-${i}`}
                style={{
                  opacity: show ? enter : 0.15,
                  transform: `translateX(${interpolate(enter, [0, 1], [12, 0])}px)`,
                  color:
                    line.tone === "comment"
                      ? COLORS.muted
                      : hot
                        ? COLORS.node
                        : COLORS.text,
                  background: hot
                    ? "rgba(30, 227, 161, 0.08)"
                    : "transparent",
                  borderRadius: 6,
                  padding: "2px 8px",
                  marginLeft: -8,
                  marginRight: -8,
                }}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <NarrationBar cues={JAVA_LIST_TIMING.cues} />
    </Background>
  );
};
