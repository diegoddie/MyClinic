import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateDoctorForm from "@/components/Form/CreateDoctorForm";
import { getAuth, getUser } from "@/utils/supabase/actions/getUser";
import DoctorsTable from "@/components/Dashboard/Doctors/DoctorsTable";
import { getDoctors } from "./actions";
import { isDoctor, isAdmin } from "@/utils/getRole";

export default async function Doctors() {
  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  const doctorsResponse = await getDoctors();
  const doctors = Array.isArray(doctorsResponse) ? doctorsResponse : [];

  return (
    <div className="py-2 flex flex-col">
      {!isDoctor(userData) ? (
        <>
          <div className="flex items-center justify-center md:justify-end mb-6 gap-4">
            <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
              <Menu className="h-4 w-4" />
              Filters
            </Button>

            {isAdmin(userData) && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-secondary dark:text-black text-white dark:font-semibold gap-2">
                    <Plus className="h-4 w-4" />
                    Add Doctor
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white dark:bg-[#09090b] dark:text-white text-black h-fit">
                  <SheetTitle className="dark:text-white">
                    Add a new doctor
                  </SheetTitle>
                  <CreateDoctorForm />
                </SheetContent>
              </Sheet>
            )}
          </div>

          {doctors.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                No doctors
              </h2>
            </div>
          ) : (
            <DoctorsTable doctors={doctors} isAdmin={isAdmin(userData)} />
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-10">
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            You are not authorized to view this page
          </h2>
        </div>
      )}
    </div>
  );
}