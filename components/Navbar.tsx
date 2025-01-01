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
        <>
            <nav className="w-full px-1 md:px-10 lg:px-16 py-4 sticky top-0 z-50 bg-white">
                <div className="flex flex-wrap items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image src={Logo} alt="MyClinic Logo" className="w-14 h-14 2xl:w-16 2xl:h-16 mr-2 hover:opacity-80 transition-opacity duration-600 ease-in-out hover:scale-105" />
                        <span className="text-[#00A0DC] text-4xl 2xl:text-5xl font-extrabold">My</span>
                        <span className="text-[#2a6f97] text-4xl 2xl:text-5xl font-extrabold">Clinic</span>
                    </Link>

                    {/* Hamburger Icon (Mobile Only) */}
                    <div className="lg:hidden">
                        <button
                            className="p-2 focus:outline-none"
                            onClick={toggleMenu}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? (
                                <X className="w-6 h-6 text-[#2a6f97]" /> 
                            ) : (
                                <AlignJustify className="w-6 h-6 text-[#2a6f97]" /> 
                            )}
                        </button>
                    </div>

                    {/* Menu Links */}
                    <div className={`w-full lg:w-auto lg:flex items-center ${menuOpen ? 'block' : 'hidden'}`}>
                        <div className="text-[#2a6f97] text-lg 2xl:text-xl font-semibold flex flex-col lg:flex-row items-center lg:space-x-4 space-y-4 lg:space-y-0 mt-4 lg:mt-0 group">
                            <Link href="/" className="relative px-5 py-1 transition-colors duration-500 rounded-full bg-slate-50 shadow-md group-hover:bg-transparent group-hover:shadow-none group-hover:text-[#2a6f97]">
                                Home
                            </Link>
                            <Link href="/" className="relative px-5 py-1 transition-colors duration-500 rounded-full hover:bg-slate-50 hover:shadow-md">
                                About
                            </Link>
                            <Link href="/" className="relative px-5 py-1 transition-colors duration-500 rounded-full hover:bg-slate-50 hover:shadow-md">
                                Services
                            </Link>
                            <Link href="/" className="relative px-5 py-1 transition-colors duration-500 rounded-full hover:bg-slate-50 hover:shadow-md">
                                Doctors
                            </Link>
                            <Link href="/" className="relative px-5 py-1 transition-colors duration-500 rounded-full hover:bg-slate-50 hover:shadow-md">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className={`w-full lg:w-auto lg:flex items-center ${menuOpen ? 'block mt-4' : 'hidden'}`}>
                        <Button className="text-lg 2xl:text-xl rounded-full w-full px-8 py-5 bg-[#00A0DC] hover:bg-[#2a6f97] border border-[#00A0DC] font-bold">
                            Login
                        </Button>
                    </div>
                </div>
            </nav>

            {menuOpen && (
                <div 
                    className="fixed inset-0 bg-white z-40"
                    onClick={toggleMenu} 
                ></div>
            )}
        </>
    )
}

export default Navbar
