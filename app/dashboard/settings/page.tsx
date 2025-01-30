import UpdateDoctorForm from "@/components/Form/UpdateDoctorForm";
import { UpdatePatientForm } from "@/components/Form/UpdatePatientForm";
import { isDoctor, isPatient } from "@/utils/getRole";
import { getAuth, getUser } from "@/utils/supabase/actions/authActions";

export default async function Settings() {
  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id ? await getUser({ id: authenticatedUser.id }) : null;

  return (
    <div className="py-2">
      <div className="justify-center flex flex-col md:flex-row">
        {isDoctor(userData) ? (
          <UpdateDoctorForm doctor={userData} />
        ) : isPatient(userData) ? (
          <UpdatePatientForm patient={userData} />
        ) : (
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Page not available for an admin
          </h2>
        )}
      </div>
    </div>
  );
}
