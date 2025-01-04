"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "@/public/MYClinic.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Doctors", href: "#doctors" },
  { name: "Contacts", href: "#contacts" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white py-1 md:py-4">
      <div className="mx-auto px-3 md:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
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

          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-4">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:block">
            <Link href="/login">
              <Button className="border border-secondary rounded-full 2xl:text-xl bg-secondary hover:bg-primary px-8 py-5 text-lg font-bold text-white transition-colors duration-300">
                Login
              </Button>
            </Link>
          </div>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <AlignJustify className="text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[260px] sm:w-[350px] bg-background"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-4 items-center mt-5">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg text-primary font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="border border-secondary mt-2 w-full rounded-full bg-secondary px-8 py-5 text-lg font-bold text-white transition-colors duration-300 hover:bg-primary">
                      Login
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
