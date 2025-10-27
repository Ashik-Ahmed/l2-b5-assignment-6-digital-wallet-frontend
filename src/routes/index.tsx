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
import SendMoney from "@/pages/SendMoney";
import AgentLayout from "@/components/layout/AgentLayout";
import AgentDashboard from "@/pages/AgentDashboard";
import AgentCashIn from "@/pages/AgentCashIn";
import AgentCashOut from "@/pages/AgentCashOut";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminTransactionHistory from "@/pages/AdminTransactionHistory";

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
                Component: Withdraw,
                path: "withdraw",
            },
            {
                Component: SendMoney,
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
        Component: AgentLayout,
        path: "/agent",
        children: [
            {
                Component: AgentDashboard,
                path: "dashboard",
            },
            {
                Component: AgentCashIn,
                path: "cash-in",
            },
            {
                Component: AgentCashOut,
                path: "cash-out",
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
        Component: AdminLayout,
        path: "/admin",
        children: [
            {
                Component: AdminDashboard,
                path: "dashboard",
            },
            {
                Component: AgentCashIn,
                path: "manage-users",
            },
            {
                Component: AgentCashOut,
                path: "manage-agents",
            },
            {
                Component: AdminTransactionHistory,
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