"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, MoreVertical, Plus } from "lucide-react";
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
import doctors from "@/lib/landingPageData/doctors";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Doctors() {
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="py-2 flex flex-col">
      <div className="flex items-center justify-center md:justify-end mb-6 gap-4">
        <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
          <Menu className="h-4 w-4" />
          Filters
        </Button>
        <Button
          type="submit"
          className="bg-secondary dark:text-black text-white dark:font-semibold gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Doctor
        </Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
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
            {currentDoctors.map((doctor) => (
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
                        {doctor.firstName[0]}
                        {doctor.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold md:text-lg">
                        {doctor.firstName} {doctor.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {doctor.specialization}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold md:text-md">
                    {doctor.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground">
                    {doctor.specialization}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground">PLACEHOLDER</div>
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
                  currentPage === number ? "bg-secondary text-white dark:text-black pointer-events-none" : ""
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
