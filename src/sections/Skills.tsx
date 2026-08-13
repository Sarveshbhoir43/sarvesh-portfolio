"use client";

import {
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Server,
  Terminal,
} from "lucide-react";

const skills = [
  {
    name: "Java",
    category: "Backend",
    description: "Object-oriented programming and backend development.",
    icon: Code2,
  },
  {
    name: "React",
    category: "Frontend",
    description: "Building interactive and component-based interfaces.",
    icon: Layers3,
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "Building modern full-stack React applications.",
    icon: Globe,
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "Creating APIs and server-side applications.",
    icon: Server,
  },
  {
    name: "MySQL",
    category: "Database",
    description: "Designing and working with relational databases.",
    icon: Database,
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "Working with flexible NoSQL data structures.",
    icon: Database,
  },
  {
    name: "Git",
    category: "Tools",
    description: "Version control and collaborative development.",
    icon: GitBranch,
  },
  {
    name: "TypeScript",
    category: "Language",
    description: "Writing safer and scalable JavaScript applications.",
    icon: Terminal,
  },
];

const categories = [
  {
    title: "Frontend",
    technologies: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Backend",
    technologies: ["Java", "Node.js"],
  },
  {
    title: "Database",
    technologies: ["MySQL", "MongoDB"],
  },
  {
    title: "Tools",
    technologies: ["Git"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-[#11120D] px-6 py-28 text-[#FFFBF4]"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#D8CFBC]">
            Tech Stack
          </p>

          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Tools I use to
            <span className="text-[#D8CFBC]"> build things.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#A6A397]">
            A collection of technologies I use to design, develop and
            deploy modern applications.
          </p>
        </div>

        {/* Category overview */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-[#302F29] bg-[#151610] p-5"
            >
              <p className="text-sm text-[#D8CFBC]">
                {category.title}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {category.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[#302F29] px-3 py-1.5 text-xs text-[#A6A397]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                className="group relative overflow-hidden rounded-2xl border border-[#302F29] bg-[#151610] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#565449]"
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#D8CFBC]/5 blur-2xl transition duration-300 group-hover:bg-[#D8CFBC]/10" />

                {/* Icon */}
                <div className="relative mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#565449] bg-[#11120D] transition duration-300 group-hover:border-[#D8CFBC]">
                  <Icon
                    size={21}
                    strokeWidth={1.5}
                    className="text-[#D8CFBC]"
                  />
                </div>

                {/* Category */}
                <p className="text-xs uppercase tracking-wider text-[#6F6D64]">
                  {skill.category}
                </p>

                {/* Name */}
                <h3 className="mt-2 text-xl font-medium">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-[#A6A397]">
                  {skill.description}
                </p>

                {/* Bottom line */}
                <div className="mt-6 h-px w-8 bg-[#565449] transition-all duration-300 group-hover:w-full group-hover:bg-[#D8CFBC]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}