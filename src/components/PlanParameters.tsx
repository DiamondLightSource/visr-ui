import { JsonForms } from "@jsonforms/react";
import Button from "@mui/material/Button";
import type React from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useState } from "react";
import sanitizeSchema from "../utils/schema";
import { createAndStartTask, type Plan, type TaskRequest } from "../utils/api";
import { TextField } from "@mui/material";

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
    <div>
      <h2>{props.plan.name}</h2>
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
      <Button
        onClick={async () => {
          const taskRequest: TaskRequest = {
            name: props.plan.name,
            params: planParameters,
            instrument_session: instrumentSession,
          };
          await createAndStartTask(taskRequest);
        }}
      >
        Run Plan
      </Button>
    </div>
  );
};

export default PlanParameters;
