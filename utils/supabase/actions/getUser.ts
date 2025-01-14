'use server';

import { createClient } from "../server";
import { User } from "@supabase/supabase-js";
import { Patient } from "../types";

export async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Get user error:", error);
    return null
  }

  return data?.user || null;
}

export async function getPatient({ id }: {id: string}):Promise<Patient | null>{
  const supabase = await createClient();
  const { data, error } = await supabase.from('patients').select('*').eq('id', id).single();  
  if (error) {
    console.error("Get patient error:", error);
    return null
  }
  return data;
}