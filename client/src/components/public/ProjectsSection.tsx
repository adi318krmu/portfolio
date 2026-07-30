import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github, ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { DETAILED_PROJECTS, DetailedProject } from "../../data/projectsData";
import { ProjectModal } from "./ProjectModal";
import { ProjectScreenshotMock } from "./ProjectScreenshotMock";

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<DetailedProject | null>(null);

  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Featured Engineering Work</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Production <span className="text-gradient">Projects Showcase</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Explore DevBattles, RepoLens, and Campus Learn with real UI screen previews, system architecture breakdowns, and live demos.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {DETAILED_PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between glass-card-hover"
          >
            {/* Real Project UI Screenshot Preview Header */}
            <div className="relative aspect-video overflow-hidden bg-zinc-950">
              <ProjectScreenshotMock
                projectId={project.id}
                type={project.gallery[0].type}
                title={project.gallery[0].title}
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                <span className="px-2.5 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              </div>

              {/* View Details Trigger */}
              <button
                onClick={() => setSelectedProject(project)}
                className="absolute bottom-3 right-3 px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all z-10"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-300 font-mono text-[11px] rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-2 py-1 bg-white/5 text-zinc-400 font-mono text-[10px] rounded-md">
                      +{project.stack.length - 4} more
                    </span>
                  )}
                </div>

                {/* External Action Links */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white flex items-center gap-1 font-semibold transition-colors"
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
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold transition-colors"
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
                    Details →
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
