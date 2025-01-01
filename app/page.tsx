import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
    <div className="flex flex-col md:min-h-screen">
      <Navbar />
      <div className="px-5 lg:px-3">
        <Hero />
      </div>
      
    </div>
    <Footer />
    </>
  );
}
