import type { PlansResponse } from "../utils/api";
import PlanSelector from "./PlanSelector";
import PlanParameters from "./PlanParameters";

type JsonPlanSelectorProps = {
  planResponse: PlansResponse;
};

const JsonPlanSelector = ({ planResponse }: JsonPlanSelectorProps) => (
  <PlanSelector
    plans={planResponse.plans}
    getName={plan => plan.name}
    renderPlan={plan => <PlanParameters plan={plan} />}
    title="Plans"
  />
);

export default JsonPlanSelector;
