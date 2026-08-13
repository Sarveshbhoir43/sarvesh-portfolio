import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-[#11120D]">
      <Navbar />
      <Hero />
      <About />
      <Skills />

    </main>
  );
}