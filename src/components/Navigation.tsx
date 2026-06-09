import React, { useState, useEffect } from "react";
import { Menu, X, Settings2, Sparkles } from "lucide-react";
import { BrandingOptions } from "../types";

interface NavigationProps {
  branding: BrandingOptions;
  onOpenAdmin: () => void;
  onOpenBooking: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navigation({
  branding,
  onOpenAdmin,
  onOpenBooking,
  activeSection,
  setActiveSection,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Roadmap", id: "roadmap" },
    { label: "How We Work", id: "how-we-work" },
    { label: "Insights", id: "insights" },
    { label: "FAQ", id: "faq" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const isBento = branding.themeName === "bento-blue";
  
  const getThemeVars = () => {
    if (isBento) {
      return {
        accentText: "text-blue-500",
        activeText: "text-blue-400 font-bold",
        navBg: isScrolled 
          ? "bg-[#050505]/95 border-b border-zinc-800 py-4 shadow-xl" 
          : "bg-transparent py-6",
        logo: (
          <div className="text-xl md:text-2xl font-black tracking-tighter uppercase text-blue-500 italic">
            Dynamic Webs<span className="text-white">.</span>
          </div>
        ),
        ctaBtn: "px-5 py-2 bg-white text-black text-xs font-bold rounded-full uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all shadow-md",
        adminBtn: "text-xs font-space-tech uppercase tracking-wider text-zinc-400 hover:text-white flex items-center space-x-1.5 border border-zinc-800 bg-zinc-900 px-3 py-2 rounded-lg"
      };
    }
    return {
      accentText: branding.themeName === "emerald-noir" ? "text-emerald-400" : (branding.themeName === "royal-indigo" ? "text-violet-400" : (branding.themeName === "arctic-silver" ? "text-neutral-200" : "text-amber-400")),
      activeText: branding.themeName === "emerald-noir" ? "text-emerald-400 font-medium" : (branding.themeName === "royal-indigo" ? "text-violet-400 font-medium" : (branding.themeName === "arctic-silver" ? "text-white font-medium" : "text-amber-400 font-medium")),
      navBg: isScrolled ? "bg-[#0a0a0c]/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/20" : "bg-transparent py-6",
      logo: (
        <>
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-stone-900 to-amber-900 border border-amber-500/30 flex items-center justify-center shadow-md group-hover:border-amber-400 transition-all duration-300">
            <span className="text-sm font-space-tech font-bold text-amber-400">D</span>
          </div>
          <span className="text-md font-space-tech tracking-[0.2em] font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
            {branding.logoText || "DYNAMIC WEBS"}
          </span>
        </>
      ),
      ctaBtn: branding.themeName === "emerald-noir" 
        ? "text-xs font-space-tech font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-emerald-500 text-black px-5 py-2.5 rounded-lg shadow-lg"
        : (branding.themeName === "royal-indigo"
          ? "text-xs font-space-tech font-bold uppercase tracking-wider bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-violet-500 text-white px-5 py-2.5 rounded-lg shadow-lg"
          : (branding.themeName === "arctic-silver"
            ? "text-xs font-space-tech font-bold uppercase tracking-wider bg-gradient-to-r from-zinc-100 to-neutral-300 hover:from-white hover:to-zinc-200 text-black px-5 py-2.5 rounded-lg shadow-lg"
            : "text-xs font-space-tech font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-5 py-2.5 rounded-lg shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          )
        ),
      adminBtn: "text-xs font-space-tech uppercase tracking-wider text-neutral-400 hover:text-white flex items-center space-x-1.5 transition-colors border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg"
    };
  };

  const themeVars = getThemeVars();

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${themeVars.navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          {themeVars.logo}
        </div>

        {/* DESKTOP NAV ITEMS */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              id={`nav-link-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs font-space-tech uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                activeSection === item.id
                  ? themeVars.activeText
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            id="admin-panel-launch-btn"
            onClick={onOpenAdmin}
            className={themeVars.adminBtn}
            title="Open Admin Console"
          >
            <Settings2 className="h-3.5 w-3.5 animate-pulse" />
            <span>Admin Portal</span>
          </button>

          {/* Quick Contacts next to CTA */}
          <div className="flex items-center space-x-1.5 animate-fade-in">
            {/* WhatsApp */}
            <a
              id="nav-whatsapp-link"
              href="https://wa.me/919395167729"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-full text-emerald-400 hover:text-emerald-300 hover:scale-105 active:scale-95 transition-all duration-200"
              title="Chat on WhatsApp (+91 9395167729)"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.66.986 3.298 1.448 5.355 1.449 5.546 0 10.061-4.515 10.064-10.063.003-2.687-1.043-5.212-2.948-7.119C17.215 1.516 14.7 1.47 12.01 1.47c-5.55 0-10.069 4.515-10.072 10.064-.001 2.016.523 3.69 1.523 5.3l-.995 3.628 3.73-.978h-.001zm10.582-7.858c-.3-.15-1.782-.879-2.057-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.79-1.492-1.77-1.667-2.07-.175-.3-.018-.463.13-.612.137-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52-.172-.007-.368-.009-.567-.009-.199 0-.523.074-.797.374-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52 1.4.61 2.22.75 3.01.65.875-.11 1.782-.729 2.032-1.399.25-.67.25-1.24.175-1.399-.075-.15-.275-.25-.575-.4z"/>
              </svg>
            </a>

            {/* Direct Calling 1: +91 9678419230 */}
            <a
              id="nav-phone-link-1"
              href="tel:+919678419230"
              className="p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-full text-blue-400 hover:text-blue-300 hover:scale-105 active:scale-95 transition-all duration-200"
              title="Call +91 9678419230"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M21.384 17.791l-3.75-1.622c-.443-.191-.955-.074-1.272.29l-1.623 1.833c-2.915-1.503-5.289-3.877-6.792-6.792l1.833-1.622c.364-.317.481-.829.29-1.272l-1.622-3.75c-.218-.506-.757-.811-1.307-.75l-4.5 1c-.815.181-1.384.935-1.294 1.77 1 8.91 8.09 16 17 17 .835.09 1.589-.479 1.77-1.294l1-4.5c.061-.55-.244-1.089-.75-1.307z"/>
              </svg>
            </a>

            {/* Direct Calling 2: +91 7002168761 */}
            <a
              id="nav-phone-link-2"
              href="tel:+917002168761"
              className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-full text-cyan-400 hover:text-cyan-300 hover:scale-105 active:scale-95 transition-all duration-200"
              title="Call +91 7002168761"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M21.384 17.791l-3.75-1.622c-.443-.191-.955-.074-1.272.29l-1.623 1.833c-2.915-1.503-5.289-3.877-6.792-6.792l1.833-1.622c.364-.317.481-.829.29-1.272l-1.622-3.75c-.218-.506-.757-.811-1.307-.75l-4.5 1c-.815.181-1.384.935-1.294 1.77 1 8.91 8.09 16 17 17 .835.09 1.589-.479 1.77-1.294l1-4.5c.061-.55-.244-1.089-.75-1.307z"/>
              </svg>
            </a>
          </div>

          <a
            id="lets-talk-nav-btn"
            href="mailto:royprajeet69@gmail.com?subject=Website%20Design%20/%20Project%20Inquiry"
            className={themeVars.ctaBtn}
          >
            Contact Us
          </a>
        </div>

        {/* MOBILE TRIGGER */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            id="admin-portal-mobile-btn"
            onClick={onOpenAdmin}
            className={`p-2 text-neutral-400 hover:text-white rounded-lg ${isScrolled ? 'bg-zinc-800' : 'bg-white/5'}`}
          >
            <Settings2 className="h-4 w-4" />
          </button>
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 text-neutral-400 hover:text-white rounded-lg ${isScrolled ? 'bg-zinc-800' : 'bg-white/5'}`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV OVERLAY */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-menu"
          className={`fixed inset-0 top-[72px] z-35 animate-in fade-in slide-in-from-top-4 duration-250 border-t ${
            isBento ? 'bg-[#050505]/98 border-zinc-800' : 'bg-[#0a0a0c]/98 border-white/5'
          }`}
        >
          <div className="flex flex-col p-8 space-y-6">
            {navItems.map((item) => (
              <button
                id={`mobile-nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-space-tech uppercase tracking-widest text-left py-2 border-b ${
                  isBento ? 'border-zinc-800/10' : 'border-white/5'
                } ${activeSection === item.id ? themeVars.accentText : "text-neutral-400"}`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col space-y-4">
              {/* Desktop links inside mobile menu */}
              <div className="grid grid-cols-2 gap-3 pb-1">
                <a
                  id="mobile-phone-link-1"
                  href="tel:+919678419230"
                  className="flex items-center justify-center space-x-2 py-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:text-blue-300 font-space-tech font-bold text-[10px] uppercase tracking-wider rounded-lg"
                  title="Call +91 9678419230"
                >
                  <svg className="h-3.25 w-3.25 fill-current" viewBox="0 0 24 24">
                    <path d="M21.384 17.791l-3.75-1.622c-.443-.191-.955-.074-1.272.29l-1.623 1.833c-2.915-1.503-5.289-3.877-6.792-6.792l1.833-1.622c.364-.317.481-.829.29-1.272l-1.622-3.75c-.218-.506-.757-.811-1.307-.75l-4.5 1c-.815.181-1.384.935-1.294 1.77 1 8.91 8.09 16 17 17 .835.09 1.589-.479 1.77-1.294l1-4.5c.061-.55-.244-1.089-.75-1.307z"/>
                  </svg>
                  <span>DialLine 1</span>
                </a>
                <a
                  id="mobile-phone-link-2"
                  href="tel:+917002168761"
                  className="flex items-center justify-center space-x-2 py-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:text-cyan-300 font-space-tech font-bold text-[10px] uppercase tracking-wider rounded-lg"
                  title="Call +91 7002168761"
                >
                  <svg className="h-3.25 w-3.25 fill-current" viewBox="0 0 24 24">
                    <path d="M21.384 17.791l-3.75-1.622c-.443-.191-.955-.074-1.272.29l-1.623 1.833c-2.915-1.503-5.289-3.877-6.792-6.792l1.833-1.622c.364-.317.481-.829.29-1.272l-1.622-3.75c-.218-.506-.757-.811-1.307-.75l-4.5 1c-.815.181-1.384.935-1.294 1.77 1 8.91 8.09 16 17 17 .835.09 1.589-.479 1.77-1.294l1-4.5c.061-.55-.244-1.089-.75-1.307z"/>
                  </svg>
                  <span>DialLine 2</span>
                </a>
              </div>
              
              <a
                id="mobile-whatsapp-link"
                href="https://wa.me/919395167729"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-space-tech font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center space-x-2"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.66.986 3.298 1.448 5.355 1.449 5.546 0 10.061-4.515 10.064-10.063.003-2.687-1.043-5.212-2.948-7.119C17.215 1.516 14.7 1.47 12.01 1.47c-5.55 0-10.069 4.515-10.072 10.064-.001 2.016.523 3.69 1.523 5.3l-.995 3.628 3.73-.978h-.001zm10.582-7.858c-.3-.15-1.782-.879-2.057-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.79-1.492-1.77-1.667-2.07-.175-.3-.018-.463.13-.612.137-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52-.172-.007-.368-.009-.567-.009-.199 0-.523.074-.797.374-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.22 5.11 4.52 1.4.61 2.22.75 3.01.65.875-.11 1.782-.729 2.032-1.399.25-.67.25-1.24.175-1.399-.075-.15-.275-.25-.575-.4z"/>
                </svg>
                <span>WhatsApp (+91 9395167729)</span>
              </a>
              
              <a
                id="mobile-lets-talk-btn"
                href="mailto:royprajeet69@gmail.com?subject=Website/App%20Design%20Inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-3 rounded-lg text-sm font-space-tech font-bold uppercase tracking-widest ${
                  isBento ? 'bg-white text-black' : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black'
                }`}
              >
                Contact Us
              </a>
              <button
                id="mobile-admin-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full text-center py-3 rounded-lg text-xs font-space-tech font-bold uppercase tracking-widest text-neutral-400 bg-white/5 border border-white/10"
              >
                ADMIN WORKSPACE
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
