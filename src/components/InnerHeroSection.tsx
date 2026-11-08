'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Mail } from 'lucide-react';

gsap.registerPlugin(useGSAP);

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export function InnerHeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          '.inner-hero-kicker, .inner-portfolio-bg, .inner-hero-portrait-img, .inner-intro-left, .inner-intro-right',
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clearProps: 'all',
          }
        );
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          gsap.set(
            '.inner-hero-kicker, .inner-portfolio-bg, .inner-intro-left, .inner-intro-right',
            { clearProps: 'opacity,transform' }
          );
        },
      });

      tl.fromTo(
        '.inner-hero-kicker',
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35 }
      )
        .fromTo(
          '.inner-portfolio-bg',
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.45 },
          '-=0.2'
        )
        .fromTo(
          '.inner-intro-left',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.25'
        )
        .fromTo(
          '.inner-intro-right',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.3'
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] lg:h-[calc(100svh-5rem)] lg:max-h-[960px] overflow-x-hidden lg:overflow-hidden select-none flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-6"
      aria-label="MD Danish Raza Inner Introduction"
    >
      {/* 1. SOFT RADIAL WARM BACKLIGHT BEHIND PORTRAIT */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 34%, var(--portfolio-radial-glow) 0%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* 2. TOP-LEFT SUBTITLE / KICKER */}
      <div className="inner-hero-kicker lg:absolute lg:top-7 lg:left-14 z-20 flex items-center gap-3 mb-4 lg:mb-0">
        <span
          className="w-7 sm:w-9 h-[1.5px] bg-[var(--portfolio-divider)] opacity-80 inline-block"
          aria-hidden="true"
        />
        <p className="text-[10px] sm:text-[11.5px] font-semibold tracking-[0.2em] text-[var(--color-main-text)]/90 uppercase">
          A COMPUTER SCIENCE ENGINEERING STUDENT
        </p>
      </div>

      {/* 3. GIANT GRADIENT PORTFOLIO TYPOGRAPHY (Behind Portrait) */}
      <div
        className="hidden lg:flex absolute inset-x-0 top-[30%] -translate-y-1/2 items-center justify-center pointer-events-none select-none z-0 inner-portfolio-bg px-12"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto max-h-[64vh] drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="portfolioGradientDesktop"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--portfolio-grad-start)" />
              <stop offset="45%" stopColor="var(--portfolio-grad-mid)" />
              <stop offset="100%" stopColor="var(--portfolio-grad-end)" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="76%"
            textAnchor="middle"
            className="font-sans font-black uppercase"
            fontSize="265"
            fill="url(#portfolioGradientDesktop)"
            style={{ letterSpacing: '-0.03em' }}
          >
            PORTFOLIO
          </text>
        </svg>
      </div>

      {/* 4. DESKTOP CENTRAL FOREGROUND PORTRAIT (Anchored flush to bottom-0 so bottom edge meets section baseline) */}
      <div className="hidden lg:flex absolute inset-x-0 bottom-0 z-10 items-end justify-center pointer-events-none">
        <div className="relative h-[94vh] lg:h-[98vh] max-h-[960px] aspect-[3/4] flex items-end justify-center inner-hero-portrait-img">
          <Image
            src="/images/danish-portrait.webp"
            alt="MD Danish Raza — Developer in black turtleneck"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 720px, 1px"
            className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* MOBILE SHOWCASE (Visible on screens < lg) */}
      <div className="lg:hidden relative w-full flex flex-col items-center justify-center my-auto min-h-[340px] py-2">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center pointer-events-none px-2">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-auto drop-shadow-md"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient
                id="portfolioGradientMobile"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="var(--portfolio-grad-start)" />
                <stop offset="45%" stopColor="var(--portfolio-grad-mid)" />
                <stop offset="100%" stopColor="var(--portfolio-grad-end)" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="76%"
              textAnchor="middle"
              className="font-sans font-black uppercase"
              fontSize="265"
              fill="url(#portfolioGradientMobile)"
              style={{ letterSpacing: '-0.03em' }}
            >
              PORTFOLIO
            </text>
          </svg>
        </div>

        <div className="relative z-10 w-full flex items-end justify-center pointer-events-none h-[44vh] max-h-[420px] inner-hero-portrait-img">
          <Image
            src="/images/danish-portrait.webp"
            alt="MD Danish Raza — Developer in black turtleneck"
            width={768}
            height={1024}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 280px, (max-width: 1023px) 420px, 1px"
            className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 5. BOTTOM EDITORIAL PANELS: LEFT (NAME & CTAs) + RIGHT (PARAGRAPH & SOCIALS) */}
      <div className="relative lg:static z-20 w-full flex flex-col lg:block gap-6 mt-6 lg:mt-0">
        {/* LEFT COLUMN: Name, Subtitle & Action Buttons */}
        <div className="inner-intro-left lg:absolute lg:bottom-9 lg:left-14 z-20 flex flex-col items-start gap-3.5 max-w-md">
          <div>
            <h2 className="font-balverd font-normal text-3xl sm:text-4xl lg:text-[2.75rem] text-[var(--color-primary-accent)] tracking-[0.06em] leading-tight">
              MD DANISH
            </h2>
            <div className="flex items-center gap-3">
              <span className="font-balverd font-normal text-3xl sm:text-4xl lg:text-[2.75rem] text-[var(--color-main-text)] tracking-[0.06em] leading-tight font-bold">
                RAZA
              </span>
              <span
                className="w-12 sm:w-16 h-[2px] bg-[var(--portfolio-divider)] opacity-70 inline-block"
                aria-hidden="true"
              />
            </div>
            <div className="mt-2.5">
              <p className="text-sm sm:text-base lg:text-[1.05rem] font-semibold text-[var(--color-main-text)] tracking-tight">
                Full-Stack Developer
              </p>
              <p className="text-xs sm:text-[13px] text-[var(--color-muted-text)] font-normal leading-relaxed mt-0.5">
                Computer Science Student · Software Engineering · Creative Problem Solving
              </p>
            </div>
          </div>

          {/* Action CTAs: View Selected Work & About Me */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-1">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[var(--portfolio-view-work-bg)] text-[var(--portfolio-view-work-text)] font-bold text-xs sm:text-sm tracking-[0.06em] transition-all duration-200 hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer select-none"
            >
              <span>View Selected Work</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#about"
              className="group inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-full bg-[var(--portfolio-about-bg)] border border-[var(--portfolio-about-border)] text-[var(--portfolio-about-text)] font-semibold text-xs sm:text-sm tracking-[0.06em] transition-all duration-200 hover:border-[var(--color-primary-accent)] hover:text-[var(--color-primary-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 w-full sm:w-auto cursor-pointer select-none"
            >
              <span>About Me</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Engineering Mindset Statement & Social Links */}
        <div className="inner-intro-right lg:absolute lg:bottom-[98px] lg:right-14 z-20 max-w-[340px] xl:max-w-[360px]">
          <div className="border-l-2 border-[var(--portfolio-quote-border)] pl-4">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase block mb-1">
              ENGINEERING MINDSET
            </span>
            <h3 className="text-sm sm:text-[15px] lg:text-base font-semibold text-[var(--color-main-text)] tracking-tight leading-snug mb-1.5">
              Turning ideas into experiences that work.
            </h3>
            <p className="text-xs sm:text-[13px] text-[var(--portfolio-quote-text)] leading-relaxed font-normal">
              I enjoy exploring ideas, solving engineering challenges and building digital products with thoughtful design and practical technology.
            </p>
          </div>
        </div>

        {/* Social Links: Kept in Lower-Right Position, Aligned with CTA Buttons */}
        <div className="inner-intro-right lg:absolute lg:bottom-9 lg:right-14 z-20 flex items-center gap-3.5 text-[var(--portfolio-social-color)] mt-1 sm:mt-2 lg:mt-0">
          <a
            href="https://github.com/mddanish-31"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-primary-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] rounded-sm"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
          </a>

          <span
            className="text-[var(--portfolio-divider)] opacity-60 select-none"
            aria-hidden="true"
          >
            |
          </span>

          <a
            href="https://www.linkedin.com/in/md-danish-raza31"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-primary-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] rounded-sm"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
          </a>

          <span
            className="text-[var(--portfolio-divider)] opacity-60 select-none"
            aria-hidden="true"
          >
            |
          </span>

          <a
            href="mailto:mddanishrazapro@gmail.com"
            className="hover:text-[var(--color-primary-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] rounded-sm"
            aria-label="Email MD Danish Raza"
          >
            <Mail className="w-5 h-5 stroke-[1.8] transition-transform duration-200 hover:scale-110" />
          </a>
        </div>
      </div>
    </section>
  );
}
