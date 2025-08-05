import { Box } from "@mui/material";
import VisrNavbar from "../components/VisrNavbar";
import CustomPlanSelector, {
  type PlanComponent,
} from "../components/CustomPlanSelector";
import SpectroscopyForm from "../components/SpectroscopyForm";

function Plans() {
  const plans: PlanComponent[] = [
    { name: "spectroscopy_scan", FormComponent: SpectroscopyForm },
  ];

  return (
    <>
      <VisrNavbar />
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3 }}>
        <CustomPlanSelector plans={plans} />
      </Box>
    </>
  );
}

export default Plans;
