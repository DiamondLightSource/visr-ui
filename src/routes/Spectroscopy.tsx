import { Box } from "@mui/material";
import VisrNavbar from "../components/VisrNavbar";
import SpectroscopyForm from "../components/SpectroscopyForm";

function Spectroscopy() {
  return (
    <>
      <VisrNavbar />
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 3 }}>
        <SpectroscopyForm />
      </Box>
    </>
  );
}

export default Spectroscopy;
