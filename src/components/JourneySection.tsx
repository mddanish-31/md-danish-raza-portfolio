'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  GraduationCap,
  Award,
  Trophy,
  Code2,
  CheckCircle2,
  Target,
  BookOpen,
  Layers,
  Flame,
  Sparkles,
  Calendar,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Milestone {
  year: string;
  title: string;
  organization: string;
  description: string;
  category: 'Education' | 'Hackathon' | 'Projects' | 'Milestone' | 'Future Goal';
  icon: React.ComponentType<{ className?: string }>;
  isFuture?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    year: '2024',
    title: 'B.Tech in Computer Science & Engineering',
    organization: 'Adamas University',
    description:
      'Undergraduate study in CSE, building core fundamentals in data structures, algorithms, and computing architecture.',
    category: 'Education',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'Smart India Hackathon (SIH 2024)',
    organization: 'National Level Hackathon',
    description:
      'Collaborated in a national sprint to architect technology-driven solutions for real-world public sector challenges.',
    category: 'Hackathon',
    icon: Award,
  },
  {
    year: '2025',
    title: 'Vibeforge 12-Hour Hackathon',
    organization: 'Competitive Engineering Sprint',
    description:
      'Engineered and shipped a working product prototype in a fast-paced 12-hour hackathon, testing rapid architecture and live debugging.',
    category: 'Hackathon',
    icon: Trophy,
  },
  {
    year: '2025–2026',
    title: 'Full-Stack Project Development',
    organization: 'ERN · SAATHI · Hall of Fame',
    description:
      'Architected three production web applications: ERN (food loss reduction marketplace), SAATHI (service booking platform), and Section D Hall of Fame.',
    category: 'Projects',
    icon: Code2,
  },
  {
    year: '2026',
    title: 'SIH 2026 First-Round Clearance',
    organization: 'National Level Hackathon',
    description:
      'Cleared initial competitive selection rounds for SIH 2026 with an evaluated system architecture and validated technical scope.',
    category: 'Milestone',
    icon: CheckCircle2,
  },
  {
    year: '2028',
    title: 'Placement & Graduation Target',
    organization: 'Career Milestone · Target Goal',
    description:
      'Targeting graduation with academic distinction and stepping into a high-impact software engineering role at a tier-1 product company.',
    category: 'Future Goal',
    icon: Target,
    isFuture: true,
  },
];

const ACHIEVEMENT_STATS = [
  {
    value: '8.525',
    label: 'CGPA Score',
    subtext: 'Till 2nd Year (Verified)',
    icon: BookOpen,
  },
  {
    value: '3',
    label: 'Major Projects',
    subtext: 'ERN · SAATHI · Hall of Fame',
    icon: Layers,
  },
  {
    value: '2',
    label: 'Hackathons',
    subtext: 'SIH & Vibeforge Sprints',
    icon: Flame,
  },
];

const FOCUS_ITEMS = [
  {
    title: 'Data Structures & Algorithms',
    detail: 'Algorithmic problem solving and DSA fundamentals.',
    icon: Code2,
  },
  {
    title: 'Full-Stack Development',
    detail: 'MERN / Next.js.',
    icon: Layers,
  },
  {
    title: 'System Design & Placement Preparation',
    detail: 'Engineering fundamentals and interview preparation.',
    icon: Target,
  },
];

/**
 * Interactive Dotted Background
 * Renders a delicate dot grid on an HTML5 canvas where dots near the cursor
 * gently disperse and spring back to their home positions smoothly.
 * Idle-optimized, DPR-aware, respects prefers-reduced-motion, and disables on touch.
 */
function InteractiveDottedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let initialized = false;
    let isNearViewport = false;

    const SPACING = 32;
    const DOT_RADIUS = 1.05;
    const INFLUENCE_RADIUS = 95;
    const PUSH_STRENGTH = 16;
    const RETURN_EASE = 0.09;

    interface Dot {
      ox: number;
      oy: number;
      x: number;
      y: number;
    }

    let dots: Dot[] = [];
    const mouse = { x: -1000, y: -1000, isOver: false };
    let isAnimating = false;

    // Reduced idle opacity by ~18% for a softer, non-competing technical background
    const getDotColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? 'rgba(45, 212, 191, 0.13)' : 'rgba(13, 148, 136, 0.18)';
    };

    let dotColor = getDotColor();

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * SPACING;
          const oy = r * SPACING;
          dots.push({
            ox,
            oy,
            x: ox,
            y: oy,
          });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.ox, dot.oy, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const handleResize = () => {
      if (!isNearViewport && !initialized) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dotColor = getDotColor();
      initDots();
      drawStatic();
      initialized = true;
    };

    const render = () => {
      if (!isNearViewport) {
        isAnimating = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;

      let anyMoving = false;

      const minX = mouse.x - INFLUENCE_RADIUS;
      const maxX = mouse.x + INFLUENCE_RADIUS;
      const minY = mouse.y - INFLUENCE_RADIUS;
      const maxY = mouse.y + INFLUENCE_RADIUS;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (
          mouse.isOver &&
          dot.ox >= minX &&
          dot.ox <= maxX &&
          dot.oy >= minY &&
          dot.oy <= maxY
        ) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < INFLUENCE_RADIUS && dist > 0) {
            const force = (1 - dist / INFLUENCE_RADIUS) * PUSH_STRENGTH;
            const angle = Math.atan2(dy, dx);
            const targetX = dot.ox + Math.cos(angle) * force;
            const targetY = dot.oy + Math.sin(angle) * force;

            dot.x += (targetX - dot.x) * 0.16;
            dot.y += (targetY - dot.y) * 0.16;
            anyMoving = true;
          } else {
            const dHomeX = dot.ox - dot.x;
            const dHomeY = dot.oy - dot.y;
            dot.x += dHomeX * RETURN_EASE;
            dot.y += dHomeY * RETURN_EASE;
            if (Math.abs(dHomeX) > 0.1 || Math.abs(dHomeY) > 0.1) {
              anyMoving = true;
            }
          }
        } else {
          const dHomeX = dot.ox - dot.x;
          const dHomeY = dot.oy - dot.y;
          if (Math.abs(dHomeX) > 0.05 || Math.abs(dHomeY) > 0.05) {
            dot.x += dHomeX * RETURN_EASE;
            dot.y += dHomeY * RETURN_EASE;
            anyMoving = true;
          } else {
            dot.x = dot.ox;
            dot.y = dot.oy;
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      if (anyMoving || mouse.isOver) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        isAnimating = false;
      }
    };

    const startAnimation = () => {
      if (!isAnimating && isNearViewport && !prefersReducedMotion && !isTouch) {
        isAnimating = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const parentSection = canvas.parentElement;
    if (!parentSection) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isNearViewport || prefersReducedMotion || isTouch) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isOver = true;
      startAnimation();
    };

    const handlePointerLeave = () => {
      mouse.isOver = false;
      mouse.x = -1000;
      mouse.y = -1000;
      if (isNearViewport) {
        startAnimation();
      }
    };

    parentSection.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    parentSection.addEventListener('pointerleave', handlePointerLeave, {
      passive: true,
    });
    window.addEventListener('resize', handleResize);

    const themeObserver = new MutationObserver(() => {
      dotColor = getDotColor();
      if (!isAnimating && initialized) drawStatic();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Viewport-aware lazy initialization & pause offscreen
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isNearViewport = entry.isIntersecting;
          if (entry.isIntersecting) {
            if (!initialized) {
              handleResize();
            }
          } else if (isAnimating) {
            cancelAnimationFrame(animationFrameId);
            isAnimating = false;
          }
        },
        { rootMargin: '250px 0px' }
      );
      io.observe(canvas);
    } else {
      isNearViewport = true;
      handleResize();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (io) io.disconnect();
      parentSection.removeEventListener('pointermove', handlePointerMove);
      parentSection.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const spineTrackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Coordinated GSAP Scroll Entrance & Continuous Timeline Progress
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const initJourney = () => {
        // 1. Entrance reveal for initial section content
        const revealElements = sectionRef.current?.querySelectorAll('.journey-reveal');
        if (revealElements && revealElements.length > 0) {
          if (prefersReducedMotion) {
            gsap.set(revealElements, { opacity: 1, y: 0 });
          } else {
            gsap.fromTo(
              revealElements,
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
          }
        }

        // 2. Geometry measurement helper
        let nodeOffsets: number[] = [];
        let totalDistance = 0;
        let startY0 = 22;

        const measureGeometry = () => {
          if (!timelineRef.current || nodeRefs.current.length < MILESTONES.length) return;
          const container = timelineRef.current;
          const firstNode = nodeRefs.current[0];
          const lastNode = nodeRefs.current[nodeRefs.current.length - 1];
          if (!firstNode || !lastNode) return;

          const containerRect = container.getBoundingClientRect();
          const firstRect = firstNode.getBoundingClientRect();
          const lastRect = lastNode.getBoundingClientRect();

          startY0 = firstRect.top - containerRect.top + firstRect.height / 2;
          const endY = lastRect.top - containerRect.top + lastRect.height / 2;
          totalDistance = Math.max(1, endY - startY0);

          nodeOffsets = nodeRefs.current.map((n) => {
            if (!n) return 0;
            const r = n.getBoundingClientRect();
            return r.top - containerRect.top + r.height / 2 - startY0;
          });

          if (spineTrackRef.current) {
            spineTrackRef.current.style.top = `${startY0}px`;
            spineTrackRef.current.style.height = `${totalDistance}px`;
          }
          if (progressLineRef.current) {
            progressLineRef.current.style.top = `${startY0}px`;
          }
        };

        // Helper function to update active/passed states synchronously
        let lastActiveIdx = -1;
        const updateActiveStates = (currentY: number) => {
          if (nodeOffsets.length === 0) return;

          // Advance sequentially: find the latest milestone reached by currentY
          let activeIdx = 0;
          for (let i = nodeOffsets.length - 1; i >= 0; i--) {
            if (currentY >= nodeOffsets[i] - 6) {
              activeIdx = i;
              break;
            }
          }

          if (activeIdx !== lastActiveIdx) {
            lastActiveIdx = activeIdx;
            nodeRefs.current.forEach((nodeEl, idx) => {
              if (!nodeEl) return;
              const cardEl = cardRefs.current[idx];
              const isCurrent = idx === activeIdx;
              const isPassed = idx < activeIdx;

              const state = isCurrent
                ? 'active'
                : isPassed
                ? 'passed'
                : 'upcoming';

              nodeEl.setAttribute('data-state', state);
              if (cardEl) {
                cardEl.setAttribute('data-state', state);
              }
            });
          }
        };

        measureGeometry();
        updateActiveStates(0);

        // 3. ScrollTrigger for continuous, synchronized progress down the timeline
        const firstRowEl = rowRefs.current[0];
        const lastRowEl = rowRefs.current[rowRefs.current.length - 1];

        if (!firstRowEl || !lastRowEl || !timelineRef.current) return;

        const scrollTriggerInstance = ScrollTrigger.create({
          trigger: firstRowEl,
          start: 'top 55%',
          endTrigger: lastRowEl,
          end: 'center 75%',
          scrub: 0.2,
          onRefresh: () => {
            measureGeometry();
          },
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(1, self.progress));
            const currentY = p * totalDistance;

            if (progressLineRef.current) {
              progressLineRef.current.style.height = `${currentY}px`;
            }

            updateActiveStates(currentY);
          },
        });

        const handleResize = () => {
          measureGeometry();
          ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          scrollTriggerInstance.kill();
        };
      };

      if (!('IntersectionObserver' in window) || !sectionRef.current) {
        return initJourney();
      }

      let cleanupFn: (() => void) | void;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            observer.disconnect();
            cleanupFn = initJourney();
          }
        },
        { rootMargin: '350px 0px' }
      );

      observer.observe(sectionRef.current);
      return () => {
        observer.disconnect();
        if (cleanupFn) cleanupFn();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-36 pb-28 sm:pb-36 lg:pb-44 bg-[var(--color-main-bg)] text-[var(--color-main-text)] border-t border-[var(--color-border)]/50 transition-colors duration-250 overflow-hidden"
      aria-label="Academic and Engineering Journey"
    >
      {/* 1. INTERACTIVE DISPLACEMENT DOTTED BACKGROUND */}
      <InteractiveDottedBackground />

      {/* Flowing SVG Wave Lines near Bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none opacity-20 dark:opacity-15 z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C320,90 480,10 720,50 C960,90 1120,20 1440,60 L1440,120 L0,120 Z"
            fill="none"
            stroke="var(--color-primary-accent)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <path
            d="M0,70 C360,20 540,100 800,40 C1060,-10 1200,80 1440,50 L1440,120 L0,120 Z"
            fill="none"
            stroke="var(--color-primary-accent)"
            strokeWidth="0.8"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* TWO-COLUMN BALANCED 35:65 LAYOUT: Left (Intro, Stats & Focus) + Right (Vertical Timeline) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* LEFT COLUMN (~35% width on xl / 5 cols on lg): Introduction, Stats, and Currently Focused On */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start w-full">
            {/* 1. Section Label */}
            <div className="journey-reveal flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="w-7 sm:w-9 h-[1.5px] bg-[var(--portfolio-divider)] opacity-80 inline-block"
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                04 / JOURNEY
              </span>
            </div>

            {/* 2. Main Heading with Balverd Display Accent */}
            <h2 className="journey-reveal text-3xl sm:text-4xl lg:text-[2.65rem] font-normal tracking-tight leading-[1.18] text-[var(--color-main-text)] mb-4 sm:mb-6">
              Academic &amp;{' '}
              <span className="font-balverd tracking-normal text-[var(--color-primary-accent)] uppercase font-normal">
                Engineering Journey
              </span>
            </h2>

            {/* 3. Introduction Paragraph */}
            <p className="journey-reveal text-base sm:text-[17px] text-[var(--color-muted-text)] font-normal leading-relaxed mb-8">
              A chronological timeline of milestones, competitive hackathons, and technical growth — charting from foundational learning to production architectures and future goals.
            </p>

            {/* 4. Achievement Statistics Cards */}
            <div className="journey-reveal w-full flex flex-col gap-3 sm:gap-3.5 mb-8">
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-text)] px-1">
                Academic &amp; Project Snapshot
              </span>

              {ACHIEVEMENT_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative p-3.5 sm:p-4 rounded-xl bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] hover:border-[var(--color-primary-accent)] shadow-xs hover:shadow-xs transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--portfolio-skill-logo-bg)] text-[var(--color-primary-accent)] group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-[var(--color-main-text)]">
                          {stat.label}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[var(--color-muted-text)] font-normal mt-0.5">
                          {stat.subtext}
                        </p>
                      </div>
                    </div>

                    <span className="font-balverd text-2xl sm:text-[1.75rem] text-[var(--color-primary-accent)] font-normal tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 5. Currently Focused On (Integrated into Left Column, Stacked Compact Cards) */}
            <div className="journey-reveal w-full flex flex-col gap-3">
              <div className="flex items-center justify-between px-1 mb-0.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--color-primary-accent)]" aria-hidden="true" />
                  <h3 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--color-main-text)]">
                    Currently Focused On
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[var(--color-primary-accent)] uppercase tracking-wider font-semibold">
                  Active Tracks
                </span>
              </div>

              {FOCUS_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group relative p-3.5 sm:p-4 rounded-xl bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] hover:border-[var(--color-primary-accent)] hover:shadow-xs transition-all duration-200 flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center bg-[var(--portfolio-skill-logo-bg)] text-[var(--color-primary-accent)] group-hover:scale-105 transition-transform duration-200 mt-0.5">
                      <Icon className="w-4 h-4 stroke-[1.8]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-[13px] sm:text-sm font-semibold text-[var(--color-main-text)] group-hover:text-[var(--color-primary-accent)] transition-colors tracking-tight">
                          {item.title}
                        </h4>
                        <span className="text-[10px] font-mono font-medium text-[var(--color-muted-text)] shrink-0">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[var(--color-muted-text)] leading-[1.55]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (~65% width on xl / 7 cols on lg): Clean Vertical Milestone Timeline */}
          <div className="lg:col-span-7 xl:col-span-8 relative w-full">
            <div
              ref={timelineRef}
              className="relative flex flex-col gap-6 sm:gap-7 w-full"
            >
              {/* 1. Continuous Vertical Timeline Spine (Inactive Background Track) */}
              <div
                ref={spineTrackRef}
                className="absolute left-[22px] -translate-x-1/2 w-[1.5px] bg-[var(--color-primary-accent)]/25 dark:bg-[var(--color-primary-accent)]/30"
                style={{ top: '22px' }}
                aria-hidden="true"
              />

              {/* 2. Active Completed Progress Spine (Filled as user scrolls) */}
              <div
                ref={progressLineRef}
                className="absolute left-[22px] -translate-x-1/2 w-[2px] bg-[var(--color-primary-accent)] shadow-[0_0_8px_var(--color-glow)] origin-top will-change-transform"
                style={{ top: '22px', height: '0px' }}
                aria-hidden="true"
              />

              {/* 3. Chronological Milestone Rows (Direct Node Highlighting, No Extra Circle) */}
              {MILESTONES.map((milestone, idx) => {
                const Icon = milestone.icon;
                const isFuture = Boolean(milestone.isFuture);

                return (
                  <div
                    key={`${milestone.year}-${milestone.title}`}
                    ref={(el) => {
                      rowRefs.current[idx] = el;
                    }}
                    className="journey-reveal relative flex items-start gap-4 sm:gap-5 group w-full"
                  >
                    {/* Circular Milestone Node — Clear contrast hierarchy */}
                    <div className="relative z-10 shrink-0">
                      <div
                        ref={(el) => {
                          nodeRefs.current[idx] = el;
                        }}
                        data-state={idx === 0 ? 'active' : 'upcoming'}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border
                          data-[state=active]:bg-[var(--color-primary-accent)]
                          data-[state=active]:text-[var(--color-btn-text)]
                          data-[state=active]:border-[var(--color-primary-accent)]
                          data-[state=active]:shadow-[0_0_18px_var(--color-glow)]
                          data-[state=active]:scale-105

                          data-[state=passed]:bg-[var(--portfolio-skill-logo-bg)]
                          data-[state=passed]:text-[var(--color-primary-accent)]
                          data-[state=passed]:border-[var(--color-primary-accent)]/80

                          data-[state=upcoming]:bg-[var(--portfolio-skill-card-bg)]
                          data-[state=upcoming]:text-[var(--color-main-text)]/85
                          data-[state=upcoming]:border-[var(--color-border)]/60`}
                      >
                        <Icon className="w-5 h-5 stroke-[1.9]" />
                      </div>
                    </div>

                    {/* Milestone Card — Enhanced typography line-height and comfortable reading width */}
                    <div
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      data-state={idx === 0 ? 'active' : 'upcoming'}
                      className="flex-1 w-full rounded-2xl p-5 sm:p-6 transition-all duration-300 border bg-[var(--portfolio-skill-card-bg)] border-[var(--portfolio-skill-card-border)] hover:border-[var(--portfolio-skill-card-border-hover)] hover:-translate-y-0.5 data-[state=active]:border-[var(--color-primary-accent)]/60 data-[state=active]:shadow-md"
                    >
                      {/* Top Header Row: Category Badge & Year Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span
                          className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isFuture
                              ? 'bg-[var(--color-primary-accent)]/15 text-[var(--color-primary-accent)] font-bold border-[var(--color-primary-accent)]/35'
                              : 'bg-[var(--portfolio-skill-logo-bg)] text-[var(--color-primary-accent)] border-[var(--portfolio-skill-card-border)]'
                          }`}
                        >
                          {milestone.category}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-semibold text-[var(--color-primary-accent)]">
                          <Calendar className="w-3.5 h-3.5 opacity-90" aria-hidden="true" />
                          <span>{milestone.year}</span>
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h3 className="text-base sm:text-lg font-semibold text-[var(--color-main-text)] tracking-tight group-hover:text-[var(--color-primary-accent)] transition-colors">
                        {milestone.title}
                      </h3>

                      {/* Organization / Context */}
                      <p className="text-xs sm:text-sm font-medium text-[var(--color-primary-accent)] mt-0.5">
                        {milestone.organization}
                      </p>

                      {/* Narrative Description: +1px sizing and optimal editorial line-height */}
                      <p className="text-[13.5px] sm:text-[15px] lg:text-[15.5px] text-[var(--color-muted-text)] font-normal leading-[1.68] mt-2.5 max-w-3xl">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
