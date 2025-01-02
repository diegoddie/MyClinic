import Image from 'next/image';
import Link from 'next/link'
import React from 'react';
import Logo from '@/public/MYClinic.png';
import { FaGithub, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='bg-gradient-to-r from-secondary/55 to-primary/80 text-white text-center px-4 pt-3'>
        <div className='container mx-auto px-4 py-3'>
            <div className='flex flex-col md:flex-row justify-between px-4 items-center space-y-10 md:space-y-0'>
            {/* First Column: Logo / Name */}
                <div className='flex flex-col justify-center items-center'>
                    <span className="text-secondary text-3xl md:text-4xl font-extrabold">My<span className="text-primary text-3xl md:text-4xl font-extrabold">Clinic</span></span>
                    <Image src={Logo} alt='MyClinic Logo' width={110} height={110} />
                    <p className='text-xl font-semibold'>Your health, our priority.</p>
                </div>
                {/* Second Column: Quick Links */}
                <div className='flex flex-col'>
                    <h3 className='text-2xl font-bold mb-2 md:mb-4'>Quick Links</h3>
                    <div className='flex flex-col space-y-1 text-lg font-medium'>
                        <Link href='#' className='transition-colors duration-300 hover:text-primary hover:font-semibold'>Home</Link>
                        <Link href='#about' className='transition-colors duration-300 hover:text-primary hover:font-semibold'>About</Link>
                        <Link href='#services' className='transition-colors duration-300 hover:text-primary hover:font-semibold'>Services</Link>
                        <Link href='#doctors' className='transition-colors duration-300 hover:text-primary hover:font-semibold'>Doctors</Link>
                        <Link href='#contact' className='transition-colors duration-300 hover:text-primary hover:font-semibold'>Contact</Link>
                    </div>
                </div>
                {/* Third Column: Contact Information */}
                <div className='flex flex-col'>
                    <h3 className='text-2xl font-bold mb-2 md:mb-4'>Opening Hours</h3>
                    <p>Mon-Fri: 8am - 6pm</p>
                    <p>123 Health St, Wellness City</p>
                    <p>(123) 456-7890</p>
                    <div className='flex space-x-5 mt-4 justify-center'>
                        <Link href='#' className='transition-colors duration-300 hover:text-gray-700'><FaGithub size={28} /></Link>
                        <Link href='#' className='transition-colors duration-300 hover:text-red-600'><FaYoutube size={28} /></Link>
                        <Link href='#' className='transition-colors duration-300 hover:text-blue-400'><FaTwitter size={28} /></Link>
                        <Link href='#' className='transition-colors duration-300 hover:text-pink-500'><FaInstagram size={28} /></Link>
                    </div>
                </div>
            </div>
        </div>
        <div className='border-t py-4 mt-4'>
            <p>&copy; 2025 MyClinic. All rights reserved.</p>
        </div>
    </footer>
  );
}

export default Footer;