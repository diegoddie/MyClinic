"use server";

import { createClient } from "../server";
import { getAuth, getUser } from "./authActions";
import { Appointment, Doctor } from "../types";
import { isDoctor, isPatient } from "@/utils/getRole";
import {
  sendAppointmentCanceledAdmin,
  sendAppointmentCanceledPatient,
  sendNewAppointmentBookedAdmin,
  sendNewAppointmentBookedPatient,
} from "@/lib/resend/appointmentEmail";
import { revalidatePath } from "next/cache";

export interface AppointmentWithRelations extends Appointment {
  patient: {
    id: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    tax_id?: string;
    email?: string;
    phone_number?: string;
  };
  doctor: {
    id: string;
    first_name: string;
    last_name: string;
    profile_picture: string;
    specialization: string;
  };
}

export async function getUserAppointments(
  userId: string,
  filters?: {
    status?: string;
    startDate?: Date;
    endDate?: Date;
  },
): Promise<{
  data?: AppointmentWithRelations[];
  error?: string;
  total?: number;
}> {
  const supabase = await createClient();
  const authenticatedUser = await getAuth();

  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!userData) {
    console.error("User not found");
    return { error: "User not found" };
  }

  const userRole = isPatient(userData)
    ? "patient_id"
    : isDoctor(userData)
    ? "doctor_id"
    : null;
  if (!userRole) {
    console.error("Invalid user role");
    return { error: "Invalid user role" };
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
        )`
    )
    .eq(userRole, userId)
    .order("date", { ascending: true });

  // Apply filters
  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  if (filters?.startDate) {
    query = query.gte("date", filters.startDate.toISOString());
  }
  if (filters?.endDate) {
    query = query.lte("date", filters.endDate.toISOString());
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching appointments:", error);
    return { error: `Error fetching appointments: ${error.message}` };
  }

  return { data: data as AppointmentWithRelations[], total: count ?? 0 };
}

export async function getUserLastFiveAppointments(): Promise<{
  data?: AppointmentWithRelations[];
  error?: string;
  count?: number | null;
}> {
  const supabase = await createClient();
  const authenticatedUser = await getAuth();

  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!userData) {
    console.error("User not found");
    return { error: "User not found" };
  }

  const userRole = isPatient(userData)
    ? "patient_id"
    : isDoctor(userData)
    ? "doctor_id"
    : null;
  if (!userRole) {
    console.error("Invalid user role");
    return { error: "Invalid user role" };
  }

  const now = new Date().toISOString();

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
      { count: "exact" }
    )
    .eq(userRole, userData.id)
    .lt("date", now)
    .in("status", ["confirmed", "completed"])
    .order("date", { ascending: false }) // Ordina per data decrescente
    .limit(5); // Prende gli ultimi 5 appuntamenti

  if (error) {
    console.error("Error fetching today's appointments:", error);
    return { error: "Error fetching today's appointments" };
  }

  return { data: data as AppointmentWithRelations[], count: count };
}

export async function getUserNextFiveAppointments(): Promise<{
  data?: AppointmentWithRelations[];
  error?: string;
  count?: number | null;
}> {
  const supabase = await createClient();
  const authenticatedUser = await getAuth();

  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!userData) {
    console.error("User not found");
    return { error: "User not found" };
  }

  const userRole = isPatient(userData)
    ? "patient_id"
    : isDoctor(userData)
    ? "doctor_id"
    : null;
  if (!userRole) {
    console.error("Invalid user role");
    return { error: "Invalid user role" };
  }

  const now = new Date().toISOString();

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
      { count: "exact" }
    )
    .eq(userRole, userData.id)
    .gte("date", now)
    .eq("status", "confirmed") // Solo appuntamenti confermati
    .order("date", { ascending: true }) // Ordina per data crescente
    .limit(5); // Prende i prossimi 5 appuntamenti

  if (error) {
    console.error("Error fetching today's appointments:", error);
    return { error: "Error fetching today's appointments" };
  }

  return { data: data as AppointmentWithRelations[], count: count };
}

export async function getUserTodayAppointments(): Promise<{
  data?: AppointmentWithRelations[];
  error?: string;
  count?: number | null;
}> {
  const supabase = await createClient();
  const authenticatedUser = await getAuth();

  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!userData) {
    console.error("User not found");
    return { error: "User not found" };
  }

  const userRole = isPatient(userData)
    ? "patient_id"
    : isDoctor(userData)
    ? "doctor_id"
    : null;
  if (!userRole) {
    console.error("Invalid user role");
    return { error: "Invalid user role" };
  }

  const today = new Date().toISOString().split("T")[0]; // Data attuale senza orario

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
      { count: "exact" }
    )
    .eq(userRole, userData.id)
    .gte("date", today)
    .lte("date", today)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching today's appointments:", error);
    return { error: "Error fetching today's appointments" };
  }

  return { data: data as AppointmentWithRelations[], count: count };
}

export async function getUserPendingAppointments(): Promise<{
  data?: AppointmentWithRelations[];
  error?: string;
  count?: number;
}> {
  const supabase = await createClient();
  const authenticatedUser = await getAuth();

  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!userData) {
    console.error("User not found");
    return { error: "User not found" };
  }

  const userRole = isPatient(userData)
    ? "patient_id"
    : isDoctor(userData)
    ? "doctor_id"
    : null;
  if (!userRole) {
    console.error("Invalid user role");
    return { error: "Invalid user role" };
  }

  const { data, error, count } = await supabase
  .from("appointments")
  .select(
    `*,
    patient:patient_id (
        id,
        first_name,
        tax_id,
        email,
        last_name,
        profile_picture,
        phone_number
      ),
    doctor:doctor_id (
      id,
      first_name,
      last_name,
      profile_picture,
      specialization
      )`,
      { count: "exact" }
    )
    .eq(userRole, userData.id)  // Filtra gli appuntamenti in base all'utente
    .eq("status", "pending");  // Solo gli appuntamenti in sospeso

    if (error) {
      console.error("Error fetching pending appointments:", error.message);
      return { error: "Error fetching pending appointments" };
    }

    return {
      data: data as AppointmentWithRelations[],
      count: count ?? 0, 
    };
}

export async function bookAppointment(
  userId: string,
  doctor: Doctor,
  date: string
): Promise<{ data?: Appointment; error?: string }> {
  const supabase = await createClient();

  const authenticatedUser = await getAuth();

  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!userData) {
    console.error("User not found");
    return { error: "User not found" };
  }

  if (!isPatient(userData)) {
    console.log("you are not allowed");
    return { error: "you are not allowed" };
  }

  if (
    !userData.first_name &&
    !userData.last_name &&
    !userData.tax_id &&
    !userData.phone_number
  ) {
    console.log(
      "Missing data, please go to settings and complete your profile."
    );
    return {
      error: "Missing data, please go to settings and complete your profile.",
    };
  }

  const appointmentDate = new Date(date);
  if (isNaN(appointmentDate.getTime()) || appointmentDate <= new Date()) {
    return { error: "Invalid date" };
  }

  const { data, error } = await supabase
    .from("appointments")
    .insert([
      { patient_id: userId, doctor_id: doctor.id, date: appointmentDate },
    ])
    .select()
    .single();

  if (error) {
    return { error: "Error booking appointment" };
  }

  const emailData = {
    firstName: userData.first_name || "",
    lastName: userData.last_name || "",
    email: userData.email,
    taxId: userData.tax_id || "",
    phoneNumber: userData.phone_number || "",
    date: appointmentDate.toISOString(),
    doctorFirstName: doctor.first_name,
    doctorLastName: doctor.last_name,
  };

  await sendNewAppointmentBookedPatient(userData.email, emailData);

  await sendNewAppointmentBookedAdmin(emailData);

  return { data };
}

export async function deleteAppointment(
  doctorFirstName: string,
  doctorLastName: string,
  appointmentId: string,
  appointmentDate: string,
  appointmentStatus: string
): Promise<{ error?: string } | void> {
  const supabase = await createClient();

  const authenticatedUser = await getAuth();
  if (!authenticatedUser) {
    console.error("Auth session missing!");
    return { error: "Auth session missing!" };
  }

  const userData = authenticatedUser?.id
    ? await getUser({ id: authenticatedUser.id })
    : null;

  if (!userData) {
    console.error("User not found");
    return { error: "User not found" };
  }

  if (!isPatient(userData)) {
    console.error("User is not a patient");
    return { error: "User is not a patient" };
  }

  if (appointmentStatus === "completed") {
    console.error("You can't cancel a completed appointment");
    return { error: "You can't cancel a completed appointment" };
  }

  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", appointmentId)
    .single();

  if (error) {
    console.error("Error deleting the appointment", error);
    return { error: "Error deleting the appointment" };
  }

  const emailData = {
    firstName: userData.first_name || "",
    lastName: userData.last_name || "",
    email: userData.email,
    taxId: userData.tax_id || "",
    phoneNumber: userData.phone_number || "",
    date: appointmentDate,
    doctorFirstName: doctorFirstName,
    doctorLastName: doctorLastName,
  };

  await sendAppointmentCanceledPatient(userData.email, emailData);

  await sendAppointmentCanceledAdmin(emailData);

  revalidatePath("/appointments");
}
