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
import Schedule from "../pages/Schedule/Schedule";
import ProtectTemplate from "../Template/ProtectTemplate";
import { ROLE_USER } from "../constant/constant";
const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      {
        path: "account",
        element: (
          <ProtectTemplate
            Component={Account}
            permission={[
              Object.keys(ROLE_USER)[0],
              Object.keys(ROLE_USER)[2],
              Object.keys(ROLE_USER)[4],
            ]}
          >
            <Account />
          </ProtectTemplate>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectTemplate
            Component={Users}
            permission={[Object.keys(ROLE_USER)[0], Object.keys(ROLE_USER)[2]]}
          >
            <Users />
          </ProtectTemplate>
        ),
      },
      {
        path: "storages",
        element: (
          <ProtectTemplate
            Component={Storages}
            permission={[
              Object.keys(ROLE_USER)[0],
              Object.keys(ROLE_USER)[2],
              Object.keys(ROLE_USER)[4],
            ]}
          >
            <Storages />
          </ProtectTemplate>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectTemplate
            Component={Order}
            permission={[
              Object.keys(ROLE_USER)[0],
              Object.keys(ROLE_USER)[2],
              Object.keys(ROLE_USER)[4],
            ]}
          >
            <Order />
          </ProtectTemplate>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectTemplate
            Component={Products}
            permission={[Object.keys(ROLE_USER)[0]]}
          >
            <Products />
          </ProtectTemplate>
        ),
      },
      {
        path: "schedule",
        element: (
          <ProtectTemplate
            Component={Schedule}
            permission={[Object.keys(ROLE_USER)[0], Object.keys(ROLE_USER)[2]]}
          >
            <Schedule />
          </ProtectTemplate>
        ),
      },

      {
        path: "storages/:storageId",
        element: (
          <ProtectTemplate Component={StorageDetail}>
            <StorageDetail />
          </ProtectTemplate>
        ),
      },
      {
        path: "storages/:storageId/areas/:areaId",
        element: (
          <ProtectTemplate Component={AreaDetail}>
            <AreaDetail />
          </ProtectTemplate>
        ),
      },
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
