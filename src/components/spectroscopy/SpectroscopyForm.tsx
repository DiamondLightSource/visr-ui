import { useInstrumentSession } from "../../context/instrumentSession/useInstrumentSession";
import RunPlanButton from "../RunPlanButton";
import { useState } from "react";
import { NumberInput } from "../NumberInput";
import { Box } from "@mui/material";
import { visitToText, VisitInput } from "@diamondlightsource/sci-react-ui";
import { visitTextToVisit } from "../../utils/common";

export type SpectroscopyFormData = {
  total_number_of_scan_points: number;
  grid_size: number;
  grid_origin_x: number;
  grid_origin_y: number;
  exposure_time: number;
};

export function SpectroscopyForm() {
  const { instrumentSession, setInstrumentSession } = useInstrumentSession();
  const [formData, setFormData] = useState<SpectroscopyFormData>({
    total_number_of_scan_points: 25,
    grid_size: 5.0,
    grid_origin_x: 0.0,
    grid_origin_y: 0.0,
    exposure_time: 0.1,
  });
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
          flexGrow: 1,
        }}
      >
        <NumberInput
          label="Grid Origin x"
          numberMode="SCIENTIFIC"
          defaultValue={formData["grid_origin_x"]}
          onSubmit={parsedValue => {
            setFormData({ ...formData, ["grid_origin_x"]: parsedValue });
          }}
          submitButton={false}
        />
        <NumberInput
          label="Grid Origin y"
          numberMode="SCIENTIFIC"
          defaultValue={formData["grid_origin_y"]}
          onSubmit={parsedValue => {
            setFormData({ ...formData, ["grid_origin_y"]: parsedValue });
          }}
          submitButton={false}
        />
        <NumberInput
          label="Grid Size"
          numberMode="SCIENTIFIC"
          defaultValue={formData["grid_size"]}
          onSubmit={parsedValue => {
            setFormData({ ...formData, ["grid_size"]: parsedValue });
          }}
          submitButton={false}
        />
        <NumberInput
          label="Number of Points"
          numberMode="NATURAL"
          defaultValue={formData["total_number_of_scan_points"]}
          onSubmit={parsedValue => {
            setFormData({
              ...formData,
              ["total_number_of_scan_points"]: parsedValue,
            });
          }}
          submitButton={false}
        />
        <NumberInput
          label="Exposure Time"
          numberMode="SCIENTIFIC"
          defaultValue={formData["exposure_time"]}
          onSubmit={parsedValue => {
            setFormData({ ...formData, ["exposure_time"]: parsedValue });
          }}
          submitButton={false}
        />
        <VisitInput
          visit={
            visitTextToVisit(instrumentSession) ??
            visitTextToVisit("cm12345-1") ??
            undefined
          }
          onSubmit={visit => setInstrumentSession(visitToText(visit))}
        />
      </Box>
      <Box sx={{ mt: 4 }} display={"flex"} justifyContent={"center"}>
        <RunPlanButton
          name="demo_spectroscopy"
          params={formData}
          instrumentSession={instrumentSession}
        />
      </Box>
    </Box>
  );
}
