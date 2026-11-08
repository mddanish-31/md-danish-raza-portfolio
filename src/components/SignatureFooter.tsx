'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SignatureFooter({
  currentYear = 2026,
}: {
  currentYear?: number | string;
} = {}) {
  const footerRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const sigText = signatureRef.current;
      const underline = underlineRef.current;

      if (prefersReducedMotion) {
        if (sigText) {
          sigText.style.opacity = '1';
          sigText.style.clipPath = 'none';
          sigText.style.transform = 'none';
        }
        if (underline) {
          underline.style.strokeDasharray = 'none';
          underline.style.strokeDashoffset = '0';
        }
        if (glowRef.current) {
          glowRef.current.style.opacity = '0.25';
        }
        return;
      }

      const initTimeline = () => {
        // Master GSAP Reveal Timeline — plays once when footer enters viewport
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            once: true,
            onEnter: () => {
              if (underline) {
                try {
                  const length = underline.getTotalLength();
                  underline.style.strokeDasharray = `${length + 1}`;
                  underline.style.strokeDashoffset = `${length + 1}`;
                } catch {
                  underline.style.strokeDasharray = 'none';
                  underline.style.strokeDashoffset = '0';
                }
              }
            },
          },
        });

        // 1. Smooth, cinematic left-to-right reveal of the actual Rasley Heights font glyphs.
        // Generous top/bottom margin (-40% / -25%) in the inset ensures upper flourishes are NEVER clipped during reveal.
        if (sigText) {
          tl.fromTo(
            sigText,
            {
              opacity: 0,
              x: -14,
              clipPath: 'inset(-40% 100% -25% -10%)',
            },
            {
              opacity: 1,
              x: 0,
              clipPath: 'inset(-40% 0% -25% -10%)',
              duration: 0.55,
              ease: 'power2.out',
              onComplete: () => {
                // Ensure clip-path is cleanly removed once the reveal completes
                if (sigText) {
                  sigText.style.clipPath = 'none';
                }
              },
            }
          );
        }

        // 2. Refined underline drawing from left to right beneath the name
        if (underline) {
          tl.to(
            underline,
            {
              strokeDashoffset: 0,
              duration: 0.45,
              ease: 'power2.out',
            },
            '-=0.15'
          );
        }

        // 3. Subtle ambient aqua highlight glow settling across signature
        if (glowRef.current) {
          tl.fromTo(
            glowRef.current,
            { opacity: 0, scale: 0.94 },
            {
              opacity: 0.35,
              scale: 1,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: 'sine.inOut',
            },
            '-=0.2'
          );
        }
      };

      if (!('IntersectionObserver' in window) || !footerRef.current) {
        initTimeline();
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            initTimeline();
          }
        },
        { rootMargin: '350px 0px' }
      );

      observer.observe(footerRef.current);
      return () => observer.disconnect();
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="w-full mt-16 sm:mt-20 lg:mt-24 pt-12 sm:pt-16 pb-6 border-t border-[var(--color-border)]/40 relative z-10 text-[var(--color-main-text)]"
      aria-label="Portfolio Footer and Personal Signature"
    >
      {/* =========================================================================
          OPTIMIZED BALANCED GRID:
          Desktop proportions: Navigate (~17%) : Elsewhere (~17%) : Information (~20%) : Signature (~46%)
          Tablet: Navigate (25%) + Elsewhere (25%) + Information (50%) | Signature (100% full width)
          Mobile: Navigate (50%) + Elsewhere (50%) | Information (100%) | Signature (100%)
          ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-12 lg:grid-cols-[1.7fr_1.7fr_2.0fr_4.6fr] gap-6 sm:gap-8 lg:gap-6 xl:gap-8 items-start">
        {/* Column 1: Navigate (~17% desktop) */}
        <div className="col-span-1 md:col-span-3 lg:col-span-1 flex flex-col">
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase mb-4 sm:mb-5 select-none">
            NAVIGATE
          </span>
          <nav className="flex flex-col gap-3" aria-label="Page Sections">
            <a
              href="#about"
              className="text-sm sm:text-base text-[var(--color-main-text)]/90 hover:text-[var(--color-primary-accent)] font-medium transition-colors duration-150 inline-block w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-xs"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-sm sm:text-base text-[var(--color-main-text)]/90 hover:text-[var(--color-primary-accent)] font-medium transition-colors duration-150 inline-block w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-xs"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="text-sm sm:text-base text-[var(--color-main-text)]/90 hover:text-[var(--color-primary-accent)] font-medium transition-colors duration-150 inline-block w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-xs"
            >
              Projects
            </a>
            <a
              href="#journey"
              className="text-sm sm:text-base text-[var(--color-main-text)]/90 hover:text-[var(--color-primary-accent)] font-medium transition-colors duration-150 inline-block w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-xs"
            >
              Journey
            </a>
            <a
              href="#contact"
              className="text-sm sm:text-base text-[var(--color-main-text)]/90 hover:text-[var(--color-primary-accent)] font-medium transition-colors duration-150 inline-block w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-xs"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Column 2: Elsewhere (~17% desktop) */}
        <div className="col-span-1 md:col-span-3 lg:col-span-1 flex flex-col">
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase mb-4 sm:mb-5 select-none">
            ELSEWHERE
          </span>
          <div className="flex flex-col gap-3">
            <a
              href="https://github.com/mddanish-31"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-sm sm:text-base text-[var(--color-main-text)]/90 hover:text-[var(--color-primary-accent)] font-medium transition-colors duration-150 inline-flex items-center gap-1.5 w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-xs"
              aria-label="GitHub Profile (opens in new tab)"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 text-[var(--color-primary-accent)]" />
            </a>
            <a
              href="https://www.linkedin.com/in/md-danish-raza31"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-sm sm:text-base text-[var(--color-main-text)]/90 hover:text-[var(--color-primary-accent)] font-medium transition-colors duration-150 inline-flex items-center gap-1.5 w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-xs"
              aria-label="LinkedIn Profile (opens in new tab)"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 text-[var(--color-primary-accent)]" />
            </a>
            <a
              href="mailto:mddanishrazapro@gmail.com"
              className="group text-sm sm:text-base text-[var(--color-main-text)]/90 hover:text-[var(--color-primary-accent)] font-medium transition-colors duration-150 inline-flex items-center gap-1.5 w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary-accent)] rounded-xs"
              aria-label="Send Email to MD Danish Raza"
            >
              <span>Email</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 text-[var(--color-primary-accent)]" />
            </a>
          </div>
        </div>

        {/* Column 3: Information (~20% desktop) */}
        <div className="col-span-2 md:col-span-6 lg:col-span-1 flex flex-col">
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase mb-4 sm:mb-5 select-none">
            INFORMATION
          </span>
          <div className="flex flex-col text-xs sm:text-sm">
            {/* Location Group */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-[var(--color-main-text)] font-semibold text-sm sm:text-base">
                <MapPin className="w-4 h-4 text-[var(--color-primary-accent)] shrink-0" aria-hidden="true" />
                <span>Kolkata, India</span>
              </div>
              <p className="text-xs text-[var(--color-muted-text)] font-mono pl-5.5 leading-normal">
                Science City Area · IST (UTC+5:30)
              </p>
            </div>

            {/* Subtle Structural Divider */}
            <div className="w-full h-px bg-[var(--color-border)]/35 my-2.5" />

            {/* Availability Group */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wide">
                  Available for collaboration
                </span>
              </div>
              <p className="text-xs text-[var(--color-muted-text)] pl-3.5 leading-normal">
                Open to remote opportunities worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Column 4: Signature (~46% desktop, significantly increased width) */}
        <div className="col-span-2 md:col-span-12 lg:col-span-1 w-full flex flex-col items-center justify-center mt-6 md:mt-8 lg:mt-0">
          <div className="relative w-full max-w-[560px] sm:max-w-[620px] lg:max-w-full flex flex-col items-center text-center overflow-visible">
            {/* Eyebrow Label Centered in Signature Area */}
            <div className="mb-1 select-none">
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                DESIGNED &amp; ENGINEERED BY
              </span>
            </div>

            {/* Soft Ambient Aqua Sheen behind signature */}
            <div
              ref={glowRef}
              className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 blur-2xl rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse at center, var(--portfolio-radial-glow) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* Single-Line Rasley Heights Wordmark with Generous Breathing Room */}
            <div className="relative z-10 w-full flex flex-col items-center overflow-visible pt-1 pb-1">
              <div className="w-full flex justify-center overflow-visible">
                <h3
                  ref={signatureRef}
                  className="font-rasley text-[var(--color-primary-accent)] leading-[1.32] whitespace-nowrap select-none pt-2 pb-1.5 px-3 drop-shadow-xs text-center overflow-visible"
                  style={{
                    fontFamily: "var(--font-rasley-heights), 'Rasley Heights', cursive",
                    fontSize: 'clamp(1.9rem, 3.6vw, 3.65rem)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  MD Danish Raza
                </h3>
              </div>

              {/* Refined Underline Flourish Centered Beneath Name */}
              <svg
                viewBox="0 0 460 18"
                className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] h-auto overflow-visible mt-0.5 select-none mx-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  ref={underlineRef}
                  className="sig-underline"
                  d="M 8 10 C 100 12 200 8 300 8 C 380 8 430 12 454 10"
                  stroke="var(--color-primary-accent)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM FOOTER BAR
          ========================================================================= */}
      <div className="w-full h-px bg-[var(--color-border)]/40 mt-14 sm:mt-16 lg:mt-20 mb-6 sm:mb-8" />

      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-[var(--color-muted-text)]">
        <p className="font-normal">
          © {currentYear} MD Danish Raza. All rights reserved.
        </p>
        <p className="font-mono tracking-tight text-xs sm:text-sm text-[var(--color-muted-text)] opacity-90 sm:text-right">
          Built with intention. Engineered with precision.
        </p>
      </div>
    </footer>
  );
}

export default SignatureFooter;
