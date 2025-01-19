
import { UpdateUserForm } from "@/components/Form/UpdateUserForm";
import { getAuth, getUser } from "@/utils/supabase/actions/getUser";

export default async function Settings() {
  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id ? await getUser({ id: authenticatedUser.id }) : null;

  return (
    <div className="py-2">
      <div className="justify-center flex flex-col md:flex-row">
        {userData && <UpdateUserForm user={userData} />}
      </div>
    </div>
  );
}