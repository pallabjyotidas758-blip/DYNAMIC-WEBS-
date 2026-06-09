import React, { useState } from "react";
import { Sparkles, Star, Award, Layers, Code, User, Phone, CheckCircle, GraduationCap, Briefcase, MessageSquare } from "lucide-react";

interface InteractiveSlideDeckProps {
  themeName: string;
  onOpenBooking: () => void;
}

export function InteractiveSlideDeck({ themeName, onOpenBooking }: InteractiveSlideDeckProps) {
  const [activeSlide, setActiveSlide] = useState<"profile" | "contact">("profile");

  const softwareSkills = [
    { name: "React", level: "95%", color: "bg-cyan-500", icon: "⚛️" },
    { name: "Tailwind CSS", level: "100%", color: "bg-[#38bdf8]", icon: "🎨" },
    { name: "TypeScript", level: "90%", color: "bg-blue-600", icon: "📘" },
    { name: "Node.js", level: "85%", color: "bg-green-500", icon: "🟢" },
    { name: "Photoshop", level: "80%", color: "bg-[#31a8ff]", icon: "Ps" },
    { name: "Premiere Pro", level: "85%", color: "bg-[#ea77ff]", icon: "Pr" },
    { name: "Lightroom", level: "75%", color: "bg-[#31a8ff]", icon: "Lr" },
    { name: "CapCut", level: "90%", color: "bg-white text-black", icon: "🎬" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8" id="interactive-deck-container">
      {/* 1. SECTION HEADER */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-[10px] font-mono-code uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/30 px-3 py-1.5 rounded-full border border-cyan-800/30 inline-block">
          Interactive Experiential Deck
        </span>
        <h2 className="text-xl md:text-2xl font-space-tech font-black uppercase text-white tracking-wider mt-2">
          CREATIVE DIRECTORY HUB
        </h2>
        <p className="text-xs text-stone-400 max-w-lg mx-auto font-sans-ui">
          Toggle the navigation pins below to preview the custom cinematic theme states mapped from the design manual.
        </p>
      </div>

      {/* 2. SLIDE NAVIGATION PILLS (Exactly like the pill capsule bar in the reference preview!) */}
      <div className="flex justify-center items-center mb-8">
        <div className="bg-black/80 border border-white/5 p-1.5 rounded-full flex items-center space-x-1.5 shadow-xl backdrop-blur-md">
          <button
            onClick={() => setActiveSlide("profile")}
            className={`px-6 py-1.5 rounded-full text-[10px] font-space-tech font-bold uppercase tracking-wider transition-all duration-300 ${
              activeSlide === "profile"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 font-black scale-105"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Profile Slide
          </button>
          <button
            onClick={() => setActiveSlide("contact")}
            className={`px-6 py-1.5 rounded-full text-[10px] font-space-tech font-bold uppercase tracking-wider transition-all duration-300 ${
              activeSlide === "contact"
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 font-black scale-105"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            About & Contact
          </button>
        </div>
      </div>

      {/* 3. EXPERIENCE CANVAS DECK */}
      <div className="bg-[#06060a]/90 border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative min-h-[480px] grid grid-cols-1 md:grid-cols-12">
        
        {/* INNER VERTICAL CYAN RADIAL GLOW Spotlighting components exactly like the reference */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,116,144,0.12)_0%,transparent_60%)] pointer-events-none" />

        {/* =========================================================================
            SLIDE 01: PROFILE PORTFOLIO HUB
           ========================================================================= */}
        {activeSlide === "profile" && (
          <>
            {/* Left Side: Avatar block inside the ASYMMETRICAL CRIMSON RED container with arches! */}
            <div className="md:col-span-5 p-6 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-b from-stone-950 via-[#060609] to-black min-h-[380px]">
              {/* Asymmetrical Crimson Arch Background behind the avatar, matching Slide 1's signature header red banner */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[340px] bg-[#7a1322] rounded-t-full rounded-b-xl opacity-80 -z-10 blur-[1px] shadow-2xl shadow-red-950/60" />
              
              <div className="flex flex-col space-y-4 z-10 w-full items-center">
                
                {/* Profile 1: Prajeet Roy */}
                <div className="relative group cursor-crosshair flex items-center space-x-3 bg-black/40 p-2.5 rounded-2xl border border-white/5 w-full max-w-[240px]">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 shadow-xl bg-neutral-950 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-cyan-400/50">
                    <Code className="h-4 w-4 text-zinc-400 group-hover:text-cyan-400 group-hover:rotate-12 transition-all" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[8px] font-mono-code uppercase text-zinc-500">ARCHITECT 01</span>
                    <span className="block text-xs font-space-tech font-bold uppercase tracking-wider text-white truncate">Prajeet Roy</span>
                    <span className="inline-block bg-cyan-950 text-cyan-400 border border-cyan-800/20 text-[7px] px-1.5 py-0.2 rounded font-mono-code uppercase mt-0.5">GUWAHATI</span>
                  </div>
                </div>

                {/* Profile 2: Pallabjyoti Das */}
                <div className="relative group cursor-crosshair flex items-center space-x-3 bg-black/40 p-2.5 rounded-2xl border border-white/5 w-full max-w-[240px]">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 shadow-xl bg-neutral-950 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-amber-400/50">
                    <Sparkles className="h-4 w-4 text-zinc-400 group-hover:text-amber-400 group-hover:-rotate-12 transition-all" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[8px] font-mono-code uppercase text-zinc-500">ARCHITECT 02</span>
                    <span className="block text-xs font-space-tech font-bold uppercase tracking-wider text-white truncate">Pallabjyoti Das</span>
                    <span className="inline-block bg-amber-950/45 text-amber-400 border border-amber-800/20 text-[7px] px-1.5 py-0.2 rounded font-mono-code uppercase mt-0.5">ASSAM / IN</span>
                  </div>
                </div>

              </div>

              <div className="text-center mt-6 z-10 space-y-1.5">
                <div className="bg-black/95 border border-white/10 px-3.5 py-1 rounded-full text-[9px] font-space-tech font-bold uppercase tracking-widest text-[#ececee] inline-block">
                  ▪ CONTENT ARCHITECTS
                </div>
                <h3 className="text-xs font-mono-code text-stone-300 uppercase tracking-widest mt-1">HQ / Assam, IN</h3>
              </div>
            </div>

            {/* Right Side: Showcase info with big bold display typography */}
            <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8 z-10">
              <div className="space-y-4">
                <span className="text-[9px] font-mono-code text-cyan-400 uppercase tracking-[0.3em] block">
                  HELLO, WE ARE PRAJEET & PALLABJYOTI
                </span>
                <h1 className="text-3xl md:text-5xl font-space-tech font-black tracking-normal uppercase text-white leading-none">
                  PORTFOLIO <br />
                  <span className="text-stone-500 tracking-tighter font-extrabold">2025 EDITION</span>
                </h1>
                <p className="text-xs text-stone-400 leading-relaxed max-w-md font-sans-ui">
                  Constructing responsive digital spaces at the absolute frontier of speed and interactive layout discipline. Serving enterprises globally from Guwahati, Assam.
                </p>
              </div>

              {/* Minimal Menu Selections inspired directly from Slide 1 with high contrast neon click events */}
              <div className="border-t border-white/5 pt-6 space-y-3">
                <span className="text-[8px] font-mono-code text-zinc-500 uppercase tracking-widest block mb-1">Interactive Triggers</span>
                <div className="flex flex-col space-y-2.5 max-w-xs">
                  <a
                    href="#services"
                    className="group flex items-center justify-between px-4 py-2 border border-white/5 rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 text-left"
                  >
                    <span className="text-[11px] font-space-tech font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white">
                      [01] EXPLORE SOLUTIONS STACK
                    </span>
                    <span className="text-[10px] font-mono-code text-zinc-600 group-hover:text-cyan-400 transition-colors">START</span>
                  </a>
                  <a
                    href="mailto:royprajeet69@gmail.com?subject=Website%20Design%20/%20Project%20Inquiry"
                    className="group flex items-center justify-between px-4 py-2 border border-white/5 rounded-xl hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 text-left cursor-pointer"
                  >
                    <span className="text-[11px] font-space-tech font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white">
                      [02] FILE PROJECT INQUIRY
                    </span>
                    <span className="text-[10px] font-mono-code text-zinc-600 group-hover:text-cyan-400 transition-colors">LAUNCH</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            SLIDE 02: RECAP PROJECT - PORTFOLIO WORKS
           ========================================================================= */}
        {/* =========================================================================
            SLIDE 03: SOFTWARE SKILLS, ABOUT & REACH
           ========================================================================= */}
        {activeSlide === "contact" && (
          <>
            {/* Left Side: Spotlight Profile Avatar inside custom blue glowing stage (Slide 2 style!) */}
            <div className="md:col-span-5 p-6 flex flex-col justify-between items-center relative border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-b from-stone-950 via-[#060609] to-black min-h-[380px]">
              {/* Deep glowing spotlight behind the profile graphic like slide 2! */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-cyan-600/15 rounded-full blur-3xl -z-10" />

              <div className="w-full my-auto space-y-5">
                <div className="text-center">
                  <span className="text-[8px] font-mono-code text-cyan-400 uppercase tracking-widest">Team Core</span>
                  <h4 className="text-xs font-space-tech font-black text-white uppercase mt-0.5">THE ARCHITECTS</h4>
                </div>

                <div className="space-y-3">
                  {/* Prajeet */}
                  <div className="flex items-center space-x-3 p-2 bg-black/60 rounded-xl border border-white/5">
                    <div className="h-10 w-10 rounded-lg bg-[#141416] border border-white/10 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-space-tech font-bold text-white uppercase leading-none">Prajeet Roy</h4>
                      <p className="text-[8px] font-mono-code text-zinc-500 mt-1 uppercase">Tech Lead / Guwahati</p>
                    </div>
                  </div>

                  {/* Pallabjyoti */}
                  <div className="flex items-center space-x-3 p-2 bg-black/60 rounded-xl border border-white/5">
                    <div className="h-10 w-10 rounded-lg bg-[#141416] border border-white/10 flex items-center justify-center shrink-0">
                      <Code className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-space-tech font-bold text-white uppercase leading-none">Pallabjyoti Das</h4>
                      <p className="text-[8px] font-mono-code text-zinc-500 mt-1 uppercase">Creative Director / Assam</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience stats */}
              <div className="w-full space-y-2 border-t border-white/5 pt-4">
                <div className="flex items-start space-x-2 text-[9px] font-mono-code">
                  <Briefcase className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-zinc-400 font-bold">HQ DIRECTIVES</span>
                    <span className="text-zinc-500">Dynamic UI Automation & Custom API Pipelines</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Detailed Skills Matrix directly modeled from Slide 2 */}
            <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6 z-10">
              <div className="space-y-3">
                <span className="text-[9px] font-mono-code text-cyan-400 uppercase tracking-widest block">
                  TECHNICAL INFRASTRUCTURE
                </span>
                <h3 className="text-sm font-space-tech font-extrabold uppercase text-white tracking-widest">
                  SOFTWARE & FRAMEWORK SKILLS
                </h3>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans-ui">
                  Refined technical proficiency with direct deployment metrics. Fully responsive wireframes and custom API hooks:
                </p>
              </div>

              {/* Skills grid with gorgeous badges and levels */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {softwareSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-black/40 border border-white/5 py-2.5 px-3 rounded-xl flex items-center space-x-2 hover:border-cyan-500/20 transition-all duration-200"
                  >
                    <span className="text-xs shrink-0 select-none">{skill.icon}</span>
                    <div className="min-w-0 flex-1 leading-tight">
                      <span className="block text-[9px] font-space-tech font-bold text-white truncate uppercase tracking-wide">
                        {skill.name}
                      </span>
                      <span className="text-[8px] font-mono-code text-cyan-400">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages/Communication indicators box */}
              <div className="bg-[#0b0c10] border border-white/5 p-3 rounded-xl space-y-1.5">
                <span className="text-[8px] font-mono-code text-zinc-500 uppercase tracking-widest block">
                  LANGUAGE [COMMUNICATION]
                </span>
                <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono-code text-zinc-300">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    <span>ENGLISH</span>
                    <span className="text-zinc-500">(Professional)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    <span>HINDI</span>
                    <span className="text-zinc-500">(Bilingual)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    <span>ASSAMESE</span>
                    <span className="text-zinc-500">(Native)</span>
                  </div>
                </div>
              </div>

              {/* Instant Contact trigger details */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4 bg-transparent gap-4">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono-code text-neutral-500 uppercase block">DIRECT INQUIRIES</span>
                  <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <a href="mailto:royprajeet69@gmail.com" className="text-[9px] font-mono-code text-white underline decoration-dashed hover:text-cyan-400">
                      royprajeet69@gmail.com
                    </a>
                    <a href="mailto:pallabjyotidas758@gmail.com" className="text-[9px] font-mono-code text-white underline decoration-dashed hover:text-cyan-400">
                      pallabjyotidas758@gmail.com
                    </a>
                  </div>
                </div>
                <a
                  href="mailto:royprajeet69@gmail.com?subject=Sprint%20Engagement%20Inquiry"
                  className="px-4 py-2 bg-white text-black text-[9px] font-space-tech font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all rounded-lg shrink-0 text-center cursor-pointer"
                >
                  START SPRINT
                </a>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
