import React, { useState } from "react";
import { 
  X, Sliders, Layout, Workflow, BookOpen, UserCheck, 
  Sparkles, Trash2, Plus, Check, RefreshCw, AlertTriangle, 
  Search, Palette, BrainCircuit, Compass, LineChart, FileText, Award, Eye,
  Smartphone
} from "lucide-react";
import { BrandingOptions, Service, CaseStudy, BlogPost, Booking, SEOConfig } from "../types";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  branding: BrandingOptions;
  setBranding: React.Dispatch<React.SetStateAction<BrandingOptions>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  caseStudies: CaseStudy[];
  setCaseStudies: React.Dispatch<React.SetStateAction<CaseStudy[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  seo: SEOConfig;
  setSeo: React.Dispatch<React.SetStateAction<SEOConfig>>;
}

export default function AdminPanel({
  isOpen,
  onClose,
  branding,
  setBranding,
  services,
  setServices,
  caseStudies,
  setCaseStudies,
  blogs,
  setBlogs,
  bookings,
  setBookings,
  seo,
  setSeo,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"branding" | "services" | "cms" | "bookings" | "seo">("bookings");
  const [cmsSubTab, setCmsSubTab] = useState<"blogs" | "cases">("blogs");

  // Booking details/message viewer
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // New Service state
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    iconName: "BrainCircuit",
    bullets: ""
  });

  // New Case Study state
  const [newCase, setNewCase] = useState({
    client: "",
    title: "",
    category: "Branding & Web Design",
    metric: "",
    metricLabel: "",
    challenge: "",
    solution: "",
    results: ""
  });

  // Blog states
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    category: "Website Designing",
    readTime: "5 min read",
    author: "Pallab Jyoti Das",
    content: ""
  });

  // Blog Generator State
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState("expert");
  const [aiGenMuted, setAiGenMuted] = useState(false);
  const [aiGenError, setAiGenError] = useState("");

  // SEO Optimizer states
  const [seoAuditing, setSeoAuditing] = useState(false);
  const [aiSeoResult, setAiSeoResult] = useState<any | null>(null);

  // Quick Demo Code logic
  const [isUnlocked, setIsUnlocked] = useState(true); // Default immediate enter for smooth validation

  if (!isOpen) return null;

  // AI BLOG DRAFTER CALL
  const handleGenerateBlogWithAI = async () => {
    if (!aiTopic) {
      setAiGenError("Please supply a topic or keyword map for Gemini.");
      return;
    }
    setAiGenMuted(true);
    setAiGenError("");

    try {
      const response = await fetch("/api/ai/write-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          category: newBlog.category,
          tone: aiTone,
          toneDetails: "Focus heavily on actionable outcomes."
        })
      });

      const data = await response.json();
      if (response.ok && data.article) {
        // Extract a title from content or fallback
        const titleMatch = data.article.match(/^# (.*?)\n/m) || data.article.match(/Title: (.*?)\n/i);
        const extractedTitle = titleMatch ? titleMatch[1] : `Advanced Insights on ${aiTopic}`;
        
        // Extract paragraph hook for excerpt
        const lines = data.article.split("\n").filter((l: string) => l.trim().length > 20);
        const hookText = lines[1] || `Discover how implementing proper ${aiTopic} mitigates operational friction and scales conversion pipeline rates.`;

        setNewBlog({
          ...newBlog,
          title: extractedTitle,
          excerpt: hookText.slice(0, 150) + "...",
          content: data.article
        });
      } else {
        setAiGenError(data.error || "Failed to contact copywriting models.");
      }
    } catch (err: any) {
      setAiGenError(err.message || "Network request failed. Make sure your server is running.");
    } finally {
      setAiGenMuted(false);
    }
  };

  // AI SEO SUGGESTIONS
  const handleAiSeoOptimise = async () => {
    setSeoAuditing(true);
    setAiSeoResult(null);

    try {
      const response = await fetch("/api/ai/seo-optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: seo.title,
          description: seo.description,
          services: services.map(s => s.title),
          theme: branding.themeName
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAiSeoResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSeoAuditing(false);
    }
  };

  const handleApplySeoRecommendations = () => {
    if (aiSeoResult) {
      setSeo({
        title: aiSeoResult.optimizedTitle || seo.title,
        description: aiSeoResult.optimizedDescription || seo.description,
        keywords: aiSeoResult.keywords || seo.keywords,
        tips: aiSeoResult.conversionTips || seo.tips
      });
      setAiSeoResult(null);
    }
  };

  // Preset design choices
  const handleThemePreset = (preset: string) => {
    switch (preset) {
      case "premium-dark":
        setBranding(prev => ({
          ...prev,
          themeName: "premium-dark",
          accentColor: "from-amber-400 to-amber-600",
          glowColor: "rgba(215, 175, 55, 0.12)"
        }));
        break;
      case "emerald-noir":
        setBranding(prev => ({
          ...prev,
          themeName: "emerald-noir",
          accentColor: "from-emerald-400 to-teal-600",
          glowColor: "rgba(16, 185, 129, 0.12)"
        }));
        break;
      case "royal-indigo":
        setBranding(prev => ({
          ...prev,
          themeName: "royal-indigo",
          accentColor: "from-violet-500 to-indigo-600",
          glowColor: "rgba(139, 92, 246, 0.12)"
        }));
        break;
      case "arctic-silver":
        setBranding(prev => ({
          ...prev,
          themeName: "arctic-silver",
          accentColor: "from-slate-200 to-neutral-400",
          glowColor: "rgba(244, 244, 245, 0.08)"
        }));
        break;
      case "bento-blue":
        setBranding(prev => ({
          ...prev,
          themeName: "bento-blue",
          accentColor: "from-blue-600 to-indigo-600",
          glowColor: "rgba(37, 99, 235, 0.12)",
          fontHeading: "font-space-tech tracking-wider",
          fontBody: "font-sans-ui"
        }));
        break;
    }
  };

  // Add Service Form Action
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title || !newService.description) return;
    
    const serviceObj: Service = {
      id: `serv-${Date.now()}`,
      title: newService.title,
      description: newService.description,
      detailedDescription: newService.detailedDescription || newService.description,
      iconName: newService.iconName,
      bullets: newService.bullets ? newService.bullets.split(",").map(b => b.trim()) : ["Premium Execution Accord", "Continuous Maintenance"]
    };

    setServices([...services, serviceObj]);
    setNewService({ title: "", description: "", detailedDescription: "", iconName: "BrainCircuit", bullets: "" });
  };

  // Delete Service
  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  // Add Case Study Action
  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.client || !newCase.title || !newCase.metric) return;

    const caseObj: CaseStudy = {
      id: `case-${Date.now()}`,
      client: newCase.client,
      title: newCase.title,
      category: newCase.category,
      imageTheme: "bg-gradient-to-tr from-stone-900 via-neutral-900 to-amber-950/40",
      metric: newCase.metric,
      metricLabel: newCase.metricLabel || "Metric Improvement",
      challenge: newCase.challenge || "The client lacked bespoke operational pipelines, standard templates failing client conversions.",
      solution: newCase.solution || "Formulated beautiful, lightning fast, full-stack website experiences alongside our analytics pipelines.",
      results: newCase.results ? newCase.results.split("\n").filter(r => r.length > 3) : ["310% traffic increase", "Web Vitals optimized to 100/100"]
    };

    setCaseStudies([...caseStudies, caseObj]);
    setNewCase({ client: "", title: "", category: "Branding & Web Design", metric: "", metricLabel: "", challenge: "", solution: "", results: "" });
  };

  // Delete Case
  const handleDeleteCase = (id: string) => {
    setCaseStudies(caseStudies.filter(c => c.id !== id));
  };

  // Add Blog Action
  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) return;

    const blogObj: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newBlog.title,
      excerpt: newBlog.excerpt || "Fresh insights and strategies built from contemporary conversion research.",
      category: newBlog.category,
      readTime: newBlog.readTime,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: newBlog.author,
      content: newBlog.content
    };

    setBlogs([blogObj, ...blogs]);
    setNewBlog({ title: "", excerpt: "", category: "Website Designing", readTime: "5 min read", author: "Pallab Jyoti Das", content: "" });
    setAiTopic("");
  };

  // Delete Blog
  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  // Toggle Booking status
  const toggleBookingStatus = (id: string) => {
    setBookings(bookings.map(b => {
      if (b.id === id) {
        const nextStatus: "new" | "contacted" | "archived" = 
          b.status === "new" ? "contacted" : b.status === "contacted" ? "archived" : "new";
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  // Delete Booking
  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
    if (selectedBooking?.id === id) setSelectedBooking(null);
  };

  return (
    <div 
      id="admin-dashboard-container"
      className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/95 backdrop-blur-md flex justify-end animate-in fade-in duration-300"
    >
      <div 
        id="admin-panel-board"
        className="w-full max-w-5xl bg-[#0a0a0c] border-l border-white/10 h-full flex flex-col shadow-2xl relative"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-black/40">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-space-tech font-bold uppercase tracking-widest text-white flex items-center space-x-2">
                <span>Agency CMS Dashboard</span>
                <span className="text-[9px] bg-amber-500/25 text-amber-300 px-1.5 py-0.5 rounded ml-2">Demo Unlock</span>
              </h2>
              <p className="text-[10px] font-mono-code text-neutral-400 uppercase mt-0.5">Control visual state, booking intake, and AI assistants</p>
            </div>
          </div>
          <button 
            id="close-admin-btn"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SIDE BAR / NAV TABS */}
        <div className="flex flex-1 overflow-hidden">
          <div className="w-48 bg-black/20 border-r border-white/5 flex flex-col justify-between py-4">
            <div className="space-y-1 px-2">
              <button
                id="tab-bookings"
                onClick={() => setActiveTab("bookings")}
                className={`w-full flex items-center space-x-2 text-xs font-space-tech uppercase tracking-wider px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === "bookings" 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Leads ({bookings.length})</span>
              </button>

              <button
                id="tab-branding"
                onClick={() => setActiveTab("branding")}
                className={`w-full flex items-center space-x-2 text-xs font-space-tech uppercase tracking-wider px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === "branding" 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Layout className="h-3.5 w-3.5" />
                <span>Page Layout</span>
              </button>

              <button
                id="tab-services"
                onClick={() => setActiveTab("services")}
                className={`w-full flex items-center space-x-2 text-xs font-space-tech uppercase tracking-wider px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === "services" 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Workflow className="h-3.5 w-3.5" />
                <span>Services ({services.length})</span>
              </button>

              <button
                id="tab-cms"
                onClick={() => setActiveTab("cms")}
                className={`w-full flex items-center space-x-2 text-xs font-space-tech uppercase tracking-wider px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === "cms" 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Insights & Work</span>
              </button>

              <button
                id="tab-seo"
                onClick={() => setActiveTab("seo")}
                className={`w-full flex items-center space-x-2 text-xs font-space-tech uppercase tracking-wider px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === "seo" 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>SEO Optimizer</span>
              </button>
            </div>

            <div className="px-4 text-[10px] font-mono-code text-neutral-500 border-t border-white/5 pt-4">
              <span>Local Storage Saved</span>
              <div className="h-1 w-full bg-emerald-500/20 rounded mt-1 overflow-hidden">
                <div className="h-full bg-emerald-500 w-full" />
              </div>
            </div>
          </div>

          {/* MAIN FORM GRID CONTAINER */}
          <div className="flex-1 overflow-y-auto p-6 bg-black/10">
            {/* TAB: LEADS & TELEMETRY */}
            {activeTab === "bookings" && (
              <div id="bookings-management-section" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-space-tech uppercase tracking-widest text-white">Client Intake Telemetry</h3>
                    <p className="text-xs text-neutral-400">Manage real incoming leads, messages, and selected scheduling services</p>
                  </div>
                  <span className="text-[10px] font-mono-code bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-1 rounded">
                    Total: {bookings.length}
                  </span>
                </div>

                {bookings.length === 0 ? (
                  <div className="border border-dashed border-white/5 rounded-xl p-12 text-center">
                    <UserCheck className="h-8 w-8 text-neutral-600 mx-auto mb-3" />
                    <p className="text-xs font-mono-code text-neutral-400">No telemetry recorded yet. Submit the contact scheduler on the dynamic frontend!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {bookings.map((b) => (
                      <div 
                        id={`booking-card-${b.id}`}
                        key={b.id} 
                        className="bg-[#0e0e11] border border-white/5 hover:border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-space-tech font-bold text-white">{b.name}</span>
                            <span className="text-[10px] font-mono-code text-neutral-400">({b.company})</span>
                            <span className={`text-[9px] font-mono-code px-2 py-0.5 rounded-full ${
                              b.status === "new" 
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                                : b.status === "contacted"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-neutral-800 text-neutral-400"
                            }`}>
                              {b.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono-code flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span>Phone: <strong className="text-amber-300">{b.phone}</strong></span>
                            <span>| Email: <strong className="text-white">{b.email}</strong></span>
                            <span>| Interest: <strong className="text-amber-400">{b.service}</strong></span>
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono-code flex items-center space-x-3">
                            <span>Appt: <strong className="text-white">{b.date}</strong> at <strong className="text-white">{b.time}</strong></span>
                            <span className="text-stone-500">Intake {new Date(b.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            id={`view-booking-${b.id}`}
                            onClick={() => setSelectedBooking(b)}
                            className="text-[10px] font-space-tech uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Read Brief
                          </button>
                          <button
                            id={`status-booking-${b.id}`}
                            onClick={() => toggleBookingStatus(b.id)}
                            className="p-1.5 text-neutral-400 hover:text-white bg-white/5 rounded-lg"
                            title="Toggle Status (New -> Contacted -> Archived)"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                          <button
                            id={`delete-booking-${b.id}`}
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-1.5 text-red-400/85 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-lg"
                            title="Delete Lead Entry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MODAL / BOTTOM SLIDE IN BRIEF VIEW */}
                {selectedBooking && (
                  <div id="booking-msg-reader" className="bg-[#111116] border border-amber-500/20 rounded-xl p-5 mt-4 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-600" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-mono-code uppercase text-amber-400">Qualified Client Intake Brief</h4>
                        <p className="text-sm font-space-tech font-bold text-white uppercase mt-0.5">{selectedBooking.name} x Dynamic Webs</p>
                      </div>
                      <button 
                        onClick={() => setSelectedBooking(null)}
                        className="text-xs text-neutral-400 hover:text-white"
                      >
                        [Close]
                      </button>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 font-mono-code text-xs text-neutral-300 space-y-2 whitespace-pre-line border border-white/5">
                      <div className="text-[11px] text-neutral-400 flex flex-wrap gap-4 border-b border-white/5 pb-2 mb-2">
                        <span>Phone: <strong className="text-amber-300">{selectedBooking.phone}</strong></span>
                        <span>Email: <strong className="text-white">{selectedBooking.email}</strong></span>
                        <span>Company: <strong className="text-white">{selectedBooking.company}</strong></span>
                        <span>Interest: <strong className="text-amber-400">{selectedBooking.service}</strong></span>
                      </div>
                      <strong>Client Statement:</strong>
                      <p className="not-italic text-stone-300">"{selectedBooking.message || "No custom message provided."}"</p>
                    </div>
                    <div className="text-[10px] font-mono-code text-zinc-500 flex justify-between">
                      <span>Submitted: {new Date(selectedBooking.createdAt).toLocaleString()}</span>
                      <span>Unique ID: {selectedBooking.id}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: BRANDING OPTIONS */}
            {activeTab === "branding" && (
              <div id="branding-cms-section" className="space-y-6">
                <div>
                  <h3 className="text-sm font-space-tech uppercase tracking-widest text-white">Visual Design & Preset Options</h3>
                  <p className="text-xs text-neutral-400">Instantly change brand identity themes, layout settings, custom fonts, and texts</p>
                </div>

                {/* Brand Selector row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <button
                    id="preset-bento-blue"
                    onClick={() => handleThemePreset("bento-blue")}
                    className={`p-3 rounded-xl border text-left space-y-1 cursor-pointer transition-all ${
                      branding.themeName === "bento-blue" 
                        ? "bg-[#0d0d11] border-blue-500/50 shadow-lg shadow-blue-500/5 text-white" 
                        : "bg-neutral-900/40 border-white/5 hover:border-white/10 text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code font-bold uppercase">Bento Blue</span>
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                    <p className="text-[9px] text-stone-500">Premium Bento layout theme styled with neon blue elements</p>
                  </button>

                  <button
                    id="preset-premium-dark"
                    onClick={() => handleThemePreset("premium-dark")}
                    className={`p-3 rounded-xl border text-left space-y-1 cursor-pointer transition-all ${
                      branding.themeName === "premium-dark" 
                        ? "bg-[#0d0d11] border-amber-500/50 shadow-lg shadow-amber-500/5 text-white" 
                        : "bg-neutral-900/40 border-white/5 hover:border-white/10 text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code font-bold uppercase">Prestige Gold</span>
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                    </div>
                    <p className="text-[9px] text-stone-500">Luxury gold metallics, elegant, high-contrast black slate</p>
                  </button>

                  <button
                    id="preset-emerald-noir"
                    onClick={() => handleThemePreset("emerald-noir")}
                    className={`p-3 rounded-xl border text-left space-y-1 cursor-pointer transition-all ${
                      branding.themeName === "emerald-noir" 
                        ? "bg-[#0d0d11] border-emerald-500/50 shadow-lg shadow-emerald-500/5 text-white" 
                        : "bg-neutral-900/40 border-white/5 hover:border-white/10 text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code font-bold uppercase">Cyber Emerald</span>
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[9px] text-stone-500">Smart matrix design, digital tech aesthetics</p>
                  </button>

                  <button
                    id="preset-royal-indigo"
                    onClick={() => handleThemePreset("royal-indigo")}
                    className={`p-3 rounded-xl border text-left space-y-1 cursor-pointer transition-all ${
                      branding.themeName === "royal-indigo" 
                        ? "bg-[#0d0d11] border-violet-500/50 shadow-lg shadow-violet-500/5 text-white" 
                        : "bg-neutral-900/40 border-white/5 hover:border-white/10 text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code font-bold uppercase">Royal Violet</span>
                      <div className="h-2 w-2 rounded-full bg-violet-500" />
                    </div>
                    <p className="text-[9px] text-stone-500">Intelligent luxury violet grids, futuristic mood</p>
                  </button>

                  <button
                    id="preset-arctic-silver"
                    onClick={() => handleThemePreset("arctic-silver")}
                    className={`p-3 rounded-xl border text-left space-y-1 cursor-pointer transition-all ${
                      branding.themeName === "arctic-silver" 
                        ? "bg-[#0d0d11] border-neutral-400/50 shadow-lg shadow-neutral-400/5 text-white" 
                        : "bg-neutral-900/40 border-white/5 hover:border-white/10 text-neutral-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code font-bold uppercase">Arctic Silver</span>
                      <div className="h-2 w-2 rounded-full bg-neutral-300" />
                    </div>
                    <p className="text-[9px] text-stone-500">Chilled high-contrast whites and modern slate</p>
                  </button>
                </div>

                {/* Edit Text blocks */}
                <div className="bg-[#0e0e11] border border-white/5 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-mono-code uppercase text-amber-400">Core Content Editor</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono-code uppercase text-neutral-400">Studio Logo Text</label>
                      <input
                        id="branding-logoText-input"
                        type="text"
                        value={branding.logoText}
                        onChange={(e) => setBranding({ ...branding, logoText: e.target.value.toUpperCase() })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono-code text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono-code uppercase text-neutral-400">CTA Button Label</label>
                      <input
                        id="branding-heroCTAText-input"
                        type="text"
                        value={branding.heroCTAText}
                        onChange={(e) => setBranding({ ...branding, heroCTAText: e.target.value.toUpperCase() })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono-code text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono-code uppercase text-neutral-400">Bold Positioning Headline (Hero)</label>
                    <textarea
                      id="branding-heroTitle-input"
                      rows={2}
                      value={branding.heroTitle}
                      onChange={(e) => setBranding({ ...branding, heroTitle: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono-code uppercase text-neutral-400">Conversion Subtitle (Value Proposition)</label>
                    <textarea
                      id="branding-heroSubtitle-input"
                      rows={3}
                      value={branding.heroSubtitle}
                      onChange={(e) => setBranding({ ...branding, heroSubtitle: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="border-t border-white/5 pt-4 space-y-4">
                    <h5 className="text-[10px] font-mono-code uppercase text-amber-500">About Studio CMS</h5>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono-code uppercase text-neutral-400 font-bold">Main Studio Paragraph</label>
                      <textarea
                        id="branding-aboutText-input"
                        rows={4}
                        value={branding.aboutText}
                        onChange={(e) => setBranding({ ...branding, aboutText: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono-code uppercase text-neutral-400 font-bold">Director's Bold Statement Quote</label>
                      <textarea
                        id="branding-aboutQuote-input"
                        rows={3}
                        value={branding.aboutQuote}
                        onChange={(e) => setBranding({ ...branding, aboutQuote: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === "services" && (
              <div id="services-cms-section" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-space-tech uppercase tracking-widest text-white">Services Configuration</h3>
                    <p className="text-xs text-neutral-400">Organize core solutions, write sales narratives, and assign icons</p>
                  </div>
                  <span className="text-[10px] font-mono-code bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded">
                    Total: {services.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Current Services list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono-code uppercase text-neutral-400 font-bold">Live Solutions</h4>
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                      {services.map(s => (
                        <div 
                          id={`service-cms-card-${s.id}`}
                          key={s.id} 
                          className="bg-[#0e0e11] border border-white/5 rounded-xl p-3 flex justify-between items-center"
                        >
                          <div className="space-y-0.5">
                            <span className="text-xs font-space-tech font-bold text-white flex items-center space-x-1.5">
                              {s.title}
                            </span>
                            <p className="text-[10px] text-neutral-400 truncate max-w-[280px]">{s.description}</p>
                          </div>
                          <button
                            id={`delete-service-${s.id}`}
                            onClick={() => handleDeleteService(s.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-lg"
                            title="Delete Service"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Service form */}
                  <div className="bg-[#0e0e11] border border-white/5 rounded-xl p-5">
                    <h4 className="text-xs font-mono-code uppercase text-amber-400 mb-3">Add Custom Solution</h4>
                    <form onSubmit={handleAddService} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono-code uppercase text-neutral-400">Title</label>
                        <input
                          id="service-title-input"
                          type="text"
                          required
                          value={newService.title}
                          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                          placeholder="e.g. Conversion SEO Optimization"
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono-code uppercase text-neutral-400">Brief Overview Hook</label>
                        <input
                          id="service-desc-input"
                          type="text"
                          required
                          value={newService.description}
                          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                          placeholder="Brief 1-sentence value hook."
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono-code uppercase text-neutral-400">Detailed Sourcing Narratives</label>
                        <textarea
                          id="service-details-input"
                          rows={2}
                          value={newService.detailedDescription}
                          onChange={(e) => setNewService({ ...newService, detailedDescription: e.target.value })}
                          placeholder="Full technical solutions brief..."
                          className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400">Design Motif / Icon</label>
                          <select
                            id="service-icon-select"
                            value={newService.iconName}
                            onChange={(e) => setNewService({ ...newService, iconName: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
                          >
                            <option value="BrainCircuit">Psychology / Brain</option>
                            <option value="Palette">Creative Palette</option>
                            <option value="Workflow">Automation Workflow</option>
                            <option value="Compass">Elite Consulting</option>
                            <option value="LineChart">Conversion Performance</option>
                            <option value="Smartphone">App Design</option>
                            <option value="Sparkles">Brand Enhancement</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400">Bullets (Comma Separated)</label>
                          <input
                            id="service-bullets-input"
                            type="text"
                            value={newService.bullets}
                            onChange={(e) => setNewService({ ...newService, bullets: e.target.value })}
                            placeholder="Bullet A, Bullet B"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      <button
                        id="submit-service-btn"
                        type="submit"
                        className="w-full mt-2 py-2 rounded-lg text-xs font-space-tech font-bold uppercase tracking-widest bg-gradient-to-r from-amber-500 to-amber-600 text-black flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Deploy Solution</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CMS CONTROLS (BLOGS AND CASE STUDIES) */}
            {activeTab === "cms" && (
              <div id="cms-tab-section" className="space-y-6">
                {/* Switch subtabs */}
                <div className="flex border-b border-white/5 space-x-4">
                  <button
                    id="subtab-blogs"
                    onClick={() => setCmsSubTab("blogs")}
                    className={`pb-2 text-xs font-space-tech uppercase tracking-widest border-b-2 transition-all ${
                      cmsSubTab === "blogs" 
                        ? "border-amber-500 text-white font-bold" 
                        : "border-transparent text-neutral-500 hover:text-white"
                    }`}
                  >
                    Blog & Insights
                  </button>
                  <button
                    id="subtab-cases"
                    onClick={() => setCmsSubTab("cases")}
                    className={`pb-2 text-xs font-space-tech uppercase tracking-widest border-b-2 transition-all ${
                      cmsSubTab === "cases" 
                        ? "border-amber-500 text-white font-bold" 
                        : "border-transparent text-neutral-500 hover:text-white"
                    }`}
                  >
                    Case Studies & Results
                  </button>
                </div>

                {cmsSubTab === "blogs" ? (
                  <div id="blog-cms-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* List active insights */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono-code uppercase text-neutral-400 font-bold">Published Articles</h4>
                      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                        {blogs.map(b => (
                          <div 
                            id={`blog-cms-card-${b.id}`}
                            key={b.id} 
                            className="bg-[#0e0e11] border border-white/5 rounded-xl p-3 flex justify-between items-center"
                          >
                            <div className="space-y-0.5">
                              <span className="text-xs font-space-tech font-bold text-white block truncate max-w-[260px]">
                                {b.title}
                              </span>
                              <div className="text-[10px] font-mono-code text-zinc-500 flex items-center space-x-2">
                                <span>{b.category}</span>
                                <span>•</span>
                                <span>{b.date}</span>
                              </div>
                            </div>
                            <button
                              id={`delete-blog-${b.id}`}
                              onClick={() => handleDeleteBlog(b.id)}
                              className="p-1.5 text-zinc-400 hover:text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Blog draft creation */}
                    <div className="bg-[#0e0e11] border border-white/5 rounded-xl p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-mono-code uppercase text-amber-400">Insight Publisher</h4>
                        <span className="text-[9px] font-mono-code text-stone-500 uppercase">Interactive writing</span>
                      </div>

                      {/* AI GEMINI CO-WRITER BLOCK */}
                      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 space-y-2.5">
                        <div className="flex items-center space-x-1.5 text-amber-400">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span className="text-[10px] font-space-tech uppercase tracking-widest font-bold">Gemini AI Co-Writer Assistant</span>
                        </div>
                        <p className="text-[9px] text-zinc-400">Enter a target article keyword, outline topic, or marketing trend below. Gemini will design an exceptional complete blog structure instantly!</p>
                        
                        <div className="flex space-x-2">
                          <input
                            id="ai-topic-input"
                            type="text"
                            value={aiTopic}
                            onChange={(e) => setAiTopic(e.target.value)}
                            placeholder="e.g. Neuromarketing landing triggers or B2B SaaS automation pipelines"
                            className="flex-1 bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                          <button
                            id="ai-write-blog-btn"
                            type="button"
                            onClick={handleGenerateBlogWithAI}
                            disabled={aiGenMuted}
                            className="bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-space-tech px-3 py-1.5 rounded-lg uppercase tracking-wider font-bold transition-all disabled:opacity-40 select-none cursor-pointer flex items-center space-x-1"
                          >
                            {aiGenMuted ? "Writing..." : "AI Write"}
                          </button>
                        </div>
                        {aiGenError && <p className="text-[9px] font-mono-code text-red-400">⚠️ {aiGenError}</p>}
                      </div>

                      {/* PUBLISH EDITOR FORM */}
                      <form onSubmit={handleAddBlog} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono-code uppercase text-neutral-400">Category Tag</label>
                            <input
                              id="blog-category-input"
                              type="text"
                              value={newBlog.category}
                              onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono-code uppercase text-neutral-400">Reading Time estimate</label>
                            <input
                              id="blog-readTime-input"
                              type="text"
                              value={newBlog.readTime}
                              onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400">Article Title</label>
                          <input
                            id="blog-title-input"
                            type="text"
                            required
                            value={newBlog.title}
                            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                            placeholder="Exquisite SEO Optimized Title"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400">Excerpt Summary</label>
                          <input
                            id="blog-excerpt-input"
                            type="text"
                            value={newBlog.excerpt}
                            onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                            placeholder="Brief search overview hooks..."
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400 font-bold">Body Content (Supports Markdown)</label>
                          <textarea
                            id="blog-content-input"
                            rows={4}
                            required
                            value={newBlog.content}
                            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                            placeholder="Write insights here or use the Gemini AI co-writer above."
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-neutral-100 focus:outline-none font-mono-code"
                          />
                        </div>

                        <button
                          id="submit-blog-btn"
                          type="submit"
                          className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg text-xs font-space-tech font-bold uppercase tracking-widest transition-all cursor-pointer"
                        >
                          Publish to Insights Grid
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div id="case-studies-cms-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* List active case studies */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono-code uppercase text-neutral-400 font-bold">Live Selected Projects</h4>
                      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                        {caseStudies.map(c => (
                          <div 
                            id={`case-cms-card-${c.id}`}
                            key={c.id} 
                            className="bg-[#0e0e11] border border-white/5 rounded-xl p-3 flex justify-between items-center"
                          >
                            <div className="space-y-0.5">
                              <span className="text-xs font-space-tech font-bold text-white block">
                                {c.client}
                              </span>
                              <p className="text-[10px] text-amber-400 font-mono-code">{c.metric} Improvement</p>
                            </div>
                            <button
                              id={`delete-case-${c.id}`}
                              onClick={() => handleDeleteCase(c.id)}
                              className="p-1.5 text-zinc-400 hover:text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Case study creation form */}
                    <div className="bg-[#0e0e11] border border-white/5 rounded-xl p-4">
                      <h4 className="text-xs font-mono-code uppercase text-amber-400 mb-3">Deploy Project Case Study</h4>
                      <form onSubmit={handleAddCase} className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono-code uppercase text-neutral-400">Client Name</label>
                            <input
                              id="case-client-input"
                              type="text"
                              required
                              value={newCase.client}
                              onChange={(e) => setNewCase({ ...newCase, client: e.target.value })}
                              placeholder="e.g. Vance Capital"
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono-code uppercase text-neutral-400">Service Area</label>
                            <input
                              id="case-category-input"
                              type="text"
                              required
                              value={newCase.category}
                              onChange={(e) => setNewCase({ ...newCase, category: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400">Case Study Title</label>
                          <input
                            id="case-title-input"
                            type="text"
                            required
                            value={newCase.title}
                            onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                            placeholder="e.g. Redesigning high-prestige assets"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono-code uppercase text-neutral-400 font-bold">Key Metric</label>
                            <input
                              id="case-metric-input"
                              type="text"
                              required
                              value={newCase.metric}
                              onChange={(e) => setNewCase({ ...newCase, metric: e.target.value })}
                              placeholder="e.g. +312% or 0.3s"
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none font-mono-code"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono-code uppercase text-neutral-400">Metric Explanation</label>
                            <input
                              id="case-metricLabel-input"
                              type="text"
                              required
                              value={newCase.metricLabel}
                              onChange={(e) => setNewCase({ ...newCase, metricLabel: e.target.value })}
                              placeholder="e.g. Inbound lease booked"
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400">The Problem/Challenge</label>
                          <textarea
                            id="case-challenge-input"
                            rows={1.5}
                            value={newCase.challenge}
                            onChange={(e) => setNewCase({ ...newCase, challenge: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 text-xs text-zinc-300 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400 font-bold">Solutions Provided</label>
                          <textarea
                            id="case-solution-input"
                            rows={1.5}
                            value={newCase.solution}
                            onChange={(e) => setNewCase({ ...newCase, solution: e.target.value })}
                            className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg p-1.5 text-xs text-zinc-300 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono-code uppercase text-neutral-400">Results list (One per line)</label>
                          <textarea
                            id="case-results-input"
                            rows={2}
                            value={newCase.results}
                            onChange={(e) => setNewCase({ ...newCase, results: e.target.value })}
                            placeholder="312% increase in inbound inquiries&#10;Bounce rate decreased to 18%"
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 text-xs text-neutral-200 focus:outline-none font-mono-code"
                          />
                        </div>

                        <button
                          id="submit-case-btn"
                          type="submit"
                          className="w-full py-2 bg-gradient-to-r from-neutral-800 to-neutral-900 border border-white/10 hover:border-white/25 text-white rounded-lg text-xs font-space-tech font-bold uppercase tracking-widest transition-all cursor-pointer"
                        >
                          Submit Project Study
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SEO & METADATA OPTIMISER */}
            {activeTab === "seo" && (
              <div id="seo-cms-section" className="space-y-6">
                <div>
                  <h3 className="text-sm font-space-tech uppercase tracking-widest text-white">SEO & Brand Positioning Analyzer</h3>
                  <p className="text-xs text-neutral-400">Review search metadata, adjust organic crawl settings, and optimize using server-side Gemini intelligence</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Active Metadata editor */}
                  <div className="bg-[#0e0e11] border border-white/5 rounded-xl p-5 space-y-4">
                    <h4 className="text-xs font-mono-code uppercase text-amber-400 font-bold">Organic Meta Settings</h4>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono-code uppercase text-neutral-400">Crawl Title (under 60 chars)</label>
                      <input
                        id="seo-title-input"
                        type="text"
                        value={seo.title}
                        onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none font-mono-code"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono-code uppercase text-neutral-400">Crawl Description (under 160 chars)</label>
                      <textarea
                        id="seo-desc-input"
                        rows={3}
                        value={seo.description}
                        onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono-code uppercase text-neutral-400">Target Organic Keywords (Comma list)</label>
                      <textarea
                        id="seo-keywords-input"
                        rows={2}
                        value={seo.keywords}
                        onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none font-mono-code"
                      />
                    </div>
                  </div>

                  {/* AI SEO Analyzer recommendations block */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-amber-500/5 to-amber-600/5 border border-amber-500/20 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-amber-400">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-xs font-space-tech uppercase tracking-wider font-bold">Gemini AI Audit Tool</span>
                        </div>
                        <button
                          id="seo-audit-trigger-btn"
                          onClick={handleAiSeoOptimise}
                          disabled={seoAuditing}
                          className="bg-amber-500 hover:bg-amber-400 text-black text-[9px] font-space-tech px-2.5 py-1.5 rounded uppercase tracking-wider font-bold transition-all disabled:opacity-40 cursor-pointer"
                        >
                          {seoAuditing ? "Auditing..." : "Audit with AI"}
                        </button>
                      </div>
                      <p className="text-[10px] text-neutral-400">
                        Analyzing core services, presets, and branding structures. Gemini will reconstruct click-worthy metadata formulations and provide direct copy enhancements.
                      </p>

                      {aiSeoResult && (
                        <div id="ai-seo-results-panel" className="border-t border-white/5 pt-3 mt-3 space-y-3">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono-code text-amber-400 uppercase">Suggested Title:</span>
                            <p className="text-xs text-white font-mono-code bg-black/30 p-2 rounded border border-white/5">
                              {aiSeoResult.optimizedTitle}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono-code text-amber-400 uppercase">Suggested Meta Description:</span>
                            <p className="text-xs text-stone-300 bg-black/30 p-2 rounded border border-white/5">
                              {aiSeoResult.optimizedDescription}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono-code text-amber-400 uppercase">Target Audit Conversions:</span>
                            <ul className="text-[10px] text-zinc-400 space-y-1 list-disc pl-4">
                              {aiSeoResult.conversionTips?.map((tip: string, i: number) => (
                                <li key={i}>{tip}</li>
                              ))}
                            </ul>
                          </div>

                          <button
                            id="apply-seo-rec-btn"
                            onClick={handleApplySeoRecommendations}
                            className="w-full py-2 rounded-lg text-xs font-space-tech font-bold uppercase tracking-widest bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center space-x-1 transition-all"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Apply AI recommendations</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Pre-loaded tips list */}
                    <div className="bg-[#0e0e11] border border-white/5 rounded-xl p-4 space-y-2">
                      <span className="text-[10px] font-mono-code uppercase text-neutral-400 block font-bold">Active Conversion Audit Logs</span>
                      <ul className="text-[11px] text-stone-400 space-y-1">
                        {seo.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start space-x-1">
                            <span className="text-amber-500 mr-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
