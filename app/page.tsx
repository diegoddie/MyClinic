import About from "@/components/LandingPage/About";
import Achievements from "@/components/LandingPage/Achievements";
import Contacts from "@/components/LandingPage/Contacts";
import Doctors from "@/components/LandingPage/Doctors";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/Navbar";
import Services from "@/components/LandingPage/Services";
import RemoveDarkMode from "@/components/utils/RemoveDarkMode";
import { fetchUser } from "@/utils/supabase/actions/authActions";

export default async function Home() {

  const user = await fetchUser()

  return (
    <div className="overflow-x-hidden">
      <RemoveDarkMode>
        {/* Navbar riceve sempre un user, anche se null */}
        <Navbar user={user} />
        <Hero />
        <Achievements />
        <About />
        <Services />
        <Doctors />
        <Contacts />
        <Footer />
      </RemoveDarkMode>
    </div>
  );
}
