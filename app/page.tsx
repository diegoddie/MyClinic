import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Contacts from "@/components/Contacts";
import Doctors from "@/components/Doctors";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
    <div className="flex flex-col md:min-h-screen">
      <Navbar />
      <Hero />
      <Achievements />
      <About />
      <Services />
      <Doctors />
      <Contacts />
    </div>
    <Footer />
    </>
  );
}
