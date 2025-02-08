"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CancelAppointmentDialog from "./CancelAppointmentDialog";
import { AppointmentWithRelations } from "@/utils/supabase/actions/appointmentActions";

export default function Appointments({ appointments } : { appointments: AppointmentWithRelations[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "all") return true;
    return appointment.status.toLowerCase() === activeTab.toLowerCase();
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500 px-4 py-2 rounded-full hover:bg-green-700/10 hover:text-green-700";
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-700/10 hover:text-blue-700";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-700/10 hover:text-yellow-700";
      default:
        return "bg-gray-500/10 text-gray-500 px-4 py-2 rounded-full";
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1); 
  };

  return (
    <div className="py-2 flex flex-col">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between mb-4">
        <Tabs defaultValue="all" className="" onValueChange={handleTabChange}>
          <TabsList className="flex text-sm md:text-md space-x-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>PATIENT</TableHead>
            <TableHead>DOCTOR</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 md:w-16 md:h-16">
                    <AvatarImage
                      src={appointment.patient.profile_picture}
                      alt={`${appointment.patient.first_name} ${appointment.patient.last_name}`}
                      className="object-cover bg-primary"
                    />
                    <AvatarFallback>
                      {appointment.patient.first_name[0]}
                      {appointment.patient.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold md:text-lg">
                      {appointment.patient.first_name} {appointment.patient.last_name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 md:w-16 md:h-16">
                    <AvatarImage
                      src={appointment.doctor.profile_picture}
                      alt={`Dr. ${appointment.doctor.first_name} ${appointment.doctor.last_name}`}
                      className="object-cover bg-primary"
                    />
                    <AvatarFallback>
                      {appointment.doctor.first_name[0]}
                      {appointment.doctor.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold md:text-lg">
                      {appointment.doctor.first_name} {appointment.doctor.last_name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.doctor.specialization}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-md font-semibold">
                  {new Date(appointment.date).toLocaleDateString("en-EN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                        >
                          <CancelAppointmentDialog doctorFirstName={appointment.doctor.first_name} doctorLastName={appointment.doctor.last_name} appointmentId={appointment.id} appointmentDate={appointment.date} appointmentStatus={appointment.status} />
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Pagination className="mt-4 flex">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(number);
                }}
                isActive={currentPage === number}
                className={
                  currentPage === number
                    ? "bg-secondary text-white dark:text-black pointer-events-none"
                    : ""
                }
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}