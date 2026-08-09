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

  // cues 0..4 = nodes, 5..10 = edges, last = wrap-up
  const nodeProgress = NODES.map((_, i) => {
    const cue = BUILD_TIMING.cues[i];
    return spring({
      frame: frame - cue.from,
      fps,
      config: { damping: 18, stiffness: 70 },
    });
  });

  const edgeProgress = EDGES.map((_, i) => {
    const cue = BUILD_TIMING.cues[NODES.length + i];
    return interpolate(frame - cue.from, [0, 36], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  });

  const activeEdgeIndex =
    frame >= BUILD_TIMING.cues[NODES.length].from &&
    frame < BUILD_TIMING.cues[NODES.length + EDGES.length].from
      ? Math.min(
          EDGES.length - 1,
          Math.max(
            0,
            BUILD_TIMING.cues
              .slice(NODES.length, NODES.length + EDGES.length)
              .reduce((idx, cue, i) => (frame >= cue.from ? i : idx), 0),
          ),
        )
      : null;

  const activeNodeIds =
    frame < BUILD_TIMING.cues[NODES.length].from
      ? [
          NODES[
            Math.min(
              NODES.length - 1,
              BUILD_TIMING.cues
                .slice(0, NODES.length)
                .reduce((idx, cue, i) => (frame >= cue.from ? i : idx), 0),
            )
          ].id,
        ]
      : activeEdgeIndex !== null
        ? [EDGES[activeEdgeIndex].from, EDGES[activeEdgeIndex].to]
        : [];

  return (
    <Background>
      <SceneLabel eyebrow="Sample graph" title="Build the graph" />
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
          highlightNodeIds={activeNodeIds}
          highlightEdgeIndex={activeEdgeIndex}
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
