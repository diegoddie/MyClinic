'use client'

import Link from "next/link"
import { AlignJustify, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import Logo from '@/public/MYClinic.png'
import Image from 'next/image'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className="w-full px-6 md:px-20 py-4 sticky top-0 shadow-sm z-50 bg-[#f5f5f5]">
            <div className="flex flex-wrap items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src={Logo} alt="MyClinic Logo" className="w-14 h-14 mr-2 hover:opacity-80 transition-opacity duration-600 ease-in-out hover:scale-105" />
                    <span className="text-[#00A0DC] text-4xl font-extrabold">My</span>
                    <span className="text-[#2a6f97] text-4xl font-extrabold">Clinic</span>
                </Link>

                {/* Hamburger Icon (Mobile Only) */}
                <div className="md:hidden">
                    <button
                        className="p-2 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <X className="w-6 h-6" /> 
                        ) : (
                            <AlignJustify className="w-6 h-6" /> 
                        )}
                    </button>
                </div>

                {/* Menu Links */}
                <div className={`w-full md:w-auto md:flex items-center ${menuOpen ? 'block' : 'hidden'}`}>
                    <div className="text-[#2a6f97] text-lg font-semibold flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-0 group">
                        <Link href="/" className="relative px-5 py-2 transition-colors duration-300 rounded-full bg-white shadow-md text-black group-hover:bg-transparent group-hover:shadow-none group-hover:text-[#2a6f97]">
                            Home
                        </Link>
                        <Link href="/" className="relative px-5 py-2 transition-colors duration-300 rounded-full hover:bg-white hover:shadow-md hover:text-black">
                            About
                        </Link>
                        <Link href="/" className="relative px-5 py-2 transition-colors duration-300 rounded-full hover:bg-white hover:shadow-md hover:text-black">
                            Servicess
                        </Link>
                        <Link href="/" className="relative px-5 py-2 transition-colors duration-300 rounded-full hover:bg-white hover:shadow-md hover:text-black">
                            Doctors
                        </Link>
                        <Link href="/" className="relative px-5 py-2 transition-colors duration-300 rounded-full hover:bg-white hover:shadow-md hover:text-black">
                            Contact
                        </Link>
                        
                    </div>
                </div>
                <div className={`w-full md:w-auto md:flex items-center ${menuOpen ? 'block' : 'hidden'}`}>
                    <Button className="text-lg rounded-full w-full px-8 py-5 bg-[#8ecae6] hover:bg-[#669bbc] border border-[#00A0DC] font-bold">
                        Login
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
