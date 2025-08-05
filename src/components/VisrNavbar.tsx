import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Navbar, NavLink, NavLinks } from "@diamondlightsource/sci-react-ui";

function VisrNavbar() {
  return (
    <>
      <Navbar
        logo="theme"
        leftSlot={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "nowrap",
              overflow: "hidden",
            }}
          >
            <NavLinks>
              <NavLink to="/" linkComponent={Link}>
                Home
              </NavLink>
              <NavLink to="/plans" linkComponent={Link}>
                Plans
              </NavLink>
              <NavLink to="/jsonformsplans" linkComponent={Link}>
                Plans (json)
              </NavLink>
            </NavLinks>
          </Box>
        }
      ></Navbar>
    </>
  );
}

export default VisrNavbar;
