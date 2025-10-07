import { ImagePlot, type NDT } from "@diamondlightsource/davidia";
import Box from "@mui/material/Box";
import ndarray from "ndarray";

function fakeImages(width: number, height: number): [NDT, NDT, NDT] {
  const r = new Uint8Array(
    Array.from({ length: width * height }, (_, i) => [
      (i % 4) * 255,
      0,
      0,
    ]).flat(),
  );
  const g = new Uint8Array(
    Array.from({ length: width * height }, (_, i) => [
      0,
      (i % 3) * 255,
      0,
    ]).flat(),
  );
  const b = new Uint8Array(
    Array.from({ length: width * height }, (_, i) => [
      0,
      0,
      (i % 2) * 255,
    ]).flat(),
  );
  return [
    ndarray(r, [width, height, 3]) as NDT,
    ndarray(g, [width, height, 3]) as NDT,
    ndarray(b, [width, height, 3]) as NDT,
  ];
}

function RawSpectroscopyData() {
  const [image_r, image_g, image_b] = fakeImages(40, 25);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          sm: "1fr",
          md: "1fr 1fr 1fr",
        },
        gap: 3,
        flexGrow: 1,
      }}
    >
      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Detector Data View - R",
          xLabel: "x",
          yLabel: "y",
        }}
        values={image_r}
      />
      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Detector Data View - G",
          xLabel: "x",
          yLabel: "y",
        }}
        values={image_g}
      />
      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Detector Data View - B",
          xLabel: "x",
          yLabel: "y",
        }}
        values={image_b}
      />
    </Box>
  );
}

export default RawSpectroscopyData;
