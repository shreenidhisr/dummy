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
  NarrationBar,
  SceneLabel,
} from "../components/Visual";
import { EDGES, NODES } from "../data/graph";
import { BUILD_TIMING } from "../data/scripts";

export const GraphBuildScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cue 0–1 talk about nodes; cue 2+ talk about edges
  const nodeCue = BUILD_TIMING.cues[0];
  const edgeCue = BUILD_TIMING.cues[2];

  const nodeStart = nodeCue.from + 30;
  const nodeGap = Math.floor(nodeCue.durationInFrames / NODES.length);

  const nodeProgress = NODES.map((_, i) =>
    spring({
      frame: frame - (nodeStart + i * nodeGap),
      fps,
      config: { damping: 20, stiffness: 60 },
    }),
  );

  const edgeStart = edgeCue.from + 20;
  const edgeGap = Math.floor(
    (BUILD_TIMING.cues[2].durationInFrames +
      BUILD_TIMING.cues[3].durationInFrames) /
      EDGES.length,
  );

  const edgeProgress = EDGES.map((_, i) =>
    interpolate(frame - (edgeStart + i * edgeGap), [0, 40], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <Background>
      <SceneLabel eyebrow="Step 01" title="Build the graph" />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 120,
        }}
      >
        <MiniGraph
          nodes={NODES}
          edges={EDGES}
          nodeProgress={nodeProgress}
          edgeProgress={edgeProgress}
          width={1100}
          height={480}
          offsetX={100}
          offsetY={40}
        />
      </AbsoluteFill>
      <NarrationBar cues={BUILD_TIMING.cues} />
    </Background>
  );
};
