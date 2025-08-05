import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, DiamondTheme } from "@diamondlightsource/sci-react-ui";
import JsonFormsPlans from "./routes/JsonFormsPlans.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Plans from "./routes/Plans.tsx";

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
    path: "/jsonformsplans",
    element: <JsonFormsPlans />,
  },
  {
    path: "/plans",
    element: <Plans />,
  },
]);

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  );
});
