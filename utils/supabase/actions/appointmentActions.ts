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
