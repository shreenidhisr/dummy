import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background, COLORS, fonts } from "../components/Visual";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const subIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
  });
  const pulse = interpolate(Math.sin(frame / 18), [-1, 1], [0.85, 1]);

  return (
    <Background>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: `2px solid ${COLORS.node}`,
            opacity: 0.35 * pulse,
            position: "absolute",
            transform: `scale(${interpolate(titleIn, [0, 1], [0.6, 1.15])})`,
          }}
        />
        <div
          style={{
            textAlign: "center",
            transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px) scale(${interpolate(titleIn, [0, 1], [0.92, 1])})`,
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
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Graph Representation
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 26,
              color: COLORS.muted,
              opacity: subIn,
              transform: `translateY(${interpolate(subIn, [0, 1], [16, 0])}px)`,
            }}
          >
            From visual structure to adjacency list & matrix
          </div>
        </div>
      </AbsoluteFill>
    </Background>
  );
};
