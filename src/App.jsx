import { AppShell } from "@mantine/core";
import HomePage from "./pages/HomePage";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <AppShell padding="md" header={<Navbar />}>
      <HomePage />
    </AppShell>
  );
}

export default App;
