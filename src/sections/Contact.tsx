"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

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
   3D TILT WRAPPER
   Wraps any card and gives it real perspective-based
   rotation that tracks the pointer, plus a glare sweep
   and a parallax "lift" on the inner content.
========================================================= */

function TiltCard({
  children,
  enableMotion,
  className = "",
  maxTilt = 10,
  liftZ = 40,
  glare = true,
}: {
  children: React.ReactNode;
  enableMotion: boolean;
  className?: string;
  maxTilt?: number;
  liftZ?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.5 };
  const spx = useSpring(px, springConfig);
  const spy = useSpring(py, springConfig);

  const rotateX = useTransform(spy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(spx, [0, 1], [-maxTilt, maxTilt]);
  const translateZ = useTransform(spy, [0, 0.5, 1], [0, liftZ, 0]);
  const glareX = useTransform(spx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(spy, [0, 1], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!enableMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: enableMotion ? rotateX : 0,
          rotateY: enableMotion ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full will-change-transform"
      >
        <motion.div
          style={{
            translateZ: enableMotion ? translateZ : 0,
            transformStyle: "preserve-3d",
          }}
          className="relative h-full"
        >
          {children}
        </motion.div>

        {glare && enableMotion && (
          <motion.div
            aria-hidden="true"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx} ${gy}, rgba(255,251,244,0.14), transparent 55%)`
              ),
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[inherit]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />
        )}
      </motion.div>
    </div>
  );
}

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
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  const springRX = useSpring(rX, { stiffness: 250, damping: 20, mass: 0.4 });
  const springRY = useSpring(rY, { stiffness: 250, damping: 20, mass: 0.4 });

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!enableMotion) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = event.clientX - (rect.left + rect.width / 2);
    const mouseY = event.clientY - (rect.top + rect.height / 2);

    x.set(Math.max(-7, Math.min(7, mouseX * 0.15)));
    y.set(Math.max(-5, Math.min(5, mouseY * 0.15)));
    rY.set(Math.max(-10, Math.min(10, mouseX * 0.08)));
    rX.set(Math.max(-10, Math.min(10, -mouseY * 0.08)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    rX.set(0);
    rY.set(0);
  }

  return (
    <div style={{ perspective: 500 }}>
      <motion.a
        ref={ref}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={enableMotion ? { scale: 0.94, z: -10 } : undefined}
        style={{
          x: springX,
          y: springY,
          rotateX: springRX,
          rotateY: springRY,
          transformStyle: "preserve-3d",
        }}
        className="
          group/btn
          relative
          inline-flex
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-full
          bg-[#D8CFBC]
          px-6
          py-3.5
          text-sm
          font-medium
          text-[#11120D]
          shadow-[0_18px_35px_-15px_rgba(0,0,0,0.6)]
          transition-all
          duration-300
          hover:shadow-[0_20px_45px_-15px_rgba(216,207,188,0.55)]
        "
      >
        {/* shine sweep */}
        <span
          className="
            pointer-events-none
            absolute
            inset-y-0
            -left-1/3
            w-1/3
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/60
            to-transparent
            opacity-0
            transition-all
            duration-700
            group-hover/btn:left-[130%]
            group-hover/btn:opacity-100
          "
        />
        <span className="relative flex items-center gap-2">
          {children}
        </span>
      </motion.a>
    </div>
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
    <motion.div
      initial={enableMotion ? { opacity: 0, y: 24, rotateX: -8 } : false}
      whileInView={
        enableMotion ? { opacity: 1, y: 0, rotateX: 0 } : undefined
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <TiltCard enableMotion={enableMotion} maxTilt={8} liftZ={26}>
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={
            item.href.startsWith("http")
              ? "noopener noreferrer"
              : undefined
          }
          className="
            group
            relative
            block
            h-full
            overflow-hidden
            rounded-2xl
            border
            border-[#302F29]
            bg-[#151610]
            p-5
            shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]
            transition-[border-color,background-color,box-shadow]
            duration-500
            hover:border-[#565449]
            hover:bg-[#181914]
            hover:shadow-[0_30px_70px_-35px_rgba(216,207,188,0.4)]
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

          <div
            className="relative flex items-center gap-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Icon */}
            <div
              style={{ transform: "translateZ(24px)" }}
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
                shadow-[0_10px_25px_-12px_rgba(0,0,0,0.7)]
                transition-all
                duration-500
                group-hover:-translate-y-0.5
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
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Text */}
            <div className="min-w-0" style={{ transform: "translateZ(12px)" }}>
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
              style={{ transform: "translateZ(20px)" }}
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
        </a>
      </TiltCard>
    </motion.div>
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
      <style>{`
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Side glow */}
        <motion.div
          animate={enableMotion ? { x: [0, -20, 0], y: [0, 20, 0] } : undefined}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="
            absolute
            -right-60
            top-1/4
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#D8CFBC]/[0.018]
            blur-[130px]
          "
        />

        {/* Floating depth particles */}
        {enableMotion &&
          [...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#D8CFBC]"
              style={{
                left: `${8 + i * 9.5}%`,
                top: `${15 + ((i * 37) % 70)}%`,
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                opacity: 0.12 + (i % 4) * 0.05,
                filter: "blur(0.5px)",
              }}
              animate={{
                y: [0, -18 - (i % 3) * 6, 0],
                opacity: [0.08, 0.25, 0.08],
              }}
              transition={{
                duration: 6 + (i % 5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl" style={{ perspective: 1600 }}>
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={enableMotion ? { opacity: 0, y: 25 } : false}
          whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <motion.span
              animate={
                enableMotion
                  ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }
                  : undefined
              }
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-[#D8CFBC] shadow-[0_0_8px_rgba(216,207,188,0.5)]"
            />

            <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#D8CFBC] sm:text-sm">
              Get In Touch
            </span>

            <span className="h-px w-12 bg-[#302F29]" />
          </div>

          {/* Heading */}
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s build something{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #D8CFBC 20%, #FFFBF4 50%, #D8CFBC 80%)",
                backgroundSize: "200% auto",
                animation: enableMotion ? "shine 5s linear infinite" : undefined,
              }}
            >
              meaningful.
            </span>
            <style>{`
              @keyframes shine {
                to { background-position: 200% center; }
              }
            `}</style>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#8E8B82] sm:text-lg">
            Whether you have a project in mind, an opportunity to discuss,
            or simply want to connect, feel free to reach out.
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
            initial={enableMotion ? { opacity: 0, y: 30, rotateX: -6 } : false}
            whileInView={
              enableMotion ? { opacity: 1, y: 0, rotateX: 0 } : undefined
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <TiltCard enableMotion={enableMotion} maxTilt={5} liftZ={18}>
              <div
                className="
                  group
                  relative
                  h-full
                  overflow-hidden
                  rounded-3xl
                  border
                  border-[#302F29]
                  bg-[#151610]
                  p-7
                  shadow-[0_40px_90px_-45px_rgba(0,0,0,0.8)]
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

                <div
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Small label */}
                  <div
                    className="flex items-center gap-3"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <Mail size={18} strokeWidth={1.5} className="text-[#D8CFBC]" />

                    <span className="text-xs uppercase tracking-[0.25em] text-[#6F6D64]">
                      Start a conversation
                    </span>
                  </div>

                  {/* Main text */}
                  <h3
                    className="mt-8 max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl"
                    style={{ transform: "translateZ(36px)" }}
                  >
                    Have an idea?
                    <br />
                    <span className="text-[#D8CFBC]">Let&apos;s talk.</span>
                  </h3>

                  <p
                    className="mt-5 max-w-lg text-sm leading-7 text-[#77746B] sm:text-[15px]"
                    style={{ transform: "translateZ(16px)" }}
                  >
                    I&apos;m always interested in working on interesting
                    projects, learning new things and creating useful
                    digital experiences.
                  </p>

                  {/* CTA */}
                  <div className="mt-8" style={{ transform: "translateZ(48px)" }}>
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
                  <div
                    className="mt-8 flex items-center gap-2"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D8CFBC]/40" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D8CFBC]" />
                    </span>

                    <span className="text-xs text-[#6F6D64]">
                      Open to opportunities &amp; collaborations
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
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
              initial={enableMotion ? { opacity: 0, y: 20 } : false}
              whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                animation: enableMotion ? "float-y 5s ease-in-out infinite" : undefined,
              }}
            >
              <TiltCard enableMotion={enableMotion} maxTilt={6} liftZ={18} glare={false}>
                <div className="rounded-2xl border border-[#302F29] bg-[#151610] p-5 shadow-[0_20px_45px_-25px_rgba(0,0,0,0.7)]">
                  <div
                    className="flex items-center gap-4"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      style={{ transform: "translateZ(20px)" }}
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
                      <MapPin size={18} strokeWidth={1.5} className="text-[#D8CFBC]" />
                    </div>

                    <div style={{ transform: "translateZ(10px)" }}>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#5F5D56]">
                        Based in
                      </p>

                      <p className="mt-1 text-sm text-[#A6A397]">Mumbai, India</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* =================================================
            BOTTOM LINE
        ================================================= */}

        <motion.div
          initial={enableMotion ? { opacity: 0 } : false}
          whileInView={enableMotion ? { opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
          <span>Let&apos;s create something great.</span>
          <span className="h-px w-8 bg-[#302F29] sm:w-12" />
        </motion.div>
      </div>
    </section>
  );
}