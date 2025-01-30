"use server"

import { isAdmin } from "@/utils/getRole";
import { revalidatePath } from "next/cache";
import { getAuth, getUser } from "./authActions";
import { createAdminClient } from "../adminServer";
import getURL from "@/utils/getURL";

export async function sendDoctorMagicLink(
  email: string,
  metadata: {
    firstName: string;
    lastName: string;
    specialization: string;
    phoneNumber: string;
    profilePicture?: File;
  }
) {
  const supabase = await createAdminClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isAdmin(userData)) {
    console.error("User is not an admin");
    return new Error("User is not an admin");
  }

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

export async function deleteDoctor(id: string) {
  const supabase = await createAdminClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isAdmin(userData)) {
    console.error("User is not an admin");
    return new Error("User is not an admin");
  }

  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    console.error("Error deleting doctor from auth:", error);
    return error;
  }

  revalidatePath("/dashboard/doctors");
}
