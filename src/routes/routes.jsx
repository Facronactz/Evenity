// routes/index.jsx
import {createBrowserRouter} from "react-router-dom";
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
import PaymentLoading from "@/pages/misc/PaymentLoading.jsx";
import NotFoundPage from "@/pages/NotFoundPage.jsx";

export const router = createBrowserRouter([
    {
        element: <PublicLayout/>,
        children: [
            {
                path: "/",
                element: <LandingPage/>,
            },
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "/about",
                element: <AboutPage/>,
            },
            {
                path: "/contact",
                element: <ContactPage/>,
            },
            {
                path: "/testimonials",
                element: <TestimonialsPage/>,
            },
        ],
    },
    {
        element: (
            <ProtectedRoute>
                <RootLayout/>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage/>,
            },
            {
                path: "/vendor",
                element: <VendorPage/>,
            },
            {
                path: "/withdraw",
                element: <WithdrawPage/>,
            },
            {
                path: "/transaction",
                element: <TransactionPage/>,
            },
            {
                path: "/user",
                element: <UsersPage type="user"/>,
            },
            {
                path: "/event",
                element: <EventsPage/>,
            },
            {
                path: "/withdraw",
                element: <WithdrawPage/>,
            },
        ],
    },
    {
        path: "/for-mobile/payment/loading",
        element: <PaymentLoading/>
    },
    {
        path: "*",
        element: <NotFoundPage/>,
    }
]);

export default router;
