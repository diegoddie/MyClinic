import Image from "next/image";
import Link from "next/link";
import React from "react";
import MyClinicLogo from "@/public/MYClinic.png";

function Logo() {
  return (
    
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        <Image
          src={MyClinicLogo}
          alt="MyClinic Logo"
          className="w-12 h-12 md:w-14 md:h-14 2xl:w-16 2xl:h-16 mr-2 hover:opacity-80 transition-opacity duration-600 ease-in-out hover:scale-105"
        />
        <span className="text-3xl md:text-4xl font-extrabold text-secondary 2xl:text-5xl">
          My
        </span>
        <span className="text-3xl md:text-4xl font-extrabold text-primary 2xl:text-5xl">
          Clinic
        </span>
      </Link>
    </div>
  );
}

export default Logo;
