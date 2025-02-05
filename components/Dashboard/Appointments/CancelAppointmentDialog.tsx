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
  import { Trash2 } from "lucide-react";
  
  export default function CancelAppointmentDialog({ doctorFirstName, doctorLastName, appointmentId, appointmentDate, appointmentStatus }: { doctorFirstName: string, doctorLastName: string, appointmentId: string, appointmentDate: string, appointmentStatus: string }) {
      const { toast } = useToast();
  
      const onDelete = async () => {
          // Delete doctor
          const error = await deleteAppointment(doctorFirstName, doctorLastName, appointmentId, appointmentDate, appointmentStatus);
          if (error) {
              toast({
                  title: "Error",
                  description: "An error occurred. Please try again.",
                  variant: "destructive",
              });
          } else {
              toast({
                  title: "Doctor Deleted",
                  description: "You have successfully canceled your visit.",
                  variant: "success",
              });
          }
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
  
  