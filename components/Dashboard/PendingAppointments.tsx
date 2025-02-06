"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { AppointmentWithRelations } from "@/utils/supabase/actions/appointmentActions";
import { useToast } from "@/hooks/use-toast";
import { approveAppointment, declineAppointment } from "@/utils/supabase/actions/adminActions";

export function PendingAppointments({
  pendingAppointments,
}: {
  pendingAppointments: AppointmentWithRelations[];
}) {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(pendingAppointments.length / itemsPerPage);
  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;

  const currentAppointments = pendingAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  

  const onDecline = async ({ appointment }: { appointment: AppointmentWithRelations }) => {
    // Delete doctor
    console.log(appointment)
    const error = await declineAppointment(
      appointment
    );
    if (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Appointment Declined",
        description: "You have successfully declined the appointment.",
        variant: "success",
      });
    }
  };

  const onApprove = async ({ appointment }: { appointment: AppointmentWithRelations }) => {
    // Delete doctor
    const error = await approveAppointment(
      appointment
    );
    if (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Appointment Approved",
        description: "You have successfully approved the appointment.",
        variant: "success",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <Link href="/dashboard/visits">
          <CardTitle className="hover:underline cursor-pointer text-lg font-bold">
            Pending Appointments
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PATIENT</TableHead>
                <TableHead>DOCTOR</TableHead>
                <TableHead>DATE</TableHead>
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
                          {appointment.patient.first_name}{" "}
                          {appointment.patient.last_name}
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
                          {appointment.doctor.first_name}{" "}
                          {appointment.doctor.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appointment.doctor.specialization}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-md md:text-lg mfont-semibold">
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
                    <div className=" flex flex-row gap-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
                            Approve
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onApprove({ appointment })}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className="bg-red-500 dark:text-black text-white dark:font-semibold gap-2">
                            Decline
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDecline({ appointment })}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
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
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
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
      </CardContent>
    </Card>
  );
}
