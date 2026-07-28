import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Code2, Cpu, Server, Database, Bot, Box, Cloud, Terminal, BookOpen, Layers } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Skill } from "../../types";

const CATEGORIES = [
  "All",
  "Programming",
  "Frontend",
  "Backend",
  "Database",
  "AI",
  "DevOps",
  "Cloud",
  "Tools",
  "Core Subjects"
];

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !skill.hidden;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Programming": return <Code2 className="w-4 h-4 text-indigo-400" />;
      case "Frontend": return <Cpu className="w-4 h-4 text-purple-400" />;
      case "Backend": return <Server className="w-4 h-4 text-emerald-400" />;
      case "Database": return <Database className="w-4 h-4 text-blue-400" />;
      case "AI": return <Bot className="w-4 h-4 text-pink-400" />;
      case "DevOps": return <Box className="w-4 h-4 text-amber-400" />;
      case "Cloud": return <Cloud className="w-4 h-4 text-cyan-400" />;
      case "Tools": return <Terminal className="w-4 h-4 text-zinc-400" />;
      case "Core Subjects": return <BookOpen className="w-4 h-4 text-rose-400" />;
      default: return <Layers className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Code2 className="w-3.5 h-3.5" />
          <span>Technical Arsenal</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Skills & <span className="text-gradient">Tech Stack</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Database-driven skills matrix organized by technical domain with real-time filtration.
        </p>
      </div>

      {/* Controls: Search Bar & Category Filter Tabs */}
      <div className="space-y-6 mb-10">
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search skills (e.g. C++, React, Docker, RAG)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm transition-all placeholder:text-zinc-500"
          />
        </div>

        {/* Categories Tab Pill List */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill._id || idx}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-4 rounded-2xl border border-white/10 glass-card-hover flex flex-col justify-between gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{skill.name}</h3>
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-zinc-500 text-sm">
            No skills found matching "{searchQuery}" in category "{selectedCategory}".
          </div>
        )}
      </motion.div>
    </section>
  );
};
