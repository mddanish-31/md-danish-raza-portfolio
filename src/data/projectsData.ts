export const PROJECT_CATEGORIES = [
  'All Projects',
  'Web Development',
  'Full Stack',
  'IoT / Hardware',
  'Other',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Feature Complete · Polish Pending' | 'In Development' | 'Completed';
  category: Exclude<ProjectCategory, 'All Projects'>;
  technologies: string[];
  previewImage: string;
  coverImage: string;
  coverThemeBg: string;
  coverAlt: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  featured?: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ern',
    title: 'ERN — Expiry Rescue Network',
    description:
      'An expiry-rescue marketplace helping businesses sell near-expiry products at discounted prices before they become losses. NGOs and bulk buyers receive additional special pricing.',
    status: 'Feature Complete · Polish Pending',
    category: 'Full Stack',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    previewImage: '/images/projects/ern-preview.svg',
    coverImage: '/images/projects/ern-cover.webp',
    coverThemeBg: '#04261C',
    coverAlt:
      'ERN — Expiry Rescue Network — Prevent food loss marketplace showcase featuring laptop dashboard, mobile app, and fresh grocery rescue system in emerald green',
    featured: true,
  },
  {
    id: 'saathi',
    title: 'SAATHI',
    description:
      'A service marketplace platform connecting customers with professionals across multiple service categories.',
    status: 'In Development',
    category: 'Full Stack',
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    previewImage: '/images/projects/saathi-preview.svg',
    coverImage: '/images/projects/saathi-cover.webp',
    coverThemeBg: '#240E1C',
    coverAlt:
      'SAATHI — Your All-in-One Service Marketplace showcase featuring laptop booking portal and mobile app in deep plum maroon styling',
    featured: false,
  },
  {
    id: 'hall-of-fame',
    title: 'Hall of Fame — Section D CSE 2026',
    description:
      'An interactive digital memory book for Section D CSE 2026, showcasing shared memories, photographs and messages.',
    status: 'In Development',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    previewImage: '/images/projects/hall-of-fame-preview.svg',
    coverImage: '/images/projects/hall-of-fame-cover.webp',
    coverThemeBg: '#0A1424',
    coverAlt:
      'Hall of Fame Section D CSE 2026 — Interactive digital memory book and yearbook showcase in midnight navy and champagne gold',
    githubUrl: 'https://github.com/mddanish-31/Hall-of-Fame-Sec-D-CSE-2026',
    featured: false,
  },
];

