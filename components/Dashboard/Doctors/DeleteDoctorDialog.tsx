import { deleteDoctor } from "@/app/dashboard/doctors/actions";
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
import { Trash2 } from "lucide-react";

export default function DeleteDoctorDialog({ doctorId }: { doctorId: string }) {
    const { toast } = useToast();

    const onDelete = async () => {
        // Delete doctor
        const error = await deleteDoctor(doctorId);
        if (error) {
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Doctor Deleted",
                description: "You have successfully deleted the doctor",
                variant: "success",
            });
        }
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex flex-row space-x-2 items-center justify-center cursor-pointer">
        <Trash2 className="w-4 h-4" />
        <span>Delete Doctor</span>
        </div>
        
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-[#09090b] text-black dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="">
            This action cannot be undone. This will permanently delete the doctor and remove their data from our
            servers.
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

