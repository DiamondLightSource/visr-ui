import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";
import { getPlans, type PlansResponse } from "../utils/api";
import VisrNavbar from "../components/VisrNavbar";
import PlanBrowser from "../components/PlanBrowser/PlanBrowser";
import PlanParameters from "../components/PlanBrowser/PlanParameters";

function JsonFormsPlans() {
  const [planData, setPlanData] = useState<PlansResponse>({ plans: [] });

  useEffect(() => {
    async function fetchPlans() {
      const results = await getPlans();
      setPlanData(results);
    }

    fetchPlans();
  }, []);

  return (
    <>
      <VisrNavbar />
      <Breadcrumbs path={window.location.pathname} linkComponent={Link} />
      <main>
        <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3, mb: 3 }}>
          <PlanBrowser
            plans={planData.plans}
            renderPlan={plan => <PlanParameters plan={plan} />}
          />
        </Box>
      </main>
    </>
  );
}

export default JsonFormsPlans;
