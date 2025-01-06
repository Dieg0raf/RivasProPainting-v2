"use client";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { HeaderDesktopButtons, HeaderMobileButtons } from "./HeaderButtons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Control header visibility on scroll
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-primary-blue border-b border-gray-700 backdrop-blur-sm z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Call Now Banner */}
      <div className="bg-primary-red w-full text-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* TODO: Change numbers */}
          <a
            href="tel:999-888-7777"
            className="flex items-center justify-center gap-2 py-1.5 hover:bg-red-700 transition-colors group"
            aria-label="Call us now at 999-888-7777"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium hidden sm:inline">
              Call Us Now:
            </span>
            <span className="text-sm font-bold">999-888-7777</span>
          </a>
        </div>
      </div>
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 relative">
            <Link href={"/"}>
              <Image
                src={"/icons/RivasProPaintingLogo.svg"}
                alt="Rivas Pro Painting Logo"
                width={80}
                height={80}
                layout="fixed"
              />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden lg:block">
            <HeaderDesktopButtons />
          </div>
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <HeaderMobileButtons toggleMenu={toggleMenu} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
