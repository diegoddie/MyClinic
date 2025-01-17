'use server';

import { createClient } from "../server";
import { User as AuthUser } from "@supabase/supabase-js";
import { User } from "../types";

export async function getAuth(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Get auth error:", error);
    return null
  }

  return data?.user || null;
}

export async function getUser({ id }: {id: string}):Promise<User | null>{
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) {
    console.error("Get user error:", error);
    return null
  }
  return data;
}