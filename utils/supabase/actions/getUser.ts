'use server';


import { createClient } from "../server";
import { User } from "@supabase/supabase-js";

export default async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Get user error:", error);
    return null
  }

  return data?.user || null;
}
