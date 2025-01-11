"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, MoreVertical } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import visits from "@/lib/exampleVisits";

export default function Visits() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const filteredVisits = visits.filter((visit) => {
    if (activeTab === "all") return true;
    return visit.status.toLowerCase() === activeTab.toLowerCase();
  });

  const totalPages = Math.ceil(filteredVisits.length / itemsPerPage);
  const indexOfLastVisit = currentPage * itemsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - itemsPerPage;
  const currentVisits = filteredVisits.slice(
    indexOfFirstVisit,
    indexOfLastVisit
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
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  return (
    <div className="py-2 flex flex-col">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between mb-4">
        <Tabs defaultValue="all" className="" onValueChange={handleTabChange}>
          <TabsList className="flex space-x-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2 ml-4">
          <Menu className="h-4 w-4" />
          Filters
        </Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
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
          {currentVisits.map((visit) => (
            <TableRow key={visit.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 md:w-16 md:h-16">
                    <AvatarImage
                      src={visit.patient.image}
                      alt={`${visit.patient.firstName} ${visit.patient.lastName}`}
                      className="object-cover bg-primary"
                    />
                    <AvatarFallback>
                      {visit.patient.firstName[0]}
                      {visit.patient.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold md:text-lg">
                      {visit.patient.firstName} {visit.patient.lastName}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 md:w-16 md:h-16">
                    <AvatarImage
                      src={visit.doctor.image}
                      alt={`Dr. ${visit.doctor.firstName} ${visit.doctor.lastName}`}
                      className="object-cover bg-primary"
                    />
                    <AvatarFallback>
                      {visit.doctor.firstName[0]}
                      {visit.doctor.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold md:text-lg">
                      {visit.doctor.firstName} {visit.doctor.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {visit.doctor.specialization}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-md font-semibold">
                  {new Date(visit.date).toLocaleDateString("en-EN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(visit.status)}`}>
                  {visit.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
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
                    ? "bg-secondary text-white dark:text-black"
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
