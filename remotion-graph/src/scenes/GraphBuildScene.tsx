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

export const GraphBuildScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow node reveal: one every ~24 frames
  const nodeProgress = NODES.map((_, i) =>
    spring({
      frame: frame - (20 + i * 24),
      fps,
      config: { damping: 18, stiffness: 80 },
    }),
  );

  // Edges draw after nodes, one every ~28 frames, slower stroke
  const edgeProgress = EDGES.map((_, i) =>
    interpolate(frame - (160 + i * 28), [0, 26], [0, 1], {
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
          paddingBottom: 110,
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
      <NarrationBar
        cues={[
          {
            from: 0,
            text: "Start with vertices: each circle is a node (A–E).",
          },
          {
            from: 90,
            text: "Nodes are the things we connect — cities, users, pages…",
          },
          {
            from: 170,
            text: "Now draw edges: an edge means two nodes are related.",
          },
          {
            from: 260,
            text: "This graph is undirected: A–B is the same as B–A.",
          },
          {
            from: 320,
            text: "Visual form is intuitive — next we store it in memory.",
          },
        ]}
      />
    </Background>
  );
};
