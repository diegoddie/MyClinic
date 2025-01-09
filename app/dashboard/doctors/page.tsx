'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu, MoreVertical, Plus } from "lucide-react";
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
          <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
            <Menu className="h-4 w-4" />
            Filters
          </Button>
          <Button type="submit" className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
            <Plus className="h-4 w-4" />
            Add Doctor
          </Button>
        </div>

        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>CONTACT</TableHead>
              <TableHead>SPECIALIZATION</TableHead>
              <TableHead>NEXT AVAILABLE</TableHead>
              <TableHead>ACTIONS</TableHead>
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
                      <div className="font-semibold md:text-lg">
                        {doctor.firstName} {doctor.lastName}
                      </div>
                      <div className="text-sm">
                        {doctor.specialization}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold md:text-md">{doctor.email}</div>
                </TableCell>
                <TableCell>
                  <div>{doctor.specialization}</div>
                </TableCell>
                <TableCell>
                  <div>PLACEHOLDER</div>
                </TableCell>
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
