import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background, COLORS, NarrationBar, fonts } from "../components/Visual";
import { TITLE_TIMING } from "../data/scripts";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const subIn = spring({
    frame: frame - 24,
    fps,
    config: { damping: 200 },
  });
  const cardsIn = spring({
    frame: frame - TITLE_TIMING.cues[1].from,
    fps,
    config: { damping: 200 },
  });

  return (
    <Background>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 120,
        }}
      >
        <div
          style={{
            textAlign: "center",
            transform: `translateY(${interpolate(titleIn, [0, 1], [28, 0])}px)`,
            opacity: titleIn,
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: COLORS.accent,
              fontSize: 20,
              marginBottom: 18,
            }}
          >
            Data Structures
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Graph Representation
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 24,
              color: COLORS.muted,
              opacity: subIn,
            }}
          >
            Two ways to store the same graph
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 48,
            opacity: cardsIn,
            transform: `translateY(${interpolate(cardsIn, [0, 1], [20, 0])}px)`,
          }}
        >
          {["Adjacency List", "Adjacency Matrix"].map((label, i) => (
            <div
              key={label}
              style={{
                minWidth: 260,
                padding: "22px 28px",
                borderRadius: 14,
                background: COLORS.panel,
                border: `1px solid ${COLORS.border}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  margin: "0 auto 12px",
                  background: i === 0 ? COLORS.node : COLORS.accent,
                  color: COLORS.nodeText,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{label}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
      <NarrationBar cues={TITLE_TIMING.cues} />
    </Background>
  );
};
