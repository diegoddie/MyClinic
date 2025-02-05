import UpdateDoctorForm from "@/components/Form/UpdateDoctorForm";
import { UpdatePatientForm } from "@/components/Form/UpdatePatientForm";
import { isDoctor, isPatient } from "@/utils/getRole";
import { fetchUser } from "@/utils/supabase/actions/authActions";
import { redirect } from "next/navigation";

export default async function Settings() {
  const user = await fetchUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="py-2">
      <div className="justify-center flex flex-col md:flex-row">
        {isDoctor(user) ? (
          <UpdateDoctorForm doctor={user} />
        ) : isPatient(user) ? (
          <UpdatePatientForm patient={user} />
        ) : (
          null
        )}
      </div>
    </div>
  );
}
