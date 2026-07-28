import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Cpu, AlertTriangle, CheckCircle2, Layers } from "lucide-react";
import { Project } from "../../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 pr-10">
            <div className="flex items-center gap-2">
              {project.featured && (
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
                  Featured Project
                </span>
              )}
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold rounded-full">
                {project.stack[0] || "Full Stack"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">{project.title}</h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{project.summary}</p>
          </div>

          {/* Media Image / Gallery */}
          {project.thumbnail && (
            <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-zinc-900">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80";
                }}
              />
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
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
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          {/* Stack Badges */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-200 text-xs font-mono rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* System Architecture */}
          {project.architecture && (
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-2">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                System Architecture & Design Pattern
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.architecture}</p>
            </div>
          )}

          {/* Engineering Challenges */}
          {project.challenges && (
            <div className="glass-card p-5 rounded-2xl border border-amber-500/20 space-y-2">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Key Engineering Challenges Resolved
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.challenges}</p>
            </div>
          )}

          {/* Feature List */}
          {project.features && project.features.length > 0 && (
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
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
