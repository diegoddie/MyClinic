import { Database } from "@/lib/database.types";

export type User = Database['public']['Tables']['users']['Row'];
export type Doctor = Database['public']['Tables']['doctors']['Row'];
export type Appointment = Database['public']['Tables']['appointments']['Row'];