import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github, ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Project } from "../../types";
import { ProjectModal } from "./ProjectModal";

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visibleProjects = projects.filter((p) => p.visible);

  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Selected Engineering Work</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Production <span className="text-gradient">Projects & AI Platforms</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Deep-dive technical showcases including DevBattles, RepoLens, and Campus Learn with microservices architecture breakdowns.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleProjects.map((project, idx) => (
          <motion.div
            key={project._id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between glass-card-hover"
          >
            {/* Project Media Header */}
            <div className="relative aspect-video overflow-hidden bg-zinc-950">
              <img
                src={project.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80";
                }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-transparent to-transparent opacity-80" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {project.featured && (
                  <span className="px-3 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>

              {/* Expand Details Trigger */}
              <button
                onClick={() => setSelectedProject(project)}
                className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all opacity-90 group-hover:opacity-100"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack?.slice(0, 5).map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-300 font-mono text-[11px] rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.stack?.length > 5 && (
                    <span className="px-2 py-1 bg-white/5 text-zinc-400 font-mono text-[10px] rounded-md">
                      +{project.stack.length - 5} more
                    </span>
                  )}
                </div>

                {/* External Action Links */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white flex items-center gap-1 text-xs font-semibold transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs text-zinc-400 hover:text-white underline font-mono"
                  >
                    Architecture & Features →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
