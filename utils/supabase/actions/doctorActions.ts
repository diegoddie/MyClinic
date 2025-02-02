"use server"

import { isDoctor } from "@/utils/getRole";
import { revalidatePath } from "next/cache";
import { getAuth, getUser } from "./authActions";
import { createClient } from "../server";
import { DoctorFormValues } from "@/lib/schemas/doctorSchema";

export async function getDoctors() {
  const supabase = await createClient();

  const authenticatedUser = await getAuth();

  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return new Error("Auth session missing!");
  }
  
  const userData = authenticatedUser?.id ? await getUser({ id: authenticatedUser.id }) : null;

  if(!userData) {
    console.error("User not found");
    return new Error("User not found");
  }

  const { data, error } = await supabase.from("doctors").select("*");

  if (error) {
    console.error("Error fetching doctors:", error);
    return error;
  }

  return data;
}

export async function updateDoctor(
  data: DoctorFormValues,
  id: string,
  avatar?: File
) {
  const supabase = await createClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isDoctor(userData)) {
    console.error("User is not a doctor");
    return { data: null, error: new Error("User is not a doctor") }; 
  }

  let avatarUrl: string | null = null;

  if (avatar) {
    const filePath = `doctor/${data.email}/${Date.now()}_${avatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, avatar);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return { data: null, error: uploadError };
    }

    // Ottenere l'URL pubblico dell'avatar
    const { data: publicUrlData } = supabase.storage
      .from("avatar")
      .getPublicUrl(filePath);
    if (publicUrlData?.publicUrl) {
      avatarUrl = publicUrlData.publicUrl;
    } else {
      console.error("Error retrieving public URL for avatar");
      return { data: null, error: new Error("Unable to retrieve public URL for avatar") };
    }
  }

  const { data: updatedDoctor, error } = await supabase
    .from("doctors")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      specialization: data.specialization,
      profile_picture: avatarUrl || data.profilePicture, // Mantieni il vecchio avatar se non ne è stato caricato uno nuovo
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating doctor:", error);
    return { data: null, error };
  }

  revalidatePath("/dashboard/doctors");
  return { data: updatedDoctor, error: null };
}
