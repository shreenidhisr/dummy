import React from "react";
import { AbsoluteFill, Sequence, Series } from "remotion";
import { TitleScene } from "./scenes/TitleScene";
import { GraphBuildScene } from "./scenes/GraphBuildScene";
import { AdjacencyListScene } from "./scenes/AdjacencyListScene";
import { AdjacencyMatrixScene } from "./scenes/AdjacencyMatrixScene";
import { SummaryScene } from "./scenes/SummaryScene";

export const FPS = 30;
export const WIDTH = 1280;
export const HEIGHT = 720;

export const SCENE_FRAMES = {
  title: 75,
  build: 120,
  list: 140,
  matrix: 150,
  summary: 90,
} as const;

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
