"use client"

import UpdateDoctorForm from "@/components/Form/UpdateDoctorForm";
import { UpdatePatientForm } from "@/components/Form/UpdatePatientForm";
import { Spinner } from "@/components/ui/spinner";
import { isDoctor, isPatient } from "@/utils/getRole";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function Settings() {
  const { data: user, isLoading, isError } = useQuery({ queryKey: ['user'], queryFn: fetchUser });
  // Redirezione se i dati non sono disponibili
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>;
  }

  if (isError || !user) {
    redirect('/');
  }

  return (
    <div className="py-2">
      <div className="justify-center flex flex-col md:flex-row">
        {isDoctor(user) ? (
          <UpdateDoctorForm doctor={user} />
        ) : isPatient(user) ? (
          <UpdatePatientForm patient={user} />
        ) : (
          null
        )}
      </div>
    </div>
  );
}
