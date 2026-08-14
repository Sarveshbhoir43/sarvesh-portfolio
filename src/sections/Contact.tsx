"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

import{ FaGithub,
  FaLinkedin,} from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

interface ContactLink {
  label: string;
  value: string;
  href: string;
              icon: React.ComponentType<{
    size?: string | number;
    className?: string;
  }>;
}

/* =========================================================
   CONTACT LINKS
========================================================= */

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "bhoirsarvesh30@gmail.com",
    href: "mailto:bhoirsarvesh30@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Sarveshbhoir43",
    href: "https://github.com/Sarveshbhoir43",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sarvesh-bhoir",
    href: "https://www.linkedin.com/in/sarvesh-bhoir/",
    icon: FaLinkedin,
  },
];

/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function MagneticButton({
  href,
  children,
  enableMotion,
}: {
  href: string;
  children: React.ReactNode;
  enableMotion: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 250,
    damping: 18,
    mass: 0.4,
  });

  const springY = useSpring(y, {
    stiffness: 250,
    damping: 18,
    mass: 0.4,
  });

  function handleMouseMove(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    if (!enableMotion) return;

    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    const mouseX =
      event.clientX - (rect.left + rect.width / 2);

    const mouseY =
      event.clientY - (rect.top + rect.height / 2);

    x.set(Math.max(-7, Math.min(7, mouseX * 0.15)));
    y.set(Math.max(-5, Math.min(5, mouseY * 0.15)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={
        href.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        bg-[#D8CFBC]
        px-6
        py-3.5
        text-sm
        font-medium
        text-[#11120D]
        transition-all
        duration-300
        hover:bg-[#FFFBF4]
        hover:shadow-[0_15px_40px_-18px_rgba(216,207,188,0.8)]
      "
    >
      {children}
    </motion.a>
  );
}

/* =========================================================
   CONTACT CARD
========================================================= */

function ContactCard({
  item,
  index,
  enableMotion,
}: {
  item: ContactLink;
  index: number;
  enableMotion: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target={
        item.href.startsWith("http")
          ? "_blank"
          : undefined
      }
      rel={
        item.href.startsWith("http")
          ? "noopener noreferrer"
          : undefined
      }
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
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#302F29]
        bg-[#151610]
        p-5
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#565449]
        hover:bg-[#181914]
        hover:shadow-[0_25px_60px_-35px_rgba(216,207,188,0.35)]
      "
    >
      {/* Hover glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-[#D8CFBC]/0
          blur-3xl
          transition-all
          duration-700
          group-hover:bg-[#D8CFBC]/10
        "
      />

      <div className="relative flex items-center gap-4">
        {/* Icon */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-[#302F29]
            bg-[#11120D]
            transition-all
            duration-500
            group-hover:border-[#565449]
            group-hover:bg-[#1B1C16]
          "
        >
         <div
  style={{
    color:
      item.label === "GitHub"
        ? "#F0F0F0"
        : item.label === "LinkedIn"
        ? "#0A66C2"
        : "#D8CFBC",
  }}
>
  <Icon
    size={18}
    className="
      transition-transform
      duration-500
      group-hover:scale-110
    "
  />
</div>
        </div>

        {/* Text */}

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.22em] text-[#5F5D56]">
            {item.label}
          </p>

          <p className="mt-1 truncate text-sm text-[#A6A397] transition-colors duration-300 group-hover:text-[#FFFBF4]">
            {item.value}
          </p>
        </div>

        {/* Arrow */}

        <ArrowUpRight
          size={16}
          className="
            ml-auto
            shrink-0
            text-[#5F5D56]
            transition-all
            duration-300
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
            group-hover:text-[#D8CFBC]
          "
        />
      </div>
    </motion.a>
  );
}

/* =========================================================
   CONTACT SECTION
========================================================= */

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const enableMotion = !prefersReducedMotion;

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[#11120D]
        px-6
        py-28
        text-[#FFFBF4]
        sm:py-36
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Main ambient glow */}

        <motion.div
          animate={
            enableMotion
              ? {
                  x: [0, 25, 0],
                  y: [0, -15, 0],
                }
              : undefined
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[20%]
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#D8CFBC]/[0.025]
            blur-[150px]
          "
        />

        {/* Side glow */}

        <motion.div
          animate={
            enableMotion
              ? {
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }
              : undefined
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-60
            bottom-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#D8CFBC]/[0.018]
            blur-[130px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(216,207,188,0.45) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(216,207,188,0.45) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={
            enableMotion
              ? {
                  opacity: 0,
                  y: 25,
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}

          <div className="mb-5 flex items-center gap-3">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#D8CFBC]
                shadow-[0_0_8px_rgba(216,207,188,0.5)]
              "
            />

            <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#D8CFBC] sm:text-sm">
              Get In Touch
            </span>

            <span className="h-px w-12 bg-[#302F29]" />
          </div>

          {/* Heading */}

          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s build something{" "}
            <span className="text-[#D8CFBC]">
              meaningful.
            </span>
          </h2>

          {/* Description */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#8E8B82] sm:text-lg">
            Whether you have a project in mind, an
            opportunity to discuss, or simply want to
            connect, feel free to reach out.
          </p>
        </motion.div>

        {/* =================================================
            MAIN CONTACT AREA
        ================================================= */}

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:mt-20">
          {/* =================================================
              LEFT CTA CARD
          ================================================= */}

          <motion.div
            initial={
              enableMotion
                ? {
                    opacity: 0,
                    y: 30,
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-[#302F29]
              bg-[#151610]
              p-7
              sm:p-9
              lg:p-10
            "
          >
            {/* Top accent */}

            <div className="absolute left-0 right-0 top-0 h-px bg-[#302F29]">
              <div
                className="
                  mx-auto
                  h-full
                  w-0
                  bg-[#D8CFBC]
                  transition-all
                  duration-700
                  group-hover:w-1/2
                "
              />
            </div>

            {/* Ambient glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-[#D8CFBC]/0
                blur-[100px]
                transition-all
                duration-700
                group-hover:bg-[#D8CFBC]/[0.06]
              "
            />

            <div className="relative">
              {/* Small label */}

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#D8CFBC]"
                />

                <span className="text-xs uppercase tracking-[0.25em] text-[#6F6D64]">
                  Start a conversation
                </span>
              </div>

              {/* Main text */}

              <h3 className="mt-8 max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                Have an idea?
                <br />
                <span className="text-[#D8CFBC]">
                  Let&apos;s talk.
                </span>
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[#77746B] sm:text-[15px]">
                I&apos;m always interested in working on
                interesting projects, learning new things
                and creating useful digital experiences.
              </p>

              {/* CTA */}

              <div className="mt-8">
                <MagneticButton
                  href="mailto:sarvesh.bhoir@example.com"
                  enableMotion={enableMotion}
                >
                  <Send size={15} />

                  <span>Send me a message</span>

                  <ArrowUpRight size={15} />
                </MagneticButton>
              </div>

              {/* Availability */}

              <div className="mt-8 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D8CFBC]/40" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D8CFBC]" />
                </span>

                <span className="text-xs text-[#6F6D64]">
                  Open to opportunities &amp; collaborations
                </span>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              RIGHT CONTACT LINKS
          ================================================= */}

          <div className="flex flex-col gap-3">
            {contactLinks.map((item, index) => (
              <ContactCard
                key={item.label}
                item={item}
                index={index}
                enableMotion={enableMotion}
              />
            ))}

            {/* Location */}

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
              }}
              transition={{
                duration: 0.5,
                delay: 0.25,
              }}
              className="
                mt-1
                rounded-2xl
                border
                border-[#302F29]
                bg-[#151610]
                p-5
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#302F29]
                    bg-[#11120D]
                  "
                >
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#D8CFBC]"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#5F5D56]">
                    Based in
                  </p>

                  <p className="mt-1 text-sm text-[#A6A397]">
                    Mumbai, India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* =================================================
            BOTTOM LINE
        ================================================= */}

        <motion.div
          initial={
            enableMotion
              ? {
                  opacity: 0,
                }
              : false
          }
          whileInView={
            enableMotion
              ? {
                  opacity: 1,
                }
              : undefined
          }
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
            mt-20
            flex
            items-center
            justify-center
            gap-3
            text-xs
            uppercase
            tracking-[0.2em]
            text-[#57554E]
            sm:text-sm
          "
        >
          <span className="h-px w-8 bg-[#302F29] sm:w-12" />

          <span>
            Let&apos;s create something great.
          </span>

          <span className="h-px w-8 bg-[#302F29] sm:w-12" />
        </motion.div>
      </div>
    </section>
  );
}