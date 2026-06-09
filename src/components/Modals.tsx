import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, Sparkles, CheckCircle, Award, Target, Terminal, ChevronRight } from "lucide-react";
import { CaseStudy, BlogPost, Booking, Service } from "../types";

// 1. LIGHTWEIGHT REGEX MARKDOWN PARSER FOR HIGH-PERFORMANCE RENDERING
function parseMarkdownToReact(text: string): React.ReactNode[] {
  if (!text) return [];
  const lines = text.split("\n");
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    
    // Header 1
    if (trimmed.startsWith("# ")) {
      return (
        <h1 key={idx} className="text-xl md:text-2xl font-heading-serif text-white font-bold mt-5 mb-3 border-b border-white/5 pb-2">
          {trimmed.slice(2)}
        </h1>
      );
    }
    
    // Header 2
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={idx} className="text-lg md:text-xl font-heading-serif text-amber-400 font-semibold mt-4 mb-2">
          {trimmed.slice(3)}
        </h2>
      );
    }
    
    // Header 3
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-xs font-space-tech text-white uppercase tracking-wider font-bold mt-3 mb-1">
          {trimmed.slice(4)}
        </h3>
      );
    }
    
    // Bullet lists
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const parts = trimmed.slice(2).split("**");
      return (
        <li key={idx} className="text-xs text-neutral-300 font-sans-ui ml-5 list-disc mb-1">
          {parts.map((p, i) => i % 2 !== 0 ? <strong key={i} className="text-white font-semibold">{p}</strong> : p)}
        </li>
      );
    }

    // Dividers
    if (trimmed === "---") {
      return <hr key={idx} className="my-5 border-white/5" />;
    }

    // Paragraph
    if (trimmed.length > 0) {
      const parts = trimmed.split("**");
      return (
        <p key={idx} className="text-xs text-neutral-400 font-sans-ui leading-relaxed mb-3">
          {parts.map((p, i) => i % 2 !== 0 ? <strong key={i} className="text-amber-300 font-semibold">{p}</strong> : p)}
        </p>
      );
    }

    // Spacing
    return <div key={idx} className="h-2" />;
  });
}

// 2. BOOKING MODAL
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onAddBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => void;
  preselectedServiceTitle?: string;
}

export function BookingModal({ isOpen, onClose, services, onAddBooking, preselectedServiceTitle }: BookingModalProps) {
  const [countryCode, setCountryCode] = useState("+91");
  const [rawPhone, setRawPhone] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: preselectedServiceTitle || services[0]?.title || "Website Designing",
    date: "",
    time: "",
    message: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCountryCode("+91");
      setRawPhone("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: preselectedServiceTitle || services[0]?.title || "Website Designing",
        date: "",
        time: "",
        message: ""
      });
    }
  }, [isOpen, preselectedServiceTitle, services]);

  const handlePhoneChange = (code: string, phoneNumber: string) => {
    setCountryCode(code);
    setRawPhone(phoneNumber);
    setFormData(prev => ({
      ...prev,
      phone: code ? `${code} ${phoneNumber}`.trim() : phoneNumber
    }));
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBooking(formData);
    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div id="booking-modal-box" className="w-full max-w-lg bg-[#0e0d11] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-amber-500 to-amber-600" />
        
        {isSuccess ? (
          <div id="booking-success-view" className="p-8 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-md font-space-tech font-bold uppercase tracking-widest text-white">Consolidated intake logged</h3>
              <p className="text-xs text-neutral-400 mt-1">Calendar slot and strategy briefing registered with executive dispatch.</p>
            </div>
            
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-left space-y-2 font-mono-code text-[11px] text-zinc-400 max-w-sm mx-auto">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Client:</span> <strong className="text-white">{formData.name}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Contact Phone:</span> <strong className="text-amber-400">{formData.phone}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Enterprise:</span> <strong className="text-white">{formData.company}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Specialization:</span> <strong className="text-amber-400">{formData.service}</strong>
              </div>
              <div className="flex justify-between">
                <span>Diagnostics:</span> <strong className="text-white">{formData.date} at {formData.time} (UTC)</strong>
              </div>
            </div>

            <button
              id="success-modal-close-btn"
              onClick={handleFinish}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-space-tech font-bold uppercase tracking-widest rounded-lg text-xs transition-colors cursor-pointer"
            >
              Back to Showroom
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-amber-400">Get In Touch</span>
                <h3 className="text-sm md:text-md font-space-tech font-bold uppercase tracking-widest text-white mt-1">Inquiry & Contact Desk</h3>
              </div>
              <button 
                id="close-booking-form"
                onClick={onClose} 
                className="p-1 text-zinc-400 hover:text-white bg-white/5 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Your Name</label>
                  <input
                    id="booking-form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Work Email</label>
                  <input
                    id="booking-form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Contact Number (All Countries)</label>
                  <div className="flex space-x-1">
                    <select
                      id="booking-form-country-code"
                      value={countryCode}
                      onChange={(e) => handlePhoneChange(e.target.value, rawPhone)}
                      className="bg-black/40 border border-white/10 rounded-lg px-1.5 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500 font-mono-code w-[74px] shrink-0 cursor-pointer"
                    >
                      <option value="+91" className="bg-[#0e0d11]">🇮🇳 +91</option>
                      <option value="+1" className="bg-[#0e0d11]">🇺🇸 +1</option>
                      <option value="+44" className="bg-[#0e0d11]">🇬🇧 +44</option>
                      <option value="+65" className="bg-[#0e0d11]">🇸🇬 +65</option>
                      <option value="+61" className="bg-[#0e0d11]">🇦🇺 +61</option>
                      <option value="+49" className="bg-[#0e0d11]">🇩🇪 +49</option>
                      <option value="+971" className="bg-[#0e0d11]">🇦🇪 +971</option>
                      <option value="+81" className="bg-[#0e0d11]">🇯🇵 +81</option>
                      <option value="+33" className="bg-[#0e0d11]">🇫🇷 +33</option>
                      <option value="" className="bg-[#0e0d11]">Other</option>
                    </select>
                    <input
                      id="booking-form-phone"
                      type="tel"
                      required
                      value={rawPhone}
                      onChange={(e) => handlePhoneChange(countryCode, e.target.value)}
                      placeholder="X X X X X X"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono-code"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Company Name</label>
                  <input
                    id="booking-form-company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Enterprise LLC"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Core Interest</label>
                <select
                  id="booking-form-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Target Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                    <input
                      id="booking-form-date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-amber-500 font-mono-code"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Time Window</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                    <input
                      id="booking-form-time"
                      type="text"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g. 10:30"
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono-code"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Project Goals & Insights</label>
                <textarea
                  id="booking-form-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline budget, speed thresholds, or branding directions..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                id="submit-booking-form-btn"
                type="submit"
                className="w-full py-3 rounded-lg text-xs font-space-tech font-bold uppercase tracking-widest bg-gradient-to-r from-amber-500 to-amber-600 text-black flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-500/5 hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Transmit Secured Brief</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. CASE STUDY MODAL
interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export function CaseStudyModal({ isOpen, onClose, caseStudy }: CaseStudyModalProps) {
  if (!isOpen || !caseStudy) return null;

  return (
    <div id="case-modal-overlay" className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div id="case-modal-box" className="w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden relative my-8">
        
        {/* BANNER / BACKGROUND PRESTIGE ACCENT */}
        <div className={`h-48 ${caseStudy.imageTheme} relative flex flex-col justify-end p-6 md:p-8`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
          <button 
            id="close-case-modal"
            onClick={onClose} 
            className="absolute top-4 right-4 p-1.5 text-white bg-black/50 backdrop-blur-md hover:bg-black/80 rounded-full border border-white/10"
          >
            <X className="h-4.5 w-4.5" />
          </button>
          
          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-mono-code uppercase tracking-widest text-amber-400 bg-black/40 border border-white/5 px-2.5 py-1 rounded-full">{caseStudy.category}</span>
            <h3 className="text-md md:text-lg font-space-tech font-bold uppercase tracking-widest text-white mt-1.5">{caseStudy.client}</h3>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="bg-gradient-to-r from-stone-900 via-neutral-900 to-amber-950/20 px-6 md:px-8 py-5 border-b border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-xl md:text-3xl font-heading-serif font-black text-amber-400 tracking-tight">{caseStudy.metric}</div>
            <div className="text-[10px] font-mono-code uppercase text-neutral-400 tracking-wider font-bold">{caseStudy.metricLabel}</div>
          </div>
          <Award className="h-5 w-5 text-amber-500/60" />
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-8 space-y-6">
          <h4 className="text-xs md:text-sm font-space-tech font-semibold uppercase tracking-wider text-white">Full Sourcing Diagnostic</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-white/5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-code text-zinc-500 uppercase flex items-center"><Target className="h-3 w-3 mr-1 text-red-400" /> Executive Challenge</span>
              <p className="text-[11px] text-neutral-400 font-sans-ui leading-relaxed">{caseStudy.challenge}</p>
            </div>
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono-code text-zinc-500 uppercase flex items-center"><Terminal className="h-3 w-3 mr-1 text-amber-400" /> Digital Architecture deployment</span>
              <p className="text-[11px] text-neutral-400 font-sans-ui leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono-code text-amber-400 uppercase tracking-widest block font-bold">Quantified Business Transformations</span>
            <div className="space-y-2">
              {caseStudy.results.map((r, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-[11px] font-sans-ui text-neutral-300">
                  <ChevronRight className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              id="case-study-close-btn"
              onClick={onClose}
              className="px-5 py-2 hover:bg-white/5 border border-white/10 text-white rounded-lg text-xs font-space-tech uppercase tracking-wider transition-colors cursor-pointer"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. BLOG DETAILS MODAL
interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: BlogPost | null;
}

export function BlogModal({ isOpen, onClose, blog }: BlogModalProps) {
  if (!isOpen || !blog) return null;

  return (
    <div id="blog-modal-overlay" className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div id="blog-modal-box" className="w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden relative my-8">
        
        {/* CLOSER */}
        <button 
          id="close-blog-modal"
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/5 z-20"
        >
          <X className="h-4.1 w-4.5" />
        </button>

        {/* GLOWING AMBIENCE */}
        <div className="absolute top-0 right-1/4 h-32 w-48 bg-amber-500/5 filter blur-3xl rounded-full" />

        <div className="p-6 md:p-8 space-y-4 pt-10">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono-code text-amber-400 uppercase tracking-widest">
              <span>{blog.category}</span>
              <span>•</span>
              <span className="text-zinc-500">{blog.readTime}</span>
            </div>
            
            <h2 className="text-md md:text-xl font-heading-serif font-black tracking-tight text-white leading-tight">
              {blog.title}
            </h2>
          </div>

          <div className="text-[10px] font-mono-code text-zinc-500 border-b border-t border-white/5 py-2.5 flex justify-between items-center bg-black/15 px-3 rounded">
            <span>Author: <strong className="text-white">{blog.author}</strong></span>
            <span>Published: <strong className="text-stone-300">{blog.date}</strong></span>
          </div>

          {/* PARSED MARKDOWN BODY */}
          <div id="parsed-blog-body" className="markdown-body text-xs text-neutral-400 space-y-1 pr-1 max-h-[420px] overflow-y-auto pt-2">
            {parseMarkdownToReact(blog.content)}
          </div>

          <div className="flex justify-end pt-4 border-t border-white/5">
            <button
              id="article-read-close-btn"
              onClick={onClose}
              className="px-5 py-2 bg-gradient-to-r from-stone-900 to-neutral-900 hover:from-stone-800 text-white rounded-lg text-xs font-space-tech uppercase tracking-wider border border-white/10 cursor-pointer"
            >
              Finish Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
