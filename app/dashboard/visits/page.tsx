'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Menu, MoreVertical } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import visits from "@/lib/exampleVisits"

export default function Visits() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredVisits = visits.filter((visit) => {
    if (activeTab === "all") return true
    return visit.status.toLowerCase() === activeTab.toLowerCase()
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500 px-4 py-2 rounded-full hover:bg-green-700/10 hover:text-green-700"
      case "confirmed":
        return "bg-blue-500/10 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-700/10 hover:text-blue-700"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-700/10 hover:text-yellow-700"
      default:
        return "bg-gray-500/10 text-gray-500 px-4 py-2 rounded-full"
    }
  }

  return (
    <div className="py-2">
      <Card className="py-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <Tabs defaultValue="all" className="" onValueChange={setActiveTab}>
            <TabsList className="flex space-x-4 bg-secondary dark:text-black text-white">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Confirmed</TabsTrigger>
              <TabsTrigger value="confirmed">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2 ml-4">
            <Menu className="h-4 w-4" />
            Filters
          </Button>
        </div>

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
            {filteredVisits.map((visit) => (
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
                    {new Date(visit.date).toLocaleDateString('en-EN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
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
      </Card>
    </div>
  )
}

