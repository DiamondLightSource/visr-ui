import { Box } from "@mui/material";
import VisrNavbar from "../components/VisrNavbar";
import SpectroscopyForm from "../components/SpectroscopyForm";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";
import { Link } from "react-router-dom";

function Spectroscopy() {
  return (
    <>
      <VisrNavbar />
      <Breadcrumbs path={window.location.pathname} linkComponent={Link} />
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3 }}>
        <SpectroscopyForm />
      </Box>
    </>
  );
}

export default Spectroscopy;
