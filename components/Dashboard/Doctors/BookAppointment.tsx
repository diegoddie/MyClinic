"use client";

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
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { getDoctorAvailability } from "@/utils/supabase/actions/doctorActions";
import { Doctor, Patient, User } from "@/utils/supabase/types";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { bookAppointment } from "@/utils/supabase/actions/appointmentActions";
import { redirect } from "next/navigation";

export function BookAppointment({
  doctor,
  user,
}: {
  doctor: Doctor;
  user: Patient | User;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
    setAvailableSlots([]);

    if (date) {
      setIsLoading(true); // Inizia il caricamento
      const slots = await getDoctorAvailability(doctor.id, date);
      setIsLoading(false); // Fine caricamento

      if (Array.isArray(slots)) {
        // Se è un array di stringhe, imposta gli slot disponibili
        setAvailableSlots(slots);
      } else if (slots.error) {
        console.error(slots.error); // Log dell'errore
        setAvailableSlots([]); // Pulisce gli slot disponibili in caso di errore
      }
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;
    setIsLoading(true); // Inizio del caricamento

    const appointmentDate = new Date(selectedDate);

    const [hours, minutes] = selectedTime.split(":").map(Number);
    appointmentDate.setHours(hours, minutes, 0, 0);

    const result = await bookAppointment(
      user.id,
      doctor,
      appointmentDate.toISOString()
    );

    // Se result è un'istanza di Error
    if (result.error) {
      toast({
        title: "Something went wrong",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: "You have successfully booked an appointment.",
      variant: "success",
    });

    setIsLoading(false);

    setSelectedDate(undefined);
    setSelectedTime(undefined);

    redirect("/appointments");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
          <CalendarIcon />
          <span>Availability</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-[#09090b] text-black dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">
            See availability and book your visit
          </AlertDialogTitle>
          <AlertDialogDescription>
            Select a date and time for your appointment with Dr.{" "}
            {doctor.first_name} {doctor.last_name}. Please note that once you
            book your appointment, it will be marked as &lsquo;pending&rsquo;
            until confirmed. You will receive an email notification once your
            appointment is confirmed.
          </AlertDialogDescription>

          <div className="flex flex-row items-center space-x-5 py-12">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
            />
            {selectedDate && (
              <div className="grid grid-cols-2 gap-3 w-full">
                {isLoading ? (
                  <div className="flex justify-center items-center col-span-2">
                    <Spinner className="h-6 w-6 text-primary" />
                  </div>
                ) : availableSlots.length > 0 ? (
                  availableSlots.map((time) => (
                    <Button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "bg-secondary hover:bg-secondary/80 px-4 py-3 ",
                        selectedTime === time &&
                          "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      {time}
                    </Button>
                  ))
                ) : (
                  <div className="col-span-2 text-center text-gray-500 dark:text-gray-400">
                    No available slots for this date
                  </div>
                )}
              </div>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-secondary dark:text-black text-white dark:font-semibold"
            onClick={handleBooking}
            disabled={isLoading || !selectedDate || !selectedTime}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner className="h-5 w-5 text-primary" />
              </div>
            ) : (
              "Book Appointment"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
