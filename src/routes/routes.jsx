// routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import TestimonialsPage from "../pages/TestimonialsPage";
import DashboardPage from "../pages/DashboardPage";


import VendorPage from "../pages/VendorPage";
import EventsPage from "../pages/EventsPage";
import WithdrawPage from "../pages/WithdrawPage";
import TransactionPage from "../pages/TransactionPage";
import UsersPage from "../pages/UsersPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/testimonials",
        element: <TestimonialsPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/vendor",
        children: [
          {
            path: "approval",
            element: <VendorPage type="approval" />,
          },
          {
            path: "approved",
            element: <VendorPage type="approved" />,
          },
        ],
      },
      {
        path: "/transaction",
        children: [
          {
            path: "withdraw",
            element: <WithdrawPage />,
          },
          {
            path: "approved",
            element: <TransactionPage />,
          },
        ],
      },
      {
        path: "/user",
        element: <UsersPage type="user" />,
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
]);

export default router;
