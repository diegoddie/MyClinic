"use client";

import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeToggle } from "../utils/ThemeToggle";
import { usePathname } from "next/navigation";
import { isAdmin } from "@/utils/getRole";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import GetAvatarFallback from "./Settings/GetAvatarFallback";
import { Doctor, Patient, User } from "@/utils/supabase/types";

function DashboardNavbar({ user } : { user: Patient | Doctor | User }) {
  const pathname = usePathname();
  const sectionName = pathname?.split("/").pop();

  return (
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
          {!isAdmin(user) ? (
            <Avatar className="hover:shadow-md h-12 w-12">
              <AvatarImage
                src={user.profile_picture || undefined}
                alt={user.email || ""}
              />
              <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="hover:shadow-md h-12 w-12">
              <GetAvatarFallback email={user.email} />
            </div>
          )}
      </div>
    </header>
  );
}

export default DashboardNavbar;
