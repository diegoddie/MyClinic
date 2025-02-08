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
  } from "@/components/ui/alert-dialog"
  import { useToast } from "@/hooks/use-toast";
import { deleteAppointment } from "@/utils/supabase/actions/appointmentActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { Trash2 } from "lucide-react";
  
  export default function CancelAppointmentDialog({ doctorFirstName, doctorLastName, appointmentId, appointmentDate, appointmentStatus }: { doctorFirstName: string, doctorLastName: string, appointmentId: string, appointmentDate: string, appointmentStatus: string }) {
    const queryClient = useQueryClient();  
    const { toast } = useToast();

    const mutation = useMutation({
      mutationFn: async () => {
        const result = await deleteAppointment(doctorFirstName, doctorLastName, appointmentId, appointmentDate, appointmentStatus);
        if (result && result.error) {
          throw new Error(result.error);
        }
        return result
      },
      onSuccess: () => {
        toast({
          title: "Doctor Deleted",
          description: "You have successfully canceled your visit.",
          variant: "success",
       });
        queryClient.refetchQueries({ queryKey: ["appointments"] });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
      },
    });
  
    async function onDelete() {
      mutation.mutate();
    }
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex flex-row space-x-2 items-center justify-center cursor-pointer">
          <Trash2 className="w-4 h-4" />
          <span>Cancel VIsit</span>
          </div>
          
        </AlertDialogTrigger>
        <AlertDialogContent className="dark:bg-[#09090b] text-black dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="">
              This action cannot be undone. 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-secondary dark:text-black text-white dark:font-semibold">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  