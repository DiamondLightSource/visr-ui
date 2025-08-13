import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, DiamondTheme } from "@diamondlightsource/sci-react-ui";
import JsonFormsPlans from "./routes/Plans.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Spectroscopy from "./routes/Spectroscopy.tsx";

declare global {
  interface Window {
    global?: typeof globalThis;
  }
}

window.global ||= window;

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
