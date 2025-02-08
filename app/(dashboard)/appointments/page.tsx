'use client';

import AppointmentsTable from "@/components/Appointments/AppointmentsTable";
import { Spinner } from "@/components/ui/spinner";
import { isAdmin, isDoctor, isPatient } from "@/utils/getRole";
import { getAppointments } from "@/utils/supabase/actions/adminActions";
import { getUserAppointments } from "@/utils/supabase/actions/appointmentActions";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function AppointmentsPage() {
  // Fetch user data
  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({ 
    queryKey: ["user"], 
    queryFn: fetchUser 
  });

  // Fetch appointments based on user role
  const {
    data: appointments,
    isLoading: appointmentsIsLoading,
    isError: appointmentsIsError,
  } = useQuery({
    queryKey: ["appointments", user?.id],
    queryFn: async () => {
      if (!user) return null;

      if (isAdmin(user)) {
        return await getAppointments();
      } else if (isPatient(user) || isDoctor(user)) {
        return await getUserAppointments(user.id);
      }

      return null;
    },
    enabled: !!user
  });

  // Loading state
  if (userIsLoading || appointmentsIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Error handling
  if (userIsError || !user) {
    redirect('/');
  }

  if (appointmentsIsError || !appointments || appointments.error) {
    return (
      <div className="py-2">
        <p>Error fetching appointments: {appointments?.error}</p>
      </div>
    );
  }

  return (
    <div className="py-2 flex flex-col">
      {appointments.data && appointments.data.length > 0 ? (
        <AppointmentsTable 
          appointments={appointments.data}
        />
      ) : (
        <div className="flex items-center justify-center py-10">
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            No appointments found
          </h2>
        </div>
      )}
    </div>
  );
}