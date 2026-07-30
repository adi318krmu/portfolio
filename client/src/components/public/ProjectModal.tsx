import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Cpu, AlertTriangle, CheckCircle2, Layers, Sparkles, ChevronLeft, ChevronRight, Lightbulb, Rocket } from "lucide-react";
import { DetailedProject } from "../../data/projectsData";
import { ProjectScreenshotMock } from "./ProjectScreenshotMock";

interface ProjectModalProps {
  project: DetailedProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);

  if (!project) return null;

  const currentGalleryItem = project.gallery[activeGalleryIdx] || project.gallery[0];

  const handleNextSlide = () => {
    setActiveGalleryIdx((prev) => (prev + 1) % project.gallery.length);
  };

  const handlePrevSlide = () => {
    setActiveGalleryIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c101c] border border-white/15 rounded-3xl shadow-2xl overflow-y-auto z-10 p-6 sm:p-8 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors z-20"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 pr-12">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured Production Showcase
              </span>
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full">
                {project.stack[0]}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">{project.title}</h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{project.summary}</p>
          </div>

          {/* Screenshot Gallery Carousel Component */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-video bg-zinc-950 shadow-2xl">
              <ProjectScreenshotMock
                projectId={project.id}
                type={currentGalleryItem.type}
                title={currentGalleryItem.title}
              />

              {/* Carousel Controls */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Gallery Captions & Thumbnails */}
            <div className="flex items-center justify-between text-xs px-1">
              <div className="text-zinc-300 font-medium">
                <span className="text-indigo-400 font-bold">Screen {activeGalleryIdx + 1}: </span>
                <span>{currentGalleryItem.caption}</span>
              </div>
              <div className="flex items-center gap-1">
                {project.gallery.map((_, gIdx) => (
                  <button
                    key={gIdx}
                    onClick={() => setActiveGalleryIdx(gIdx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeGalleryIdx === gIdx ? "bg-indigo-500 w-6" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all hover:scale-105"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-200 text-xs font-mono rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Grid Layout: Problem Statement & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-rose-500/20 space-y-2">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.problemStatement}</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 space-y-2">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Solution & Approach
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* System Architecture */}
          <div className="glass-card p-5 rounded-2xl border border-indigo-500/20 space-y-2">
            <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              System Architecture
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono bg-[#060810] p-3 rounded-xl border border-white/5">
              {project.architecture}
            </p>
          </div>

          {/* Key Engineering Challenges */}
          <div className="glass-card p-5 rounded-2xl border border-amber-500/20 space-y-2">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Key Engineering Challenges Resolved
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.challenges}</p>
          </div>

          {/* Core Features List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              Core Capabilities & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Future Improvements */}
          <div className="glass-card p-5 rounded-2xl border border-purple-500/20 space-y-3">
            <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Future Roadmap & Planned Improvements
            </h3>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {project.futureImprovements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-400 shrink-0">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
