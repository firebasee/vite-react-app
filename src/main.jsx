import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { NotificationsProvider } from "@mantine/notifications";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <MantineProvider withNormalizeCSS>
        <NotificationsProvider position="top-center" limit={3}>
          <App />
        </NotificationsProvider>
      </MantineProvider>
    </HashRouter>
  </React.StrictMode>
);
