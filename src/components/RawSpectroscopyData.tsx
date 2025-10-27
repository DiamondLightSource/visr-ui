import { ImagePlot, type NDT } from "@diamondlightsource/davidia";
import Box from "@mui/material/Box";
import ndarray from "ndarray";
import { useEffect, useRef, useState } from "react";

type RGBColor = "red" | "green" | "blue" | "gray";

function toNDT(matrix: (number | null)[][], colour: RGBColor): NDT {
  if (!matrix?.length || !matrix[0]?.length) {
    return EMPTY_NDT; // skip invalid input
  }
  const height = matrix.length;
  const width = matrix[0].length;

  // Flatten and filter out nulls for normalisation
  const flat = matrix.flat();
  const valid = flat.filter((v): v is number => v !== null && !isNaN(v));

  // Avoid crashes when no valid values
  const min = valid.length ? Math.min(...valid) : 0;
  const max = valid.length ? Math.max(...valid) : 1;
  const scale = max > min ? 255 / (max - min) : 1;

  const rgb = new Uint8Array(width * height * 3);

  for (let i = 0; i < flat.length; i++) {
    const v = flat[i];
    let scaled = 0;
    if (v !== null && !isNaN(v)) {
      scaled = Math.round((v - min) * scale);
    } // else stays 0 (black)

    switch (colour) {
      case "red":
        rgb[i * 3] = scaled;
        break;
      case "green":
        rgb[i * 3 + 1] = scaled;
        break;
      case "blue":
        rgb[i * 3 + 2] = scaled;
        break;
      case "gray":
        rgb[i * 3] = scaled;
        rgb[i * 3 + 1] = scaled;
        rgb[i * 3 + 2] = scaled;
        break;
    }
  }

  return ndarray(rgb, [height, width, 3]) as NDT;
}
/** Placeholder empty gray dataset */
const EMPTY_NDT = toNDT([[0]], "gray");

/** Return type of `/api/data/map` */
interface MapResponse {
  values: (number | null)[][];
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
      console.warn("Temporary SSE connection error:", err);
    };

    evtSource.onopen = () => {
      console.log("SSE connection opened or re-established");
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
        pollMaps(currentScan).catch(err =>
          console.warn("pollMaps error:", err),
        );
      }, 500); // ms: poll at 2 Hz
    } else if (pollInterval.current) {
      // Stop the interval first to avoid overlaps
      clearInterval(pollInterval.current);
      pollInterval.current = null;

      // One final poll to catch the last completed data
      if (currentScan) {
        pollMaps(currentScan).catch(err =>
          console.warn("final pollMaps error:", err),
        );
      }
    }

    return () => {
      // clean up on rerender and unmount
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
