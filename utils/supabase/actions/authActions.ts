'use server';

import { createClient } from "../server";
import { User as AuthUser } from "@supabase/supabase-js";
import { User, Doctor, Patient } from "../types";

export async function getAuth(): Promise<AuthUser | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    
    return null
  }

  return data?.user || null;
}

export async function getUser({ id }: { id: string }): Promise<User | Doctor | Patient | null> {
  const supabase = await createClient();

  // Fetch the user's role first
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (userError || !userData) {
    console.error("Get user error:", userError);
    return null;
  }

  // Handle different roles
  if (userData.role === 'admin') {
    return userData; // Return basic user data for admins
  }

  const tableName = userData.role === 'doctor' ? 'doctors' : 'patients';

  // Fetch user-specific data from the corresponding table
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('user_id', id)
    .single();

  if (error) {
    console.error(`Get ${tableName} data error:`, error);
    return null;
  }
  
  return data;
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", error);
    return error; // Restituisci l'errore direttamente
  }
  return null; // Se non c'è errore, restituisci null
}

export async function fetchUser(){
    const user = await getAuth();  // Ottieni l'utente autenticato
    if(!user){
      return null
    } else {
      const userData = await getUser({ id: user.id });  // Ottieni i dati dell'utente
      return userData;
    }
}