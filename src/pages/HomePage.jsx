import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import routes from "../constants/routes";
import useCartStore from "../store/useCartStore";
import NotFoundPage from "./NotFoundPage";

function HomePage() {
  const setCartItemCount = useCartStore((state) => state.setCartItemCount);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setCartItemCount();
  }, [cart]);

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
