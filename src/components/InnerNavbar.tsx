'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export function InnerNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 shrink-0 w-full bg-[var(--color-main-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]/40 transition-colors duration-250 inner-navbar">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: MD DANISH RAZA Wordmark in Balverd + Horizontal Line */}
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] rounded-md py-1"
          aria-label="MD Danish Raza Portfolio"
        >
          <span className="font-balverd font-normal text-lg sm:text-2xl lg:text-[1.65rem] tracking-[0.06em] text-[var(--color-main-text)] uppercase leading-none transition-colors group-hover:text-[var(--color-primary-accent)] whitespace-nowrap">
            MD DANISH RAZA
          </span>
          <span
            className="w-8 sm:w-10 h-[1.5px] bg-[var(--portfolio-divider)] opacity-70 group-hover:bg-[var(--color-primary-accent)] transition-colors inline-block"
            aria-hidden="true"
          />
        </Link>

        {/* Center: Desktop Navigation Links (Title Case: About, Skills, Projects, Journey, Contact) */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-10"
          aria-label="Main Portfolio Navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm lg:text-[15px] font-normal text-[var(--color-main-text)]/85 hover:text-[var(--color-primary-accent)] transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Resume Pill Button + Circular Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[var(--portfolio-resume-bg)] text-[var(--portfolio-resume-text)] font-semibold text-xs sm:text-sm tracking-[0.04em] transition-all duration-200 hover:opacity-90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] cursor-pointer select-none"
            aria-label="View or Download Danish's Resume"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </a>

          <ThemeToggle />
        </div>

        {/* Mobile: Theme Toggle + Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2.5">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[var(--color-main-text)] hover:bg-[var(--color-secondary-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-main-bg)]/98 backdrop-blur-xl px-6 py-6 transition-all duration-250 animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col gap-4 mb-6" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[var(--color-main-text)] hover:text-[var(--color-primary-accent)] transition-colors py-2 border-b border-[var(--color-border)]/30"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--portfolio-resume-bg)] text-[var(--portfolio-resume-text)] font-semibold text-sm tracking-[0.04em] transition-all duration-200"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
          </a>
        </div>
      )}
    </header>
  );
}
