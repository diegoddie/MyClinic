'use server'

import { ProfileFormValues } from "@/lib/schemas/settingsSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUser(data: ProfileFormValues, id: string) {
  const supabase = await createClient();

  const formattedDate = data.birthDate
    ? data.birthDate.split("/").reverse().join("-")
    : null;

  const { error } = await supabase
    .from("users")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      tax_id: data.taxId,
      birth_date: formattedDate,
      phone_number: data.phoneNumber,
    })
    .eq("id", id);
    

  if (error){
    console.error("Update user error:", error);
    return error;
  }

  revalidatePath('/dashboard/settings');
redirect('/dashboard');
}
