import type { ComponentType } from "react";
import PlanSelector from "./PlanSelector";

export type PlanComponent = {
  name: string;
  FormComponent: ComponentType;
};

export type CustomPlanSelectorProps = {
  plans: PlanComponent[];
};

const CustomPlanSelector = ({ plans }: CustomPlanSelectorProps) => (
  <PlanSelector
    plans={plans}
    getName={plan => plan.name}
    renderPlan={plan => <plan.FormComponent />}
    title="Plans"
  />
);

export default CustomPlanSelector;
