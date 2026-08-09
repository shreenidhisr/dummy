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
import { COMPARE_TIMING } from "../data/scripts";

const ROWS = [
  {
    aspect: "Space",
    list: "O(V + E)",
    matrix: "O(V²)",
  },
  {
    aspect: "Edge check",
    list: "O(degree)",
    matrix: "O(1)",
  },
  {
    aspect: "Best for",
    list: "Sparse graphs",
    matrix: "Dense / many queries",
  },
];

export const CompareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let activeRow = 0;
  for (let i = 0; i < COMPARE_TIMING.cues.length; i++) {
    if (frame >= COMPARE_TIMING.cues[i].from) {
      activeRow = Math.min(i, ROWS.length - 1);
    }
  }

  return (
    <Background>
      <SceneLabel eyebrow="Recap" title="List vs matrix" />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "110px 72px 140px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 980,
            background: COLORS.panel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 18,
            overflow: "hidden",
            fontFamily: fonts.display,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1.2fr 1.4fr",
              gap: 0,
              padding: "18px 28px",
              borderBottom: `1px solid ${COLORS.border}`,
              fontFamily: fonts.mono,
              fontSize: 15,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: COLORS.muted,
            }}
          >
            <div>Aspect</div>
            <div style={{ color: COLORS.node }}>Adjacency list</div>
            <div style={{ color: COLORS.accent }}>Adjacency matrix</div>
          </div>
          {ROWS.map((row, i) => {
            const enter = spring({
              frame: frame - COMPARE_TIMING.cues[i].from,
              fps,
              config: { damping: 200 },
            });
            const active = i === activeRow;
            return (
              <div
                key={row.aspect}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1.2fr 1.4fr",
                  padding: "22px 28px",
                  borderBottom:
                    i < ROWS.length - 1
                      ? `1px solid ${COLORS.border}`
                      : "none",
                  background: active
                    ? "rgba(255, 138, 61, 0.12)"
                    : "transparent",
                  opacity: enter,
                  transform: `translateY(${interpolate(enter, [0, 1], [16, 0])}px)`,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700 }}>{row.aspect}</div>
                <div style={{ fontSize: 22, color: COLORS.text }}>{row.list}</div>
                <div style={{ fontSize: 22, color: COLORS.text }}>
                  {row.matrix}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <NarrationBar cues={COMPARE_TIMING.cues} />
    </Background>
  );
};
