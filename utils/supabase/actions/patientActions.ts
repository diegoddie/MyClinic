"use server";

import { PatientFormValues } from "@/lib/schemas/patientSchema";
import { isPatient } from "@/utils/getRole";

import { createClient } from "@/utils/supabase/server";
import { Patient } from "@/utils/supabase/types";
import { revalidatePath } from "next/cache";
import { getAuth, getUser } from "./authActions";

export async function updatePatient(data: PatientFormValues, user: Patient, avatar?: File): Promise<{ data?: Patient; error?: string }> {
  const supabase = await createClient();

  const authenticatedUser = await getAuth();
  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id ? await getUser({ id: authenticatedUser.id }) : null;
    
  if (!isPatient(userData)) {
    console.error("User is not a patient");
    return { error: "User is not a patient" };
  }

  let avatarUrl: string | null = null;

  // Caricare l'avatar se presente
  if (avatar) {
    const filePath = `user/${user.email}/${Date.now()}_${avatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, avatar);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return { error: "Error uploading avatar" };
    }

    // Ottenere l'URL pubblico dell'avatar
    const { data: publicUrlData } = supabase.storage.from("avatar").getPublicUrl(filePath);
    if (publicUrlData?.publicUrl) {
      avatarUrl = publicUrlData.publicUrl;
    } else {
      console.error("Error retrieving public URL for avatar");
      return { error: "Unable to retrieve public URL for avatar" };
    }
  }

  // Aggiornare i dati dell'utente
  const { data: updatedPatient, error } = await supabase
    .from("patients")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      tax_id: data.taxId,
      birth_date: data.birthDate,
      phone_number: data.phoneNumber,
      profile_picture: avatarUrl || data.profilePicture,
    })
    .eq("id", user.id)
    .select()
    .single()

    if (error) {
      console.error("Update user error:", error);
      return { error: "Error updating doctor" };
    }
  
    revalidatePath("/settings");
  
    return { data: updatedPatient as Patient };
}