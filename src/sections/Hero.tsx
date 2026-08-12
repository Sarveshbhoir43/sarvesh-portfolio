"use client";

import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

import OrbitSystem from "@/components/3d/OrbitSystem";

export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen overflow-x-hidden bg-[#11120D] pt-28 text-[#FFFBF4]"
        >
            {/* Ambient glow accents */}
            <div className="pointer-events-none absolute -left-32 top-40 h-[380px] w-[380px] rounded-full bg-[#D8CFBC]/10 blur-[130px]" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8">
                {/* Left Side */}
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D8CFBC]" />
                        <p className="text-sm uppercase tracking-[0.3em] text-[#D8CFBC]">
                            Hi, I&apos;m
                        </p>
                    </div>

                    <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                        Sarvesh{" "}
                        <span className="bg-gradient-to-r from-[#D8CFBC] to-[#FFFBF4] bg-clip-text text-transparent">
                            Bhoir
                        </span>
                    </h1>

                    <h3 className="mt-3 text-xl font-medium text-[#D8CFBC]">
                        Full Stack Developer <span className="text-[#565449]">|</span> Java Developer
                    </h3>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-[#A6A397]">
                        I&apos;m a passionate Full Stack Developer focused on building modern,
                        responsive, and efficient web applications with clean code and
                        thoughtful user experiences.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="#projects"
                            className="group flex items-center gap-2 rounded-lg bg-[#D8CFBC] px-6 py-3 text-sm font-medium text-[#11120D] transition duration-300 hover:shadow-[0_0_28px_-6px_rgba(216,207,188,0.6)]"
                        >
                            View Projects
                            <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="#contact"
                            className="flex items-center gap-2 rounded-lg border border-[#565449] px-6 py-3 text-sm text-[#FFFBF4] transition duration-300 hover:border-[#D8CFBC] hover:bg-[#151610]"
                        >
                            Contact Me
                        </Link>
                    </div>

                    {/* Social Icons */}
                    <div className="mt-10 flex items-center gap-4 text-[#A6A397]">
                        <Link
                            href="https://github.com/"
                            target="_blank"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#302F29] bg-[#151610] transition duration-300 hover:border-[#D8CFBC] hover:text-[#FFFBF4] hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.45)]"
                        >
                            <FaGithub size={19} />
                        </Link>

                        <Link
                            href="https://linkedin.com/"
                            target="_blank"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#302F29] bg-[#151610] transition duration-300 hover:border-[#D8CFBC] hover:text-[#FFFBF4] hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.45)]"
                        >
                            <FaLinkedin size={19} />
                        </Link>

                        <Link
                            href="mailto:your@email.com"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#302F29] bg-[#151610] transition duration-300 hover:border-[#D8CFBC] hover:text-[#FFFBF4] hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.45)]"
                        >
                            <Mail size={19} />
                        </Link>
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative h-[600px] w-full lg:h-[500px]">
                    <OrbitSystem />
                </div>

            </div>
        </section>
    );
}