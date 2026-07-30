import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Sparkles, Terminal, FileText } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

interface HeroSectionProps {
  onOpenResumeModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const { settings } = usePortfolio();
  
  // Real Authentic Profile Configuration
  const hero = {
    name: settings?.hero?.name || "Aditya Singh",
    subtitle: "Full Stack Developer & Computer Science Student",
    typingText: [
      "Full Stack Developer",
      "Backend Developer",
      "MERN Stack Developer",
      "AI Enthusiast"
    ],
    availability: "Open to Full-Time Roles & Internship Opportunities",
    profileImage: settings?.hero?.profileImage || "/interview-photo.jpeg",
    focusAreas: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "JWT Authentication"
    ],
    callouts: [
      { value: "220+", label: "LeetCode Problems" },
      { value: "90+", label: "Codeforces Problems" },
      { value: "15+", label: "Coding Contests" },
      { value: "3", label: "Production Projects" },
      { value: "Oracle AI", label: "Foundations Certified" }
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
    const phrases = hero.typingText;
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

          {/* Name & Dynamic Typing Subtitle */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Hi, I'm <span className="text-gradient">{hero.name}</span>
            </h1>
            
            {/* Dynamic Typing Text Subtitle */}
            <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-indigo-400 h-9 font-mono">
              <Terminal className="w-5 h-5 text-indigo-500 shrink-0" />
              <span>{currentText}</span>
              <span className="w-2 h-6 bg-indigo-500 animate-pulse" />
            </div>
          </div>

          {/* Authentic Description Paragraph */}
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Computer Science student passionate about building scalable web applications, backend systems, and AI-powered products using React, Node.js, Express, MongoDB, and modern development tools.
          </p>

          {/* Real Tech Badges Chips */}
          <div className="space-y-2 pt-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">Core Technologies</div>
            <div className="flex flex-wrap gap-2">
              {hero.focusAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium bg-indigo-950/40 border border-indigo-500/20 rounded-full text-indigo-200 flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  {area}
                </span>
              ))}
            </div>
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

            {onOpenResumeModal && (
              <button
                onClick={onOpenResumeModal}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 font-semibold rounded-xl flex items-center gap-2 transition-all hover:border-white/20 active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>View Resume</span>
              </button>
            )}

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

          {/* Meaningful Achievements Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-white/10">
            {hero.callouts.map((item, idx) => (
              <div key={idx} className="glass-card p-3 rounded-xl border border-white/5 text-center sm:text-left">
                <div className="text-lg sm:text-xl font-extrabold text-gradient">{item.value}</div>
                <div className="text-[11px] text-zinc-400 font-medium mt-0.5 leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group w-full max-w-md">
            {/* Subtle Ambient Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-80 transition duration-700" />
            
            <div className="relative glass-card p-3 rounded-3xl border border-white/15 overflow-hidden">
              <img
                src={hero.profileImage}
                alt={hero.name}
                loading="lazy"
                className="w-full h-96 sm:h-[26rem] object-cover rounded-2xl filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/interview-photo.jpeg";
                }}
              />

              {/* Profile Card Label */}
              <div className="absolute bottom-6 inset-x-6 glass-card p-4 rounded-xl border border-white/20 backdrop-blur-xl space-y-1">
                <div className="flex items-center justify-between text-xs text-indigo-400 font-bold tracking-wider uppercase">
                  <span>Aditya Singh</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px]">
                    Computer Science Student
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-medium line-clamp-2">
                  Passionate about building scalable web applications, backend systems, and AI-powered products.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
