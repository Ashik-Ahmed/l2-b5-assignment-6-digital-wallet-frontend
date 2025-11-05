/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { LogOut, RefreshCcw, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import userIcon from "@/assets/images/user.png"
import { ModeToggle } from "./ModeToggler"
import Joyride, { type Placement } from 'react-joyride';

export interface SidebarItem {
    title: string
    url: string
    step: string
    items?: SidebarItem[]
}

const UserLayout = () => {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const [runTour, setRunTour] = useState(false)
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    // Check if user has completed the tour
    useEffect(() => {
        const hasCompletedTour = localStorage.getItem('userTourCompleted');
        if (!hasCompletedTour) {
            setRunTour(true);
        }
    }, []);

    // Handle tour completion
    const handleJoyrideComplete = (data: any) => {
        const { status } = data;
        if (status === 'finished' || status === 'skipped') {
            setRunTour(false);
            localStorage.setItem('userTourCompleted', 'true');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data?.data?.email || data?.data?.role !== "user") {
        navigate("/login");
    }

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
        navigate("/login");
    }

    const restartTour = () => {
        localStorage.removeItem('userTourCompleted');
        setRunTour(true);
    };

    const joyRideSteps = [
        {
            target: "#overview",
            content: "Dashboard showing the summary of your account",
            placement: "bottom" as Placement,
            disableBeacon: true
        },
        {
            target: "#withdraw",
            content: "WIthdraw cash via approved agents",
            placement: "bottom" as Placement,
            disableBeacon: true
        },
        {
            target: "#sendMoney",
            content: "Transfer money to other users wallet",
            placement: "bottom" as Placement,
            disableBeacon: true
        },
        {
            target: "#transactionHistory",
            content: "See your transaction history",
            placement: "bottom" as Placement,
            disableBeacon: true
        },
        {
            target: "#userIcon",
            content: "Personalize your profile",
            placement: "bottom" as Placement,
            disableBeacon: true
        },
        {
            target: "#themeToggler",
            content: "Toggle between light and dark mode",
            placement: "bottom" as Placement,
            disableBeacon: true
        }
    ]

    const sidebarList: { navMain: SidebarItem[] } = {
        navMain: [
            {
                title: "Dashboard",
                url: "/user/dashboard",
                step: "dashboard",
                items: [
                    {
                        title: "Overview",
                        url: "/user/dashboard",
                        step: "overview",
                    },
                    {
                        title: "Withdraw",
                        url: "/user/withdraw",
                        step: "withdraw",
                    },
                    {
                        title: "Send Money",
                        url: "/user/send-money",
                        step: "sendMoney",
                    },
                    {
                        title: "Transaction History",
                        url: "/user/transaction-history",
                        step: "transactionHistory",
                    },
                ]
            }
        ]
    }

    return (
        <SidebarProvider>
            <Joyride
                run={runTour}
                steps={joyRideSteps}
                continuous={true}
                showSkipButton={true}
                showProgress={true}
                callback={handleJoyrideComplete}
            />
            <AppSidebar sidebarList={sidebarList} joyRideSteps={joyRideSteps} />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex gap-2 items-center">
                        <div id="themeToggler">
                            <ModeToggle />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild id="userIcon" className="w-10 h-10 rounded-full">
                                <img src={data?.data?.profileImage || userIcon} className="h-10 w-10 rounded-full" alt="User" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <div className="flex items-center gap-4">
                                    <img src={data?.data?.profileImage || userIcon} className="h-10 w-10 rounded-full" alt="User" />
                                    <div>
                                        <p>{data?.data?.name || "User-Test"}</p>
                                        <p className="capitalize text-muted-foreground">{data?.data?.role || "Role-Test"}</p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate(`/${data?.data?.role}/profile`)}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Profile Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => restartTour()}>
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                    Restart Guided Tour
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default UserLayout