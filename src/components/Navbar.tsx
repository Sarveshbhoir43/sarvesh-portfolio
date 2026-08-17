"use client";

import Link from "next/link";
import { Download } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        
        {/* Logo */}
        <Link
          href="#home"
          className="text-2xl font-semibold tracking-tight text-[#FFFBF4]"
        >
          SB<span className="text-[#D8CFBC]">.</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm transition-colors duration-300 ${
                index === 0
                  ? "text-[#FFFBF4]"
                  : "text-[#A6A397] hover:text-[#FFFBF4]"
              }`}
            >
              {link.name}

              {/* Active underline */}
              {index === 0 && (
                <span className="absolute -bottom-2 left-0 h-px w-full bg-[#D8CFBC]" />
              )}
            </Link>
          ))}
        </div>

        {/* Resume Button */}
        <Link
          href="/Sarvesh_Bhoir_Resume.pdf"
          target="_blank"
          className="hidden items-center gap-2 rounded-lg border border-[#302F29] bg-[#181914] px-4 py-2.5 text-sm text-[#FFFBF4] transition-all duration-300 hover:border-[#D8CFBC] hover:bg-[#D8CFBC] hover:text-[#11120D] sm:flex"
        >
          Resume
          <Download size={16} strokeWidth={1.8} />
        </Link>

      </nav>
    </header>
  );
}