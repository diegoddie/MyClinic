"use server";

import { isAdmin } from "@/utils/getRole";
import { revalidatePath } from "next/cache";
import { getAuth, getUser } from "./authActions";
import { createAdminClient } from "../adminServer";
import getURL from "@/utils/getURL";
import { AppointmentWithRelations } from "./appointmentActions";

export async function sendDoctorMagicLink(
  email: string,
  metadata: {
    firstName: string;
    lastName: string;
    specialization: string;
    phoneNumber: string;
    profilePicture?: File;
  }
): Promise<{ error?: string } | void> {
  const supabase = await createAdminClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isAdmin(userData)) {
    console.error("User is not an admin");
    return { error: "User is not an admin" };
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
      return { error: "Failed to upload avatar." };
    }

    // Ottieni l'URL pubblico dell'immagine
    const { data: publicUrlData } = supabase.storage
      .from("avatar")
      .getPublicUrl(filePath);

    if (publicUrlData?.publicUrl) {
      avatarUrl = publicUrlData.publicUrl;
    } else {
      console.error("Error retrieving public URL for avatar");
      return { error: "Unable to retrieve public URL for avatar." };
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
    return { error: "Error sending magic link." };
  }

  revalidatePath("/dashboard/doctors");
}

export async function deleteDoctor(
  id: string
): Promise<{ error?: string } | void> {
  const supabase = await createAdminClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isAdmin(userData)) {
    console.error("User is not an admin");
    return { error: "User is not an admin" };
  }

  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    console.error("Error deleting doctor from auth:", error);
    return { error: "Error deleting doctor." };
  }

  revalidatePath("/dashboard/doctors");
}

export async function getAppointments(
  page: number = 1,
  pageSize: number = 10,
  filters?: { status?: string; doctorId?: string; patientId?: string, startDate?: Date, endDate?: Date },
): Promise<{
  data?: AppointmentWithRelations[];
  error?: string;
  total?: number | null;
}> {
  const supabase = await createAdminClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isAdmin(userData)) {
    console.error("User is not an admin");
    return { error: "User is not an admin" };
  }

  let query = supabase
    .from("appointments")
    .select(
      `*,
      patient:patient_id (
        id,
        first_name,
        last_name,
        profile_picture
      ),
      doctor:doctor_id (
        id,
        first_name,
        last_name,
        profile_picture,
        specialization
      )`,
      {count: "exact"}
    );

    if (filters?.startDate) {
      query = query.gte("date", filters.startDate.toISOString());
    }
    if (filters?.endDate) {
      query = query.lte("date", filters.endDate.toISOString());
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.doctorId) {
      query = query.eq("doctor_id", filters.doctorId);
    }
    if (filters?.patientId) {
      query = query.eq("patient_id", filters.patientId);
    }

    const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, count, error } = await query
    .order("date", { ascending: true })
    .range(start, end);

  if (error) {
    console.error("Error fetching appointments:", error);
    return { error: "Error fetching appointments" };
  }

  return { data: data as AppointmentWithRelations[], total: count };
}

export async function getPendingAppointments(): Promise<{
  data?: AppointmentWithRelations[];
  error?: string;
  count?: number;
}> {
  const supabase = await createAdminClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isAdmin(userData)) {
    console.error("User is not an admin");
    return { error: "User is not an admin" };
  }

  const { data, count, error } = await supabase
    .from("appointments")
    .select(
      `*,
      patient:patient_id (
        id,
        first_name,
        last_name,
        profile_picture
      ),
      doctor:doctor_id (
        id,
        first_name,
        last_name,
        profile_picture,
        specialization
      )`,
      {count: "exact"}
    )
    .eq("status", "pending");

  if (error) {
    console.error("Error fetching appointments:", error);
    return { error: `Error fetching appointments: ${error.message}` };
  }

  return {
    data: data as AppointmentWithRelations[],
    count: count ?? 0, 
  };
}

export async function deleteAppointment(
  id: string
): Promise<{ error?: string } | void> {
  const supabase = await createAdminClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isAdmin(userData)) {
    console.error("User is not an admin");
    return { error: "User is not an admin" };
  }

  const { error } = await supabase.from("appointments").delete().eq("id", id);

  if (error) {
    console.error("Error deleting appointment:", error);
    return { error: "Error deleting appointment." };
  }

  revalidatePath("/appointments");
}


export async function approveAppointment(
  id: string
): Promise<{ error?: string } | void> {
  const supabase = await createAdminClient();

  const authenticatedUser = await getAuth();
  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!isAdmin(userData)) {
    console.error("User is not an admin");
    return { error: "User is not an admin" };
  }

  const { error } = await supabase
    .from("appointments")
    .update({ status: "confirmed" })
    .eq("id", id);

  if (error) {
    console.error("Error approving appointment:", error);
    return { error: "Error approving appointment." };
  }

  revalidatePath("/appointments");
}