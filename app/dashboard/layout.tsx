"use client";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

import { ThemeToggle } from "@/components/Dashboard/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/utils/theme-provider";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sectionName = pathname?.split("/").pop();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider className="">
        <DashboardSidebar />
        <SidebarInset className="">
          <header className="bg-white dark:bg-[#09090b] dark:text-white text-black flex h-16 shrink-0 items-center justify-between border-b border-b-black/30 dark:border-b-slate-500 px-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-6 dark:bg-white bg-black" />
              <h1 className="text-2xl md:text-3xl font-semibold capitalize">{sectionName}</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Avatar className="cursor-pointer hover:shadow-xl">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="min-h-screen p-4 dark:bg-[#09090b] bg-white">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}