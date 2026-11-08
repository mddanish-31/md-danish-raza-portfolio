'use client';

import React, { useState, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles } from 'lucide-react';
import {
  CLogo,
  CppLogo,
  PythonLogo,
  JavaLogo,
  JavaScriptLogo,
  TypeScriptLogo,
  Html5Logo,
  Css3Logo,
  ReactLogo,
  NextjsLogo,
  TailwindLogo,
  NodejsLogo,
  MongoLogo,
  PostgresLogo,
  MysqlLogo,
  GitLogo,
  GithubLogo,
  VscodeLogo,
  VercelLogo,
  GsapLogo,
  FramerMotionLogo,
  LenisLogo,
  DsaLogo,
  OopLogo,
  DbmsLogo,
} from './TechLogos';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SkillCategory =
  | 'All Skills'
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Tools & Platforms'
  | 'Web Animation'
  | 'CS Fundamentals';

interface Skill {
  name: string;
  category: SkillCategory;
  logo: React.ComponentType<{ className?: string }>;
}

const SKILLS_DATA: Skill[] = [
  // Languages (6)
  { name: 'C', category: 'Languages', logo: CLogo },
  { name: 'C++', category: 'Languages', logo: CppLogo },
  { name: 'Python', category: 'Languages', logo: PythonLogo },
  { name: 'Java', category: 'Languages', logo: JavaLogo },
  { name: 'JavaScript', category: 'Languages', logo: JavaScriptLogo },
  { name: 'TypeScript', category: 'Languages', logo: TypeScriptLogo },

  // Frontend (5)
  { name: 'HTML5', category: 'Frontend', logo: Html5Logo },
  { name: 'CSS3', category: 'Frontend', logo: Css3Logo },
  { name: 'React', category: 'Frontend', logo: ReactLogo },
  { name: 'Next.js', category: 'Frontend', logo: NextjsLogo },
  { name: 'Tailwind CSS', category: 'Frontend', logo: TailwindLogo },

  // Backend (1)
  { name: 'Node.js', category: 'Backend', logo: NodejsLogo },

  // Database (3)
  { name: 'MongoDB', category: 'Database', logo: MongoLogo },
  { name: 'PostgreSQL', category: 'Database', logo: PostgresLogo },
  { name: 'MySQL', category: 'Database', logo: MysqlLogo },

  // Tools & Platforms (4)
  { name: 'Git', category: 'Tools & Platforms', logo: GitLogo },
  { name: 'GitHub', category: 'Tools & Platforms', logo: GithubLogo },
  { name: 'VS Code', category: 'Tools & Platforms', logo: VscodeLogo },
  { name: 'Vercel', category: 'Tools & Platforms', logo: VercelLogo },

  // Web Animation (3)
  { name: 'GSAP', category: 'Web Animation', logo: GsapLogo },
  { name: 'Framer Motion', category: 'Web Animation', logo: FramerMotionLogo },
  { name: 'Lenis', category: 'Web Animation', logo: LenisLogo },

  // CS Fundamentals (3)
  { name: 'DSA', category: 'CS Fundamentals', logo: DsaLogo },
  { name: 'OOP', category: 'CS Fundamentals', logo: OopLogo },
  { name: 'DBMS', category: 'CS Fundamentals', logo: DbmsLogo },
];

const CATEGORIES: SkillCategory[] = [
  'All Skills',
  'Languages',
  'Frontend',
  'Backend',
  'Database',
  'Tools & Platforms',
  'Web Animation',
  'CS Fundamentals',
];

const EXPLORING_TOPICS = [
  'System Design',
  'AI / ML',
  'DevOps',
  'Advanced Next.js',
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All Skills');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All Skills') return SKILLS_DATA;
    return SKILLS_DATA.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Skills': SKILLS_DATA.length,
    };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All Skills') {
        counts[cat] = SKILLS_DATA.filter((s) => s.category === cat).length;
      }
    });
    return counts;
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      const initAnimations = () => {
        const elements = sectionRef.current?.querySelectorAll('.skills-reveal');
        if (!elements || elements.length === 0) return;

        gsap.fromTo(
          elements,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.03,
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
      id="skills"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[var(--color-main-bg)] text-[var(--color-main-text)] border-t border-[var(--color-border)]/50 transition-colors duration-250 overflow-hidden"
      aria-label="Technical Skills Showcase"
    >
      {/* Subtle warm ambient glow in background */}
      <div
        className="absolute top-1/3 right-10 w-[550px] h-[550px] pointer-events-none opacity-25 dark:opacity-15 translate-x-1/4"
        style={{
          background:
            'radial-gradient(circle, var(--portfolio-radial-glow) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* 1. SECTION INTRODUCTION & SUMMARY INDICATORS */}
        <div className="skills-reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 sm:mb-20">
          <div className="max-w-2xl">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="w-7 sm:w-9 h-[1.5px] bg-[var(--portfolio-divider)] opacity-80 inline-block"
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                02 / SKILLS
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-normal tracking-tight leading-[1.18] text-[var(--color-main-text)] mb-4">
              My Technical{' '}
              <span className="font-balverd tracking-normal text-[var(--color-primary-accent)] uppercase font-normal">
                Toolkit
              </span>
            </h2>

            {/* Supporting Text */}
            <p className="text-base sm:text-[17px] text-[var(--color-muted-text)] font-normal leading-relaxed">
              A curated set of technologies and tools I use to build, ship, and
              iterate on real-world solutions.
            </p>
          </div>

          {/* Compact Summary Statistics Indicators */}
          <div className="flex items-center gap-4 sm:gap-6 pt-2 lg:pt-0 border-t lg:border-t-0 border-[var(--color-border)]/40">
            <div className="flex flex-col">
              <span className="font-balverd text-2xl sm:text-3xl text-[var(--color-primary-accent)] leading-none">
                {SKILLS_DATA.length}
              </span>
              <span className="text-xs text-[var(--color-muted-text)] uppercase tracking-wider mt-1 font-medium">
                Technologies
              </span>
            </div>

            <span className="w-[1px] h-9 bg-[var(--color-border)]/60" aria-hidden="true" />

            <div className="flex flex-col">
              <span className="font-balverd text-2xl sm:text-3xl text-[var(--color-primary-accent)] leading-none">
                {CATEGORIES.filter((c) => c !== 'All Skills').length}
              </span>
              <span className="text-xs text-[var(--color-muted-text)] uppercase tracking-wider mt-1 font-medium">
                Core Domains
              </span>
            </div>

            <span className="w-[1px] h-9 bg-[var(--color-border)]/60" aria-hidden="true" />

            <div className="flex flex-col">
              <span className="font-balverd text-2xl sm:text-3xl text-[var(--color-primary-accent)] leading-none">
                ∞
              </span>
              <span className="text-xs text-[var(--color-muted-text)] uppercase tracking-wider mt-1 font-medium">
                Ongoing Learning
              </span>
            </div>
          </div>
        </div>

        {/* 2. MAIN LAYOUT: CATEGORY NAVIGATION (LEFT) + TECHNOLOGY GRID (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* CATEGORY NAVIGATION (Desktop: 3 cols / Left, Mobile: Horizontal scroll) */}
          <div className="skills-reveal lg:col-span-3 w-full">
            {/* Mobile Horizontal Pill Scroll */}
            <div className="flex lg:hidden overflow-x-auto pb-2 gap-2 no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    type="button"
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] font-semibold shadow-sm'
                        : 'bg-[var(--color-secondary-bg)]/60 text-[var(--color-muted-text)] hover:text-[var(--color-main-text)] border border-[var(--color-border)]/40'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[var(--color-btn-text)]/15 text-[var(--color-btn-text)]'
                          : 'bg-[var(--color-main-bg)]/60 text-[var(--color-muted-text)]'
                      }`}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Vertical Menu */}
            <div className="hidden lg:flex flex-col gap-1.5 p-2 rounded-2xl bg-[var(--color-secondary-bg)]/40 border border-[var(--color-border)]/40 backdrop-blur-sm">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-text)] px-3 py-2">
                Filter by Domain
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    type="button"
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] font-semibold shadow-sm'
                        : 'text-[var(--color-muted-text)] hover:text-[var(--color-main-text)] hover:bg-[var(--color-secondary-bg)]/70'
                    }`}
                  >
                    <span className="tracking-wide">{cat}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isActive
                          ? 'bg-[var(--color-btn-text)]/15 text-[var(--color-btn-text)] font-bold'
                          : 'bg-[var(--color-main-bg)]/80 text-[var(--color-muted-text)]'
                      }`}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TECHNOLOGY CARDS GRID (9 cols / Right) */}
          <div className="lg:col-span-9 w-full">
            <div
              ref={gridRef}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4"
            >
              {filteredSkills.map((skill) => {
                const Logo = skill.logo;
                return (
                  <div
                    key={skill.name}
                    tabIndex={0}
                    role="article"
                    aria-label={`${skill.name} (${skill.category})`}
                    className="skills-card group relative p-4 sm:p-5 rounded-2xl cursor-default select-none flex flex-col items-center sm:items-start justify-between min-h-[110px] sm:min-h-[120px] bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] hover:border-[var(--portfolio-skill-card-border-hover)] focus-visible:outline-none"
                  >
                    {/* Top Row: Tech Logo */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--portfolio-skill-logo-bg)] group-hover:scale-105 transition-transform duration-200">
                      <Logo className="w-6 h-6" />
                    </div>

                    {/* Bottom Content: Name & Category Tag */}
                    <div className="mt-3 text-center sm:text-left w-full">
                      <h3 className="text-xs sm:text-sm font-semibold text-[var(--color-main-text)] tracking-wide group-hover:text-[var(--color-primary-accent)] transition-colors line-clamp-1">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] text-[var(--color-muted-text)] tracking-wider uppercase font-medium">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. CURRENTLY EXPLORING PANEL (Restrained Glassmorphism) */}
        <div className="skills-reveal mt-14 sm:mt-16 rounded-2xl p-6 sm:p-8 backdrop-blur-md bg-[var(--color-secondary-bg)]/40 border border-[var(--color-primary-accent)]/20 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[var(--color-primary-accent)]" />
              <h3 className="text-base sm:text-lg font-semibold text-[var(--color-main-text)]">
                Currently Exploring
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-muted-text)] leading-relaxed">
              Deepening my skills and expanding into new technical areas.
            </p>
          </div>

          {/* Exploring Topics Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {EXPLORING_TOPICS.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[var(--color-main-bg)]/70 border border-[var(--color-border)]/60 text-xs sm:text-sm font-medium text-[var(--color-main-text)] transition-colors hover:border-[var(--color-primary-accent)]/50 shadow-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-accent)] animate-pulse"
                  aria-hidden="true"
                />
                <span>{topic}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
