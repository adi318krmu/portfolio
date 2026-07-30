import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Code2, Server, Database, Box, Cpu, Sparkles, CheckCircle2, Layers } from "lucide-react";

interface SkillItem {
  name: string;
  category: string;
  level: "Advanced" | "Intermediate" | "Basic Working Knowledge";
  description?: string;
}

const SKILLS_DATA: SkillItem[] = [
  // Advanced
  { name: "React.js", category: "Frontend", level: "Advanced", description: "Hooks, Context API, React Router, Custom Components" },
  { name: "Node.js", category: "Backend", level: "Advanced", description: "Event Loop, Async I/O, NPM, Microservices" },
  { name: "Express.js", category: "Backend", level: "Advanced", description: "RESTful APIs, Middleware, Error Handling" },
  { name: "MongoDB", category: "Database", level: "Advanced", description: "Mongoose ORM, Aggregation Pipelines, Schema Design" },
  { name: "JavaScript", category: "Languages", level: "Advanced", description: "ES6+, Async/Await, Promises, Closures, DOM" },
  { name: "C++", category: "Languages", level: "Advanced", description: "Data Structures, Algorithms, STL, Competitive Coding" },

  // Intermediate
  { name: "Supabase", category: "Database", level: "Intermediate", description: "PostgreSQL, Realtime, Row Level Security" },
  { name: "MySQL", category: "Database", level: "Intermediate", description: "Relational Queries, Joins, Indexing, Transactions" },
  { name: "Tailwind CSS", category: "Frontend", level: "Intermediate", description: "Utility-first Styling, Dark Mode, Responsive Design" },
  { name: "JWT", category: "Security", level: "Intermediate", description: "Token Authentication, Authorization, Cookies" },
  { name: "Python", category: "Languages", level: "Intermediate", description: "FastAPI Scripting, Automation, AI Integration" },
  { name: "REST APIs", category: "Backend", level: "Intermediate", description: "API Conventions, JSON, HTTP Verbs, Axios" },

  // Basic Working Knowledge
  { name: "Docker", category: "DevOps", level: "Basic Working Knowledge", description: "Containerization, Dockerfile, Docker Compose" },
  { name: "AWS EC2", category: "Cloud", level: "Basic Working Knowledge", description: "Virtual Server Hosting, Security Groups, SSH" },
  { name: "NGINX", category: "DevOps", level: "Basic Working Knowledge", description: "Reverse Proxy, Static Hosting, Port Forwarding" },
  { name: "GitHub Actions", category: "DevOps", level: "Basic Working Knowledge", description: "CI/CD Workflows, Automated Build & Test" },
  { name: "LangGraph", category: "AI Tools", level: "Basic Working Knowledge", description: "LLM Agent State Machines, AI Evaluation" }
];

export const SkillsSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const levels = ["All", "Advanced", "Intermediate", "Basic Working Knowledge"];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesLevel = selectedLevel === "All" || skill.level === selectedLevel;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "Intermediate":
        return "bg-indigo-500/10 border-indigo-500/30 text-indigo-400";
      case "Basic Working Knowledge":
        return "bg-purple-500/10 border-purple-500/30 text-purple-400";
      default:
        return "bg-white/10 border-white/20 text-zinc-300";
    }
  };

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Code2 className="w-3.5 h-3.5" />
          <span>Technical Skills</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Categorized <span className="text-gradient">Skills & Tech Stack</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Authentic overview of technologies categorized strictly by real proficiency level.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="space-y-6 mb-10">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search technology (e.g. React, Docker, MongoDB)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm transition-all placeholder:text-zinc-500"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedLevel === lvl
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Display by Proficiency Tiers */}
      <div className="space-y-12">
        {["Advanced", "Intermediate", "Basic Working Knowledge"].map((tier) => {
          const tierSkills = filteredSkills.filter((s) => s.level === tier);
          if (tierSkills.length === 0) return null;

          return (
            <div key={tier} className="space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${getLevelBadgeColor(tier)}`}>
                  {tier}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  ({tierSkills.length} {tierSkills.length === 1 ? "Technology" : "Technologies"})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tierSkills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="glass-card p-4 rounded-2xl border border-white/10 glass-card-hover flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-indigo-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                          <span className="text-[10px] text-zinc-400 font-mono uppercase">
                            {skill.category}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getLevelBadgeColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>

                    {skill.description && (
                      <p className="text-xs text-zinc-400 pt-1 leading-relaxed">
                        {skill.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
