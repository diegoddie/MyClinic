import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Contacts from "@/components/Contacts";
import Doctors from "@/components/Doctors";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Achievements />
      <About />
      <Services />
      <Doctors />
      <Contacts />
    </>
  );
}
