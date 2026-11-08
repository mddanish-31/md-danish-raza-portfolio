'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ExternalLink, ArrowUpRight, Maximize2 } from 'lucide-react';
import { GithubLogo } from './TechLogos';
import type { Project } from '@/data/projectsData';

interface ProjectCardProps {
  project: Project;
  onOpenPreview?: (project: Project, triggerEl?: HTMLElement) => void;
}

export function ProjectCard({ project, onOpenPreview }: ProjectCardProps) {
  const hasLinks = Boolean(project.githubUrl || project.liveDemoUrl);

  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onOpenPreview?.(project, e.currentTarget);
  };

  const handlePreviewKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenPreview?.(project, e.currentTarget);
    }
  };

  return (
    <article
      tabIndex={0}
      aria-label={`${project.title} — ${project.status}`}
      className={`project-card group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-[var(--portfolio-project-card-bg)] border border-[var(--portfolio-project-card-border)] hover:border-[var(--portfolio-project-card-border-hover)] focus-visible:outline-none ${
        project.featured
          ? 'ring-1 ring-[var(--color-primary-accent)]/25'
          : ''
      }`}
    >
      {/* 1. UPPER PREVIEW IMAGE CONTAINER (Natural 16:9 ratio, object-contain, subtle complement bg) */}
      <div
        role="button"
        tabIndex={0}
        onClick={handlePreviewClick}
        onKeyDown={handlePreviewKeyDown}
        aria-label={`Open large image preview for ${project.title}`}
        className="relative w-full aspect-[16/9] overflow-hidden cursor-zoom-in group/cover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-inset select-none"
        style={{ backgroundColor: project.coverThemeBg || '#07566A' }}
      >
        <Image
          src={project.coverImage || project.previewImage}
          alt={project.coverAlt || `Cover image for ${project.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center transition-transform duration-500 ease-out group-hover/cover:scale-[1.025]"
          loading="lazy"
        />

        {/* Subtle Hover Affordance Pill (Visible only on hover & keyboard focus) */}
        <div
          className="absolute inset-0 bg-[#072630]/35 opacity-0 group-hover/cover:opacity-100 group-focus-visible/cover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-[#123C4B]/90 text-[#F5F7F4] border border-[rgba(168,213,216,0.35)] shadow-lg transform translate-y-1 group-hover/cover:translate-y-0 group-focus-visible/cover:translate-y-0 transition-transform duration-200">
            <Maximize2 className="w-3.5 h-3.5 text-[#A8D5D8]" />
            <span>Click to preview</span>
          </span>
        </div>

        {/* Top-Left: Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 pointer-events-none">
          {project.status === 'Feature Complete · Polish Pending' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-medium backdrop-blur-md bg-[#07566A]/85 border border-[#A8D5D8]/40 text-[#F5F7F4] shadow-sm">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#A8D5D8] animate-pulse"
                aria-hidden="true"
              />
              <span>Feature Complete · Polish Pending</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-medium backdrop-blur-md bg-[#07566A]/85 border border-white/15 text-[#F5F7F4] shadow-sm">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#A8D5D8]"
                aria-hidden="true"
              />
              <span>In Development</span>
            </span>
          )}
        </div>

        {/* Top-Right: Featured Label (if applicable) */}
        {project.featured && (
          <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] shadow-sm">
              <Star className="w-3 h-3 fill-current" aria-hidden="true" />
              <span>Featured</span>
            </span>
          </div>
        )}
      </div>

      {/* Hairline boundary between Image and Info */}
      <div className="w-full h-[1px] bg-[var(--portfolio-project-card-border)] opacity-60" aria-hidden="true" />

      {/* 2. LOWER INFORMATION AREA */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Domain Category Label */}
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary-accent)] mb-2 block">
            {project.category}
          </span>

          {/* Project Title */}
          <h3 className="text-xl sm:text-[1.35rem] font-semibold text-[var(--color-main-text)] tracking-tight leading-snug group-hover:text-[var(--color-primary-accent)] transition-colors mb-2.5">
            {project.title}
          </h3>

          {/* Short Narrative Description with refined readability */}
          <p className="text-[13.5px] sm:text-sm text-[var(--portfolio-project-muted)] leading-[1.62] mb-5 font-normal">
            {project.description}
          </p>

          {/* Technology Stack Chips */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[var(--portfolio-project-tag-bg)] text-[var(--portfolio-project-tag-text)] border border-[var(--portfolio-project-tag-border)] shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3. ACTIONS & EXTERNAL AFFORDANCES */}
        <div className="pt-4 border-t border-[var(--portfolio-project-card-border)] flex items-center justify-between gap-3">
          {hasLinks ? (
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-[var(--portfolio-project-card-border)] bg-[var(--portfolio-project-tag-bg)] text-[var(--color-main-text)] hover:border-[var(--color-primary-accent)] hover:text-[var(--color-primary-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)]"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <GithubLogo className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" aria-hidden="true" />
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] hover:bg-[var(--color-primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)]"
                  aria-label={`Open live demo for ${project.title}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[var(--portfolio-project-muted)] font-medium">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status === 'Feature Complete · Polish Pending'
                    ? 'bg-[#A8D5D8] animate-pulse'
                    : 'bg-[var(--color-primary-accent)]/60'
                }`}
                aria-hidden="true"
              />
              <span>{project.status}</span>
            </div>
          )}

          {/* Subtle card corner external arrow if any link is attached */}
          {hasLinks && (
            <span
              className="text-[var(--portfolio-project-muted)] group-hover:text-[var(--color-primary-accent)] transition-colors text-xs font-mono"
              aria-hidden="true"
            >
              ↗
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
