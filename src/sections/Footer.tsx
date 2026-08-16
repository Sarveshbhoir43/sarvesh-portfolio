"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#11120D]
        px-6
        pt-20
        text-[#FFFBF4]
        sm:pt-24
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
  aria-hidden="true"
  className="
    pointer-events-none
    absolute
    -right-60
    bottom-25
    h-[350px]
    w-[600px]
    translate-x-1/4
    rounded-full
    bg-[#D8CFBC]/[0.025]
    blur-[130px]
  "
/>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* =================================================
            TOP DIVIDER
        ================================================= */}

        <motion.div
          initial={
            enableMotion
              ? {
                  scaleX: 0,
                  opacity: 0,
                }
              : false
          }
          whileInView={
            enableMotion
              ? {
                  scaleX: 1,
                  opacity: 1,
                }
              : undefined
          }
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            h-px
            origin-left
            bg-[#302F29]
          "
        />

        {/* =================================================
            MAIN FOOTER CONTENT
        ================================================= */}

        <div
          className="
            grid
            gap-14
            py-16
            lg:grid-cols-[1.2fr_1fr]
            lg:gap-20
            lg:py-20
          "
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <motion.div
            initial={
              enableMotion
                ? {
                    opacity: 0,
                    y: 20,
                  }
                : false
            }
            whileInView={
              enableMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Name */}

            <a
              href="#"
              className="
                inline-block
                text-xl
                font-semibold
                tracking-[0.12em]
                text-[#FFFBF4]
                transition-colors
                duration-300
                hover:text-[#D8CFBC]
              "
            >
              SARVESH
            </a>

            {/* Role */}

            <p
              className="
                mt-4
                text-sm
                uppercase
                tracking-[0.22em]
                text-[#D8CFBC]
              "
            >
              Java Developer • Full-Stack Developer
            </p>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-[#77746B]
              "
            >
              Building useful digital experiences with code,
              while continuously learning, experimenting and
              improving.
            </p>

            {/* Social links */}

            <div className="mt-7 flex items-center gap-3">

              {/* GitHub */}

              <a
                href="https://github.com/Sarveshbhoir43"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  group
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#302F29]
                  bg-[#151610]
                  text-[#A6A397]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#565449]
                  hover:bg-[#1B1C16]
                  hover:text-[#FFFBF4]
                "
              >
                <FaGithub
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </a>

              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/in/sarvesh-bhoir/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  group
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#302F29]
                  bg-[#151610]
                  text-[#A6A397]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#565449]
                  hover:bg-[#1B1C16]
                  hover:text-[#FFFBF4]
                "
              >
                <FaLinkedin
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </a>

            </div>
          </motion.div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <motion.div
            initial={
              enableMotion
                ? {
                    opacity: 0,
                    y: 20,
                  }
                : false
            }
            whileInView={
              enableMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              lg:justify-self-end
              lg:w-full
              lg:max-w-sm
            "
          >
            {/* Label */}

            <div className="flex items-center gap-3">
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#D8CFBC]
                "
              />

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-[#6F6D64]
                "
              >
                Navigation
              </span>
            </div>

            {/* Links */}

            <nav className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={
                    enableMotion
                      ? {
                          opacity: 0,
                          x: -8,
                        }
                      : false
                  }
                  whileInView={
                    enableMotion
                      ? {
                          opacity: 1,
                          x: 0,
                        }
                      : undefined
                  }
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: 0.15 + index * 0.05,
                  }}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-[#8E8B82]
                    transition-colors
                    duration-300
                    hover:text-[#FFFBF4]
                  "
                >
                  <span
                    className="
                      h-px
                      w-0
                      bg-[#D8CFBC]
                      transition-all
                      duration-300
                      group-hover:w-3
                    "
                  />

                  <span>{item.label}</span>
                </motion.a>
              ))}
            </nav>

            {/* Contact shortcut */}

            <a
              href="#contact"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-2
                text-sm
                text-[#D8CFBC]
                transition-colors
                duration-300
                hover:text-[#FFFBF4]
              "
            >
              <span>Have a project in mind?</span>

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </motion.div>
        </div>

        {/* =================================================
            BOTTOM DIVIDER
        ================================================= */}

        <div className="h-px bg-[#302F29]" />

        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-5
            py-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* Copyright */}

          <p
            className="
              text-xs
              tracking-wide
              text-[#57554E]
            "
          >
            © 2026 Sarvesh Bhoir. All rights reserved.
          </p>

          {/* Center text */}

          <p
            className="
              text-xs
              tracking-wide
              text-[#57554E]
            "
          >
            Designed & built with code.
          </p>

          {/* Back to top */}

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={
              enableMotion
                ? {
                    y: -3,
                  }
                : undefined
            }
            whileTap={
              enableMotion
                ? {
                    scale: 0.95,
                  }
                : undefined
            }
            className="
              group
              inline-flex
              items-center
              gap-2
              self-start
              text-xs
              uppercase
              tracking-[0.18em]
              text-[#6F6D64]
              transition-colors
              duration-300
              hover:text-[#D8CFBC]
              sm:self-auto
            "
          >
            <span>Back to top</span>

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#302F29]
                bg-[#151610]
                transition-all
                duration-300
                group-hover:border-[#565449]
                group-hover:bg-[#1B1C16]
              "
            >
              <ArrowUp
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />
            </span>
          </motion.button>
        </div>

        {/* =================================================
            FINAL ACCENT
        ================================================= */}

        <div className="flex justify-center pb-5">
          <span
            className="
              h-1
              w-1
              rounded-full
              bg-[#D8CFBC]
              opacity-50
            "
          />
        </div>
      </div>
    </footer>
  );
}