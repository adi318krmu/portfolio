import React from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, Award, CheckCircle2, Code2, Brain } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export const AboutSection: React.FC = () => {
  const { education, experiences } = usePortfolio();

  const about = {
    bio: "I am a Computer Science student at K.R. Mangalam University with a strong passion for building practical, scalable software. My focus centers around Backend Development, MERN Stack applications, and integrating AI capabilities to solve real-world problems.",
    journey: "From building full-stack web platforms like DevBattles and RepoLens to solving 220+ LeetCode problems and competing in coding contests, I enjoy crafting efficient code, designing RESTful APIs, and understanding software architecture.",
    strengths: [
      "Computer Science Student",
      "Backend Development & REST APIs",
      "MERN Stack (MongoDB, Express, React, Node)",
      "AI-Powered Application Integration",
      "Data Structures & Problem Solving",
      "Git, Docker & Deployment Workflows"
    ],
    achievements: [
      "Solved 220+ problems on LeetCode (Max Rating: 1653) & 90+ on Codeforces.",
      "Engineered AI-assisted coding platform DevBattles and RepoLens GitHub analyzer.",
      "Completed Web Development Internship at InAmigos Foundation.",
      "Oracle AI Foundations Associate Certified."
    ]
  };

  return (
    <section id="about" className="py-20 px-4 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>About Me</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Passionate Developer & <span className="text-gradient">Problem Solver</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Combining computer science fundamentals with hands-on web development and AI project execution.
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
              Background & Focus
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed">{about.bio}</p>
            <p className="text-zinc-400 text-sm leading-relaxed">{about.journey}</p>
          </div>

          {/* Core Focus Areas */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">Core Focus Areas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-xs font-semibold text-zinc-200">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Education & Experience Timeline */}
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
            
            <div className="border-l-2 border-indigo-500/40 pl-4 space-y-1">
              <div className="text-base font-bold text-white">B.Tech in Computer Science & Engineering</div>
              <div className="text-xs text-zinc-400">K.R. Mangalam University (2023 - 2027)</div>
              <div className="text-xs font-semibold text-indigo-300">CGPA 8.0 / 10</div>
            </div>
            <div className="border-l-2 border-indigo-500/20 pl-4 space-y-1 pt-1">
              <div className="text-sm font-bold text-zinc-200">Class XIIth (CBSE, PCM)</div>
              <div className="text-xs text-zinc-400">C.D. International School (2022 - 2023) • 85%</div>
            </div>
          </div>

          {/* Real Work Experience Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span>Experience</span>
            </div>

            <div className="border-l-2 border-emerald-500/40 pl-4 space-y-1">
              <div className="text-base font-bold text-white">Web Development Intern</div>
              <div className="text-xs text-emerald-400 font-semibold">InAmigos Foundation • Gurugram</div>
              <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                Developed responsive web components using React & JavaScript, integrated REST APIs, and collaborated on UI/UX optimizations.
              </p>
            </div>
          </div>

          {/* Key Achievements Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Highlights & Achievements</span>
            </div>
            
            <div className="space-y-2">
              {about.achievements.map((item, idx) => (
                <div key={idx} className="text-xs text-zinc-300 bg-white/5 p-2.5 rounded-xl border border-white/5 leading-relaxed flex items-start gap-2">
                  <span className="text-purple-400 shrink-0">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
