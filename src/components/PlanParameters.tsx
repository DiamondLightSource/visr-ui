import { JsonForms } from "@jsonforms/react";
import Button from "@mui/material/Button";
import type React from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useState } from "react";
import sanitizeSchema from "../utils/schema";
import type { Plan } from "../utils/api";

type PlanParametersProps = {
  plan: Plan;
};

const PlanParameters: React.FC<PlanParametersProps> = (
  props: PlanParametersProps,
) => {
  const schema = sanitizeSchema(props.plan.schema);

  const [data, setData] = useState({});

  return (
    <div>
      <h2>{props.plan.name}</h2>
      <JsonForms
        schema={schema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <Button>Run Plan</Button>
    </div>
  );
};

export default PlanParameters;
