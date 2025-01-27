"use server";

import { DoctorFormValues } from "@/lib/schemas/doctorSchema";
import getURL from "@/utils/getURL";
import { createAdminClient } from "@/utils/supabase/adminServer";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendDoctorMagicLink(email: string, metadata: {
  firstName: string;
  lastName: string;
  specialization: string;
  phoneNumber: string;
  profilePicture?: File;
}) {
  const supabase = await createAdminClient();

  let avatarUrl: string | undefined = undefined;

  // Gestione dell'avatar
  if (metadata.profilePicture) {
    const avatarFile = metadata.profilePicture;
    const filePath = `doctor/${email}/${Date.now()}_${avatarFile.name}`;

    // Carica l'immagine su Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, avatarFile);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return new Error("Failed to upload avatar.");
    }

    // Ottieni l'URL pubblico dell'immagine
    const { data: publicUrlData } = supabase.storage
      .from("avatar")
      .getPublicUrl(filePath);

    if (publicUrlData?.publicUrl) {
      avatarUrl = publicUrlData.publicUrl;
    } else {
      console.error("Error retrieving public URL for avatar");
      return new Error("Unable to retrieve public URL for avatar.");
    }
  }
  // Invia il magic link con i metadati e l'avatar
  const { error: magicLinkError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: getURL(),
      data: {
        role: "doctor",
        first_name: metadata.firstName,
        last_name: metadata.lastName,
        specialization: metadata.specialization,
        phone_number: metadata.phoneNumber,
        profile_picture: avatarUrl,
      },
    },
  });

  if (magicLinkError) {
    console.error("Error sending magic link:", magicLinkError);
    return new Error("Error sending magic link.");
  }

  revalidatePath("/dashboard/doctors");
}

export async function updateDoctor(
  data: DoctorFormValues,
  id: string,
  avatar?: File
) {
  const supabase = await createClient();
  let avatarUrl: string | null = null;

  if (avatar) {
    const filePath = `doctor/${data.email}/${Date.now()}_${avatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, avatar);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return uploadError;
    }

    // Ottenere l'URL pubblico dell'avatar
    const { data: publicUrlData } = supabase.storage
      .from("avatar")
      .getPublicUrl(filePath);
    if (publicUrlData?.publicUrl) {
      avatarUrl = publicUrlData.publicUrl;
    } else {
      console.error("Error retrieving public URL for avatar");
      return new Error("Unable to retrieve public URL for avatar");
    }
  }

  const { error } = await supabase
    .from("doctors")
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      specialization: data.specialization,
      profile_picture: avatarUrl || data.profilePicture, // Mantieni il vecchio avatar se non ne è stato caricato uno nuovo
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating doctor:", error);
    return error;
  }

  revalidatePath("/dashboard/doctors");
}

export async function getDoctors() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("doctors").select("*");

  if (error) {
    console.error("Error fetching doctors:", error);
    return error;
  }

  return data;
}

export async function deleteDoctor(id: string) {
  const supabase = await createAdminClient();

  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    console.error("Error deleting doctor from auth:", error);
    return error;
  }

  revalidatePath("/dashboard/doctors");
}
