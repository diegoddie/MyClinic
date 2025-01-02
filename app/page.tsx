import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
    <div className="flex flex-col md:min-h-screen">
      <Navbar />
      <Hero />
      <Achievements />
      <About />
    </div>
    <Footer />
    </>
  );
}
