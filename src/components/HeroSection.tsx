'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTheme } from './ThemeProvider';
import { AnimeCharacter } from './AnimeCharacter';
import { ExploreButton } from './ExploreButton';

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const outlineRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  const isFirstThemeMount = useRef<boolean>(true);
  const { theme } = useTheme();

  // Prompt outline sweep upon genuine light/dark theme switch
  useEffect(() => {
    if (isFirstThemeMount.current) {
      isFirstThemeMount.current = false;
      return;
    }

    const el = outlineRef.current;
    if (!el) return;

    // Reset outline animation so the new theme's sweep starts promptly without waiting
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  }, [theme]);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion: show all content immediately without motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(
          '.hero-typography, .hero-character, .hero-character-float, .hero-role-labels, .hero-cta, .hero-role-mobile',
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clearProps: 'all',
          }
        );
        return;
      }

      // If already animated in this session (e.g. during theme toggle), maintain visibility and idle motion
      if (hasAnimatedRef.current) {
        gsap.set('.hero-typography, .hero-character, .hero-role-labels, .hero-cta, .hero-role-mobile', {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        gsap.to('.hero-character-float', {
          y: -3.5,
          duration: 2.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        return;
      }

      hasAnimatedRef.current = true;

      // Master Entrance Timeline (1.5s total duration)
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // Secondary subtle idle floating on anime character: 3.5px gentle vertical float over 5.2s cycle
          gsap.to('.hero-character-float', {
            y: -3.5,
            duration: 2.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        },
      });

      // Phase A: Background Typography Reveal (Starts promptly at t=0.05s)
      tl.fromTo(
        '.hero-typography',
        { opacity: 0, scale: 0.97, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 1.15 },
        0.05
      );

      // Phase B: Anime Character Entrance (Starts at t=0.25s)
      tl.fromTo(
        '.hero-character',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.25
      );

      // Phase C: Role Labels Entrance (Desktop + Mobile) (Starts at t=0.55s)
      tl.fromTo(
        '.hero-role-labels, .hero-role-mobile',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.85 },
        0.55
      );

      // Phase D: Entry Button (Starts at t=0.70s, finishes at t=1.50s)
      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.70
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex-1 flex flex-col items-center justify-between h-full min-h-0 px-4 sm:px-6 overflow-hidden pt-2 sm:pt-4 pb-4 sm:pb-6"
      aria-label="Portfolio Introduction"
    >
      {/* 1. Oversized Background Typography: PORTFOLIO (Permanently anchored behind character's upper body/torso) */}
      <div
        className="hero-typography absolute top-[22%] sm:top-[24%] lg:top-[26%] left-0 right-0 w-full text-center pointer-events-none select-none z-0 overflow-hidden leading-none"
        aria-hidden="true"
      >
        <div className="relative inline-block leading-none">
          {/* Base subdued Gothic watermark */}
          <span className="font-alter-creed inline-block font-normal text-[18.5vw] sm:text-[22.5vw] lg:text-[23.5vw] tracking-normal leading-[0.85] text-[var(--color-watermark)] uppercase whitespace-nowrap">
            PORTFOLIO
          </span>

          {/* Elegant animated Gothic outline highlight */}
          <span
            ref={outlineRef}
            className="font-alter-creed absolute inset-0 font-normal text-[18.5vw] sm:text-[22.5vw] lg:text-[23.5vw] tracking-normal leading-[0.85] uppercase whitespace-nowrap select-none pointer-events-none gothic-watermark-outline"
            aria-hidden="true"
          >
            PORTFOLIO
          </span>
        </div>
      </div>

      {/* 2. Desktop Role Labels: ENGINEERING STUDENT under PORT, DEVELOPER under OLIO in Balverd */}
      <div
        className="hero-role-labels hidden md:block absolute top-[65.5%] lg:top-[67.5%] xl:top-[68.5%] left-0 right-0 w-full z-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="w-full text-center">
          <div className="inline-block text-left" style={{ width: 'min(89.9vw, 1726px)' }}>
            <div className="flex justify-between items-center w-full">
              {/* Left side: Aligned with PORT, from start of P to end of T (clear of bottom flourishes) */}
              <div className="w-[43%] flex items-center justify-start text-left">
                <span className="font-balverd font-normal tracking-[0.22em] lg:tracking-[0.28em] xl:tracking-[0.34em] text-[1.3vw] lg:text-[1.24vw] text-[var(--color-primary-accent)] uppercase select-none whitespace-nowrap">
                  ENGINEERING STUDENT
                </span>
              </div>

              {/* Right side: Aligned with OLIO, from start of first O to end of final O (clear of bottom flourishes) */}
              <div className="w-[43%] ml-auto flex items-center justify-end text-right">
                <span className="font-balverd font-normal tracking-[0.50em] lg:tracking-[0.60em] xl:tracking-[0.70em] text-[1.3vw] lg:text-[1.24vw] text-[var(--color-primary-accent)] uppercase select-none whitespace-nowrap">
                  DEVELOPER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Full-Body Anime Character Layered in Front (fills available height, never pushes bottom content offscreen) */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center w-full">
        <AnimeCharacter />
      </div>

      {/* 4. Bottom Entry Area: Centered CTA Button + Mobile-only fallback labels */}
      <div className="relative z-20 shrink-0 mt-2 sm:mt-3 flex flex-col items-center text-center gap-2 sm:gap-3">
        {/* Mobile-only fallback: Stacked centered labels below character on small screens */}
        <div className="hero-role-mobile md:hidden flex flex-col items-center text-center select-none text-[var(--color-primary-accent)] uppercase">
          <span className="font-balverd text-xs sm:text-sm font-normal tracking-[0.20em]">
            ENGINEERING STUDENT
          </span>
          <span className="font-balverd text-[11px] sm:text-xs font-normal tracking-[0.28em] text-[var(--color-primary-accent)]/90 mt-0.5">
            DEVELOPER
          </span>
        </div>

        <div className="hero-cta">
          <ExploreButton />
        </div>
      </div>
    </section>
  );
}
