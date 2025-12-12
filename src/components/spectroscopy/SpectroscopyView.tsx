import { Box } from "@mui/material";
import RawSpectroscopyData from "./RawSpectroscopyData";
import { SpectroscopyForm } from "./SpectroscopyForm";

export type SpectroscopyFormData = {
  total_number_of_scan_points: number;
  grid_size: number;
  grid_origin_x: number;
  grid_origin_y: number;
  exposure_time: number;
};

function SpectroscopyView() {
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
