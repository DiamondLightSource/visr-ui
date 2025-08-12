import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, DiamondTheme } from "@diamondlightsource/sci-react-ui";
import JsonFormsPlans from "./routes/Plans.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Spectroscopy from "./routes/Spectroscopy.tsx";
import Workflows from "./routes/Workflows.tsx";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "./RelayEnvironment.ts";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/plans",
    element: <JsonFormsPlans />,
  },
  {
    path: "/spectroscopy",
    element: <Spectroscopy />,
  },
  {
    path: "/workflows",
    element: <Workflows />,
  },
]);

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <StrictMode>
        <ThemeProvider theme={DiamondTheme} defaultMode="light">
          <RouterProvider router={router} />
        </ThemeProvider>
      </StrictMode>
    </RelayEnvironmentProvider>,
  );
});
