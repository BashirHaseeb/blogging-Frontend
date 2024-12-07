"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./Mode";

export default function Navbar() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check for authentication on component mount
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Set true if token exists
    }, 500);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array ensures this runs only once



  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setIsAuthenticated(false); // Update state
    router.push("/login"); // Redirect to login
  };

  return (
    <nav className="py-2 bg-background/50 sticky top-0 backdrop-blur border-b-2 z-10">
      <div className="container mx-auto flex justify-between items-center px-5 text-sm font-semibold">

        <div className="flex text-xl font-bold space-x-4 italic items-center">
          {/* logo */}
          <img src="/logo.webp" className="w-10 rounded-full cursor-pointer" alt="" />
          <ModeToggle />
          <Link href="/">AB's Blogs</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 w-auto">
          <Link
            href="/admin"
            className="text-gray-500 hover:text-inherit hover:scale-110 transition-all duration-300 ease-in-out"
          >
            dashboard
          </Link>
          <Link
            href="/blog"
            className="text-gray-500 hover:text-inherit hover:scale-110 transition duration-300 ease-in-out"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-gray-500 hover:text-inherit hover:scale-110 transition duration-300 ease-in-out"
          >
            Contact
          </Link>
          <Link
            href="/"
            className="text-gray-500 hover:text-inherit hover:scale-110 transition-all duration-300 ease-in-out"
          >
            Dev.page
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-2">
          {!isAuthenticated ?
            (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline">Signup</Button>
                </Link>
              </>

            )
            :
            (
              <>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
                <button className="w-10">

                </button>

              </>
            )
          }
        </div>

        {/* Hamburger Button for Mobile */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <div className="md:hidden text-2xl">
              <FaBars />
            </div>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader className="mb-4 mt-3">
              <SheetTitle>Menu Bar</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col space-y-4 px-4 md:hidden">
              <Link
                className="border-2 rounded-md hover:border-gray-500 text-center"
                href="/admin"
                onClick={() => document.activeElement.blur()}
              >
                dashboard
              </Link>
              <Link
                className="border-2 rounded-md hover:border-gray-500 text-center"
                href="/blog"
                onClick={() => document.activeElement.blur()}
              >
                Blog
              </Link>
              <Link
                className="border-2 rounded-md hover:border-gray-500 text-center"
                href="/contact"
                onClick={() => document.activeElement.blur()}
              >
                Contact
              </Link>
              <Link
                className="border-2 rounded-md hover:border-gray-500 text-center"
                href="/"
                onClick={() => document.activeElement.blur()}
              >
                dev.page
              </Link>

              {isAuthenticated ? (
                <Button
                  variant="outline"
                  className="border-2 rounded-md text-center"
                  onClick={() => {
                    handleLogout();
                    document.activeElement.blur();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link
                    className="border-2 rounded-md hover:border-gray-500 text-center"
                    href="/login"
                    onClick={() => document.activeElement.blur()}
                  >
                    Login
                  </Link>
                  <Link
                    className="border-2 rounded-md hover:border-gray-500 text-center"
                    href="/signup"
                    onClick={() => document.activeElement.blur()}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
