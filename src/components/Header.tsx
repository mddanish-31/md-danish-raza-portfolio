'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { InnerNavbar } from './InnerNavbar';

export function Header() {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  if (!isLanding) {
    return <InnerNavbar />;
  }

  return (
    <header className="sticky top-0 z-50 shrink-0 w-full bg-[var(--color-main-bg)]/90 backdrop-blur-sm transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Vintage Editorial MD DANISH RAZA Wordmark in Balverd */}
        <Link
          href="/"
          className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] rounded-md py-1"
          aria-label="MD Danish Raza Portfolio Home"
        >
          <span className="font-balverd font-normal text-lg sm:text-2xl lg:text-[1.75rem] tracking-[0.06em] sm:tracking-[0.09em] lg:tracking-[0.12em] text-[var(--color-main-text)] uppercase leading-none transition-colors group-hover:text-[var(--color-primary-accent)] whitespace-nowrap">
            MD DANISH RAZA
          </span>
        </Link>

        {/* Right: Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
