import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { store } from "./redux/store";
import { routes } from "./routes/routes";
import { ThemeProvider } from "./components/theme/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors closeButton/>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
