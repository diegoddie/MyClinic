import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { AppointmentWithRelations } from "@/utils/supabase/actions/appointmentActions";

export function RecentAppointments({
  lastFiveAppointments,
}: {
  lastFiveAppointments: AppointmentWithRelations[];
}) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <Link href="/dashboard/visits">
          <CardTitle className="hover:underline cursor-pointer text-lg font-bold">
            Latest Appointments
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lastFiveAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {appointment.patient.first_name}
                    {appointment.patient.last_name}
                  </TableCell>
                  <TableCell>
                    {appointment.doctor.first_name}
                    {appointment.doctor.last_name}
                  </TableCell>
                  <TableCell>
                    {new Date(appointment.date).toLocaleDateString("en-EN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
