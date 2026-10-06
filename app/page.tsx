import Hero from "@/components/sections/Hero";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import TrustedBy from "@/components/sections/TrustedBy";
import Testimonials from "@/components/sections/Testimonials";
import AboutCTA from "@/components/sections/AboutCTA";
import SkillsStack from "@/components/sections/SkillsStack";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Hero */}
      <Hero />

      {/* Projects — CardSwap of live production sites */}
      <ProjectsShowcase />

      {/* Trusted by — blueprint grid with scramble-reveal logos */}
      <TrustedBy />

      {/* Testimonials — verified client feedback */}
      <Testimonials />

      {/* About + CTA (Evervault-style glowing panel) */}
      <AboutCTA />

      {/* Skills — scroll stack */}
      <SkillsStack />

      {/* FAQ — accordion */}
      <Faq />

      {/* Footer */}
      <Footer />
    </main>
  );
}
