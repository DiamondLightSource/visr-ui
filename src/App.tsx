import { useEffect, useState } from "react";
import "./App.css";
import PlanSelector from "./components/PlanSelector";
import { getPlans, type PlansResponse } from "./utils/api";

function App() {
  const [planData, setPlanData] = useState<PlansResponse>({ plans: [] });

  useEffect(() => {
    (async () => {
      const results = await getPlans();
      setPlanData(results);
    })();
  }, []);

  return (
    <>
      <PlanSelector planResponse={planData} />
    </>
  );
}

export default App;
