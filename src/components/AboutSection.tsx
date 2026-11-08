'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      const initAnimations = () => {
        const elements = sectionRef.current?.querySelectorAll('.about-reveal');
        if (!elements || elements.length === 0) return;

        gsap.fromTo(
          elements,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              once: true,
            },
            clearProps: 'opacity,transform',
          }
        );
      };

      if (!('IntersectionObserver' in window) || !sectionRef.current) {
        initAnimations();
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            initAnimations();
          }
        },
        { rootMargin: '350px 0px' }
      );

      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[var(--color-main-bg)] text-[var(--color-main-text)] border-t border-[var(--color-border)]/50 transition-colors duration-250 overflow-hidden"
      aria-label="About MD Danish Raza"
    >
      {/* Subtle ambient backlight complementing the teal blue palette */}
      <div
        className="absolute top-1/4 left-10 w-[520px] h-[520px] pointer-events-none opacity-25 dark:opacity-15 -translate-x-1/4"
        style={{
          background:
            'radial-gradient(circle, var(--portfolio-radial-glow) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Balanced Two-Column Split Layout (40:60 Proportions) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN (~42% / 5 cols): Premium Editorial Red-Suit Portrait */}
          <div className="about-reveal lg:col-span-5 flex justify-center lg:justify-start w-full">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--color-border)]/60 dark:border-[var(--color-border)]/40 shadow-[0_20px_45px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.5)] group">
              <Image
                src="/images/about-red-suit.webp"
                alt="MD Danish Raza in red formal suit and black sunglasses"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 480px, 440px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            </div>
          </div>

          {/* RIGHT COLUMN (~58% / 7 cols): Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Section Label */}
            <div className="about-reveal flex items-center gap-3 mb-5 sm:mb-6">
              <span
                className="w-7 sm:w-9 h-[1.5px] bg-[var(--portfolio-divider)] opacity-80 inline-block"
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                01 / ABOUT ME
              </span>
            </div>

            {/* Headline with Balverd Display Accent */}
            <h2 className="about-reveal text-3xl sm:text-4xl lg:text-[2.65rem] font-normal tracking-tight leading-[1.18] text-[var(--color-main-text)] mb-6 sm:mb-8">
              Architecting purposeful digital experiences with{' '}
              <span className="font-balverd tracking-normal text-[var(--color-primary-accent)] uppercase font-normal">
                precision engineering
              </span>{' '}
              and intentional design.
            </h2>

            {/* Narrative Paragraphs */}
            <div className="about-reveal space-y-4 sm:space-y-5 text-base sm:text-[17px] text-[var(--color-muted-text)] font-normal leading-relaxed mb-6 sm:mb-8">
              <p>
                I am a Computer Science Engineering student passionate about building reliable software and solving real-world problems. I enjoy combining structured engineering thinking with thoughtful user experiences.
              </p>
              <p>
                From developing full-stack applications to exploring new technologies, I focus on writing clean, maintainable code and creating digital products that balance functionality, performance, and usability.
              </p>
            </div>

            {/* Engineering Philosophy Quote */}
            <div className="about-reveal w-full border-l-2 border-[var(--color-primary-accent)] pl-5 sm:pl-6 py-3 my-2 sm:my-3 bg-[var(--color-secondary-bg)]/40 rounded-r-xl">
              <p className="text-base sm:text-lg italic text-[var(--color-main-text)]/90 leading-snug">
                &ldquo;Code should be as clean and robust under the hood as the
                user experience is seamless on the surface.&rdquo;
              </p>
              <span className="block mt-2 text-xs uppercase tracking-widest text-[var(--color-primary-accent)] font-medium">
                Engineering Philosophy
              </span>
            </div>

            {/* Explore Featured Work and Get In Touch CTAs */}
            <div className="about-reveal flex flex-wrap items-center gap-4 pt-4 sm:pt-6">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[var(--portfolio-view-work-bg)] text-[var(--portfolio-view-work-text)] font-bold text-xs sm:text-sm tracking-[0.04em] transition-all duration-200 hover:opacity-90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] cursor-pointer select-none"
              >
                <span>Explore Featured Work</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[var(--portfolio-about-bg)] border border-[var(--portfolio-about-border)] text-[var(--portfolio-about-text)] font-semibold text-xs sm:text-sm tracking-[0.04em] transition-all duration-200 hover:border-[var(--color-primary-accent)] hover:text-[var(--color-primary-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] cursor-pointer select-none"
              >
                <span>Get In Touch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
