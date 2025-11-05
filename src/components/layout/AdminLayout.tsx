import { useEffect, useState, type ReactNode } from "react"
import { Outlet, useNavigate } from "react-router"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { LogOut, RefreshCcw, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import userIcon from "@/assets/images/user.png"
import { ModeToggle } from "./ModeToggler"
import Joyride from "react-joyride"


const AdminLayout = ({ children }: { children: ReactNode }) => {

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


    const restartTour = () => {
        localStorage.removeItem('userTourCompleted');
        setRunTour(true);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data?.data?.email || data?.data?.role !== "admin") {
        navigate("/login");
    }

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
        navigate("/login");
    }

    const joyRideSteps = [
        {
            target: "#overview",
            content: "Dashboard showing the summary",
            placement: "bottom",
            disableBeacon: true
        },
        {
            target: "#manageUsers",
            content: "Show the user details and active/block any user",
            placement: "bottom",
            disableBeacon: true
        },
        {
            target: "#manageAgents",
            content: "Manage agent details and approve/suspend any agent",
            placement: "bottom",
            disableBeacon: true
        },
        {
            target: "#transactionHistory",
            content: "See the transaction history for all users",
            placement: "bottom",
            disableBeacon: true
        },
        {
            target: "#userIcon",
            content: "Personalize your profile",
            placement: "bottom",
            disableBeacon: true
        },
        {
            target: "#themeToggler",
            content: "Toggle between light and dark mode",
            placement: "bottom",
            disableBeacon: true
        }
    ]

    const sidebarList = {
        navMain: [
            {
                title: "Dashboard",
                url: "/admin/dashboard",
                items: [
                    {
                        title: "Overview",
                        url: "/admin/dashboard",
                        step: "overview"
                    },
                    {
                        title: "Manage Users",
                        url: "/admin/manage-users",
                        step: "manageUsers"
                    },
                    {
                        title: "Manage Agents",
                        url: "/admin/manage-agents",
                        step: "manageAgents"
                    },
                    {
                        title: "Transaction History",
                        url: "/admin/transaction-history",
                        step: "transactionHistory"
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
            <AppSidebar sidebarList={sidebarList} />

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
                                        {/* <p className="text-xs italic text-muted-foreground">{data?.data?.email || "Email-Test"}</p> */}
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
                    {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}

export default AdminLayout