import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import heroRemoveBg from '@/public/hero.png';
import { CircleChevronRight } from 'lucide-react';
import avatars from '@/lib/avatars';

export default function Hero() {
  return (
    <section className="flex items-center justify-center py-10 md:py-8 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center md:gap-8">
        {/* Left Content */}
        <div className="flex flex-col space-y-8 text-center md:text-left">
          <span className="text-[#2a6f97] tracking-tight text-sm border border-[#2a6f97] px-3 py-1 rounded-lg font-semibold self-center md:self-start inline-block">
            Version 2.0 is here!
          </span>
          
          <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter">
            <span className="bg-gradient-to-b from-[#00A0DC] to-[#2a6f97] text-transparent bg-clip-text">
              Your Health, Our{" "}
            </span>
            <span className="relative inline-block text-[#2a6f97]">
              Priority.
              <svg
                className="absolute bottom-0 left-0 w-full h-3"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 15 Q 10 0, 50 10 T 100 10"
                  fill="none"
                  stroke="#00A0DC"
                  strokeWidth="5"
                />
              </svg>
            </span>
          </h1>
          
          <p className="text-[#2a6f97] text-lg md:text-xl 2xl:text-3xl tracking-tight">
          At MyClinic, you can book and manage your appointments with our expert doctors, putting your health journey at the forefront of innovation.
          </p>
          <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-4">
            <div className="flex -space-x-2">
              {avatars.map((src, index) => (
                <Avatar key={index} className="w-11 h-11 md:w-14 md:h-14 border border-slate-500 bg-white">
                  <AvatarImage src={src} alt={`User avatar ${index + 1}`} className='object-cover' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>
              <Button
                className="group flex items-center text-lg 2xl:text-xl rounded-full px-8 py-6 bg-[#00A0DC] hover:bg-[#2a6f97] border border-[#00A0DC] font-bold transition-colors duration-300"
                aria-label="Book an Appointment"
              >
                Book an Appointment
                <CircleChevronRight
                  className="ml-1 override-size transition-transform duration-300 group-hover:translate-x-2"
                  size={24} 
                />
              </Button>
          </div>
        </div>
        
        {/* Right Content */}
        <div className="w-full mt-12 md:mt-0 flex justify-center">
          <Image
            src={heroRemoveBg}
            alt="Hero Image"
            className="w-full drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
