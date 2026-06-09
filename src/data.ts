import { BrandingOptions, Service, CaseStudy, BlogPost, Booking, SEOConfig } from "./types";

export const DEFAULT_BRANDING: BrandingOptions = {
  themeName: "bento-blue",
  accentColor: "from-blue-600 to-indigo-600",
  glowColor: "rgba(37, 99, 235, 0.12)",
  fontHeading: "font-space-tech tracking-wider",
  fontBody: "font-sans-ui",
  logoText: "DYNAMIC WEBS",
  heroTitle: "We build architectures that convert.",
  heroSubtitle: "High-performance websites powered by AI automation and conversion-first copywriting.",
  heroCTAText: "Contact Us",
  aboutText: "Dynamic Webs is an elite, multi-disciplinary digital studio at the intersection of high-end aesthetics, design execution, and pristine responsive engineering. We design high-intent brand assets and digital real estate. Our team of product design veterans, branding experts, and full-stack wizards build elite interactive designs and systems that establish absolute pricing and execution authority.",
  aboutQuote: "The modern web has become a sea of identical templates. We exist to build the exceptions—digital assets so outstandingly crafted and hyper-performant that your industry dominance is inevitable."
};

export const DEFAULT_SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "Website Designing",
    description: "Exquisite cinematic digital storefronts constructed with high-fidelity typography grids, responsive layouts, and modern bento spacings.",
    detailedDescription: "Your website is your premium digital real estate. We construct bespoke, high-performance responsive web setups styled with modern aesthetic interfaces, fluid micro-interactions, and meticulously engineered typographic hierarchies that establish immediate professional authority.",
    iconName: "Palette",
    bullets: [
      "Bespoke layout design",
      "Modern typographic systems",
      "Responsive interactive grids"
    ]
  },
  {
    id: "serv-2",
    title: "App Design",
    description: "Uncompromising mobile and web application interfaces, built with touch fidelity, intuitive flows, and complete high-fidelity UI systems.",
    detailedDescription: "We craft detailed user interfaces and workflows for mobile and web applications. Every viewport, transition, and interactive state is carefully structured to elevate satisfaction, reduce cognitive friction, and drive maximum application engagement.",
    iconName: "Smartphone",
    bullets: [
      "High-fidelity UI/UX kits",
      "Interactive fluid flow designs",
      "Custom viewport wireframes"
    ]
  },
  {
    id: "serv-3",
    title: "Brand Enhancement",
    description: "Rejuvenate your corporate identity with pristine visual asset styling, modern emblems, consistent colorways, and asset design manuals.",
    detailedDescription: "Transform the perception of your brand across all digital and physical channels. We perform comprehensive identity audits to refine your messaging, introduce beautifully crafted accent details, modernize outdated emblems, and establish cohesive visual palettes.",
    iconName: "Sparkles",
    bullets: [
      "Modernized brand emblems",
      "Cohesive accent styling",
      "Unified design brand kits"
    ]
  },
  {
    id: "serv-4",
    title: "Website Management",
    description: "Continuous maintenance, secure backup protocols, performance sweeps, layout updates, and direct operations.",
    detailedDescription: "Keep your digital system running on pristine engine cylinders. Our website management handle proactive core platform security updates, regular database or filesystem backups, content updates requested on-demand, and SEO performance sweeps.",
    iconName: "Compass",
    bullets: [
      "24/7 technical surveillance",
      "On-demand content & typography updates",
      "Proactive loading velocity sweeps"
    ]
  }
];

export const DEFAULT_CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-1",
    client: "Space Collective",
    title: "Redefining High-Prestige Digital Assets for Luxury Lounges",
    category: "Branding & Web Design",
    imageTheme: "bg-gradient-to-tr from-stone-950 via-neutral-900 to-amber-950/40",
    metric: "+312%",
    metricLabel: "Increase in monthly high-value leases",
    challenge: "Space Collective needed a storefront that matched the physical, highly detailed architecture of their prime enterprise coworking spaces. Standard real-estate modules looked commoditized, cheapening their values.",
    solution: "We designed a bespoke high-contrast media canvas featuring customized amber glowing elements, beautiful editorial display fonts, structured product views, and direct 1-click booking schedules.",
    results: [
      "312% increase in qualified corporate tours within 60 days.",
      "Organic site bounce rates halved to less than 18%.",
      "Average user session length increased to 4 minutes and 15 seconds."
    ]
  },
  {
    id: "case-2",
    client: "Nova Wealth Systems",
    title: "High-Fidelity Wealth Management Mobile Portal Design",
    category: "App Design",
    imageTheme: "bg-gradient-to-tr from-slate-950 via-zinc-900 to-emerald-950/25",
    metric: "4.9★",
    metricLabel: "User App Store Rating after design update",
    challenge: "Nova Wealth was losing premium portal users due to a confusing, cluttered interface and outdated touch interaction targets on mobile viewports.",
    solution: "Built a fully tailored mobile client dashboard using high-performance components, extremely polished responsive grids, elite modern typography, and a frictionless layout flow.",
    results: [
      "App Store user satisfaction rating surged to a near-perfect 4.9 stars.",
      "Saved 6,800+ customer confusion inquiries per month via intuitive UX paths.",
      "Achieved an increase of 42% in active daily system check-ins."
    ]
  },
  {
    id: "case-3",
    client: "Solar Global Logistics",
    title: "Global Enterprise Brand Identity & Design System Overhaul",
    category: "Brand Enhancement",
    imageTheme: "bg-gradient-to-tr from-stone-900 via-neutral-900 to-indigo-950/30",
    metric: "94%",
    metricLabel: "Increase in immediate brand trust score benchmarks",
    challenge: "Solar Global's administrative visual brand was outdated and unfocused, causing major enterprise partners to question their industry authority and operational modernization.",
    solution: "Rebuilt their entire corporate visual identity from the ground up, including high-contrast premium emblems, brand-specific typography layouts, and a unified design system manual.",
    results: [
      "Corporate brand authority and trust metrics increased to 94% instantly.",
      "Secured massive multi-year partnerships due to elevated visual prestige.",
      "Acquisition and contract success rates grew by 35% in three months."
    ]
  }
];

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "The Website Layout Checklist: 7 Design Scaffolds that Command Authority",
    excerpt: "Why premium agencies leverage precise visual weights, elegant grid systems, and exceptional display typography to convey value directly.",
    category: "Website Designing",
    readTime: "6 min read",
    date: "June 08, 2026",
    author: "Pallab Jyoti Das",
    content: `## The Myth of Completely Frictionless Layouts

In design academies, we are trained to eliminate interactive friction. "More clicks equals fewer conversions," they repeat. However, in luxury branding and ultra-premium consultancies, *frictionless generic layouts kill conversions*. Standard structures communicate mass commoditization.

Here is the cognitive checklist we utilize at **Dynamic Webs** to audit enterprise brand assets.

---

### 1. Visual Weight & Perceived Meticulousness
When a prospect lands on your homepage, their subconscious calculates code weight. A high-contrast charcoal canvas with sleek subtle glowing spots, blue elements, and beautiful layout spacing creates immediate prestige.

### 2. High-Prestige Typography Pairing
Pair a grand serif display heading font (commands psychological authority) with a strict, minimalist sans-serif typography for structural body copy. This triggers the prestige heuristic in the prospect's cognitive stack.

### 3. Numerical Metrics Front-and-Center
Do not hide your achievements in blocks of wordy paragraphs. Pull out metrics clearly:
- **Core Numbers**: Bold, large percentage markers (e.g., **+312%**).
- **Time context**: Ensure dates and metrics are concrete (e.g., **booked in 60 days**).

---

### Key Action Plan
To immediately lift value:
1. **Remove generic purple/blue gradients**: Stick to premium slate/onyx styling.
2. **Implement interactive booking systems**: Ensure prospects can select appointments instantly instead of submitting a text form that goes into a black hole.`
  },
  {
    id: "blog-2",
    title: "Visual Brand Enhancement: Rejuvenating Legacy Digital Identities",
    excerpt: "Detailed breakdown of the elements of brand design that convey elite competence and premium market positioning.",
    category: "Brand Enhancement",
    readTime: "5 min read",
    date: "May 29, 2026",
    author: "Admin Team",
    content: `## Stop Letting Dated Brand Identity Devalue Your Assets

In high-intent industries, your visual identity dictates your premium or commodity pricing authority. If your logos, design manuals, and presentation materials appear stuck in the 2010s, sophisticated customers assume your operational standards are similarly antiquated.

---

### Key Pillars of Modern Brand Enhancement

To construct a high-converting automated platform, we integrate three client-facing boundaries:

1. **Integrated Typographic Alignment**: Consistent custom typography across all touchpoints.
2. **Unified Core Visual Accent Layouts**: Establishing signature high-contrast details that stick in user memory.
3. **Pristine Colorways**: Curated palettes that align with your brand's unique market sector.

---

### Real-world outcomes
Studios using our integrated brand enhancement services report an immediate lift in client response ratios and are able to successfully scale their premium pricing models.`
  }
];

export const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: "book-1",
    name: "Genevieve Vance",
    email: "genevieve@vancecapital.com",
    phone: "+1 (555) 890-3421",
    company: "Vance Wealth Capital",
    service: "Website Designing",
    date: "2026-06-15",
    time: "14:00",
    message: "We need a completely custom, ultra-premium digital storefront to attract enterprise-level multi-family capital. Your design language matches our aesthetic exactly.",
    createdAt: "2026-06-09T09:12:00Z",
    status: "new"
  },
  {
    id: "book-2",
    name: "Marcus Thorne",
    email: "m.thorne@solaslogistics.de",
    phone: "+49 172 345678",
    company: "Solas Global Logistics",
    service: "Brand Enhancement",
    date: "2026-06-22",
    time: "10:30",
    message: "Looking to modernize our legacy brand graphics. Saw your Solar Logistics brand enhancement and design system study—we need that exact visual authority established for our corporate assets.",
    createdAt: "2026-06-08T16:45:00Z",
    status: "contacted"
  }
];

export const DEFAULT_SEO: SEOConfig = {
  title: "Dynamic Webs | Premium Website Designing, App Design & Brand Enhancement",
  description: "We build premium bespoke websites, high-fidelity app interfaces, and elevated brand identity systems for ambitious businesses.",
  keywords: "website designing, app design, brand enhancement, premium web design agency, interface design studio, custom visual branding",
  tips: [
    "Upgrade the primary hero headline with emotive value statements.",
    "Place selected project metrics at visual touchpoints above the fold.",
    "Incorporate clean dark-slate gradients to establish structural prestige."
  ]
};
