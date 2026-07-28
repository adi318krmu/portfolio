import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, Code, Server, Bot, Layout, Terminal, Database, Cpu, ArrowRight } from "lucide-react";

const FREELANCE_SERVICES = [
  {
    title: "Full Stack Development",
    description: "End-to-end web application development from scalable database schema design to responsive modern frontend UI.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    timeline: "2 - 4 Weeks",
    icon: <Code className="w-5 h-5 text-indigo-400" />
  },
  {
    title: "Backend APIs",
    description: "High-throughput RESTful & Microservice APIs with JWT security, rate-limiting, error handling, and robust DB models.",
    tech: ["Node.js", "FastAPI", "Express", "PostgreSQL", "MongoDB", "Docker"],
    timeline: "1 - 2 Weeks",
    icon: <Server className="w-5 h-5 text-emerald-400" />
  },
  {
    title: "AI Integration",
    description: "Custom AI workflows incorporating Gemini AI, LangGraph, Hugging Face models, and Hybrid RAG vector search.",
    tech: ["Gemini AI", "LangGraph", "Vector DB", "Python", "FastAPI"],
    timeline: "1 - 3 Weeks",
    icon: <Bot className="w-5 h-5 text-purple-400" />
  },
  {
    title: "MERN Development",
    description: "Custom MERN stack products engineered with clean component hierarchy, authentication, and cloud deployment.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Vercel"],
    timeline: "2 - 3 Weeks",
    icon: <Cpu className="w-5 h-5 text-cyan-400" />
  },
  {
    title: "Dashboard Development",
    description: "Ultra-sleek admin panels, analytics dashboards, and custom CMS platforms tailored for operational efficiency.",
    tech: ["React", "TailwindCSS", "Framer Motion", "Recharts", "Node.js"],
    timeline: "1 - 2 Weeks",
    icon: <Layout className="w-5 h-5 text-pink-400" />
  },
  {
    title: "Website Development",
    description: "Ultra-fast, production-ready dark-themed websites with smooth animations, SEO optimization, and mobile responsiveness.",
    tech: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
    timeline: "1 Week",
    icon: <Terminal className="w-5 h-5 text-amber-400" />
  },
  {
    title: "Database Design",
    description: "Relational & NoSQL schema design, query index optimization, aggregation pipelines, and data migration strategies.",
    tech: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma"],
    timeline: "3 - 7 Days",
    icon: <Database className="w-5 h-5 text-blue-400" />
  },
  {
    title: "Automation",
    description: "Automated data processing scripts, web scraping engines, repository analyzers, and CI/CD workflow triggers.",
    tech: ["Python", "Node.js", "Docker", "GitHub Actions"],
    timeline: "3 - 7 Days",
    icon: <Sparkles className="w-5 h-5 text-rose-400" />
  }
];

export const FreelanceSection: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="freelance" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Available for Freelance & Contracts</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Custom Engineering <span className="text-gradient">Services</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Need a high-performance web app, AI integration, or microservice API? Here are the specialized services I deliver.
        </p>
      </div>

      {/* Services Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FREELANCE_SERVICES.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="glass-card p-6 rounded-3xl border border-white/10 glass-card-hover flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl w-fit">
                {service.icon}
              </div>
              <h3 className="text-base font-bold text-white">{service.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{service.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1">
                {service.tech.map((t, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 bg-white/5 border border-white/5 text-[10px] text-zinc-300 font-mono rounded">
                    {t}
                  </span>
                ))}
              </div>

              {/* Timeline & Action */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-zinc-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-400" />
                  {service.timeline}
                </span>

                <button
                  onClick={scrollToContact}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Discuss</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main CTA Banner */}
      <div className="mt-12 glass-card p-8 rounded-3xl border border-indigo-500/30 text-center space-y-4 bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-indigo-950/40">
        <h3 className="text-2xl font-bold text-white">Have an innovative project idea in mind?</h3>
        <p className="text-sm text-zinc-300 max-w-xl mx-auto">
          Let's discuss scope, system architecture, timelines, and turn your vision into a production-ready application.
        </p>
        <button
          onClick={scrollToContact}
          className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
        >
          <span>Let's Discuss Your Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
