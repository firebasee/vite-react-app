import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppShell } from "@mantine/core";
import HomePage from "./pages/HomePage";
import Navbar from "./components/layout/Navbar";
import useAuthStore from "./store/useAuthStore";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      isLoggedIn &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, location, navigate]);

  return (
    <AppShell padding="md" header={<Navbar />}>
      <HomePage />
    </AppShell>
  );
}

export default App;
