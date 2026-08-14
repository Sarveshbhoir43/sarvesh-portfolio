"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
  animate,
} from "framer-motion";

import {
  ArrowUpRight,
  ExternalLink,
  Folder,
  Sparkles,
  Play,
  Video,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

interface Project {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  demoType?: "website" | "video" | "app";
  accent: string;
  number: string;
}

/* =========================================================
   PROJECT DATA
========================================================= */

const projects: Project[] = [
  {
    number: "01",
    title: "AI Interview Screener",
    category: "AI / Web Application",

    description:
      "An AI-powered interview screening application designed to streamline candidate evaluation and make the initial screening process more efficient.",

    technologies: [
      "AI",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],

    image: "/projects/ai-interview-screener.png",

    github:
      "https://github.com/aiinterviewscreener/ai_interview_screener_V2",

    demo: "/projects/AI Interview Screener.mp4",

    demoType: "video",

    accent: "#D8CFBC",
  },

  {
    number: "02",
    title: "Gym Progress",
    category: "Mobile Application",

    description:
      "A fitness progress tracking app for recording workouts, exercises, weights, reps and long-term strength progression.",

    technologies: [
      "React Native",
      "Expo",
      "Expo Router",
      "EAS",
    ],

    image: "/projects/gym-progress.png",

    github:
      "https://github.com/Sarveshbhoir43/gym-progress",

    demo:
      "https://expo.dev/accounts/sarveshbhoir0530/projects/gym-progress/builds/52ea9f88-911a-4012-af6c-8ad67cf6422c",

    demoType: "app",

    accent: "#D8CFBC",
  },

  {
    number: "03",
    title: "Royal Stay Hotel",
    category: "Web Development",

    description:
      "A modern hotel website focused on presenting rooms, services and hotel information through a polished responsive experience.",

    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Vercel",
    ],

    image: "/projects/royal-stay.png",

    github:
      "https://github.com/Sarveshbhoir43/royal-stay-hotel",

    demo:
      "https://royal-stay-hotel-tau.vercel.app",

    demoType: "website",

    accent: "#D8CFBC",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/* =========================================================
   MAGNETIC LINK
========================================================= */

function MagneticLink({
  href,
  target,
  rel,
  onClick,
  enableMotion,
  className,
  children,
}: {
  href: string;
  target?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  enableMotion: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    stiffness: 220,
    damping: 16,
    mass: 0.4,
  };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    if (!enableMotion) return;

    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    const relX =
      event.clientX - (rect.left + rect.width / 2);

    const relY =
      event.clientY - (rect.top + rect.height / 2);

    x.set(clamp(relX * 0.18, -8, 8));
    y.set(clamp(relY * 0.28, -6, 6));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* =========================================================
   PROJECT COUNT
========================================================= */

function ProjectCount({
  value,
  enableMotion,
}: {
  value: number;
  enableMotion: boolean;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  const isInView = useInView(numberRef, {
    once: true,
    amount: 0.8,
  });

  useEffect(() => {
    if (!isInView || !numberRef.current) return;

    const format = (n: number) =>
      n.toString().padStart(2, "0");

    if (!enableMotion) {
      numberRef.current.textContent = format(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 0.7,
      ease: "easeOut",

      onUpdate: (v) => {
        if (numberRef.current) {
          numberRef.current.textContent = format(
            Math.round(v)
          );
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, enableMotion]);

  return <span ref={numberRef}>00</span>;
}

/* =========================================================
   PROJECT IMAGE / VIDEO PREVIEW

   IMPORTANT:
   Mobile project images use object-contain so the
   complete vertical screenshot stays visible.
========================================================= */

function ProjectImage({
  project,
  enableTilt,
}: {
  project: Project;
  enableTilt: boolean;
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
  };

  const imageXRaw = useTransform(
    mouseX,
    [0, 1],
    [-10, 10]
  );

  const imageYRaw = useTransform(
    mouseY,
    [0, 1],
    [-8, 8]
  );

  const imageX = useSpring(
    imageXRaw,
    springConfig
  );

  const imageY = useSpring(
    imageYRaw,
    springConfig
  );

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (!enableTilt) return;

    const rect =
      imageRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(
      (event.clientX - rect.left) / rect.width
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height
    );
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  /*
   * Mobile applications normally have portrait screenshots.
   *
   * object-contain = shows the complete image.
   * object-cover   = crops portrait images.
   *
   * Therefore Gym Progress gets object-contain.
   */

  const isMobileProject =
    project.demoType === "app";

  return (
    <div
      ref={imageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[270px] overflow-hidden border-b border-[#302F29] bg-[#10110C] sm:h-[310px]"
    >
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(216,207,188,0.5) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(216,207,188,0.5) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* =====================================================
          IMAGE
      ===================================================== */}

      {project.image ? (
        <>
          {/* Soft background behind portrait screenshot */}

          {isMobileProject && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[85%] w-[45%] rounded-[40px] bg-[#D8CFBC]/[0.035] blur-[45px]" />
            </div>
          )}

          <motion.img
            src={project.image}
            alt={`${project.title} preview`}
            style={{
              x: enableTilt ? imageX : 0,
              y: enableTilt ? imageY : 0,

              /*
               * Desktop websites get a slight zoom.
               * Mobile screenshot stays almost normal size
               * because we don't want it cropped.
               */
              scale: isMobileProject ? 1.02 : 1.08,
            }}
            className={
              isMobileProject
                ? `
                  absolute inset-0
                  h-full w-full
                  object-contain
                  p-5
                  opacity-90
                  transition-all duration-700
                  group-hover:scale-[1.04]
                  group-hover:opacity-100
                `
                : `
                  absolute inset-0
                  h-full w-full
                  object-cover
                  opacity-80
                  transition-all duration-700
                  group-hover:scale-[1.13]
                  group-hover:rotate-[1deg]
                  group-hover:opacity-100
                `
            }
          />

          {/* Portrait screenshot frame */}

          {isMobileProject && (
            <div
              className="
                pointer-events-none
                absolute inset-y-4 left-1/2
                w-[calc(45%)]
                -translate-x-1/2
                rounded-[28px]
                border border-[#D8CFBC]/10
                opacity-70
              "
            />
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: 4,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
            }}
            className="
              relative
              flex h-28 w-28
              items-center justify-center
              rounded-[28px]
              border border-[#565449]
              bg-[#181914]
              shadow-[0_25px_70px_-30px_rgba(216,207,188,0.45)]
            "
          >
            <div
              className="
                absolute inset-[-14px]
                rounded-[34px]
                border border-[#302F29]
                transition-all duration-500
                group-hover:inset-[-20px]
                group-hover:border-[#565449]
              "
            />

            <Folder
              size={46}
              strokeWidth={1.2}
              className="text-[#D8CFBC]"
            />

            <Sparkles
              size={17}
              className="absolute -right-2 -top-2 text-[#D8CFBC]"
            />
          </motion.div>
        </div>
      )}

      {/* =====================================================
          VIDEO INDICATOR
      ===================================================== */}

      {project.demoType === "video" && (
        <div className="absolute right-6 top-6 z-20">
          <div className="flex items-center gap-2 rounded-full border border-[#565449]/70 bg-[#11120D]/80 px-3 py-1.5 text-xs text-[#D8CFBC] backdrop-blur-md">
            <Video size={13} />

            <span>Demo Video</span>
          </div>
        </div>
      )}

      {/* =====================================================
          IMAGE OVERLAY
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#10110C] via-transparent to-transparent opacity-80" />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[#11120D]/10 transition-colors duration-500 group-hover:bg-transparent" />

      {/* =====================================================
          PROJECT NUMBER
      ===================================================== */}

      <div className="absolute left-7 top-6 z-20 text-xs font-medium tracking-[0.25em] text-[#D8CFBC]/70">
        PROJECT {project.number}
      </div>

      {/* =====================================================
          CATEGORY
      ===================================================== */}

      <div className="absolute bottom-6 left-7 z-20">
        <span className="rounded-full border border-[#565449]/70 bg-[#11120D]/80 px-3 py-1.5 text-xs text-[#A6A397] backdrop-blur-md">
          {project.category}
        </span>
      </div>

      {/* =====================================================
          CORNER DECORATION
      ===================================================== */}

      <div className="absolute bottom-6 right-7 z-20 h-8 w-8">
        <span className="absolute right-0 top-0 h-px w-8 bg-[#565449] transition-all duration-500 group-hover:w-11 group-hover:bg-[#D8CFBC]" />

        <span className="absolute right-0 top-0 h-8 w-px bg-[#565449] transition-all duration-500 group-hover:h-11 group-hover:bg-[#D8CFBC]" />
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
  enableMotion,
  enableTilt,
}: {
  project: Project;
  index: number;
  enableMotion: boolean;
  enableTilt: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = {
    stiffness: 180,
    damping: 22,
    mass: 0.5,
  };

  const rotateXRaw = useTransform(
    mouseY,
    [0, 1],
    [5, -5]
  );

  const rotateYRaw = useTransform(
    mouseX,
    [0, 1],
    [-5, 5]
  );

  const rotateX = useSpring(
    rotateXRaw,
    springConfig
  );

  const rotateY = useSpring(
    rotateYRaw,
    springConfig
  );

  const spotlightX = useTransform(
    mouseX,
    [0, 1],
    ["0%", "100%"]
  );

  const spotlightY = useTransform(
    mouseY,
    [0, 1],
    ["0%", "100%"]
  );

  const spotlightBackground =
    useMotionTemplate`
      radial-gradient(
        480px circle at ${spotlightX} ${spotlightY},
        rgba(216,207,188,0.12),
        transparent 45%
      )
    `;

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (!enableTilt) return;

    const rect =
      cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(
      (event.clientX - rect.left) / rect.width
    );

    mouseY.set(
      (event.clientY - rect.top) / rect.height
    );
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  function openDemo(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    if (!project.demo) return;

    if (project.demoType === "video") {
      return;
    }
  }

  return (
    <motion.article
      initial={
        enableMotion
          ? {
              opacity: 0,
              y: 45,
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        whileHover={
          enableMotion
            ? {
                y: -7,
                scale: 1.01,
              }
            : undefined
        }
        className="
          relative h-full
          overflow-hidden
          rounded-3xl
          border border-[#302F29]
          bg-[#151610]
          transition-all duration-500
          hover:border-[#565449]
          hover:shadow-[0_30px_80px_-45px_rgba(216,207,188,0.35)]
        "
      >
        {/* Ambient glow */}

        <div
          className="
            pointer-events-none
            absolute -right-32 -top-32
            z-0 h-72 w-72
            rounded-full
            opacity-0
            blur-[100px]
            transition-opacity duration-700
            group-hover:opacity-100
          "
          style={{
            backgroundColor: `${project.accent}12`,
          }}
        />

        {/* Ghost numeral */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-4 -right-2
            z-0 select-none
            text-[140px]
            font-bold
            leading-none
            text-[#D8CFBC]/[0.045]
            sm:-bottom-6
            sm:text-[180px]
          "
        >
          {project.number}
        </div>

        {/* Top line */}

        <div className="absolute left-0 right-0 top-0 z-30 h-px bg-[#302F29]">
          <div
            className="
              mx-auto h-full w-0
              bg-[#D8CFBC]
              transition-all duration-700
              group-hover:w-1/2
            "
            style={{
              boxShadow:
                "0 0 15px rgba(216,207,188,0.5)",
            }}
          />
        </div>

        {/* Project visual */}

        <ProjectImage
          project={project}
          enableTilt={enableTilt}
        />

        {/* Content */}

        <div
          style={{
            transformStyle: "preserve-3d",
          }}
          className="relative z-10 p-7 sm:p-8"
        >
          {/* Title */}

          <div
            style={{
              transform: "translateZ(20px)",
            }}
            className="flex items-start justify-between gap-4"
          >
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#5F5D56]">
                {project.number}
              </p>

              <h3 className="text-2xl font-semibold tracking-tight text-[#FFFBF4] transition-colors duration-300 group-hover:text-[#D8CFBC] sm:text-3xl">
                {project.title}
              </h3>
            </div>

            <motion.div
              whileHover={{
                rotate: 45,
                scale: 1.08,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full
                border border-[#302F29]
                transition-all duration-500
                group-hover:border-[#565449]
                group-hover:bg-[#D8CFBC]
                group-hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.5)]
              "
            >
              <ArrowUpRight
                size={18}
                className="text-[#6F6D64] transition-colors duration-500 group-hover:text-[#11120D]"
              />
            </motion.div>
          </div>

          {/* Description */}

          <p
            style={{
              transform: "translateZ(8px)",
            }}
            className="mt-5 max-w-xl text-sm leading-7 text-[#77746B] sm:text-[15px]"
          >
            {project.description}
          </p>

          {/* Technologies */}

          <div
            style={{
              transform: "translateZ(6px)",
            }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.technologies.map(
              (technology, techIndex) => (
                <motion.span
                  key={technology}
                  initial={
                    enableMotion
                      ? {
                          opacity: 0,
                          scale: 0.9,
                        }
                      : false
                  }
                  whileInView={
                    enableMotion
                      ? {
                          opacity: 1,
                          scale: 1,
                        }
                      : undefined
                  }
                  whileHover={
                    enableMotion
                      ? {
                          y: -2,
                          scale: 1.05,
                        }
                      : undefined
                  }
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index * 0.1 +
                      techIndex * 0.04,
                    duration: 0.3,
                  }}
                  className="
                    rounded-full
                    border border-[#302F29]
                    bg-[#11120D]
                    px-3 py-1.5
                    text-xs
                    text-[#77746B]
                    transition-all duration-300
                    hover:border-[#565449]
                    hover:text-[#D8CFBC]
                  "
                >
                  {technology}
                </motion.span>
              )
            )}
          </div>

          {/* Actions */}

          <div
            style={{
              transform: "translateZ(2px)",
            }}
            className="
              mt-8 flex flex-wrap
              items-center gap-3
              border-t border-[#25251F]
              pt-6
            "
          >
            {/* GitHub */}

            {project.github ? (
              <MagneticLink
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                enableMotion={enableMotion}
                className="
                  group/button
                  inline-flex
                  items-center gap-2
                  rounded-full
                  border border-[#3A3932]
                  bg-[#11120D]
                  px-4 py-2.5
                  text-sm
                  text-[#A6A397]
                  transition-all duration-300
                  hover:border-[#6A675D]
                  hover:bg-[#1A1B15]
                  hover:text-[#FFFBF4]
                "
              >
                <FaGithub
                  size={16}
                  className="transition-transform duration-300 group-hover/button:scale-110"
                />

                <span>GitHub</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-50 transition-all duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 group-hover/button:opacity-100"
                />
              </MagneticLink>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#292921] bg-[#11120D] px-4 py-2.5 text-sm text-[#4F4D47]">
                <FaGithub size={16} />

                GitHub
              </span>
            )}

            {/* Demo */}

            {project.demo ? (
              <MagneticLink
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={openDemo}
                enableMotion={enableMotion}
                className="
                  group/demo
                  relative
                  inline-flex
                  items-center gap-2
                  overflow-hidden
                  rounded-full
                  bg-[#D8CFBC]
                  px-4 py-2.5
                  text-sm font-medium
                  text-[#11120D]
                  transition-all duration-300
                  hover:bg-[#FFFBF4]
                  hover:shadow-[0_10px_30px_-15px_rgba(216,207,188,0.7)]
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute inset-y-0 -left-1/2
                    z-0 w-1/3
                    -skew-x-12
                    bg-white/50
                    blur-sm
                    transition-transform duration-700
                    ease-out
                    group-hover/demo:translate-x-[420%]
                  "
                />

                {project.demoType === "video" ? (
                  <Play
                    size={15}
                    fill="currentColor"
                    className="relative z-10 transition-transform duration-300 group-hover/demo:scale-110"
                  />
                ) : (
                  <ExternalLink
                    size={15}
                    className="relative z-10 transition-transform duration-300 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
                  />
                )}

                <span className="relative z-10">
                  {project.demoType === "video"
                    ? "Watch Demo"
                    : project.demoType === "app"
                    ? "Get App"
                    : "Live Demo"}
                </span>
              </MagneticLink>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#302F29] bg-[#181914] px-4 py-2.5 text-sm text-[#5F5D56]">
                <span>Live Demo</span>

                <ExternalLink size={15} />
              </span>
            )}
          </div>
        </div>

        {/* Cursor spotlight */}

        <motion.div
          style={{
            background: spotlightBackground,
          }}
          className="
            pointer-events-none
            absolute inset-0
            z-20
            mix-blend-screen
            opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        />
      </motion.div>
    </motion.article>
  );
}

/* =========================================================
   PROJECTS SECTION
========================================================= */

export default function Projects() {
  const prefersReducedMotion =
    useReducedMotion();

  const enableMotion =
    !prefersReducedMotion;

  const [isFinePointer, setIsFinePointer] =
    useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    setIsFinePointer(mediaQuery.matches);

    const handleChange = (
      event: MediaQueryListEvent
    ) => {
      setIsFinePointer(event.matches);
    };

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  const enableTilt =
    isFinePointer &&
    !prefersReducedMotion;

  return (
    <section
      id="projects"
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
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          animate={
            enableMotion
              ? {
                  x: [0, 24, 0],
                  y: [0, -16, 0],
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
            top-[25%]
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#D8CFBC]/[0.025]
            blur-[150px]
          "
        />

        <motion.div
          animate={
            enableMotion
              ? {
                  x: [0, -20, 0],
                  y: [0, 18, 0],
                }
              : undefined
          }
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-64
            bottom-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#D8CFBC]/[0.02]
            blur-[140px]
          "
        />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
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
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}

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
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8CFBC] shadow-[0_0_8px_rgba(216,207,188,0.5)]" />

            <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#D8CFBC] sm:text-sm">
              Selected Work
            </span>

            <span className="h-px w-12 bg-[#302F29]" />
          </div>

          {/* Heading */}

          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Things I&apos;ve{" "}
            <span className="text-[#D8CFBC]">
              built.
            </span>
          </h2>

          {/* Description */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#8E8B82] sm:text-lg">
            A selection of projects where I turn
            ideas into functional, interactive and
            polished digital experiences.
          </p>

          {/* Project count */}

          <div className="mt-8 flex items-center gap-3 text-sm text-[#5F5D56]">
            <span className="h-px w-8 bg-[#302F29]" />

            <span className="inline-flex items-center gap-1">
              <ProjectCount
                value={projects.length}
                enableMotion={enableMotion}
              />

              <span>projects</span>
            </span>
          </div>
        </motion.div>

        {/* =================================================
            PROJECT GRID
        ================================================= */}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              enableMotion={enableMotion}
              enableTilt={enableTilt}
            />
          ))}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
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
            delay: 0.25,
          }}
          className="
            mt-16
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
            More ideas. More builds.
          </span>

          <span className="h-px w-8 bg-[#302F29] sm:w-12" />
        </motion.div>
      </div>
    </section>
  );
}