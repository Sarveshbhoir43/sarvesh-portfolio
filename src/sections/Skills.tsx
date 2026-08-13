"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiOpenjdk,
  SiGoogle,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiAndroidstudio,
  SiNpm,
  SiExpo,
  SiVercel,
  SiThreedotjs,
  SiFramer,
} from "react-icons/si";

import { Mail, Monitor, ShieldCheck, Boxes, Component } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type TechIcon = ComponentType<{
  size?: number;
  className?: string;
  style?: CSSProperties;
}>;

interface Technology {
  name: string;
  icon: TechIcon;
  color: string;
}

interface Category {
  title: string;
  description: string;
  technologies: Technology[];
  accent: string; // drives the category's floating orb + hover glow only
}

/* =========================================================
   TECHNOLOGY DATA — unchanged, + one accent color per category
   used only for the subtle orb / glow, never for large fills.
========================================================= */

const categories: Category[] = [
  {
    title: "Frontend",
    description: "Building modern and responsive interfaces.",
    accent: "#61DAFB",
    technologies: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    description: "Building application logic, APIs and authentication.",
    accent: "#ED8B00",
    technologies: [
      { name: "Java", icon: SiOpenjdk, color: "#ED8B00" },
      { name: "Next.js APIs", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Nodemailer", icon: Mail, color: "#22B573" },
      { name: "NextAuth", icon: ShieldCheck, color: "#FFFFFF" },
      { name: "Google OAuth", icon: SiGoogle, color: "#4285F4" },
    ],
  },
  {
    title: "Database",
    description: "Working with structured data and backend services.",
    accent: "#4479A1",
    technologies: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  {
    title: "Tools & Creative",
    description: "Development, deployment, animation and 3D.",
    accent: "#D8CFBC",
    technologies: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "VS Code", icon: Monitor, color: "#007ACC" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
      { name: "Expo", icon: SiExpo, color: "#FFFFFF" },
      { name: "EAS", icon: SiExpo, color: "#FFFFFF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
      { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF" },
      { name: "React Three Fiber", icon: Boxes, color: "#D8CFBC" },
      { name: "Lucide React", icon: Component, color: "#D8CFBC" },
    ],
  },
];

/* =========================================================
   HOOKS
========================================================= */

function usePointerFine() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isFine;
}

/* =========================================================
   GLOBAL KEYFRAMES — one shared block for the floating orbs
   and ambient background drift. CSS-only: no extra render
   cost beyond a couple of animated transforms.
========================================================= */

function SkillsAmbientStyles() {
  return (
    <style jsx global>{`
      @keyframes skills-orb-float {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-6px) rotate(6deg);
        }
      }
      @keyframes skills-bg-drift {
        0%,
        100% {
          transform: translate3d(0, 0, 0);
        }
        50% {
          transform: translate3d(-10px, 8px, 0);
        }
      }
    `}</style>
  );
}

/* =========================================================
   CATEGORY ORB
   A tiny CSS "3D" accent object per category — radial-gradient
   sphere + thin ring + soft glow + slow float. No canvas.
========================================================= */

function CategoryOrb({ color, enableMotion }: { color: string; enableMotion: boolean }) {
  const floatStyle: CSSProperties = enableMotion
    ? { animation: "skills-orb-float 5s ease-in-out infinite" }
    : {};

  return (
    <div aria-hidden="true" className="relative h-9 w-9 shrink-0 [perspective:300px]">
      <div style={floatStyle} className="relative h-full w-full">
        <div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: `${color}33` }}
        />
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background: `radial-gradient(circle at 32% 28%, ${color}CC, ${color}22 55%, transparent 75%)`,
            boxShadow: `0 0 14px ${color}40, inset 0 0 6px ${color}33`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   TECHNOLOGY PILL
   Scroll-reveal on an outer wrapper, subtle cursor tilt (max ~4°)
   on the inner pill — kept as separate transform channels so the
   two never fight each other.
========================================================= */

function TechnologyPill({
  tech,
  delay,
  enableMotion,
  enableTilt,
}: {
  tech: Technology;
  delay: number;
  enableMotion: boolean;
  enableTilt: boolean;
}) {
  const pillRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useTransform(py, [0, 1], [4, -4]);
  const rotateY = useTransform(px, [0, 1], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = pillRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const Icon = tech.icon;

  return (
    <motion.div
      initial={enableMotion ? { opacity: 0, scale: 0.9 } : false}
      whileInView={enableMotion ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="group/tech"
    >
      <motion.div
        ref={pillRef}
        onMouseMove={enableTilt ? handleMouseMove : undefined}
        onMouseLeave={enableTilt ? handleMouseLeave : undefined}
        whileHover={
          enableTilt
            ? {
                y: -3,
                scale: 1.03,
                boxShadow: "0 10px 26px -14px rgba(216,207,188,0.35)",
              }
            : undefined
        }
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformPerspective: 500,
        }}
        className="flex items-center gap-2.5 rounded-full border border-[#302F29] bg-[#11120D] px-4 py-2.5 transition-all duration-300 hover:border-[#565449] hover:bg-[#181914]"
      >
        <Icon
          size={17}
          className="text-[#6F6D64] transition-all duration-300 group-hover/tech:text-[var(--tech-color)]"
          style={{ "--tech-color": tech.color } as CSSProperties}
        />
        <span className="text-sm text-[#A6A397] transition-colors duration-300 group-hover/tech:text-[#FFFBF4]">
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   TECHNOLOGY CATEGORY
   Wide horizontal card: orb + title + description on the left,
   pills on the right (stacks on mobile). The card now tilts
   gently toward the cursor, in addition to lifting and glowing,
   for a bit of depth without a real 3D scene.
========================================================= */

function TechnologyCategory({
  category,
  categoryIndex,
  enableMotion,
  enableTilt,
}: {
  category: Category;
  categoryIndex: number;
  enableMotion: boolean;
  enableTilt: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Kept subtle on purpose — a wide card reads worse with a big tilt.
  const rotateX = useTransform(py, [0, 1], [1.5, -1.5]);
  const rotateY = useTransform(px, [0, 1], [-1.5, 1.5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      initial={enableMotion ? { opacity: 0, y: 25 } : false}
      whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: categoryIndex * 0.08, ease: "easeOut" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={enableTilt ? handleMouseMove : undefined}
        onMouseLeave={enableTilt ? handleMouseLeave : undefined}
        whileHover={
          enableMotion
            ? { y: -4, boxShadow: "0 20px 44px -26px rgba(216,207,188,0.3)" }
            : undefined
        }
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformPerspective: 1200,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="group relative overflow-hidden rounded-2xl border border-[#302F29] bg-[#151610] p-6 transition-colors duration-300 hover:border-[#565449] sm:p-7"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#D8CFBC]/0 blur-3xl transition-all duration-700 group-hover:bg-[#D8CFBC]/5" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-[220px] items-start gap-4">
            <CategoryOrb color={category.accent} enableMotion={enableMotion} />
            <div>
              <h3 className="text-lg font-medium">{category.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#6F6D64]">
                {category.description}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap gap-2.5 lg:justify-end">
            {category.technologies.map((tech, techIndex) => (
              <TechnologyPill
                key={tech.name}
                tech={tech}
                delay={categoryIndex * 0.08 + techIndex * 0.04}
                enableMotion={enableMotion}
                enableTilt={enableTilt}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   SKILLS SECTION
========================================================= */

export default function Skills() {
  const isPointerFine = usePointerFine();
  const prefersReducedMotion = useReducedMotion();

  const enableMotion = !prefersReducedMotion;
  const enableTilt = isPointerFine && !prefersReducedMotion;

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden bg-[#11120D] px-6 py-28 text-[#FFFBF4]"
    >
      <SkillsAmbientStyles />

      {/* Ambient background glow — two soft fields with a slow drift */}
      <div
        aria-hidden="true"
        style={enableMotion ? { animation: "skills-bg-drift 22s ease-in-out infinite" } : undefined}
        className="pointer-events-none absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-[#D8CFBC]/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        style={
          enableMotion
            ? { animation: "skills-bg-drift 30s ease-in-out infinite reverse" }
            : undefined
        }
        className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-[#D8CFBC]/[0.04] blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Narrative intro */}
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 20 } : false}
          whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8CFBC]" />
            <p className="text-sm uppercase tracking-[0.3em] text-[#D8CFBC]">
              Tech Stack
            </p>
            <span className="h-px w-12 bg-[#302F29]" />
          </div>

          <h2 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Technologies I use
            <span className="text-[#D8CFBC]"> to build things.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#A6A397]">
            A collection of technologies I use to design, develop, animate
            and deploy modern applications.
          </p>
        </motion.div>

        {/* Technology groups */}
        <div className="mt-16 space-y-5">
          {categories.map((category, categoryIndex) => (
            <TechnologyCategory
              key={category.title}
              category={category}
              categoryIndex={categoryIndex}
              enableMotion={enableMotion}
              enableTilt={enableTilt}
            />
          ))}
        </div>

      </div>
    </section>
  );
}