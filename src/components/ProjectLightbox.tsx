'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubLogo } from './TechLogos';
import type { Project } from '@/data/projectsData';

interface ProjectLightboxProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function ProjectLightbox({
  project,
  isOpen,
  onClose,
  triggerRef,
}: ProjectLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scrolling while open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const triggerEl = triggerRef?.current;

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      if (triggerEl) {
        triggerEl.focus();
      }
    };
  }, [isOpen, triggerRef]);

  // Handle Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Simple focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Project Preview — ${project.title}`}
    >
      {/* 1. Dark Translucent Overlay with Tasteful Blur (Underlying page faintly recognizable) */}
      <div
        className="absolute inset-0 bg-[#072630]/85 backdrop-blur-[12px] transition-opacity cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. Prominent Close (X) Button */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close project preview"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-[#123C4B]/90 hover:bg-[#164B5B] text-[#F5F7F4] hover:text-[#A8D5D8] border border-[rgba(168,213,216,0.3)] shadow-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8D5D8] cursor-pointer"
      >
        <X className="w-5 h-5 stroke-[2.2]" />
      </button>

      {/* 3. Centered Lightbox Modal Container */}
      <div
        className="relative z-20 flex flex-col items-center w-full max-w-[min(90vw,1400px)] max-h-[85vh] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Responsive Image Frame with Natural 16:9 Aspect Ratio and Object Contain */}
        <div
          className="relative w-full aspect-[16/9] max-h-[74vh] sm:max-h-[77vh] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-[rgba(168,213,216,0.22)]"
          style={{ backgroundColor: project.coverThemeBg || '#07566A' }}
        >
          <Image
            src={project.coverImage || project.previewImage}
            alt={project.coverAlt || `Full cover image for ${project.title}`}
            fill
            sizes="90vw"
            priority
            className="object-contain object-center"
          />
        </div>

        {/* Caption & Action Bar */}
        <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-between gap-3 w-full px-2">
          {/* Left: Project Title & Category */}
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-sm sm:text-base text-[#F5F7F4] tracking-wide">
              {project.title}
            </span>
            <span className="text-[rgba(168,213,216,0.5)]">•</span>
            <span className="text-xs sm:text-sm text-[#C5D7D8] font-medium hidden sm:inline">
              {project.category}
            </span>
          </div>

          {/* Right: Direct Actions & Keyboard Hint */}
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#123C4B]/90 hover:bg-[#164B5B] text-[#F5F7F4] hover:text-[#A8D5D8] border border-[rgba(168,213,216,0.25)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8D5D8]"
                aria-label={`View ${project.title} GitHub repository`}
              >
                <GithubLogo className="w-3.5 h-3.5" />
                <span>Repository</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#A8D5D8] text-[#123C4B] hover:bg-[#C1E6E8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123C4B]"
                aria-label={`Open live demo for ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}

            <span className="text-[11px] text-[#C5D7D8]/60 hidden md:inline ml-1 font-sans">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#F5F7F4] font-mono text-[10px]">Esc</kbd> or click outside to close
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
