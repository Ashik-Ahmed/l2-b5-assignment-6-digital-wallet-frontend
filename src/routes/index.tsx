import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router";
import UserDashboard from "@/pages/UserDashboard";
import UserLayout from "@/components/layout/UserLayout";
import Profile from "@/pages/Profile";
import TransactionHistory from "@/pages/TransactionHistory";
import Withdraw from "@/pages/Withdraw";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                index: true,
                Component: Homepage,
            },
            {
                Component: About,
                path: "/about",
            },
            {
                Component: Features,
                path: "/features",
            },
            {
                Component: Contact,
                path: "/contact",
            },
            {
                Component: FAQ,
                path: "/faq",
            }
        ]
    },
    {
        Component: UserLayout,
        path: "/user",
        children: [
            {
                Component: UserDashboard,
                path: "dashboard",
            },
            {
                Component: UserDashboard,
                path: "deposit",
            },
            {
                Component: Withdraw,
                path: "withdraw",
            },
            {
                Component: UserDashboard,
                path: "send-money",
            },
            {
                Component: TransactionHistory,
                path: "transaction-history",
            },
            {
                Component: Profile,
                path: "profile",
            },
        ],
    },
    {
        Component: Login,
        path: "/login",
    }
])