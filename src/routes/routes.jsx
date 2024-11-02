import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import App from "../App";
import VendorPage from "../pages/VendorPage";
import EventsPage from "@/pages/EventsPage";
import WithdrawPage from "@/pages/WithdrawPage";
import TransactionPage from "@/pages/TransactionPage";
import UsersPage from "@/pages/UsersPage";
import ProtectedRoute from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/vendor/approval",
        element: <VendorPage type={"approval"} />,
      },
      {
        path: "/vendor/approved",
        element: <VendorPage type={"approved"} />,
      },
      {
        path: "/transaction/withdraw",
        element: <WithdrawPage />,
      },
      {
        path: "/transaction/approved",
        element: <TransactionPage />,
      },
      {
        path: "/user",
        element: <UsersPage type={"user"} />,
      },
      {
        path: "/event",
        element: <EventsPage />,
      },
      {
        path: "/withdraw",
        element: <WithdrawPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
