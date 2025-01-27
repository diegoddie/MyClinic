"use server";

import { DoctorFormValues } from "@/lib/schemas/doctorSchema";
import { PatientFormValues } from "@/lib/schemas/patientSchema";
import { createClient } from "@/utils/supabase/server";
import { Doctor, Patient } from "@/utils/supabase/types";
import { revalidatePath } from "next/cache";

export async function updatePatient(data: PatientFormValues, user: Patient, avatar?: File) {
  const supabase = await createClient();
  let avatarUrl: string | null = null;

  // Caricare l'avatar se presente
  if (avatar) {
    const filePath = `user/${user.email}/${Date.now()}_${avatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, avatar);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return uploadError;
    }

    // Ottenere l'URL pubblico dell'avatar
    const { data: publicUrlData } = supabase.storage.from("avatar").getPublicUrl(filePath);
    if (publicUrlData?.publicUrl) {
      avatarUrl = publicUrlData.publicUrl;
    } else {
      console.error("Error retrieving public URL for avatar");
      return new Error("Unable to retrieve public URL for avatar");
    }
  }

  // Aggiornare i dati dell'utente
  const { error } = await supabase
    .from("patients")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      tax_id: data.taxId,
      birth_date: data.birthDate,
      phone_number: data.phoneNumber,
      profile_picture: avatarUrl || data.profilePicture,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Update user error:", error);
    return error;
  }

  revalidatePath("/dashboard/settings");
}

export async function updateDoctor(data: DoctorFormValues, user: Doctor, avatar?: File) {
  const supabase = await createClient();
  let avatarUrl: string | null = null;

  // Caricare l'avatar se presente
  if (avatar) {
    const filePath = `doctor/${user.email}/${Date.now()}_${avatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, avatar);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return uploadError;
    }

    // Ottenere l'URL pubblico dell'avatar
    const { data: publicUrlData } = supabase.storage.from("avatar").getPublicUrl(filePath);
    if (publicUrlData?.publicUrl) {
      avatarUrl = publicUrlData.publicUrl;
    } else {
      console.error("Error retrieving public URL for avatar");
      return new Error("Unable to retrieve public URL for avatar");
    }
  }

  // Aggiornare i dati dell'utente
  const { error } = await supabase
    .from("doctors")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      specialization: data.specialization,
      phone_number: data.phoneNumber,
      profile_picture: avatarUrl || data.profilePicture,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Update user error:", error);
    return error;
  }

  revalidatePath("/dashboard/settings");
}