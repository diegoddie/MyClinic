import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreVertical, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import doctors from "@/lib/landingPageData/doctors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Doctors() {
  return (
    <div className="py-2">
    <Card className="py-2 p-6">
      <div className="flex items-center justify-end mb-6 gap-4">
        <Button variant="outline" className="gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4h18M3 12h18M3 20h18"
            />
          </svg>
          Filters
        </Button>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add Doctor
        </Button>
      </div>
      
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>NAME</TableHead>
            <TableHead>CONTACT</TableHead>
            <TableHead>WORKING DAYS</TableHead>
            <TableHead>ASSIGNED TREATMENT</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 md:w-16 md:h-16">
                    <AvatarImage
                      src={doctor.image}
                      alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                      className="object-cover bg-primary"
                    />
                    <AvatarFallback>
                      {doctor.firstName}
                      {doctor.lastName}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {doctor.firstName} {doctor.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {doctor.specialization}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>{doctor.email}</div>
                <div className="text-sm text-blue-600">{doctor.email}</div>
              </TableCell>
              <TableCell>PLACEHOLDER</TableCell>
              <TableCell className="text-sm">{doctor.specialization}</TableCell>
              <TableCell>PLACEHOLDER</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">
                    More options for {doctor.firstName} {doctor.lastName}
                  </span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
    </div>
  );
}
