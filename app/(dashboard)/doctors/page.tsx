"use client";

import DoctorsTable from "@/components/Doctors/DoctorsTable";
import { getDoctors } from "@/utils/supabase/actions/doctorActions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { redirect } from "next/navigation";
import { isAdmin, isDoctor } from "@/utils/getRole";
import CreateDoctorForm from "@/components/Form/CreateDoctorForm";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export default function Doctors() {
  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({ queryKey: ["user"], queryFn: fetchUser });
  const {
    data: doctors,
    isLoading: doctorsIsLoading,
    isError: doctorsIsError,
  } = useQuery({ queryKey: ["doctors"], queryFn: getDoctors });

  if (userIsLoading || doctorsIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (userIsError || !user || isDoctor(user)) {
    redirect("/");
  }

  if (doctorsIsError) {
    return (
      <div className="py-2 flex flex-col">
        <p>Error fetching doctors: {doctorsIsError}</p>
      </div>
    );
  }

  return (
    <div className="py-2 flex flex-col">
      <div className="flex items-center justify-center md:justify-end mb-6 gap-4">
        {isAdmin(user) && (
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
                <Plus className="h-4 w-4" />
                Add Doctor
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white dark:bg-[#09090b] dark:text-white text-black h-fit">
              <SheetTitle className="dark:text-white">
                Add a new doctor
              </SheetTitle>
              <CreateDoctorForm />
            </SheetContent>
          </Sheet>
        )}
      </div>
      {doctors && doctors.data?.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            No doctors
          </h2>
        </div>
      ) : (
        doctors && <DoctorsTable doctors={doctors.data} />
      )}
    </div>
  );
}
