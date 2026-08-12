"use client";

import { Code2, Database, Layers3, Coffee } from "lucide-react";

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

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-x-hidden bg-[#11120D] px-6 py-28 text-[#FFFBF4]"
    >
      
      <div className="relative mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-16">
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
        </div>

        {/* Main content */}
        <div className="grid gap-16 lg:grid-cols-2">

          {/* About text */}
          <div>
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
              <div className="pr-10 transition-transform duration-300 hover:-translate-y-0.5">
                <p className="text-3xl font-semibold text-[#FFFBF4]">
                  10+
                </p>
                <p className="mt-1 text-sm text-[#A6A397]">
                  Projects
                </p>
              </div>

              <div className="px-10 transition-transform duration-300 hover:-translate-y-0.5">
                <p className="text-3xl font-semibold text-[#FFFBF4]">
                  8+
                </p>
                <p className="mt-1 text-sm text-[#A6A397]">
                  Technologies
                </p>
              </div>

              <div className="pl-10 transition-transform duration-300 hover:-translate-y-0.5">
                <p className="text-3xl font-semibold text-[#FFFBF4]">
                  ∞
                </p>
                <p className="mt-1 text-sm text-[#A6A397]">
                  Curiosity
                </p>
              </div>
            </div>
          </div>

          {/* Highlight cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#302F29] bg-[#151610] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#565449]"
                >
                  {/* Corner glow that blooms on hover */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#D8CFBC]/0 blur-2xl transition duration-500 group-hover:bg-[#D8CFBC]/10" />

                  <div className="relative mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#565449] bg-[#11120D] transition duration-300 group-hover:border-[#D8CFBC] group-hover:shadow-[0_0_20px_-4px_rgba(216,207,188,0.45)]">
                    <Icon
                      size={21}
                      strokeWidth={1.5}
                      className="text-[#D8CFBC]"
                    />
                  </div>

                  <h3 className="relative text-lg font-medium">
                    {item.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-6 text-[#A6A397]">
                    {item.description}
                  </p>

                  {/* Signature accent line — grows on hover */}
                  <div className="relative mt-5 h-px w-6 bg-[#302F29] transition-all duration-300 group-hover:w-12 group-hover:bg-[#D8CFBC]" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}