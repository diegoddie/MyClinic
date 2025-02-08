import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { deleteDoctor } from "@/utils/supabase/actions/adminActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteDoctorDialog({ doctorId }: { doctorId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await deleteDoctor(doctorId);
      if (result && result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Doctor Deleted",
        description: "You have successfully deleted the doctor",
        variant: "success",
      });
      queryClient.refetchQueries({ queryKey: ["doctors"] });
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-row space-x-2 items-center justify-center cursor-pointer">
          <Trash2 className="w-4 h-4" />
          <span>Delete Doctor</span>
        </div>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#09090b] text-black dark:text-white">
        <DialogHeader>
          <DialogTitle className="font-bold">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="">
            This action cannot be undone. This will permanently delete the
            doctor and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onDelete}
            className="bg-secondary dark:text-black text-white dark:font-semibold"
          >
            {mutation.isPending ? (
              <div className="flex items-center justify-center">
                <Spinner className="h-5 w-5 text-primary" />
              </div>
            ) : (
              "Delete Doctor"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
