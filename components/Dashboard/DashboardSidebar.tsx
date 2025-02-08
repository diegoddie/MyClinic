"use client";

import {
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import Image from "next/image";
import MyClinicLogo from "@/public/MYClinic.png";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { fetchUser, logout } from "@/utils/supabase/actions/authActions";
import { useToast } from "@/hooks/use-toast";
import { isAdmin, isDoctor, isPatient } from "@/utils/getRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "doctor", "patient"], 
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Stethoscope,
    roles: ["admin", "doctor", "patient"],
  },
  {
    title: "Doctors",
    url: "/doctors",
    icon: Users,
    roles: ["admin", "patient"],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    roles: ["doctor", "patient"],
  },
];

export default function DashboardSidebar() {
  const queryClient = useQueryClient();
  const { open, openMobile, setOpenMobile } = useSidebar();
  const { toast } = useToast();
  const {data:user} = useQuery({ queryKey: ["user"], queryFn: fetchUser })

  const filteredItems = menuItems.filter((item) => {
    if (user && isAdmin(user)) {
      return item.roles.includes("admin");
    }
    if (user && isDoctor(user)) {
      return item.roles.includes("doctor");
    }
    if (user && isPatient(user)) {
      return item.roles.includes("patient");
    }
    return false;
  });

  const handleLinkClick = () => {
    if (openMobile) setOpenMobile(false);
  };

  const mutation = useMutation({
    mutationFn: async () => {  
      const result = await logout();  
      if (result?.error) {  
        throw new Error(result.error);  
      }
    },
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  })

  const handleLogout = () => {
    mutation.mutate();
  }

  return (
    <Sidebar
      collapsible="icon"
      className="dark:border-r-slate-500 border-r-black/30"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href={"/"}
                className="flex flex-row gap-1 justify-center items-center"
              >
                <Image
                  src={MyClinicLogo}
                  alt="Logo"
                  className={`w-${open ? "12" : "8"} h-${open ? "12" : "8"}`}
                />
                {open && (
                  <div className="justify-center items-center flex flex-row">
                    <span className="text-2xl font-extrabold">My</span>
                    <span className="text-2xl font-extrabold ">Clinic</span>
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
            {filteredItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.title.toLowerCase() === "settings" && (
                  <Separator className="my-2 bg-black/30 dark:bg-slate-500" />
                )}
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className="font-medium"
                    onClick={handleLinkClick}
                  >
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
            <SidebarMenuButton
              onClick={handleLogout}
              className="w-full rounded-md p-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Spinner className="mr-2" />
                  <span>Logging out..</span>
                </>
              ) : (
                <>
                  <LogOut className="mr-2" />
                  <span>Logout</span>
                </>
              )}
              
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
