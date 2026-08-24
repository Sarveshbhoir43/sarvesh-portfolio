"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
{ name: "Home", href: "#home" },
{ name: "About", href: "#about" },
{ name: "Skills", href: "#skills" },
{ name: "Projects", href: "#projects" },
{ name: "Contact", href: "#contact" },
];

export default function Navbar() {
const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 20);
};

handleScroll();

window.addEventListener("scroll", handleScroll);

return () => {
  window.removeEventListener("scroll", handleScroll);
};


}, []);

const closeMenu = () => {
setMenuOpen(false);
};

return (
<header
className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-b border-[#302F29]/80 bg-[#11120D]/95 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
> <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 transition-all duration-500 sm:px-6 sm:py-5 lg:px-8">


    {/* Logo */}
    <Link
      href="#home"
      onClick={closeMenu}
      className="relative z-50 text-2xl font-semibold tracking-tight text-[#FFFBF4]"
    >
      SB<span className="text-[#D8CFBC]">.</span>
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden items-center gap-8 md:flex">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="relative text-sm text-[#A6A397] transition-colors duration-300 hover:text-[#FFFBF4]"
        >
          {link.name}
        </Link>
      ))}
    </div>

    {/* Desktop Resume Button */}
    <Link
      href="/Sarvesh_Bhoir_Resume.pdf"
      target="_blank"
      className="hidden items-center gap-2 rounded-lg border border-[#302F29] bg-[#181914] px-4 py-2.5 text-sm text-[#FFFBF4] transition-all duration-300 hover:border-[#D8CFBC] hover:bg-[#D8CFBC] hover:text-[#11120D] md:flex"
    >
      Resume
      <Download size={16} strokeWidth={1.8} />
    </Link>

    {/* Mobile Menu Button */}
    <button
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      className="
        relative
        z-50
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-lg
        border
        border-[#302F29]
        bg-[#151610]
        text-[#FFFBF4]
        transition-all
        duration-300
        hover:border-[#D8CFBC]
        md:hidden
      "
    >
      {menuOpen ? (
        <X size={20} />
      ) : (
        <Menu size={21} />
      )}
    </button>
  </nav>

  {/* Mobile Navigation */}
  <div
    className={`
      absolute
      left-0
      top-full
      w-full
      overflow-hidden
      border-b
      border-[#302F29]
      bg-[#11120D]/98
      backdrop-blur-xl
      transition-all
      duration-500
      ease-[cubic-bezier(0.22,1,0.36,1)]
      md:hidden
      ${
        menuOpen
          ? "visible max-h-[500px] opacity-100"
          : "invisible max-h-0 opacity-0"
      }
    `}
  >
    <div className="flex flex-col px-5 py-5 sm:px-6">
      
      {/* Mobile Links */}
      <div className="flex flex-col">
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={closeMenu}
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#302F29]/70
              py-4
              text-sm
              text-[#A6A397]
              transition-colors
              duration-300
              hover:text-[#FFFBF4]
            "
            style={{
              transitionDelay: menuOpen
                ? `${index * 40}ms`
                : "0ms",
            }}
          >
            {link.name}

            <span className="text-[#565449]">0{index + 1}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Resume */}
      <Link
        href="/Sarvesh_Bhoir_Resume.pdf"
        target="_blank"
        onClick={closeMenu}
        className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#D8CFBC]
          px-4
          py-3.5
          text-sm
          font-medium
          text-[#11120D]
          transition-all
          duration-300
          active:scale-[0.98]
        "
      >
        Resume
        <Download size={17} strokeWidth={1.8} />
      </Link>
    </div>
  </div>
</header>


);
}
