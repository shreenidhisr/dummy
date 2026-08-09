import "./index.css";
import { Composition } from "remotion";
import {
  FPS,
  GraphRepresentation,
  HEIGHT,
  TOTAL_FRAMES,
  WIDTH,
} from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GraphRepresentation"
        component={GraphRepresentation}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
