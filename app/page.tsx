import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Contacts from "@/components/Contacts";
import Doctors from "@/components/Doctors";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Achievements />
      <About />
      <Services />
      <Doctors />
      <Contacts />
    </>
  );
}
