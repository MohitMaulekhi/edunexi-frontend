"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // 1. Import hooks
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter(); // 2. Initialize router
  const pathname = usePathname(); // 3. Get current page path

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // 4. Updated logic to handle scrolling from any page
  const handleScroll = (id: string) => {
    setIsMenuOpen(false); // Close mobile menu first

    // If we are already on the homepage, scroll smoothly
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to the homepage with the section ID
      router.push("/#" + id);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-black/40 rounded-2xl border border-[#8B5CF6]/20"></div>

        <div className="relative px-4 sm:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="ml-4 text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Edunexi
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center grow justify-center">
              <div className="flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-gray-300 text-xl hover:text-[#8B5CF6] transition-colors"
                >
                  Home
                </Link>
                <button
                  onClick={() => handleScroll("features")}
                  className="text-gray-300 text-xl hover:text-[#8B5CF6] transition-colors"
                >
                  Features
                </button>
                <Link
                  href="/about"
                  className="text-gray-300 text-xl hover:text-[#8B5CF6] transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Desktop Login/Signup Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#8B5CF6]/50 text-gray-200 hover:bg-[#8B5CF6]/10 px-6 py-2 rounded-full transition-colors"
                >
                  Login
                </motion.button>
              </Link>
            </div>

            {/* Hamburger Menu Icon */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-[#8B5CF6] transition-colors relative w-6 h-6 z-10"
                aria-label="Toggle menu"
              >
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 right-4 w-64 bg-black/50 backdrop-blur-xl rounded-2xl border border-[#8B5CF6]/20 z-50"
          >
            <div className="p-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="block text-gray-300 hover:text-[#8B5CF6] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => handleScroll("features")}
                className="block w-full text-left text-gray-300 hover:text-[#8B5CF6] transition-colors py-2"
              >
                Features
              </button>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-[#8B5CF6] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>

              <div className="pt-4 mt-4 border-t border-[#8B5CF6]/20 flex flex-col space-y-3">
                <Link href="/login">
                  <button className="w-full text-center border border-[#8B5CF6]/50 text-gray-200 hover:bg-[#8B5CF6]/10 px-6 py-2 rounded-full transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
