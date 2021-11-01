import LogIn from "../pages/LogIn/LogIn";
import DashboardLayout from "../components/DashboardLayout";
import { Navigate } from "react-router";
import Account from "../pages/Account/Account";
import NotFound from "../pages/NotFoundPage";
import Users from "../pages/Users/Users";
import Storages from "../pages/Storage/Storages";
import StorageDetail from "../pages/StorageDetail/StorageDetail";
import AreaDetail from "../pages/AreaDetail/AreaDetail";
import Order from "../pages/Order/Order";
import MakingOrder from "../pages/Order/CreateOrder/MakingOrder";
import Products from "../pages/Product/Products";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "account", element: <Account /> },
      { path: "users", element: <Users /> },
      { path: "storages", element: <Storages /> },
      { path: "orders", element: <Order /> },
      { path: "products", element: <Products /> },
      { path: "storages/:storageId", element: <StorageDetail /> },
      { path: "storages/:storageId/areas/:areaId", element: <AreaDetail /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    children: [
      { element: <LogIn /> },
      { path: "404", element: <NotFound /> },
      { path: "orders/makingOrder", element: <MakingOrder /> },
    ],
  },
];

export default routes;
