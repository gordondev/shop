import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import Products from "./pages/Products";
import Profile from "./pages/Profile";

import {
  CART_ROUTE,
  CATEGORIES_ROUTE,
  DASHBOARD_ROUTE,
  MAIN_ROUTE,
  PRODUCTS_ROUTE,
  PROFILE_ROUTE,
} from "./utils/consts";

export const publicRoutes = [
  {
    path: CART_ROUTE,
    Component: Cart,
  },
  {
    path: CATEGORIES_ROUTE,
    Component: Categories,
  },
  {
    path: DASHBOARD_ROUTE,
    Component: Dashboard,
  },
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: PRODUCTS_ROUTE,
    Component: Products,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];