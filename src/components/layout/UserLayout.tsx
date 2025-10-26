import type { ReactNode } from "react"
import { Outlet, useNavigate } from "react-router"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { LogOut, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import userIcon from "@/assets/images/user.png"
import { ModeToggle } from "./ModeToggler"


const UserLayout = ({ children }: { children: ReactNode }) => {

    const { data, isLoading } = useUserInfoQuery(undefined);
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data?.data?.email && data?.data?.role !== "user") {
        navigate("/login");
    }

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState());
        navigate("/login");
    }

    const sidebarList = {
        navMain: [
            {
                title: "Dashboard",
                url: "/user/dashboard",
                items: [
                    {
                        title: "Overview",
                        url: "/user/dashboard",
                    },
                    {
                        title: "Withdraw",
                        url: "/user/withdraw",
                    },
                    {
                        title: "Send Money",
                        url: "/user/send-money",
                    },
                    {
                        title: "Transaction History",
                        url: "/user/transaction-history",
                    },
                ]
            }
        ]
    }
    return (
        <SidebarProvider>
            <AppSidebar sidebarList={sidebarList} />
            <SidebarInset>
                <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex gap-2 items-center">
                        <div>
                            <ModeToggle />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="w-10 h-10 rounded-full">

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
                                <DropdownMenuItem onClick={() => navigate("/user/profile")}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Profile Settings
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

export default UserLayout