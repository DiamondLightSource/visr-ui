import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";
import { getPlans, type PlansResponse } from "../utils/api";
import JsonPlanSelector from "../components/JsonPlanSelector";
import VisrNavbar from "../components/VisrNavbar";

function JsonFormsPlans() {
  const [planData, setPlanData] = useState<PlansResponse>({ plans: [] });

  useEffect(() => {
    (async () => {
      const results = await getPlans();
      setPlanData(results);
    })();
  }, []);

  return (
    <>
      <VisrNavbar />
      <Breadcrumbs path={window.location.pathname} linkComponent={Link} />
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3, mb: 3 }}>
        <JsonPlanSelector planResponse={planData} />
      </Box>
    </>
  );
}

export default JsonFormsPlans;
