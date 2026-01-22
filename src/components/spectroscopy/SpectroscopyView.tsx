import { Box } from "@mui/material";
import ProcessedSpectroscopyData from "./ProcessedSpectroscopyData";
import RawSpectroscopyData from "./RawSpectroscopyData";
import { SpectroscopyForm } from "./SpectroscopyForm";
import { useEffect, useState } from "react";
import { useScanEvents } from "../../hooks/scanEvents";
import { useSubmitWorkflow } from "../../hooks/useSubmitWorkflow";
import { useInstrumentSession } from "../../context/instrumentSession/useInstrumentSession";
import { visitTextToVisit } from "../../utils/common";
import { useWorkflowArtifacts, type WorkflowArtifact } from "../../hooks/useWorkflowArtifacts";

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
  const visit = visitTextToVisit(instrumentSession);
  const [workflowName, setWorkflowName] = useState<string>("");
  const submitWorkflow = useSubmitWorkflow("visr-reconstruction");
  const workflowArtifacts = useWorkflowArtifacts(visit, workflowName);

  useEffect(() => {
    if (!scanEvent || !instrumentSession) return;
    if (scanEvent.status == "finished") {
      if (!visit) {
        console.warn("Invalid visit; cannot submit workflow");
        return;
      }
      submitWorkflow(visit, {
        "input-file-path": scanEvent.filepath,
      });
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
      <ProcessedSpectroscopyData workflowArtifacts={workflowArtifacts} />
    </Box>
  );
}

export default SpectroscopyView;
