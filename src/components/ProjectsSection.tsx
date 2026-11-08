'use client';

import React, { useState, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';
import {
  PROJECTS_DATA,
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type Project,
} from '@/data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectLightbox } from './ProjectLightbox';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PAGE_SIZE = 3;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Projects');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [selectedLightboxProject, setSelectedLightboxProject] = useState<Project | null>(null);
  const triggerElRef = useRef<HTMLElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleOpenPreview = (project: Project, triggerEl?: HTMLElement) => {
    triggerElRef.current = triggerEl || null;
    setSelectedLightboxProject(project);
  };

  const handleClosePreview = () => {
    setSelectedLightboxProject(null);
  };

  // Filter projects by active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Projects') {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Projects': PROJECTS_DATA.length,
    };
    PROJECT_CATEGORIES.forEach((cat) => {
      if (cat !== 'All Projects') {
        counts[cat] = PROJECTS_DATA.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Only display categories that contain active projects (hide count = 0)
  const availableCategories = useMemo(() => {
    return PROJECT_CATEGORIES.filter((cat) => (categoryCounts[cat] || 0) > 0);
  }, [categoryCounts]);

  // Determine if more projects can be loaded
  const hasMore = filteredProjects.length > visibleCount;
  const displayedProjects = filteredProjects.slice(0, visibleCount);

  // Handle category switch
  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  // Handle Load More
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  // Coordinated GSAP Scroll Entrance
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      const initAnimations = () => {
        const elements = sectionRef.current?.querySelectorAll('.projects-reveal');
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
      id="projects"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[var(--color-main-bg)] text-[var(--color-main-text)] border-t border-[var(--color-border)]/50 transition-colors duration-250 overflow-hidden"
      aria-label="Featured Engineering Projects"
    >
      {/* Subtle warm ambient glow in background */}
      <div
        className="absolute top-1/4 left-10 w-[600px] h-[600px] pointer-events-none opacity-15 dark:opacity-10 -translate-x-1/3"
        style={{
          background:
            'radial-gradient(circle, var(--portfolio-radial-glow) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* 1. EDITORIAL SECTION HEADER */}
        <div className="projects-reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="w-7 sm:w-9 h-[1.5px] bg-[var(--portfolio-divider)] opacity-80 inline-block"
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                03 / PROJECTS
              </span>
            </div>

            {/* Main Heading with Balverd Accent */}
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-normal tracking-tight leading-[1.18] text-[var(--color-main-text)] mb-4">
              Selected{' '}
              <span className="font-balverd tracking-normal text-[var(--color-primary-accent)] uppercase font-normal">
                Works
              </span>
            </h2>

            {/* Supporting Description */}
            <p className="text-base sm:text-[17px] text-[var(--portfolio-project-muted)] font-normal leading-relaxed">
              A curated selection of engineering projects, platforms, and
              interactive systems built with precision, intentional architecture,
              and purposeful design.
            </p>
          </div>

          {/* Quick Stats Indicator */}
          <div className="flex items-center pt-2 lg:pt-0 border-t lg:border-t-0 border-[var(--portfolio-project-card-border)]">
            <div className="flex flex-col">
              <span className="font-balverd text-2xl sm:text-3xl text-[var(--color-primary-accent)] leading-none">
                {PROJECTS_DATA.length < 10 ? `0${PROJECTS_DATA.length}` : PROJECTS_DATA.length}
              </span>
              <span className="text-xs text-[var(--portfolio-project-muted)] uppercase tracking-wider mt-1 font-medium">
                Selected Projects
              </span>
            </div>
          </div>
        </div>

        {/* 2. CATEGORY FILTERS */}
        <div className="projects-reveal mb-12 sm:mb-14">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 lg:overflow-visible no-scrollbar">
            {availableCategories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  type="button"
                  className={`whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] ${
                    isActive
                      ? 'bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] font-semibold shadow-sm'
                      : 'bg-[var(--portfolio-project-card-bg)] text-[var(--portfolio-project-muted)] hover:text-[var(--color-main-text)] border border-[var(--portfolio-project-card-border)] hover:border-[var(--color-primary-accent)]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-[var(--color-btn-text)]/15 text-[var(--color-btn-text)] font-bold'
                        : 'bg-[var(--color-main-bg)]/80 text-[var(--portfolio-project-muted)]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. RESPONSIVE PROJECT CARDS GRID */}
        {displayedProjects.length > 0 ? (
          <div className="projects-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenPreview={handleOpenPreview}
              />
            ))}
          </div>
        ) : (
          /* Empty state for categories with 0 projects currently */
          <div className="projects-reveal py-16 px-6 rounded-3xl border border-dashed border-[var(--portfolio-project-card-border)] text-center bg-[var(--portfolio-project-card-bg)]/50">
            <p className="text-sm sm:text-base text-[var(--portfolio-project-muted)]">
              No projects in the{' '}
              <span className="font-semibold text-[var(--color-main-text)]">
                {activeCategory}
              </span>{' '}
              category yet.
            </p>
            <button
              onClick={() => handleCategoryChange('All Projects')}
              className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer"
            >
              View All Projects
            </button>
          </div>
        )}

        {/* 4. PROGRESSIVE "LOAD MORE" CONTROL (Hides if all projects are visible) */}
        {hasMore && (
          <div className="projects-reveal mt-14 sm:mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              type="button"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border border-[var(--portfolio-project-card-border)] bg-[var(--portfolio-project-card-bg)] text-[var(--color-main-text)] hover:border-[var(--color-primary-accent)] hover:text-[var(--color-primary-accent)] transition-all duration-200 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)]"
              aria-label="Load more projects"
            >
              <span>Load More Projects</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* 5. PREMIUM CLICK-TO-PREVIEW LIGHTBOX */}
      <ProjectLightbox
        project={selectedLightboxProject}
        isOpen={selectedLightboxProject !== null}
        onClose={handleClosePreview}
        triggerRef={triggerElRef}
      />
    </section>
  );
}

