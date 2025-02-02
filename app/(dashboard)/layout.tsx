import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/utils/theme-provider";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await fetchUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider className="">
        <DashboardSidebar user={user} />
        <SidebarInset className="overflow-x-hidden w-full flex-1">
          <DashboardNavbar user={user} />
          <main className="flex-1 p-4 dark:bg-[#09090b] dark:text-white bg-white text-black">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
