"use client";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { ThemeToggle } from "@/components/utils/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/utils/theme-provider";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import { useToast } from "@/hooks/use-toast";
import { Doctor, Patient, User } from "@/utils/supabase/types";
import GetAvatarFallback from "@/components/Dashboard/Settings/GetAvatarFallback";
import { isAdmin } from "@/utils/getRole";
import { getAuth, getUser } from "@/utils/supabase/actions/authActions";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sectionName = pathname?.split("/").pop();

  const [user, setUser] = useState<User | Doctor | Patient | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();

  const logout = async () => {
    setIsLoggingOut(true);
    const supabaseClient = createClient();

    const { error } = await supabaseClient.auth.signOut();

    if (!error) {
      setIsLoggingOut(false);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        variant: "success",
      });

      redirect("/");
    }
    if (error) {
      setIsLoggingOut(false);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const authenticatedUser = await getAuth();
      if (authenticatedUser === null) {
        redirect("/");
      }
      if (authenticatedUser.id) {
        const userData = await getUser({ id: authenticatedUser.id });
        if (userData === null) {
          redirect("/");
        }
        
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider className="">
        <DashboardSidebar logout={logout} isLoggingOut={isLoggingOut} />
        <SidebarInset className="overflow-x-hidden w-full flex-1">
          <header className="bg-white dark:bg-[#09090b] dark:text-white text-black flex h-16 shrink-0 items-center justify-between border-b border-b-black/30 dark:border-b-slate-500 px-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 h-6 dark:bg-white bg-black"
              />
              <h1 className="text-2xl md:text-3xl font-semibold capitalize">
                {sectionName}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {user ? (
                !isAdmin(user) ? (
                  <Avatar className="hover:shadow-md h-12 w-12">
                    <AvatarImage
                      src={user.profile_picture || undefined}
                      alt={user.email || ""}
                    />
                    <AvatarFallback>
                      {user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="hover:shadow-md h-12 w-12">
                    <GetAvatarFallback email={user.email} />
                  </div>
                )
              ) : null}
            </div>
          </header>
          <main className="flex-1 p-4 dark:bg-[#09090b] dark:text-white bg-white text-black">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
