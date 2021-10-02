import LogIn from "../pages/LogIn/LogIn";
import MainLayout from "../components/MainLayout";
import DashboardLayout from "../components/DashboardLayout";
import { Navigate } from "react-router";
import Account from "../pages/Account/Account";
import NotFound from "../pages/NotFoundPage";
import Users from "../pages/Users/Users";
import Storages from "../pages/Storage/Storages";
const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "account", element: <Account /> },
      { path: "users", element: <Users /> },
      { path: "storages", element: <Storages /> },

      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [{ element: <LogIn /> }, { path: "404", element: <NotFound /> }],
  },
];

export default routes;
