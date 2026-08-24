"use client";

import { useRef } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
motion,
useMotionTemplate,
useMotionValue,
useReducedMotion,
useScroll,
useSpring,
useTransform,
} from "framer-motion";

import {
SiCplusplus,
SiCss,
SiHtml5,
SiMysql,
SiNextdotjs,
SiOpenjdk,
SiReact,
SiPython,
SiSupabase,
} from "react-icons/si";

import { Code2, Folder, Layers3, Terminal } from "lucide-react";

/* =========================================================
TYPES
========================================================= */

type JourneyIcon = ComponentType<{
size?: number;
className?: string;
style?: CSSProperties;
}>;

interface JourneyEntry {
name: string;
icon: JourneyIcon;
color: string;
}

interface JourneyStop {
year: string;
phase: string;
description: string;
kind: "technologies" | "projects";
items: JourneyEntry[];
current?: boolean;
}

/* =========================================================
JOURNEY DATA
========================================================= */

const journey: JourneyStop[] = [
{
year: "2023",
phase: "The Beginning",
description:
"Started my programming journey by learning the fundamentals of web development and programming.",
kind: "technologies",
items: [
{
name: "HTML",
icon: SiHtml5,
color: "#E34F26",
},
{
name: "CSS",
icon: SiCss,
color: "#1572B6",
},
{
name: "C",
icon: Terminal,
color: "#A8B9CC",
},
],
},


{
    year: "2024",
    phase: "Building the Foundation",
    description:
        "Expanded my programming knowledge and started working with databases while strengthening my core development skills.",
    kind: "technologies",
    items: [
        {
            name: "Java",
            icon: SiOpenjdk,
            color: "#ED8B00",
        },
        {
            name: "C++",
            icon: SiCplusplus,
            color: "#00599C",
        },
        {
            name: "MySQL",
            icon: SiMysql,
            color: "#4479A1",
        },
        {
            name: "Python",
            icon: SiPython,
            color: "#f9dc00e7",
        },
    ],
},

{
    year: "2025",
    phase: "Modern Web Development",
    description:
        "Moved into modern web development and started building applications using modern frontend frameworks and backend services.",
    kind: "technologies",
    items: [
        {
            name: "React",
            icon: SiReact,
            color: "#61DAFB",
        },
        {
            name: "Next.js",
            icon: SiNextdotjs,
            color: "#FFFFFF",
        },
        {
            name: "Supabase",
            icon: SiSupabase,
            color: "#3ECF8E",
        },
    ],
},

{
    year: "2025",
    phase: "Built Real Projects",
    description:
        "Turned my knowledge into real-world projects, focusing on functional applications and polished user experiences.",
    kind: "projects",
    items: [
        {
            name: "AI Interview Screener",
            icon: Folder,
            color: "#e2a627",
        },
        {
            name: "Gym Progress",
            icon: Folder,
            color: "#e2a627",
        },
        {
            name: "Royal Stay Hotel",
            icon: Folder,
            color: "#e2a627",
        },
    ],
},

{
    year: "2026",
    phase: "Currently Growing",
    description:
        "Continuing to improve my development skills while focusing on Java, full-stack development and software development.",
    kind: "technologies",
    items: [
        {
            name: "Java",
            icon: SiOpenjdk,
            color: "#ED8B00",
        },
        {
            name: "Full-Stack Development",
            icon: Layers3,
            color: "#00eee6",
        },
        {
            name: "Software Development",
            icon: Code2,
            color: "#2989ea",
        },
    ],
    current: true,
},


];

/* =========================================================
TIMELINE NODE
========================================================= */

function JourneyNode({
current,
enableMotion,
}: {
current: boolean;
enableMotion: boolean;
}) {
return (
<motion.span
initial={
enableMotion
? {
scale: 0,
opacity: 0,
}
: false
}
whileInView={
enableMotion
? {
scale: 1,
opacity: 1,
}
: undefined
}
viewport={{
once: true,
amount: 0.8,
}}
transition={{
duration: 0.45,
ease: "easeOut",
}}
className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#D8CFBC] ${
                current ? "bg-[#D8CFBC]" : "bg-[#11120D]"
            }`}
>
<span
className={`h-1.5 w-1.5 rounded-full ${
                    current ? "bg-[#11120D]" : "bg-[#D8CFBC]/60"
                }`}
/>


        {current && enableMotion && (
            <>
                <motion.span
                    animate={{
                        scale: [1, 2.8, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-[#D8CFBC]"
                />

                <motion.span
                    animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                    }}
                    className="absolute inset-0 rounded-full border border-[#D8CFBC]"
                />
            </>
        )}
    </motion.span>
);


}

/* =========================================================
JOURNEY CARD
========================================================= */

function JourneyCard({
stop,
fromSide,
enableMotion,
}: {
stop: JourneyStop;
fromSide: "left" | "right";
enableMotion: boolean;
}) {
const cardRef = useRef<HTMLDivElement>(null);

const mouseX = useMotionValue(0.5);
const mouseY = useMotionValue(0.5);

const springConfig = {
    stiffness: 180,
    damping: 24,
    mass: 0.5,
};

const smoothX = useSpring(mouseX, springConfig);
const smoothY = useSpring(mouseY, springConfig);

const spotlightX = useTransform(
    smoothX,
    [0, 1],
    ["0%", "100%"]
);

const spotlightY = useTransform(
    smoothY,
    [0, 1],
    ["0%", "100%"]
);

const spotlight = useMotionTemplate`
    radial-gradient(
        420px circle at ${spotlightX} ${spotlightY},
        rgba(216, 207, 188, 0.13),
        transparent 60%
    )
`;

const depthX = useTransform(
    smoothX,
    [0, 1],
    [-6, 6]
);

const depthY = useTransform(
    smoothY,
    [0, 1],
    [-5, 5]
);

const iconX = useTransform(
    smoothX,
    [0, 1],
    [-3, 3]
);

const iconY = useTransform(
    smoothY,
    [0, 1],
    [-5, 5]
);

function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
) {
    if (!enableMotion) return;

    const rect =
        cardRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(
        (event.clientX - rect.left) /
            rect.width
    );

    mouseY.set(
        (event.clientY - rect.top) /
            rect.height
    );
}

function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
}

const fromX =
    fromSide === "left" ? -24 : 24;

return (
    <motion.div
        ref={cardRef}
        initial={
            enableMotion
                ? {
                      opacity: 0,
                      x: fromX,
                      y: 12,
                  }
                : false
        }
        whileInView={
            enableMotion
                ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                  }
                : undefined
        }
        viewport={{
            once: true,
            amount: 0.25,
        }}
        transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
            group
            relative
            w-full
            min-w-0
            overflow-hidden
            rounded-2xl
            border border-[#302F29]
            bg-[#151610]
            p-5
            transition-all
            duration-500
            hover:-translate-y-1
            hover:border-[#565449]
            hover:shadow-[0_30px_80px_-45px_rgba(216,207,188,0.45)]
            sm:p-7
        "
        style={{
            perspective: 1000,
        }}
    >
        <motion.div
            style={{
                x: enableMotion ? depthX : 0,
                y: enableMotion ? depthY : 0,
            }}
            className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-52
                w-52
                rounded-full
                bg-[#D8CFBC]/[0.035]
                blur-[70px]
            "
        />

        <motion.div
            style={{
                x: enableMotion ? depthX : 0,
                y: enableMotion ? depthY : 0,
            }}
            className="
                pointer-events-none
                absolute
                -bottom-8
                -right-3
                select-none
                text-[100px]
                font-bold
                leading-none
                tracking-[-0.08em]
                text-[#D8CFBC]/[0.035]
                transition-opacity
                duration-500
                group-hover:text-[#D8CFBC]/[0.07]
                sm:text-[150px]
            "
        >
            {stop.year}
        </motion.div>

        <div className="
            pointer-events-none
            absolute
            inset-[1px]
            rounded-[15px]
            border
            border-white/[0.025]
        " />

        <motion.div
            animate={
                enableMotion
                    ? {
                          x: ["-120%", "180%"],
                      }
                    : undefined
            }
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
            }}
            className="
                pointer-events-none
                absolute
                left-0
                top-0
                h-px
                w-1/3
                bg-gradient-to-r
                from-transparent
                via-[#D8CFBC]/70
                to-transparent
                opacity-0
                group-hover:opacity-100
            "
        />

        <motion.div
            style={{
                background: spotlight,
            }}
            className="
                pointer-events-none
                absolute
                inset-0
                z-10
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
            "
        />

        <div className="relative z-20 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
                <motion.span
                    style={{
                        x: enableMotion ? depthX : 0,
                    }}
                    className="
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-[#D8CFBC]
                        shadow-[0_0_10px_rgba(216,207,188,0.7)]
                    "
                />

                <span className="text-xs uppercase tracking-[0.3em] text-[#D8CFBC]">
                    {stop.year}
                </span>

                {stop.current && (
                    <span
                        className="
                            rounded-full
                            border
                            border-[#565449]
                            bg-[#11120D]/50
                            px-2
                            py-0.5
                            text-[10px]
                            uppercase
                            tracking-widest
                            text-[#A6A397]
                            backdrop-blur-sm
                        "
                    >
                        In progress
                    </span>
                )}
            </div>

            <motion.h3
                style={{
                    x: enableMotion ? depthX : 0,
                    y: enableMotion ? depthY : 0,
                    translateZ: 25,
                }}
                className="
                    relative
                    mt-3
                    text-xl
                    font-medium
                    tracking-tight
                    transition-colors
                    duration-300
                    group-hover:text-[#D8CFBC]
                    sm:text-2xl
                "
            >
                {stop.phase}
            </motion.h3>

            <p
                className="
                    relative
                    mt-3
                    max-w-xl
                    text-sm
                    leading-6
                    text-[#A6A397]
                "
            >
                {stop.description}
            </p>

            <p
                className="
                    relative
                    mt-5
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#6F6D64]
                "
            >
                {stop.kind === "projects"
                    ? "Projects"
                    : "Technologies"}
            </p>

            <div className="relative mt-3 flex flex-wrap gap-2">
                {stop.items.map(
                    (entry, i) => {
                        const Icon = entry.icon;

                        return (
                            <motion.span
                                key={entry.name}
                                initial={
                                    enableMotion
                                        ? {
                                              opacity: 0,
                                              scale: 0.9,
                                              y: 8,
                                          }
                                        : false
                                }
                                whileInView={
                                    enableMotion
                                        ? {
                                              opacity: 1,
                                              scale: 1,
                                              y: 0,
                                          }
                                        : undefined
                                }
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.07,
                                }}
                                whileHover={
                                    enableMotion
                                        ? {
                                              y: -5,
                                              scale: 1.04,
                                          }
                                        : undefined
                                }
                                style={
                                    {
                                        x: enableMotion
                                            ? iconX
                                            : 0,
                                        y: enableMotion
                                            ? iconY
                                            : 0,
                                        "--entry-color":
                                            entry.color,
                                    } as CSSProperties
                                }
                                className="
                                    group/pill
                                    flex
                                    max-w-full
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-[#302F29]
                                    bg-[#11120D]
                                    px-3
                                    py-1.5
                                    text-xs
                                    text-[#A6A397]
                                    shadow-[0_10px_25px_-20px_rgba(216,207,188,0.5)]
                                    transition-all
                                    duration-300
                                    hover:border-[#565449]
                                    hover:bg-[#191A14]
                                    hover:text-[#FFFBF4]
                                "
                            >
                                <Icon
                                    size={14}
                                    style={{
                                        color: entry.color,
                                    }}
                                    className="shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
                                />

                                <span className="truncate">
                                    {entry.name}
                                </span>
                            </motion.span>
                        );
                    }
                )}
            </div>
        </div>

        <motion.div
            initial={{
                x: "-130%",
            }}
            whileHover={{
                x: "180%",
            }}
            transition={{
                duration: 0.8,
                ease: "easeOut",
            }}
            className="
                pointer-events-none
                absolute
                inset-y-0
                z-30
                w-1/4
                -skew-x-12
                bg-gradient-to-r
                from-transparent
                via-white/[0.07]
                to-transparent
                blur-sm
            "
        />

        <div
            className="
                pointer-events-none
                absolute
                bottom-5
                right-5
                h-7
                w-7
            "
        >
            <span
                className="
                    absolute
                    right-0
                    top-0
                    h-px
                    w-7
                    bg-[#302F29]
                    transition-all
                    duration-500
                    group-hover:w-10
                    group-hover:bg-[#D8CFBC]
                "
            />

            <span
                className="
                    absolute
                    right-0
                    top-0
                    h-7
                    w-px
                    bg-[#302F29]
                    transition-all
                    duration-500
                    group-hover:h-10
                    group-hover:bg-[#D8CFBC]
                "
            />
        </div>
    </motion.div>
);


}

/* =========================================================
JOURNEY ITEM
========================================================= */

function JourneyItem({
stop,
index,
enableMotion,
}: {
stop: JourneyStop;
index: number;
enableMotion: boolean;
}) {
const isEven = index % 2 === 0;


const card = (
    <JourneyCard
        stop={stop}
        fromSide={
            isEven
                ? "left"
                : "right"
        }
        enableMotion={enableMotion}
    />
);

return (
    <div
        className="
            relative
            pl-10
            sm:pl-14
            lg:grid
            lg:grid-cols-2
            lg:gap-x-16
            lg:pl-0
        "
    >
        <div
            className="
                absolute
                left-0
                top-1.5
                z-40
                -translate-x-1/2
                sm:left-4
                lg:left-1/2
            "
        >
            <JourneyNode
                current={Boolean(stop.current)}
                enableMotion={enableMotion}
            />
        </div>

        {isEven ? (
            <>
                <div className="min-w-0 lg:pr-4">
                    {card}
                </div>

                <div className="hidden lg:block" />
            </>
        ) : (
            <>
                <div className="hidden lg:block" />

                <div className="min-w-0 lg:pl-4">
                    {card}
                </div>
            </>
        )}
    </div>
);


}

/* =========================================================
JOURNEY SECTION
========================================================= */

export default function Journey() {
const prefersReducedMotion =
useReducedMotion();

const enableMotion =
    !prefersReducedMotion;

const timelineRef =
    useRef<HTMLDivElement>(null);

const { scrollYProgress } =
    useScroll({
        target: timelineRef,
        offset: [
            "start 0.85",
            "end 0.55",
        ],
    });

const lineProgress =
    useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "100%"]
    );

return (
    <section
        id="journey"
        className="
            relative
            overflow-hidden
            bg-[#11120D]
            px-5
            pb-20
            pt-5
            text-[#FFFBF4]
            sm:px-6
            sm:pt-5
            sm:pb-11
        "
    >
        <div
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
            "
        >
            <motion.div
                animate={
                    enableMotion
                        ? {
                              x: [0, 30, 0],
                              y: [0, -20, 0],
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
                    -left-90
                    top-[20%]
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#D8CFBC]/[0.025]
                    blur-[150px]
                "
            />

            <motion.div
                animate={
                    enableMotion
                        ? {
                              x: [0, -25, 0],
                              y: [0, 25, 0],
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
                    -right-60
                    bottom-1/4
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[#D8CFBC]/[0.02]
                    blur-[140px]
                "
            />
        </div>

        <div
            className="
                relative
                z-10
                mx-auto
                w-full
                max-w-5xl
            "
        >
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
                    amount: 0.4,
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                }}
                className="
                    mb-14
                    max-w-2xl
                    sm:mb-20
                    lg:-translate-x-30
                "
            >
                <div className="mb-4 flex items-center gap-1">
                    <span
                        className="
                            h-1.5
                            w-1.5
                            shrink-0
                            rounded-full
                            bg-[#D8CFBC]
                            shadow-[0_0_8px_rgba(216,207,188,0.6)]
                        "
                    />

                    <p
                        className="
                            text-sm
                            uppercase
                            tracking-[0.22em]
                            text-[#D8CFBC]
                            sm:tracking-[0.3em]
                        "
                    >
                        My Journey
                    </p>

                    <span
                        className="
                            h-px
                            w-8
                            bg-[#302F29]
                            sm:w-12
                        "
                    />
                </div>

                <h2
                    className="
                        max-w-xl
                        text-3xl
                        font-semibold
                        tracking-tight
                        sm:text-5xl
                    "
                >
                    From learning{" "}
                    <span
                        className="
                            bg-gradient-to-r
                            from-[#D8CFBC]
                            to-[#FFFBF4]
                            bg-clip-text
                            text-transparent
                        "
                    >
                        to building.
                    </span>
                </h2>

                <p
                    className="
                        mt-5
                        max-w-xl
                        text-sm
                        leading-7
                        text-[#A6A397]
                        sm:text-base
                    "
                >
                    A timeline of how
                    I&apos;ve grown from
                    learning programming
                    fundamentals to building
                    real-world applications.
                </p>
            </motion.div>

            <div
                ref={timelineRef}
                className="relative"
            >
                <div
                    className="
                        absolute
                        left-0
                        top-0
                        h-full
                        w-px
                        bg-[#302F29]
                        sm:left-4
                        lg:left-1/2
                    "
                />

                {enableMotion ? (
                    <motion.div
                        style={{
                            height: lineProgress,
                        }}
                        className="
                            absolute
                            left-0
                            top-0
                            w-px
                            bg-gradient-to-b
                            from-[#D8CFBC]
                            via-[#D8CFBC]
                            to-[#D8CFBC]/20
                            shadow-[0_0_14px_rgba(216,207,188,0.5)]
                            sm:left-4
                            lg:left-1/2
                        "
                    />
                ) : (
                    <div
                        className="
                            absolute
                            left-0
                            top-0
                            h-full
                            w-px
                            bg-[#D8CFBC]/25
                            sm:left-4
                            lg:left-1/2
                        "
                    />
                )}

                <div
                    className="
                        space-y-10
                        sm:space-y-14
                        lg:space-y-16
                    "
                >
                    {journey.map(
                        (
                            stop,
                            index
                        ) => (
                            <JourneyItem
                                key={`${stop.year}-${stop.phase}`}
                                stop={stop}
                                index={index}
                                enableMotion={enableMotion}
                            />
                        )
                    )}
                </div>
            </div>

            <motion.div
                initial={
                    enableMotion
                        ? {
                              opacity: 0,
                              y: 10,
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
                    duration: 0.8,
                    delay: 0.2,
                }}
                className="
                    mt-10
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-center
                    text-xs
                    text-[#6F6D64]
                    sm:gap-3
                    sm:text-sm
                "
            >
                <span className="h-px w-6 bg-[#302F29] sm:w-10" />

                <span>
                    Still learning. Still building.
                </span>

                <span className="h-px w-6 bg-[#302F29] sm:w-10" />
            </motion.div>
        </div>
    </section>
);


}
