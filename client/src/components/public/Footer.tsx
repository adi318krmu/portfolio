import React from "react";
import { Github, Linkedin, Mail, Code2, Globe, FileText } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

interface FooterProps {
  onOpenResumeModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal }) => {
  const { settings } = usePortfolio();

  const socialLinks = settings?.socialLinks || {
    github: "https://github.com/adi318krmu",
    linkedin: "https://www.linkedin.com/in/aditya-singh-59578934b/",
    leetcode: "https://leetcode.com",
    codeforces: "https://codeforces.com",
    email: "adityaks0604@gmail.com"
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#06080e] py-12 px-4 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-lg text-white">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs">
              <Code2 className="w-4 h-4" />
            </div>
            <span>Aditya Singh</span>
          </div>
          <p className="text-xs text-zinc-400">
            Full Stack Developer & Computer Science Student
          </p>
        </div>

        {/* Social Coding Platforms List */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>LeetCode</span>
          </a>
          <a
            href="https://codeforces.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>Codeforces</span>
          </a>
          {onOpenResumeModal && (
            <button
              onClick={onOpenResumeModal}
              className="text-zinc-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
          )}
          <a
            href={`mailto:${socialLinks.email || "adityaks0604@gmail.com"}`}
            className="text-zinc-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-zinc-500 text-center md:text-right font-mono">
          © {currentYear} Aditya Singh. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
