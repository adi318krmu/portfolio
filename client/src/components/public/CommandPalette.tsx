import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, FolderGit2, Code2, BookOpen, Mail, FileText, Github, Linkedin, ShieldCheck } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { projects, skills, blogs, resumeUrl } = usePortfolio();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state toggle
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProjects = projects.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
  const filteredSkills = skills.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl bg-[#0c101c] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 p-4 space-y-4"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type to search projects, skills, navigation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-zinc-500 font-medium"
            />
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white/10 text-zinc-400 rounded">ESC</kbd>
          </div>

          {/* Search Results */}
          <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
            {/* Quick Navigation Section */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase px-3">Navigation</div>
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => navigateTo("projects")}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/5 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <FolderGit2 className="w-4 h-4 text-indigo-400" />
                  <span>View Projects</span>
                </button>
                <button
                  onClick={() => navigateTo("skills")}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/5 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span>Skills Arsenal</span>
                </button>
                <button
                  onClick={() => navigateTo("freelance")}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/5 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Services</span>
                </button>
                <button
                  onClick={() => navigateTo("contact")}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/5 text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-pink-400" />
                  <span>Contact Form</span>
                </button>
              </div>
            </div>

            {/* Matching Projects */}
            {filteredProjects.length > 0 && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase px-3">Projects</div>
                {filteredProjects.map((p) => (
                  <button
                    key={p._id}
                    onClick={() => navigateTo("projects")}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-xs text-zinc-300 hover:text-white transition-colors"
                  >
                    <span className="font-semibold text-white">{p.title}</span>
                    <span className="text-[10px] font-mono text-zinc-400">{p.stack[0]}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Matching Skills */}
            {filteredSkills.length > 0 && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase px-3">Skills</div>
                <div className="flex flex-wrap gap-1.5 px-3">
                  {filteredSkills.map((s) => (
                    <span key={s._id} className="px-2.5 py-1 bg-white/5 text-xs text-zinc-300 rounded-lg border border-white/5 font-mono">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Resume Download */}
            <div className="pt-2 border-t border-white/10">
              <a
                href={resumeUrl || "/resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                download="Aditya_Singh_Resume.pdf"
                className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Download Latest Resume (PDF)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
