import { FutureAppointments } from "@/components/Dashboard/FutureAppointments";
import { OverviewCard } from "@/components/Dashboard/OverviewCard";
import { PendingAppointments } from "@/components/Dashboard/PendingAppointments";
import { RecentAppointments } from "@/components/Dashboard/RecentAppointments";
import { Users, Calendar, Stethoscope } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="py-2 space-y-8">
      <div className="w-full items-center justify-center flex flex-col md:flex-row gap-4">
      <OverviewCard
        title="Pending Appointments"
        value={8}
        icon={Users}
      />
      <OverviewCard
        title="Appointments Today"
        value={42}
        icon={Calendar}
      />
      <OverviewCard
        title="Available Doctors"
        value={8}
        icon={Stethoscope}
      />
      </div>
      <div className="w-full">
        <PendingAppointments />
      </div>
      <div className="flex flex-col gap-4 md:flex-row items-center justify-center">
        <RecentAppointments />
        <FutureAppointments  />
      </div>
    </div>
  )
}

