import { Suspense } from "react";
import { Link } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";
import TemplateView from "../components/TemplateView";
import VisrNavbar from "../components/VisrNavbar";

const Workflows: React.FC = () => {
  return (
    <>
      <VisrNavbar />
      <Breadcrumbs path={window.location.pathname} linkComponent={Link} />
      <Container maxWidth="xl">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={2}
          mb={10}
        >
          <Suspense>
            <TemplateView templateName={"visr"} />
          </Suspense>
        </Box>
      </Container>
    </>
  );
};

export default Workflows;
