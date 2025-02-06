import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import PatientOrDoctorDashboard from "@/components/Dashboard/PatientOrDoctorDashboard";
import { isAdmin, isDoctor, isPatient } from "@/utils/getRole";
import {
  getPendingAppointments,
  getTodayAppointments,
  getNextFiveAppointments,
  getLastFiveAppointments,
} from "@/utils/supabase/actions/adminActions";
import { AppointmentWithRelations, getUserLastFiveAppointments, getUserNextFiveAppointments, getUserPendingAppointments, getUserTodayAppointments } from "@/utils/supabase/actions/appointmentActions";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { getDoctors } from "@/utils/supabase/actions/doctorActions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await fetchUser();
  if (!user) {
    redirect("/login");
  }

  let pendingAppointments: AppointmentWithRelations[] = [];
  let numberOfPendingAppointments = 0;
  let numberOfDoctors = 0;
  let numberOfAppointmentsToday = 0;
  let nextFiveAppointments: AppointmentWithRelations[] = [];
  let lastFiveAppointments: AppointmentWithRelations[] = [];

  if (isAdmin(user)) {
    // Pending Appointments
    const pendingResult = await getPendingAppointments();
    pendingAppointments = pendingResult.data ?? [];
    numberOfPendingAppointments = pendingResult.count ?? 0;

    // Doctors Count
    const doctorsResult = await getDoctors();
    numberOfDoctors = doctorsResult.count ?? 0;

    // Today's Appointments
    const todayAppointmentsResult = await getTodayAppointments();
    numberOfAppointmentsToday = todayAppointmentsResult.count ?? 0;

    // Next 5 Appointments
    const nextAppointmentsResult = await getNextFiveAppointments();
    nextFiveAppointments = nextAppointmentsResult.data ?? [];

    // Last 5 Appointments
    const lastAppointmentsResult = await getLastFiveAppointments();
    lastFiveAppointments = lastAppointmentsResult.data ?? [];
  }

  if(isPatient(user) || isDoctor(user)) {
    const pendingResult = await getUserPendingAppointments();
    pendingAppointments = pendingResult.data ?? [];
    numberOfPendingAppointments = pendingResult.count ?? 0;

    // Doctors Count
    const doctorsResult = await getDoctors();
    numberOfDoctors = doctorsResult.count ?? 0;

    // Today's Appointments
    const todayAppointmentsResult = await getUserTodayAppointments();
    numberOfAppointmentsToday = todayAppointmentsResult.count ?? 0;

    // Next 5 Appointments
    const nextAppointmentsResult = await getUserNextFiveAppointments();
    nextFiveAppointments = nextAppointmentsResult.data ?? [];

    // Last 5 Appointments
    const lastAppointmentsResult = await getUserLastFiveAppointments();
    lastFiveAppointments = lastAppointmentsResult.data ?? [];
  }

  return isAdmin(user) ? (
    <AdminDashboard
      pendingAppointments={pendingAppointments}
      numberOfPendingAppointments={numberOfPendingAppointments}
      numberOfDoctors={numberOfDoctors}
      numberOfAppointmentsToday={numberOfAppointmentsToday}
      nextFiveAppointments={nextFiveAppointments}
      lastFiveAppointments={lastFiveAppointments}
    />
  ) : (
    <PatientOrDoctorDashboard
      pendingAppointments={pendingAppointments}
      numberOfPendingAppointments={numberOfPendingAppointments}
      numberOfDoctors={numberOfDoctors}
      numberOfAppointmentsToday={numberOfAppointmentsToday}
      nextFiveAppointments={nextFiveAppointments}
      lastFiveAppointments={lastFiveAppointments}
    />
  );
}
