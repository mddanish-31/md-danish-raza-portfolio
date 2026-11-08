'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { SignatureFooter } from './SignatureFooter';

const KolkataMap = dynamic(
  () => import('./KolkataMap').then((mod) => mod.KolkataMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-[310px] sm:h-[350px] lg:h-[390px] rounded-2xl bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] flex items-center justify-center animate-pulse"
        aria-label="Loading interactive map of Kolkata, India..."
      >
        <div className="flex items-center gap-2.5 text-xs font-mono text-[var(--color-muted-text)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary-accent)] animate-ping" />
          <span>Loading Interactive Map...</span>
        </div>
      </div>
    ),
  }
);

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function GithubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
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
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export function ContactSection({ currentYear = 2026 }: { currentYear?: number | string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !('IntersectionObserver' in window);
  });

  useEffect(() => {
    if (shouldLoadMap) return;
    const el = mapContainerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          setShouldLoadMap(true);
        }
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      const initAnimations = () => {
        gsap.fromTo(
          '.contact-card-reveal',
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
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

        gsap.fromTo(
          '.contact-content-reveal',
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#contact-body-grid',
              start: 'top 92%',
              once: true,
            },
            clearProps: 'opacity,transform',
          }
        );

        gsap.fromTo(
          '#contact-map-section',
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#contact-map-section',
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || 'Failed to deliver message. Please try again later.'
        );
      }

      // Success: clear form fields only upon verified delivery
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to deliver message at this time. Please reach out directly.'
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 bg-[var(--color-main-bg)] text-[var(--color-main-text)] border-t border-[var(--color-border)]/50 transition-colors duration-250 overflow-hidden"
      aria-label="Contact Section"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* =========================================================================
            PART A: THREE CONTACT INFORMATION CARDS AT THE TOP
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {/* Card 1: Email (Subtly Highlighted Card) */}
          <a
            href="mailto:mddanishrazapro@gmail.com"
            className="contact-card-reveal group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-[var(--color-secondary-bg)]/60 dark:bg-[var(--color-secondary-bg)]/40 border border-[var(--color-primary-accent)]/50 dark:border-[var(--color-primary-accent)]/40 hover:border-[var(--color-primary-accent)] text-[var(--color-main-text)] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)]"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] shadow-xs">
                  <Mail className="w-[18px] h-[18px] stroke-[2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-primary-accent)] block">
                    Email
                  </span>
                  <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--color-main-text)] group-hover:text-[var(--color-primary-accent)] transition-colors truncate">
                    mddanishrazapro@gmail.com
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[var(--color-muted-text)] font-normal leading-relaxed mb-4">
                For project inquiries, collaboration and professional opportunities.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--color-primary-accent)]/20 flex items-center justify-between text-xs sm:text-[13px] font-medium text-[var(--color-primary-accent)]">
              <span>Send an Email</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* Card 2: GitHub (Secondary Card) */}
          <a
            href="https://github.com/mddanish-31"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-reveal group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] hover:border-[var(--color-primary-accent)]/60 text-[var(--color-main-text)] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)]"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] text-[var(--color-primary-accent)] group-hover:border-[var(--color-primary-accent)]/40 transition-colors">
                  <GithubIcon className="w-[18px] h-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-text)] block">
                    GitHub
                  </span>
                  <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--color-main-text)] group-hover:text-[var(--color-primary-accent)] transition-colors truncate">
                    github.com/mddanish-31
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[var(--color-muted-text)] font-normal leading-relaxed mb-4">
                Explore my projects, code and engineering experiments.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--color-border)]/35 flex items-center justify-between text-xs sm:text-[13px] font-medium text-[var(--color-primary-accent)]">
              <span>Explore GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* Card 3: LinkedIn (Secondary Card) */}
          <a
            href="https://www.linkedin.com/in/md-danish-raza31"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card-reveal group relative flex flex-col justify-between rounded-2xl p-5 sm:p-6 bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] hover:border-[var(--color-primary-accent)]/60 text-[var(--color-main-text)] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)]"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] text-[var(--color-primary-accent)] group-hover:border-[var(--color-primary-accent)]/40 transition-colors">
                  <LinkedinIcon className="w-[18px] h-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-text)] block">
                    LinkedIn
                  </span>
                  <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--color-main-text)] group-hover:text-[var(--color-primary-accent)] transition-colors truncate">
                    www.linkedin.com/in/md-danish-raza31
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[var(--color-muted-text)] font-normal leading-relaxed mb-4">
                Connect with me for professional networking and opportunities.
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--color-border)]/35 flex items-center justify-between text-xs sm:text-[13px] font-medium text-[var(--color-primary-accent)]">
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        </div>

        {/* =========================================================================
            PART B: TWO-COLUMN LOWER CONTACT AREA (45% Left : 55% Right Desktop Split)
            ========================================================================= */}
        <div id="contact-body-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* LEFT COLUMN (~45% / 5 cols): Cohesive Editorial Developer Introduction */}
          <div className="lg:col-span-5 flex flex-col items-start w-full">
            {/* Eyebrow Label */}
            <div className="contact-content-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] mb-4 sm:mb-5">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                LET&apos;S CONNECT
              </span>
            </div>

            {/* Headline with Balverd Typography & Secondary Display Line */}
            <div className="contact-content-reveal mb-4 sm:mb-5">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-normal tracking-tight leading-[1.14] text-[var(--color-main-text)]">
                Ideas deserve to be{' '}
                <span className="font-balverd text-[var(--color-primary-accent)] font-normal">
                  built.
                </span>
              </h2>
              <p className="font-balverd text-xl sm:text-2xl lg:text-[1.65rem] text-[var(--color-muted-text)] font-normal mt-1 sm:mt-1.5 tracking-tight">
                Let&apos;s make yours real.
              </p>
            </div>

            {/* Supporting Introduction */}
            <p className="contact-content-reveal text-sm sm:text-base text-[var(--color-muted-text)] font-normal leading-relaxed mb-7 sm:mb-8">
              I enjoy turning complex problems into thoughtful digital experiences. From engineering reliable applications to exploring creative ideas, I&apos;m always interested in building something meaningful.
            </p>

            {/* Cohesive Editorial Identity Panel: Availability */}
            <div className="contact-content-reveal w-full rounded-2xl bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] p-5 sm:p-6 shadow-xs">
              {/* 01 / AVAILABILITY STATUS */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span className="text-[10px] font-mono font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                    01 / AVAILABILITY STATUS
                  </span>
                  {/* Subtle technical status indicator */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-semibold tracking-wider uppercase shrink-0">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span>OPEN TO COLLABORATION</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-[var(--color-main-text)] tracking-tight">
                  Building what&apos;s next.
                </h3>
                <p className="text-xs sm:text-[13px] text-[var(--color-muted-text)] leading-relaxed mt-1">
                  Interested in meaningful software projects, engineering opportunities and creative collaborations.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (~55% / 7 cols): Refined Contact Form (Reference Composition) */}
          <div className="contact-content-reveal lg:col-span-7 w-full">
            <div className="rounded-3xl p-6 sm:p-8 lg:p-10 bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] shadow-xl relative">
              {/* Header inside form card */}
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] mb-3">
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                    CONTACT US
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--color-main-text)] tracking-tight">
                  Get In Touch
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-muted-text)] mt-1.5 leading-relaxed">
                  Fill out the form below and your message will be routed directly to my personal inbox via Resend.
                </p>
              </div>

              {/* Status Notifications */}
              {status === 'success' && (
                <div
                  className="mb-6 p-4 sm:p-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-3.5 text-teal-300 animate-in fade-in duration-300"
                  role="alert"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-primary-accent)]" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-[var(--color-main-text)]">
                      Message Delivered Successfully!
                    </p>
                    <p className="text-[var(--color-muted-text)] mt-1 leading-relaxed">
                      Thank you for reaching out. Your inquiry has been securely dispatched and I will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div
                  className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 text-amber-200 animate-in fade-in duration-300"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-amber-200">
                      Message Delivery Notice
                    </p>
                    <p className="text-amber-300/80 mt-1 leading-relaxed">
                      {errorMessage || 'Unable to deliver message at this time. Please reach out via mddanishrazapro@gmail.com.'}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Honeypot Anti-Spam Field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                {/* Full Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold text-[var(--color-main-text)] tracking-wider"
                    >
                      Full Name <span className="text-[var(--color-primary-accent)]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      maxLength={100}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      placeholder="Jane Doe"
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] text-[var(--color-main-text)] placeholder:text-[var(--color-muted-text)] placeholder:opacity-80 dark:placeholder:opacity-75 text-sm transition-all duration-200 focus:outline-none focus:border-[var(--color-primary-accent)] focus:ring-1 focus:ring-[var(--color-primary-accent)] disabled:opacity-60"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold text-[var(--color-main-text)] tracking-wider"
                    >
                      Email Address <span className="text-[var(--color-primary-accent)]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'loading'}
                      placeholder="jane@company.com"
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] text-[var(--color-main-text)] placeholder:text-[var(--color-muted-text)] placeholder:opacity-80 dark:placeholder:opacity-75 text-sm transition-all duration-200 focus:outline-none focus:border-[var(--color-primary-accent)] focus:ring-1 focus:ring-[var(--color-primary-accent)] disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-semibold text-[var(--color-main-text)] tracking-wider"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    maxLength={200}
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    placeholder="Engineering Collaboration / Project Discussion"
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] text-[var(--color-main-text)] placeholder:text-[var(--color-muted-text)] placeholder:opacity-80 dark:placeholder:opacity-75 text-sm transition-all duration-200 focus:outline-none focus:border-[var(--color-primary-accent)] focus:ring-1 focus:ring-[var(--color-primary-accent)] disabled:opacity-60"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold text-[var(--color-main-text)] tracking-wider"
                  >
                    Message <span className="text-[var(--color-primary-accent)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    minLength={10}
                    maxLength={5000}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    placeholder="Tell me about your project, timeline, or whatever is on your mind..."
                    className="w-full px-4 sm:px-5 py-3.5 rounded-2xl bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] text-[var(--color-main-text)] placeholder:text-[var(--color-muted-text)] placeholder:opacity-80 dark:placeholder:opacity-75 text-sm transition-all duration-200 focus:outline-none focus:border-[var(--color-primary-accent)] focus:ring-1 focus:ring-[var(--color-primary-accent)] resize-y min-h-[110px] disabled:opacity-60"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-xs sm:text-sm tracking-[0.04em] bg-[var(--color-primary-accent)] text-[var(--color-btn-text)] hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-main-bg)] w-full sm:w-auto"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART C: FULL-WIDTH INTERACTIVE LOCATION EXPERIENCE (Kolkata Map)
            ========================================================================= */}
        <div
          ref={mapContainerRef}
          id="contact-map-section"
          className="w-full mt-14 sm:mt-16 lg:mt-20 pt-10 sm:pt-12 border-t border-[var(--color-border)]/40"
        >
          {/* Location Introduction Header */}
          <div className="max-w-2xl mb-6 sm:mb-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--portfolio-skill-logo-bg)] border border-[var(--portfolio-skill-card-border)] mb-3">
              <Compass className="w-3.5 h-3.5 text-[var(--color-primary-accent)]" />
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary-accent)] uppercase">
                FIND MY BASE
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-normal tracking-tight leading-[1.2] text-[var(--color-main-text)] mb-2.5">
              Rooted near{' '}
              <span className="font-balverd text-[var(--color-primary-accent)] font-normal">
                Science City.
              </span>{' '}
              Connected to the world.
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[var(--color-muted-text)] font-normal leading-relaxed">
              Based in Kolkata, India, I&apos;m open to collaborating with people and teams across the globe to build meaningful digital experiences.
            </p>
          </div>

          {/* Full-Width Interactive Map (Viewport-deferred to eliminate initial page load overhead) */}
          {shouldLoadMap ? (
            <KolkataMap />
          ) : (
            <div
              className="w-full h-[310px] sm:h-[350px] lg:h-[390px] rounded-2xl bg-[var(--portfolio-skill-card-bg)] border border-[var(--portfolio-skill-card-border)] flex items-center justify-center animate-pulse"
              aria-label="Loading interactive map of Kolkata, India..."
            >
              <div className="flex items-center gap-2.5 text-xs font-mono text-[var(--color-muted-text)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary-accent)] animate-ping" />
                <span>Loading Interactive Map...</span>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            PART D: SIGNATURE IDENTITY FOOTER
            ========================================================================= */}
        <SignatureFooter currentYear={currentYear} />
      </div>
    </section>
  );
}
