import React from "react";
import { AbsoluteFill, Sequence, Series } from "remotion";
import { FPS, HEIGHT, WIDTH } from "./constants";
import { SCENE_FRAMES } from "./data/scripts";
import { TitleScene } from "./scenes/TitleScene";
import { GraphBuildScene } from "./scenes/GraphBuildScene";
import { AdjacencyListScene } from "./scenes/AdjacencyListScene";
import { AdjacencyMatrixScene } from "./scenes/AdjacencyMatrixScene";
import { SummaryScene } from "./scenes/SummaryScene";

export { FPS, HEIGHT, WIDTH };

export { SCENE_FRAMES };

export const TOTAL_FRAMES =
  SCENE_FRAMES.title +
  SCENE_FRAMES.build +
  SCENE_FRAMES.list +
  SCENE_FRAMES.matrix +
  SCENE_FRAMES.summary;

export const GraphRepresentation: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B1220" }}>
      <Series>
        <Series.Sequence durationInFrames={SCENE_FRAMES.title}>
          <TitleScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.build}>
          <GraphBuildScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.list}>
          <AdjacencyListScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.matrix}>
          <AdjacencyMatrixScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.summary}>
          <SummaryScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

/** Optional still for poster / thumbnail export */
export const GraphStill: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={1}>
        <GraphBuildScene />
      </Sequence>
    </AbsoluteFill>
  );
};
