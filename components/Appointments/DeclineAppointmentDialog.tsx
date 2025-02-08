import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { declineAppointment } from "@/utils/supabase/actions/adminActions";
import { AppointmentWithRelations } from "@/utils/supabase/actions/appointmentActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function DeclineAppointmentDialog({
  appointment,
}: {
  appointment: AppointmentWithRelations;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (appointment: AppointmentWithRelations) => {
      const result = await declineAppointment(appointment);
      if (result && result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Appointment Declined",
        description: "You have successfully declined the appointment.",
        variant: "success",
      });
      queryClient.refetchQueries({ queryKey: ["appointments"] });
    },
    onError: (e) => {
      toast({
        title: "Something went wrong",
        description: e.message,
        variant: "destructive",
      });
    },
  });

  const onDecline = async ({
    appointment,
  }: {
    appointment: AppointmentWithRelations;
  }) => {
    mutation.mutate(appointment); // Use the mutate function to decline the appointment
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 dark:text-black text-white dark:font-semibold gap-2">
          Decline
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => onDecline({ appointment })}
            className="bg-secondary dark:text-black text-white dark:font-semibold"
          >
            {mutation.isPending ? (
              <div className="flex items-center justify-center">
                <Spinner className="h-5 w-5 text-primary" />
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeclineAppointmentDialog;
