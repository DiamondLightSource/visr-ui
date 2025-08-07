import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import sanitizeSchema from "../utils/schema";
import type { Plan } from "../utils/api";
import RunPlanButton from "./RunPlanButton";

type PlanParametersProps = {
  plan: Plan;
};

const PlanParameters: React.FC<PlanParametersProps> = (
  props: PlanParametersProps,
) => {
  const schema = sanitizeSchema(props.plan.schema);

  // const renderers = materialRenderers;
  const [planParameters, setPlanParameters] = useState({});
  const [instrumentSession, setInstrumentSession] = useState("");

  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        {props.plan.name}
      </Typography>
      <JsonForms
        schema={schema}
        data={planParameters}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setPlanParameters(data)}
      />
      <TextField
        id="instrumentSession"
        label="Instrument Session"
        onChange={e => setInstrumentSession(e.target.value)}
      ></TextField>
      <Box sx={{ mt: 2 }}>
        <RunPlanButton
          name={props.plan.name}
          params={planParameters}
          instrumentSession={instrumentSession}
        />
      </Box>
    </Box>
  );
};

export default PlanParameters;
