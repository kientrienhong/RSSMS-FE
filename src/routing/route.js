import LogIn from "../pages/LogIn/LogIn";
import DashboardLayout from "../components/DashboardLayout";
import {Navigate} from "react-router";
import Account from "../pages/Account/Account";
import NotFound from "../pages/NotFoundPage";
import Users from "../pages/Users/Users";
import Storages from "../pages/Storage/Storages";
import StorageDetail from "../pages/StorageDetail/StorageDetail";
import Order from "../pages/Order/Order";
import Products from "../pages/Product/Products";
import ProtectTemplate from "../Template/ProtectTemplate";
import {ROLE_USER} from "../constant/constant";
import NotStorage from "../pages/NotStorage";
import CustomerRequest from "../pages/CustomerRequest/CustomerRequest";
import NewSchedule from "../pages/NewSchedule/NewSchedule";
import StaffRequest from "../pages/Staff_Request/StaffRequest";
import AreaDetailNew from "../pages/AreaDetailNew/AreaDetailNew";
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
              Object.keys(ROLE_USER)[1],
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
            permission={[
              Object.keys(ROLE_USER)[0],
              Object.keys(ROLE_USER)[1],
              Object.keys(ROLE_USER)[4],
            ]}
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
              Object.keys(ROLE_USER)[1],
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
              Object.keys(ROLE_USER)[1],
              Object.keys(ROLE_USER)[4],
              Object.keys(ROLE_USER)[0],
            ]}
          >
            <Order />
          </ProtectTemplate>
        ),
      },
      {
        path: "services",
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
        path: "schedule/",
        element: (
          <ProtectTemplate
            Component={NewSchedule}
            permission={[Object.keys(ROLE_USER)[1], Object.keys(ROLE_USER)[0]]}
          >
            <NewSchedule />
          </ProtectTemplate>
        ),
      },
      {
        path: "schedule/:scheduleDate",
        element: (
          <ProtectTemplate
            Component={NewSchedule}
            permission={[Object.keys(ROLE_USER)[1], Object.keys(ROLE_USER)[0]]}
          >
            <NewSchedule />
          </ProtectTemplate>
        ),
      },
      {
        path: "staff_request",
        element: (
          <ProtectTemplate
            Component={StaffRequest}
            permission={[Object.keys(ROLE_USER)[1], Object.keys(ROLE_USER)[0]]}
          >
            <StaffRequest />
          </ProtectTemplate>
        ),
      },
      {
        path: "customer_request",
        element: (
          <ProtectTemplate
            Component={CustomerRequest}
            permission={[
              Object.keys(ROLE_USER)[1],
              Object.keys(ROLE_USER)[4],
              Object.keys(ROLE_USER)[0],
            ]}
          >
            <CustomerRequest />
          </ProtectTemplate>
        ),
      },
      {
        path: "storages/:storageId",
        element: (
          <ProtectTemplate
            Component={StorageDetail}
            permission={[
              Object.keys(ROLE_USER)[0],
              Object.keys(ROLE_USER)[1],
              Object.keys(ROLE_USER)[4],
            ]}
          >
            <StorageDetail />
          </ProtectTemplate>
        ),
      },
      {
        path: "storages/:storageId/areas/:areaId",
        element: (
          <ProtectTemplate
            Component={AreaDetailNew}
            permission={[
              Object.keys(ROLE_USER)[0],
              Object.keys(ROLE_USER)[1],
              Object.keys(ROLE_USER)[4],
            ]}
          >
            <AreaDetailNew />
          </ProtectTemplate>
        ),
      },
      {
        path: "not_storage",
        element: (
          <ProtectTemplate
            Component={NotStorage}
            permission={[Object.keys(ROLE_USER)[4]]}
          >
            <NotStorage />
          </ProtectTemplate>
        ),
      },
      {path: "*", element: <Navigate to="/404" />},
    ],
  },
  {
    path: "/",
    children: [{element: <LogIn />}, {path: "404", element: <NotFound />}],
  },
];

export default routes;
