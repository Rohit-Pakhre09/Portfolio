import AboutSection from "@/components/sections/About";
import AchievementsSection from "@/components/sections/Achievements";
import ContactSection from "@/components/sections/Contact";
import EducationSection from "@/components/sections/Education";
import ExperienceSection from "@/components/sections/Experience";
import HeroSection from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/Projects";
import ResumeSection from "@/components/sections/Resume";
import SkillsSection from "@/components/sections/Skills";

export default function Home() {
  return (
    <div className="relative z-10 min-h-screen bg-black/[0.96] bg-grid-white/[0.02] antialiased">
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ResumeSection />
      <ContactSection />
    </div>
  );
}
