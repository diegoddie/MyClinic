"use client";

import About from "@/components/LandingPage/About";
import Achievements from "@/components/LandingPage/Achievements";
import Contacts from "@/components/LandingPage/Contacts";
import Doctors from "@/components/LandingPage/Doctors";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/Navbar";
import Services from "@/components/LandingPage/Services";
import { useState, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Doctor, Patient, User } from "@/utils/supabase/types";
import { getAuth, getUser } from "@/utils/supabase/actions/authActions";

export default function Home() {
  const [user, setUser] = useState<User | Doctor | Patient | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const logout = async () => {
    setIsLoggingOut(true);
    const supabaseClient = createClient();

    const { error } = await supabaseClient.auth.signOut();

    if (!error) {
      router.refresh();
      setIsLoggingOut(false);
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        variant: "success",
      });
    }
    if (error) {
      setIsLoggingOut(false);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("style");

    const fetchUser = async () => {
      const authenticatedUser = await getAuth();
      if (authenticatedUser === null) {
        return;
      }
      if (authenticatedUser.id) {
        const userData = await getUser({ id: authenticatedUser.id });
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar user={user} logout={logout} isLoggingOut={isLoggingOut} />
      <Hero />
      <Achievements />
      <About />
      <Services />
      <Doctors />
      <Contacts />
      <Footer />
    </div>
  );
}
