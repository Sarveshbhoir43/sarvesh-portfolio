"use client";

import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import OrbitSystem from "@/components/3d/OrbitSystem";

/* =========================================================
   CONTACT / SOCIAL
========================================================= */

const EMAIL = "bhoirsarvesh30@gmail.com";

const GMAIL_COMPOSE_URL =
  `https://mail.google.com/mail/?view=cm&fs=1` +
  `&to=${encodeURIComponent(EMAIL)}` +
  `&su=${encodeURIComponent("Let's Work Together")}`;

/* =========================================================
   HANGING PROFILE BADGE
========================================================= */

function HangingProfile({
  enableMotion,
}: {
  enableMotion: boolean;
}) {
  return (
    <div className="relative flex flex-col items-start">
      {/* Cable */}
      <motion.div
        initial={
          enableMotion
            ? { scaleY: 0, opacity: 0 }
            : false
        }
        animate={
          enableMotion
            ? { scaleY: 1, opacity: 1 }
            : undefined
        }
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "top" }}
        className="relative z-0 -mb-15 h-20 w-px bg-gradient-to-b from-[#D8CFBC] via-[#565449] to-[#302F29]"
      >
        {/* Anchor ring */}
        <span className="absolute -top-3 left-1 h-2 w-2 -translate-x-2 rounded-full border border-[#D8CFBC] bg-[#11120D]" />
      </motion.div>

      {/* Profile badge */}
      <motion.div
        initial={
          enableMotion
            ? {
              opacity: 0,
              y: -20,
              rotate: -5,
            }
            : false
        }
        animate={
          enableMotion
            ? {
              opacity: 1,
              y: 0,
              rotate: -2,
            }
            : undefined
        }
        transition={{
          duration: 0.7,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={
          enableMotion
            ? {
              rotate: 0,
              scale: 1,
            }
            : undefined
        }
        className="group relative"
      >
        <motion.div
          animate={
            enableMotion
              ? {
                rotate: [-2, 1.5, -2],
              }
              : undefined
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "top center" }}
          className="relative"
        >
          <div
            className="
              relative
              h-44
              w-44
              overflow-hidden
              rounded-full
              border
              border-[#302F29]
              bg-[#151610]
              p-1.5
              shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)]
              transition-all
              duration-500
              group-hover:border-[#D8CFBC]/60
              group-hover:shadow-[0_30px_80px_-25px_rgba(216,207,188,0.35)]
              sm:h-60
              sm:w-52
            "
          >
            {/* Photo highlight */}
            <div className="pointer-events-none absolute inset-0 z-10 rounded-full bg-gradient-to-t from-[#D8CFBC]/0 via-transparent to-[#D8CFBC]/10" />

            <img
              src="/profile.png"
              alt="Sarvesh Bhoir"
              className="
                h-full
                w-full
                rounded-full
                object-cover
                grayscale-[10%]
                transition-all
                duration-500
                group-hover:grayscale-0
              "
            />
          </div>

          {/* Availability */}
          <span
            className="
              absolute
              -bottom-3
              -right-3
              flex
              h-7
              items-center
              gap-1.5
              rounded-full
              border
              border-[#302F29]
              bg-[#151610]/90
              px-2.5
              text-[10px]
              uppercase
              tracking-wide
              text-[#A6A397]
              backdrop-blur-sm
            "
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D8CFBC]/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D8CFBC]" />
            </span>

            Available
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#11120D]
        pt-16
        text-[#FFFBF4]
      "
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-40
          h-[380px]
          w-[380px]
          rounded-full
          bg-[#D8CFBC]/10
          blur-[130px]
        "
      />

      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          items-start
          gap-12
          px-6
          pb-16
          lg:grid-cols-2
          lg:items-center
          lg:px-8
        "
      >
        {/* =================================================
            LEFT — PROFILE + INTRO
        ================================================= */}

        <div className="text-left">
          <HangingProfile enableMotion={enableMotion} />

          <div className="mt-10">
            {/* Greeting */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D8CFBC]" />

              <p className="text-sm uppercase tracking-[0.3em] text-[#D8CFBC]">
                Hi, I&apos;m
              </p>
            </div>

            {/* Name */}
            <h1
              className="
                max-w-xl
                text-5xl
                font-semibold
                leading-tight
                tracking-tight
                sm:text-6xl
                lg:text-5xl
              "
            >
              Sarvesh{" "}
              <span className="bg-gradient-to-r from-[#D8CFBC] to-[#FFFBF4] bg-clip-text text-transparent">
                Bhoir
              </span>
            </h1>

            {/* Role */}
            <h3 className="mt-3 text-3xl font-medium text-[#D8CFBC]">
              Full Stack Developer{" "}
              <span className="text-[#565449]">|</span>{" "}
              Java Developer
            </h3>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#A6A397]">
              I&apos;m a passionate Full Stack Developer focused on
              building modern, responsive, and efficient web
              applications with clean code and thoughtful user
              experiences.
            </p>

            {/* =================================================
                CTA BUTTONS
            ================================================= */}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#projects"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#D8CFBC]
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-[#11120D]
                  transition
                  duration-300
                  hover:shadow-[0_0_28px_-6px_rgba(216,207,188,0.6)]
                "
              >
                View Projects

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <Link
                href="#contact"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-[#565449]
                  px-6
                  py-3
                  text-sm
                  text-[#FFFBF4]
                  transition
                  duration-300
                  hover:border-[#D8CFBC]
                  hover:bg-[#151610]
                "
              >
                Contact Me
              </Link>
            </div>

            {/* =================================================
                SOCIAL ICONS
            ================================================= */}

            <div className="mt-10 flex items-center gap-4 text-[#A6A397]">
              {/* GitHub */}
              <Link
                href="https://github.com/Sarveshbhoir43"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#302F29]
                  bg-[#151610]
                  transition
                  duration-300
                  hover:border-[#D8CFBC]
                  hover:text-[#FFFBF4]
                  hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.45)]
                "
              >
                <FaGithub size={19} />
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/in/sarvesh-bhoir-63790a3ba/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#302F29]
                  bg-[#151610]
                  transition
                  duration-300
                  hover:border-[#D8CFBC]
                  hover:text-[#FFFBF4]
                  hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.45)]
                "
              >
                <FaLinkedin size={19} />
              </Link>

              {/* Gmail */}
              <Link
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send me an email"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#302F29]
                  bg-[#151610]
                  transition
                  duration-300
                  hover:border-[#D8CFBC]
                  hover:text-[#FFFBF4]
                  hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.45)]
                "
              >
                <Mail size={19} />
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT — 3D SB + ORBITING TECHNOLOGIES
        ================================================= */}

        <div
          className="
            relative
    -mx-6
    flex
    h-[430px]
    w-[calc(100%+3rem)]
    items-center
    justify-center
    overflow-hidden

    sm:mx-0
    sm:h-[520px]
    sm:w-full

    lg:h-[500px]
  "
        >
          <OrbitSystem />
        </div>
      </div>
    </section>
  );
}
