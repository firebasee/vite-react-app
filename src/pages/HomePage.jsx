import { Routes, Route } from "react-router-dom";
import routes from "../constants/routes";
import NotFoundPage from "./NotFoundPage";

function HomePage() {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} element={<route.component />} />
        );
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default HomePage;
