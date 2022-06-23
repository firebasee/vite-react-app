import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <MantineProvider withNormalizeCSS>
        <NotificationsProvider position="bottom-left" limit={3}>
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </HashRouter>
  </React.StrictMode>
);
