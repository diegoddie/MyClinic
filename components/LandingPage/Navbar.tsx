"use client";

import { useState } from "react";
import Link from "next/link";
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
import Logo from "../utils/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import GetAvatarFallback from "../Settings/GetAvatarFallback";
import { useToast } from "@/hooks/use-toast";
import { fetchUser, logout } from "@/utils/supabase/actions/authActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Doctors", href: "#doctors" },
  { name: "Contacts", href: "#contacts" },
];

export default function Navbar() {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: fetchUser });

  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {  
      const result = await logout();  
      if (result?.error) {  
        throw new Error(result.error);  
      }
    },
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  })

  const handleLogout = () => {
    mutation.mutate();
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white py-1 md:py-4">
      <div className="mx-auto px-3 md:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />
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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {'profile_picture' in user ? (
                    <Avatar className="cursor-pointer hover:shadow-md h-14 w-14">
                      <AvatarImage
                        src={user.profile_picture || undefined}
                        alt={user.email || ""}
                      />

                      <AvatarFallback>
                        {user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="cursor-pointer h-14 w-14">
                      <GetAvatarFallback email={user.email} />
                    </div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuItem className="">
                    <Link
                      href="/dashboard"
                      className=" text-primary font-semibold text-lg items-center justify-center mx-auto"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <Separator />
                  <DropdownMenuItem>
                    <Button
                      onClick={handleLogout}
                      disabled={mutation.isPending}
                      type="button"
                      className="bg-secondary text-white text-lg w-full"
                    >
                      {mutation.isPending ? (
                        <>
                          <Spinner className="mr-2" />
                          <span>Logging out...</span>
                        </>
                      ) : (
                        <span>Logout</span>
                      )}
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="border border-secondary rounded-full 2xl:text-xl bg-secondary hover:bg-primary px-8 py-5 text-lg font-bold text-white transition-colors duration-300">
                  Login
                </Button>
              </Link>
            )}
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
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {'profile_picture' in user ? (
                          <Avatar className="cursor-pointer hover:shadow-md h-10 w-10">
                            <AvatarImage
                              src={user.profile_picture || undefined}
                              alt={user.email || ""}
                            />
                            <AvatarFallback>
                              {user.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="cursor-pointer h-14 w-14">
                            <GetAvatarFallback email={user.email} />
                          </div>
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link
                            href="/dashboard"
                            className="justify-center flex w-full text-lg text-primary font-semibold"
                          >
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem>
                          <Button
                            onClick={handleLogout}
                            disabled={mutation.isPending}
                            type="button"
                            className="bg-secondary text-white text-lg w-full justify-center flex mx-auto"
                          >
                            {mutation.isPending ? (
                              <>
                                <Spinner className="mr-2" />
                                <span>Logging out...</span>
                              </>
                            ) : (
                              <span>Logout</span>
                            )}
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={"/login"}
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button className="border border-secondary mt-2 w-full rounded-full bg-secondary px-8 py-5 text-lg font-bold text-white transition-colors duration-300 hover:bg-primary">
                        Login
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
