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
  fonts,
} from "../components/Visual";

const CARDS = [
  {
    title: "Visual graph",
    body: "Nodes + edges for intuition",
  },
  {
    title: "Adjacency list",
    body: "Compact for sparse graphs",
  },
  {
    title: "Adjacency matrix",
    body: "Constant-time edge checks",
  },
];

export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    frame: frame - 8,
    fps,
    config: { damping: 200 },
  });

  return (
    <Background>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "64px 64px 140px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            opacity: titleIn,
            transform: `translateY(${interpolate(titleIn, [0, 1], [20, 0])}px)`,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: COLORS.accent,
              fontSize: 17,
              marginBottom: 12,
            }}
          >
            Recap
          </div>
          <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: -1 }}>
            Same graph, three views
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 22,
            width: "100%",
            maxWidth: 1100,
            justifyContent: "center",
          }}
        >
          {CARDS.map((card, i) => {
            const enter = spring({
              frame: frame - (30 + i * 22),
              fps,
              config: { damping: 18, stiffness: 90 },
            });
            return (
              <div
                key={card.title}
                style={{
                  flex: 1,
                  background: COLORS.panel,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: "26px 22px",
                  opacity: enter,
                  transform: `translateY(${interpolate(enter, [0, 1], [28, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: i === 2 ? COLORS.accent : COLORS.node,
                    color: COLORS.nodeText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    marginBottom: 16,
                    fontFamily: fonts.display,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </div>
                <div style={{ fontSize: 17, color: COLORS.muted }}>
                  {card.body}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <NarrationBar
        cues={[
          {
            from: 0,
            text: "Remember: one graph, three ways to show the same edges.",
          },
          {
            from: 55,
            text: "Picture for intuition · list for sparse data · matrix for fast checks.",
          },
          {
            from: 130,
            text: "Choose the representation that matches your graph and operations.",
          },
        ]}
      />
    </Background>
  );
};
