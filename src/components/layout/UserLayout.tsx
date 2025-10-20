import type { ReactNode } from "react"
import { Outlet, useNavigate } from "react-router"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import { CircleUserRound, Moon, Sun, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"


const UserLayout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
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
                        title: "Deposit",
                        url: "/user/dashboard/deposit",
                    },
                    {
                        title: "Withdraw",
                        url: "/user/dashboard/withdraw",
                    },
                    {
                        title: "Send Money",
                        url: "/user/dashboard/send-money",
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <CircleUserRound />
                                <span className="sr-only">User Account</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate("/user/profile")}>
                                Profile
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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