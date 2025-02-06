import { Calendar, Stethoscope, Users } from "lucide-react";
import { OverviewCard } from "./OverviewCard";
import { RecentAppointments } from "./RecentAppointments";
import { FutureAppointments } from "./FutureAppointments";
import { AppointmentWithRelations } from "@/utils/supabase/actions/appointmentActions";
import { PatientOrDoctorPendingAppointments } from "./PatientOrDoctorPendingAppointments";

interface PatientOrDoctorDashboardProps {
  pendingAppointments: AppointmentWithRelations[];
  numberOfPendingAppointments: number;
  numberOfAppointmentsToday: number;
  numberOfDoctors: number;
  nextFiveAppointments: AppointmentWithRelations[];
  lastFiveAppointments: AppointmentWithRelations[];
}

function PatientOrDoctorDashboard({
  pendingAppointments,
  numberOfPendingAppointments,
  numberOfAppointmentsToday,
  numberOfDoctors,
  nextFiveAppointments,
  lastFiveAppointments,
}: PatientOrDoctorDashboardProps) {
  return (
    <div className="py-2 space-y-8">
      {/* Overview Cards */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
        <OverviewCard
          title="Pending Appointments"
          value={numberOfPendingAppointments}
          icon={Users}
        />
        <OverviewCard
          title="Appointments Today"
          value={numberOfAppointmentsToday}
          icon={Calendar}
        />
        <OverviewCard
          title="Available Doctors"
          value={numberOfDoctors}
          icon={Stethoscope}
        />
      </div>

      {/* Pending Appointments */}
      <div className="w-full">
        <PatientOrDoctorPendingAppointments pendingAppointments={pendingAppointments} />
      </div>

      {/* Recent and Future Appointments */}
      <div className="flex flex-col gap-4 md:flex-row items-center justify-center">
        <RecentAppointments lastFiveAppointments={lastFiveAppointments} />
        <FutureAppointments nextFiveAppointments={nextFiveAppointments} />
      </div>
    </div>
  );
}

export default PatientOrDoctorDashboard;
