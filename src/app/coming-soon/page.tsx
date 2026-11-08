import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Coming Soon | MD Danish Raza',
  description: 'The complete portfolio showcase is currently in development.',
};

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 sm:px-8 py-16 overflow-hidden">
      {/* Centered content */}
      <div className="relative z-10 max-w-xl w-full mx-auto text-center flex flex-col items-center animate-content">
        {/* Status Tag */}
        <p className="text-[11px] sm:text-xs font-bold tracking-[0.26em] text-[var(--color-primary-accent)] uppercase mb-4">
          IN DEVELOPMENT
        </p>

        {/* Heading: PORTFOLIO COMING SOON */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--color-main-text)] uppercase leading-tight mb-5">
          PORTFOLIO <br />
          <span className="text-[var(--color-primary-accent)]">COMING SOON</span>
        </h1>

        {/* Short, elegant message */}
        <p className="text-sm sm:text-base text-[var(--color-muted-text)] leading-relaxed max-w-md mb-8 font-normal">
          The full portfolio showcase, engineering projects, and technical case studies are currently being prepared.
        </p>

        {/* Working Back to Home and View Portfolio links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-[var(--color-primary-accent)] bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-md hover:shadow-[var(--color-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 cursor-pointer w-full sm:w-auto"
          >
            <span>VIEW PORTFOLIO</span>
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-main-text)] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-200 hover:border-[var(--color-primary-accent)] hover:text-[var(--color-primary-accent)] hover:bg-[var(--color-main-bg)] hover:shadow-md hover:shadow-[var(--color-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ring-offset)] cursor-pointer w-full sm:w-auto"
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
