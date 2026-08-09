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
  const pulse = interpolate(Math.sin(frame / 36), [-1, 1], [0.88, 1]);

  return (
    <Background>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 110,
        }}
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: `2px solid ${COLORS.node}`,
            opacity: 0.3 * pulse,
            position: "absolute",
            transform: `scale(${interpolate(titleIn, [0, 1], [0.7, 1.12])})`,
          }}
        />
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
              fontSize: 78,
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
              fontSize: 24,
              color: COLORS.muted,
              opacity: subIn,
              transform: `translateY(${interpolate(subIn, [0, 1], [14, 0])}px)`,
            }}
          >
            From visual structure to adjacency list & matrix
          </div>
        </div>
      </AbsoluteFill>
      <NarrationBar cues={TITLE_TIMING.cues} />
    </Background>
  );
};
