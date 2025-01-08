'use client'

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import heroRemoveBg from '@/public/hero.png';
import { CircleChevronRight } from 'lucide-react';
import avatars from '@/lib/landingPageData/avatars';
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex items-center justify-center py-10 md:py-8 px-5 lg:px-8 bg-gradient-to-b from-white via-bgGreen to-bgBlue">
      <motion.div 
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="container mx-auto flex flex-col md:flex-row items-center justify-center md:gap-8"
      >
        {/* Left Content */}
        <div className="flex flex-col space-y-8 text-center md:text-left">
          <Badge variant="outline" className="text-primary border border-green-400 bg-green-50 tracking-tight text-md px-3 py-1 font-semibold self-center md:self-start inline-block">
            Version 2.0 is here! 🎉
          </Badge>
          <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter">
            <span className="bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">
              Your Health, Our{" "}
            </span>
            <span className="relative inline-block text-primary">
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
          
          <p className="text-paragraphs text-lg md:text-xl 2xl:text-2xl tracking-tight">
          At MyClinic, you can book and manage your appointments with our expert doctors, putting your health journey at the forefront of innovation.
          </p>
          <div className="flex flex-col justify-center items-center md:justify-start md:items-start space-y-5">
            <div className="flex -space-x-2">
              {avatars.map((src, index) => (
                <Avatar key={index} className="w-11 h-11 md:w-14 md:h-14 border-2 border-green-500 bg-white shadow-xl">
                  <AvatarImage src={src} alt={`User avatar ${index + 1}`} className='object-cover' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Link href="/login">
              <Button
                className="text-white group flex items-center text-lg 2xl:text-xl rounded-sm border-2 border-primary/85 px-8 py-6 shadow-xl bg-secondary hover:bg-primary font-bold transition-colors duration-300"
                aria-label="Book an Appointment"
              >
                Book an Appointment
                <CircleChevronRight
                  className="ml-1 override-size transition-transform duration-300 group-hover:translate-x-2"
                  size={24} 
                />
              </Button>
            </Link>
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
      </motion.div>
    </section>
  );
}
