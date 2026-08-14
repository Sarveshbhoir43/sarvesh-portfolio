"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Rocket,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  technologies?: string[];
  icon: React.ReactNode;
  featured?: boolean;
}

/* =========================================================
   JOURNEY DATA
========================================================= */

const journey: JourneyItem[] = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Started my programming journey by learning the fundamentals of web development and programming.",
    technologies: ["HTML", "CSS", "C"],
    icon: <Code2 size={20} strokeWidth={1.7} />,
  },

  {
    year: "2024",
    title: "Building the Foundation",
    description:
      "Expanded my programming knowledge and started working with databases while strengthening my core development skills.",
    technologies: ["Java", "C++", "MySQL"],
    icon: <Database size={20} strokeWidth={1.7} />,
  },

  {
    year: "2025",
    title: "Modern Web Development",
    description:
      "Moved into modern web development and started building applications using modern frontend frameworks and backend services.",
    technologies: ["React", "Next.js", "Supabase"],
    icon: <Globe size={20} strokeWidth={1.7} />,
  },

  {
    year: "2025",
    title: "Built Real Projects",
    description:
      "Turned my knowledge into real-world projects, focusing on functional applications and polished user experiences.",
    technologies: [
      "AI Interview Screener",
      "Gym Progress",
      "Royal Stay Hotel",
    ],
    icon: <Rocket size={20} strokeWidth={1.7} />,
    featured: true,
  },

  {
    year: "2026",
    title: "Currently Growing",
    description:
      "Continuing to improve my development skills while focusing on Java, full-stack development and software development.",
    technologies: [
      "Java",
      "Full-Stack Development",
      "Software Development",
    ],
    icon: <GraduationCap size={20} strokeWidth={1.7} />,
  },
];

/* =========================================================
   JOURNEY ITEM
========================================================= */

function JourneyItemCard({
  item,
  index,
  enableMotion,
}: {
  item: JourneyItem;
  index: number;
  enableMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.25,
  });

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[70px_1fr] gap-5 sm:grid-cols-[110px_1fr] sm:gap-8"
    >
      {/* YEAR */}

      <motion.div
        initial={
          enableMotion
            ? {
                opacity: 0,
                x: -20,
              }
            : false
        }
        animate={
          isInView && enableMotion
            ? {
                opacity: 1,
                x: 0,
              }
            : undefined
        }
        transition={{
          duration: 0.6,
          delay: index * 0.08,
        }}
        className="pt-1 text-right"
      >
        <span className="text-sm font-medium tracking-[0.12em] text-[#D8CFBC] sm:text-base">
          {item.year}
        </span>
      </motion.div>

      {/* TIMELINE */}

      <div className="relative pb-16 sm:pb-20">
        {/* Timeline dot */}

        <motion.div
          initial={
            enableMotion
              ? {
                  scale: 0,
                  opacity: 0,
                }
              : false
          }
          animate={
            isInView && enableMotion
              ? {
                  scale: 1,
                  opacity: 1,
                }
              : undefined
          }
          transition={{
            duration: 0.45,
            delay: index * 0.08 + 0.1,
            type: "spring",
            stiffness: 220,
            damping: 18,
          }}
          className="absolute -left-[42px] top-0 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-[#565449] bg-[#151610] text-[#D8CFBC] shadow-[0_0_25px_-8px_rgba(216,207,188,0.8)] sm:-left-[52px]"
        >
          {item.icon}
        </motion.div>

        {/* CARD */}

        <motion.div
          initial={
            enableMotion
              ? {
                  opacity: 0,
                  y: 30,
                }
              : false
          }
          animate={
            isInView && enableMotion
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: 0.7,
            delay: index * 0.08 + 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={
            enableMotion
              ? {
                  y: -4,
                }
              : undefined
          }
          className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-500 sm:p-8 ${
            item.featured
              ? "border-[#565449] bg-[#181914] hover:border-[#77746B]"
              : "border-[#302F29] bg-[#151610] hover:border-[#565449]"
          }`}
        >
          {/* Glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#D8CFBC]/[0.035] opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100" />

          {/* Top content */}

          <div className="relative z-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#5F5D56]">
                  {item.featured
                    ? "Real World Projects"
                    : "Milestone"}
                </p>

                <h3 className="text-2xl font-semibold tracking-tight text-[#FFFBF4] transition-colors duration-300 group-hover:text-[#D8CFBC] sm:text-3xl">
                  {item.title}
                </h3>
              </div>

              <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#302F29] text-[#5F5D56] transition-all duration-500 group-hover:border-[#565449] group-hover:text-[#D8CFBC] sm:flex">
                <ArrowUpRight size={16} />
              </div>
            </div>

            {/* Description */}

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#77746B] sm:text-[15px]">
              {item.description}
            </p>

            {/* Technologies */}

            {item.technologies && (
              <div className="mt-6 flex flex-wrap gap-2">
                {item.technologies.map(
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
                      animate={
                        isInView && enableMotion
                          ? {
                              opacity: 1,
                              scale: 1,
                            }
                          : undefined
                      }
                      transition={{
                        delay:
                          index * 0.08 +
                          techIndex * 0.05 +
                          0.3,
                        duration: 0.3,
                      }}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-all duration-300 ${
                        item.featured
                          ? "border-[#565449] bg-[#11120D] text-[#A6A397] hover:border-[#D8CFBC] hover:text-[#D8CFBC]"
                          : "border-[#302F29] bg-[#11120D] text-[#77746B] hover:border-[#565449] hover:text-[#D8CFBC]"
                      }`}
                    >
                      {technology}
                    </motion.span>
                  )
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN JOURNEY SECTION
========================================================= */

export default function Journey() {
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#11120D] px-6 py-28 text-[#FFFBF4] sm:py-36"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Main glow */}

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
          className="absolute left-1/2 top-[35%] h-[550px] w-[700px] -translate-x-1/2 rounded-full bg-[#D8CFBC]/[0.02] blur-[150px]"
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
          className="absolute -left-64 bottom-[15%] h-[450px] w-[450px] rounded-full bg-[#D8CFBC]/[0.015] blur-[140px]"
        />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.02]"
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

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* HEADER */}

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
          className="mb-20 max-w-3xl sm:mb-24"
        >
          {/* Eyebrow */}

          <div className="mb-5 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8CFBC] shadow-[0_0_8px_rgba(216,207,188,0.5)]" />

            <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#D8CFBC] sm:text-sm">
              My Journey
            </span>

            <span className="h-px w-12 bg-[#302F29]" />
          </div>

          {/* Heading */}

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            From learning to{" "}
            <span className="text-[#D8CFBC]">
              building.
            </span>
          </h2>

          {/* Description */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#8E8B82] sm:text-lg">
            A timeline of how I&apos;ve grown from
            learning programming fundamentals to
            building real-world applications.
          </p>
        </motion.div>

        {/* ===================================================
            TIMELINE
        =================================================== */}

        <div className="relative">
          {/* Vertical timeline line */}

          <motion.div
            initial={
              enableMotion
                ? {
                    scaleY: 0,
                  }
                : false
            }
            whileInView={
              enableMotion
                ? {
                    scaleY: 1,
                  }
                : undefined
            }
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "top",
            }}
            className="absolute bottom-0 left-[86px] top-0 w-px bg-gradient-to-b from-[#565449] via-[#302F29] to-transparent sm:left-[130px]"
          />

          {/* Timeline items */}

          <div className="relative">
            {journey.map((item, index) => (
              <JourneyItemCard
                key={`${item.year}-${item.title}`}
                item={item}
                index={index}
                enableMotion={enableMotion}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            END STATEMENT
        =================================================== */}

        <motion.div
          initial={
            enableMotion
              ? {
                  opacity: 0,
                  y: 15,
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
            duration: 0.7,
          }}
          className="mt-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-[#57554E] sm:text-sm"
        >
          <span className="h-px w-8 bg-[#302F29] sm:w-12" />

          <span>
            Still learning. Still building.
          </span>

          <span className="h-px w-8 bg-[#302F29] sm:w-12" />
        </motion.div>
      </div>
    </section>
  );
}