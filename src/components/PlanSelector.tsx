import type React from "react";
import type { Plan, PlansResponse } from "../utils/api";
import PlanParameters from "./PlanParameters";
import Select from "@mui/material/Select";
import { useState } from "react";
import { MenuItem } from "@mui/material";

type PlanSelectorProps = {
  planResponse: PlansResponse;
};

const PlanSelector: React.FC<PlanSelectorProps> = (
  props: PlanSelectorProps,
) => {
  const [currentPlan, setCurrentPlan] = useState<Plan | undefined>(undefined);

  return (
    <div>
      <h3>Available Plans</h3>
      <Select
        defaultValue={""}
        onChange={event => {
          const i = parseInt(event.target.value);
          setCurrentPlan(props.planResponse.plans[i]);
        }}
      >
        {props.planResponse.plans.map((plan, i) => (
          <MenuItem value={i}>{plan.name}</MenuItem>
        ))}
      </Select>

      {currentPlan !== undefined && (
        <PlanParameters plan={currentPlan}></PlanParameters>
      )}
    </div>
  );
};

export default PlanSelector;
