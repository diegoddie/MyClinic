"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function loginWithMagicLink(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: '/auth/confirm',
    },
  });

  if (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
  }

  redirect("/check-email");
}

export async function loginWithGoogle(){
  const supabase = await createClient();
  const { data,error } = await supabase.auth.signInWithOAuth({ 
    provider: "google" ,
    options: {
      redirectTo: '/auth/callback',
    },
  });

  if (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    redirect(`/error?message=${encodeURIComponent(errorMessage)}`);
  }

  if (data.url) {
    console.log(data.url)
    redirect(data.url) 
  }
}

