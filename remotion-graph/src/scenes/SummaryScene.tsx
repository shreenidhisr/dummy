import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background, COLORS, fonts } from "../components/Visual";

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

  const titleIn = spring({ frame, fps, config: { damping: 200 } });

  return (
    <Background>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
        }}
      >
        <div
          style={{
            textAlign: "center",
            opacity: titleIn,
            transform: `translateY(${interpolate(titleIn, [0, 1], [20, 0])}px)`,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: COLORS.accent,
              fontSize: 18,
              marginBottom: 12,
            }}
          >
            Recap
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>
            Same graph, three views
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            width: "100%",
            maxWidth: 1100,
            justifyContent: "center",
          }}
        >
          {CARDS.map((card, i) => {
            const enter = spring({
              frame: frame - (12 + i * 8),
              fps,
              config: { damping: 16, stiffness: 110 },
            });
            return (
              <div
                key={card.title}
                style={{
                  flex: 1,
                  background: COLORS.panel,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: "28px 24px",
                  opacity: enter,
                  transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: i === 2 ? COLORS.accent : COLORS.node,
                    color: COLORS.nodeText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    marginBottom: 18,
                    fontFamily: fonts.display,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </div>
                <div style={{ fontSize: 18, color: COLORS.muted }}>
                  {card.body}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Background>
  );
};
