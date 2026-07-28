import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Download, Menu, X, Code2, Sparkles, FileText } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { resumeUrl } = usePortfolio();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "certificates", label: "Certificates" },
    { id: "freelance", label: "Services" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center p-4">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#0b0f19]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-950/20 max-w-5xl w-full"
              : "bg-[#0b0f19]/40 backdrop-blur-md border border-white/5 max-w-6xl w-full"
          }`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 font-bold text-lg text-white group px-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 font-extrabold tracking-tight">
              Aditya<span className="text-indigo-400">.</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-indigo-600/30 border border-indigo-500/50 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-white/5 hover:bg-white/10 text-zinc-300 rounded-lg border border-white/10 transition-colors"
              title="Open Command Palette"
            >
              <Command className="w-3.5 h-3.5 text-indigo-400" />
              <span>⌘K</span>
            </button>

            {/* Resume Button */}
            <a
              href={resumeUrl || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              download="Aditya_Singh_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white lg:hidden rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 p-6 bg-[#0d111d]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl lg:hidden flex flex-col gap-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`p-3 text-left rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5"
              >
                <Command className="w-4 h-4 text-indigo-400" />
                <span>Command Palette (Ctrl + K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
