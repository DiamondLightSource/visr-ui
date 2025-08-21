import { Suspense } from "react";
import { Link } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { Breadcrumbs } from "@diamondlightsource/sci-react-ui";
import { type Visit } from "../utils/types";
import TemplateView from "../components/TemplateView";
import VisrNavbar from "../components/VisrNavbar";
import WorkflowsL from "../components/WorkflowsL";

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

          <Box width="100%">
            <Suspense>
              <WorkflowsL
                visit={
                  {
                    proposalCode: "cm",
                    proposalNumber: 40661,
                    number: 1,
                  } as Visit
                }
              />
            </Suspense>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Workflows;
