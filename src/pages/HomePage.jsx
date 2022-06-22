import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import routes from "../constants/routes";
import NotFoundPage from "./NotFoundPage";

function HomePage() {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.lazy ? (
                <Suspense fallback={<LoadingSpinner />}>
                  <route.component />
                </Suspense>
              ) : (
                <route.component />
              )
            }
          />
        );
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default HomePage;
