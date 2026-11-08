import React from 'react';

type LogoProps = {
  className?: string;
};

export function CLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M116.8 98.4c-11.4 17.6-30.8 26.6-53.1 26.6-35.6 0-63.7-28-63.7-64s28-64 63.7-64c22.8 0 42 9.4 53.4 27.4l-20.9 14.8C89.4 27 77.2 20.8 63.7 20.8c-23.7 0-41.9 19.3-41.9 43.2s18.2 43.2 41.9 43.2c13.8 0 26.3-6.4 33.1-18.7l20 9.9z"
        fill="#A8B9CC"
      />
    </svg>
  );
}

export function CppLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M116.8 98.4c-11.4 17.6-30.8 26.6-53.1 26.6-35.6 0-63.7-28-63.7-64s28-64 63.7-64c22.8 0 42 9.4 53.4 27.4l-20.9 14.8C89.4 27 77.2 20.8 63.7 20.8c-23.7 0-41.9 19.3-41.9 43.2s18.2 43.2 41.9 43.2c13.8 0 26.3-6.4 33.1-18.7l20 9.9z"
        fill="#00599C"
      />
      <path d="M89 57h6v-6h5v6h6v5h-6v6h-5v-6h-6v-5zm22 0h6v-6h5v6h6v5h-6v6h-5v-6h-6v-5z" fill="#004482" />
    </svg>
  );
}

export function PythonLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        d="M63.2 2c-15.7 0-25 6.9-25 19.4v14.4h25.4v3.6H28.4C12.7 39.4 0 50.4 0 66.1s12.5 25.8 28.4 25.8h7.4v-11.1c0-12.7 10.9-23.9 23.6-23.9h25.4V36.7C84.8 17.8 75.1 2 63.2 2zM46.7 13.9c3.9 0 7.1 3.2 7.1 7.1s-3.2 7.1-7.1 7.1-7.1-3.2-7.1-7.1 3.2-7.1 7.1-7.1z"
        fill="#3776AB"
      />
      <path
        d="M64.8 126c15.7 0 25-6.9 25-19.4v-14.4H64.4v-3.6h35.2c15.7 0 28.4-11 28.4-26.7s-12.5-25.8-28.4-25.8h-7.4v11.1c0 12.7-10.9 23.9-23.6 23.9H43.2v20.2c0 18.9 9.7 34.7 21.6 34.7zm16.5-11.9c-3.9 0-7.1-3.2-7.1-7.1s3.2-7.1 7.1-7.1 7.1 3.2 7.1 7.1c0 4-3.2 7.1-7.1 7.1z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function JavaLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M48.8 91.5s-6.2 3.8 4.4 5.1c13 1.6 19.6 1.4 34.3-.8 0 0 4.1 2.5 9.7 4.6-23.6 9.7-58.4 2.1-48.4-8.9zm-4.7-18.7s-6.7 4.9 3.6 6c12.5 1.4 23.7 1.6 42.4-1.2 0 0 3.2 2.8 7.3 4.3-26.5 7.6-64 3.7-53.3-9.1zm31.7-27.4c6.3 7.2-1.7 14.1-1.7 14.1s16.1-8.3 8.7-18.7c-7-9.9-12.3-14.8 16.5-30.8 0 0-33.7 9.8-23.5 35.4zm18.3 64c-14.8 8.4-44.5 4.5-56.1-.8-4.2-1.9 4.4-4.5 7.3-4.8 11.2-1.1 17.7.9 35.7-.3 15.6-1.1 19.1-5.1 19.1-5.1 7.8 7.3-6 11-6 11zm1.2-36.9c16.3-19.1-8.6-29.6-8.6-29.6s5.8 7.2-2.1 13.9c-9.8 8.3-12.6 12.6-1.7 25.1 0 0-21.7-11.2-7.8-27.1 0 0-5.8 4.2-4.1 8.8 2.6 7.1 11.5 10.9 24.3 8.9z"
        fill="#EA2D2E"
      />
    </svg>
  );
}

export function JavaScriptLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M0 0h128v128H0z" fill="#F7DF1E" />
      <path
        d="M67.3 100.8c3.1 5.3 7.2 9.2 14.8 9.2 6.2 0 10.2-3.1 10.2-7.3 0-5.1-4.1-6.9-10.9-9.9l-3.8-1.6c-10.9-4.7-18.1-10.5-18.1-22.7 0-11.3 8.7-19.8 22.3-19.8 9.7 0 16.7 3.4 21.3 11.6l-8.9 5.7c-2.4-4.3-5.2-6.1-12.4-6.1-4.7 0-8.2 2.9-8.2 6.6 0 4.6 3.4 6.4 9.5 9l3.8 1.6c12.7 5.5 19.6 11.1 19.6 23.6 0 13.4-10.5 20.8-24.9 20.8-13.9 0-22.9-6.8-27-15.6l12.7-7.1zm-42 1.3c2.4 4.1 5.6 7.6 11.9 7.6 6.1 0 10-2.4 10-11.9V49.9h14.5v47.9c0 17.5-10.2 25.1-24.3 25.1-11.2 0-18.9-5.7-22.4-13.8l10.3-7z"
        fill="#000000"
      />
    </svg>
  );
}

export function TypeScriptLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M0 0h128v128H0z" fill="#3178C6" />
      <path
        d="M36.7 59.8H19.5v-9.5h48.9v9.5H51.2v50.9H36.7V59.8zm39.1 27.5c2.8 4.7 6.4 8.2 13.2 8.2 5.5 0 9.1-2.8 9.1-6.5 0-4.5-3.7-6.1-9.7-8.8l-3.4-1.4c-9.7-4.2-16.1-9.4-16.1-20.2 0-10.1 7.7-17.6 19.9-17.6 8.6 0 14.9 3 19 10.3l-7.9 5.1c-2.1-3.8-4.6-5.4-11.1-5.4-4.2 0-7.3 2.6-7.3 5.9 0 4.1 3 5.7 8.5 8l3.4 1.4c11.3 4.9 17.5 9.9 17.5 21 0 11.9-9.4 18.5-22.2 18.5-12.4 0-20.4-6.1-24.1-13.9l11.2-6.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function Html5Logo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M13.4 6.4l9.3 104.3 41.3 11.4 41.3-11.4 9.3-104.3H13.4z" fill="#E44D26" />
      <path d="M64 16.2v94.8l32.7-9.1 7.8-85.7H64z" fill="#F16529" />
      <path
        d="M64 53.6H46.4l-1.2-13.5H64V26.7H31.7l3.6 40.3H64v-13.4zm0 29.8l-.2.1-14.7-4-1-10.7H34.7l1.9 21.3 27.4 7.6v-14.3z"
        fill="#EBEBEB"
      />
      <path
        d="M64 53.6h17.6l-1.7 18.6-15.9 4.3v14.4l27.4-7.6 3.6-40.3H64v10.6zm0-26.9v13.4h32.3l1.2-13.4H64z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function Css3Logo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M13.4 6.4l9.3 104.3 41.3 11.4 41.3-11.4 9.3-104.3H13.4z" fill="#1572B6" />
      <path d="M64 16.2v94.8l32.7-9.1 7.8-85.7H64z" fill="#33A9DC" />
      <path
        d="M64 53.6H46.4l-1.2-13.5H64V26.7H31.7l3.6 40.3H64v-13.4zm0 29.8l-.2.1-14.7-4-1-10.7H34.7l1.9 21.3 27.4 7.6v-14.3z"
        fill="#EBEBEB"
      />
      <path
        d="M64 53.6h17.6l-1.7 18.6-15.9 4.3v14.4l27.4-7.6 3.6-40.3H64v10.6zm0-26.9v13.4h32.3l1.2-13.4H64z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ReactLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <ellipse cx="64" cy="64" rx="14" ry="14" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="6" fill="none">
        <ellipse cx="64" cy="64" rx="56" ry="22" />
        <ellipse cx="64" cy="64" rx="56" ry="22" transform="rotate(60 64 64)" />
        <ellipse cx="64" cy="64" rx="56" ry="22" transform="rotate(120 64 64)" />
      </g>
    </svg>
  );
}

export function NextjsLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <circle cx="64" cy="64" r="64" fill="currentColor" />
      <path
        d="M106.8 111.4L45.4 32H34v64h10.8V49.1l53.9 69.3c2.8-2.1 5.5-4.4 8.1-7zM83.8 32h10.8v42.8H83.8z"
        fill="var(--color-main-bg)"
      />
    </svg>
  );
}

export function TailwindLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M32 40c6.4-12.8 16-19.2 28.8-19.2 19.2 0 24 16 33.6 19.2 6.4 2.1 12.8.5 19.2-4.8-6.4 12.8-16 19.2-28.8 19.2-19.2 0-24-16-33.6-19.2-6.4-2.1-12.8-.5-19.2 4.8zm-22.4 32c6.4-12.8 16-19.2 28.8-19.2 19.2 0 24 16 33.6 19.2 6.4 2.1 12.8.5 19.2-4.8-6.4 12.8-16 19.2-28.8 19.2-19.2 0-24-16-33.6-19.2-6.4-2.1-12.8-.5-19.2 4.8z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function NodejsLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 5.3l52 30v60l-52 30-52-30v-60l52-30z"
        fill="#339933"
      />
      <path
        d="M64 25.3l34.6 20v40L64 105.3 29.4 85.3v-40L64 25.3z"
        fill="#FFFFFF"
      />
      <path
        d="M64 45.3l17.3 10v20L64 85.3 46.7 75.3v-20L64 45.3z"
        fill="#339933"
      />
    </svg>
  );
}

export function ExpressLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M128 64c0 35.3-28.7 64-64 64S0 99.3 0 64 28.7 0 64 0s64 28.7 64 64zM24.7 44.7v38.6h25.4v-8.5H35.3V68h13.2v-8.1H35.3v-6.7h14.5v-8.5H24.7zm31.8 15.2l9 12.6-9.6 10.8h11.9l4.5-5.9 4.5 5.9h11.9L79.1 72.5l9-12.6H76.7l-4.4 6.7-4.4-6.7H56.5z" />
    </svg>
  );
}

export function MongoLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 1c-1.3 0-2.3.8-2.8 1.9-4.2 9.5-25.2 55.4-25.2 78.4 0 28.2 20.3 44.8 26.6 45.7 1.4.2 1.4-126 1.4-126z"
        fill="#47A248"
      />
      <path
        d="M64 1c1.3 0 2.3.8 2.8 1.9 4.2 9.5 25.2 55.4 25.2 78.4 0 28.2-20.3 44.8-26.6 45.7-1.4.2-1.4-126-1.4-126z"
        fill="#499D4A"
      />
      <path
        d="M64 126c-.3 0-.6 0-.9-.1-6.9-1.2-27.1-17.6-27.1-46.6 0-23.7 21.6-70.3 25.9-78.2.4-.8 1.2-1.1 2.1-1.1s1.7.3 2.1 1.1c4.3 7.9 25.9 54.5 25.9 78.2 0 29-20.2 45.4-27.1 46.6-.3.1-.6.1-.9.1z"
        stroke="#47A248"
        strokeWidth="2"
      />
    </svg>
  );
}

export function PostgresLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52-23.3-52-52-52zm0 14c21 0 38 17 38 38s-17 38-38 38-38-17-38-38 17-38 38-38z"
        fill="#4169E1"
      />
      <path
        d="M64 36c-15.5 0-28 12.5-28 28s12.5 28 28 28 28-12.5 28-28-12.5-28-28-28z"
        fill="#336791"
      />
    </svg>
  );
}

export function MysqlLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 16C37.5 16 16 37.5 16 64s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-6 70.8c-12.4 0-22.5-10.1-22.5-22.5s10.1-22.5 22.5-22.5 22.5 10.1 22.5 22.5-10.1 22.5-22.5 22.5z"
        fill="#4479A1"
      />
      <circle cx="78" cy="50" r="8" fill="#F29111" />
    </svg>
  );
}

export function GitLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M124.7 57.3L70.7 3.3c-4.4-4.4-11.6-4.4-16 0L39.8 18.2l20.2 20.2c4.7-1.6 10.3-.5 14 3.2 3.8 3.8 4.8 9.4 3.1 14.2l19.5 19.5c4.7-1.7 10.4-.6 14.2 3.1 5.3 5.3 5.3 13.9 0 19.2s-13.9 5.3-19.2 0c-4.2-4.2-5.1-10.4-2.8-15.4L70.7 64.1v31.4c1.7 1.1 3.2 2.6 4.3 4.4 3.9 6.4 1.9 14.8-4.5 18.7-6.4 3.9-14.8 1.9-18.7-4.5-3.9-6.4-1.9-14.8 4.5-18.7 2.3-1.4 4.9-2 7.5-1.9V62.4c-2.6.1-5.2-.5-7.5-1.9-4.9-2.9-7.2-8.5-6.1-14L28.2 24.5 3.3 49.4c-4.4 4.4-4.4 11.6 0 16l54 54c4.4 4.4 11.6 4.4 16 0l51.4-51.4c4.4-4.4 4.4-11.6 0-16.7z"
        fill="#F05032"
      />
    </svg>
  );
}

export function GithubLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 0C28.65 0 0 28.65 0 64c0 28.28 18.34 52.28 43.78 60.72 3.2.59 4.37-1.39 4.37-3.08 0-1.52-.06-6.55-.09-11.89-17.8 3.87-21.56-7.59-21.56-7.59-2.91-7.4-7.1-9.37-7.1-9.37-5.81-3.97.44-3.89.44-3.89 6.42.45 9.8 6.59 9.8 6.59 5.71 9.78 14.98 6.96 18.63 5.32.58-4.13 2.24-6.96 4.07-8.56-14.21-1.61-29.15-7.1-29.15-31.62 0-6.98 2.49-12.69 6.59-17.16-.66-1.62-2.86-8.12.63-16.92 0 0 5.37-1.72 17.6 6.56 5.1-1.42 10.57-2.13 16.01-2.13s10.91.71 16.01 2.13c12.21-8.28 17.57-6.56 17.57-6.56 3.5 8.8 1.3 15.3.64 16.92 4.11 4.47 6.58 10.18 6.58 17.16 0 24.58-14.97 29.99-29.23 31.57 2.3 1.98 4.35 5.88 4.35 11.85 0 8.56-.08 15.46-.08 17.56 0 1.71 1.15 3.71 4.41 3.08C109.68 116.26 128 92.27 128 64c0-35.35-28.65-64-64-64z"
      />
    </svg>
  );
}

export function VscodeLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M96.5 124.9c3.8 2.1 8.5.9 10.9-2.7l17.7-17.7c2.5-2.5 2.9-6.5 1-9.5L96.2 64l29.9-31c1.9-3 1.5-7-1-9.5L107.4 5.8c-2.4-3.6-7.1-4.8-10.9-2.7L42.2 41.3 18.7 23.4c-2.7-2-6.5-1.7-8.9.7L2.4 31.5c-2.7 2.7-2.7 7.1 0 9.8L26.6 64 2.4 82.7c-2.7 2.7-2.7 7.1 0 9.8l7.4 7.4c2.4 2.4 6.2 2.7 8.9.7l23.5-17.9 54.3 42.2z"
        fill="#007ACC"
      />
      <path
        d="M96.5 124.9c3.8 2.1 8.5.9 10.9-2.7l17.7-17.7c2.5-2.5 2.9-6.5 1-9.5L96.2 64l.3 60.9z"
        fill="#1F8AD2"
      />
    </svg>
  );
}

export function DockerLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M125.7 54.2c-2.6-1.9-10.6-2.5-16.5 1.5-1.1.8-2.1 1.7-2.9 2.7-6.2-4.5-14.8-4.8-21.7-1.3l-1.3.8V36.2H67.5V52h-13V36.2H38.7V52h-13V36.2H9.9v31.7c0 8.5 2.8 16.9 8.1 23.6 13.9 17.5 40.5 24.3 62.5 15.6 19.3-7.6 32.1-23.7 33.7-44.2 4.9.4 9.9-.4 14-2.8 2.8-1.7 4.2-3.8 4.2-3.8s-4.3-1.2-6.7-2.1z"
        fill="#2496ED"
      />
      <path d="M9.9 54.2h15.8v13.5H9.9zm15.8 0h13V67.7h-13zm15.8 0h13V67.7h-13zm15.8 0h13.2V67.7H57.3zm15.8 0h15.8V67.7H73.1z" fill="#FFFFFF" opacity=".4" />
    </svg>
  );
}

export function LinuxLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className}>
      <path
        d="M64 2c-17.7 0-32 18.8-32 42 0 11.2 3.4 21.4 9 29.1-8.2 6.8-13.8 17.8-13.8 30.9 0 3 2.5 5.5 5.5 5.5h62.6c3 0 5.5-2.5 5.5-5.5 0-13.1-5.6-24.1-13.8-30.9 5.6-7.7 9-17.9 9-29.1 0-23.2-14.3-42-32-42z"
        fill="#FCC624"
      />
      <circle cx="53" cy="38" r="5" fill="#000" />
      <circle cx="75" cy="38" r="5" fill="#000" />
      <path d="M64 45c-6 0-9 4-9 7s3 5 9 5 9-2 9-5-3-7-9-7z" fill="#E95420" />
    </svg>
  );
}

export function VercelLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path d="M64 16L128 112H0L64 16z" />
    </svg>
  );
}

export function GsapLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#0AE448" fillOpacity="0.12" />
      <path
        d="M64 22C40.8 22 22 40.8 22 64s18.8 42 42 42c18.6 0 34.4-12.1 39.9-28.8h-17.5c-4.2 8.7-13.1 14.8-22.4 14.8-14.4 0-26-11.6-26-26s11.6-26 26-26c10 0 18.5 6.6 22.4 15.8h17.5C98.4 34.7 82.6 22 64 22z"
        fill="#0AE448"
      />
      <circle cx="84" cy="64" r="8" fill="#0AE448" />
    </svg>
  );
}

export function FramerMotionLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path d="M22 1h84v42H64z" fill="#0055FF" />
      <path d="M22 43h42l42 42H22z" fill="#0055FF" fillOpacity="0.8" />
      <path d="M22 85h42v42z" fill="#0055FF" fillOpacity="0.95" />
    </svg>
  );
}

export function LenisLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="var(--color-primary-accent)" fillOpacity="0.12" />
      <path
        d="M32 78c12 0 16-28 32-28s20 28 32 28"
        stroke="var(--color-primary-accent)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="78" r="6" fill="var(--color-primary-accent)" />
      <circle cx="96" cy="78" r="6" fill="var(--color-primary-accent)" />
    </svg>
  );
}

export function DsaLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#07566A" fillOpacity="0.12" />
      <line x1="64" y1="36" x2="38" y2="72" stroke="#07566A" strokeWidth="5" strokeLinecap="round" />
      <line x1="64" y1="36" x2="90" y2="72" stroke="#07566A" strokeWidth="5" strokeLinecap="round" />
      <line x1="38" y1="72" x2="26" y2="102" stroke="#07566A" strokeWidth="4" strokeLinecap="round" />
      <line x1="38" y1="72" x2="52" y2="102" stroke="#07566A" strokeWidth="4" strokeLinecap="round" />
      <line x1="90" y1="72" x2="102" y2="102" stroke="#07566A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="64" cy="34" r="14" fill="#07566A" />
      <circle cx="64" cy="34" r="6" fill="#FFFFFF" />
      <circle cx="38" cy="72" r="11" fill="#78B9C2" />
      <circle cx="90" cy="72" r="11" fill="#78B9C2" />
      <circle cx="26" cy="102" r="7" fill="#A8D5D8" />
      <circle cx="52" cy="102" r="7" fill="#A8D5D8" />
      <circle cx="102" cy="102" r="7" fill="#A8D5D8" />
    </svg>
  );
}

export function OopLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#8B5CF6" fillOpacity="0.12" />
      <path d="M64 24L100 44V84L64 104L28 84V44L64 24Z" stroke="#8B5CF6" strokeWidth="6" strokeLinejoin="round" />
      <path d="M64 24V64M64 64L100 44M64 64L28 44" stroke="#8B5CF6" strokeWidth="6" strokeLinejoin="round" />
      <path d="M64 64V104" stroke="#8B5CF6" strokeWidth="6" strokeLinejoin="round" />
      <circle cx="64" cy="64" r="8" fill="#A78BFA" />
    </svg>
  );
}

export function DbmsLogo({ className = 'w-7 h-7' }: LogoProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#0284C7" fillOpacity="0.12" />
      <ellipse cx="64" cy="36" rx="34" ry="12" fill="#38BDF8" fillOpacity="0.3" stroke="#0284C7" strokeWidth="6" />
      <path d="M30 36v22c0 6.6 15.2 12 34 12s34-5.4 34-12V36" stroke="#0284C7" strokeWidth="6" />
      <path d="M30 58v22c0 6.6 15.2 12 34 12s34-5.4 34-12V58" stroke="#0284C7" strokeWidth="6" />
      <path d="M30 80v22c0 6.6 15.2 12 34 12s34-5.4 34-12V80" stroke="#0284C7" strokeWidth="6" />
    </svg>
  );
}

