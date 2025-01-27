import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // Qui si usa la chiave di servizio
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false, // Disabilitato per sicurezza
        },
      }
    );
  }