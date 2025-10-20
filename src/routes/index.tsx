import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/UserDashboard";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router";
import UserDashboard from "@/pages/UserDashboard";
import UserLayout from "@/components/layout/UserLayout";

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
        ],
    },
    {
        Component: Login,
        path: "/login",
    }
])