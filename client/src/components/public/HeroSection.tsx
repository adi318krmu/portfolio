import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export const HeroSection: React.FC = () => {
  const { settings, resumeUrl } = usePortfolio();
  
  const hero = settings?.hero || {
    name: "Aditya Singh",
    subtitle: "Full Stack Engineer & AI Microservices Architect",
    typingText: [
      "MERN & FastAPI Specialist",
      "Hybrid RAG & Vector DB Engineer",
      "Microservices & Docker Architect",
      "C++ Competitive Programmer"
    ],
    availability: "Available for High-Impact Roles & Freelance Projects",
    profileImage: "/interview-photo.jpeg",
    focusAreas: ["Full Stack Dev", "AI Engineering", "Microservices", "System Architecture"],
    callouts: [
      { value: "4+", label: "Production Systems" },
      { value: "100%", label: "Mini-CMS Managed" },
      { value: "40%", label: "Eval Performance Boost" },
      { value: "24/7", label: "Ready to Ship Code" }
    ]
  };

  const socialLinks = settings?.socialLinks || {
    github: "https://github.com/adi318krmu",
    linkedin: "https://www.linkedin.com/in/aditya-singh-59578934b/"
  };

  // Typing Text Animation Logic
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrases = hero.typingText && hero.typingText.length > 0
      ? hero.typingText
      : ["Full Stack Engineer", "AI Developer"];
    
    const targetPhrase = phrases[typingIndex % phrases.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(targetPhrase.substring(0, currentText.length + 1));
        if (currentText === targetPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(targetPhrase.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTypingIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, typingIndex, hero.typingText]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-28 pb-16 px-4 relative">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Info & Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{hero.availability}</span>
          </div>

          {/* Name & Title */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-gradient">{hero.name}</span>
            </h1>
            
            {/* Dynamic Typing Text Subtitle */}
            <div className="flex items-center gap-2 text-lg sm:text-2xl font-semibold text-indigo-400 h-9 font-mono">
              <Terminal className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>{currentText}</span>
              <span className="w-2 h-6 bg-indigo-500 animate-pulse" />
            </div>
          </div>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Building high-performance software systems with modern web technologies, isolated microservices, and practical AI integrations designed to scale seamlessly.
          </p>

          {/* Focus Areas Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {hero.focusAreas?.map((area, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-zinc-300 flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                {area}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-2 group transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 font-semibold rounded-xl flex items-center gap-2 transition-all hover:border-white/20 active:scale-[0.98]"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Contact Me</span>
            </button>

            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Callouts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
            {hero.callouts?.map((item, idx) => (
              <div key={idx} className="glass-card p-3.5 rounded-xl border border-white/5">
                <div className="text-xl sm:text-2xl font-extrabold text-gradient">{item.value}</div>
                <div className="text-xs text-zinc-400 font-medium mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Interactive Profile Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-full max-w-md">
            {/* Glowing Border Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
            
            <div className="relative glass-card p-3 rounded-3xl border border-white/15 overflow-hidden">
              <img
                src={hero.profileImage || "/interview-photo.jpeg"}
                alt={hero.name}
                className="w-full h-96 sm:h-[26rem] object-cover rounded-2xl filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/interview-photo.jpeg";
                }}
              />

              {/* Floating Bottom Card Note */}
              <div className="absolute bottom-6 inset-x-6 glass-card p-4 rounded-xl border border-white/20 backdrop-blur-xl space-y-1">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-bold tracking-wider uppercase">
                  <span>Aditya Singh</span>
                  <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> Verified Profile
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-medium line-clamp-2">
                  Computer Science Engineer with strong foundations in C++, MERN Stack & AI System Integrations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
