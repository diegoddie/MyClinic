import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export function RecentAppointments() {
  const appointments = [
    { id: 1, patient: "John Doe", date: "2023-06-01", time: "09:00 AM", doctor: "Dr. Smith" },
    { id: 2, patient: "Jane Smith", date: "2023-06-01", time: "10:30 AM", doctor: "Dr. Johnson" },
    { id: 3, patient: "Bob Wilson", date: "2023-06-01", time: "11:45 AM", doctor: "Dr. Brown" },
    { id: 4, patient: "Alice Taylor", date: "2023-06-01", time: "02:15 PM", doctor: "Dr. Davis" },
    { id: 5, patient: "Charlie Harris", date: "2023-06-01", time: "03:30 PM", doctor: "Dr. Wilson" },
  ]

  return (
    <Card className="flex-1 w-full">
      <CardHeader>
        <Link href="/dashboard/visits">
          <CardTitle className="hover:underline cursor-pointer">Latest Appointments</CardTitle>
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

