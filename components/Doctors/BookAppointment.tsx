"use client";


import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { getDoctorAvailability } from "@/utils/supabase/actions/doctorActions";
import { Doctor } from "@/utils/supabase/types";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { bookAppointment } from "@/utils/supabase/actions/appointmentActions";
import { redirect } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function BookAppointment({
  doctor,
}: {
  doctor: Doctor;
}) {
  const queryClient = useQueryClient();
  const {
    data: user
  } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  if(!user){
    redirect('/login');
  }
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  const mutation = useMutation({
    mutationFn: async ({ selectedDate, selectedTime }: { selectedDate: string; selectedTime: string }) => {
      if (!selectedDate || !selectedTime) throw new Error("Date and time are required");

      const appointmentDate = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      appointmentDate.setHours(hours, minutes, 0, 0);

      const result = await bookAppointment(user.id, doctor, appointmentDate.toISOString());
      if (result.error) {
        throw new Error(result.error); 
      }
  
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked",
        description: "You have successfully booked an appointment.",
        variant: "success",
      });
      setIsOpen(false);
      queryClient.refetchQueries({ queryKey: ["appointments"] });
      setTimeout(() => {
        redirect("/appointments");
      }, 500); 
    },
    onError: (e) => {
      toast({
        title: "Something went wrong",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  async function handleBooking(selectedDate: string, selectedTime: string) {
    mutation.mutate({ selectedDate, selectedTime });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
          <CalendarIcon />
          <span>Availability</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#09090b] text-black dark:text-white">
        <DialogHeader>
          <DialogTitle className="font-bold">
            See availability and book your visit
          </DialogTitle>
          <DialogDescription>
            Select a date and time for your appointment with Dr.{" "}
            {doctor.first_name} {doctor.last_name}. Please note that once you
            book your appointment, it will be marked as &lsquo;pending&rsquo;
            until confirmed. You will receive an email notification once your
            appointment is confirmed.
          </DialogDescription>

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
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-secondary dark:text-black text-white dark:font-semibold"
            onClick={() => {
              if (selectedDate && selectedTime) {
                handleBooking(selectedDate.toISOString(), selectedTime);
              }
            }}
            disabled={mutation.isPending || !selectedDate || !selectedTime}
          >
            {mutation.isPending ? (
              <div className="flex items-center justify-center">
                <Spinner className="h-5 w-5 text-primary" />
              </div>
            ) : (
              "Book Appointment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
