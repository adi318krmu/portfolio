import React from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, Award, CheckCircle } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export const AboutSection: React.FC = () => {
  const { settings, experiences, education } = usePortfolio();

  const about = settings?.about || {
    title: "About Aditya Singh",
    bio: "I am a Computer Science & Engineering student with a relentless drive to engineer production-ready web platforms, AI backend microservices, and high-performance software tools.",
    journey: "My trajectory spans building AI evaluation engines (DevBattles), automated repo scoring engines (RepoLens), hybrid retrieval systems (Campus Learn), and real-time vendor supply chain backends (VendorSetu).",
    strengths: [
      "Distributed Systems Design",
      "FastAPI & Node.js Microservices",
      "Vector Database Search (RAG)",
      "JWT & Security Architecture",
      "Clean Modern UI / UX Design",
      "High Ownership & Fast Execution"
    ],
    achievements: [
      "Engineered AI Coding Assessment platform supporting multi-language microservices execution.",
      "Designed weighted GitHub evaluation engine processing 100+ repos with custom metrics.",
      "Achieved CGPA 8 in Computer Science Engineering at K.R. Mangalam University."
    ]
  };

  return (
    <section id="about" className="py-20 px-4 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>Profile & Background</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Architecting Clean Code & <span className="text-gradient">Intelligent Systems</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Combining academic rigor with hands-on development to build robust web products and developer workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Bio & Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Bio Glass Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block" />
              The Journey
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">{about.bio}</p>
            <p className="text-zinc-400 text-sm leading-relaxed">{about.journey}</p>
          </div>

          {/* Strengths Grid */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">Core Engineering Strengths</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.strengths?.map((strength, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
                  <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-xs font-semibold text-zinc-200">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Experience & Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Education Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Education</span>
            </div>
            
            {education.length > 0 ? (
              education.map((edu, idx) => (
                <div key={idx} className="border-l-2 border-indigo-500/40 pl-4 space-y-1 my-2">
                  <div className="text-base font-bold text-white">{edu.degree}</div>
                  <div className="text-xs text-zinc-400">{edu.institution} ({edu.period})</div>
                  {edu.score && <div className="text-xs font-semibold text-indigo-300">{edu.score}</div>}
                </div>
              ))
            ) : (
              <div className="border-l-2 border-indigo-500/40 pl-4 space-y-1">
                <div className="text-base font-bold text-white">B.Tech in Computer Science Engineering</div>
                <div className="text-xs text-zinc-400">K.R. Mangalam University (2023 - 2027)</div>
                <div className="text-xs font-semibold text-indigo-300">CGPA 8.0 / 10</div>
              </div>
            )}
          </div>

          {/* Achievements Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Highlights & Impact</span>
            </div>
            
            <div className="space-y-3">
              {about.achievements?.map((item, idx) => (
                <div key={idx} className="text-xs text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/5 leading-relaxed">
                  • {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
