'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        !mounted
          ? 'Toggle color theme'
          : theme === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
      className="group relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-main-text)] transition-all duration-200 hover:border-[var(--color-primary-accent)] hover:text-[var(--color-primary-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ring-offset)] cursor-pointer"
      title={mounted && theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Icon with smooth rotation and scale transition */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 transition-all duration-300 absolute ${
            mounted && theme === 'dark'
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`w-4 h-4 transition-all duration-300 absolute ${
            mounted && theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

