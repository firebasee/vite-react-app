import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <MantineProvider withNormalizeCSS>
        <App />
      </MantineProvider>
    </HashRouter>
  </React.StrictMode>
);
