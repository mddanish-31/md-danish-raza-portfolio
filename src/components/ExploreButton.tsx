import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ExploreButtonProps {
  className?: string;
}

export function ExploreButton({ className = '' }: ExploreButtonProps) {
  return (
    <Link
      href="/portfolio"
      className={`group relative inline-flex items-center justify-center py-2 px-3 text-[var(--color-main-text)] transition-all duration-300 ease-out hover:text-[var(--color-primary-accent)] hover:drop-shadow-[0_0_10px_var(--color-primary-accent)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-main-bg)] cursor-pointer select-none motion-reduce:transition-none ${className}`}
      aria-label="Explore Portfolio Showcase"
    >
      {/* Editorial Text Wordmark in Balverd Regular */}
      <span className="font-balverd font-normal text-base sm:text-lg lg:text-xl uppercase tracking-[0.18em] sm:tracking-[0.22em] lg:tracking-[0.26em] leading-none transition-[letter-spacing,color] duration-300 ease-out group-hover:tracking-[0.24em] sm:group-hover:tracking-[0.28em] lg:group-hover:tracking-[0.32em] motion-reduce:transition-none">
        EXPLORE
      </span>

      {/* Subtle arrow revealed smoothly on hover */}
      <span
        className="absolute -right-2.5 sm:-right-3 top-1/2 -translate-y-1/2 opacity-0 translate-x-[-4px] translate-y-[2px] transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-1/2 pointer-events-none motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:translate-y-0"
        aria-hidden="true"
      >
        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-primary-accent)] stroke-[2]" />
      </span>
    </Link>
  );
}
