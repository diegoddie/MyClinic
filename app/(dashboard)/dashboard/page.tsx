"use client"

import Dashboard from "@/components/Dashboard/Dashboard";
import { Spinner } from "@/components/ui/spinner";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

    if (userIsLoading) {
      return <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>;
    }
  
    if (userIsError || !user) {
      redirect('/');
    }

  return (
    <Dashboard user={user} />
  )
}
