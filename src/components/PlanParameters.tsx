import { JsonForms } from "@jsonforms/react";
import Button from "@mui/material/Button";
import type React from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useState } from "react";
import count_response from "../count-plan.json";
import sanitizeSchema from "../schema";

const PlanParameters: React.FC = () => {
  const schema = sanitizeSchema(count_response.parameter_schema);

  const [data, setData] = useState({});

  return (
    <div>
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
