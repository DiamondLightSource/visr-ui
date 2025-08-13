import { ImagePlot, type NDT } from "@diamondlightsource/davidia";
import Box from "@mui/material/Box";
import ndarray from "ndarray";

function fakeImage(width: number, height: number): NDT {
  const rgb = new Uint8Array(
    Array.from({ length: width * height }, (_, i) => [
      (i % 4) * 255,
      (i % 3) * 255,
      (i % 2) * 255,
    ]).flat(),
  );
  return ndarray(rgb, [width, height, 3]) as NDT;
}

function RawSpectroscopyData() {
  const image = fakeImage(40, 25);
  return (
    <Box>
      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Detector Data View",
          xLabel: "x",
          yLabel: "y",
        }}
        values={image}
      />
    </Box>
  );
}

export default RawSpectroscopyData;
