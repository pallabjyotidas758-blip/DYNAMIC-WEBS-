export interface BrandingOptions {
  themeName: "premium-dark" | "gold-bronze" | "emerald-noir" | "royal-indigo" | "arctic-silver" | "bento-blue";
  accentColor: string; // Tailwind class color or hex
  glowColor: string; // Tailwind glow classes
  fontHeading: string; // font class
  fontBody: string; // font class
  logoText: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCTAText: string;
  aboutText: string;
  aboutQuote: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  iconName: string;
  bullets: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  imageTheme: string; // css gradient/pattern representation for lookups
  metric: string;
  metricLabel: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  date: string;
  time: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "archived";
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  tips: string[];
}
