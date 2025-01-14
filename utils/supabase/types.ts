import { Database } from "@/lib/database.types";

export type Patient = Database['public']['Tables']['patients']['Row'];
export type Doctor = Database['public']['Tables']['doctors']['Row'];
export type Appointment = Database['public']['Tables']['appointments']['Row'];