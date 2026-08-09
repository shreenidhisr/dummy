import { FPS } from "../constants";

/**
 * On-screen caption pacing for teaching:
 * ~1.8 words/sec reading + 2.2s digest, never under 5.5s.
 */
export const readingFrames = (text: string, fps: number = FPS): number => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const seconds = Math.max(5.5, words / 1.8 + 2.2);
  return Math.ceil(seconds * fps);
};

export type CueScript = {
  text: string;
  /** Optional extra hold after the computed reading time */
  extraFrames?: number;
};

export type TimedCue = {
  from: number;
  text: string;
  durationInFrames: number;
};

export const buildTimedCues = (
  scripts: CueScript[],
  startFrame = 0,
): { cues: TimedCue[]; totalFrames: number } => {
  let cursor = startFrame;
  const cues: TimedCue[] = scripts.map((script) => {
    const durationInFrames =
      readingFrames(script.text) + (script.extraFrames ?? 0);
    const cue = { from: cursor, text: script.text, durationInFrames };
    cursor += durationInFrames;
    return cue;
  });

  return { cues, totalFrames: cursor };
};

/** Shared end padding so the last line is not cut mid-digest */
export const SCENE_TAIL_FRAMES = Math.round(FPS * 1.5);
