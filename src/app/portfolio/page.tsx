import React from 'react';
import type { Metadata } from 'next';
import { InnerHeroSection } from '@/components/InnerHeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { JourneySection } from '@/components/JourneySection';
import { ContactSection } from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Portfolio — MD Danish Raza',
  description:
    'Full-Stack Developer, Computer Science Student. Exploring the work and engineering journey of MD Danish Raza.',
};

export default function PortfolioPage() {
  return (
    <main className="flex-1 flex flex-col min-h-0">
      <InnerHeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
    </main>
  );
}
