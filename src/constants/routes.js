import { lazy } from "react";
import ProductListPage from "../pages/ProductListPage";
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

export default [
  {
    path: "/",
    component: ProductListPage,
  },
  {
    path: "/products",
    component: ProductListPage,
  },
  {
    path: "/products/:id",
    component: ProductDetailPage,
    lazy: true,
  },
  {
    path: "/cart",
    component: CartPage,
    lazy: true,
  },
  {
    path: "/login",
    component: LoginPage,
    lazy: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    lazy: true,
  },
];
