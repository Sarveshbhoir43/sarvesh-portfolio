"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Code2, Database, Layers3, Coffee, LucideIcon } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack",
    description: "Building modern and responsive web applications.",
  },
  {
    icon: Coffee,
    title: "Java Development",
    description: "Developing reliable backend applications with Java.",
  },
  {
    icon: Layers3,
    title: "Frontend",
    description: "Creating clean interfaces with React and Next.js.",
  },
  {
    icon: Database,
    title: "Backend & DB",
    description: "Working with APIs, databases and server-side logic.",
  },
];

/* =============================================================
   HOOKS
============================================================= */

// True only on devices with a real mouse (fine pointer + hover support).
// Used to keep the mouse-follow tilt off touchscreens.
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

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

/* =============================================================
   HIGHLIGHT CARD
   - Mouse-follow 3D tilt (desktop + fine pointer only)
   - Static layered depth (icon > title > description)
   - Scroll-triggered entrance, staggered by index
============================================================= */

function HighlightCard({
  icon: Icon,
  title,
  description,
  index,
  enableTilt,
  enableMotion,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  enableTilt: boolean;
  enableMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values instead of state — updates the transform style
  // directly without triggering a React re-render on every mousemove.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useTransform(py, [0, 1], [5, -5]);
  const rotateY = useTransform(px, [0, 1], [-5, 5]);

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
      ref={cardRef}
      onMouseMove={enableTilt ? handleMouseMove : undefined}
      onMouseLeave={enableTilt ? handleMouseLeave : undefined}
      whileHover={
        enableTilt
          ? {
              y: -4,
              scale: 1.02,
              boxShadow: "0 18px 40px -18px rgba(216,207,188,0.28)",
            }
          : undefined
      }
      whileTap={enableMotion ? { scale: 0.98 } : undefined}
      initial={enableMotion ? { opacity: 0, y: 20 } : false}
      whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
        transformPerspective: 600, // how sensitive the tilt is to mouse movement (lower = more sensitive)
        willChange: enableTilt ? "transform" : undefined,
      }}
      className="group relative overflow-hidden rounded-2xl border border-[#302F29] bg-[#151610] p-6 transition-colors duration-300 hover:border-[#565449]"
    >
      {/* Corner glow that blooms on hover */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#D8CFBC]/0 blur-2xl transition duration-500 group-hover:bg-[#D8CFBC]/10" />

      {/* Icon — closest layer */}
      <div
        style={{ transform: "translateZ(28px)" }}
        className="relative mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#565449] bg-[#11120D] transition-shadow duration-300 group-hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.45)]"
      >
        <Icon size={21} strokeWidth={1.5} className="text-[#D8CFBC]" />
      </div>

      {/* Title — mid layer */}
      <h3
        style={{ transform: "translateZ(12px)" }}
        className="relative text-lg font-medium"
      >
        {title}
      </h3>

      {/* Description — baseline */}
      <p
        style={{ transform: "translateZ(2px)" }}
        className="relative mt-3 text-sm leading-6 text-[#A6A397]"
      >
        {description}
      </p>

      {/* Signature accent line — grows on hover */}
      <div className="relative mt-5 h-px w-6 bg-[#302F29] transition-all duration-300 group-hover:w-12 group-hover:bg-[#D8CFBC]" />
    </motion.div>
  );
}

/* =============================================================
   STAT ITEM
   Counts 0 → value once in view. The ∞ stat just fades/scales in.
   Counting writes to the DOM directly (no per-frame setState) to
   avoid re-rendering the rest of the component while it animates.
============================================================= */

function StatItem({
  value,
  suffix = "",
  label,
  index,
  enableMotion,
}: {
  value: number | null;
  suffix?: string;
  label: string;
  index: number;
  enableMotion: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView || value === null || !numberRef.current) return;

    if (!enableMotion) {
      numberRef.current.textContent = `${value}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (v) => {
        if (numberRef.current) {
          numberRef.current.textContent = `${Math.round(v)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix, enableMotion]);

  return (
    <motion.div
      ref={wrapperRef}
      initial={enableMotion ? { opacity: 0, scale: 0.85 } : false}
      whileInView={enableMotion ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="transition-transform duration-300 hover:-translate-y-0.5"
    >
      <p ref={numberRef} className="text-3xl font-semibold text-[#FFFBF4]">
        {value === null ? "∞" : `0${suffix}`}
      </p>
      <p className="mt-1 text-sm text-[#A6A397]">{label}</p>
    </motion.div>
  );
}

/* =============================================================
   BACKGROUND ORB
   A tiny wireframe icosahedron with a few orbiting particles,
   rendered at very low opacity toward the right side. Desktop
   only, skipped entirely (not just hidden) on mobile and when
   reduced motion is preferred, so it never costs anything there.
============================================================= */

function OrbGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.09;
  });

  const particles = [0, 1, 2, 3];

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} /> // here we can adjust the size and detail level of the 3d object
        <meshBasicMaterial color="#D8CFBC" wireframe transparent opacity={0.14} />
      </mesh>

      {particles.map((i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 2.1, Math.sin(angle) * 1.3, Math.sin(angle * 1.3) * 0.6]}
          >
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#D8CFBC" transparent opacity={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

function AboutBackgroundOrb() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <OrbGroup />
      </Canvas>
    </div>
  );
}

/* =============================================================
   ABOUT SECTION
============================================================= */

export default function About() {
  const isPointerFine = usePointerFine();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const enableTilt = isPointerFine && !prefersReducedMotion;
  const enableMotion = !prefersReducedMotion;
  const showOrb = !isMobile && !prefersReducedMotion;

  return (
    <section
      id="about"
      className="relative overflow-x-hidden bg-[#11120D] px-6 py-14 text-[#FFFBF4]"
    >
      {showOrb && <AboutBackgroundOrb />}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section heading */}
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 16 } : false}
          whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8CFBC]" />
            <p className="text-sm uppercase tracking-[0.3em] text-[#D8CFBC]">
              About Me
            </p>
            <span className="h-px w-12 bg-[#302F29]" />
          </div>

          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            I build things that{" "}
            <span className="bg-gradient-to-r from-[#D8CFBC] to-[#FFFBF4] bg-clip-text text-transparent">
              solve problems.
            </span>
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="grid gap-16 lg:grid-cols-2">

          {/* About text */}
          <motion.div
            initial={enableMotion ? { opacity: 0, y: 20 } : false}
            whileInView={enableMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          >
            <p className="max-w-xl text-lg leading-8 text-[#A6A397]">
              I&apos;m Sarvesh Bhoir, a developer interested in building modern
              web applications and software that are useful, efficient and
              enjoyable to use.
            </p>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#A6A397]">
              I work across both frontend and backend development, with a
              focus on Java, React, Next.js and database-driven applications.
            </p>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#A6A397]">
              I enjoy turning ideas into real projects and continuously
              improving my skills by building and experimenting with new
              technologies.
            </p>

            {/* Small stats */}
            <div className="mt-10 flex divide-x divide-[#302F29]">
              <div className="pr-10">
                <StatItem value={7} suffix="+" label="Projects" index={0} enableMotion={enableMotion} />
              </div>
              <div className="px-10">
                <StatItem value={8} suffix="+" label="Technologies" index={1} enableMotion={enableMotion} />
              </div>
              <div className="pl-10">
                <StatItem value={null} label="Curiosity" index={2} enableMotion={enableMotion} />
              </div>
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <HighlightCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                index={index}
                enableTilt={enableTilt}
                enableMotion={enableMotion}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}