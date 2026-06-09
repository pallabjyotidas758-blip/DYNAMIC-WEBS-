import React, { useState, useEffect } from "react";
import { 
  BrainCircuit, Palette, Workflow, Compass, LineChart, 
  Sparkles, Award, ArrowUpRight, Star, ChevronDown, ChevronUp, 
  Calendar, Clock, ShieldCheck, Mail, MapPin, Settings2, ArrowRight, X,
  Smartphone
} from "lucide-react";
import { 
  DEFAULT_BRANDING, DEFAULT_SERVICES, DEFAULT_CASE_STUDIES, 
  DEFAULT_BLOGS, DEFAULT_BOOKINGS, DEFAULT_SEO 
} from "./data";
import { BrandingOptions, Service, CaseStudy, BlogPost, Booking, SEOConfig } from "./types";
import Navigation from "./components/Navigation";
import AdminPanel from "./components/AdminPanel";
import { BookingModal, CaseStudyModal, BlogModal } from "./components/Modals";
import { Minimalistic3DBackground } from "./components/Minimalistic3DBackground";
import { InteractiveSlideDeck } from "./components/InteractiveSlideDeck";

export default function App() {
  // STATE DEFINITIONS WITH LOCALSTORAGE RECOVERY
  const [branding, setBranding] = useState<BrandingOptions>(() => {
    const saved = localStorage.getItem("dw_branding_v2");
    return saved ? JSON.parse(saved) : DEFAULT_BRANDING;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem("dw_services_v2");
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => {
    const saved = localStorage.getItem("dw_cases_v2");
    return saved ? JSON.parse(saved) : DEFAULT_CASE_STUDIES;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem("dw_blogs_v2");
    return saved ? JSON.parse(saved) : DEFAULT_BLOGS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("dw_bookings_v2");
    return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
  });

  const [seo, setSeo] = useState<SEOConfig>(() => {
    const saved = localStorage.getItem("dw_seo_v2");
    return saved ? JSON.parse(saved) : DEFAULT_SEO;
  });

  // MODAL TOGGLES
  const [activeSection, setActiveSection] = useState("services");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [detailedService, setDetailedService] = useState<Service | null>(null);

  // FAQ TOGGLE INDEX
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  // LOCAL PERSISTENCE WATCHERS
  useEffect(() => {
    localStorage.setItem("dw_branding_v2", JSON.stringify(branding));
  }, [branding]);

  useEffect(() => {
    localStorage.setItem("dw_services_v2", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("dw_cases_v2", JSON.stringify(caseStudies));
  }, [caseStudies]);

  useEffect(() => {
    localStorage.setItem("dw_blogs_v2", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem("dw_bookings_v2", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("dw_seo_v2", JSON.stringify(seo));
  }, [seo]);

  // CRAWLER UPDATER (SEO IN METADATA AND TITLE)
  useEffect(() => {
    if (seo.title) {
      document.title = seo.title;
    }
  }, [seo]);

  // COLOR THEME MAP
  const getThemeColors = () => {
    switch (branding.themeName) {
      case "bento-blue":
        return {
          glow: "from-cyan-500/20 via-transparent to-transparent",
          accentText: "text-cyan-400",
          accentBg: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20",
          accentGrad: "from-cyan-400 via-blue-500 to-indigo-600",
          accentBorder: "border-cyan-500/20",
        };
      case "premium-dark":
        return {
          glow: "from-amber-500/15 via-transparent to-transparent",
          accentText: "text-amber-400",
          accentBg: "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20",
          accentGrad: "from-amber-400 via-amber-500 to-amber-600",
          accentBorder: "border-amber-500/20",
        };
      case "emerald-noir":
        return {
          glow: "from-emerald-500/15 via-transparent to-transparent",
          accentText: "text-emerald-400",
          accentBg: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20",
          accentGrad: "from-emerald-400 to-teal-600",
          accentBorder: "border-emerald-500/20",
        };
      case "royal-indigo":
        return {
          glow: "from-violet-500/15 via-transparent to-transparent",
          accentText: "text-violet-400",
          accentBg: "bg-violet-500/10 hover:bg-violet-500/20 border-violet-500/20",
          accentGrad: "from-violet-500 to-indigo-600",
          accentBorder: "border-violet-500/20",
        };
      case "arctic-silver":
        return {
          glow: "from-zinc-100/10 via-transparent to-transparent",
          accentText: "text-neutral-200",
          accentBg: "bg-white/10 hover:bg-white/15 border-white/10",
          accentGrad: "from-zinc-200 to-neutral-400",
          accentBorder: "border-white/10",
        };
      default:
        return {
          glow: "from-cyan-500/15 via-transparent to-transparent",
          accentText: "text-cyan-400",
          accentBg: "bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20",
          accentGrad: "from-cyan-400 to-blue-600",
          accentBorder: "border-cyan-500/20",
        };
    }
  };

  const themeColors = getThemeColors();

  const mapIconToComponent = (name: string) => {
    switch (name) {
      case "BrainCircuit": 
        return <BrainCircuit className={`h-6 w-6 ${themeColors.accentText}`} />;
      case "Palette": 
        return <Palette className={`h-6 w-6 ${themeColors.accentText}`} />;
      case "Workflow": 
        return <Workflow className={`h-6 w-6 ${themeColors.accentText}`} />;
      case "Compass": 
        return <Compass className={`h-6 w-6 ${themeColors.accentText}`} />;
      case "LineChart": 
        return <LineChart className={`h-6 w-6 ${themeColors.accentText}`} />;
      case "Smartphone": 
        return <Smartphone className={`h-6 w-6 ${themeColors.accentText}`} />;
      case "Sparkles": 
        return <Sparkles className={`h-6 w-6 ${themeColors.accentText}`} />;
      default: 
        return <BrainCircuit className={`h-6 w-6 ${themeColors.accentText}`} />;
    }
  };

  const handleAddNewBooking = (form: Omit<Booking, "id" | "createdAt" | "status">) => {
    const bookingObj: Booking = {
      ...form,
      id: `book-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "new"
    };
    setBookings((prev) => [bookingObj, ...prev]);
  };

  const faqItems = [
    {
      q: "What makes DYNAMIC WEBS faster than standard templates?",
      a: "Standard templates carry heavy CSS libraries, unminified HMR sockets, and generic scripts. We write statically-cached, modular react architectures styled with pure Tailwind, resolving media paths server-side. Page speeds routinely decrease to under 400 milliseconds, optimizing lead conversion rates immediately."
    },
    {
      q: "How does the AI Sourcing & Copywriting workflow function?",
      a: "We link custom API pipelines using modern LLMs (like Gemini 3.5-flash) to dynamically analyze incoming searches. The websites structure landing copy, meta tags, and value positioning context targets in real time based on user interest variables, boosting relative relevance score."
    },
    {
      q: "What CRM and databases integrations are pre-loaded?",
      a: "We deploy zero-delay automations mapping checkout structures, interactive schedulers, and leads telemetry directly to your core database clusters, or external dispatches (e.g. Slack alerts or custom CRMs) with built-in client brief summaries."
    },
    {
      q: "Do we have ongoing support for website updates?",
      a: "Absolutely. Our consulting model ensures continuous maintenance, lighthouse performance checks, seasonal copy adjustments, and periodic AI optimizer diagnostic runs directly from our dedicated CMS interface."
    }
  ];

  const clientCircleLogos = [
    { label: "SPACE", desc: "Co-Working Portfolio" },
    { label: "NOVA", desc: "Capital & Wealth" },
    { label: "SONIC", desc: "Dynamic Marketing" },
    { label: "SOLAR", desc: "Logistics Transport" }
  ];

  const isBento = branding.themeName === "bento-blue";
  const bgCanvas = isBento ? "bg-[#030306]" : "bg-[#050508]";
  const cardClass = isBento ? "bg-[#090a10]/75 backdrop-blur-md border border-white/5 rounded-2xl shadow-xl shadow-black/50 hover:border-cyan-500/30 transition-all duration-300" : "bg-[#0c0d12]/60 backdrop-blur-md border border-white/5 rounded-2xl shadow-lg hover:border-amber-500/20 transition-all duration-300";
  const borderClass = isBento ? "border-white/5" : "border-white/5";
  const textMute = isBento ? "text-stone-400" : "text-neutral-400";
  const sectionBgClass = isBento ? "bg-cyan-950/5 border border-cyan-500/10 rounded-3xl" : "bg-black/20 rounded-3xl border border-white/5";
  const bulletColor = isBento ? "bg-cyan-400" : (branding.themeName === "premium-dark" || branding.themeName === "gold-bronze" ? "bg-amber-400" : "bg-emerald-400");
  const headingClass = isBento ? "font-space-tech font-black tracking-widest uppercase" : "font-space-tech font-black tracking-wide uppercase";

  return (
    <div className={`min-h-screen ${bgCanvas} text-neutral-100 overflow-x-hidden pt-24 pb-8 ${branding.fontBody}`}>
      {/* 3D MOVING MINIMALISTIC BACKGROUND */}
      <Minimalistic3DBackground themeName={branding.themeName} />

      {/* 2. DYNAMIC MESH BACKGROUNDS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-0 left-1/4 right-1/4 h-96 bg-gradient-to-b ${themeColors.glow} filter blur-3xl rounded-full opacity-60`} />
        <div className="absolute inset-0 grid-bg-overlay opacity-5" />
      </div>

      {/* 3. STICKY HEADER AND NAVIGATION */}
      <Navigation 
        branding={branding} 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        onOpenBooking={() => setIsBookingOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 4. EPIC HERO SECTION */}
      <header id="hero" className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-16 text-center space-y-8 relative">
        <div className={`inline-flex items-center space-x-2 ${isBento ? 'bg-zinc-900 border border-zinc-800' : 'bg-white/5 border border-white/10'} px-3.5 py-1.5 rounded-full backdrop-blur-md animate-fade-in`}>
          <Sparkles className={`h-3.5 w-3.5 ${themeColors.accentText}`} />
          <span className="text-[10px] font-space-tech font-bold uppercase tracking-[0.2em] text-stone-300">Brand Architects × Website Automation</span>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-space-tech font-black uppercase text-white tracking-tight leading-[1.1] pb-2">
            Next-Gen High-Converting <br className="hidden md:inline" />
            <span className={`bg-gradient-to-r ${themeColors.accentGrad} bg-clip-text text-transparent italic ${isBento ? 'underline decoration-blue-500 decoration-4' : ''}`}>
              AI Web Experiences
            </span>
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-sans-ui leading-relaxed max-w-2xl mx-auto">
            {branding.heroSubtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            id="hero-free-consultation-btn"
            href="mailto:royprajeet69@gmail.com?subject=Website%20Design%20/%20Project%20Inquiry"
            className={`w-full sm:w-auto px-7 py-3 rounded-xl block text-center text-xs font-space-tech font-bold uppercase tracking-widest ${isBento ? 'bg-white text-black hover:bg-blue-500 hover:text-white' : `bg-gradient-to-r ${themeColors.accentGrad} text-black`} shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer`}
          >
            Contact Us
          </a>
          <a
            id="hero-services-anchor-btn"
            href="#services"
            className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-space-tech font-semibold uppercase tracking-widest ${isBento ? 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800' : 'bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-stone-300'} transition-all text-center cursor-pointer`}
          >
            Explore Services
          </a>
        </div>

        {/* MOCKUP SHADOW LINE */}
        <div className={`h-[1px] max-w-5xl mx-auto bg-gradient-to-r from-transparent via-${isBento ? 'zinc-800' : 'white/10'} to-transparent pt-12`} />
      </header>

      {/* INTERACTIVE EXPERIENCE GRAPHICS SLIDESHOW */}
      <InteractiveSlideDeck themeName={branding.themeName} onOpenBooking={() => setIsBookingOpen(true)} />

      {/* 5. CLIENT CIRCLE / TRUST ROW */}
      <section id="trust-logos" className="max-w-7xl mx-auto px-6 py-6 text-center">
        <span className="text-[9px] font-space-tech uppercase tracking-[0.34em] text-neutral-500 block mb-6">Our Client Circle</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto items-center">
          {clientCircleLogos.map((logo, idx) => (
            <div 
              id={`trust-logo-card-${logo.label.toLowerCase()}`}
              key={idx} 
              className={`${isBento ? 'bg-zinc-900 border border-zinc-800 rounded-3xl' : 'bg-neutral-900/30 border border-white/5 rounded-xl'} py-4 px-6 hover:border-zinc-700 transition-all group`}
            >
              <div className={`text-sm font-space-tech font-bold text-white group-hover:${isBento ? 'text-blue-500' : 'text-amber-400'} transition-colors duration-250 tracking-[0.25em]`}>
                {logo.label}
              </div>
              <p className="text-[8px] font-mono-code text-stone-500 uppercase mt-0.5">{logo.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SERVICES OVERVIEW */}
      <main id="services" className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="max-w-2xl">
          <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText} ${isBento ? 'underline decoration-blue-500 decoration-2 underline-offset-4' : ''}`}>Proven Architectural Specialties</span>
          <h2 className="text-xl md:text-2xl font-space-tech font-black uppercase text-white mt-1.5 tracking-wider">What We Do</h2>
          <p className="text-xs text-neutral-400 font-sans-ui mt-2">Bespoke design layouts fused directly with cognitive pipeline trigger mappings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((item) => (
            <div 
              id={`service-card-${item.id}`}
              key={item.id} 
              className={`${cardClass} hover:border-zinc-700 p-6 flex flex-col justify-between space-y-6 group transition-all`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {mapIconToComponent(item.iconName)}
                  <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Solutions Stack {item.id.replace("serv-", "#")}</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className={`text-sm font-space-tech font-bold uppercase tracking-wider text-white group-hover:${isBento ? 'text-blue-500' : 'text-amber-400'} transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans-ui leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="space-y-1.5 pt-2">
                  {item.bullets.map((bullet, index) => (
                    <div key={index} className="flex items-center space-x-2 text-[11px] font-mono-code text-zinc-300">
                      <span className={`h-1.5 w-1.5 rounded-full ${bulletColor}`} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`border-t ${isBento ? 'border-zinc-800' : 'border-white/5'} pt-4 flex flex-col space-y-3`}>
                <a
                  id={`inquire-service-${item.id}`}
                  href={`mailto:royprajeet69@gmail.com?subject=Inquiry%20for%20${encodeURIComponent(item.title)}`}
                  className={`px-4 py-2 border ${isBento ? 'border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/15 text-cyan-400 hover:border-cyan-500/40' : 'border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/15 text-amber-400 hover:border-amber-500/40'} rounded-xl text-[10px] font-space-tech font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer w-full text-center flex items-center justify-center space-x-1.5`}
                >
                  <span>Book or Inquire</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
                
                <div className="flex justify-between items-center px-1 pt-1.5 border-t border-dashed border-white/10">
                  <button
                    id={`explore-service-${item.id}`}
                    onClick={() => setDetailedService(item)}
                    className={`text-[9px] font-space-tech uppercase tracking-widest text-[#d1d1d6] hover:${isBento ? 'text-blue-400' : 'text-white'} flex items-center space-x-1 hover:translate-x-0.5 transition-all text-left cursor-pointer font-bold`}
                  >
                    <span>Explore detailed solutions</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 7. DESIRED ROADMAP OF HOW WE WORK */}
      <section id="roadmap" className={`max-w-7xl mx-auto px-6 py-16 ${sectionBgClass} space-y-12 relative overflow-hidden`}>
        <div className={`absolute top-1/2 right-0 h-48 w-48 bg-blue-500/5 filter blur-3xl rounded-full`} />
        
        <div className="max-w-2xl">
          <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText} ${isBento ? 'underline decoration-blue-500 decoration-2 underline-offset-4' : ''}`}>Strategic Alignment</span>
          <h2 className="text-xl md:text-2xl font-space-tech font-black uppercase text-white mt-1.5 tracking-wider">How We Work (Roadmap)</h2>
          <p className="text-xs text-neutral-400 font-sans-ui mt-2">Our structured engineering milestones from the initial inquiry to secure launch.</p>
        </div>

        {/* ROADMAP TIMELINE GRID */}
        <div className="relative border-l border-zinc-800/80 ml-4 md:ml-12 pl-6 md:pl-12 space-y-12">
          {[
            {
              phase: "Phase 01 / Discovery & Briefing",
              title: "Diagnostics & Project Alignment",
              desc: "Step one begins with a comprehensive, deep-dive examination of your project objectives. We layout requirements, map existing speed bottlenecks, and finalize clear design/branding instructions.",
              items: ["Detailed technical intake review", "Sourcing channel diagnostics", "Design strategy alignment map"]
            },
            {
              phase: "Phase 02 / Creative Styling",
              title: "Cinematic Layout & Brand Accent Refinement",
              desc: "We construct high-fidelity UI layout boards pairing premium typographies, bespoke grid structures, cohesive brand colorways and signature visual assets.",
              items: ["Custom typographic pairing setup", "Responsive grid design guidelines", "Bespoke color palettes & asset styles"]
            },
            {
              phase: "Phase 03 / Construction",
              title: "Pristine Full-Stack Assembly",
              desc: "Engineered with React 18, Vite, and fully optimized Tailwind utility classes. Transitions, touch fidelity inputs, and layout spacings are custom structured for fluid responsiveness.",
              items: ["Modular front-end component structure", "Fluid responsive viewport design", "High-performance interface systems"]
            },
            {
              phase: "Phase 04 / Communication Sync",
              title: "Multi-Channel Communications Integrations",
              desc: "Deploy direct real-time communication bridges. Instantly link direct call buttons, custom WhatsApp API actions, and Gmail composer prompts for seamless target outreach.",
              items: ["Preloaded calling links (+91 9678419230 & +91 7002168761)", "Pre-set +91 9395167729 WhatsApp chat action", "Direct royprajeet69@gmail.com mailbox composer"]
            },
            {
              phase: "Phase 05 / Evaluation & Launch",
              title: "100/100 Core Web Vitals Audit & Production",
              desc: "Full comprehensive testing on all target viewports (Mobile, Tablet, Desktop). Check loading speeds, optimize images, verify SEO triggers, and launch into secure container production.",
              items: ["SEO & metadata crawled tag optimization", "Zero-downtime server setup validation", "Secure launch in target environments"]
            }
          ].map((step, idx) => (
            <div key={idx} className="relative group" id={`roadmap-step-${idx + 1}`}>
              {/* TIMELINE INDICATOR DOT */}
              <div className={`absolute -left-[31px] md:-left-[55px] top-1.5 h-4 w-4 rounded-full ${isBento ? 'bg-blue-600 border-4 border-[#050505]' : 'bg-amber-500 border-4 border-[#0a0a0c]'} shadow-lg group-hover:scale-125 transition-transform duration-200`} />
              
              <div className={`${cardClass} p-5 md:p-6 hover:border-zinc-700 transition-all duration-300 relative overflow-hidden space-y-4`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono-code text-zinc-500 uppercase tracking-widest`}>{step.phase}</span>
                    <h3 className={`text-xs md:text-sm font-space-tech font-extrabold text-white uppercase group-hover:${isBento ? 'text-blue-500' : 'text-amber-400'} transition-colors duration-250`}>
                      {step.title}
                    </h3>
                  </div>
                  <span className={`text-xl font-black ${isBento ? 'text-zinc-800' : 'text-white/5'} font-space-tech select-none`}>0{idx+1}</span>
                </div>
                
                <p className="text-xs text-neutral-400 font-sans-ui leading-relaxed max-w-4xl">
                  {step.desc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2">
                  {step.items.map((bullet, listIdx) => (
                    <div key={listIdx} className="flex items-center space-x-2 text-[10px] font-mono-code text-zinc-300">
                      <span className={`h-1.5 w-1.5 rounded-full ${bulletColor}`} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ABOUT SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText} ${isBento ? 'underline decoration-blue-500 decoration-2 underline-offset-4' : ''}`}>The Brand Architects</span>
            <span className="block text-xl md:text-2xl font-space-tech font-black uppercase text-white">We Command Attention</span>
          </div>
          <p className="text-xs text-neutral-400 font-sans-ui leading-relaxed">
            {branding.aboutText}
          </p>
          <div className={`${isBento ? 'bg-zinc-900 border-l-2 border-blue-500' : 'bg-[#0e0e11] border-l-2 border-amber-500'} p-4 rounded-r-xl`}>
            <p className={`text-xs italic ${isBento ? 'font-space-tech' : 'font-heading-serif'} text-white font-medium leading-relaxed`}>
              "{branding.aboutQuote}"
            </p>
          </div>
        </div>

        {/* DECORATIVE BRUTAL GRID MOCKUP */}
        <div className={`${cardClass} border-zinc-700/50 p-6 space-y-6 my-2 relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 h-16 w-16 ${isBento ? 'bg-blue-500/10' : 'bg-amber-500/5'} filter blur-2xl rounded-full`} />
          <div className={`flex items-center space-x-2 border-b ${isBento ? 'border-zinc-800' : 'border-white/5'} pb-4`}>
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="text-[9px] font-mono-code text-zinc-500 uppercase ml-2 select-none">Client Sourcing System (Automated)</span>
          </div>

          <div className="space-y-4 font-mono-code text-[11px]">
            {/* mock console steps */}
            <div className="space-y-1">
              <span className="text-stone-500">[09:37:12] INCOMING TARGET LOGGED:</span>
              <span className="block text-white pl-4 font-bold">» Genevieve Vance - Vance Capital (Intake OK)</span>
            </div>
            <div className="space-y-1">
              <span className="text-stone-500">[09:37:13] METADATA IDENTIFIED:</span>
              <span className={`block pl-4 ${isBento ? 'text-blue-400' : 'text-amber-400'}`}>» Budget: High Premium | Interest: Branding Redesign</span>
            </div>
            <div className={`space-y-1 ${isBento ? 'bg-zinc-950/70 border-zinc-800' : 'bg-black/40 border-white/5'} p-2.5 rounded border`}>
              <span className={`${isBento ? 'text-blue-400' : 'text-emerald-400'} font-bold`}>✓ AUTO-CLASSIFY OUTCOME:</span>
              <p className="text-zinc-400 pl-4 text-[10px]">CRM Brief dispatched to active consultant queues. Meeting schedule synchronized.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HOW WE WORK (TIMELINE) */}
      <section id="how-we-work" className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <div className="max-w-xl">
          <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText} ${isBento ? 'underline decoration-blue-500 decoration-2 underline-offset-4' : ''}`}>Seamless Deliverability</span>
          <h2 className="text-xl md:text-2xl font-space-tech font-black uppercase text-white mt-1">Our Pipeline Sprint</h2>
          <p className="text-xs text-neutral-400 font-sans-ui mt-1.5">How we analyze, construct, and automate your new flagship assets in continuous sprints.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { phase: "01 / Diagnostics", title: "Discovery & Analysis", desc: "We map cognitive bottleneck heatmaps on existing systems, analyzing budget intents and target audiences." },
            { phase: "02 / Architecture", title: "Refined Grid Design", desc: "Formulate physical layouts, paired premium typographies, custom gradients, and world-class graphics styles." },
            { phase: "03 / Automation", title: "Telemetry & Sourcing", desc: "Build Express APIs, contact intake loops, calendar schedulers, and direct CRM pre-qualification models." },
            { phase: "04 / Optimization", title: "Continuous Scaling", desc: "Enable SEO meta triggers, AI optimization runs, diagnostic evaluations, and velocity enhancements." }
          ].map((item, idx) => (
            <div key={idx} className={`${cardClass} hover:border-zinc-700 p-5 space-y-3 transition-all`}>
              <div className={`text-xs font-mono-code font-black ${themeColors.accentText} uppercase`}>{item.phase}</div>
              <h4 className="text-xs font-space-tech font-bold text-white uppercase">{item.title}</h4>
              <p className="text-[11px] text-stone-400 leading-relaxed font-sans-ui">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. TESTIMONIALS SECTION */}
      <section id="testimonials" className={`max-w-7xl mx-auto px-6 py-16 ${sectionBgClass} space-y-10`}>
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText} ${isBento ? 'underline decoration-blue-500 decoration-2 underline-offset-4' : ''}`}>Client Endorsements</span>
          <h2 className="text-xl md:text-2xl font-space-tech font-black uppercase text-white mt-1">Praise from the circle</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              quote: "The team built our website exactly as we envisioned and has been maintaining it flawlessly. Fast response times and great communication throughout.",
              client: "Sarah Mitchell",
              role: "Business Owner, Mitchell Retail"
            },
            {
              quote: "Excellent website development service. The site is modern, fast, and their ongoing maintenance keeps everything running smoothly.",
              client: "David Carter",
              role: "Founder, Carter Ventures"
            },
            {
              quote: "Professional web development and reliable maintenance support. Their team consistently delivers quality work and helps us keep our clients' websites secure and up to date.",
              client: "BrightPath Digital Agency",
              role: "Management Lead, BrightPath"
            },
            {
              quote: "Dynamic Webs completely rewrote our conversion metrics. Their design aesthetic is deeply premium, and the backend integrations automated away 15 hours of manual call-booking ping pong every week.",
              client: "Victoria Vance",
              role: "CEO, Space Collective"
            },
            {
              quote: "Absolute professional execution. Lighthouse scores achieved absolute 100 benchmark ratings, and organic user session duration tripled on our flagship capital channels within 4 weeks.",
              client: "Dr. Adrian Thorne",
              role: "Head Portfolio, Nova Wealth Group"
            }
          ].map((item, idx) => (
            <div key={idx} className={`${cardClass} p-6 space-y-4 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}>
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`h-3 w-3 ${isBento ? 'fill-blue-500 text-blue-500' : 'fill-amber-500 text-amber-500'}`} />)}
                </div>
                <p className="text-xs text-neutral-300 font-sans-ui italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
              <div className="border-t border-white/5 pt-3 leading-tight mt-auto">
                <div className="text-xs font-space-tech font-bold text-white uppercase">{item.client}</div>
                <div className="text-[9px] font-mono-code text-neutral-500 uppercase mt-0.5">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. CMS INSIGHTS SECTION */}
      <section id="insights" className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText} ${isBento ? 'underline decoration-blue-500 decoration-2 underline-offset-4' : ''}`}>Cognitive Capital</span>
            <h2 className="text-xl md:text-2xl font-space-tech font-black uppercase text-white mt-1">Agency Insights</h2>
            <p className="text-xs text-neutral-400 font-sans-ui mt-1.5">Deep research insights on neuromarketing copywriting, layout speed velocity, and operations automation.</p>
          </div>
          <button
            id="write-insight-trigger"
            onClick={() => setIsAdminOpen(true)}
            className={`text-xs font-space-tech uppercase tracking-wider text-neutral-400 hover:text-white flex items-center space-x-1 transition-colors ${isBento ? 'bg-zinc-900 border border-zinc-800' : 'bg-white/5 border border-white/10'} px-3.5 py-2 rounded-lg`}
          >
            <Settings2 className="h-3.5 w-3.5" />
            <span>Generate Post with AI</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((b) => (
            <div 
              id={`blog-card-${b.id}`}
              key={b.id} 
              className={`${cardClass} hover:border-zinc-700 p-6 flex flex-col justify-between space-y-6 group transition-all`}
            >
              <div className="space-y-4">
                <div className={`flex items-center justify-between text-[9px] font-mono-code ${isBento ? 'text-blue-400' : 'text-amber-400'} uppercase tracking-widest`}>
                  <span>{b.category}</span>
                  <span className="text-neutral-500">{b.readTime}</span>
                </div>
                <div className="space-y-2">
                  <h3 className={`text-sm md:text-md ${isBento ? 'font-space-tech' : 'font-heading-serif'} font-bold text-white group-hover:${isBento ? 'text-blue-400' : 'text-amber-400'} transition-colors`}>
                    {b.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans-ui leading-relaxed line-clamp-3">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className={`border-t ${isBento ? 'border-zinc-800' : 'border-white/5'} pt-4 flex justify-between items-center bg-transparent`}>
                <span className="text-[10px] font-mono-code text-stone-500">By {b.author || "Admin Team"}</span>
                <button
                  id={`read-blog-btn-${b.id}`}
                  onClick={() => setSelectedBlog(b)}
                  className={`text-xs font-space-tech uppercase tracking-wider text-white hover:${isBento ? 'text-blue-450 text-blue-400' : 'text-amber-400'} transition-colors cursor-pointer`}
                >
                  Read full article »
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. CONTACT / SCHEDULER & BOOKING INTEGRATION */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-20">
        <div className={`${isBento ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-black/80 border border-zinc-800' : 'bg-gradient-to-br from-stone-900/40 via-[#0e0d11] to-amber-950/10 border border-white/10'} rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />
          <div className={`absolute top-0 left-1/4 h-32 w-48 ${isBento ? 'bg-blue-500/5' : 'bg-amber-500/5'} filter blur-3xl rounded-full`} />
          
          <div className="max-w-xl mx-auto space-y-3">
            <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText} ${isBento ? 'underline decoration-blue-500 decoration-2 underline-offset-4' : ''}`}>Frictionless Intake Channel</span>
            <h2 className="text-xl md:text-3xl font-space-tech font-black uppercase text-white tracking-widest">Initiate Execution Sprints</h2>
            <p className="text-xs text-neutral-400 font-sans-ui mt-2 leading-relaxed">
              Skip standard delayed email templates. Connect directly to our intake calendar diagnostic engine to secure a slot instantly.
            </p>
          </div>

          <div className="pt-4 max-w-md mx-auto">
            <a
              id="main-contact-booking-btn"
              href="mailto:royprajeet69@gmail.com?subject=Strategy%20Diagnostic%20Inquiry%20Slot"
              className={`w-full py-4 rounded-xl text-xs font-space-tech font-bold uppercase tracking-widest block text-center ${isBento ? 'bg-white text-black hover:bg-cyan-500 hover:text-black shadow-lg shadow-cyan-500/10' : `bg-gradient-to-r ${themeColors.accentGrad} text-black shadow-lg shadow-amber-500/10`} hover:scale-[1.01] transition-all cursor-pointer`}
            >
              Secure Strategy diagnostic slot
            </a>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t ${isBento ? 'border-zinc-800' : 'border-white/5'} text-center font-mono-code text-[11px] text-zinc-500`}>
            <div className="flex flex-col items-center space-y-1">
              <Mail className="h-4.5 w-4.5 text-stone-400" />
              <span>Inquiries Desk</span>
              <a href="mailto:royprajeet69@gmail.com" className="text-neutral-300 hover:text-amber-400 transition-colors font-bold underline decoration-dotted">royprajeet69@gmail.com</a>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <ShieldCheck className="h-4.5 w-4.5 text-stone-400" />
              <span>Secure Telemetry OK</span>
              <strong className="text-neutral-300">SSL 256-bit Encrypted</strong>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <MapPin className="h-4.5 w-4.5 text-stone-400" />
              <span>HQ Sourcing</span>
              <strong className="text-neutral-300">Guwahati, Assam / Global Remote</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ ACCORDION */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="text-center space-y-2">
          <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText} ${isBento ? 'underline decoration-blue-500 decoration-2 underline-offset-4' : ''}`}>Diagnostics & Inquiries</span>
          <h1 className="text-xl md:text-2xl font-space-tech font-black uppercase text-white mt-1">Frequently Asked</h1>
        </div>

        <div className={`space-y-4 border-t ${isBento ? 'border-zinc-800' : 'border-white/5'} pt-4`}>
          {faqItems.map((item, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div 
                id={`faq-item-${index}`}
                key={index} 
                className={`${cardClass} overflow-hidden`}
              >
                <button
                  id={`faq-trigger-${index}`}
                  onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                  className={`w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-all cursor-pointer`}
                >
                  <span className="text-xs font-space-tech font-bold uppercase tracking-wider text-white">
                    {item.q}
                  </span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                </button>
                {isOpen && (
                  <div className={`px-6 pb-5 text-xs text-neutral-400 leading-relaxed pt-1.5 font-sans-ui border-t ${isBento ? 'border-zinc-800' : 'border-white/5'}`}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 14. GENERAL FOOTER */}
      <footer className={`h-[1px] max-w-5xl mx-auto bg-gradient-to-r from-transparent via-${isBento ? 'zinc-800' : 'white/10'} to-transparent my-12`} />
      
      <footer id="general-footer" className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 font-mono-code text-[11px] text-center md:text-left">
        <div>
          <span className="text-xs font-space-tech tracking-widest font-bold text-neutral-300">
            {branding.logoText}
          </span>
          <p className="text-[10px] uppercase mt-1">© 2026 Dynamic Webs Studio. High converting digital assets aligned.</p>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#services" className="hover:text-white uppercase transition-colors">Services</a>
          <a href="#roadmap" className="hover:text-white uppercase transition-colors">Roadmap</a>
          <a href="#insights" className="hover:text-white uppercase transition-colors">Insights</a>
          <button 
            id="admin-dashboard-footer-trigger"
            onClick={() => setIsAdminOpen(true)}
            className="text-neutral-500 hover:text-amber-400 text-[11px] uppercase tracking-wider flex items-center space-x-1.5 bg-neutral-900/50 border border-white/5 hover:border-amber-500/20 py-1.5 px-3 rounded-lg transition-all"
          >
            <Settings2 className="h-3.5 w-3.5" />
            <span>Open Studio CMS</span>
          </button>
        </div>
      </footer>

      {/* ALL MODAL PORTALS & WORKSPACES */}
      
      {/* CMS Administration desk */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)}
        branding={branding} 
        setBranding={setBranding}
        services={services} 
        setServices={setServices}
        caseStudies={caseStudies} 
        setCaseStudies={setCaseStudies}
        blogs={blogs} 
        setBlogs={setBlogs}
        bookings={bookings} 
        setBookings={setBookings}
        seo={seo}
        setSeo={setSeo}
      />

      {/* Strategy Client Intake form scheduler */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => {
          setIsBookingOpen(false);
          setPreselectedService(undefined);
        }} 
        services={services}
        onAddBooking={handleAddNewBooking}
        preselectedServiceTitle={preselectedService}
      />

      {/* Dynamic Selected study details brief reader */}
      <CaseStudyModal 
        isOpen={selectedCase !== null} 
        onClose={() => setSelectedCase(null)} 
        caseStudy={selectedCase}
      />

      {/* Detailed Sourcing services spec sheet */}
      {detailedService && (
        <div id="service-spec-overlay" className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div id="service-spec-box" className="w-full max-w-lg bg-[#0e0d11] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl p-6 md:p-8 space-y-4">
            <button 
              onClick={() => setDetailedService(null)} 
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white bg-white/5 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="space-y-1.5">
              <span className={`text-[10px] font-mono-code uppercase tracking-widest ${themeColors.accentText}`}>Services Solutions Spec</span>
              <h3 className="text-md md:text-lg font-space-tech font-bold uppercase tracking-widest text-white">{detailedService.title}</h3>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed font-sans-ui">
              {detailedService.detailedDescription}
            </p>

            <div className="space-y-2 border-t border-white/5 pt-4">
              <span className="text-[10px] font-mono-code uppercase text-amber-500 block font-bold">Standard Sprints deliverables</span>
              <div className="grid grid-cols-1 gap-2">
                {detailedService.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[11px] text-stone-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                onClick={() => setDetailedService(null)}
                className="px-4 py-2 hover:bg-stone-900 text-stone-400 hover:text-white border border-white/5 rounded-lg text-xs font-space-tech uppercase"
              >
                Close Spec
              </button>
              <a
                id="book-service-from-spec"
                href={`mailto:royprajeet69@gmail.com?subject=Inquiry%20for%20${detailedService ? encodeURIComponent(detailedService.title) : "Custom%20Sprints"}`}
                onClick={() => setDetailedService(null)}
                className={`px-5 py-2 rounded-lg text-xs font-space-tech font-bold uppercase bg-gradient-to-r ${themeColors.accentGrad} text-black cursor-pointer text-center block`}
              >
                Secure Sprints Slot
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Selected published blog post reader */}
      <BlogModal 
        isOpen={selectedBlog !== null} 
        onClose={() => setSelectedBlog(null)} 
        blog={selectedBlog}
      />
    </div>
  );
}
