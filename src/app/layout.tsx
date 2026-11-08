import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const rasleyHeights = localFont({
  src: '../../public/fonts/RasleyHeights.otf',
  variable: '--font-rasley-heights',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MD Danish Raza — Developer · Designer · Creator',
  description:
    'Premium anime-style personal developer portfolio of MD Danish Raza — Developer, Designer, Creator.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#123C4B' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${rasleyHeights.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/Balverd.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var stored = localStorage.getItem('danish_portfolio_theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-[100svh] flex flex-col bg-[var(--color-main-bg)] text-[var(--color-main-text)] transition-colors duration-250">
        <ThemeProvider>
          <SmoothScroll />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
