import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router";

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
        Component: Login,
        path: "/login",
    }
])