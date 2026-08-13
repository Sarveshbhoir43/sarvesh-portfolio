"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Folder,
  Sparkles,
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
    demo: "#",
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
  github: "https://github.com/Sarveshbhoir43/gym-progress",
  demo: "https://expo.dev/accounts/sarveshbhoir0530/projects/gym-progress/builds/52ea9f88-911a-4012-af6c-8ad67cf6422c",
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
    github: "https://github.com/Sarveshbhoir43/royal-stay-hotel",
    demo: "https://royal-stay-hotel-tau.vercel.app",
    accent: "#D8CFBC",
  },
];

/* =========================================================
   PROJECT IMAGE
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

  const imageXRaw = useTransform(mouseX, [0, 1], [-18, 18]);
  const imageYRaw = useTransform(mouseY, [0, 1], [-12, 12]);

  const imageX = useSpring(imageXRaw, springConfig);
  const imageY = useSpring(imageYRaw, springConfig);

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (!enableTilt) return;

    const rect = imageRef.current?.getBoundingClientRect();

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

  return (
    <div
      ref={imageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[270px] overflow-hidden border-b border-[#302F29] bg-[#10110C] sm:h-[310px]"
    >
      {/* Background grid */}

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

      {/* Project image */}

      {project.image ? (
        <motion.img
          src={project.image}
          alt={`${project.title} preview`}
          style={{
            x: enableTilt ? imageX : 0,
            y: enableTilt ? imageY : 0,
            scale: 1.08,
          }}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.13] group-hover:opacity-100"
        />
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
            className="relative flex h-28 w-28 items-center justify-center rounded-[28px] border border-[#565449] bg-[#181914] shadow-[0_25px_70px_-30px_rgba(216,207,188,0.45)]"
          >
            <div className="absolute inset-[-14px] rounded-[34px] border border-[#302F29] transition-all duration-500 group-hover:inset-[-20px] group-hover:border-[#565449]" />

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

      {/* Image overlay */}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#10110C] via-transparent to-transparent opacity-80" />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[#11120D]/10 transition-colors duration-500 group-hover:bg-transparent" />

      {/* Project number */}

      <div className="absolute left-7 top-6 z-20 text-xs font-medium tracking-[0.25em] text-[#D8CFBC]/70">
        PROJECT {project.number}
      </div>

      {/* Category */}

      <div className="absolute bottom-6 left-7 z-20">
        <span className="rounded-full border border-[#565449]/70 bg-[#11120D]/80 px-3 py-1.5 text-xs text-[#A6A397] backdrop-blur-md">
          {project.category}
        </span>
      </div>

      {/* Corner decoration */}

      <div className="absolute bottom-6 right-7 z-20 h-8 w-8">
        <span className="absolute right-0 top-0 h-px w-8 bg-[#565449]" />
        <span className="absolute right-0 top-0 h-8 w-px bg-[#565449]" />
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
        }}
        whileHover={
          enableMotion
            ? {
                y: -7,
              }
            : undefined
        }
        className="relative h-full overflow-hidden rounded-3xl border border-[#302F29] bg-[#151610] transition-all duration-500 hover:border-[#565449] hover:shadow-[0_30px_80px_-45px_rgba(216,207,188,0.35)]"
      >
        {/* Ambient glow */}

        <div
          className="pointer-events-none absolute -right-32 -top-32 z-0 h-72 w-72 rounded-full opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-100"
          style={{
            backgroundColor: `${project.accent}12`,
          }}
        />

        {/* Top line */}

        <div className="absolute left-0 right-0 top-0 z-30 h-px bg-[#302F29]">
          <div
            className="mx-auto h-full w-0 bg-[#D8CFBC] transition-all duration-700 group-hover:w-1/2"
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

        <div className="relative z-10 p-7 sm:p-8">
          {/* Title */}

          <div className="flex items-start justify-between gap-4">
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
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#302F29] transition-all duration-500 group-hover:border-[#565449] group-hover:bg-[#D8CFBC]"
            >
              <ArrowUpRight
                size={18}
                className="text-[#6F6D64] transition-colors duration-500 group-hover:text-[#11120D]"
              />
            </motion.div>
          </div>

          {/* Description */}

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#77746B] sm:text-[15px]">
            {project.description}
          </p>

          {/* Technologies */}

          <div className="mt-6 flex flex-wrap gap-2">
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
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index * 0.1 +
                      techIndex * 0.04,
                    duration: 0.3,
                  }}
                  className="rounded-full border border-[#302F29] bg-[#11120D] px-3 py-1.5 text-xs text-[#77746B] transition-all duration-300 hover:border-[#565449] hover:text-[#D8CFBC]"
                >
                  {technology}
                </motion.span>
              )
            )}
          </div>

          {/* Actions */}

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#25251F] pt-6">
            {/* GitHub */}

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button inline-flex items-center gap-2 rounded-full border border-[#3A3932] bg-[#11120D] px-4 py-2.5 text-sm text-[#A6A397] transition-all duration-300 hover:border-[#6A675D] hover:bg-[#1A1B15] hover:text-[#FFFBF4]"
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
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#292921] bg-[#11120D] px-4 py-2.5 text-sm text-[#4F4D47]">
                <FaGithub size={16} />
                GitHub
              </span>
            )}

            {/* Live Demo */}

            {project.demo &&
            project.demo !== "#" ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/demo inline-flex items-center gap-2 rounded-full bg-[#D8CFBC] px-4 py-2.5 text-sm font-medium text-[#11120D] transition-all duration-300 hover:bg-[#FFFBF4] hover:shadow-[0_10px_30px_-15px_rgba(216,207,188,0.7)]"
              >
                <span>Live Demo</span>

                <ExternalLink
                  size={15}
                  className="transition-transform duration-300 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
                />
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-[#302F29] bg-[#181914] px-4 py-2.5 text-sm text-[#5F5D56]">
                <span>Live Demo</span>

                <ExternalLink size={15} />
              </span>
            )}
          </div>
        </div>
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

  const enableMotion = !prefersReducedMotion;

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
    isFinePointer && !prefersReducedMotion;

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#11120D] px-6 py-28 text-[#FFFBF4] sm:py-36"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Main glow */}

        <div className="absolute left-1/2 top-[25%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#D8CFBC]/[0.025] blur-[150px]" />

        {/* Side glow */}

        <div className="absolute -right-64 bottom-[10%] h-[500px] w-[500px] rounded-full bg-[#D8CFBC]/[0.02] blur-[140px]" />

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
            A selection of projects where I turn ideas
            into functional, interactive and polished
            digital experiences.
          </p>

          {/* Project count */}

          <div className="mt-8 flex items-center gap-3 text-sm text-[#5F5D56]">
            <span className="h-px w-8 bg-[#302F29]" />

            <span>
              {projects.length
                .toString()
                .padStart(2, "0")}{" "}
              projects
            </span>
          </div>
        </motion.div>

        {/* Project grid */}

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

        {/* Bottom statement */}

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
          className="mt-16 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[#57554E] sm:text-sm"
        >
          <span className="h-px w-8 bg-[#302F29] sm:w-12" />

          <span>More ideas. More builds.</span>

          <span className="h-px w-8 bg-[#302F29] sm:w-12" />
        </motion.div>
      </div>
    </section>
  );
}