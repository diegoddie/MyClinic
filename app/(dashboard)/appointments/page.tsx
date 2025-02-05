import AppointmentsTable from "@/components/Dashboard/Appointments/AppointmentsTable";
import { isAdmin, isDoctor, isPatient } from "@/utils/getRole";
import { getAppointments } from "@/utils/supabase/actions/adminActions";
import { getUserAppointments } from "@/utils/supabase/actions/appointmentActions";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { redirect } from "next/navigation";

export default async function AppointmentsPage() {
  const user = await fetchUser();
  if (!user) {
    redirect("/login");
  }

  let appointments;

  if (isAdmin(user)) {
    appointments = await getAppointments();
  } else if (isPatient(user) || isDoctor(user)) {
    appointments = await getUserAppointments(user.id);
  }

  if (!appointments || appointments.error || !appointments.data) {
    return (
      <div className="py-2">
        <p>Error fetching appointments: {appointments?.error}</p>
      </div>
    );
  }

  return (
    <div className="py-2 flex flex-col">
      {appointments.data && appointments.data.length> 0 ? (
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
