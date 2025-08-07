import { Container, Typography, Button, Stack } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import FeedIcon from "@mui/icons-material/Feed";
import { Link } from "react-router-dom";
import VisrNavbar from "../components/VisrNavbar";

function Dashboard() {
  return (
    <>
      <VisrNavbar />
      <Container maxWidth="sm" sx={{ mt: 5, mb: 4 }}>
        <Stack direction={"column"} alignItems={"center"} spacing={3}>
          <Typography variant="h4" component="h1" textAlign={"center"}>
            Welcome to Visr
          </Typography>
          <Stack direction={"row"} spacing={5}>
            <Button
              component={Link}
              to="/spectroscopy"
              variant="contained"
              startIcon={<ArticleIcon />}
              sx={{ width: 150, height: 50 }}
            >
              Spectroscopy
            </Button>
            <Button
              component={Link}
              to="/plans"
              variant="contained"
              startIcon={<FeedIcon />}
              sx={{ width: 150, height: 50 }}
            >
              Plans
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Dashboard;
