import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export function FutureAppointments() {
  const appointments = [
    { id: 1, patient: "Emma Johnson", date: "2023-06-05", time: "10:00 AM", doctor: "Dr. Anderson" },
    { id: 2, patient: "Michael Brown", date: "2023-06-06", time: "11:30 AM", doctor: "Dr. Lee" },
    { id: 3, patient: "Sophia Davis", date: "2023-06-07", time: "09:15 AM", doctor: "Dr. Martinez" },
    { id: 4, patient: "William Taylor", date: "2023-06-08", time: "02:00 PM", doctor: "Dr. Thompson" },
    { id: 5, patient: "Olivia Wilson", date: "2023-06-09", time: "03:45 PM", doctor: "Dr. Garcia" },
  ]

  return (
    <Card className="flex-1">
      <CardHeader>
        <Link href="/dashboard/visits">
          <CardTitle className="hover:underline cursor-pointer">Next Appointments</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Doctor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patient}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

