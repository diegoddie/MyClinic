'use client'

import { LayoutDashboard, LogOut, Settings, Stethoscope, Users } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import MyClinicLogo from "@/public/MYClinic.png";
import Link from "next/link";
import { Separator } from "../ui/separator";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Visits",
    url: "/dashboard/visits",
    icon: Stethoscope,
  },
  {
    title: "Doctors",
    url: "/dashboard/doctors",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardSidebar() {
  const {
    open
  } = useSidebar()
  return (
    <Sidebar collapsible="icon" className="dark:border-r-slate-500 border-r-black/30">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link 
                href={'/'} 
                className="flex flex-row gap-1 justify-center items-center"
              >
                <Image 
                  src={MyClinicLogo}
                  alt="Logo"
                  className={`w-${open ? '12' : '8'} h-${open ? '12' : '8'}`}
                />
                { open && (
                  <div className="justify-center items-center flex flex-row">
                    <span className="text-2xl font-extrabold">
                      My
                    </span>
                    <span className="text-2xl font-extrabold ">
                      Clinic
                    </span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.title.toLowerCase() === "settings" && <Separator className="my-2 bg-black/30 dark:bg-slate-500" />}
                  <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                      <item.icon className="mr-2" size={32} />
                      <span className="">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className=" bg-black/30 dark:bg-slate-500" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
          <SidebarMenuButton asChild>
              <Link href='/' className="w-full rounded-md p-2">
                <LogOut className="mr-2" />
                <span className="">Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}