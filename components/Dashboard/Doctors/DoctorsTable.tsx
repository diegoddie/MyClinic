"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Doctor, Patient, User } from "@/utils/supabase/types";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteDoctorDialog from "./DeleteDoctorDialog";
import { isAdmin } from "@/utils/getRole";
import { BookAppointment } from "./BookAppointment";

export default function DoctorsTable({
  doctors,
  user
}: {
  doctors: Doctor[];
  user: Patient | User
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const userIsAdmin = isAdmin(user) === true;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  // Get current doctors
  const indexOfLastDoctor = currentPage * itemsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - itemsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>CONTACT</TableHead>
              <TableHead>SPECIALIZATION</TableHead>
              <TableHead>CALENDAR</TableHead>
              {userIsAdmin && <TableHead>ACTIONS</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14 md:w-16 md:h-16">
                      <AvatarImage
                        src={doctor.profile_picture ?? undefined}
                        alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
                        className="object-cover bg-primary"
                      />
                      <AvatarFallback>
                        {doctor.first_name[0]}
                        {doctor.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold md:text-lg">
                        {doctor.first_name} {doctor.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {doctor.specialization}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold md:text-md">{doctor.email}</div>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground">
                    {doctor.specialization}
                  </div>
                </TableCell>
                <TableCell>
                  
                  <BookAppointment doctor={doctor} user={user} />
                  
                </TableCell>
                {userIsAdmin && (
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
                            <DeleteDoctorDialog doctorId={doctor.id} />
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Pagination className="flex mt-4">
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

          {pageNumbers.map((number) => (
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
    </>
  );
}
