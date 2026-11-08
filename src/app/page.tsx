import React from 'react';
import { HeroSection } from '@/components/HeroSection';

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col min-h-0 h-[calc(100svh-4rem)] sm:h-[calc(100svh-5rem)] lg:overflow-hidden">
      <HeroSection />
    </main>
  );
}
