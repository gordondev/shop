import Main from "./pages/Main";
import Categories from "./pages/Categories";

import {
  MAIN_ROUTE,
  PROFILE_ROUTE,
  PRODUCTS_ROUTE,
  CATEGORIES_ROUTE,
  CART_ROUTE,
} from "./utils/consts";

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: CATEGORIES_ROUTE,
    Component: Categories,
  },
];