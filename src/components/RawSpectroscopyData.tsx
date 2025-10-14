import { ImagePlot, type NDT } from "@diamondlightsource/davidia";
import Box from "@mui/material/Box";
import ndarray from "ndarray";
import { useEffect, useRef, useState } from "react";

type RGBColor = "red" | "green" | "blue" | "gray";

function toNDT(matrix: number[][], colour: RGBColor): NDT {
  const height = matrix.length;
  const width = matrix[0].length;

  // Flatten grayscale matrix to 1D
  const flat = matrix.flat();

  // Normalisation
  const min = Math.min(...flat);
  const max = Math.max(...flat);
  const scale = max > min ? 255 / (max - min) : 1;

  // Expand to RGB triplets
  const rgb = new Uint8Array(width * height * 3);

  for (let i = 0; i < flat.length; i++) {
    const v = Math.round((flat[i] - min) * scale); // scale to [0,255]
    switch (colour) {
      case "red":
        rgb[i * 3] = v;
        break;
      case "green":
        rgb[i * 3 + 1] = v;
        break;
      case "blue":
        rgb[i * 3 + 2] = v;
        break;
      case "gray":
        rgb[i * 3] = v;
        rgb[i * 3 + 1] = v;
        rgb[i * 3 + 2] = v;
        break;
    }
  }

  return ndarray(rgb, [height, width, 3]) as NDT;
}
/** Placeholder empty gray dataset */
const EMPTY_NDT = toNDT([[0]], "gray");

/** Return type of `/api/data/map` */
interface MapResponse {
  values: number[][];
}

function RawSpectroscopyData() {
  const [redChannel, setRedChannel] = useState<NDT | null>(null);
  const [greenChannel, setGreenChannel] = useState<NDT | null>(null);
  const [blueChannel, setBlueChannel] = useState<NDT | null>(null);
  const [running, setRunning] = useState(false);
  const [currentScan, setCurrentScan] = useState<string | null>(null);
  const pollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Subscribe to /api/data/events (SSE)
  useEffect(() => {
    const evtSource = new EventSource("/api/data/events");

    evtSource.onmessage = event => {
      try {
        const msg = JSON.parse(event.data);
        console.log("SSE message:", msg);

        if (msg.status === "running") {
          setRunning(true);
          setCurrentScan(msg.filepath);
        } else if (msg.status === "finished" || msg.status === "failed") {
          setRunning(false);
          setCurrentScan(null);
        }
      } catch (err) {
        console.error("Error parsing SSE:", err);
      }
    };

    evtSource.onerror = err => {
      console.error("SSE connection error:", err);
      evtSource.close();
    };

    return () => evtSource.close();
  }, []);

  useEffect(() => {
    async function fetchMap(
      filepath: string,
      datapath: string,
      colour: RGBColor = "gray",
    ) {
      const url = `/api/data/map?filepath=${encodeURIComponent(filepath)}&datapath=${encodeURIComponent(datapath)}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(resp.statusText);
      const json: MapResponse = await resp.json();
      return toNDT(json.values, colour);
    }

    async function pollMaps(filepath: string) {
      try {
        const detectorPath = "/entry/instrument/spectroscopy_detector/";
        const [r, g, b] = await Promise.all([
          fetchMap(filepath, detectorPath + "RedTotal", "red"),
          fetchMap(filepath, detectorPath + "GreenTotal", "green"),
          fetchMap(filepath, detectorPath + "BlueTotal", "blue"),
        ]);
        setRedChannel(r);
        setGreenChannel(g);
        setBlueChannel(b);
      } catch (err) {
        console.error("Polling error:", err);
      }
    }

    if (running && currentScan) {
      pollInterval.current = setInterval(() => {
        pollMaps(currentScan);
      }, 200); // ms: poll at 5 Hz
    } else if (pollInterval.current) {
      clearInterval(pollInterval.current);
      pollInterval.current = null;
    }

    return () => {
      if (pollInterval.current) {
        clearInterval(pollInterval.current);
        pollInterval.current = null;
      }
    };
  }, [running, currentScan]);

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
          title: "Red channel",
        }}
        customToolbarChildren={null}
        values={redChannel || EMPTY_NDT}
      />

      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Green channel",
        }}
        customToolbarChildren={null}
        values={greenChannel || EMPTY_NDT}
      />

      <ImagePlot
        aspect="auto"
        plotConfig={{
          title: "Blue channel",
        }}
        customToolbarChildren={null}
        values={blueChannel || EMPTY_NDT}
      />
    </Box>
  );
}

export default RawSpectroscopyData;
