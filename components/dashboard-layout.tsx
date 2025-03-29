"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  Ambulance,
  Bell,
  Calendar,
  HelpCircle,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState(3)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#2C3E50]">
        <Sidebar className="border-r border-[#3D5A73]">
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Ambulance className="h-6 w-6 text-[#D3212D]" />
              <span className="text-lg font-bold text-white">MedResponse</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/" className="flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex items-center">
                    <Ambulance className="mr-2 h-5 w-5" />
                    <span>Resources</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    <span>Emergencies</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Scheduling</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="#" className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    <span>Communications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex flex-col gap-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#" className="flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#" className="flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      <span>Help</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <div className="mt-4 flex items-center gap-3 rounded-md border border-[#3D5A73] bg-[#1e2b38] p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A5F7A]">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Dr. Sarah Chen</p>
                  <p className="text-xs text-gray-400">Emergency Director</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-[#3D5A73] bg-[#263747] px-4">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4 md:hidden" />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="h-9 w-64 rounded-md border border-[#3D5A73] bg-[#1e2b38] px-3 text-sm text-white placeholder-gray-400 focus:border-[#1A5F7A] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative h-9 w-9 border-[#3D5A73] bg-[#1e2b38]">
                <Bell className="h-5 w-5 text-gray-400" />
                {notifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D3212D] text-xs font-medium text-white">
                    {notifications}
                  </span>
                )}
              </Button>
              <div className="hidden md:flex md:items-center md:gap-2">
                <div className="h-8 w-8 rounded-full bg-[#1A5F7A] flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white">Dr. Sarah Chen</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

