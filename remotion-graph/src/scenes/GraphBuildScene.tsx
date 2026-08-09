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
  MiniGraph,
  SceneLabel,
} from "../components/Visual";
import { EDGES, NODES } from "../data/graph";

export const GraphBuildScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeProgress = NODES.map((_, i) =>
    spring({
      frame: frame - i * 8,
      fps,
      config: { damping: 14, stiffness: 120 },
    }),
  );

  const edgeProgress = EDGES.map((_, i) =>
    interpolate(frame - (40 + i * 7), [0, 14], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const caption = spring({
    frame: frame - 90,
    fps,
    config: { damping: 200 },
  });

  return (
    <Background>
      <SceneLabel eyebrow="Step 01" title="Build the graph" />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <MiniGraph
          nodes={NODES}
          edges={EDGES}
          nodeProgress={nodeProgress}
          edgeProgress={edgeProgress}
          width={1100}
          height={520}
          offsetX={100}
          offsetY={40}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 24,
          opacity: caption,
          transform: `translateY(${interpolate(caption, [0, 1], [20, 0])}px)`,
          color: "rgba(232, 238, 247, 0.85)",
        }}
      >
        Vertices (nodes) connected by edges — undirected, unweighted
      </div>
    </Background>
  );
};
