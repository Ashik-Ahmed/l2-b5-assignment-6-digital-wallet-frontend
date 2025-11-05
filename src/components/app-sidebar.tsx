/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import Logo from "@/assets/icons/Logo"

// Define the interface for sidebar items
export interface SidebarItem {
  title: string
  url: string
  step: string
  items?: SidebarItem[]
}

// Define the props interface for AppSidebar
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  sidebarList: {
    navMain: SidebarItem[]
  }
  joyRideSteps?: any[]
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const activeLink = useLocation().pathname;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="px-4 py-2 border-b">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {props.sidebarList?.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((subItem) => (
                  <SidebarMenuItem key={subItem.title} id={subItem?.step}>
                    <SidebarMenuButton asChild isActive={subItem.url === activeLink}>
                      <Link to={subItem.url}>{subItem.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}