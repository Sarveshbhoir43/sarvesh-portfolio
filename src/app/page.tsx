import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Journey from "@/sections/Journey";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-[#11120D]">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />  
      <Journey />
      <Contact />
      <Footer />
      
    </main>
  );
}