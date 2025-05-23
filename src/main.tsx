import App from "./App.tsx";
import { StrictMode } from "react";
import { theme } from "./theme/index.ts";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
