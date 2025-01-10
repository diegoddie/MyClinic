"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import visits from "@/lib/exampleVisits"

export function PendingAppointments() {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 2
  
    const pendingVisits = visits.filter((visit) => visit.status.toLowerCase() === "pending")
    const totalPages = Math.ceil(pendingVisits.length / itemsPerPage)
    const indexOfLastAppointment = currentPage * itemsPerPage
    const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage
    const currentAppointments = pendingVisits.slice(indexOfFirstAppointment, indexOfLastAppointment)
  
    const handleApprove = (id: number) => {
      console.log(`Appointment ${id} approved`)
      // Backend update logic
    }
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page)
    }
  
    return (
      <Card className="flex-1">
        <CardHeader>
          <Link href="/dashboard/visits">
            <CardTitle className="hover:underline cursor-pointer text-lg font-bold">
              Pending Appointments
            </CardTitle>
          </Link>
        </CardHeader>
        <CardContent>
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
              {currentAppointments.map((visit) => (
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
                    <Button 
                        type="submit" 
                        onClick={() => handleApprove(visit.id)} 
                        className="bg-secondary dark:text-black text-white dark:font-semibold gap-2"
                    >
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4 flex">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <PaginationItem key={number}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(number)
                    }}
                    isActive={currentPage === number}
                    className={currentPage === number ? "bg-secondary text-white" : ""}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  }

