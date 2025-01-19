"use server";

import { ProfileFormValues } from "@/lib/schemas/settingsSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUser(data: ProfileFormValues, id: string, avatar?: File) {
  const supabase = await createClient();
    console.log(avatar)
  // Caricare l'avatar se presente
  let avatarPath: string | null = null;
  if (avatar) {
    const filePath = `users/${Date.now()}_${avatar.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, avatar);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return uploadError;
    }

    avatarPath = uploadData?.path;
  }

  // Aggiornare i dati dell'utente
  const { error } = await supabase
    .from("users")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      tax_id: data.taxId,
      birth_date: data.birthDate,
      phone_number: data.phoneNumber,
      profile_picture: avatarPath || data.profilePicture, // Aggiorna solo se l'avatar è caricato
    })
    .eq("id", id);

  if (error) {
    console.error("Update user error:", error);
    return error;
  }

  revalidatePath("/dashboard/settings");
}
