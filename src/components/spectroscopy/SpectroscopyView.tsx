import { Box } from "@mui/material";
import RawSpectroscopyData from "./RawSpectroscopyData";
import { SpectroscopyForm } from "./SpectroscopyForm";
import { useEffect } from "react";
import { useScanEvents } from "../../hooks/scanEvents";
import { useSubmitWorkflow } from "../../hooks/useSubmitWorkflow";
import { useInstrumentSession } from "../../context/instrumentSession/useInstrumentSession";
import { visitTextToVisit } from "../../utils/common";

export type SpectroscopyFormData = {
  total_number_of_scan_points: number;
  grid_size: number;
  grid_origin_x: number;
  grid_origin_y: number;
  exposure_time: number;
};

function SpectroscopyView() {
  // set off workflow when scan ends
  const scanEvent = useScanEvents();
  const { instrumentSession } = useInstrumentSession();
  useEffect(() => {
    async function submitWorkflow() {
      const submit = useSubmitWorkflow("visr-reconstruction");
      await submit(visitTextToVisit(instrumentSession)!, {
        inpath: scanEvent?.filepath,
      });
    }
    if (!scanEvent || !instrumentSession) return;
    if (scanEvent.status == "finished") {
      try {
        submitWorkflow();
      } catch (err) {
        console.error("Error triggering workflow", err);
      }
    }
  });

  return (
    <Box
      sx={{
        margin: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <RawSpectroscopyData />
      <SpectroscopyForm />
    </Box>
  );
}

export default SpectroscopyView;
