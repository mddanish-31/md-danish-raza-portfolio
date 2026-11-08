# MD Danish Raza — Personal Portfolio

Premium anime-style personal developer portfolio of MD Danish Raza — Computer Science Engineering student, full-stack developer, and creative engineer. Built with Next.js, React, TypeScript, and Tailwind CSS, featuring GSAP animations, smooth scrolling via Lenis, a theme system, an interactive project showcase, and a Resend-powered contact form.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=flat-square&logo=greensock)](https://gsap.com)
[![License: UNLICENSED](https://img.shields.io/badge/License-UNLICENSED-ff0000?style=flat-square)]()

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Build & Deployment](#build--deployment)
- [Design & Development](#design--development)
- [Routes](#routes)
- [Author](#author)
- [License](#license)

## About the Project

This is the personal portfolio of **MD Danish Raza**, a Computer Science Engineering student at Adamas University. The site presents a curated view of his engineering journey, technical toolkit, selected projects, and contact information.

### Design Philosophy

The portfolio uses a deliberate editorial aesthetic with a teal-and-navy primary accent palette, a light/dark theme system, custom typography (Alter Creed, Balverd, and Rasley Heights), and motion-driven interactions powered by GSAP and Lenis. Animations respect `prefers-reduced-motion`, and all scroll-triggered effects are gated behind IntersectionObserver so offscreen content stays idle.

## Features

Verified and implemented in source code:

- **Responsive design** — mobile-first layouts with desktop enhancements across all sections.
- **Light/dark theme toggle** — persisted to `localStorage` (`danish_portfolio_theme`), with system-preference fallback.
- **Smooth scrolling** — Lenis-driven smooth scroll synchronized with GSAP ScrollTrigger; disabled when `prefers-reduced-motion` is set.
- **GSAP animations** — entrance reveals, scroll-synchronized timeline progress in the Journey section, floating character animation, and signature reveal in the footer.
- **Project showcase** — category filtering (All Projects, Web Development, Full Stack, IoT / Hardware, Other), progressive "Load More" pagination, and a click-to-preview lightbox with GitHub/live-demo links.
- **Skills section** — 24 technologies across 7 categories (Languages, Frontend, Backend, Database, Tools & Platforms, Web Animation, CS Fundamentals) with category filtering and a "Currently Exploring" panel.
- **Journey timeline** — chronological milestones (education, hackathons, projects, future goals) with a scroll-synced progress spine and active/passed state tracking.
- **Interactive map** — Leaflet map of the Science City area, Kolkata, loaded deferentially via IntersectionObserver.
- **Contact form** — Resend-powered email delivery with client-side validation, honeypot anti-spam, per-IP rate limiting (5 requests per 10 minutes), and success/error states.
- **Accessibility** — ARIA labels, role attributes, focus-visible outlines, keyboard-navigable cards and lightbox, Escape-to-close modal, and reduced-motion support.

## Technology Stack

Accurate versions from `package.json`.

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 16.4.3 |
| Library | React | 19.3.0 |
| Library | React DOM | 19.3.0 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Animation | GSAP | 3.15.0 |
| Animation | @gsap/react | 2.1.2 |
| Smooth Scroll | Lenis | 1.3.27 |
| Icons | lucide-react | 1.64.0 |
| Maps | Leaflet | 1.9.4 |
| Linting | ESLint | 9 |
| Linting | eslint-config-next | 16.4.3 |

### Tooling & Configuration

- **Turbopack** — configured in `next.config.ts` for CSS handling via `@tailwindcss/turbopack`.
- **Images** — AVIF and WebP formats enabled.
- **Fonts** — Geist and Geist Mono (via `next/font/google`); Alter Creed, Balverd, and Rasley Heights (local fonts via `next/font/local`).
- **API** — Next.js Route Handler at `/api/contact` using native `fetch` to call the Resend REST API (no extra email SDK installed).

## Project Structure

Generated folders (`node_modules`, `.next`) are excluded.

```
portfolio-2.0/
├── public/
│   ├── fonts/
│   │   ├── AlterCreed.otf
│   │   ├── Balverd.ttf
│   │   └── RasleyHeights.otf
│   └── images/
│       ├── danish-anime.png
│       ├── danish-portrait.webp
│       ├── about-red-suit.webp
│       └── projects/
│           ├── ern-cover.webp
│           ├── ern-preview.svg
│           ├── hall-of-fame-cover.webp
│           ├── hall-of-fame-preview.svg
│           ├── saathi-cover.webp
│           └── saathi-preview.svg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Landing page (HeroSection)
│   │   ├── portfolio/
│   │   │   └── page.tsx             # /portfolio — full showcase
│   │   ├── coming-soon/
│   │   │   └── page.tsx             # /coming-soon
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts         # POST — Resend contact form
│   ├── components/
│   │   ├── AboutSection.tsx
│   │   ├── AnimeCharacter.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ExploreButton.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── InnerHeroSection.tsx
│   │   ├── InnerNavbar.tsx
│   │   ├── JourneySection.tsx
│   │   ├── KolkataMap.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectLightbox.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── SignatureFooter.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── TechLogos.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   └── data/
│       └── projectsData.ts          # PROJECTS_DATA + PROJECT_CATEGORIES
├── .env.example
├── .gitignore
├── AGENTS.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Important Directories

- `src/app/` — Next.js App Router pages, layout, global styles, and API routes.
- `src/components/` — Client UI components for every portfolio section.
- `src/data/` — Static project data (`projectsData.ts`) driving the showcase.
- `public/fonts/` — Local font files (Alter Creed, Balverd, Rasley Heights).
- `public/images/` — Optimized images (WebP, PNG, SVG) for hero, about, and project cards.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm, yarn, pnpm, or bun

### Clone the Repository

```bash
git clone https://github.com/mddanish-31/portfolio-2.0.git
cd portfolio-2.0
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Never commit `.env.local`. It is gitignored.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The landing page loads at `/`; the full portfolio showcase is at `/portfolio`.

## Environment Variables

Reference `.env.example`. Do not expose real API keys, tokens, or credentials. Do not include `.env.local` in version control.

| Variable | Purpose | Example |
|----------|---------|---------|
| `RESEND_API_KEY` | Resend API key for sending contact-form emails | `re_1234567890abcdef` |
| `CONTACT_EMAIL` | Destination inbox address for form submissions | `you@example.com` |
| `RESEND_FROM_EMAIL` | Sender address used by Resend | `onboarding@resend.dev` |

The contact API (`/api/contact`) returns a `503` if `RESEND_API_KEY` or `CONTACT_EMAIL` is not configured, so the form gracefully degrades until these are set.

## Available Scripts

From `package.json`:

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start the Turbopack development server |
| `build` | `next build` | Create a production build |
| `start` | `next start` | Start the production server |
| `lint` | `eslint .` | Run ESLint across the project |

## Build & Deployment

### Production Build

```bash
npm run build
```

The build uses Turbopack (configured in `next.config.ts`) and outputs to `.next`. Images are optimized with AVIF/WebP support.

### Start Production Server

```bash
npm run start
```

### Vercel Deployment

This is a standard Next.js application and deploys directly to [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables from `.env.example` in the Vercel project settings.
4. Deploy. Vercel detects Next.js automatically and configures the build settings.

No custom build command or output directory override is required; the default Next.js Vercel integration applies.

## Design & Development

### Design System

Design tokens are defined in `src/app/globals.css` as CSS custom variables, with light and dark overrides under `html.dark`. The palette centers on a teal primary accent (`#07566A` light / `#A8D5D8` dark), with neutral backgrounds, text, and border variants. Tailwind's `@custom-variant dark` enables class-based dark-mode styling.

Typography:
- **Alter Creed** — gothic/blackletter watermark typography on the hero.
- **Balverd** — vintage editorial display for headings and wordmarks.
- **Rasley Heights** — signature script used in the footer wordmark.
- **Geist / Geist Mono** — system UI and monospace text via `next/font/google`.

### Animation Approach

- **GSAP** (`gsap` + `@gsap/react`) handles entrance timelines, scroll-triggered reveals, and the continuous timeline progress in the Journey section.
- **Lenis** provides smooth scrolling, synchronized with `ScrollTrigger.update` on each scroll event.
- `prefers-reduced-motion` is respected throughout: animations are skipped or set to instant when the user requests reduced motion.
- All scroll-based animation is initialized inside `IntersectionObserver` callbacks so offscreen sections do not run animation logic until they enter the viewport.

## Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Landing page with hero, anime character, and explore CTA |
| `/portfolio` | `src/app/portfolio/page.tsx` | Full portfolio: About, Skills, Projects, Journey, Contact |
| `/coming-soon` | `src/app/coming-soon/page.tsx` | Coming-soon placeholder page |
| `/api/contact` | `src/app/api/contact/route.ts` | POST contact form handler (Resend) |

## Author

**MD Danish Raza**

- GitHub: [https://github.com/mddanish-31](https://github.com/mddanish-31)
- LinkedIn: [https://www.linkedin.com/in/md-danish-raza31](https://www.linkedin.com/in/md-danish-raza31)
- Email: mddanishrazapro@gmail.com

## License

No LICENSE file exists in this repository. The project is private (`"private": true` in `package.json`) and all rights are reserved by the author.

© 2026 MD Danish Raza. All rights reserved.