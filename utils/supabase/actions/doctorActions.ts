"use server"

import { isDoctor } from "@/utils/getRole";
import { revalidatePath } from "next/cache";
import { getAuth, getUser } from "./authActions";
import { createClient } from "../server";
import { DoctorFormValues } from "@/lib/schemas/doctorSchema";
import { format, getDay, addMinutes, setHours } from "date-fns";
import { Doctor } from "../types";

export async function getDoctors(): Promise<{ data: Doctor[]; count?: number | null; error?: string }> {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from("doctors")
    .select("*", { count: "exact" }); // Conta il numero totale di dottori

  if (error) {
    console.error("Error fetching doctors:", error);
    return { data: [], count: null, error: "Error fetching doctors" }; 
  }

  return { data: data ?? [], count }; // Restituisce i dati e il conteggio
}

export async function updateDoctor(
  data: DoctorFormValues,
  id: string,
  avatar?: File
): Promise<{ data?: Doctor; error?: string }> {
  const supabase = await createClient();

  const authenticatedUser = await getAuth();
  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id ? await getUser({ id: authenticatedUser.id }) : null;
  if (!isDoctor(userData)) {
    console.error("User is not a doctor");
    return { error: "User is not a doctor" };
  }

  let avatarUrl: string | null = null;

  if (avatar) {
    const filePath = `doctor/${data.email}/${Date.now()}_${avatar.name}`;
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(filePath, avatar);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return { error: "Error uploading avatar" };
    }

    // Ottenere l'URL pubblico dell'avatar
    const { data: publicUrlData } = supabase.storage
      .from("avatar")
      .getPublicUrl(filePath);
    if (publicUrlData?.publicUrl) {
      avatarUrl = publicUrlData.publicUrl;
    } else {
      console.error("Error retrieving public URL for avatar");
      return { error: "Unable to retrieve public URL for avatar" };
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
    return { error: "Error updating doctor" };
  }

  revalidatePath("/dashboard/doctors");
  return { data: updatedDoctor };
}

export async function getDoctorAvailability(id: string, selectedDate: Date): Promise<string[] | { error?: string }> {
  const supabase = await createClient();

  const authenticatedUser = await getAuth();
  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id ? await getUser({ id: authenticatedUser.id }) : null;
  if (!userData) {
    console.error("User not found");
    return { error: "User not found" };
  }

  // Check if the selected date is a weekend (Saturday or Sunday)
  const dayOfWeek = getDay(selectedDate);
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return []; // Clinic is closed, no available slot
  }

  // Generate available time slots from 9:00 AM to 6:00 PM, every 30 minutes
  const allSlots = Array.from({ length: 18 }, (_, i) => format(addMinutes(setHours(selectedDate, 9), i * 30), "HH:mm"));

  // Format date for database query
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  // Fetch already booked appointments for the selected day
  const { data, error } = await supabase
    .from("appointments")
    .select("date")
    .eq("doctor_id", id)
    .gte("date", `${formattedDate}T00:00:00Z`)
    .lt("date", `${formattedDate}T23:59:59Z`);

  if (error) {
    console.error("Error fetching doctor availability:", error);
    return { error: "Error fetching doctor availability" };
  }

  // Extract booked times
  const bookedTimes = new Set(data.map((appointment) => format(new Date(appointment.date), "HH:mm")));

  // Filter available slots
  const availableSlots = allSlots.filter((slot) => !bookedTimes.has(slot));
  return availableSlots
}