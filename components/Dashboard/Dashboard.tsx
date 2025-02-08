import { Calendar, Stethoscope, Users } from "lucide-react";

import { RecentAppointments } from "../Appointments/RecentAppointments";
import { FutureAppointments } from "../Appointments/FutureAppointments";
import { useQueries } from "@tanstack/react-query";
import { getDoctors } from "@/utils/supabase/actions/doctorActions";
import { Doctor, Patient, User } from "@/utils/supabase/types";
import { isAdmin } from "@/utils/getRole";
import { getLastFiveAppointments, getNextFiveAppointments, getPendingAppointments, getTodayAppointments } from "@/utils/supabase/actions/adminActions";
import { getUserLastFiveAppointments, getUserNextFiveAppointments, getUserPendingAppointments, getUserTodayAppointments } from "@/utils/supabase/actions/appointmentActions";
import { PendingAppointments } from "../Appointments/PendingAppointments";
import { OverviewCard } from "./OverviewCard";

function Dashboard({ user }: { user: Patient | Doctor | User }) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["appointments", "pending"],
        queryFn: () => isAdmin(user) ? getPendingAppointments() : getUserPendingAppointments(),
      },
      {
        queryKey: ["doctors"],
        queryFn: getDoctors,
      },
      {
        queryKey: ["appointments", "today"],
        queryFn: () => isAdmin(user) ? getTodayAppointments() : getUserTodayAppointments(),
      },
      {
        queryKey: ["appointments", "lastFive"],
        queryFn: () => isAdmin(user) ? getLastFiveAppointments() : getUserLastFiveAppointments(),
      },
      {
        queryKey: ["appointments", "nextFive"],
        queryFn: () => isAdmin(user) ? getNextFiveAppointments() : getUserNextFiveAppointments(),
      },
    ],
  });

  // Estraggo i dati e lo stato di caricamento per ogni query
  const pendingAppointments = results[0].data;
  const pendingAppointmentsIsLoading = results[0].isLoading;

  const numberOfDoctors = results[1].data;
  const numberOfDoctorsIsLoading = results[1].isLoading;

  const todayAppointments = results[2].data;
  const todayAppointmentsIsLoading = results[2].isLoading;

  const lastFiveAppointments = results[3].data;
  const lastFiveAppointmentsIsLoading = results[3].isLoading;

  const nextFiveAppointments = results[4].data;
  const nextFiveAppointmentsIsLoading = results[4].isLoading;

  return (
    <div className="py-2 space-y-8">
      {/* Overview Cards */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
        <OverviewCard
          title="Pending Appointments"
          value={pendingAppointments?.count ?? 0} 
          icon={Users}
          isLoading={pendingAppointmentsIsLoading}
        />
        <OverviewCard
          title="Appointments Today"
          value={todayAppointments?.count ?? 0} 
          icon={Calendar}
          isLoading={todayAppointmentsIsLoading}
        />
        <OverviewCard
          title="Available Doctors"
          value={numberOfDoctors?.count ?? 0} 
          icon={Stethoscope}
          isLoading={numberOfDoctorsIsLoading}
        />
      </div>

      {/* Pending Appointments */}
      <div className="w-full">
        <PendingAppointments pendingAppointments={pendingAppointments?.data ?? []} isLoading={pendingAppointmentsIsLoading} />
      </div>

      {/* Recent and Future Appointments */}
      <div className="flex flex-col gap-4 md:flex-row items-center justify-center">
        <RecentAppointments lastFiveAppointments={lastFiveAppointments?.data ?? []} isLoading={lastFiveAppointmentsIsLoading} />
        <FutureAppointments nextFiveAppointments={nextFiveAppointments?.data ?? []} isLoading={nextFiveAppointmentsIsLoading} />
      </div>
    </div>
  );
}

export default Dashboard;
